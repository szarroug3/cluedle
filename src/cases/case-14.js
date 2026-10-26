// Case 14: The Gold Mask. Drafted by Claude; edit freely.

export default {
  id: "gold-mask",
  title: "The Gold Mask",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Curator Found Dead at Museum Gala",
    dateline: "RIVERSIDE, Apr. 19, 1947",
    body:
      "Dr. Lionel Falkner, 52, curator of antiquities at the Riverside Museum of Art, was found dead in the museum’s " +
      "new Egyptian hall late Friday, during the gala that opened it to five hundred guests.\n" +
      "The hall’s prize is the gold burial mask of Princess Senet, bought this spring at a price the museum will not " +
      "name. Visitors are told it has lost only two of its blue inlays in thirty centuries.\n" +
      "A night watchman found Dr. Falkner on the gallery floor at 10:40. Police questioned guests and staff until " +
      "dawn. Director Bertram Eames called it “a black night for this city.”",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "durrell",
      name: "Sylvan Durrell",
      role: "The dealer",
      description: "Deals in antiquities on Fifth Avenue. Sold the museum its gold mask. Never without a Havana.",
      statement: {
        text: "I stood in the rotunda from the toasts at nine until the police came. I never went back to the Egyptian hall.",
        isLie: true,
        truthOptions: [
          "He followed Falkner into Hall 3 just before ten",
          "He left the gala early to catch the late train",
          "He sat in the director’s office with Eames",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "eberhardt",
      name: "Anselm Eberhardt",
      role: "The restorer",
      description: "The museum’s restorer. Cleaned the mask when it arrived. Owes his bookmaker more than a year’s pay.",
      statement: {
        text: "Lionel borrowed my lamp and loupe at half past nine. Near ten Durrell cadged a match off me and went down the east corridor.",
        isLie: false,
      },
    },
    {
      id: "eames",
      name: "Bertram Eames",
      role: "The director",
      description: "Talked the board into buying the mask and borrowed against the endowment to pay for it.",
      statement: {
        text: "I read out donors’ names at the lectern from nine till half past ten. Ask anyone who sat through it.",
        isLie: false,
      },
    },
    {
      id: "ellery",
      name: "Winifred Ellery",
      role: "The trustee",
      description: "A banker’s widow on the museum board. She and Falkner were close until he cooled toward her this winter.",
      statement: {
        text: "Lionel and I had words at the bar after the toasts. Then I stood beside Bertram at the lectern till he finished.",
        isLie: false,
      },
    },
    {
      id: "delancey",
      name: "Theda Delancey",
      role: "The assistant",
      description: "Falkner’s assistant. She read the mask’s inscription first, and his name went on the paper.",
      statement: {
        text: "At a quarter to ten he sent me down for the purchase file, in a hurry. When I came back up, the hall was dark.",
        isLie: false,
      },
    },
    {
      id: "fenwick",
      name: "Orrin Fenwick",
      role: "The night watchman",
      description: "Night watchman for twenty years. Falkner caught him asleep on duty in March and wrote him up.",
      statement: {
        text: "At ten I told the doctor and a gent to clear Hall 3. At 10:40 I found the door open.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "forgery", text: "To hide a forgery" },
    { id: "post", text: "To keep his post" },
    { id: "credit", text: "Revenge for stolen credit" },
    { id: "affair", text: "Spite after a broken affair" },
    { id: "fired", text: "To keep from being fired" },
    { id: "theft", text: "To steal the gold mask" },
  ],

  weapons: [
    { id: "cat", name: "A bronze cat", detail: "Hall 3 plinth" },
    { id: "bookend", name: "A marble bookend", detail: "Director’s office" },
    { id: "stanchion", name: "A brass stanchion", detail: "Velvet rope" },
    { id: "crowbar", name: "A crowbar", detail: "Packing crates" },
    { id: "flint", name: "A flint knife", detail: "Hall 3 case" },
    { id: "arsenic", name: "Arsenic paint", detail: "Restorer’s bench" },
  ],

  clues: [
    "The coroner: one blow to the temple from something small and heavy with a square base. No blade, no poison, no struggle.",
    "The mask lay beside Falkner under the borrowed lamp. Nobody had tried to carry it off. One blue inlay was pried loose.",
    "The bronze cat on the Hall 3 plinth was back in its place, but facing the wall. Its square base had been wiped clean.",
    "Museum ledger: the mask was bought in May from Durrell Galleries for $180,000, on Durrell’s papers alone. No outside expert.",
  ],

  photo: { caption: "The marble stair, gala night", scene: "mansion" },

  // The watchman's report carries the code as one garbled line.
  evidence: [
    { id: "watch-report", kind: "report", label: "Night Watch · East Wing", note: "10:00 Hall 3 lit. Dr. F. and a gent with a cigar. Told them no." },
    { id: "records-key", kind: "key", label: "Records Room · Basement", note: "Signed out 9:45 p.m., T. Delancey. Back 10:15. Purchase file." },
    { id: "craftsman-ad", kind: "classified", label: "Courier Classifieds · 1946", note: "Craftsman wanted. Gold leaf, glass inlay, fine copies. Box D-7." },
  ],

  cipher: {
    hiddenOn: "evidence:watch-report",
    plaintext: "THE BLUE IN THE INLAYS IS A MODERN PAINT. THE MASK IS NEW.",
    shift: 2,
    keepWords: ["MODERN"],
    doodle: "mask",
  },

  solution: { suspectId: "durrell", motiveId: "forgery", weaponId: "cat" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "The mask of Princess Senet came out of a workshop in 1946, and Sylvan Durrell sold it to Riverside for " +
        "$180,000. At the gala Lionel Falkner put a loupe to the blue inlays and saw modern paint. Durrell followed him " +
        "into Hall 3 just before ten and struck him with the bronze cat. He set it back on its plinth, turned out the " +
        "lights, and was in the rotunda with a fresh cigar when the watchman found the body.",
      saved:
        "Theda Delancey had the best reason to hate Falkner and nobody to vouch for her in the basement. With Durrell " +
        "charged, the police let her go. The mask came out of its case that same week.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Sylvan Durrell, hiding the forged mask he had sold the museum. He followed Falkner into Hall 3 and " +
        "struck him with the bronze cat from its plinth, then went back to the rotunda and lit another cigar.",
      cost:
        "It went down as a burglar surprised at his work, and nobody was charged. The mask stayed on show for years, " +
        "and Durrell sold three more like it out west.",
    },
  },

  shareLine: "Look closer at the gold.",
};
