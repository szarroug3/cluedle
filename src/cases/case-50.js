// Case 50: The Painted Sky. Drafted by Claude; edit freely.

export default {
  id: "painted-sky",
  title: "The Painted Sky",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Museum Taxidermist Found Dead at His Bench",
    dateline: "RIVERSIDE, Dec. 12, 1947",
    body:
      "Barnaby Crale, 62, taxidermist to the Brandwood Museum of Natural History for thirty years, was found dead in " +
      "his workshop behind Brandwood House late Thursday, hours before the museum’s new Hall of the North was to open.\n" +
      "Crale made his name on the Brandwood expedition of 1919: sixteen men who wintered at a lake camp on the " +
      "Naskaupi River in Labrador. Fourteen came home. The guide, Louis Michaud, and one packer did not.\n" +
      "The new hall’s centerpiece is Crale’s last work, five timber wolves from that winter, set on snow under a " +
      "painted Labrador sky. The opening is put off. Police are questioning the museum staff.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "corwin",
      name: "Nadine Corwin",
      role: "The diorama painter",
      description: "Hired in October to paint the Labrador sky behind the wolves. A widow from Montreal who paints snow like she grew up in it.",
      statement: {
        text: "I painted in the new hall all evening. Mr. Crale brought his tea over at half past eight to see the sky, and he hardly said a word.",
        isLie: false,
      },
    },
    {
      id: "venn",
      name: "Dr. Horatio Venn",
      role: "The curator",
      description: "Curator for thirty years and never made director. The trustees meant to give the post to Crale at New Year’s.",
      statement: {
        text: "I was in my office upstairs till nine, writing tomorrow’s speech. I never set foot in the new hall after supper.",
        isLie: false,
      },
    },
    {
      id: "marek",
      name: "Wally Marek",
      role: "The apprentice",
      description: "Eight years at Crale’s elbow and still sweeps the floor. Crale told the trustees he’d never be more than a stuffer of pheasants.",
      statement: {
        text: "Mr. Crale let me go at six. I went straight home to my room on Dock Street and never stirred till morning.",
        isLie: true,
        truthOptions: [
          "He was at Kessel’s, selling the museum’s fox pelts",
          "He came back to the workshop at nine",
          "He was in the new hall watching the painter",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "brandwood",
      name: "Honoria Brandwood",
      role: "The founder’s widow",
      description: "Pays every bill the museum runs up. Crale fought her plan to sell the house and give the collection to the university.",
      statement: {
        text: "I looked in on the new hall at a quarter to nine. Barnaby was just going out with his teacup, white as a sheet. I took it for nerves.",
        isLie: false,
      },
    },
    {
      id: "quince",
      name: "Maj. Rutherford Quince",
      role: "The big-game hunter",
      description: "Gave the museum its trophy room. Crale had written to the records committee that his world-record ram wore another ram’s horns.",
      statement: {
        text: "I dined at the University Club and played bridge till eleven. Seven men at that table will tell you so.",
        isLie: false,
      },
    },
    {
      id: "cotter",
      name: "Dub Cotter",
      role: "The night watchman",
      description: "Walks the grounds on the hour. Crale caught him in October drinking the spirits off the specimen jars and gave him one more chance.",
      statement: {
        text: "At nine Crale sat at his bench grey as putty, cup still in his hand. He blamed the glue fumes and sent me off. At ten I found him on the floor.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "father", text: "Revenge for a father left to die" },
    { id: "director", text: "To take the director’s post" },
    { id: "pelts", text: "To hide the stolen pelts" },
    { id: "house", text: "To sell the old house" },
    { id: "record", text: "To save a world record" },
    { id: "job", text: "To keep his job" },
  ],

  weapons: [
    { id: "arsenic", name: "Arsenic powder", detail: "Preserving bench" },
    { id: "chloroform", name: "Chloroform", detail: "Killing-jar cabinet" },
    { id: "knife", name: "A skinning knife", detail: "Crale’s bench" },
    { id: "wire", name: "Mounting wire", detail: "Wire rack" },
    { id: "tusk", name: "A walrus tusk", detail: "Hall of the North" },
    { id: "stand", name: "A brass bird stand", detail: "Bird hall" },
  ],

  clues: [
    "The coroner: arsenic, a great deal of it, swallowed in the hour or so before he died. No wound and no blow.",
    "The teapot on the glue stove tested clean. The arsenic was in Crale’s cup alone, and on its rim, a smear of cobalt-blue oil paint.",
    "In Crale’s desk, his 1919 diary: “Left Michaud at the lake camp with the sick packer. Could not wait for the ice to go out.”",
    "In the painter’s paint box, a marriage license: Nadine Michaud to Paul Corwin, Montreal, 1938.",
  ],

  photo: { caption: "Brandwood House, the museum on Elm Hill", scene: "mansion" },

  // Crale kept his private notes in a code keyed to the sixteen men of 1919. This one is on the back of a wolf's tag.
  // The fur buyer's receipt catches the liar; the telegram is the major's trouble.
  evidence: [
    { id: "wolf-tag", kind: "tag", label: "Specimen tag · Timber wolf", note: "Naskaupi River, Labrador. Taken Feb. 1919, B. Crale. Fresh pencil on the back." },
    { id: "kessel-receipt", kind: "receipt", label: "Kessel’s Fur & Hide · Front St.", note: "Bought of W. Marek: 3 red fox, museum stamp, $27. 7:50 p.m. Dec. 11" },
    { id: "records-wire", kind: "telegram", label: "Western Union · New York", note: "RECORDS COMMITTEE WILL MEASURE QUINCE RAM DEC 15 STOP HORNS TO BE TAKEN OFF STOP" },
  ],

  cipher: {
    hiddenOn: "evidence:wolf-tag",
    plaintext: "THAT SKY IS THE LAKE CAMP WHERE WE LEFT MICHAUD. WHO SHOWED HER?",
    shift: 16,
    keepWords: ["LAKE", "MICHAUD"],
    doodle: "mask",
  },

  solution: { suspectId: "corwin", motiveId: "father", weaponId: "arsenic" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Nadine Corwin was born Nadine Michaud, daughter of the guide Barnaby Crale left at the lake camp in 1919 " +
        "rather than wait for the ice. She took the museum job to paint that camp on the wall and watch his face when " +
        "he saw it. At half past eight he brought his tea to look at her sky, and while he stared she stirred in " +
        "arsenic from his own preserving bench.",
      saved:
        "Wally Marek’s lie made him the first man the police wanted. He’d been at Kessel’s selling three of the " +
        "museum’s fox pelts. He loses his place for it, but not his neck.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Nadine Corwin, the guide Michaud’s daughter, avenging the father Crale left to die at the lake camp. " +
        "When he brought his tea to see her painted sky, she stirred arsenic from his own bench into the cup.",
      cost:
        "Wally Marek, caught lying about his evening, was charged with poisoning his master. The Hall of the North " +
        "opened in January under Mrs. Corwin’s sky.",
    },
  },

  shareLine: "Look hard at the sky.",
};
