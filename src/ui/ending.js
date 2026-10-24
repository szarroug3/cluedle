// The case ending, laid over the board: CASE CLOSED or GONE COLD, what really happened,
// and who was saved or what it cost.
import { openOverlay } from "./decoder.js";

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

export function showEnding(stage, caseData, status) {
  const closed = status === "closed";
  const ending = closed ? caseData.endings.closed : caseData.endings.cold;
  const { suspectId, motiveId, weaponId } = caseData.solution;

  const card = el("div", `paper ending ending-${status}`);
  card.setAttribute("role", "dialog");
  card.setAttribute("aria-label", ending.headline);
  card.append(el("div", "ending-stamp", ending.headline));

  if (!closed) {
    const answer = el("dl", "ending-answer");
    const rows = [
      ["Who", caseData.suspects.find((s) => s.id === suspectId).name],
      ["Why", caseData.motives.find((m) => m.id === motiveId).text],
      ["How", caseData.weapons.find((w) => w.id === weaponId).name],
    ];
    for (const [label, value] of rows) answer.append(el("dt", null, label), el("dd", null, value));
    card.append(answer);
  }

  card.append(
    el("p", "ending-text", ending.text),
    el("div", "card-label", closed ? "Who was saved" : "What it cost"),
    el("p", "ending-aftermath", closed ? ending.saved : ending.cost),
  );
  openOverlay(stage, card);
}
