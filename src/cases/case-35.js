// Case 35: The Gold Star. Drafted by Claude; edit freely.

export default {
  id: "gold-star",
  title: "The Gold Star",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Alley Owner Found Dead During League Final",
    dateline: "RIVERSIDE, Nov. 26, 1947",
    body:
      "Lou Pastore, 61, owner of the Starlite Lanes on Front Street, was found dead in his office Tuesday night, " +
      "in the break before the last game of the Merchants’ League final. Dockside Electric led Kroll’s Bakery by " +
      "eleven pins.\n" +
      "Pastore rolled the county’s only perfect game in 1931, on lane one. A single gold star has hung over that " +
      "lane ever since, and he kept score at every final from a stool beneath it.\n" +
      "His wife found him at twenty to ten. The final was called off a game short, and the $600 prize sits locked " +
      "in the league secretary’s cash box.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "bellini",
      name: "Rocco Bellini",
      role: "The counterman",
      description: "Runs the Starlite’s lunch counter and beer taps on a handshake with Lou. Knows every bowler’s order and every bowler’s business.",
      statement: {
        text: "Both teams hit my counter at the break. I ran down to the cellar once to change a keg, and I was back before the foam settled.",
        isLie: false,
      },
    },
    {
      id: "lena",
      name: "Lena Pastore",
      role: "The wife",
      description: "Married to Lou thirty years. A brewery has offered $40,000 for the Starlite, and she wants to take it and go to Florida.",
      statement: {
        text: "I rented shoes at the front desk all through the break. At twenty to ten I went back to fetch Lou for the last game and found him.",
        isLie: false,
      },
    },
    {
      id: "harrigan",
      name: "Duke Harrigan",
      role: "The anchor man",
      description: "A big man and Kroll’s Bakery’s best bowler. Lou called a foul on his last strike of game two, and Duke called Lou a thief in front of everyone.",
      statement: {
        text: "I sat on our bench the whole break, stewing over that foul. I never moved till Mrs. Pastore screamed.",
        isLie: true,
        truthOptions: [
          "He went out to the lot to bet on his own team",
          "He went back to Lou’s office to argue the foul",
          "He went down to the cellar for a beer",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "szabo",
      name: "Lefty Szabo",
      role: "The bookmaker",
      description: "Takes bets from a Hudson parked behind the Starlite. Lou owed him $400 on the World Series and had ducked him since October.",
      statement: {
        text: "I never set foot inside. At a quarter past nine a big fellow in a Kroll’s Bakery shirt came out to my car and laid fifty on his own team.",
        isLie: false,
      },
    },
    {
      id: "pflug",
      name: "Arnie Pflug",
      role: "The pit boss",
      description: "Has set pins at the Starlite since 1919 and bosses the pin boys. Lou has two automatic pinsetters on order for the spring.",
      statement: {
        text: "I was down in the pit at the far end the whole break, fixing a rack that jammed in game two. My boys were with me.",
        isLie: false,
      },
    },
    {
      id: "brisk",
      name: "Hedda Brisk",
      role: "The league secretary",
      description: "Keeps the Merchants’ League books and the prize money. Lou meant to go over her books once the final was rolled.",
      statement: {
        text: "I counted the prize money at the scorer’s table all through the break, with both team captains watching every bill.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "numbers", text: "To keep a numbers bank hidden" },
    { id: "foul", text: "Revenge for a foul call" },
    { id: "welsh", text: "Revenge for a welshed bet" },
    { id: "sale", text: "To sell the lanes" },
    { id: "pinboys", text: "To save the pin boys’ jobs" },
    { id: "prize", text: "To hide a short prize fund" },
  ],

  weapons: [
    { id: "pin", name: "A spare bowling pin", detail: "Rack by the cellar stairs" },
    { id: "ball", name: "A house ball", detail: "Ball return, lane one" },
    { id: "mallet", name: "A keg mallet", detail: "Beer cellar" },
    { id: "bottle", name: "A beer bottle", detail: "Lunch counter" },
    { id: "trophy", name: "The league trophy", detail: "Scorer’s table" },
    { id: "cord", name: "A telephone cord", detail: "Lou’s office" },
  ],

  clues: [
    "The coroner: one blow above the ear from something heavy with a rounded neck, between a quarter past nine and twenty to ten.",
    "The rack of spare pins at the foot of the cellar stairs is one short. That pin turned up behind the empty kegs, wiped clean.",
    "Lou’s office and the cellar stairs open off one back hall, and the only way into that hall is behind the lunch counter.",
    "At noon Lou telephoned the precinct and asked for a vice detective to come by on Friday. He wouldn’t say why.",
  ],

  photo: { caption: "The Starlite Lanes, league night", scene: "nightclub" },

  // Lou carried his 1931 scorecard in his wallet and penciled his code on the back of it.
  evidence: [
    { id: "scorecard", kind: "card", label: "Lou’s scorecard, 1931", note: "Lane one, 300. Twelve strikes. Kept in his wallet. On the back, pencil." },
    { id: "lunch-check", kind: "receipt", label: "Starlite Lunch Counter", note: "9:05 p.m. Two franks, two beers, 50¢. In green ink, like every check on the spike." },
    { id: "bet-slip", kind: "slip", label: "Lefty’s book · Tuesday", note: "9:15 p.m. Kroll’s to take the final, $50. Big fellow, Kroll’s shirt." },
  ],

  cipher: {
    hiddenOn: "evidence:scorecard",
    plaintext: "SOMEBODY RUNS A NUMBERS BANK OUT OF MY HOUSE. THE SLIPS ARE IN GREEN INK.",
    shift: 1,
    keepWords: ["NUMBERS", "GREEN"],
    doodle: "star",
  },

  solution: { suspectId: "bellini", motiveId: "numbers", weaponId: "pin" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Since the war Rocco Bellini had run a numbers bank from the lunch counter, writing the bets in green ink " +
        "among the franks and beers. Lou found the slips, called vice for Friday, and told Rocco so at supper. At the " +
        "break Rocco went down the back hall to change a keg, took a spare pin from the rack by the cellar stairs, " +
        "and struck Lou in his office.",
      saved:
        "Duke Harrigan’s lie about the bench nearly put him in a cell. He had slipped out to the bookmaker’s car to " +
        "lay fifty on his own team. The final was rolled a week later, and Kroll’s Bakery lost it anyway.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Rocco Bellini, keeping his numbers bank hidden. At the break he went down to change a keg and struck " +
        "Lou with a spare pin from the rack by the cellar stairs.",
      cost:
        "Duke Harrigan, caught lying about the break, was charged on the strength of the foul call. Lena sold the " +
        "Starlite to the brewery, and Rocco kept taking slips at the counter.",
    },
  },

  shareLine: "Every frame counts.",
};
