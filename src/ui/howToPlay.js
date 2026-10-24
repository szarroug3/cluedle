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
  ["Red string", "Tie string between pins to keep your thinking straight. It’s yours; the case never reads it."],
  ["Your rank", "Solve it fast and thorough to earn your rank. A new case every day."],
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
