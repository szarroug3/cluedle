// Case 56: Exam Week. Drafted by Claude; edit freely.

export default {
  id: "exam-week",
  title: "Exam Week",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Chemistry Professor Found Dead on Eve of Final",
    dateline: "RIVERSIDE, Dec. 18, 1947",
    body:
      "Prof. Linus Garroway, 60, chairman of chemistry at Linden College, was found dead in his laboratory on the " +
      "third floor of Crandall Hall late Wednesday, the night before his final examination in organic chemistry.\n" +
      "Every December since 1925 Garroway has set the same kind of final: twenty-two questions, in his own hand, kept " +
      "in his safe and seen by no student before the morning. Linden men call it simply the Twenty-Two.\n" +
      "The stockroom keeper found him at half past ten, slumped at his bench among broken glass. This morning’s " +
      "examination has been put off. The football team, bound for a bowl game on New Year’s Day, is waiting on its grades.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "malinowski",
      name: "Chet Malinowski",
      role: "The halfback",
      description: "Linden’s best runner in twenty years. Needs a C on the final to play in the bowl game on New Year’s Day.",
      statement: {
        text: "I was in the library cramming from supper till it closed at ten. Ask anybody at the long table.",
        isLie: true,
        truthOptions: [
          "He was at the stockroom window buying a copy of the final",
          "He was in the lab begging Garroway for a C",
          "He was at the coach’s house for supper",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "kincaid",
      name: "Rosalie Kincaid",
      role: "The graduate assistant",
      description: "Four years into her doctorate. Garroway won’t sign it now she has married, and said so to the whole department.",
      statement: {
        text: "I ran the review session in Room 9 from eight till ten. Forty students can tell you I never left the blackboard.",
        isLie: false,
      },
    },
    {
      id: "pettibone",
      name: "Royal Kilbride",
      role: "The dean",
      description: "Keeps the college’s athletes eligible. Garroway meant to tell the trustees how grades got changed in his office.",
      statement: {
        text: "I was at the trustees’ dinner at the Faculty Club until eleven. I had no idea Linus was still in the building.",
        isLie: false,
      },
    },
    {
      id: "torgeson",
      name: "Swede Torgeson",
      role: "The football coach",
      description: "Took Linden to its first bowl game. Without his halfback he goes with no running game, and maybe no job after.",
      statement: {
        text: "I went up at nine to plead for my boy. Garroway threw me out at ten past, alive and shouting.",
        isLie: false,
      },
    },
    {
      id: "wolny",
      name: "Ignatz Wolny",
      role: "The stockroom keeper",
      description: "Has kept the chemistry stockroom since 1928, and runs the ditto machine for every exam the department sets.",
      statement: {
        text: "I swept the third floor from nine on. At half past ten his light was still on, so I knocked, and there he was.",
        isLie: false,
      },
    },
    {
      id: "leach",
      name: "Prof. Thaddeus Leach",
      role: "The rival professor",
      description: "Passed over for chairman in 1939 and again this fall. Garroway calls him “my assistant” in front of students.",
      statement: {
        text: "Linus and I had words in the corridor at half past nine about the chair. He went back in alive and slammed his door.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "exams", text: "To hide selling the finals" },
    { id: "bowl", text: "To play in the bowl game" },
    { id: "degree", text: "To get her doctorate signed" },
    { id: "grades", text: "To hide the changed grades" },
    { id: "job", text: "To keep his coaching job" },
    { id: "chair", text: "To become chairman at last" },
  ],

  weapons: [
    { id: "ring-stand", name: "An iron ring stand", detail: "Stockroom rack" },
    { id: "acid", name: "A carboy of acid", detail: "Acid shelf" },
    { id: "arsenic", name: "Arsenic powder", detail: "Poison cabinet" },
    { id: "flask", name: "A heavy glass flask", detail: "Garroway’s bench" },
    { id: "hose", name: "A burner hose", detail: "Lab bench" },
    { id: "loving-cup", name: "A silver loving cup", detail: "Trophy case" },
  ],

  clues: [
    "The coroner: one blow above the left ear with something heavy and narrow, between half past nine and ten. The glass broke after he fell. No poison.",
    "An iron ring stand lay rinsed in the acid-waste sink. The stockroom rack is one short, and the stand’s rod fits the wound.",
    "Garroway’s safe was opened without force. Only he, the dean and the stockroom keeper knew the combination.",
    "On Garroway’s blotter, in his hand: “Wed. 9:45. To explain the purple copies, or the dean hears of it in the morning.”",
  ],

  photo: { caption: "Garroway’s laboratory, Crandall Hall", scene: "office" },

  // Garroway penciled his code on the back of a photo of his own lab. The library slip catches the halfback;
  // the envelope from his coat shows what he was really doing.
  evidence: [
    { id: "library-slip", kind: "slip", label: "Carnegie Library · Reading Room", note: "Wed., Dec. 17. C. Malinowski, in 7:05, out 8:50 p.m." },
    { id: "crib", kind: "envelope", label: "Plain envelope, Malinowski’s coat", note: "Inside, a purple ditto of an organic final. Penciled: “$25. Burn it after.”" },
    { id: "committee-letter", kind: "letter", label: "Graduate Committee, Linden College", note: "Prof. Garroway declines to sign for Mrs. R. Kincaid while she is a married woman." },
  ],

  cipher: {
    hiddenOn: "photo",
    plaintext: "THE FINAL IN MY SAFE IS AN OLD ONE, LEFT AS BAIT. SEE WHO SELLS IT.",
    shift: 22,
    keepWords: ["BAIT"],
    doodle: "clock",
  },

  solution: { suspectId: "wolny", motiveId: "exams", weaponId: "ring-stand" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "For years Ignatz Wolny ran extra copies of every final on the stockroom ditto machine and sold them for " +
        "twenty-five dollars. Garroway caught on, left last year’s paper in his safe as bait, and waited. When a purple " +
        "copy of it turned up, he sent for Wolny at a quarter to ten. Wolny came with an iron ring stand from his own " +
        "rack, broke glass around the body, and rinsed the stand in the acid sink.",
      saved:
        "Chet Malinowski, who lied about the library to hide a twenty-five-dollar crib, sits the real final in " +
        "January. He gets a D and watches the bowl game from the bench.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Ignatz Wolny, the stockroom keeper, hiding the finals he sold off the ditto machine. Garroway baited a " +
        "trap with last year’s paper and sent for him, and Wolny struck him down with an iron ring stand.",
      cost:
        "Chet Malinowski was expelled for the crib and questioned for a week on the strength of his lie. Wolny went " +
        "on selling finals to Linden men for another eight years.",
    },
  },

  shareLine: "Some answers are bait.",
};
