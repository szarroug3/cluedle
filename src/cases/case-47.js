// Case 47: The Harbor Light Invert. Drafted by Claude; edit freely.

export default {
  id: "harbor-light-invert",
  title: "The Harbor Light Invert",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Collector Dies Showing Famous Upside-Down Stamp",
    dateline: "RIVERSIDE, Dec. 9, 1947",
    body:
      "Horace Whitlock, 71, owner of the only known Harbor Light invert, was taken ill at the Hotel Belvoir Monday night " +
      "before the Riverside Philatelic Society and died before the doctor came.\n" +
      "The 13-cent stamp of 1898, printed with its lighthouse upside down, is valued at $40,000. Whitlock bought it at " +
      "a post office window as a young man and liked to call it the best thirteen cents ever spent. He kept it in a " +
      "locked steel box and never let it out of reach.\n" +
      "Police found the stamp safe under glass on the meeting table. The Society’s notices ran in the Courier as usual.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "desmond",
      name: "Desmond Whitlock",
      role: "The nephew",
      description: "Horace’s only heir, and his driver since the war. Takes the Chicago train more often than a man with no job should.",
      statement: {
        text: "There was no girl at the cloakroom, so I hung Uncle Horace’s coat myself at a quarter to eight. Then I sat at the back till he fell.",
        isLie: false,
      },
    },
    {
      id: "bathurst",
      name: "Cornelius Bathurst",
      role: "The club president",
      description: "Has run the Philatelic Society for twenty years. Wanted the Invert for the club’s own frame, and said so loudly.",
      statement: {
        text: "I opened the meeting at eight sharp. Horace laid the Invert under glass at twenty to nine, and at ten to nine he was on the floor.",
        isLie: false,
      },
    },
    {
      id: "fitch",
      name: "Trixie Fitch",
      role: "The hat-check girl",
      description: "Works the Belvoir cloakroom. Whitlock complained last month that someone had been through his pockets.",
      statement: {
        text: "I hung every coat myself and never left my counter. Nobody went near Mr. Whitlock’s.",
        isLie: true,
        truthOptions: [
          "She was dancing in the Palm Room",
          "She was going through Mr. Whitlock’s pockets",
          "She let Mr. Vogel behind the counter",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "vogel",
      name: "Ignatius Vogel",
      role: "The rival collector",
      description: "Owns the second-best Harbor Light collection in America. Offered Whitlock $45,000 for the Invert in October.",
      statement: {
        text: "I sat beside Horace at the front table all evening. At the coffee I offered him forty-five thousand again, and he laughed at me.",
        isLie: false,
      },
    },
    {
      id: "birch",
      name: "Rowena Birch",
      role: "The club secretary",
      description: "Keeps the minutes and the club’s exchange books. Whitlock found stamps missing from them in the fall.",
      statement: {
        text: "I took the minutes from eight. At half past Mr. Whitlock went out to the cloakroom for his hinges and came back with the packet.",
        isLie: false,
      },
    },
    {
      id: "ortega",
      name: "Luis Ortega",
      role: "The banquet waiter",
      description: "Whitlock had him fired from the Belvoir dining room in ’44 over a spilled soup. He was taken back only this fall.",
      statement: {
        text: "I poured Mr. Whitlock’s coffee at a quarter past eight. He said it was bitter, but he said that of everything.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "inherit", text: "To inherit the Invert" },
    { id: "club", text: "To keep the stamp for the club" },
    { id: "pockets", text: "To hide a habit of picking pockets" },
    { id: "own", text: "To own the Invert himself" },
    { id: "exchange", text: "To hide thefts from the exchange books" },
    { id: "job", text: "Revenge for a lost job" },
  ],

  weapons: [
    { id: "hinges", name: "Poisoned stamp hinges", detail: "Whitlock’s overcoat" },
    { id: "coffee", name: "Arsenic in the coffee", detail: "Coffee urn" },
    { id: "knife", name: "A paper knife", detail: "Meeting table" },
    { id: "tablets", name: "Heart tablets", detail: "Whitlock’s waistcoat" },
    { id: "box", name: "A steel stamp box", detail: "Whitlock’s lap" },
    { id: "cord", name: "A curtain cord", detail: "Card Room window" },
  ],

  clues: [
    "The doctor: strychnine, taken no more than a quarter hour before he took ill. The coffee pot and his cup were clean.",
    "The hinges in the packet by his album were laced with strychnine. Whitlock licked every hinge, a habit the club had begged him to break.",
    "Whitlock’s lawyer: a deed of gift for the Invert lay unsigned in his briefcase. Signed, it would have left his estate little but a mortgaged house.",
    "In Desmond Whitlock’s waistcoat, a half-used packet of hinges, clean of poison. Horace’s initials are inked on the glassine.",
  ],

  photo: { caption: "The Card Room, Hotel Belvoir", scene: "hotel" },

  // The code is the Society's own notice in the Courier personals. The manager's book catches the hat-check girl.
  evidence: [
    { id: "manager-book", kind: "report", label: "Belvoir Night Manager’s Book", note: "7:40–8:10 p.m. Hat-check girl off her counter without leave. Seen dancing, Palm Room." },
    { id: "chicago-letter", kind: "letter", label: "Postmarked Chicago, Dec. 1", note: "“Thirty thousand by New Year’s, Mr. Whitlock. We don’t write twice.”" },
    { id: "exchange-book", kind: "ledger", label: "Philatelic Society Exchange Book", note: "Circuit No. 9: twelve stamps missing since September. Checked, H.W." },
  ],

  cipher: {
    hiddenOn: "clipping",
    plaintext: "MEMBERS. MONDAY THE INVERT IS SIGNED OVER TO WASHINGTON. COME AND SEE IT GO.",
    shift: 13,
    keepWords: ["WASHINGTON"],
    doodle: "key",
  },

  solution: { suspectId: "desmond", motiveId: "inherit", weaponId: "hinges" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Horace Whitlock meant to sign the Harbor Light Invert over to the Smithsonian on Monday night, and his nephew " +
        "Desmond owed a Chicago bookmaker thirty thousand dollars. With no girl at the cloakroom counter, Desmond hung " +
        "his uncle’s coat himself and swapped the packet of hinges in its pocket for one laced with strychnine. At half " +
        "past eight Horace licked them, one by one, to mount the stamp.",
      saved:
        "Trixie Fitch lied to hide half an hour in the Palm Room, not a poisoning. She keeps her job, and the Invert " +
        "goes to Washington as Horace wanted.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Desmond Whitlock, the nephew, who meant to inherit the Invert before his uncle gave it away. He " +
        "swapped the hinges in Horace’s coat for a packet laced with strychnine.",
      cost:
        "Trixie Fitch lost her place at the Belvoir over her lie. Desmond inherited the Invert and sold it in Chicago " +
        "within the month, and Washington still has an empty frame waiting.",
    },
  },

  shareLine: "The best thirteen cents ever spent.",
};
