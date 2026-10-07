// ============================================================
// WoW Forever — 20-question quiz + result engine
// Each answer adds weights to class scores and race traits.
// ============================================================

(function () {
  const QUESTIONS = [
    { text: "A dragon swoops down at your party. What do you do?",
      answers: [
        { text: "Stand your ground and take the hits", class: { Warrior: 3, Paladin: 2, DeathKnight: 2, Warlock: 1 }, traits: ["tanky", "melee"] },
        { text: "Shield your allies and mend their wounds", class: { Priest: 3, Paladin: 2, DeathKnight: 1 }, traits: ["support"] },
        { text: "Strike from the shadows before it sees you", class: { Rogue: 3, DemonHunter: 2 }, traits: ["aggressive", "melee"] },
        { text: "Blast it out of the sky with spells", class: { Mage: 3, Warlock: 2, Shaman: 1 }, traits: ["magic", "ranged"] }
      ] },
    { text: "Which weapon feels right in your hands?",
      answers: [
        { text: "A massive two-handed blade", class: { Warrior: 3, DeathKnight: 2, Paladin: 1 }, traits: ["melee", "tanky"] },
        { text: "Daggers, fast and poisoned", class: { Rogue: 3 }, traits: ["aggressive", "melee"] },
        { text: "A staff crackling with energy", class: { Mage: 3, Shaman: 2, Priest: 1 }, traits: ["magic", "ranged"] },
        { text: "My own two fists", class: { Monk: 3, DemonHunter: 2 }, traits: ["melee", "aggressive"] }
      ] },
    { text: "In a group of adventures, you are the one who…",
      answers: [
        { text: "Leads from the front", class: { Warrior: 2, Paladin: 3 }, traits: ["tanky"] },
        { text: "Keeps everyone alive", class: { Priest: 3, Shaman: 2, Monk: 1 }, traits: ["support"] },
        { text: "Deals the most damage", class: { Rogue: 2, Mage: 2, Hunter: 2, Warlock: 2 }, traits: ["aggressive"] },
        { text: "Reads the situation and adapts", class: { Druid: 3, Monk: 2 }, traits: ["versatile"] }
      ] },
    { text: "What kind of magic calls to you?",
      answers: [
        { text: "Fire and destruction", class: { Mage: 2, Warlock: 3 }, traits: ["magic", "aggressive"] },
        { text: "The Light and holiness", class: { Paladin: 3, Priest: 2 }, traits: ["support", "magic"] },
        { text: "Nature and the elements", class: { Shaman: 3, Druid: 2 }, traits: ["nature"] },
        { text: "Shadow and the void", class: { Priest: 2, Warlock: 2, DeathKnight: 2 }, traits: ["magic"] }
      ] },
    { text: "Your ally is at half health mid-fight. You…",
      answers: [
        { text: "Cast a healing spell immediately", class: { Priest: 3, Shaman: 2, Monk: 1 }, traits: ["support"] },
        { text: "Kill the enemy faster than it can hurt them", class: { Rogue: 2, Mage: 3, DemonHunter: 2 }, traits: ["aggressive"] },
        { text: "Taunt the enemy onto yourself", class: { Warrior: 2, Paladin: 3, DeathKnight: 2 }, traits: ["tanky"] },
        { text: "Buff them so they can handle it", class: { Paladin: 2, Mage: 2, Shaman: 1 }, traits: ["support"] }
      ] },
    { text: "Choose a fighting style:",
      answers: [
        { text: "Up close and personal", class: { Warrior: 2, Rogue: 2, Monk: 2, DemonHunter: 1 }, traits: ["melee"] },
        { text: "From a safe distance", class: { Hunter: 3, Mage: 2, Warlock: 2 }, traits: ["ranged"] },
        { text: "Shapeshifting between forms", class: { Druid: 4 }, traits: ["versatile", "nature"] },
        { text: "With a loyal companion at my side", class: { Hunter: 3, Warlock: 2, DeathKnight: 1 }, traits: ["ranged"] }
      ] },
    { text: "Do you prefer a pet or companion fighting beside you?",
      answers: [
        { text: "Yes, a beast of the wild", class: { Hunter: 4 }, traits: ["nature"] },
        { text: "Yes, a demon or undead servant", class: { Warlock: 3, DeathKnight: 2 }, traits: ["magic"] },
        { text: "No, I fight alone", class: { Rogue: 3, Warrior: 2, DemonHunter: 1 }, traits: ["aggressive"] },
        { text: "My companions are the spirits", class: { Shaman: 3, Priest: 1 }, traits: ["nature", "support"] }
      ] },
    { text: "You find treasure in a dungeon. What do you hope it is?",
      answers: [
        { text: "A gleaming set of plate armor", class: { Warrior: 2, Paladin: 3 }, traits: ["tanky"] },
        { text: "An ancient enchanted blade", class: { Warrior: 2, DeathKnight: 3 }, traits: ["melee"] },
        { text: "A staff of pure arcane power", class: { Mage: 3 }, traits: ["magic"] },
        { text: "Gold. Just gold.", class: { Rogue: 3 }, traits: ["aggressive"] }
      ] },
    { text: "Which do you value most in battle?",
      answers: [
        { text: "Survivability", class: { Warrior: 2, Paladin: 2, DeathKnight: 2 }, traits: ["tanky"] },
        { text: "Raw damage", class: { Rogue: 2, Mage: 2, DemonHunter: 2 }, traits: ["aggressive"] },
        { text: "Helping the group", class: { Priest: 3, Shaman: 1 }, traits: ["support"] },
        { text: "Versatility", class: { Druid: 4, Monk: 2 }, traits: ["versatile"] }
      ] },
    { text: "What terrain do you feel most at home in?",
      answers: [
        { text: "Snowy mountain peaks", class: { Shaman: 2, DeathKnight: 2 }, traits: ["tanky"] },
        { text: "Dark, haunted forests", class: { Druid: 2, Warlock: 2, DemonHunter: 1 }, traits: ["nature", "magic"] },
        { text: "Bustling city streets", class: { Rogue: 3, Monk: 1 }, traits: ["aggressive"] },
        { text: "Open plains under the sun", class: { Hunter: 3, Shaman: 1 }, traits: ["nature", "ranged"] }
      ] },
    { text: "The battle is won. How did you contribute?",
      answers: [
        { text: "I never fell, and neither did my allies", class: { Paladin: 3, Warrior: 2 }, traits: ["tanky", "support"] },
        { text: "I out-damaged everyone", class: { Mage: 2, Rogue: 2, Hunter: 2 }, traits: ["aggressive"] },
        { text: "My heals turned the tide", class: { Priest: 3, Shaman: 2 }, traits: ["support"] },
        { text: "I did a bit of everything", class: { Druid: 4, Monk: 2 }, traits: ["versatile"] }
      ] },
    { text: "Choose a mentor:",
      answers: [
        { text: "A grizzled old knight", class: { Warrior: 3, Paladin: 2 }, traits: ["melee", "tanky"] },
        { text: "A wise old wizard", class: { Mage: 3, Priest: 1 }, traits: ["magic"] },
        { text: "A shadowy assassin", class: { Rogue: 4 }, traits: ["aggressive"] },
        { text: "A wandering monk", class: { Monk: 4 }, traits: ["melee", "support"] }
      ] },
    { text: "What is your view on the Void and shadow magic?",
      answers: [
        { text: "It is a tool like any other", class: { Warlock: 2, Priest: 2, DeathKnight: 2 }, traits: ["magic"] },
        { text: "Tempting, but dangerous", class: { Mage: 2, DemonHunter: 2 }, traits: ["magic"] },
        { text: "An abomination to be purged", class: { Paladin: 3, Priest: 2 }, traits: ["support"] },
        { text: "I prefer the balance of nature", class: { Druid: 3, Shaman: 2 }, traits: ["nature"] }
      ] },
    { text: "Pick a color for your banner:",
      answers: [
        { text: "Gold and white", class: { Paladin: 3 }, traits: ["support"] },
        { text: "Blood red", class: { DeathKnight: 3, Warrior: 1 }, traits: ["aggressive"] },
        { text: "Deep arcane blue", class: { Mage: 3, Shaman: 1 }, traits: ["magic"] },
        { text: "Earthy green", class: { Druid: 3, Hunter: 2 }, traits: ["nature"] }
      ] },
    { text: "How do you handle a wild beast?",
      answers: [
        { text: "Tame it as my companion", class: { Hunter: 4 }, traits: ["nature"] },
        { text: "Track it and take it down", class: { Hunter: 2, Rogue: 2 }, traits: ["aggressive"] },
        { text: "Become it", class: { Druid: 4 }, traits: ["nature", "versatile"] },
        { text: "Command it with dark magic", class: { Warlock: 3 }, traits: ["magic"] }
      ] },
    { text: "Choose a drink at the tavern:",
      answers: [
        { text: "A whole keg of ale", class: { Warrior: 3, Monk: 1 }, traits: ["melee"] },
        { text: "A fine elven wine", class: { Priest: 2, Mage: 2 }, traits: ["magic"] },
        { text: "Something brewed from moonwell water", class: { Druid: 3, Mage: 1 }, traits: ["nature"] },
        { text: "Whatever gets the job done", class: { Rogue: 3, DemonHunter: 1 }, traits: ["aggressive"] }
      ] },
    { text: "What role do you want to play in a raid?",
      answers: [
        { text: "Main tank", class: { Warrior: 2, Paladin: 2, DeathKnight: 2, DemonHunter: 1 }, traits: ["tanky"] },
        { text: "Healer", class: { Priest: 3, Shaman: 1, Monk: 1 }, traits: ["support"] },
        { text: "Top damage dealer", class: { Rogue: 2, Mage: 2, Hunter: 2 }, traits: ["aggressive"] },
        { text: "Whatever the raid needs", class: { Druid: 3, Paladin: 1, Monk: 1 }, traits: ["versatile"] }
      ] },
    { text: "Are you a leader or a loner?",
      answers: [
        { text: "A leader — I protect my people", class: { Paladin: 3, Warrior: 2 }, traits: ["tanky", "support"] },
        { text: "A loner — I work best unseen", class: { Rogue: 4 }, traits: ["aggressive"] },
        { text: "A follower of ancient traditions", class: { Druid: 2, Shaman: 2, Monk: 2 }, traits: ["nature"] },
        { text: "A scholar — knowledge is power", class: { Mage: 3, Warlock: 1 }, traits: ["magic"] }
      ] },
    { text: "Finally: what draws you to adventure?",
      answers: [
        { text: "Glory in battle", class: { Warrior: 2, DemonHunter: 2 }, traits: ["aggressive", "melee"] },
        { text: "Protecting the innocent", class: { Paladin: 3, Priest: 2 }, traits: ["support"] },
        { text: "Uncovering forbidden secrets", class: { Warlock: 3, Mage: 1 }, traits: ["magic"] },
        { text: "The wild, untamed world", class: { Hunter: 2, Druid: 2, Shaman: 2 }, traits: ["nature"] }
      ] }
  ];

  const RACE_QUESTIONS = [
    { text: "Which homeland calls you home?",
      answers: [
        { text: "Stormwind's stone halls", traits: ["alliance", "melee"] },
        { text: "Ironforge's deep mines", traits: ["alliance", "tanky"] },
        { text: "Teldrassil's shadowed glades", traits: ["alliance", "nature"] },
        { text: "Orgrimmar's war camps", traits: ["horde", "aggressive"] },
        { text: "The Undercity's dark depths", traits: ["horde", "magic"] },
        { text: "Mulgore's open plains", traits: ["horde", "nature"] }
      ] }
  ];

  const TOTAL = QUESTIONS.length + RACE_QUESTIONS.length;
  let step = 0;
  const classScores = {};
  const traitScores = {};

  const quizContainer = document.getElementById("quizContainer");
  const resultContainer = document.getElementById("resultContainer");
  const questionBox = document.getElementById("questionBox");
  const progressFill = document.getElementById("progressFill");
  const progressText = document.getElementById("progressText");

  function allQuestions() { return QUESTIONS.concat(RACE_QUESTIONS); }

  function record(answer) {
    if (answer.class) {
      Object.keys(answer.class).forEach(function (name) {
        classScores[name] = (classScores[name] || 0) + answer.class[name];
      });
    }
    (answer.traits || []).forEach(function (t) {
      traitScores[t] = (traitScores[t] || 0) + 1;
    });
  }

  function renderQuestion() {
    const q = allQuestions()[step];
    progressFill.style.width = ((step) / TOTAL * 100) + "%";
    progressText.textContent = "Question " + (step + 1) + " of " + TOTAL;

    questionBox.innerHTML =
      '<p class="question-text">' + q.text + "</p>" +
      q.answers.map(function (a, i) {
        return '<button class="answer-btn" data-i="' + i + '">' + a.text + "</button>";
      }).join("");

    questionBox.querySelectorAll(".answer-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        record(q.answers[Number(this.dataset.i)]);
        step++;
        if (step < TOTAL) renderQuestion();
        else showResult();
      });
    });
  }

  function topClass() {
    let best = null, score = -1;
    WOW_DATA.classes.forEach(function (c) {
      const s = classScores[c.name] || 0;
      if (s > score) { score = s; best = c; }
    });
    return best;
  }

  function topRace(matchClass) {
    let best = null, score = -1;
    WOW_DATA.races.forEach(function (r) {
      let s = 0;
      r.traits.forEach(function (t) { s += traitScores[t] || 0; });
      if (matchClass && r.newRoleUnlocks.indexOf(matchClass.name) !== -1) s += 2;
      if (s > score) { score = s; best = r; }
    });
    return best;
  }

  function roleFromTraits() {
    if ((traitScores["support"] || 0) >= (traitScores["aggressive"] || 0) &&
        (traitScores["support"] || 0) >= (traitScores["tanky"] || 0)) return "Healer";
    if ((traitScores["tanky"] || 0) >= (traitScores["aggressive"] || 0)) return "Tank";
    return "Damage Dealer";
  }

  function showResult() {
    progressFill.style.width = "100%";
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    const cls = topClass();
    const race = topRace(cls);
    const role = roleFromTraits();
    const roleKnown = cls.roles.old.concat(cls.roles.new).indexOf(role) !== -1;
    const roleText = roleKnown ? role : cls.roles.old.concat(cls.roles.new)[0];

    const reasons = [];
    reasons.push("You scored highest for <strong>" + cls.name + "</strong> — " + cls.summary.toLowerCase());
    reasons.push("Your answers point toward a <strong>" + roleText + "</strong> playstyle" +
      (cls.roles.new.length && cls.roles.new.indexOf(roleText) !== -1
        ? ", a role newly unlocked for " + cls.name + " in November!" : "."));
    reasons.push("As a <strong>" + race.name + "</strong>: " + race.why);
    reasons.push("November change for " + cls.name + ": " + cls.changes[0].ability + " — " + cls.changes[0].note);

    document.getElementById("resultBox").innerHTML =
      '<p class="result-icons">' + race.icon + " " + cls.icon + "</p>" +
      '<p class="result-verdict">' + race.name + " " + cls.name + "</p>" +
      '<p class="result-sub">Recommended role: ' + roleText + "</p>" +
      '<div class="result-why"><h3>Why this is your destiny</h3><ul class="ability-list">' +
      reasons.map(function (r) { return "<li>" + r + "</li>"; }).join("") +
      "</ul></div>";

    document.getElementById("restartBtn").addEventListener("click", function () {
      location.reload();
    });
  }

  renderQuestion();
})();
