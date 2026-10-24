import { test } from "node:test";
import assert from "node:assert/strict";
import { encode, decode, attempt, blotted, isLocked, matchesMessage, BLOT, MAX_TRIES } from "../src/game/cipher.js";

const cipher = { plaintext: "THE HOLLOWAY BOY WENT DOWN, at sea.", shift: 9, keepWords: ["HOLLOWAY"] };
const fresh = { found: false, wrongTries: 0, cracked: false };
const letters = (text) => [...text].filter((ch) => /[a-z]/i.test(ch)).length;
const blots = (text) => [...text].flatMap((ch, i) => (ch === BLOT ? [i] : []));

test("encode and decode round-trip, keeping case, spaces, and punctuation", () => {
  const scrambled = encode(cipher.plaintext, 9);
  assert.notEqual(scrambled, cipher.plaintext);
  assert.equal(scrambled.length, cipher.plaintext.length);
  assert.equal(encode("Abc, xyz!", 3), "Def, abc!");
  for (let shift = 1; shift <= 25; shift++) assert.equal(decode(encode(cipher.plaintext, shift), shift), cipher.plaintext);
});

const right = "The Holloway boy went down, at sea.";
const wrong = "pearl necklace, L.V.";

test("writing the message cracks it, ignoring case, spacing, and punctuation", () => {
  const { correct, state } = attempt(fresh, cipher, "the hollowayboy WENT DOWN at sea", "case");
  assert.equal(correct, true);
  assert.deepEqual(state, { found: false, wrongTries: 0, cracked: true });
});

test("a typo or two is forgiven, but a different message is not", () => {
  assert.equal(matchesMessage("THE HOLOWAY BOY WENT DOWM AT SEA", cipher.plaintext), true);
  assert.equal(matchesMessage("THE HOLLOWAY BOY WENT HOME FOR TEA", cipher.plaintext), false);
  assert.equal(matchesMessage("", cipher.plaintext), false);
});

test("blotted letters can be guessed or left out", () => {
  const readable = blotted(cipher.plaintext, 2, "case", cipher.keepWords);
  const visibleOnly = [...readable].filter((ch) => ch !== BLOT).join("");
  assert.equal(matchesMessage(visibleOnly, readable), true);
  assert.equal(matchesMessage(cipher.plaintext, readable), true);
});

test("a wrong answer costs one try and never changes the input state", () => {
  const { correct, state } = attempt(fresh, cipher, wrong, "case");
  assert.equal(correct, false);
  assert.equal(state.wrongTries, 1);
  assert.equal(fresh.wrongTries, 0);
});

test("a right answer after misses still cracks it and keeps the miss count", () => {
  let state = attempt(fresh, cipher, wrong, "case").state;
  state = attempt(state, cipher, wrong, "case").state;
  const result = attempt(state, cipher, right, "case");
  assert.equal(result.correct, true);
  assert.equal(result.state.wrongTries, 2);
});

test("three misses lock the cipher, and a locked or cracked cipher rejects more answers", () => {
  let state = fresh;
  for (let i = 0; i < MAX_TRIES; i++) state = attempt(state, cipher, wrong, "case").state;
  assert.equal(isLocked(state), true);
  const late = attempt(state, cipher, right, "case");
  assert.equal(late.rejected, true);
  assert.equal(late.state.cracked, false);

  const cracked = attempt(fresh, cipher, right, "case").state;
  assert.equal(attempt(cracked, cipher, right, "case").rejected, true);
});

test("no blots before any miss", () => {
  assert.equal(blotted(cipher.plaintext, 0, "case", cipher.keepWords), cipher.plaintext);
});

test("about 30% of blottable letters go after one miss and 60% after two", () => {
  const blottable = letters(cipher.plaintext) - "HOLLOWAY".length;
  assert.equal(blots(blotted(cipher.plaintext, 1, "case", cipher.keepWords)).length, Math.round(blottable * 0.3));
  assert.equal(blots(blotted(cipher.plaintext, 2, "case", cipher.keepWords)).length, Math.round(blottable * 0.6));
});

test("blots only add up, and the same case always blots the same way", () => {
  const one = blots(blotted(cipher.plaintext, 1, "case", cipher.keepWords));
  const two = blots(blotted(cipher.plaintext, 2, "case", cipher.keepWords));
  for (const i of one) assert.ok(two.includes(i));
  assert.deepEqual(blots(blotted(cipher.plaintext, 2, "case", cipher.keepWords)), two);
});

test("keep words, spaces, and punctuation are never blotted", () => {
  const text = blotted(cipher.plaintext, 2, "case", cipher.keepWords);
  assert.ok(text.includes("HOLLOWAY"));
  for (const i of blots(text)) assert.match(cipher.plaintext[i], /[a-z]/i);
});

test("blots carry through to the scrambled text in the same places", () => {
  const text = blotted(cipher.plaintext, 1, "case", cipher.keepWords);
  assert.deepEqual(blots(encode(text, 9)), blots(text));
});
