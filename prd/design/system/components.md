# Design — components

Inventory of components referenced by features. States listed where non-obvious.

## Foundation

- `Button` — variants: `primary`, `secondary`, `ghost`, `destructive`. Sizes: `sm`, `md`, `lg`. States: rest, hover, focus, active, disabled, loading.
- `Input` — text, numeric, with prefix/suffix slot (for "%").
- `Dropdown` — single-select. Searchable variant for long lists (team picker).
- `Toggle` — settings.
- `Badge` — small label (used for status, function color tag).
- `Banner` — `info`, `success`, `warn`, `error`.
- `Modal` — confirmation, level-up, league results.
- `Tooltip` — for metric glossary inline hovers.

## Layout

- `AppShell` — top bar + bottom-nav (mobile) / left-rail (web).
- `AdminShell` — wider gutters, breadcrumbs.
- `Card` — generic surface.

## Lesson

- `LessonCard` — prompt area + input area + submit row. Types map onto interior subcomponents:
  - `LessonCard.MultipleChoice` — 2–4 choices, single-select.
  - `LessonCard.FormulaCompletion` — formula with one blank.
  - `LessonCard.DragToOrder` — vertical list, drag handles.
  - `LessonCard.MatchingPairs` — two columns, click to pair.
  - `LessonCard.ScenarioJudgment` — multi-step branching with breadcrumb.
  - `LessonCard.FreeInputNumeric` — numeric input with tolerance hint.
- `ProgressBar` — segmented (one segment per card in the lesson).
- `HeartCounter` — 5 outlined hearts filled by current count. Shake on decrement.
- `XPBurst` — animated `+10 XP` chip.
- `EndScreen` — XP summary, streak update, CTA row.
- `OutOfHeartsModal` — "Practice to refill" / "Come back in 02:34" / "Wait it out".

## Gamification

- `StreakCounter` — flame icon + day count.
- `StreakCalendar` — 30-day grid with completed / frozen days.
- `LevelBadge` — current level art.
- `LeagueHeader` — tier name + countdown to week-end.
- `LeaderboardRow` — rank, name, weekly XP. Promotion/demotion zone shading.
- `PromotionResultModal` — week-end outcome.
- `QuestRow` — quest text + progress bar + status (incomplete | done).
- `QuestProgress` — small inline progress meter.

## Onboarding & profile

- `RoleCard` — picker tile for role selection.
- `Stepper` — small 3-step indicator.
- `PathCard` — name + unit progress ring.
- `Avatar` — Google profile photo or initials fallback.
- `KPIRow` — Profile header KPIs.
- `BadgeGrid` — earned / locked.
- `ToggleRow` — settings.

## Metric tree (F054)

- `MetricTreeCanvas` — pan/zoom tree. Function-colored nodes.
- `NodePanel` — side panel for a focused node.
- `LegendBar` — function-color legend.
- `SearchBar` — fuzzy search across nodes.

## Admin (F100/F101)

- `Tree` — path/unit/lesson navigator.
- `CardEditor[Type]` — typed forms per card type.
- `LivePreview` — renders the card as a learner would see it.
- `DiffViewer` — version-to-version diff.
- `DriftBanner` — banner showing drift count.
- `Dashboard` — grid for KPIs + charts.
- `Chart` — recharts wrapper.
- `Table` — sortable, filterable, exportable.

## Cross-cutting states

- All components have keyboard focus rings (2 px solid `color/brand/primary`).
- Loading skeletons for any view fetching server data.
- Empty states explicitly designed (e.g., empty Practice queue, empty Badge list).
