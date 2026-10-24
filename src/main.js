// App shell: lays out the case on the board and connects the player's actions to the rules.
// Progress is in memory for now; saving it comes in a later slice.
import { cases } from "./cases/index.js";
import { renderBoard, pinDecodedNote, STAGE_WIDTH, STAGE_HEIGHT } from "./ui/board.js";
import { openDecoder, openCloseLook } from "./ui/decoder.js";
import { attempt, blotted } from "./game/cipher.js";

document.getElementById("needs-server")?.remove();

const caseData = cases[0];
const progress = {
  caseId: caseData.id,
  cipher: { found: false, wrongTries: 0, cracked: false },
};

const app = document.getElementById("app");
const stage = renderBoard(caseData, { caseNumber: 1 });
app.append(stage);

function decodedText() {
  return blotted(caseData.cipher.plaintext, progress.cipher.wrongTries, caseData.id, caseData.cipher.keepWords);
}

stage.addEventListener("click", (event) => {
  if (event.target.closest('[data-pin="scrawl"]')) {
    progress.cipher = { ...progress.cipher, found: true };
    openDecoder(stage, {
      caseData,
      state: progress.cipher,
      onDecode(shift) {
        const result = attempt(progress.cipher, caseData.cipher, shift);
        progress.cipher = result.state;
        return result;
      },
      // Pinned as the card closes, so the player sees it land on the board.
      onClose() {
        if (progress.cipher.cracked) pinDecodedNote(stage, decodedText());
      },
    });
    return;
  }
  const scrap = event.target.closest(".pin-evidence");
  if (scrap) {
    const id = scrap.dataset.pin.replace("evidence:", "");
    openCloseLook(stage, caseData.evidence.find((e) => e.id === id));
  }
});

// The board is designed at a fixed size and scaled to fit the window, so nothing ever scrolls.
function fitStage() {
  const scale = Math.min(window.innerWidth / STAGE_WIDTH, window.innerHeight / STAGE_HEIGHT);
  document.documentElement.style.setProperty("--scale", String(scale));
}
fitStage();
window.addEventListener("resize", fitStage);
