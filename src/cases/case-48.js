// Case 48: The Wrong Hand. Drafted by Claude; edit freely.

export default {
  id: "wrong-hand",
  title: "The Wrong Hand",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Private Eye Found Shot at His Own Desk",
    dateline: "RIVERSIDE, Dec. 10, 1947",
    body:
      "Jack Sloat, 48, a partner in Sloat & Merrick Investigations, was found dead at his desk in the Ardmore Building " +
      "Tuesday night with a bullet in his head and his own .38 in his hand.\n" +
      "Sloat and Leon Merrick, both off the police force, opened their fourth-floor office in 1933. They have shared one " +
      "secretary, one bottle and one fountain pen for fourteen years. Merrick says Sloat never let him forget whose pen it was.\n" +
      "Police first called it suicide. By midnight they were asking for the night elevator log.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "merrick",
      name: "Leon Merrick",
      role: "The partner",
      description: "Sloat’s partner since 1933. The agency carries insurance on each partner’s life, $20,000 to the one left.",
      statement: {
        text: "I left at six and played pinochle at the Elks till eleven. Ask any of the three I took money from.",
        isLie: false,
      },
    },
    {
      id: "mahaffey",
      name: "Fern Mahaffey",
      role: "The secretary",
      description: "Has typed for both partners since ’38. Sloat promised to marry her once his divorce came through, then never did.",
      statement: {
        text: "I left at five, the same as every night, and sat home with my mother till bed.",
        isLie: true,
        truthOptions: [
          "She went back up to leave her notice on his desk",
          "She went back up to quarrel with Sloat about marrying her",
          "She went back up to take the gun from his drawer",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "tremont",
      name: "Ralph Kessick",
      role: "The city councilman",
      description: "Chairs the council’s streets committee and lunches daily at the Commerce Club. Hired Sloat last spring, he says, over some threatening letters.",
      statement: {
        text: "Sloat rang me at nine and asked me to come up. I told him whatever it was would keep till morning.",
        isLie: false,
      },
    },
    {
      id: "cottle",
      name: "Wilbur Cottle",
      role: "The elevator man",
      description: "Runs the Ardmore’s night car. Sloat caught him letting burglars up to the dentist’s floor, and has taken a cut ever since.",
      statement: {
        text: "Miss Mahaffey rode up at ten to nine and down at ten past. At twenty to ten I heard the shot and took the car up.",
        isLie: false,
      },
    },
    {
      id: "donnelly",
      name: "Shay Donnelly",
      role: "The fired operative",
      description: "Worked for the agency till October, when Sloat fired him for selling a client’s file. Has said in three bars he’d get even.",
      statement: {
        text: "I was at the Harp from eight till closing. Sloat’s name came up, sure. It always does.",
        isLie: false,
      },
    },
    {
      id: "irene",
      name: "Irene Sloat",
      role: "The ex-wife",
      description: "Divorced Sloat in ’45. He stopped her alimony in June, and she has been at his door twice since.",
      statement: {
        text: "I rang Jack’s office at half past nine to ask about my check. He said he had company and hung up on me.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "paving", text: "To bury a bribery file" },
    { id: "insurance", text: "To collect the partnership insurance" },
    { id: "promise", text: "Revenge for a broken promise" },
    { id: "cut", text: "To stop paying for Sloat’s silence" },
    { id: "fired", text: "Revenge for being fired" },
    { id: "alimony", text: "To get her alimony back" },
  ],

  weapons: [
    { id: "revolver", name: "His own .38 revolver", detail: "Sloat’s desk drawer" },
    { id: "blackjack", name: "A blackjack", detail: "Coat rack" },
    { id: "lamp", name: "A brass desk lamp", detail: "Merrick’s desk" },
    { id: "rye", name: "Poisoned rye", detail: "Bottom-drawer bottle" },
    { id: "pills", name: "Sleeping pills", detail: "Office washroom" },
    { id: "window", name: "A push from the window", detail: "Fourth-floor window" },
  ],

  clues: [
    "The coroner: one shot into the right temple, fired from more than a foot away. No powder burn. He died at once.",
    "Sloat was left-handed. He wrote, dealt, and shot with his left. The .38 was found in his right hand.",
    "The fourth-floor door to the back stairs, which locks at night, was found wedged open with a folded Commerce Club matchbook.",
    "In Sloat’s safe, a file on last year’s city paving contract, with Kessick’s bank deposits listed beside each payment.",
  ],

  photo: { caption: "Sloat & Merrick, fourth floor", scene: "office" },

  // Sloat kept his private ledger in a code keyed to the agency's years. The elevator log catches the secretary.
  evidence: [
    { id: "ledger", kind: "ledger", label: "Sloat’s Pocket Ledger", note: "Dec.: rent $60. Miss M., $35. From Cottle, $10. And one line in his own hand, in code." },
    { id: "elevator-log", kind: "report", label: "Ardmore Bldg. Night Car", note: "8:50 up to 4, Miss Mahaffey. 9:10 down. 9:40 shot heard, car to 4. No other riders after eight." },
    { id: "notice", kind: "letter", label: "On Sloat’s blotter, typed Dec. 9", note: "“I give notice as of Friday. Find another girl to make promises to. F.M.”" },
  ],

  cipher: {
    hiddenOn: "evidence:ledger",
    plaintext: "PAVING FILE. TWO HUNDRED ON THE FIRST OF THE MONTH. HE IS LATE.",
    shift: 14,
    keepWords: ["PAVING"],
    doodle: "pen",
  },

  solution: { suspectId: "tremont", motiveId: "paving", weaponId: "revolver" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Hired to find a letter writer, Jack Sloat found the councilman’s bribes on the paving contract instead and bled " +
        "Ralph Kessick two hundred a month for the file. When the December money was late, Sloat rang him at nine. " +
        "Kessick came up the back stairs, shot Sloat with the .38 from his own drawer, and pressed it into his right hand. " +
        "Sloat was left-handed.",
      saved:
        "Fern Mahaffey lied to keep her name out of a dead man’s love life. She had only gone back up to leave her " +
        "notice on his blotter. Leon Merrick keeps her on, at a raise.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Councilman Ralph Kessick, burying the paving file Sloat bled him with. He came up the back stairs, shot " +
        "Sloat with his own .38, and left it in the wrong hand.",
      cost:
        "It went down as suicide, so the insurance never paid Leon Merrick a cent. Kessick was elected mayor in March.",
    },
  },

  shareLine: "Watch the other hand.",
};
