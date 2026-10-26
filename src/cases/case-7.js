// Case 7: The Red Cardinal. Drafted by Claude; edit freely.

export default {
  id: "red-cardinal",
  title: "The Red Cardinal",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Timber Baron Strangled at Masked Ball",
    dateline: "RIVERSIDE HEIGHTS, Feb. 16, 1947",
    body:
      "Gideon Treadwell, 71, the timber baron, was found strangled in his library Saturday night while some two " +
      "hundred masked guests waltzed below at his annual February masquerade.\n" +
      "Treadwell greeted the crowd at nine in his famous gilt Venetian mask, the one with thirteen painted tears. His " +
      "housekeeper found him at a quarter to twelve, minutes before the unmasking.\n" +
      "A witness saw a guest in a scarlet Cardinal’s robe leave the library shortly before. Police questioned the " +
      "son, Rupert Treadwell, who wore the Cardinal at midnight. No arrest has been made.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "rupert",
      name: "Rupert Treadwell",
      role: "The son",
      description: "Six foot three and drowning in debt. Inherits the estate. Came as the Red Cardinal, robe cut to fit him.",
      statement: {
        text: "Took a dare at eleven and traded rigs. Got my robe back at ten to twelve, short its sash.",
        isLie: false,
      },
    },
    {
      id: "delia",
      name: "Delia Treadwell",
      role: "The wife",
      description: "The second Mrs. Treadwell, half his age. Came as Columbine in pink ribbons. Dances often with the bandleader.",
      statement: {
        text: "Gideon went up at twenty past eleven to see a man about “the Friday business.” He wouldn’t tell me who.",
        isLie: false,
      },
    },
    {
      id: "pryor",
      name: "Laurence Pryor",
      role: "The lawyer",
      description: "Family lawyer, small and neat. Keeps the Treadwell trust books. Came as Harlequin, in black and gold diamonds.",
      statement: {
        text: "I wore the Harlequin from the first waltz to the unmasking and never left the ballroom. The band can vouch for me.",
        isLie: true,
        truthOptions: [
          "He traded costumes with Rupert at eleven",
          "He left the ball early to meet a client",
          "He spent the hour unmasked in the card room",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "ferraro",
      name: "Nico Ferraro",
      role: "The bandleader",
      description: "Leads the orchestra from a bandstand with a view of the whole room. Sends Mrs. Treadwell roses every week.",
      statement: {
        text: "The Harlequin stood by my bandstand from eleven till near midnight, calling for songs. Tall fella; sleeves halfway up his arms.",
        isLie: false,
      },
    },
    {
      id: "mayhew",
      name: "Opal Mayhew",
      role: "The columnist",
      description: "Society columnist for the Courier. Treadwell was suing her for libel over a column about his mills.",
      statement: {
        text: "I watched the Cardinal for my column. He left the ballroom at eleven and came back at twenty to twelve. Didn’t dance again.",
        isLie: false,
      },
    },
    {
      id: "crowe",
      name: "Maud Crowe",
      role: "The housekeeper",
      description: "Thirty years in the house. Treadwell turned her daughter out without a reference last spring.",
      statement: {
        text: "At half past eleven the Cardinal left the library, his robe dragging on the carpet behind him. Found the master at a quarter to.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "trust", text: "To hide a looted trust fund" },
    { id: "inheritance", text: "To inherit the Treadwell estate" },
    { id: "debts", text: "To wipe out gambling debts" },
    { id: "lover", text: "To run off with a lover" },
    { id: "libel", text: "To stop a libel suit" },
    { id: "daughter", text: "Revenge for a ruined daughter" },
  ],

  weapons: [
    { id: "sash", name: "The Cardinal’s sash", detail: "Scarlet silk" },
    { id: "ribbons", name: "Columbine ribbons", detail: "Pink satin" },
    { id: "string", name: "A mandolin string", detail: "Bandstand" },
    { id: "letter-opener", name: "A letter opener", detail: "Library desk" },
    { id: "poker", name: "A fireplace poker", detail: "Library hearth" },
    { id: "champagne", name: "Poisoned champagne", detail: "Ballroom bar" },
  ],

  clues: [
    "The family doctor: strangled from behind with a broad band of soft cloth. No wire, no wound, no poison.",
    "Threads caught in the mark on his throat are scarlet silk. Mrs. Treadwell’s Columbine ribbons are pink satin.",
    "A bank letter on the library desk: “Your trust accounts are $60,000 short. Auditors Friday, with your lawyer present.”",
    "In the cloakroom, a scarlet silk sash wadded into the pocket of a small overcoat. The claim check reads L.P.",
  ],

  photo: { caption: "Treadwell House, on the hill", scene: "mansion" },

  // A half-burnt note from the library grate carries the code; the costume tag matters to the swap.
  evidence: [
    { id: "grate-note", kind: "letter", label: "Half-burnt note, library grate", note: "Gideon — we settle the Friday business tonight, not on paper." },
    { id: "costume-tag", kind: "tag", label: "Moreau’s Costumes · No. 214", note: "Harlequin, sz. small. Hired to L.P. Due back Monday." },
    { id: "depot-stub", kind: "stub", label: "Union Depot · Chicago", note: "Two one-way, Sunday 7:10 a.m. Bought by N. Ferraro." },
  ],

  cipher: {
    hiddenOn: "evidence:grate-note",
    plaintext: "LIBRARY AT TWENTY PAST ELEVEN. COME ALONE.",
    shift: 13,
    keepWords: ["LIBRARY"],
    doodle: "mask",
  },

  solution: { suspectId: "pryor", motiveId: "trust", weaponId: "sash" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Laurence Pryor had bled the Treadwell trust of $60,000, and the auditors were due Friday. At eleven he dared " +
        "Rupert into trading costumes, climbed to the library in the Red Cardinal’s robe, and strangled Gideon with its " +
        "scarlet sash. Then he traded back. Everyone who saw the Cardinal named Rupert.",
      saved: "Rupert Treadwell comes home from the county jail. He spent the murder dancing in a borrowed Harlequin, sleeves to his elbows.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Laurence Pryor, hiding $60,000 looted from the Treadwell trust. He swapped costumes with Rupert and " +
        "strangled Gideon with the Red Cardinal’s scarlet sash.",
      cost:
        "Rupert Treadwell was convicted of the murder and of the missing $60,000 besides. Laurence Pryor handled his appeal, and lost it.",
    },
  },

  shareLine: "Never trust a costume.",
};
