// ============================================================
// WoW Forever — quiz engine
// Runs any quiz defined in js/quizzes.js (?q=full|race|class|faction),
// scores it, and renders a three-place podium plus full stats.
// Results are styled after the 2004 box art: cool blue for the
// Alliance, fiery red for the Horde.
// ============================================================

(function () {
  var params = new URLSearchParams(location.search);
  var QUIZ_ID = params.get("q") || "full";
  var QUIZ = QUIZ_DEFS[QUIZ_ID] || QUIZ_DEFS.full;
  var QUESTIONS = QUIZ.questions;

  var TOTAL = QUESTIONS.length;
  var step = 0;
  var classScores = {};
  var traitScores = {};
  var factionScores = {};
  var history = [];

  var quizContainer = document.getElementById("quizContainer");
  var resultContainer = document.getElementById("resultContainer");
  var questionBox = document.getElementById("questionBox");
  var progressFill = document.getElementById("progressFill");
  var progressText = document.getElementById("progressText");

  var FACTIONS = [
    { id: "Alliance", name: "The Alliance", color: "#4a7ec4", crest: "achievement_pvp_a_a", theme: "alliance", why: "Duty, honor and the enduring light of kings — you fight for something bigger and older than yourself." },
    { id: "Horde", name: "The Horde", color: "#c43a2e", crest: "achievement_pvp_h_h", theme: "horde", why: "Strength, survival and the unbreakable will of outcasts — you fight beside the people who earned your trust." },
    { id: "Both", name: "The Skyborne", color: "#6fa8c4", crest: "spell_nature_cyclone", theme: "both", why: "The open sky and every door left unbarred — you answer to no banner but your own course." }
  ];

  function factionOf(race) {
    return race.faction === "Both" ? "Both" : race.faction;
  }

  function record(answer) {
    if (answer.cls) {
      Object.keys(answer.cls).forEach(function (name) {
        classScores[name] = (classScores[name] || 0) + answer.cls[name];
      });
    }
    (answer.traits || []).forEach(function (t) {
      traitScores[t] = (traitScores[t] || 0) + 1;
    });
    if (answer.faction) {
      Object.keys(answer.faction).forEach(function (f) {
        factionScores[f] = (factionScores[f] || 0) + answer.faction[f];
      });
    }
    history.push(answer);
  }

  function renderQuestion() {
    var q = QUESTIONS[step];
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

  // ---- shared alignment metrics (full & class quizzes) ----

  function classAlignment(name) {
    var matched = history.filter(function (a) {
      if (a.cls && (a.cls[name] || 0) > 0) return true;
      var traits = a.traits || [];
      var classTraits = CLASS_TRAITS[name] || [];
      return traits.some(function (t) { return classTraits.indexOf(t) !== -1; });
    }).length;
    return matched / TOTAL;
  }

  function classScore(name) { return classScores[name] || 0; }

  function rankedClasses() {
    return WOW_DATA.classes.map(function (c) {
      return { name: c.name, obj: c, score: classScore(c.name), align: classAlignment(c.name) };
    }).sort(function (a, b) {
      if (b.align !== a.align) return b.align - a.align;
      return b.score - a.score;
    });
  }

  // ---- race metric (full & race quizzes) ----

  function raceAlignment(race) {
    var sum = 0, counted = 0;
    history.forEach(function (a) {
      var traits = a.traits || [];
      if (!traits.length) return;
      var matched = 0;
      traits.forEach(function (t) {
        if ((race.matchTraits || []).indexOf(t) !== -1) matched++;
      });
      sum += matched / traits.length;
      counted++;
    });
    return counted > 0 ? sum / counted : 0;
  }

  function rankedRaces() {
    return WOW_DATA.races.map(function (r) {
      return { name: r.name, obj: r, score: 0, align: raceAlignment(r) };
    }).sort(function (a, b) { return b.align - a.align; });
  }

  // ---- faction metric (faction quiz + race-based fallback) ----

  function factionAlignmentFromTraits(factionId) {
    // average of its member races' identity alignment
    var members = WOW_DATA.races.filter(function (r) { return factionOf(r) === factionId; });
    if (!members.length) return 0;
    var sum = 0;
    members.forEach(function (r) { sum += raceAlignment(r); });
    return sum / members.length;
  }

  function rankedFactions() {
    if (QUIZ.id === "faction") {
      var total = 0;
      FACTIONS.forEach(function (f) { total += factionScores[f.id] || 0; });
      return FACTIONS.map(function (f) {
        var pts = factionScores[f.id] || 0;
        return { name: f.name, obj: f, score: pts, align: total > 0 ? pts / total : 0 };
      }).sort(function (a, b) { return b.score - a.score; });
    }
    return FACTIONS.map(function (f) {
      return { name: f.name, obj: f, score: 0, align: factionAlignmentFromTraits(f.id) };
    }).sort(function (a, b) { return b.align - a.align; });
  }

  // ---- race pick for a class (full quiz) ----

  function pickRace(cls) {
    var candidates = WOW_DATA.races.filter(function (r) {
      return r.playableClasses.indexOf(cls.name) !== -1;
    });
    var best = null, bestAlign = -1;
    candidates.forEach(function (r) {
      var a = raceAlignment(r);
      if (a > bestAlign) { bestAlign = a; best = r; }
    });
    if (!best && candidates.length) best = candidates[0];
    return best;
  }

  function roleOf(cls) {
    var t = traitScores;
    if ((t["support"] || 0) > (t["tanky"] || 0) && (t["support"] || 0) > (t["aggressive"] || 0)) {
      return (cls.roles.indexOf("Healer") !== -1) ? "Healer" : cls.roles[0];
    }
    if ((t["tanky"] || 0) >= (t["aggressive"] || 0) && cls.roles.indexOf("Tank") !== -1) return "Tank";
    return cls.roles.filter(function (r) { return r !== "Tank"; })[0] || cls.roles[0];
  }

  // ---- rendering helpers ----

  function shade(hex, amount) {
    amount = typeof amount === "undefined" ? -22 : amount;
    var n = parseInt(hex.slice(1), 16);
    var r = Math.max(0, Math.min(255, ((n >> 16) & 255) + amount * 2.55));
    var g = Math.max(0, Math.min(255, ((n >> 8) & 255) + amount * 2.55));
    var b = Math.max(0, Math.min(255, (n & 255) + amount * 2.55));
    return "rgb(" + Math.round(r) + "," + Math.round(g) + "," + Math.round(b) + ")";
  }

  function statBar(label, fraction, highlight, color, dimmed) {
    var percent = Math.round(fraction * 100);
    var fillStyle = color
      ? "width:" + percent + "%;background:linear-gradient(180deg," + color + "," + shade(color) + ")"
      : "width:" + percent + "%";
    var labelStyle = color ? "color:" + shade(color, -30) : "";
    return (
      '<div class="stat-row' + (highlight ? " stat-top" : "") + (dimmed ? " stat-dimmed" : "") + '">' +
        '<span class="stat-label"' + (labelStyle ? ' style="' + labelStyle + '"' : "") + ">" + label +
          (dimmed ? '<span class="stat-note"> — not playable</span>' : "") + "</span>" +
        '<div class="stat-track"><div class="stat-fill" style="' + fillStyle + '"></div></div>' +
        '<span class="stat-value">' + percent + "%" + "</span>" +
      "</div>"
    );
  }

  function podiumSpot(entry, i, iconName, iconSrc, nameColor, subLabel, alignPct, theme) {
    var winner = i === 0;
    var barFill = "width:" + alignPct + "%;background:linear-gradient(180deg," + nameColor + "," + shade(nameColor) + ")";
    return (
      '<div class="podium-spot podium-' + (i + 1) + (winner ? " podium-winner" : "") + (theme ? " podium-" + theme : "") + '">' +
        (winner ? '<span class="podium-crown">👑</span>' : "") +
        '<span class="podium-rank">#' + (i + 1) + "</span>" +
        '<span class="podium-icon">' + WowIcon.icon(iconSrc, 44) + "</span>" +
        '<span class="podium-name" style="color:' + nameColor + '">' + iconName + "</span>" +
        (subLabel ? '<span class="podium-race" style="color:' + shade(nameColor, -25) + '">' + subLabel + "</span>" : "") +
        '<div class="podium-bar-track"><div class="podium-bar-fill" style="' + barFill + '"></div></div>' +
        '<span class="podium-score">' + alignPct + "% aligned</span>" +
      "</div>"
    );
  }

  function podiumHTML(ranked, spotFn) {
    // DOM order 2-1-3; the winner is elevated in the middle
    return '<div class="podium">' +
      (ranked[1] ? spotFn(ranked[1], 1) : "") +
      spotFn(ranked[0], 0) +
      (ranked[2] ? spotFn(ranked[2], 2) : "") +
    "</div>";
  }

  // ---- result screens ----

  function showResult() {
    progressFill.style.width = "100%";
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    var html = "";
    var themeClass = "";

    if (QUIZ.id === "full") {
      var ranked = rankedClasses();
      var cls = ranked[0].obj;
      var race = pickRace(cls);
      var role = roleOf(cls);
      themeClass = race ? (factionOf(race) === "Both" ? "result-both" : factionOf(race) === "Horde" ? "result-horde" : "result-alliance") : "";

      html += '<div class="result-hero">' +
        '<span class="result-icons">' + (race ? WowIcon.icon(race.icon, 52) + " " : "") + WowIcon.icon(cls.icon, 64) + "</span>" +
        '<p class="result-verdict">' + (race ? race.name + " " : "") + cls.name + "</p>" +
        '<p class="result-role-line">RECOMMENDED ROLE</p>' +
        '<span class="result-role-tag">' + role + "</span>" +
      "</div>";

      html += podiumHTML(ranked, function (r, i) {
        var spotRace = pickRace(r.obj);
        return podiumSpot(r, i, r.obj.name, r.obj.icon, r.obj.color,
          spotRace ? spotRace.name + " " + r.obj.name : "",
          Math.round(r.align * 100));
      });

      var reasons = [];
      reasons.push("Your answers scored highest for <strong>" + cls.name + "</strong> — " + cls.summary);
      reasons.push("You leaned toward a <strong>" + role + "</strong> playstyle, which " + cls.name + " delivers with its Forever toolkit.");
      if (race && (race.newCombos || []).indexOf(cls.name) !== -1) {
        reasons.push("<strong>" + race.name + " " + cls.name + "</strong> is one of November's brand-new combinations.");
      }
      if (race) reasons.push("As a <strong>" + race.name + "</strong>: " + race.why);
      reasons.push("Forever change to build around: <strong>" + cls.changes[0].ability + "</strong> — " + cls.changes[0].note);

      html += '<div class="result-why"><h3>Why</h3><ul class="ability-list">' +
        reasons.map(function (r) { return "<li>" + r + "</li>"; }).join("") + "</ul></div>";

      html += '<div class="stats-block"><h3>Class Alignment</h3>' +
        '<p class="stats-desc">Percentage of your answers that match each class.</p>' +
        ranked.map(function (r, i) { return statBar(r.obj.name, r.align, i === 0, r.obj.color); }).join("") + "</div>";

      var raceCandidates = WOW_DATA.races.map(function (r) {
        var playable = r.playableClasses.indexOf(cls.name) !== -1;
        return { r: r, playable: playable, align: raceAlignment(r) };
      }).sort(function (a, b) {
        if (a.playable !== b.playable) return a.playable ? -1 : 1;
        return b.align - a.align;
      });
      html += '<div class="stats-block"><h3>Race Alignment</h3>' +
        '<p class="stats-desc">How well every race matches the traits behind your answers. Dimmed races cannot play ' + cls.name + ".</p>" +
        raceCandidates.map(function (rc, i) {
          var top = rc.playable && i === 0;
          return statBar(rc.r.name, rc.align, top, rc.r.color, !rc.playable);
        }).join("") + "</div>";

    } else if (QUIZ.id === "race") {
      var rr = rankedRaces();
      var winner = rr[0].obj;
      themeClass = factionOf(winner) === "Both" ? "result-both" : factionOf(winner) === "Horde" ? "result-horde" : "result-alliance";

      html += '<div class="result-hero">' +
        '<span class="result-icons">' + WowIcon.icon(winner.icon, 64) + "</span>" +
        '<p class="result-verdict">' + winner.name + "</p>" +
        '<p class="result-role-line">' + winner.faction.toUpperCase() + "</p>" +
      "</div>";

      html += podiumHTML(rr, function (r, i) {
        var fac = FACTIONS.filter(function (f) { return f.id === factionOf(r.obj); })[0];
        return podiumSpot(r, i, r.obj.name, r.obj.icon, r.obj.color,
          factionOf(r.obj) === "Both" ? "either faction" : fac ? fac.name : "",
          Math.round(r.align * 100), fac ? fac.theme : "");
      });

      html += '<div class="result-why"><h3>Why</h3><ul class="ability-list">' +
        "<li>" + winner.why + "</li>" +
        "<li><strong>" + winner.name + "</strong> can play: " + winner.playableClasses.join(", ") + ".</li>" +
        ((winner.newCombos || []).length ? "<li><strong>New in Forever:</strong> " + winner.newCombos.join(", ") + ".</li>" : "") +
        "</ul></div>";

      html += '<div class="stats-block"><h3>Race Alignment</h3>' +
        '<p class="stats-desc">How well every race\'s identity matches the traits behind your answers.</p>' +
        rr.map(function (r, i) { return statBar(r.obj.name, r.align, i === 0, r.obj.color); }).join("") + "</div>";

    } else if (QUIZ.id === "class") {
      var cr = rankedClasses();
      var wcls = cr[0].obj;
      themeClass = "";

      html += '<div class="result-hero">' +
        '<span class="result-icons">' + WowIcon.icon(wcls.icon, 64) + "</span>" +
        '<p class="result-verdict">' + wcls.name + "</p>" +
        '<p class="result-role-line">ROLES</p>' +
        '<span class="result-role-tag">' + wcls.roles.join(" · ") + "</span>" +
      "</div>";

      html += podiumHTML(cr, function (r, i) {
        return podiumSpot(r, i, r.obj.name, r.obj.icon, r.obj.color, "", Math.round(r.align * 100));
      });

      html += '<div class="result-why"><h3>Why</h3><ul class="ability-list">' +
        "<li><strong>" + wcls.name + "</strong> — " + wcls.summary + "</li>" +
        "<li>Forever change to build around: <strong>" + wcls.changes[0].ability + "</strong> — " + wcls.changes[0].note + "</li>" +
        "</ul></div>";

      html += '<div class="stats-block"><h3>Class Alignment</h3>' +
        '<p class="stats-desc">Percentage of your answers that match each class.</p>' +
        cr.map(function (r, i) { return statBar(r.obj.name, r.align, i === 0, r.obj.color); }).join("") + "</div>";

    } else if (QUIZ.id === "faction") {
      var fr = rankedFactions();
      var wf = fr[0].obj;
      themeClass = wf.theme === "both" ? "result-both" : wf.theme === "horde" ? "result-horde" : "result-alliance";

      var crestIcon = {
        Alliance: "https://wow.zamimg.com/images/wow/icons/large/achievement_pvp_a_a.jpg",
        Horde: "https://wow.zamimg.com/images/wow/icons/large/achievement_pvp_h_h.jpg",
        Both: WOW_DATA.races.filter(function (r) { return r.name === "Skyborne"; })[0].icon
      };

      html += '<div class="result-hero">' +
        '<span class="result-icons">' + WowIcon.icon(crestIcon[wf.id], 64) + "</span>" +
        '<p class="result-verdict">' + wf.name + "</p>" +
        (wf.id === "Alliance" ? '<p class="result-role-line">FOR THE ALLIANCE</p>' : wf.id === "Horde" ? '<p class="result-role-line">FOR THE HORDE</p>' : '<p class="result-role-line">CHOOSE YOUR OWN PATH</p>') +
      "</div>";

      html += podiumHTML(fr, function (r, i) {
        return podiumSpot(r, i, r.obj.name, crestIcon[r.obj.id], r.obj.color, "", Math.round(r.align * 100), r.obj.theme);
      });

      var members = WOW_DATA.races.filter(function (r) { return factionOf(r) === wf.id; });
      html += '<div class="result-why"><h3>Why</h3><ul class="ability-list">' +
        "<li>" + wf.why + "</li>" +
        "<li><strong>" + wf.name + "</strong> races: " + members.map(function (m) { return m.name; }).join(", ") + ".</li>" +
        "</ul></div>";

      html += '<div class="stats-block"><h3>Faction Alignment</h3>' +
        '<p class="stats-desc">Share of your answers that point to each banner.</p>' +
        fr.map(function (r, i) { return statBar(r.obj.name, r.align, i === 0, r.obj.color); }).join("") + "</div>";
    }

    resultContainer.classList.add(themeClass);
    document.getElementById("resultBox").innerHTML = html;
    document.getElementById("restartBtn").addEventListener("click", function () {
      location.reload();
    });
  }

  var chooser = document.getElementById("quizChooser");
  if (params.get("q")) {
    chooser.classList.add("hidden");
    document.querySelector(".result-container .section-heading").textContent = QUIZ.heading;
    quizContainer.classList.remove("hidden");
    renderQuestion();
  } else {
    quizContainer.classList.add("hidden");
  }
})();
