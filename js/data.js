// ============================================================
// WoW Forever — game data
// Sources: Blizzard Forever Deep Dive panels, class deep dives,
// Method.gg combination matrix, ConquestCapped class changes,
// wowclassicforever.info. Updated for the Nov 4 launch.
// Edit this file when official changes are confirmed.
// ============================================================

const WOW_DATA = {

  globalChanges: [
    "Datamined from the beta vs Classic Era: 113 brand-new talents, 300 changed talents and 264 changed spells across the nine classes.",
    "Hit is now one stat for spells, melee and ranged attacks; critical strike is merged the same way.",
    "Healing power adds a third of its value as damage, so healer gear works while soloing.",
    "Talent trees keep 7 rows and add a key talent at 16 points; 141 of 466 talents are new.",
    "Raid buffs moved out of the trees: Divine Spirit, Blessing of Kings, Consecration, Improved Mark of the Wild and Omen of Clarity are baseline.",
    "Dual Specialization unlocks at level 40, changed at class trainers in major cities.",
    "Riding training includes the mount — no separate mount purchase.",
    "Racial weapon bonuses now add critical strike chance instead of weapon skill."
  ],

  newCombos: [
    { race: "Human", cls: "Hunter" },
    { race: "Dwarf", cls: "Shaman" },
    { race: "Gnome", cls: "Priest" },
    { race: "Orc", cls: "Mage" },
    { race: "Troll", cls: "Warlock" },
    { race: "Undead", cls: "Paladin" }
  ],

  // ----------------------------------------------------------
  // CLASSES — real WoW Forever changes.
  // ----------------------------------------------------------
  classes: [
    {
      name: "Warrior",
      color: "#C79C6E",
      icon: "⚔",
      races: ["Human", "Dwarf", "Night Elf", "Gnome", "Orc", "Undead", "Tauren", "Troll", "Skyborne"],
      roles: ["Tank", "Melee DPS"],
      changes: [
        { ability: "Weaponmaster", note: "One talent replaces all four weapon specialization talents — bonuses adapt to the weapon you hold." },
        { ability: "Spearing Strike", note: "New Arms strike: extra 80% weapon damage against Giants, Dragonkin and mounted targets, and knocks riders off mounts." },
        { ability: "Vanguard", note: "New Protection talent lets you Charge in Defensive Stance — open pulls without stance dancing." },
        { ability: "Battle Shout", note: "Its boosting talent is gone; the improved version is baseline for every Warrior." },
        { ability: "Enrage", note: "Now any damaging hit has a 30% chance to trigger it, not just critical strikes against you." },
        { ability: "Victory Rush", note: "Baseline for every Warrior." },
        { ability: "Shield Block", note: "Two charges over 7 sec baseline (Classic had one 5 sec block)." },
        { ability: "Tactical Mastery", note: "Now a trainer spell, not a talent: keep up to 10 Rage when changing stances. Improved Tactical Mastery adds up to 15 more." },
        { ability: "Victory Rush (detail)", note: "Learned at 20: instant strike dealing 15% of Attack Power, heals you for 10% of max health, usable within 20 sec of a kill, 30 sec cooldown." },
        { ability: "Slam", note: "Now has an 18 sec cooldown; rank 3 arrives at level 38 (Classic waited until 46)." },
        { ability: "Thunder Clap", note: "Usable in Battle or Defensive Stance; rank 4 slows enemy attack speed by 20% (Classic: 10%) and hits up to 4 targets." },
        { ability: "Shield Wall", note: "15 min cooldown and 60% less damage for 12 sec (Classic: 30 min and 75% for 10 sec); shared cooldown with Retaliation/Recklessness appears gone." },
        { ability: "Intercept", note: "Three ranks trained at 30, 42 and 52." }
      ],
      summary: "One of the lightest reworks: the big attacks stay, clutter is cleared, tanks open pulls in Defensive Stance."
    },
    {
      name: "Paladin",
      color: "#F58CBA",
      icon: "✚",
      races: ["Human", "Dwarf", "Undead"],
      roles: ["Tank", "Healer", "Melee DPS"],
      changes: [
        { ability: "Holy Strike", note: "NEW baseline at level 6 — the attack cut from the 2004 beta. 40% weapon damage plus Holy damage on a 12 sec cooldown." },
        { ability: "Seal of Fury", note: "NEW tank seal: adds Holy damage per swing, turns half into an absorb with a shield, and its Judgement taunts from 10 yards." },
        { ability: "Judgement", note: "No longer consumes your Seal." },
        { ability: "Consecration", note: "Baseline at level 20; heavy damage and threat hit only the first four enemies." },
        { ability: "Twist of Light", note: "New Retribution capstone: swap Seals mid-fight and your next swing still applies the old one." },
        { ability: "Holy Shock", note: "Moved to 20 points in Holy (was 30) with a shorter cooldown." },
        { ability: "Templar's Bulwark", note: "New Protection talent: shield for 100% of max health for 8 sec on a 5 min cooldown." },
        { ability: "Blessing of Kings", note: "No longer a talent — learned from the trainer." },
        { ability: "Judgement (detail)", note: "10 yd range, 10 sec cooldown; judging Seal of Fury taunts for 4 sec." },
        { ability: "Seal of Fury ranks", note: "Seven ranks from level 10 to 58." },
        { ability: "Holy Strike ranks", note: "Eight ranks from level 6 to 60; several talents build on it." }
      ],
      summary: "The biggest rework of any class: Paladins can actually tank now, with a real taunt. Undead can be Paladins — the headline new combo."
    },
    {
      name: "Hunter",
      color: "#ABD473",
      icon: "🏹",
      races: ["Human", "Dwarf", "Night Elf", "Orc", "Tauren", "Troll", "Skyborne"],
      roles: ["Ranged DPS", "Melee DPS (Survival)"],
      changes: [
        { ability: "Aimed Shot", note: "No longer a talent — every Hunter learns it: 2 sec cast, cooldown shared with Multi-Shot." },
        { ability: "Lone Wolf", note: "New Marksmanship talent: 20% more damage with no pet out." },
        { ability: "Sniper Shot", note: "New Marksmanship capstone: a 4 sec cast that hits from up to 35 yards." },
        { ability: "Survival rework", note: "Survival is now a melee tree: full-weapon-damage kick on 8 sec cooldown, Mongoose Bite bleed, 50% more off-hand damage." },
        { ability: "Summon Hawk", note: "New Beast Mastery talent: hawk dive-bombs the target for 18 sec (shares cooldown with Arcane Shot)." },
        { ability: "Traps", note: "Cheaper, faster cooldowns, and they now root everything they catch." },
        { ability: "Human Hunters", note: "NEW: Humans can be Hunters — a strong pick with Sword Specialization." },
        { ability: "Aimed Shot (detail)", note: "Six ranks, first trained at 20; 2 sec cast (Classic: 3 sec), 6 sec cooldown shared with Multi-Shot." },
        { ability: "Aspect of the Beast", note: "Rank 1 now also adds 50 melee attack power (Classic only made you untrackable)." },
        { ability: "Call Pet", note: "Uses the generic name rather than pet-specific titles like Call Owl." }
      ],
      summary: "Three distinct playstyles: pet master, petless sniper, or melee trapper. Humans join the hunt."
    },
    {
      name: "Rogue",
      color: "#FFF569",
      icon: "🗡",
      races: ["Human", "Dwarf", "Night Elf", "Gnome", "Orc", "Undead", "Troll", "Skyborne"],
      roles: ["Melee DPS"],
      changes: [
        { ability: "Mutilate", note: "New Assassination talent at 20 points: strikes with both weapons at once, harder on poisoned targets, awards 2 Combo Points." },
        { ability: "Venom", note: "New Assassination capstone: finisher that raises poison damage by 30% for up to 21 sec." },
        { ability: "Weapon talents merged", note: "Combat's four weapon talents become one adaptive talent, like the Warrior's Weaponmaster." },
        { ability: "Hemorrhage", note: "Now boosts only your own Rupture instead of everyone's damage." },
        { ability: "Thousand Cuts", note: "New Subtlety capstone replacing Premeditation: Hemorrhage and Backstab cost less each time Rupture ticks." },
        { ability: "Kidney Shot synergy", note: "Stunned targets take 10% more damage from your poisons and attacks." },
        { ability: "Cold Blood", note: "Earlier in the tree and now works with Mutilate." },
        { ability: "One-handed axes", note: "NEW: Rogues can equip one-handed axes; Hack and Slash treats axe and sword as one weapon group." }
      ],
      summary: "Fewest new talents of any class, but Assassination becomes a real poison tree with Mutilate at its heart."
    },
    {
      name: "Priest",
      color: "#FFFFFF",
      icon: "✦",
      races: ["Human", "Dwarf", "Night Elf", "Gnome", "Undead", "Troll"],
      roles: ["Healer", "Ranged DPS"],
      changes: [
        { ability: "Penance", note: "New Discipline talent: 2 sec channel that hits an enemy or heals an ally three times, 12 sec cooldown." },
        { ability: "Prayer of Mending", note: "New Holy capstone: a heal that waits on the target until they take damage, then bounces up to 5 times." },
        { ability: "Shadowform", note: "Halves Mana cost of Shadow spells, cuts Physical damage taken by 15%, blocks only healing spells." },
        { ability: "Shadow Word: Death", note: "Baseline for all Priests at level 32; backlash is 10% of your max health." },
        { ability: "Racial spells refreshed", note: "Every race has its own pair of racial Priest spells — Gnome's Confounding Flash confuses up to 5 enemies for 3 sec. Fear Ward is open to every Priest." },
        { ability: "Divine Aegis", note: "Critical heals leave a shield worth 15% of the heal." },
        { ability: "Shadowform lifesteal", note: "Your Shadow damage now heals your party — the spec trades raid utility for staying power." },
        { ability: "Devouring Plague", note: "No longer an Undead racial — a regular Shadow spell for every Priest, rank 3 by level 38, 1 min cooldown." },
        { ability: "Fear Ward", note: "Baseline for every Priest with a 3 min cooldown. In Classic it was a Dwarf racial spell." },
        { ability: "Shadow Word: Death (detail)", note: "30 yd, instant, 15 sec cooldown; four ranks, first trained at 32." }
      ],
      summary: "Each tree gets a clear job: Discipline damages and heals, Holy gets a smart group heal, Shadow gets cheap self-sufficient damage."
    },
    {
      name: "Shaman",
      color: "#0070DD",
      icon: "⚡",
      races: ["Dwarf", "Orc", "Tauren", "Troll", "Skyborne"],
      roles: ["Healer", "Ranged DPS", "Melee DPS", "Off-tank (experimental)"],
      changes: [
        { ability: "Lava Burst", note: "New Elemental capstone: big Fire nuke, 10 sec cooldown, hits 20% harder with Flame Shock on the target." },
        { ability: "Riptide", note: "New Restoration capstone: instant heal plus heal over 15 sec, makes Chain Heal on that target 25% stronger." },
        { ability: "Rage of the Farseer", note: "New Enhancement capstone replacing Stormstrike at 31 points." },
        { ability: "Maelstrom Weapon", note: "Melee hits build stacks that make your next Lightning Bolt faster and cheaper, up to 5." },
        { ability: "Totem management", note: "Totems can be recalled for part of their Mana or moved without recasting." },
        { ability: "Enhancement tanking", note: "Parry returns as a talent with raised threat while Rockbiter Weapon is on; Stormstrike resets on dodge or parry." },
        { ability: "Ghost Wolf", note: "Improved Ghost Wolf lets you use it indoors." },
        { ability: "Dwarf Shamans", note: "NEW: Dwarves can be Shamans — the Alliance finally gets the class." },
        { ability: "Lightning Bolt", note: "Ranks 4-10 cast in 2.5 sec, half a second faster than Classic." },
        { ability: "Chain Lightning", note: "Also half a second faster: rank 1 is a 2 sec cast, 6 sec cooldown, 3 targets with 30% weaker jumps." },
        { ability: "Totemic Projection", note: "NEW: place your totems at a spot up to 30 yd away instead of at your feet. Totemic Recall is also in the spellbook." },
        { ability: "Call of the Elements", note: "NEW: drops up to four totems from your Totem Bar in a single 3 sec cast." },
        { ability: "Fire Nova", note: "Now a spell instead of a totem: instant, 10 sec cooldown, damages everything within 10 yd of your active Fire totem." },
        { ability: "Ghost Wolf (detail)", note: "3 sec outdoor cast at level 20, +40% speed; Improved Ghost Wolf rank 1 allows indoor use." }
      ],
      summary: "Four new headline abilities and totems you can actually manage. Dwarves bring Shaman to the Alliance."
    },
    {
      name: "Mage",
      color: "#69CCF0",
      icon: "✧",
      races: ["Human", "Gnome", "Orc", "Undead", "Troll", "Skyborne"],
      roles: ["Ranged DPS"],
      changes: [
        { ability: "Frostfire Bolt", note: "NEW baseline spell for every Mage — feeds both the Fire and Arcane procs like Fireball." },
        { ability: "Arcane Blast", note: "New Arcane talent: each cast makes your other spells hit 10% harder while Arcane Blast gets more expensive, up to 4 stacks." },
        { ability: "Heating Up", note: "New Fire talent: Fire crits speed up your next Pyroblast 25% per stack, up to 3 — takes well over half off the 6 sec cast." },
        { ability: "Fingers of Frost", note: "New Frost talent: your slows can make your next 2 spells treat the target as frozen (Ice Lance hits frozen targets 300% harder)." },
        { ability: "Ice Lance", note: "Joins the Frost tree as a key ability." },
        { ability: "Improved Counterspell", note: "First point is now a guaranteed 2 sec silence instead of a 50% chance at 4 sec." },
        { ability: "Orc Mages", note: "NEW: Orcs can be Mages — Blood Fury on a caster is a serious cooldown." },
        { ability: "Frostfire Bolt (detail)", note: "A 3 sec bolt that counts as both Fire and Frost: 40% slow and a 9 sec Frostfire DoT; three ranks, first trained at 40." },
        { ability: "Comprehend Scroll", note: "NEW utility spell at level 6 that deciphers an untranslated scroll." }
      ],
      summary: "The fewest removed talents of any class; each tree gains a proc to react to and a fresh rotation anchor."
    },
    {
      name: "Warlock",
      color: "#9482C9",
      icon: "☠",
      races: ["Human", "Gnome", "Orc", "Undead", "Troll"],
      roles: ["Ranged DPS", "Off-tank (Voidwalker)"],
      changes: [
        { ability: "Banes", note: "Curse of Agony is now Bane of Agony; Banes and Curses have separate limits — one of each on the same target." },
        { ability: "Wrack", note: "New Affliction capstone: channel dealing Shadow damage every second, boosting your other DoTs on the target 10%." },
        { ability: "Demonic Sacrifice", note: "Moved to 10 points, lasts 2 hours, each demon gives a different buff (Imp: 15% Shadow damage, Voidwalker: Mana regen...)." },
        { ability: "Demonic Pact", note: "New Demonology capstone: summoning a different demon no longer cancels your Demonic Sacrifice buff." },
        { ability: "Incinerate", note: "New Destruction capstone; Fire and Shadow spells now feed each other 10% more damage for 20 sec." },
        { ability: "Bane of Havoc", note: "Copies 15% of your damage on other targets onto one marked enemy." },
        { ability: "Decimation", note: "Below 35% health, Shadow Bolt and Searing Pain make your next Soul Fire 40% faster and Soul Shard-free." },
        { ability: "Troll Warlocks", note: "NEW: Trolls can be Warlocks — Berserking plus demons is a dark new path." },
        { ability: "Subjugate Demon", note: "Enslave Demon under a new name; three ranks, first trained at 30." },
        { ability: "Summon Incubus", note: "NEW in the Demonology book at 20: a 10 sec cast costing a Soul Shard." },
        { ability: "Bane of Doom", note: "Also renamed from Curse of Doom to a Bane." }
      ],
      summary: "The deepest rework: 22 new talents, 20 removed, and a Bane system that doubles your curse uptime."
    },
    {
      name: "Druid",
      color: "#FF7D0A",
      icon: "🐾",
      races: ["Night Elf", "Tauren", "Skyborne"],
      roles: ["Tank", "Healer", "Melee DPS", "Ranged DPS"],
      changes: [
        { ability: "Eclipse", note: "New Balance talent: each Wrath cuts 0.5 sec off your next 2 Starfires, up to 4 charges — a real alternating rotation." },
        { ability: "Berserk", note: "New Feral capstone: 15 sec where Mangle hits up to 3 targets, no cooldown, and builders get 100% more crit." },
        { ability: "Wild Growth", note: "New Restoration capstone: instant heal over time on the target and their whole party." },
        { ability: "Powershifting removed", note: "Furor no longer hands you 40 Energy on shift-in — only what you had plus 10 per second away." },
        { ability: "Tiger's Fury", note: "New talent turns it into an instant 60 Energy — burst instead of powershifting." },
        { ability: "Revive", note: "Every Druid gets an out-of-combat resurrection; Rebirth stays as the combat brez." },
        { ability: "Snake form", note: "Hidden in beta: the Wailing Caverns Embrace of the Viper set transforms a Druid into a serpent." },
        { ability: "Skyborne Druids", note: "NEW race option with unique sky-blue shapeshift forms built around an owlbear fantasy." },
        { ability: "Lacerate", note: "NEW baseline bear bleed: 15 Rage in Bear or Dire Bear Form, three ranks trained at 42, 50 and 58." },
        { ability: "Revive (detail)", note: "10 sec out-of-combat cast; Rebirth keeps its 30 min cooldown." },
        { ability: "Nature's Grasp & Omen of Clarity", note: "Both now trainer spells: Nature's Grasp at level 10, Omen of Clarity at 20." }
      ],
      summary: "Powershifting is dead; real cat burst, a Wrath/Starfire rhythm, and a third druid race with its own forms."
    }
  ],

  // ----------------------------------------------------------
  // RACES — real WoW Forever race changes.
  // "playableClasses" drives both the changes page and the quiz.
  // ----------------------------------------------------------
  races: [
    {
      name: "Human",
      color: "#9fa4ff",
      faction: "Alliance",
      matchTraits: ["aggressive", "melee", "ranged"],
      icon: "🛡",
      playableClasses: ["Warrior", "Paladin", "Hunter", "Rogue", "Priest", "Mage", "Warlock"],
      newCombos: ["Hunter"],
      why: "The flexible all-rounder: Sword Specialization makes Human Hunters and Warriors natural weapon masters, and Every Man for Himself breaks crowd control."
    },
    {
      name: "Dwarf",
      color: "#a8785a",
      faction: "Alliance",
      matchTraits: ["tanky", "support", "nature"],
      icon: "⛏",
      playableClasses: ["Warrior", "Paladin", "Hunter", "Rogue", "Priest", "Shaman"],
      newCombos: ["Shaman"],
      why: "Stoneform sheds bleed, poison and disease — on a Shaman it pairs with the elements for a tanky, unshakeable supporter."
    },
    {
      name: "Night Elf",
      color: "#7a8bff",
      faction: "Alliance",
      matchTraits: ["melee", "aggressive", "nature"],
      icon: "🌙",
      playableClasses: ["Warrior", "Hunter", "Rogue", "Priest", "Druid"],
      newCombos: [],
      why: "Shadowmeld and Quickness: dodge for tanks, stealth synergy for the ambush-minded, and the classic Druid homeland."
    },
    {
      name: "Gnome",
      color: "#8ee63f",
      faction: "Alliance",
      matchTraits: ["magic", "support", "ranged"],
      icon: "⚙",
      playableClasses: ["Warrior", "Rogue", "Mage", "Warlock", "Priest"],
      newCombos: ["Priest"],
      why: "Expansive Mind grows the biggest mana pool in the game — on a Priest it means more heals per bar, and Escape Artist counters roots for melee builds."
    },
    {
      name: "Orc",
      color: "#68a02c",
      faction: "Horde",
      matchTraits: ["aggressive", "melee", "magic"],
      icon: "🪓",
      playableClasses: ["Warrior", "Hunter", "Rogue", "Shaman", "Mage", "Warlock"],
      newCombos: ["Mage"],
      why: "Blood Fury is a flat damage cooldown that works on spells too — an Orc Mage trades tradition for raw destructive output, and Hardiness resists stuns."
    },
    {
      name: "Undead",
      color: "#93a29a",
      faction: "Horde",
      matchTraits: ["magic", "aggressive", "support"],
      icon: "💀",
      playableClasses: ["Warrior", "Rogue", "Priest", "Mage", "Warlock", "Paladin"],
      newCombos: ["Paladin"],
      why: "Will of the Forsaken breaks Fear and Charm — the headline combo of Forever: an Undead Paladin wielding the Light against the darkness that raised it, with a dedicated Forsaken storyline."
    },
    {
      name: "Tauren",
      color: "#a52a2a",
      faction: "Horde",
      matchTraits: ["tanky", "nature", "support"],
      icon: "🐄",
      playableClasses: ["Warrior", "Hunter", "Shaman", "Druid"],
      newCombos: [],
      why: "War Stomp interrupts a whole pack of enemies and extra health makes Tauren the sturdiest tanks and the classic Druid."
    },
    {
      name: "Troll",
      color: "#38b53f",
      faction: "Horde",
      matchTraits: ["aggressive", "ranged", "magic"],
      icon: "🔱",
      playableClasses: ["Warrior", "Hunter", "Rogue", "Priest", "Mage", "Shaman", "Warlock"],
      newCombos: ["Warlock"],
      why: "Berserking is haste that scales as you get hurt — a Troll Warlock stacks voodoo on demonic power, and Regeneration keeps you in the fight."
    },
    {
      name: "Skyborne",
      color: "#59c3e8",
      faction: "Both",
      matchTraits: ["versatile", "ranged", "nature"],
      icon: "🌪",
      playableClasses: ["Warrior", "Hunter", "Rogue", "Druid", "Shaman", "Mage"],
      newCombos: ["Entire race is new"],
      why: "The new race of Zephras Isle, choosing either faction at character creation. Walk on Air glides you through the world, Wind Blessed adds permanent Haste, and their Druid forms are unique sky-blue creations built on an owlbear fantasy. Windshaper (Horde) gets Shaman; High Order (Alliance) gets Mage.",
      factionNote: "Horde Windshaper adds Shaman; Alliance High Order adds Mage."
    }
  ],

  // ----------------------------------------------------------
  // PROFESSIONS — real WoW Forever profession changes.
  // ----------------------------------------------------------
  professions: {
    globalChanges: [
      "No new professions — the original 12 return, but every one of them is overhauled to matter while leveling, not just at endgame.",
      "600+ new recipes added across all professions, based on beta datamining.",
      "The Waylaid Supplies system from Season of Discovery returns: completed supply crates reward Merchant's Favor, spent on recipes via the Azeroth Commerce Authority or Durotar Supply and Logistics.",
      "Each profession gains three profession-specific campsite recipes: the first at skill 20, advanced ones drop from dungeon bosses as Blueprints.",
      "At skill 300, crafting professions can obtain a Certification that permanently unlocks an account-wide profession title.",
      "Gathering Manuals: early starting-zone quests offer Mining for Dummies, Wild Harvest, or Pelt Collecting for Beginners — each teaches the profession and grants +2 skill, up to 15.",
      "Healing Potions have moved from Alchemy into First Aid.",
      "Reagent bags are crafted items with a dedicated bag slot; combined bag support is built in.",
      "The Auction House uses the modern layout with search and commodity-style listings.",
      "Professions feed into the Legacy system's Professions tree with account-wide perks.",
      "Mages get a Research system that appears in the professions interface — a Mage-only feature, not a new profession."
    ],
    ranks: [
      { name: "Apprentice", level: 5, skill: "1–75" },
      { name: "Journeyman", level: 10, skill: "50–150" },
      { name: "Expert", level: 20, skill: "125–225" },
      { name: "Artisan", level: 35, skill: "200–300" }
    ],
    list: [
      { name: "Alchemy", type: "Primary", icon: "⚗", newRecipes: 72, note: "Overhauled low-level recipes; Healing Potions moved out to First Aid." },
      { name: "Blacksmithing", type: "Primary", icon: "🔨", newRecipes: 203, note: "The biggest recipe addition of any profession; meaningful gear from the earliest levels." },
      { name: "Enchanting", type: "Primary", icon: "✨", newRecipes: 63, note: "Reworked enchants that support the merged hit and crit stats." },
      { name: "Engineering", type: "Primary", icon: "🔧", newRecipes: 80, note: "Specializations return; campsite gadgets and Blueprint drops." },
      { name: "Leatherworking", type: "Primary", icon: "🧵", newRecipes: 289, note: "The second-largest recipe pool; profession-specific campsite objects." },
      { name: "Tailoring", type: "Primary", icon: "🪡", newRecipes: 186, note: "Cloth crafting expanded; reagent bags are crafted by tailors." },
      { name: "Herbalism", type: "Primary (gathering)", icon: "🌿", newRecipes: 3, note: "Feeds the Alchemy and Cooking rework; gathering perks in the Legacy Professions tree." },
      { name: "Mining", type: "Primary (gathering)", icon: "⛏", newRecipes: 5, note: "Mining for Dummies manual available from starting-zone quests." },
      { name: "Skinning", type: "Primary (gathering)", icon: "🔪", newRecipes: 3, note: "Pelt Collecting for Beginners manual; feeds the huge Leatherworking rework." },
      { name: "Cooking", type: "Secondary", icon: "🍳", newRecipes: 44, note: "Now very useful while leveling; upgraded campfires allow more campsite objects." },
      { name: "First Aid", type: "Secondary", icon: "🩹", newRecipes: 17, note: "Healing Potions moved here from Alchemy; bandages reworked." },
      { name: "Fishing", type: "Secondary", icon: "🎣", newRecipes: 3, note: "Tackle reworked; feeds the expanded Cooking recipe list." }
    ]
  },

  // ----------------------------------------------------------
  // WORLD — zones, dungeons, raids, systems and ruleset changes.
  // ----------------------------------------------------------
  world: {
    overview: [
      "WoW Forever is Blizzard's official take on Classic Plus: a permanent level-60 version of the original Azeroth that keeps growing horizontally instead of moving to expansions.",
      "The original continents of Eastern Kingdoms and Kalimdor remain the center of the experience — expanded with new content rather than replaced.",
      "More than 1,000 new quests are planned across the level 1–60 journey, including new starting-zone quests. There is no level scaling and no flying.",
      "Updated rendering: fog, better lighting and environments, with modern and Classic visual presets, HD/SD character models and Classic animations for HD models.",
      "Official gamepad support is included."
    ],
    zones: [
      { name: "Mount Hyjal", note: "One of the new regions named in Blizzard's What's Next recap — also home to the 20-player Hyjal Summit raid." },
      { name: "Shen'dralas", note: "New region expanding the ancient elven lands of the original game." },
      { name: "Riverglades", note: "New region among the launch zones." },
      { name: "Zephras Isle", note: "Starting zone of the new Skyborne race, with its own questing storyline." }
    ],
    dungeons: [
      { name: "Nine new dungeons", note: "Added from level 13 to 60, including the Hall of Thanes, Ruins of Lordaeron, City of Dalaran, the Drowned City, and the Excavation Site in the Wetlands." },
      { name: "Wailing Caverns secret", note: "The revamped Wailing Caverns hides the Embrace of the Viper set that transforms Druids into a serpent form." },
      { name: "Quest-first design", note: "Dungeon design is quest-driven; every dungeon drop has been re-examined with hundreds of new or adjusted items." }
    ],
    raids: [
      { name: "Barrow Deeps", note: "10-player raid, unlocking December 9 after launch." },
      { name: "Hyjal Summit", note: "20-player raid at launch window on the December 9 roadmap." },
      { name: "Onyxia's Lair", note: "Revamped as a 40-player raid." }
    ],
    systems: [
      { name: "Camping", note: "Cooking Fire expands into a Basic Campfire that creates a campsite: rest, vendors, repairs, profession workspaces and one-hour buffs. Nearby players can add up to three profession-created objects; matching camp and class buffs don't stack." },
      { name: "Legacy system", note: "Account-wide progression with three trees: Professions, Adventure and Resourcefulness. At launch you can spend up to 16 points per character, earning up to 65 account-wide; excess points feed a cosmetic reward track. Unlocks around level 25, earlier via profession mastery (150+) or full world exploration." },
      { name: "Rulesets replace realms", note: "Choose Normal, PvP or Roleplaying instead of a named realm — realmless, but friends still need the same ruleset and faction to group. Hardcore is a separate ecosystem planned after launch, with one-way progression out." },
      { name: "Transmog", note: "Optional — disabled via NPC. Classic Mode hides other players' transmogs. Green and blue BoP dungeon appearances go to all eligible looters; epic raid appearances only to the binder." },
      { name: "No boosts, no token", note: "No WoW Token and no character boosts. Included with a normal WoW subscription; the Skyborne race requires an optional upgrade pack." }
    ]
  }
};

if (typeof module !== "undefined") module.exports = WOW_DATA;
