// Case 39: Couples Only. Drafted by Claude; edit freely.

export default {
  id: "couples-only",
  title: "Couples Only",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Roller Champion Strangled Before Title Race",
    dateline: "RIVERSIDE, Nov. 30, 1947",
    body:
      "Johnny Dace, 23, the state’s roller speed champion three years running, was found strangled in the skate " +
      "room of the Canal Street Rollerdrome Saturday night, minutes before he was to defend his title.\n" +
      "Twelve hundred fans had come for the final, five laps of the big oval. The starter rings his brass bell once " +
      "at every lap, and the whole house counts along with him.\n" +
      "Dace was found at twenty-five past nine, as the organ struck up the march for the final. The race was never run.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "haskett",
      name: "Merle Haskett",
      role: "The organist",
      description: "Has played the Rollerdrome’s Hammond for eight years and cuts records of it for the radio. A widower raising a girl of seventeen.",
      statement: {
        text: "The couples’ skate ran from nine to twenty past, and the waltzes never stopped once. Ask anybody on the floor.",
        isLie: false,
      },
    },
    {
      id: "melcher",
      name: "Buzz Melcher",
      role: "The challenger",
      description: "Second to Johnny three years running. A win tonight was worth $500 and his picture in the paper.",
      statement: {
        text: "I skated every waltz of the couples’ skate with Darlene Fry. Ask her.",
        isLie: true,
        truthOptions: [
          "He was in the office signing a pro contract",
          "He was in the skate room with Johnny",
          "He was out back having a smoke",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "fry",
      name: "Darlene Fry",
      role: "The ladies’ champion",
      description: "Johnny’s girl until August, when he came home from the Jersey shore and dropped her cold.",
      statement: {
        text: "I sat out the couples’ skate at the snack bar. Nobody asked me, and Buzz Melcher never came near me.",
        isLie: false,
      },
    },
    {
      id: "mraz",
      name: "Stosh Mraz",
      role: "The skate man",
      description: "Fits wheels and fixes trucks in the skate room. Johnny got him fired from the Roseland in ’45 over a wheel that came loose.",
      statement: {
        text: "Johnny came in at five past nine for fresh wheels. I fitted them, left him lacing up, and went out back for a smoke.",
        isLie: false,
      },
    },
    {
      id: "sandoval",
      name: "Alonzo Sandoval",
      role: "The rink owner",
      description: "Built the Rollerdrome in 1938. Johnny had signed to skate for a new rink in Newark come January.",
      statement: {
        text: "I sold tickets in the front booth from seven till the final. I never left the till; the line was out the door.",
        isLie: false,
      },
    },
    {
      id: "ostrander",
      name: "Fred Ostrander",
      role: "The starter",
      description: "Starts every race and keeps the amateur association’s books. Johnny had asked to see where the entry fees went.",
      statement: {
        text: "At twenty-five past I went to fetch Johnny for the start and found him on the skate-room floor. I rang my bell till the police came.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "daughter", text: "Revenge for his daughter" },
    { id: "title", text: "To win the title" },
    { id: "jealousy", text: "Jealousy over another girl" },
    { id: "firing", text: "Revenge for a firing" },
    { id: "star", text: "To keep his star" },
    { id: "fees", text: "To hide the entry fees" },
  ],

  weapons: [
    { id: "lace", name: "A skate lace", detail: "Rental rack" },
    { id: "wrench", name: "A truck wrench", detail: "Skate-room bench" },
    { id: "skate", name: "A steel roller skate", detail: "Skate-room bench" },
    { id: "towel", name: "A wet towel", detail: "Locker room" },
    { id: "chloral", name: "Chloral drops", detail: "Snack bar" },
    { id: "pistol", name: "The starter’s pistol", detail: "Starting line" },
  ],

  clues: [
    "The coroner: strangled from behind with a thin cord, not long before he was found. No blow, and no sign he saw it coming.",
    "A rental skate in the rack at the foot of the organ-loft stairs is missing its lace. That lace was around Johnny’s neck.",
    "Up in the organ loft, a turntable wired into the rink’s loudspeakers. It was still warm at ten.",
    "In Johnny’s locker, a snapshot of a girl on the Steel Pier: “Atlantic City, August ’47. Love, A.”",
  ],

  photo: { caption: "The Rollerdrome on race night", scene: "ring" },

  // A girl passed Johnny a note on the back of a ticket stub, in a code they shared.
  evidence: [
    { id: "stub", kind: "ticket", label: "Rollerdrome · Couples’ Skate", note: "Admit one, 25¢. Found in Johnny’s jacket. On the back, a girl’s pencil." },
    { id: "contract", kind: "letter", label: "Roller Derby · Chicago", note: "Pro contract, $75 a week. Signed in the Rollerdrome office, 9:10 p.m., B. Melcher." },
    { id: "disc", kind: "tag", label: "Transcription disc · organ loft", note: "“Waltzes at the Rollerdrome,” M. Haskett at the Hammond. Runs 15 min." },
  ],

  cipher: {
    hiddenOn: "evidence:stub",
    plaintext: "MY FATHER KNOWS ABOUT ATLANTIC CITY. KEEP CLEAR OF HIM TONIGHT.",
    shift: 5,
    keepWords: ["FATHER", "ATLANTIC"],
    doodle: "bell",
  },

  solution: { suspectId: "haskett", motiveId: "daughter", weaponId: "lace" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "In August Johnny Dace took Merle Haskett’s seventeen-year-old daughter to Atlantic City and sent her home " +
        "alone on the bus. Haskett found out. At five past nine he set his own fifteen-minute disc of waltzes on the " +
        "turntable, went down the loft stairs, pulled the lace from a rental skate, and strangled Johnny once the " +
        "skate man stepped out. He was back at the Hammond before the record ran out at twenty past.",
      saved:
        "Buzz Melcher lied because he had been in the office signing with the Roller Derby, which would have barred " +
        "him from an amateur final. He skates for Chicago now, for pay.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Merle Haskett, avenging his daughter. While his own recording of waltzes played the couples’ skate, " +
        "he came down from the loft and strangled Johnny with a lace from a rental skate.",
      cost:
        "Buzz Melcher, caught lying about the couples’ skate, was charged instead. Haskett played the organ at " +
        "Johnny’s funeral.",
    },
  },

  shareLine: "Keep your eyes on the floor.",
};
