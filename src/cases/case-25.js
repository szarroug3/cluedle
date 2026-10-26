// Case 25: The Sealed Move. Drafted by Claude; edit freely.

export default {
  id: "sealed-move",
  title: "The Sealed Move",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Chess Master Dies Between Rounds",
    dateline: "RIVERSIDE, Nov. 2, 1947",
    body:
      "Grandmaster Anatol Mirsky, 62, leader of the Riverside Open, collapsed and died in the players’ lounge of the " +
      "Hotel Palisade on Saturday, an hour before the ninth and final round.\n" +
      "Play goes on in the hotel ballroom, where twenty-four chess clocks tick on twenty-four boards. One game, on " +
      "board seven, was adjourned Friday night and resumes Sunday. First prize is $1,000.\n" +
      "Mirsky, who fled Riga in 1939, was found slumped over a glass of tea at 1:50. He leaves a wife, Natalia.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "nordquist",
      name: "Buddy Nordquist",
      role: "The young American",
      description: "Twenty-two, the U.S. junior champion. Studied chemistry at Columbia until the money ran out.",
      statement: {
        text: "I spent the break going over my adjourned game. When the waiter shouted, I was out by the pairings board.",
        isLie: false,
      },
    },
    {
      id: "olenik",
      name: "Stefan Olenik",
      role: "The émigré master",
      description: "Forty-one, lost everything in the war. Has been seen walking by the river with Mrs. Mirsky.",
      statement: {
        text: "I went up to my room at one and slept until the bell for round nine. I spoke to nobody.",
        isLie: true,
        truthOptions: [
          "He met Nordquist in the lobby over a pocket set",
          "He sat with Mirsky in the players’ lounge",
          "He drank alone in the hotel bar",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "natalia",
      name: "Natalia Mirsky",
      role: "The wife",
      description: "Married Anatol in Riga in ’25. Everything he has comes to her, and she takes pills to sleep.",
      statement: {
        text: "I was in our suite all afternoon with a headache. Anatol rang me at half past one and said he’d be up after the round.",
        isLie: false,
      },
    },
    {
      id: "merritt",
      name: "Ogden Merritt",
      role: "The director",
      description: "Runs the Open on a soap company’s money. Mirsky threatened to withdraw, and the sponsor with him.",
      statement: {
        text: "At a quarter past one I saw Olenik and Nordquist in the lobby, heads together over a pocket set. Then I went up to post pairings.",
        isLie: false,
      },
    },
    {
      id: "novak",
      name: "Kasimir Novak",
      role: "The second",
      description: "Mirsky’s second for twelve years. Wrote most of Mirsky’s opening book and isn’t named in it.",
      statement: {
        text: "I fetched Anatol his tea at twenty past one, then took his game down to the press room. The reporters saw me.",
        isLie: false,
      },
    },
    {
      id: "oberlin",
      name: "Edith Oberlin",
      role: "The columnist",
      description: "Writes the chess column for the Sunday papers. Mirsky is suing her for calling him a cheat in print.",
      statement: {
        text: "I sat across the lounge writing my column from one to two. Anatol left his tea at half past one to telephone upstairs.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "fix", text: "To keep a fixed game quiet" },
    { id: "estate", text: "To inherit his estate" },
    { id: "wife", text: "To win his wife" },
    { id: "sponsor", text: "To keep the sponsor’s money" },
    { id: "book", text: "To get credit for a book" },
    { id: "lawsuit", text: "To end a libel suit" },
  ],

  weapons: [
    { id: "cyanide", name: "Cyanide powder", detail: "Exterminator’s tin" },
    { id: "veronal", name: "Veronal tablets", detail: "Mrs. Mirsky’s case" },
    { id: "nicotine", name: "Nicotine spray", detail: "Hotel greenhouse" },
    { id: "chess-clock", name: "A chess clock", detail: "Board one" },
    { id: "ashtray", name: "A marble ashtray", detail: "Players’ lounge" },
    { id: "cord", name: "A curtain cord", detail: "Ballroom windows" },
  ],

  clues: [
    "The coroner: poisoned, and dead within minutes of drinking. No mark on him, and no sleeping draught in him.",
    "Mirsky to the director at one: “After the round I will say something about board seven. That is not chess.”",
    "The night porter saw a man in a tournament badge come up from the hotel cellar at eight Saturday morning.",
    "A hollow rook from Nordquist’s pocket set is empty, and smells of bitter almonds. The exterminator’s tin is a spoonful light.",
  ],

  photo: { caption: "The Palisade ballroom, round one", scene: "hotel" },

  // The score sheet of the adjourned game carries the code as one more row of moves.
  evidence: [
    { id: "score-sheet", kind: "ledger", label: "Board 7 · Nordquist–Olenik", note: "38. Kh1 Ra2 | 39. Kg1 Ra1+ | 40. Kh2 Ra2 | sealed 11 p.m. Fri." },
    { id: "wire", kind: "telegram", label: "Western Union · Palisade desk", note: "SENT 1:38 PM STOP HOME TUESDAY WITH THE PURSE STOP STEFAN" },
    { id: "veronal-slip", kind: "prescription", label: "Dr. P. Marsden, Fifth Ave.", note: "Veronal 5 gr at bedtime. Mrs. N. Mirsky. 20 tabs. Refill ×2" },
  ],

  cipher: {
    hiddenOn: "evidence:score-sheet",
    plaintext: "BLACK RESIGNS ON SUNDAY. WE SPLIT THE PURSE AND THE BET MONDAY.",
    shift: 24,
    keepWords: ["RESIGNS", "BET"],
    doodle: "clock",
  },

  solution: { suspectId: "nordquist", motiveId: "fix", weaponId: "cyanide" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Buddy Nordquist and Stefan Olenik played board seven in code. Olenik would resign on Sunday, and they would split " +
        "second prize and a bookmaker’s bet. Mirsky read the score sheet and saw it wasn’t chess. Nordquist took cyanide " +
        "from the cellar that morning in a hollow rook, and when Mirsky left his tea to telephone upstairs at half past one, " +
        "he tipped it in.",
      saved:
        "Natalia Mirsky’s sleeping tablets stay in her case and out of court. Stefan Olenik is barred from play for life, " +
        "and nothing worse.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Buddy Nordquist, keeping a fixed game quiet. He carried cyanide from the hotel exterminator’s tin in a " +
        "hollow rook and tipped it into Mirsky’s tea while the old man was on the telephone.",
      cost:
        "The hotel doctor called it his heart. Nordquist won the U.S. title in ’49 and never played Olenik again.",
    },
  },

  shareLine: "Some games aren’t played to win.",
};
