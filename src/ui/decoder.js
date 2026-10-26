// Cards brought forward over the board: a close look at any scrap, and the blank card where the
// player writes the message they decoded. The letter strips on the blank card are only a helper; nothing
// is decoded or checked until the player pins their answer.
import { isLocked, BLOT, MAX_TRIES } from "../game/cipher.js";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// One try on the blank card: a magnifying glass over a fingerprint.
const MAGNIFIER = `
  <svg viewBox="0 0 30 30" aria-hidden="true">
    <g class="try-print">
      <path d="M8.5 15.5q0-5 3.5-5t3.5 4"/><path d="M7 13q1.5-5 5-5t5 4.5"/><path d="M10 16.5q0-3.5 2-3.5t2 3"/>
      <path d="M8.5 18q1 1.5 2.5 1.5 M13.5 17.5q0 1.5 1.5 2.5"/>
    </g>
    <circle class="try-lens" cx="12" cy="13" r="8.5"/>
    <path class="try-handle" d="M18.2 19.2L26.5 27.5"/>
  </svg>`;

// A small mark on the paper that hides the code, away from the code itself; it points toward where
// the key is hidden in the story.
export const DOODLES = {
  anchor: `<svg class="doodle" viewBox="0 0 20 24" aria-hidden="true">
    <circle cx="10" cy="4" r="2.6"/>
    <path d="M10 6.5V21 M5 10.5H15 M3 15c1 4.5 4 6 7 6s6-1.5 7-6 M3 15l-1.5 1.8 M17 15l1.5 1.8"/>
  </svg>`,
  star: `<svg class="doodle" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.5l2.8 6.2 6.7.6-5.1 4.4 1.6 6.6L12 16.8l-6 3.5 1.6-6.6-5.1-4.4 6.7-.6z"/>
  </svg>`,
  train: `<svg class="doodle" viewBox="0 0 28 22" aria-hidden="true">
    <path d="M3 16V8h9v8 M12 11h9l3 5H3 M6 8V4h4v4 M17 11V7h3v4 M1 19h26"/>
    <circle cx="7" cy="18" r="2"/><circle cx="19" cy="18" r="2"/>
  </svg>`,
  moon: `<svg class="doodle" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M15 3a9 9 0 1 0 6 15A7.5 7.5 0 0 1 15 3z"/>
  </svg>`,
  key: `<svg class="doodle" viewBox="0 0 28 18" aria-hidden="true">
    <circle cx="7" cy="9" r="5"/><path d="M12 9H26 M21 9v4 M25 9v3"/>
  </svg>`,
  clock: `<svg class="doodle" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 3"/>
  </svg>`,
  mask: `<svg class="doodle" viewBox="0 0 30 18" aria-hidden="true">
    <path d="M2 5q13-4 26 0q0 9-6 10q-4 0-7-4q-3 4-7 4q-6-1-6-10z"/><path d="M7 8h5 M18 8h5"/>
  </svg>`,
  pen: `<svg class="doodle" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 20l3-8L17 2l5 5-10 10z M4 20l5-1 M7 12l5 5 M12 13l-3 3"/>
  </svg>`,
  bell: `<svg class="doodle" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 17q1-1 1-6a6 6 0 0 1 12 0q0 5 1 6z M3 17h18 M10 20a2 2 0 0 0 4 0 M12 3v2"/>
  </svg>`,
  snowflake: `<svg class="doodle" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2v20 M3.3 7l17.4 10 M3.3 17l17.4-10 M9.5 4l2.5 2 2.5-2 M9.5 20l2.5-2 2.5 2"/>
  </svg>`,
};

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

// A dimmed layer over the board holding one card. Escape, the ×, or a click outside closes it.
export function openOverlay(stage, card, onClose) {
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

// Scraps of evidence come in many kinds of paper. Some are handwritten; these are typed or printed.
export const TYPED_KINDS = ["telegram", "receipt", "classified", "report", "ledger", "slip", "stub", "fingerprint"];

// Small drawings some kinds of paper carry, shared by the board and the close-up.
const PRINT = `<svg viewBox="0 0 40 50"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
  <path d="M20 6c-9 0-14 8-14 18s5 20 14 20 14-10 14-20S29 6 20 6"/><path d="M20 11c-6 0-10 6-10 13s4 15 10 15 10-8 10-15-4-13-10-13"/>
  <path d="M20 16c-4 0-6 4-6 8s2 10 6 10 6-5 6-10-2-8-6-8"/><path d="M20 21c-2 0-2 2-2 3s0 5 2 5 2-3 2-5-1-3-2-3"/></g></svg>`;
export const PAPER_ART = {
  prescription: `<span class="rx">\u211e</span>`,
  tag: `<span class="tag-hole"></span>`,
  key: `<span class="tag-hole"></span><svg class="key-art" viewBox="0 0 80 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="M21 12h52v7M63 12v6M55 12v5"/></svg>`,
  stub: `<span class="stub-holes"><span></span><span></span></span>`,
  envelope: `<span class="postage"></span><span class="postmark"></span>`,
  fingerprint: `<span class="prints">${PRINT}${PRINT}</span>`,
};

// The doodle as a mark tucked in one corner of the paper. Which corner depends on the case, so it
// doesn't always sit in the same place.
export function doodleMark(doodle, seed) {
  const corners = ["top-right", "bottom-right", "bottom-left"];
  const corner = corners[[...seed].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % corners.length];
  const mark = el("span", `paper-doodle ${corner}`);
  mark.innerHTML = DOODLES[doodle];
  return mark;
}

// A ledger's note is its rows, separated by " | ".
export function ledgerRows(note) {
  return note.split(" | ").map((row) => el("div", "ledger-row", row));
}

// One ink splat in a letter's place. Its shape, tilt, size, and height above or below the line
// are picked by position, so the same letter always looks the same and no two neighbours match.
export function inkBlot(position) {
  const blot = el("span", `blot blot-${position % 6}`, "M");
  const spread = (salt) => (((position + 1) * salt) % 97) / 96; // 0..1, scattered
  blot.style.setProperty("--blot-rot", `${(position * 67) % 360}deg`);
  blot.style.setProperty("--blot-scale", (0.7 + spread(53) * 0.65).toFixed(2));
  blot.style.setProperty("--blot-y", `${((spread(29) - 0.5) * 0.5).toFixed(2)}em`);
  return blot;
}

// Text as spans grouped into words, with BLOT characters drawn as ink.
export function renderInked(container, text) {
  container.replaceChildren();
  const spans = [];
  let position = 0;
  for (const word of text.split(" ")) {
    const group = el("span", "word");
    for (const ch of word) {
      const span = ch === BLOT ? inkBlot(position) : el("span", "ch", ch);
      position += 1;
      group.append(span);
      spans.push(span);
    }
    container.append(group, " ");
  }
  return spans;
}

// Any scrap, the scrawl included, opens the same plain close-up.
// A scrap brought forward to read. If it carries the hidden code, the code is part of what it says,
// set in the same hand or type as the rest of the scrap.
export function openCloseLook(stage, { kind, label, note, code, doodle, seed = "", pin = "" }) {
  const card = el("div", `paper close-look evidence-${kind}`);
  card.dataset.look = pin;
  card.setAttribute("role", "dialog");
  card.setAttribute("aria-label", label);
  card.insertAdjacentHTML("afterbegin", PAPER_ART[kind] ?? "");
  const style = TYPED_KINDS.includes(kind) ? "typed" : "hand";
  card.append(el("div", "evidence-label", label));
  if (note) {
    const writing = el("div", `close-look-note ${style}`);
    if (kind === "ledger") writing.append(...ledgerRows(note));
    else writing.textContent = note;
    card.append(writing);
  }
  if (code) {
    const coded = el("div", `close-look-note close-look-code ${style}`);
    renderInked(coded, code);
    card.append(coded);
    if (doodle) card.append(doodleMark(doodle, seed));
  }
  openOverlay(stage, card);
  return card;
}

// A clue brought forward: when it's clicked, and the moment a miss unlocks it.
export function openClue(stage, index, text) {
  const card = el("div", "paper clue clue-open");
  card.setAttribute("role", "dialog");
  card.setAttribute("aria-label", `Clue ${index + 1}`);
  card.dataset.clue = String(index);
  card.append(el("div", "card-label", `Clue ${index + 1}`), el("p", "clue-text", text));
  openOverlay(stage, card);
  return card;
}

// A suspect's statement, brought forward when their card is clicked.
export function openStatement(stage, suspect) {
  const card = el("div", "paper statement-open");
  card.setAttribute("role", "dialog");
  card.setAttribute("aria-label", `Statement of ${suspect.name}`);
  card.dataset.suspect = suspect.id;
  card.append(
    el("div", "card-label", "Statement of"),
    el("h2", "statement-name", suspect.name),
    el("div", "suspect-role", suspect.role),
    el("p", "statement-desc", suspect.description),
    el("p", "statement-quote", `“${suspect.statement.text}”`),
  );
  openOverlay(stage, card);
  return card;
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
  window.addEventListener("pointercancel", onUp);

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

  // Hovering a letter lights up its whole row on both strips, so pairs are easy to read across.
  const lightRow = (row) =>
    columns.forEach((column) =>
      [...column.children].forEach((key, i) => key.classList.toggle("row-hover", i === row)),
    );
  panel.addEventListener("pointerover", (event) => {
    const key = event.target.closest(".strip-letter");
    if (key) lightRow([...key.parentElement.children].indexOf(key));
  });
  panel.addEventListener("pointerleave", () => lightRow(-1));
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
      window.removeEventListener("pointercancel", onUp);
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
      ...Array.from({ length: MAX_TRIES }, (_, i) => {
        const glass = el("span", i < MAX_TRIES - current.wrongTries ? "try" : "try spent");
        glass.innerHTML = MAGNIFIER;
        return glass;
      }),
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
