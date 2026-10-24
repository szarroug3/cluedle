// Cards brought forward over the board: a close look at any scrap, and the blank card where the
// player writes the message they decoded. The wheels on the blank card are only a helper; nothing
// is decoded or checked until the player pins their answer.
import { isLocked, BLOT, MAX_TRIES } from "../game/cipher.js";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const STEP = 360 / 26;
const SVG_NS = "http://www.w3.org/2000/svg";

export const ANCHOR = `
  <svg class="anchor" viewBox="0 0 20 24" aria-hidden="true">
    <circle cx="10" cy="4" r="2.6"/>
    <path d="M10 6.5V21 M5 10.5H15 M3 15c1 4.5 4 6 7 6s6-1.5 7-6 M3 15l-1.5 1.8 M17 15l1.5 1.8"/>
  </svg>`;

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

// A dimmed layer over the board holding one card. Escape, the ×, or a click outside closes it.
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
}

// Text as spans grouped into words, with BLOT characters drawn as ink.
export function renderInked(container, text) {
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

// Any scrap, the scrawl included, opens the same plain close-up.
export function openCloseLook(stage, { kind, label, note, anchor }) {
  const card = el("div", `paper close-look evidence-${kind}`);
  card.setAttribute("role", "dialog");
  card.setAttribute("aria-label", label);
  const writing = el("div", "close-look-note hand");
  renderInked(writing, note);
  if (anchor) writing.insertAdjacentHTML("beforeend", ANCHOR);
  card.append(el("div", "evidence-label", label), writing);
  openOverlay(stage, card);
}

// A suspect's statement, brought forward when their card is clicked.
export function openStatement(stage, suspect) {
  const card = el("div", "paper statement-open");
  card.setAttribute("role", "dialog");
  card.setAttribute("aria-label", `Statement of ${suspect.name}`);
  card.append(
    el("div", "card-label", "Statement of"),
    el("h2", "statement-name", suspect.name),
    el("div", "suspect-role", suspect.role),
    el("p", "statement-quote", `“${suspect.statement.text}”`),
  );
  openOverlay(stage, card);
}

// Two alphabet rings; either can be dragged around the hub. The hub shows how far apart they sit.
function buildWheel() {
  const wheel = svg("svg", { viewBox: "-130 -130 260 260", class: "wheel-svg", "aria-hidden": "true" });
  const outer = svg("g", { class: "ring ring-outer" });
  const inner = svg("g", { class: "ring ring-inner" });
  outer.append(svg("circle", { r: 126, class: "wheel-outer" }));
  inner.append(svg("circle", { r: 98, class: "wheel-inner" }));
  [...ALPHABET].forEach((letter, i) => {
    const a = svg("text", { class: "wheel-letter", transform: `rotate(${i * STEP}) translate(0 -108)` });
    a.textContent = letter;
    outer.append(a);
    const b = svg("text", { class: "wheel-letter", transform: `rotate(${i * STEP}) translate(0 -80)` });
    b.textContent = letter;
    inner.append(b);
  });
  const pointer = svg("path", { d: "M0 -130 L-6 -140 H6 Z", class: "wheel-pointer" });
  const number = svg("text", { class: "wheel-number", y: 14 });
  wheel.append(outer, inner, svg("circle", { r: 52, class: "wheel-hub" }), number, pointer);
  return { wheel, outer, inner, number };
}

function cipherWheel() {
  const turns = { outer: 0, inner: 0 };
  const { wheel, outer, inner, number } = buildWheel();
  const dial = el("div", "wheel");
  dial.tabIndex = 0;
  dial.setAttribute("role", "group");
  dial.setAttribute("aria-label", "Cipher wheels: drag either ring, or use the arrow keys to turn the inner one");
  dial.append(wheel);

  function draw() {
    outer.style.transform = `rotate(${turns.outer * STEP}deg)`;
    inner.style.transform = `rotate(${turns.inner * STEP}deg)`;
    const offset = (((turns.inner - turns.outer) % 26) + 26) % 26;
    number.textContent = String(offset);
  }

  const angleAt = (event) => {
    const box = dial.getBoundingClientRect();
    return (Math.atan2(event.clientY - (box.top + box.height / 2), event.clientX - (box.left + box.width / 2)) * 180) / Math.PI;
  };
  const ringAt = (event) => {
    const box = dial.getBoundingClientRect();
    const dx = event.clientX - (box.left + box.width / 2);
    const dy = event.clientY - (box.top + box.height / 2);
    return (Math.hypot(dx, dy) / box.width) * 260 > 99 ? "outer" : "inner";
  };

  let drag = null;
  dial.addEventListener("pointerdown", (event) => {
    drag = { ring: ringAt(event), angle: angleAt(event) };
    dial.setPointerCapture(event.pointerId);
  });
  dial.addEventListener("pointermove", (event) => {
    if (!drag) return;
    let delta = angleAt(event) - drag.angle;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    const steps = Math.round(delta / STEP);
    if (steps !== 0) {
      turns[drag.ring] += steps;
      drag.angle = angleAt(event);
      draw();
    }
  });
  dial.addEventListener("pointerup", () => (drag = null));
  dial.addEventListener("pointercancel", () => (drag = null));

  const turn = (steps) => {
    turns.inner += steps;
    draw();
  };
  dial.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowUp") turn(1);
    else if (event.key === "ArrowLeft" || event.key === "ArrowDown") turn(-1);
    else return;
    event.preventDefault();
  });

  const back = el("button", "wheel-turn", "◀");
  const forward = el("button", "wheel-turn", "▶");
  back.type = forward.type = "button";
  back.setAttribute("aria-label", "Turn the inner ring back");
  forward.setAttribute("aria-label", "Turn the inner ring forward");
  back.addEventListener("click", () => turn(-1));
  forward.addEventListener("click", () => turn(1));

  const row = el("div", "wheel-row");
  row.append(back, dial, forward);
  draw();
  return row;
}

// The blank card: write the decoded message and pin it. `readable()` is the message as it can
// still be read (with blots), shown when the answer is right.
export function openBlankCard(stage, { state, readable, onSubmit, onClose }) {
  let current = state;

  const card = el("div", "paper blank-card-open");
  card.setAttribute("role", "dialog");
  card.setAttribute("aria-label", "Blank card");

  const answer = el("textarea", "answer");
  answer.rows = 4;
  answer.spellcheck = false;
  answer.placeholder = "Write what it really says…";
  answer.setAttribute("aria-label", "Your decoded message");
  const revealed = el("div", "revealed");

  const tries = el("div", "tries");
  const pinButton = el("button", "pin-button", "Pin it");
  pinButton.type = "button";
  const status = el("p", "decoder-status");
  status.setAttribute("aria-live", "polite");

  const side = el("div", "decoder-side");
  side.append(el("div", "card-label", "Tries left"), tries, pinButton, status);
  const controls = el("div", "decoder-controls");
  controls.append(cipherWheel(), side);

  card.append(
    el("div", "card-label", "Blank card"),
    el("h2", "decoder-title", "Crack it on paper. Write what it really says."),
    answer,
    revealed,
    controls,
  );

  function refresh() {
    const locked = isLocked(current);
    tries.replaceChildren(
      ...Array.from({ length: MAX_TRIES }, (_, i) => el("span", i < MAX_TRIES - current.wrongTries ? "drop" : "drop spent")),
    );
    answer.disabled = locked;
    pinButton.disabled = locked || !/[a-z]/i.test(answer.value);
    if (current.cracked) status.textContent = "Cracked. Pinned to the board.";
    else if (locked) status.textContent = "The ink’s run. Whatever it said, it’s gone.";
    else if (current.wrongTries > 0) status.textContent = "That’s not it. The ink runs on the scrawl.";
    else status.textContent = "Three tries. Every wrong one costs you ink.";
  }

  // The real message flips in, letter by letter; blots stay as ink.
  function reveal() {
    answer.hidden = true;
    revealed.hidden = false;
    const text = readable();
    const spans = renderInked(revealed, text);
    const plain = [...text.replace(/ /g, "")];
    spans.forEach((span, i) => {
      if (span.classList.contains("blot")) return;
      span.textContent = " ";
      setTimeout(() => {
        span.textContent = plain[i];
        span.classList.add("flip");
      }, 120 + i * 28);
    });
  }

  function submit() {
    if (pinButton.disabled) return;
    const result = onSubmit(answer.value);
    current = result.state;
    if (result.correct) {
      reveal();
    } else {
      card.classList.remove("shake");
      void card.offsetWidth;
      card.classList.add("shake");
    }
    refresh();
  }

  answer.addEventListener("input", refresh);
  answer.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  });
  pinButton.addEventListener("click", submit);

  revealed.hidden = !current.cracked;
  answer.hidden = current.cracked;
  if (current.cracked) renderInked(revealed, readable());
  refresh();
  openOverlay(stage, card, onClose);
  if (!current.cracked) answer.focus();
}
