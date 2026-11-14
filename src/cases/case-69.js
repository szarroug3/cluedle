// Case 69: The Lost Hour. Drafted by Claude; edit freely.

export default {
  id: "lost-hour",
  title: "The Lost Hour",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Bandleader Shot Aboard New Year’s Train",
    dateline: "RIVERSIDE, Dec. 31, 1947",
    body:
      "Jimmy Castellane, 41, whose orchestra was to play the New Year’s Eve ball at the Hotel Astor in New York " +
      "tonight, was found shot dead aboard the Midnight Special early this morning, just east of the state line.\n" +
      "The band has ridden the Midnight Special to its New Year’s Eve job every year since 1939. Where the line " +
      "crosses into Eastern time, the clocks go forward one hour, and the band always marks it with a practice New " +
      "Year: paper hats, a countdown, then the lights out for horns and a drumroll in the dark.\n" +
      "This year the horns covered a shot. The Astor says the ball will go on tonight, band or no band.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "ballard",
      name: "Vonnie Ballard",
      role: "The girl singer",
      description: "Sings with the band and was married to its leader till 1945. Her alimony stopped in October, when his lawyers found a loophole.",
      statement: {
        text: "When the lights came up I sang Auld Lang Syne, every verse. Jimmy and I hadn’t said a word to each other since Monday.",
        isLie: false,
      },
    },
    {
      id: "pomerantz",
      name: "Irwin Pomerantz",
      role: "The band manager",
      description: "Keeps the books, the payroll and a .25 automatic in his cash box. Castellane was moving the band to a Hollywood agent.",
      statement: {
        text: "My .25 stayed locked in the cash box all night, and the box never left my berth.",
        isLie: true,
        truthOptions: [
          "He had the cash box open on a club car table, paying bonuses",
          "He lent the pistol to the drummer at Riverside",
          "He left the box in Mr. Castellane’s drawing room",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "ordway",
      name: "Skeets Ordway",
      role: "The drummer",
      description: "Castellane fired him at Christmas for coming in late on a downbeat. The Astor is his last job with the band.",
      statement: {
        text: "I played the drumroll in the dark and hit the cymbal when the lights came up. I never left my traps all night.",
        isLie: false,
      },
    },
    {
      id: "kerwin",
      name: "Arnold Kerwin",
      role: "The arranger",
      description: "Wrote the band’s big hit, “Manhattan After Midnight.” The record label says Castellane wrote it.",
      statement: {
        text: "Jimmy went to bed at half past twelve, so I counted the boys down myself. The lights went out on the last count, and the porter put them back two minutes later.",
        isLie: false,
      },
    },
    {
      id: "thrale",
      name: "Imogen Thrale",
      role: "The patroness",
      description: "Lent Castellane twenty thousand dollars to start the band. He was to pay it back by New Year’s Eve.",
      statement: {
        text: "I was in Bedroom C with cotton in my ears. That band makes the same racket every year, early New Year or not.",
        isLie: false,
      },
    },
    {
      id: "fusco",
      name: "Tad Fusco",
      role: "The band boy",
      description: "Hauls the trunks and brings the leader his hot milk. Castellane docked him a month’s pay for a dented tuba case.",
      statement: {
        text: "I took Mr. Castellane his hot milk at half past two by the new clocks. His door was shut but not locked, and he was dead.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "policy", text: "To collect his life insurance" },
    { id: "management", text: "To keep the band from leaving him" },
    { id: "fired", text: "Revenge for being fired" },
    { id: "song", text: "Credit for a hit song" },
    { id: "loan", text: "Revenge for an unpaid loan" },
    { id: "pay", text: "Revenge for docked pay" },
  ],

  weapons: [
    { id: "pistol", name: "A .25 automatic", detail: "Manager’s cash box" },
    { id: "bottle", name: "A champagne bottle", detail: "Club car bar" },
    { id: "cymbal-stand", name: "A cymbal stand", detail: "Drummer’s traps" },
    { id: "razor", name: "A straight razor", detail: "Men’s lounge" },
    { id: "powders", name: "Sleeping powders", detail: "Bedroom C" },
    { id: "lantern", name: "A brakeman’s lantern", detail: "Rear vestibule" },
  ],

  clues: [
    "The coroner: one shot from a small pistol, fired close. He died at once, within a few minutes of the clocks going forward.",
    "The manager’s .25 automatic turned up in the club car’s ice tub, under the champagne, one round fired.",
    "The porter: when he put the club car lights back on, a woman in a paper hat was just coming in from the rear vestibule.",
    "Lakeshore Life: Castellane’s $50,000 policy still names his former wife. On Monday he asked for the forms to change it.",
  ],

  photo: { caption: "The Castellane band boarding the Midnight Special", scene: "train" },

  // Castellane penciled his code on the back of a band photo meant for his Hollywood agent. The bonus envelope catches the liar.
  evidence: [
    { id: "bonus", kind: "envelope", label: "Castellane Orchestra · Year-End Bonus", note: "$25 cash. Paid at the club car table, 12:45 a.m. I. Pomerantz" },
    { id: "agent-wire", kind: "telegram", label: "Western Union · Hollywood", note: "CONTRACT READY MARCH 1 STOP BRING THE BAND NOT THE MANAGER STOP" },
    { id: "loan", kind: "ledger", label: "Castellane Orchestra · Loans Payable", note: "Mrs. I. Thrale, $20,000. Due Dec. 31, 1947. Unpaid." },
  ],

  cipher: {
    hiddenOn: "photo",
    plaintext: "THE INSURANCE STILL NAMES MY EX. CHANGE IT FIRST THING IN NEW YORK.",
    shift: 1,
    keepWords: ["INSURANCE"],
    doodle: "clock",
  },

  solution: { suspectId: "ballard", motiveId: "policy", weaponId: "pistol" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Jimmy Castellane stopped Vonnie Ballard’s alimony in October, and on Monday he asked Lakeshore Life for the " +
        "forms to take her name off his $50,000 policy. She took the manager’s .25 from the open cash box while he " +
        "paid out the bonuses. When the lights went out for the practice New Year, she slipped through the rear " +
        "vestibule to Jimmy’s drawing room, shot him under the horns, dropped the pistol in the ice tub, and was back " +
        "in time to sing Auld Lang Syne.",
      saved:
        "Irwin Pomerantz admits he left his cash box open in the club car. The band plays the Astor tonight without " +
        "its leader, and Lakeshore Life keeps its $50,000.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Vonnie Ballard, the girl singer, collecting on the policy before he could change it. She took the " +
        "manager’s pistol from his open cash box, slipped out when the lights went down, and shot Jimmy under the horns.",
      cost:
        "The railroad police took the manager in for his own pistol. Vonnie sang at the Astor that night, and Lakeshore " +
        "Life paid her in February.",
    },
  },

  shareLine: "Watch the door when the lights go out.",
};
