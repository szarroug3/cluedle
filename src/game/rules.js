// The accusation rules: five guesses, each naming who, why, and how. A guess only ever
// reports how many of its three parts are right, never which. No DOM here.

export const MAX_GUESSES = 5;
export const CLUE_COUNT = 4;

export function wrongGuesses(state) {
  return state.guesses.filter((g) => g.rightCount < 3).length;
}

// Clues pinned so far: one per wrong guess, up to the four the case has.
export function unlockedClues(state) {
  return Math.min(wrongGuesses(state), CLUE_COUNT);
}

export function guessesLeft(state) {
  return MAX_GUESSES - state.guesses.length;
}

// One accusation. Returns the new state and what the player is told; never changes the input.
export function accuse(state, solution, { suspectId, motiveId, weaponId }) {
  if (state.status !== "playing") return { rejected: true, reason: "ended", state };
  if (!suspectId || !motiveId || !weaponId) return { rejected: true, reason: "incomplete", state };

  const rightCount =
    (suspectId === solution.suspectId) + (motiveId === solution.motiveId) + (weaponId === solution.weaponId);
  const guesses = [...state.guesses, { suspectId, motiveId, weaponId, rightCount }];
  const solved = rightCount === 3;
  const status = solved ? "closed" : guesses.length >= MAX_GUESSES ? "cold" : "playing";
  const next = { ...state, guesses, status };

  // A miss that leaves the case open pins up the next clue.
  const unlockedClueIndex = status === "playing" ? unlockedClues(next) - 1 : null;
  return { result: { rightCount, solved, status, unlockedClueIndex }, state: next };
}

// The LIAR stamp: one shot per case, free (it never uses a guess), only while the case is open.
// It's right only if the stamped suspect is the liar and the chosen truth is what really happened.
// The right liar with the wrong story is `partial`: half credit.
export function flagLiar(state, suspects, suspectId, truthIndex) {
  if (state.status !== "playing") return { rejected: true, reason: "ended", state };
  if (state.liar) return { rejected: true, reason: "used", state };
  const suspect = suspects.find((s) => s.id === suspectId);
  if (!suspect) return { rejected: true, reason: "unknown", state };
  const correct = suspect.statement.isLie && truthIndex === suspect.statement.truthIndex;
  const partial = suspect.statement.isLie && !correct;
  return { correct, partial, state: { ...state, liar: { suspectId, truthIndex, correct, partial } } };
}
