// The decoder card: the scrawl brought forward with a cipher wheel, Decode, and tries left.
// Turning the wheel only changes a number; the message changes only when Decode is pressed.
import { encode, blotted, isLocked, BLOT, MAX_TRIES } from "../game/cipher.js";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const STEP = 360 / 26;
const SVG_NS = "http://www.w3.org/2000/svg";

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function svg(tag, attrs = {}) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
  return node;
}

// A dimmed layer over the board holding one card. Escape or the × closes it.
function openOverlay(stage, card, onClose) {
  const overlay = el("div", "overlay");
  const close = el("button", "overlay-close", "×");
  close.type = "button";
  close.setAttribute("aria-label", "Close");
  card.prepend(close);
  overlay.append(card);
  stage.append(overlay);

  function dismiss() {
    overlay.remove();
    document.removeEventListener("keydown", onKey);
    onClose?.();
  }
  function onKey(event) {
    if (event.key === "Escape") dismiss();
  }
  close.addEventListener("click", dismiss);
  overlay.addEventListener("click", (event) => event.target === overlay && dismiss());
  document.addEventListener("keydown", onKey);
  return dismiss;
}

// The text as spans, one per letter, grouped into words so lines break between words.
function renderMessage(container, text) {
  container.replaceChildren();
  const spans = [];
  for (const word of text.split(" ")) {
    const group = el("span", "word");
    for (const ch of word) {
      const span = el("span", ch === BLOT ? "blot" : "ch", ch === BLOT ? "M" : ch);
      group.append(span);
      spans.push(span);
    }
    container.append(group, " ");
  }
  return spans;
}

function buildWheel() {
  const wheel = svg("svg", { viewBox: "-130 -130 260 260", class: "wheel-svg", "aria-hidden": "true" });
  wheel.append(svg("circle", { r: 126, class: "wheel-outer" }), svg("circle", { r: 98, class: "wheel-inner" }));

  const outer = svg("g", { class: "ring ring-cipher" });
  const inner = svg("g", { class: "ring ring-plain" });
  [...ALPHABET].forEach((letter, i) => {
    const angle = i * STEP;
    const a = svg("text", { class: "wheel-letter", transform: `rotate(${angle}) translate(0 -108)` });
    a.textContent = letter;
    outer.append(a);
    const b = svg("text", { class: "wheel-letter", transform: `rotate(${angle}) translate(0 -80)` });
    b.textContent = letter;
    inner.append(b);
  });
  const hub = svg("circle", { r: 52, class: "wheel-hub" });
  const number = svg("text", { class: "wheel-number", y: 14 });
  wheel.append(outer, inner, hub, number);
  return { wheel, inner, number };
}

export function openDecoder(stage, { caseData, state, onDecode, onClose }) {
  const { cipher } = caseData;
  let current = state;
  let shift = 0;

  const card = el("div", "paper decoder");
  card.setAttribute("role", "dialog");
  card.setAttribute("aria-label", "Decoder");

  const message = el("div", "decoder-message hand");
  const status = el("p", "decoder-status");
  status.setAttribute("aria-live", "polite");

  const { wheel, inner, number } = buildWheel();
  const dial = el("div", "wheel");
  dial.tabIndex = 0;
  dial.setAttribute("role", "slider");
  dial.setAttribute("aria-label", "Cipher wheel");
  dial.setAttribute("aria-valuemin", "0");
  dial.setAttribute("aria-valuemax", "25");
  dial.append(wheel);

  const back = el("button", "wheel-turn", "◀");
  const forward = el("button", "wheel-turn", "▶");
  back.type = forward.type = "button";
  back.setAttribute("aria-label", "Turn the wheel back");
  forward.setAttribute("aria-label", "Turn the wheel forward");

  const tries = el("div", "tries");
  const decodeButton = el("button", "decode-button", "Decode");
  decodeButton.type = "button";

  const side = el("div", "decoder-side");
  side.append(el("div", "card-label", "Tries left"), tries, decodeButton, status);
  const controls = el("div", "decoder-controls");
  const wheelRow = el("div", "wheel-row");
  wheelRow.append(back, dial, forward);
  controls.append(wheelRow, side);

  card.append(
    el("div", "card-label", "Pencil scrawl"),
    el("h2", "decoder-title", "Somebody wrote this not to be read."),
    message,
    controls,
  );

  function shownText() {
    const text = blotted(cipher.plaintext, current.wrongTries, caseData.id, cipher.keepWords);
    return current.cracked ? text : encode(text, cipher.shift);
  }

  function setShift(value) {
    shift = ((value % 26) + 26) % 26;
    // Plain letter p sits under its cipher letter p + shift.
    inner.style.transform = `rotate(${shift * STEP}deg)`;
    number.textContent = shift === 0 ? "–" : String(shift);
    dial.setAttribute("aria-valuenow", String(shift));
    refresh();
  }

  function refresh() {
    const locked = isLocked(current);
    tries.replaceChildren(
      ...Array.from({ length: MAX_TRIES }, (_, i) => el("span", i < MAX_TRIES - current.wrongTries ? "drop" : "drop spent")),
    );
    decodeButton.disabled = locked || shift === 0;
    back.disabled = forward.disabled = locked;
    dial.classList.toggle("locked", locked);
  }

  function showStatus() {
    if (current.cracked) status.textContent = "Cracked. Pinned to the board.";
    else if (isLocked(current)) status.textContent = "The ink’s run. Whatever it said, it’s gone.";
    else if (current.wrongTries > 0) status.textContent = "Wrong key. The ink runs.";
    else status.textContent = "Set the wheel to the key. Decode when you’re sure.";
  }

  // Letters flip from scrambled to plain, left to right; blots stay as ink.
  function reveal() {
    const plain = [...shownText().replace(/ /g, "")];
    const spans = [...message.querySelectorAll(".ch, .blot")];
    spans.forEach((span, i) => {
      if (span.classList.contains("blot")) return;
      setTimeout(() => {
        span.textContent = plain[i];
        span.classList.add("flip");
      }, 120 + i * 32);
    });
  }

  function press() {
    if (decodeButton.disabled) return;
    const before = current;
    const result = onDecode(shift);
    current = result.state;
    if (result.correct) {
      reveal();
    } else {
      const fresh = renderMessage(message, shownText());
      const old = blotted(cipher.plaintext, before.wrongTries, caseData.id, cipher.keepWords);
      fresh.forEach((span, i) => {
        if (span.classList.contains("blot") && [...old.replace(/ /g, "")][i] !== BLOT) span.classList.add("new-blot");
      });
      card.classList.remove("shake");
      void card.offsetWidth;
      card.classList.add("shake");
    }
    showStatus();
    refresh();
  }

  // Drag the wheel around its hub; each 1/26 of a turn is one step.
  let drag = null;
  const angleAt = (event) => {
    const box = dial.getBoundingClientRect();
    return (Math.atan2(event.clientY - (box.top + box.height / 2), event.clientX - (box.left + box.width / 2)) * 180) / Math.PI;
  };
  dial.addEventListener("pointerdown", (event) => {
    if (isLocked(current)) return;
    drag = { angle: angleAt(event), shift };
    dial.setPointerCapture(event.pointerId);
  });
  dial.addEventListener("pointermove", (event) => {
    if (!drag) return;
    let delta = angleAt(event) - drag.angle;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    // Turning the inner ring clockwise raises the shift.
    const steps = Math.round(delta / STEP);
    if (steps !== 0) {
      drag = { angle: angleAt(event), shift: drag.shift + steps };
      setShift(drag.shift);
    }
  });
  dial.addEventListener("pointerup", () => (drag = null));
  dial.addEventListener("pointercancel", () => (drag = null));
  dial.addEventListener("keydown", (event) => {
    if (isLocked(current)) return;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") setShift(shift + 1);
    else if (event.key === "ArrowLeft" || event.key === "ArrowDown") setShift(shift - 1);
    else if (event.key === "Enter") press();
    else return;
    event.preventDefault();
  });
  back.addEventListener("click", () => setShift(shift - 1));
  forward.addEventListener("click", () => setShift(shift + 1));
  decodeButton.addEventListener("click", press);

  renderMessage(message, shownText());
  setShift(0);
  showStatus();
  openOverlay(stage, card, onClose);
  dial.focus();
}

// A decoy scrap brought forward so its handwriting can be read up close.
export function openCloseLook(stage, item) {
  const card = el("div", `paper close-look evidence-${item.kind}`);
  card.setAttribute("role", "dialog");
  card.setAttribute("aria-label", item.label);
  card.append(el("div", "evidence-label", item.label), el("div", "close-look-note hand", item.note));
  openOverlay(stage, card);
}
