// Case 11: Dead Air. Drafted by Claude; edit freely.

export default {
  id: "dead-air",
  title: "Dead Air",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Radio Star Dies on the Air at WRVD",
    dateline: "RIVERSIDE, Mar. 19, 1947",
    body:
      "Lyle Corbin, 41, star of the WRVD crime drama “Midnight Alley,” was found dead in a studio booth Tuesday " +
      "night, minutes after listeners heard him scream on the air.\n" +
      "The scream went out at 9:24 by the studio clock, which has run fourteen seconds fast since the war. When the " +
      "show signed off at 9:30, the cast found Corbin strangled in Booth B, down the hall from Studio A, where the " +
      "rest of the company stood at their microphones.\n" +
      "WRVD broadcasts from the top of the Carlton Building on Main Street. Some two hundred thousand listeners tune " +
      "in each Tuesday. Police have questioned the cast.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "aldridge",
      name: "Wynn Aldridge",
      role: "The villain",
      description: "Plays the heavy on Midnight Alley. Sits in on Corbin’s Thursday poker game and mostly loses.",
      statement: {
        text: "At 9:24 I was at the mike in Studio A with Clara, shouting my lines down a prop telephone. Twenty people watched me.",
        isLie: false,
      },
    },
    {
      id: "bancroft",
      name: "Clara Bancroft",
      role: "The leading lady",
      description: "Corbin’s ex-wife and his co-star for six years. She thought they were going to Hollywood together.",
      statement: {
        text: "Coming back from the powder room at 9:14 I passed Booth B. Lyle was in there in his hat and coat. He didn’t look up.",
        isLie: false,
      },
    },
    {
      id: "brackett",
      name: "Ned Brackett",
      role: "The sound man",
      description: "Runs the sound turntables and the thunder sheet. Corbin had him fired once, and the union put him back.",
      statement: {
        text: "Miss Bancroft was back at her mike by 9:15. Mr. Aldridge came in at 9:17, still putting out a cigarette.",
        isLie: false,
      },
    },
    {
      id: "calder",
      name: "Hugh Calder",
      role: "The engineer",
      description: "Runs the board in the control room. Corbin told the manager he’d smelled gin on Hugh twice this month.",
      statement: {
        text: "Lyle did act three live from Booth B. I had his mike open the whole scene and heard every word he said.",
        isLie: true,
        truthOptions: [
          "He played Corbin’s scene off the rehearsal disc",
          "He left the board to the sound man in act three",
          "He had Booth B’s mike shut and heard nothing",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "abbott",
      name: "Percy Abbott",
      role: "The announcer",
      description: "Reads the soap ads in a voice like warm syrup. Corbin wanted the sponsor to hire a younger man.",
      statement: {
        text: "I read the soap spot at 9:12 and the promo after it. I never left the announce desk till we signed off at 9:30.",
        isLie: false,
      },
    },
    {
      id: "cole",
      name: "June Cole",
      role: "The script girl",
      description: "Keeps the studio log and the stopwatch. Her kid brother lost his WRVD job after Corbin complained.",
      statement: {
        text: "Lyle had a cab at the side door at 9:15 for a show across town. He said Hugh had act three covered, not to fuss.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "poker", text: "To cancel his poker debts" },
    { id: "hollywood", text: "To stop his Hollywood move" },
    { id: "firing", text: "Revenge for getting him fired" },
    { id: "gin", text: "To hide his drinking on duty" },
    { id: "announcer", text: "To keep his announcing job" },
    { id: "brother", text: "To avenge her brother’s firing" },
  ],

  weapons: [
    { id: "patch-cord", name: "A patch cord", detail: "Control room" },
    { id: "mike-stand", name: "A mike stand", detail: "Booth B" },
    { id: "blank-pistol", name: "A blank pistol", detail: "Sound-effects cart" },
    { id: "muffler", name: "A silk muffler", detail: "Corbin’s coat" },
    { id: "axe", name: "A fire axe", detail: "Hall cabinet" },
    { id: "drops", name: "Sleeping drops", detail: "Clara’s handbag" },
  ],

  clues: [
    "The coroner: strangled from behind with a thin braided cord. One small round bruise where a metal tip pressed in.",
    "The coroner adds that a man strangled from behind can’t make a sound. The scream on the air ran three full seconds.",
    "The station’s air check of the 9:24 scream skips at the same spot as the 6:00 rehearsal disc. Same crack, same groove.",
    "In Corbin’s billfold: poker IOUs signed W.A., $3,800 in all. Across one, in Corbin’s hand: “Friday, or the sponsor hears.”",
  ],

  photo: { caption: "Studio A, WRVD, on the air", scene: "office" },

  // The studio log sheet carries the code as one more row. The telegram and the card are Corbin's.
  evidence: [
    { id: "studio-log", kind: "ledger", label: "WRVD Studio A · Log, 3/18", note: "6:00 dress, Bth B cut to TD-2 | 9:12 soap spot P.A. | 9:18 act 3" },
    { id: "wbnx-wire", kind: "telegram", label: "Western Union · Downtown", note: "CORBIN WBNX NEEDS YOU 930 SHARP STOP CAB AT SIDE DOOR 915 STOP" },
    { id: "agent-card", kind: "card", label: "Cady & Birch, Talent Agents", note: "Lyle — the Coast wants you, not Clara. Sign by the 1st. —M.C." },
  ],

  cipher: {
    hiddenOn: "evidence:studio-log",
    plaintext: "HUGH ROLLED THE DRESS DISC AT NINE EIGHTEEN. NO TRANSCRIBED NOTICE WAS READ.",
    shift: 14,
    keepWords: ["DISC"],
    doodle: "clock",
  },

  solution: { suspectId: "aldridge", motiveId: "poker", weaponId: "patch-cord" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Wynn Aldridge owed Lyle Corbin $3,800 at poker, due Friday. He knew Corbin’s act-three scene would come off " +
        "the rehearsal disc so Corbin could make his cab. At the 9:12 break he followed Corbin to Booth B and strangled " +
        "him with a patch cord from the control room as he buttoned his coat. At 9:24 he stood at the mike in front of " +
        "twenty people while the disc screamed for a dead man.",
      saved:
        "Hugh Calder loses his job for playing a disc without saying so, and nothing worse. Clara Bancroft, who was seen " +
        "at Booth B with her own reason to hate Corbin, is never charged.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Wynn Aldridge, to wipe out $3,800 in poker debts. He strangled Corbin with a patch cord in Booth B at a " +
        "quarter past nine, then stood at the mike while a rehearsal disc screamed at 9:24.",
      cost:
        "The coroner’s jury found murder by persons unknown. The rehearsal disc went into the station vault, and the " +
        "Thursday game moved to Aldridge’s flat.",
    },
  },

  shareLine: "The scream came right on cue.",
};
