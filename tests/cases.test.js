// Every case is well formed and solvable.
import { test } from "node:test";
import assert from "node:assert/strict";
import { cases } from "../src/cases/index.js";

const NUMBER_WORDS = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve",
  "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "twenty-one",
  "twenty-two", "twenty-three", "twenty-four", "twenty-five",
];

for (const c of cases) {
  // Six of each, so working through the cards in order can't always win in five guesses.
  test(`${c.id}: has a title, story, and 6 suspects, motives, and statements with unique ids`, () => {
    assert.ok(c.title);
    assert.ok(c.clipping.headline && c.clipping.body);
    for (const list of [c.suspects, c.motives, c.statements]) {
      assert.equal(list.length, 6);
      assert.equal(new Set(list.map((x) => x.id)).size, list.length, "ids must be unique");
    }
  });

  test(`${c.id}: the solution points at a real suspect and motive`, () => {
    assert.ok(c.suspects.some((s) => s.id === c.solution.suspectId));
    assert.ok(c.motives.some((m) => m.id === c.solution.motiveId));
  });

  test(`${c.id}: exactly one statement lies, with valid truth options`, () => {
    const lies = c.statements.filter((s) => s.isLie);
    assert.equal(lies.length, 1);
    const [lie] = lies;
    assert.ok(Array.isArray(lie.truthOptions) && lie.truthOptions.length >= 2);
    assert.ok(Number.isInteger(lie.truthIndex) && lie.truthIndex >= 0 && lie.truthIndex < lie.truthOptions.length);
  });

  test(`${c.id}: has four plain clues, one per possible miss`, () => {
    assert.equal(c.clues.length, 4);
    for (const clue of c.clues) assert.ok(clue.trim());
  });

  test(`${c.id}: the cipher has a shift of 1–25 and keep words found in the message`, () => {
    assert.ok(Number.isInteger(c.cipher.shift) && c.cipher.shift >= 1 && c.cipher.shift <= 25);
    assert.ok(c.cipher.hiddenOn);
    for (const word of c.cipher.keepWords) assert.ok(c.cipher.plaintext.includes(word), `missing keep word ${word}`);
  });

  test(`${c.id}: the cipher key appears in the story, as a numeral or a word`, () => {
    const word = NUMBER_WORDS[c.cipher.shift];
    assert.match(c.clipping.body, new RegExp(`\\b(${c.cipher.shift}|${word})\\b`, "i"));
  });

  test(`${c.id}: both endings are written`, () => {
    assert.ok(c.endings.closed.headline && c.endings.closed.text && c.endings.closed.saved);
    assert.ok(c.endings.cold.headline && c.endings.cold.text && c.endings.cold.cost);
  });

  test(`${c.id}: the share line gives nothing away`, () => {
    const line = c.shareLine.toLowerCase();
    assert.ok(line);
    for (const s of c.suspects) {
      for (const part of s.name.toLowerCase().replace(/[^a-z ]/g, "").split(" ")) {
        if (part.length > 2) assert.ok(!line.includes(part), `share line names ${s.name}`);
      }
    }
    for (const m of c.motives) assert.ok(!line.includes(m.text.toLowerCase()), `share line gives the motive`);
  });
}
