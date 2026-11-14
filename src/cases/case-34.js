// Case 34: Room for One More. Drafted by Claude; edit freely.

export default {
  id: "room-for-one-more",
  title: "Room for One More",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Uninvited Guest Dies at Boarding House Supper",
    dateline: "RIVERSIDE, Nov. 28, 1947",
    body:
      "Every Thanksgiving, the widow Agnes Pell sets one long table at her Linden Street boarding house for " +
      "lodgers with nowhere else to go. This year a guest came who had not been asked: her brother Clement, " +
      "unseen in Riverside for twenty years.\n" +
      "Clement Pell, 54, was found dead at the foot of the cellar stairs Thursday, before the pumpkin pie was " +
      "served. He had gone down to fetch the cider.\n" +
      "Six sat at the table with him, counting Officer Dan Mulcahy, who stops in for pie every year and found the " +
      "body. “He came home with a will in his pocket,” a neighbor said. “Agnes set him a place all the same.”",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "agnes",
      name: "Agnes Pell",
      role: "The landlady",
      description: "Clement’s sister. He came back waving their mother’s will, which leaves him half the house.",
      statement: {
        text: "I said grace at three. Clem went down for the cider when I cut the pie. I heard him fall and sent Dan down.",
        isLie: false,
      },
    },
    {
      id: "briggs",
      name: "Walter Briggs",
      role: "The motorman",
      description: "Retired from the streetcars. Has lodged here eleven years and carves every year. Lost his savings in ’39.",
      statement: {
        text: "I carved at a quarter past three. Clem sat across from me grinning like he’d won the house. I never left my chair.",
        isLie: false,
      },
    },
    {
      id: "june",
      name: "June Ostrowski",
      role: "The switchboard girl",
      description: "A war widow on nights at the telephone exchange. Clement hinted he knew how her husband really died.",
      statement: {
        text: "Mr. Fenwick went to wash up just before grace and came back as we said amen. Nobody else stirred till the pie.",
        isLie: false,
      },
    },
    {
      id: "teodor",
      name: "Teodor Halas",
      role: "The violinist",
      description: "The newest lodger, a refugee who plays after supper. Goes out every Thursday and won’t say where.",
      statement: {
        text: "After supper I stayed by the kitchen stove, tuning my violin, until I heard the crash.",
        isLie: true,
        truthOptions: [
          "He slipped out to play for the old folks’ home",
          "He was in the cellar, fetching the cider",
          "He was on the hall telephone",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "fenwick",
      name: "Lyle Fenwick",
      role: "The salesman",
      description: "Everyone’s favorite lodger. Sells brushes door to door and brought the cranberry sauce, can and all.",
      statement: {
        text: "I washed up at the kitchen sink before grace, then sat by Mrs. Pell through supper. Best turkey in Riverside.",
        isLie: false,
      },
    },
    {
      id: "mulcahy",
      name: "Dan Mulcahy",
      role: "The beat cop",
      description: "Has walked Linden Street since ’31. Clement once sold him a radio that never played a note.",
      statement: {
        text: "Passing the old folks’ home at four, I heard a fiddle playing inside. Mrs. Pell sent me down to Clem. The third stair rocked.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "house", text: "To keep the house whole" },
    { id: "savings", text: "Revenge for lost savings" },
    { id: "husband", text: "To bury a secret about a husband" },
    { id: "thursdays", text: "To keep his Thursdays private" },
    { id: "swindle", text: "To keep an old swindle buried" },
    { id: "radio", text: "To settle a score over a radio" },
  ],

  weapons: [
    { id: "jug", name: "The cider jug", detail: "Cellar shelf" },
    { id: "carving-knife", name: "The carving knife", detail: "The turkey platter" },
    { id: "stair", name: "A loosened stair", detail: "Cellar steps" },
    { id: "rat-poison", name: "Rat poison", detail: "Pantry shelf" },
    { id: "poker", name: "A fire poker", detail: "Parlor hearth" },
    { id: "rolling-pin", name: "A rolling pin", detail: "Pie board" },
  ],

  clues: [
    "The doctor: a broken neck from the fall, and no other mark on him. The cider jug never left the shelf.",
    "The third cellar tread has been pried up and set back on its nails. The scratches in the wood are fresh.",
    "A claw hammer from a brush salesman’s sample case, with cellar whitewash dried on its claw.",
    "In Clement’s coat, an unmailed letter to the police: “the other man from the ’39 radio scheme lodges here.”",
  ],

  photo: { caption: "Thanksgiving at the Linden Street house", scene: "hotel" },

  // Clement's place card carries his code as one more line.
  evidence: [
    { id: "place-card", kind: "card", label: "Clement’s place card", note: "Agnes wrote his name in her best hand. On the back, his pencil." },
    { id: "will", kind: "envelope", label: "Mother Pell’s will", note: "Half the house to Clement. Witnessed 1927. Found in his coat." },
    { id: "radio-slip", kind: "slip", label: "Pell & Co. Radios · 1939", note: "Received from W. Briggs, $600, for one share. Signed C.P. and partner." },
  ],

  cipher: {
    hiddenOn: "evidence:place-card",
    plaintext: "MY OLD RADIO PARTNER IS AT THIS TABLE. HE STILL SELLS DOOR TO DOOR.",
    shift: 20,
    keepWords: ["RADIO"],
    doodle: "turkey",
  },

  solution: { suspectId: "fenwick", motiveId: "swindle", weaponId: "stair" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "In ’39 Lyle Fenwick and Clement Pell sold shares in a radio shop that never opened, and Fenwick vanished " +
        "with the money. Clement came home to sell him out. While the table bowed its heads for grace, Fenwick " +
        "slipped to the cellar with a hammer from his sample case and pried up the third stair.",
      saved:
        "Teodor Halas’s lie about the kitchen stove was enough to make him a suspect. He’d been at the old folks’ " +
        "home down the street, playing for them, as he does every Thursday.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Lyle Fenwick, Clement Pell’s partner in the 1939 radio swindle, keeping it buried. During grace he " +
        "pried up the third cellar stair with a hammer from his sample case, and Clement went down for the cider.",
      cost:
        "Teodor Halas was held for a month on the strength of his lie. The old folks down the street went without " +
        "their Thursday music until Christmas.",
    },
  },

  shareLine: "Count who bowed their head for grace.",
};
