// Case 33: The Two O’Clock Verdict. Drafted by Claude; edit freely.

export default {
  id: "two-oclock-verdict",
  title: "The Two O’Clock Verdict",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Judge Dies in Chambers Before Verdict",
    dateline: "RIVERSIDE, Sept. 18, 1947",
    body:
      "Judge Wendell Yost, 66, was found dead in his chambers at the County Courthouse Thursday, during the noon " +
      "recess of the Vandermeer mill fire trial. He was to give his verdict at two.\n" +
      "Garrett Vandermeer, 31, is charged with burning his family’s mill last winter for $80,000 in insurance. A night " +
      "watchman died in the blaze. Few in the courthouse doubted how the famously hard judge would rule.\n" +
      "Clerks say Yost kept a pen from every big case he heard, twenty-two in all, in a jar on his desk. The jar was " +
      "found knocked to the floor. Police have sealed the third floor.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "vandermeer",
      name: "Garrett Vandermeer",
      role: "The defendant",
      description: "Out on bail and expected to hang. Swears the mill fire started by itself and the watchman was his friend.",
      statement: {
        text: "Miss Underhill and I ate on the courthouse steps from noon till one. Why go upstairs? I knew how he’d rule.",
        isLie: false,
      },
    },
    {
      id: "underhill",
      name: "Edwina Underhill",
      role: "The defense attorney",
      description: "Took the case when no one else would. Yost jailed her overnight for contempt in the first week of trial.",
      statement: {
        text: "Garrett and I sat on the front steps with sandwiches till one. I spent most of it telling him to pack a bag for prison.",
        isLie: false,
      },
    },
    {
      id: "yardley",
      name: "Kenneth Yardley",
      role: "The district attorney",
      description: "Running for attorney general on the Vandermeer case. A conviction at two would have made his campaign.",
      statement: {
        text: "The judge called me in at a quarter past twelve. He said the verdict would keep till two. I left at twenty past.",
        isLie: false,
      },
    },
    {
      id: "wexler",
      name: "Lois Wexler",
      role: "The judge’s secretary",
      description: "Typed every ruling Yost wrote for nine years. Short of money since her husband walked out in June.",
      statement: {
        text: "I was at my desk outside chambers the whole recess. Nobody went in after Mr. Yardley came out at twenty past.",
        isLie: true,
        truthOptions: [
          "She went down to the press room to call a paper",
          "She went into chambers herself at half past twelve",
          "She let Mr. Yardley back in at a quarter to one",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "zimmer",
      name: "Otis Zimmer",
      role: "The bailiff",
      description: "A month short of his pension. Yost had caught him with a flask in the jury room and meant to report it.",
      statement: {
        text: "Tray at twenty to one. Miss Wexler’s chair was empty, and he barked through the door to leave it. At five to one I found him.",
        isLie: false,
      },
    },
    {
      id: "yancey",
      name: "Mabel Yancey",
      role: "The watchman’s widow",
      description: "Her husband Jody died in the mill fire. Yost threw out her lawsuit against the Vandermeers last spring.",
      statement: {
        text: "I never left the gallery all recess. The bailiff sat with me from a quarter to one till he went back up for the tray.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "report", text: "To hide a withheld report" },
    { id: "verdict", text: "To stop a guilty verdict" },
    { id: "contempt", text: "Revenge for a night in jail" },
    { id: "tips", text: "To hide selling court secrets" },
    { id: "pension", text: "To save his pension" },
    { id: "lawsuit", text: "Revenge for a lost lawsuit" },
  ],

  weapons: [
    { id: "bookend", name: "A marble bookend", detail: "Judge’s shelf" },
    { id: "gavel", name: "A walnut gavel", detail: "Courtroom bench" },
    { id: "paperweight", name: "A glass paperweight", detail: "Defense table" },
    { id: "tablets", name: "Heart tablets", detail: "Judge’s drawer" },
    { id: "ashtray", name: "A brass ashtray", detail: "Press room" },
    { id: "cord", name: "A window-blind cord", detail: "Chambers window" },
  ],

  clues: [
    "The coroner: one blow to the back of the head from something heavy with a square edge, after twenty to one. No poison.",
    "One of the pair of marble bookends was gone from Yost’s shelf. It turned up in the third-floor mop sink, washed.",
    "In Yost’s wastebasket, a torn draft in his hand: “…the state never showed the defense the marshal’s finding…”",
    "In Yost’s coat, his signed verdict: Not guilty. Pinned to it, a letter asking the bar to disbar the district attorney.",
  ],

  photo: { caption: "Judge Yost’s chambers, 1946", scene: "office" },

  // Yost penciled the code on the back of a photo of his own chambers.
  evidence: [
    { id: "switchboard", kind: "report", label: "Courthouse Switchboard Memo", note: "12:34–12:55 p.m. Press-room phone to Courier city desk, a woman." },
    { id: "tips-ad", kind: "classified", label: "Courier Classifieds", note: "Courthouse news wanted. $10 a tip, no names. Call MAin 4-2200." },
    { id: "marshal-envelope", kind: "envelope", label: "County Fire Marshal’s Office", note: "Dist. Atty. K. Yardley, PERSONAL. Postmarked Feb. 11, 1947" },
  ],

  cipher: {
    hiddenOn: "photo",
    plaintext: "MARSHAL FOUND BAD WIRING IN THE DYE HOUSE. NOBODY SET THAT FIRE.",
    shift: 22,
    keepWords: ["WIRING"],
    doodle: "pen",
  },

  solution: { suspectId: "yardley", motiveId: "report", weaponId: "bookend" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Judge Yost meant to acquit Garrett Vandermeer at two and ask the bar to disbar Kenneth Yardley, who had sat on " +
        "the fire marshal’s report since February. He told Yardley so at a quarter past twelve. Yardley came back while " +
        "Lois Wexler was downstairs phoning the Courier, struck Yost with a marble bookend from his own shelf, and " +
        "washed it in the mop sink.",
      saved:
        "A new judge reads Yost’s verdict into the record, and Garrett Vandermeer goes home. Mabel Yancey finally hears " +
        "how the fire started.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Kenneth Yardley, hiding the fire marshal’s report he had kept from the defense. When Yost warned him at " +
        "a quarter past twelve, he came back during the recess and struck the judge with the marble bookend from his shelf.",
      cost:
        "The new judge never saw Yost’s draft. Garrett Vandermeer was convicted at a second trial, and Yardley won his " +
        "race for attorney general on it.",
    },
  },

  shareLine: "Don’t assume the verdict.",
};
