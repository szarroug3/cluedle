// Case 13: The Morning Line. Drafted by Claude; edit freely.

export default {
  id: "morning-line",
  title: "The Morning Line",

  clipping: {
    masthead: "The Riverside Courier",
    headline: "Trainer Slain at Dawn Before Big Race",
    dateline: "RIVERSIDE, Oct. 11, 1947",
    body:
      "Owen Garvey, 49, who trains Copper Penny, the favorite in today’s Riverbend Handicap, was found dead in his " +
      "tack room at Riverbend Park shortly before six this morning.\n" +
      "Groom Lonnie Cassidy found him beside Barn 9. Police first thought a horse had kicked him, until the coroner " +
      "took a look. The stewards say Copper Penny will run as planned, at 4 to 5.\n" +
      "The backstretch is guarded at night by one watchman, who keeps all twenty stable keys on a single ring in his " +
      "shack by the river gate. The $25,000 handicap goes off at four o’clock.",
  },

  // Every witness is a suspect, so each statement lives on its suspect's card. Exactly one lies.
  suspects: [
    {
      id: "coyle",
      name: "Dr. Ira Coyle",
      role: "The track vet",
      description: "Lost his own stable in ’39 and lives on a vet’s pay. Checks every horse’s lip tattoo before it races.",
      statement: {
        text: "On my rounds at 5:30 I saw Owen stamp off toward his tack room. He looked ready to hit somebody.",
        isLie: false,
      },
    },
    {
      id: "archer",
      name: "Tully Archer",
      role: "The jockey",
      description: "Rides Bright Promise, the second choice. Garvey took him off Copper Penny in August for riding wide.",
      statement: {
        text: "I breezed Bright Promise at 5:35, a half-mile in :48. The clocker had his watch on me from the gate to the wire.",
        isLie: false,
      },
    },
    {
      id: "beaumont",
      name: "Vivian Beaumont",
      role: "The owner",
      description: "Owns Copper Penny and three cheap claimers. Her checks to Garvey have started coming back.",
      statement: {
        text: "I came at six with sugar for Penny. He backed away from me like a stranger. That horse has eaten from my hand since he was foaled.",
        isLie: false,
      },
    },
    {
      id: "boone",
      name: "Hap Boone",
      role: "The gate watchman",
      description: "Minds the river gate and the stable keys at night for $30 a week. Flush with cash this morning.",
      statement: {
        text: "Not one van and not one stranger came through my gate all night. I’d have heard it. I don’t sleep on the job.",
        isLie: true,
        truthOptions: [
          "He took fifty dollars to let a horse van in",
          "He slept in his shack from midnight to four",
          "He let the owner in late to see her horse",
        ],
        truthIndex: 0,
      },
    },
    {
      id: "cassidy",
      name: "Lonnie Cassidy",
      role: "The groom",
      description: "Rubs Copper Penny and sleeps above his stall. Garvey caught him selling the horse’s workout times.",
      statement: {
        text: "Near midnight a van backed up to Barn 9 and somebody led a horse down the ramp. I took it for a late shipper and rolled over.",
        isLie: false,
      },
    },
    {
      id: "bledsoe",
      name: "Sol Bledsoe",
      role: "The bookmaker",
      description: "Makes book behind the Ferry House. Half the river has bet Copper Penny, and he’d pay every one of them.",
      statement: {
        text: "I came round at half past five to see Lonnie about money. I walked hots with him till he found Owen.",
        isLie: false,
      },
    },
  ],

  motives: [
    { id: "ringer", text: "To keep the ringer hidden" },
    { id: "bills", text: "To dodge unpaid training bills" },
    { id: "ride", text: "Revenge for losing the ride" },
    { id: "feed", text: "To hide the stolen feed" },
    { id: "tips", text: "To hide the tips he sold" },
    { id: "payout", text: "To save the book a fortune" },
  ],

  weapons: [
    { id: "hammer", name: "A shoeing hammer", detail: "Farrier’s box" },
    { id: "kick", name: "A horse’s kick", detail: "Stall 9" },
    { id: "twitch", name: "A twitch", detail: "Tack room" },
    { id: "syringe", name: "A vet’s syringe", detail: "Dr. Coyle’s bag" },
    { id: "crop", name: "A riding crop", detail: "Jockeys’ room" },
    { id: "shank", name: "A chain lead shank", detail: "Barn 9" },
  ],

  clues: [
    "The coroner: one blow above the ear from a small square face. A hoof leaves a curve, and no horse did this.",
    "The farrier’s box outside Barn 9 is short one shoeing hammer. It turned up in the river shallows at low water.",
    "The bay in Copper Penny’s stall has a lip tattoo still red and scabbed. Copper Penny’s was done last spring.",
    "Only the vet’s office keeps a tattoo needle. Dr. Coyle signed it out Thursday night, “for a yearling.” Riverbend has none.",
  ],

  photo: { caption: "Riverbend Park, from the river", scene: "harbor" },

  // The code is pencilled on the photo. The ferry stub catches the watchman; the check and envelope are red herrings.
  evidence: [
    { id: "ferry-stub", kind: "stub", label: "Riverbend Ferry · Horse Van", note: "Van and 1 head, west from the track landing. 11:40 p.m., Oct. 10" },
    { id: "bad-check", kind: "slip", label: "Riverside Trust · Returned", note: "Ck. 418, V. Beaumont to O. Garvey, $2,200. NO FUNDS." },
    { id: "bookie-envelope", kind: "envelope", label: "S. Bledsoe, 12 Wharf St.", note: "L. Cassidy, Barn 9, Riverbend Park. Postmarked Oct. 9" },
  ],

  cipher: {
    hiddenOn: "photo",
    plaintext: "PENNY HAS A NICK IN HIS LEFT EAR. THE BAY IN HIS STALL HAS NONE.",
    shift: 20,
    keepWords: ["EAR"],
    doodle: "key",
  },

  solution: { suspectId: "coyle", motiveId: "ringer", weaponId: "hammer" },

  endings: {
    closed: {
      headline: "Case Closed",
      text:
        "Dr. Ira Coyle bet his savings against Copper Penny with books out of town. Thursday he signed out the tattoo " +
        "needle and gave a look-alike bay Penny’s number. Friday night he paid Hap Boone fifty dollars to let a van " +
        "through, and Penny went west on the ferry. At dawn Owen Garvey knew his horse was gone. Coyle followed him to " +
        "the tack room with a shoeing hammer.",
      saved:
        "Copper Penny is brought home from across the river and scratched from the race. Lonnie Cassidy, who found the " +
        "body, goes back to rubbing horses.",
    },
    cold: {
      headline: "Gone Cold",
      text:
        "It was Dr. Ira Coyle, protecting the ringer he’d put in Copper Penny’s stall. He killed Garvey in the tack " +
        "room with a shoeing hammer, and the ringer ran last that afternoon.",
      cost:
        "Lonnie Cassidy found the body and had been selling tips to a bookmaker, and the police needed nothing more. " +
        "Coyle collected on his bets and went on checking lip tattoos at Riverbend.",
    },
  },

  shareLine: "Look it in the mouth.",
};
