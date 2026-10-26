// Case 28: The Pawn Ticket. Drafted by Claude; edit freely.

export default {
  id: "pawn-ticket",
  title: "The Pawn Ticket",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Pawnbroker Slain Behind His Own Counter",
    dateline: "RIVERSIDE, Nov. 18, 1947",
    body:
      "Isidore Rudnick, 73, who has run Rudnick’s Loans on Canal Street since 1922, was found dead behind his counter " +
      "Monday morning. The glass of his front jewelry case was smashed.\n" +
      "Police believe the thief took the Rasmussen emerald, a brooch valued at $4,000 that Rudnick had shown in his " +
      "window all week. Rudnick was struck once from behind. The rain kept Canal Street empty all night.\n" +
      "Neighbors say Rudnick carried five brass keys on a chain and opened for no one after dark. The chain was still " +
      "on his belt.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "pacheco",
      name: "Marty Pacheco",
      role: "The cab driver",
      description: "Drives nights for Bluebird Cab. Pawns something at Rudnick’s every month and buys it back on payday. Mostly.",
      statement: {
        text: "I never came near Canal Street all night. Fares between the depot and the Heights till two. Rain kept me hopping.",
        isLie: true,
        truthOptions: [
          "He drove a fare to Canal Street at 11:10",
          "He sat out the rain in the depot lunchroom",
          "He stopped at Rudnick’s to redeem his watch",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "rasmussen",
      name: "Thea Rasmussen",
      role: "The society widow",
      description: "Pawned the family emerald in secret to cover her son’s debts. Wants it back before her daughter’s wedding.",
      statement: {
        text: "My cab let me off on Canal Street a little past eleven. Isidore’s light was on but he wouldn’t open. I walked home.",
        isLie: false,
      },
    },
    {
      id: "rudnick",
      name: "Morris Rudnick",
      role: "The nephew",
      description: "Works the counter days. His uncle keeps saying the shop goes to him, then changing his mind.",
      statement: {
        text: "We locked up at six and I left him counting tickets. He said a customer was coming late, after hours. Wouldn’t say who.",
        isLie: false,
      },
    },
    {
      id: "rinaldi",
      name: "Carmine Rinaldi",
      role: "The fence",
      description: "Moves stolen goods on Canal Street. Rudnick turned away his hot watches twice this month and said why.",
      statement: {
        text: "I played pinochle at the Shamrock from nine till they shut at one. Ask the barman. That emerald’s too famous to sell.",
        isLie: false,
      },
    },
    {
      id: "prosser",
      name: "Frank Prosser",
      role: "The beat cop",
      description: "Walks the Canal Street beat. Pawned his wedding ring at Rudnick’s in the spring and never came back for it.",
      statement: {
        text: "Passed Rudnick’s at half eleven on my round. Shade down, light on. A cab sat dark round the corner on Ninth, motor running.",
        isLie: false,
      },
    },
    {
      id: "pinchbeck",
      name: "Ada Pinchbeck",
      role: "The lodger",
      description: "Rents the room over the shop and takes in sewing. Rudnick has raised her rent twice since spring.",
      statement: {
        text: "At a quarter to twelve the shop bell rang and Mr. Rudnick let somebody in. Not long after, glass broke. I kept my door bolted.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "gun", text: "To get back the holdup gun" },
    { id: "emerald", text: "To steal the Rasmussen emerald" },
    { id: "secret", text: "To keep a secret pawn quiet" },
    { id: "shop", text: "To inherit the shop" },
    { id: "fencing", text: "To keep his fencing quiet" },
    { id: "rent", text: "To stop the rent going up" },
  ],

  weapons: [
    { id: "weight", name: "A brass scale weight", detail: "Jeweler’s scale" },
    { id: "revolver", name: "A .32 revolver", detail: "Gun drawer" },
    { id: "tire-iron", name: "A tire iron", detail: "Cab trunk" },
    { id: "nightstick", name: "A nightstick", detail: "Beat cop’s belt" },
    { id: "shears", name: "Dressmaker’s shears", detail: "Room upstairs" },
    { id: "clock", name: "A mantel clock", detail: "Back shelf" },
  ],

  clues: [
    "The coroner: a single blow to the crown from something small and very heavy. No struggle. Dead before midnight.",
    "The jeweler’s scale on the counter is short its two-pound brass weight. It turned up in the gutter out front.",
    "The locksmith opened Rudnick’s safe Tuesday. The Rasmussen emerald was inside. Whatever left the window was paste.",
    "A tag in Rudnick’s gun drawer, no gun on it: “Colt .32, Oct. 31, M.P.” The Ninth Street holdup on Oct. 30 used a .32.",
  ],

  photo: { caption: "Rudnick’s Loans, Canal Street", scene: "office" },

  // The emerald's own pawn ticket carries Rudnick's private note in code. The cab receipt catches the liar.
  evidence: [
    { id: "emerald-ticket", kind: "ticket", label: "Rudnick’s Loans · No. 7690", note: "Emerald brooch, gold set. $1,200. Ninety days. —T.R." },
    { id: "cab-receipt", kind: "receipt", label: "Bluebird Cab Co.", note: "Car 41 · Depot to Canal St. · 11:10 p.m. · 60¢" },
    { id: "police-letter", kind: "letter", label: "Unsent, Rudnick’s desk drawer", note: "Capt. Riordan — the Ninth St. holdup gun is in my drawer. I.R." },
  ],

  cipher: {
    hiddenOn: "evidence:emerald-ticket",
    plaintext: "LATE CALLER BRINGS FIVE HUNDRED. OPEN FOR HIM ONLY.",
    shift: 5,
    keepWords: ["LATE"],
    doodle: "key",
  },

  solution: { suspectId: "pacheco", motiveId: "gun", weaponId: "weight" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Marty Pacheco pawned a Colt .32 the morning after the Ninth Street holdup. Rudnick read the papers and told him " +
        "to come for it after hours with five hundred dollars. Pacheco dropped Mrs. Rasmussen on Canal Street, waited " +
        "round the corner, and was let in. He struck Rudnick with the scale weight, took the gun, tore its page from the " +
        "book, and smashed the window so a paste emerald would look like the reason.",
      saved:
        "Thea Rasmussen was on Canal Street that night, after a brooch the papers called stolen. With Pacheco charged, " +
        "she gets her emerald back out of the safe and nobody hears how it got there.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Marty Pacheco, getting back the revolver he had pawned after the Ninth Street holdup. He struck Rudnick " +
        "with the brass weight from the jeweler’s scale and smashed the window case to fake a robbery.",
      cost:
        "Thea Rasmussen was charged. Her secret pawn and her trip to Canal Street were all the jury needed. The Colt " +
        "turned up again in March, at another holdup.",
    },
  },

  shareLine: "Check the safe before the window.",
};
