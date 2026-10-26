# Cluedle

Wordle for armchair detectives. Every day there's a new 1940s-noir murder on a corkboard: name **who** did it, **why**, and **how** in five guesses or fewer.

Everything is hand-written and rule-based. There's no AI at runtime, no server, and no account.

**Play it:** https://szarroug3.github.io/cluedle/

## How to play

- Pick up the GUILTY stamp, stamp a suspect, a motive, and a weapon, then make the accusation. Each guess tells you how many of the three are right, never which ones. Every miss pins up a new clue and shows it to you; click any clue to read it again.
- Each suspect's statement is typed on their card; click the card to read it up close. One of them is lying. Stamp LIAR on that suspect's card and say what really happened. You get one shot, and it doesn't use a guess.
- One scrap on the board is written in code. Work out which one, find its key in the story, decode it on paper, and write the message on the blank card. You get three tries, and every wrong one runs more ink over the code.
- Drag from a card's pin to another card to tie red string between them. On a phone, press and hold the pin first. Click a string to take it down.
- Drag a card by its paper to move it, say to line things up in the order they happened. Its strings follow.
- Take an index card from the rail to pin up a note of your own, which you can move and tie string to. The notepad holds longer notes and stays open while you read a statement or a scrap. The red and blue pencils mark words in the story, the statements, the clues, the decoded message, and the scraps; click a mark with a pencil in hand to rub it out. None of this affects your score.
- The fewer guesses you need, the higher your rank, from Amateur Sleuth up to Basically Sherlock. Cracking the code and catching the liar count too; naming the right liar with the wrong story earns partial credit. Then copy a spoiler-free share card.

## Run it

You need [Node.js](https://nodejs.org/). Nothing needs installing.

```bash
npm start
```

Open the address it prints, for example `http://localhost:3000`. Opening `index.html` by double-clicking won't work, because browsers block JavaScript modules loaded from files.

Progress is saved in your browser for the day. A new case comes out at local midnight.

### Demo and testing aids

- `?case=2` plays case 2 on any day (there are 33 cases).
- `?fresh` ignores saved progress.

They work together: `http://localhost:3000/?case=3&fresh`.

## Tests

```bash
npm test
```

This runs the tests with Node's built-in test runner. They cover the game rules, the cipher, the rank, the share card, the daily case, saved progress, and the data in every case.

## Project layout

- `index.html`: the page.
- `styles/`: the look (palette, board, stamps, cards).
- `src/cases/`: the 33 hand-written cases, as data.
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
