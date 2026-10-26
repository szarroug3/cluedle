// Case 26: The Picket Line. Drafted by Claude; edit freely.

export default {
  id: "picket-line",
  title: "The Picket Line",

  clipping: {
    masthead: "The Salt Harbor Gazette",
    headline: "Cannery Foreman Found Dead on Struck Line",
    dateline: "SALT HARBOR, Me., Sept. 9, 1947",
    body:
      "Elwood Quill, 56, foreman at Pruett Packing, was found dead on the sardine line early Tuesday, the eleventh " +
      "day of a strike that has shut the cannery.\n" +
      "The plant was built in 1939 on the ashes of the old one, which burned to the pilings. Its boats sit idle at " +
      "the wharf, and the plant bell that rang three shifts a day has not rung since the walkout. Owner " +
      "Augustus Pruett says the insurance on the fire never paid.\n" +
      "Police found a broken window and a picket sign near the body. Pruett blamed the union. Strike leader Nora " +
      "Pereira said her pickets never left the gate.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "rook",
      name: "Elias Rook",
      role: "The paymaster",
      description: "Has kept Pruett’s books and filled the pay envelopes since 1935. Takes the train to Portland once a month.",
      statement: {
        text: "I locked the office at six. The pickets would skin me if they saw me at that gate.",
        isLie: false,
      },
    },
    {
      id: "pruett",
      name: "Augustus Pruett",
      role: "The owner",
      description: "Rebuilt the plant with his own money after the fire. Has cut wages twice since. Swears he’ll break the union.",
      statement: {
        text: "I was at the Grange hall from eight till midnight, arguing with forty men.",
        isLie: false,
      },
    },
    {
      id: "pereira",
      name: "Nora Pereira",
      role: "The strike leader",
      description: "Has packed sardines since she was twelve. Quill fired her brother in July for talking union on the line.",
      statement: {
        text: "I walked the front gate from eight till two. The side-gate lantern went on at ten. Saw Toby go over the back fence near eleven.",
        isLie: false,
      },
    },
    {
      id: "reis",
      name: "Toby Reis",
      role: "The young striker",
      description: "Nineteen and hot-headed. Threw a brick through the cannery window on the first day of the strike.",
      statement: {
        text: "I went over the back fence at eleven to leave my sign on the line for Quill to find. He was lying there already. I ran.",
        isLie: false,
      },
    },
    {
      id: "pardee",
      name: "Elmer Pardee",
      role: "The night watchman",
      description: "Watches the gates nights for Pruett. Owes the company store more than he earns in a year.",
      statement: {
        text: "Nobody came in front or side all night. That side-gate bell never rang. I’d have heard it.",
        isLie: true,
        truthOptions: [
          "He was asleep in the gatehouse from nine",
          "He let Pruett in the side gate at ten",
          "He left his post for the company store",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "quill",
      name: "Marguerite Quill",
      role: "The widow",
      description: "Married to Elwood twenty years. Her brother runs the Tibbetts cannery across the harbor.",
      statement: {
        text: "Elwood went back in at seven to oil the machines. Said a man was coming at ten on old business, and not to wait up.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "fire-money", text: "To hide a stolen fire payout" },
    { id: "strike", text: "To break the strike" },
    { id: "brother", text: "Revenge for a fired brother" },
    { id: "scab", text: "To punish a strikebreaker" },
    { id: "store-debt", text: "To clear a company-store debt" },
    { id: "closed", text: "To keep the cannery closed" },
  ],

  weapons: [
    { id: "wrench", name: "A seamer wrench", detail: "Line No. 2" },
    { id: "sign", name: "A picket sign", detail: "By the body" },
    { id: "brick", name: "A paving brick", detail: "Broken window" },
    { id: "gaff", name: "A gaff hook", detail: "The wharf" },
    { id: "knife", name: "A gutting knife", detail: "Packing table" },
    { id: "club", name: "A watchman’s club", detail: "Gatehouse" },
  ],

  clues: [
    "The coroner: one blow to the back of the head from something steel, narrow and heavy. Dead by eleven at the latest.",
    "Line 2’s seamer wrench lay wiped in the brine tank. The side gate takes a key. Pruett and his paymaster hold the only two.",
    "Northern Mutual Fire, by wire: the 1938 fire claim was paid in full that November. $30,000, mailed to the cannery office.",
    "Casco Savings: the “C. Ross” account was opened Nov. 1938. The signature card matches the hand on every Pruett pay envelope.",
  ],

  photo: { caption: "Pruett Packing, the wharf", scene: "harbor" },

  // Quill's personal ad carries the code. The bank slip is the motive hint; the sign prints clear the striker.
  evidence: [
    { id: "personal", kind: "classified", label: "Gazette Personals · Sept. 6", note: "NORTHERN MUTUAL — Re fire claim, Pruett Pkg., 1938. Box 31." },
    { id: "bank-slip", kind: "slip", label: "Casco Savings Bank, Portland", note: "Acct. C. Ross · Dep. cash $200.00 · Sept. 2, 1947" },
    { id: "sign-prints", kind: "fingerprint", label: "Picket sign, by the body", note: "T. Reis prints only. No blood, no hair. Too light for the wound." },
  ],

  cipher: {
    hiddenOn: "evidence:personal",
    plaintext: "THE CLAIM CHECK WAS ENDORSED IN A HAND THAT WAS NOT PRUETT’S.",
    shift: 3,
    keepWords: ["ENDORSED"],
    doodle: "bell",
  },

  solution: { suspectId: "rook", motiveId: "fire-money", weaponId: "wrench" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Elias Rook signed Pruett’s name to the 1938 fire check and banked the $30,000 in Portland as C. Ross. Pruett " +
        "thought the claim was refused and cut wages for nine years until the line walked out. When Quill found the " +
        "account, Rook let himself in the side gate at ten while the watchman slept, struck him down with the " +
        "seamer wrench, and left the strike to take the blame.",
      saved:
        "Toby Reis was found with his own sign beside the body and would have stood trial for it. He is back on the " +
        "picket line.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Elias Rook, hiding the 1938 fire money he had cashed in Portland under another name. He let himself " +
        "in the side gate at ten and struck Elwood Quill with the seamer wrench from Line 2.",
      cost:
        "The papers blamed the union and the strike broke in a week. Toby Reis was never charged, but no cannery in " +
        "Maine would hire him. Rook retired to Portland.",
    },
  },

  shareLine: "Look past the picket line.",
};
