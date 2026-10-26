// Case 22: Something Borrowed. Drafted by Claude; edit freely.

export default {
  id: "something-borrowed",
  title: "Something Borrowed",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Bride’s Father Found Dead at Wedding",
    dateline: "RIVERSIDE HEIGHTS, Oct. 5, 1947",
    body:
      "Thornton Kerrigan, 63, president of Riverside Savings and of the Briar Hill Country Club, was found dead at " +
      "the foot of the club’s terrace steps Saturday night as guests waited for him to toast his daughter.\n" +
      "Miss Annabel Kerrigan wed Preston Kingsley of Philadelphia that afternoon at St. Jude’s before two hundred " +
      "guests. Her grandmother signed the register with the gold pen she has carried to seven family weddings.\n" +
      "Police first called it a fall in the dark. By midnight they were asking for the guest list. The couple’s " +
      "honeymoon in Bermuda has been put off.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "kingsley",
      name: "Preston Kingsley",
      role: "The groom",
      description: "Says he’s twenty-eight, of the Philadelphia Kingsleys. Silver Star at Anzio. Courted Annabel since June.",
      statement: {
        text: "When Joslin got up to talk, I went for a smoke like half the men. I was back for the cake.",
        isLie: false,
      },
    },
    {
      id: "annabel",
      name: "Annabel Kingsley",
      role: "The bride",
      description: "Kerrigan’s only daughter, married this afternoon. With her father gone, most of his money comes to her.",
      statement: {
        text: "Daddy got a wire at the church and went quiet. When the toasts started he kissed my cheek and went out for air.",
        isLie: false,
      },
    },
    {
      id: "lucille",
      name: "Lucille Kerrigan",
      role: "The stepmother",
      description: "Kerrigan’s second wife, younger than his daughter’s bridesmaids. The club ladies say she married for the bank.",
      statement: {
        text: "I sat at the head table from the first toast to the last. Thornton went out at nine. I thought he was learning his speech.",
        isLie: true,
        truthOptions: [
          "She left during Joslin’s toast to telephone a lawyer",
          "She went out to the terrace after Thornton",
          "She was dancing with Nolan",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "joslin",
      name: "Leonard Joslin",
      role: "The bank partner",
      description: "Kerrigan’s partner at Riverside Savings, Yale ’22. Signs off on every big loan the bank makes.",
      statement: {
        text: "I got up at nine and talked near twenty minutes. I could see the bride never left her chair, and her stepmother’s chair sat empty.",
        isLie: false,
      },
    },
    {
      id: "nolan",
      name: "Nolan Kerrigan",
      role: "The son",
      description: "Cut off in June for his drinking. His father had papers drawn to commit him to a drying-out sanatorium.",
      statement: {
        text: "I was at the ballroom bar from the first toast on, getting quietly tight. Ask the barman. Ask anybody who walked past.",
        isLie: false,
      },
    },
    {
      id: "lund",
      name: "Ambrose Lund",
      role: "The club steward",
      description: "Steward at Briar Hill for twenty years. Kerrigan had the board looking into the wine cellar accounts.",
      statement: {
        text: "I stood at the ballroom’s terrace doors all through the toasts. Mr. Kerrigan went out at nine. Nobody followed him through them.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "name", text: "To keep his false name hidden" },
    { id: "inherit", text: "To inherit the Kerrigan money" },
    { id: "sanatorium", text: "To keep from being sent away" },
    { id: "fraud", text: "To cover a fraud at the bank" },
    { id: "cellar", text: "To hide the wine cellar thefts" },
    { id: "husband", text: "To be rid of an old husband" },
  ],

  weapons: [
    { id: "mashie", name: "A mashie niblick", detail: "Grill door rack" },
    { id: "mallet", name: "A croquet mallet", detail: "Lawn shed" },
    { id: "candlestick", name: "A brass candlestick", detail: "Head table" },
    { id: "cake-knife", name: "A silver cake knife", detail: "Wedding cake" },
    { id: "tablets", name: "Heart tablets", detail: "Victim’s pocket" },
    { id: "push", name: "A shove down steps", detail: "Terrace stairs" },
  ],

  clues: [
    "The coroner: not a fall. One blow to the back of the head from something narrow and heavy, before he went down the steps.",
    "At dawn the groundsman fished a mashie niblick out of the lily pond. It came from the rack by the grill’s terrace door.",
    "The Social Register: the Kingsleys of Chestnut Hill have one son, Preston, born in 1913.",
    "Army records: Lt. Preston Kingsley was killed at Anzio. His papers went missing with his driver, a Pfc. Charles Lenz.",
  ],

  photo: { caption: "Briar Hill, the terrace", scene: "mansion" },

  // The father's calling card, with his toast notes and one line in his old private code.
  evidence: [
    { id: "kerrigan-card", kind: "card", label: "Thornton J. Kerrigan", note: "Toast: thank the club, then Lucille, then Annabel. Be brief." },
    { id: "judd-wire", kind: "telegram", label: "Western Union · Philadelphia", note: "NO RECORD OF YOUR MAN AT PRINCETON STOP LETTER FOLLOWS STOP JUDD" },
    { id: "grill-chit", kind: "receipt", label: "Briar Hill Men’s Grill", note: "9:16 p.m. Rye, double. Paid by chit. Signed “P. Kingsley.”" },
  ],

  cipher: {
    hiddenOn: "evidence:kerrigan-card",
    plaintext: "TERRACE AT NINE TEN. WE SETTLE IT BEFORE MY TOAST.",
    shift: 7,
    keepWords: ["TERRACE", "NINE"],
    doodle: "pen",
  },

  solution: { suspectId: "kingsley", motiveId: "name", weaponId: "mashie" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "The groom was Charles Lenz, who drove for Lt. Preston Kingsley at Anzio and walked off the beach with his " +
        "papers. Thornton Kerrigan had his doubts, and a wire from Philadelphia that morning made them worse. He asked " +
        "the groom out to the terrace at ten past nine. Lenz went out through the grill, took a mashie from the rack, " +
        "and struck him from behind. Then he signed for a rye.",
      saved:
        "Annabel learns her husband’s real name before Bermuda, and the marriage is annulled. Her brother Nolan, " +
        "whose father meant to send him away to dry out, stops being the man the police want.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was the groom, really Charles Lenz, keeping his borrowed name. Kerrigan had found him out. Lenz struck " +
        "him with a mashie niblick from the rack by the grill and left him at the foot of the terrace steps.",
      cost:
        "The police wrote it up as a fall. Annabel kept her married name and her father’s money, and inside two " +
        "years her husband had spent most of it.",
    },
  },

  shareLine: "Ask to see the papers.",
};
