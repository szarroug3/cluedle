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

export function createStamps(stage, { names, guessNumber, lastGuess, onAccuse, suspects, onFlagLiar, onCommitLiar, onReopen, beckon, onFirstUse }) {
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
  let beckoning = beckon; // the stamps glow until a player first picks one up
  const trayLabel = stage.querySelector(".tray + .rail-label");
  let liarUsed = false;
  // A LIAR stamp confirmed on a real liar but not yet answered: { suspect, mark }. The question
  // comes back when the player clicks that card or the LIAR stamp.
  let awaiting = null;
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
  // With nothing stamped yet, the slip says how to accuse instead of showing empty lines.
  const howTo = el("p", "accusation-howto", "Pick up GUILTY, then stamp a suspect, a motive, and a weapon.");
  const accuseButton = el("button", "accuse-button", "Make the accusation");
  accuseButton.type = "button";
  slip.append(howTo, list, accuseButton);
  stage.querySelector(".case-tag").before(slip);

  function refresh() {
    // Once the case is over, the slip keeps showing the final accusation.
    const final = ended ? lastGuess() : null;
    const shown = final ? { suspect: final.suspectId, motive: final.motiveId, weapon: final.weaponId } : pending;
    for (const kind of KINDS) lines[kind].textContent = shown[kind] ? names[kind](shown[kind]) : "—";
    const empty = !final && KINDS.every((kind) => !pending[kind]);
    howTo.hidden = !empty;
    list.hidden = empty;
    // Once the case is over, the slip's button brings the ending (and its share card) back.
    accuseButton.textContent = ended ? "Reopen the ending" : "Make the accusation";
    accuseButton.disabled = !ended && KINDS.some((kind) => !pending[kind]);
    trays.guilty.classList.toggle("lifted", held === "guilty");
    trays.liar.classList.toggle("lifted", held === "liar");
    trays.liar.classList.toggle("used", liarUsed);
    trays.liar.classList.toggle("waiting", Boolean(awaiting));
    stage.classList.toggle("holding", Boolean(held));
    ghost.hidden = !held;
    ghost.classList.toggle("liar", held === "liar");
    ghostFace.textContent = held === "liar" ? "LIAR" : "GUILTY";
    const glowing = beckoning && !ended;
    for (const tray of Object.values(trays)) tray.classList.toggle("beckon", glowing && !tray.classList.contains("used"));
    if (trayLabel) trayLabel.textContent = glowing ? "Pick one up" : "Stamps";
  }

  function pickUp(kind) {
    if (ended || (kind === "liar" && liarUsed)) return;
    held = held === kind ? null : kind;
    if (held && beckoning) {
      beckoning = false;
      onFirstUse?.();
    }
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

  // The LIAR stamp's mark on a card: waiting for an answer, right, or wrong.
  function liarMark(card, state) {
    const mark = el("div", `stamp-mark liar-mark ${state}`, "LIAR");
    placeMark(mark, 2);
    card.querySelector(".paper").append(mark);
    return mark;
  }

  function finishLiar(suspect, mark, truthIndex) {
    awaiting = null;
    liarUsed = true;
    const result = onFlagLiar(suspect.id, truthIndex);
    mark.classList.remove("pending", "awaiting");
    mark.classList.add(result?.correct ? "right" : "wrong");
    refresh();
    return result;
  }

  // "So what really happened?": the choices for a confirmed liar. Closing without choosing keeps
  // the question waiting.
  function askTruth(slip, body, suspect, mark) {
    const close = () => slip.closest(".overlay")?.querySelector(".overlay-close").click();
    const options = el("div", "liar-options");
    suspect.statement.truthOptions.forEach((text, index) => {
      const option = el("button", "liar-option", text);
      option.type = "button";
      option.addEventListener("click", () => {
        const result = finishLiar(suspect, mark, index);
        body.replaceChildren(
          el("p", "liar-verdict", result?.correct ? "Caught in the lie." : "Wrong call. That\u2019s not what happened."),
        );
        setTimeout(close, 1400);
      });
      options.append(option);
    });
    body.replaceChildren(el("p", "liar-question", "So what really happened?"), options);
  }

  function liarSlip(suspect) {
    const slip = el("div", "paper liar-slip");
    slip.setAttribute("role", "dialog");
    slip.setAttribute("aria-label", `Call ${suspect.name} a liar`);
    const body = el("div", "liar-body");
    slip.append(el("div", "card-label", "Liar?"), el("h2", "statement-name", suspect.name), body);
    return { slip, body };
  }

  // Bring a waiting LIAR question back up.
  function reopenLiar() {
    const { suspect, mark } = awaiting;
    const { slip, body } = liarSlip(suspect);
    openOverlay(stage, slip);
    askTruth(slip, body, suspect, mark);
    body.prepend(el("p", "statement-quote", `\u201c${suspect.statement.text}\u201d`));
  }

  // LIAR: stamp the card, confirm the one shot, then pick what really happened. Backing out
  // before confirming costs nothing. Confirming spends the shot on that suspect; the answer can
  // wait until the player comes back to it.
  function stampLiar(card) {
    const { id } = pinOf(card);
    const suspect = suspects.find((s) => s.id === id);
    putDown();
    const mark = liarMark(card, "pending");

    let committed = false;
    const { slip, body } = liarSlip(suspect);
    const confirm = el("button", "liar-button", "Stamp it");
    confirm.type = "button";
    body.append(
      el("p", "statement-quote", `\u201c${suspect.statement.text}\u201d`),
      el("p", "liar-warning", "You only get one shot at this."),
      confirm,
    );

    confirm.addEventListener("click", () => {
      committed = true;
      if (!suspect.statement.isLie) {
        finishLiar(suspect, mark, null);
        body.replaceChildren(el("p", "liar-verdict", "Telling the truth, as far as anyone can tell. The shot\u2019s spent."));
        return;
      }
      awaiting = { suspect, mark };
      liarUsed = true;
      mark.classList.replace("pending", "awaiting");
      onCommitLiar?.(id);
      refresh();
      askTruth(slip, body, suspect, mark);
    });

    openOverlay(stage, slip, () => {
      if (!committed) mark.remove();
    });
  }

  // The stamp in hand rides on the pointer, from the moment it's picked up.
  function follow(event) {
    if (!held) return;
    const box = stage.getBoundingClientRect();
    const scale = box.width / stage.offsetWidth;
    ghost.style.left = `${(event.clientX - box.left) / scale}px`;
    ghost.style.top = `${(event.clientY - box.top) / scale}px`;
  }
  stage.addEventListener("pointermove", follow);
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
        follow(event);
        return true;
      }
      if (event.target.closest(".stamp-liar")) {
        if (awaiting) reopenLiar();
        else {
          pickUp("liar");
          follow(event);
        }
        return true;
      }
      if (!held && awaiting && event.target.closest(`[data-pin="suspect:${awaiting.suspect.id}"]`)) {
        reopenLiar();
        return true;
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
    // Redraw a LIAR stamp still waiting for its answer (used when restoring progress).
    drawLiarWaiting(suspectId) {
      const card = board.querySelector(`[data-pin="suspect:${suspectId}"]`);
      awaiting = { suspect: suspects.find((s) => s.id === suspectId), mark: liarMark(card, "awaiting") };
      liarUsed = true;
      refresh();
    },
    end() {
      ended = true;
      // A question never answered counts as a miss.
      if (awaiting) {
        awaiting.mark.classList.replace("awaiting", "wrong");
        awaiting = null;
      }
      board.querySelectorAll(".stamp-mark.pending").forEach((mark) => mark.remove());
      for (const kind of KINDS) pending[kind] = null;
      putDown();
    },
    // Set the stamp back in the tray, e.g. when the player picks up a pencil instead.
    putDown,
  };
}
