// Case 62: The Silent Bell. Drafted by Claude; edit freely.

export default {
  id: "silent-bell",
  title: "The Silent Bell",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Sexton Found Dead in Bell Tower; Christmas Bell Silent",
    dateline: "RIVERSIDE, Dec. 25, 1947",
    body:
      "Obadiah Wick, 74, sexton of Trinity Church for fifty years, was found strangled at the top of the bell tower " +
      "Wednesday night, minutes before the midnight service of Christmas Eve.\n" +
      "Since 1897 Wick has called the town to midnight service at a quarter to twelve with twenty-four strokes of the " +
      "great bell, one for every hour of Christmas Eve. This year the bell never rang. The children’s pageant, with a " +
      "live donkey beside the manger, had ended at eleven.\n" +
      "The Rev. Ellis Granger kept the doors open and the congregation in the pews. “Obadiah never missed a Christmas,” " +
      "he said.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "applegate",
      name: "Clarence Applegate",
      role: "The senior warden",
      description: "Came to Riverside from Ohio in ’31 and now runs the vestry. Plays Joseph in the pageant every year, in a brown homespun robe.",
      statement: {
        text: "When the pageant ended I led the donkey out to the lych-gate for her owner, as I do every year. Then I went in out of the cold.",
        isLie: false,
      },
    },
    {
      id: "lattimer",
      name: "Honora Lattimer",
      role: "The bride-to-be",
      description: "A rich widow, engaged to Mr. Applegate. Paying for electric chimes, which Wick swore would ring over his dead body.",
      statement: {
        text: "I knelt in the front pew from the end of the pageant until the bell should have rung. I never left it.",
        isLie: true,
        truthOptions: [
          "She was in the vestry, telephoning Toledo about her groom",
          "She was in the tower, quarreling with Wick over the chimes",
          "She was out in the lane with Mr. Applegate",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "granger",
      name: "Rev. Ellis Granger",
      role: "The minister",
      description: "Trinity’s rector these six years. Wick had told the bishop where the roof fund went.",
      statement: {
        text: "From a quarter past eleven I stood at the front door and shook every hand that came in. Miss Dorn came through from the vestry at twenty to twelve and stood beside me.",
        isLie: false,
      },
    },
    {
      id: "finch",
      name: "Bartholomew Finch",
      role: "The organist",
      description: "Plays for Trinity on Sundays and the Bijou picture house the rest of the week. Wick caught him pawning the silver alms basin.",
      statement: {
        text: "I began the prelude at a quarter past eleven and played till a quarter to twelve, then stopped for the bell. It never came.",
        isLie: false,
      },
    },
    {
      id: "dorn",
      name: "Beulah Dorn",
      role: "The pageant director",
      description: "Teaches third grade and has run the pageant twelve years. Wick told the vestry a donkey in church was a sin.",
      statement: {
        text: "I unpinned angels in the parish hall with the mothers till twenty to twelve. Coming through the vestry, I heard Mrs. Lattimer on the telephone to Toledo.",
        isLie: false,
      },
    },
    {
      id: "voorhees",
      name: "Jedediah Voorhees",
      role: "The farmer",
      description: "Lends his donkey to the pageant every year. Wants the church’s glebe field beside his farm, and Wick held the lease.",
      statement: {
        text: "I came for my donkey at half past eleven. She was tied at the lych-gate alone with a brown robe over her back, and Wick was letting himself into the tower.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "wife", text: "To hide a living wife" },
    { id: "chimes", text: "To bring in the electric chimes" },
    { id: "roof", text: "To hide the roof-fund money" },
    { id: "basin", text: "To hide the pawned alms basin" },
    { id: "pageant", text: "To save her pageant" },
    { id: "field", text: "To get the glebe field" },
  ],

  weapons: [
    { id: "robe-cord", name: "A pageant robe cord", detail: "Wardrobe hamper" },
    { id: "bell-rope", name: "The bell rope", detail: "Top of the tower" },
    { id: "stole", name: "A choir stole", detail: "Vestry hooks" },
    { id: "tinsel", name: "A tinsel garland", detail: "Christmas tree" },
    { id: "candlestick", name: "An altar candlestick", detail: "Chancel" },
    { id: "crook", name: "A shepherd’s crook", detail: "Pageant props" },
  ],

  clues: [
    "The coroner: strangled from behind with a twisted wool cord, at the top of the ninety-step tower stair. His lantern still burned beside the bell rope.",
    "Mr. Voorhees brought back the brown robe he found over his donkey. Its rope cord is gone.",
    "In Wick’s coat, a letter postmarked Toledo: “My husband walked out on me in 1929. I hear he means to marry in your church. —Ruth A.”",
    "Straw from the pageant manger is scattered up the tower stair, all ninety steps of it.",
  ],

  photo: { caption: "Trinity Church pageant, 1946", scene: "theater" },

  // Wick penciled his code on the back of last year's pageant photograph. The toll slip and the tab clear two.
  evidence: [
    { id: "toll-slip", kind: "slip", label: "Toll slip · Trinity vestry telephone", note: "Christmas Eve. Toledo, Ohio, ADams 4417. 11:31 to 11:49 p.m." },
    { id: "banns", kind: "card", label: "Banns of Marriage · Trinity Church", note: "Clarence Applegate, bachelor, and Honora Lattimer, widow, both of this parish. Third time of asking, Dec. 21." },
    { id: "tab", kind: "receipt", label: "The Lamplighter, Church Lane", note: "J. Voorhees. Hot rum, 11:32 p.m. Another, 11:50." },
  ],

  cipher: {
    hiddenOn: "photo",
    plaintext: "THE GROOM IN THE BANNS HAS A WIFE ALIVE IN TOLEDO. I WILL NOT HOLD MY PEACE.",
    shift: 24,
    keepWords: ["TOLEDO"],
    doodle: "bell",
  },

  solution: { suspectId: "applegate", motiveId: "wife", weaponId: "robe-cord" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Clarence Applegate left a wife in Toledo in 1929, and she wrote to the sexton when the banns were read. After " +
        "the pageant Applegate tied the donkey at the lych-gate, threw his robe over her back, and climbed the tower " +
        "with its cord. He waited by the bell. When Wick came up to ring his twenty-four strokes, the number he kept " +
        "his code by, Applegate strangled him from behind.",
      saved:
        "Honora Lattimer, who lied to hide her call to Toledo, learns the truth before the wedding, not after. On " +
        "Sunday the great bell rings for Obadiah Wick.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was the senior warden, Clarence Applegate, hiding a living wife in Toledo. He waited at the top of the " +
        "tower and strangled the sexton with the cord of his Joseph robe.",
      cost:
        "Honora Lattimer married him in January. By spring her money had gone the way of the first Mrs. Applegate’s.",
    },
  },

  shareLine: "Listen for what never rang.",
};
