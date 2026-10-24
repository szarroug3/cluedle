// App shell: lays out the case on the board and connects the player's actions to the rules.
// Progress is in memory for now; saving it comes in a later slice.
import { cases } from "./cases/index.js";
import { renderBoard, updateScrawl, fillBlankCard, pinClue, markGuessSpent, STAGE_WIDTH, STAGE_HEIGHT } from "./ui/board.js";
import { openCloseLook, openBlankCard, openStatement } from "./ui/decoder.js";
import { createStamps } from "./ui/stamps.js";
import { showEnding } from "./ui/ending.js";
import { attempt, blotted, encode } from "./game/cipher.js";
import { accuse, flagLiar } from "./game/rules.js";
import { rankFor } from "./game/rank.js";
import { shareText } from "./game/share.js";

document.getElementById("needs-server")?.remove();

const CASE_NUMBER = 1;
const caseData = cases[0];
const { cipher } = caseData;
const progress = {
  caseId: caseData.id,
  status: "playing",
  guesses: [],
  liar: null,
  cipher: { found: false, wrongTries: 0, cracked: false },
};

// The message as it can still be read, and as it's scrawled on the board.
const readable = () => blotted(cipher.plaintext, progress.cipher.wrongTries, caseData.id, cipher.keepWords);
const scrawlText = () => encode(readable(), cipher.shift);

const app = document.getElementById("app");
const stage = renderBoard(caseData, { caseNumber: CASE_NUMBER, scrawlText: scrawlText() });
app.append(stage);

function openCard() {
  openBlankCard(stage, {
    state: progress.cipher,
    readable,
    onSubmit(answer) {
      const result = attempt(progress.cipher, cipher, answer, caseData.id);
      progress.cipher = result.state;
      if (!result.correct) updateScrawl(stage, scrawlText());
      return result;
    },
    // Filled in as the card closes, so the player sees it land on the board.
    onClose() {
      if (progress.cipher.cracked) fillBlankCard(stage, readable());
    },
  });
}

function showCaseEnding() {
  const rank = rankFor(progress);
  showEnding(stage, caseData, progress.status, { rank, share: shareText(CASE_NUMBER, caseData, progress, rank) });
}

const byId = (list, key) => (id) => list.find((item) => item.id === id)[key];
const stamps = createStamps(stage, {
  names: {
    suspect: byId(caseData.suspects, "name"),
    motive: byId(caseData.motives, "text"),
    weapon: byId(caseData.weapons, "name"),
  },
  guessNumber: () => progress.guesses.length + 1,
  suspects: caseData.suspects,
  onFlagLiar(suspectId, truthIndex) {
    const step = flagLiar(progress, caseData.suspects, suspectId, truthIndex);
    if (step.rejected) return step;
    Object.assign(progress, step.state);
    return step;
  },
  onAccuse(guess) {
    const step = accuse(progress, caseData.solution, guess);
    if (step.rejected) return step;
    Object.assign(progress, step.state);
    const { rightCount, status, unlockedClueIndex } = step.result;
    markGuessSpent(stage, progress.guesses.length - 1, rightCount);
    if (unlockedClueIndex != null) pinClue(stage, unlockedClueIndex, caseData.clues[unlockedClueIndex]);
    if (status !== "playing") setTimeout(showCaseEnding, 700);
    return step;
  },
});

stage.addEventListener("click", (event) => {
  if (stamps.handleClick(event)) return;
  if (event.target.closest('[data-pin="scrawl"]')) {
    progress.cipher = { ...progress.cipher, found: true };
    openCloseLook(stage, { kind: "scrawl", label: caseData.photo.caption, note: scrawlText(), anchor: true });
    return;
  }
  const scrap = event.target.closest(".pin-evidence");
  if (scrap) {
    const id = scrap.dataset.pin.replace("evidence:", "");
    openCloseLook(stage, caseData.evidence.find((e) => e.id === id));
    return;
  }
  if (event.target.closest('[data-pin="blank-card"]')) {
    openCard();
    return;
  }
  const suspectCard = event.target.closest(".pin-suspect");
  if (suspectCard) {
    const id = suspectCard.dataset.pin.replace("suspect:", "");
    openStatement(stage, caseData.suspects.find((s) => s.id === id));
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
