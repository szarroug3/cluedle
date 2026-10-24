// The detective rank, earned from hidden points on a solved case. Tune the values here.
import { MAX_GUESSES } from "./rules.js";

const POINTS = {
  perGuessLeft: 1, // guesses left after solving: 0–4
  cipher: [3, 2, 1], // cracked with 0, 1, or 2 wrong answers; 0 if never cracked
  liar: 3, // liar caught
};

// Lowest points needed for each rank, highest first.
const RANKS = [
  [8, "Basically Sherlock"],
  [6, "Seasoned Detective"],
  [4, "Hard-Boiled Investigator"],
  [2, "Private Eye"],
  [0, "Amateur Sleuth"],
];

export function points(progress) {
  if (progress.status !== "closed") return 0;
  const guessesLeft = MAX_GUESSES - progress.guesses.length;
  const cipher = progress.cipher.cracked ? POINTS.cipher[progress.cipher.wrongTries] ?? 0 : 0;
  const liar = progress.liar?.correct ? POINTS.liar : 0;
  return guessesLeft * POINTS.perGuessLeft + cipher + liar;
}

// A gone-cold case earns no rank.
export function rankFor(progress) {
  if (progress.status !== "closed") return null;
  const score = points(progress);
  return RANKS.find(([min]) => score >= min)[1];
}
