// ============================================================
// WoW Forever — quiz definitions
// The Full Destiny Quiz lives in quiz.js; these are the three
// shorter 10-question quizzes shown on the quiz chooser.
// ============================================================

var CLASS_TRAITS = {
  Warrior: ["melee", "tanky", "aggressive"],
  Paladin: ["support", "tanky", "melee"],
  Hunter: ["ranged", "nature", "versatile"],
  Rogue: ["aggressive", "melee", "ranged"],
  Priest: ["support", "magic", "ranged"],
  Shaman: ["nature", "support", "versatile"],
  Mage: ["magic", "ranged", "aggressive"],
  Warlock: ["magic", "aggressive", "ranged"],
  Druid: ["versatile", "nature", "tanky", "support"]
};

var QUIZ_DEFS = {

  // ----------------------------------------------------------
  // FULL DESTINY QUIZ — the original 15-question race + class
  // quiz, kept unchanged.
  // ----------------------------------------------------------
  full: {
    id: "full",
    title: "The Full Destiny Quiz",
    icon: "https://wow.zamimg.com/images/wow/icons/large/spell_arcane_focusedlight.jpg",
    subject: "Your race + class together",
    desc: "The original 15-question journey \u2014 race and class together, with the complete alignment stats.",
    heading: "Your Destiny Awaits",
    questions: [
      { text: "In a group activity, do you prefer to be the one doing, enabling, or protecting?",
        answers: [
          { text: "Doing \u2014 the outcome depends on my performance", cls: { Rogue: 2, Mage: 2, Hunter: 2, Warlock: 2 }, traits: ["aggressive"] },
          { text: "Enabling \u2014 I multiply what others can achieve", cls: { Priest: 2, Shaman: 2 }, traits: ["support"] },
          { text: "Protecting \u2014 I absorb pressure so others can work", cls: { Warrior: 3, Paladin: 2 }, traits: ["tanky"] },
          { text: "Whatever the situation is missing at the moment", cls: { Druid: 3 }, traits: ["versatile"] }
        ] },
      { text: "How do you like your primary resource to behave?",
        answers: [
          { text: "Builds up through action \u2014 momentum rewarded", cls: { Warrior: 2, Rogue: 2 }, traits: ["melee"] },
          { text: "A fixed pool that depletes and must be rationed", cls: { Mage: 2, Priest: 2 }, traits: ["magic"] },
          { text: "Mostly cooldown-driven; the resource matters less", cls: { Hunter: 2, Paladin: 1 }, traits: ["ranged"] },
          { text: "Several resources I convert between on the fly", cls: { Druid: 3, Shaman: 1 }, traits: ["versatile"] }
        ] },
      { text: "Something unexpected goes wrong mid-task. Your first instinct is to\u2026",
        answers: [
          { text: "Take control of the situation yourself", cls: { Warrior: 2, Paladin: 2 }, traits: ["tanky"] },
          { text: "Reduce the problem to a manageable size", cls: { Mage: 2, Rogue: 2 }, traits: ["ranged"] },
          { text: "Stick to the plan and trust the structure", cls: { Rogue: 1, Hunter: 1, Warlock: 1 }, traits: ["ranged"] },
          { text: "Patch the damage and keep everyone going", cls: { Priest: 3, Shaman: 2 }, traits: ["support"] }
        ] },
      { text: "Do you like managing a second entity alongside yourself?",
        answers: [
          { text: "Yes \u2014 a companion is central to how I operate", cls: { Hunter: 3, Warlock: 2 }, traits: ["ranged"] },
          { text: "Occasionally useful, but never required", cls: { Mage: 2, Priest: 1 }, traits: ["magic"] },
          { text: "No \u2014 I want full personal control at all times", cls: { Rogue: 2, Warrior: 2 }, traits: ["aggressive", "melee"] },
          { text: "Only if it's an extension of my own decisions", cls: { Shaman: 3 }, traits: ["nature"] }
        ] },
      { text: "Which feels better at the end of a long session?",
        answers: [
          { text: "A single decisive peak moment I created", cls: { Rogue: 2, Mage: 2, Warrior: 1 }, traits: ["aggressive"] },
          { text: "A near-invisible intervention that saved everything", cls: { Priest: 3, Paladin: 1 }, traits: ["support"] },
          { text: "Sustained high output, start to finish", cls: { Hunter: 2, Warlock: 2 }, traits: ["ranged"] },
          { text: "Being the reason nothing collapsed", cls: { Warrior: 2, Paladin: 2 }, traits: ["tanky"] }
        ] },
      { text: "Fixed routine or improvisation?",
        answers: [
          { text: "A fixed sequence I execute consistently", cls: { Rogue: 2, Warrior: 2 }, traits: ["melee"] },
          { text: "Random events I react to as they come", cls: { Mage: 3, Shaman: 2 }, traits: ["magic"] },
          { text: "A priority list \u2014 structure with judgment calls", cls: { Hunter: 2, Warlock: 2 }, traits: ["ranged"] },
          { text: "Fully improvised; every situation is different", cls: { Druid: 3 }, traits: ["versatile"] }
        ] },
      { text: "How much do you value being able to operate completely alone?",
        answers: [
          { text: "Essential \u2014 I need to be self-sufficient by default", cls: { Hunter: 3, Warlock: 2 }, traits: ["ranged"] },
          { text: "Nice, but groups are where I shine", cls: { Priest: 2, Paladin: 2 }, traits: ["support"] },
          { text: "Rarely relevant to how I choose to play", cls: { Warrior: 1, Rogue: 1 }, traits: ["aggressive"] },
          { text: "I want both, switchable at will", cls: { Druid: 3, Shaman: 2 }, traits: ["versatile"] }
        ] },
      { text: "How do you relate to attention and pressure on you?",
        answers: [
          { text: "I deliberately draw it toward myself", cls: { Warrior: 3, Paladin: 2 }, traits: ["tanky"] },
          { text: "I stay under it and out of sight", cls: { Rogue: 3 }, traits: ["aggressive"] },
          { text: "I shed it with the right tools when it comes", cls: { Priest: 2, Warlock: 1 }, traits: ["support"] },
          { text: "I keep distance so it rarely reaches me", cls: { Hunter: 2, Mage: 2 }, traits: ["ranged"] }
        ] },
      { text: "Against a difficult opponent, which approach do you trust?",
        answers: [
          { text: "Deny them options until they can't act", cls: { Rogue: 3 }, traits: ["aggressive", "melee"] },
          { text: "Stay out of reach and win on attrition", cls: { Hunter: 2, Mage: 2 }, traits: ["ranged"] },
          { text: "Simply last longer than they can", cls: { Paladin: 2, Priest: 1 }, traits: ["support", "tanky"] },
          { text: "Slow, accumulating pressure that wins late", cls: { Warlock: 3 }, traits: ["magic"] }
        ] },
      { text: "How do you prefer to spend the quiet stretches between the exciting parts?",
        answers: [
          { text: "Preparing \u2014 organizing tools and resources for what's next", cls: { Paladin: 2, Shaman: 1 }, traits: ["support", "tanky"] },
          { text: "Exploring \u2014 wandering off to see what else is out there", cls: { Hunter: 2, Druid: 2 }, traits: ["nature", "versatile"] },
          { text: "Practicing \u2014 refining the skills I already have", cls: { Rogue: 2, Warrior: 2 }, traits: ["melee", "aggressive"] },
          { text: "Studying \u2014 reading, researching, understanding the system", cls: { Mage: 2, Warlock: 1 }, traits: ["magic"] }
        ] },
      { text: "A group needs someone to step up, but nobody volunteers. You\u2026",
        answers: [
          { text: "Take charge immediately \u2014 hesitation costs more than mistakes", cls: { Warrior: 2, Paladin: 2 }, traits: ["tanky", "melee"] },
          { text: "Offer a quiet word to whoever looks most capable", cls: { Priest: 2, Shaman: 1 }, traits: ["support"] },
          { text: "Start solving the problem myself and let others follow", cls: { Rogue: 2, Mage: 1 }, traits: ["aggressive"] },
          { text: "Wait \u2014 the situation usually clarifies who should lead", cls: { Druid: 2, Hunter: 1 }, traits: ["versatile", "ranged"] }
        ] },
      { text: "What is your relationship with rules and constraints?",
        answers: [
          { text: "Rules exist for good reason; I work within them well", cls: { Paladin: 2, Warrior: 1 }, traits: ["support", "tanky"] },
          { text: "Rules are a starting point \u2014 I bend them where it counts", cls: { Warlock: 2, Rogue: 1 }, traits: ["aggressive", "magic"] },
          { text: "I prefer to keep every option open and decide case by case", cls: { Druid: 2, Shaman: 1 }, traits: ["versatile", "nature"] },
          { text: "I do my best work where the rules are already clear", cls: { Mage: 2, Hunter: 1 }, traits: ["ranged", "magic"] }
        ] },
      { text: "When you look back on your proudest moment, it involved\u2026",
        answers: [
          { text: "Outlasting something that should have beaten me", cls: { Warrior: 2, Paladin: 1, Warlock: 1 }, traits: ["tanky"] },
          { text: "A plan coming together exactly as designed", cls: { Mage: 2, Hunter: 1 }, traits: ["ranged", "magic"] },
          { text: "Helping someone through something hard", cls: { Priest: 2, Shaman: 2, Druid: 1 }, traits: ["support", "nature"] },
          { text: "An improvised move nobody saw coming", cls: { Rogue: 2, Shaman: 1 }, traits: ["aggressive", "versatile"] }
        ] },
      { text: "How do you recharge after a demanding period?",
        answers: [
          { text: "Alone \u2014 silence and space restore me", cls: { Rogue: 2, Hunter: 2, Mage: 1 }, traits: ["ranged", "aggressive"] },
          { text: "With a few close people I trust completely", cls: { Priest: 1, Paladin: 2, Shaman: 1 }, traits: ["support"] },
          { text: "Out in the open, far from walls and noise", cls: { Hunter: 2, Druid: 2 }, traits: ["nature"] },
          { text: "Absorbed in a project or fascination", cls: { Mage: 2, Warlock: 2 }, traits: ["magic", "versatile"] }
        ] },
      { text: "When you learn something new, you most enjoy the moment when\u2026",
        answers: [
          { text: "The fundamentals click and never waver", cls: { Warrior: 3, Rogue: 1 }, traits: ["melee"] },
          { text: "The rules bend and I find the exception", cls: { Mage: 2, Warlock: 1 }, traits: ["magic"] },
          { text: "The pieces connect into a bigger system", cls: { Shaman: 3, Druid: 2 }, traits: ["nature", "versatile"] },
          { text: "I can protect what I'm building", cls: { Paladin: 3, Priest: 1 }, traits: ["support"] }
        ] }
    ]
  },

  // ----------------------------------------------------------
  // RACE QUIZ — 10 identity questions, scored purely against
  // each race's matchTraits.
  // ----------------------------------------------------------
  race: {
    id: "race",
    title: "Race Quiz",
    icon: "https://wow.zamimg.com/images/wow/icons/large/achievement_character_human_male.jpg",
    subject: "Your race",
    desc: "10 questions about who you are — which of the nine races shares your identity.",
    heading: "Your People, Your Bloodline",
    questions: [
      { text: "What draws you to a character before anything else?",
        answers: [
          { text: "The power to act decisively when it matters", traits: ["aggressive", "melee"] },
          { text: "A connection to something older and wilder than kingdoms", traits: ["nature"] },
          { text: "Cleverness — winning with the mind, not the arm", traits: ["magic"] },
          { text: "Knowing I can hold the line when no one else will", traits: ["tanky"] }
        ] },
      { text: "Strangers arrive at your door, tired and far from home. You…",
        answers: [
          { text: "Offer them a meal and a place by the fire", traits: ["support"] },
          { text: "Ask what they did to end up here", traits: ["aggressive"] },
          { text: "Watch them from a distance before showing yourself", traits: ["versatile", "ranged"] },
          { text: "Take them in — the wilds demand we look after our own", traits: ["nature", "support"] }
        ] },
      { text: "Your idea of a perfect evening is…",
        answers: [
          { text: "A hearth, a forge, and something solid to mend", traits: ["tanky", "melee"] },
          { text: "Reading until the candle burns out", traits: ["magic"] },
          { text: "A long walk under open sky", traits: ["nature"] },
          { text: "Arguing a point until everyone concedes", traits: ["aggressive"] }
        ] },
      { text: "Which fault are you most willing to own?",
        answers: [
          { text: "I trust too easily", traits: ["support"] },
          { text: "I hold a grudge like a debt", traits: ["aggressive"] },
          { text: "I overthink every path before taking one", traits: ["magic", "versatile"] },
          { text: "I never ask for help, even when I need it", traits: ["tanky", "melee"] }
        ] },
      { text: "In a story, you are the one who…",
        answers: [
          { text: "Rides out to meet the enemy first", traits: ["aggressive", "melee"] },
          { text: "Keeps the group alive to see the ending", traits: ["support"] },
          { text: "Reads the signs no one else noticed", traits: ["magic", "versatile"] },
          { text: "Knows the land and leads through it", traits: ["nature", "ranged"] }
        ] },
      { text: "Choose a home:",
        answers: [
          { text: "A stone city built to outlast centuries", traits: ["tanky"] },
          { text: "A treetop village hidden in ancient forest", traits: ["nature"] },
          { text: "A workshop full of half-finished wonders", traits: ["magic", "versatile"] },
          { text: "Whatever fortress stands between danger and my people", traits: ["melee", "tanky"] }
        ] },
      { text: "People who know you well would call you…",
        answers: [
          { text: "Unshakable", traits: ["tanky", "melee"] },
          { text: "Insatiably curious", traits: ["magic", "versatile"] },
          { text: "Fierce when it counts", traits: ["aggressive"] },
          { text: "The one who shows up", traits: ["support", "nature"] }
        ] },
      { text: "Your relationship with tradition is…",
        answers: [
          { text: "It is the root I grow from", traits: ["nature", "support"] },
          { text: "It's useful until it's in my way", traits: ["aggressive", "versatile"] },
          { text: "I question every part of it — that's how it improves", traits: ["magic"] },
          { text: "I uphold it, especially when no one else will", traits: ["tanky"] }
        ] },
      { text: "Pick the compliment that lands best:",
        answers: [
          { text: "\u201cYou're the strongest person I know.\u201d", traits: ["melee", "tanky"] },
          { text: "\u201cYou always know exactly what to do.\u201d", traits: ["magic", "versatile"] },
          { text: "\u201cI'd follow you into anything.\u201d", traits: ["aggressive"] },
          { text: "\u201cYou were there when no one else was.\u201d", traits: ["support", "nature"] }
        ] },
      { text: "When the world gets loud, you turn…",
        answers: [
          { text: "Outward — into the noise, to shape it myself", traits: ["aggressive", "melee"] },
          { text: "Inward — to study, tinker, understand", traits: ["magic"] },
          { text: "Away — to some high, quiet place", traits: ["nature", "ranged"] },
          { text: "Toward the people who need me", traits: ["support"] }
        ] }
    ]
  },

  // ----------------------------------------------------------
  // CLASS QUIZ — 10 playstyle questions, scored against the
  // nine classes the same way the full quiz scores them.
  // ----------------------------------------------------------
  class: {
    id: "class",
    title: "Class Quiz",
    icon: "https://wow.zamimg.com/images/wow/icons/large/classicon_warrior.jpg",
    subject: "Your class",
    desc: "10 questions about how you play — which of the nine classes fits your instincts.",
    heading: "Your Calling Awaits",
    questions: [
      { text: "In a group activity, do you prefer to be the one doing, enabling, or protecting?",
        answers: [
          { text: "Doing — the outcome depends on my performance", cls: { Rogue: 2, Mage: 2, Hunter: 2, Warlock: 2 } },
          { text: "Enabling — I multiply what others can achieve", cls: { Priest: 2, Shaman: 2 } },
          { text: "Protecting — I absorb pressure so others can work", cls: { Warrior: 3, Paladin: 2 } },
          { text: "Whatever the situation is missing at the moment", cls: { Druid: 3 } }
        ] },
      { text: "How do you like your primary resource to behave?",
        answers: [
          { text: "Builds up through action — momentum rewarded", cls: { Warrior: 2, Rogue: 2 } },
          { text: "A fixed pool that depletes and must be rationed", cls: { Mage: 2, Priest: 2 } },
          { text: "Mostly cooldown-driven; the resource matters less", cls: { Hunter: 2, Paladin: 1 } },
          { text: "Several resources I convert between on the fly", cls: { Druid: 3, Shaman: 1 } }
        ] },
      { text: "Do you like managing a second entity alongside yourself?",
        answers: [
          { text: "Yes — a companion is central to how I operate", cls: { Hunter: 3, Warlock: 2 } },
          { text: "Occasionally useful, but never required", cls: { Mage: 2, Priest: 1 } },
          { text: "No — I want full personal control at all times", cls: { Rogue: 2, Warrior: 2 } },
          { text: "Only if it's an extension of my own decisions", cls: { Shaman: 3 } }
        ] },
      { text: "Fixed routine or improvisation?",
        answers: [
          { text: "A fixed sequence I execute consistently", cls: { Rogue: 2, Warrior: 2 } },
          { text: "Random events I react to as they come", cls: { Mage: 3, Shaman: 2 } },
          { text: "A priority list — structure with judgment calls", cls: { Hunter: 2, Warlock: 2 } },
          { text: "Fully improvised; every situation is different", cls: { Druid: 3 } }
        ] },
      { text: "Against a difficult opponent, which approach do you trust?",
        answers: [
          { text: "Deny them options until they can't act", cls: { Rogue: 3 } },
          { text: "Stay out of reach and win on attrition", cls: { Hunter: 2, Mage: 2 } },
          { text: "Simply last longer than they can", cls: { Paladin: 2, Priest: 1 } },
          { text: "Slow, accumulating pressure that wins late", cls: { Warlock: 3 } }
        ] },
      { text: "How do you relate to attention and pressure on you?",
        answers: [
          { text: "I deliberately draw it toward myself", cls: { Warrior: 3, Paladin: 2 } },
          { text: "I stay under it and out of sight", cls: { Rogue: 3 } },
          { text: "I shed it with the right tools when it comes", cls: { Priest: 2, Warlock: 1 } },
          { text: "I keep distance so it rarely reaches me", cls: { Hunter: 2, Mage: 2 } }
        ] },
      { text: "How much do you value being able to operate completely alone?",
        answers: [
          { text: "Essential — I need to be self-sufficient by default", cls: { Hunter: 3, Warlock: 2 } },
          { text: "Nice, but groups are where I shine", cls: { Priest: 2, Paladin: 2 } },
          { text: "Rarely relevant to how I choose to play", cls: { Warrior: 1, Rogue: 1 } },
          { text: "I want both, switchable at will", cls: { Druid: 3, Shaman: 2 } }
        ] },
      { text: "What is your relationship with rules and constraints?",
        answers: [
          { text: "Rules exist for good reason; I work within them well", cls: { Paladin: 2, Warrior: 1 } },
          { text: "Rules are a starting point — I bend them where it counts", cls: { Warlock: 2, Rogue: 1 } },
          { text: "I prefer to keep every option open and decide case by case", cls: { Druid: 2, Shaman: 1 } },
          { text: "I do my best work where the rules are already clear", cls: { Mage: 2, Hunter: 1 } }
        ] },
      { text: "When you look back on your proudest moment, it involved…",
        answers: [
          { text: "Outlasting something that should have beaten me", cls: { Warrior: 2, Paladin: 1, Warlock: 1 } },
          { text: "A plan coming together exactly as designed", cls: { Mage: 2, Hunter: 1 } },
          { text: "Helping someone through something hard", cls: { Priest: 2, Shaman: 2, Druid: 1 } },
          { text: "An improvised move nobody saw coming", cls: { Rogue: 2, Shaman: 1 } }
        ] },
      { text: "How do you prefer to spend the quiet stretches between the exciting parts?",
        answers: [
          { text: "Preparing — organizing tools and resources for what's next", cls: { Paladin: 2, Shaman: 1 } },
          { text: "Exploring — wandering off to see what else is out there", cls: { Hunter: 2, Druid: 2 } },
          { text: "Practicing — refining the skills I already have", cls: { Rogue: 2, Warrior: 2 } },
          { text: "Studying — reading, researching, understanding the system", cls: { Mage: 2, Warlock: 1 } }
        ] }
    ]
  },

  // ----------------------------------------------------------
  // FACTION QUIZ — 10 questions, Alliance vs Horde, with the
  // Skyborne "choose your own path" as a third outcome.
  // ----------------------------------------------------------
  faction: {
    id: "faction",
    title: "Faction Quiz",
    icon: "https://wow.zamimg.com/images/wow/icons/large/achievement_pvp_a_a.jpg",
    subject: "Your faction — Alliance, Horde, or the Skyborne's road",
    desc: "10 questions about what you stand for — Alliance, Horde, or the Skyborne's open road.",
    heading: "For the Alliance, or For the Horde?",
    questions: [
      { text: "A stranger's cart is stuck in the mud on the road. You…",
        answers: [
          { text: "Help immediately — that's what decent folk do", faction: { Alliance: 2 } },
          { text: "Help, but expect a favor owed in return", faction: { Horde: 2 } },
          { text: "Help only if they ask — pride deserves respect", faction: { Both: 2 } }
        ] },
      { text: "Your people are strongest when they are…",
        answers: [
          { text: "Bound by shared ideals and law", faction: { Alliance: 2 } },
          { text: "Bound by shared strength and survival", faction: { Horde: 2 } },
          { text: "Bound by nothing — free to come and go", faction: { Both: 2 } }
        ] },
      { text: "Which would you rather be accused of?",
        answers: [
          { text: "Being too proud", faction: { Alliance: 1, Horde: 1 } },
          { text: "Being too stubborn", faction: { Alliance: 2 } },
          { text: "Being too ambitious", faction: { Horde: 2 } },
          { text: "Being too hard to pin down", faction: { Both: 2 } }
        ] },
      { text: "A city you're visiting bans one of your old customs. You…",
        answers: [
          { text: "Follow the law; my home customs stay at home", faction: { Alliance: 2 } },
          { text: "Keep the custom anyway — no one forbids my heritage", faction: { Horde: 2 } },
          { text: "Move on; there are other cities", faction: { Both: 2 } }
        ] },
      { text: "Victory is most satisfying when it's…",
        answers: [
          { text: "Won together, under one banner", faction: { Alliance: 1, Horde: 1 } },
          { text: "Earned through discipline and honor", faction: { Alliance: 2 } },
          { text: "Taken from a stronger foe", faction: { Horde: 2 } },
          { text: "Won on my own terms", faction: { Both: 2 } }
        ] },
      { text: "Choose the oath that rings truest:",
        answers: [
          { text: "\u201cI will stand watch so others may sleep.\u201d", faction: { Alliance: 2 } },
          { text: "\u201cNever again will we be broken.\u201d", faction: { Horde: 2 } },
          { text: "\u201cThe sky belongs to no one.\u201d", faction: { Both: 2 } }
        ] },
      { text: "History books should remember your side for its…",
        answers: [
          { text: "Kings, laws and shining cities", faction: { Alliance: 2 } },
          { text: "Survivors, warriors and unbreakable will", faction: { Horde: 2 } },
          { text: "Wanderers who owed nothing to anyone", faction: { Both: 2 } }
        ] },
      { text: "Your leader gives an order you privately doubt. You…",
        answers: [
          { text: "Obey — the chain holds because we hold it", faction: { Alliance: 2 } },
          { text: "Say so to their face, then decide", faction: { Horde: 2 } },
          { text: "Bow out of the whole endeavor", faction: { Both: 2 } }
        ] },
      { text: "A monument falls that your grandfather helped build. You…",
        answers: [
          { text: "Vow to rebuild it exactly as it was", faction: { Alliance: 2 } },
          { text: "Build something new from the stones", faction: { Horde: 1, Both: 1 } },
          { text: "Let the past be the past", faction: { Both: 1, Horde: 1 } }
        ] },
      { text: "At the end of the story, your allegiance was…",
        answers: [
          { text: "To a kingdom that will outlive me", faction: { Alliance: 2 } },
          { text: "To the people who fought beside me", faction: { Horde: 2 } },
          { text: "To wherever the wind took me", faction: { Both: 2 } }
        ] }
    ]
  }
};

if (typeof module !== "undefined") module.exports = { QUIZ_DEFS: QUIZ_DEFS, CLASS_TRAITS: CLASS_TRAITS };
