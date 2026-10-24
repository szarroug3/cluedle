// Today's progress, kept in the browser's localStorage. Every read and write is guarded, so a
// blocked or full storage (private browsing) never breaks play; the game just won't remember.

const PREFIX = "cluedle:progress:";
const SEEN_HOW_TO = "cluedle:seenHowTo";

function storage() {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

// `slot` is the date key, plus the case for a ?case=N demo, so demos never touch the daily game.
export function load(slot, dateKey, store = storage()) {
  try {
    // Earlier days' progress is no longer needed.
    for (let i = store.length - 1; i >= 0; i--) {
      const key = store.key(i);
      if (key?.startsWith(PREFIX) && !key.startsWith(PREFIX + dateKey)) store.removeItem(key);
    }
    const saved = store.getItem(PREFIX + slot);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function save(slot, progress, store = storage()) {
  try {
    store.setItem(PREFIX + slot, JSON.stringify(progress));
  } catch {
    // Not remembered this time; play goes on.
  }
}

export function seenHowTo(store = storage()) {
  try {
    return store.getItem(SEEN_HOW_TO) === "1";
  } catch {
    return false;
  }
}

export function markHowToSeen(store = storage()) {
  try {
    store.setItem(SEEN_HOW_TO, "1");
  } catch {
    // Shown again next time; harmless.
  }
}
