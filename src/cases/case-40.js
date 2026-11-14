// Case 40: The Six Hundredth Hour. Drafted by Claude; edit freely.

export default {
  id: "six-hundredth-hour",
  title: "The Six Hundredth Hour",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Marathon Dancer Dies in 600th Hour",
    dateline: "RIVERSIDE, Dec. 2, 1947",
    body:
      "Danny Lark, 23, the crowd’s favorite at the Riverside Dance Derby, was found dead on his cot in the men’s " +
      "rest room of the Starlite Pavilion Monday night, in the 600th hour of the contest.\n" +
      "Sixty-one couples took the floor on Nov. 6 for a $1,000 prize. Three were still dancing Monday, among them " +
      "Lark and his sweetheart, Dorrie Lindell. As Couple No. 6 they had worn that number pinned to their backs for " +
      "twenty-five days.\n" +
      "Lark lay down at the quarter-to-nine rest and did not get up for the nine o’clock siren. A doctor first " +
      "blamed his heart. The derby has been halted. Promoter Bucky Farrand calls it “a tragedy for the dance.”",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "farrand",
      name: "Bucky Farrand",
      role: "The promoter",
      description: "Ran derbies in five states before the war. Bills Lark and Lindell as sweethearts, with a wedding on the floor when they win.",
      statement: {
        text: "At the break I went down to my office, same as every night, and I was back on the bandstand to call the hour at nine. Danny was my best draw.",
        isLie: false,
      },
    },
    {
      id: "lindell",
      name: "Dorrie Lindell",
      role: "The partner",
      description: "Danny’s partner for 600 hours, billed by the promoter as his sweetheart. Derby rules bar married girls.",
      statement: {
        text: "I lay on my cot in the women’s rest room the whole break. I was too tired to take my shoes off.",
        isLie: true,
        truthOptions: [
          "She slipped out to the pier to meet her husband",
          "She went into the men’s rest room to see Danny",
          "She was in the promoter’s office asking for money",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "sweeney",
      name: "Hal Sweeney",
      role: "The emcee",
      description: "Calls the derby on the nightly radio hookup. Danny Lark wanted his job when the dancing stopped, and said so.",
      statement: {
        text: "I spun records on the bandstand all through the break. Bucky went down the service stair at ten to nine and came back up at five to, out of breath.",
        isLie: false,
      },
    },
    {
      id: "kreutzer",
      name: "Alma Kreutzer",
      role: "The floor nurse",
      description: "Rubs feet and lances blisters between dances. Sells something stronger than coffee to the dancers who can pay.",
      statement: {
        text: "I worked on the girls’ feet in the women’s rest room from a quarter to nine till the siren. Miss Lindell’s cot was empty the whole time.",
        isLie: false,
      },
    },
    {
      id: "benedetti",
      name: "Nunzio Benedetti",
      role: "The rival dancer",
      description: "Couple No. 11, with a girl he met the first night. The last couple standing takes the $1,000.",
      statement: {
        text: "I lay down on the cot by the floor door, and Lark was already snoring. Nobody came through that door till the judge came for him at the siren.",
        isLie: false,
      },
    },
    {
      id: "grubb",
      name: "Whitey Grubb",
      role: "The bookmaker",
      description: "Takes bets in the balcony every night. Holds more on Lark and Lindell than he could ever pay out.",
      statement: {
        text: "I never left my seat at the balcony rail. I was holding a fortune on that boy, and now I’ll never have to pay it.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "prize", text: "To keep the prize money" },
    { id: "marriage", text: "To keep her marriage secret" },
    { id: "radio", text: "To keep his radio spot" },
    { id: "pills", text: "To hide the pep pills she sold" },
    { id: "thousand", text: "To win the thousand dollars" },
    { id: "payout", text: "To dodge a ruinous payout" },
  ],

  weapons: [
    { id: "ice-pick", name: "An ice pick", detail: "Refreshment counter" },
    { id: "pep-pills", name: "Pep pills", detail: "Nurse’s bag" },
    { id: "pillow", name: "A cot pillow", detail: "Men’s rest room" },
    { id: "mike-stand", name: "A microphone stand", detail: "Bandstand" },
    { id: "towel", name: "A rest-room towel", detail: "Men’s rest room" },
    { id: "fire-axe", name: "A fire axe", detail: "Pavilion wall" },
  ],

  clues: [
    "The doctor: not his heart. A thin puncture at the base of the skull, hidden by his hair. No drug in him, and no sign he was smothered.",
    "The ice pick went missing from the refreshment counter Monday. Police found it Tuesday inside the bandstand piano, wiped clean.",
    "Riverside Trust: the derby’s prize account was emptied on Nov. 20. The withdrawal slip is signed B. Farrand.",
    "The men’s rest room has a back door onto the service stair, which runs from the bandstand down past the promoter’s office.",
  ],

  photo: { caption: "The Starlite Pavilion, hour 600", scene: "nightclub" },

  // Danny and Dorrie passed notes on the floor in a code keyed to their couple number. This one is on his.
  evidence: [
    { id: "number-card", kind: "card", label: "Riverside Dance Derby · Couple No. 6", note: "Pinned to Danny’s back for 25 days. Pencil on the reverse." },
    { id: "wire", kind: "telegram", label: "Western Union · Norfolk, Va.", note: "MISS D. LINDELL: SHIP IN MONDAY STOP PIER DOOR AT YOUR BREAK STOP LOVE TO MRS. HALLORAN STOP GENE" },
    { id: "drug-receipt", kind: "receipt", label: "Kessel’s Drug Store", note: "Benzedrine, 200 tablets. Charged to A. Kreutzer, R.N., Nov. 28." },
  ],

  cipher: {
    hiddenOn: "evidence:number-card",
    plaintext: "THE PRIZE ACCOUNT IS EMPTY. AT NINE I TELL THE WHOLE CROWD.",
    shift: 6,
    keepWords: ["PRIZE", "NINE"],
    doodle: "clock",
  },

  solution: { suspectId: "farrand", motiveId: "prize", weaponId: "ice-pick" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Bucky Farrand emptied the derby’s prize account on Nov. 20 to pay his own debts. Danny Lark found out and " +
        "swore to tell the crowd at nine. At the quarter-to-nine break Farrand went down the service stair, in at the " +
        "rest room’s back door, and put the ice pick into the base of Danny’s skull while he slept. He hid it in the " +
        "bandstand piano and called the hour.",
      saved:
        "Dorrie Lindell lied about her cot to hide a sailor husband the rules said she couldn’t have. She was on the " +
        "pier with him at ten to nine. The last two couples split what was left of the gate.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Bucky Farrand, keeping the prize money he had already spent. He slipped down the service stair at the " +
        "break and killed Danny Lark on his cot with the ice pick from the refreshment counter.",
      cost:
        "The death went down as a heart worn out by dancing. Farrand left town on the morning bus, and the last " +
        "couples never saw a dollar.",
    },
  },

  shareLine: "Six hundred hours, and one short break.",
};
