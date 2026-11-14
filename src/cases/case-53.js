// Case 53: Camp Nineteen. Drafted by Claude; edit freely.

export default {
  id: "camp-nineteen",
  title: "Camp Nineteen",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Camp Boss Found Dead in Snowbound Sawmill",
    dateline: "SPRUCE FORKS, Dec. 15, 1947",
    body:
      "Axel Hedlund, 51, push of the Great Northern Timber Co.’s Camp Nineteen, was found dead Sunday night in the " +
      "camp sawmill, twelve miles by tote road from Spruce Forks.\n" +
      "Seventy men winter at the camp, cutting pine and sawing it on the spot. Sunday is their one day off. The saw " +
      "filer found Hedlund beside the log carriage at ten, and the camp first took it for an accident.\n" +
      "The county sheriff reached the camp by horse sled at dawn Monday. No man has been allowed to leave.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "brekke",
      name: "Hulda Brekke",
      role: "The cook",
      description: "A widow from Duluth. Has fed Camp Nineteen since October and mothers the young ones like her own.",
      statement: {
        text: "I had my bread set by eight. Mr. Hedlund takes his coffee in my cookhouse at nine every night, and last night he never came.",
        isLie: false,
      },
    },
    {
      id: "dahl",
      name: "Jack Dahl",
      role: "The sawyer’s helper",
      description: "Signed on in October. Never goes down to town, and wouldn’t sit for the company photographer.",
      statement: {
        text: "I played cribbage in the bunkhouse from supper till they found the push. Never set foot outside.",
        isLie: true,
        truthOptions: [
          "He was in the horse barn, packing to run",
          "He was in the mill with Hedlund",
          "He was in the cookhouse with the cook",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "haldane",
      name: "Arne Haldane",
      role: "The teamster",
      description: "Has driven the camp’s horses twenty winters. Hedlund meant to sell them to a fox farm and bring in a tractor.",
      statement: {
        text: "At nine I went out to blanket the horses. The new boy Dahl was in the barn with a full packsack and wouldn’t look at me.",
        isLie: false,
      },
    },
    {
      id: "wilmot",
      name: "Rube Wilmot",
      role: "The saw filer",
      description: "Lost two fingers to the head saw in ’44 when Hedlund rushed the carriage. Now he files the saws.",
      statement: {
        text: "I filed saws in the filing shack from seven with the stove roaring. At ten I went into the mill for a blade and found him.",
        isLie: false,
      },
    },
    {
      id: "tilden",
      name: "Ross Tilden",
      role: "The scaler",
      description: "Measures every log for the company. Lately Hedlund had taken to counting them over again behind him.",
      statement: {
        text: "I worked the week’s scale in the office till half past nine. The push went out to the mill at twenty past eight and never came back.",
        isLie: false,
      },
    },
    {
      id: "yates",
      name: "Orval Yates",
      role: "The camp clerk",
      description: "Runs the wanigan, the camp store. His till has come up short three Sundays running.",
      statement: {
        text: "I kept the wanigan open till nine. Mrs. Brekke came by at a quarter past eight for lamp oil and asked was the push still in his office.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "son", text: "To save her son from prison" },
    { id: "hidden", text: "To stay hidden from the law" },
    { id: "horses", text: "To save his horses" },
    { id: "hand", text: "Revenge for a maimed hand" },
    { id: "scale", text: "To hide a crooked scale" },
    { id: "till", text: "To cover the short till" },
  ],

  weapons: [
    { id: "peavey", name: "A peavey", detail: "Log deck" },
    { id: "axe", name: "A double-bit axe", detail: "Bunkhouse rack" },
    { id: "maul", name: "A splitting maul", detail: "Woodpile" },
    { id: "carriage", name: "The log carriage", detail: "Mill floor" },
    { id: "file", name: "A saw file", detail: "Filing shack" },
    { id: "bait", name: "Wolf bait", detail: "Wanigan shelf" },
  ],

  clues: [
    "The coroner: one deep wound under the ribs from a thick iron spike, between half past eight and nine. He was dragged to the carriage after.",
    "The peavey from the log deck was found in the sawdust pit, its spike wiped clean on a flour sack.",
    "The snow stopped at eight. Before the filer’s, only two lines of tracks reached the mill: Hedlund’s, and small rubber pacs from the cookhouse back door, there and back.",
    "In the cook’s trunk, a photograph of a woman and a boy on a Duluth porch. On the back: “Hulda and Jackie Brekke, 1940.”",
  ],

  photo: { caption: "Camp Nineteen, the cookhouse and mill", scene: "lodge" },

  // The code hides in the Courier's personals, keyed to the camp's number. The teamster catches the liar;
  // the ticket is where the boy meant to go, and the letter and scale book are other men's trouble.
  evidence: [
    { id: "bus-ticket", kind: "ticket", label: "Arrowhead Bus Lines · Spruce Forks", note: "One way to Winnipeg. Mon. Dec. 15, 7 a.m. Found in J. Dahl’s packsack." },
    { id: "tractor-letter", kind: "letter", label: "Northland Implement Co.", note: "Your tractor ships in April. The fox farm will take all eight horses at $20 a head." },
    { id: "scale-book", kind: "ledger", label: "Camp 19 scale book", note: "Week of Dec. 8: 212,000 ft. In Hedlund’s hand: “Recount Monday. Short a third?”" },
  ],

  cipher: {
    hiddenOn: "clipping",
    plaintext: "J. THE PUSH KNOWS YOUR FACE FROM THE POSTER. HE WIRES THE SHERIFF MONDAY. RUN.",
    shift: 19,
    keepWords: ["POSTER"],
    doodle: "key",
  },

  solution: { suspectId: "brekke", motiveId: "son", weaponId: "peavey" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Jack Dahl was Jackie Brekke, wanted in Duluth for a holdup, and the cook was his mother. Hedlund had seen the " +
        "boy’s face on a poster in Spruce Forks and meant to wire the sheriff Monday. Hulda Brekke followed him to the " +
        "mill at half past eight to beg. He said no. She drove the peavey into him, dragged him to the log carriage, " +
        "and wiped the spike on a flour sack.",
      saved:
        "Jackie Brekke goes back to Duluth to answer for the holdup and only the holdup. He was in the barn packing to " +
        "run, never near the mill.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Hulda Brekke, the cook, saving her son Jackie from the Duluth poster. She followed Hedlund to the mill " +
        "at half past eight and drove a peavey into him.",
      cost:
        "Jackie, caught lying with a packsack and a bus ticket, got life for Hedlund. His mother cooked at Camp " +
        "Nineteen till the spring breakup and was never seen again.",
    },
  },

  shareLine: "Count the tracks to the mill.",
};
