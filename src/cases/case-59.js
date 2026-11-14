// Case 59: The Last Crossing. Drafted by Claude; edit freely.

export default {
  id: "last-crossing",
  title: "The Last Crossing",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Bridge Engineer Lost Off Ferry in Fog",
    dateline: "RIVERSIDE, Dec. 22, 1947",
    body:
      "Gideon Ashcombe, 58, the state engineer who was to pass the new Narrows bridge, went over the side of the car " +
      "ferry City of Linden in thick fog Sunday night, the longest night of the year. A tug found him at first light " +
      "on the Riverside flats.\n" +
      "The ferry left Port Ardmore at ten to nine with a full car deck and docked here at twenty to ten. At the slip, " +
      "Ashcombe’s Buick sat on the deck with nobody to drive it off.\n" +
      "The Narrows bridge, twenty-five steel spans from shore to shore, opens New Year’s Day, and the ferry makes its " +
      "last crossing the night before. Ashcombe was to sign the bridge off this morning.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "ogilvie",
      name: "Hamish Laird",
      role: "The bridge contractor",
      description: "Built the Narrows bridge at a price no other firm would match. His last payment comes the day the state signs off.",
      statement: {
        text: "I came across to reason with Gideon before Monday. He wouldn’t hear it, and I left him at the stern rail at nine.",
        isLie: false,
      },
    },
    {
      id: "tarrant",
      name: "Capt. Jonas Tarrant",
      role: "The ferry captain",
      description: "Has run the City of Linden since 1916. The day the bridge opens, his ferry is scrap.",
      statement: {
        text: "In fog I never leave the wheelhouse, and I didn’t Sunday. I sounded the horn every minute from slip to slip.",
        isLie: false,
      },
    },
    {
      id: "corinne",
      name: "Corinne Ashcombe",
      role: "The wife",
      description: "Gideon’s second wife, twenty years younger. Before him, she was engaged to a ferry captain.",
      statement: {
        text: "I sat in our Buick with a rug over my knees the whole way across. Gideon went up for air at nine and never came back.",
        isLie: true,
        truthOptions: [
          "She was in the wheelhouse with Captain Tarrant",
          "She was at the stern rail with her husband",
          "She was in the saloon with the reporter",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "szymanski",
      name: "Ernie Szymanski",
      role: "The deckhand",
      description: "Drives the cars on and off. Ashcombe reported him for drinking on watch, and the inspectors meet Tuesday.",
      statement: {
        text: "I walked the car deck the whole crossing, checking chocks. The Ashcombe Buick sat empty from five past nine till we docked.",
        isLie: false,
      },
    },
    {
      id: "stanhope",
      name: "Myra Stanhope",
      role: "The reporter",
      description: "Writing up the ferry’s last runs for the Courier. Ashcombe once sued her paper over a bridge story and got her pay cut.",
      statement: {
        text: "At a quarter past nine I saw Mr. Ashcombe at the stern rail, alone, writing in a little book. Then I went in and pestered his assistant till we docked.",
        isLie: false,
      },
    },
    {
      id: "quimby",
      name: "Norris Quimby",
      role: "The junior engineer",
      description: "Ashcombe’s assistant. He inspected span nine of the bridge himself in October and passed it.",
      statement: {
        text: "From a quarter past nine till we docked I sat in the saloon with that reporter, not answering her questions.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "signoff", text: "To get the bridge passed" },
    { id: "ferry", text: "To keep the ferry running" },
    { id: "remarry", text: "To be free to marry again" },
    { id: "papers", text: "To keep his seaman’s papers" },
    { id: "libel", text: "Revenge for a libel suit" },
    { id: "bribe", text: "To hide a bribed inspection" },
  ],

  weapons: [
    { id: "rail", name: "A shove over the rail", detail: "Stern deck" },
    { id: "tire-iron", name: "A tire iron", detail: "Car deck" },
    { id: "boat-hook", name: "A boat hook", detail: "Lifeboat" },
    { id: "heaving-line", name: "A heaving line", detail: "Bow locker" },
    { id: "flask", name: "A drugged flask", detail: "Deckhand’s locker" },
    { id: "fire-axe", name: "A fire axe", detail: "Saloon bulkhead" },
  ],

  clues: [
    "The coroner: drowned at about twenty past nine, with no blow to the head. A bruise across the backs of both thighs: he was lifted by the legs and tipped over a rail.",
    "Ashcombe’s notebook wasn’t on him. It turned up in the glove box of the Packard in car space 12, its last page torn out.",
    "Fresh red lead primer from the bridge is smeared on the stern rail. Two men aboard came straight from the bridge site that afternoon.",
    "In the same Packard’s ashtray, the torn page, half burned: “…span nine… billed as steel… not one rivet in ten…”",
  ],

  photo: { caption: "The Narrows bridge from the ferry slip", scene: "harbor" },

  // Ashcombe penciled his code on the back of a photo of the bridge, keyed to its spans.
  // The mug and the deckhand catch the wife; the car list says whose Packard it is.
  evidence: [
    { id: "car-list", kind: "ledger", label: "City of Linden · 8:50 Crossing", note: "Space 11, Buick, G. Ashcombe. Space 12, Packard, H. Laird. Deck full." },
    { id: "mug", kind: "fingerprint", label: "Coffee mug, wheelhouse", note: "Lipstick on the rim. Prints on the handle: Mrs. C. Ashcombe." },
    { id: "franchise-wire", kind: "telegram", label: "Western Union · State Capitol", note: "TARRANT CITY OF LINDEN FRANCHISE ENDS DEC 31 STOP NO APPEAL STOP" },
  ],

  cipher: {
    hiddenOn: "photo",
    plaintext: "SPAN NINE RIVETS ARE IRON, NOT STEEL. THE STATE PAID FOR STEEL.",
    shift: 25,
    keepWords: ["RIVETS"],
    doodle: "anchor",
  },

  solution: { suspectId: "ogilvie", motiveId: "signoff", weaponId: "rail" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Hamish Laird won the Narrows job by riveting span nine with cheap iron and billing the state for steel. " +
        "Gideon Ashcombe cut out a rivet and meant to refuse the bridge on Monday. In the fog at twenty past nine, " +
        "Laird found him alone at the stern rail, lifted him by the legs and tipped him over. At the slip he hid " +
        "the notebook in his own Packard and burned the page that mattered.",
      saved:
        "Corinne Ashcombe, who lied to hide half an hour in the wheelhouse with her old sweetheart, is spared a trial. " +
        "The bridge opening is put off, span nine is riveted again, and the City of Linden runs till spring.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Hamish Laird, the bridge contractor, getting his bridge passed. Ashcombe had found iron rivets in " +
        "span nine. In the fog Laird tipped him over the stern rail and kept his notebook.",
      cost:
        "The bridge opened on New Year’s Day on Laird’s iron. Corinne Ashcombe stood trial on the strength of her " +
        "lie and was acquitted, and nobody ever looked at span nine again.",
    },
  },

  shareLine: "Some crossings never finish.",
};
