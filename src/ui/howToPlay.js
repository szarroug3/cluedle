// How to play: shown before the first case, and reopened from the ? on the rail.
import { openOverlay } from "./decoder.js";

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

const STEPS = [
  ["Accuse", "Pick up the GUILTY stamp. Stamp a suspect, a motive, and a weapon, then make the accusation."],
  ["Five guesses", "Each accusation tells you how many of the three you got right, never which. Every miss pins up a new clue."],
  ["The liar", "Click a suspect to read their statement. One of them is lying. Stamp LIAR on their card and say what really happened. One shot; it costs no guesses."],
  ["The message", "Something on this board is hiding a message. Find it, crack it on paper, and write it on the blank card. Three tries, and every wrong one costs ink."],
  ["Red string", "Drag from one card to another to tie string between them. On a phone, press and hold a card first. Click a string to take it down. It doesn\u2019t affect your score."],
  ["Your rank", "The fewer guesses you need, the higher your rank. Cracking the code and catching the liar count too. A new case comes out every day."],
];

export function showHowToPlay(stage, { onClose } = {}) {
  const card = el("div", "paper how-to");
  card.setAttribute("role", "dialog");
  card.setAttribute("aria-label", "How to play");
  const list = el("dl", "how-to-steps");
  for (const [term, text] of STEPS) list.append(el("dt", null, term), el("dd", null, text));
  const done = el("button", "open-file", "Got it");
  done.type = "button";
  card.append(el("div", "card-label", "How to work a case"), el("h2", "how-to-title", "Who, why, and how."), list, done);
  openOverlay(stage, card, onClose);
  done.addEventListener("click", () => card.querySelector(".overlay-close").click());
  done.focus();
}
