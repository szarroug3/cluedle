import { test } from "node:test";
import assert from "node:assert/strict";
import { accuse, flagLiar, guessesLeft, unlockedClues, MAX_GUESSES } from "../src/game/rules.js";

const solution = { suspectId: "mae", motiveId: "revenge", weaponId: "foxglove" };
const fresh = { status: "playing", guesses: [] };
const miss = { suspectId: "teddy", motiveId: "debts", weaponId: "cushion" };

test("an accusation uses exactly one guess", () => {
  const { state } = accuse(fresh, solution, miss);
  assert.equal(state.guesses.length, 1);
  assert.equal(guessesLeft(state), MAX_GUESSES - 1);
  assert.equal(fresh.guesses.length, 0);
});

test("a guess says how many of its three parts are right", () => {
  const count = (guess) => accuse(fresh, solution, guess).result.rightCount;
  assert.equal(count(miss), 0);
  assert.equal(count({ ...miss, suspectId: "mae" }), 1);
  assert.equal(count({ ...miss, motiveId: "revenge", weaponId: "foxglove" }), 2);
  assert.equal(count(solution), 3);
});

test("a guess never says which parts are right", () => {
  const { result } = accuse(fresh, solution, { ...miss, suspectId: "mae" });
  assert.deepEqual(Object.keys(result).sort(), ["rightCount", "solved", "status", "unlockedClueIndex"]);
});

test("each miss pins the next clue, in order", () => {
  let state = fresh;
  for (let i = 0; i < 4; i++) {
    const step = accuse(state, solution, miss);
    assert.equal(step.result.unlockedClueIndex, i);
    state = step.state;
  }
  assert.equal(unlockedClues(state), 4);
});

test("a full match closes the case", () => {
  const { result, state } = accuse(accuse(fresh, solution, miss).state, solution, solution);
  assert.equal(result.solved, true);
  assert.equal(result.status, "closed");
  assert.equal(result.unlockedClueIndex, null);
  assert.equal(state.status, "closed");
});

test("the fifth miss sends the case cold, and a fifth-guess solve still closes it", () => {
  let state = fresh;
  for (let i = 0; i < 4; i++) state = accuse(state, solution, miss).state;
  const cold = accuse(state, solution, miss);
  assert.equal(cold.result.status, "cold");
  assert.equal(cold.result.unlockedClueIndex, null);
  assert.equal(accuse(state, solution, solution).result.status, "closed");
});

test("accusations are rejected after the case ends, or with a part missing", () => {
  const closed = accuse(fresh, solution, solution).state;
  const late = accuse(closed, solution, miss);
  assert.equal(late.rejected, true);
  assert.equal(late.state, closed);
  assert.equal(accuse(fresh, solution, { suspectId: "mae", motiveId: "revenge" }).rejected, true);
});

const suspects = [
  { id: "mae", statement: { text: "…", isLie: true, truthOptions: ["a", "b", "c"], truthIndex: 0 } },
  { id: "teddy", statement: { text: "…", isLie: false } },
];

test("catching the liar needs the right suspect and the right truth", () => {
  assert.equal(flagLiar(fresh, suspects, "mae", 0).correct, true);
  assert.equal(flagLiar(fresh, suspects, "mae", 2).correct, false);
  assert.equal(flagLiar(fresh, suspects, "teddy", null).correct, false);
});

test("the LIAR stamp never changes the guesses remaining", () => {
  const { state } = flagLiar(fresh, suspects, "mae", 0);
  assert.equal(guessesLeft(state), MAX_GUESSES);
  assert.deepEqual(state.guesses, []);
});

test("the LIAR stamp is one shot, and only while the case is open", () => {
  const used = flagLiar(fresh, suspects, "teddy", null).state;
  const again = flagLiar(used, suspects, "mae", 0);
  assert.equal(again.rejected, true);
  assert.equal(again.state.liar.correct, false);
  const closed = accuse(fresh, solution, solution).state;
  assert.equal(flagLiar(closed, suspects, "mae", 0).rejected, true);
});
