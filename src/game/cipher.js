// Letter-shift (Caesar) cipher over A–Z, checking the player's written answer, and ink blots
// for each wrong answer. No DOM here: the board and the blank card call these and draw the result.

export const MAX_TRIES = 3;
export const BLOT = "█";

// Share of blottable letters lost after 0, 1, and 2 wrong tries.
const BLOT_SHARE = [0, 0.3, 0.6];

function shiftChar(ch, shift) {
  const code = ch.charCodeAt(0);
  if (code >= 65 && code <= 90) return String.fromCharCode((((code - 65 + shift) % 26) + 26) % 26 + 65);
  if (code >= 97 && code <= 122) return String.fromCharCode((((code - 97 + shift) % 26) + 26) % 26 + 97);
  return ch;
}

export function encode(text, shift) {
  return [...text].map((ch) => shiftChar(ch, shift)).join("");
}

export function decode(text, shift) {
  return encode(text, -shift);
}

export function isLocked(state) {
  return state.cracked || state.wrongTries >= MAX_TRIES;
}

const lettersOf = (text) => text.toUpperCase().replace(/[^A-Z\u2588]/g, "");

// Does the written answer match the message, as far as it can still be read?
// Only letters count. Blotted letters may be guessed or left out, and about one
// letter in ten may be wrong, so a typo or two doesn't cost a try.
export function matchesMessage(answer, readable) {
  const target = [...lettersOf(readable)];
  const input = [...answer.toUpperCase().replace(/[^A-Z]/g, "")];
  const known = target.filter((ch) => ch !== BLOT).length;
  const allowed = Math.max(2, Math.floor(known * 0.1));

  // Edit distance where a blot matches any letter, or nothing, for free.
  let row = Array.from({ length: input.length + 1 }, (_, j) => j);
  for (const ch of target) {
    const next = [ch === BLOT ? row[0] : row[0] + 1];
    for (let j = 1; j <= input.length; j++) {
      next[j] =
        ch === BLOT
          ? Math.min(row[j], row[j - 1], next[j - 1] + 1)
          : Math.min(row[j] + 1, next[j - 1] + 1, row[j - 1] + (ch === input[j - 1] ? 0 : 1));
    }
    row = next;
  }
  return row[input.length] <= allowed;
}

// One written answer on the blank card. Returns the new cipher state; never changes the input.
export function attempt(state, cipher, answer, seed) {
  if (isLocked(state)) return { correct: false, rejected: true, state };
  const readable = blotted(cipher.plaintext, state.wrongTries, seed, cipher.keepWords);
  if (matchesMessage(answer, readable)) return { correct: true, state: { ...state, cracked: true } };
  return { correct: false, state: { ...state, wrongTries: state.wrongTries + 1 } };
}

// Small seeded random generator, so the same case always blots the same letters.
function seededRandom(seed) {
  let h = 1779033703 ^ seed.length;
  for (const ch of seed) {
    h = Math.imul(h ^ ch.charCodeAt(0), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

function protectedIndices(plaintext, keepWords) {
  const kept = new Set();
  for (const word of keepWords) {
    const pattern = new RegExp(`\\b${word}\\b`, "gi");
    for (const match of plaintext.matchAll(pattern)) {
      for (let i = 0; i < word.length; i++) kept.add(match.index + i);
    }
  }
  return kept;
}

// Letters replaced by BLOT after `wrongTries` misses. The order is a fixed shuffle,
// so each miss only adds blots, and keep words are never blotted.
export function blotted(plaintext, wrongTries, seed, keepWords = []) {
  const share = BLOT_SHARE[Math.min(wrongTries, BLOT_SHARE.length - 1)];
  const kept = protectedIndices(plaintext, keepWords);
  const order = [...plaintext].flatMap((ch, i) => (/[a-z]/i.test(ch) && !kept.has(i) ? [i] : []));

  const random = seededRandom(seed);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  const gone = new Set(order.slice(0, Math.round(order.length * share)));
  return [...plaintext].map((ch, i) => (gone.has(i) ? BLOT : ch)).join("");
}
