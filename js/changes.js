// ============================================================
// WoW Forever — Changes page renderer
// ============================================================

(function () {
  const classes = WOW_DATA.classes;
  const races = WOW_DATA.races;

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
    const roles = c.roles.old.map(function (r) {
      return '<span class="role-pill">' + r + "</span>";
    }).concat(
      c.roles.new.map(function (r) {
        return '<span class="role-pill new">' + r + "</span>";
      })
    ).join("");

    const abilities = c.changes.map(function (ch) {
      return "<li><span class='ability-name'>" + ch.ability + ":</span> " + ch.note + "</li>";
    }).join("");

    return (
      '<div class="class-card parchment">' +
        '<div class="card-header">' +
          '<span class="class-icon">' + c.icon + "</span>" +
          '<span class="card-title" style="color:#5a3a12">' + c.name + "</span>" +
        "</div>" +
        '<p class="class-summary">' + c.summary + "</p>" +
        '<div class="role-row">' + roles + "</div>" +
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
    return (
      '<div class="race-card parchment">' +
        '<div class="card-header">' +
          '<span class="race-icon">' + r.icon + "</span>" +
          '<span class="card-title" style="color:#5a3a12">' + r.name + "</span>" +
          '<span class="faction-tag ' + r.faction.toLowerCase() + '">' + r.faction + "</span>" +
        "</div>" +
        '<p class="race-unlock">New in November: ' + r.newRoleUnlocks + "</p>" +
      "</div>"
    );
  }).join("");
})();
