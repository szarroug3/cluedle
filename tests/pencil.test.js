// Pencil marks snap to whole words and merge with marks of the same colour they overlap.
import { test } from "node:test";
import assert from "node:assert/strict";
import { addMark } from "../src/ui/pencil.js";

const text = "The scream went out at 9:24 by the studio clock.";
const at = (word) => text.indexOf(word);

test("a mark snaps out to the whole words it touches", () => {
  const [mark] = addMark([], text, { target: "clipping", start: at("ream"), end: at("9:24") + 2, color: "red" });
  assert.equal(text.slice(mark.start, mark.end), "scream went out at 9:24");
});

test("snapping stops where one line ends and the next begins", () => {
  const rows = "9:12 soap spot P.A.9:18 act 3";
  const row2 = rows.indexOf("9:18");
  const [mark] = addMark([], rows, { target: "evidence:log", start: row2, end: row2 + 4, color: "red" }, new Set([row2]));
  assert.equal(rows.slice(mark.start, mark.end), "9:18");
});

test("marks that only touch at a line's edge stay separate", () => {
  const rows = "9:12 soap spot P.A.9:18 act 3";
  const row2 = rows.indexOf("9:18");
  const breaks = new Set([row2]);
  const first = addMark([], rows, { target: "evidence:log", start: row2, end: row2 + 4, color: "red" }, breaks);
  const both = addMark(first, rows, { target: "evidence:log", start: rows.indexOf("P.A."), end: row2, color: "red" }, breaks);
  assert.equal(both.length, 2);
});

test("a selection of only spaces marks nothing", () => {
  const marks = [];
  assert.equal(addMark(marks, text, { target: "clipping", start: 3, end: 4, color: "red" }), marks);
});

test("an overlapping mark of the same colour is swallowed into the new one", () => {
  const first = addMark([], text, { target: "clipping", start: at("scream"), end: at("went") + 4, color: "red" });
  const both = addMark(first, text, { target: "clipping", start: at("went"), end: at("out") + 3, color: "red" });
  assert.equal(both.length, 1);
  assert.equal(text.slice(both[0].start, both[0].end), "scream went out");
});

test("marks of another colour or on another target are left alone", () => {
  const red = addMark([], text, { target: "clipping", start: at("scream"), end: at("went") + 4, color: "red" });
  const blue = addMark(red, text, { target: "clipping", start: at("went"), end: at("out") + 3, color: "blue" });
  const elsewhere = addMark(blue, text, { target: "clue:0", start: at("went"), end: at("out") + 3, color: "red" });
  assert.equal(elsewhere.length, 3);
});
