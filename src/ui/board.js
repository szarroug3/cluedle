// The murder board: lays out every pin from the case data on a fixed 1600×1000 stage.
import { encode } from "../game/cipher.js";

export const STAGE_WIDTH = 1600;
export const STAGE_HEIGHT = 1000;

// Default positions (inside the board's frame) and tilt for each pin type.
// A pin in the case data can override its slot with `pos: { x, y, r }`.
const LAYOUT = {
  clipping: { x: 492, y: 22, r: -0.8 },
  suspects: [
    { x: 38, y: 26, r: -2 },
    { x: 260, y: 36, r: 1.5 },
    { x: 44, y: 298, r: 1 },
    { x: 264, y: 308, r: -1.5 },
  ],
  motives: [
    { x: 498, y: 494, r: 1 },
    { x: 770, y: 500, r: -1.2 },
    { x: 504, y: 590, r: -0.8 },
    { x: 776, y: 596, r: 1.4 },
  ],
  statements: [
    { x: 1062, y: 22, r: 1.2 },
    { x: 1308, y: 30, r: -1 },
    { x: 1066, y: 278, r: -1.5 },
    { x: 1312, y: 284, r: 0.8 },
  ],
  photo: { x: 1092, y: 522, r: 3 },
  evidence: [
    { x: 1356, y: 540, r: -4 },
    { x: 1100, y: 768, r: 1.5 },
    { x: 1350, y: 694, r: 2.5 },
  ],
  clues: [
    { x: 40, y: 588, r: -1 },
    { x: 262, y: 598, r: 1.2 },
    { x: 504, y: 694, r: 0.6 },
    { x: 772, y: 700, r: -1.3 },
  ],
};

const PORTRAIT = `
  <svg viewBox="0 0 176 118" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
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
  paper.append(el("div", "card-label", `Suspect No. ${index + 1}`));
  const portrait = el("div", "portrait");
  portrait.innerHTML = PORTRAIT;
  paper.append(
    portrait,
    el("h2", "suspect-name", suspect.name),
    el("div", "suspect-role", suspect.role),
    el("p", "suspect-desc", suspect.description),
  );
  return paper;
}

function motivePaper(motive) {
  const paper = el("div", "paper motive");
  paper.append(el("div", "card-label", "Motive"), el("p", "motive-text", motive.text));
  return paper;
}

function statementPaper(statement) {
  const paper = el("div", "paper statement");
  paper.append(
    el("div", "card-label", "Statement of"),
    el("h3", "witness", statement.witness),
    el("p", "statement-text", `“${statement.text}”`),
  );
  return paper;
}

function photoPaper(caseData) {
  const paper = el("figure", "paper photo");
  const image = el("div", "photo-image");
  image.innerHTML = GLASSHOUSE;
  paper.append(image, el("figcaption", "photo-caption", caseData.photo.caption));
  if (caseData.cipher.hiddenOn === "photo") paper.append(scrawl(caseData.cipher));
  return paper;
}

const ANCHOR = `
  <svg class="anchor" viewBox="0 0 20 24" aria-hidden="true">
    <circle cx="10" cy="4" r="2.6"/>
    <path d="M10 6.5V21 M5 10.5H15 M3 15c1 4.5 4 6 7 6s6-1.5 7-6 M3 15l-1.5 1.8 M17 15l1.5 1.8"/>
  </svg>`;

// The hidden encrypted clue: pencil like the other scraps, only the start of the message,
// signed with the little anchor that points to the key. Nothing announces it.
function scrawl(cipher) {
  const text = encode(cipher.plaintext, cipher.shift);
  const node = el("div", "scrawl hand", `${text.slice(0, 22).trim()}…`);
  node.insertAdjacentHTML("beforeend", ANCHOR);
  node.dataset.pin = "scrawl";
  return node;
}

// Decoy scraps: a printed label with a handwritten note.
function evidencePaper(item) {
  const paper = el("div", `paper evidence evidence-${item.kind}`);
  if (item.kind === "prescription") paper.append(el("span", "rx", "℞"));
  paper.append(el("div", "evidence-label", item.label), el("div", "evidence-note hand", item.note));
  return paper;
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

export function renderBoard(caseData, { caseNumber }) {
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
  caseData.statements.forEach((s, i) =>
    board.append(pinItem(`statement:${s.id}`, "statement", LAYOUT.statements[i], s.pos, statementPaper(s))),
  );
  board.append(pinItem("photo", "photo", LAYOUT.photo, caseData.photo.pos, photoPaper(caseData)));
  (caseData.evidence || []).forEach((e, i) =>
    board.append(pinItem(`evidence:${e.id}`, "evidence", LAYOUT.evidence[i], e.pos, evidencePaper(e))),
  );
  caseData.clues.forEach((_, i) => board.append(clueSlot(i, LAYOUT.clues[i])));

  board.append(el("div", "lamp"));
  stage.append(board, rail(caseData, caseNumber));
  return stage;
}
