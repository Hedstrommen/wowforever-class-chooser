// ============================================================
// WoW Forever — 10-question quiz + result engine
// Questions describe playstyle mechanics; scoring maps answers
// to the 9 real WoW Forever classes and their playable races.
// ============================================================

(function () {
  const QUESTIONS = [
    { text: "When a fight starts, where do you want to be standing?",
      answers: [
        { text: "In front of the enemy, taking the hits", roles: { tank: 3, melee: 1 }, cls: { Warrior: 2, Paladin: 2 }, traits: ["tanky"] },
        { text: "In the enemy's face, dealing damage", roles: { melee: 3 }, cls: { Rogue: 2, Warrior: 1 }, traits: ["aggressive"] },
        { text: "At range, shooting or casting", roles: { ranged: 3 }, cls: { Hunter: 2, Mage: 2 }, traits: ["ranged"] },
        { text: "Behind my allies, keeping them alive", roles: { healer: 3 }, cls: { Priest: 2, Shaman: 1 }, traits: ["support"] }
      ] },
    { text: "How do you feel about managing a resource that builds up during combat?",
      answers: [
        { text: "I like it — rage or energy building as I fight", roles: {}, cls: { Warrior: 2, Rogue: 2 }, traits: ["melee"] },
        { text: "I prefer managing mana over a long fight", roles: {}, cls: { Mage: 2, Priest: 2 }, traits: ["magic"] },
        { text: "I like timing cooldowns and procs more than resources", roles: {}, cls: { Hunter: 2, Shaman: 2 }, traits: ["ranged"] },
        { text: "I want to switch between resources as the fight changes", roles: {}, cls: { Druid: 3 }, traits: ["versatile"] }
      ] },
    { text: "A pull goes badly and three enemies are loose. What's your instinct?",
      answers: [
        { text: "Pick them all up and hold them", roles: { tank: 3 }, cls: { Warrior: 2, Paladin: 2 }, traits: ["tanky"] },
        { text: "Polymorph, Sap, Banish — lock one down first", roles: { cc: 2, ranged: 1 }, cls: { Mage: 2, Rogue: 2 }, traits: ["ranged"] },
        { text: "Damage the one the tank is on; trust the plan", roles: {}, cls: { Rogue: 1, Mage: 1, Hunter: 1, Warlock: 1 }, traits: ["ranged"] },
        { text: "Heal through the chaos", roles: { healer: 3 }, cls: { Priest: 2, Shaman: 1 }, traits: ["support"] }
      ] },
    { text: "How do you feel about pets or companions?",
      answers: [
        { text: "A pet is core to my play — I manage it constantly", cls: { Hunter: 3, Warlock: 2 }, traits: ["ranged"] },
        { text: "Useful, but I don't want to depend on one", cls: { Mage: 2, Priest: 1 }, traits: ["magic"] },
        { text: "I fight alone, up close", cls: { Rogue: 2, Warrior: 2 }, traits: ["melee", "aggressive"] },
        { text: "My companions are the spirits and elements", cls: { Shaman: 3 }, traits: ["nature"] }
      ] },
    { text: "Which sounds more satisfying in a long dungeon run?",
      answers: [
        { text: "A big critical hit number appearing", cls: { Rogue: 2, Mage: 2, Warrior: 1 }, traits: ["aggressive"] },
        { text: "A perfectly timed crowd control", cls: { Mage: 2, Rogue: 1 }, traits: ["ranged"] },
        { text: "Keeping everyone alive through a bad pull", cls: { Priest: 3, Paladin: 1 }, traits: ["support"] },
        { text: "Holding threat while everything hits me", cls: { Warrior: 2, Paladin: 2 }, traits: ["tanky"] }
      ] },
    { text: "Do you prefer a set rotation or reacting to procs?",
      answers: [
        { text: "A strict rotation, executed perfectly", cls: { Rogue: 2, Warrior: 2 }, traits: ["melee"] },
        { text: "Reacting to random procs keeps it fresh", cls: { Mage: 3, Shaman: 2 }, traits: ["magic"] },
        { text: "Priority lists — flexible but planned", cls: { Hunter: 2, Warlock: 2 }, traits: ["ranged"] },
        { text: "It changes with the situation entirely", cls: { Druid: 3 }, traits: ["versatile"] }
      ] },
    { text: "How important is being able to solo content efficiently?",
      answers: [
        { text: "Very — I want to quest and farm without help", cls: { Hunter: 3, Warlock: 2 }, traits: ["ranged"] },
        { text: "Somewhat — group content is my main goal", cls: { Priest: 1, Paladin: 2 }, traits: ["support"] },
        { text: "I mostly play in groups anyway", cls: { Warrior: 1, Priest: 1 }, traits: ["support"] },
        { text: "I want options for both", cls: { Druid: 3, Shaman: 2 }, traits: ["versatile"] }
      ] },
    { text: "Threat and aggro management — how much do you want to think about it?",
      answers: [
        { text: "It's my job — I manage what everyone attacks", cls: { Warrior: 3, Paladin: 2 }, traits: ["tanky"] },
        { text: "I watch my own threat and back off when needed", cls: { Rogue: 2, Mage: 1 }, traits: ["aggressive"] },
        { text: "I want tools like threat reduction or fade", cls: { Priest: 2, Warlock: 1 }, traits: ["support"] },
        { text: "Rarely a concern for how I play", cls: { Hunter: 2, Mage: 1 }, traits: ["ranged"] }
      ] },
    { text: "Which do you enjoy more in PvP?",
      answers: [
        { text: "Locking someone down with stuns and poisons", cls: { Rogue: 3 }, traits: ["aggressive", "melee"] },
        { text: "Kiting them around while I stay safe", cls: { Hunter: 2, Mage: 2 }, traits: ["ranged"] },
        { text: "Outlasting them with healing and armor", cls: { Paladin: 2, Priest: 1 }, traits: ["support", "tanky"] },
        { text: "Fear, curses and damage over time", cls: { Warlock: 3 }, traits: ["magic"] }
      ] },
    { text: "Finally: which class identity draws you most?",
      answers: [
        { text: "Weapons, armor and martial discipline", cls: { Warrior: 3, Rogue: 1 }, traits: ["melee"] },
        { text: "The Light — protection and holy power", cls: { Paladin: 3 }, traits: ["support"] },
        { text: "Elements, spirits and nature", cls: { Shaman: 3, Druid: 2, Hunter: 1 }, traits: ["nature"] },
        { text: "Arcane, shadow or fel — knowledge as power", cls: { Mage: 2, Warlock: 2, Priest: 1 }, traits: ["magic"] }
      ] }
  ];

  const TOTAL = QUESTIONS.length;
  let step = 0;
  const classScores = {};
  const traitScores = {};
  const history = [];

  const quizContainer = document.getElementById("quizContainer");
  const resultContainer = document.getElementById("resultContainer");
  const questionBox = document.getElementById("questionBox");
  const progressFill = document.getElementById("progressFill");
  const progressText = document.getElementById("progressText");

  function record(answer) {
    if (answer.cls) {
      Object.keys(answer.cls).forEach(function (name) {
        classScores[name] = (classScores[name] || 0) + answer.cls[name];
      });
    }
    (answer.traits || []).forEach(function (t) {
      traitScores[t] = (traitScores[t] || 0) + 1;
    });
    history.push(answer);
  }

  function renderQuestion() {
    const q = QUESTIONS[step];
    progressFill.style.width = (step / TOTAL * 100) + "%";
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

  function topClasses() {
    return WOW_DATA.classes.map(function (c) {
      return { c: c, score: classScores[c.name] || 0 };
    }).sort(function (a, b) { return b.score - a.score; });
  }

  function pickRace(cls) {
    const candidates = WOW_DATA.races.filter(function (r) {
      return r.playableClasses.indexOf(cls.name) !== -1;
    });
    let best = null, score = -1;
    candidates.forEach(function (r) {
      let s = 0;
      (r.traits || []).forEach(function () {});
      // score race by trait overlap with quiz traits
      (r.matchTraits || []).forEach(function (t) { s += traitScores[t] || 0; });
      // new-combo bonus: recommend the new November options
      if ((r.newCombos || []).indexOf(cls.name) !== -1) s += 3;
      if (s > score) { score = s; best = r; }
    });
    if (!best && candidates.length) best = candidates[0];
    return best;
  }

  function roleOf(cls) {
    const t = traitScores;
    if ((t["support"] || 0) > (t["tanky"] || 0) && (t["support"] || 0) > (t["aggressive"] || 0)) {
      return (cls.roles.indexOf("Healer") !== -1) ? "Healer" : cls.roles[0];
    }
    if ((t["tanky"] || 0) >= (t["aggressive"] || 0) && cls.roles.indexOf("Tank") !== -1) return "Tank";
    return cls.roles.filter(function (r) { return r !== "Tank"; })[0] || cls.roles[0];
  }

  function showResult() {
    progressFill.style.width = "100%";
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    const ranked = topClasses();
    const cls = ranked[0].c;
    const runnerUp = ranked[1].c;
    const race = pickRace(cls);
    const role = roleOf(cls);

    const reasons = [];
    reasons.push("Your answers scored highest for <strong>" + cls.name + "</strong> — " + cls.summary);
    reasons.push("You leaned toward a <strong>" + role + "</strong> playstyle, which " + cls.name + " delivers with its Forever toolkit" +
      ((race && (race.newCombos || []).indexOf(cls.name) !== -1)
        ? " — and " + race.name + " " + cls.name + " is one of November's brand-new combinations." : "."));
    if (race) reasons.push("As a <strong>" + race.name + "</strong>: " + race.why);
    reasons.push("Forever change to build around: <strong>" + cls.changes[0].ability + "</strong> — " + cls.changes[0].note);
    if (runnerUp && ranked[1].score > 0) {
      reasons.push("Close second: <strong>" + runnerUp.name + "</strong>, if you want a different flavor of the same playstyle.");
    }

    document.getElementById("resultBox").innerHTML =
      '<p class="result-icons">' + (race ? race.icon + " " : "") + cls.icon + "</p>" +
      '<p class="result-verdict">' + (race ? race.name + " " : "") + cls.name + "</p>" +
      '<p class="result-sub">Recommended role: ' + role + "</p>" +
      '<div class="result-why"><h3>Why</h3><ul class="ability-list">' +
      reasons.map(function (r) { return "<li>" + r + "</li>"; }).join("") +
      "</ul></div>";

    document.getElementById("restartBtn").addEventListener("click", function () {
      location.reload();
    });
  }

  renderQuestion();
})();
