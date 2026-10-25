// Case 8: The Last Edition. Drafted by Claude; edit freely.

export default {
  id: "last-edition",
  title: "The Last Edition",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Night Editor Slain at His Own Desk",
    dateline: "RIVERSIDE HEIGHTS, Jan. 14, 1947",
    body:
      "By Roy Danner, Courier Staff. Walter Brisco, 52, night editor of this newspaper, was found dead at his desk " +
      "in the Courier city room early Tuesday, struck down while the presses ran below him.\n" +
      "Brisco sent the last page down to the press room at two, colleagues say. A copy boy found him at three, " +
      "slumped over the proofs, the green fountain pen he had carried for seventeen years still uncapped in his hand.\n" +
      "Police believe the killer came up the back stairs from the press room. Publisher Harlan Ames called " +
      "Brisco “the conscience of this paper.”",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "danner",
      name: "Roy Danner",
      role: "The crime reporter",
      description: "The Courier’s star. His waterfront rackets series is up for a prize. Wrote up Brisco’s death himself.",
      statement: {
        text: "I left at one for Gus’s diner across the street and sat at the counter till the copy boy came running at three.",
        isLie: false,
      },
    },
    {
      id: "lusk",
      name: "Frances Lusk",
      role: "The rewrite woman",
      description: "Rewrites half the paper in a cloche hat and gets no bylines. Brisco spiked her big story last week.",
      statement: {
        text: "I left at midnight with my hat and gloves and never came back. I was asleep on Kenmore Street by one.",
        isLie: true,
        truthOptions: [
          "She came back at one for her forgotten gloves",
          "She stayed late retyping her spiked story",
          "She went across to the diner with Roy Danner",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "petrakis",
      name: "Spiro Petrakis",
      role: "The press foreman",
      description: "Runs the presses downstairs. Brisco was sitting on a story about the pressmen’s union dues going missing.",
      statement: {
        text: "Last page came down the chute at half past twelve, marked in the chief’s green ink. Nothing else from upstairs all night.",
        isLie: false,
      },
    },
    {
      id: "fisk",
      name: "Sonny Fisk",
      role: "The copy boy",
      description: "Runs copy for a dollar a night. Brisco chewed him out in front of the whole city room on Monday.",
      statement: {
        text: "After the last page went down I dozed on the elevator bench. Miss Lusk came up at one for her gloves. The chief’s lamp was dark.",
        isLie: false,
      },
    },
    {
      id: "whitcomb",
      name: "Harlan Ames",
      role: "The publisher",
      description: "Owns the Courier and wants to sell it to a Chicago chain. Brisco swore the newsroom would walk out first.",
      statement: {
        text: "I left the Elks’ dinner near one and drove home past the building. Saw a woman in a cloche hat hurrying in the front door.",
        isLie: false,
      },
    },
    {
      id: "wren",
      name: "Opal Dunning",
      role: "The morgue clerk",
      description: "Keeps the paper’s files of old clippings. Has carried a torch for Walter Brisco since before his marriage.",
      statement: {
        text: "At eleven the chief asked me for every clipping of the waterfront series. He was still reading them when I left at midnight.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "fakes", text: "To hide his faked stories" },
    { id: "spiked", text: "Revenge for a spiked story" },
    { id: "union", text: "To bury a story on the union" },
    { id: "sale", text: "To clear the way for a sale" },
    { id: "shaming", text: "Revenge for a public shaming" },
    { id: "jealousy", text: "Jealousy over an old love" },
  ],

  weapons: [
    { id: "eagle", name: "A bronze eagle", detail: "Crime desk" },
    { id: "telephone", name: "A desk telephone", detail: "Rewrite bank" },
    { id: "slug", name: "A lead slug", detail: "Composing room" },
    { id: "inkstand", name: "A marble inkstand", detail: "Publisher’s office" },
    { id: "spike", name: "A copy spike", detail: "Night desk" },
    { id: "shears", name: "Paste-up shears", detail: "The morgue" },
  ],

  clues: [
    "The coroner: one blow behind the ear from something heavy and rounded. No struggle and no defensive wounds.",
    "On Brisco’s blotter, in green ink: “9 a.m. — have it out with him. Bring the court records.”",
    "The bronze eagle paperweight turned up in the washroom sink, scrubbed clean but for one grey hair caught in a wing.",
    "The county clerk: not one dockman quoted in the waterfront series appears on any union roll, payroll, or census.",
  ],

  photo: { caption: "The city room, after midnight", scene: "office" },

  // Decoys, plus the morgue slip Brisco signed, which carries the scrawl.
  evidence: [
    { id: "diner", kind: "matchbook", label: "Gus’s All-Night Diner", note: "MAin 6-2290 — R.D. tab" },
    { id: "morgue-slip", kind: "ticket", label: "Courier Morgue · Slip 4471", note: "waterfront ser. 1–6 — W.B." },
    { id: "nitro", kind: "prescription", label: "Dr. L. Amsel", note: "nitro 1/150 gr prn — H.W." },
  ],

  cipher: {
    hiddenOn: "evidence:morgue-slip",
    plaintext: "NO SUCH MEN ON THE DOCKS. HIS SOURCES ARE GHOSTS. FIRE HIM AT NINE.",
    shift: 17,
    keepWords: ["DOCKS", "GHOSTS"],
    doodle: "pen",
  },

  solution: { suspectId: "danner", motiveId: "fakes", weaponId: "eagle" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Roy Danner made up his whole waterfront series, down to the dockmen he quoted. Walt Brisco " +
        "found out and meant to fire him at nine. Before one o’clock Danner brought the bronze eagle down from behind, " +
        "washed it, and crossed to the diner. Then he wrote the story himself and moved the last page to two, to fit his alibi.",
      saved:
        "The police stop looking at Spiro Petrakis, and he goes home to his family. The prize committee pulls Danner’s " +
        "series.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Roy Danner, hiding a prize series he had made up from whole cloth. He struck Brisco with the bronze " +
        "eagle from the crime desk, then wrote the story himself and moved the time of death to fit his alibi.",
      cost:
        "The police took the Courier at its word and charged Spiro Petrakis from the press room. Danner won his prize " +
        "that fall and took over Brisco’s desk.",
    },
  },

  shareLine: "Don’t believe everything you read.",
};
