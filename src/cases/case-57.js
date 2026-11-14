// Case 57: The Rest Cure. Drafted by Claude; edit freely.

export default {
  id: "rest-cure",
  title: "The Rest Cure",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Brewer Found Dead on Sanatorium Cure Porch",
    dateline: "PINE CREST, N.Y., Dec. 19, 1947",
    body:
      "Augustin Fell, 66, of Fell’s Lager in Riverside, was found dead at dawn Thursday on the open cure porch of the " +
      "Pine Crest Sanatorium, where he had been taking the rest cure for his lungs for twenty-three months.\n" +
      "Pine Crest’s patients sleep outdoors in every weather, bundled in fur bags. The night nurse found Fell in his " +
      "at six with his face in the pillow. The porch thermometer read eight below.\n" +
      "The sanatorium’s director signed it as a hemorrhage of the lungs. Fell’s family has asked the county coroner " +
      "to look again.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "moorcroft",
      name: "Dr. Everard Moorcroft",
      role: "The director",
      description: "Has run Pine Crest since 1931. At sixty dollars a week, Fell was the best-paying patient on the mountain.",
      statement: {
        text: "On Wednesday I told Mr. Fell he wasn’t fit to go home for Christmas. I worked at my charts till two and went to bed.",
        isLie: false,
      },
    },
    {
      id: "grange",
      name: "Ottoline Grange",
      role: "The night nurse",
      description: "Has worked nights on top of a day shift since the san lost two nurses. Fell complained of her to the director.",
      statement: {
        text: "I walked the cure porch every hour all night, as I always do. At five Mr. Fell was sound asleep in his bag.",
        isLie: true,
        truthOptions: [
          "She was asleep in the linen room from three till nearly six",
          "She was in the kitchen with the orderly",
          "She was on the telephone to a sweetheart",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "kopp",
      name: "Hiram Kopp",
      role: "The orderly",
      description: "Stokes the boiler and carries trays. Fell caught him going through patients’ coats and gave him till New Year’s to own up.",
      statement: {
        text: "At three I looked in the linen room and Nurse Grange was asleep on the sheets, so I let her be. I was at the boiler till six.",
        isLie: false,
      },
    },
    {
      id: "wilfred",
      name: "Wilfred Fell",
      role: "The son",
      description: "Runs the brewery for his father. A Milwaukee firm wants to buy it, and only the old man’s signature will do.",
      statement: {
        text: "I drove up Wednesday to talk Father into selling, and he wouldn’t. I slept at the inn in the village and heard at breakfast.",
        isLie: false,
      },
    },
    {
      id: "wainwright",
      name: "Margery Wainwright",
      role: "The daughter",
      description: "Fell’s daughter. Her husband’s store failed in the spring, and she has asked her father for money twice since.",
      statement: {
        text: "On the tenth I took Father down to Albany for a second opinion, on the quiet. He came back saying he’d had enough of this mountain.",
        isLie: false,
      },
    },
    {
      id: "breck",
      name: "Lt. Quincy Breck",
      role: "The patient two beds down",
      description: "A Navy flier, coughing since Guadalcanal. Owes Fell eleven hundred dollars at cribbage, and Fell wants it before he goes.",
      statement: {
        text: "My bed is two down from his. The snow stopped about two, and I heard nothing more till the nurse screamed at six.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "xrays", text: "To hide the false X-rays" },
    { id: "sleeping", text: "To hide sleeping on duty" },
    { id: "thefts", text: "To hide stealing from patients" },
    { id: "brewery", text: "To sell the family brewery" },
    { id: "store", text: "To pay her husband’s debts" },
    { id: "cribbage", text: "To wipe out a cribbage debt" },
  ],

  weapons: [
    { id: "pillow", name: "A feather pillow", detail: "Cure porch" },
    { id: "morphine", name: "Morphine syrup", detail: "Dispensary" },
    { id: "muffler", name: "A wool muffler", detail: "Porch coat hooks" },
    { id: "needle", name: "A pneumothorax needle", detail: "Treatment room" },
    { id: "stick", name: "A blackthorn stick", detail: "Porch rail" },
    { id: "hot-water", name: "A stone hot-water bottle", detail: "Linen room" },
  ],

  clues: [
    "The coroner: no hemorrhage. Burst vessels in the eyes and a down feather in the throat. Smothered, about three in the morning.",
    "Fell’s pillow lay on the empty bed beside his, its case spotted with blood from a bitten lip.",
    "Snow stopped falling at two. One line of fresh prints, a man’s galoshes, crosses the lawn from the director’s cottage to the porch steps and back.",
    "In Pine Crest’s X-ray room, the plate filed as Fell’s shows a small woman’s ribs. The director reads every plate himself.",
  ],

  photo: { caption: "Pine Crest Sanatorium, the cure porch", scene: "lodge" },

  // Fell wrote his code on the back of his own temperature chart, keyed to his months on the mountain.
  // The rounds book catches the nurse; the wire is the son's red herring.
  evidence: [
    { id: "chart", kind: "report", label: "Temperature Chart · A. Fell", note: "Normal every morning since October. On the back, a line in his pencil." },
    { id: "rounds", kind: "ledger", label: "Cure Porch Rounds · Dec. 17–18", note: "Midnight, 1, 2: initialed O.G. Then 3, 4 and 5 initialed all at once, same pencil, pressed hard." },
    { id: "milwaukee-wire", kind: "telegram", label: "Western Union · Milwaukee", note: "OFFER FOR FELLS LAGER HOLDS TO JAN 1 STOP MUST HAVE FATHERS SIGNATURE STOP" },
  ],

  cipher: {
    hiddenOn: "evidence:chart",
    plaintext: "ALBANY SAYS MY LUNGS ARE CLEAN. THE PLATES THEY SHOW ME HERE ARE NOT MINE.",
    shift: 23,
    keepWords: ["PLATES"],
    doodle: "snowflake",
  },

  solution: { suspectId: "moorcroft", motiveId: "xrays", weaponId: "pillow" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "For years Dr. Everard Moorcroft kept paying patients on his mountain by showing them other people’s X-rays. " +
        "Augustin Fell came back from Albany with clean lungs and meant to go home and say so. At three, with the night " +
        "nurse asleep in the linen room, Moorcroft crossed the fresh snow from his cottage and held Fell’s own pillow " +
        "over his face.",
      saved:
        "Ottoline Grange, who lied to cover a nap after a double shift, keeps her cap. Every patient at Pine Crest " +
        "gets a new X-ray, and four of them go home by spring.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Dr. Everard Moorcroft, hiding the false X-rays that kept paying patients at Pine Crest. When Fell came " +
        "back from Albany with clean lungs, Moorcroft smothered him with a feather pillow on the cure porch.",
      cost:
        "The hemorrhage stood. Ottoline Grange was let go for sleeping on duty, and four well men spent another winter " +
        "in their fur bags on Moorcroft’s porch.",
    },
  },

  shareLine: "Get a second opinion.",
};
