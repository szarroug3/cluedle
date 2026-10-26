// The player's own notes. A stack of blank index cards on the rail: take one, write a line on it
// ("9:15 cab", "scream on a record?"), and it's pinned to the board like any card, so it can be
// moved and tied with string. And a notepad on the rail for longer working, which stays open beside
// whatever else the player has open. Neither touches the
// rules; both are saved with the day's progress.
import { openOverlay } from "./decoder.js";

const MAX_CARDS = 10;
const CARD_LENGTH = 90;
const PAD_LENGTH = 3000;

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

// New cards land in the open corner below the photo, each a little lower and to the left.
function landingSpot(count) {
  return { x: 1350 - (count % 5) * 22, y: 676 + (count % 5) * 14, r: ((count * 7) % 5) - 2 };
}

export function createNotes(stage, { progress, string, mover, onChange }) {
  const board = stage.querySelector(".board");

  // The rail: the stack of cards and the notepad.
  const group = el("div", "rail-group desk");
  const tools = el("div", "desk-tools");
  const stack = el("button", "card-stack");
  stack.type = "button";
  const padButton = el("button", "notepad-button");
  padButton.type = "button";
  padButton.setAttribute("aria-label", "Open the notepad");
  padButton.append(el("span", "notepad-lines"));
  tools.append(stack, padButton);
  group.append(tools, el("div", "rail-label", "Notes"));
  stage.querySelector(".case-tag").before(group);

  function refreshStack() {
    const left = MAX_CARDS - progress.notes.length;
    stack.disabled = left === 0;
    stack.dataset.left = String(left);
    stack.setAttribute("aria-label", left ? `Take a blank index card (${left} left)` : "No index cards left");
  }

  function cardItem(note) {
    const item = el("div", "pin-item pin-note");
    item.dataset.pin = `note:${note.id}`;
    item.style.left = `${note.x}px`;
    item.style.top = `${note.y}px`;
    item.style.setProperty("--rot", `${note.r}deg`);
    const paper = el("div", "paper index-card");
    paper.append(el("p", "index-text", note.text));
    item.append(el("span", "pushpin"), paper);
    return item;
  }

  function edit(note) {
    const item = board.querySelector(`[data-pin="note:${note.id}"]`);
    const card = el("div", "paper index-card index-card-open");
    card.setAttribute("role", "dialog");
    card.setAttribute("aria-label", "Index card");
    const text = el("textarea", "index-input");
    text.maxLength = CARD_LENGTH;
    text.value = note.text;
    text.placeholder = "Write a note…";
    text.setAttribute("aria-label", "Note");
    text.addEventListener("input", () => {
      note.text = text.value;
      item.querySelector(".index-text").textContent = note.text;
      onChange();
    });
    const tear = el("button", "index-remove", "Take it down");
    tear.type = "button";
    tear.addEventListener("click", () => {
      remove(note);
      card.closest(".overlay").querySelector(".overlay-close").click();
    });
    card.append(text, tear);
    openOverlay(stage, card);
    text.focus();
  }

  function remove(note) {
    const pinId = `note:${note.id}`;
    board.querySelector(`[data-pin="${pinId}"]`)?.remove();
    string.drop(pinId);
    mover.forget(pinId);
    progress.notes.splice(progress.notes.indexOf(note), 1);
    refreshStack();
    onChange();
  }

  function take() {
    if (progress.notes.length >= MAX_CARDS) return;
    const id = Math.max(0, ...progress.notes.map((n) => n.id)) + 1;
    const note = { id, text: "", ...landingSpot(progress.notes.length) };
    progress.notes.push(note);
    const item = cardItem(note);
    item.classList.add("just-pinned");
    board.querySelector(".string-layer").before(item);
    refreshStack();
    onChange();
    edit(note);
  }

  // The notepad lies open beside everything else, so the player can read a statement or a scrap and
  // write it down at the same time. Drag it by its binding to move it out of the way.
  const pad = el("section", "paper notepad");
  pad.setAttribute("aria-label", "Notepad");
  pad.hidden = true;
  const binding = el("div", "notepad-binding");
  const shut = el("button", "notepad-close", "×");
  shut.type = "button";
  shut.setAttribute("aria-label", "Close the notepad");
  binding.append(el("span", "card-label", "Notepad"), shut);
  const padText = el("textarea", "notepad-input");
  padText.maxLength = PAD_LENGTH;
  padText.value = progress.notepad;
  padText.setAttribute("aria-label", "Notepad");
  padText.placeholder = "Times, names, hunches…";
  padText.addEventListener("input", () => {
    progress.notepad = padText.value;
    onChange();
  });
  pad.append(binding, padText);
  stage.append(pad);

  function togglePad(open = pad.hidden) {
    pad.hidden = !open;
    padButton.classList.toggle("open", open);
    if (open) padText.focus();
  }
  shut.addEventListener("click", () => togglePad(false));

  binding.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".notepad-close")) return;
    const scale = stage.getBoundingClientRect().width / stage.offsetWidth || 1;
    const start = { x: event.clientX, y: event.clientY, left: pad.offsetLeft, top: pad.offsetTop };
    const move = (e) => {
      const x = Math.min(Math.max(start.left + (e.clientX - start.x) / scale, 0), stage.offsetWidth - pad.offsetWidth);
      const y = Math.min(Math.max(start.top + (e.clientY - start.y) / scale, 0), stage.offsetHeight - pad.offsetHeight);
      Object.assign(pad.style, { left: `${x}px`, top: `${y}px`, right: "auto", bottom: "auto" });
    };
    const stop = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);
  });

  refreshStack();

  return {
    // Pin every saved card back on the board, under the string.
    restore() {
      const layer = board.querySelector(".string-layer");
      for (const note of progress.notes) layer.before(cardItem(note));
    },
    // Handles a click if it belongs to the notes; returns whether it did.
    handleClick(event) {
      if (event.target.closest(".card-stack")) {
        take();
        return true;
      }
      if (event.target.closest(".notepad-button")) {
        togglePad();
        return true;
      }
      const item = event.target.closest(".pin-note");
      if (item) {
        edit(progress.notes.find((n) => `note:${n.id}` === item.dataset.pin));
        return true;
      }
      return false;
    },
  };
}
