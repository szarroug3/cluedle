// Case 5: The Gull Point Light. Drafted by Claude; edit freely.

export default {
  id: "gull-point-light",
  title: "The Gull Point Light",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Lighthouse Keeper Found Dead in Harbor",
    dateline: "RIVERSIDE HEIGHTS, Jan. 13, 1947",
    body:
      "Silas Wren, 64, keeper of the Gull Point light for thirty years, was pulled from the harbor below the " +
      "breakwater at dawn Sunday. Fisherman Royce Tolliver spotted the body as he cast off at five.\n" +
      "Wren’s cottage door stood open and his lamp still burned. Locker three in the boathouse, where he kept the " +
      "station logbook under his own key, was found empty.\n" +
      "Police called it a slip on the ice, or worse; friends say Wren had been low since his wife died. His assistant, " +
      "Eli Banning, will tend the light until a new keeper is named.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "tolliver",
      name: "Royce Tolliver",
      role: "The fisherman",
      description: "Skippers the Mary Clare, the trawler with the green wheelhouse. First boat out every morning.",
      statement: {
        text: "I cast off at five and saw him floating by the breakwater. I hadn’t been out to Gull Point in a month.",
        isLie: true,
        truthOptions: [
          "He rowed out to Gull Point the night before",
          "He was drinking at the Gull’s Nest until dawn",
          "He didn’t cast off until seven",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "banning",
      name: "Eli Banning",
      role: "The assistant keeper",
      description: "He’s twenty-four and tired of polishing another man’s lens. Wren’s death could get him the light.",
      statement: {
        text: "I kept the lamp-room watch till four. Near one a boat came in running dark, and a dory rowed to our slip.",
        isLie: false,
      },
    },
    {
      id: "shaw",
      name: "Dottie Shaw",
      role: "The barmaid",
      description: "Pours at the Gull’s Nest. Borrowed two hundred dollars from Silas in the fall; hasn’t repaid a cent.",
      statement: {
        text: "Royce paid his tab at eleven. Said he was rowing out to Gull Point to talk sense into the old man.",
        isLie: false,
      },
    },
    {
      id: "kessler",
      name: "Dutch Kessler",
      role: "The harbormaster",
      description: "Runs the harbor office on a city salary and drives a brand-new Buick. Silas wrote him complaints.",
      statement: {
        text: "Silas wrote me twice about a boat running dark. I meant to look into it come Monday. Honest.",
        isLie: false,
      },
    },
    {
      id: "hester",
      name: "Hester Wren",
      role: "The daughter",
      description: "Came home from Boston for Christmas and stayed. Her father’s savings book shows four thousand dollars.",
      statement: {
        text: "Father wrote me he’d seen something on the water he couldn’t keep to himself. He wasn’t low. He was angry.",
        isLie: false,
      },
    },
    {
      id: "merriweather",
      name: "Ida Merriweather",
      role: "The cannery owner",
      description: "Wants Gull Point for a new cannery. Silas told her the light would stand long after she was gone.",
      statement: {
        text: "I made Silas a fair offer for the point in December. He refused. Saturday I was home with my ledgers by six.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "smuggling", text: "To protect a smuggling run" },
    { id: "savings", text: "To inherit his savings" },
    { id: "promotion", text: "To take over the light" },
    { id: "bribes", text: "To hide harbor bribes" },
    { id: "debt", text: "To wipe out a personal debt" },
    { id: "land", text: "To get the Gull Point land" },
  ],

  weapons: [
    { id: "pin", name: "A belaying pin", detail: "Harbor boats" },
    { id: "oar", name: "A dory oar", detail: "Keeper’s slip" },
    { id: "shovel", name: "A coal shovel", detail: "Cottage stove" },
    { id: "boathook", name: "A boat hook", detail: "Harbor office" },
    { id: "tablets", name: "Sleeping tablets", detail: "Medicine cabinet" },
    { id: "water", name: "Cold harbor water", detail: "The breakwater" },
  ],

  clues: [
    "Post-mortem: no water in the lungs, no pills in the blood. Wren was dead before he went in, from one blow behind the ear.",
    "Wren to the harbormaster, Jan. 6: “Same boat running dark at 1 a.m. Act, or I go to Customs.” It was never answered.",
    "Dredged from the mud below the cottage slip: a belaying pin with gray hair on it. Dories carry none; trawlers do.",
    "Customs searched the Mary Clare: forty cases of untaxed whisky under the ice, and Wren’s logbook in the wheelhouse.",
  ],

  photo: { caption: "Gull Point Light, summer ’46", scene: "harbor" },

  // Wren's lamp-room log carries the scrawl as one odd entry.
  evidence: [
    { id: "watch-log", kind: "ledger", label: "Gull Pt. lamp-room log", note: "1/11 lit 4:55, S.W. | watch to E.B. 12:00 | fog bell from 2:10" },
    { id: "cannery-letter", kind: "letter", label: "Merriweather Packing Co.", note: "Mr. Wren, my offer for the point stands. Think of Hester. I.M." },
    { id: "deposit", kind: "slip", label: "Harbor Savings Bank", note: "Dep. cash $1,150.00 · Acct. Mary Clare · Jan. 11, 1947" },
  ],

  cipher: {
    hiddenOn: "evidence:watch-log",
    plaintext: "A BOAT RUNS DARK PAST THE LIGHT AT ONE. IF I TURN UP DROWNED, I DID NOT FALL.",
    shift: 3,
    keepWords: ["DROWNED"],
    doodle: "key",
  },

  solution: { suspectId: "tolliver", motiveId: "smuggling", weaponId: "pin" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Royce Tolliver had been running untaxed whisky in under the Gull Point light all winter, and Silas Wren had " +
        "logged every trip. When Wren threatened Customs, Tolliver rowed out to the slip, struck him down with a belaying " +
        "pin off the Mary Clare, took the logbook, and rolled him into the harbor. At five he cast off and found the body himself.",
      saved:
        "Eli Banning had no alibi and a reason to want Wren gone. With Tolliver charged, the police leave him alone, " +
        "and the light is his.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Royce Tolliver, protecting his whisky run. He clubbed Silas Wren with a belaying pin at the cottage slip, " +
        "put him in the harbor, and was first on the scene at dawn to find him.",
      cost:
        "Wren’s death was ruled a fall on the ice. Tolliver ran whisky for six more years. Eli Banning had seen the dark " +
        "boat, and his body was found below the breakwater that June.",
    },
  },

  shareLine: "Keep the light burning.",
};
