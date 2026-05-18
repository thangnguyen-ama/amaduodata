# Ama Duo Data — Creator Dashboard (Web UI Kit)

Where the data team authors lessons and tracks team progress. **Dark-mode native (Suno-style)** — sidebar, cards, hero strip all sit on dark surfaces; accents (violet, blue, pink) pop against the dark.

## Screens

| Screen | File | Notes |
|---|---|---|
| Dashboard | `DashboardScreen.jsx` | Hero strip with Beat, weekly metric cards (DAU / lessons / streak / XP) with sparklines, unit performance + leaderboard mini. |
| Lessons | `LessonsScreen.jsx` | Lesson library table — drag handle, title, unit, status pill, attempts, accuracy, updated. |
| Team | `TeamScreen.jsx` | Per-team rollup with completion bar + top learner. |
| Units / Insights / Settings | (stub) | Mascot empty state — author left a TODO. |

## Atoms

`WebAtoms.jsx` exposes `WebButton`, `WebCard`, `WebIc`, `Eyebrow`. `Sidebar.jsx` and `Topbar.jsx` give the app shell.

## Run

Open `index.html`. Min content width 1180px (the dashboard is built for desktop).

## Caveats

- No real Amanotes admin UI was provided — this is a working draft against the brief.
- Status pill colors follow the brand semantic palette (`live` = green, `draft` = ink, `review` = sun, `paused` = violet).
