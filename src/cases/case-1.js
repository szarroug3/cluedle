// Case 1: The Orchid House. Drafted by Claude; edit freely.

export default {
  id: "orchid-house",
  title: "The Orchid House",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Orchid King Found Dead Among His Flowers",
    dateline: "RIVERSIDE HEIGHTS, Oct. 23, 1946",
    body:
      "Cornelius Vane, 61, who built a shipping fortune from one leaky tug at Pier Nine, lost the freighter Albatross " +
      "in \u201931, and spent much of it on prize " +
      "orchids, was found dead in his glasshouse Tuesday night. His housekeeper raised the alarm shortly after ten.\n" +
      "Police say Vane lay among his beloved blooms with a cold cup of tea at his elbow. His wristwatch, smashed in " +
      "the fall, had stopped at twelve sharp.\n" +
      "Dr. Arthur Penrose, the family physician, called it “a heart that simply stopped.” Detectives are not so sure. " +
      "Vane leaves a young wife, the former nightclub singer Lillian Vane, and a nephew, Edward “Teddy” Vane.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "lillian",
      name: "Lillian Vane",
      role: "The widow",
      description: "Sang at the Blue Lantern until Cornelius married her. Thirty years younger. The will leaves her the house.",
      statement: {
        text: "Mae brings the tea round at nine, every night. I took mine in the parlor. Cornelius took his among the orchids.",
        isLie: false,
      },
    },
    {
      id: "teddy",
      name: "Teddy Vane",
      role: "The nephew",
      description: "Charming, broke, and in debt to the wrong people. His uncle stopped covering his markers in spring.",
      statement: {
        text: "I was at the Blue Lantern all night. Ask Sid. And I’ve never been near the kitchen garden; only Mae and the gardener have keys.",
        isLie: false,
      },
    },
    {
      id: "penrose",
      name: "Dr. Arthur Penrose",
      role: "The physician",
      description: "Family doctor for twenty years. Signs the death certificates. Lingers in the parlor with Mrs. Vane.",
      statement: {
        text: "I examined Cornelius on Monday. Heart like a bull’s. I told him he’d outlive the lot of us.",
        isLie: false,
      },
    },
    {
      id: "mae",
      name: "Mae Hollis",
      role: "The housekeeper",
      description: "Quiet, careful, never late with the tea. Keeps a sailor’s photo by her bed, signed “D.H., 1931.”",
      statement: {
        text: "I never set foot in the glasshouse. Mr. Vane didn’t allow the help near his orchids.",
        isLie: true,
        truthOptions: [
          "She carried his tea into the glasshouse herself",
          "She was at evening church until ten",
          "She left the tea tray at the glasshouse door",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "sid",
      name: "Sid Barlow",
      role: "The chauffeur",
      description: "Drove for Vane eleven years. Hears every secret said in the back seat, and is owed three months’ wages.",
      statement: {
        text: "Drove Mr. Teddy to the Blue Lantern at eight, fetched him at half past midnight. He never left the card room.",
        isLie: false,
      },
    },
    {
      id: "krall",
      name: "Victor Krall",
      role: "The partner",
      description: "Vane’s partner in the shipping line. Their last meeting ended with a slammed door heard down the street.",
      statement: {
        text: "Haven’t seen Cornelius since Friday’s board meeting. Tuesday night I was at my club until one. Ask any waiter.",
        isLie: false,
      },
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

  weapons: [
    { id: "foxglove", name: "Foxglove leaves", detail: "Kitchen garden" },
    { id: "digitalis", name: "Digitalis tablets", detail: "Doctor’s bag" },
    { id: "powders", name: "Sleeping powders", detail: "Bedside drawer" },
    { id: "rat-poison", name: "Rat poison", detail: "Potting shed" },
    { id: "cushion", name: "A velvet cushion", detail: "Parlor sofa" },
    { id: "watering-can", name: "A brass watering can", detail: "Glasshouse" },
  ],

  clues: [
    "Coroner’s report: no wound, no struggle. Heart poison, a big dose, taken by mouth within the hour.",
    "Leaf fragments in the teacup: foxglove. The only foxglove on the grounds grows in the kitchen garden, by the servants’ door.",
    "Shipping records, 1931: the Vane freighter ALBATROSS went down with all hands. Vane collected double the insurance.",
    "A letter in the housekeeper’s room, from her mother: “Dear Mae Holloway — fifteen years, and I still set a place for Danny.”",
  ],

  photo: { caption: "The glasshouse, spring ’46", scene: "glasshouse" },

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
    doodle: "anchor",
  },

  solution: { suspectId: "mae", motiveId: "revenge", weaponId: "foxglove" },

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
