// Case 24: The Hall of Kings. Drafted by Claude; edit freely.

export default {
  id: "hall-of-kings",
  title: "The Hall of Kings",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Waxworks Owner Found Among His Figures",
    dateline: "RIVERSIDE, Sept. 17, 1947",
    body:
      "Thaddeus Mallory, 66, proprietor of Mallory’s Hall of Wax on Front Street, was found dead at dawn Wednesday in " +
      "his own Hall of Kings, propped at the foot of a throne among the figures.\n" +
      "The night watchman found him at ten past six on his last round. Mallory had stayed late Tuesday to count the " +
      "week’s takings, as was his habit.\n" +
      "Mallory opened the hall in 1919 with fifteen death masks bought in Paris, which still hang in the lobby. His " +
      "sister, Constance Mallory, owns a third of the business.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "nunley",
      name: "Abner Nunley",
      role: "The night watchman",
      description: "Walks the halls all night with a lamp. Seventy and slight. Mallory meant to retire him at Christmas.",
      statement: {
        text: "At one I walked the Hall of Kings. The headsman stood by his block in his hood, axe and all, same as every night.",
        isLie: false,
      },
    },
    {
      id: "constance",
      name: "Constance Mallory",
      role: "The sister",
      description: "Owns a third of the hall. A department store wants the corner lot, and Thaddeus won’t sell.",
      statement: {
        text: "I had supper with Thaddeus at seven and left him counting the till at nine. I went home to the Ardmore and stayed there.",
        isLie: false,
      },
    },
    {
      id: "oakes",
      name: "Bram Oakes",
      role: "The sculptor",
      description: "Makes every figure in the hall, from his own molds. Holds the only key to the workshop.",
      statement: {
        text: "I locked the workshop at six and went home. I didn’t set foot in the hall again till they called me at eight.",
        isLie: true,
        truthOptions: [
          "He came back to the hall around midnight",
          "He spent the evening at the Monarch Shows lot",
          "He drank downtown until the bars closed",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "nance",
      name: "Lottie Nance",
      role: "The ticket girl",
      description: "Sells tickets in the front booth. Mallory docked her a week’s pay when the till came up short.",
      statement: {
        text: "I rode the last streetcar past the hall at midnight. There was a light in the workshop and Mr. Oakes’s bicycle at the curb.",
        isLie: false,
      },
    },
    {
      id: "mabry",
      name: "Jake Mabry",
      role: "The carnival man",
      description: "Runs the Monarch Shows lot on the river road. Offered for Mallory’s chamber of horrors and got laughed at.",
      statement: {
        text: "I was out at my lot all night counting the take. My whole crew saw me. I never went near Front Street.",
        isLie: false,
      },
    },
    {
      id: "munro",
      name: "Gladys Munro",
      role: "The tour guide",
      description: "Gives the tours in a black dress. Was engaged to Thaddeus until he broke it off in the spring.",
      statement: {
        text: "I gave the last tour at eight. Mr. Mallory let me out the front and I heard him shoot the bolt behind me.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "copies", text: "To hide the copies he sold" },
    { id: "lot", text: "To sell the corner lot" },
    { id: "retire", text: "To keep from being retired" },
    { id: "till", text: "To cover a short till" },
    { id: "chamber", text: "To get the chamber of horrors" },
    { id: "jilted", text: "Revenge for a broken engagement" },
  ],

  weapons: [
    { id: "velvet-rope", name: "A velvet rope", detail: "Hall of Kings" },
    { id: "axe", name: "A prop axe", detail: "Headsman’s block" },
    { id: "mallet", name: "A sculptor’s mallet", detail: "Workshop" },
    { id: "wire", name: "Modeling wire", detail: "Workshop bench" },
    { id: "stanchion", name: "A brass stanchion", detail: "Lobby" },
    { id: "cash-box", name: "A steel cash box", detail: "Mallory’s office" },
  ],

  clues: [
    "The coroner: strangled from behind, between midnight and two, with something thick and soft. No wire, no thin cord.",
    "One velvet rope is gone from the brass posts in the Hall of Kings. It turned up behind the throne curtain.",
    "In the dust on the headsman’s plinth, two size-thirteen shoe prints side by side, as if a man stood there a long while.",
    "Mallory’s desk diary, Friday: “Monarch Shows has my Lizzie Borden, cast from my molds. Only the workshop has those.”",
  ],

  photo: { caption: "The Hall of Kings, Mallory’s Hall of Wax", scene: "theater" },

  // Mallory's own coded line is on the repair tag. The watch book fixes the times.
  evidence: [
    { id: "repair-tag", kind: "tag", label: "Hall of Wax · Repair No. 12", note: "Headsman, new hands. To workshop Mon. with robe & hood. —T.M." },
    { id: "watch-book", kind: "ledger", label: "Night Watch Book · Tues.", note: "12:00 Mr. M. at desk | 1:00 Kings, all in place | 6:10 found him" },
    { id: "monarch-ad", kind: "classified", label: "Courier · Amusements", note: "MONARCH SHOWS, River Rd. NEW! Lizzie Borden, life-size wax. 25¢" },
  ],

  cipher: {
    hiddenOn: "evidence:repair-tag",
    plaintext: "SOMEONE IS SELLING MY FIGURES. I WAIT UP TONIGHT TO SEE WHO.",
    shift: 15,
    keepWords: ["FIGURES"],
    doodle: "mask",
  },

  solution: { suspectId: "oakes", motiveId: "copies", weaponId: "velvet-rope" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Bram Oakes had been casting copies from Mallory’s molds and selling them to Monarch Shows. Mallory meant to " +
        "have it out with him at midnight. Oakes strangled him with a velvet rope, and when the watchman’s lamp came " +
        "round at one he stood on the empty plinth in the headsman’s robe and hood. Then he propped the body among the " +
        "kings and went out through the workshop.",
      saved:
        "Abner Nunley was sure his old eyes had failed him. Now he knows they didn’t, and the police stop asking how he " +
        "slept through a murder.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Bram Oakes, hiding the copies he had cast from Mallory’s molds and sold to a carnival. He strangled " +
        "Mallory with a velvet rope, then stood in for the headsman, who was away in the workshop, while the watchman " +
        "walked past.",
      cost:
        "It went down as a suicide among his figures. The Hall of Wax closed that winter, and Oakes’s Lizzie Borden " +
        "still tours with Monarch Shows.",
    },
  },

  shareLine: "Count the figures twice.",
};
