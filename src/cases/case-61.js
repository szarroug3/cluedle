// Case 61: Return to Sender. Drafted by Claude; edit freely.

export default {
  id: "return-to-sender",
  title: "Return to Sender",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Postal Inspector Found Dead Above Sorting Floor",
    dateline: "RIVERSIDE, Dec. 23, 1947",
    body:
      "Post Office Inspector Merle Gatch, 57, was found stabbed to death late Monday in the lookout gallery above the " +
      "sorting floor of the Main Post Office, where the night tour was working through the Christmas rush.\n" +
      "The gallery is a narrow passage over the ceiling, reached by a stair off the back hall, where inspectors watch " +
      "the clerks below through slits. Since the first of December Gatch had sat up there nightly, hunting a thief who " +
      "rifles Christmas cards for cash. Postmaster Edmund Crisp said Gatch had mailed twelve marked test letters " +
      "through the office this month. Three never arrived.\n" +
      "The office moved 400,000 pieces of mail on Monday. Every clerk on the night tour has been questioned.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "lisle",
      name: "Verna Lisle",
      role: "The Christmas temp",
      description: "Hired for the rush, new in town, a widow by her ring. Knows her way round the old building better than a temp should.",
      statement: {
        text: "At half past eleven I punched out for my relief, like every clerk on the tour. I was back at case forty by two minutes past twelve.",
        isLie: false,
      },
    },
    {
      id: "pomeroy",
      name: "Aldo Pomeroy",
      role: "The tour foreman",
      description: "Runs the night tour and hires the Christmas help. Lives well for a foreman: a new Hudson, and a bet on every race at Pimlico.",
      statement: {
        text: "I walked the floor all tour, case to case, and never once left it. Ask any clerk.",
        isLie: true,
        truthOptions: [
          "He was at his basement locker, stowing card money",
          "He was up in the gallery with Gatch",
          "He was in the swing room with the temp",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "tarbox",
      name: "Lemuel Tarbox",
      role: "The night janitor",
      description: "Has mopped these floors for twenty-two years. Gatch caught him with a pint in the boiler room in November and wrote it up.",
      statement: {
        text: "I mopped the basement locker room from half past eleven on. Mr. Pomeroy came down at twenty-five to twelve and fussed at his locker till past midnight.",
        isLie: false,
      },
    },
    {
      id: "crisp",
      name: "Edmund Crisp",
      role: "The postmaster",
      description: "A political appointment, up for renewal in the spring. A thief on his night tour would finish him.",
      statement: {
        text: "From half past eleven till nearly twelve I was on the long-distance line to the inspectors in Chicago. Gatch was to come down at midnight; at ten past, I went up and found him.",
        isLie: false,
      },
    },
    {
      id: "platt",
      name: "Dewey Platt",
      role: "The college boy",
      description: "Home from State for the rush. Gatch caught him reading other people’s postcards on Friday and wrote him up.",
      statement: {
        text: "I threw sacks onto Mr. Oxley’s truck at the dock from eleven till half past twelve. My arms still ache.",
        isLie: false,
      },
    },
    {
      id: "oxley",
      name: "Virgil Oxley",
      role: "The truck driver",
      description: "Drives the night run to the Union Depot. Gatch had been asking why his sacks always weighed heavy.",
      statement: {
        text: "The college boy threw sacks to me on the dock from eleven on and never missed a throw. We rolled for the depot at half past twelve.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "husband", text: "Revenge for a dead husband" },
    { id: "cards", text: "To hide the card thefts" },
    { id: "pint", text: "To bury a drinking report" },
    { id: "appointment", text: "To save his appointment" },
    { id: "record", text: "To keep his record clean" },
    { id: "sacks", text: "To hide what rode in his sacks" },
  ],

  weapons: [
    { id: "twine-knife", name: "A twine knife", detail: "Old Post Office issue" },
    { id: "hammer", name: "A canceling hammer", detail: "Hand-cancel table" },
    { id: "pliers", name: "Sealing pliers", detail: "Registry cage" },
    { id: "strap", name: "A mail-sack strap", detail: "Pouch rack" },
    { id: "stair", name: "A push down the stair", detail: "Gallery stair" },
    { id: "eradicator", name: "Ink eradicator", detail: "Window clerk’s drawer" },
  ],

  clues: [
    "The coroner: one thrust under the ribs from a short, hooked blade. Gatch died where he sat, at the gallery slits.",
    "Under the slits lay an old hook-bladed twine knife, Post Office issue. Burned into its handle: T.K. 1931.",
    "Gatch’s notebook, last lines: “11:35. Foreman gone below again. 11:40. Someone on the gallery stair—”",
    "Federal court, 1938: carrier Thomas Kemmerer got five years for rifling mail, on Inspector Gatch’s evidence. He died in Atlanta in ’41. His widow left Riverside.",
  ],

  photo: { caption: "Main Post Office, the postmaster’s office", scene: "office" },

  // The toll slip clears the postmaster; the time card opens the temp's window. Gatch kept his code on his last test letter.
  evidence: [
    { id: "toll-slip", kind: "slip", label: "Long-distance toll slip", note: "Postmaster’s line to Chicago, Monday night. 11:31 to 11:57 p.m." },
    { id: "time-card", kind: "card", label: "Time card · V. Lisle, case 40", note: "Monday night tour. Out 11:30 for relief. In 12:02." },
    { id: "test-letter", kind: "envelope", label: "Test letter No. 12", note: "Never mailed. Marked bills inside. Found in Gatch’s coat; on the back, his pencil." },
  ],

  cipher: {
    hiddenOn: "evidence:test-letter",
    plaintext: "THE ATLANTA CASE HAS COME BACK FOR ME. SOMEBODY ON THIS FLOOR HAS AN OLD SCORE.",
    shift: 12,
    keepWords: ["ATLANTA"],
    doodle: "pen",
  },

  solution: { suspectId: "lisle", motiveId: "husband", weaponId: "twine-knife" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Verna Lisle was Verna Kemmerer, whose husband went to Atlanta in 1938 on Merle Gatch’s word and died there. " +
        "She took a Christmas job to find him. At half past eleven she punched out for her relief, climbed the gallery " +
        "stair off the back hall with her husband’s old twine knife, and struck Gatch at the slits. Gatch had keyed his " +
        "notes to his twelve test letters.",
      saved:
        "Aldo Pomeroy’s lie hid the card money in his basement locker, and that is where the police found it, with the " +
        "three missing test letters. Riverside’s Christmas cards go through untouched.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was the Christmas temp, Verna Lisle, widow of the carrier Gatch sent to Atlanta. She punched out at half " +
        "past eleven, climbed the gallery stair, and killed him with her husband’s old twine knife.",
      cost:
        "The police found the card money in Aldo Pomeroy’s locker and charged him with both. Verna Lisle finished the " +
        "rush and left town with her last pay envelope.",
    },
  },

  shareLine: "Somebody is always watching the floor.",
};
