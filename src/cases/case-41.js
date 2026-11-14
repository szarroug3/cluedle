// Case 41: Lot Seven. Drafted by Claude; edit freely.

export default {
  id: "lot-seven",
  title: "Lot Seven",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Book Auctioneer Found Dead in Gas Vault",
    dateline: "RIVERSIDE, Dec. 3, 1947",
    body:
      "Aldous Sedgwick, 68, whose auction rooms on Front Street have sold rare books for forty years, was found dead " +
      "Tuesday night inside the cellar vault where his firm gasses old books against the bookworm.\n" +
      "Today was to have been the sale of the season: the library of the late Senator Josiah Fairclough, led by Lot 7, " +
      "a Mercator atlas of 1595 that dealers expected to fetch $20,000. The sale is put off.\n" +
      "His son found him at eleven, with the vault door shut and the gas running. Police first called it an " +
      "accident. “The old man never in his life went into that vault with the gas on,” said one of his staff.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "pyle",
      name: "Mortimer Pyle",
      role: "The cataloguer",
      description: "Has written Sedgwick’s catalogues for eleven years. Counts every page and map of every lot and initials the slip.",
      statement: {
        text: "Mr. Sedgwick sent me home at six. He said he’d go through Lot 7 himself tonight, page by page.",
        isLie: false,
      },
    },
    {
      id: "crispin",
      name: "Crispin Sedgwick",
      role: "The son",
      description: "Forty and still a clerk in his father’s rooms. A department store wants the building, and he wants to sell it.",
      statement: {
        text: "Father missed supper, so at eleven I came looking. Doyle opened the cellar door to me in his stocking feet, and we found Father in the vault together.",
        isLie: false,
      },
    },
    {
      id: "doyle",
      name: "Mick Doyle",
      role: "The porter",
      description: "Carries the books and runs the gas vault. Asked Sedgwick for an advance on his wages in November and was turned down.",
      statement: {
        text: "I locked the cellar at six and went home to my room on Water Street. I never set foot back in the place that night.",
        isLie: true,
        truthOptions: [
          "He has been sleeping in the cellar since he lost his room",
          "He came back at nine to run the vault",
          "He let a buyer in at the cellar door",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "bligh",
      name: "Ivy Bligh",
      role: "The bookkeeper",
      description: "Keeps the bid book and the cash. Sedgwick had asked for the till receipts back to September.",
      statement: {
        text: "I worked on the bid book till eight. At a quarter past, from the trolley stop across Front Street, I saw a man let himself in at the front door with a key.",
        isLie: false,
      },
    },
    {
      id: "fairclough",
      name: "Euphemia Fairclough",
      role: "The senator’s widow",
      description: "Consigned her late husband’s library. His sons by his first wife are in court to stop the sale.",
      statement: {
        text: "Mr. Sedgwick telephoned my hotel at half past seven to ask if the Senator ever lent his atlas out. I dined with my lawyer from eight till ten.",
        isLie: false,
      },
    },
    {
      id: "hart",
      name: "Solomon Hart",
      role: "The rival dealer",
      description: "The sharpest book dealer in the state. Sedgwick barred him from his rooms last spring for bidding in a ring.",
      statement: {
        text: "I played pinochle at the Elks from seven till midnight. Tomorrow I’ll bid on that atlas, whoever holds the hammer.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "maps", text: "To hide the maps he cut out" },
    { id: "building", text: "To sell the family building" },
    { id: "loan", text: "Revenge for a refused advance" },
    { id: "till", text: "To hide money missing from the till" },
    { id: "rush", text: "To rush the sale through" },
    { id: "barred", text: "Revenge for being barred" },
  ],

  weapons: [
    { id: "vault", name: "The fumigation vault", detail: "Cellar" },
    { id: "press", name: "A book press", detail: "Bindery" },
    { id: "paper-knife", name: "A paper knife", detail: "Sedgwick’s desk" },
    { id: "paste", name: "Arsenic paste", detail: "Bindery paste pot" },
    { id: "ladder", name: "A library ladder", detail: "Front room" },
    { id: "razor", name: "A razor", detail: "Cataloguing room" },
  ],

  clues: [
    "The coroner: cyanide gas, the kind the vault runs on, between eight and nine. No blow, no wound, nothing in his stomach.",
    "The vault door bolts only from the outside, and the gas valve is opened by hand. The valve wheel had been wiped.",
    "There are three keys to the front door: Mr. Sedgwick’s, Miss Bligh’s and the cataloguer’s. Sedgwick’s was in his pocket.",
    "Police counted Lot 7: ninety-five maps, not the hundred and seven the catalogue promises. Twelve were cut out close to the spine with a razor.",
  ],

  photo: { caption: "Sedgwick’s auction rooms, Front Street", scene: "office" },

  // The code is in the Courier's personals, keyed to the lot it came from. The notice to quit catches the porter.
  evidence: [
    { id: "lot-card", kind: "card", label: "Sedgwick’s Catalogue · Lot 7", note: "Mercator, Atlas, 1595. 107 maps. Collated and complete. M.P." },
    { id: "notice", kind: "slip", label: "Mrs. Brophy’s Rooms, Water St.", note: "M. Doyle: six weeks owing. Out by Nov. 15. No exceptions." },
    { id: "store-letter", kind: "letter", label: "Hamlin’s Department Store", note: "To C. Sedgwick: our offer of $60,000 for the Front Street building stands until Dec. 31." },
  ],

  cipher: {
    hiddenOn: "clipping",
    plaintext: "TWELVE MAPS, CUT CLEAN. SAME PRICE AS AUGUST. WIRE THE MONEY AS BEFORE.",
    shift: 7,
    keepWords: ["MAPS"],
    doodle: "key",
  },

  solution: { suspectId: "pyle", motiveId: "maps", weaponId: "vault" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Since August Mortimer Pyle had been cutting maps out of the Mercator atlas and selling them to a dealer by " +
        "mail, then initialing the slip “complete.” Aldous Sedgwick grew suspicious and sent him home at six to count the " +
        "maps himself. Pyle let himself back in at a quarter past eight, asked the old man down to the vault to see a " +
        "damaged binding, bolted the door on him and opened the gas.",
      saved:
        "Mick Doyle lied because he had been sleeping on packing straw in the cellar since his landlady put him out. " +
        "Crispin Sedgwick gives him the room over the shop. The atlas is sold short twelve maps, and the catalogue says so.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Mortimer Pyle, the cataloguer, hiding the maps he had cut out of Lot 7. He came back at a quarter past " +
        "eight, shut Sedgwick in the fumigation vault, and opened the gas.",
      cost:
        "It went down as an accident. The atlas sold as complete, and Mick Doyle, who was in the building all night, " +
        "lost his job and his bed of straw.",
    },
  },

  shareLine: "Going once, going twice.",
};
