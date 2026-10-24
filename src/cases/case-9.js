// Case 9: The Long Count. Drafted by Claude; edit freely.

export default {
  id: "long-count",
  title: "The Long Count",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Fighter Dies After Knockout at Ironside",
    dateline: "RIVERSIDE HEIGHTS, Dec. 14, 1946",
    body:
      "Tommy “Kid” Rourke, 27, the Riverside middleweight, died early Saturday, hours after he was knocked out at the " +
      "Ironside Boxing Club before a crowd of two thousand, under the brass bell the club has rung for twenty-two years.\n" +
      "Rourke led on every card through six. Seconds after the bell for round seven, a short left from Joe “Hammer” " +
      "Brennan put him on the canvas, and he never stirred at the count of ten.\n" +
      "Brennan, 24, was held overnight and released. “I’ve hit men harder,” he told this paper. Manager Manny Ganz " +
      "called it “the fight game.” The district attorney has not ruled out charges.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "brennan",
      name: "Joe Brennan",
      role: "The opponent",
      description: "Twenty-four, hungry, and hits like a mule. Seen twice this fall at the Starlight with Rourke’s wife.",
      statement: {
        text: "It was a short left, nothing on it. He was glassy before I threw it. I’ve seen drunks walk straighter.",
        isLie: false,
      },
    },
    {
      id: "pell",
      name: "Sal Dunn",
      role: "The trainer",
      description: "Trained Rourke since the kid was sixteen. Tapes the hands, mixes the water, never misses a fight.",
      statement: {
        text: "I filled Tommy’s bottle before the fight and never touched another. Anybody at ringside could’ve got to it.",
        isLie: true,
        truthOptions: [
          "He poured a fresh bottle himself after the sixth",
          "He left the bottle with the manager all night",
          "He was in the dressing room during round six",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "kessel",
      name: "Manny Ganz",
      role: "The manager",
      description: "Takes half of every purse. Took out a $10,000 policy on his fighter last spring, “strictly business.”",
      statement: {
        text: "The first bottle was near dry by the fifth. After the sixth Tommy drank half a fresh one while I hollered at the ref.",
        isLie: false,
      },
    },
    {
      id: "ruiz",
      name: "Hector Ruiz",
      role: "The cut man",
      description: "Stops the bleeding for a dollar a round. Owes Vince Lasko more than he’ll earn in a year.",
      statement: {
        text: "Sal sent me for ice after the sixth. When I got back he was screwing the cap on a new bottle.",
        isLie: false,
      },
    },
    {
      id: "lasko",
      name: "Vince Lasko",
      role: "The bookmaker",
      description: "Runs a book out of the Ironside’s back room. Laid heavy money that Rourke would go down in seven.",
      statement: {
        text: "Sure, I had Brennan in seven. Smart money did. I sat in row two all night with three witnesses and a cigar.",
        isLie: false,
      },
    },
    {
      id: "rita",
      name: "Rita Rourke",
      role: "The wife",
      description: "Married Tommy two years ago. Tired of waiting up for a man who comes home bleeding.",
      statement: {
        text: "I couldn’t watch. I sat in the ladies’ lounge from round five on. Somebody lifted my sleeping pills at the gym Sunday.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "fix", text: "To bury a fixed fight" },
    { id: "bet", text: "To win a bet on Brennan" },
    { id: "insurance", text: "To collect his life insurance" },
    { id: "affair", text: "To be free for another man" },
    { id: "debt", text: "To clear a gambling debt" },
    { id: "title", text: "To take his title shot" },
  ],

  weapons: [
    { id: "bottle", name: "A doped water bottle", detail: "Rourke’s corner" },
    { id: "hook", name: "A left hook", detail: "Round seven" },
    { id: "glove", name: "A loaded glove", detail: "Brennan’s corner" },
    { id: "flask", name: "A spiked flask", detail: "Manager’s pocket" },
    { id: "salts", name: "Smelling salts", detail: "Cut man’s kit" },
    { id: "blackjack", name: "A blackjack", detail: "Back room" },
  ],

  clues: [
    "The coroner: Brennan’s left barely bruised the jaw. Rourke died of chloral, a heavy dose, swallowed minutes before he fell.",
    "The water bottle from Rourke’s corner is thick with chloral. Brennan’s gloves and corner bottle are clean.",
    "Rourke telephoned the state boxing commission Friday and booked an appointment for Thursday morning.",
    "Bank ledger, Baltimore, March ’45: Sal Dunn paid off a $3,000 note the week Rourke lost a fight he led.",
  ],

  photo: { caption: "Ironside A.C., fight night", scene: "ring" },

  // Decoys. Rourke's own scrawl is pencilled on the photo.
  evidence: [
    { id: "starlight", kind: "matchbook", label: "The Starlight Room", note: "R. — Thurs. 9 — J.B." },
    { id: "bet-slip", kind: "ticket", label: "Lasko · Slip No. 0417", note: "BRENNAN KO 7 — $500" },
    { id: "chloral", kind: "prescription", label: "Dr. L. Abrams", note: "chloral 10 gr h.s. — R.R." },
  ],

  cipher: {
    hiddenOn: "photo",
    plaintext: "MY OWN CORNER SOLD THE BALTIMORE FIGHT. THURSDAY I TELL THE COMMISSION.",
    shift: 22,
    keepWords: ["BALTIMORE", "COMMISSION"],
    doodle: "bell",
  },

  solution: { suspectId: "pell", motiveId: "fix", weaponId: "bottle" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Sal Dunn sold Tommy Rourke’s Baltimore fight in ’45 and paid his note with the money. The kid worked it out " +
        "and booked a Thursday with the commission. Sal lifted Rita’s sleeping pills at the gym, emptied them into a " +
        "fresh bottle after the sixth, and let the bell do the rest. Joe Brennan’s left only finished what the water started.",
      saved:
        "Joe Brennan, who would have stood trial for a punch that barely landed, keeps his license and his good name.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Sal Dunn, Rourke’s own trainer, burying the fight he sold in Baltimore. After the sixth he poured the " +
        "kid a fresh water bottle, doped with chloral lifted from Rita Rourke’s handbag.",
      cost:
        "Joe Brennan was convicted of manslaughter and never fought again. Sal Dunn had a new kid in his corner by " +
        "spring, and went back to selling fights.",
    },
  },

  shareLine: "Some fights are lost in the corner.",
};
