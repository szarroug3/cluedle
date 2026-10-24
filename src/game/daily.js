// Which case is today's: one per local day, the same for everyone, rotating through the cases.

export const LAUNCH_DAY = "2026-10-24";
const DAY_MS = 24 * 60 * 60 * 1000;

const pad = (n) => String(n).padStart(2, "0");

// The player's local date as YYYY-MM-DD.
export function dateKey(now = new Date()) {
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

// Whole days between two date keys, counted on the calendar so daylight saving can't skew it.
function daysBetween(fromKey, toKey) {
  const utc = (key) => {
    const [y, m, d] = key.split("-").map(Number);
    return Date.UTC(y, m - 1, d);
  };
  return Math.round((utc(toKey) - utc(fromKey)) / DAY_MS);
}

// Case #1 on launch day, #2 the next day, and so on.
export function caseNumberFor(key) {
  return Math.max(1, daysBetween(LAUNCH_DAY, key) + 1);
}

// Which of the cases a case number plays.
export function caseIndexFor(caseNumber, caseCount) {
  return (caseNumber - 1) % caseCount;
}

// Milliseconds until the next local midnight, for the countdown.
export function msUntilNextCase(now = new Date()) {
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return midnight - now;
}
