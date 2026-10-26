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
      description: "Twenty-four, and he hits like a mule. Seen twice this fall at the Peacock Lounge with Rourke’s wife.",
      statement: {
        text: "It was a short left, nothing on it. He was glassy before I threw it. I’ve seen drunks walk straighter.",
        isLie: false,
      },
    },
    {
      id: "dunn",
      name: "Sal Dunn",
      role: "The trainer",
      description: "Trained Rourke since the kid was sixteen. He tapes the hands and mixes the water in the corner.",
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
      id: "ganz",
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
        text: "Sal sent me for ice after the sixth. When I got back there was a new bottle in the bucket.",
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
    "Brennan’s left barely bruised the jaw, the autopsy found. Rourke died of chloral, a heavy dose, swallowed minutes before.",
    "The water bottle from Rourke’s corner is thick with chloral. Brennan’s gloves and corner bottle are clean.",
    "Rourke telephoned the state boxing commission Friday and booked an appointment for Thursday morning.",
    "Bank ledger, Baltimore, March ’45: Sal Dunn paid off a $3,000 note the week Rourke lost a fight he led.",
  ],

  photo: { caption: "Ironside A.C., fight night", scene: "ring" },

  // Rourke's scrawl is pencilled on the Baltimore stub.
  evidence: [
    { id: "baltimore-stub", kind: "stub", label: "Baltimore Arena · Mar. 9, 1945", note: "Rourke vs. Dade · 10 rounds · Ringside, Row B · Admit One" },
    { id: "chloral", kind: "prescription", label: "Dr. L. Abrams", note: "Chloral hydrate 10 gr at bedtime — Mrs. R. Rourke — 30 caps" },
    { id: "vial-prints", kind: "fingerprint", label: "Pill vial, Rourke’s corner", note: "Found in the slop bucket, empty. Wiped clean. No prints at all." },
  ],

  cipher: {
    hiddenOn: "evidence:baltimore-stub",
    plaintext: "THE BALTIMORE FIGHT WAS SOLD. THURSDAY I TELL THE COMMISSION.",
    shift: 22,
    keepWords: ["BALTIMORE"],
    doodle: "bell",
  },

  solution: { suspectId: "dunn", motiveId: "fix", weaponId: "bottle" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Sal Dunn sold Tommy Rourke’s Baltimore fight in ’45 and paid his note with the money. The kid worked it out " +
        "and booked a Thursday with the commission. Sal lifted Rita’s sleeping pills at the gym, emptied them into a " +
        "fresh bottle after the sixth, and handed it over. Rourke was going down from the chloral before Brennan’s punch landed.",
      saved:
        "Joe Brennan keeps his license. He fights again in the spring, at the Ironside.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Sal Dunn, Rourke’s own trainer, burying the fight he sold in Baltimore. After the sixth he poured the " +
        "kid a fresh water bottle, doped with the chloral he had lifted from Rita Rourke at the gym.",
      cost:
        "The commission called it a ring death and closed the file. Joe Brennan hung up his gloves. Two years later " +
        "another of Sal Dunn’s fighters lost a fight he was winning.",
    },
  },

  shareLine: "Some fights are lost in the corner.",
};
