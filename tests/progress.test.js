import { test } from "node:test";
import assert from "node:assert/strict";
import { load, save, seenHowTo, markHowToSeen } from "../src/game/progress.js";

function memoryStore() {
  const data = new Map();
  return {
    get length() { return data.size; },
    key: (i) => [...data.keys()][i] ?? null,
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => data.set(k, String(v)),
    removeItem: (k) => data.delete(k),
    data,
  };
}

const blocked = new Proxy({}, { get() { throw new Error("storage blocked"); } });

test("progress saved today loads back the same", () => {
  const store = memoryStore();
  const progress = { caseId: "orchid-house", status: "playing", guesses: [], strings: [["a", "b"]] };
  save("2026-10-24", progress, store);
  assert.deepEqual(load("2026-10-24", "2026-10-24", store), progress);
});

test("earlier days are cleared, but today's demo slots are kept", () => {
  const store = memoryStore();
  save("2026-10-23", { old: true }, store);
  save("2026-10-24:case-2", { demo: true }, store);
  assert.equal(load("2026-10-24", "2026-10-24", store), null);
  assert.equal(store.getItem("cluedle:progress:2026-10-23"), null);
  assert.deepEqual(load("2026-10-24:case-2", "2026-10-24", store), { demo: true });
});

test("the how-to-play is remembered once seen", () => {
  const store = memoryStore();
  assert.equal(seenHowTo(store), false);
  markHowToSeen(store);
  assert.equal(seenHowTo(store), true);
});

test("blocked storage never throws; nothing is remembered", () => {
  assert.doesNotThrow(() => save("2026-10-24", { a: 1 }, blocked));
  assert.equal(load("2026-10-24", "2026-10-24", blocked), null);
  assert.doesNotThrow(() => markHowToSeen(blocked));
  assert.equal(seenHowTo(blocked), false);
});
