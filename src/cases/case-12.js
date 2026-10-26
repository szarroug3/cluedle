// Case 12: The Toy Department. Drafted by Claude; edit freely.

export default {
  id: "toy-department",
  title: "The Toy Department",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Store Owner Found Dead Among the Toys",
    dateline: "RIVERSIDE, Dec. 23, 1947",
    body:
      "Everett Carrow, 67, who built Carrow’s from a dry-goods counter into the city’s finest department store, was " +
      "found dead in his own toy department late Monday.\n" +
      "The store stayed open until nine for Christmas shoppers. Night watchman Amos Duffy found Carrow at half past " +
      "ten beneath the electric train layout on the fourth floor. Minutes earlier he had seen Santa Claus hurrying down " +
      "the back stairs.\n" +
      "Every December the children of Riverside line up to watch the six engines on the layout. The store opens as " +
      "usual today. Police want to speak to the store Santa.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "cobb",
      name: "Barney Cobb",
      role: "The store Santa",
      description: "Old vaudeville man with a flask in his boot. Carrow had warned him once more and he was out.",
      statement: {
        text: "I hung up the beard at nine and walked over to Ackerley’s in the suit. Kids like it. I stayed till they threw me out.",
        isLie: false,
      },
    },
    {
      id: "ainsley",
      name: "Prescott Ainsley",
      role: "The general manager",
      description: "Carrow’s son-in-law. Does all the store’s buying, from neckties to fur coats.",
      statement: {
        text: "I locked my office at nine sharp and drove home to my wife. I never set foot on the fourth floor all evening.",
        isLie: true,
        truthOptions: [
          "He stayed late and put on the spare Santa suit",
          "He went up to four to ask Carrow for money",
          "He waited in his office for the chain-store man",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "duffy",
      name: "Amos Duffy",
      role: "The night watchman",
      description: "Thirty years on nights. Carrow meant to replace him with a burglar alarm come spring.",
      statement: {
        text: "At 10:15, on the three landing, Santa came down from four in a hurry. Taller than Barney, I’d say, but I only saw his back.",
        isLie: false,
      },
    },
    {
      id: "blaine",
      name: "Lucy Blaine",
      role: "The gift-wrap girl",
      description: "Wraps presents on four for the season. Carrow caught her slipping toys to her kid brothers.",
      statement: {
        text: "I wrapped on four till half past nine. Mr. Carrow was down at his trains, and Santa’s chair was already empty.",
        isLie: false,
      },
    },
    {
      id: "corliss",
      name: "Emil Corliss",
      role: "The window dresser",
      description: "Dresses the Main Street windows. Carrow tore out his Christmas window last week and had it redone.",
      statement: {
        text: "I was in the Main Street window from nine to eleven with half the street watching. Lucy brought me coffee at ten and stayed.",
        isLie: false,
      },
    },
    {
      id: "albee",
      name: "Chester Albee",
      role: "The chain-store man",
      description: "Buys up stores for a Chicago chain. Carrow turned him down flat over lunch, in front of the whole tearoom.",
      statement: {
        text: "I said goodbye to Carrow at six and caught the 9:40 to Chicago. The conductor punched my ticket at Elmwood at ten.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "furs", text: "To cover up the swapped furs" },
    { id: "santa", text: "To keep the Santa job" },
    { id: "alarm", text: "To keep his night rounds" },
    { id: "toys", text: "To bury the toy pilfering" },
    { id: "window", text: "Revenge for a ruined window" },
    { id: "chain", text: "To buy the store cheap" },
  ],

  weapons: [
    { id: "engine", name: "An iron engine", detail: "Toy train layout" },
    { id: "bell", name: "Santa’s hand bell", detail: "Santa’s chair" },
    { id: "mallet", name: "A croquet mallet", detail: "Sporting goods" },
    { id: "garland", name: "A tinsel garland", detail: "Display tree" },
    { id: "shears", name: "Gift-wrap shears", detail: "Wrapping counter" },
    { id: "arm", name: "A mannequin arm", detail: "Main Street window" },
  ],

  clues: [
    "The coroner: one blow to the temple from something heavy with a hard corner. Flecks of black enamel in the wound.",
    "The big black engine is missing from the train layout. It turned up in a toy chest on four, wiped clean.",
    "Carrow’s keeps two Santa suits. The spare, a 44 long, was found balled up behind the boiler with the beard still on it.",
    "On Carrow’s desk, the fur salon’s order book: all sixty coats bought through P. Ainsley, at mink prices, from a Newark man.",
  ],

  photo: { caption: "Carrow’s, the main floor at Christmas", scene: "hotel" },

  // The code hides in the Courier's personals. The bar tab clears the Santa; the garage tag catches the liar.
  evidence: [
    { id: "bar-tab", kind: "receipt", label: "Ackerley’s Tap · Main St.", note: "Santa, end stool: rye ×4, ham on rye. In 9:20, out 10:40 p.m." },
    { id: "garage-tag", kind: "tag", label: "Cutler’s Garage · Claim 77", note: "Buick sedan, Mr. Ainsley. In 8:10 a.m., out 11:05 p.m. 35¢" },
    { id: "chain-letter", kind: "letter", label: "Bayard Stores, Chicago", note: "Our offer holds to New Year’s. Then we build across the street." },
  ],

  cipher: {
    hiddenOn: "clipping",
    plaintext: "E.C. YOUR SIXTY MINKS ARE DYED MUSKRAT.",
    shift: 6,
    keepWords: ["MUSKRAT"],
    doodle: "train",
  },

  solution: { suspectId: "ainsley", motiveId: "furs", weaponId: "engine" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Prescott Ainsley had been buying dyed muskrat at mink prices and keeping the difference, and Carrow was onto " +
        "him. After closing he put on the spare Santa suit, knowing the real Santa was across the street at Ackerley’s. " +
        "He found Carrow at his trains and struck him with the iron engine. Then he ran down the back stairs past the " +
        "watchman and stuffed the suit behind the boiler.",
      saved:
        "Barney Cobb keeps his red suit and stays out of a cell. Carrow’s writes to sixty customers about coats that " +
        "were never mink.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Prescott Ainsley, covering up the muskrat furs he’d sold as mink. Wearing the spare Santa suit, he " +
        "struck Carrow with the iron train engine and ran past the watchman, who took him for Barney Cobb.",
      cost:
        "The case stayed open, and nobody asked about the furs. In June Ainsley’s wife found the order book gone and " +
        "asked him where. That August she fell down the same back stairs.",
    },
  },

  shareLine: "Count the Santas.",
};
