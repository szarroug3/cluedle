// Cards brought forward over the board: a close look at any scrap, and the blank card where the
// player writes the message they decoded. The letter strips on the blank card are only a helper; nothing
// is decoded or checked until the player pins their answer.
import { isLocked, BLOT, MAX_TRIES } from "../game/cipher.js";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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

// Two side-by-side columns of A–Z. Each slides up or down (drag it, or use its arrows) and wraps
// around, so lining them up pairs each scrambled letter with its real one. Clicking a letter writes
// it into the answer. The strips are only a helper; they never decode or check anything.
function letterStrips(onLetter) {
  const offsets = [0, 0];
  const gap = el("div", "strip-gap");
  const columns = offsets.map((_, side) => {
    const column = el("div", "strip");
    column.setAttribute("role", "group");
    column.setAttribute("aria-label", side === 0 ? "Left letter strip" : "Right letter strip");
    return column;
  });

  function draw() {
    columns.forEach((column, side) => {
      column.replaceChildren(
        ...[...ALPHABET].map((_, row) => {
          const letter = ALPHABET[(((row + offsets[side]) % 26) + 26) % 26];
          const key = el("button", "strip-letter", letter);
          key.type = "button";
          key.dataset.letter = letter;
          key.addEventListener("mousedown", (event) => event.preventDefault());
          return key;
        }),
      );
    });
    gap.textContent = String((((offsets[1] - offsets[0]) % 26) + 26) % 26);
  }

  function slide(side, steps) {
    offsets[side] += steps;
    draw();
  }

  // Dragging a strip by one row slides it one letter; a press without a drag is a click.
  let drag = null;
  let dragged = false;
  columns.forEach((column, side) => {
    column.addEventListener("pointerdown", (event) => {
      const rowHeight = column.firstChild.getBoundingClientRect().height;
      drag = { side, y: event.clientY, rowHeight };
      dragged = false;
    });
    column.addEventListener("click", (event) => {
      const key = event.target.closest(".strip-letter");
      if (!key || dragged) return;
      onLetter(key.dataset.letter);
    });
  });
  const onMove = (event) => {
    if (!drag) return;
    const steps = Math.trunc((event.clientY - drag.y) / drag.rowHeight);
    if (steps !== 0) {
      slide(drag.side, -steps);
      drag.y += steps * drag.rowHeight;
      dragged = true;
    }
  };
  const onUp = () => (drag = null);
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);

  const arrows = (side) => {
    const up = el("button", "strip-arrow", "\u25b2");
    const down = el("button", "strip-arrow", "\u25bc");
    up.type = down.type = "button";
    up.setAttribute("aria-label", `Slide the ${side === 0 ? "left" : "right"} strip up`);
    down.setAttribute("aria-label", `Slide the ${side === 0 ? "left" : "right"} strip down`);
    up.addEventListener("click", () => slide(side, 1));
    down.addEventListener("click", () => slide(side, -1));
    return [up, down];
  };

  const panel = el("div", "strips");
  const [leftUp, leftDown] = arrows(0);
  const [rightUp, rightDown] = arrows(1);
  const middle = el("div", "strip-middle");
  middle.append(el("div", "card-label", "Gap"), gap);
  panel.append(
    el("div", "strip-col", null),
    middle,
    el("div", "strip-col", null),
  );
  panel.children[0].append(leftUp, columns[0], leftDown);
  panel.children[2].append(rightUp, columns[1], rightDown);
  draw();

  // Stop listening once the card is gone.
  const watch = new MutationObserver(() => {
    if (!panel.isConnected) {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      watch.disconnect();
    }
  });
  queueMicrotask(() => watch.observe(document.body, { childList: true, subtree: true }));
  return panel;
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

  // Clicked letters, Space, and ⌫ act at the cursor, the same as typing. The cursor is remembered
  // because some browsers forget it once the box loses focus.
  let caret = { start: 0, end: 0 };
  const remember = () => (caret = { start: answer.selectionStart, end: answer.selectionEnd });
  for (const type of ["input", "keyup", "mouseup", "select", "focus"]) answer.addEventListener(type, remember);

  function edit(text, start, end) {
    if (answer.disabled || answer.hidden) return;
    answer.setRangeText(text, start, end, "end");
    answer.focus();
    answer.dispatchEvent(new Event("input"));
  }
  const write = (text) => edit(text, caret.start, caret.end);
  const space = el("button", "key-button", "Space");
  const erase = el("button", "key-button", "\u232b");
  space.type = erase.type = "button";
  erase.setAttribute("aria-label", "Erase a letter");
  space.addEventListener("click", () => write(" "));
  erase.addEventListener("click", () => {
    const { start, end } = caret;
    if (start !== end) edit("", start, end);
    else if (start > 0) edit("", start - 1, start);
  });
  const keys = el("div", "keys");
  keys.append(space, erase);
  for (const button of [space, erase]) button.addEventListener("mousedown", (event) => event.preventDefault());

  const side = el("div", "decoder-side");
  side.append(el("div", "card-label", "Tries left"), tries, pinButton, status);
  const footer = el("div", "decoder-controls");
  footer.append(keys, side);

  const writing = el("div", "blank-writing");
  writing.append(
    el("div", "card-label", "Blank card"),
    el("h2", "decoder-title", "Crack it on paper. Write what it really says."),
    answer,
    revealed,
    footer,
  );
  card.append(letterStrips(write), writing);

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
