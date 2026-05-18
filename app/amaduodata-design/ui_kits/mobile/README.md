# Ama Duo Data — Mobile UI Kit (Browser Preview)

> **Production code lives in `../../native/`** — React Native + TypeScript. This folder is a *browser-runnable preview* of the same screens, built in HTML / CSS / React-via-Babel for design reviews and rapid iteration.

The core product: a daily, gamified data-literacy app modeled after Duolingo, rebranded for Amanotes. **Dark-first (Suno-style)** — surfaces sit on `--surface-0`/`--surface-1`, accent colors pop against the dark.

## Screens

| Screen | File | Notes |
|---|---|---|
| Learn (lesson tree) | `LearnPath.jsx` | Zig-zag chunky path of round tiles per unit. Tap a tile to start. |
| Lesson (question) | `LessonScreen.jsx` | Multiple-choice card with feedback strip, Beat speech bubble. |
| Celebration | `Celebration.jsx` | Confetti, mascot, XP/accuracy chips. Shown post-lesson. |
| Practice | `PracticeScreen.jsx` | Hub of quick drills + daily quest. |
| Stats | `StatsScreen.jsx` | Personal dashboard: weekly XP bar chart, skill mastery bars. |
| League | `LeagueScreen.jsx` | Diamond league leaderboard with promote/demote zones. |
| Profile (Me) | `ProfileScreen.jsx` | Avatar, stat tiles, achievements. |

## Atoms

`Atoms.jsx` exposes:
- `DuoButton` — chunky pressable button with 4px base shadow that disappears on `:active`. Variants: `violet · green · pink · sun · ink · ghost`.
- `Ic` — small icon library (chunky stroke).
- `TopBar` — streak / XP / hearts row.
- `BottomNav` — frosted-ink tab bar.

## Run

Open `index.html`. Everything is React + Babel inline, no build step. Tokens come from `../../colors_and_type.css`.

## Caveats

- Mascot is a placeholder concept.
- All copy is illustrative — the data-team will write the real lesson copy.
- This kit replaces the system fonts in `ios-frame.jsx` chrome (nav/status bar still use SF system for accuracy); brand fonts apply to the app body.
