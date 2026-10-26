import { test } from "node:test";
import assert from "node:assert/strict";
import { points, rankFor } from "../src/game/rank.js";

const guess = (rightCount) => ({ suspectId: "s", motiveId: "m", weaponId: "w", rightCount });
const run = ({ misses, cipher = null, liar = false, status = "closed" }) => ({
  status,
  guesses: [...Array(misses)].map(() => guess(1)).concat(status === "closed" ? [guess(3)] : []),
  cipher: cipher === null ? { found: false, wrongTries: 0, cracked: false } : { found: true, wrongTries: cipher, cracked: true },
  liar: liar === "partial" ? { suspectId: "s", truthIndex: 1, correct: false, partial: true } : liar ? { suspectId: "s", truthIndex: 0, correct: true } : null,
});

test("first-guess solve, first-try cipher, and the liar caught earns Basically Sherlock", () => {
  const progress = run({ misses: 0, cipher: 0, liar: true });
  assert.equal(points(progress), 10);
  assert.equal(rankFor(progress), "Basically Sherlock");
});

test("the right liar with the wrong story earns 1 point instead of 3", () => {
  assert.equal(points(run({ misses: 4, liar: "partial" })) - points(run({ misses: 4 })), 1);
  assert.equal(points(run({ misses: 4, liar: true })) - points(run({ misses: 4 })), 3);
});

test("a fifth-guess solve without the cipher or the liar earns Amateur Sleuth", () => {
  const progress = run({ misses: 4 });
  assert.equal(points(progress), 0);
  assert.equal(rankFor(progress), "Amateur Sleuth");
});

test("each band in between", () => {
  assert.equal(rankFor(run({ misses: 2 })), "Private Eye"); // 2
  assert.equal(rankFor(run({ misses: 3, cipher: 0 })), "Hard-Boiled Investigator"); // 1 + 3
  assert.equal(rankFor(run({ misses: 2, cipher: 1, liar: false })), "Hard-Boiled Investigator"); // 2 + 2
  assert.equal(rankFor(run({ misses: 1, liar: true })), "Seasoned Detective"); // 3 + 3
});

test("the same play-through always earns the same rank", () => {
  const progress = run({ misses: 1, cipher: 2, liar: true });
  assert.equal(rankFor(progress), rankFor(structuredClone(progress)));
});

test("a gone-cold case earns no rank", () => {
  assert.equal(rankFor(run({ misses: 5, cipher: 0, liar: true, status: "cold" })), null);
});
