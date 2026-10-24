// App shell: lays out the case on the board and connects the player's actions to the rules.
// Progress is in memory for now; saving it comes in a later slice.
import { cases } from "./cases/index.js";
import { renderBoard, updateScrawl, fillBlankCard, STAGE_WIDTH, STAGE_HEIGHT } from "./ui/board.js";
import { openCloseLook, openBlankCard } from "./ui/decoder.js";
import { attempt, blotted, encode } from "./game/cipher.js";

document.getElementById("needs-server")?.remove();

const caseData = cases[0];
const { cipher } = caseData;
const progress = {
  caseId: caseData.id,
  cipher: { found: false, wrongTries: 0, cracked: false },
};

// The message as it can still be read, and as it's scrawled on the board.
const readable = () => blotted(cipher.plaintext, progress.cipher.wrongTries, caseData.id, cipher.keepWords);
const scrawlText = () => encode(readable(), cipher.shift);

const app = document.getElementById("app");
const stage = renderBoard(caseData, { caseNumber: 1, scrawlText: scrawlText() });
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

stage.addEventListener("click", (event) => {
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
  if (event.target.closest('[data-pin="blank-card"]')) openCard();
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
