// Case 27: The Final Mark. Drafted by Claude; edit freely.

export default {
  id: "final-mark",
  title: "The Final Mark",

  clipping: {
    masthead: "The Ridgemont Ledger",
    headline: "Skating Judge Collapses at Rinkside",
    dateline: "RIDGEMONT, N.Y., Mar. 8, 1947",
    body:
      "Graham Pembury, 63, senior judge of the Eastern Figure Skating Championship, collapsed at the judges’ table " +
      "Friday night just before the ladies’ final. He died before a doctor could reach him.\n" +
      "The final went ahead after an hour’s delay. Miss Bunny Pennington, 18, of Boston took the title by the narrowest " +
      "of margins. Under the arena ceiling’s thirteen painted silver snowflakes, a storm left half of the four thousand seats empty.\n" +
      "Pembury had judged at Ridgemont since 1931 and went by the rule book, friends say. Police are " +
      "questioning everyone who stood near the judges’ table.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "rochard",
      name: "Odile Rochard",
      role: "The coach",
      description: "Coaches Bunny Pennington at the Back Bay club. Always in her silver-fox collar. Knew Pembury thirty years.",
      statement: {
        text: "I stood at the rail by the judges’ table all through the interval, holding Bunny’s skate guards. Graham and I talked old times.",
        isLie: false,
      },
    },
    {
      id: "pennington",
      name: "Bunny Pennington",
      role: "The favorite",
      description: "Eighteen, skates in blue chiffon, and has never won a national. Spent last summer away from the club.",
      statement: {
        text: "Kitty and I warmed up on the back sheet the whole interval. She wouldn’t look at me. I never saw Mr. Pembury fall.",
        isLie: false,
      },
    },
    {
      id: "rawlins",
      name: "Kitty Rawlins",
      role: "The champion",
      description: "Two-time champion, twenty-four, near the end of her run. Pembury marked her down hard last spring.",
      statement: {
        text: "A man from the lobby offered me two hundred dollars to fall on my last jump. I told him where to put it, then went to warm up.",
        isLie: false,
      },
    },
    {
      id: "royle",
      name: "Harvey Royle",
      role: "The second judge",
      description: "Sat beside Pembury for eleven seasons. Lost his hardware store in the war and has been broke since.",
      statement: {
        text: "Nobody offered me a dime this week. I marked what I saw on the ice, same as Graham always did.",
        isLie: true,
        truthOptions: [
          "He took $500 from the bookmaker",
          "He was offered money and turned it down",
          "He was paid by the Back Bay club",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "ricci",
      name: "Vito Ricci",
      role: "The bookmaker",
      description: "Takes bets in the arena lobby. Laid heavy money on the Pennington girl at long odds before Friday.",
      statement: {
        text: "I sat on my stool by the lobby doors all night taking bets. Ask any usher. I don’t go rinkside, it’s bad for business.",
        isLie: false,
      },
    },
    {
      id: "ruddle",
      name: "Jethro Ruddle",
      role: "The ice man",
      description: "Scrapes and floods the ice between events. Pembury had him written up for a rut that tripped a skater.",
      statement: {
        text: "I was flooding the ice at the interval. Somebody in a long coat leaned over the judges’ table. Never saw a face.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "pro", text: "To hide a skater who turned pro" },
    { id: "title", text: "To win the championship" },
    { id: "marks", text: "Revenge for last year’s marks" },
    { id: "bribe", text: "To hide a bribe he took" },
    { id: "bet", text: "To collect on a long-odds bet" },
    { id: "job", text: "To keep from being sacked" },
  ],

  weapons: [
    { id: "liniment", name: "Aconite liniment", detail: "Coach’s bag" },
    { id: "ammonia", name: "Refrigerant ammonia", detail: "Compressor room" },
    { id: "blade", name: "A skate blade", detail: "Dressing room" },
    { id: "stick", name: "A hockey stick", detail: "Equipment room" },
    { id: "ether", name: "Ether", detail: "First-aid room" },
    { id: "pills", name: "His heart pills", detail: "Judge’s pocket" },
  ],

  clues: [
    "The coroner: a plant poison, swallowed within the hour. No wound, no fall. His mouth and fingers would have gone numb first.",
    "Pembury’s cocoa cup smelled of wintergreen and camphor, like a trainer’s rub. The pot it was poured from was clean.",
    "A near-empty bottle of aconite liniment turned up in the ladies’ washroom bin. The label reads “Pennington — knees.”",
    "Pembury’s notebook: “B.P. is Bunny Price, paid, Atlantic City. Tell the committee before the final.”",
  ],

  photo: { caption: "Ridgemont Arena, ladies’ final", scene: "ring" },

  // A ticket stub from the stands carries the code. The envelope catches the second judge; the program is what Pembury found.
  evidence: [
    { id: "final-stub", kind: "stub", label: "Ridgemont Arena · Mar. 7, 1947", note: "Ladies’ Final · Sec. C, Row G · Admit One" },
    { id: "lobby-envelope", kind: "envelope", label: "V.R., Arena Lobby", note: "Judge H. Royle · By hand · Found in his coat, $500 inside" },
    { id: "ice-program", kind: "card", label: "Ice Capers, Atlantic City", note: "Aug. ’46 program · “Bunny Price, the Boston Bluebird”" },
  ],

  cipher: {
    hiddenOn: "evidence:final-stub",
    plaintext: "THE BLUEBIRD FROM THE ATLANTIC CITY SHOW SKATES FOR BOSTON NOW.",
    shift: 13,
    keepWords: ["BLUEBIRD"],
    doodle: "snowflake",
  },

  solution: { suspectId: "rochard", motiveId: "pro", weaponId: "liniment" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Odile Rochard put Bunny Pennington in an Atlantic City ice show for pay in the summer of ’46, billed as Bunny " +
        "Price. A paid skater can’t hold an amateur title. Graham Pembury found the program and meant to tell the " +
        "committee before the final. At the interval Odile leaned over the judges’ table and tipped aconite liniment " +
        "from her bag into his cocoa. Bunny won by a tenth of a point and never knew what it cost.",
      saved:
        "Harvey Royle took the bookmaker’s money and lied about it, so he was the first man the police wanted. He loses " +
        "his judge’s badge and nothing more. Kitty Rawlins gets her title back.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Odile Rochard, hiding that Bunny Pennington had skated for pay. Graham Pembury found the Atlantic City " +
        "program, so at the interval she tipped aconite liniment from her bag into his cocoa.",
      cost:
        "Royle’s envelope was all the police needed, and the committee barred him for life. Bunny kept her title. Odile " +
        "coached her into a touring ice show the next winter, where amateur rules don’t count.",
    },
  },

  shareLine: "Somebody has to judge the judges.",
};
