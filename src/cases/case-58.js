// Case 58: High Run. Drafted by Claude; edit freely.

export default {
  id: "high-run",
  title: "High Run",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Billiard Champion Slain During Title Match",
    dateline: "RIVERSIDE, Dec. 20, 1947",
    body:
      "Ray Calhoun, 51, eight times three-cushion champion of the city, was found dead Friday night in the back hall " +
      "of the Corinthian Billiard Parlor, halfway through the final of this year’s championship.\n" +
      "Calhoun led Nicky Vukovich, 22, of the South Side, 31 to 18 when the referee called the break at ten. His high " +
      "run of twenty-four, made on the same table in 1938, has never been matched in the state. When the break ended, " +
      "he did not come back to the table.\n" +
      "Some two hundred men had paid a dollar to watch. Police took the name of every one.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "quist",
      name: "Thurman Quist",
      role: "The parlor owner",
      description: "Has run the Corinthian since 1926 and keeps its bar himself. Calls Calhoun the best friend the parlor ever had.",
      statement: {
        text: "At the break I went down the cellar for a fresh keg. I was back behind the bar before the ten minutes were up.",
        isLie: false,
      },
    },
    {
      id: "vukovich",
      name: "Nicky Vukovich",
      role: "The challenger",
      description: "Twenty-two, from the steel mills. If Calhoun can’t finish the match, the title goes to him by forfeit.",
      statement: {
        text: "I sat in my chair the whole break with a towel over my head. I was losing, and I knew it.",
        isLie: false,
      },
    },
    {
      id: "pratt",
      name: "Linwood Pratt",
      role: "The referee",
      description: "Has refereed every city final since 1930. Calhoun had asked the league to bring in an outsider next year.",
      statement: {
        text: "I called the break at ten and never left the table. The kid sat in his chair all ten minutes. At twelve past I went looking for Ray.",
        isLie: false,
      },
    },
    {
      id: "marrone",
      name: "Raffaele Marrone",
      role: "The bookmaker",
      description: "Made book on every city final until the state sent him up. Out on parole since spring, and Calhoun knew it.",
      statement: {
        text: "I never left my seat in the front row all night. A man on parole doesn’t go wandering.",
        isLie: true,
        truthOptions: [
          "He was on the back-hall telephone, placing a bet",
          "He was in the washroom with Calhoun",
          "He was down the cellar with the owner",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "mavis",
      name: "Mavis Calhoun",
      role: "The wife",
      description: "Sold cigars at the Corinthian when Ray married her. He made her quit, and he watches every man who speaks to her.",
      statement: {
        text: "At five past ten I went back to the ladies’. Mr. Marrone was at the hall telephone talking odds, and Ray’s washroom door was shut.",
        isLie: false,
      },
    },
    {
      id: "tillotson",
      name: "Horace Tillotson",
      role: "The cue maker",
      description: "Made Calhoun’s cues for twenty years, until Ray took up a factory cue this fall and told the papers why.",
      statement: {
        text: "I was at the rail all through the break, putting a new tip on the kid’s cue. Ray hadn’t spoken to me since October.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "parlor", text: "To keep the parlor open" },
    { id: "forfeit", text: "To win the title by forfeit" },
    { id: "chair", text: "To keep the referee’s chair" },
    { id: "parole", text: "To stay out of prison" },
    { id: "jealous", text: "To be free of a jealous husband" },
    { id: "cues", text: "Revenge for a ruined name" },
  ],

  weapons: [
    { id: "ice-pick", name: "An ice pick", detail: "Behind the bar" },
    { id: "awl", name: "A tip awl", detail: "Cue maker’s kit" },
    { id: "cue-butt", name: "A cue butt", detail: "Wall rack" },
    { id: "sock", name: "A cue ball in a sock", detail: "Scorer’s bench" },
    { id: "bottle", name: "A beer bottle", detail: "Bar" },
    { id: "razor", name: "A straight razor", detail: "Washroom shelf" },
  ],

  clues: [
    "The coroner: one thrust under the left shoulder blade with a thin steel spike, from behind. He died in a minute, without a sound.",
    "The bar’s ice pick turned up in the coal bin at the foot of the cellar stairs, wiped clean. The cellar stairs come up beside the washroom door.",
    "The Hall of Records: Ray Calhoun bought the Corinthian’s building in 1941. The parlor rents it from him month to month.",
    "In the parlor office safe: Thursday’s Courier, folded to the personals. The same ad that runs today is circled, and worked out in pencil in the margin.",
  ],

  photo: { caption: "The Corinthian, championship night", scene: "nightclub" },

  // The code is a personals ad from Calhoun's lawyer, keyed to Calhoun's famous run. It ran all week.
  // The toll ticket and the wife's statement catch the bookmaker; his parole card says why he lied.
  evidence: [
    { id: "toll-ticket", kind: "ticket", label: "Bell Telephone · Toll Ticket", note: "Corinthian pay station to Chicago, 10:02 to 10:07 p.m. Paid in coin." },
    { id: "score-card", kind: "card", label: "Referee’s Score Card", note: "Calhoun 31, Vukovich 18. Break at 10:00, play to resume 10:10. Below: “R.C. absent.”" },
    { id: "parole-card", kind: "card", label: "State Parole Board", note: "R. Marrone. No wagers taken or placed. Report Mondays, 9 a.m." },
  ],

  cipher: {
    hiddenOn: "clipping",
    plaintext: "R.C. MARKET CHAIN PAYS FORTY THOUSAND FOR THE BUILDING. TELL NOBODY AT THE PARLOR. J.L.",
    shift: 24,
    keepWords: ["BUILDING"],
    doodle: "moon",
  },

  solution: { suspectId: "quist", motiveId: "parlor", weaponId: "ice-pick" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Ray Calhoun owned the Corinthian’s building and had sold it to a market chain. His lawyer told him so in the " +
        "personals, keyed to Calhoun’s famous run, and Thurman Quist worked it out. At the break Quist took the ice pick " +
        "from behind his bar and went down the cellar as if for a keg. He came up beside the washroom door, stabbed " +
        "Calhoun from behind, and dropped the pick in the coal bin on his way back down.",
      saved:
        "Raffaele Marrone, who lied to hide a bet he phoned to Chicago, goes back to prison for the bet and not for " +
        "murder. Nicky Vukovich turns down the forfeit and plays for the title in the spring.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Thurman Quist, the parlor owner, keeping the Corinthian open. He had read the coded ad about the sale. " +
        "At the break he took the bar’s ice pick down the cellar and came up beside the washroom door.",
      cost:
        "Raffaele Marrone was charged on the strength of his lie and his phone call. The sale died with Calhoun, and Quist " +
        "hung the champion’s cue over his bar.",
    },
  },

  shareLine: "Count who left at the break.",
};
