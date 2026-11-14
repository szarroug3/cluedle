// Case 38: The Spring Line. Drafted by Claude; edit freely.

export default {
  id: "spring-line",
  title: "The Spring Line",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Milliner Slain on Eve of Spring Hat Show",
    dateline: "RIVERSIDE, Nov. 29, 1947",
    body:
      "Madame Yvette Marchand, 49, whose hats have crowned Riverside’s best heads since 1931, was found stabbed in " +
      "her Bellamy Street salon Friday night, the eve of her spring show.\n" +
      "Madame drew every hat in violet ink with a fountain pen she brought from Paris, and showed four new hats " +
      "each spring, never more. All four stood finished on their stands, untouched.\n" +
      "The building porter found her at half past nine. Her wall safe stood open. The show will not go on.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "lorimer",
      name: "Gwendolyn Lorimer",
      role: "The society client",
      description: "Riverside’s best-dressed woman and Madame’s best customer. Her husband is standing for the state senate in the spring.",
      statement: {
        text: "I came up at eight for my fitting, as I do before every show, and I was home by nine. Madame was in a temper about the show.",
        isLie: false,
      },
    },
    {
      id: "quaid",
      name: "Minnie Quaid",
      role: "The apprentice",
      description: "Nineteen, and trims hats for $14 a week. Half the spring line was her idea, and Madame signs every hat.",
      statement: {
        text: "I went home with the other girls at six and stayed home all night. Ask my mother.",
        isLie: true,
        truthOptions: [
          "She came back to trim a hat of her own for the show",
          "She came back to steal Madame’s sketches",
          "She came back for her pay envelope",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "barrows",
      name: "Lionel Barrows",
      role: "The backer",
      description: "Put up the money for the salon in 1931. Madame meant to buy him out after the show, at her price.",
      statement: {
        text: "I was at the Lotus Club from seven till eleven. I telephoned the salon at a quarter to nine and got no answer.",
        isLie: false,
      },
    },
    {
      id: "tremont",
      name: "Gloria Tremont",
      role: "The house model",
      description: "Twenty-two, single, and wears the hats in every show. Madame fired her this afternoon for gaining two pounds, the day before the show.",
      statement: {
        text: "I walked up at a quarter to nine for my last pay. I knocked and called through the door, and nobody answered.",
        isLie: false,
      },
    },
    {
      id: "pulaski",
      name: "Ike Pulaski",
      role: "The building porter",
      description: "Runs the elevator and stokes the furnace. Madame told the landlord he stole a fox stole from her stockroom.",
      statement: {
        text: "I ran the Quaid girl up at seven and down at twenty to eight, and Mrs. Lorimer up at eight and down at twenty past. Then I ate my supper in the basement till nine.",
        isLie: false,
      },
    },
    {
      id: "bigelow",
      name: "Thora Bigelow",
      role: "The store buyer",
      description: "Buys hats for Hartmann’s department store, which sells copies at $3.95. Madame threw her out of the salon in October.",
      statement: {
        text: "I telephoned at half past seven with one last offer for her sketches. She hung up on me, and I went to the pictures.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "blackmail", text: "To end a blackmail" },
    { id: "credit", text: "Credit for her designs" },
    { id: "share", text: "To keep his share of the salon" },
    { id: "fired", text: "Revenge for being fired" },
    { id: "name", text: "To clear his name" },
    { id: "copies", text: "To copy the spring line" },
  ],

  weapons: [
    { id: "shears", name: "Trimming shears", detail: "Worktable" },
    { id: "block", name: "A hat block", detail: "Workroom shelf" },
    { id: "hatpin", name: "A jet hatpin", detail: "Pincushion" },
    { id: "wire", name: "Millinery wire", detail: "Spool rack" },
    { id: "iron", name: "A pressing iron", detail: "Steam board" },
    { id: "veronal", name: "Veronal tablets", detail: "Madame’s handbag" },
  ],

  clues: [
    "The coroner: one deep wound under the ribs from a long, two-bladed edge, between eight and nine. She was facing whoever did it.",
    "Madame’s wall safe was empty but for her bank book. Whatever else she kept in it, someone took.",
    "Under the worktable, one letter the thief missed: “Dearest G., burn this before your husband sees it. Ever, Kit.”",
    "Under the bench in the elevator car, a white kid glove, size six, with a fleck of blood on the cuff.",
  ],

  photo: { caption: "Madame Marchand’s salon, Bellamy Street", scene: "office" },

  // Madame wrote her code under a sketch, in the same violet pen.
  evidence: [
    { id: "sketch", kind: "card", label: "Madame’s sketch card", note: "A cloche drawn in violet ink. Below it, a line in the same pen." },
    { id: "hat-tag", kind: "tag", label: "Hat tag · show rack", note: "A green toque. Not in the show book. Stitched inside: “M.Q.”" },
    { id: "deposit", kind: "slip", label: "Riverside Savings · Deposit", note: "Y. Marchand, $500 cash, Sept. 30. The same sum every quarter since 1945." },
  ],

  cipher: {
    hiddenOn: "evidence:sketch",
    plaintext: "A THOUSAND BY THE SHOW, OR HER LETTERS GO TO THE PAPERS.",
    shift: 4,
    keepWords: ["LETTERS"],
    doodle: "pen",
  },

  solution: { suspectId: "lorimer", motiveId: "blackmail", weaponId: "shears" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Since 1945 Gwendolyn Lorimer had paid Madame Marchand $500 a quarter for letters from a man who wasn’t her " +
        "husband. With Mr. Lorimer standing for the senate, Madame asked a thousand by the show. At her eight o’clock " +
        "fitting Gwendolyn took the trimming shears from the worktable, emptied the safe into her hatbox, and rode " +
        "down with the porter at twenty past, one glove short.",
      saved:
        "Minnie Quaid lied because she had come back to trim a hat of her own, the green toque, and meant to slip it " +
        "into the show. A Fifth Avenue house buys it in the spring, under her name.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Gwendolyn Lorimer, ending a blackmail over old letters. At her eight o’clock fitting she stabbed " +
        "Madame with the trimming shears, emptied the safe, and rode down with the porter at twenty past.",
      cost:
        "Minnie Quaid, caught in her lie, was held for a month on the strength of the toque. Mr. Lorimer won his " +
        "seat in the senate.",
    },
  },

  shareLine: "Try it on before you buy it.",
};
