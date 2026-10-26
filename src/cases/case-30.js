// Case 30: The Big Top. Drafted by Claude; edit freely.

export default {
  id: "big-top",
  title: "The Big Top",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Ringmaster Dies in Big Top During Finale",
    dateline: "RIVERSIDE, Aug. 6, 1947",
    body:
      "Lucius Thane, 55, ringmaster and owner of the Thane Bros. Circus, was found dead in the big top Tuesday night " +
      "while 1,200 people at the fairgrounds cheered the finale above him.\n" +
      "The lights went down at twenty to ten for the flying act. In a single spotlight the aerialist Carlotta Sorel " +
      "flew forty feet over the ring. When the lights came up, Thane lay by the ring’s back door.\n" +
      "Thane billed his show as “The Circus of Eleven Stars” and had a gold star painted on the center pole for each. " +
      "Police are holding the company at the fairgrounds.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "sorel",
      name: "Carlotta Sorel",
      role: "The aerialist",
      description: "The star of the show, billed as “the Swallow.” Her husband Nils flew with her until his fall last season.",
      statement: {
        text: "Twelve hundred people paid to see the Swallow fly tonight, and the Swallow flew.",
        isLie: false,
      },
    },
    {
      id: "stahl",
      name: "Bruno Stahl",
      role: "The strongman",
      description: "Lifts a pony over his head twice a night. Thane owes him three months’ wages and laughs about it.",
      statement: {
        text: "I hold the flyers’ ladder every finale. Tonight she went up slow and never looked at me once.",
        isLie: false,
      },
    },
    {
      id: "sumner",
      name: "Rafe Sumner",
      role: "The lion tamer",
      description: "Works the cats in the steel arena. Thane meant to sell his lions to a Memphis zoo come fall.",
      statement: {
        text: "I watched the finale from the horse entrance. The palm-reader came through my entrance at twenty to ten asking for Lucius.",
        isLie: false,
      },
    },
    {
      id: "scaife",
      name: "Clyde Scaife",
      role: "The clown",
      description: "Head clown, “Pip.” Thane knew he skipped bail in Ohio and took ten dollars a week to forget it.",
      statement: {
        text: "Clowns go on after the flyers, so I was in clown alley with half my face on. Monty yelled for me at ten.",
        isLie: false,
      },
    },
    {
      id: "strand",
      name: "Ilse Strand",
      role: "The wife",
      description: "Thane’s wife, long separated. Reads palms at county fairs. She gets the circus if he dies before the divorce.",
      statement: {
        text: "I bought a ticket like any rube. Front row, Section A. I watched the flying act and never got up.",
        isLie: true,
        truthOptions: [
          "She left her seat to find Thane about the divorce",
          "She watched from the horse entrance",
          "She left before the finale",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "shales",
      name: "Monty Shales",
      role: "The equestrian director",
      description: "Second in command. Has waited twelve years for the ringmaster’s red coat and top hat.",
      statement: {
        text: "I blew the whistle for the finale at twenty to ten. Lucius walked off toward the back door alone. I thought he was sick.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "fall", text: "Revenge for her husband’s fall" },
    { id: "wages", text: "Over three months’ back pay" },
    { id: "lions", text: "To keep his lions from sale" },
    { id: "bail", text: "To silence a blackmailer" },
    { id: "inherit", text: "To inherit the circus" },
    { id: "coat", text: "To take the ringmaster’s job" },
  ],

  weapons: [
    { id: "rope", name: "A rigging rope", detail: "Flyers’ rigging" },
    { id: "whip", name: "A lion whip", detail: "Steel arena" },
    { id: "rein", name: "A bridle rein", detail: "Horse tent" },
    { id: "stake", name: "A tent stake", detail: "Back-door guy line" },
    { id: "club", name: "A juggling club", detail: "Clown alley" },
    { id: "dumbbell", name: "A dumbbell bar", detail: "Strongman’s stage" },
  ],

  clues: [
    "The coroner: strangled from behind with a cord, quickly and in the dark, by someone strong in the hands and shoulders.",
    "Hemp fibers in the marks, gritty with rosin. The circus rubs rosin on its flying ropes and on its bareback horses.",
    "Last May, Thane cut the flyers’ net to save money. Nils Sorel fell through the gap and has not walked since.",
    "Pearl Tasker, sixteen, admits she flew the finale in Carlotta’s suit and wig. She says Carlotta asked her to.",
  ],

  photo: { caption: "The center ring, finale night", scene: "ring" },

  // The doctor's slip and the wardrobe tag break the aerialist's alibi; the stub puts the wife in the front row.
  // The code is in the Courier's personals.
  evidence: [
    { id: "doctor-slip", kind: "prescription", label: "Dr. Mercer Stiles, M.D.", note: "Miss C. Sorel. Inner ear. No heights for ten days. Aug. 3" },
    { id: "wardrobe-tag", kind: "tag", label: "Thane Bros. Wardrobe · No. 7", note: "Swallow finale suit. Taken in two inches Mon." },
    { id: "gate-stub", kind: "stub", label: "Thane Bros. Circus · Sec. A", note: "Aug. 5, evening. Row 1, Seat 4. Torn at the gate 7:50." },
  ],

  cipher: {
    hiddenOn: "clipping",
    plaintext: "LUCIUS. BACK DOOR WHEN THE LIGHTS GO DOWN. COME ALONE.",
    shift: 11,
    keepWords: ["DOOR"],
    doodle: "star",
  },

  solution: { suspectId: "sorel", motiveId: "fall", weaponId: "rope" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Carlotta Sorel blamed Lucius Thane for the net he cut and for Nils, who never walked again. When the doctor " +
        "kept her off the bar, she saw her chance. Pearl Tasker went up in her suit and wig. Carlotta sent Thane a " +
        "note to meet at the back door, and while every eye was on the spotlight she strangled him with a rigging rope.",
      saved:
        "Bruno Stahl was owed money and had the hands for it, and the police had him in a cell by morning. He is back " +
        "on the strongman’s stage. Pearl Tasker keeps the top of the bill.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Carlotta Sorel, paying Thane back for her husband’s fall. With her understudy flying in her place, she " +
        "slipped to the back door and strangled him with a rigging rope.",
      cost:
        "Twelve hundred people swore they saw Carlotta fly, so the police charged Bruno Stahl. The circus left " +
        "Riverside on Sunday with the Swallow still on the posters.",
    },
  },

  shareLine: "Watch the bar, not the flyer.",
};
