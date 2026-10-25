// Red string between pins, for the player's own thinking. Drag from one card to another to tie a
// string, or click the spool, then pin A, then pin B; the spool stays in hand for the next one until
// it's clicked again or another tool is picked up. Click a string to take it down. The rules never
// read it.
//
// Each string is a short chain of points under gravity (Verlet integration): a new string drops and
// settles, and strings sway when something nearby is clicked or the pointer brushes them. Each
// string wakes only when something happens near it and sleeps once it settles, so a crowded board
// stays smooth: only the strings near what you touched move.

const SVG_NS = "http://www.w3.org/2000/svg";
const SEGMENTS = 14;
const SLACK = 1.035; // string is 3.5% longer than the straight line between its pins, so it sags
const GRAVITY = 0.35;
const DAMPING = 0.965;
const ITERATIONS = 8;
const REST_SPEED = 0.02; // below this, everything is still and the loop stops
const MAX_STRINGS = 40; // generous, but keeps a crowded board smooth

function svg(tag, attrs = {}) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
  return node;
}

export function createString(stage, { strings, onChange }) {
  const board = stage.querySelector(".board");
  const spool = stage.querySelector(".spool");
  spool.setAttribute("role", "button");
  spool.setAttribute("aria-label", "Red string: tie a string between two pins");
  spool.tabIndex = 0;

  const layer = svg("svg", { class: "string-layer", "aria-hidden": "true" });
  board.append(layer);
  const spoolLabel = spool.parentElement.querySelector(".rail-label");

  // At the cap the spool dims and says so; taking a string down frees one up.
  const full = () => strings.length >= MAX_STRINGS;
  function updateSpool() {
    spool.classList.toggle("empty", full());
    if (spoolLabel) spoolLabel.textContent = full() ? "Out of string" : "String";
  }
  function refuse() {
    spool.classList.remove("refuse");
    void spool.offsetWidth;
    spool.classList.add("refuse");
  }

  let threading = false;
  let first = null;
  let ropes = []; // one per string: { a, b, points: [{ x, y, px, py }], rest, group, hit, line, awake }
  let drawing = null; // the string following the pointer while the player drags, if any
  let running = false;

  // Where a pin's head sits, in the board's own (unscaled) coordinates.
  function toBoard(clientX, clientY) {
    const origin = layer.getBoundingClientRect();
    const scale = origin.width / layer.clientWidth || 1;
    return { x: (clientX - origin.left) / scale, y: (clientY - origin.top) / scale };
  }
  function headOf(pinId) {
    const head = board.querySelector(`[data-pin="${pinId}"]`)?.querySelector(":scope > .pushpin");
    if (!head) return null;
    const box = head.getBoundingClientRect();
    return toBoard(box.left + box.width / 2, box.top + box.height / 2);
  }

  // A rope between two points: straight, already hanging (when restoring), or carrying on from the
  // points of the string the player was drawing, so it doesn't jump when tied.
  function ropeBetween(from, to, { hanging = false, from: carried = null, className = "string-line" } = {}) {
    const length = Math.hypot(to.x - from.x, to.y - from.y);
    const points = [];
    for (let i = 0; i <= SEGMENTS; i++) {
      const t = i / SEGMENTS;
      const sag = hanging ? Math.sin(Math.PI * t) * length * 0.11 : 0;
      const x = carried ? carried[i].x : from.x + (to.x - from.x) * t;
      const y = carried ? carried[i].y : from.y + (to.y - from.y) * t + sag;
      points.push({ x, y, px: carried ? carried[i].px : x, py: carried ? carried[i].py : y });
    }
    points[0] = { ...points[0], x: from.x, y: from.y };
    points[SEGMENTS] = { ...points[SEGMENTS], x: to.x, y: to.y };
    // The shadow is a second, offset path rather than a CSS filter: filters are costly to repaint,
    // and a moving string repaints the whole layer.
    const group = svg("g", { class: "string" });
    const hit = svg("path", { class: "string-hit" });
    const shadow = svg("path", { class: "string-shadow" });
    const line = svg("path", { class: className });
    group.append(hit, shadow, line);
    return { points, rest: (length * SLACK) / SEGMENTS, group, hit, shadow, line, awake: false };
  }

  function makeRope([a, b], hanging, carried = null) {
    const from = headOf(a);
    const to = headOf(b);
    if (!from || !to) return null;
    return Object.assign(ropeBetween(from, to, { hanging, from: carried }), { a, b });
  }

  function rebuild({ hanging }) {
    layer.replaceChildren();
    ropes = strings.map((pair) => makeRope(pair, hanging)).filter(Boolean);
    for (const rope of ropes) layer.append(rope.group);
    for (const rope of ropes) render(rope);
  }

  function render(rope) {
    const p = rope.points;
    let d = `M${p[0].x.toFixed(1)} ${p[0].y.toFixed(1)}`;
    for (let i = 1; i < p.length - 1; i++) {
      const mx = (p[i].x + p[i + 1].x) / 2;
      const my = (p[i].y + p[i + 1].y) / 2;
      d += ` Q${p[i].x.toFixed(1)} ${p[i].y.toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
    }
    d += ` L${p[p.length - 1].x.toFixed(1)} ${p[p.length - 1].y.toFixed(1)}`;
    rope.hit.setAttribute("d", d);
    rope.shadow.setAttribute("d", d);
    rope.line.setAttribute("d", d);
  }

  // One step of the simulation. Returns how far the fastest point moved, once settled by the
  // constraints, so a string hanging still reads as still even though gravity keeps pulling.
  function step(rope) {
    const p = rope.points;
    const last = p.length - 1;
    for (let i = 1; i < last; i++) {
      const pt = p[i];
      const vx = (pt.x - pt.px) * DAMPING;
      const vy = (pt.y - pt.py) * DAMPING;
      pt.px = pt.x;
      pt.py = pt.y;
      pt.x += vx;
      pt.y += vy + GRAVITY;
    }
    // Keep neighbours at the rest length; the end points stay on their pins.
    for (let k = 0; k < ITERATIONS; k++) {
      for (let i = 0; i < last; i++) {
        const a = p[i];
        const b = p[i + 1];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 0.001;
        const push = (dist - rope.rest) / dist / 2;
        if (i > 0) {
          a.x += dx * push;
          a.y += dy * push;
        }
        if (i + 1 < last) {
          b.x -= dx * push;
          b.y -= dy * push;
        }
      }
    }
    let fastest = 0;
    for (let i = 1; i < last; i++) fastest = Math.max(fastest, Math.abs(p[i].x - p[i].px) + Math.abs(p[i].y - p[i].py));
    return fastest;
  }

  // Only awake strings are simulated and redrawn; each goes back to sleep once it's still.
  function loop() {
    let awake = false;
    for (const rope of ropes) {
      if (!rope.awake) continue;
      if (step(rope) > REST_SPEED) awake = true;
      else rope.awake = false;
      render(rope);
    }
    if (drawing) {
      step(drawing);
      render(drawing);
    }
    // Keep going while any string is moving, or while the player is drawing one.
    if (awake || drawing) requestAnimationFrame(loop);
    else running = false;
  }

  function wake(rope) {
    if (rope) rope.awake = true;
    if (running) return;
    running = true;
    requestAnimationFrame(loop);
  }

  // Push the middle of each string within reach of a point, strongest nearest. Strings out of reach
  // stay asleep.
  function nudge(at, strength, reach) {
    for (const rope of ropes) {
      let touched = false;
      for (let i = 1; i < rope.points.length - 1; i++) {
        const pt = rope.points[i];
        const dist = Math.hypot(pt.x - at.x, pt.y - at.y);
        if (dist > reach) continue;
        const force = strength * (1 - dist / reach);
        pt.px -= (Math.random() - 0.5) * force;
        pt.py -= force * 0.5;
        touched = true;
      }
      if (touched) wake(rope);
    }
  }

  function setThreading(on) {
    threading = on;
    first?.classList.remove("string-first");
    first = null;
    stage.classList.toggle("threading", on);
    spool.classList.toggle("active", on);
  }

  // Tie a new string between two pins, unless it's the same pin or the pair is already tied.
  function addString(a, b, carried = null) {
    const exists = strings.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
    if (a === b || exists) return;
    if (full()) return refuse();
    // Both ends must land on a real pushpin; anything else isn't tied.
    if (!headOf(a) || !headOf(b)) return;
    strings.push([a, b]);
    onChange(strings);
    const rope = makeRope([a, b], false, carried);
    if (!rope) return;
    ropes.push(rope);
    layer.append(rope.group);
    render(rope);
    wake(rope);
    updateSpool();
    if (full()) setThreading(false);
  }

  function tie(item) {
    if (!first) {
      first = item;
      item.classList.add("string-first");
      return;
    }
    addString(first.dataset.pin, item.dataset.pin);
    first.classList.remove("string-first");
    first = null;
  }

  // Dragging from a card draws a string that follows the pointer; letting go on another card ties
  // it. A press that never really moves stays an ordinary click. On a touch screen a swipe has to
  // stay a scroll, so drawing starts only after a long press on the card.
  const DRAG_START = 8;
  const LONG_PRESS = 350;
  let drag = null;

  function startDrawing(event) {
    if (full()) {
      cancelDrag();
      return refuse();
    }
    drag.drawing = true;
    drag.item.classList.add("string-first");
    stage.classList.add("drawing-string");
    drawing = ropeBetween(headOf(drag.item.dataset.pin), toBoard(event.clientX, event.clientY), {
      className: "string-line string-preview",
    });
    layer.append(drawing.group);
    wake();
  }

  // Let go of the drag, tying the string if it ended on another card.
  function endDrag(over) {
    if (!drag) return;
    const { item, drawing: wasDrawing, timer } = drag;
    clearTimeout(timer);
    drag = null;
    item.classList.remove("string-first");
    if (!wasDrawing) return;
    board.querySelector(".string-target")?.classList.remove("string-target");
    stage.classList.remove("drawing-string");
    const carried = drawing.points;
    drawing.group.remove();
    drawing = null;
    if (over && board.contains(over)) addString(item.dataset.pin, over.dataset.pin, carried);
  }
  const cancelDrag = () => endDrag(null);

  board.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || stage.classList.contains("holding")) return;
    const item = event.target.closest(".pin-item");
    if (!item || event.target.closest(".string")) return;
    drag = { item, x: event.clientX, y: event.clientY, drawing: false, touch: event.pointerType !== "mouse", armed: false };
    // On touch, holding still on the card arms it: the pin lights up and the next move draws.
    if (drag.touch) {
      drag.timer = setTimeout(() => {
        if (!drag) return;
        drag.armed = true;
        item.classList.add("string-first");
        navigator.vibrate?.(10);
      }, LONG_PRESS);
    }
  });

  window.addEventListener("pointermove", (event) => {
    if (!drag) return;
    if (!drag.drawing) {
      if (Math.hypot(event.clientX - drag.x, event.clientY - drag.y) < DRAG_START) return;
      // A touch that moves before the long press is a scroll or a pan, not a string.
      if (drag.touch && !drag.armed) return cancelDrag();
      startDrawing(event);
      if (!drag) return;
    }
    const from = headOf(drag.item.dataset.pin);
    const to = toBoard(event.clientX, event.clientY);
    // The free end rides on the pointer; the string lengthens to keep a little slack.
    const end = drawing.points[SEGMENTS];
    end.x = end.px = to.x;
    end.y = end.py = to.y;
    drawing.rest = (Math.hypot(to.x - from.x, to.y - from.y) * SLACK) / SEGMENTS;
    const over = document.elementFromPoint(event.clientX, event.clientY)?.closest(".pin-item");
    board.querySelector(".string-target")?.classList.remove("string-target");
    if (over && over !== drag.item) over.classList.add("string-target");
  });

  // While a string is being drawn by touch, keep the page from scrolling under the finger.
  board.addEventListener(
    "touchmove",
    (event) => {
      if (drag && (drag.armed || drag.drawing)) event.preventDefault();
    },
    { passive: false },
  );

  window.addEventListener("pointerup", (event) => {
    if (!drag) return;
    const wasDrawing = drag.drawing;
    const wasArmed = drag.armed;
    endDrag(document.elementFromPoint(event.clientX, event.clientY)?.closest(".pin-item"));
    if (!wasDrawing && !wasArmed) return;
    // The drag ends in a click; don't let it open the card underneath. If no click comes (the pointer
    // was let go off the board), the guard lapses straight away.
    const swallow = (e) => e.stopPropagation();
    stage.addEventListener("click", swallow, { capture: true, once: true });
    setTimeout(() => stage.removeEventListener("click", swallow, { capture: true }), 0);
  });

  // The browser can take a touch over (to scroll or zoom); drop the drag rather than leave it stuck.
  window.addEventListener("pointercancel", cancelDrag);

  spool.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setThreading(!threading);
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && threading) setThreading(false);
  });

  // The pointer brushing a string sets it swaying a little.
  let lastBrush = 0;
  board.addEventListener("pointermove", (event) => {
    const now = performance.now();
    if (now - lastBrush < 60 || ropes.length === 0) return;
    lastBrush = now;
    nudge(toBoard(event.clientX, event.clientY), 1.2, 24);
  });

  // A click on the board (a stamp landing, a card opening) shakes the strings around it.
  stage.addEventListener("click", (event) => {
    if (!board.contains(event.target) || ropes.length === 0) return;
    nudge(toBoard(event.clientX, event.clientY), 6, 160);
  });

  rebuild({ hanging: true });
  updateSpool();

  return {
    // Handles a click if it belongs to the string; returns whether it did.
    handleClick(event) {
      if (event.target.closest(".spool")) {
        if (full() && !threading) refuse();
        else setThreading(!threading);
        return true;
      }
      if (threading) {
        const item = event.target.closest(".pin-item");
        if (item) tie(item);
        return true;
      }
      // Taking one string down removes just that one; the click itself sways its neighbours.
      const group = event.target.closest(".string");
      const rope = group && ropes.find((r) => r.group === group);
      if (rope) {
        group.remove();
        ropes.splice(ropes.indexOf(rope), 1);
        strings.splice(strings.findIndex(([x, y]) => x === rope.a && y === rope.b), 1);
        onChange(strings);
        updateSpool();
        return true;
      }
      return false;
    },
    // Re-hang every string from its pins, e.g. after restoring progress.
    redraw: () => rebuild({ hanging: true }),
    // Put the spool down, e.g. when another tool is picked up.
    stop() {
      if (threading) setThreading(false);
    },
  };
}
