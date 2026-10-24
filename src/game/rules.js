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
