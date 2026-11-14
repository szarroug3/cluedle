// Case 43: Live from Studio A. Drafted by Claude; edit freely.

export default {
  id: "studio-a",
  title: "Live from Studio A",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Television Host Dies on the Air",
    dateline: "RIVERSIDE, Dec. 5, 1947",
    body:
      "Larry Kendrick, 44, host of “The Kendrick Hour” on the city’s new television station, WRVT, died on the air " +
      "Thursday night before everyone watching Channel 9.\n" +
      "At half past eight Kendrick took hold of the standing microphone to bring on his singer, shook, and fell to " +
      "the studio floor. The camera stayed on him for several seconds before the station put up its test pattern.\n" +
      "Some four hundred sets in Riverside can get the station. Kendrick, a radio comic before the war, liked to call " +
      "himself “the first face in television.” Police carried the microphone away in a sack.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "larue",
      name: "Bonnie Larue",
      role: "The singer",
      description: "Sings two numbers a night on “The Kendrick Hour.” Spent the war wiring radio sets at the plant in Camden.",
      statement: {
        text: "I sang my first number at a quarter past eight, then stood by camera two for my cue. I never laid a finger on Larry’s microphone on the air.",
        isLie: false,
      },
    },
    {
      id: "pitts",
      name: "Ansgar Pitts",
      role: "The engineer",
      description: "Built the station’s transmitter out of Army surplus. Kendrick had him docked a week’s pay for a dead camera in October.",
      statement: {
        text: "I tested every microphone at seven, and they were all as safe as milk. I never left my board in the booth till we went on the air.",
        isLie: true,
        truthOptions: [
          "He was across the street at Dooley’s Tavern",
          "He was on the studio floor, fixing the host’s plug",
          "He was in the singer’s dressing room",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "delahaye",
      name: "Paulette Delahaye",
      role: "The director",
      description: "Runs the show from the booth and never goes on camera. Kendrick wanted her job for his nephew and told the trade papers so.",
      statement: {
        text: "I came up to the booth at half past seven to eat my sandwich. Ansgar’s chair was empty, and he came back at ten to eight smelling of beer.",
        isLie: false,
      },
    },
    {
      id: "tolan",
      name: "Skip Tolan",
      role: "The announcer",
      description: "Reads the Zephyr Cigarettes commercials on camera. Has stood in for Kendrick twice and would like the chair for good.",
      statement: {
        text: "Herbie and I ate supper in the green room from a quarter past seven to a quarter to eight. Then we all took our places for eight.",
        isLie: false,
      },
    },
    {
      id: "ambler",
      name: "Herbie Ambler",
      role: "The cameraman",
      description: "Runs camera two. Kendrick blames him on the air for every bad picture and calls him “Butterfingers.”",
      statement: {
        text: "I had Larry in my lens at half past eight. He took hold of the stand to bring Bonnie on, shook all over, and went down.",
        isLie: false,
      },
    },
    {
      id: "mapes",
      name: "Grover Mapes",
      role: "The sponsor’s man",
      description: "From Zephyr Cigarettes, which pays for the show. Kendrick caught him padding the bills for air time.",
      statement: {
        text: "When I came up at twenty past seven, the studio was dark but for one work light by the host’s stand. Somebody was bent over it, and I took it for the engineer.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "contract", text: "To get free of her contract" },
    { id: "docked", text: "Revenge for a docked week’s pay" },
    { id: "director", text: "To keep the director’s chair" },
    { id: "host", text: "To take over the show" },
    { id: "joke", text: "Revenge for being made a joke" },
    { id: "bills", text: "To hide the padded bills" },
  ],

  weapons: [
    { id: "microphone", name: "A rewired microphone", detail: "Host’s stand" },
    { id: "spotlight", name: "A falling spotlight", detail: "Lighting grid" },
    { id: "sandbag", name: "A sandbag", detail: "Fly rail" },
    { id: "cable", name: "A camera cable", detail: "Camera two" },
    { id: "powder", name: "Sleeping powder", detail: "Host’s water glass" },
    { id: "iron", name: "A soldering iron", detail: "Engineer’s bench" },
  ],

  clues: [
    "The doctor: an electric shock, in through both hands. No poison and no blow. The host’s microphone stand was carrying the full house current.",
    "Inside the stand’s plug two wires were crossed and freshly soldered, neat as factory work, then wrapped in friction tape.",
    "On the friction tape: a smear of the pancake makeup worn on camera. Nobody who works off camera wears it.",
    "Kendrick’s lawyer: Kendrick held Bonnie Larue’s contract until 1952, with half of all she earned. She had begged him to release her for a screen test.",
  ],

  photo: { caption: "Studio A, “The Kendrick Hour”", scene: "theater" },

  // Kendrick kept private notes on his own cue cards in a code keyed to his channel. The tavern receipt catches the engineer.
  evidence: [
    { id: "cue-card", kind: "card", label: "Kendrick’s cue card · Segment three", note: "“And now a word from Zephyr…” Under it, a line in his pencil." },
    { id: "tavern-receipt", kind: "receipt", label: "Dooley’s Tavern, across from WRVT", note: "Dec. 4, 7:22 p.m. Two drafts, one ham on rye. Cash." },
    { id: "zephyr-wire", kind: "telegram", label: "Western Union · New York", note: "ZEPHYR RENEWS ONLY IF HOST CHANGES STOP TOLAN ACCEPTABLE STOP AIR TIME BILLS UNDER REVIEW" },
  ],

  cipher: {
    hiddenOn: "evidence:cue-card",
    plaintext: "AFTER THE SHOW, TELL HER: NO RELEASE. NOT FOR HOLLYWOOD, NOT FOR ANYBODY.",
    shift: 9,
    keepWords: ["RELEASE"],
    doodle: "star",
  },

  solution: { suspectId: "larue", motiveId: "contract", weaponId: "microphone" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Larry Kendrick owned Bonnie Larue’s contract until 1952 and half of all she earned, and he would not let her " +
        "go to Hollywood for a screen test. In the supper break, with the engineer across the street at Dooley’s and " +
        "the studio dark, she crossed two wires in his microphone plug and soldered them as neatly as she once wired " +
        "radios in Camden. At half past eight he took hold of the stand.",
      saved:
        "Ansgar Pitts lied to cover half an hour at Dooley’s Tavern that would have cost him his job. Now it costs " +
        "him only the beer money. Skip Tolan, who stood to inherit the show, is cleared.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Bonnie Larue, the singer, getting free of the contract Kendrick held over her. In the supper break " +
        "she rewired his microphone so the stand carried the house current, and he took hold of it on the air.",
      cost:
        "The station called it a wiring fault and fired Ansgar Pitts for it. Bonnie Larue went to her screen test " +
        "the next Monday.",
    },
  },

  shareLine: "Don’t touch that dial.",
};
