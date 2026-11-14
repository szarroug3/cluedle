// Case 54: The Old Cask. Drafted by Claude; edit freely.

export default {
  id: "old-cask",
  title: "The Old Cask",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Vintner Found Drowned in His Own Cellar",
    dateline: "RIVERSIDE, Dec. 16, 1947",
    body:
      "Gaston Moreau, 71, who kept the Moreau Brothers winery alive through Prohibition, was found drowned in a " +
      "blending vat in his barrel cellar late Monday night.\n" +
      "When the country went dry, Moreau made altar wine for twenty parishes up and down the river and never missed " +
      "a delivery. The cellar under the old house still holds the great oak casks he laid down in those years.\n" +
      "His son Marcel found him at eleven. Police at first called it a fall from the vat ladder. Friends say Moreau " +
      "had been ill since summer and went down to his wine every night all the same.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "wendt",
      name: "Emory Wendt",
      role: "The neighbor",
      description: "Grows grapes on the next hill and sold every ton to Gaston all through Prohibition. Still eats at his table every Sunday.",
      statement: {
        text: "I’ve eaten Sunday dinner at Gaston’s table for thirty years. Yesterday he talked of nothing but Christmas.",
        isLie: false,
      },
    },
    {
      id: "marcel",
      name: "Marcel Moreau",
      role: "The son",
      description: "The only son. Has a buyer from California and wants the vines pulled up for a housing tract.",
      statement: {
        text: "When Father hadn’t come up by eleven, I took a lamp down and found him face down in the blending vat. His lantern was gone.",
        isLie: false,
      },
    },
    {
      id: "simone",
      name: "Simone Moreau",
      role: "The son’s wife",
      description: "Marcel’s wife, from New Orleans. Gaston called her a city girl to her face at every supper for six years.",
      statement: {
        text: "Marcel and I played cards in the parlor from nine until he went down to look for his father. He never left the table.",
        isLie: false,
      },
    },
    {
      id: "roux",
      name: "Achille Roux",
      role: "The cellar master",
      description: "Cellar master for forty years. Gaston took the gold medal in ’39 for Roux’s own blend and never once said his name.",
      statement: {
        text: "I racked wine in the cellar from eight till ten and never saw a soul. Monsieur must have come down after I went to bed.",
        isLie: true,
        truthOptions: [
          "He was drinking at the Crossroads Tavern",
          "He was in the cellar, quarreling with Gaston",
          "He was asleep in his cottage",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "shard",
      name: "Clifton Shard",
      role: "The wine broker",
      description: "Buys for a New York importer. Gaston caught him pasting French labels on bottles of Moreau red.",
      statement: {
        text: "I left the house at eight with nothing signed. I was in the bar of the Hotel Marlborough by nine, and the barman knows me.",
        isLie: false,
      },
    },
    {
      id: "hawthorne",
      name: "Della Hawthorne",
      role: "The nurse",
      description: "Has nursed Gaston’s heart since summer. In October he put her in his will for five thousand dollars.",
      statement: {
        text: "I gave Mr. Moreau his heart drops at a quarter to nine. At nine he took his lantern down to the cellar, as he did every night.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "confession", text: "To stop a confession" },
    { id: "land", text: "To sell the land" },
    { id: "insults", text: "Revenge for years of insults" },
    { id: "medal", text: "Revenge for a stolen medal" },
    { id: "labels", text: "To hide the false French labels" },
    { id: "legacy", text: "To collect a legacy" },
  ],

  weapons: [
    { id: "vat", name: "The blending vat", detail: "Barrel cellar" },
    { id: "hammer", name: "A cooper’s hammer", detail: "Cooperage bench" },
    { id: "bung", name: "A bung starter", detail: "Cask rack" },
    { id: "drops", name: "Heart drops", detail: "Nurse’s tray" },
    { id: "sulfur", name: "Sulfur fumes", detail: "Sulfuring room" },
    { id: "hose", name: "A racking hose", detail: "Cellar wall" },
  ],

  clues: [
    "The coroner: drowned in wine between nine and ten. Bruises on the back of his neck and both shoulders, where hands held him under.",
    "Gaston’s lantern was found on the cellar’s back stair, which climbs out to the vineyard path, not up to the house.",
    "Fresh red clay on the back stair. The Moreau hill is all gravel. The red clay is on the next hill over.",
    "At the Wendt farm, a wool coat drying by the kitchen stove, both sleeves stained wine-dark to the elbow.",
  ],

  photo: { caption: "The Moreau house above its vineyard", scene: "mansion" },

  // Gaston pencilled his code on the back of the holy card he kept in his missal, keyed to his twenty parishes.
  // The tavern tab catches the liar; the letter says why he had to die now.
  evidence: [
    { id: "holy-card", kind: "card", label: "St. Vincent, patron of vintners", note: "Kept in Gaston’s missal. Pencil on the back, in his hand." },
    { id: "priest-letter", kind: "letter", label: "Gaston Moreau to Father Shea", note: "I will make my confession at Christmas, Father. It is twenty years overdue." },
    { id: "tavern-tab", kind: "receipt", label: "Crossroads Tavern · Rte. 9", note: "A. Roux: applejack ×5. In 8:20, out 10:40 p.m. Mon." },
  ],

  cipher: {
    hiddenOn: "evidence:holy-card",
    plaintext: "THE REVENUE MAN IS UNDER THE ST. VINCENT CASK. MY PARTNER DUG THE HOLE WITH ME.",
    shift: 20,
    keepWords: ["CASK", "PARTNER"],
    doodle: "moon",
  },

  solution: { suspectId: "wendt", motiveId: "confession", weaponId: "vat" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "In 1927 a federal agent came to look into Gaston Moreau’s altar wine and never left. Gaston and his partner " +
        "Emory Wendt buried him under the St. Vincent cask. Twenty years on, sick and afraid for his soul, Gaston meant " +
        "to confess at Christmas, and said so at Sunday dinner. On Monday night, with the cellar master at the tavern, " +
        "Wendt came over the hill, down the back stair, and held his old friend under in the blending vat.",
      saved:
        "Achille Roux’s night at the tavern goes on the police record, but he keeps his cellar. Under the St. Vincent " +
        "cask they find the agent, and his widow in Albany finally has a grave to visit.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Emory Wendt, Gaston’s old partner, stopping a confession that would have hanged them both. He came " +
        "down the back stair while the cellar was empty and held Gaston under in the blending vat.",
      cost:
        "Achille Roux, caught lying about the cellar, was charged with the killing. The St. Vincent cask was never " +
        "moved, and the agent lies under it still.",
    },
  },

  shareLine: "Some casks are never moved.",
};
