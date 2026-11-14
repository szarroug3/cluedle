// Case 44: The Night Round. Drafted by Claude; edit freely.

export default {
  id: "night-round",
  title: "The Night Round",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Damage-Suit Lawyer Dies in Hospital Bed",
    dateline: "RIVERSIDE, Dec. 6, 1947",
    body:
      "Thaddeus Ruark, 64, Riverside’s best-known damage-suit lawyer, died early Friday in Ward 10 at Riverside " +
      "General Hospital, four days after an operation on his gallbladder.\n" +
      "The night nurse found him past saving on her three o’clock round. He had told visitors he was mending fast, " +
      "and that he was planning “the biggest suit of my life” from his hospital bed.\n" +
      "Ruark won more than two hundred cases against railroads, landlords and doctors. The hospital calls the death " +
      "“unexpected.” Police have asked the night staff not to leave town.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "grail",
      name: "Dr. Lucian Grail",
      role: "The surgeon",
      description: "Took out Ruark’s gallbladder on Monday. The best pair of hands in the hospital, and the most expensive.",
      statement: {
        text: "I looked in on Mr. Ruark at half past one, on my way home. He was sleeping soundly, and I left him that way.",
        isLie: false,
      },
    },
    {
      id: "fallon",
      name: "Bridget Fallon",
      role: "The night nurse",
      description: "Twelve years of nights on Ward 10. Ruark complained to the matron that she gave him the wrong pill on Tuesday.",
      statement: {
        text: "I rang for the orderly at a quarter to two and again at three, and he never came. On my round at ten past three Mr. Ruark was cold and wet through.",
        isLie: false,
      },
    },
    {
      id: "pickering",
      name: "Clem Pickering",
      role: "The orderly",
      description: "Owes money to half the porters in the building. Ruark said a wallet went missing from his locker on Tuesday.",
      statement: {
        text: "I was on Ward 10 the whole night, mopping and fetching for Miss Fallon. I never left the floor.",
        isLie: true,
        truthOptions: [
          "He was in the boiler room, shooting dice",
          "He was asleep in the doctors’ room",
          "He was at Mr. Ruark’s bed with a syringe",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "celia",
      name: "Celia Ruark",
      role: "The wife",
      description: "Ruark’s second wife, thirty years younger. His will leaves her everything.",
      statement: {
        text: "I left at nine when visiting ended and went home to bed. Thaddeus was in high spirits, planning a new lawsuit from his pillow.",
        isLie: false,
      },
    },
    {
      id: "strunk",
      name: "Abel Strunk",
      role: "The patient in the next bed",
      description: "Diabetic, with a leg in plaster. Ruark’s suit cost him his hardware store in 1946. Neither man asked to be moved.",
      statement: {
        text: "My leg kept me awake all night. After midnight only one man came to that bed, in a white coat, and the nurse was gone down the hall while he was there.",
        isLie: false,
      },
    },
    {
      id: "marchetti",
      name: "Dr. Philip Marchetti",
      role: "The resident",
      description: "The house doctor on night call. Ruark caught him asleep on duty Tuesday and swore to have him thrown out.",
      statement: {
        text: "I slept in the doctors’ room on the second floor until Miss Fallon came for me at a quarter past three. He died at half past, and nothing I did helped.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "suit", text: "To stop a damage suit" },
    { id: "inherit", text: "To inherit the Ruark money" },
    { id: "store", text: "Revenge for a lost store" },
    { id: "wallet", text: "To hide a stolen wallet" },
    { id: "dose", text: "To cover a dosing mistake" },
    { id: "residency", text: "To keep his residency" },
  ],

  weapons: [
    { id: "insulin", name: "Insulin", detail: "Ward medicine cupboard" },
    { id: "pillow", name: "A pillow", detail: "Ruark’s bed" },
    { id: "morphine", name: "Morphine", detail: "Drug cabinet" },
    { id: "ether", name: "Ether", detail: "Operating theater" },
    { id: "scalpel", name: "A scalpel", detail: "Dressing tray" },
    { id: "digitalis", name: "Digitalis drops", detail: "Ward medicine cupboard" },
  ],

  clues: [
    "The coroner: almost no sugar left in his blood, and a needle mark in his arm that no chart accounts for. Insulin, and a great deal of it.",
    "The ward’s insulin, kept for Mr. Strunk’s morning dose, is short more than eighty units since Miss Fallon’s midnight count.",
    "An X-ray Ruark had taken Wednesday: a steel surgical clamp, left inside him after Monday’s operation.",
    "The basement ice room log: Miss Fallon signed for a bucket of ice at 1:35 a.m. Ward 10 had no nurse for ten minutes.",
  ],

  photo: { caption: "Ward 10, the night desk", scene: "office" },

  // Afraid to accuse a doctor, Miss Fallon pencilled what she knew on the back of the ward snapshot,
  // in a code keyed to her ward. The boiler-room slip catches the orderly.
  evidence: [
    { id: "iou", kind: "slip", label: "Boiler room, torn laundry slip", note: "2 a.m. C.P. owes Shorty $4. Dice." },
    { id: "will", kind: "envelope", label: "Last Will of Thaddeus Ruark", note: "Everything to my wife, Celia. Dated 1945. Kept in his bedside drawer." },
    { id: "judgment", kind: "report", label: "Riverside County Court, 1946", note: "Ruark for the plaintiff. Strunk Hardware to pay $9,000. Store sold to cover it." },
  ],

  cipher: {
    hiddenOn: "photo",
    plaintext: "THE DOCTOR SENT ME FOR ICE AT HALF PAST ONE. NOBODY WATCHED THE CUPBOARD.",
    shift: 10,
    keepWords: ["ICE", "CUPBOARD"],
    doodle: "clock",
  },

  solution: { suspectId: "grail", motiveId: "suit", weaponId: "insulin" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "On Wednesday Thaddeus Ruark had himself X-rayed and found the steel clamp Dr. Lucian Grail left in him. He " +
        "meant to sue Grail out of practice. At half past one Friday morning Grail came to Ward 10, sent Miss Fallon " +
        "down for ice, filled a syringe from the insulin kept for the man in the next bed, and put it into Ruark’s " +
        "arm. By three o’clock he was past saving.",
      saved:
        "Clem Pickering lied to hide a dice game in the boiler room, and it costs him a week’s pay. Bridget Fallon, " +
        "who was too afraid to accuse a surgeon, never has to.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Dr. Lucian Grail, the surgeon, stopping the suit over the clamp he left inside Ruark. He sent the " +
        "night nurse for ice and gave Ruark the insulin kept for the next bed.",
      cost:
        "The hospital put it down to heart failure after surgery. Grail signed the certificate himself, and Miss " +
        "Fallon was let go for leaving her ward.",
    },
  },

  shareLine: "Make the rounds on time.",
};
