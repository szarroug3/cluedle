// Every case is well formed and solvable.
import { test } from "node:test";
import assert from "node:assert/strict";
import { cases } from "../src/cases/index.js";

const NUMBER_WORDS = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve",
  "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "twenty-one",
  "twenty-two", "twenty-three", "twenty-four", "twenty-five",
];

test("every case has its own id", () => {
  assert.equal(new Set(cases.map((c) => c.id)).size, cases.length);
});

// There are only 25 keys, so some reuse is allowed once there are enough cases. What isn't allowed is
// cases piling onto the same key (drafts converge on favourite numbers), or back-to-back days sharing one.
test("cipher keys are spread out across the cases", () => {
  const fairShare = Math.ceil(cases.length / 25);
  const uses = new Map();
  for (const c of cases) uses.set(c.cipher.shift, [...(uses.get(c.cipher.shift) ?? []), c.id]);
  for (const [shift, ids] of uses) {
    assert.ok(ids.length <= fairShare, `key ${shift} is used by ${ids.join(", ")} (at most ${fairShare} allowed)`);
  }
});

test("cases on back-to-back days never share a cipher key", () => {
  cases.forEach((c, i) => {
    const next = cases[(i + 1) % cases.length];
    if (next !== c) assert.notEqual(c.cipher.shift, next.cipher.shift, `${c.id} and ${next.id} share key ${c.cipher.shift}`);
  });
});

const PLAYED_BEFORE_CIPHER_RULE = ["last-curtain"];
const EVIDENCE_KINDS = [
  "matchbook", "ticket", "prescription", "telegram", "letter", "card", "receipt", "tag",
  "classified", "envelope", "report", "ledger", "slip", "stub", "fingerprint", "key",
];

for (const c of cases) {
  // Six of each, so working through the cards in order can't always win in five guesses.
  test(`${c.id}: has a title, story, and 6 suspects, motives, and weapons with unique ids`, () => {
    assert.ok(c.title);
    assert.ok(c.clipping.headline && c.clipping.body);
    for (const list of [c.suspects, c.motives, c.weapons]) {
      assert.equal(list.length, 6);
      assert.equal(new Set(list.map((x) => x.id)).size, list.length, "ids must be unique");
    }
  });

  test(`${c.id}: the solution points at a real suspect, motive, and weapon`, () => {
    assert.ok(c.suspects.some((s) => s.id === c.solution.suspectId));
    assert.ok(c.motives.some((m) => m.id === c.solution.motiveId));
    assert.ok(c.weapons.some((w) => w.id === c.solution.weaponId));
  });

  test(`${c.id}: every suspect gives a statement, and exactly one lies, with valid truth options`, () => {
    for (const s of c.suspects) assert.ok(s.statement?.text, `${s.id} has no statement`);
    const lies = c.suspects.map((s) => s.statement).filter((s) => s.isLie);
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

  test(`${c.id}: the scrawl is hidden on a real pin, with a known doodle and photo scene`, () => {
    const spots = ["photo", "clipping", ...c.evidence.map((e) => `evidence:${e.id}`)];
    assert.ok(spots.includes(c.cipher.hiddenOn), `nowhere called ${c.cipher.hiddenOn}`);
    assert.ok(["anchor", "star", "train", "moon", "key", "clock", "mask", "pen", "bell", "snowflake"].includes(c.cipher.doodle));
    assert.ok(["glasshouse", "theater", "train", "nightclub", "harbor", "hotel", "mansion", "office", "ring", "lodge"].includes(c.photo.scene));
    assert.equal(c.evidence.length, 3);
    for (const e of c.evidence) assert.ok(EVIDENCE_KINDS.includes(e.kind), `unknown scrap kind ${e.kind}`);
  });

  test(`${c.id}: the cipher key appears in the story, as a numeral or a word`, () => {
    const word = NUMBER_WORDS[c.cipher.shift];
    assert.match(c.clipping.body, new RegExp(`\\b(${c.cipher.shift}|${word})\\b`, "i"));
  });

  // The cipher is a small extra clue, never the answer: it may not name the culprit. Cases that had
  // already been played when this rule came in keep their original cipher.
  test(`${c.id}: the decoded message doesn't name the culprit`, { skip: PLAYED_BEFORE_CIPHER_RULE.includes(c.id) }, () => {
    const culprit = c.suspects.find((s) => s.id === c.solution.suspectId);
    for (const part of culprit.name.toUpperCase().replace(/[^A-Z ]/g, "").split(" ")) {
      if (part.length > 2) assert.ok(!new RegExp(`\\b${part}\\b`).test(c.cipher.plaintext), `the cipher names ${culprit.name}`);
    }
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
    for (const w of c.weapons) assert.ok(!line.includes(w.name.toLowerCase()), `share line gives the weapon`);
  });
}
