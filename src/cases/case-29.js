// Case 29: The Comet Hunter. Drafted by Claude; edit freely.

export default {
  id: "comet-hunter",
  title: "The Comet Hunter",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Astronomer Found Dead Under His Telescope",
    dateline: "TOLLAND HILL, Oct. 12, 1947",
    body:
      "Professor Horace Stroud, 63, director of the Tolland Hill Observatory, was found dead early Sunday on the dome " +
      "floor beneath its 40-inch telescope. The caretaker found him at two.\n" +
      "Stroud made the front pages last month with Stroud’s Comet, which he reported to Harvard on Sept. 5. Before " +
      "that he was known for his atlas of the moon, drawn by hand over seventeen winters on the hill.\n" +
      "Police first took it for a fall from the observing ladder. Guests at the hilltop lodge that night included " +
      "Dr. Quentin Tavener of the state university and the observatory’s trustee, Lawton Teague.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "searle",
      name: "Tobias Searle",
      role: "The night assistant",
      description: "Keeps the observing log for no credit. Stroud took him in as a boy and never lets him forget it.",
      statement: {
        text: "At one the professor sent me down to the lodge with the night’s plates. He said he’d turn the dome himself for once.",
        isLie: false,
      },
    },
    {
      id: "leonora",
      name: "Leonora Stroud",
      role: "The wife",
      description: "Married Horace for the view and got the cold. Hasn’t shared his room in years.",
      statement: {
        text: "I took my sleeping draught at eleven, same as every night. Mrs. Sloane had to shake me awake at two.",
        isLie: false,
      },
    },
    {
      id: "tavener",
      name: "Dr. Quentin Tavener",
      role: "The rival",
      description: "University astronomer. Wants Stroud’s directorship and calls his orbit for the comet “schoolboy work.”",
      statement: {
        text: "I came down from the dome at half past twelve. Horace was up at the eyepiece, quite alive and quite rude.",
        isLie: false,
      },
    },
    {
      id: "tibbs",
      name: "Homer Tibbs",
      role: "The caretaker",
      description: "Runs the generator and the dome motor. Stroud fired him Friday for drinking on the job.",
      statement: {
        text: "I shut the generator off at one, like every night. Not a bulb burns on this hill after that. At two I took his coffee up.",
        isLie: false,
      },
    },
    {
      id: "sloane",
      name: "Ottilie Sloane",
      role: "The cook",
      description: "Cooks for the lodge. Was sweet on Tobias Searle until Stroud forbade it and threatened her place.",
      statement: {
        text: "Tobias was in the darkroom off my kitchen from one o’clock on. I saw his red lamp under the door the whole time.",
        isLie: true,
        truthOptions: [
          "She found the darkroom dark and empty at 1:15",
          "She was asleep in her room and saw nothing",
          "She saw Homer Tibbs climb the dome path at one",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "teague",
      name: "Lawton Teague",
      role: "The trustee",
      description: "Signs the observatory’s checks. Stroud had begun asking where the endowment money went.",
      statement: {
        text: "Quentin and I played cribbage in the lodge library from a quarter to one until Homer came shouting. I lost four dollars.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "credit", text: "Credit for a stolen discovery" },
    { id: "director", text: "To take the directorship" },
    { id: "endowment", text: "To hide the missing endowment" },
    { id: "sacked", text: "Revenge for being sacked" },
    { id: "cold", text: "To be rid of a cold husband" },
    { id: "romance", text: "Revenge for a forbidden romance" },
  ],

  weapons: [
    { id: "crank", name: "The dome crank", detail: "Dome wall hook" },
    { id: "eyepiece", name: "A brass eyepiece", detail: "Telescope case" },
    { id: "poker", name: "A fireplace poker", detail: "Lodge library" },
    { id: "globe", name: "A star globe", detail: "Director’s office" },
    { id: "holder", name: "A plate holder", detail: "Darkroom" },
    { id: "skillet", name: "An iron skillet", detail: "Lodge kitchen" },
  ],

  clues: [
    "The coroner: one blow to the back of the head with something iron, between half past one and two. The fall came after.",
    "Black gear grease in the wound. Up in the dome only the hand crank is greased, and it hangs on its hook wiped clean.",
    "Harvard’s files: the first wire about the Lyra object came Sept. 3 from Tolland Hill, two days before Stroud’s.",
    "The darkroom trays were bone dry at two. The mud on Tobias Searle’s boots was from the dome path, and still wet.",
  ],

  photo: { caption: "The lodge at Tolland Hill", scene: "lodge" },

  // The night report carries the code and the hours; the telegram shows who saw the comet first.
  // The strongbox key is a red herring for the trustee, who has a cribbage alibi.
  evidence: [
    { id: "night-report", kind: "report", label: "Night Report · Dome · Oct. 11", note: "Seeing fair. 12:30 Dr. Tavener down. 1:00 T.S. to lodge, plates." },
    { id: "harvard-wire", kind: "telegram", label: "Harvard Observatory · Sept. 4", note: "T. SEARLE TOLLAND HILL. NEW OBJECT IN LYRA STOP SEND POSITION" },
    { id: "strongbox", kind: "key", label: "Strongbox · Director’s Office", note: "Lock changed Friday. L.T. is not to have this. —H.S." },
  ],

  cipher: {
    hiddenOn: "evidence:night-report",
    plaintext: "ONE TWENTY. ALONE. TURNED THE DOME BY HAND, THE MOTOR IS DEAD.",
    shift: 17,
    keepWords: ["ALONE"],
    doodle: "snowflake",
  },

  solution: { suspectId: "searle", motiveId: "credit", weaponId: "crank" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Tobias Searle saw the comet first, on Sept. 3, and wired Harvard. Stroud took the reply off the hall table " +
        "and sent the comet in under his own name. On Saturday Tobias found that telegram in Stroud’s desk. That night " +
        "he carried the plates down at one, waited for the generator to stop, and climbed back up the dark path. He " +
        "struck Stroud with the dome crank. Ottilie Sloane swore she saw his lamp.",
      saved:
        "Homer Tibbs had been fired and had no one to say where he was. The police let him go. Harvard takes Stroud’s " +
        "name off the comet.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Tobias Searle, who found the comet first and watched Stroud take the credit. He came back up the hill " +
        "after the lights went out and struck Stroud with the dome crank.",
      cost:
        "It was ruled a fall from the ladder. Stroud’s name stayed on the comet, and Searle published nothing under " +
        "his own name for twenty years.",
    },
  },

  shareLine: "Look up. Then look again.",
};
