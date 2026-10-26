// Case 18: After Hours. Drafted by Claude; edit freely.

export default {
  id: "after-hours",
  title: "After Hours",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Bank Manager Found Dead Beside Open Vault",
    dateline: "RIVERSIDE, Nov. 8, 1947",
    body:
      "Clement Hadley, 58, manager of the Elm Street branch of Merchants Savings, was found dead Friday night on " +
      "the floor of his bank, beside a vault standing wide open.\n" +
      "The night watchman found him on his nine o’clock round. Hadley still wore the bank’s one spare vault key on " +
      "his watch chain. Assistant manager Russell Imhoff puts the loss at $38,000.\n" +
      "Police are looking for a safecracker. Depositors lined the sidewalk on Saturday morning.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "imhoff",
      name: "Russell Imhoff",
      role: "The assistant manager",
      description: "Hadley’s right hand for eleven years. Spends his Saturdays at the track and says he wins.",
      statement: {
        text: "I counted the vault alone at five. Thirty-eight thousand, every dollar. I locked it, went home, and never came back.",
        isLie: true,
        truthOptions: [
          "The vault held cut newspaper, not cash",
          "He counted the vault with Norma Gale",
          "He left the vault unlocked for Hadley",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "norma",
      name: "Norma Gale",
      role: "The head teller",
      description: "Twelve years at Window 2. Last week Hadley told her he was keeping an eye on her cash drawer.",
      statement: {
        text: "Mr. Imhoff sent the girls home at five sharp. He said he’d count the vault alone, the way he has since spring.",
        isLie: false,
      },
    },
    {
      id: "abe",
      name: "Abe Gunderson",
      role: "The night watchman",
      description: "Walks the building every hour on the hour. Carries a nightstick he has never once used.",
      statement: {
        text: "On my eight o’clock round the manager’s lamp was lit and the furnace was roaring. At nine I found him by the vault.",
        isLie: false,
      },
    },
    {
      id: "mickey",
      name: "Mickey Hobart",
      role: "The janitor",
      description: "Sweeps up and tends the furnace. Did six years for blowing safes and is still on parole.",
      statement: {
        text: "I banked the furnace at six, like always, and went home to my landlady. Somebody stoked it up after. Wasn’t me.",
        isLie: false,
      },
    },
    {
      id: "floyd",
      name: "Floyd Ingersoll",
      role: "The hardware man",
      description: "Runs the hardware store across Elm Street. Hadley turned down his loan and meant to take the store.",
      statement: {
        text: "I came at half past seven to beg him one more time. He said no and let me out the side door. The vault was shut.",
        isLie: false,
      },
    },
    {
      id: "lorraine",
      name: "Lorraine Hadley",
      role: "The wife",
      description: "Married to Clement twenty-two years. His life policy pays her twenty thousand dollars.",
      statement: {
        text: "Clem ate his supper and went back to the bank at seven. He said he’d found something in the books and had to see it himself.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "shortage", text: "To hide a shortage in the books" },
    { id: "vault", text: "To clean out the vault" },
    { id: "store", text: "To keep his store" },
    { id: "policy", text: "To collect his life insurance" },
    { id: "parole", text: "To keep from going back to prison" },
    { id: "job", text: "To keep her place at Window 2" },
  ],

  weapons: [
    { id: "silver", name: "A sack of silver", detail: "Window 2" },
    { id: "nightstick", name: "A nightstick", detail: "Watchman’s belt" },
    { id: "automatic", name: "A .32 automatic", detail: "Manager’s drawer" },
    { id: "crowbar", name: "A crowbar", detail: "Janitor’s closet" },
    { id: "cash-box", name: "A steel cash box", detail: "Vault shelf" },
    { id: "adding-machine", name: "An adding machine", detail: "Bookkeeping desk" },
  ],

  clues: [
    "The coroner: one blow to the temple from something heavy that gave a little. No edge, no corner, no bullet.",
    "The vault was opened on its combination, not forced. Only Hadley, Imhoff and the head teller knew it.",
    "In the furnace ash: paper bank bands and charred bricks of newspaper cut to banknote size, dated March through October.",
    "Behind Window 2, a split canvas sack of silver dollars. One of them was wedged in the tread of Imhoff’s galoshes.",
  ],

  photo: { caption: "Merchants Savings, Elm Street branch", scene: "office" },

  // The vault count book carries Hadley's pencilled code.
  evidence: [
    { id: "deposit-slip", kind: "slip", label: "Harbor Trust Co. · Deposit", note: "Acct. 2207 · Cash $300.00 · Mon. Nov. 3" },
    { id: "count-book", kind: "ledger", label: "Vault Count Book · Elm St.", note: "Feb. 28 $38,000 C.H.+R.I. | Mar. 7 $38,000 R.I. | Nov. 7 ditto" },
    { id: "parole", kind: "envelope", label: "State Parole Board", note: "M. Hobart, c/o Merchants Savings · Postmarked Nov. 3" },
  ],

  cipher: {
    hiddenOn: "evidence:count-book",
    plaintext: "THE BANDS ON THE BACK STACKS HAVE NOT BEEN BROKEN SINCE MARCH.",
    shift: 1,
    keepWords: ["MARCH"],
    doodle: "key",
  },

  solution: { suspectId: "imhoff", motiveId: "shortage", weaponId: "silver" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Since March, Russell Imhoff had taken the vault’s cash a few hundred dollars a week to pay the track, and " +
        "put bundles of cut newspaper in its place. He counted alone so nobody would see. Once Hadley started asking " +
        "about the count book, he came back Friday to burn the fakes and stage a robbery. Hadley walked in on him, and Imhoff hit " +
        "him with a sack of silver from Window 2.",
      saved:
        "The silver came from Norma Gale’s window, and Hadley had been watching her drawer. With Imhoff charged, " +
        "she keeps her job and her name.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Russell Imhoff, hiding the money he had taken from the vault since March. He killed Clement Hadley " +
        "with a sack of silver from Window 2, burned the newspaper bundles, and opened the vault to look like a robbery.",
      cost:
        "The robbery story held. Depositors ran the bank in December, Merchants Savings closed its doors in January, " +
        "and Imhoff left for Havana in February.",
    },
  },

  shareLine: "Follow the money backward.",
};
