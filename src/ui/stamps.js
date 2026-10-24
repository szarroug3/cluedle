// The GUILTY stamp: pick it up from the tray, stamp a suspect, a motive, and a weapon, then make
// the accusation from the slip on the rail. Past stamps stay on the cards, numbered by guess.

const KINDS = ["suspect", "motive", "weapon"];
const KIND_LABEL = { suspect: "Who", motive: "Why", weapon: "How" };

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

// Rough, uneven edges for stamped ink, defined once for the page.
function ensureInkFilter() {
  if (document.getElementById("rough-ink")) return;
  document.body.insertAdjacentHTML(
    "beforeend",
    `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
       <filter id="rough-ink">
         <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="4" result="noise"/>
         <feDisplacementMap in="SourceGraphic" in2="noise" scale="3"/>
       </filter>
     </svg>`,
  );
}

function pinOf(card) {
  const [kind, id] = card.dataset.pin.split(":");
  return { kind, id };
}

// Each guess sits a little lower and at a new angle, so every past stamp stays readable.
function placeMark(mark, number) {
  mark.style.setProperty("--stamp-top", `${20 + ((number - 1) % 5) * 9}%`);
  mark.style.setProperty("--stamp-left", `${10 + ((number - 1) % 5) * 7}%`);
  mark.style.setProperty("--stamp-rot", `${-12 + ((number - 1) % 5) * 6}deg`);
}

export function createStamps(stage, { names, guessNumber, onAccuse }) {
  ensureInkFilter();
  const board = stage.querySelector(".board");
  const tray = stage.querySelector(".stamp-guilty");
  tray.setAttribute("role", "button");
  tray.setAttribute("aria-label", "Pick up the GUILTY stamp");
  tray.tabIndex = 0;

  let held = false;
  let ended = false;
  const pending = { suspect: null, motive: null, weapon: null };

  const ghost = el("div", "held-stamp");
  ghost.append(el("span", "stamp-face", "GUILTY"));
  ghost.hidden = true;
  stage.append(ghost);

  // The accusation slip on the rail: who, why, how, and the button.
  const slip = el("div", "accusation");
  const lines = {};
  const list = el("dl", "accusation-lines");
  for (const kind of KINDS) {
    lines[kind] = el("dd", null, "—");
    list.append(el("dt", null, KIND_LABEL[kind]), lines[kind]);
  }
  const accuseButton = el("button", "accuse-button", "Make the accusation");
  accuseButton.type = "button";
  slip.append(list, accuseButton);
  stage.querySelector(".case-tag").before(slip);

  function refresh() {
    for (const kind of KINDS) lines[kind].textContent = pending[kind] ? names[kind](pending[kind]) : "—";
    accuseButton.disabled = ended || KINDS.some((kind) => !pending[kind]);
    tray.classList.toggle("lifted", held);
    stage.classList.toggle("holding", held);
    ghost.hidden = !held;
  }

  function pickUp() {
    if (ended) return;
    held = !held;
    refresh();
  }

  function putDown() {
    held = false;
    refresh();
  }

  function stamp(card) {
    const { kind, id } = pinOf(card);
    board.querySelector(`.stamp-mark.pending[data-kind="${kind}"]`)?.remove();
    const mark = el("div", "stamp-mark pending", "GUILTY");
    mark.dataset.kind = kind;
    placeMark(mark, guessNumber());
    card.querySelector(".paper").append(mark);
    pending[kind] = id;
    refresh();
  }

  // Turn the pending stamps into a numbered record of this guess.
  function settle(number, solved) {
    for (const mark of board.querySelectorAll(".stamp-mark.pending")) {
      mark.classList.remove("pending");
      mark.classList.add(solved ? "right" : "spent");
      mark.append(el("span", "stamp-number", `#${number}`));
    }
    for (const kind of KINDS) pending[kind] = null;
  }

  accuseButton.addEventListener("click", () => {
    if (accuseButton.disabled) return;
    const number = guessNumber();
    const result = onAccuse({ suspectId: pending.suspect, motiveId: pending.motive, weaponId: pending.weapon });
    if (!result || result.rejected) return;
    settle(number, result.result.solved);
    if (result.result.status !== "playing") ended = true;
    putDown();
  });

  stage.addEventListener("pointermove", (event) => {
    if (!held) return;
    const box = stage.getBoundingClientRect();
    const scale = box.width / stage.offsetWidth;
    ghost.style.left = `${(event.clientX - box.left) / scale}px`;
    ghost.style.top = `${(event.clientY - box.top) / scale}px`;
  });
  tray.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      pickUp();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && held) putDown();
  });

  refresh();

  return {
    // Handles a click on the board if it belongs to the stamp; returns whether it did.
    handleClick(event) {
      if (event.target.closest(".stamp-guilty")) {
        pickUp();
        return true;
      }
      if (!held) return false;
      const card = event.target.closest(".pin-suspect, .pin-motive, .pin-weapon");
      if (card) stamp(card);
      return true;
    },
    // Redraw a past guess's stamps (used when restoring progress).
    drawPast(number, guess, solved) {
      const ids = { suspect: guess.suspectId, motive: guess.motiveId, weapon: guess.weaponId };
      for (const kind of KINDS) {
        const card = board.querySelector(`[data-pin="${kind}:${ids[kind]}"]`);
        const mark = el("div", `stamp-mark ${solved ? "right" : "spent"}`, "GUILTY");
        mark.append(el("span", "stamp-number", `#${number}`));
        placeMark(mark, number);
        card.querySelector(".paper").append(mark);
      }
    },
    end() {
      ended = true;
      board.querySelectorAll(".stamp-mark.pending").forEach((mark) => mark.remove());
      for (const kind of KINDS) pending[kind] = null;
      putDown();
    },
  };
}
