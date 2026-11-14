// Case 64: Hold Still. Drafted by Claude; edit freely.

export default {
  id: "hold-still",
  title: "Hold Still",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Society Photographer Found Poisoned in Studio",
    dateline: "RIVERSIDE, Dec. 26, 1947",
    body:
      "Raoul Davray, 49, who photographed half the brides and debutantes of Riverside Heights, was found dead in his " +
      "Locust Street studio Friday morning by his retoucher. Police say he was poisoned on Christmas night.\n" +
      "Davray was known for his “moonlight” portraits, made under a single lamp while the sitter held still for a slow " +
      "count of seven. He also sold news pictures to the Courier and carried a camera wherever he went.\n" +
      "On Christmas Eve a Salvation Army bell-ringer was struck and killed by a car at Elm and Ninth. The driver did " +
      "not stop. Police are not connecting the two cases.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "gaines",
      name: "Montague Gaines",
      role: "The alderman",
      description: "Running for mayor in the spring. Sat for his campaign portrait in November, and drives the only new Buick on the council.",
      statement: {
        text: "Davray let me in at nine on Christmas night and poured us both coffee. I took my proofs and was home before ten.",
        isLie: false,
      },
    },
    {
      id: "starkweather",
      name: "Penelope Starkweather",
      role: "The debutante",
      description: "Came out at the Assembly Ball this month. Two summers ago she wrote Davray letters her father must never see.",
      statement: {
        text: "I haven’t set foot in that studio since my sitting in October. I spent Christmas night at home.",
        isLie: true,
        truthOptions: [
          "She went to the studio at eight to buy back her letters",
          "She went at nine and quarreled with Davray",
          "She sent the family chauffeur for the letters",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "talbot",
      name: "Mrs. Greer Talbot",
      role: "The retoucher",
      description: "Her pencil makes every bride in Riverside flawless. Davray signs her best work as his own and keeps her on half pay.",
      statement: {
        text: "I had Christmas supper at my sister’s on the South Side, eight of us at the table till midnight. I opened the studio at eight this morning and found him.",
        isLie: false,
      },
    },
    {
      id: "lindgren",
      name: "Bobby Lindgren",
      role: "The darkroom boy",
      description: "Nineteen, mixes Davray’s chemicals and sweeps up. Davray has held back his wages since a box of spoiled film.",
      statement: {
        text: "I served Christmas supper at the Salvation Army hall from seven till eleven. The captain had me carving the whole time.",
        isLie: false,
      },
    },
    {
      id: "dale",
      name: "Capt. Enoch Dale",
      role: "The Salvation Army captain",
      description: "His bell-ringer was run down at Elm and Ninth on Christmas Eve. He had heard Davray was on that corner with his camera.",
      statement: {
        text: "From seven till eleven I fed two hundred at our Christmas supper, with the Lindgren boy carving beside me. I never went near Locust Street.",
        isLie: false,
      },
    },
    {
      id: "spence",
      name: "Ludovic Spence",
      role: "The rival photographer",
      description: "Keeps a studio across Locust Street and has lost three society weddings to Davray this year.",
      statement: {
        text: "I photographed the Elks’ Christmas dance from eight until past midnight. Every couple on that floor can tell you.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "hit-run", text: "To hide a hit-and-run" },
    { id: "letters", text: "To get back her letters" },
    { id: "credit", text: "Credit for her own work" },
    { id: "wages", text: "To get his back wages" },
    { id: "bell-ringer", text: "To avenge his bell-ringer" },
    { id: "trade", text: "To take the society trade" },
  ],

  weapons: [
    { id: "cyanide", name: "Potassium cyanide", detail: "Darkroom shelf" },
    { id: "tripod", name: "A tripod leg", detail: "Studio floor" },
    { id: "lamp-cord", name: "A lamp cord", detail: "Portrait lamp" },
    { id: "plate", name: "A broken glass plate", detail: "Darkroom sink" },
    { id: "tablets", name: "Sleeping tablets", detail: "Davray’s desk" },
    { id: "flash-tray", name: "A flash-powder tray", detail: "Studio shelf" },
  ],

  clues: [
    "The coroner: potassium cyanide, swallowed in coffee. He died within minutes, sometime between eight and ten on Christmas night.",
    "Two cups on the studio table, poured from one pot. Davray’s holds cyanide. The other is full, cold, and clean.",
    "The darkroom jar of cyanide, kept for reducing negatives, stands open. One clip on the drying line hangs empty.",
    "Hoskins Body Shop, Christmas morning: a black Buick in for a smashed headlamp and right fender. Paid in cash, no name given.",
  ],

  photo: { caption: "Davray’s studio, Locust Street", scene: "office" },

  // The appointment book catches the debutante and the cab ticket explains her. Davray's own ad in the personals is the code.
  evidence: [
    { id: "appointments", kind: "ledger", label: "Davray’s appointment book", note: "Christmas night. 8:00, Miss P.S., her letters. 9:00, Ald. Gaines, proofs." },
    { id: "cab", kind: "ticket", label: "Yellow Cab trip ticket", note: "Christmas night. Locust St. to the Starkweather house, Ridge Rd. Picked up 8:40 p.m." },
    { id: "print-envelope", kind: "envelope", label: "Envelope, Davray’s desk", note: "Empty. In his pencil: “Elm & 9th. The good print.”" },
  ],

  cipher: {
    hiddenOn: "clipping",
    plaintext: "I HAVE THE PLATE FROM ELM AND NINTH. BRING ONE THOUSAND TO THE STUDIO CHRISTMAS NIGHT.",
    shift: 7,
    keepWords: ["PLATE", "NINTH"],
    doodle: "moon",
  },

  solution: { suspectId: "gaines", motiveId: "hit-run", weaponId: "cyanide" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "On Christmas Eve Alderman Montague Gaines ran down a bell-ringer at Elm and Ninth, and Raoul Davray caught " +
        "his Buick on a plate. Davray named his price in the Courier personals, in a code keyed to his count of seven. " +
        "Gaines came at nine for his “proofs.” In the darkroom he took a pinch from the open cyanide jar, stirred it " +
        "into Davray’s cup while the photographer counted the money, and left his own coffee untouched.",
      saved:
        "Penelope Starkweather, who lied to hide her eight o’clock visit for her letters, keeps them and her secret. " +
        "The bell-ringer’s widow gets a name, and the Buick never leaves the body shop.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Alderman Montague Gaines, hiding the hit-and-run at Elm and Ninth. He came at nine to pay for the " +
        "negative and stirred cyanide from Davray’s own darkroom into the photographer’s coffee.",
      cost:
        "Penelope Starkweather’s lie put her name in every paper in town. Gaines was elected mayor in April, and the " +
        "bell-ringer’s widow never learned who struck him.",
    },
  },

  shareLine: "Hold still for the count.",
};
