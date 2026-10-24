// The case ending, laid over the board: CASE CLOSED or GONE COLD, what really happened,
// who was saved or what it cost, the detective rank, and the share card.
import { openOverlay } from "./decoder.js";

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

// Copy the card to the clipboard; if that's blocked, show it selected so it can be copied by hand.
async function copyShare(text, where, button) {
  try {
    await navigator.clipboard.writeText(text);
    button.textContent = "Copied";
  } catch {
    const box = el("textarea", "share-fallback");
    box.value = text;
    box.readOnly = true;
    box.rows = text.split("\n").length;
    where.replaceChildren(el("div", "card-label", "Copy it by hand"), box);
    box.focus();
    box.select();
  }
}

export function showEnding(stage, caseData, status, { rank, share }) {
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

  const footer = el("div", "ending-footer");
  if (rank) {
    const badge = el("div", "ending-rank");
    badge.append(el("div", "card-label", "Your rank"), el("div", "rank-name", rank));
    footer.append(badge);
  }
  const shareSpot = el("div", "share-spot");
  const copy = el("button", "copy-button", "Copy share card");
  copy.type = "button";
  copy.addEventListener("click", () => copyShare(share, shareSpot, copy));
  shareSpot.append(copy);
  footer.append(shareSpot);
  card.append(footer);
  openOverlay(stage, card);
}
