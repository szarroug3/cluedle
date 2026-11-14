// Case 65: The Dummy Hand. Drafted by Claude; edit freely.

export default {
  id: "dummy-hand",
  title: "The Dummy Hand",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Bridge Champion Found Dead at Winter Pairs",
    dateline: "RIVERSIDE, Dec. 27, 1947",
    body:
      "Montague Quaile, 61, three times national champion at contract bridge, was found dead Friday night in the " +
      "cloakroom off the Crystal Ballroom of the Hotel Belvedere, during the last session of the Winter Pairs.\n" +
      "Quaile had played the Belvedere’s Christmas tournament every year since 1931, always from Room 14, which the " +
      "hotel kept for him all through Christmas week. Players say he laid down his cards as dummy at twenty to ten, " +
      "went out for his cigarettes, and never came back.\n" +
      "The tournament has been halted. The silver cup waits in the lobby case with no name on it.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "brandreth",
      name: "Lowell Brandreth",
      role: "The partner",
      description: "Quaile’s partner for nine years, and a bachelor. He is at the Quailes’ apartment more evenings than Quaile is.",
      statement: {
        text: "Montague put down the dummy at twenty to ten and went for his cigarettes. I played the hand out, then went to fetch him, but he wasn’t at the bar.",
        isLie: false,
      },
    },
    {
      id: "marian",
      name: "Marian Quaile",
      role: "The wife",
      description: "Quaile’s second wife, thirty years younger. She watches every game he plays, and his money comes to her.",
      statement: {
        text: "I sat behind Lowell’s chair all session. He claimed the hand, went off to find Montague, and came back alone at ten to ten.",
        isLie: false,
      },
    },
    {
      id: "ornstein",
      name: "Jerome Ornstein",
      role: "The rival",
      description: "The best player in the state who isn’t Quaile. He has lost the Winter Pairs to him four years running.",
      statement: {
        text: "My wife and I defended that hand and lost it. After Lowell claimed, we stayed at the table going over every card till the round was called.",
        isLie: false,
      },
    },
    {
      id: "sallow",
      name: "Beatrix Sallow",
      role: "The tournament director",
      description: "Runs the Winter Pairs and holds the entry fees. Quaile told the League he wanted to see her books.",
      statement: {
        text: "I never left the stage. I called the next round at ten, and sent my boy for Mr. Quaile when his chair stayed empty.",
        isLie: false,
      },
    },
    {
      id: "caraway",
      name: "Tom Caraway",
      role: "The barman",
      description: "Runs the Ballroom bar. Quaile complained of watered gin, and the manager fires any barman who leaves his bar untended.",
      statement: {
        text: "I never left my bar all night. Nobody laid a hand on my bar knife but me.",
        isLie: true,
        truthOptions: [
          "He was down in the kitchen waiting on ice from half past nine",
          "He was in the cloakroom with Mr. Quaile",
          "He was dealing a side game in the back room",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "gaffney",
      name: "Rollo Gaffney",
      role: "The bridge columnist",
      description: "Writes “Rollo on Bridge” for the Courier. Quaile is suing him for calling his bidding a fraud on the public.",
      statement: {
        text: "I went for a rye at half past nine and found nobody behind the bar, so I poured my own and left a dollar. I drank it at the press table.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "widow", text: "To marry his widow" },
    { id: "inherit", text: "To inherit his money" },
    { id: "cup", text: "To win the cup at last" },
    { id: "fees", text: "To hide the missing entry fees" },
    { id: "job", text: "To keep his job" },
    { id: "libel", text: "To stop a libel suit" },
  ],

  weapons: [
    { id: "bar-knife", name: "A bar knife", detail: "Ballroom bar" },
    { id: "hatpin", name: "A hatpin", detail: "Mrs. Quaile’s hat" },
    { id: "score-spike", name: "A score spike", detail: "Director’s desk" },
    { id: "needle", name: "A knitting needle", detail: "Kibitzers’ row" },
    { id: "opener", name: "A letter opener", detail: "Writing room" },
    { id: "fork", name: "A carving fork", detail: "Supper buffet" },
  ],

  clues: [
    "The coroner: one thrust under the left shoulder blade with a short, thin blade, between twenty to ten and ten. No struggle.",
    "The Ballroom bar’s knife, the one for cutting lemon peel, turned up in the sand urn by the cloakroom door, wiped clean.",
    "The night clerk: on Tuesday Mr. Brandreth took Room 22 as “Mr. and Mrs. L. Brandon.” The lady wore Mrs. Quaile’s silver fox.",
    "Quaile’s lawyer: on Wednesday he drew Quaile a new will leaving his wife one dollar. It was to be signed on Saturday.",
  ],

  photo: { caption: "The Crystal Ballroom, Hotel Belvedere", scene: "hotel" },

  // Quaile's room-key tag carries his code on its back. The board slip and the ice book show who was away, and when.
  evidence: [
    { id: "room-key", kind: "tag", label: "Hotel Belvedere · Room Key", note: "Kindly leave this key at the desk when going out." },
    { id: "board-slip", kind: "slip", label: "Winter Pairs · Board 11, Table One", note: "4 Spades by Brandreth, made. Claimed 9:44 p.m. Next round 10:00." },
    { id: "ice-book", kind: "ledger", label: "Belvedere Kitchen · Ice Book", note: "9:32 p.m. Ballroom bar, two buckets, chipped while he waited. T.C." },
  ],

  cipher: {
    hiddenOn: "evidence:room-key",
    plaintext: "I HAVE READ THE REGISTER. THE NEW WILL GETS SIGNED SATURDAY.",
    shift: 14,
    keepWords: ["REGISTER", "SATURDAY"],
    doodle: "key",
  },

  solution: { suspectId: "brandreth", motiveId: "widow", weaponId: "bar-knife" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Lowell Brandreth and Marian Quaile had been meeting in Room 22 under another name, and Montague Quaile " +
        "read the register. He had his lawyer draw a will leaving her one dollar, to be signed Saturday. " +
        "Brandreth meant to marry a rich widow, not a poor divorcée. When Quaile went out as dummy, Brandreth claimed " +
        "the hand, took the knife from the empty bar, and followed him into the cloakroom.",
      saved:
        "Tom Caraway keeps his job and gets a lecture about ice. Marian Quaile keeps her money, and loses her taste " +
        "for bridge players.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Lowell Brandreth, who meant to marry Quaile’s wife and his money before the new will was signed. He " +
        "claimed the hand while Quaile was dummy, took the knife from the empty bar, and stabbed his partner in the " +
        "cloakroom.",
      cost:
        "The police settled on the barman whose knife it was. Tom Caraway went to trial in March, and Brandreth " +
        "married the widow in June.",
    },
  },

  shareLine: "Watch who leaves the table.",
};
