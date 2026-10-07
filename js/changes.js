// ============================================================
// WoW Forever — Changes page renderer
// ============================================================

(function () {
  const classes = WOW_DATA.classes;
  const races = WOW_DATA.races;

  // ---- Global changes ----
  const globalEl = document.getElementById("globalChanges");
  if (globalEl) {
    globalEl.innerHTML =
      '<h2 class="section-heading">What Changes for Every Class</h2>' +
      '<div class="parchment intro"><ul class="ability-list">' +
      WOW_DATA.globalChanges.map(function (g) { return "<li>" + g + "</li>"; }).join("") +
      "</ul></div>";
  }

  // ---- New combinations banner ----
  const combosEl = document.getElementById("newCombos");
  if (combosEl) {
    combosEl.innerHTML =
      '<h2 class="section-heading">New Race &amp; Class Combinations</h2>' +
      '<div class="combo-row">' +
      WOW_DATA.newCombos.map(function (c) {
        return '<a class="combo-pill" href="#class-' + c.cls.toLowerCase() + '">' +
          c.race + " " + c.cls + "</a>";
      }).join("") +
      '<span class="combo-pill combo-new">+ the new Skyborne race</span>' +
      "</div>";
  }

  // ---- Class tabs (first letter, plus ALL) ----
  const tabsEl = document.getElementById("classTabs");
  const listEl = document.getElementById("classList");

  const groups = {};
  classes.forEach(function (c) {
    const letter = c.name[0].toUpperCase();
    (groups[letter] = groups[letter] || []).push(c);
  });
  const letters = Object.keys(groups).sort();

  function classCard(c) {
    const raceTags = (c.races || []).map(function (r) {
      return '<span class="role-pill">' + r + "</span>";
    }).join("");

    const abilities = c.changes.map(function (ch) {
      return "<li><span class='ability-name'>" + ch.ability + ":</span> " + ch.note + "</li>";
    }).join("");

    const roles = (c.roles || []).map(function (r) {
      return '<span class="role-pill new">' + r + "</span>";
    }).join("");

    return (
      '<div class="class-card parchment" id="class-' + c.name.toLowerCase() + '">' +
        '<div class="card-header">' +
          '<span class="class-icon">' + c.icon + "</span>" +
          '<span class="card-title" style="color:' + c.color + '">' + c.name + "</span>" +
          '<span class="role-row" style="margin-left:auto">' + roles + "</span>" +
        "</div>" +
        '<p class="class-summary">' + c.summary + "</p>" +
        (raceTags ? '<div class="role-row"><span class="ability-name">Playable by:</span> ' + raceTags + "</div>" : "") +
        '<ul class="ability-list">' + abilities + "</ul>" +
      "</div>"
    );
  }

  function showLetter(letter) {
    listEl.innerHTML = (letter === "ALL" ? classes : groups[letter])
      .map(classCard).join("");
    document.querySelectorAll(".tab").forEach(function (t) {
      t.classList.toggle("active", t.dataset.letter === letter);
    });
  }

  ["ALL"].concat(letters).forEach(function (letter) {
    const b = document.createElement("button");
    b.className = "tab" + (letter === "ALL" ? " active" : "");
    b.textContent = letter;
    b.dataset.letter = letter;
    b.addEventListener("click", function () { showLetter(letter); });
    tabsEl.appendChild(b);
  });

  showLetter("ALL");

  // ---- Race cards ----
  document.getElementById("raceList").innerHTML = races.map(function (r) {
    const classTags = r.playableClasses.map(function (c) {
      return '<span class="role-pill">' + c + "</span>";
    }).join("");

    const newTags = (r.newCombos || []).map(function (c) {
      return '<span class="role-pill new">' + c + "</span>";
    }).join("");

    const factionClass = r.faction === "Both" ? "both" : r.faction.toLowerCase();

    return (
      '<div class="race-card parchment">' +
        '<div class="card-header">' +
          '<span class="race-icon">' + r.icon + "</span>" +
          '<span class="card-title" style="color:#5a3a12">' + r.name + "</span>" +
          '<span class="faction-tag ' + factionClass + '">' + r.faction + "</span>" +
        "</div>" +
        '<div class="role-row">' + classTags + newTags + "</div>" +
        (r.factionNote ? '<p class="race-unlock">' + r.factionNote + "</p>" : "") +
        '<p class="race-why">' + r.why + "</p>" +
      "</div>"
    );
  }).join("");
})();
