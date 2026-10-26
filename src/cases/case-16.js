// Case 16: The Graveyard Shift. Drafted by Claude; edit freely.

export default {
  id: "graveyard-shift",
  title: "The Graveyard Shift",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Traveling Man Dies at All-Night Diner",
    dateline: "HARMON, Ohio, Nov. 9, 1947",
    body:
      "A traveling brush salesman who gave his name as Milo Dempster, about 45, died on a stool at the Crossroads Diner " +
      "on Route 40 early Sunday. He was found slumped over a slice of cherry pie a little after three.\n" +
      "Night deputy Carl Eppling, who was in the diner at the time, called it a heart attack. The county coroner has " +
      "asked for tests.\n" +
      "The diner has stood where Route 40 meets the county road since 1931. Locals set their watches by the big clock over its pie " +
      "case, which the owner, Mrs. Rhoda Dorsey, winds every eight days.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "eppling",
      name: "Carl Eppling",
      role: "The deputy",
      description: "Night deputy. Drinks his coffee free at the Crossroads and wears a new camel-hair coat on deputy’s pay.",
      statement: {
        text: "I came in at half past two and took my coffee down by the door. Never said a word to the fellow.",
        isLie: true,
        truthOptions: [
          "He sat on the stool right beside the salesman",
          "He came in after the salesman was already dead",
          "He was out on patrol until three",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "fessler",
      name: "Bernice Fessler",
      role: "The waitress",
      description: "Works the graveyard shift alone. Swears a traveling man left her at the altar in ’41.",
      statement: {
        text: "He came in at two, ordered coffee and cherry pie, and asked was there a phone. Then he kept watching the door.",
        isLie: false,
      },
    },
    {
      id: "dekker",
      name: "Ollie Dekker",
      role: "The cook",
      description: "Did three years in Mansfield for a payroll job. Never lets anybody behind his grill.",
      statement: {
        text: "I cut his pie and Bernice poured his coffee out of the same pot as everybody’s. Nobody else took sick.",
        isLie: false,
      },
    },
    {
      id: "fowler",
      name: "Hank Fowler",
      role: "The trucker",
      description: "Hauls steel to Toledo three nights a week for an outfit the papers call crooked.",
      statement: {
        text: "I sat two stools down. The deputy took the stool right next to him and passed him the sugar.",
        isLie: false,
      },
    },
    {
      id: "elkins",
      name: "Mort Elkins",
      role: "The brush man",
      description: "Sells brushes door to door in three counties. Lost his best route this spring to a stranger.",
      statement: {
        text: "Asked him how Keystone Brush pays its men. He didn’t know what commission was. I’ve sold brushes in Ohio twenty years.",
        isLie: false,
      },
    },
    {
      id: "dorsey",
      name: "Rhoda Dorsey",
      role: "The owner",
      description: "Owns the Crossroads. Her late husband ran numbers for a Toledo crowd, and she still sends them a cut.",
      statement: {
        text: "I wound the big clock at two, same as every eight days, and went up to bed. Heard nothing till the deputy hollered.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "witness", text: "To silence a witness" },
    { id: "route", text: "To win back a sales route" },
    { id: "robbery", text: "To rob a traveling man" },
    { id: "numbers", text: "To keep her numbers money hid" },
    { id: "jilted", text: "Revenge for a jilting" },
    { id: "wreck", text: "Revenge for a near wreck" },
  ],

  weapons: [
    { id: "morphine", name: "Morphine tablets", detail: "First-aid kit" },
    { id: "seconal", name: "Seconal capsules", detail: "Waitress’s purse" },
    { id: "lye", name: "Lye", detail: "Under the sink" },
    { id: "tire-iron", name: "A tire iron", detail: "Trucker’s cab" },
    { id: "sap", name: "A leather sap", detail: "Deputy’s belt" },
    { id: "paring-knife", name: "A paring knife", detail: "Cook’s station" },
  ],

  clues: [
    "The coroner: no wound, no bruise. Enough of an opiate in his blood to stop his breathing once he dozed off.",
    "His sample case held four brushes with dime-store price tags still on them, and a road map with Columbus circled.",
    "Somebody had the cup and plate washed and racked before the coroner came.",
    "State police: Eppling banked $500 cash on Friday, and his patrol car’s first-aid kit is short six morphine tablets.",
  ],

  photo: { caption: "The diner counter, three a.m.", scene: "nightclub" },

  // The dead man's check carries the code as one more line on it.
  evidence: [
    { id: "check", kind: "receipt", label: "Crossroads Diner · Check 41", note: "Stool 6: coffee, cherry pie, 25¢. Stool 7: coffee, no charge." },
    { id: "letter", kind: "letter", label: "Letter in his coat pocket", note: "M. — Monday, ten, Room 3, Columbus. Stop nowhere you’re known." },
    { id: "sample-tag", kind: "tag", label: "Keystone Brush Co. · Samples", note: "M. Dempster. If found, return to Box 40, Toledo." },
  ],

  cipher: {
    hiddenOn: "evidence:check",
    plaintext: "IF I DONT MAKE IT MONDAY, THE LEDGER IS IN MY SPARE TIRE.",
    shift: 8,
    keepWords: ["LEDGER"],
    doodle: "clock",
  },

  solution: { suspectId: "eppling", motiveId: "witness", weaponId: "morphine" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Milo Dempster never sold a brush. He kept the books for a Toledo trucking racket and was driving to Columbus " +
        "to tell a grand jury about it on Monday. The racket paid Carl Eppling $500 to see he never got there. Eppling " +
        "sat down beside him at the Crossroads and dropped morphine from his patrol kit into his coffee. When Dempster " +
        "dozed off for good, Eppling had the cup washed and called it his heart.",
      saved:
        "Hank Fowler drove for the outfit Dempster meant to name, and the state police wanted him first. With " +
        "Eppling charged, Hank went back to his truck. The ledger in the spare tire reached the grand jury.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Deputy Carl Eppling, paid to silence a witness on his way to the grand jury. He dropped morphine from " +
        "his patrol car’s first-aid kit into Dempster’s coffee at the counter, then had the cup washed and called it a " +
        "heart attack.",
      cost:
        "Hank Fowler drove for the outfit Dempster meant to name, and the state police charged him. The grand jury " +
        "sat Monday without its witness, and the racket kept its trucks rolling.",
    },
  },

  shareLine: "Mind who sits beside you.",
};
