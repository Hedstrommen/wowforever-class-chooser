// Shared navigation, injected into any element with data-nav
(function () {
  const LINKS = [
    { href: "index.html", label: "Home" },
    { href: "classes.html", label: "Classes" },
    { href: "races.html", label: "Races" },
    { href: "professions.html", label: "Professions" },
    { href: "world.html", label: "World" },
    { href: "quiz.html", label: "Quiz" }
  ];
  document.querySelectorAll(".nav-links[data-nav]").forEach(function (nav) {
    const active = nav.dataset.nav;
    nav.innerHTML = LINKS.map(function (l) {
      return '<a class="nav-link' + (l.href === active || (active === "home" && l.href === "index.html") ? " active" : "") +
        '" href="' + l.href + '">' + l.label + "</a>";
    }).join("");
  });
})();
