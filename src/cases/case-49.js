// Case 49: The Night Shop. Drafted by Claude; edit freely.

export default {
  id: "night-shop",
  title: "The Night Shop",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Glass King Found Dead Above His Own Furnace",
    dateline: "RIVERSIDE, Dec. 11, 1947",
    body:
      "Oswald Penhallow, 61, owner of the Penhallow Glass Works, was found dead in his office off the glasshouse floor " +
      "Wednesday night while the night shop worked on below him.\n" +
      "Penhallow made his fortune with Harvest Moon, the amber glass in half the china cabinets in the state. He called " +
      "his big furnace the Moon and boasted it had not gone out in fifteen years, not even for the flood of ’36.\n" +
      "The furnaces were still roaring when police arrived. They will stay lit. A cold furnace cracks.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "emrys",
      name: "Emrys Vaughan",
      role: "The gaffer",
      description: "Master blower of the first shop for thirty years. Married a girl half his age in April and works nights because the old man asks him to.",
      statement: {
        text: "At ten I gave my chair to the servitor and went out to the yard bench to cool off. The night air does a gaffer good.",
        isLie: false,
      },
    },
    {
      id: "sian",
      name: "Sian Vaughan",
      role: "The office girl",
      description: "Keeps the books in Penhallow’s office. The men on the floor say the old man keeps her late on Wednesdays.",
      statement: {
        text: "I locked the office at six and went home. I was asleep when Emrys came in.",
        isLie: true,
        truthOptions: [
          "She was in the office with Penhallow until a quarter past ten",
          "She was out on the yard bench with her husband",
          "She was in the batch room, mixing the Harvest Moon",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "dombrowski",
      name: "Pete Dombrowski",
      role: "The union man",
      description: "Speaks for the blowers. Penhallow meant to put in pressing machines in January and lay off half the floor.",
      statement: {
        text: "I gathered for the second shop from nine till the shouting. Twenty men saw me at the furnace.",
        isLie: false,
      },
    },
    {
      id: "garrow",
      name: "Godfrey Garrow",
      role: "The rival’s buyer",
      description: "From the Ohio Valley Glass Co. Offered $50,000 for the Harvest Moon formula on Monday and was shown the door.",
      statement: {
        text: "I was in the Riverside Hotel bar from nine till they closed it. The old man could keep his moon.",
        isLie: false,
      },
    },
    {
      id: "roderick",
      name: "Roderick Penhallow",
      role: "The son",
      description: "Runs the sales office and runs up debts. His father cut off his allowance in November when the racetrack bills came.",
      statement: {
        text: "Father rang me at home at twenty-five past ten, shouting about my racetrack bills. He hung up on me.",
        isLie: false,
      },
    },
    {
      id: "truax",
      name: "Eamon Stannard",
      role: "The night watchman",
      description: "Punches the watch clocks round the works every hour. Penhallow docked him a week in October for sleeping in the warm lehr room.",
      statement: {
        text: "I punched the gate clock at twenty past ten and saw Mrs. Vaughan go out it. At a quarter to eleven I found him in his office.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "wife", text: "Jealousy over a young wife" },
    { id: "secret", text: "To keep her husband from finding out" },
    { id: "machines", text: "To keep the machines out" },
    { id: "formula", text: "To get the Harvest Moon formula" },
    { id: "inherit", text: "To inherit the works" },
    { id: "docked", text: "Revenge for a docked week" },
  ],

  weapons: [
    { id: "punty", name: "A punty rod", detail: "Glory hole rack" },
    { id: "hook", name: "A furnace hook", detail: "Furnace stage" },
    { id: "shears", name: "Glass shears", detail: "Gaffer’s bench" },
    { id: "shovel", name: "A cullet shovel", detail: "Cullet bin" },
    { id: "arsenic", name: "Arsenic", detail: "Batch room shelf" },
    { id: "vase", name: "A Harvest Moon vase", detail: "Office shelf" },
  ],

  clues: [
    "The coroner: one blow to the back of the head with a long iron rod, still hot enough to burn the skin. Between ten and a quarter to eleven.",
    "In the cullet bin by the yard door, a punty rod with blood on its tip. The second shop has all its rods. The first shop is one short.",
    "The yard bench faces the office window across ten feet of cinders. The blind was up all evening.",
    "Emrys Vaughan’s leather apron, hung in the yard shed, is spattered with fresh blood across the bib.",
  ],

  photo: { caption: "Penhallow Glass Works, the night shop", scene: "glasshouse" },

  // Penhallow's note to Sian is penciled in code on the back of a works photograph from her desk.
  evidence: [
    { id: "watch-clock", kind: "report", label: "Stannard Watch Clock, Dec. 10", note: "Gate 10:20. Warehouse 10:31. Sand shed 10:39. Office 10:45." },
    { id: "ohio-letter", kind: "letter", label: "Ohio Valley Glass Co.", note: "To O. Penhallow: our offer of $50,000 for the Harvest Moon stands till Friday. G. Garrow." },
    { id: "machine-order", kind: "receipt", label: "Toledo Press Machine Co.", note: "Four pressing machines. Deliver Jan. 5, 1948. Half paid. O.P." },
  ],

  cipher: {
    hiddenOn: "photo",
    plaintext: "SIAN. HE WORKS THE NIGHT SHOP TILL ELEVEN. COME UP AT TEN.",
    shift: 15,
    keepWords: ["NIGHT", "TEN"],
    doodle: "moon",
  },

  solution: { suspectId: "emrys", motiveId: "wife", weaponId: "punty" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Oswald Penhallow had been keeping Sian Vaughan late in his office on Wednesdays while her husband worked the " +
        "night shop. This Wednesday Emrys gave up his chair at ten and sat on the yard bench, under the open blind. When " +
        "Sian had gone and the old man had hung up on his son, Emrys pulled a hot punty rod from his glory hole and went in.",
      saved:
        "Sian Vaughan lied about going home at six to keep her husband from finding out. He already knew. Pete " +
        "Dombrowski, who had every reason to hate the old man, goes back to his furnace a free man.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Emrys Vaughan, the gaffer, jealous over his young wife. He watched her with Penhallow through the " +
        "office window, then struck the old man with a hot punty rod from his own glory hole.",
      cost:
        "Sian Vaughan was tried for it on the strength of her lie and the note in her desk. Emrys sat behind her in " +
        "court every day.",
    },
  },

  shareLine: "Keep the Moon burning.",
};
