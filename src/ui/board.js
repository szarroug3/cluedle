// The murder board: lays out every pin from the case data on a fixed 1600×1000 stage.
import { BLOT } from "../game/cipher.js";
import { ANCHOR } from "./decoder.js";

export const STAGE_WIDTH = 1600;
export const STAGE_HEIGHT = 1000;

// Default positions (inside the board's frame) and tilt for each pin type.
// A pin in the case data can override its slot with `pos: { x, y, r }`.
const LAYOUT = {
  clipping: { x: 492, y: 22, r: -0.8 },
  suspects: [
    { x: 34, y: 22, r: -2 },
    { x: 258, y: 30, r: 1.5 },
    { x: 38, y: 202, r: 1 },
    { x: 262, y: 210, r: -1.2 },
    { x: 34, y: 382, r: -0.6 },
    { x: 258, y: 390, r: 1.8 },
  ],
  motives: [
    { x: 494, y: 494, r: 1 },
    { x: 674, y: 500, r: -1.2 },
    { x: 854, y: 494, r: 0.6 },
    { x: 498, y: 596, r: -0.8 },
    { x: 678, y: 602, r: 1.4 },
    { x: 856, y: 596, r: -1 },
  ],
  weapons: [
    { x: 1058, y: 24, r: 1.2 },
    { x: 1306, y: 30, r: -1 },
    { x: 1062, y: 150, r: -1.5 },
    { x: 1310, y: 156, r: 0.8 },
    { x: 1058, y: 276, r: 0.6 },
    { x: 1306, y: 282, r: -1.4 },
  ],
  photo: { x: 1066, y: 440, r: 3 },
  evidence: [
    { x: 1338, y: 430, r: -4 },
    { x: 512, y: 720, r: 1.5 },
    { x: 1332, y: 590, r: 2.5 },
  ],
  clues: [
    { x: 34, y: 580, r: -1 },
    { x: 258, y: 586, r: 1.2 },
    { x: 36, y: 714, r: 0.6 },
    { x: 260, y: 718, r: -1.3 },
  ],
  blankCard: { x: 770, y: 704, r: -2 },
};

const PORTRAIT = `
  <svg viewBox="40 10 96 108" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
    <circle cx="88" cy="48" r="22" fill="#16131b"/>
    <path d="M38 118 C40 80 136 80 138 118 Z" fill="#16131b"/>
  </svg>`;

const GLASSHOUSE = `
  <svg viewBox="0 0 200 140" aria-hidden="true">
    <defs>
      <linearGradient id="photo-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#9a96a3"/>
        <stop offset="1" stop-color="#55515e"/>
      </linearGradient>
    </defs>
    <rect width="200" height="140" fill="url(#photo-sky)"/>
    <rect y="112" width="200" height="28" fill="#2a2730"/>
    <path d="M30 114 V72 Q100 20 170 72 V114 Z" fill="#c9c5d0" fill-opacity="0.35" stroke="#1e1b24" stroke-width="2"/>
    <path d="M50 114V60 M70 114V50 M90 114V45 M110 114V45 M130 114V50 M150 114V60 M30 92H170"
          stroke="#1e1b24" stroke-width="1.2" fill="none"/>
    <path d="M92 114 V96 H108 V114" fill="#1e1b24"/>
    <circle cx="20" cy="104" r="9" fill="#2a2730"/><circle cx="182" cy="100" r="12" fill="#2a2730"/>
  </svg>`;

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

// A pinned item: a positioned, tilted wrapper with a pushpin and the paper underneath.
function pinItem(pinId, kind, slot, override, paper) {
  const pos = { ...slot, ...(override || {}) };
  const item = el("div", `pin-item pin-${kind}`);
  item.dataset.pin = pinId;
  item.style.left = `${pos.x}px`;
  item.style.top = `${pos.y}px`;
  item.style.setProperty("--rot", `${pos.r || 0}deg`);
  item.append(el("span", "pushpin"), paper);
  return item;
}

function clippingPaper(clipping) {
  const paper = el("article", "paper clipping");
  paper.append(
    el("div", "masthead", clipping.masthead),
    el("h1", "headline", clipping.headline),
    el("div", "dateline", clipping.dateline),
  );
  const body = el("div", "story");
  for (const para of clipping.body.split("\n")) body.append(el("p", null, para));
  paper.append(body);
  return paper;
}

function suspectPaper(suspect, index) {
  const paper = el("div", "paper suspect");
  const portrait = el("div", "portrait");
  portrait.innerHTML = PORTRAIT;
  const heading = el("div", "suspect-heading");
  heading.append(el("div", "card-label", `Suspect No. ${index + 1}`), el("h2", "suspect-name", suspect.name), el("div", "suspect-role", suspect.role));
  const top = el("div", "suspect-top");
  top.append(portrait, heading);
  // A typed slip peeking out from under the card: their statement, read by clicking the card.
  paper.append(top, el("p", "suspect-desc", suspect.description), el("div", "statement-tab", "Statement \u25b8"));
  return paper;
}

function motivePaper(motive) {
  const paper = el("div", "paper motive");
  paper.append(el("div", "card-label", "Motive"), el("p", "motive-text", motive.text));
  return paper;
}

// Weapon cards: an evidence tag on a loop of string.
function weaponPaper(weapon) {
  const paper = el("div", "paper weapon");
  paper.append(
    el("span", "tag-hole"),
    el("div", "card-label", "Weapon"),
    el("h3", "weapon-name", weapon.name),
    el("div", "weapon-detail", weapon.detail),
  );
  return paper;
}

function photoPaper(caseData, scrawlText) {
  const paper = el("figure", "paper photo");
  const image = el("div", "photo-image");
  image.innerHTML = GLASSHOUSE;
  paper.append(image, el("figcaption", "photo-caption", caseData.photo.caption));
  if (caseData.cipher.hiddenOn === "photo") paper.append(scrawl(scrawlText));
  return paper;
}

// The hidden encrypted clue: pencil like the other scraps, only the start of the message,
// signed with the little anchor that points to the key. Nothing announces it.
function scrawl(text) {
  const node = el("div", "scrawl hand");
  node.dataset.pin = "scrawl";
  fillScrawl(node, text);
  return node;
}

function fillScrawl(node, text) {
  node.replaceChildren();
  for (const ch of `${text.slice(0, 22).trim()}\u2026`) node.append(ch === BLOT ? el("span", "blot", "M") : ch);
  node.insertAdjacentHTML("beforeend", ANCHOR);
}

// Each wrong answer runs more ink over the scrawl.
export function updateScrawl(stage, text) {
  fillScrawl(stage.querySelector('[data-pin="scrawl"]'), text);
}

// Decoy scraps: a printed label with a handwritten note.
function evidencePaper(item) {
  const paper = el("div", `paper evidence evidence-${item.kind}`);
  if (item.kind === "prescription") paper.append(el("span", "rx", "\u211e"));
  paper.append(el("div", "evidence-label", item.label), el("div", "evidence-note hand", item.note));
  return paper;
}

// The blank card where the player writes the decoded message. Once cracked, it holds the message.
function blankCardPaper() {
  const paper = el("div", "paper blank-card");
  paper.setAttribute("role", "button");
  paper.setAttribute("aria-label", "Blank card: write a decoded message");
  paper.tabIndex = 0;
  return paper;
}

export function fillBlankCard(stage, text) {
  const item = stage.querySelector('[data-pin="blank-card"]');
  const paper = item.querySelector(".blank-card");
  if (paper.classList.contains("filled")) return;
  const body = el("p", "decoded-text");
  for (const ch of text) body.append(ch === BLOT ? el("span", "blot", "M") : ch);
  paper.classList.add("filled");
  paper.setAttribute("aria-label", "Decoded message");
  paper.append(el("div", "card-label", "Decoded"), body);
  item.classList.add("just-pinned");
}

// A clue pinned into its slot after a wrong guess.
export function pinClue(stage, index, text, { animate = true } = {}) {
  const slot = stage.querySelector(`.clue-slot[data-clue="${index}"]`);
  if (!slot) return;
  const paper = el("div", "paper clue");
  paper.append(el("div", "card-label", `Clue ${index + 1}`), el("p", "clue-text", text));
  const item = pinItem(`clue:${index}`, "clue", LAYOUT.clues[index], null, paper);
  if (animate) item.classList.add("just-pinned");
  slot.replaceWith(item);
}

// A spent guess on the rail shows how many of its three parts were right.
export function markGuessSpent(stage, index, rightCount) {
  const shell = stage.querySelectorAll(".shell")[index];
  shell.classList.add("spent");
  shell.textContent = `${rightCount}/3`;
  shell.title = `Guess ${index + 1}: ${rightCount} of 3 right`;
}

function clueSlot(index, slot) {
  const node = el("div", "clue-slot", "Pending");
  node.dataset.clue = String(index);
  node.style.left = `${slot.x}px`;
  node.style.top = `${slot.y}px`;
  node.style.setProperty("--rot", `${slot.r || 0}deg`);
  return node;
}

function rail(caseData, caseNumber) {
  const bar = el("div", "rail");

  const help = el("button", "help-button", "?");
  help.type = "button";
  help.setAttribute("aria-label", "How to play");

  const tray = el("div", "rail-group");
  const stamps = el("div", "tray");
  for (const [kind, label] of [["guilty", "GUILTY"], ["liar", "LIAR"]]) {
    const stamp = el("div", `stamp stamp-${kind}`);
    stamp.append(el("span", "stamp-knob"), el("span", "stamp-block"), el("span", "stamp-face", label));
    stamps.append(stamp);
  }
  tray.append(stamps, el("div", "rail-label", "Stamps"));

  const spool = el("div", "rail-group");
  spool.append(el("div", "spool"), el("div", "rail-label", "String"));

  const guesses = el("div", "rail-group");
  const shells = el("div", "shells");
  for (let i = 0; i < 5; i++) shells.append(el("span", "shell"));
  guesses.append(shells, el("div", "rail-label", "Guesses left"));

  const tag = el("div", "case-tag");
  tag.append(el("div", "case-number", `Case #${caseNumber}`), el("div", "case-title", caseData.title));

  bar.append(help, tray, spool, guesses, tag);
  return bar;
}

export function renderBoard(caseData, { caseNumber, scrawlText }) {
  const stage = el("div", "stage");
  const board = el("section", "board");
  board.setAttribute("aria-label", `Murder board: ${caseData.title}`);

  board.append(pinItem("clipping", "clipping", LAYOUT.clipping, caseData.clipping.pos, clippingPaper(caseData.clipping)));

  caseData.suspects.forEach((s, i) =>
    board.append(pinItem(`suspect:${s.id}`, "suspect", LAYOUT.suspects[i], s.pos, suspectPaper(s, i))),
  );
  caseData.motives.forEach((m, i) =>
    board.append(pinItem(`motive:${m.id}`, "motive", LAYOUT.motives[i], m.pos, motivePaper(m))),
  );
  caseData.weapons.forEach((w, i) =>
    board.append(pinItem(`weapon:${w.id}`, "weapon", LAYOUT.weapons[i], w.pos, weaponPaper(w))),
  );
  board.append(pinItem("photo", "photo", LAYOUT.photo, caseData.photo.pos, photoPaper(caseData, scrawlText)));
  (caseData.evidence || []).forEach((e, i) =>
    board.append(pinItem(`evidence:${e.id}`, "evidence", LAYOUT.evidence[i], e.pos, evidencePaper(e))),
  );
  board.append(pinItem("blank-card", "blank-card", LAYOUT.blankCard, null, blankCardPaper()));
  caseData.clues.forEach((_, i) => board.append(clueSlot(i, LAYOUT.clues[i])));

  board.append(el("div", "lamp"));
  stage.append(board, rail(caseData, caseNumber));
  return stage;
}
