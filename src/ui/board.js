// The murder board: lays out every pin from the case data on a fixed 1600×1000 stage.
import { BLOT } from "../game/cipher.js";
import { DOODLES, inkBlot } from "./decoder.js";

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

// The pinned photograph's scene, per case. Drawn in greys; the photo filter makes it black and white.
const PHOTO_SCENES = {
  glasshouse: `
    <svg viewBox="0 0 200 140" aria-hidden="true">
      <rect width="200" height="140" fill="#77737f"/>
      <rect width="200" height="70" fill="#9a96a3"/>
      <rect y="112" width="200" height="28" fill="#2a2730"/>
      <path d="M30 114 V72 Q100 20 170 72 V114 Z" fill="#c9c5d0" fill-opacity="0.35" stroke="#1e1b24" stroke-width="2"/>
      <path d="M50 114V60 M70 114V50 M90 114V45 M110 114V45 M130 114V50 M150 114V60 M30 92H170"
            stroke="#1e1b24" stroke-width="1.2" fill="none"/>
      <path d="M92 114 V96 H108 V114" fill="#1e1b24"/>
      <circle cx="20" cy="104" r="9" fill="#2a2730"/><circle cx="182" cy="100" r="12" fill="#2a2730"/>
    </svg>`,
  theater: `
    <svg viewBox="0 0 200 140" aria-hidden="true">
      <rect width="200" height="140" fill="#2a2730"/>
      <path d="M100 0 L60 112 H140 Z" fill="#c9c5d0" fill-opacity="0.25"/>
      <rect y="112" width="200" height="28" fill="#4c4855"/>
      <path d="M0 0 H62 Q50 60 58 112 H0 Z M200 0 H138 Q150 60 142 112 H200 Z" fill="#55515e"/>
      <path d="M12 0 Q8 60 14 112 M28 0 Q22 60 30 112 M44 0 Q38 60 44 112 M188 0 Q192 60 186 112 M172 0 Q178 60 170 112 M156 0 Q162 60 156 112"
            stroke="#2a2730" stroke-width="2" fill="none"/>
      <rect width="200" height="12" fill="#3b3742"/>
      <circle cx="100" cy="100" r="7" fill="#1e1b24"/><path d="M93 112 Q100 94 107 112 Z" fill="#1e1b24"/>
    </svg>`,
  train: `
    <svg viewBox="0 0 200 140" aria-hidden="true">
      <rect width="200" height="140" fill="#8e8a97"/>
      <path d="M0 40 H200 V0 H0 Z" fill="#6e6a77"/>
      <path d="M10 20 V60 M60 20 V60 M110 20 V60 M160 20 V60 M0 20 H200" stroke="#4c4855" stroke-width="3"/>
      <rect y="112" width="200" height="28" fill="#3b3742"/>
      <path d="M0 116 H200 M0 124 H200" stroke="#1e1b24" stroke-width="2"/>
      <path d="M30 108 V70 H120 V60 H140 V70 H175 Q190 70 190 90 V108 Z" fill="#1e1b24"/>
      <path d="M128 60 V48 Q130 40 138 46 V60" fill="#1e1b24"/>
      <circle cx="140" cy="34" r="10" fill="#c9c5d0" fill-opacity="0.5"/><circle cx="158" cy="22" r="14" fill="#c9c5d0" fill-opacity="0.35"/>
      <rect x="44" y="78" width="14" height="12" fill="#c9c5d0" fill-opacity="0.6"/><rect x="68" y="78" width="14" height="12" fill="#c9c5d0" fill-opacity="0.6"/>
      <circle cx="55" cy="110" r="8" fill="#2a2730" stroke="#77737f"/><circle cx="95" cy="110" r="8" fill="#2a2730" stroke="#77737f"/>
      <circle cx="160" cy="108" r="10" fill="#2a2730" stroke="#77737f"/>
    </svg>`,
};

// One guess on the rail: a detective in a fedora, face half in shadow.
const DETECTIVE = `
  <svg class="detective" viewBox="0 0 40 40" aria-hidden="true">
    <path class="detective-face" d="M11 22 Q11 34 20 37 Q29 34 29 22 Z"/>
    <path class="detective-shadow" d="M11 22 Q11 34 20 37 L20 30 L23 26 L20 22 Z"/>
    <path class="detective-hat" d="M13 18 Q12 8 16 6 Q20 8.5 24 6 Q28 8 27 18 Z"/>
    <ellipse class="detective-hat" cx="20" cy="19" rx="17" ry="4.2"/>
    <path class="detective-band" d="M13.4 15.2 Q20 17 26.6 15.2 L26.8 17.6 Q20 19.4 13.2 17.6 Z"/>
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
  image.innerHTML = PHOTO_SCENES[caseData.photo.scene];
  paper.append(image, el("figcaption", "photo-caption", caseData.photo.caption));
  if (caseData.cipher.hiddenOn === "photo") paper.append(scrawl(scrawlText, caseData.cipher.doodle));
  return paper;
}

// The hidden encrypted clue: pencil like the other scraps, only the start of the message,
// signed with the case's doodle that points to the key. Nothing announces it.
function scrawl(text, doodle) {
  const node = el("div", "scrawl hand");
  node.dataset.pin = "scrawl";
  node.dataset.doodle = doodle;
  fillScrawl(node, text);
  return node;
}

function fillScrawl(node, text) {
  node.replaceChildren();
  [...`${text.slice(0, 22).trim()}\u2026`].forEach((ch, i) => node.append(ch === BLOT ? inkBlot(i) : ch));
  node.insertAdjacentHTML("beforeend", DOODLES[node.dataset.doodle]);
}

// Each wrong answer runs more ink over the scrawl.
export function updateScrawl(stage, text) {
  fillScrawl(stage.querySelector('[data-pin="scrawl"]'), text);
}

// Scraps of evidence: a printed label with a handwritten note. The case may hide the scrawl on one.
function evidencePaper(item, caseData, scrawlText) {
  const paper = el("div", `paper evidence evidence-${item.kind}`);
  if (item.kind === "prescription") paper.append(el("span", "rx", "\u211e"));
  paper.append(el("div", "evidence-label", item.label), el("div", "evidence-note hand", item.note));
  if (caseData.cipher.hiddenOn === `evidence:${item.id}`) paper.append(scrawl(scrawlText, caseData.cipher.doodle));
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
  [...text].forEach((ch, i) => body.append(ch === BLOT ? inkBlot(i) : ch));
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
  const guess = stage.querySelectorAll(".guess")[index];
  guess.classList.add("spent");
  guess.querySelector(".guess-count").textContent = `${rightCount}/3`;
  guess.title = `Guess ${index + 1}: ${rightCount} of 3 right`;
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
  const detectives = el("div", "guess-row");
  for (let i = 0; i < 5; i++) {
    const guess = el("div", "guess");
    guess.innerHTML = DETECTIVE;
    guess.append(el("span", "guess-count"));
    detectives.append(guess);
  }
  guesses.append(detectives, el("div", "rail-label", "Guesses left"));

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
    board.append(pinItem(`evidence:${e.id}`, "evidence", LAYOUT.evidence[i], e.pos, evidencePaper(e, caseData, scrawlText))),
  );
  board.append(pinItem("blank-card", "blank-card", LAYOUT.blankCard, null, blankCardPaper()));
  caseData.clues.forEach((_, i) => board.append(clueSlot(i, LAYOUT.clues[i])));

  board.append(el("div", "lamp"));
  stage.append(board, rail(caseData, caseNumber));
  return stage;
}
