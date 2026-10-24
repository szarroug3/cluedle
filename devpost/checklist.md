---
doc: checklist
status: approved
---

# Build Checklist

Build mode: [learn or fast — record once chosen; carry forward on resume]

## Slices

- [ ] **1. Case 1 laid out on a noir murder board**
  Becomes usable: Running `npm start` and opening the page shows case 1 pinned on a corkboard under a desk lamp: the newspaper clipping, suspect cards, motive cards, witness statements, empty clue slots, the hidden scrawl, and the stamp tray, spool, guesses left, and **?** at the edges. Nothing is clickable yet.
  Why now: The spec's first open question is the look, and it's hard to judge noir from words. Settling it before any rules are wired means later slices land on a board you already like. It also bootstraps the project and writes the first real case, which every later slice needs.
  PRD ref: `prd.md > Screens and Layout`, `prd.md > Look and Feel`, `prd.md > Daily Case`
  Spec ref: `spec.md > Look and Feel`, `spec.md > Components` (Case Data, Murder Board), `spec.md > Data Model` (Case), `spec.md > File Structure`, `spec.md > Where It Runs and How Someone Tries It`, `spec.md > Important Failure Modes` (double-clicking `index.html`)
  Build: Create `package.json` (`"type": "module"`, `start`, `test`), `index.html` with font links and the double-click fallback message, `styles/base.css` and `styles/board.css` with the palette, type, cork and paper textures, and lamp light; draft `src/cases/case-1.js` with every field in the case data model and `src/cases/index.js`; write `src/ui/board.js` to lay out pins from the case data with stable ids; a minimal `src/main.js` that renders case 1; and `tests/cases.test.js` checking case 1 is well formed.
  Verify (mechanical): `npm test` passes the case-shape checks; start the server, load the page in the browser pane, confirm no console errors, every pin type from the case is on screen with no scrolling at laptop size, and the computed colors contain no orange, yellow, or green.
  Learner check: Run `npm start`, open the address it prints, and look at the board. Does it feel like a 1940s detective's corkboard? Read the case 1 story and suspects too — what would you change in the look or the writing?
  Commit: `Lay out case 1 on the noir murder board`

- [ ] **2. Find the hidden scrawl and crack the cipher**
  Becomes usable: Clicking the odd scrawl on the board brings the decoder card forward. Turning the wheel changes only the shift number. **Decode** with the right key from the story plays the unscramble reveal and pins the message to the board as a clue; each wrong try blots out more of the message for good, and after three misses Decode is gone.
  Why now: This is the unique kernel — finding the puzzle to solve the puzzle. It goes right after the look so the "oh, that's cool" moment is proven before the more ordinary guessing loop is built around it.
  PRD ref: `prd.md > The Core Journey` (step 5), `prd.md > Finding and Cracking the Cipher`
  Spec ref: `spec.md > Components` (Cipher, Decoder Card), `spec.md > Data Model` (Case `cipher`, Progress `cipher`)
  Build: Write `src/game/cipher.js` (`encode`, `decode`, `attempt`, seeded `blotted` with `keepWords`) and `tests/cipher.test.js`; write `src/ui/decoder.js` and `styles/overlays.css` for the card, wheel, Decode, tries left, and the left-to-right reveal; make the scrawl clickable in `board.js`; keep cipher progress in memory in `main.js` and pin the cracked message as a clue.
  Verify (mechanical): `npm test` passes the cipher tests: encode/decode round-trips, a right attempt cracks, blot shares are 0 / ~30% / ~60% and only add up, keep words never blot, three misses lock. In the browser, open the decoder, turn the wheel and confirm the text never changes, decode wrong once, then right, and confirm the revealed message shows the first miss's blots and pins to the board.
  Learner check: Without looking at the case file, try to spot the scrawl on the board, find the key in the story, and crack it. Was it too hidden, too obvious, or about right — and did the reveal feel satisfying?
  Commit: `Add the hidden cipher and decoder wheel`

- [ ] **3. Accuse with the GUILTY stamp, unlock clues, and reach an ending**
  Becomes usable: Picking up the GUILTY stamp, stamping a suspect and a motive, and pressing **Make the accusation** uses one guess. Each stamp turns blue or red on its own, earlier stamps stay on the cards, a wrong guess pins up the next clue, a right guess shows **CASE CLOSED**, and a fifth miss shows **GONE COLD** with the true culprit, motive, and cost.
  Why now: With the kernel proven, this completes the core Wordle-style loop, so a full case can be played start to finish. Stamping is also the trickiest pointer interaction, so it's better found out now than late.
  PRD ref: `prd.md > The Core Journey` (steps 6, 7, 9), `prd.md > Accusing With the GUILTY Stamp`, `prd.md > Clues Unlocking`, `prd.md > Case Ending`
  Spec ref: `spec.md > Components` (Game Rules, Stamps, Case Ending), `spec.md > Data Model` (Progress `guesses`, `status`)
  Build: Write `src/game/rules.js` `accuse` (and rejecting actions after the end) with `tests/rules.test.js`; write `src/ui/stamps.js` and `styles/stamps.css` for pick-up, stamping, moving before confirming, recoloring, offset past stamps, and the thump; write `src/ui/ending.js` for both endings (no rank yet); wire guesses left and clue unlocks in `main.js` and `board.js`.
  Verify (mechanical): `npm test` passes the rules tests: one guess per accusation, independent suspect/motive results, a clue unlocks on each miss, solve ends as closed, fifth miss ends as cold, and actions after the end are rejected. In the browser, play one game to a win and one to five misses, confirming stamp colors, persistent past stamps, clue pins, and both endings.
  Learner check: Play case 1 through: guess wrong at least once on purpose, watch a clue pin up, then solve it. Then reload and lose it on purpose. Do the stamps feel tactile, and do the endings land?
  Commit: `Add GUILTY stamp accusations, clue unlocks, and endings`

- [ ] **4. Catch the liar, earn a rank, and copy the share card**
  Becomes usable: The LIAR stamp can be put on a witness statement, followed by a slip of truth options; it's free, one shot, and turns blue or red. A solved case shows the detective rank from the points table, and **Copy share card** puts the case-file card on the clipboard, or shows it to copy by hand if the clipboard is blocked.
  Why now: These finish the ending — the payoff and the thing players share — and they depend on the guess, cipher, and liar results the earlier slices produce.
  PRD ref: `prd.md > The Core Journey` (steps 8, 10), `prd.md > Catching the Liar With the LIAR Stamp`, `prd.md > Detective Rank`, `prd.md > Share Card`
  Spec ref: `spec.md > Components` (Game Rules `flagLiar`, Rank, Share Card, Stamps, Case Ending), `spec.md > Important Failure Modes` (clipboard blocked)
  Build: Add `flagLiar` to `rules.js` with tests; write `src/game/rank.js` with the tunable table and `tests/rank.test.js`; write `src/game/share.js` and `tests/share.test.js`; add the LIAR stamp and truth slip to `stamps.js`; show the rank and **Copy share card** with the hand-copy fallback in `ending.js`.
  Verify (mechanical): `npm test` passes: LIAR never changes guesses and allows one shot; the PRD's two rank examples (Basically Sherlock and Amateur Sleuth) and the same run always scoring the same; the share card matches the PRD format for closed and cold, contains no suspect or motive names, and no orange, yellow, or green emoji. In the browser, catch the liar, solve, copy, and read the clipboard back; then force the fallback and confirm the text box appears.
  Learner check: Play case 1 aiming for the best rank — crack the cipher, catch the liar, solve fast — then click **Copy share card** and paste it somewhere. Does the rank feel earned and the card look like something you'd post?
  Commit: `Add LIAR stamp, detective rank, and share card`

- [ ] **5. Draw red string between pins**
  Becomes usable: Clicking the spool, then pin A, then pin B, ties a sagging red string between them; clicking a string removes it. String never affects guesses, rank, or outcome.
  Why now: It's the player's thinking tool, not part of the rules, so it comes after the full loop works. Its own slice keeps the SVG layer from tangling with stamping.
  PRD ref: `prd.md > The Core Journey` (step 4), `prd.md > Red String`
  Spec ref: `spec.md > Components` (Red String), `spec.md > Data Model` (Progress `strings`)
  Build: Write `src/ui/string.js` as an SVG layer over the board with curved strings between pin heads, add/remove, and in-memory pin-id pairs; hook the spool in `board.js`; make sure the layer doesn't block stamping or the scrawl.
  Verify (mechanical): `npm test` still passes. In the browser, tie three strings, remove one, then stamp a card and open the decoder through the string layer, confirming both still work and guesses left didn't change.
  Learner check: Tie a few strings between suspects, statements, and clues the way you'd work a case, and remove one. Does it feel like a detective's board, and does it get in the way of anything?
  Commit: `Add red string between pins`

- [ ] **6. A daily case that remembers your progress**
  Becomes usable: The page opens on today's closed case file, then the how-to-play on a first visit, then the board. Reloading mid-case keeps every stamp, guess, cipher try, the LIAR shot, and string. Reloading after the case ends shows the finished board, the ending, and a countdown to the next case. `?case=N` and `?fresh` work for demos.
  Why now: Persistence makes the cipher and LIAR limits real (a reload can no longer reset them) and turns the game into a daily one. It sits after the play surface is complete so it saves a progress shape that's already settled.
  PRD ref: `prd.md > The Core Journey` (steps 1, 2, 11), `prd.md > Daily Case`, `prd.md > Case File and How to Play`, `prd.md > States and Boundaries`
  Spec ref: `spec.md > Components` (Daily Case Selection, Progress Storage, App Shell, Case File Cover, How to Play), `spec.md > Data Model` (Progress), `spec.md > Important Failure Modes` (`localStorage` blocked)
  Build: Write `src/game/daily.js` with `tests/daily.test.js` and `src/game/progress.js` with safe reads and writes and old-day cleanup; write `src/ui/caseFile.js` and `src/ui/howToPlay.js`; route first visit, mid-case return, finished-same-day, and new day in `main.js`, saving after every rule call and string change; support `?case=N` and `?fresh`.
  Verify (mechanical): `npm test` passes the daily tests: same date → same case, different dates → different cases, case number from launch day, countdown to local midnight. In the browser, clear storage and confirm cover → how-to → board; make a stamp, a cipher miss, and a string, reload, and confirm all are restored; finish the case, reload, and confirm the ending and countdown; confirm play still works with `localStorage` throwing.
  Learner check: Clear the site's data, open the page fresh, and go through the cover and how-to-play. Play partway, close the tab, reopen it — is everything where you left it? Finish the case and reopen once more.
  Commit: `Add daily case, case file cover, how-to-play, and saved progress`

- [ ] **7. Cases 2 and 3, and a README**
  Becomes usable: All three hand-written cases are playable with `?case=1`, `?case=2`, `?case=3`, each with its own story, liar, hidden cipher, clues, endings, and share line, and the README explains how to run and play.
  Why now: The case format is settled by the earlier slices, so writing two more now doesn't risk rewrites; it's content, not new code. It comes last so the learner's editing time goes into cases that already play end to end.
  PRD ref: `prd.md > Daily Case`, `prd.md > What We're Building`
  Spec ref: `spec.md > Components` (Case Data), `spec.md > Data Model` (Case), `spec.md > File Structure` (`tests/cases.test.js`, `README.md`)
  Build: Draft `src/cases/case-2.js` and `src/cases/case-3.js` with a different scrawl hiding place and key placement each; add them to `src/cases/index.js`; extend `tests/cases.test.js` to all three; write `README.md`.
  Verify (mechanical): `npm test` passes the case checks for all three cases. In the browser, play each with `?case=N&fresh` to a solve and confirm the scrawl, cipher key, liar, clues, and both endings work.
  Learner check: Read and edit cases 2 and 3 the way you'd like them, then play each with `?case=2&fresh` and `?case=3&fresh`. Is each one fair and solvable by reading closely?
  Commit: `Add cases 2 and 3 and the README`

## Hands-on Checkpoints

- [ ] Early usable behavior explored — after slice 1, the look test: the learner approves or adjusts the board's noir look before any rules are wired up
- [ ] Kernel feel explored — after slice 2: the learner tries to find and crack the cipher cold, to tune how hidden the scrawl is
- [ ] Final kick-the-tires exploration and feedback completed

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: [what actually happened; real document/test/code references; unfinished work if interrupted]
Route and stops: [actual paths and symbols; guided stops completed, or reference-only route]
Edit outcome: [tried/kept/reverted/declined/not applicable; verification if changed]
Reflection: [offered/answered/declined/already covered — personal answer belongs only in the ignored profile]
Activity mode: [live app and editor, explicit static fallback, focused alternative, prior practice, or recap]

## Revisions
