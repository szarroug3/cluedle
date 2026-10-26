// Case 19: The Off Season. Drafted by Claude; edit freely.

export default {
  id: "off-season",
  title: "The Off Season",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Old Pilot Found Dead in Boarding House",
    dateline: "CAPE ALDER, Mass., Nov. 21, 1947",
    body:
      "Josiah Halstead, 72, a retired harbor pilot, was found dead Thursday morning in his room at the Ingleside, " +
      "the Shore Road boarding house where he had lodged for fourteen years.\n" +
      "His door was bolted from the inside. The house is known by the iron anchor at its gate, raised from eighteen " +
      "fathoms off the point. Out of season, most of its rooms stand empty.\n" +
      "Three lodgers remain, one away on business, with a maid and the widow Hattie Garrity, who keeps the house. A " +
      "nephew, Basil Halstead, says he came down from Boston Thursday morning.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "hattie",
      name: "Hattie Garrity",
      role: "The landlady",
      description: "Has kept the Ingleside since her husband drowned. Halstead lent her the money to keep it.",
      statement: {
        text: "I smelled gas at six and had Jonah force the door. The bolt was shot. Room 6 is Mr. Ibbott’s. He’s been on the road since Monday.",
        isLie: false,
      },
    },
    {
      id: "gilroy",
      name: "Vernon Gilroy",
      role: "The lodger in Room 4",
      description: "A quiet lodger since June. Says he kept books in Ohio, but he ties a knot like a sailor.",
      statement: {
        text: "I keep to my own room. Couldn’t tell you who has Number 6. I heard the news on the wireless at ten and turned in.",
        isLie: false,
      },
    },
    {
      id: "cora",
      name: "Cora Imrie",
      role: "The lodger in Room 2",
      description: "Teaches piano in the front parlor. Walked out with Halstead for six years until he called it off.",
      statement: {
        text: "Mr. Halstead shot his bolt at eleven, same as every night. I sat up reading till three. Nobody walked that hall.",
        isLie: false,
      },
    },
    {
      id: "jonah",
      name: "Jonah Grieve",
      role: "The ferryman",
      description: "Rows the ferry and runs a boat at night with no lights. Halstead watched him from his window.",
      statement: {
        text: "I rowed young Mr. Halstead over from the ferry landing at nine Wednesday, and back at half past ten. He never said a word.",
        isLie: false,
      },
    },
    {
      id: "basil",
      name: "Basil Halstead",
      role: "The nephew",
      description: "Josiah’s only kin. Owes a Boston bookmaker more than his uncle’s savings would cover.",
      statement: {
        text: "I came down on the Thursday bus after they wired me. I hadn’t seen Uncle Josiah since Easter.",
        isLie: true,
        truthOptions: [
          "He saw his uncle Wednesday and left by 10:30",
          "He spent Wednesday night in the empty Room 6",
          "He waited at the ferry landing all night",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "doris",
      name: "Doris Inchbald",
      role: "The maid",
      description: "Maid of all work. Halstead swore she’d been into his sea chest and meant to tell Mrs. Garrity.",
      statement: {
        text: "Nobody’s slept in Room 6 since Monday. But Thursday morning its washbasin was wet and the window was open wide.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "old-name", text: "To keep an old name buried" },
    { id: "loan", text: "To cancel the loan on the house" },
    { id: "jilted", text: "Revenge for a broken promise" },
    { id: "night-trade", text: "To keep a night trade quiet" },
    { id: "savings", text: "To inherit his savings" },
    { id: "theft", text: "To hide a theft from his chest" },
  ],

  weapons: [
    { id: "gas", name: "Gas from his fire", detail: "His own hearth" },
    { id: "drops", name: "His heart drops", detail: "Bedside table" },
    { id: "bolster", name: "A feather bolster", detail: "His bed" },
    { id: "rat-poison", name: "Rat poison", detail: "Scullery shelf" },
    { id: "fire-iron", name: "A fire iron", detail: "Parlor hearth" },
    { id: "sash-weight", name: "A sash weight", detail: "Cellar" },
  ],

  clues: [
    "The doctor: cheeks cherry pink and not a mark on him. He breathed gas in his sleep, some time after two.",
    "Halstead’s room, No. 5, was bolted and its window latched. The only other way in is the locked door from Room 6.",
    "Mr. Ibbott’s rent comes by post each Monday, postmarked Cape Alder, though he is said to travel the whole state.",
    "In the lining of Vernon Gilroy’s valise: a rent book for Room 6 in the name of A. Ibbott, and tinted spectacles.",
  ],

  photo: { caption: "The Ingleside, Cape Alder, off season", scene: "harbor" },

  // Halstead's unsent letter carries his code as one more line.
  evidence: [
    { id: "letter", kind: "letter", label: "Halstead’s desk, unsent", note: "Fred— Come Friday. A man here went by another name in ’38." },
    { id: "through-key", kind: "key", label: "Ingleside · Room 6", note: "Door to Room 5. Freshly oiled. Found in the porch sand pail." },
    { id: "boat-ad", kind: "classified", label: "Cape Alder Gazette · Ads", note: "BOAT FOR HIRE, any hour, no questions. J.G., at the town float." },
  ],

  cipher: {
    hiddenOn: "evidence:letter",
    plaintext: "HE RAN RUM IN THIRTY EIGHT AND SHOT A COAST GUARD MAN. NOW HE KEEPS BOOKS.",
    shift: 18,
    keepWords: ["RUM"],
    doodle: "anchor",
  },

  solution: { suspectId: "gilroy", motiveId: "old-name", weaponId: "gas" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "In ’38 Vernon Gilroy ran rum off the point under another name and shot a Coast Guardsman who boarded him. " +
        "When Josiah Halstead knew his face, Gilroy took Room 6 as a traveler called Ibbott, for the door " +
        "through to Room 5. After two that night he let himself in, opened the gas on Halstead’s fire, and locked " +
        "the door behind him.",
      saved:
        "Basil Halstead’s lie about Wednesday night was enough to charge him. Now it costs him a lecture from the " +
        "police and a bus ticket home.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Vernon Gilroy, a rumrunner who shot a Coast Guardsman in ’38, keeping his old name buried. Renting " +
        "Room 6 as a traveler named Ibbott, he came through the connecting door after two and opened the gas on Josiah Halstead’s fire.",
      cost:
        "Basil Halstead was tried for his uncle’s murder on the strength of his lie about Wednesday. Gilroy paid a " +
        "month ahead on both his rooms.",
    },
  },

  shareLine: "Count the lodgers again.",
};
