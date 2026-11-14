// Case 45: Best in Show. Drafted by Claude; edit freely.

export default {
  id: "best-in-show",
  title: "Best in Show",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Dog Show Judge Found Dead Before Best in Show",
    dateline: "RIVERSIDE, Dec. 7, 1947",
    body:
      "Leopold Quimby, 64, who judged dogs from Boston to San Francisco, was found strangled in the judges’ room at " +
      "the Riverside Armory Saturday night, minutes before he was to name Best in Show at the Kennel Club’s winter show.\n" +
      "Six dogs had won their groups and waited ringside with their handlers. The favorite was Ashgrove Starlight, a " +
      "wire fox terrier said to be the whitest in the East.\n" +
      "Quimby wore a gold pin on his lapel set with eleven small stars, one for each year he judged the big ring at " +
      "Riverside. This was to be the twelfth. The show was called off.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "ashgrove",
      name: "Philippa Ashgrove",
      role: "The breeder",
      description: "Has bred wire terriers for thirty years and never taken Best in Show. Quimby once called her dogs “pretty and useless” in print.",
      statement: {
        text: "I sat ringside with Dr. Pettibone from half past eight. If Starlight wasn’t chosen tonight, she never would be.",
        isLie: false,
      },
    },
    {
      id: "kowalczyk",
      name: "Rudy Kowalczyk",
      role: "The terrier’s handler",
      description: "Shows Starlight for Mrs. Ashgrove. Quimby had him barred for a year in ’41, and she took him back only on his promise to stay off the bottle.",
      statement: {
        text: "From half past eight till the shouting I stood at the grooming table and brushed Starlight out myself.",
        isLie: true,
        truthOptions: [
          "He was in the Armory canteen, drinking rye",
          "He was in the judges’ room with Quimby",
          "He was out on the Armory steps, chalking the terrier",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "lavallee",
      name: "Yvette Lavallee",
      role: "The society exhibitor",
      description: "Shows her own Samoyed, Polar Prince. Has told half the Armory that a picture studio wants him.",
      statement: {
        text: "At twenty to nine I took Prince round the hall to stretch his legs. A Samoyed sulks if he sits too long before a big ring.",
        isLie: false,
      },
    },
    {
      id: "pettibone",
      name: "Dr. Erasmus Pettibone",
      role: "The show vet",
      description: "Checks every dog at the door. Quimby blamed him for passing the dog that spread distemper through the benches last winter.",
      statement: {
        text: "Mrs. Ashgrove and I sat ringside from half past eight until the steward shouted. She talked terriers the whole time.",
        isLie: false,
      },
    },
    {
      id: "haverkamp",
      name: "Gus Haverkamp",
      role: "The ring steward",
      description: "Has run the big ring at Riverside for twenty years. Quimby told the club board it wanted a younger steward.",
      statement: {
        text: "Mr. Quimby asked to be left alone till five to nine. I knocked then and found him on the floor, his collar torn open.",
        isLie: false,
      },
    },
    {
      id: "szabo",
      name: "Tommy Mulvane",
      role: "The kennel boy",
      description: "Fifteen, sweeps the benches for a dollar. Quimby caught him taking tips to walk dogs past the vet’s table.",
      statement: {
        text: "Mr. Kowalczyk put Starlight’s lead in my hand at twenty to nine and told me keep her off the floor. He was gone till the shouting.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "sale", text: "To save a ten-thousand-dollar sale" },
    { id: "win", text: "To win Best in Show at last" },
    { id: "ban", text: "Revenge for a year’s ban" },
    { id: "distemper", text: "To keep his post as show vet" },
    { id: "ring", text: "To keep his place in the big ring" },
    { id: "tips", text: "To keep a tip racket quiet" },
  ],

  weapons: [
    { id: "lead", name: "A white show lead", detail: "Samoyed’s bench" },
    { id: "chain", name: "A steel bench chain", detail: "Benching row" },
    { id: "knife", name: "A stripping knife", detail: "Grooming table" },
    { id: "cup", name: "A silver trophy cup", detail: "Prize table" },
    { id: "tablets", name: "Worming tablets", detail: "Vet’s bag" },
    { id: "axe", name: "A fire axe", detail: "Armory stairwell" },
  ],

  clues: [
    "The coroner: strangled with a narrow leather strap, between twenty-five to nine and five to nine. White chalk dust in the marks on his neck.",
    "Stuffed behind the judges’ room radiator, a white leather show lead with a silver slip ring, gritty with chalk.",
    "The bench steward: the Samoyed went out at twenty to nine on a white lead. At ten to nine it came back on a steel bench chain.",
    "In Mrs. Lavallee’s handbag, a wire from a Hollywood studio: “TEN THOUSAND FOR THE DOG IF BEST IN SHOW STOP NOT A CENT IF NOT”",
  ],

  photo: { caption: "The big ring, Riverside Armory", scene: "ring" },

  // Quimby's judging book carries his code under the group winners. The canteen chit catches the handler.
  evidence: [
    { id: "judging-book", kind: "card", label: "Judge Quimby’s Book", note: "Sporting, setter. Hound, beagle. Working, Samoyed. Terrier, wire fox. Toy, Maltese. Non-Sporting, poodle." },
    { id: "canteen-chit", kind: "receipt", label: "Armory Canteen", note: "8:44 p.m. Rye, double. Then another. Signed “R.K., kennel row.”" },
    { id: "board-letter", kind: "letter", label: "Riverside Kennel Club", note: "To G. Haverkamp: the board thanks you for twenty years and asks you to step down after the winter show." },
  ],

  cipher: {
    hiddenOn: "evidence:judging-book",
    plaintext: "CHALK ON MY GLOVE FROM THE WORKING GROUP WINNER. YELLOW UNDER IT. NO RIBBON.",
    shift: 11,
    keepWords: ["CHALK", "WORKING"],
    doodle: "star",
  },

  solution: { suspectId: "lavallee", motiveId: "sale", weaponId: "lead" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Yvette Lavallee had sold Polar Prince to a picture studio for ten thousand dollars, payable on Best in Show. " +
        "Under the chalk his coat was yellow, and Leopold Quimby found it on his glove in the working group. While she " +
        "walked Prince round the hall at twenty to nine, she slipped into the judges’ room and strangled Quimby with the " +
        "dog’s own white lead.",
      saved:
        "Rudy Kowalczyk’s lie about the grooming table hid two ryes in the Armory canteen, not a murder. Mrs. Ashgrove " +
        "fires him anyway, and Starlight takes Best in Show at the spring show.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Yvette Lavallee, saving a ten-thousand-dollar sale. Quimby had found chalk over her Samoyed’s yellow " +
        "coat. She strangled him with the dog’s white show lead while she walked it round the hall.",
      cost:
        "Rudy Kowalczyk was held on the strength of his lie and never handled a dog again. Polar Prince took Best in " +
        "Show at Boston in January, chalk and all, and went west to the pictures.",
    },
  },

  shareLine: "The twelfth star never came.",
};
