// Case 3: The Night Owl. Drafted by Claude; edit freely.

export default {
  id: "night-owl",
  title: "The Night Owl",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Diamond Man Found Dead on the Night Owl",
    dateline: "TOLEDO, Dec. 2, 1946",
    body:
      "Felix Hargrove, 58, the Chicago diamond merchant, was found dead in his locked sleeper compartment aboard the " +
      "Night Owl early Monday, and the famous Hargrove diamond was missing from its case.\n" +
      "The Night Owl, train number twelve, left Chicago at ten with Hargrove, his fiancée, and a handful of " +
      "first-class passengers in Car 7. A porter found the body at six.\n" +
      "A physician traveling aboard pronounced death, and the train was held at Toledo while police searched every " +
      "berth. The diamond, valued at $80,000, has not been found.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "lindqvist",
      name: "Vera Lindqvist",
      role: "The fiancée",
      description: "Engaged to Felix for a month. Her family lost everything in ’29, and his didn’t.",
      statement: {
        text: "Felix said goodnight at eleven and locked his door. I heard the bolt go. I never saw him again.",
        isLie: false,
      },
    },
    {
      id: "hale",
      name: "Conrad Hale",
      role: "The rival",
      description: "Deals diamonds out of New York. Swore in print he’d see Hargrove ruined by Christmas.",
      statement: {
        text: "I played gin rummy in the club car till one. The doctor sat in for a hand, then left around midnight.",
        isLie: false,
      },
    },
    {
      id: "thorne",
      name: "Agnes Thorne",
      role: "The companion",
      description: "Travels as a paid companion to rich widows. Boarded in Chicago wearing three long hatpins.",
      statement: {
        text: "I lost a hatpin somewhere between Chicago and Toledo. I never went near that man’s compartment.",
        isLie: false,
      },
    },
    {
      id: "brandt",
      name: "Otto Brandt",
      role: "The porter",
      description: "Twenty years on the Night Owl. Keeps the corridor door, and a sharp eye on his tips.",
      statement: {
        text: "I sat at my post by the corridor door from midnight to six. Nobody passed me. Nobody.",
        isLie: true,
        truthOptions: [
          "Someone paid him to leave his post for an hour",
          "He fell asleep at his post",
          "He was helping a passenger in another car",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "reyes",
      name: "Dr. Simon Reyes",
      role: "The physician",
      description: "Bound for a medical congress, he says. Asked to see the Hargrove diamond twice at dinner.",
      statement: {
        text: "They fetched me at six. He’d been dead some hours. Heart, I thought, until I saw the little wound.",
        isLie: false,
      },
    },
    {
      id: "fanning",
      name: "Nell Fanning",
      role: "The singer",
      description: "Sings in the club car for her fare. Hargrove sent champagne to her table twice.",
      statement: {
        text: "I sang in the club car till midnight. When I went back to my berth at one, the porter’s stool was empty.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "diamond", text: "To steal the Hargrove diamond" },
    { id: "engagement", text: "To escape an engagement" },
    { id: "feud", text: "To settle a business feud" },
    { id: "blackmail", text: "To silence a blackmailer" },
    { id: "swindle", text: "Revenge for a swindled father" },
    { id: "insurance", text: "To claim his life insurance" },
  ],

  weapons: [
    { id: "hatpin", name: "A hatpin", detail: "Ladies’ lounge" },
    { id: "razor", name: "A straight razor", detail: "Washroom" },
    { id: "chloroform", name: "Chloroform", detail: "Medicine chest" },
    { id: "cyanide", name: "Cyanide in brandy", detail: "Club car" },
    { id: "stick", name: "A walking stick", detail: "Rack, Car 7" },
    { id: "cord", name: "A curtain cord", detail: "Berth 3" },
  ],

  clues: [
    "The coroner: one deep puncture beneath the left ear, thin as a needle. No struggle, no poison.",
    "A woman’s hatpin, wiped clean, turned up in the vestibule ashtray. Miss Thorne says it’s hers.",
    "The porter’s coat pocket held a crisp fifty-dollar bill. He earns that in a month.",
    "A doctor’s bag aboard the Night Owl has a lining freshly re-stitched in black thread.",
  ],

  photo: { caption: "The Night Owl, Union Station", scene: "train" },

  // Decoys, plus Hargrove's luggage tag, which carries the scrawl.
  evidence: [
    { id: "drake", kind: "matchbook", label: "The Drake Hotel", note: "WAbash 2-4410 — Mon." },
    { id: "luggage-tag", kind: "ticket", label: "Night Owl · Car 7, Berth 3", note: "hold for F.H." },
    { id: "chloral", kind: "prescription", label: "Dr. S. Reyes", note: "chloral 10 gr nightly — A.T." },
  ],

  cipher: {
    hiddenOn: "evidence:luggage-tag",
    plaintext: "THE DOCTOR ASKED TO SEE THE STONE TWICE. KEEP IT LOCKED AWAY FROM HIM.",
    shift: 12,
    keepWords: ["STONE"],
    doodle: "train",
  },

  solution: { suspectId: "reyes", motiveId: "diamond", weaponId: "hatpin" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Dr. Simon Reyes had followed the Hargrove diamond across three states. He paid the porter fifty dollars to leave " +
        "his post, let himself in with a pass key, and drove Agnes Thorne’s lost hatpin home beneath Hargrove’s ear. " +
        "Then he waited to be called, pronounced the man dead, and sewed the stone into his bag.",
      saved: "The police let Agnes Thorne go at Toledo. The hatpin was hers, but she never used it.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Dr. Simon Reyes, after the Hargrove diamond. He bribed the porter off his post and killed Hargrove with " +
        "Agnes Thorne’s lost hatpin.",
      cost:
        "Agnes Thorne was tried on the hatpin alone and hanged. The diamond turned up in Lisbon two years later.",
    },
  },

  shareLine: "Next stop, Toledo.",
};
