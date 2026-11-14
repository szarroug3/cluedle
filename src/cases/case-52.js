// Case 52: The Powder Works. Drafted by Claude; edit freely.

export default {
  id: "powder-works",
  title: "The Powder Works",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Fireworks Maker Found Dead in Works Office",
    dateline: "RIVERSIDE, Dec. 14, 1947",
    body:
      "Aldo Fontana, 64, whose rockets have lit the river every New Year’s Eve since 1921, was found dead in the " +
      "office of his works on the river flats Saturday evening.\n" +
      "Fontana & Sons was working straight through the weekend on the city’s New Year’s order: two thousand rockets " +
      "and forty big shells for the finale. The works spread over forty acres in eighteen small sheds, set well " +
      "apart so one blast can’t take the rest.\n" +
      "There was no blast Saturday. Fontana’s forewoman found him on the office floor at a quarter to six. The " +
      "city’s show is in doubt.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "dancy",
      name: "Merrill Dancy",
      role: "The fire inspector",
      description: "Has passed the Fontana works every spring since ’39 without one mark against it. Drives a new Packard on a city wage.",
      statement: {
        text: "I signed his shipping permit at ten past four and drove off at twenty past. I was home for supper with my wife.",
        isLie: false,
      },
    },
    {
      id: "tony",
      name: "Tony Fontana",
      role: "The son",
      description: "Wants to sell the works and open a car lot. His father called him a coward around powder, in front of the girls.",
      statement: {
        text: "I did the shipping lists in shed two, next to the office, from four till six. Nobody came near Pop after the inspector’s car went.",
        isLie: true,
        truthOptions: [
          "He was at the Riverside Inn, talking price with Crocker",
          "He was in the office, arguing with his father",
          "He was in shed nine with the chemist",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "dvorak",
      name: "Wanda Dvorak",
      role: "The forewoman",
      description: "Runs the rocket girls. The insurance men still say the ’45 shed fire started with her cigarette.",
      statement: {
        text: "My girls rolled rocket cases in shed four till half past five. At a quarter to six I went to the office for our pay and found him.",
        isLie: false,
      },
    },
    {
      id: "kohler",
      name: "Ernst Kohler",
      role: "The color chemist",
      description: "Mixes the stars. Nobody else in America makes a green like his, and a rival firm has been asking for it.",
      statement: {
        text: "I weighed powder alone in shed nine from two till six. It’s a quarter mile from the office, and the door stays shut.",
        isLie: false,
      },
    },
    {
      id: "vickers",
      name: "Rollie Vickers",
      role: "The drayman",
      description: "Drives the powder truck. Aldo docked him a month’s pay when he put a load of salutes in a ditch in November.",
      statement: {
        text: "I pulled out with the Albany load at four and signed in at the depot at ten to six. Ask the depot.",
        isLie: false,
      },
    },
    {
      id: "crocker",
      name: "Mason Crocker",
      role: "The rival",
      description: "Owns Keystone Fireworks of Trenton. Came to town Friday to buy the works, and Aldo showed him the gate.",
      statement: {
        text: "I was in my room at the Riverside Inn from four till seven. Young Fontana came up at five to talk price.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "bribes", text: "To hide the bribes he took" },
    { id: "sell", text: "To sell the works" },
    { id: "fire", text: "To hide the cause of the ’45 fire" },
    { id: "formula", text: "To sell the green formula" },
    { id: "pay", text: "Revenge for docked pay" },
    { id: "cheap", text: "To buy the works cheap" },
  ],

  weapons: [
    { id: "mallet", name: "A rawhide mallet", detail: "Ramming shed" },
    { id: "stick", name: "A rocket stick", detail: "Shed four" },
    { id: "flare", name: "A flare pistol", detail: "Office wall" },
    { id: "crowbar", name: "A crowbar", detail: "Truck cab" },
    { id: "chlorate", name: "Potassium chlorate", detail: "Mixing shed" },
    { id: "fuse", name: "A slow fuse", detail: "Fuse room" },
  ],

  clues: [
    "The coroner: one blow to the back of the head with something heavy and soft-faced, between half past four and half past five. No burns.",
    "The rawhide mallet from the empty ramming shed turned up in the river ditch behind the sheds, beside the fresh tracks of a parked car.",
    "The tracks on the river road were made by a car with one odd tire. Merrill Dancy’s Packard runs on its spare, left rear.",
    "The exchange: at 4:35 the works office rang the Dancy house. Mrs. Dancy says her husband took the call and went straight back out.",
  ],

  photo: { caption: "Fontana & Sons, the office shed", scene: "office" },

  // Aldo kept his private sums in code at the foot of the pay book, keyed to his eighteen sheds.
  // The rival's statement catches the liar; the letter is the chemist's trouble.
  evidence: [
    { id: "pay-book", kind: "ledger", label: "Fontana & Sons pay book", note: "Sat. Dec. 13. Rocket girls, $212.40, ready by five. Last line in Aldo’s pencil." },
    { id: "permit", kind: "slip", label: "City Fire Dept. · Shipping permit", note: "Fontana & Sons. 2,000 rockets, 40 shells. Passed. M. Dancy, 4:10 p.m. Dec. 13" },
    { id: "keystone-letter", kind: "letter", label: "Keystone Fireworks · Trenton", note: "Triple pay stands, Mr. Kohler, if you bring the green with you. M. Crocker" },
  ],

  cipher: {
    hiddenOn: "evidence:pay-book",
    plaintext: "FIFTY TO THE CITY MAN AGAIN. NOT ONE MORE CENT AFTER TODAY.",
    shift: 18,
    keepWords: ["FIFTY", "CITY"],
    doodle: "star",
  },

  solution: { suspectId: "dancy", motiveId: "bribes", weaponId: "mallet" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "For eight years Merrill Dancy took fifty dollars a month to pass Aldo Fontana’s works. On Saturday Aldo " +
        "paid him for the last time, and at 4:35 he telephoned to say he was going to the district attorney. Dancy " +
        "drove back by the river road, took a rawhide mallet from the empty ramming shed, and struck Aldo down in his " +
        "office while Tony was across town talking price with Keystone.",
      saved:
        "Tony Fontana lied to hide that he was selling the works behind his father’s back. He doesn’t sell. The " +
        "rockets go up over the river on New Year’s Eve, right on time.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Merrill Dancy, the fire inspector, hiding eight years of bribes. When Aldo telephoned to say he was " +
        "going to the district attorney, Dancy came back by the river road and struck him with a rawhide mallet.",
      cost:
        "Tony Fontana, caught lying about his afternoon, was charged with killing his father. Keystone bought the " +
        "works from the estate for a song, and Dancy passed it in the spring.",
    },
  },

  shareLine: "Look past the powder.",
};
