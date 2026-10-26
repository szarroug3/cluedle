// Case 6: The Eleventh Hour. Drafted by Claude; edit freely.

export default {
  id: "eleventh-hour",
  title: "The Eleventh Hour",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Hotel Owner Slain During Christmas Ball",
    dateline: "RIVERSIDE, Dec. 22, 1946",
    body:
      "Leland Whitcomb, 59, owner of the Grand Meridian Hotel, was found stabbed to death in his twelfth-floor suite " +
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
      description: "Whitcomb’s lawyer. Drew up a new will last week, still unsigned, that cuts the widow off. Room on eight.",
      statement: {
        text: "I spent the evening in Room 814 with Leland’s papers. I never went up to twelve, and never set foot in the ball.",
        isLie: false,
      },
    },
    {
      id: "prewitt",
      name: "Gordon Prewitt",
      role: "The manager",
      description: "Manager for nineteen years, on a salary that hasn’t moved since ’38. Lunches with the buyer’s men.",
      statement: {
        text: "From eleven on I was in the Starlight Room shaking hands. Three hundred guests saw me. Ask any of them.",
        isLie: false,
      },
    },
    {
      id: "duvall",
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
    { id: "snub", text: "Revenge for a public snub" },
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
    "Medical examiner: a single stab beneath the ribs, from a narrow blade with no cutting edge. No struggle, no poison.",
    "The coffee Whitcomb signed for at 10:15 was found full and stone cold. He never poured a cup.",
    "The desk clock lay face-down on thick carpet, its glass unbroken. Its hands had been turned forward by hand.",
    "Whitcomb’s diary, Saturday: “G.P. is on Dorrance’s payroll. $10,000 to him the day I sell. I won’t.”",
  ],

  photo: { caption: "The Grand Meridian lobby, 1938", scene: "hotel" },

  // The house detective's report carries the scrawl as one garbled line; the ad hints at an inside fee.
  evidence: [
    { id: "house-report", kind: "report", label: "House Detective · Ste 1200", note: "12:10 a.m. Back-stair door on 12 wedged open. Coffee untouched." },
    { id: "key-814", kind: "key", label: "Grand Meridian · Room 814", note: "left at the desk 11:35 by Mrs. W." },
    { id: "finders-fee", kind: "classified", label: "Business Opportunities", note: "Finder’s fee on any downtown hotel sold to us. Dorrance Realty" },
  ],

  cipher: {
    hiddenOn: "evidence:house-report",
    plaintext: "THE MAIN CAR NEVER WENT ABOVE EIGHT ALL NIGHT. WHOEVER WENT TO TWELVE WALKED.",
    shift: 5,
    keepWords: ["EIGHT", "WALKED"],
    doodle: "clock",
  },

  solution: { suspectId: "prewitt", motiveId: "sale", weaponId: "letter-opener" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Gordon Prewitt was on Max Dorrance’s payroll, with $10,000 coming the day the Meridian sold. When Whitcomb " +
        "turned Dorrance down for good, Prewitt saw that a widow would sell. He took the back stairs at 10:25 and stabbed " +
        "Whitcomb with his own letter opener. Then he turned the desk clock forward to 11:40, laid it face-down, and went " +
        "down to shake three hundred hands.",
      saved:
        "Celeste Whitcomb was gone for an hour and wouldn’t say where. With Prewitt charged, nobody asks her again.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Gordon Prewitt, who stood to collect $10,000 from Max Dorrance once the hotel was sold. He stabbed " +
        "Whitcomb with the letter opener at half past ten, then set the desk clock forward to 11:40 and went down to the ball.",
      cost:
        "Nobody was charged. Celeste sold the Meridian to Dorrance that spring, and the wreckers had it down by fall. " +
        "Prewitt’s $10,000 bought him a bungalow in Sarasota.",
    },
  },

  shareLine: "Check the clock twice.",
};
