// Case 36: Last Respects. Drafted by Claude; edit freely.

export default {
  id: "last-respects",
  title: "Last Respects",

  clipping: {
    masthead: "The Pine Bend Sentinel",
    headline: "Undertaker Dies at Wake in His Own Parlor",
    dateline: "PINE BEND, Vt., Nov. 22, 1947",
    body:
      "Silas Gaunt, 72, who has buried Pine Bend’s dead for half a century, collapsed in his own front hall Friday " +
      "night during the wake of Mrs. Ruth Ashby, 51, and died before the doctor could reach him.\n" +
      "Gaunt & Sons keeps the old Ballantine mansion on Church Street. The sign over its door still carries two " +
      "carved moons, one for each of the twin sons Gaunt lost in France in 1918. He embalmed Mrs. Ashby himself, as " +
      "he did everyone in town.\n" +
      "Some forty mourners saw him fall at twenty to nine. State police have closed the house and taken samples " +
      "from the back rooms.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "ashby",
      name: "Lyman Ashby",
      role: "The widower",
      description: "Owns the feed store his late wife’s money bought. Ruth died Sunday of a weak heart, the doctor says, after a summer of stomach trouble.",
      statement: {
        text: "I stood by Ruth’s coffin from seven, taking hands. Near a quarter to eight I went back to pay Silas, but he wasn’t in his workroom, so I left the money on his desk.",
        isLie: false,
      },
    },
    {
      id: "grantham",
      name: "Dr. Felix Grantham",
      role: "The town doctor",
      description: "Signed Ruth Ashby’s death certificate after a two-minute look. At the viewing Silas told him he’d been careless, and said it loud.",
      statement: {
        text: "I sat by the parlor stove from seven till Silas fell. The Whitlow girl’s chair in the front row stood empty a good while before eight.",
        isLie: false,
      },
    },
    {
      id: "purvis",
      name: "Elwood Purvis",
      role: "The apprentice",
      description: "Has learned the trade under Silas for six years. Silas promised him the business one day, then talked of selling to a stranger.",
      statement: {
        text: "I shoveled the back walk from twenty to eight till eight, with the snow coming down. Miss Whitlow was on the back porch with the Sorensen boy the whole time.",
        isLie: false,
      },
    },
    {
      id: "adah",
      name: "Adah Gaunt",
      role: "The sister",
      description: "Has kept house for Silas forty years without wages. He broke off her engagement in 1911 and never said he was sorry.",
      statement: {
        text: "I made Silas his pot of tea at half past seven, like every night, and left it on the workroom stove. Then I poured coffee out front till he fell.",
        isLie: false,
      },
    },
    {
      id: "whitlow",
      name: "Daisy Whitlow",
      role: "The stepdaughter",
      description: "Ruth’s girl by her first husband, nineteen. Her stepfather forbade her to marry a farmhand, and Silas, her godfather, took his side.",
      statement: {
        text: "I sat in the front row by Mother all evening. I never left the parlor once.",
        isLie: true,
        truthOptions: [
          "She slipped out to the back porch to meet the boy she was forbidden",
          "She went back to the workroom to see Silas",
          "She went home to fetch her mother’s Bible",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "thrall",
      name: "Gideon Thrall",
      role: "The rival undertaker",
      description: "Runs the funeral parlor in Millbrook, twelve miles off. Has asked Silas three times to sell, and been called a vulture for it.",
      statement: {
        text: "I came at eight to pay my respects. Silas met me at the door with his teacup and said he’d not sell to me if I were the last man alive.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "wife", text: "To hide how his wife died" },
    { id: "license", text: "To keep his license" },
    { id: "business", text: "To get the business sooner" },
    { id: "engagement", text: "Revenge for a broken engagement" },
    { id: "match", text: "Revenge for a forbidden match" },
    { id: "trade", text: "To take the town’s trade" },
  ],

  weapons: [
    { id: "rat-poison", name: "Rat poison", detail: "Silas’s teapot" },
    { id: "fluid", name: "Embalming fluid", detail: "Workroom shelf" },
    { id: "trocar", name: "A trocar", detail: "Workroom tray" },
    { id: "candlestick", name: "A brass candlestick", detail: "Beside the coffin" },
    { id: "heart-drops", name: "Heart drops", detail: "The doctor’s bag" },
    { id: "cushion", name: "A sofa cushion", detail: "Upstairs sitting room" },
  ],

  clues: [
    "The coroner: arsenic, a heavy dose, swallowed within the hour before he fell at twenty to nine. No mark on him.",
    "The tea left in Silas’s pot was thick with arsenic. The mourners’ coffee urn was clean.",
    "Silas’s case book, last entry: “Ruth Ashby. Certificate says heart. I don’t believe it. Told Grantham so.”",
    "Dr. Grantham’s bag sat locked in his car all evening. His heart drops are all there.",
  ],

  photo: { caption: "Gaunt & Sons, the old Ballantine house", scene: "mansion" },

  // Silas penciled his code on a photograph of his own house.
  evidence: [
    { id: "bill-envelope", kind: "envelope", label: "Gaunt & Sons · Services", note: "$180 in bills. “Paid in full, L.A.” Found on the workroom desk." },
    { id: "porch-note", kind: "card", label: "Note in a black glove", note: "Back porch, quarter to eight. I’ll wait by the hearse. —Karl" },
    { id: "hardware", kind: "ledger", label: "Tisdale Hardware · Ashby acct.", note: "Mar. 4 · rat poison (arsenic) | June 12 · rat poison (arsenic) | Sept. 30 · rat poison (arsenic)" },
  ],

  cipher: {
    hiddenOn: "photo",
    plaintext: "THE WOMAN ON MY TABLE HAS WHITE BANDS ON EVERY NAIL. ARSENIC, FOR MONTHS.",
    shift: 2,
    keepWords: ["ARSENIC", "MONTHS"],
    doodle: "moon",
  },

  solution: { suspectId: "ashby", motiveId: "wife", weaponId: "rat-poison" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "All summer Lyman Ashby fed his wife rat poison for the money behind his feed store, and Dr. Grantham signed " +
        "it off as a weak heart. Silas Gaunt embalmed her and saw the white bands on her nails. Lyman heard him tell " +
        "the doctor so at the viewing. At a quarter to eight, with the bill for his excuse, he went back to the " +
        "workroom and tipped a paper of the same poison into the old man’s teapot.",
      saved:
        "Daisy Whitlow lied to keep Karl Sorensen a secret from her stepfather. Ruth is exhumed, the arsenic is " +
        "found, and Daisy marries her farmhand in the spring.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Lyman Ashby, hiding how his wife died. Silas had seen the arsenic in her when he embalmed her. Lyman " +
        "left his money on the workroom desk at a quarter to eight and poisoned Silas’s tea while he was there.",
      cost:
        "Daisy Whitlow’s lie made her the town’s suspect, and Lyman sent her off to an aunt in Albany. Ruth Ashby " +
        "stayed buried with her weak heart.",
    },
  },

  shareLine: "Pay your respects carefully.",
};
