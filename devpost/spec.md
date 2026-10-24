---
doc: spec
status: approved
---

# Cluedle — Technical Spec

## How This Works, In Plain Language
Cluedle is a single web page made of plain HTML, CSS, and JavaScript, with no framework and no build step.

- **The cases are data files.** Each of the three cases is a JavaScript file that describes the story, suspects and their statements (which one lies), motives, weapons, clues in unlock order, the hidden cipher, the solution, and both endings. The game never generates anything; it only reads these files.
- **The rules are a separate, tested layer.** Small JavaScript modules decide today's case, check an accusation, handle the LIAR shot, run the cipher and its blotting, count points for the rank, and write the share card. They don't touch the screen, so automated tests can check every rule by itself.
- **The board is the screen layer.** Other modules draw the case file, the how-to-play, the murder board, the stamps, the red string, the decoder card, and the ending, and pass the player's actions to the rules.
- **Progress lives in the browser.** After every action, the game saves the player's progress for today in `localStorage`, a small notebook the browser keeps for one site. Reopening the page reads it back, so a reload never resets cipher tries or the LIAR shot.

Why this shape: everything Cluedle does is moving things around on one page, so a framework would add setup without helping. Keeping the rules apart from the screen means the rules can be tested and won't break quietly while the look is being polished.

## The Core Journey Through the System
PRD ref: `prd.md > The Core Journey`.

1. **The player opens the page.** `main.js` asks `daily.js` for today's date key and case, then asks `progress.js` for today's saved progress (none on a first visit).
2. **Case file.** `caseFile.js` shows the cover for that case. **Open the file** →
3. **How to play.** If `cluedle:seenHowTo` isn't set, `howToPlay.js` shows the overlay and sets it when closed.
4. **The board.** `board.js` lays out the case's pins from the case file data and redraws anything already in the progress: past stamps, unlocked clues, strings, cipher state.
5. **Red string.** `string.js` adds or removes a string between two pins and saves it. Rules never read it.
6. **Cipher.** Clicking any scrap, the scrawl included, opens the same close-up from `decoder.js`. Clicking the blank card opens it with its two letter strips. **Pin it** calls `cipher.js` with the written answer. Right → the real message flips in, with blots for earlier misses, and stays on the blank card. Wrong → one more blot stage on the scrawl. The result is saved.
7. **Accuse.** `stamps.js` collects a GUILTY stamp on a suspect, a motive, and a weapon. Confirm calls `rules.js`, which counts how many parts are right, records the guess, and says whether a clue unlocks or the case has ended. The stamps are numbered, the spent guess on the rail shows its count, a new clue pins up, and progress is saved.
8. **LIAR.** `stamps.js` collects a LIAR stamp on a suspect card, then the player picks a truth about that suspect's statement. `rules.js` records the one shot, and the stamp recolors.
9. **Ending.** When `rules.js` says closed or cold, `rank.js` scores the run (closed only), and `ending.js` shows the ending and rank.
10. **Share.** `share.js` builds the card text; `ending.js` copies it to the clipboard, or shows it to copy by hand.
11. **Return.** On a later visit the same day, progress says closed or cold, so `main.js` shows the finished board with the ending and a countdown from `daily.js`.

## Stack
- **HTML, CSS, JavaScript (ES modules)** in the browser. No framework, no bundler. Learner accepted this recommendation: the game is DOM and SVG work, and a framework adds setup without helping. Tradeoff accepted: it needs a local server, not double-clicking the file. References: [MDN JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).
- **SVG** for the red string. [MDN SVG](https://developer.mozilla.org/en-US/docs/Web/SVG).
- **Pointer events** for stamping, drawing string, and sliding the letter strips, so mouse and touch both work. [MDN Pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events).
- **`localStorage`** for progress. [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
- **Clipboard API** (`navigator.clipboard.writeText`) for the share card. [MDN Clipboard](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText).
- **Node's built-in test runner** (`node --test`) for the rules, with no packages to install. Node v24 is installed. [Node test runner](https://nodejs.org/api/test.html).
- **Google Fonts** for type (see `## Look and Feel`), with local fallback fonts if offline. [Google Fonts](https://fonts.google.com/).

Nothing here needs an account, a key, or a paid plan.

## Where It Runs and How Someone Tries It
- **Runs in:** any modern browser. Requires Node.js for the local server and tests.
- **Start it:** from the project folder, run `npx serve .` (or `python3 -m http.server 8000`), then open the address it prints, for example `http://localhost:3000`.
- **Run the tests:** `npm test` (runs `node --test`).
- **Demo recording:** open the local address and record the board with a screen recorder. The video should show finding and cracking the cipher, a wrong guess pinning a clue, the LIAR stamp, solving the case, the rank, and pasting the share card.
- **Showing a specific case:** adding `?case=2` to the address loads that case instead of today's, and `?fresh` ignores saved progress. This is a demo and testing aid, so all three cases can be recorded on any day.
- **Optional playable link (nice to have):** GitHub Pages serves the repository's static files as is, so the same files work there with no changes. Deploy steps belong to `6-ship`. GitHub commands should target github.com explicitly. [GitHub Pages docs](https://docs.github.com/en/pages).

## Look and Feel
From `prd.md > Look and Feel`.

- **Mood:** 1940s noir. A corkboard under a single desk lamp: a warm pool of light in the middle of the board, falling off into dark edges.
- **Palette:** defined once as CSS variables in `styles/base.css`.
  - Night background: near-black violet (around `#13111c`).
  - Paper: worn off-white (around `#efe9dd`) for clippings, cards, and statements.
  - Cork: a desaturated brown-violet, so the board doesn't read as orange.
  - Red (around `#b3263a`): string, the GUILTY stamp, wrong answers.
  - Blue (around `#2f5aa8`): right answers.
  - Purple (around `#6b3fa0`): the LIAR stamp, the decoder, accents.
  - **No orange, yellow, or green anywhere**, including hover states, focus rings, and emoji.
- **Type:**
  - Typewriter for statements, clues, and the case file: Special Elite, falling back to Courier New.
  - Newspaper display for headlines: Playfair Display, falling back to Georgia.
  - A plain serif for longer story text, for readability.
- **Texture:** paper and cork made with CSS gradients and noise. No image files are needed; images are optional polish later.
- **Stamps:** rubber-stamp lettering with uneven ink (a slight rotation, rough edges using an SVG filter), landing with a quick thump animation.
- **Copy tone:** terse, hard-boiled narration. "The file's open. Somebody in this room is lying."
- **Density:** one screen, no scrolling on a laptop. Pins are spaced so string has room to run between them.

## Components

### Case Data
Each case is one module exporting a case object (see `## Data Model`). `src/cases/index.js` exports the ordered list of three. Claude drafts the cases and the learner edits them.
PRD ref: `prd.md > Daily Case`.

### Daily Case Selection (`src/game/daily.js`)
- `dateKey(now)` → the player's local date as `YYYY-MM-DD`.
- `caseForDate(dateKey)` → the case number (days since launch day, 2026-10-24, plus one) and which case to play (case number minus one, modulo 3).
- `msUntilNextCase(now)` → milliseconds to local midnight, for the countdown.
- The `?case=N` query overrides the case for demos and testing.
PRD ref: `prd.md > Daily Case`, `prd.md > States and Boundaries`.

### Game Rules (`src/game/rules.js`)
- `accuse(state, suspectId, motiveId, weaponId)` → `{ rightCount, solved, unlockedClueIndex, status }`. Only the count of right parts is returned, never which. It uses one guess, records it, unlocks the next clue on a miss, and ends the case on a solve or on the fifth miss.
- `flagLiar(state, suspectId, truthIndex)` → `{ correct }`. Allowed once per case, and only while playing. It never changes guesses.
- Rejects actions after the case has ended.
PRD ref: `prd.md > Accusing With the GUILTY Stamp`, `prd.md > Clues Unlocking`, `prd.md > Catching the Liar With the LIAR Stamp`, `prd.md > Case Ending`.

### Cipher (`src/game/cipher.js`)
- `encode(text, shift)` and `decode(text, shift)`: a letter-shift (Caesar) cipher over A–Z, keeping case, spaces, and punctuation.
- The case stores the **plaintext** and the **shift**; the scrambled text is made with `encode`, so it can't drift out of sync.
- `matchesMessage(answer, readable)` → whether the written answer matches the message as far as it can still be read: letters only, blotted letters may be guessed or skipped, and about one letter in ten may be wrong.
- `attempt(state, cipher, answer, seed)` → right or wrong. It allows three tries, then locks.
- `blotted(plaintext, wrongTries, seed)` → the message with a fixed share of letters replaced by ink blots: none after zero misses, about 30% after one, about 60% after two. Which letters blot is decided by a seeded shuffle from the case id, so the same case always blots the same way, and blots only add up. The case can list `keepWords` that never blot, so a partly blotted clue stays useful.
- The letter strips on the blank card never call into `cipher.js`; they only line up two alphabets.
PRD ref: `prd.md > Finding and Cracking the Cipher`.

### Rank (`src/game/rank.js`)
- `points(progress)` → 0–10: guesses left after solving (0–4), cipher (3/2/1/0 for a first, second, or third-try crack, or none), and liar caught (3).
- `rankFor(points)` → Amateur Sleuth (0–1), Private Eye (2–3), Hard-Boiled Investigator (4–5), Seasoned Detective (6–7), Basically Sherlock (8–10).
- Values and bands live in one table at the top of the file so they're easy to tune.
PRD ref: `prd.md > Detective Rank`.

### Share Card (`src/game/share.js`)
- `shareText(caseNumber, case, progress, rank)` → the case-file card text from `prd.md > Share Card`: case number, CLOSED in N/5 or GONE COLD, one 🔵/⚫ row per guess (right parts first), cipher ✔️/✖️, liar ✔️/✖️, the rank (closed only), and the case's noir line.
- Never includes suspect or motive names. Uses only red, purple, blue, and neutral emoji.
PRD ref: `prd.md > Share Card`.

### Progress Storage (`src/game/progress.js`)
- `load(dateKey)` and `save(dateKey, progress)` under the key `cluedle:progress:<dateKey>`. `cluedle:seenHowTo` is stored separately.
- Every read and write is wrapped so a blocked or full `localStorage` never breaks play; the game just won't remember.
- Progress from earlier days is ignored, and old keys are deleted on load.
PRD ref: `prd.md > States and Boundaries`.

### App Shell (`src/main.js`)
Starts the app. It reads the date, case, and progress; decides whether to show the case file, the board, or the finished board with the ending; and connects the screen modules to the rules. It's the only place that calls `progress.save`, right after each rule call.

### Case File Cover (`src/ui/caseFile.js`)
Case number, date, title, **Open the file**.
PRD ref: `prd.md > Case File and How to Play`.

### How to Play (`src/ui/howToPlay.js`)
A short overlay covering the stamps, the five guesses, "something on this board is hiding a message," and the red string. It's shown on the first visit and reopened from a **?** on the board.
PRD ref: `prd.md > Case File and How to Play`.

### Murder Board (`src/ui/board.js`)
- Lays out pins from the case data: the newspaper clipping, suspect cards (clicking one brings its statement forward), motive cards, weapon cards, clue slots, evidence scraps with the hidden scrawl, and the blank card. The edges hold the stamp tray, the string spool, the guesses left (five bullet holes or matches), and **?**.
- Positions come from a fixed layout per pin type, with an optional `pos` per pin in the case data for hand-tuning.
- Every pin has a stable id, which string, stamps, and progress use.
PRD ref: `prd.md > Screens and Layout`.

### Stamps (`src/ui/stamps.js`)
- Click **GUILTY** or **LIAR** in the tray to pick it up (the cursor becomes the stamp). Click a valid card to stamp it. Stamps can be moved before confirming.
- GUILTY needs one suspect, one motive, and one weapon, then **Make the accusation**. LIAR needs one suspect card, then a small slip of truth options.
- After the rule call, GUILTY stamps stay on the cards numbered by guess (#1, #2, …), slightly offset so every guess stays visible; they turn blue only on a full match. The spent guess on the rail shows how many parts were right. A LIAR stamp turns blue or red.
PRD ref: `prd.md > Accusing With the GUILTY Stamp`, `prd.md > Catching the Liar With the LIAR Stamp`.

### Red String (`src/ui/string.js`)
- An SVG layer over the board. Click the spool to start, click pin A, then pin B, to tie a string. Click a string to remove it.
- Strings are drawn as slightly sagging curves between pin heads. No physics.
- Saved in progress as pin-id pairs and redrawn on load.
PRD ref: `prd.md > Red String`.

### Close Look and Blank Card (`src/ui/decoder.js`)
- **Close look:** any scrap (decoys and the scrawl alike) brought forward to read, with blots drawn as ink. No controls, so nothing marks the cipher.
- **Blank card:** a space to write the decoded message, two side-by-side A–Z strips that each slide up or down (drag, or their ▲▼ arrows) and wrap around, the gap between them shown in the middle, letters that write themselves into the answer when clicked, Space and ⌫ keys, **Pin it**, and tries left.
- On a right answer, it plays the reveal: the real message flips into place left to right, and blotted letters stay as ink. As the card closes, the blank card on the board fills in with the message.
PRD ref: `prd.md > Finding and Cracking the Cipher`.

### Case Ending (`src/ui/ending.js`)
**CASE CLOSED** or **GONE COLD** over the board, with what happened, who was saved or what it cost, the rank, **Copy share card**, and the countdown when revisiting.
PRD ref: `prd.md > Case Ending`, `prd.md > Share Card`, `prd.md > States and Boundaries`.

## Data Model

### Case (authored, read-only)
```js
{
  id: "orchid-house",            // stable id, also the blot seed
  title: "The Orchid House",
  clipping: { headline, dateline, body },   // the story; contains the cipher key somewhere
  suspects:   [{ id, name, role, description,             // 6; every witness is a suspect
                 statement: { text, isLie,                // exactly one isLie
                              truthOptions: [string], truthIndex } }],  // options only on the lie
  motives:    [{ id, text }],                             // 6
  weapons:    [{ id, name, detail }],                     // 6
  clues:      [string],          // plain clues, in unlock order (4: one per possible miss)
  photo:      { caption },       // a pinned photograph; scenery, and a place to hide the scrawl
  evidence:   [{ id, kind, label, note }],  // decoy scraps (matchbook, ticket, prescription) in the same pencil hand as the scrawl;
                                            // every scrap opens the same close-up
  cipher: {
    hiddenOn: "photo",           // which pin hides the scrawl
    plaintext: "...",
    shift: 7,                    // 1–25; its key is hidden in the clipping, alongside decoy numbers
    keepWords: ["..."]           // never blotted
  },
  solution: { suspectId, motiveId, weaponId },
  endings: {
    closed: { headline, text, saved },
    cold:   { headline, text, cost }
  },
  shareLine: "The ink never lies."
}
```
One cipher per case for the proof of concept (see `## What Was Simplified and Why`).

### Progress (per day, `localStorage`)
```js
{
  caseId, dateKey,
  status: "playing" | "closed" | "cold",
  guesses: [{ suspectId, motiveId, weaponId, rightCount }],   // how many of the three are right
  liar: null | { suspectId, truthIndex, correct },
  cipher: { found: false, wrongTries: 0, cracked: false },
  strings: [["pinA", "pinB"]]
}
```
- **Where it lives:** `localStorage["cluedle:progress:<dateKey>"]`.
- **How it updates:** `main.js` saves the whole object after every rule call and every string change.
- **When the player leaves and comes back:** the same day, everything is restored. A new day starts fresh, and old days are deleted.
- **Seen how-to:** `localStorage["cluedle:seenHowTo"] = "1"`.
- Derived each time from progress, not stored: unlocked clues (the number of wrong guesses), the rank, and the share text.

## File Structure
```
cluedle/
├── index.html              # the one page: font links, empty screen containers, loads src/main.js
├── styles/
│   ├── base.css            # palette variables, type, textures, lamp light
│   ├── board.css           # corkboard, pins, cards, clipping, statements, tray
│   ├── stamps.css          # stamp look, ink colors, thump animation
│   └── overlays.css        # case file, how-to-play, decoder, ending
├── src/
│   ├── main.js             # app shell: wires rules ↔ screens, saves progress
│   ├── cases/
│   │   ├── index.js        # ordered list of cases
│   │   ├── case-1.js       # Claude drafts, learner edits
│   │   ├── case-2.js
│   │   └── case-3.js
│   ├── game/               # pure rules, no DOM, all tested
│   │   ├── daily.js
│   │   ├── rules.js
│   │   ├── cipher.js
│   │   ├── rank.js
│   │   ├── share.js
│   │   └── progress.js
│   └── ui/                 # screen modules
│       ├── caseFile.js
│       ├── howToPlay.js
│       ├── board.js
│       ├── stamps.js
│       ├── string.js
│       ├── decoder.js
│       └── ending.js
├── tests/
│   ├── daily.test.js
│   ├── rules.test.js
│   ├── cipher.test.js
│   ├── rank.test.js
│   ├── share.test.js
│   └── cases.test.js       # every case is well formed and solvable (see below)
├── package.json            # "start": "npx serve .", "test": "node --test"; no dependencies
├── README.md               # what Cluedle is, how to run it, how to play
└── devpost/                # planning docs (scope, prd, spec, checklist)
```

`tests/cases.test.js` checks each case: there are 6 suspects (each with a statement), 6 motives, and 6 weapons, the solution ids exist, exactly one statement lies and has truth options, there are four clues, the cipher shift is 1–25, the keep words appear in the plaintext, and the share line has no suspect, motive, or weapon names.

## External Services and Dependencies
- **Google Fonts** (Special Elite, Playfair Display), loaded with a `<link>` in `index.html`. No key or cost. If it fails to load, the fallback fonts take over. [Special Elite](https://fonts.google.com/specimen/Special+Elite), [Playfair Display](https://fonts.google.com/specimen/Playfair+Display).
- **`serve`** from npm, run with `npx` only for local serving and not a project dependency. [serve on npm](https://www.npmjs.com/package/serve). Python's `http.server` is the fallback.
- **GitHub Pages** (optional), for static hosting. Free for public repositories.
- No APIs, no backend, no AI at runtime.

## Important Failure Modes
- **Clipboard blocked** (a `file://` page, an older browser, or permission denied) → the ending shows the card text selected in a box, with "Copy it by hand."
- **`localStorage` blocked or full** (private mode) → the game plays normally but won't remember progress, and nothing crashes.
- **Fonts don't load** (offline) → Courier New and Georgia fallbacks keep the noir feel.
- **Opened by double-clicking `index.html`** → ES modules won't load. `index.html` shows a short message: "Run `npx serve .` and open the address it prints."
- **A cipher that's too hidden or a case that isn't fair** → this isn't a code failure. It's checked by playing each case during the build, with `?case=N&fresh`.

## What Was Simplified and Why
- **One cipher per case** instead of "one or two." The rank, the share card, and the decoder all assume a single cipher, which keeps scoring simple. Supporting two would mean a list of cipher states and per-cipher points.
- **Every witness is a suspect**, so each statement lives on its suspect's card and the LIAR stamp goes on the card.
- **Exactly one lying statement per case** instead of "at least one." The LIAR stamp is one shot and catching the liar is worth one fixed bonus, so a single liar keeps that fair and easy to score.
- **Static curves for red string** instead of physics, as agreed in `scope.md > Later`.
- **Rotation by date, modulo three cases**, instead of a calendar of unique cases. With three cases, the cycle repeats every three days; adding cases four through seven only means adding files.
- **Textures from CSS** instead of photographed images. It's fast to build and no assets to source; images can be added later.
- **No end-to-end browser test suite.** The rules are tested automatically, and the screens are checked by playing in the browser at each build step. A browser-automation tool would add setup that doesn't help prove the idea.

## Decisions and Open Issues

### Decisions
- **Plain HTML, CSS, and JS with ES modules, no build step** — learner accepted the recommendation. Tradeoff: needs a local server.
- **Automated tests for the rules with `node --test`** — learner chose them to keep the agent from quietly breaking game rules, which ties to their learning goal of AI making fewer bad decisions.
- **GitHub Pages playable link** — learner: nice to have, after the core is done. Settled in `6-ship`.
- Derived implementation details (not separate learner choices): the module split, the `localStorage` keys, seeded blotting with `keepWords`, the `?case=N` and `?fresh` demo aids, and the fonts that carry out the agreed noir look.

### What the learner was unsure about, and how it gets checked
1. **The final look.** It's hard to judge noir from words. **Investigation:** the first build step is a static look test, case 1 laid out on the board with styling and no game logic. The learner reviews it in the browser and adjusts the look before any rules are wired up. Evidence: a screenshot the learner approves.
2. **Distinctiveness, given Murdle** (https://murdle.com). Checked on 2026-10-24. Murdle is a daily logic-grid puzzle: all the evidence is given up front, it includes a coded note and statements where the guilty party lies, and you deduce who, how, where, and why in one go. So encrypted notes and liars alone aren't what sets Cluedle apart. What Murdle doesn't have, and Cluedle does: a Wordle-style loop where each wrong guess pays out new evidence and a count of how many parts were right; a cipher you have to *find* on the board, whose key is in the story, and that blots out with each miss; a tactile murder board with stamps and string instead of a text grid; detective ranks; and an ending that says what failing cost. The demo should lead with those moments.

### Open issues
- **How hidden the cipher scrawl should be** — tuned while writing and playtesting cases (from `prd.md > Open Questions`).
- **Rank point values and bands** — tuned while playtesting (from `prd.md > Open Questions`).
- **Not verified:** `npx serve`'s current default port, which the README should state as "the address it prints." To check on first run.
