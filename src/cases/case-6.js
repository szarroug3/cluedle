// Case 6: The Eleventh Hour. Drafted by Claude; edit freely.

export default {
  id: "eleventh-hour",
  title: "The Eleventh Hour",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Hotel Owner Slain During Christmas Ball",
    dateline: "RIVERSIDE, Dec. 22, 1946",
    body:
      "Leland Whitcomb, 64, owner of the Grand Meridian Hotel, was found stabbed to death in his twelfth-floor suite " +
      "early Sunday while three hundred guests danced at the hotel’s Christmas ball below.\n" +
      "The brass clock on his desk, knocked to the carpet, had stopped at 11:40. Police believe it marks the moment " +
      "of the attack. In the lobby, the Meridian’s great clock, kept five minutes fast since 1907 so no guest would " +
      "miss a train, chimed on.\n" +
      "Once the finest house downtown, the Meridian has lost money since the war, and a buyer has circled for months. " +
      "The widow, Celeste Whitcomb, declined to comment.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "celeste",
      name: "Celeste Whitcomb",
      role: "The widow",
      description: "Twenty years younger than Leland and bored at every party. Under the old will, the hotel is hers.",
      statement: {
        text: "I danced in the Starlight Room from nine until they came for me. I didn’t leave the floor once.",
        isLie: true,
        truthOptions: [
          "She spent an hour in Room 814 with the lawyer",
          "She went up to Suite 1200 to quarrel with Leland",
          "She slipped out to meet the buyer at the bar",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "sutter",
      name: "Raymond Sutter",
      role: "The lawyer",
      description: "Whitcomb’s lawyer. Drew up a new will last week that cuts the widow off. Keeps a room on eight.",
      statement: {
        text: "I spent the evening in Room 814 with Leland’s papers. I never went up to twelve, and never set foot in the ball.",
        isLie: false,
      },
    },
    {
      id: "pell",
      name: "Gordon Prewitt",
      role: "The manager",
      description: "Manager for nineteen years. He keeps the ledgers and signs every bank slip himself.",
      statement: {
        text: "From eleven on I was in the Starlight Room shaking hands. Three hundred guests saw me. Ask any of them.",
        isLie: false,
      },
    },
    {
      id: "benny",
      name: "Joey Duvall",
      role: "The elevator man",
      description: "Has run the main car eleven years. Whitcomb meant to put in an automatic lift come the new year.",
      statement: {
        text: "Took Mrs. Whitcomb up to eight at half past ten, back down at half eleven. Mr. Prewitt passed me for the back stairs at 10:25.",
        isLie: false,
      },
    },
    {
      id: "kane",
      name: "Dolores Kane",
      role: "The switchboard girl",
      description: "Runs the hotel switchboard and listens in. Whitcomb caught her selling a guest’s secrets to a columnist.",
      statement: {
        text: "Mr. Whitcomb rang down for coffee at a quarter past ten. I put a call through to his suite at 10:55. No answer.",
        isLie: false,
      },
    },
    {
      id: "dorrance",
      name: "Max Dorrance",
      role: "The buyer",
      description: "Wants the Meridian torn down for an office tower. Whitcomb turned down his last offer over dinner, loudly.",
      statement: {
        text: "Leland said no at dinner, and I said fine. I drank at the lobby bar till it closed at one. Ask Eddie.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "funds", text: "To hide stolen hotel funds" },
    { id: "inheritance", text: "To inherit the Grand Meridian" },
    { id: "affair", text: "To keep a love affair quiet" },
    { id: "sale", text: "To force the sale of the hotel" },
    { id: "blackmail", text: "To bury a blackmail secret" },
    { id: "job", text: "To keep from being let go" },
  ],

  weapons: [
    { id: "letter-opener", name: "A letter opener", detail: "Victim’s desk" },
    { id: "carving-knife", name: "A carving knife", detail: "Room-service cart" },
    { id: "razor", name: "A straight razor", detail: "Hotel barbershop" },
    { id: "revolver", name: "A .38 revolver", detail: "Night desk drawer" },
    { id: "tablets", name: "Sleeping tablets", detail: "Widow’s vanity" },
    { id: "poker", name: "A fireplace poker", detail: "Suite 1200" },
  ],

  clues: [
    "The coroner: a single stab beneath the ribs, from a narrow blade with no cutting edge. No struggle, no poison.",
    "The coffee Whitcomb signed for at 10:15 was found full and stone cold. He never poured a cup.",
    "The desk clock lay face-down on thick carpet, its glass unbroken. Its hands had been turned forward by hand.",
    "Whitcomb’s diary, Saturday: “Told G.P. the auditors come Monday. He went white as a sheet.”",
  ],

  photo: { caption: "The Grand Meridian lobby, 1938", scene: "hotel" },

  // Decoys, plus Whitcomb's room-service check, which carries the scrawl.
  evidence: [
    { id: "starlight", kind: "matchbook", label: "The Starlight Room", note: "814 — half past 10 — C." },
    { id: "room-service", kind: "ticket", label: "Grand Meridian · Room Svc.", note: "coffee, Ste 1200 — 10:15 L.W." },
    { id: "seconal", kind: "prescription", label: "Dr. H. Lowell", note: "seconal 1½ gr nightly — C.W." },
  ],

  cipher: {
    hiddenOn: "evidence:room-service",
    plaintext: "THE LEDGERS ARE TEN THOUSAND SHORT. ONLY ONE MAN SIGNS THE BANK SLIPS.",
    shift: 5,
    keepWords: ["LEDGERS", "SLIPS"],
    doodle: "clock",
  },

  solution: { suspectId: "pell", motiveId: "funds", weaponId: "letter-opener" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Gordon Prewitt had skimmed ten thousand dollars from the Meridian on bank slips only he signed. When Whitcomb " +
        "told him the auditors were coming, Prewitt took the back stairs at 10:25 and stabbed him with his own letter " +
        "opener. Then he turned the desk clock forward to 11:40, laid it face-down, and went down to shake three " +
        "hundred hands.",
      saved:
        "Celeste Whitcomb was gone for an hour and wouldn’t say where. With Prewitt charged, nobody asks her again.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Gordon Prewitt, hiding the ten thousand dollars he’d skimmed from the hotel. He stabbed Whitcomb with the " +
        "letter opener at half past ten, then set the desk clock forward to 11:40 and went down to the ball.",
      cost:
        "Celeste Whitcomb wouldn’t say where she’d been without ruining Sutter, so she said nothing. She was convicted " +
        "in March, and Prewitt kept running the hotel.",
    },
  },

  shareLine: "Check the clock twice.",
};
