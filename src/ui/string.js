// Red string between pins, for the player's own thinking. Click the spool, then pin A, then pin B,
// to tie a string; the spool stays in hand for the next one until it's clicked again or another tool
// is picked up. Click a string to take it down. The rules never read it.

const SVG_NS = "http://www.w3.org/2000/svg";

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

  // Where a pin's head sits, in the board's own (unscaled) coordinates.
  function headOf(pinId) {
    const item = board.querySelector(`[data-pin="${pinId}"]`);
    const head = item?.querySelector(":scope > .pushpin");
    if (!head) return null;
    const origin = layer.getBoundingClientRect();
    const scale = origin.width / layer.clientWidth || 1;
    const box = head.getBoundingClientRect();
    return {
      x: (box.left + box.width / 2 - origin.left) / scale,
      y: (box.top + box.height / 2 - origin.top) / scale,
    };
  }

  // A slightly sagging curve, as string hangs between two pins.
  function draw() {
    layer.replaceChildren();
    strings.forEach(([a, b], index) => {
      const from = headOf(a);
      const to = headOf(b);
      if (!from || !to) return;
      const sag = Math.hypot(to.x - from.x, to.y - from.y) * 0.1;
      const d = `M${from.x} ${from.y} Q${(from.x + to.x) / 2} ${(from.y + to.y) / 2 + sag} ${to.x} ${to.y}`;
      const group = svg("g", { class: "string", "data-index": index });
      group.append(svg("path", { d, class: "string-hit" }), svg("path", { d, class: "string-line" }));
      layer.append(group);
    });
  }

  function setThreading(on) {
    threading = on;
    first?.classList.remove("string-first");
    first = null;
    stage.classList.toggle("threading", on);
    spool.classList.toggle("active", on);
  }

  function tie(item) {
    if (!first) {
      first = item;
      item.classList.add("string-first");
      return;
    }
    const a = first.dataset.pin;
    const b = item.dataset.pin;
    const exists = strings.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
    if (a !== b && !exists) {
      strings.push([a, b]);
      onChange(strings);
    }
    first.classList.remove("string-first");
    first = null;
    draw();
  }

  spool.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setThreading(!threading);
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && threading) setThreading(false);
  });

  draw();

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
        draw();
        return true;
      }
      return false;
    },
    redraw: draw,
    // Put the spool down, e.g. when another tool is picked up.
    stop() {
      if (threading) setThreading(false);
    },
  };
}
