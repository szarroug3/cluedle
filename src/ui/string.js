// Red string between pins, for the player's own thinking. Drag from one card to another to tie a
// string, or click the spool, then pin A, then pin B; the spool stays in hand for the next one until
// it's clicked again or another tool is picked up. Click a string to take it down. The rules never
// read it.
//
// Each string is a short chain of points under gravity (Verlet integration): a new string drops and
// settles, and strings sway when something nearby is clicked or the pointer brushes them. The
// simulation only runs while something is moving.

const SVG_NS = "http://www.w3.org/2000/svg";
const SEGMENTS = 14;
const SLACK = 1.035; // string is 3.5% longer than the straight line between its pins, so it sags
const GRAVITY = 0.35;
const DAMPING = 0.965;
const ITERATIONS = 8;
const REST_SPEED = 0.02; // below this, everything is still and the loop stops

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

  let threading = false;
  let first = null;
  let ropes = []; // one per string: { a, b, points: [{ x, y, px, py }], rest, group, hit, line }
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
    const group = svg("g", { class: "string" });
    const hit = svg("path", { class: "string-hit" });
    const line = svg("path", { class: className });
    group.append(hit, line);
    return { points, rest: (length * SLACK) / SEGMENTS, group, hit, line };
  }

  function makeRope([a, b], index, hanging, carried = null) {
    const from = headOf(a);
    const to = headOf(b);
    if (!from || !to) return null;
    const rope = ropeBetween(from, to, { hanging, from: carried });
    rope.group.dataset.index = String(index);
    return Object.assign(rope, { a, b });
  }

  function rebuild({ hanging }) {
    layer.replaceChildren();
    ropes = strings.map((pair, i) => makeRope(pair, i, hanging)).filter(Boolean);
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

  function loop() {
    let moving = 0;
    for (const rope of drawing ? [...ropes, drawing] : ropes) {
      moving = Math.max(moving, step(rope));
      render(rope);
    }
    // Keep going while the player is drawing, even if the string has come to rest.
    if (moving > REST_SPEED || drawing) requestAnimationFrame(loop);
    else running = false;
  }

  function wake() {
    if (running) return;
    running = true;
    requestAnimationFrame(loop);
  }

  // Push the middle of every string within reach of a point, strongest nearest.
  function nudge(at, strength, reach) {
    let touched = false;
    for (const rope of ropes) {
      for (let i = 1; i < rope.points.length - 1; i++) {
        const pt = rope.points[i];
        const dist = Math.hypot(pt.x - at.x, pt.y - at.y);
        if (dist > reach) continue;
        const force = strength * (1 - dist / reach);
        pt.px -= (Math.random() - 0.5) * force;
        pt.py -= force * 0.5;
        touched = true;
      }
    }
    if (touched) wake();
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
    strings.push([a, b]);
    onChange(strings);
    const rope = makeRope([a, b], strings.length - 1, false, carried);
    if (!rope) return;
    ropes.push(rope);
    layer.append(rope.group);
    render(rope);
    wake();
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
  // it. A press that never really moves stays an ordinary click.
  const DRAG_START = 8;
  let drag = null;

  board.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || stage.classList.contains("holding")) return;
    const item = event.target.closest(".pin-item");
    if (!item || event.target.closest(".string")) return;
    drag = { item, x: event.clientX, y: event.clientY, drawing: false };
  });

  window.addEventListener("pointermove", (event) => {
    if (!drag) return;
    const from = headOf(drag.item.dataset.pin);
    const to = toBoard(event.clientX, event.clientY);
    if (!drag.drawing) {
      if (Math.hypot(event.clientX - drag.x, event.clientY - drag.y) < DRAG_START) return;
      drag.drawing = true;
      drag.item.classList.add("string-first");
      stage.classList.add("drawing-string");
      drawing = ropeBetween(from, to, { className: "string-line string-preview" });
      layer.append(drawing.group);
      wake();
    }
    // The free end rides on the pointer; the string lengthens to keep a little slack.
    const end = drawing.points[SEGMENTS];
    end.x = end.px = to.x;
    end.y = end.py = to.y;
    drawing.rest = (Math.hypot(to.x - from.x, to.y - from.y) * SLACK) / SEGMENTS;
    const over = document.elementFromPoint(event.clientX, event.clientY)?.closest(".pin-item");
    board.querySelector(".string-target")?.classList.remove("string-target");
    if (over && over !== drag.item) over.classList.add("string-target");
  });

  window.addEventListener("pointerup", (event) => {
    if (!drag) return;
    const { item, drawing: wasDrawing } = drag;
    drag = null;
    if (!wasDrawing) return;
    const over = document.elementFromPoint(event.clientX, event.clientY)?.closest(".pin-item");
    item.classList.remove("string-first");
    board.querySelector(".string-target")?.classList.remove("string-target");
    stage.classList.remove("drawing-string");
    const carried = drawing.points;
    drawing.group.remove();
    drawing = null;
    if (over && board.contains(over)) addString(item.dataset.pin, over.dataset.pin, carried);
    // The drag ends in a click; don't let it open the card underneath. If no click comes (the pointer
    // was let go off the board), the guard lapses straight away.
    const swallow = (e) => e.stopPropagation();
    stage.addEventListener("click", swallow, { capture: true, once: true });
    setTimeout(() => stage.removeEventListener("click", swallow, { capture: true }), 0);
  });

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

  return {
    // Handles a click if it belongs to the string; returns whether it did.
    handleClick(event) {
      if (event.target.closest(".spool")) {
        setThreading(!threading);
        return true;
      }
      if (threading) {
        const item = event.target.closest(".pin-item");
        if (item) tie(item);
        return true;
      }
      const string = event.target.closest(".string");
      if (string) {
        strings.splice(Number(string.dataset.index), 1);
        onChange(strings);
        rebuild({ hanging: true });
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
