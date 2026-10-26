// The murder board: lays out every pin from the case data on a fixed 1600×1000 stage.
import { BLOT } from "../game/cipher.js";
import { inkBlot, TYPED_KINDS, PAPER_ART, ledgerRows, doodleMark } from "./decoder.js";

export const STAGE_WIDTH = 1600;
export const STAGE_HEIGHT = 1000;

// Default positions (inside the board's frame) and tilt for each pin type.
// A pin in the case data can override its slot with `pos: { x, y, r }`.
const LAYOUT = {
  clipping: { x: 768, y: 16, r: -0.8 },
  suspects: [
    { x: 16, y: 14, r: -1.6 },
    { x: 264, y: 20, r: 1.2 },
    { x: 512, y: 14, r: -0.8 },
    { x: 18, y: 274, r: 1 },
    { x: 266, y: 280, r: -1.2 },
    { x: 514, y: 274, r: 1.5 },
  ],
  motives: [
    { x: 768, y: 426, r: 1 },
    { x: 952, y: 432, r: -1.2 },
    { x: 1136, y: 426, r: 0.6 },
    { x: 772, y: 520, r: -0.8 },
    { x: 954, y: 526, r: 1.4 },
    { x: 1138, y: 520, r: -1 },
  ],
  weapons: [
    { x: 1326, y: 14, r: 1.2 },
    { x: 1322, y: 88, r: -1 },
    { x: 1326, y: 162, r: -1.5 },
    { x: 1322, y: 236, r: 0.8 },
    { x: 1326, y: 310, r: 0.6 },
    { x: 1322, y: 384, r: -1.4 },
  ],
  photo: { x: 1330, y: 470, r: 3 },
  evidence: [
    { x: 498, y: 540, r: -2 },
    { x: 790, y: 630, r: 1.5 },
    { x: 1050, y: 630, r: 2.5 },
  ],
  clues: [
    { x: 16, y: 538, r: -1 },
    { x: 250, y: 544, r: 1.2 },
    { x: 18, y: 684, r: 0.6 },
    { x: 252, y: 688, r: -1.3 },
  ],
  blankCard: { x: 488, y: 714, r: -2 },
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
  nightclub: `
    <svg viewBox="0 0 200 140" aria-hidden="true">
      <rect width="200" height="140" fill="#2a2730"/>
      <circle cx="160" cy="26" r="14" fill="#c9c5d0" fill-opacity="0.55"/>
      <path d="M0 96 H200 V140 H0 Z" fill="#3b3742"/>
      <path d="M30 96 V60 Q60 44 90 60 V96 Z" fill="#55515e"/>
      <path d="M36 70 H84 M36 80 H84" stroke="#2a2730" stroke-width="2"/>
      <circle cx="120" cy="74" r="7" fill="#1e1b24"/><path d="M110 96 Q120 78 130 96 Z" fill="#1e1b24"/>
      <path d="M134 70 l14 -10 l3 4 l-14 9 Z" fill="#9a96a3"/>
      <ellipse cx="60" cy="112" rx="18" ry="4" fill="#1e1b24"/><rect x="58" y="112" width="4" height="18" fill="#1e1b24"/>
      <ellipse cx="160" cy="114" rx="16" ry="4" fill="#1e1b24"/><rect x="158" y="114" width="4" height="16" fill="#1e1b24"/>
    </svg>`,
  harbor: `
    <svg viewBox="0 0 200 140" aria-hidden="true">
      <rect width="200" height="140" fill="#8e8a97"/>
      <rect y="84" width="200" height="56" fill="#4c4855"/>
      <path d="M0 96 Q25 92 50 96 T100 96 T150 96 T200 96 M0 112 Q25 108 50 112 T100 112 T150 112 T200 112" stroke="#6e6a77" stroke-width="2" fill="none"/>
      <path d="M150 84 L156 30 H168 L174 84 Z" fill="#2a2730"/><rect x="154" y="22" width="16" height="10" fill="#c9c5d0" fill-opacity="0.7"/>
      <path d="M151 20 H173 L162 12 Z" fill="#2a2730"/>
      <path d="M20 90 H90 L84 100 H28 Z" fill="#1e1b24"/><path d="M52 90 V52 M52 54 L76 86 H52" stroke="#1e1b24" stroke-width="2" fill="none"/>
      <path d="M0 84 H40 V80 H0 Z M8 80 V96 M24 80 V96" fill="#1e1b24" stroke="#1e1b24" stroke-width="2"/>
    </svg>`,
  hotel: `
    <svg viewBox="0 0 200 140" aria-hidden="true">
      <rect width="200" height="140" fill="#8e8a97"/>
      <rect x="40" y="14" width="120" height="104" fill="#55515e"/>
      <g fill="#c9c5d0" fill-opacity="0.45">
        <rect x="52" y="24" width="14" height="14"/><rect x="78" y="24" width="14" height="14"/><rect x="108" y="24" width="14" height="14"/><rect x="134" y="24" width="14" height="14"/>
        <rect x="52" y="50" width="14" height="14"/><rect x="78" y="50" width="14" height="14"/><rect x="108" y="50" width="14" height="14"/><rect x="134" y="50" width="14" height="14"/>
        <rect x="52" y="76" width="14" height="14"/><rect x="134" y="76" width="14" height="14"/>
      </g>
      <path d="M76 118 V84 H124 V118 Z" fill="#1e1b24"/><path d="M70 84 H130 L124 76 H76 Z" fill="#2a2730"/>
      <circle cx="100" cy="8" r="7" fill="#c9c5d0" fill-opacity="0.6" stroke="#2a2730" stroke-width="2"/>
      <rect y="118" width="200" height="22" fill="#2a2730"/>
    </svg>`,
  mansion: `
    <svg viewBox="0 0 200 140" aria-hidden="true">
      <rect width="200" height="140" fill="#6e6a77"/>
      <path d="M20 112 V56 L100 24 L180 56 V112 Z" fill="#3b3742"/>
      <g fill="#c9c5d0" fill-opacity="0.6">
        <rect x="36" y="66" width="12" height="18"/><rect x="60" y="66" width="12" height="18"/><rect x="128" y="66" width="12" height="18"/><rect x="152" y="66" width="12" height="18"/>
      </g>
      <path d="M86 112 V72 Q100 60 114 72 V112 Z" fill="#c9c5d0" fill-opacity="0.75"/>
      <path d="M80 112 V64 M120 112 V64" stroke="#1e1b24" stroke-width="3"/>
      <rect y="112" width="200" height="28" fill="#2a2730"/>
      <path d="M0 112 Q10 96 18 112 M182 112 Q190 94 200 112" fill="#1e1b24"/>
    </svg>`,
  office: `
    <svg viewBox="0 0 200 140" aria-hidden="true">
      <rect width="200" height="140" fill="#77737f"/>
      <rect x="120" y="14" width="64" height="56" fill="#9a96a3"/><path d="M152 14 V70 M120 42 H184" stroke="#55515e" stroke-width="3"/>
      <path d="M100 6 V30" stroke="#2a2730" stroke-width="2"/><path d="M88 30 H112 L106 40 H94 Z" fill="#2a2730"/>
      <path d="M100 40 L64 112 H136 Z" fill="#c9c5d0" fill-opacity="0.18"/>
      <rect x="10" y="96" width="180" height="10" fill="#2a2730"/><rect x="20" y="106" width="8" height="34" fill="#2a2730"/><rect x="172" y="106" width="8" height="34" fill="#2a2730"/>
      <path d="M66 96 V80 H120 V96 Z" fill="#1e1b24"/><path d="M76 80 V66 H110 V80" fill="#c9c5d0" fill-opacity="0.7"/>
      <path d="M30 96 V84 H52 V96 Z" fill="#3b3742"/>
    </svg>`,
  ring: `
    <svg viewBox="0 0 200 140" aria-hidden="true">
      <rect width="200" height="140" fill="#2a2730"/>
      <path d="M100 0 L40 92 H160 Z" fill="#c9c5d0" fill-opacity="0.18"/>
      <path d="M20 92 L40 70 H160 L180 92 Z" fill="#77737f"/>
      <path d="M40 70 V40 M160 70 V40 M20 92 V60 M180 92 V60" stroke="#1e1b24" stroke-width="4"/>
      <path d="M40 46 H160 M40 56 H160 M20 66 L40 46 M180 66 L160 46 M20 76 L40 56 M180 76 L160 56" stroke="#c9c5d0" stroke-opacity="0.7" stroke-width="2"/>
      <rect y="92" width="200" height="48" fill="#3b3742"/>
      <circle cx="92" cy="58" r="5" fill="#1e1b24"/><path d="M86 70 L92 63 L98 70 L96 70 L92 66 L88 70 Z M89 63 L82 56 M95 63 L102 58" stroke="#1e1b24" stroke-width="3"/>
      <circle cx="40" cy="120" r="6" fill="#1e1b24"/><circle cx="62" cy="122" r="6" fill="#1e1b24"/><circle cx="150" cy="120" r="6" fill="#1e1b24"/>
    </svg>`,
  lodge: `
    <svg viewBox="0 0 200 140" aria-hidden="true">
      <rect width="200" height="140" fill="#9a96a3"/>
      <path d="M0 70 L40 30 L70 56 L110 14 L160 60 L200 36 V90 H0 Z" fill="#6e6a77"/>
      <path d="M40 30 L50 40 L44 42 L34 36 Z M110 14 L122 26 L114 28 L102 22 Z" fill="#efe9dd"/>
      <rect y="104" width="200" height="36" fill="#d9d6d3"/>
      <path d="M50 104 V72 L100 50 L150 72 V104 Z" fill="#3b3742"/>
      <path d="M44 74 L100 46 L156 74 L150 66 L100 42 L50 66 Z" fill="#efe9dd"/>
      <rect x="68" y="80" width="14" height="12" fill="#c9c5d0" fill-opacity="0.8"/><rect x="118" y="80" width="14" height="12" fill="#c9c5d0" fill-opacity="0.8"/>
      <path d="M92 104 V84 H108 V104 Z" fill="#1e1b24"/>
      <g fill="#efe9dd"><circle cx="20" cy="20" r="1.5"/><circle cx="70" cy="12" r="1.2"/><circle cx="140" cy="30" r="1.5"/><circle cx="180" cy="14" r="1.2"/><circle cx="90" cy="34" r="1"/></g>
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

function clippingPaper(caseData, scrawlText) {
  const { clipping } = caseData;
  const paper = el("article", "paper clipping");
  paper.append(
    el("div", "masthead", clipping.masthead),
    el("h1", "headline", clipping.headline),
    el("div", "dateline", clipping.dateline),
  );
  // When the code hides in the personals, the case's mark sits up by the dateline as a printer's ornament.
  if (caseData.cipher.hiddenOn === "clipping") paper.querySelector(".dateline").append(doodleMark(caseData.cipher.doodle, caseData.id));
  const body = el("div", "story");
  for (const para of clipping.body.split("\n")) body.append(el("p", null, para));
  paper.append(body);
  // The code can hide in the paper's own personals column, in the same print as the story.
  if (caseData.cipher.hiddenOn === "clipping") {
    const personals = el("div", "personals");
    personals.append(el("span", "personals-label", "Personals"), scrawl(scrawlText, "print"));
    paper.append(personals);
  }
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
  // Their statement, typed on the card itself so marks made on it stay in sight. Clicking the card
  // brings it up close. The quotes match the close-up's, so a mark lands on the same words in both.
  paper.append(top, el("p", "suspect-desc", suspect.description), el("p", "suspect-statement", `\u201c${suspect.statement.text}\u201d`));
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
  if (caseData.cipher.hiddenOn === "photo") {
    paper.append(scrawl(scrawlText, "hand"));
    image.append(doodleMark(caseData.cipher.doodle, caseData.id));
  }
  return paper;
}

// The hidden encrypted clue: only the start of the message. It takes on the look of whatever it's
// hidden in (pencil on a photo, typed on a report, small print in the personals), so nothing
// announces it. The case's doodle sits elsewhere on the same paper.
function scrawl(text, style) {
  const node = el("div", `scrawl ${style}`);
  node.dataset.pin = "scrawl";
  fillScrawl(node, text);
  return node;
}

function fillScrawl(node, text) {
  node.replaceChildren();
  [...`${text.slice(0, 22).trim()}\u2026`].forEach((ch, i) => node.append(ch === BLOT ? inkBlot(i) : ch));
}

// Each wrong answer runs more ink over the scrawl.
export function updateScrawl(stage, text) {
  fillScrawl(stage.querySelector('[data-pin="scrawl"]'), text);
}

// Scraps of evidence: a printed label with a note, handwritten or typed depending on the kind of
// paper. The case may hide the code inside one, as one more line of what the scrap says.
function evidencePaper(item, caseData, scrawlText) {
  const paper = el("div", `paper evidence evidence-${item.kind}`);
  paper.insertAdjacentHTML("afterbegin", PAPER_ART[item.kind] ?? "");
  const style = TYPED_KINDS.includes(item.kind) ? "typed" : "hand";
  const note = el("div", `evidence-note ${style}`);
  if (item.kind === "ledger") note.append(...ledgerRows(item.note));
  else note.textContent = item.note;
  paper.append(el("div", "evidence-label", item.label), note);
  if (caseData.cipher.hiddenOn === `evidence:${item.id}`) {
    const code = scrawl(scrawlText, style);
    if (item.kind === "ledger") code.classList.add("ledger-row");
    note.append(code);
    paper.append(doodleMark(caseData.cipher.doodle, caseData.id));
  }
  return paper;
}

// The blank card where the player writes the decoded message. It says what it's for, so players
// know to open it once they've cracked something. Once cracked, it holds the message.
function blankCardPaper() {
  const paper = el("div", "paper blank-card");
  paper.setAttribute("role", "button");
  paper.setAttribute("aria-label", "Blank card: write a decoded message");
  paper.tabIndex = 0;
  paper.append(el("div", "card-label", "Decoded message"), el("p", "blank-card-hint", "Found a code? Click to decode it here."));
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
  paper.querySelector(".blank-card-hint").remove();
  paper.append(body);
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

  bar.append(help, tray, guesses, tag);
  return bar;
}

export function renderBoard(caseData, { caseNumber, scrawlText }) {
  const stage = el("div", "stage");
  const board = el("section", "board");
  board.setAttribute("aria-label", `Murder board: ${caseData.title}`);

  board.append(pinItem("clipping", "clipping", LAYOUT.clipping, caseData.clipping.pos, clippingPaper(caseData, scrawlText)));

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
