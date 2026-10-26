// Case 31: Stateroom A-9. Drafted by Claude; edit freely.

export default {
  id: "stateroom-a9",
  title: "Stateroom A-9",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Liner Passenger Found Dead in First Class",
    dateline: "RIVERSIDE, May 12, 1947",
    body:
      "A first-class passenger was found dead in stateroom A-9 of the liner S.S. Aldersgate on Monday morning as she " +
      "came alongside in Riverside harbor. The ship’s list gives him as Rollo Tarrant, 49, a Philadelphia steel heir.\n" +
      "The Aldersgate rode at anchor off the breakwater for nineteen hours in fog before a pilot could bring her in. " +
      "None of her 900 passengers left the ship.\n" +
      "Tarrant is said to have died in his berth near midnight Sunday. Police are holding the first-class passengers aboard.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "stokes",
      name: "Lavinia Stokes",
      role: "The widow",
      description: "A Boston widow sailing home. Lost most of her late husband’s money in 1945 to a charming man.",
      statement: {
        text: "I sat across from Mr. Tarrant at Saturday’s captain’s dinner. He had lovely manners. I haven’t slept a wink since.",
        isLie: false,
      },
    },
    {
      id: "thursby",
      name: "Neville Thursby",
      role: "The cardplayer",
      description: "Plays cards for a living on the Atlantic run. Lost $1,600 to “Mr. Tarrant” on Friday and signed an IOU.",
      statement: {
        text: "Sayre and I played gin in the smoking room from eleven till it closed at two. I never left the table.",
        isLie: true,
        truthOptions: [
          "He left the game near midnight for most of an hour",
          "He was in the dispensary with a sick stomach",
          "He played in the crew mess, not the smoking room",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "sayre",
      name: "Barton Sayre",
      role: "The steel man",
      description: "Pittsburgh steel. Tarrant’s vote is all that stands between him and a merger worth millions.",
      statement: {
        text: "I’ve sat across a board table from Rollo Tarrant for ten years. I didn’t lay eyes on him once this crossing.",
        isLie: false,
      },
    },
    {
      id: "tate",
      name: "Rosalind Tate",
      role: "The niece",
      description: "Tarrant’s niece and heir, home from school in Switzerland. Hasn’t seen her uncle since she was a girl.",
      statement: {
        text: "I danced with the third officer from ten until the band packed up at one. Ask him. He stepped on my feet all night.",
        isLie: false,
      },
    },
    {
      id: "strickland",
      name: "Dr. Hugo Strickland",
      role: "The ship’s doctor",
      description: "Sells morphine on the quiet to passengers who ask. “Mr. Tarrant” said he’d report him to the line.",
      statement: {
        text: "Sunday afternoon I saw Mr. Thursby, Mrs. Stokes, and Kip’s scalded hand. I keep the cabinet key in my desk.",
        isLie: false,
      },
    },
    {
      id: "tierney",
      name: "Kip Tierney",
      role: "The steward",
      description: "Cabin steward on A-deck. “Mr. Tarrant” had a week’s pay docked from him over a cold breakfast.",
      statement: {
        text: "He took every meal in A-9 till the captain’s dinner. Seasick, he said, on a sea like glass. I brought his brandy at eleven.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "fortune", text: "Revenge for a stolen fortune" },
    { id: "cards", text: "To win back his card losses" },
    { id: "merger", text: "To push through a steel merger" },
    { id: "heir", text: "To inherit the Tarrant money" },
    { id: "morphine", text: "To hide his morphine sales" },
    { id: "pay", text: "Over a week’s docked pay" },
  ],

  weapons: [
    { id: "chloral", name: "Chloral hydrate", detail: "Ship’s dispensary" },
    { id: "morphine-tabs", name: "Morphine tablets", detail: "Doctor’s bag" },
    { id: "pillow", name: "A bed pillow", detail: "Stateroom A-9" },
    { id: "cane", name: "A silver-topped cane", detail: "Sayre’s cabin" },
    { id: "rat-poison", name: "Rat poison", detail: "Galley stores" },
    { id: "marlinspike", name: "A marlinspike", detail: "Bosun’s locker" },
  ],

  clues: [
    "The coroner ashore: no mark on him. He died near midnight of chloral in his brandy, enough to drop a horse.",
    "Two brandy glasses in A-9, one rinsed clean in the basin. Face powder on the hand towel beside it.",
    "The A-deck night watch: at midnight a man knocked at A-9 for some minutes, got no answer, and went away.",
    "Scotland Yard by radio: the dead man’s prints are Lyman Pickett’s. In 1945 he took a Boston widow for $40,000.",
  ],

  photo: { caption: "The Aldersgate at anchor, Sunday fog", scene: "harbor" },

  // The radiogram turns the case over and carries the code; the card ledger catches the cardplayer;
  // the cabinet key points to the dispensary.
  evidence: [
    { id: "radiogram", kind: "telegram", label: "Radiogram · Mon. 9:40 a.m.", note: "PURSER ALDERSGATE. AM ROLLO TARRANT. NEVER SAILED. WHO IS IN A-9" },
    { id: "card-ledger", kind: "ledger", label: "Smoking Room · Card Tables", note: "Sun. gin, table 4: Sayre, Thursby | 11:50 Thursby out | 12:45 in" },
    { id: "cabinet-key", kind: "key", label: "Dispensary Cabinet · B-Deck", note: "Chloral bottle down by half since Sunday noon. —H.S." },
  ],

  cipher: {
    hiddenOn: "evidence:radiogram",
    plaintext: "SOUTHAMPTON POLICE SAY THE THIEF WORKS THE LINERS UNDER BORROWED NAMES",
    shift: 19,
    keepWords: ["THIEF"],
    doodle: "anchor",
  },

  solution: { suspectId: "stokes", motiveId: "fortune", weaponId: "chloral" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "The man in A-9 was Lyman Pickett, sailing on Rollo Tarrant’s stolen ticket and hiding in his stateroom. At " +
        "Saturday’s captain’s dinner Lavinia Stokes knew him as the man who took her husband’s money. On Sunday she " +
        "took chloral from the doctor’s cabinet. At half past eleven she knocked at A-9, shared a brandy with him, and " +
        "rinsed her glass. When Thursby came knocking at midnight, nobody answered.",
      saved:
        "The police had Neville Thursby down for it over his missing hour. He walks down the gangway with the other " +
        "passengers, and the steel heir’s niece learns her uncle is alive in Philadelphia.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Lavinia Stokes. The man traveling under Rollo Tarrant’s name had swindled her out of a fortune, and " +
        "she put chloral from the ship’s dispensary in his brandy.",
      cost:
        "The death was logged as heart failure at sea. He went into the ground in Philadelphia as Rollo Tarrant, until " +
        "the real one objected, and by then nobody asked who had poured the brandy.",
    },
  },

  shareLine: "Check the passenger list twice.",
};
