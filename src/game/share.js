// The share card: case number, a row per guess, cipher and liar results, the rank, and the
// case's noir line. No names, and only red and blue emoji, which show on light and dark backgrounds (no orange, yellow, or green).

export const SHARE_EMOJI = ["\u{1F535}", "\u{1F534}", "\u2611\uFE0F", "\u274C"];
const [RIGHT, WRONG, YES, NO] = SHARE_EMOJI;

export function shareText(caseNumber, caseData, progress, rank) {
  const closed = progress.status === "closed";
  // Right parts first, so a row never says which part was right.
  const rows = progress.guesses.map((g) => RIGHT.repeat(g.rightCount) + WRONG.repeat(3 - g.rightCount));
  return [
    `CLUEDLE · CASE #${caseNumber}`,
    closed ? `━━ CLOSED in ${progress.guesses.length}/5 ━━` : "━━ GONE COLD ━━",
    ...rows,
    `Cipher ${progress.cipher.cracked ? YES : NO}  Liar ${progress.liar?.correct ? YES : NO}`,
    ...(closed && rank ? [`Rank: ${rank}`] : []),
    `“${caseData.shareLine}”`,
  ].join("\n");
}
