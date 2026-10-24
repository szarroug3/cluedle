import { test } from "node:test";
import assert from "node:assert/strict";
import { dateKey, caseNumberFor, caseIndexFor, msUntilNextCase, LAUNCH_DAY } from "../src/game/daily.js";

test("the date key is the local date", () => {
  assert.equal(dateKey(new Date(2026, 9, 24, 23, 59)), "2026-10-24");
  assert.equal(dateKey(new Date(2026, 0, 5, 0, 1)), "2026-01-05");
});

test("launch day is case #1, and each day after is the next case", () => {
  assert.equal(caseNumberFor(LAUNCH_DAY), 1);
  assert.equal(caseNumberFor("2026-10-25"), 2);
  assert.equal(caseNumberFor("2026-11-24"), 32);
  assert.equal(caseNumberFor("2027-10-24"), 366);
});

test("the same date always plays the same case, and the next date a different one", () => {
  const index = (key) => caseIndexFor(caseNumberFor(key), 3);
  assert.equal(index("2026-10-26"), index("2026-10-26"));
  assert.notEqual(index("2026-10-26"), index("2026-10-27"));
  assert.deepEqual(["2026-10-24", "2026-10-25", "2026-10-26", "2026-10-27"].map(index), [0, 1, 2, 0]);
});

test("the days count stays right across a daylight-saving change", () => {
  assert.equal(caseNumberFor("2026-11-02") - caseNumberFor("2026-10-31"), 2);
  assert.equal(caseNumberFor("2027-03-15") - caseNumberFor("2027-03-13"), 2);
});

test("the countdown runs to local midnight", () => {
  assert.equal(msUntilNextCase(new Date(2026, 9, 24, 23, 0, 0)), 60 * 60 * 1000);
  assert.equal(msUntilNextCase(new Date(2026, 9, 24, 0, 0, 0)), 24 * 60 * 60 * 1000);
});
