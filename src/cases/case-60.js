// Case 60: Six Stripes. Drafted by Claude; edit freely.

export default {
  id: "six-stripes",
  title: "Six Stripes",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Candy Maker Found Dead in Sugar Loft",
    dateline: "RIVERSIDE, Dec. 22, 1947",
    body:
      "Josef Brandauer, 71, who founded the Silver Bell Candy Company in 1911, was found dead in the sugar loft of " +
      "his River Street factory late Sunday, as the night shift pulled the last canes of the Christmas rush.\n" +
      "The plant has run day and night since Thanksgiving. Every Silver Bell cane is still pulled by hand and wears " +
      "six red stripes, the company’s mark since its first Christmas. The last carload for Chicago was due out at dawn.\n" +
      "The watchman found the old man among the sugar sacks at twenty to twelve. A Chicago candy firm has been after " +
      "Silver Bell all year. Police kept the shift on the floor until morning.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "konrad",
      name: "Konrad Brandauer",
      role: "The grandson",
      description: "Owns a third of Silver Bell from his late father. Wants to sell to Chicago; his grandfather swore he’d sooner melt the kettles.",
      statement: {
        text: "I sat in Grandfather’s office all evening going over the Chicago offer. I never left the building.",
        isLie: true,
        truthOptions: [
          "He drove to the Riverside Hotel to sign the Chicago option",
          "He went up to the loft to have it out with his grandfather",
          "He was asleep on the office couch",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "lakatos",
      name: "Tibor Lakatos",
      role: "The candy puller",
      description: "Has pulled Silver Bell canes by hand for thirty years. Brandauer just bought a twisting machine that does it without him.",
      statement: {
        text: "I pulled the last two batches from ten till midnight. A batch sets hard in four minutes if you leave it, and I left it for nobody.",
        isLie: false,
      },
    },
    {
      id: "mraz",
      name: "Hedy Kolar",
      role: "The wrapping forelady",
      description: "Runs forty girls on the wrapping line. Brandauer fired her son in October for eating the profits, a cane at a time.",
      statement: {
        text: "My girls and I wrapped at Tibor’s table from ten on, and he never let go of his batch. At twenty past eleven something heavy hit the loft floor over our heads.",
        isLie: false,
      },
    },
    {
      id: "gilchrist",
      name: "Leland Gilchrist",
      role: "The sales manager",
      description: "Has run sales and the shipping dock since 1939. Signed for every sack of sugar that came in the dock door through the war.",
      statement: {
        text: "I spent the whole night on the shipping dock, checking cartons onto the Chicago car. Not a soul came down to help me.",
        isLie: false,
      },
    },
    {
      id: "vukovich",
      name: "Henryk Zielinski",
      role: "The night watchman",
      description: "Walks his rounds with a punch clock on his hip. Brandauer has been pricing a burglar alarm to replace him.",
      statement: {
        text: "At eleven Mr. B was up in the loft counting sacks. At twenty past I punched the front gate, and young Konrad’s car was gone from the lot.",
        isLie: false,
      },
    },
    {
      id: "farrow",
      name: "Lloyd Farrow",
      role: "The Chicago buyer",
      description: "Came down from Marlowe Candy of Chicago with an offer for Silver Bell. The old man threw him out of the office on Friday.",
      statement: {
        text: "I waited in the Riverside Hotel bar from nine on for a Brandauer to come to his senses. One did, a little after eleven.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "sugar", text: "To hide the black-market sugar" },
    { id: "sale", text: "To sell out to Chicago" },
    { id: "machine", text: "To stop the twisting machine" },
    { id: "son", text: "Revenge for a fired son" },
    { id: "alarm", text: "To keep his job" },
    { id: "cheap", text: "To buy the company cheap" },
  ],

  weapons: [
    { id: "mallet", name: "A sugar mallet", detail: "Sugar loft peg" },
    { id: "hook", name: "A pulling hook", detail: "Pulling-room wall" },
    { id: "paddle", name: "A kettle paddle", detail: "Copper kettles" },
    { id: "peppermint", name: "Oil of peppermint", detail: "Flavor room" },
    { id: "roller", name: "A batch roller", detail: "Cooling tables" },
    { id: "hoist", name: "The freight hoist", detail: "Shipping dock" },
  ],

  clues: [
    "The coroner: one blow above the ear from something heavy with a broad, flat face, about twenty past eleven. No poison.",
    "The loft’s sugar mallet hangs back on its peg, wiped clean. Blood has dried in the split of its maple head.",
    "Sugar dust on the back stair, tracked down from the loft. That stair comes out on the shipping dock and the alley door.",
    "In Brandauer’s coat, his own count: “’43 quota, 900 sacks paid for. Loft book, 600 came in. Who signed for the rest?”",
  ],

  photo: { caption: "Silver Bell Candy Co., the front office", scene: "office" },

  // The watchman's clock and the hotel wire catch the grandson. Brandauer penciled his code on a sack tag.
  evidence: [
    { id: "clock-dial", kind: "slip", label: "Watchman’s clock dial, Sunday", note: "10:50 Dock · 11:00 Loft · 11:10 Boiler room · 11:20 Front gate · 11:40 Loft" },
    { id: "option-wire", kind: "telegram", label: "Western Union · Riverside Hotel", note: "11:35 PM. OPTION SIGNED 11:15 STOP YOUNG BRANDAUER STAYED FOR A DRINK STOP OLD MAN STILL SAYS NO STOP FARROW" },
    { id: "sack-tag", kind: "tag", label: "Sugar sack tag, 1943 quota", note: "Hundred-pound sack, lot 43-117. Received at the dock, L.G. On the back, Brandauer’s pencil." },
  ],

  cipher: {
    hiddenOn: "evidence:sack-tag",
    plaintext: "THREE HUNDRED SACKS WENT BACK OUT THE DOCK DOOR AT NIGHT. NOT ONE REACHED MY KETTLES.",
    shift: 6,
    keepWords: ["DOCK"],
    doodle: "bell",
  },

  solution: { suspectId: "gilchrist", motiveId: "sugar", weaponId: "mallet" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "In 1943 Leland Gilchrist signed for nine hundred sacks of quota sugar and sold three hundred out the dock " +
        "door to a black-market bakery. On Sunday night Josef Brandauer went up to count his loft and found the hole. " +
        "At twenty past eleven Gilchrist came up the back stair from the dock, took the sugar mallet off its peg, and " +
        "struck him. The old man had kept his notes in a code keyed to his six stripes.",
      saved:
        "The Chicago car leaves at dawn with the last of the six-stripe canes. Konrad Brandauer, who lied to hide the " +
        "option he signed at the hotel, buys it back and keeps the kettles hot.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Leland Gilchrist, the sales manager, hiding the war sugar he sold out the dock door. He came up the " +
        "back stair while the old man counted sacks and struck him with the loft’s sugar mallet.",
      cost:
        "Konrad Brandauer’s lie made him the man the police wanted. While he waited for trial, Chicago bought Silver " +
        "Bell, and the six-stripe cane was gone from the shelves by Easter.",
    },
  },

  shareLine: "Not everything sweet stays sweet.",
};
