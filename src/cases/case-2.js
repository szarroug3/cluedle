// Case 2: The Last Curtain. Drafted by Claude; edit freely.

export default {
  id: "last-curtain",
  title: "The Last Curtain",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Star Shot Dead on Closing Night",
    dateline: "RIVERSIDE HEIGHTS, Nov. 9, 1946",
    body:
      "Margot Delacroix, 34, toast of the Majestic Theatre, was shot dead on stage Saturday as the final performance " +
      "of “Midnight in Lisbon” neared its close. The prop revolver fired by her leading man, Julian Crane, was meant " +
      "to hold only blanks.\n" +
      "Audiences filled the house for 212 nights to watch Miss Delacroix sweep out of the dressing room marked Four, the " +
      "gold star still on its door. The curtain fell at eleven; the house had gone silent long before.\n" +
      "Producer Harold Voss called the death “a terrible accident.” Police are holding the revolver and questioning " +
      "the company.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "crane",
      name: "Julian Crane",
      role: "The leading man",
      description: "Fired the shot every night for 212 shows. Margot was leaving him, and the show, for Hollywood.",
      statement: {
        text: "I pulled the trigger, God help me. I checked that gun at the half-hour like always. Blanks. I’d swear to it.",
        isLie: false,
      },
    },
    {
      id: "pike",
      name: "Edna Pike",
      role: "The understudy",
      description: "Knows every line of the lead by heart. Has waited three seasons for a single night onstage.",
      statement: {
        text: "I was in the wings, stage left, the whole third act. Ask Rosie; she was pinning my hem.",
        isLie: false,
      },
    },
    {
      id: "marsh",
      name: "Leo Marsh",
      role: "The prop master",
      description: "Loads the blanks himself and keeps the prop table locked. Owes the producer a good deal of money.",
      statement: {
        text: "I loaded five blanks at seven and locked the prop table. Only Mr. Voss and I carry keys.",
        isLie: false,
      },
    },
    {
      id: "voss",
      name: "Harold Voss",
      role: "The producer",
      description: "Owns the Majestic and the show. Smiles for the papers; argues with the bank behind closed doors.",
      statement: {
        text: "I watched all of Act Three from my box. Never went backstage once, not all night.",
        isLie: true,
        truthOptions: [
          "He went to the prop table at intermission",
          "He left the theater before Act Three",
          "He was waiting in Miss Delacroix’s dressing room",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "kell",
      name: "Rosie Kell",
      role: "The dresser",
      description: "Has dressed Margot for nine years. Knows every secret in the building and keeps them, mostly.",
      statement: {
        text: "I was pinning Miss Pike’s hem in the wings all act. At intermission I heard Miss Margot shouting at Mr. Voss.",
        isLie: false,
      },
    },
    {
      id: "ostrow",
      name: "Sam Ostrow",
      role: "The stage-door man",
      description: "Forty years at the stage door. Sees who comes and goes, and drinks to forget most of it.",
      statement: {
        text: "Nobody came in my door after curtain-up. Only Mr. Voss came round, at intermission, asking after the props.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "insurance", text: "To collect the insurance" },
    { id: "role", text: "To take her starring role" },
    { id: "jealousy", text: "Jealousy over a love affair" },
    { id: "theft", text: "To hide stolen box-office money" },
    { id: "ruin", text: "Revenge for a ruined career" },
    { id: "hollywood", text: "To stop her leaving for Hollywood" },
  ],

  weapons: [
    { id: "revolver", name: "The prop revolver", detail: "Stage, Act Three" },
    { id: "derringer", name: "Her own derringer", detail: "Her handbag" },
    { id: "sandbag", name: "A sandbag", detail: "Fly loft" },
    { id: "greasepaint", name: "Poisoned greasepaint", detail: "Makeup table" },
    { id: "knife", name: "A stage knife", detail: "Prop table" },
    { id: "stocking", name: "A silk stocking", detail: "Wardrobe" },
  ],

  clues: [
    "The coroner: a single gunshot, fired from the stage. Nothing else in her system.",
    "The prop revolver held four blanks and one spent live round. Leo Marsh swears he never kept live rounds.",
    "Insurance papers in the producer’s desk: Margot Delacroix’s policy doubled in May, payable to the Majestic.",
    "The bank’s letter to Harold Voss, dated Monday: the Majestic will be seized at month’s end unless paid in full.",
  ],

  photo: { caption: "Opening night at the Majestic", scene: "theater" },

  // Decoys, plus the ticket stub that carries the scrawl on its back.
  evidence: [
    { id: "stork-club", kind: "matchbook", label: "The Stork Club", note: "PLaza 3-0099 — ask for Lou" },
    { id: "ticket-stub", kind: "ticket", label: "Majestic · Row C, Seat 12", note: "comp — H.V." },
    { id: "lozenges", kind: "prescription", label: "Dr. M. Feld, Throat", note: "lozenges 4 hrly — M.D." },
  ],

  cipher: {
    hiddenOn: "evidence:ticket-stub",
    plaintext: "HAROLD DOUBLED MY POLICY IN MAY. IF I DIE ON STAGE, ASK HIM WHY.",
    shift: 4,
    keepWords: ["POLICY"],
    doodle: "star",
  },

  solution: { suspectId: "voss", motiveId: "insurance", weaponId: "revolver" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Harold Voss was drowning. The bank was days from taking the Majestic, and Margot was leaving for Hollywood at " +
        "the end of the run. At intermission he let himself into the prop table with his own key, swapped one blank for " +
        "a live round, and went back to his box to watch Julian Crane pull the trigger.",
      saved: "Julian Crane, who would have hanged for a murder he was tricked into, walks out of the Majestic a free man.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Harold Voss, cashing in his star. He doubled her insurance in May, and at intermission he swapped a blank " +
        "for a live round in the prop revolver.",
      cost:
        "Julian Crane was convicted of manslaughter and died in prison. Voss collected, reopened the Majestic, and " +
        "insured his next leading lady the week she signed.",
    },
  },

  shareLine: "The show must go on.",
};
