# Design — key screens

Outline-level descriptions. Detailed flows go in Figma (link TBD).

## Home

Above the fold: streak + hearts + today's quests + a single "Continue learning" CTA card showing the next lesson + estimated minutes.

Below the fold: path progress (4 rings), Practice queue size, current league standing.

## Lesson player

Top bar: progress (segmented), hearts, exit (X).

Body: one card. Card type-specific input. Submit at bottom.

Foot: empty unless a heart is lost or +XP fires (animations).

## End-of-lesson screen

Stats: XP earned, accuracy, hearts left, streak update (sometimes), next-quest progress.

Two CTAs: "Next lesson" (primary), "Practice mistakes" (secondary, conditional on having any).

## Path overview

Header: path name, your progress (e.g., "Unit 2 / 6"), your placement context if any ("You started at Unit 3 from the placement quiz").

Unit list: each unit a card with lesson dots; current lesson highlighted; future ones greyed; mastered ones marked.

## Metric tree (F054)

Full-screen canvas with the tree. Left of canvas: legend + search. Right of canvas: collapsible Node Panel.

Mobile: vertical list of nodes with expand/collapse; tap a node to see its panel as a sheet.

## Profile

Header: avatar, name, role, team.

KPI row: XP, streak, hearts, league.

Per-path progress rings.

Badges grid.

Settings drawer at the bottom.

## League

Top: tier name, week countdown.

Body: leaderboard list of 30. Promotion zone shaded green; demotion zone shaded yellow.

## Admin — content editor

Three-pane: tree (left), card list (middle), editor (right).

Editor: typed form per card type + live preview tab.

Top right: status pill (draft/review/published), Submit/Approve/Publish buttons depending on role.

## Admin — analytics

Four dashboards (Adoption, Path, Card, Drift). KPI strip + chart + drill-down table.

Filters strip: time window, team, role.
