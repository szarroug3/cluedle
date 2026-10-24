// Case 1: The Orchid House. Drafted by Claude; edit freely.

export default {
  id: "orchid-house",
  title: "The Orchid House",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Orchid King Found Dead Among His Flowers",
    dateline: "RIVERSIDE HEIGHTS, Oct. 23, 1946",
    body:
      "Cornelius Vane, 61, who built a shipping fortune from one leaky tug at Pier Nine and spent much of it on prize " +
      "orchids, was found dead in his glasshouse Tuesday night. His housekeeper raised the alarm shortly after ten.\n" +
      "Police say Vane lay among his beloved blooms with a cold cup of tea at his elbow. His wristwatch, smashed in " +
      "the fall, had stopped at twelve sharp.\n" +
      "Dr. Arthur Penrose, the family physician, called it “a heart that simply stopped.” Detectives are not so sure. " +
      "Vane leaves a young wife, the former nightclub singer Lillian Vane, and a nephew, Edward “Teddy” Vane. " +
      "The family declined to comment.",
  },

  suspects: [
    {
      id: "lillian",
      name: "Lillian Vane",
      role: "The widow",
      description: "Sang at the Blue Lantern until Cornelius married her. Thirty years younger. The will leaves her the house.",
    },
    {
      id: "teddy",
      name: "Teddy Vane",
      role: "The nephew",
      description: "Charming, broke, and in debt to the wrong people. His uncle stopped covering his markers in spring.",
    },
    {
      id: "penrose",
      name: "Dr. Arthur Penrose",
      role: "The physician",
      description: "Family doctor for twenty years. Signs the death certificates. Lingers in the parlor with Mrs. Vane.",
    },
    {
      id: "mae",
      name: "Mae Hollis",
      role: "The housekeeper",
      description: "Quiet, careful, never late with the tea. Came to the house four years ago with fine references.",
    },
    {
      id: "sid",
      name: "Sid Barlow",
      role: "The chauffeur",
      description: "Drove for Vane eleven years. Hears every secret said in the back seat, and is owed three months\u2019 wages.",
    },
    {
      id: "krall",
      name: "Victor Krall",
      role: "The partner",
      description: "Vane\u2019s partner in the shipping line. Their last meeting ended with a slammed door heard down the street.",
    },
  ],

  motives: [
    { id: "inheritance", text: "To inherit the Vane fortune" },
    { id: "debts", text: "To wipe out gambling debts" },
    { id: "affair", text: "To keep a love affair quiet" },
    { id: "revenge", text: "To avenge a lost brother" },
    { id: "blackmail", text: "To bury a blackmail secret" },
    { id: "business", text: "To seize the shipping line" },
  ],

  statements: [
    {
      id: "sid-statement",
      witness: "Sid Barlow, chauffeur",
      text: "Drove Mr. Teddy to the Blue Lantern at eight, fetched him at half past midnight. He never left the card room.",
      isLie: false,
    },
    {
      id: "lillian-statement",
      witness: "Lillian Vane, the widow",
      text: "Mae brings the tea round at nine, every night. I took mine in the parlor. Cornelius took his among the orchids.",
      isLie: false,
    },
    {
      id: "penrose-statement",
      witness: "Dr. Arthur Penrose",
      text: "I examined Cornelius on Monday. Heart like a bull\u2019s. I told him he\u2019d outlive the lot of us.",
      isLie: false,
    },
    {
      id: "mae-statement",
      witness: "Mae Hollis, housekeeper",
      text: "I never set foot in the glasshouse. Mr. Vane didn\u2019t allow the help near his orchids.",
      isLie: true,
      truthOptions: [
        "She carried his tea into the glasshouse herself",
        "She was at evening church until ten",
        "She left the tea tray at the glasshouse door",
      ],
      truthIndex: 0,
    },
    {
      id: "krall-statement",
      witness: "Victor Krall, partner",
      text: "Haven\u2019t seen Cornelius since Friday\u2019s board meeting. Tuesday night I was at my club until one. Ask any waiter.",
      isLie: false,
    },
    {
      id: "pruitt-statement",
      witness: "Ned Pruitt, gardener",
      text: "I lock the kitchen garden gate at six, same as always. Only the household keeps a key.",
      isLie: false,
    },
  ],

  clues: [
    "Coroner’s report: foxglove, steeped in the tea. Enough to stop a strong heart cold.",
    "The only foxglove on the grounds grows in the kitchen garden, by the servants’ door.",
    "Shipping records, 1931: the Vane freighter ALBATROSS went down with all hands. Vane collected double the insurance.",
    "A letter in the housekeeper’s room, from her mother: “Dear Mae Holloway — fifteen years, and I still set a place for Danny.”",
  ],

  photo: { caption: "The glasshouse, spring ’46" },

  // Decoys: handwritten scraps that look like code from across the board but read plainly up close.
  evidence: [
    { id: "matchbook", kind: "matchbook", label: "The Blue Lantern", note: "LAkeview 4-0712 — after 11" },
    { id: "pawn-ticket", kind: "ticket", label: "Feldman’s Loans · No. 3318", note: "pearl necklace — L.V." },
    { id: "prescription", kind: "prescription", label: "Arthur Penrose, M.D.", note: "digit. 0.1 mg prn — A.P." },
  ],

  cipher: {
    hiddenOn: "photo",
    plaintext: "I SANK THE ALBATROSS FOR THE INSURANCE. THE HOLLOWAY BOY WENT DOWN WITH HER.",
    shift: 9,
    keepWords: ["ALBATROSS", "HOLLOWAY"],
  },

  solution: { suspectId: "mae", motiveId: "revenge" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Mae Hollis was born Mae Holloway. Her brother Danny was nineteen when he shipped out on the Albatross, the freighter " +
        "Cornelius Vane sank for the insurance in 1931. Mae took a job under a borrowed name, waited four years for the right " +
        "night, and steeped foxglove from the kitchen garden in his evening tea.",
      saved:
        "Mae meant to finish the Vane line: Lillian by Christmas, Teddy by Easter. Both of them will see the spring.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Mae Hollis, born Mae Holloway, avenging her brother Danny, lost with the Albatross when Cornelius Vane sank " +
        "it for the insurance. She steeped foxglove from the kitchen garden in his evening tea.",
      cost:
        "Nobody stopped her. Lillian Vane was dead by Christmas and Teddy by Easter, both “hearts that simply stopped.” " +
        "Mae gave her notice in April and was never seen again.",
    },
  },

  shareLine: "Every flower has its poison.",
};
