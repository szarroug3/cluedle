// Case 17: The Stand-In. Drafted by Claude; edit freely.

export default {
  id: "stand-in",
  title: "The Stand-In",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Stuntman Killed in Backlot Car Crash",
    dateline: "CULVER CITY, Calif., Aug. 19, 1947",
    body:
      "Rusty Haig, 34, a stunt driver for Halcyon Pictures, was killed at noon Tuesday when the roadster he drove " +
      "for the cameras failed to stop on the studio’s Western Street and struck the wall of Stage 9.\n" +
      "Haig was doubling for Lance Ingram, who rose from the chorus line to star in twenty-three pictures. The gag " +
      "called for the car to skid through a fruit stand and stop short of the cameras. It never slowed.\n" +
      "Producer Irving Hessler, forty days behind on “Dust Over Dry Creek,” has shut the set. The studio calls it an " +
      "accident and will not say who rigged the car.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "lance",
      name: "Lance Ingram",
      role: "The star",
      description: "Halcyon’s biggest star. Does his own driving for the fan magazines. The columns say his wife strays.",
      statement: {
        text: "I came in sick as a dog from last night. Clifford sat with me in makeup. At half eleven Rusty took my drive in my hat and coat.",
        isLie: false,
      },
    },
    {
      id: "fay",
      name: "Fay Ingram",
      role: "The star’s wife",
      description: "A starlet once. Lance is leaving her for a dancer, and his lawyers mean to leave her broke.",
      statement: {
        text: "I was home in Brentwood all morning with a headache. I never heard about poor Rusty till the studio telephoned.",
        isLie: true,
        truthOptions: [
          "She visited Rusty’s trailer and left by 10:10",
          "She came on the lot to see Irving Hessler",
          "She watched the gag from behind the cameras",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "hessler",
      name: "Irving Hessler",
      role: "The producer",
      description: "Producer of “Dust Over Dry Creek.” Forty days behind, and the bank wants its money by Friday.",
      statement: {
        text: "I spent the morning on yesterday’s rushes. Came down to Western Street at noon to watch Lance earn his money.",
        isLie: false,
      },
    },
    {
      id: "iverson",
      name: "Augie Iverson",
      role: "The stunt boss",
      description: "Rigs every gag on the lot. Owed Rusty Haig six hundred dollars in poker markers.",
      statement: {
        text: "I pumped that brake pedal myself at half past ten. Hard as a rock. Then I was up on the camera platform till noon.",
        isLie: false,
      },
    },
    {
      id: "bea",
      name: "Bea Gorham",
      role: "The script girl",
      description: "Logs every take to the minute. Lance Ingram broke off their engagement in May.",
      statement: {
        text: "Augie never left the platform. My log says 11:40, ‘Haig doubles Ingram.’ That’s the first anybody on the crew heard of it.",
        isLie: false,
      },
    },
    {
      id: "hume",
      name: "Clifford Hume",
      role: "The second lead",
      description: "Plays the sheriff. If Lance Ingram can’t finish the picture, the studio has promised Hume the lead.",
      statement: {
        text: "I was in the makeup chair from ten. Lance came in green at half past and never left. At half eleven he sent me for Rusty.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "policy", text: "To collect the star’s insurance" },
    { id: "role", text: "To take over the leading role" },
    { id: "markers", text: "To wipe out a gambling debt" },
    { id: "engagement", text: "Revenge for a broken engagement" },
    { id: "jealousy", text: "Jealousy over his wife’s lover" },
    { id: "divorce", text: "To be free of a faithless husband" },
  ],

  weapons: [
    { id: "brake-line", name: "A cut brake line", detail: "Stunt roadster" },
    { id: "throttle", name: "A wedged throttle", detail: "Stunt roadster" },
    { id: "wheel", name: "A loosened wheel", detail: "Prop garage" },
    { id: "coffee", name: "Doped coffee", detail: "Catering wagon" },
    { id: "rifle", name: "A live round", detail: "Sheriff’s rifle" },
    { id: "tire-iron", name: "A tire iron", detail: "Prop garage" },
  ],

  clues: [
    "The coroner: every injury came from the wheel and the windshield. No bullet, no drug, no blow before the crash.",
    "A grip saw the driver stamp the brake three times before the fruit stand. The car never slowed. All four wheels held.",
    "Brake fluid had soaked deep into the dirt under the roadster’s stall. The line was cut well over an hour before noon.",
    "The projectionist: Mr. Hessler left during reel three, at twenty to eleven, and came back with grease on his cuff.",
  ],

  photo: { caption: "Western Street, Halcyon backlot", scene: "theater" },

  // The insurers' wire carries the code as one garbled line.
  evidence: [
    { id: "wire", kind: "telegram", label: "Western Union · Hartford", note: "M HESSLER HALCYON STOP COVER ON INGRAM RENEWED TO SEPT 30 STOP" },
    { id: "gate-stub", kind: "stub", label: "Halcyon Pictures · Main Gate", note: "Visitor 0412 · Mrs. L. Ingram · To Trailer 6 · In 9:40 Out 10:10" },
    { id: "bromide", kind: "prescription", label: "Dr. N. Garber, Infirmary", note: "Bromide powder, one now — Mr. L. Ingram — Makeup, 10:35 a.m." },
  ],

  cipher: {
    hiddenOn: "evidence:wire",
    plaintext: "IF THE STAR DIES BEFORE THE PICTURE WRAPS THE POLICY PAYS IT ALL",
    shift: 23,
    keepWords: ["POLICY"],
    doodle: "star",
  },

  solution: { suspectId: "hessler", motiveId: "policy", weaponId: "brake-line" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Irving Hessler’s picture was forty days behind and his bank wanted its money by Friday. A dead star would pay " +
        "back every dollar. At twenty to eleven he left the projection room and cut the roadster’s brake line. He " +
        "never heard that Lance Ingram came in too sick to drive, or that at half past eleven Rusty Haig put on " +
        "Lance’s hat and coat.",
      saved:
        "Augie Iverson rigged the car and would have taken the blame for it. He keeps his card with the stuntmen’s " +
        "guild, and Fay Ingram’s visit to Trailer 6 stays out of the papers.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Irving Hessler, after the studio’s insurance on Lance Ingram. He cut the roadster’s brake line at " +
        "twenty to eleven, meaning it for Lance. He never knew Rusty Haig would take the drive.",
      cost:
        "The crash went down as bad rigging, and Augie Iverson never worked in pictures again. Lance Ingram finished " +
        "the picture and went back to doing his own driving.",
    },
  },

  shareLine: "Check who was behind the wheel.",
};
