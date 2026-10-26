// Case 10: The Halverson Lodge. Drafted by Claude; edit freely.

export default {
  id: "halverson-lodge",
  title: "The Halverson Lodge",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Lodge Owner Dies in Fall on Icy Stairs",
    dateline: "CRESTED PASS, Colo., Feb. 8, 1947",
    body:
      "Erik Halverson, 57, master of the Halverson Lodge, was found dead at the foot of its back stairs Saturday at " +
      "dawn, under a fresh fall of snow.\n" +
      "The blizzard has buried the pass road under nineteen inches of new snow and cut the telephone line. Six souls are " +
      "shut in at the lodge with the body; the plow is not expected before Tuesday.\n" +
      "A deputy who reached the lodge on skis calls it a plain fall on ice. Halverson leaves a wife, Greta, and a " +
      "lodge that a Denver hotel firm has offered $35,000 to buy.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "greta",
      name: "Greta Halverson",
      role: "The wife",
      description: "Twenty-five years younger than Erik. Under his current will, she inherits the lodge.",
      statement: {
        text: "Anton and I played gin by the fire from nine until midnight. He never once left his chair.",
        isLie: true,
        truthOptions: [
          "Anton left the card table before half past ten",
          "She spent the whole evening alone in her room",
          "Anton stepped out only to fetch more firewood",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "anton",
      name: "Anton Moberg",
      role: "The ski instructor",
      description: "Teaches the guests to ski by day. Teaches Mrs. Halverson gin rummy most nights.",
      statement: {
        text: "Mrs. Halverson and I were dealing gin by the fire when the clock struck ten. Ask her.",
        isLie: false,
      },
    },
    {
      id: "prentiss",
      name: "Howard Prentiss",
      role: "The lawyer",
      description: "Keeps the Halverson family trust. Came up to redraw papers and has been slow to show Erik the books.",
      statement: {
        text: "I spent the evening in my room with Erik’s papers. He wanted the changes signed first thing in the morning.",
        isLie: false,
      },
    },
    {
      id: "birgit",
      name: "Birgit Sand",
      role: "The cook",
      description: "Cooked for the lodge since ’31. Erik learned this winter she once served time in Minnesota.",
      statement: {
        text: "At half past ten I took cocoa to the great room. The missus sat alone at solitaire. I darned beside her till eleven.",
        isLie: false,
      },
    },
    {
      id: "teo",
      name: "Teo Varga",
      role: "The handyman",
      description: "Lives in the room over the woodshed. If the Denver sale goes through, he loses his job and his home.",
      statement: {
        text: "I salted the back stairs at nine, same as every night. Found him there at six, under the snow.",
        isLie: false,
      },
    },
    {
      id: "kemp",
      name: "Hazel Kemp",
      role: "The guest",
      description: "Widow of a skier killed on Halverson’s run in ’39. Books the same room every February.",
      statement: {
        text: "My room is over the kitchen. At a quarter to eleven, something heavy hit the back stairs. I took it for the woodpile.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "will", text: "To stop a new will being signed" },
    { id: "trust", text: "To hide a raided trust fund" },
    { id: "sale", text: "To stop the sale of the lodge" },
    { id: "revenge", text: "Revenge for a husband’s death" },
    { id: "record", text: "To bury an old prison record" },
    { id: "insurance", text: "To collect on his life policy" },
  ],

  weapons: [
    { id: "curling-stone", name: "A curling stone", detail: "Trophy shelf" },
    { id: "poker", name: "A fire poker", detail: "Great room hearth" },
    { id: "shovel", name: "A snow shovel", detail: "Back porch" },
    { id: "ice-axe", name: "An ice axe", detail: "Boot room" },
    { id: "rolling-pin", name: "A rolling pin", detail: "Kitchen" },
    { id: "cane", name: "A silver-head cane", detail: "Prentiss’s room" },
  ],

  clues: [
    "One heavy blow to the crown of the skull, says the doctor who skied up. A man who slips on stairs hits the back of his head.",
    "The trophy curling stone on the bar shelf sits an inch off its dust ring, its granite wiped clean.",
    "Unsigned, tucked in a book in Greta Halverson’s room: “If he signs Saturday, we have nothing.”",
    "The gin score pad stops at ten past ten. Wet boot prints in Anton’s size run from the kitchen door to the trophy shelf.",
  ],

  photo: { caption: "Halverson Lodge, winter ’46", scene: "lodge" },

  // Erik's code is pencilled on the photo.
  evidence: [
    { id: "prentiss-card", kind: "card", label: "Howard Prentiss, Attorney", note: "Erik — papers ready. Saturday, ten sharp. H.P." },
    { id: "denver-wire", kind: "telegram", label: "Western Union · Denver", note: "OFFER 35000 HOLDS TO MARCH 1 STOP STAFF NOT RETAINED STOP" },
    { id: "trust-check", kind: "slip", label: "Halverson Trust · Check 214", note: "Jan. 30 · Pay H. Prentiss · $6,000 · “advance on fees”" },
  ],

  cipher: {
    hiddenOn: "photo",
    plaintext: "SHE KEEPS THE LODGE ONLY AS LONG AS SHE NEVER MARRIES AGAIN.",
    shift: 19,
    keepWords: ["MARRIES"],
    doodle: "snowflake",
  },

  solution: { suspectId: "anton", motiveId: "will", weaponId: "curling-stone" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Anton Moberg dealt gin with Greta Halverson until the clock struck ten, then slipped out with the trophy curling " +
        "stone. When Erik came down the back stairs for firewood, Anton was waiting. He left the body on the salted " +
        "steps for the snow to cover, and Greta swore he never left his chair. Saturday’s will let her keep the lodge " +
        "only if she never married again.",
      saved: "Teo Varga keeps his job. Greta Halverson is charged with lying to cover for Anton.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Anton Moberg, to stop a new will that took the lodge from Greta Halverson if she remarried. He struck Erik down with the trophy " +
        "curling stone, and Greta swore he never left the card table.",
      cost:
        "The fall was ruled an accident and Teo Varga was turned out for the ice. By summer Greta had sold the lodge " +
        "to Denver and married Anton in Reno.",
    },
  },

  shareLine: "Watch the stairs.",
};
