// Case 37: Cold Storage. Drafted by Claude; edit freely.

export default {
  id: "cold-storage",
  title: "Cold Storage",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Ice House Owner Found Frozen in His Own Cold Room",
    dateline: "RIVERSIDE, Nov. 24, 1947",
    body:
      "Magnus Tolle, 58, owner of Tolle Ice & Cold Storage on Pier 9, was found frozen to death Monday morning " +
      "inside one of his own cold rooms. The door was latched from the outside, and his knuckles were raw from " +
      "beating on it.\n" +
      "Tolle carried the plant’s three keys on one brass ring and trusted no other man with them. The ring was " +
      "still in his pocket. Police first called it an accident with a falling latch.\n" +
      "Tolle stayed late every Sunday to do the books. The day foreman found him when he opened up at six.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "holm",
      name: "Arvid Holm",
      role: "The night engineer",
      description: "Runs the ammonia compressors from ten at night till six. Lives with his young wife over the ship chandler’s on Water Street.",
      statement: {
        text: "I never left the engine room all night but to walk the coils, once at midnight and once at four. That’s the job.",
        isLie: false,
      },
    },
    {
      id: "truax",
      name: "Lem Truax",
      role: "The night watchman",
      description: "Has watched Pier 9 alone since his wife died in ’44. Tolle docked his pay last month for sleeping on the job.",
      statement: {
        text: "I walked my rounds and punched every station on the hour, all night long. Nobody came on that pier I didn’t see.",
        isLie: true,
        truthOptions: [
          "He spent the small hours drinking at the Lantern Tavern",
          "He was asleep in the boiler room",
          "He was helping the fish buyer load his truck",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "sciortino",
      name: "Benno Sciortino",
      role: "The fish buyer",
      description: "Buys for the Fulton Street fish market and owes Tolle eleven hundred dollars in storage. Tolle meant to sue him on Monday.",
      statement: {
        text: "I backed my truck in at two for my haddock crates on the dock. Not a soul about, not even the watchman, and not a sound but the compressors.",
        isLie: false,
      },
    },
    {
      id: "brinch",
      name: "Oskar Brinch",
      role: "The day foreman",
      description: "Has run the day crew twenty years. Tolle promised to make him manager, then gave the job to his own nephew.",
      statement: {
        text: "I opened up at six and found the cold room latched from outside. He was just inside, curled up against the door.",
        isLie: false,
      },
    },
    {
      id: "marit",
      name: "Marit Tolle",
      role: "The wife",
      description: "Married to Magnus twenty years, and the ice house comes to her. He said he worked late Sundays. The neighbors say Thursdays too.",
      statement: {
        text: "Magnus telephoned at half past eleven to say the books would keep him late. I went to bed and didn’t know he was missing till the police knocked.",
        isLie: false,
      },
    },
    {
      id: "dunphy",
      name: "Mike Dunphy",
      role: "The union man",
      description: "Organizing the icemen for the union. Tolle fired two men for signing cards and threw Dunphy off the pier in October.",
      statement: {
        text: "I was at the union hall on Dock Street till one, then home to bed. I haven’t set foot on Pier 9 since he threw me off it.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "wife", text: "Jealousy over his wife" },
    { id: "pay", text: "Revenge for docked pay" },
    { id: "debt", text: "To get out of a debt" },
    { id: "manager", text: "For the manager’s job" },
    { id: "inherit", text: "To inherit the ice house" },
    { id: "union", text: "To break the boss for the union" },
  ],

  weapons: [
    { id: "latch", name: "A pegged cold-room latch", detail: "The cold-room door" },
    { id: "pick", name: "An ice pick", detail: "Loading dock" },
    { id: "tongs", name: "Ice tongs", detail: "The ice chute" },
    { id: "block", name: "A cake of ice", detail: "Overhead hoist" },
    { id: "ammonia", name: "Ammonia gas", detail: "Engine room" },
    { id: "gaff", name: "A gaff hook", detail: "Fish dock" },
  ],

  clues: [
    "The coroner: he died of cold between one and four in the morning. No blow, no gas, nothing in his blood but a little rye.",
    "That latch can’t fall shut by itself. Splinters of a whittled tally peg are caught in the hasp, as if one was pushed through and pulled out again.",
    "Tolle’s ledger for Sunday stops at five to twelve, in the middle of a line. His pen lay uncapped beside it.",
    "In Tolle’s vest pocket, a latchkey on a paper tag in his own hand: “Water St.”",
  ],

  photo: { caption: "Pier 9 and the ice house", scene: "harbor" },

  // The code runs in the Courier's personals, where Tolle's lady friend left him notes in his own code.
  evidence: [
    { id: "watch-dial", kind: "report", label: "Watch clock dial · Pier 9", note: "Sun. night: punched 10, 11, 12. Blank till 3:30. Then 4, 5, 6." },
    { id: "tavern-tab", kind: "receipt", label: "The Lantern Tavern · Front St.", note: "Lem T. Five drafts and a pickled egg. On the stool 12:40 to 3:10 a.m." },
    { id: "hasp-print", kind: "fingerprint", label: "Hasp, cold-room door", note: "A fresh right thumb, printed in black compressor oil." },
  ],

  cipher: {
    hiddenOn: "clipping",
    plaintext: "SAME DOOR THURSDAY AT ELEVEN. HE WORKS NIGHTS ALL WINTER.",
    shift: 3,
    keepWords: ["NIGHTS"],
    doodle: "key",
  },

  solution: { suspectId: "holm", motiveId: "wife", weaponId: "latch" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Magnus Tolle had been calling on Arvid Holm’s wife on Water Street while Holm ran the compressors, and she " +
        "left him notes in the Courier’s personals. Holm read one. On his midnight round he told Tolle the coils in " +
        "the cold room were icing over, latched him in when he stepped inside, and pushed a peg through the hasp. " +
        "At four he pulled the peg, so the latch would look as if it had fallen.",
      saved:
        "Lem Truax lied about his rounds to keep his job. He had spent the dead hours on a stool at the Lantern " +
        "Tavern, which is why nobody saw the fish buyer’s truck, or anything else, on Pier 9 that night.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Arvid Holm, jealous over his wife. On his midnight round he latched Magnus Tolle into the cold room " +
        "and pegged the hasp, then pulled the peg at four so the latch would look as if it had fallen.",
      cost:
        "Lem Truax, caught lying about his rounds, was charged for leaving the pier unwatched and lost his job. The " +
        "ice house was sold, and Holm kept the compressors running for the new owners.",
    },
  },

  shareLine: "Keep your coat on.",
};
