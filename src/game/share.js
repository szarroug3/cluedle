// The share card: case number, a row per guess, cipher and liar results, the rank, the
// case's noir line, and a link to play. No names, and only red, blue, and purple emoji, which show
// on light and dark backgrounds (no orange, yellow, or green). Purple is the liar caught with the
// wrong story.

export const SHARE_EMOJI = ["\u{1F535}", "\u{1F534}", "\u2611\uFE0F", "\u274C", "\u{1F7E3}"];
const [RIGHT, WRONG, YES, NO, HALF] = SHARE_EMOJI;

// Always the live address, so a card copied while testing locally never shares localhost.
export const PLAY_URL = "https://szarroug3.github.io/cluedle/";

export function shareText(caseNumber, caseData, progress, rank) {
  const closed = progress.status === "closed";
  // Right parts first, so a row never says which part was right.
  const rows = progress.guesses.map((g) => RIGHT.repeat(g.rightCount) + WRONG.repeat(3 - g.rightCount));
  return [
    `CLUEDLE · CASE #${caseNumber}`,
    closed ? `━━ CLOSED in ${progress.guesses.length}/5 ━━` : "━━ GONE COLD ━━",
    ...rows,
    `Cipher ${progress.cipher.cracked ? YES : NO}  Liar ${progress.liar?.correct ? YES : progress.liar?.partial ? HALF : NO}`,
    ...(closed && rank ? [`Rank: ${rank}`] : []),
    `“${caseData.shareLine}”`,
    PLAY_URL,
  ].join("\n");
}
