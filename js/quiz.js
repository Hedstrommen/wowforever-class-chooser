// ============================================================
// WoW Forever — 10-question quiz + result engine
// Questions describe playstyle mechanics; scoring maps answers
// to the 9 real WoW Forever classes and their playable races.
// ============================================================

(function () {
  const QUESTIONS = [
    { text: "In a group activity, do you prefer to be the one doing, enabling, or protecting?",
      answers: [
        { text: "Doing — the outcome depends on my performance", cls: { Rogue: 2, Mage: 2, Hunter: 2, Warlock: 2 }, traits: ["aggressive"] },
        { text: "Enabling — I multiply what others can achieve", cls: { Priest: 2, Shaman: 2 }, traits: ["support"] },
        { text: "Protecting — I absorb pressure so others can work", cls: { Warrior: 3, Paladin: 2 }, traits: ["tanky"] },
        { text: "Whatever the situation is missing at the moment", cls: { Druid: 3 }, traits: ["versatile"] }
      ] },
    { text: "How do you like your primary resource to behave?",
      answers: [
        { text: "Builds up through action — momentum rewarded", cls: { Warrior: 2, Rogue: 2 }, traits: ["melee"] },
        { text: "A fixed pool that depletes and must be rationed", cls: { Mage: 2, Priest: 2 }, traits: ["magic"] },
        { text: "Mostly cooldown-driven; the resource matters less", cls: { Hunter: 2, Paladin: 1 }, traits: ["ranged"] },
        { text: "Several resources I convert between on the fly", cls: { Druid: 3, Shaman: 1 }, traits: ["versatile"] }
      ] },
    { text: "Something unexpected goes wrong mid-task. Your first instinct is to…",
      answers: [
        { text: "Take control of the situation yourself", cls: { Warrior: 2, Paladin: 2 }, traits: ["tanky"] },
        { text: "Reduce the problem to a manageable size", cls: { Mage: 2, Rogue: 2 }, traits: ["ranged"] },
        { text: "Stick to the plan and trust the structure", cls: { Rogue: 1, Hunter: 1, Warlock: 1 }, traits: ["ranged"] },
        { text: "Patch the damage and keep everyone going", cls: { Priest: 3, Shaman: 2 }, traits: ["support"] }
      ] },
    { text: "Do you like managing a second entity alongside yourself?",
      answers: [
        { text: "Yes — a companion is central to how I operate", cls: { Hunter: 3, Warlock: 2 }, traits: ["ranged"] },
        { text: "Occasionally useful, but never required", cls: { Mage: 2, Priest: 1 }, traits: ["magic"] },
        { text: "No — I want full personal control at all times", cls: { Rogue: 2, Warrior: 2 }, traits: ["aggressive", "melee"] },
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
        { text: "A priority list — structure with judgment calls", cls: { Hunter: 2, Warlock: 2 }, traits: ["ranged"] },
        { text: "Fully improvised; every situation is different", cls: { Druid: 3 }, traits: ["versatile"] }
      ] },
    { text: "How much do you value being able to operate completely alone?",
      answers: [
        { text: "Essential — I need to be self-sufficient by default", cls: { Hunter: 3, Warlock: 2 }, traits: ["ranged"] },
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
    { text: "When you learn something new, you most enjoy the moment when…",
      answers: [
        { text: "The fundamentals click and never waver", cls: { Warrior: 3, Rogue: 1 }, traits: ["melee"] },
        { text: "The rules bend and I find the exception", cls: { Mage: 2, Warlock: 1 }, traits: ["magic"] },
        { text: "The pieces connect into a bigger system", cls: { Shaman: 3, Druid: 2 }, traits: ["nature", "versatile"] },
        { text: "I can protect what I'm building", cls: { Paladin: 3, Priest: 1 }, traits: ["support"] }
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

  // which playstyle traits each class embodies — alignment is
  // measured against these, over ALL answers
  const CLASS_TRAITS = {
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
    // rank by the same alignment metric the user sees, so the
    // podium order always matches the percentages
    return WOW_DATA.classes.map(function (c) {
      const points = classScores[c.name] || 0;
      return { c: c, score: points, align: classAlignment(c.name) };
    }).sort(function (a, b) {
      if (b.align !== a.align) return b.align - a.align;
      return b.score - a.score;
    });
  }

  function pickRace(cls) {
    // pick by the same raceAlignment metric shown in the stats,
    // so the recommended race is always the top of the race chart
    const candidates = WOW_DATA.races.filter(function (r) {
      return r.playableClasses.indexOf(cls.name) !== -1;
    });
    let best = null, bestAlign = -1;
    candidates.forEach(function (r) {
      const a = raceAlignment(r);
      if (a > bestAlign) { bestAlign = a; best = r; }
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

  function classAlignment(name) {
    // percentage of ALL answers this class matches: it either scored
    // points in the answer or embodies one of the answer's traits
    const matched = history.filter(function (a) {
      if (a.cls && (a.cls[name] || 0) > 0) return true;
      const traits = a.traits || [];
      const classTraits = CLASS_TRAITS[name] || [];
      return traits.some(function (t) { return classTraits.indexOf(t) !== -1; });
    }).length;
    return matched / TOTAL;
  }

  function raceAlignment(race) {
    // average across all answers: how much of each answer's trait
    // picks this race's matchTraits cover (1 = full match)
    let sum = 0, counted = 0;
    history.forEach(function (a) {
      const traits = a.traits || [];
      if (!traits.length) return;
      let matched = 0;
      traits.forEach(function (t) {
        if ((race.matchTraits || []).indexOf(t) !== -1) matched++;
      });
      sum += matched / traits.length;
      counted++;
    });
    return counted > 0 ? sum / counted : 0;
  }

  function statBar(label, fraction, highlight, color) {
    const percent = Math.round(fraction * 100);
    const fillStyle = color
      ? "width:" + percent + "%;background:linear-gradient(180deg," + color + "," + shade(color) + ")"
      : "width:" + percent + "%";
    const labelStyle = color ? "color:" + shade(color, -30) : "";
    return (
      '<div class="stat-row' + (highlight ? " stat-top" : "") + '">' +
        '<span class="stat-label"' + (labelStyle ? ' style="' + labelStyle + '"' : "") + ">" + label + "</span>" +
        '<div class="stat-track"><div class="stat-fill" style="' + fillStyle + '"></div></div>' +
        '<span class="stat-value">' + percent + "%</span>" +
      "</div>"
    );
  }

  // lighten or darken a hex color by percent
  function shade(hex, amount) {
    amount = typeof amount === "undefined" ? -22 : amount;
    const n = parseInt(hex.slice(1), 16);
    const r = Math.max(0, Math.min(255, ((n >> 16) & 255) + amount * 2.55));
    const g = Math.max(0, Math.min(255, ((n >> 8) & 255) + amount * 2.55));
    const b = Math.max(0, Math.min(255, (n & 255) + amount * 2.55));
    return "rgb(" + Math.round(r) + "," + Math.round(g) + "," + Math.round(b) + ")";
  }

  function showResult() {
    progressFill.style.width = "100%";
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    const ranked = topClasses();
    const cls = ranked[0].c;
    const runnerUp = ranked[1] ? ranked[1].c : null;
    const third = ranked[2] ? ranked[2].c : null;
    const race = pickRace(cls);
    const role = roleOf(cls);

    // ---- podium: 2nd left, 1st center, 3rd right ----
    function podiumSpot(r, i) {
      const alignPct = Math.round(classAlignment(r.c.name) * 100);
      const barPct = alignPct;
      const winner = i === 0;
      const barFill = "width:" + barPct + "%;background:linear-gradient(180deg," + r.c.color + "," + shade(r.c.color) + ")";
      return (
        '<div class="podium-spot podium-' + (i + 1) + (winner ? " podium-winner" : "") + '">' +
          (winner ? '<span class="podium-crown">👑</span>' : "") +
          '<span class="podium-rank">#' + (i + 1) + "</span>" +
          '<span class="podium-icon">' + r.c.icon + "</span>" +
          '<span class="podium-name" style="color:' + r.c.color + '">' + r.c.name + "</span>" +
          '<div class="podium-bar-track"><div class="podium-bar-fill" style="' + barFill + '"></div></div>' +
          '<span class="podium-score">' + alignPct + "% aligned</span>" +
        "</div>"
      );
    }
    const podium =
      '<div class="podium">' +
        podiumSpot(ranked[1], 1) +
        podiumSpot(ranked[0], 0) +
        podiumSpot(ranked[2], 2) +
      "</div>";

    // ---- why ----
    const reasons = [];
    reasons.push("Your answers scored highest for <strong>" + cls.name + "</strong> — " + cls.summary);
    reasons.push("You leaned toward a <strong>" + role + "</strong> playstyle, which " + cls.name + " delivers with its Forever toolkit" +
      ((race && (race.newCombos || []).indexOf(cls.name) !== -1)
        ? " — and " + race.name + " " + cls.name + " is one of November's brand-new combinations." : "."));
    if (race) reasons.push("As a <strong>" + race.name + "</strong>: " + race.why);
    reasons.push("Forever change to build around: <strong>" + cls.changes[0].ability + "</strong> — " + cls.changes[0].note);

    // ---- class stats: ALL classes ----
    const classStats = ranked.map(function (r, i) {
      return statBar(r.c.name, r.align, i === 0, r.c.color);
    }).join("");

    // ---- race stats: ALL races playable by the winning class ----
    const raceCandidates = WOW_DATA.races.filter(function (r) {
      return r.playableClasses.indexOf(cls.name) !== -1;
    }).map(function (r) {
      return { r: r, align: raceAlignment(r) };
    }).sort(function (a, b) { return b.align - a.align; });

    const raceStats = raceCandidates.map(function (rc, i) {
      return statBar(rc.r.name, rc.align, i === 0, rc.r.color);
    }).join("");

    document.getElementById("resultBox").innerHTML =
      '<div class="result-hero">' +
        '<span class="result-icons">' + (race ? race.icon + " " : "") + cls.icon + "</span>" +
        '<p class="result-verdict">' + (race ? race.name + " " : "") + cls.name + "</p>" +
        '<p class="result-role-line">RECOMMENDED ROLE</p>' +
        '<span class="result-role-tag">' + role + "</span>" +
      "</div>" +
      '<div class="podium">' + podium + "</div>" +
      '<div class="result-why"><h3>Why</h3><ul class="ability-list">' +
      reasons.map(function (r) { return "<li>" + r + "</li>"; }).join("") +
      "</ul></div>" +
      '<div class="stats-block"><h3>Class Alignment</h3>' +
      '<p class="stats-desc">Percentage of your 10 answers that match each class.</p>' +
      classStats + "</div>" +
      '<div class="stats-block"><h3>Race Alignment</h3>' +
      '<p class="stats-desc">How well each playable race for ' + cls.name + " matches the traits behind your answers.</p>" +
      raceStats + "</div>";

    document.getElementById("restartBtn").addEventListener("click", function () {
      location.reload();
    });
  }

  renderQuestion();
})();
