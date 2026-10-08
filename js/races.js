// Races page renderer
(function () {
  document.getElementById("newCombos").innerHTML =
    WOW_DATA.newCombos.map(function (c) {
      return '<a class="combo-pill" href="classes.html#class-' + c.cls.toLowerCase() + '">' +
        c.race + " " + c.cls + "</a>";
    }).join("") +
    '<span class="combo-pill combo-new">+ the new Skyborne race</span>';

  document.getElementById("raceList").innerHTML = WOW_DATA.races.map(function (r) {
    const classTags = r.playableClasses.map(function (c) {
      return '<span class="role-pill">' + c + "</span>";
    }).join("");

    const newTags = (r.newCombos || []).filter(function (c) { return c !== "Entire race is new"; }).map(function (c) {
      return '<span class="role-pill new">' + c + "</span>";
    }).join("");

    const factionClass = r.faction === "Both" ? "both" : r.faction.toLowerCase();

    return (
      '<div class="race-card parchment">' +
        '<div class="card-header">' +
          '<span class="race-icon">' + WowIcon.icon(r.icon, 36) + "</span>" +
          '<span class="card-title" style="color:#4a3512">' + r.name + "</span>" +
          '<span class="faction-tag ' + factionClass + '">' + r.faction + "</span>" +
        "</div>" +
        '<div class="role-row">' + classTags + newTags + "</div>" +
        (r.factionNote ? '<p class="race-unlock">' + r.factionNote + "</p>" : "") +
        '<p class="race-why">' + r.why + "</p>" +
      "</div>"
    );
  }).join("");
})();
