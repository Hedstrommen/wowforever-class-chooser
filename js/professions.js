// Professions page renderer
(function () {
  const P = WOW_DATA.professions;

  document.getElementById("profGlobal").innerHTML =
    P.globalChanges.map(function (g) { return "<li>" + g + "</li>"; }).join("");

  document.getElementById("profRanks").innerHTML =
    P.ranks.map(function (r) {
      return "<li><span class='ability-name'>" + r.name + ":</span> requires character level " +
        r.level + ", skill range " + r.skill + "</li>";
    }).join("");

  if (P.campsiteObjects && document.getElementById("profCampsites")) {
    document.getElementById("profCampsites").innerHTML = P.campsiteObjects.map(function (c) {
      return "<li><span class='ability-name'>" + c.prof + ":</span> " + c.object + " — " + c.benefit + "</li>";
    }).join("");
  }

  document.getElementById("profList").innerHTML = P.list.map(function (p) {
    return (
      '<div class="race-card parchment">' +
        '<div class="card-header">' +
          '<span class="race-icon">' + WowIcon.icon(p.icon, 36) + "</span>" +
          '<span class="card-title" style="color:#4a3512">' + p.name + "</span>" +
          '<span class="faction-tag">' + p.type + "</span>" +
        "</div>" +
        (p.newRecipes ? '<p class="race-unlock">' + p.newRecipes + " new recipes in the beta datamine</p>" : "") +
        '<p class="race-why">' + p.note + "</p>" +
        ((p.changes || []).length ?
          '<ul class="ability-list">' + p.changes.map(function (ch) { return "<li>" + ch + "</li>"; }).join("") + "</ul>" :
          "") +
      "</div>"
    );
  }).join("");
})();
