// Case 67: Railroad Time. Drafted by Claude; edit freely.

export default {
  id: "railroad-time",
  title: "Railroad Time",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Clockmaker Found Dead Beneath His Own Clock",
    dateline: "RIVERSIDE, Dec. 29, 1947",
    body:
      "Ludwig Ammerbach, 74, who has kept Riverside’s clocks running for half a century, was found dead Sunday " +
      "evening in his Market Street shop, under the tall clock that stood beside his bench. Its hands had stopped " +
      "at twenty to seven.\n" +
      "Ammerbach was also watch inspector for the Riverside & Western. No man may run a train on that line without " +
      "a watch of twenty-one jewels, checked by Ammerbach on the first of every month.\n" +
      "The railroad’s inquiry into the Hollow Creek wreck of November 9, which killed four, has laid the blame on " +
      "engineer Wade Haddock, who pulled out of a siding four minutes early and died at his throttle.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "treat",
      name: "Elam Treat",
      role: "The conductor",
      description: "Twenty years a conductor on the R&W. He swore to the inquiry he gave the Hollow Creek engineer no signal to pull out.",
      statement: {
        text: "I signed in at Union Station at six and punched tickets on the 6:40 from the minute she pulled out. Ask any passenger aboard.",
        isLie: false,
      },
    },
    {
      id: "tessmer",
      name: "Rolf Tessmer",
      role: "The apprentice",
      description: "Eight years at Ammerbach’s bench and promised the shop, until Christmas Eve, when the old man said he might sell.",
      statement: {
        text: "He was winding the tall clock when I left at a quarter to five. I went straight to the Rialto and sat through the picture twice.",
        isLie: false,
      },
    },
    {
      id: "varnum",
      name: "Liesl Varnum",
      role: "The daughter",
      description: "Ammerbach’s only child, married to a man with debts. The shop and the old man’s savings come to her.",
      statement: {
        text: "I came for Sunday supper at half past seven and let myself in with my key. The tall clock was down, and Papa under it.",
        isLie: false,
      },
    },
    {
      id: "haddock",
      name: "Lettie Haddock",
      role: "The engineer’s widow",
      description: "The railroad says her husband’s watch was wrong at Hollow Creek, and Ammerbach was the man who passed it.",
      statement: {
        text: "I told him Friday he’d passed a bad watch and killed my Wade. Sunday I never left the house; I have three boys to feed.",
        isLie: false,
      },
    },
    {
      id: "strother",
      name: "Phineas Strother",
      role: "The railroad superintendent",
      description: "Runs the R&W. The wreck inquiry closes on New Year’s Day with the blame on the engineer, unless someone speaks up.",
      statement: {
        text: "I called on him Saturday about the inquiry, and he wouldn’t tell me what he meant to say to it. Sunday I was at the Elks from four till the news came.",
        isLie: false,
      },
    },
    {
      id: "krebs",
      name: "Philomena Krebs",
      role: "The landlady",
      description: "Owns the Market Street block and has a buyer for all of it. Ammerbach’s lease is the last one standing.",
      statement: {
        text: "I haven’t been near Market Street since Christmas Eve, when he told me he’d die in that shop before he moved.",
        isLie: true,
        truthOptions: [
          "She pushed a notice to quit under his door on Sunday",
          "She argued with him in the shop at five",
          "She let herself in with her own key at six",
        ],
        truthIndex: 0,
      },
    },
  ],

  motives: [
    { id: "wreck", text: "To hide his part in the wreck" },
    { id: "shop", text: "To keep the shop he was promised" },
    { id: "inherit", text: "To inherit the shop and savings" },
    { id: "widow", text: "Revenge for her husband’s death" },
    { id: "blame", text: "To keep the blame on a dead man" },
    { id: "lease", text: "To clear the block for a sale" },
  ],

  weapons: [
    { id: "weight", name: "A lead clock weight", detail: "Tall clock" },
    { id: "mantel", name: "A brass mantel clock", detail: "Shop window" },
    { id: "hammer", name: "A jeweler’s hammer", detail: "Bench rack" },
    { id: "crank", name: "A winding crank", detail: "Bench drawer" },
    { id: "doorstop", name: "A cast-iron doorstop", detail: "Front door" },
    { id: "benzine", name: "Benzine cleaning fluid", detail: "Bench shelf" },
  ],

  clues: [
    "The coroner: one blow to the left temple from something heavy, smooth and round, before the clock came down on him.",
    "A lead weight from the tall clock lay under the bench, with blood and gray hair on its base.",
    "The tobacconist next door hears the tall clock through the wall every hour. On Sunday it struck five. It never struck six.",
    "Railroad records: conductor Treat carries a Hamilton 992, No. 2C-417. Engineer Haddock carried an Elgin.",
  ],

  photo: { caption: "Ammerbach’s bench, Market Street", scene: "office" },

  // Ammerbach kept his own copy of each inspection card, with a line in his code on the back. The notice on the mat catches the liar.
  evidence: [
    { id: "inspection-card", kind: "card", label: "R&W Watch Inspection Card", note: "Hamilton 992 · No. 2C-417 · Nov. 1: FAILED · Dec. 1: passed after cleaning." },
    { id: "notice", kind: "letter", label: "Krebs Realty · Notice to Quit", note: "Sunday, Dec. 28. Vacate the premises by Feb. 1. P. Krebs. Found on the shop mat." },
    { id: "rialto", kind: "stub", label: "Rialto Theatre · Market St.", note: "Sun. Dec. 28 · 4:55 p.m. show · Balcony" },
  ],

  cipher: {
    hiddenOn: "evidence:inspection-card",
    plaintext: "FAILED NOVEMBER FIRST. GAINING THIRTY SECONDS A DAY. TOLD HIM NOT TO RUN ON IT.",
    shift: 21,
    keepWords: ["GAINING", "THIRTY"],
    doodle: "clock",
  },

  solution: { suspectId: "treat", motiveId: "wreck", weaponId: "weight" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "On November 1 Ludwig Ammerbach failed Elam Treat’s watch: it gained thirty seconds a day. Treat ran on it " +
        "anyway, and by November 9 it was four minutes fast when he signaled the Hollow Creek train out of the siding. " +
        "When the inquiry blamed the dead engineer, Ammerbach told Treat he would take his card to it. Treat came at " +
        "five on Sunday, struck him with a weight from the tall clock, pulled the clock down on him, set its hands to " +
        "twenty to seven, and went to work the 6:40.",
      saved:
        "The inquiry reopens, and Wade Haddock’s name is cleared. His widow gets the railroad’s pension for her three " +
        "boys, and Philomena Krebs gets a stern word for her notice.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Elam Treat, hiding the fast watch that wrecked the train at Hollow Creek. He struck Ammerbach with a " +
        "weight from the tall clock at five, set its hands to twenty to seven, and went to punch tickets on the 6:40.",
      cost:
        "The inquiry closed on New Year’s Day with the blame on Wade Haddock. His widow never saw a cent of the " +
        "railroad’s pension.",
    },
  },

  shareLine: "Never trust a stopped clock.",
};
