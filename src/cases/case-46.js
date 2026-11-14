// Case 46: Block Twelve. Drafted by Claude; edit freely.

export default {
  id: "block-twelve",
  title: "Block Twelve",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Carnival Champion Found Dead Behind His Own Ice",
    dateline: "FROST LAKE, Dec. 8, 1947",
    body:
      "Bradford Ellsworth, 52, owner of the Pinecrest Lodge and three times champion of the Frost Lake Winter Carnival, " +
      "was found dead on the lake at dawn Sunday behind his unfinished block of ice.\n" +
      "Twelve teams carve through the night each year by lantern, each under a white snowflake banner with its number. " +
      "Ellsworth had carved under the twelfth banner since the first carnival and called it his lucky number.\n" +
      "Snow fell for two hours after one o’clock. The judging was called off, and the carvings stand under police guard.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "lindahl",
      name: "Gunnar Lindahl",
      role: "The ice cutter",
      description: "Cuts the carnival’s blocks from the lake every year. His boy Petey was killed sledding on the lodge road last February by a car that never stopped.",
      statement: {
        text: "At midnight I hauled a fresh block up from the cut for the Grange team; their first one cracked. Ellsworth’s own apprentice was carving it, in a borrowed cap.",
        isLie: false,
      },
    },
    {
      id: "kranz",
      name: "Ozzie Kranz",
      role: "The apprentice",
      description: "Carves beside Ellsworth on block twelve for room and board. Ellsworth signs every piece and takes the cup.",
      statement: {
        text: "Mr. Ellsworth sent me up to the lodge to sleep at eleven. I didn’t come down till they rang the bell at six.",
        isLie: true,
        truthOptions: [
          "He was carving the Grange team’s block under a false name",
          "He was on block twelve with Mr. Ellsworth",
          "He was drinking in the lodge bar",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "bastien",
      name: "Henri Bastien",
      role: "The rival sculptor",
      description: "Has finished second to Ellsworth three years running. Says Ellsworth’s prize swan was his idea, sketched in this very lodge.",
      statement: {
        text: "I carved on block five all night by lantern. My two helpers never let me out of their sight.",
        isLie: false,
      },
    },
    {
      id: "margo",
      name: "Margo Ellsworth",
      role: "The wife",
      description: "Married Bradford for the lodge, the town says. Since February he has drunk alone and barely spoken to her.",
      statement: {
        text: "Bradford came up for coffee at half past eleven and went back down to his block at a quarter to twelve. I sat up with the cook till two.",
        isLie: false,
      },
    },
    {
      id: "abernathy",
      name: "Dwight Abernathy",
      role: "The carnival chairman",
      description: "Runs the carnival and counts the gate. Ellsworth had asked to see the books before the town council met.",
      statement: {
        text: "I walked the line of blocks with a lantern at one, as the snow began. I called good night to Ellsworth on twelve and got no answer.",
        isLie: false,
      },
    },
    {
      id: "tharp",
      name: "Clement Tharp",
      role: "The lake warden",
      description: "Has wardened Frost Lake for sixteen years. Ellsworth told the council a sober man ought to have the job.",
      statement: {
        text: "I checked the ice at the cut at half past twelve and again at a quarter past two. I never went near the carving line.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "boy", text: "Revenge for a hit-and-run" },
    { id: "cup", text: "To win the carnival cup at last" },
    { id: "credit", text: "To sign his own work" },
    { id: "lodge", text: "To have the lodge to herself" },
    { id: "gate", text: "To hide the skimmed gate money" },
    { id: "post", text: "To keep his warden’s post" },
  ],

  weapons: [
    { id: "chisel", name: "A flat carving chisel", detail: "Block twelve" },
    { id: "tongs", name: "Ice tongs", detail: "Ice cutter’s sledge" },
    { id: "saw", name: "An ice saw", detail: "The lake cut" },
    { id: "pick", name: "An ice pick", detail: "Lodge bar" },
    { id: "shovel", name: "A snow shovel", detail: "Lodge porch" },
    { id: "powders", name: "Sleeping powders", detail: "Mrs. Ellsworth’s night table" },
  ],

  clues: [
    "The coroner: one stab in the back with a flat blade an inch wide, between midnight and one. No snow under him, three inches on top.",
    "Ellsworth’s inch-wide flat chisel was gone from his tool roll. At dawn it was found frozen into the skin of new ice over the lake cut.",
    "Under the new snow, sledge runners in the slush ran from the Grange team’s block to block twelve, then on to the lake cut.",
    "In Lindahl’s shanty, a garage bill from Milford made out to B. Ellsworth: “Packard. Front fender and grille. Feb. 17, 1947. Cash.”",
  ],

  photo: { caption: "The carving line, Frost Lake", scene: "lodge" },

  // Ellsworth's conscience is penciled in code on the back of the carnival photo. The entry tag catches the apprentice.
  evidence: [
    { id: "warden-log", kind: "report", label: "Lake Warden’s Log", note: "12:30 a.m. Cut open, ice 9 in. Lindahl loading his sledge. 2:15 a.m. Cut skinned over." },
    { id: "entry-tag", kind: "tag", label: "Carnival Entry · Block 7", note: "Grange Hall team. Carver: “O. Smith.” Paid $2 cash, Sat. 6 p.m." },
    { id: "gate-ledger", kind: "ledger", label: "Carnival Gate, 1946", note: "Taken at the gate, $2,140. Banked, $1,600. Initialed D.A." },
  ],

  cipher: {
    hiddenOn: "photo",
    plaintext: "I SAW THE SLED TOO LATE ON THE LODGE ROAD. I NEVER STOPPED.",
    shift: 12,
    keepWords: ["SLED", "ROAD"],
    doodle: "snowflake",
  },

  solution: { suspectId: "lindahl", motiveId: "boy", weaponId: "chisel" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Bradford Ellsworth was the driver who ran down Petey Lindahl on the lodge road last February and never stopped. " +
        "Gunnar Lindahl found the Milford bill for the Packard’s fender. At midnight, hauling a block for the Grange team, " +
        "he found Ellsworth alone on twelve, stabbed him with his own carving chisel, and dropped it in the lake cut to freeze.",
      saved:
        "Ozzie Kranz lied to hide that he was carving for the Grange team as “O. Smith.” His owl takes the carnival " +
        "cup, and for once a carver signs his own work.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Gunnar Lindahl, the ice cutter, avenging the boy Ellsworth ran down and left on the lodge road. He " +
        "stabbed Ellsworth with his own flat chisel and sank it in the lake cut.",
      cost:
        "Ozzie Kranz was held for the killing on the strength of his lie until the thaw. The lake cut froze over, and " +
        "so did the case.",
    },
  },

  shareLine: "The ice keeps its secrets.",
};
