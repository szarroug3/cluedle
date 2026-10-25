---
doc: prd
status: approved
---

# Cluedle — Product Requirements

Wordle for armchair detectives: a daily 1940s-noir mystery, worked on a murder board, where you stamp who did it, why, and how in five guesses or fewer. For people who play a daily puzzle and love a good mystery.
Source: `scope.md > The Unique Kernel`, `scope.md > Who It's For`.

## The Core Journey
Source: `scope.md > The Core Loop`, `scope.md > What "Working" Looks Like`.

1. **Case file.** The player opens Cluedle and sees today's case as a closed case file: case number, date, case title, and an **Open the file** action.
2. **How to play (first visit only).** Before the first case opens, a short how-to-play explains the stamps, the five guesses, the hidden cipher, and the red string. It can be reopened later from the board.
3. **The board.** Opening the file shows the murder board: the newspaper-clipping story, 6 suspect cards (each holding that person's statement), 6 motive cards, 6 weapon cards, a tray with the **GUILTY** and **LIAR** stamps, a red-string spool, and the five guesses remaining.
4. **Read.** The player reads the story, and clicks a suspect card to read that person's statement. They can draw red string between any pins to track their thinking.
5. **Find and crack the cipher (any time, optional).** Every scrap on the board can be brought forward to read up close, and one of them, a pencil scrawl, is encrypted. Nothing marks which. A sharp-eyed player works out which scrap is the code, finds its key in the story, and decodes it on paper. They write the message on the **blank card** pinned to the board, using its two sliding letter strips as a helper (clicking a letter writes it), and pin it. They get three tries; each wrong answer runs ink over more of the scrawl for good.
6. **Accuse.** The player picks up the **GUILTY** stamp, stamps a suspect card, a motive card, and a weapon card, and confirms. The guess shows how many of the three are right, but not which.
7. **Miss → new clue.** A wrong accusation uses a guess and pins up a new plain clue.
8. **Catch the liar (any time, optional).** The player stamps **LIAR** on a suspect's card and picks what really happened from a few options. It's free, but they get one shot.
9. **The case ends.** A right accusation within five guesses closes the case: **CASE CLOSED**, what really happened, who was saved, and the player's detective rank. Five misses: **GONE COLD**, what really happened, and what not catching the culprit cost.
10. **Share.** The player copies a share card to the clipboard.
11. **Come back.** Reopening later the same day shows their finished board, the ending, and a countdown to the next case.

## Screens and Layout

- **Case file cover** — the first thing seen each day. Case number, date, title, **Open the file**.
- **How to play** — a short overlay shown once before the first case, and reopenable from the board.
- **The murder board** — the one main surface. Everything in the case lives here as pinned items: newspaper-clipping story, suspect cards, motive cards, weapon cards, unlocked clues, scraps of evidence (one of them the cipher scrawl), and the blank card. The stamp tray, red-string spool, and guesses remaining sit at the edge of the board.
- **Statement** — a suspect's statement brought forward over the board when their card is clicked.
- **Close look** — any scrap brought forward over the board to read; every scrap looks the same here.
- **Blank card** — brought forward over the board, with a space to write the decoded message, two sliding A–Z strips as a helper (click a letter to write it), **Pin it**, and the tries remaining. Closing it returns to the board.
- **Case ending** — over the board: **CASE CLOSED** or **GONE COLD**, what happened, the consequences, the detective rank, and **Copy share card**. On a return visit, it also shows the countdown to the next case.

## Look and Feel

- **1940s noir.** Typewriter and newspaper type, worn paper, a corkboard under a desk lamp, rubber-stamp ink.
- **Colors:** reds, purples, and blues. **Avoid orange, yellow, and green** everywhere, including the share card's emoji.
- **References:** detective murder boards from crime stories; Wordle's daily rhythm and share card (`scope.md > Inspiration & Identity`).
- The board, not dropdowns and forms, is the interface: stamps, pins, string, and the blank card.

## Features and Behavior

### Daily Case
- One case per day, the same for every player, chosen by date from ten hand-written cases.
- Each case has: a story, 6 suspects (each with a witness statement, exactly one of which lies), 6 motives, 6 weapons, plain clues that unlock on wrong guesses, one hidden cipher clue whose key is in the story, the true solution (who, why, and how), and both endings (closed and gone cold).
- Every witness is a suspect, so each statement lives on its suspect's card.
- Six of each, three parts to every accusation, and feedback that says only how many parts are right, so working through the cards in order can't brute-force the case; it takes reasoning from the clues.
- [ ] Two different dates show different cases; the same date always shows the same case.

### Case File and How to Play
- [ ] A first-time player sees the case file, then the how-to-play, then the board.
- [ ] A returning player who has seen the how-to-play goes straight from the case file to the board.
- [ ] The how-to-play can be reopened from the board.

### Accusing With the GUILTY Stamp
- The player stamps one suspect card, one motive card, and one weapon card, then confirms. The accusation uses one of five guesses.
- After confirming, the guess shows **how many of the three are right** (0, 1, 2, or 3), never which ones. A full match turns all three stamps blue and closes the case.
- Past accusations stay on the board as numbered stamps (#1, #2, …), and each spent guess on the rail shows its count, so the board is a record of every guess.
- [ ] Stamping a suspect, a motive, and a weapon and confirming uses exactly one guess.
- [ ] A guess shows how many of its three parts are right, and nothing shows which.
- [ ] Earlier stamps stay visible on the cards, numbered, after later guesses.

### Clues Unlocking
- Each wrong accusation pins up the case's next plain clue.
- [ ] After each wrong guess, one new clue appears on the board.

### Catching the Liar With the LIAR Stamp
- Clicking a suspect's card brings their statement forward to read.
- The player stamps **LIAR** on a suspect's card, then picks what really happened from a few options about that suspect's statement.
- It doesn't use a guess, but the player gets one shot per case.
- Right or wrong is shown by the LIAR stamp's color: blue for right, red for wrong.
- [ ] Stamping LIAR and picking a truth doesn't change the guesses remaining.
- [ ] After one LIAR attempt, the LIAR stamp can't be used again in that case.
- [ ] Catching the liar correctly counts toward the detective rank.

### Finding and Cracking the Cipher
Source: `scope.md > The Unique Kernel`.
- The encrypted clue is hidden on the board from the start as part of the scenery (for example, a pencil scrawl in a photo's margin), among decoy scraps written in the same hand. Nothing announces it.
- Every scrap, the scrawl included, opens the same plain close-up. The game never says which scrap is the code; the player works it out and decodes it themselves, on paper.
- The **blank card** is pinned to the board from the start. It holds a space to write the decoded message and two side-by-side A–Z strips the player can slide up or down to line up letters; clicking a letter writes it into the answer. The strips are only a helper: they never decode or check anything.
- The player writes the message and presses **Pin it**. Only letters count; spacing, punctuation, and capitals don't, and a typo or two is forgiven. Letters already lost to ink may be guessed or left out.
- Three tries. A right answer flips the real message into place and leaves it written on the blank card. Each wrong answer permanently runs ink over more of the scrawl, so the rest is harder to decode and a crack on the second or third try reveals less.
- After three wrong tries, the blank card no longer takes answers.
- Cracking never uses a guess. A player who never finds or cracks the cipher can still solve the case.
- [ ] Every scrap opens the same close-up, with nothing marking the cipher.
- [ ] Sliding the strips never reveals or checks anything.
- [ ] Writing the right message on the first try shows the full message.
- [ ] A right message after one or two wrong tries shows it with more blotted out.
- [ ] After three wrong tries, the blank card no longer takes answers and the scrawl stays scrambled.
- [ ] Cipher tries never change the guesses remaining.

### Red String
- The player can draw red string between any two pinned items and remove a string. It's only for the player's own thinking; it doesn't affect the case or the rank.
- [ ] A string drawn between two pins stays visible until removed.
- [ ] Drawing or removing string never changes guesses, ranks, or the outcome.

### Case Ending
- **Solved:** **CASE CLOSED**, the story of what really happened, who was saved, and the detective rank.
- **Gone cold:** **GONE COLD**, the culprit, their motive and weapon, what really happened, and the consequences. Example from the learner: "it was Martha, and she did it to get revenge on her father's murderer. She was killing all of his family members one by one, and not catching her cost 7 innocent people their lives."
- [ ] The fifth wrong guess shows the gone-cold ending with the true culprit, motive, and weapon.
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
- **Copy share card** copies a text result to the clipboard: case number, the guess history as emoji (one row per guess: a 🔵 for each right part and a 🔴 for each wrong one, in that order, so it never says which), cipher and liar results, and the rank. No spoilers: it never names the culprit, motive, or weapon.
- Uses only red and blue emoji, so the card reads on light and dark backgrounds.
- **Case-file style**, for example:

  ```
  CLUEDLE · CASE #3
  ━━ CLOSED in 3/5 ━━
  🔵🔴🔴
  🔵🔵🔴
  🔵🔵🔵
  Cipher ☑️  Liar ☑️
  Rank: Seasoned Detective
  "The ink never lies."
  https://szarroug3.github.io/cluedle/
  ```

  A gone-cold card reads `GONE COLD` in place of `CLOSED in 3/5` and shows no rank. Each case has its own closing noir line.
- [ ] Pasting after **Copy share card** gives the card text.
- [ ] The card contains no orange, yellow, or green emoji, and no suspect, motive, or weapon names.

## States and Boundaries

- **First visit** — case file, how-to-play, then the board.
- **Mid-case return** — if the player closes the page mid-case and comes back the same day, their progress is all still there: stamps, guesses used, cipher tries, LIAR attempt, and string. Reloading never resets tries.
- **Finished, same day** — the finished board, the ending, and a countdown to the next case.
- **New day** — the next case's file, with yesterday's progress no longer shown.
- **Copy fails** — if the clipboard isn't available, the share card text is shown so the player can copy it by hand.

## Product Decisions

- **Case file cover, then a short how-to-play** — sets the noir mood and teaches the stamps before the board.
- **Rubber stamps for accusing** — tactile, detective-like, and past guesses stay on the board as a record.
- **Feedback says how many, not which** — each guess tells the player how many of its three parts are right, so the case is cracked by reasoning from clues, not by working through the cards in order.
- **Statements live on suspect cards, and LIAR stamps the card** — every witness is a suspect, which frees the board for weapon cards.
- **LIAR stamp, one shot, free** — mirrors the GUILTY stamp; catching the liar is something the player does, so it can count toward the rank.
- **Decode it yourself, then write it on a blank card, with three tries that blot out more each miss** — finding the code is real work (no scrap gives itself away by opening a decoder), the strips help without solving it, and the reveal still lands on a right answer.
- **Gone-cold ending tells what not catching them cost** — gives losing weight.
- **Return visit shows the finished board and a countdown** — the board is the record of how you solved it.
- **1940s noir in reds, purples, and blues; no orange, yellow, or green** — the learner's palette, applied to the share card too.
- **Blue for a full match and a caught liar, red otherwise** — read at a glance, in the learner's palette.
- **Case-file share card** — feels like a stamped dossier, with a noir line per case.
- **Five ranks earned from hidden points** — the learner's ladder, with "Basically Sherlock" at the top; points rather than a checklist so five ranks fit, tunable later.
- **Progress kept all day** — reloading can't reset cipher tries or the LIAR shot.

## What We're Building
Everything under `## Features and Behavior` and `## States and Boundaries`, with ten hand-written cases drafted by Claude and played and edited by the learner. Static web app opened in a browser; no AI at runtime.

## Deferred From the POC
- **Red-string physics** — string that sags and sways; polish once the core works (`scope.md > Later`).
- **Correct red-string links counting toward the rank** — needs the game to know which links are "correct" (`scope.md > Later`).
- **Cases beyond ten** — more content once the first ten are played and tuned (`scope.md > Later`).
- **Streaks and stats across days** — implied by a daily game, not needed to prove the kernel.

## Possible Later Enhancements
- A case archive to replay past cases.
- Sound: typewriter keys, stamp thuds, rain.

## Non-Goals
- **Accusing by dragging red string** — the string is for thinking (`scope.md > Explicitly Cut`).
- **Accounts or a server** — progress lives on the player's device.
- **The game decoding for the player** — the strips on the blank card only line up alphabets; sliding them never unscrambles anything, which would make brute-forcing trivial.
- **AI at runtime** — everything is hand-written and rule-based.

## Open Questions
- **Rank point values and bands** — a starting point; tune while playtesting in `5-build`.
- **How hidden is too hidden for the cipher scrawl** — to be tuned while writing and playtesting the cases in `5-build`.
