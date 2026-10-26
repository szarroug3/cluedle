// Case 21: The Guest Baton. Drafted by Claude; edit freely.

export default {
  id: "guest-baton",
  title: "The Guest Baton",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Guest Conductor Dies at Podium",
    dateline: "RIVERSIDE, Oct. 17, 1947",
    body:
      "Ivo Kasprzak, 34, the guest conductor from Prague, collapsed at the podium of Memorial Hall on Thursday night " +
      "during the slow movement of Brahms’s First and died before a doctor could reach the stage.\n" +
      "Kasprzak came in on the morning train from New York and rehearsed the orchestra that afternoon. The tower’s " +
      "twenty-five bells had rung eight only minutes before he raised his baton.\n" +
      "The board meets Monday, and Kasprzak was tipped to take the post of Ansel Kittredge, 61, music director since " +
      "1927. Some 1,400 patrons saw the young man fall. Police are questioning the company.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "harriet",
      name: "Harriet Kittredge",
      role: "The wife",
      description: "Ansel’s wife of thirty years. If the board retires him, they live on half pay.",
      statement: {
        text: "At six I rubbed Ansel’s liniment into his hands, like every night before a concert. By a quarter past seven I was in Box C.",
        isLie: false,
      },
    },
    {
      id: "kittredge",
      name: "Ansel Kittredge",
      role: "The music director",
      description: "Has led the Symphony twenty years. On Monday the board means to hand his post to Kasprzak.",
      statement: {
        text: "I studied the score in my room from six. Harriet did my hands and left. I never went near Ivo’s door.",
        isLie: false,
      },
    },
    {
      id: "lanigan",
      name: "Norbert Lanigan",
      role: "The stage manager",
      description: "Runs the stage and keeps the keys. Kasprzak smelled gin on him at rehearsal and said he’d tell the board.",
      statement: {
        text: "I sat outside the guest room from six until Mr. Kasprzak came in at a quarter past seven. Not a soul went in that door.",
        isLie: true,
        truthOptions: [
          "He was across the street at Moriarty’s",
          "He was asleep in the prop room",
          "He let Mr. Keyes into the guest room",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "jardine",
      name: "Emmett Jardine",
      role: "The concertmaster",
      description: "First violin for nineteen years. Word in the pit was that Kasprzak would bring his own man from Prague.",
      statement: {
        text: "Norbert and I slipped across to Moriarty’s for a beer at a quarter to seven. We were back by ten past. Then I tuned the band.",
        isLie: false,
      },
    },
    {
      id: "larkin",
      name: "Signe Larkin",
      role: "The soprano",
      description: "Sings the Mahler after the interval. Toured with Kasprzak before the war, until he threw her over in Vienna.",
      statement: {
        text: "Through my wall I heard the maestro at his piano from six till the bell. Near seven a woman’s heels went by toward the guest room.",
        isLie: false,
      },
    },
    {
      id: "keyes",
      name: "Prentice Keyes",
      role: "The board chairman",
      description: "Brought Kasprzak over from Prague. Then he heard Boston had offered the young man more.",
      statement: {
        text: "Ivo and I dined at the Carlin from six. I walked him to the stage door at a quarter past seven, then sat in Box A with the mayor.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "post", text: "To save Kittredge’s post" },
    { id: "jealousy", text: "Jealousy over his wife" },
    { id: "double-cross", text: "To pay back a double-cross" },
    { id: "chair", text: "To keep the first violin chair" },
    { id: "jilted", text: "Revenge for an old love affair" },
    { id: "drinking", text: "To keep a drinking secret" },
  ],

  weapons: [
    { id: "nicotine", name: "Nicotine spray", detail: "Florist’s bottle" },
    { id: "aconite", name: "Aconite liniment", detail: "Maestro’s shelf" },
    { id: "water", name: "A doped water glass", detail: "Podium rail" },
    { id: "lozenges", name: "Cough lozenges", detail: "Soprano’s tin" },
    { id: "chloral", name: "Chloral in coffee", detail: "Green room urn" },
    { id: "rat-poison", name: "Rat poison", detail: "Basement stores" },
  ],

  clues: [
    "The coroner: a plant poison, taken in through the skin and not by mouth.",
    "The cork grip of Kasprzak’s baton was soaked in nicotine. No one else handled it.",
    "The board’s bylaws: if the post is not filled by January, the sitting director serves five more years at full pay.",
    "In the trash in Box C: an empty florist’s bottle of nicotine spray.",
  ],

  photo: { caption: "Memorial Hall, from the balcony", scene: "theater" },

  // The code is one more printed line on the program stub.
  evidence: [
    { id: "program-stub", kind: "stub", label: "Memorial Hall · Oct. 16, 1947", note: "8 p.m. · Brahms No. 1 · Guest cond. Ivo Kasprzak · Admit One" },
    { id: "kasprzak-letter", kind: "letter", label: "Ivo Kasprzak to E. Jardine", note: "Emmett, of course you keep first chair. I bring no one. — I.K." },
    { id: "harriet-card", kind: "card", label: "Card on the guest-room roses", note: "Mr. Kasprzak — every good wish for tonight. H.K." },
  ],

  cipher: {
    hiddenOn: "evidence:program-stub",
    plaintext: "THE GUEST ROOM STOOD EMPTY FROM A QUARTER TO SEVEN TILL TEN PAST.",
    shift: 25,
    keepWords: ["EMPTY"],
    doodle: "bell",
  },

  solution: { suspectId: "harriet", motiveId: "post", weaponId: "nicotine" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Harriet Kittredge knew the board would retire her husband on half pay the day Ivo Kasprzak signed. While the " +
        "stage manager drank across the street, she carried roses into the empty guest room and soaked the cork grip " +
        "of Kasprzak’s baton in florist’s nicotine. She left her card with the flowers. From Box C she watched him " +
        "raise the stick for the Brahms.",
      saved:
        "Ansel Kittredge had the most to lose, and his own aconite liniment sat on the shelf. The police meant to " +
        "hold him. He conducts the memorial concert in November.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Harriet Kittredge, saving her husband’s post. While the guest room stood empty she soaked the grip " +
        "of Ivo Kasprzak’s baton in florist’s nicotine, then watched him die from Box C.",
      cost:
        "The coroner’s jury could not say how the poison got on the baton, and nobody was charged. Kittredge kept " +
        "his post five more years, and Harriet kept her seat in Box C.",
    },
  },

  shareLine: "Ask who left the door unwatched.",
};
