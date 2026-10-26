// Moving cards around the board. Drag a card by its paper (its pin ties string instead) to set it
// somewhere new, so the player can line things up, say, in the order they happened. Strings stay
// tied and follow. On a touch screen, press and hold the card first. Where each card sits is saved.

const DRAG_START = 6;
const LONG_PRESS = 350;

export function createMover(stage, { positions, string, onChange }) {
  const board = stage.querySelector(".board");
  let drag = null;

  // The board's inner size and the stage's current scale, in the board's own coordinates.
  const scale = () => board.getBoundingClientRect().width / board.offsetWidth || 1;

  function place(item, at) {
    const maxX = board.clientWidth - item.offsetWidth;
    const maxY = board.clientHeight - item.offsetHeight;
    const x = Math.round(Math.min(Math.max(at.x, 0), maxX));
    const y = Math.round(Math.min(Math.max(at.y, 0), maxY));
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    return { x, y };
  }

  // A moved card comes to the top of the pile. Moving it in the page puts it over the others; the
  // strings and the lamp stay above every card.
  function raise(item) {
    const last = [...board.querySelectorAll(".pin-item")].at(-1);
    if (last !== item) last.after(item);
  }

  function start(event) {
    drag.moving = true;
    drag.item.classList.add("moving");
    stage.classList.add("moving-card");
    raise(drag.item);
  }

  function finish() {
    if (!drag) return;
    const { item, moving, timer } = drag;
    clearTimeout(timer);
    drag = null;
    item.classList.remove("moving", "lifting");
    stage.classList.remove("moving-card");
    if (!moving) return;
    positions[item.dataset.pin] = { x: item.offsetLeft, y: item.offsetTop };
    onChange();
  }

  board.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || stage.classList.contains("holding") || stage.classList.contains("marking")) return;
    const item = event.target.closest(".pin-item");
    if (!item || event.target.closest(".string") || string.onHead(item, event.clientX, event.clientY)) return;
    drag = { item, x: event.clientX, y: event.clientY, left: item.offsetLeft, top: item.offsetTop, moving: false };
    drag.touch = event.pointerType !== "mouse";
    if (drag.touch) {
      drag.timer = setTimeout(() => {
        if (!drag) return;
        drag.armed = true;
        item.classList.add("lifting");
        navigator.vibrate?.(10);
      }, LONG_PRESS);
    }
  });

  window.addEventListener("pointermove", (event) => {
    if (!drag) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (!drag.moving) {
      if (Math.hypot(dx, dy) < DRAG_START) return;
      if (drag.touch && !drag.armed) return finish();
      start(event);
    }
    const s = scale();
    place(drag.item, { x: drag.left + dx / s, y: drag.top + dy / s });
    string.follow(drag.item.dataset.pin);
  });

  board.addEventListener(
    "touchmove",
    (event) => {
      if (drag && (drag.armed || drag.moving)) event.preventDefault();
    },
    { passive: false },
  );

  window.addEventListener("pointerup", () => {
    if (!drag) return;
    const wasMoving = drag.moving;
    const wasArmed = drag.armed;
    finish();
    if (!wasMoving && !wasArmed) return;
    // Letting go ends in a click; don't let it open the card that was just moved.
    const swallow = (e) => e.stopPropagation();
    stage.addEventListener("click", swallow, { capture: true, once: true });
    setTimeout(() => stage.removeEventListener("click", swallow, { capture: true }), 0);
  });

  window.addEventListener("pointercancel", finish);

  return {
    // Put every card the player moved back where they left it, e.g. after restoring progress or
    // pinning a clue.
    restore() {
      for (const [pinId, at] of Object.entries(positions)) {
        const item = board.querySelector(`.pin-item[data-pin="${pinId}"]`);
        if (item) place(item, at);
      }
    },
    forget(pinId) {
      delete positions[pinId];
    },
  };
}
