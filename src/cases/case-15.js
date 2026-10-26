// Case 15: The Delta Belle. Drafted by Claude; edit freely.

export default {
  id: "delta-belle",
  title: "The Delta Belle",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Gambler Found Dead Aboard the Delta Belle",
    dateline: "CAIRO, Ill., Sept. 7, 1947",
    body:
      "Lucien Fontaine, 44, a professional gambler known on the river as Lucky Lou, was found dead at the stern rail " +
      "of the riverboat Delta Belle early Sunday, within the hour after the last hand of an all-night poker game.\n" +
      "Fontaine took a pot of $3,000 on that final hand. The other players call him a sharper. “Nobody wins like " +
      "that on the square,” said one.\n" +
      "The Belle dropped anchor in sixteen feet of water off the Cairo landing at dawn, and no passenger has been let " +
      "ashore. Police are holding the night’s decks and the dead man’s cash box.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "endicott",
      name: "Judge Cyrus Endicott",
      role: "The judge",
      description: "Circuit judge, bound home to Memphis. Wears green-tinted spectacles for weak eyes, even at night.",
      statement: {
        text: "I folded early on the last hand and left the table before Fontaine raked in his pot. At my age a man wants his bed.",
        isLie: false,
      },
    },
    {
      id: "dufresne",
      name: "Lorna Dufresne",
      role: "The singer",
      description: "Sings in the Belle’s saloon. Fontaine’s girl, till he put her ring up in a pot last month.",
      statement: {
        text: "I sang my last set at one and went to bed. I never went near Lucien’s stateroom all night.",
        isLie: true,
        truthOptions: [
          "She went to his stateroom and took his winnings",
          "She followed him out to the stern rail",
          "She spent the night in the captain’s cabin",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "eastman",
      name: "Boyd Eastman",
      role: "The cotton broker",
      description: "Lost eight hundred dollars to Fontaine on the last hand and called him a cheat to his face.",
      statement: {
        text: "After that hand I drank rye at the saloon bar till they found him. The barman kept my glass full.",
        isLie: false,
      },
    },
    {
      id: "drummond",
      name: "Nate Drummond",
      role: "The house dealer",
      description: "Deals poker for the boat. Fontaine got him put off the Natchez Queen for palming cards.",
      statement: {
        text: "At ten to two I took the chips down to the purser and we counted them into the safe. Took us till half past.",
        isLie: false,
      },
    },
    {
      id: "fairley",
      name: "Capt. Jasper Fairley",
      role: "The captain",
      description: "Master of the Delta Belle. Owes Fontaine twelve hundred dollars from a game last spring.",
      statement: {
        text: "Fontaine sent his card up asking for a word before Cairo. I waited in the pilothouse from half past one. He never came.",
        isLie: false,
      },
    },
    {
      id: "dobbs",
      name: "Ezra Dobbs",
      role: "The steward",
      description: "Waits on the card room. Players say he reads hands over their shoulders for tips.",
      statement: {
        text: "At two I took the judge his warm milk, like every night. No answer at his door. Passing Number 9, I heard Miss Dufresne crying.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "cheating", text: "To hide his own cheating" },
    { id: "cheated", text: "Revenge for being cheated" },
    { id: "debt", text: "To wipe out a gambling debt" },
    { id: "barred", text: "Revenge for being put ashore" },
    { id: "ring", text: "Spite over a gambled ring" },
    { id: "tips", text: "To keep from being reported" },
  ],

  weapons: [
    { id: "decanter", name: "A cut-glass decanter", detail: "Card room bar" },
    { id: "derringer", name: "A sleeve derringer", detail: "Fontaine’s cuff" },
    { id: "rye", name: "A rye bottle", detail: "Saloon bar" },
    { id: "axe", name: "A fire axe", detail: "Texas deck" },
    { id: "lead", name: "A sounding lead", detail: "Leadsman’s station" },
    { id: "laudanum", name: "Laudanum", detail: "Purser’s cabinet" },
  ],

  clues: [
    "The coroner: one hard blow to the back of the head, from behind. Slivers of cut glass in his hair. No gunshot, no poison.",
    "The pilot saw Fontaine walk aft along the boiler deck at five to two. A second man came out of the card room after him.",
    "The card room’s cut-glass decanter went missing after the last hand. It turned up in the stern fire bucket, chipped.",
    "Seen through the judge’s green spectacles, tiny red marks show on the back of every card in the last deck played.",
  ],

  photo: { caption: "The Delta Belle at the Cairo landing", scene: "harbor" },

  // The dead man's calling card carries the code as one more line in his hand.
  evidence: [
    { id: "fontaine-card", kind: "card", label: "Lucien Fontaine", note: "Capt. — a word before Cairo, in private. It’s about the game." },
    { id: "bar-tab", kind: "receipt", label: "Delta Belle Saloon · Tab 12", note: "Mr. Eastman: rye ×5. Opened 1:55 a.m. Closed out 2:40." },
    { id: "box-prints", kind: "fingerprint", label: "Cash box, Stateroom 9", note: "Clasp and lid: L. Dufresne’s prints, fresh. Box empty." },
  ],

  cipher: {
    hiddenOn: "evidence:fontaine-card",
    plaintext: "THE DECK WAS MARKED BEFORE I EVER SAT DOWN.",
    shift: 16,
    keepWords: ["MARKED"],
    doodle: "anchor",
  },

  solution: { suspectId: "endicott", motiveId: "cheating", weaponId: "decanter" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Judge Cyrus Endicott marked his own decks in red ink that shows only through green glass, and he folded " +
        "every hand he should have. Lucien Fontaine caught on and meant to tell the captain. At five to two the judge " +
        "followed him aft with the decanter from the card room bar and struck him at the stern rail. Lorna Dufresne " +
        "found the stateroom empty and cleaned out the cash box.",
      saved:
        "Lorna Dufresne took the money and lied about it, but she never left Stateroom 9. She handed the $3,000 to " +
        "the police, and Boyd Eastman stopped calling a dead man a cheat.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Judge Cyrus Endicott, hiding his own marked decks. He followed Fontaine aft with the cut-glass decanter " +
        "from the card room bar and struck him at the stern rail, then let the whole boat call Fontaine the cheat.",
      cost:
        "Nobody was charged. The river decided a sore loser had settled with a cheat. The judge played the Belle " +
        "every Friday until he died in his bed.",
    },
  },

  shareLine: "Watch who folds.",
};
