// ============================================================
// WoW Forever — game data
// Edit this file when official expansion changes are confirmed.
// Everything the site displays comes from this file.
// ============================================================

const WOW_DATA = {

  // ----------------------------------------------------------
  // CLASSES — changes summary + the roles each class can now play.
  // "roles.new" = roles unlocked by the November expansion.
  // ----------------------------------------------------------
  classes: [
    {
      name: "Warrior",
      color: "#C79C6E",
      icon: "⚔",
      roles: { old: ["Tank", "Melee DPS"], new: [] },
      changes: [
        { ability: "Charge", note: "Now usable in combat without talents; stun component removed." },
        { ability: "Stances", note: "Stance dancing no longer resets rage; stance bars are unified." },
        { ability: "Shield Slam", note: "Baseline for all Warriors, no longer Protection-only." }
      ],
      summary: "The classic frontliner. Fewer restrictions, same blunt force."
    },
    {
      name: "Paladin",
      color: "#F58CBA",
      icon: "✚",
      roles: { old: ["Tank", "Healer", "Melee DPS"], new: ["Ranged DPS"] },
      changes: [
        { ability: "Seal of Wrath", note: "NEW: converts melee strikes into ranged Holy damage." },
        { ability: "Blessings", note: "No longer overwrite other Paladins' blessings in a raid." },
        { ability: "Lay on Hands", note: "No longer consumes all mana." }
      ],
      summary: "Now a true ranged Holy damage dealer on top of the tank/healer toolkit."
    },
    {
      name: "Hunter",
      color: "#ABD473",
      icon: "🏹",
      roles: { old: ["Ranged DPS"], new: ["Tank", "Healer"] },
      changes: [
        { ability: "Pet Roles", note: "Pets can now be specced as tanking or support-healing companions." },
        { ability: "Aspect of the Wild", note: "NEW: party-wide nature damage bonus while active." },
        { ability: "Tranquilizing Focus", note: "NEW: long-cooldown pet ability that heals the party." }
      ],
      summary: "Pet-focused tanking and support healing join the classic ranged marksman."
    },
    {
      name: "Rogue",
      color: "#FFF569",
      icon: "🗡",
      roles: { old: ["Melee DPS"], new: ["Ranged DPS"] },
      changes: [
        { ability: "Thrown Weaponry", note: "NEW spec: fight entirely at range with poisons and thrown blades." },
        { ability: "Stealth", note: "Movement speed penalty removed while stealthed." },
        { ability: "Sap", note: "Now works on all enemy types, not just humanoids." }
      ],
      summary: "A full ranged assassin build is now viable, poisons and all."
    },
    {
      name: "Priest",
      color: "#FFFFFF",
      icon: "✦",
      roles: { old: ["Healer", "Ranged DPS"], new: ["Melee DPS"] },
      changes: [
        { ability: "Void Slash", note: "NEW: melee Shadow spellchain with lifesteal." },
        { ability: "Inner Fire", note: "No longer dispelled on hit — becomes a toggle." },
        { ability: "Fade", note: "Now also reduces threat of nearby allies." }
      ],
      summary: "Shadow melee weaving — cloth-wearing scythe of the Void."
    },
    {
      name: "Shaman",
      color: "#0070DD",
      icon: "⚡",
      roles: { old: ["Healer", "Ranged DPS", "Melee DPS"], new: ["Tank"] },
      changes: [
        { ability: "Rockbiter Bulwark", note: "NEW: Earth Shield-based tanking stance with block value from shields." },
        { ability: "Totems", note: "Now persist and move with the Shaman." },
        { ability: "Ghost Wolf", note: "Usable indoors; no longer dispelled by shapeshift effects." }
      ],
      summary: "Earth Shield tanking: granite-hard, storm-powered."
    },
    {
      name: "Mage",
      color: "#69CCF0",
      icon: "✧",
      roles: { old: ["Ranged DPS"], new: ["Healer"] },
      changes: [
        { ability: "Temporal Mending", note: "NEW: heals damage retroactively by rewinding it before it lands." },
        { ability: "Conjure Mana Strudel", note: "Restores both health and mana." },
        { ability: "Arcane Ward", note: "NEW: absorbs damage and converts it to party mana." }
      ],
      summary: "Time-mending: healing by undoing wounds before they happen."
    },
    {
      name: "Warlock",
      color: "#9482C9",
      icon: "☠",
      roles: { old: ["Ranged DPS"], new: ["Tank"] },
      changes: [
        { ability: "Metamorphosis", note: "NEW tanking form: demonic armor scales with Stamina." },
        { ability: "Drain Essence", note: "NEW: generates high threat while draining health." },
        { ability: "Soul Link", note: "Baseline for all Warlocks and their pets." }
      ],
      summary: "The demon tank is here — take the hits, drain them back."
    },
    {
      name: "Monk",
      color: "#00FF96",
      icon: "☯",
      roles: { old: ["Tank", "Healer", "Melee DPS"], new: ["Ranged DPS"] },
      changes: [
        { ability: "Chi Burst Volley", note: "NEW: ranged rotation built from Chi spenders." },
        { ability: "Roll", note: "No cooldown reduction needed; baseline two charges." },
        { ability: "Mistweaver", note: "Melee-healing hybrid playstyle fully supported." }
      ],
      summary: "Ranged Chi throwing joins the brew-swilling brawler toolkit."
    },
    {
      name: "Druid",
      color: "#FF7D0A",
      icon: "🐾",
      roles: { old: ["Tank", "Healer", "Melee DPS", "Ranged DPS"], new: [] },
      changes: [
        { ability: "Travel Form", note: "Adapts to terrain automatically (land/water/air)." },
        { ability: "Glyph of the Guardian", note: "NEW: Moonkin form now usable as a tanking form." },
        { ability: "Mark of the Wild", note: "Now covers all stats in one cast." }
      ],
      summary: "Still the jack-of-all-roles — now Moonkin can literally tank."
    },
    {
      name: "Death Knight",
      color: "#C41F3B",
      icon: "🜸",
      roles: { old: ["Tank", "Melee DPS"], new: ["Healer"] },
      changes: [
        { ability: "Death Coil Mend", note: "NEW: heals allies instead of harming enemies." },
        { ability: "Blood Presence", note: "Split into Tank presence and Healing presence." },
        { ability: "Raise Ally", note: "No longer requires reagents." }
      ],
      summary: "Necromantic healing: stitching allies back together with stolen life."
    },
    {
      name: "Demon Hunter",
      color: "#A330C9",
      icon: "🜂",
      roles: { old: ["Tank", "Melee DPS"], new: ["Ranged DPS", "Healer"] },
      changes: [
        { ability: "Fel Lash", note: "NEW: long-range fel whip ability enabling ranged DPS." },
        { ability: "Soul Barrier Mend", note: "NEW: converts absorbed souls into healing for allies." },
        { ability: "Double Jump", note: "Baseline glide now works in all zones." }
      ],
      summary: "Fel magic turned outward — now ranged damage and soul-healing."
    }
  ],

  // ----------------------------------------------------------
  // RACES — "newRoleUnlocks" = what November changed.
  // "traits" feed the quiz result reasoning.
  // ----------------------------------------------------------
  races: [
    {
      name: "Human",
      faction: "Alliance",
      icon: "🛡",
      newRoleUnlocks: "Can now be Priests, Druids, and Shaman.",
      traits: ["versatile", "alliance", "melee", "magic"],
      why: "Humans adapt to anything — every class path suits their ambition."
    },
    {
      name: "Dwarf",
      faction: "Alliance",
      icon: "⛏",
      newRoleUnlocks: "Can now be Mages, Druids, and Demon Hunters.",
      traits: ["alliance", "melee", "tanky", "ranged"],
      why: "Sturdy as the mountain itself, at home with steel or gunpowder."
    },
    {
      name: "Night Elf",
      faction: "Alliance",
      icon: "🌙",
      newRoleUnlocks: "Can now be Paladins, Mages, and Warlocks.",
      traits: ["alliance", "magic", "ranged", "nature"],
      why: "Ancient, shadowed, attuned to both Elune's magic and the wild."
    },
    {
      name: "Gnome",
      faction: "Alliance",
      icon: "⚙",
      newRoleUnlocks: "Can now be Priests, Druids, and Hunters.",
      traits: ["alliance", "magic", "ranged", "support"],
      why: "Small hands, enormous intellect — arcane tinkerers without equal."
    },
    {
      name: "Orc",
      faction: "Horde",
      icon: "🪓",
      newRoleUnlocks: "Can now be Priests, Mages, and Druids.",
      traits: ["horde", "melee", "aggressive", "tanky"],
      why: "Blood fury incarnate — the first through the breach, always."
    },
    {
      name: "Undead",
      faction: "Horde",
      icon: "💀",
      newRoleUnlocks: "Can now be Paladins, Druids, Monks, and Shaman.",
      traits: ["horde", "magic", "aggressive", "support"],
      why: "Will unbroken by death — shadow and plague at their command."
    },
    {
      name: "Tauren",
      faction: "Horde",
      icon: "🐄",
      newRoleUnlocks: "Can now be Rogues, Mages, and Warlocks.",
      traits: ["horde", "nature", "tanky", "support"],
      why: "Gentle giants of the plains — earth magic and raw strength."
    },
    {
      name: "Troll",
      faction: "Horde",
      icon: "🔱",
      newRoleUnlocks: "Can now be Paladins, Druids, and Warlocks.",
      traits: ["horde", "aggressive", "ranged", "nature"],
      why: "Regenerating berserkers — voodoo, haste, and no mercy."
    }
  ]
};

if (typeof module !== "undefined") module.exports = WOW_DATA;
