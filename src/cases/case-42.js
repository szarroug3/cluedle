// Case 42: No Gas Found. Drafted by Claude; edit freely.

export default {
  id: "no-gas-found",
  title: "No Gas Found",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Mine Superintendent Slain in Company Office",
    dateline: "CARBON HILL, Dec. 4, 1947",
    body:
      "Clayton Murchison, 57, superintendent of the Gilchrist Coal Company mine at Carbon Hill, was found dead " +
      "Wednesday night in his office above the company store.\n" +
      "A federal mine inspector arrives today to reopen the inquiry into the March explosion in the No. 2 seam. " +
      "Eight men died there. The company’s own inquest blamed one of them for striking a match underground.\n" +
      "Mrs. Murchison found her husband at half past ten. Miners say he had not been himself since March, and kept " +
      "the eight names on a card under the glass of his desk.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "teasdale",
      name: "Lamar Teasdale",
      role: "The fire boss",
      description: "Walks every heading before each shift, testing for gas with his flame lamp and chalking his initials and the date.",
      statement: {
        text: "I drew my lamp at eight for the owl-shift round. My book’s signed for every heading, the same as every night.",
        isLie: false,
      },
    },
    {
      id: "peck",
      name: "Delbert Peck",
      role: "The store manager",
      description: "Runs the company store, where the miners are paid in scrip and buy on credit. Murchison had sent for his books.",
      statement: {
        text: "I locked the store at eight and went home to bed. I never set foot in the building again that night.",
        isLie: true,
        truthOptions: [
          "He was in the store’s back room, burning his ledgers",
          "He went up to the office to see Murchison",
          "He was at the union hall with the miners",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "kostka",
      name: "Jim Kostka",
      role: "The union man",
      description: "Organized the No. 2 seam. Murchison put his name on the blacklist sent to every Gilchrist mine.",
      statement: {
        text: "I was at the union hall from eight till eleven with forty men, getting ready for the inspector. Ask any one of them.",
        isLie: false,
      },
    },
    {
      id: "dubrowski",
      name: "Rena Dubrowski",
      role: "The miner’s widow",
      description: "Her husband Stas was one of the eight. The company says he struck the match and won’t pay her his pension.",
      statement: {
        text: "At a quarter past nine I went up the back stair to beg for my pension. Mr. Peck was in the store’s back room burning papers, and up in the office a man was shouting at Mr. Murchison about a book.",
        isLie: false,
      },
    },
    {
      id: "lenore",
      name: "Lenore Murchison",
      role: "The wife",
      description: "Came from Baltimore as a bride in ’29 and has wanted to go back every day since. Clay would never leave the mine.",
      statement: {
        text: "Clay telephoned at nine to say he was waiting on a man and would be late. I walked over at half past ten and found him.",
        isLie: false,
      },
    },
    {
      id: "coles",
      name: "Asa Coles",
      role: "The lamp man",
      description: "Hands out and takes back every lamp that goes below. Murchison caught him drinking in the lamp house in October.",
      statement: {
        text: "Teasdale drew lamp No. 1 at eight and handed it back at midnight. No other lamp left my house after the day shift.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "gas-book", text: "To hide a false gas report" },
    { id: "scrip", text: "To hide the scrip skimming" },
    { id: "blacklist", text: "Revenge for the blacklist" },
    { id: "pension", text: "For a pension refused" },
    { id: "leave", text: "To get out of the coal town" },
    { id: "job", text: "To keep his job" },
  ],

  weapons: [
    { id: "lamp", name: "A brass safety lamp", detail: "Lamp house" },
    { id: "pick-handle", name: "A pick handle", detail: "Tool shed" },
    { id: "coal", name: "A lump of coal", detail: "Office scuttle" },
    { id: "dynamite", name: "Sticks of dynamite", detail: "Powder house" },
    { id: "tamping-bar", name: "A tamping bar", detail: "Powder house" },
    { id: "rat-poison", name: "Rat poison", detail: "Company store" },
  ],

  clues: [
    "The doctor: two blows from behind, between nine and ten, with something heavy, round and rimmed. Flakes of brass in the wounds.",
    "In the lamp house, lamp No. 1 has a fresh dent in its brass bonnet. It was wiped clean inside and out.",
    "Thursday the inspector walked the owl-shift headings. Not one carries a fire boss’s chalk for Dec. 3.",
    "The fire boss’s book for March 10, No. 2 seam, before the morning shift: “No gas found. L.T.” The seam blew at seven.",
  ],

  photo: { caption: "The company office and store, Carbon Hill", scene: "lodge" },

  // Murchison pencilled his code on the back of a photo of his own office, keyed to the eight dead.
  // The half-burnt ledger is what the store manager was hiding.
  evidence: [
    { id: "ledger", kind: "ledger", label: "Carbon Hill Company Store", note: "Half-burnt, from the back-room stove. Scrip prices for Oct. and Nov., marked up twice." },
    { id: "blacklist", kind: "letter", label: "Gilchrist Coal Co. · Superintendent", note: "To all Gilchrist mines: J. Kostka is not to be hired. C. Murchison." },
    { id: "pension-slip", kind: "slip", label: "Gilchrist Coal Co. · Widows’ Fund", note: "Mrs. R. Dubrowski. Claim refused. Cause: the deceased struck a match." },
  ],

  cipher: {
    hiddenOn: "photo",
    plaintext: "NO CHALK IN TWO SEAM THE MORNING IT BLEW, YET THE BOOK SAYS NO GAS.",
    shift: 8,
    keepWords: ["CHALK"],
    doodle: "bell",
  },

  solution: { suspectId: "teasdale", motiveId: "gas-book", weaponId: "lamp" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "On the morning of March 10 Lamar Teasdale signed his book “no gas found” without going down the No. 2 seam, " +
        "and eight men died. Murchison worked it out and meant to hand the book to the inspector. Teasdale drew his " +
        "lamp at eight, skipped his round again, and climbed to the office after nine. Mrs. Dubrowski heard the " +
        "shouting. He struck Murchison down with his brass safety lamp and handed it back at midnight.",
      saved:
        "Delbert Peck lied to hide the crooked scrip ledgers he was feeding to the stove, and he answers for those " +
        "instead. Stas Dubrowski’s name is cleared, and his widow gets his pension.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Lamar Teasdale, the fire boss, hiding the gas report he faked the morning of the explosion. He " +
        "struck Murchison down with his own brass safety lamp the night before the inspector came.",
      cost:
        "The inquiry ended where the company’s had, with a miner and a match. Teasdale kept signing his book, and " +
        "the widows never saw a pension.",
    },
  },

  shareLine: "Eight names under the glass.",
};
