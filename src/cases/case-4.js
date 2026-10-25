// Case 4: The Blue Moon Room. Drafted by Claude; edit freely.

export default {
  id: "blue-moon",
  title: "The Blue Moon Room",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Columnist Dies at Blue Moon Room Toast",
    dateline: "RIVERSIDE, Jan. 1, 1947",
    body:
      "Desmond Ashby, 44, whose column “Ashby After Dark” made and broke reputations for a decade, died at the Blue " +
      "Moon Room on New Year’s Eve, seconds after the band played in 1947.\n" +
      "Some four hundred revelers packed the waterfront supper club beneath its famous neon moon, eleven feet across. " +
      "At twelve the lights went down for the countdown. When they came up, Ashby lay on the floor by the owner’s table.\n" +
      "Owner Rex Malone, who has run the club with partner Sterling Gage since 1939, called it “a terrible accident.” " +
      "Police took away every glass on the table.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "malone",
      name: "Rex Malone",
      role: "The owner",
      description: "Owns the Blue Moon Room. Drinks one cocktail a year, his own Blue Moon, at midnight sharp.",
      statement: {
        text: "Every New Year, one Blue Moon in my own frosted coupe. Benny sets it by my hand for the toast. I never got a sip.",
        isLie: false,
      },
    },
    {
      id: "iris",
      name: "Iris Malone",
      role: "The wife",
      description: "Rex’s wife of six years. Wears long gloves even in July. Her doctor gives her something to sleep.",
      statement: {
        text: "Rex and I don’t speak at parties. I sat at the far end of the table and took my pills at eleven, as always.",
        isLie: false,
      },
    },
    {
      id: "gage",
      name: "Sterling Gage",
      role: "The partner",
      description: "Owns forty-nine percent of the club. Has begged Rex to sell him the rest for two years.",
      statement: {
        text: "I was in the kitchen pantry counting champagne till nearly twelve. Ask the pantry boy.",
        isLie: false,
      },
    },
    {
      id: "fiorello",
      name: "Benny Fiorello",
      role: "The bartender",
      description: "Head bartender. Mixes the boss’s Blue Moon himself. Spends his breaks at the coat check.",
      statement: {
        text: "I mixed the boss’s Blue Moon at a quarter to twelve and never took my eyes off it till I set it by his hand.",
        isLie: true,
        truthOptions: [
          "He slipped off to the coat check with the hat girl",
          "He was stealing champagne from the cellar",
          "He let Mr. Gage mix the drink instead",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "calloway",
      name: "Ruby Calloway",
      role: "The singer",
      description: "Torch singer with the house band. Ashby’s column ended her engagement to a steel heir last spring.",
      statement: {
        text: "At a quarter to twelve I looked over from the bandstand. Nobody was behind the bar for a good ten minutes.",
        isLie: false,
      },
    },
    {
      id: "bixby",
      name: "Ward Bixby",
      role: "The councilman",
      description: "City councilman. For a month Ashby had hinted in print at “a certain councilman’s envelope.”",
      statement: {
        text: "Ashby drank rye, neat, all night. Said cocktails were for tourists. He only sat in at Rex’s table for the toast.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "engagement", text: "Revenge for a broken engagement" },
    { id: "bribery", text: "To bury a bribery story" },
    { id: "club", text: "To take the whole club" },
    { id: "husband", text: "To be free of a cruel husband" },
    { id: "insurance", text: "To collect his life insurance" },
    { id: "blackmail", text: "To silence a blackmailer" },
  ],

  weapons: [
    { id: "silver-dip", name: "Silver-plate dip", detail: "Kitchen pantry" },
    { id: "veronal", name: "Veronal tablets", detail: "Iris’s handbag" },
    { id: "ice-pick", name: "An ice pick", detail: "Back bar" },
    { id: "ant-paste", name: "Arsenic ant paste", detail: "Cellar stairs" },
    { id: "nicotine", name: "Nicotine extract", detail: "Cigar humidor" },
    { id: "bottle", name: "A champagne bottle", detail: "Ice bucket" },
  ],

  clues: [
    "Coroner: no wound. Poison by mouth, seconds before he fell. Bitter almonds on his lips; that means cyanide.",
    "The glass in Ashby’s hand: a frosted coupe with violet dregs. The Blue Moon Room mixes that drink for one man only.",
    "The kitchen polishes its silver with a dip that is mostly cyanide. The pantry tin is a spoonful short since supper.",
    "The pantry boy: Mr. Gage sent him out for ice at a quarter to twelve, then walked out past the empty bar.",
  ],

  photo: { caption: "The Blue Moon Room, New Year’s Eve", scene: "nightclub" },

  // Decoys: Bixby's envelope, Benny's coat-check alibi, Iris's sleeping pills. The scrawl is on the photo.
  evidence: [
    { id: "stardust", kind: "matchbook", label: "The Stardust Lounge", note: "500 by Fri. — W.B." },
    { id: "coat-check", kind: "ticket", label: "Blue Moon Coat Room · No. 45", note: "11:45 — B. & D. xx" },
    { id: "veronal-slip", kind: "prescription", label: "Dr. L. Amberley", note: "veronal 5 gr hs — I.M." },
  ],

  cipher: {
    hiddenOn: "photo",
    plaintext: "SURVIVING PARTNER TAKES ALL. REX WONT SELL. MIDNIGHT THEN.",
    shift: 11,
    keepWords: ["PARTNER", "MIDNIGHT"],
    doodle: "moon",
  },

  solution: { suspectId: "gage", motiveId: "club", weaponId: "silver-dip" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Sterling Gage wanted the whole Blue Moon Room, and the 1939 papers gave it to the partner left standing. At a " +
        "quarter to twelve, with the bar empty, he spooned silver dip from the pantry into Rex Malone’s Blue Moon. Then " +
        "the lights went down, and Desmond Ashby picked up the glass by mistake.",
      saved: "Gage was going to try again. Rex Malone mixes his own drinks now.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Sterling Gage, out to take the whole club from his partner. He spooned silver-plate dip, cyanide, into " +
        "Rex Malone’s Blue Moon, and Desmond Ashby drank it by mistake in the dark.",
      cost:
        "Benny Fiorello mixed the drink, so he took the blame. Rex Malone drowned off his own pier in March, and Sterling " +
        "Gage got the club.",
    },
  },

  shareLine: "Wrong glass, wrong man.",
};
