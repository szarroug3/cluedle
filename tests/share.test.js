import { test } from "node:test";
import assert from "node:assert/strict";
import { shareText, SHARE_EMOJI } from "../src/game/share.js";
import { cases } from "../src/cases/index.js";

const caseData = cases[0];
const guess = (rightCount) => ({ suspectId: "mae", motiveId: "debts", weaponId: "cushion", rightCount });
const closed = {
  status: "closed",
  guesses: [guess(1), guess(2), guess(3)],
  cipher: { found: true, wrongTries: 0, cracked: true },
  liar: { suspectId: "mae", truthIndex: 0, correct: true },
};
const cold = { status: "cold", guesses: [1, 0, 2, 1, 2].map(guess), cipher: { found: false, wrongTries: 0, cracked: false }, liar: null };

test("a closed case reads like the case-file card", () => {
  assert.equal(
    shareText(1, caseData, closed, "Seasoned Detective"),
    [
      "CLUEDLE · CASE #1",
      "━━ CLOSED in 3/5 ━━",
      "🔵⚫⚫",
      "🔵🔵⚫",
      "🔵🔵🔵",
      "Cipher ✔️  Liar ✔️",
      "Rank: Seasoned Detective",
      `“${caseData.shareLine}”`,
    ].join("\n"),
  );
});

test("a cold case reads GONE COLD and shows no rank", () => {
  const text = shareText(4, caseData, cold, null);
  assert.match(text, /━━ GONE COLD ━━/);
  assert.doesNotMatch(text, /Rank/);
  assert.match(text, /Cipher ✖️ {2}Liar ✖️/);
  assert.equal(text.split("\n").filter((line) => /^[🔵⚫]+$/u.test(line)).length, 5);
});

test("no suspect, motive, or weapon names, and no emoji outside the allowed set", () => {
  for (const progress of [closed, cold]) {
    const text = shareText(1, caseData, progress, "Private Eye");
    for (const s of caseData.suspects) assert.ok(!text.includes(s.name), s.name);
    for (const m of caseData.motives) assert.ok(!text.includes(m.text), m.text);
    for (const w of caseData.weapons) assert.ok(!text.includes(w.name), w.name);
    const emoji = text.match(/\p{Extended_Pictographic}️?/gu) ?? [];
    for (const e of emoji) assert.ok(SHARE_EMOJI.includes(e), `unexpected emoji ${e}`);
  }
});
