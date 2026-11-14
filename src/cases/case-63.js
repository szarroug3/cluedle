// Case 63: The Lighting of the Tree. Drafted by Claude; edit freely.

export default {
  id: "lighting-the-tree",
  title: "The Lighting of the Tree",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Flour King Dies Lighting His Christmas Tree",
    dateline: "RIVERSIDE HEIGHTS, Dec. 25, 1947",
    body:
      "Douglas Ogilvie, 68, president of Snowflake Flour Mills, died Thursday afternoon at his home on Summit Avenue " +
      "as he lit the family Christmas tree, before the eyes of his children and his small grandson.\n" +
      "For twenty-five years Ogilvie has lit the great tree in his drawing room himself at four o’clock on Christmas " +
      "Day, and nobody else may touch the lights. Thursday he knelt to plug them in, and the room went dark.\n" +
      "A doctor among the dinner guests pronounced him dead where he fell. Police first blamed a faulty string of " +
      "lights. By nightfall they had sealed the drawing room and sent the turkey back to the kitchen.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "rosamund",
      name: "Rosamund Fife",
      role: "The daughter",
      description: "Divorced, and home with her small son since spring. Fixed radios for the Signal Corps in England during the war.",
      statement: {
        text: "I took my boy up for his nap at two. I came down for the lighting at four, like everyone.",
        isLie: false,
      },
    },
    {
      id: "marcella",
      name: "Marcella Ogilvie",
      role: "The second wife",
      description: "Thirty years his junior, and his heir under the old will. He forbade her the skating pond after she broke an ankle on it.",
      statement: {
        text: "I lay down in my room with a headache from two until the lighting. I never set foot outside.",
        isLie: true,
        truthOptions: [
          "She was skating on the pond with Malcolm and the doctor",
          "She was in the drawing room with the tree",
          "She was in the library, reading the will",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "malcolm",
      name: "Malcolm Ogilvie",
      role: "The son",
      description: "Runs the mills day to day. Wants to sell to a national firm; his father would sooner see them burn.",
      statement: {
        text: "The doctor and I skated on the pond from two till ten to four. Marcella came out with us at two and outskated us both.",
        isLie: false,
      },
    },
    {
      id: "pemberton",
      name: "Dr. Alistair Pemberton",
      role: "The family doctor",
      description: "Has doctored the Ogilvies for thirty years and dines with them every Christmas. Owes Douglas a great deal of money.",
      statement: {
        text: "I skated with Malcolm from two, and we came in together at ten to four. I pronounced Douglas dead at a minute past.",
        isLie: false,
      },
    },
    {
      id: "quayle",
      name: "Fenton Quayle",
      role: "The butler",
      description: "In service on Summit Avenue thirty years. Douglas meant to pension him off on New Year’s Day for a younger man.",
      statement: {
        text: "At two I filled the tree stand, as I do every day, and shut the drawing-room doors. Nothing under that tree was out of place.",
        isLie: false,
      },
    },
    {
      id: "castellano",
      name: "Nick Castellano",
      role: "The chauffeur",
      description: "Drove an Army truck in Italy and wires anything in the house with a plug. Sweet on Mrs. Fife, and Douglas knew it.",
      statement: {
        text: "Mr. Quayle came straight from the drawing room at two and carved for the servants’ hall. He sat over his port with me till the gong at four.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "son", text: "To keep her son" },
    { id: "widow", text: "To be a rich widow" },
    { id: "mills", text: "To sell the mills" },
    { id: "debt", text: "To wipe out a debt" },
    { id: "place", text: "To keep his place" },
    { id: "marry", text: "To marry the daughter" },
  ],

  weapons: [
    { id: "light-cord", name: "A doctored light cord", detail: "The Christmas tree" },
    { id: "digitalis", name: "Digitalis drops", detail: "Doctor’s bag" },
    { id: "powders", name: "Sleeping powders", detail: "Mrs. Ogilvie’s dressing table" },
    { id: "candelabrum", name: "A silver candelabrum", detail: "Dinner table" },
    { id: "skate", name: "A skate blade", detail: "Boot room" },
    { id: "stick", name: "A walking stick", detail: "Hall stand" },
  ],

  clues: [
    "The coroner: electrocuted. Burns on his right hand, which held the plug, and on his left palm, which gripped the iron tree stand.",
    "Under the tree skirt, the light cord has been slit and its bare copper wound twice round the iron stand. Someone who knew wiring did it.",
    "Behind the drawing-room radiator, side-cutting pliers stamped U.S. SIGNAL CORPS, a strand of tinsel in their jaws.",
    "Tinsel is trodden into the carpet of the nursery back stair, which comes down behind the tree.",
  ],

  photo: { caption: "Ogilvie House, Summit Avenue", scene: "mansion" },

  // The lawyers' letter gives the motive and the skate tag explains the wife's lie. Ogilvie's code is on his gift list.
  evidence: [
    { id: "gift-list", kind: "card", label: "Ogilvie’s gift list", note: "Marcella, pearls. Malcolm, the Packard. The boy, a pony. Rosamund, nothing." },
    { id: "lawyers", kind: "letter", label: "Brimley & Coates, Attorneys", note: "Custody petition ready as instructed. We file Friday, the 26th. The boy’s mother need not be told till then." },
    { id: "skate-tag", kind: "tag", label: "Ogden’s Skate Shop", note: "Ladies’ figure skates, size 5, sharpened Dec. 24 for Mrs. D. Ogilvie. Found drying by the boot-room stove." },
  ],

  cipher: {
    hiddenOn: "evidence:gift-list",
    plaintext: "I TOLD HER AT BREAKFAST THE LAWYERS FILE FRIDAY. SHE NEVER SAID A WORD.",
    shift: 25,
    keepWords: ["LAWYERS"],
    doodle: "snowflake",
  },

  solution: { suspectId: "rosamund", motiveId: "son", weaponId: "light-cord" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Douglas Ogilvie told his daughter at breakfast that his lawyers would file on Friday to take her boy. At two " +
        "Rosamund Fife put the child down for his nap, came down the nursery stair behind the tree, slit the light " +
        "cord with her old Signal Corps pliers, and wound the bare wire round the iron stand. At four her father knelt " +
        "to light the tree, as he had for twenty-five Christmases, the number he kept his code by.",
      saved:
        "Marcella Ogilvie’s lie hid nothing worse than an afternoon on the forbidden pond. Malcolm Ogilvie takes in his " +
        "sister’s boy, and the pony comes in the spring.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was the daughter, Rosamund Fife, keeping her son. While the house skated and the servants ate, she came " +
        "down the nursery stair, wired the iron tree stand to the lights, and let her father light his own tree.",
      cost:
        "The coroner called it faulty lights. All Summit Avenue whispered about Marcella and the pond she lied about, " +
        "and Rosamund kept the boy.",
    },
  },

  shareLine: "Some traditions should end.",
};
