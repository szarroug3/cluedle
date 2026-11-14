// Case 68: Thin Ice. Drafted by Claude; edit freely.

export default {
  id: "thin-ice",
  title: "Thin Ice",

  clipping: {
    masthead: "The Lakeport Ledger",
    headline: "Camp Owner Found Dead in Ice Shanty",
    dateline: "LAKEPORT, Dec. 30, 1947",
    body:
      "Otho Brisbin, 60, who has rented ice shanties on Mink Lake for twenty winters, was found dead Monday morning " +
      "in his own shanty, No. 10, the first one he ever built. His hired boy found him at six, going out to check " +
      "the tip-ups.\n" +
      "Brisbin slept out on the ice every Sunday night, to be first on the fish at dawn. The sheriff’s men say his " +
      "little stove filled the shanty with fumes while he slept.\n" +
      "Brisbin’s Camp will stay open for the New Year’s pike derby, his nephew says. The prize is $100.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "ruckert",
      name: "Nan Ruckert",
      role: "The camp cook",
      description: "Has cooked and kept house for Brisbin fifteen winters. Everyone in Lakeport took it the two of them would marry.",
      statement: {
        text: "Otho had his supper at nine and went out to No. 10 at ten. I banked my range and went up to bed.",
        isLie: false,
      },
    },
    {
      id: "pelkey",
      name: "Jory Pelkey",
      role: "The hired boy",
      description: "Sixteen. Lights the shanty stoves and chops the holes. At Christmas Brisbin caught him with twenty dollars from the till.",
      statement: {
        text: "I lit his stove at a quarter to ten and the pipe drew fine. At six I went out to check the tip-ups, and I found him.",
        isLie: false,
      },
    },
    {
      id: "gaskell",
      name: "Lorene Gaskell",
      role: "The cannery widow",
      description: "Owns the Lakeport cannery and drives the Packard her husband left her. Her lawyer warned her Brisbin was after her money.",
      statement: {
        text: "I have never once set foot at that camp. When Otho wanted to see me, he drove into Lakeport.",
        isLie: true,
        truthOptions: [
          "She drove out to the camp on Sunday evening to see him",
          "She sat with him in No. 10 till midnight",
          "She sent her driver out with a letter for the cook",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "yoakum",
      name: "Thurlow Yoakum",
      role: "The game warden",
      description: "Brisbin wrote the state that the warden lets the netters work Mink Lake for a cut of the catch.",
      statement: {
        text: "I drove the lake road at eight and passed a lady’s Packard parked at the camp turnoff, Lakeport plates. I was home by nine.",
        isLie: false,
      },
    },
    {
      id: "dirks",
      name: "Ebb Dirks",
      role: "The rival camp owner",
      description: "Runs the only other camp on Mink Lake. Brisbin cut his shanty rent to a dollar a night to break him.",
      statement: {
        text: "I never crossed the lake Sunday. I sat up playing cribbage with my own fishermen in my bait house till two.",
        isLie: false,
      },
    },
    {
      id: "calvin",
      name: "Calvin Brisbin",
      role: "The nephew",
      description: "Brisbin’s only kin, and the camp comes to him. His uncle kept him on at a hired man’s wage.",
      statement: {
        text: "Uncle Otho and I walked out together at ten, him to No. 10 and me to No. 4. I slept till Jory started yelling.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "marry", text: "To stop him marrying another" },
    { id: "reform", text: "To stay out of reform school" },
    { id: "fortune", text: "To be rid of a fortune hunter" },
    { id: "netters", text: "To keep his bribes quiet" },
    { id: "rent", text: "To end a price war" },
    { id: "camp", text: "To inherit the camp" },
  ],

  weapons: [
    { id: "fumes", name: "Stove fumes", detail: "No. 10’s stovepipe" },
    { id: "spud", name: "An ice spud", detail: "Shanty wall" },
    { id: "gaff", name: "A gaff hook", detail: "Bait house" },
    { id: "hatchet", name: "A hatchet", detail: "Woodpile" },
    { id: "rat-poison", name: "Rat poison", detail: "Cookhouse shelf" },
    { id: "tire-iron", name: "A tire iron", detail: "Warden’s car" },
  ],

  clues: [
    "The coroner: stove gas. Cherry-red skin, no blow, no struggle. He died in his sleep, in the small hours.",
    "A cookhouse flour sack was stuffed in the stovepipe of No. 10. No snow lay on it, though three inches lay on the roof around it.",
    "The snow stopped at midnight. After it, the same pair of galoshes went from the cookhouse to No. 10 and back twice. The first prints had frosted over by six.",
    "Brisbin’s letter to the county judge, posted Saturday: he would bring the hired boy in on Monday for the thefts. The judge had a bed for him at the state reform school.",
  ],

  photo: { caption: "Brisbin’s Camp, Mink Lake", scene: "lodge" },

  // The code hides in the Ledger's personals: Brisbin's notice to Lorene, keyed to his own shanty. The gas receipt catches the liar.
  evidence: [
    { id: "gas-receipt", kind: "receipt", label: "Mink Lake Road Esso", note: "Sun. Dec. 28, 7:50 p.m. · 8 gal. · Packard sedan, Lakeport plates. Paid cash, a lady." },
    { id: "cash-book", kind: "ledger", label: "Brisbin’s Camp · Renters’ Complaints", note: "Nov. 30, No. 3: reel gone. Dec. 14, No. 7: $6 gone. Dec. 25: till short $20." },
    { id: "state-letter", kind: "letter", label: "State Conservation Dept.", note: "Mr. Brisbin: your complaint against Warden Yoakum will be heard Jan. 6." },
  ],

  cipher: {
    hiddenOn: "clipping",
    plaintext: "LORENE. MONDAY I TAKE THE BOY TO THE JUDGE. THEN NEW YEARS DAY AT THE CHURCH.",
    shift: 10,
    keepWords: ["MONDAY", "JUDGE"],
    doodle: "snowflake",
  },

  solution: { suspectId: "pelkey", motiveId: "reform", weaponId: "fumes" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Jory Pelkey had been robbing the renters’ shanties all winter, and at Christmas Otho Brisbin caught him at " +
        "the till. Brisbin wrote the county judge he would bring the boy in on Monday. After the snow stopped, Jory " +
        "walked out to No. 10 and stuffed a cookhouse flour sack in the stovepipe while Brisbin slept. At six he went " +
        "out again to find him.",
      saved:
        "Lorene Gaskell admits she drove out that night and tells the sheriff she left before nine. Nan Ruckert, " +
        "whom the whole lake suspected once the wedding news got out, goes back to her range.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Jory Pelkey, the hired boy, who would not go to reform school for his thefts. After the snow stopped " +
        "he walked out to No. 10 and stuffed a flour sack in the stovepipe while Brisbin slept.",
      cost:
        "The sheriff called it a bad draft in an old stove. Nobody took Jory to the judge, and by spring the renters’ " +
        "shanties at Dirks’s camp were being robbed too.",
    },
  },

  shareLine: "Read the snow before it melts.",
};
