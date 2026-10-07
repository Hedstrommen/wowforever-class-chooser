# WoW Forever — Class Chooser

A fan-made tool for the November expansion. Two pages, styled like classic 2004 World of Warcraft meets Warcraft 2:

- **Changes** (`index.html`) — every class's new roles, reworked abilities, and every race's new class unlocks, in plain view.
- **Quiz** (`quiz.html`) — 20 questions that determine which race and class you should play, with an explanation of why.

## Launch on GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`.
4. Save — the site is live at `https://<your-user>.github.io/wowforever-class-chooser/` in a minute or two.

No build step, no dependencies. Pure HTML, CSS, and JavaScript.

## Updating the data

All game data lives in **`js/data.js`** — one editable file:

- `classes` — each class's old roles, newly unlocked roles (`roles.new`), ability changes, and a summary.
- `races` — each race's new class unlocks and the traits used by the quiz result reasoning.

When official expansion changes are announced, edit that file and both pages update automatically. The quiz questions and scoring live in `js/quiz.js` and can be tuned the same way.

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
