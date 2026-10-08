// World page renderer
(function () {
  const W = WOW_DATA.world;

  document.getElementById("worldOverview").innerHTML =
    W.overview.map(function (o) { return "<li>" + o + "</li>"; }).join("");

  function card(icon, name, note, tag) {
    return (
      '<div class="race-card parchment">' +
        '<div class="card-header">' +
          '<span class="race-icon">' + icon + "</span>" +
          '<span class="card-title" style="color:#4a3512">' + name + "</span>" +
          (tag ? '<span class="faction-tag">' + tag + "</span>" : "") +
        "</div>" +
        '<p class="race-why">' + note + "</p>" +
      "</div>"
    );
  }

  document.getElementById("worldZones").innerHTML =
    W.zones.map(function (z) { return card("🗺", z.name, z.note, "New zone"); }).join("");

  const dungeons = W.dungeons.map(function (d) { return card("🚪", d.name, d.note, "Dungeon"); }).join("");
  const raids = W.raids.map(function (r) { return card("🐉", r.name, r.note, "Raid"); }).join("");
  document.getElementById("worldDungeons").innerHTML = dungeons + raids;

  document.getElementById("worldSystems").innerHTML =
    W.systems.map(function (s) { return card("⚙", s.name, s.note, "System"); }).join("");
})();
