// Case 51: The Snow Scene. Drafted by Claude; edit freely.

export default {
  id: "snow-scene",
  title: "The Snow Scene",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Ballet Master Killed at Nutcracker Rehearsal",
    dateline: "RIVERSIDE, Dec. 13, 1947",
    body:
      "Konstantin Orlov, 58, founder of the Riverside Ballet, was killed Friday night at the dress rehearsal of " +
      "“The Nutcracker” at the Bijou Theatre. He was struck from above in the stage-left wing just as the snow " +
      "began to fall.\n" +
      "Orlov left Petrograd in 1920 and brought his Snow scene with him: seventeen snowflakes, one more than the " +
      "Maryinsky ever used, dancing under paper snow by the barrel. For nine winters it has been Riverside’s Christmas.\n" +
      "Police first called it a stagehand’s accident. By midnight the company was being held in the theater. " +
      "Saturday’s opening is canceled.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "belsky",
      name: "Tamara Belsky",
      role: "The ballerina",
      description: "Snow Queen and Sugar Plum. Orlov’s pupil since she was twelve, and she has never once danced for anyone else.",
      statement: {
        text: "Konstantin kissed me at half past seven and said he had news for the company after the dress. At twenty past eight I was dancing the snow.",
        isLie: false,
      },
    },
    {
      id: "arden",
      name: "Valentin Arden",
      role: "The Cavalier",
      description: "Tamara’s partner for six seasons. Orlov called him the best Cavalier in America and paid him like a chorus boy.",
      statement: {
        text: "I’m not on till Act Two. When the snow came down I was in the stage-left wings with half the company, watching Tamara.",
        isLie: false,
      },
    },
    {
      id: "brannigan",
      name: "Packy Brannigan",
      role: "The flyman",
      description: "Ran rigging on a four-master before he ran it in theaters. Orlov swore he’d fire him the next time he smelled whiskey in the flies.",
      statement: {
        text: "I never left my rail from curtain up to the snow. Nobody came up my ladder past me.",
        isLie: true,
        truthOptions: [
          "He was out at the stage door with his flask",
          "He tied the sandbag to the snow line himself",
          "He was asleep at his rail",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "sobczak",
      name: "Ruth Sobczak",
      role: "The stage manager",
      description: "Runs the show from the prompt corner. Orlov promised her the company when he retired, then said he never would.",
      statement: {
        text: "I called the snow at twenty past eight. Mr. Orlov stood on his chalk mark in the stage-left wing, same as every night.",
        isLie: false,
      },
    },
    {
      id: "sollner",
      name: "Bernhard Sollner",
      role: "The conductor",
      description: "Has conducted every Nutcracker Orlov staged in America. Orlov meant to tour next year with records instead of an orchestra.",
      statement: {
        text: "I had my baton up in the pit from half past seven on. When the snow started I heard the thud over the music and kept playing.",
        isLie: false,
      },
    },
    {
      id: "cardona",
      name: "Inez Cardona",
      role: "The wardrobe mistress",
      description: "Danced the Snow Queen in ’31 until Orlov sent her on with a cracked ankle. Now she sews the snowflakes’ tutus.",
      statement: {
        text: "At a quarter to eight I stepped out the stage door for air. Packy Brannigan was out there with his flask, and he was still there when I went in.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "wedding", text: "To stop a wedding" },
    { id: "free", text: "To be free of her teacher" },
    { id: "drink", text: "To keep his drinking quiet" },
    { id: "company", text: "To take over the company" },
    { id: "orchestra", text: "To save the orchestra" },
    { id: "career", text: "Revenge for a ruined career" },
  ],

  weapons: [
    { id: "sandbag", name: "A sandbag", detail: "Fly gallery" },
    { id: "nutcracker", name: "The giant nutcracker", detail: "Prop table" },
    { id: "sabre", name: "The Mouse King’s sabre", detail: "Mice dressing room" },
    { id: "ribbon", name: "A toe-shoe ribbon", detail: "Tamara’s dressing room" },
    { id: "powders", name: "Sleeping powders", detail: "Wardrobe room" },
    { id: "brace", name: "A stage brace", detail: "Scene dock" },
  ],

  clues: [
    "The coroner: neck broken by a great weight from above. No other mark on him, no drink and no drug.",
    "The forty-pound sandbag had been tied to the snow cradle’s line, so the first pull for the snow would drop it on Orlov’s chalk mark.",
    "Rosin on the rungs of the fly-gallery ladder, the kind dancers rub on their shoes. The flyman climbs in work boots.",
    "Paper snow in the cuffs of the Cavalier’s practice clothes. Before the snow cue, the only paper snow in the theater sat in the cradle up in the fly gallery.",
  ],

  photo: { caption: "The Snow scene, Riverside Ballet, 1946", scene: "theater" },

  // Orlov kept his notes in a code keyed to his seventeen snowflakes, pencilled on the backs of rehearsal photos.
  // The stage door book catches the liar; the card from the roses is the Cavalier's.
  evidence: [
    { id: "rose-card", kind: "card", label: "Bloom’s Flowers · Main St.", note: "Two dozen red, to Miss Belsky’s dressing room. “Say no to him, T. You know who loves you. V.”" },
    { id: "record-order", kind: "receipt", label: "Liberty Recording Co.", note: "Nutcracker, complete, 14 discs. For the 1948 tour. Ship Jan. 5. K. Orlov" },
    { id: "door-book", kind: "ledger", label: "Bijou stage door book", note: "Fri. 12th. P. Brannigan out 7:40, in 7:58. “Air.”" },
  ],

  cipher: {
    hiddenOn: "photo",
    plaintext: "TAMARA AND I MARRY AT NEW YEAR. I TELL THE COMPANY AFTER THE DRESS.",
    shift: 17,
    keepWords: ["MARRY"],
    doodle: "snowflake",
  },

  solution: { suspectId: "arden", motiveId: "wedding", weaponId: "sandbag" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Valentin Arden loved Tamara Belsky, and Konstantin Orlov meant to marry her at New Year. While Packy Brannigan " +
        "was out at the stage door with his flask, Arden climbed to the fly gallery in his rehearsal shoes and tied a " +
        "sandbag to the snow line, right over Orlov’s chalk mark. At twenty past eight Ruth Sobczak called the snow, " +
        "and the flyman pulled.",
      saved:
        "Packy Brannigan, who pulled the line that killed Orlov, is cleared and signs the pledge. The Nutcracker opens " +
        "a week late, with Tamara as the Snow Queen and a new Cavalier.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Valentin Arden, the Cavalier, who couldn’t bear to see Tamara Belsky marry Orlov. He tied a sandbag to " +
        "the snow line while the flyman was out drinking, and the snow cue brought it down.",
      cost:
        "Packy Brannigan, caught lying about his rail, went to prison for the falling sandbag. Valentin Arden partnered " +
        "Tamara at the opening a week later.",
    },
  },

  shareLine: "Watch what comes down with the snow.",
};
