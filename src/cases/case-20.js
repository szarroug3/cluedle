// Case 20: The Cellar Door. Drafted by Claude; edit freely.

export default {
  id: "cellar-door",
  title: "The Cellar Door",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Ex-Bootlegger Shot in Cellar Door Club",
    dateline: "RIVERSIDE, May 9, 1947",
    body:
      "Fergus Lomax, 67, owner of the Cellar Door on Dock Street, was found shot dead in his office early Thursday " +
      "by the porter, who comes in at six to sweep up.\n" +
      "The Cellar Door was a speakeasy until Repeal, and Lomax never hid it. Ten brass moons still hang over the " +
      "old cellar bar, one for each dry year he poured, beside the Colt he carried then, framed under glass.\n" +
      "Lomax had lately been in talks to sell the club to a hotel firm. His nephew and heir, Wesley Lomax, called " +
      "the offer “my uncle’s business.” Police are questioning the staff.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "keogh",
      name: "Paddy Keogh",
      role: "The doorman",
      description: "On the door since the cellar days. Drove a truck the Feds stopped in ’30, did four years, and named nobody.",
      statement: {
        text: "I locked the front door at two, same as every night for seventeen years.",
        isLie: false,
      },
    },
    {
      id: "kearney",
      name: "Peg Kearney",
      role: "The bartender",
      description: "Tends bar and keeps the books. Lomax found the till short twice this spring and said so in front of the band.",
      statement: {
        text: "At two I wiped down the office like every night, phone and all. Fergus was counting the take. I was in a cab by twenty past.",
        isLie: false,
      },
    },
    {
      id: "jessup",
      name: "Velma Jessup",
      role: "The singer",
      description: "Sings the late set. Lomax kept her in an apartment for years, and this spring he stopped paying the rent.",
      statement: {
        text: "Stan drove me home after my last set, about two. Fergus was in his office with the door shut, alive and grumbling.",
        isLie: false,
      },
    },
    {
      id: "jankowski",
      name: "Stan Jankowski",
      role: "The desk sergeant",
      description: "Walked the Dock Street beat in ’28 and drank free. Lomax still kept a book of every cop he ever paid.",
      statement: {
        text: "Dropped Miss Jessup on Bell Avenue and signed in at the precinct desk at 2:20. I was on that desk till eight.",
        isLie: false,
      },
    },
    {
      id: "wesley",
      name: "Wesley Lomax",
      role: "The nephew",
      description: "Lomax’s only kin and his heir. Owes money all over town and wants the club sold.",
      statement: {
        text: "Kilgore and I sat in the Ambassador bar from midnight till four going over his offer. I never left.",
        isLie: true,
        truthOptions: [
          "He took a cab to Dock Street and found it dark",
          "He was at a card game on Pine Street",
          "He went to the Ambassador’s barbershop",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "kilgore",
      name: "Roscoe Kilgore",
      role: "The hotel man",
      description: "Runs a hotel firm and wants the Cellar Door for a lobby bar. Lomax turned him down twice.",
      statement: {
        text: "Wes went out to telephone about one and didn’t come back till near three. We closed the bar at four.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "debt", text: "To collect a debt from Prohibition" },
    { id: "inherit", text: "To inherit the Cellar Door" },
    { id: "sale", text: "To push through the sale" },
    { id: "till", text: "To hide skimming from the till" },
    { id: "affair", text: "To end a love affair gone sour" },
    { id: "payoffs", text: "To bury the old police payoffs" },
  ],

  weapons: [
    { id: "colt", name: "A Colt .45", detail: "Frame behind bar" },
    { id: "police", name: "A police .38", detail: "Sergeant’s holster" },
    { id: "derringer", name: "A pearl derringer", detail: "Singer’s handbag" },
    { id: "shotgun", name: "A sawed-off shotgun", detail: "Under the bar" },
    { id: "pocket", name: "A .32 pocket pistol", detail: "Doorman’s coat" },
    { id: "automatic", name: "A .25 automatic", detail: "Office desk drawer" },
  ],

  clues: [
    "The coroner: one shot to the chest from across the desk, near half past two. Lomax was sitting down. The safe wasn’t touched.",
    "The bullet is a .45. The Colt behind the bar was back in its frame at dawn, wiped clean, with one round fired.",
    "Federal court, 1930: a Cellar Door driver took four years for a truck of Canadian whisky. Lomax was never charged.",
    "In Lomax’s safe, an old IOU in his hand: “P.K. — $1,000 for every year you sit. Payable at Repeal.” Never paid.",
  ],

  photo: { caption: "The Cellar Door, after hours", scene: "nightclub" },

  // The code runs in the Courier's own personals column, under the story.
  evidence: [
    { id: "ambassador", kind: "matchbook", label: "The Ambassador Hotel", note: "W.L. — 40 grand if the old man signs. Bar, midnight. R.K." },
    { id: "cab-ticket", kind: "ticket", label: "Harbor Cab Co. · Trip 118", note: "Dock St. to Pine St. 2:18 a.m. Lady from the Cellar Door. 40¢" },
    { id: "phone-print", kind: "fingerprint", label: "Office phone · Cellar Door", note: "Fresh right thumb on the polish. Matches P. Keogh, doorman." },
  ],

  cipher: {
    hiddenOn: "clipping",
    plaintext: "FERGUS. REPEAL WAS THIRTEEN YEARS AGO. I WANT WHAT I AM OWED.",
    shift: 10,
    keepWords: ["REPEAL", "OWED"],
    doodle: "moon",
  },

  solution: { suspectId: "keogh", motiveId: "debt", weaponId: "colt" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Paddy Keogh drove Fergus Lomax’s whisky in 1930 and did four years in Atlanta without saying his name. Lomax " +
        "wrote him an IOU payable at Repeal and never paid a dime of it. After locking up, Keogh went back in to ask " +
        "one last time. When Lomax laughed, Keogh took the old Colt down from behind the bar, shot him at his desk, " +
        "and hung it back in its frame.",
      saved:
        "Wesley Lomax had the debts and the inheritance, and he lied about where he was at half past two. The police " +
        "had him picked out by noon. Now he only has to explain the cab.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Paddy Keogh, collecting a debt from Prohibition. Lomax owed him for four years in a federal pen and " +
        "never paid. Keogh shot him with the Colt .45 that hung framed behind the bar, then put it back.",
      cost:
        "It was put down to a holdup by persons unknown. The hotel firm bought the club from Wesley and kept Keogh " +
        "on the door.",
    },
  },

  shareLine: "Old debts come due.",
};
