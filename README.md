# Cluedle

Wordle for armchair detectives. Every day there's a new 1940s-noir murder on a corkboard: name **who** did it, **why**, and **how** in five guesses or fewer.

Everything is hand-written and rule-based. There's no AI at runtime, no server, and no account.

## How to play

- **Accuse.** Pick up the GUILTY stamp, stamp a suspect, a motive, and a weapon, then make the accusation. Each guess tells you how many of the three are right, never which ones. Every miss pins up a new clue.
- **Catch the liar.** Click a suspect to read their statement. One of them is lying. Stamp LIAR on that suspect's card and say what really happened. You get one shot, and it doesn't use a guess.
- **Crack the message.** One scrap on the board is written in code. Work out which one, find its key in the story, decode it on paper, and write the message on the blank card. You get three tries, and every wrong one runs more ink over the code.
- **Red string.** Click the spool, then two pins, to tie string between them. Click a string to take it down. It's only for your own thinking.
- **Rank and share.** Solve it fast and thoroughly to earn a rank, from Amateur Sleuth up to Basically Sherlock. Then copy a spoiler-free share card.

## Run it

You need [Node.js](https://nodejs.org/). Nothing needs installing.

```bash
npm start
```

Open the address it prints, for example `http://localhost:3000`. Opening `index.html` by double-clicking won't work, because browsers block JavaScript modules loaded from files.

Progress is saved in your browser for the day. A new case comes out at local midnight.

### Demo and testing aids

- `?case=2` plays case 2 on any day (there are ten cases).
- `?fresh` ignores saved progress.

They work together: `http://localhost:3000/?case=3&fresh`.

## Tests

```bash
npm test
```

This runs the rules with Node's built-in test runner: the accusation and liar rules, the cipher and its ink blots, the rank, the share card, the daily case, saved progress, and checks that every case is well formed.

## Project layout

- `index.html`: the page.
- `styles/`: the look (palette, board, stamps, cards).
- `src/cases/`: the ten hand-written cases, as data.
- `src/game/`: the rules. Plain JavaScript with no DOM, and all tested.
- `src/ui/`: the board and everything drawn on it.
- `src/main.js`: connects the board to the rules and saves progress.
- `tests/`: the rule tests.
- `devpost/`: the planning documents (scope, product requirements, technical spec, build checklist).

## Writing a case

Copy a file in `src/cases/` and list it in `src/cases/index.js`. Each case needs:

- a story with the cipher key hidden in it
- six suspects, each with a statement, exactly one of which lies
- six motives and six weapons
- four clues
- three scraps of evidence
- a cipher
- a solution
- both endings
- a share line

`npm test` checks that the new case is well formed.
