// Case 23: The Last Loop. Drafted by Claude; edit freely.

export default {
  id: "last-loop",
  title: "The Last Loop",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Stunt Flier Killed Before Air Show Crowd",
    dateline: "LINDEN COUNTY, June 8, 1947",
    body:
      "Cal Nyland, 38, the stunt flier billed as “the Linden Comet,” died Sunday when his yellow biplane fell into " +
      "a cornfield before 4,000 people at the Haskell Field air show.\n" +
      "Nyland looped and rolled for ten minutes with his jumper, Peggy O’Day, in the front seat. Moments after she " +
      "climbed out and jumped, as she does at every show, the ship went into a dive at 2:21 and never pulled out.\n" +
      "Nyland flew twenty-one missions over Germany and wore his Silver Star on his flying jacket at every show. " +
      "An inspector found a control cable cut. He leaves a wife, Bess.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "bess",
      name: "Bess Nyland",
      role: "The wife",
      description: "Married Cal in ’41. Knows where he goes on Tuesdays, and has said nothing about it to anyone.",
      statement: {
        text: "At one I took Cal a sandwich in Hangar 3. He ate it standing up and sent me off. I watched the rest from the grandstand.",
        isLie: false,
      },
    },
    {
      id: "ormsby",
      name: "Buck Ormsby",
      role: "The rival flier",
      description: "Flies second on the bill to Cal and hates it. With Cal gone, the $500 season purse is his.",
      statement: {
        text: "I sat in the clubhouse from noon till I went up at one. I never went near Cal’s ship. Ask Gil.",
        isLie: true,
        truthOptions: [
          "He sawed Cal’s control cable in Hangar 3",
          "He went to Hangar 3 to borrow a wrench",
          "He argued with Cal behind the grandstand",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "oday",
      name: "Peggy O’Day",
      role: "The parachute jumper",
      description: "Rides Cal’s front seat and jumps at every show. Holds a pilot’s license. Lost a brother in a crash in ’39.",
      statement: {
        text: "I was in the front seat by a quarter to two. Cal was already in the back with his goggles down. He never talks before a show.",
        isLie: false,
      },
    },
    {
      id: "moran",
      name: "Sully Moran",
      role: "The mechanic",
      description: "Has kept Cal’s ship in the air for six years. Cal told him Friday he was hiring a younger man.",
      statement: {
        text: "I swung the prop at five past two. Mr. Nyland never gave me his thumbs-up. Miss O’Day gave it from the front.",
        isLie: false,
      },
    },
    {
      id: "moffat",
      name: "Lew Moffat",
      role: "The promoter",
      description: "Ran the ’39 show too, when Cal walked away from a crash that killed his jumper. Owes Cal $2,000.",
      statement: {
        text: "Around half past twelve I saw Buck Ormsby come out of Hangar 3. From one o’clock I had the microphone till the crash.",
        isLie: false,
      },
    },
    {
      id: "mattox",
      name: "Gil Mattox",
      role: "The clubhouse barman",
      description: "Pours beer in the field clubhouse. Cal has been seeing his wife on Tuesdays since Easter.",
      statement: {
        text: "Buck had one beer at noon and walked out by twenty past. I never left the bar all afternoon. I don’t watch the show.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "cheating", text: "Revenge on a cheating husband" },
    { id: "purse", text: "To win the season purse" },
    { id: "revenge", text: "To avenge a brother’s death" },
    { id: "job", text: "To keep from being replaced" },
    { id: "debt", text: "To get out of a $2,000 debt" },
    { id: "jealousy", text: "Jealousy over a wife" },
  ],

  weapons: [
    { id: "chock", name: "A wheel chock", detail: "Hangar 3" },
    { id: "hacksaw", name: "A hacksaw", detail: "Ormsby’s toolbox" },
    { id: "wrench", name: "A prop wrench", detail: "Moran’s bench" },
    { id: "flare-pistol", name: "A flare pistol", detail: "Field office" },
    { id: "bottle", name: "A beer bottle", detail: "Clubhouse bar" },
    { id: "tire-iron", name: "A tire iron", detail: "Moffat’s Packard" },
  ],

  clues: [
    "The air inspector: the aileron cable on Nyland’s ship was sawn halfway through with a fine blade, that same day.",
    "The coroner: one blow to the back of the head with something square-edged. Oak splinters in his collar.",
    "The coroner again: Nyland was dead an hour or more before his ship hit the corn. He was not flying it.",
    "In the wreck, the front-seat stick was fitted in place. Cal always pulled it out before a show so no rider could touch it.",
  ],

  photo: { caption: "Field office, Haskell Field", scene: "office" },

  // The pencilled line on the field office photo carries the code. The office log fixes the times.
  evidence: [
    { id: "office-log", kind: "report", label: "Haskell Field · Office Log", note: "Ormsby up 1:00, down 1:35. 1:05 Hangar 3 phones for fuel." },
    { id: "rigger-tag", kind: "tag", label: "Rigger’s Tag · Chute No. 7", note: "Seat pack, pilot’s type. Packed Sat. for P. O’Day, her request." },
    { id: "motor-court", kind: "receipt", label: "Linden Motor Court · Cabin 4", note: "Tues., June 3. “Mr. & Mrs. C. Nyland.” Paid cash. Out by six." },
  ],

  cipher: {
    hiddenOn: "photo",
    plaintext: "I FLEW DRUNK IN THIRTY NINE AND THE BOY PAID FOR IT.",
    shift: 21,
    keepWords: ["DRUNK"],
    doodle: "star",
  },

  solution: { suspectId: "oday", motiveId: "revenge", weaponId: "chock" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Peggy O’Day’s brother was Cal Nyland’s jumper in ’39, and Cal flew drunk that day. Just after one she struck " +
        "Cal with a wheel chock in Hangar 3, strapped him in the back seat with his goggles down, and flew the show " +
        "from the front on her own stick. Then she climbed out and jumped as always, and the ship went down with him. " +
        "Buck Ormsby’s sawn cable took the blame.",
      saved:
        "Buck Ormsby goes to prison for cutting a cable, not to the chair for murder. Bess Nyland buries her " +
        "husband without the police at her door.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Peggy O’Day, avenging her brother, who died in Cal Nyland’s plane in ’39. She struck Cal with a wheel " +
        "chock in Hangar 3, flew the show from the front seat with him dead behind her, and jumped.",
      cost:
        "The sawn cable sent Buck Ormsby to the chair. Peggy O’Day jumped at the Labor Day show in Toledo and went " +
        "west in the fall.",
    },
  },

  shareLine: "Ask who was really flying.",
};
