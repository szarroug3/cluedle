// Case 66: The Brass Pole. Drafted by Claude; edit freely.

export default {
  id: "brass-pole",
  title: "The Brass Pole",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Fire Captain Dies in Fall Inside His Firehouse",
    dateline: "RIVERSIDE, Dec. 28, 1947",
    body:
      "Capt. Rufus Pellow, 52, was found dead at the foot of the brass pole in the Water Street firehouse early " +
      "Sunday. Firemen say he must have stepped through the pole hole beside his office in the dark.\n" +
      "Pellow joined Engine Company 18 in 1919 and never served in any other house. His men say he could pick the " +
      "company’s bell out from any other in the city by its first stroke.\n" +
      "It has been a hard month on Water Street: three tenement fires on Tanner Street since December 3, and Engine " +
      "18 first in at every one.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "lattimore",
      name: "Garth Lattimore",
      role: "The probationary fireman",
      description: "Six months on the job. The Mayor pinned a medal on him last week for carrying a girl out of the second Tanner Street fire.",
      statement: {
        text: "The captain called me into his office at ten past two to talk about my medal. At a quarter past I went down to hang the drill hose in the tower, and I was still up the ladder when the shouting started.",
        isLie: false,
      },
    },
    {
      id: "quigg",
      name: "Obed Quigg",
      role: "The lieutenant",
      description: "Twenty years in and passed over twice. Pellow wrote in his file that he froze on a ladder in 1944.",
      statement: {
        text: "I was asleep in the bunk room from midnight. The thud woke me at twenty past two, and I was first to the pole hole.",
        isLie: false,
      },
    },
    {
      id: "ferrand",
      name: "Shad Ferrand",
      role: "The engine driver",
      description: "Drives the pumper. At the last Tanner Street fire Pellow smelled whiskey on him and was writing him up.",
      statement: {
        text: "I had the desk from two. Nobody used the front stairs after the probie came down at a quarter past, and at twenty past the captain came down the pole hole.",
        isLie: false,
      },
    },
    {
      id: "venner",
      name: "Moe Venner",
      role: "The company cook",
      description: "Cooks for the house. Pellow found the mess fund twenty dollars short. Leaving the house on duty is a firing offense.",
      statement: {
        text: "I was in my bunk asleep from one o’clock. The lieutenant’s shouting woke me like everybody else.",
        isLie: true,
        truthOptions: [
          "He was across the street buying sandwiches for the men",
          "He was in the captain’s office about the mess fund",
          "He was in the hose tower with the probie",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "pask",
      name: "Ferris Pask",
      role: "The fire buff",
      description: "Sells his fire pictures to the Courier and has been at every Tanner Street fire. Pellow threw him out of the house on Friday.",
      statement: {
        text: "The captain threw me out Friday, so I sat up in Dabney’s window across the street. After Mrs. Spurling’s cab at ten past one, nobody came or went but the cook, over for sandwiches at ten past two.",
        isLie: false,
      },
    },
    {
      id: "spurling",
      name: "Rhea Spurling",
      role: "The landlady",
      description: "Owns the Tanner Street tenements, insured high. Pellow told the fire marshal her cellars were firetraps.",
      statement: {
        text: "I came by at one to ask the captain about my buildings. He walked me to the door himself at ten past one, and I took a cab home.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "fires", text: "To hide the fires he set" },
    { id: "badge", text: "To take the captain’s badge" },
    { id: "whiskey", text: "To keep his seat on the pumper" },
    { id: "mess", text: "To hide the short mess fund" },
    { id: "thrown-out", text: "Revenge for being thrown out" },
    { id: "claims", text: "To protect her insurance claims" },
  ],

  weapons: [
    { id: "shove", name: "A shove down the pole hole", detail: "Captain’s office" },
    { id: "nozzle", name: "A brass hose nozzle", detail: "Engine tailboard" },
    { id: "axe", name: "A fire axe", detail: "Apparatus floor" },
    { id: "spanner", name: "A spanner wrench", detail: "Hose rack" },
    { id: "pike", name: "A pike pole", detail: "Wall hooks" },
    { id: "powders", name: "Sleeping powders", detail: "Captain’s desk" },
  ],

  clues: [
    "The coroner: neck broken in a twenty-foot fall. No blow before it, but two fresh bruises on his chest, the width of a man’s hands.",
    "The hose tower’s iron ladder runs from the apparatus floor up to a door beside the captain’s office. That door was found unlatched.",
    "The fire marshal: all three Tanner Street fires began in a cellar, with a candle stub in a pan of kerosene.",
    "Alarm records: all three Tanner Street fires were turned in from Box 362 by Lattimore, off duty and walking past.",
  ],

  photo: { caption: "The captain’s office, Water Street", scene: "office" },

  // Pellow penciled his code on the back of a photo of his own office. The lunch-counter receipt catches the liar.
  evidence: [
    { id: "dabney", kind: "receipt", label: "Dabney’s All-Night Lunch · Water St.", note: "2:10 a.m. Six egg sandwiches, six coffees, to go. On the firehouse tab." },
    { id: "photo-slip", kind: "slip", label: "Riverside Courier · Photo Desk", note: "F. Pask, $5 a picture: Tanner St. fires of Dec. 3, Dec. 14, Dec. 22." },
    { id: "claim", kind: "letter", label: "Mercantile Fire Insurance Co.", note: "Mrs. R. Spurling: your claim on 41 Tanner St. is held for the fire marshal’s report." },
  ],

  cipher: {
    hiddenOn: "photo",
    plaintext: "THE BOX GETS PULLED BEFORE ANYBODY SEES SMOKE. NOBODY IS THAT LUCKY.",
    shift: 18,
    keepWords: ["BOX", "LUCKY"],
    doodle: "bell",
  },

  solution: { suspectId: "lattimore", motiveId: "fires", weaponId: "shove" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Garth Lattimore set the Tanner Street fires with a candle in a pan of kerosene, pulled Box 362 himself, and " +
        "went in first. Captain Pellow saw the pattern and called him in at ten past two. Lattimore walked down the " +
        "front stairs where the driver could see him, climbed the hose-tower ladder to the door by the office, and " +
        "shoved the captain through the pole hole.",
      saved:
        "No fourth fire comes to Tanner Street. Moe Venner loses a week’s pay for the sandwiches and keeps his job, " +
        "and the Mayor asks for his medal back.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Garth Lattimore, the probationary man, hiding the fires he set so he could be a hero. When the captain " +
        "faced him with it, he came back up the hose-tower ladder and shoved him down the pole hole.",
      cost:
        "The board called it a fall in the dark. In February a fourth fire on Tanner Street killed two, and Lattimore " +
        "was first through the door.",
    },
  },

  shareLine: "Ask who’s always first through the door.",
};
