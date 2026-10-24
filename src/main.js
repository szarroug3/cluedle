// App shell. For now it lays out case 1 on the board; later slices add rules, progress, and screens.
import { cases } from "./cases/index.js";
import { renderBoard, STAGE_WIDTH, STAGE_HEIGHT } from "./ui/board.js";

document.getElementById("needs-server")?.remove();

const app = document.getElementById("app");
app.append(renderBoard(cases[0], { caseNumber: 1 }));

// The board is designed at a fixed size and scaled to fit the window, so nothing ever scrolls.
function fitStage() {
  const scale = Math.min(window.innerWidth / STAGE_WIDTH, window.innerHeight / STAGE_HEIGHT);
  document.documentElement.style.setProperty("--scale", String(scale));
}
fitStage();
window.addEventListener("resize", fitStage);
