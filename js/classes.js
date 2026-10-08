// Classes page renderer
(function () {
  const classes = WOW_DATA.classes;

  document.getElementById("globalChanges").innerHTML =
    '<h2 class="section-heading">What Changes for Every Class</h2>' +
    '<div class="parchment intro"><ul class="ability-list">' +
    WOW_DATA.globalChanges.slice(1).map(function (g) { return "<li>" + g + "</li>"; }).join("") +
    "</ul></div>";

  const tabsEl = document.createElement("div");
  tabsEl.className = "tabs";
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
    listEl.innerHTML = (letter === "ALL" ? classes : groups[letter]).map(classCard).join("");
    tabsEl.querySelectorAll(".tab").forEach(function (t) {
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

  listEl.parentNode.insertBefore(tabsEl, listEl);
  showLetter("ALL");
})();
