# WoW Forever — Class Chooser

A fan-made tool for **World of Warcraft: Forever** (launching November 4). Two pages, styled like classic 2004 World of Warcraft meets Warcraft 2:

- **Changes** (`index.html`) — the global changes affecting every class, the six new race/class combinations (Human Hunter, Dwarf Shaman, Gnome Priest, Orc Mage, Troll Warlock, Undead Paladin), every class's reworked abilities, and every race's playable classes — including the new Skyborne.
- **Quiz** (`quiz.html`) — 10 playstyle questions that determine which race and class you should play, with an explanation of why.

## Launch on GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`.
4. Save — the site is live at `https://<your-user>.github.io/wowforever-class-chooser/` in a minute or two.

No build step, no dependencies. Pure HTML, CSS, and JavaScript.

## Updating the data

All game data lives in **`js/data.js`** — one editable file, sourced from Blizzard's Forever Deep Dive panels and class deep dives:

- `globalChanges` — systems changes affecting every class (merged hit/crit stats, baseline buffs, dual spec).
- `newCombos` — the six new race/class combinations.
- `classes` — each class's playable races, roles, and real ability/talent changes.
- `races` — each race's playable classes, new combos, racials, and the `matchTraits` used by the quiz.

When Blizzard confirms more changes, edit that file and both pages update automatically. The quiz questions and scoring live in `js/quiz.js` and can be tuned the same way.

## Files

```
index.html      Changes page
quiz.html       20-question quiz
css/style.css   2004 WoW / Warcraft 2 theme
js/data.js      All class & race data (edit me!)
js/changes.js   Changes page renderer
js/quiz.js      Quiz questions & result engine
```

*WoW Forever is a fan project and is not affiliated with Blizzard Entertainment.*
