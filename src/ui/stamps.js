// The stamps. GUILTY: pick it up from the tray, stamp a suspect, a motive, and a weapon, then make
// the accusation from the slip on the rail; past stamps stay on the cards, numbered by guess.
// LIAR: one shot, stamped on a suspect's card, then the player says what really happened.
import { openOverlay } from "./decoder.js";

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

export function createStamps(stage, { names, guessNumber, lastGuess, onAccuse, suspects, onFlagLiar, onReopen }) {
  ensureInkFilter();
  const board = stage.querySelector(".board");
  const trays = { guilty: stage.querySelector(".stamp-guilty"), liar: stage.querySelector(".stamp-liar") };
  for (const [kind, tray] of Object.entries(trays)) {
    tray.setAttribute("role", "button");
    tray.setAttribute("aria-label", `Pick up the ${kind.toUpperCase()} stamp`);
    tray.tabIndex = 0;
  }

  let held = null; // "guilty", "liar", or nothing
  let ended = false;
  let liarUsed = false;
  const pending = { suspect: null, motive: null, weapon: null };

  const ghost = el("div", "held-stamp");
  const ghostFace = el("span", "stamp-face");
  ghost.append(ghostFace);
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
    // Once the case is over, the slip keeps showing the final accusation.
    const final = ended ? lastGuess() : null;
    const shown = final ? { suspect: final.suspectId, motive: final.motiveId, weapon: final.weaponId } : pending;
    for (const kind of KINDS) lines[kind].textContent = shown[kind] ? names[kind](shown[kind]) : "—";
    // Once the case is over, the slip's button brings the ending (and its share card) back.
    accuseButton.textContent = ended ? "Reopen the ending" : "Make the accusation";
    accuseButton.disabled = !ended && KINDS.some((kind) => !pending[kind]);
    trays.guilty.classList.toggle("lifted", held === "guilty");
    trays.liar.classList.toggle("lifted", held === "liar");
    trays.liar.classList.toggle("used", liarUsed);
    stage.classList.toggle("holding", Boolean(held));
    ghost.hidden = !held;
    ghost.classList.toggle("liar", held === "liar");
    ghostFace.textContent = held === "liar" ? "LIAR" : "GUILTY";
  }

  function pickUp(kind) {
    if (ended || (kind === "liar" && liarUsed)) return;
    held = held === kind ? null : kind;
    refresh();
  }

  function putDown() {
    held = null;
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
    if (ended) {
      onReopen();
      return;
    }
    const number = guessNumber();
    const result = onAccuse({ suspectId: pending.suspect, motiveId: pending.motive, weaponId: pending.weapon });
    if (!result || result.rejected) return;
    settle(number, result.result.solved);
    if (result.result.status !== "playing") ended = true;
    putDown();
  });

  // LIAR: stamp the card, confirm the one shot, then pick what really happened. Backing out
  // before confirming costs nothing; leaving after confirming uses the shot.
  function stampLiar(card) {
    const { id } = pinOf(card);
    const suspect = suspects.find((s) => s.id === id);
    putDown();
    const mark = el("div", "stamp-mark liar-mark pending", "LIAR");
    placeMark(mark, 2);
    card.querySelector(".paper").append(mark);

    let committed = false;
    let settled = false;
    function finish(truthIndex) {
      if (settled) return;
      settled = true;
      liarUsed = true;
      const result = onFlagLiar(id, truthIndex);
      mark.classList.remove("pending");
      mark.classList.add(result?.correct ? "right" : "wrong");
      refresh();
      return result;
    }

    const slip = el("div", "paper liar-slip");
    slip.setAttribute("role", "dialog");
    slip.setAttribute("aria-label", `Call ${suspect.name} a liar`);
    const body = el("div", "liar-body");
    const confirm = el("button", "liar-button", "Stamp it");
    confirm.type = "button";
    body.append(
      el("p", "statement-quote", `\u201c${suspect.statement.text}\u201d`),
      el("p", "liar-warning", "You get one shot at this. Make it count."),
      confirm,
    );
    slip.append(el("div", "card-label", "Liar?"), el("h2", "statement-name", suspect.name), body);

    const close = () => slip.closest(".overlay")?.querySelector(".overlay-close").click();
    confirm.addEventListener("click", () => {
      committed = true;
      if (!suspect.statement.isLie) {
        finish(null);
        body.replaceChildren(el("p", "liar-verdict", "Telling the truth, as far as anyone can tell. The shot\u2019s spent."));
        return;
      }
      const options = el("div", "liar-options");
      suspect.statement.truthOptions.forEach((text, index) => {
        const option = el("button", "liar-option", text);
        option.type = "button";
        option.addEventListener("click", () => {
          const result = finish(index);
          body.replaceChildren(
            el("p", "liar-verdict", result?.correct ? "Caught in the lie." : "Wrong call. Whatever happened, it wasn\u2019t that."),
          );
          setTimeout(close, 1400);
        });
        options.append(option);
      });
      body.replaceChildren(el("p", "liar-question", "So what really happened?"), options);
    });

    openOverlay(stage, slip, () => {
      if (committed) finish(null);
      else mark.remove();
    });
  }

  stage.addEventListener("pointermove", (event) => {
    if (!held) return;
    const box = stage.getBoundingClientRect();
    const scale = box.width / stage.offsetWidth;
    ghost.style.left = `${(event.clientX - box.left) / scale}px`;
    ghost.style.top = `${(event.clientY - box.top) / scale}px`;
  });
  for (const [kind, tray] of Object.entries(trays)) {
    tray.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        pickUp(kind);
      }
    });
  }
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && held) putDown();
  });

  refresh();

  return {
    // Handles a click on the board if it belongs to the stamp; returns whether it did.
    handleClick(event) {
      if (event.target.closest(".stamp-guilty")) {
        pickUp("guilty");
        return true;
      }
      if (event.target.closest(".stamp-liar")) {
        pickUp("liar");
        return true;
      }
      // The spool trades places with a stamp in hand.
      if (event.target.closest(".spool")) {
        putDown();
        return false;
      }
      if (!held) return false;
      if (held === "liar") {
        const card = event.target.closest(".pin-suspect");
        if (card) stampLiar(card);
        return true;
      }
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
    // Redraw a spent LIAR stamp (used when restoring progress).
    drawLiar(suspectId, correct) {
      const card = board.querySelector(`[data-pin="suspect:${suspectId}"]`);
      const mark = el("div", `stamp-mark liar-mark ${correct ? "right" : "wrong"}`, "LIAR");
      placeMark(mark, 2);
      card.querySelector(".paper").append(mark);
      liarUsed = true;
      refresh();
    },
    end() {
      ended = true;
      board.querySelectorAll(".stamp-mark.pending").forEach((mark) => mark.remove());
      for (const kind of KINDS) pending[kind] = null;
      putDown();
    },
  };
}
