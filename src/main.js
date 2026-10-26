// App shell: picks today's case, restores today's progress, decides which screen to show, and
// connects the player's actions to the rules. It's the only place that saves progress, right
// after each change.
import { cases } from "./cases/index.js";
import { renderBoard, updateScrawl, fillBlankCard, pinClue, markGuessSpent, STAGE_WIDTH, STAGE_HEIGHT } from "./ui/board.js";
import { openCloseLook, openBlankCard, openStatement } from "./ui/decoder.js";
import { createStamps } from "./ui/stamps.js";
import { createString } from "./ui/string.js";
import { createMover } from "./ui/move.js";
import { createNotes } from "./ui/notes.js";
import { createPencil } from "./ui/pencil.js";
import { showEnding } from "./ui/ending.js";
import { showCaseFile } from "./ui/caseFile.js";
import { showHowToPlay } from "./ui/howToPlay.js";
import { attempt, blotted, encode } from "./game/cipher.js";
import { accuse, flagLiar, unlockedClues } from "./game/rules.js";
import { rankFor } from "./game/rank.js";
import { shareText } from "./game/share.js";
import { dateKey, caseNumberFor, caseIndexFor, msUntilNextCase } from "./game/daily.js";
import * as saved from "./game/progress.js";

document.getElementById("needs-server")?.remove();
document.querySelector(".rotate-dismiss")?.addEventListener("click", () => {
  document.getElementById("rotate-hint").classList.add("dismissed");
});

// ?case=N plays case N on any day, and ?fresh ignores saved progress: demo and testing aids.
const params = new URLSearchParams(location.search);
const today = dateKey();
const override = Number.parseInt(params.get("case"), 10);
const CASE_NUMBER = override > 0 ? override : caseNumberFor(today);
const caseData = cases[caseIndexFor(CASE_NUMBER, cases.length)];
const slot = override > 0 ? `${today}:case-${override}` : today;

const blank = () => ({
  caseId: caseData.id,
  dateKey: today,
  status: "playing",
  guesses: [],
  liar: null,
  cipher: { found: false, wrongTries: 0, cracked: false },
  strings: [],
  // The player's own working: moved cards, index cards, the notepad, and pencil marks.
  positions: {},
  notes: [],
  notepad: "",
  marks: [],
});
const restored = params.has("fresh") ? null : saved.load(slot, today);
const returning = restored?.caseId === caseData.id;
const progress = returning ? { ...blank(), ...restored } : blank();
const save = () => saved.save(slot, progress);

const { cipher } = caseData;

// The message as it can still be read, and as it's scrawled on the board.
const readable = () => blotted(cipher.plaintext, progress.cipher.wrongTries, caseData.id, cipher.keepWords);
const scrawlText = () => encode(readable(), cipher.shift);

const app = document.getElementById("app");
const stage = renderBoard(caseData, { caseNumber: CASE_NUMBER, scrawlText: scrawlText() });
app.append(stage);

function showCaseEnding() {
  const rank = rankFor(progress);
  showEnding(stage, caseData, progress.status, {
    rank,
    share: shareText(CASE_NUMBER, caseData, progress, rank),
    msUntilNext: () => msUntilNextCase(),
  });
}

function openCard() {
  openBlankCard(stage, {
    state: progress.cipher,
    readable,
    onSubmit(answer) {
      const result = attempt(progress.cipher, cipher, answer, caseData.id);
      progress.cipher = result.state;
      save();
      if (!result.correct) updateScrawl(stage, scrawlText());
      return result;
    },
    // Filled in as the card closes, so the player sees it land on the board.
    onClose() {
      if (progress.cipher.cracked) fillBlankCard(stage, readable());
    },
  });
}

const byId = (list, key) => (id) => list.find((item) => item.id === id)[key];
const stamps = createStamps(stage, {
  names: {
    suspect: byId(caseData.suspects, "name"),
    motive: byId(caseData.motives, "text"),
    weapon: byId(caseData.weapons, "name"),
  },
  guessNumber: () => progress.guesses.length + 1,
  lastGuess: () => progress.guesses.at(-1),
  beckon: !saved.usedStamps(),
  onFirstUse: () => saved.markStampsUsed(),
  onReopen: showCaseEnding,
  suspects: caseData.suspects,
  onFlagLiar(suspectId, truthIndex) {
    const step = flagLiar(progress, caseData.suspects, suspectId, truthIndex);
    if (step.rejected) return step;
    Object.assign(progress, step.state);
    save();
    return step;
  },
  onAccuse(guess) {
    const step = accuse(progress, caseData.solution, guess);
    if (step.rejected) return step;
    Object.assign(progress, step.state);
    save();
    const { rightCount, status, unlockedClueIndex } = step.result;
    markGuessSpent(stage, progress.guesses.length - 1, rightCount);
    if (unlockedClueIndex != null) {
      pinClue(stage, unlockedClueIndex, caseData.clues[unlockedClueIndex]);
      pencil.apply(stage);
    }
    if (status !== "playing") setTimeout(showCaseEnding, 700);
    return step;
  },
});

const string = createString(stage, { strings: progress.strings, onChange: save });
const mover = createMover(stage, { positions: progress.positions, string, onChange: save });
const notes = createNotes(stage, { progress, string, mover, onChange: save });
const pencil = createPencil(stage, { marks: progress.marks, onChange: save, onPickUp: () => stamps.putDown() });

// Put everything from saved progress back on the board.
function restoreBoard() {
  progress.guesses.forEach((guess, i) => {
    markGuessSpent(stage, i, guess.rightCount);
    stamps.drawPast(i + 1, guess, guess.rightCount === 3);
  });
  for (let i = 0; i < unlockedClues(progress); i++) pinClue(stage, i, caseData.clues[i], { animate: false });
  if (progress.cipher.cracked) fillBlankCard(stage, readable());
  if (progress.liar) stamps.drawLiar(progress.liar.suspectId, progress.liar.correct);
  if (progress.status !== "playing") stamps.end();
  notes.restore();
  mover.restore();
  pencil.apply(stage);
  string.redraw();
}

stage.addEventListener("click", (event) => {
  if (pencil.handleClick(event)) return;
  if (stamps.handleClick(event)) {
    // Only one thing in hand at a time.
    if (stage.classList.contains("holding")) pencil.putDown();
    return;
  }
  if (string.handleClick(event)) return;
  if (notes.handleClick(event)) return;
  if (event.target.closest(".help-button")) {
    showHowToPlay(stage);
    return;
  }
  // The code lives inside a scrap, the clipping, or the photo; opening it shows the code in place.
  const code = () => ({ code: scrawlText(), doodle: cipher.doodle, seed: caseData.id });
  const foundCode = () => {
    progress.cipher = { ...progress.cipher, found: true };
    save();
  };
  const scrap = event.target.closest(".pin-evidence");
  if (scrap) {
    const item = caseData.evidence.find((e) => `evidence:${e.id}` === scrap.dataset.pin);
    const hidesCode = cipher.hiddenOn === scrap.dataset.pin;
    if (hidesCode) foundCode();
    pencil.apply(openCloseLook(stage, { ...item, pin: scrap.dataset.pin, ...(hidesCode ? code() : {}) }));
    return;
  }
  if (event.target.closest('[data-pin="scrawl"]')) {
    foundCode();
    const where = cipher.hiddenOn === "photo" ? { kind: "photo-note", label: caseData.photo.caption } : { kind: "classified", label: `${caseData.clipping.masthead} \u00b7 Personals` };
    openCloseLook(stage, { ...where, ...code() });
    return;
  }
  if (event.target.closest('[data-pin="blank-card"]')) {
    openCard();
    return;
  }
  const suspectCard = event.target.closest(".pin-suspect");
  if (suspectCard) {
    const id = suspectCard.dataset.pin.replace("suspect:", "");
    pencil.apply(openStatement(stage, caseData.suspects.find((s) => s.id === id)));
  }
});

stage.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.target.closest('[data-pin="blank-card"]')) openCard();
});

// The board is designed at a fixed size and scaled to fit the window, so nothing ever scrolls.
function fitStage() {
  const scale = Math.min(window.innerWidth / STAGE_WIDTH, window.innerHeight / STAGE_HEIGHT);
  document.documentElement.style.setProperty("--scale", String(scale));
}
fitStage();
window.addEventListener("resize", fitStage);

// Which screen: a finished case shows the board with its ending; a case already under way goes
// straight to the board; otherwise the case file, then how-to-play on a first visit.
restoreBoard();
if (progress.status !== "playing") {
  showCaseEnding();
} else if (!returning) {
  showCaseFile(stage, {
    caseNumber: CASE_NUMBER,
    dateKey: today,
    title: caseData.title,
    onOpen() {
      save();
      if (!saved.seenHowTo()) showHowToPlay(stage, { onClose: () => saved.markHowToSeen() });
    },
  });
}
