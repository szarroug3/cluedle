---
doc: prd
status: approved
---

# Cluedle — Product Requirements

Wordle for armchair detectives: a daily 1940s-noir mystery, worked on a murder board, where you stamp who did it and why in five guesses or fewer. For people who play a daily puzzle and love a good mystery.
Source: `scope.md > The Unique Kernel`, `scope.md > Who It's For`.

## The Core Journey
Source: `scope.md > The Core Loop`, `scope.md > What "Working" Looks Like`.

1. **Case file.** The player opens Cluedle and sees today's case as a closed case file: case number, date, case title, and an **Open the file** action.
2. **How to play (first visit only).** Before the first case opens, a short how-to-play explains the stamps, the five guesses, the hidden cipher, and the red string. It can be reopened later from the board.
3. **The board.** Opening the file shows the murder board: the newspaper-clipping story, 3–4 suspect cards, the motive cards, witness statements, a tray with the **GUILTY** and **LIAR** stamps, a red-string spool, and the five guesses remaining.
4. **Read.** The player reads the story and the statements. They can draw red string between any pins to track their thinking.
5. **Find and crack the cipher (any time, optional).** A sharp-eyed player spots an odd scrawl hidden on the board. Clicking it brings the encrypted card forward with a decoder wheel. They set the wheel to the key they found in the story and press **Decode**. They get three tries; each wrong try blots out more of the message for good.
6. **Accuse.** The player picks up the **GUILTY** stamp, stamps a suspect card, stamps a motive card, and confirms. Each stamp changes color to show whether that half was right.
7. **Miss → new clue.** A wrong accusation uses a guess and pins up a new plain clue.
8. **Catch the liar (any time, optional).** The player stamps **LIAR** on a witness statement and picks what really happened from a few options. It's free, but they get one shot.
9. **The case ends.** A right accusation within five guesses closes the case: **CASE CLOSED**, what really happened, who was saved, and the player's detective rank. Five misses: **GONE COLD**, what really happened, and what not catching the culprit cost.
10. **Share.** The player copies a share card to the clipboard.
11. **Come back.** Reopening later the same day shows their finished board, the ending, and a countdown to the next case.

## Screens and Layout

- **Case file cover** — the first thing seen each day. Case number, date, title, **Open the file**.
- **How to play** — a short overlay shown once before the first case, and reopenable from the board.
- **The murder board** — the one main surface. Everything in the case lives here as pinned items: newspaper-clipping story, suspect cards, motive cards, witness statements, unlocked clues, and the hidden cipher scrawl. The stamp tray, red-string spool, and guesses remaining sit at the edge of the board.
- **Decoder card** — the cipher card brought forward over the board, with the scrambled text, the decoder wheel, **Decode**, and the tries remaining. Closing it returns to the board.
- **Case ending** — over the board: **CASE CLOSED** or **GONE COLD**, what happened, the consequences, the detective rank, and **Copy share card**. On a return visit, it also shows the countdown to the next case.

## Look and Feel

- **1940s noir.** Typewriter and newspaper type, worn paper, a corkboard under a desk lamp, rubber-stamp ink.
- **Colors:** reds, purples, and blues. **Avoid orange, yellow, and green** everywhere, including the share card's emoji.
- **References:** detective murder boards from crime stories; Wordle's daily rhythm and share card (`scope.md > Inspiration & Identity`).
- The board, not dropdowns and forms, is the interface: stamps, pins, string, and a decoder wheel.

## Features and Behavior

### Daily Case
- One case per day, the same for every player, chosen by date from three hand-written cases.
- Each case has: a story, 3–4 suspects, a few motives, witness statements (at least one of which lies), plain clues that unlock on wrong guesses, one or two hidden cipher clues whose key is in the story, the true solution, and both endings (closed and gone cold).
- [ ] Two different dates show different cases; the same date always shows the same case.

### Case File and How to Play
- [ ] A first-time player sees the case file, then the how-to-play, then the board.
- [ ] A returning player who has seen the how-to-play goes straight from the case file to the board.
- [ ] The how-to-play can be reopened from the board.

### Accusing With the GUILTY Stamp
- The player stamps one suspect card and one motive card, then confirms. The accusation uses one of five guesses.
- After confirming, each stamp turns a color showing whether that half was right: **blue for right, red for wrong**, for the suspect and the motive separately.
- Past accusations stay on the board as stamp marks, so the board is a record of every guess.
- [ ] Stamping a suspect and a motive and confirming uses exactly one guess.
- [ ] The suspect stamp and motive stamp each show right or wrong by color, independently.
- [ ] Earlier stamps stay visible on the cards after later guesses.

### Clues Unlocking
- Each wrong accusation pins up the case's next plain clue.
- [ ] After each wrong guess, one new clue appears on the board.

### Catching the Liar With the LIAR Stamp
- The player stamps **LIAR** on a witness statement, then picks what really happened from a few options.
- It doesn't use a guess, but the player gets one shot per case.
- Right or wrong is shown by the LIAR stamp's color: blue for right, red for wrong.
- [ ] Stamping LIAR and picking a truth doesn't change the guesses remaining.
- [ ] After one LIAR attempt, the LIAR stamp can't be used again in that case.
- [ ] Catching the liar correctly counts toward the detective rank.

### Finding and Cracking the Cipher
Source: `scope.md > The Unique Kernel`.
- The encrypted clue is hidden on the board from the start as part of the scenery (for example, a scrawl on the back of a photo or in the margin of the clipping). Nothing announces it.
- Clicking it opens the decoder card. The text does not unscramble as the wheel turns; the player sets the wheel and presses **Decode** to commit.
- Three tries. A right try unscrambles the message with a satisfying reveal. Each wrong try permanently blots out more of the message, so a crack on the second or third try reveals less.
- After three wrong tries, the card stays scrambled.
- Cracking never uses a guess. A player who never finds or cracks the cipher can still solve the case.
- [ ] Turning the wheel alone never reveals readable text.
- [ ] A right Decode on the first try shows the full message.
- [ ] A right Decode after one or two wrong tries shows the message with more of it blotted out.
- [ ] After three wrong tries, Decode is no longer available and the message stays scrambled.
- [ ] Cipher tries never change the guesses remaining.

### Red String
- The player can draw red string between any two pinned items and remove a string. It's only for the player's own thinking; it doesn't affect the case or the rank.
- [ ] A string drawn between two pins stays visible until removed.
- [ ] Drawing or removing string never changes guesses, ranks, or the outcome.

### Case Ending
- **Solved:** **CASE CLOSED**, the story of what really happened, who was saved, and the detective rank.
- **Gone cold:** **GONE COLD**, the culprit, their motive, what really happened, and the consequences. Example from the learner: "it was Martha, and she did it to get revenge on her father's murderer. She was killing all of his family members one by one, and not catching her cost 7 innocent people their lives."
- [ ] The fifth wrong guess shows the gone-cold ending with the true culprit and motive.
- [ ] A right guess shows the case-closed ending with the rank.

### Detective Rank
Source: `scope.md > The POC Boundary` (cheap version).
- Earned at the end of each case from: whether it was solved and in how many guesses, how many tries the cipher took (or whether it was cracked at all), and whether the liar was caught.
- Five ranks, lowest to highest: **Amateur Sleuth**, **Private Eye**, **Hard-Boiled Investigator**, **Seasoned Detective**, **Basically Sherlock**.
- Earned from hidden points (0–10), only on a solved case:
  - Guesses left after solving: 0–4 points.
  - Cipher: 3 points first try, 2 second, 1 third, 0 if not cracked.
  - Liar caught: 3 points.
- Bands: 0–1 Amateur Sleuth · 2–3 Private Eye · 4–5 Hard-Boiled Investigator · 6–7 Seasoned Detective · 8–10 Basically Sherlock.
- A gone-cold case earns no rank.
- The point values and bands are a starting point and can be tuned during `5-build` playtesting.
- [ ] The same play-through always earns the same rank.
- [ ] Solving on the first guess, cracking the cipher first try, and catching the liar earns Basically Sherlock.
- [ ] Solving on the fifth guess without the cipher or the liar earns Amateur Sleuth.

### Share Card
- **Copy share card** copies a text result to the clipboard: case number, the guess history as emoji, cipher and liar results, and the rank. No spoilers: it never names the culprit or motive.
- Uses only red, purple, blue, and neutral emoji.
- **Case-file style**, for example:

  ```
  🗂️ CLUEDLE · CASE #3
  ━━ CLOSED in 3/5 ━━
  Cipher 🔓  Liar 🎭
  Rank: Seasoned Detective
  "The ink never lies."
  ```

  A gone-cold card reads `GONE COLD` in place of `CLOSED in 3/5` and shows no rank. Each case has its own closing noir line.
- [ ] Pasting after **Copy share card** gives the card text.
- [ ] The card contains no orange, yellow, or green emoji, and no suspect or motive names.

## States and Boundaries

- **First visit** — case file, how-to-play, then the board.
- **Mid-case return** — if the player closes the page mid-case and comes back the same day, their progress is all still there: stamps, guesses used, cipher tries, LIAR attempt, and string. Reloading never resets tries.
- **Finished, same day** — the finished board, the ending, and a countdown to the next case.
- **New day** — the next case's file, with yesterday's progress no longer shown.
- **Copy fails** — if the clipboard isn't available, the share card text is shown so the player can copy it by hand.

## Product Decisions

- **Case file cover, then a short how-to-play** — sets the noir mood and teaches the stamps before the board.
- **Rubber stamps for accusing** — tactile, detective-like, and past guesses stay on the board as a record.
- **Stamp color shows feedback** — right or wrong per half, read straight off the board.
- **LIAR stamp, one shot, free** — mirrors the GUILTY stamp; catching the liar is something the player does, so it can count toward the rank.
- **Decoder wheel with a Decode commit and three tries that blot out more each miss** — keeps the satisfying reveal, stops brute-forcing a 25-key cipher, and rewards cracking it earlier.
- **Gone-cold ending tells what not catching them cost** — gives losing weight.
- **Return visit shows the finished board and a countdown** — the board is the record of how you solved it.
- **1940s noir in reds, purples, and blues; no orange, yellow, or green** — the learner's palette, applied to the share card too.
- **Blue stamp for right, red for wrong** — read at a glance, in the learner's palette.
- **Case-file share card** — feels like a stamped dossier, with a noir line per case.
- **Five ranks earned from hidden points** — the learner's ladder, with "Basically Sherlock" at the top; points rather than a checklist so five ranks fit, tunable later.
- **Progress kept all day** — reloading can't reset cipher tries or the LIAR shot.

## What We're Building
Everything under `## Features and Behavior` and `## States and Boundaries`, with three hand-written cases drafted by Claude and edited by the learner. Static web app opened in a browser; no AI at runtime.

## Deferred From the POC
- **Red-string physics** — string that sags and sways; polish once the core works (`scope.md > Later`).
- **Correct red-string links counting toward the rank** — needs the game to know which links are "correct" (`scope.md > Later`).
- **Cases four through seven** — content work after three polished cases (`scope.md > Later`).
- **Streaks and stats across days** — implied by a daily game, not needed to prove the kernel.

## Possible Later Enhancements
- A case archive to replay past cases.
- Sound: typewriter keys, stamp thuds, rain.

## Non-Goals
- **Accusing by dragging red string** — the string is for thinking (`scope.md > Explicitly Cut`).
- **Accounts or a server** — progress lives on the player's device.
- **Live unscrambling as the wheel turns** — it would make brute-forcing the cipher trivial.
- **AI at runtime** — everything is hand-written and rule-based.

## Open Questions
- **Rank point values and bands** — a starting point; tune while playtesting in `5-build`.
- **How hidden is too hidden for the cipher scrawl** — to be tuned while writing and playtesting the cases in `5-build`.
