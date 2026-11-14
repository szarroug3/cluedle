// Case 55: Cold Blood. Drafted by Claude; edit freely.

export default {
  id: "cold-blood",
  title: "Cold Blood",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Snake Man Found Dead in Zoo Reptile House",
    dateline: "RIVERSIDE, Dec. 17, 1947",
    body:
      "Lyman Thatch, 61, curator of reptiles at the Riverside Zoo, was found dead in the reptile house late Tuesday " +
      "with two fang marks on his wrist. The door of the king cobra’s cage stood open.\n" +
      "In thirty years of handling snakes Thatch was bitten twenty-one times and lived through every one. He kept the " +
      "count chalked on his office door and liked to say the cobra would never make it twenty-two.\n" +
      "The night keeper found him at ten past ten. The cobra was coiled under her heat lamp, unharmed. The reptile " +
      "house is closed until further notice.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "kowalczyk",
      name: "Florian Wojcik",
      role: "The night keeper",
      description: "Twelve years on nights in the reptile house. Thatch caught him selling shed skins to a curio shop and docked his pay.",
      statement: {
        text: "I never left the reptile house all night. Mr. Thatch was at his desk at nine, and at ten past ten I found him.",
        isLie: true,
        truthOptions: [
          "He slipped out to sell snake skins on Front Street",
          "He was asleep in the boiler room",
          "He let the dealer back in by the side door",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "achterberg",
      name: "Dr. Miriam Achterberg",
      role: "The venom doctor",
      description: "Milks the cobra twice a week for her antivenin at State University. Her foundation money runs out in January.",
      statement: {
        text: "Lyman and I milked the cobra at four. I drove the venom back to the university and locked it in my own icebox.",
        isLie: false,
      },
    },
    {
      id: "ashworth",
      name: "Bernard Ashworth",
      role: "The zoo director",
      description: "Wants the reptile house made over for monkeys, which sell tickets. Thatch took the fight to the city council and won.",
      statement: {
        text: "I was at the council’s Christmas supper at the Grand from seven till past eleven. The mayor sat beside me.",
        isLie: false,
      },
    },
    {
      id: "pagano",
      name: "Luigi Pagano",
      role: "The animal dealer",
      description: "Sells snakes to zoos and sideshows. Thatch sent back his last shipment as sick and told every zoo in the state.",
      statement: {
        text: "I came by at half past eight for my money. Thatch told me where to go, and I was in the Anchor Bar by nine.",
        isLie: false,
      },
    },
    {
      id: "nettie",
      name: "Nettie Thatch",
      role: "The wife",
      description: "Married to Lyman thirty-four years, and to his snakes for all of them. His life is insured for ten thousand dollars.",
      statement: {
        text: "Lyman telephoned at half past nine to say he’d be late. He sounded pleased with himself, for once.",
        isLie: false,
      },
    },
    {
      id: "garvey",
      name: "Elmo Garvey",
      role: "The gateman",
      description: "Nettie Thatch’s brother. Minds the zoo’s service gate at night and owes Lyman four hundred dollars.",
      statement: {
        text: "Florian went out my gate at a quarter past nine with a sack on his shoulder and came back at five past ten. Nobody else came through.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "grant", text: "To save her foundation money" },
    { id: "skins", text: "To hide selling shed skins" },
    { id: "monkeys", text: "To clear out the reptile house" },
    { id: "shipment", text: "Revenge for a ruined trade" },
    { id: "insurance", text: "To collect his life insurance" },
    { id: "debt", text: "To wipe out a debt" },
  ],

  weapons: [
    { id: "syringe", name: "A syringe of venom", detail: "University icebox" },
    { id: "cobra", name: "The king cobra", detail: "Open cage" },
    { id: "hook", name: "A snake hook", detail: "Keeper’s rack" },
    { id: "rat-poison", name: "Rat poison", detail: "Feed room" },
    { id: "lamp-cord", name: "A heat lamp cord", detail: "Cobra cage" },
    { id: "wrench", name: "A pipe wrench", detail: "Boiler room" },
  ],

  clues: [
    "The coroner: cobra venom, more than a cobra gives in one bite. The two punctures are straight, even and the same depth. Fangs don’t make those.",
    "A glass syringe turned up in the alligator pool, its needle filed short. The barrel is etched STATE UNIV. LAB.",
    "The State University motor pool: Car 7 went out at ten past nine Tuesday night and came back at twenty to eleven. The venom lab keeps Car 7.",
    "In Thatch’s typewriter, a letter to the Halsey Foundation: “…her serum has not saved one animal in my sight. Her figures are her own…”",
  ],

  photo: { caption: "The Riverside Zoo reptile house, 1946", scene: "glasshouse" },

  // Thatch's last line in the day book is in his own code. The receipt catches the keeper; the policy is a red herring.
  evidence: [
    { id: "day-book", kind: "ledger", label: "Reptile House Day Book", note: "Tues., Dec. 16. 4 p.m. Cobra milked, Dr. A. Under it, a line in Thatch’s pencil." },
    { id: "curio-receipt", kind: "receipt", label: "Curio Corner · Front St.", note: "Dec. 16, 9:35 p.m. Six snake skins, one rattle. Paid F.W. $4.50." },
    { id: "policy", kind: "envelope", label: "Mutual Life of Ohio", note: "Policy on Lyman Thatch, $10,000. Paid up. Beneficiary: Mrs. Nettie Thatch." },
  ],

  cipher: {
    hiddenOn: "evidence:day-book",
    plaintext: "COBRA MILKED DRY AT FOUR. HER BITE TONIGHT COULD NOT KILL A MOUSE.",
    shift: 21,
    keepWords: ["MILKED"],
    doodle: "key",
  },

  solution: { suspectId: "achterberg", motiveId: "grant", weaponId: "syringe" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Lyman Thatch had watched Miriam Achterberg’s serum fail on animal after animal, and at the four o’clock " +
        "milking he told her he was writing to her foundation. That night she drove Car 7 to the reptile house’s side " +
        "door with the afternoon’s venom in a syringe, filed to fang length. The night keeper was out selling skins. " +
        "She put two marks in Thatch’s wrist, opened the cobra’s cage, and threw the syringe in the alligator pool.",
      saved:
        "Florian Wojcik, who lied to hide four dollars’ worth of snake skins, loses his job but not his neck. The " +
        "foundation stops paying for a serum that would never have saved anyone.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Dr. Miriam Achterberg, saving her foundation money. While the night keeper was out selling skins, she " +
        "put the afternoon’s cobra venom into Thatch with a filed needle and opened the cage to make it look like a bite.",
      cost:
        "The coroner called it bite number twenty-two. Achterberg’s serum went out to hospitals across the South the " +
        "next summer, and it saved nobody.",
    },
  },

  shareLine: "Not every bite has teeth.",
};
