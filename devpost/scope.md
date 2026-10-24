---
doc: scope
status: approved
---

# Cluedle

Wordle for armchair detectives: a daily, hand-written mystery you solve by naming who did it and why, in five guesses or fewer.

## The Unique Kernel
A daily case you crack by reading closely, not by guessing your way through. You have to find the puzzle to solve the puzzle: an encrypted clue is hidden somewhere on the board, and the key to crack it is hidden in the story. Some witnesses lie, so you also have to decide what to trust. All of it lives on a murder board that makes you feel like a detective working a case, not someone filling in a form.

## Who It's For
Armchair detectives: people who play a daily puzzle like Wordle and love a good mystery. They want a small, satisfying "I solved it" moment each day that they can share. Today they get that from word puzzles, or from mystery novels and shows that take hours instead of minutes.

## The Core Loop
Open today's case and read the newspaper-clipping story on the corkboard, with suspect cards pinned up. A sharp-eyed player may spot an encrypted clue hidden on the board; finding the key in the story cracks it, at any time, without spending a guess. Guess who did it and why. Each guess says whether the suspect is right, the motive is right, both, or neither. Each wrong guess pins up a new plain clue. Solve it within five guesses or the case goes cold. Along the way, they can draw red string between pins to track their own thinking. Then they earn a detective rank based on how much they uncovered, and copy a share card to brag about it. Come back tomorrow for a new case.

## Inspiration & Identity
- **Wordle** (https://www.nytimes.com/games/wordle): one puzzle a day, the same for everyone, and an emoji result card.
- **Detective murder boards** from crime stories: a corkboard, pinned suspect cards, newspaper clippings, and red string tracking how evidence connects.
- A detective feel throughout: the board, not dropdowns and forms, is what makes it feel like working a case.

## Why This Matters to the Learner
An entry for the Devpost "Build With AI: Basics" hackathon. Judges watch a 1–3 minute demo judged on design, innovation, and presentation, so "a small, polished, complete experience beats an ambitious half-built one."

## What "Working" Looks Like
A static web app opened in a browser shows today's case on a murder board. In one sitting a player reads the story, spots the hidden encrypted clue and cracks it using a key in the story, takes a wrong guess and sees a new clue pinned up, catches a lying witness, solves the case, earns a detective rank, and copies the share card to the clipboard.
The "oh, that's cool" beat: noticing the hidden clue, then watching it unscramble once you spot its key in the story.

## The POC Boundary
- Three polished, hand-written cases (Claude drafts them, the learner edits), with the daily case chosen by date.
- Each case has a story, 6 suspects, 6 motives, 6 witness statements (exactly one of which lies), plain clues that unlock on wrong guesses, and one or two encrypted clues hidden on the board whose key is hidden in the story.
- Guessing who and why, with per-guess feedback (suspect / motive / both / neither), five guesses max, and "the case goes cold" on a loss.
- Finding and cracking an encrypted clue, at any time, reveals it without spending a guess. A player who never finds it can still solve the case.
- A detective rank (e.g. Amateur up to Seasoned Detective) based on what's already in the core: guesses used, cipher found and cracked, liar caught. Exact ranks and rules are set in the PRD.
- The murder-board look: corkboard, pinned suspect cards, newspaper-clipping story, and clues pinned as they unlock.
- Red string the player draws between pins to track their own thinking.
- An emoji share card copied to the clipboard, showing guess rows, the detective rank, and a 🔓 when a cipher was cracked. The card's exact style is to be chosen from options in the PRD.
- No AI at runtime; everything is hand-written and rule-based.

## Later
- Red-string physics: string that sags, sways, or reacts as clues are pinned.
- Correct red-string links counting toward the detective rank (needs the game to know which links are "correct").
- Cases four through seven.

## Explicitly Cut
- Making the accusation by dragging red string. The learner wants the string to track evidence the way detectives in stories use it, not to act as the guess control.
