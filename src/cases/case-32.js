// Case 32: The Fourth Knock. Drafted by Claude; edit freely.

export default {
  id: "fourth-knock",
  title: "The Fourth Knock",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Widow Dies at Séance in Her Own Parlor",
    dateline: "RIVERSIDE HEIGHTS, Nov. 3, 1947",
    body:
      "Henrietta Yarrow, 71, widow of streetcar man Albert Yarrow, died Sunday night at a séance in the parlor of " +
      "Larch Hill, the old Yarrow mansion known for the four round moon windows in its tower.\n" +
      "Five sat at the table when the lights went down at nine. Sitters say the late Mr. Yarrow answered with knocks. " +
      "When the butler put the lights up at twenty past, the widow lay slumped across the table, struck on the head.\n" +
      "The medium, Madame Sabine Urbach, has held sittings at Larch Hill every Sunday since spring. A stage magician " +
      "who came to expose her sat in the circle. Police are holding no one.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  // Circle, clockwise: Henrietta, Prudence, Dexter, Madame Urbach, Zoll, back to Henrietta.
  suspects: [
    {
      id: "urbach",
      name: "Sabine Urbach",
      role: "The medium",
      description: "Holds sittings at Larch Hill every Sunday at ten dollars a head. The widow’s new will remembered her.",
      statement: {
        text: "Albert always comes with three knocks. Tonight there were four, and the last one was wrong. I knew before the lights came up.",
        isLie: false,
      },
    },
    {
      id: "upjohn",
      name: "Cyril Upjohn",
      role: "The medium’s driver",
      description: "Drives Madame’s old Packard and never sits in on a sitting. Says the spirits give him the creeps.",
      statement: {
        text: "Madame pays me to sit in the Packard on Sundays. I was out front in the car from nine till I heard her scream.",
        isLie: true,
        truthOptions: [
          "He was under the parlor floor with a mallet",
          "He was in the kitchen with the cook",
          "He drove into town for cigarettes",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "dexter",
      name: "Dexter Yarrow",
      role: "The nephew",
      description: "Heir under the old will and short of money. Lately the spirits had been telling his aunt he was no good.",
      statement: {
        text: "I had Miss Wyatt’s hand on my right. It slipped out of mine after the third knock and came back cold a minute later.",
        isLie: false,
      },
    },
    {
      id: "wyatt",
      name: "Prudence Wyatt",
      role: "The companion",
      description: "Paid companion for nine years. Dresses the widow, writes her letters, and keeps her checkbook.",
      statement: {
        text: "I sat between Mrs. Yarrow and Mr. Dexter. Nine years I dressed that woman. I’d sooner have died.",
        isLie: false,
      },
    },
    {
      id: "zoll",
      name: "Cecil Zoll",
      role: "The stage magician",
      description: "Billed as the Great Zoltan. Albert Yarrow once sued him off a stage. Came to catch Madame cheating.",
      statement: {
        text: "I kept hold of Madame’s wrist all night. She never moved. Mrs. Yarrow’s hand went limp in mine at the fourth knock.",
        isLie: false,
      },
    },
    {
      id: "vosburgh",
      name: "Edgar Vosburgh",
      role: "The butler",
      description: "Thirty years with the Yarrows. The widow meant to sell Larch Hill in the spring and pension him off.",
      statement: {
        text: "At nine I locked the front door. Madame’s Packard sat empty in the drive. Nobody passed me at the parlor switch.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "checks", text: "To hide the forged checks" },
    { id: "inherit", text: "Over being cut down in the will" },
    { id: "fraud", text: "To keep a fraud from coming out" },
    { id: "grudge", text: "To settle an old grudge" },
    { id: "house", text: "To stop the sale of Larch Hill" },
    { id: "bequest", text: "To collect a bequest early" },
  ],

  weapons: [
    { id: "bell", name: "A brass hand bell", detail: "Séance table" },
    { id: "cane", name: "A silver-head cane", detail: "Nephew’s chair" },
    { id: "trumpet", name: "A tin spirit trumpet", detail: "Medium’s case" },
    { id: "cord", name: "A curtain cord", detail: "Spirit cabinet" },
    { id: "drops", name: "Heart drops", detail: "Widow’s handbag" },
    { id: "mallet", name: "A padded mallet", detail: "Cellar stairs" },
  ],

  clues: [
    "The coroner: one blow to the left temple from something heavy that left a ring-shaped bruise. No poison. Her heart was sound.",
    "Mr. Vickery: the October will left Madame Urbach twenty thousand dollars, and the nephew half what he had before.",
    "Under the parlor floor police found a lantern, a padded mallet, and a cleared spot on the joists. Three fresh dents above it.",
    "Riverside Trust: eleven checks since spring on the widow’s account, signed in a hand that isn’t hers.",
  ],

  photo: { caption: "Larch Hill, from the drive", scene: "mansion" },

  // The widow's letter to her dead husband carries the code as one line in their old private cipher.
  evidence: [
    { id: "bertie-letter", kind: "letter", label: "Henrietta to Albert, Nov. 1", note: "Bertie dear, ask them tomorrow. In our old code, for your eyes:" },
    { id: "vickery-card", kind: "card", label: "Linus Vickery, Attorney", note: "Oct. 20. Will signed and witnessed. — L.V." },
    { id: "bell-prints", kind: "fingerprint", label: "Hand Bell · Séance Table", note: "Two pounds of brass, wiped clean. Not even the widow’s prints." },
  ],

  cipher: {
    hiddenOn: "evidence:bertie-letter",
    plaintext: "MY BANK SAYS I WROTE CHECKS I NEVER SIGNED. TELL ME WHO.",
    shift: 4,
    keepWords: ["CHECKS"],
    doodle: "moon",
  },

  solution: { suspectId: "wyatt", motiveId: "checks", weaponId: "bell" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Prudence Wyatt kept Henrietta Yarrow’s checkbook and had been signing her name since spring. The bank asked " +
        "the widow about the checks, and she meant to ask Albert at the table. After Cyril Upjohn’s third knock from " +
        "under the floor, Prudence let go of the circle, struck the widow once with the brass bell, and wiped it. " +
        "Everyone counted the blow as a fourth knock.",
      saved:
        "Dexter Yarrow, broke and cut down in the will, was the first man the police meant to hold. He goes home " +
        "instead. Madame Urbach answers for the mallet in the cellar and nothing worse.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Prudence Wyatt, hiding the checks she had forged on the widow’s account. After the third knock she let " +
        "go of the circle and struck the widow with the brass hand bell. The room took the blow for a fourth knock.",
      cost:
        "The police never learned whose hand left the circle in the dark. Madame Urbach kept her Sunday sittings for the new owner of " +
        "Larch Hill, and Prudence Wyatt took a place in Boston with a reference from the family.",
    },
  },

  shareLine: "Count the knocks.",
};
