// The player's own notes. A stack of blank index cards on the rail: take one, write a line on it
// ("9:15 cab", "scream on a record?"), and it's pinned to the board like any card, so it can be
// moved and tied with string. And a notepad on the rail for longer working. Neither touches the
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

// New cards land in the open corner below the photo, each a little lower and to the right.
function landingSpot(count) {
  return { x: 1010 + (count % 5) * 24, y: 636 + (count % 5) * 16, r: ((count * 7) % 5) - 2 };
}

export function createNotes(stage, { progress, string, mover, onChange }) {
  const board = stage.querySelector(".board");

  // The rail: the stack of cards and the notepad.
  const group = el("div", "rail-group desk");
  const tools = el("div", "desk-tools");
  const stack = el("button", "card-stack");
  stack.type = "button";
  const pad = el("button", "notepad-button");
  pad.type = "button";
  pad.setAttribute("aria-label", "Open the notepad");
  pad.append(el("span", "notepad-lines"));
  tools.append(stack, pad);
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

  function openPad() {
    const card = el("div", "paper notepad");
    card.setAttribute("role", "dialog");
    card.setAttribute("aria-label", "Notepad");
    const text = el("textarea", "notepad-input");
    text.maxLength = PAD_LENGTH;
    text.value = progress.notepad;
    text.setAttribute("aria-label", "Notepad");
    text.placeholder = "Times, names, hunches…";
    text.addEventListener("input", () => {
      progress.notepad = text.value;
      onChange();
    });
    card.append(el("div", "card-label", "Notepad"), text);
    openOverlay(stage, card);
    text.focus();
  }

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
        openPad();
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
