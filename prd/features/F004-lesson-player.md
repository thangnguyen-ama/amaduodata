---
id: F004
name: lesson-player
status: draft
priority: P0
owner: Product
platforms: [web, ios, android]
depends_on: [F001]
blocks: [F020, F021, F024, F050, F051, F052, F053]
last_invoked: 2026-05-17
last_updated: 2026-05-17
---

# F004 — Lesson player

## Summary

The core engine. Renders a sequence of cards in a lesson. Supports 6 card types (multiple choice, formula completion, drag-to-order, matching pairs, scenario judgment, free-input numeric). Handles correct/incorrect feedback, hearts, XP, and lesson completion.

## User stories

- As a learner, I open a lesson, see one card at a time, answer, get immediate feedback with the correct answer + a 1-line explanation, and move to the next card.
- As a learner who answers wrong, I lose a heart, see the canonical answer + explanation, and the card is queued for the Practice queue (F024).
- As a learner finishing the last card, I see a celebration screen with XP earned, streak update, and a Continue / Practice options.

## Card types

| Type | Use case | Example (UA 101) |
| --- | --- | --- |
| `multiple_choice` | Definitions | "ARPDAU is measured in which view? [Act-date / Cohort]" |
| `formula_completion` | Math | "ROAS D7 = Revenue D7 / ___ [Cost]" |
| `drag_to_order` | Funnels & sequences | "Order: install → ___ → ___ → ___ [tutorial start, first song start, ad shown]" |
| `matching_pairs` | Synonyms / categories | Match the ad format to its abbreviation (RW, FS, AOA, BN) |
| `scenario_judgment` | Cross-functional reasoning | "PIi eROAS D7 jumped +12% but Paid ROAS D7 is flat. What's the likely cause? [Organic uplift ratio shifted]" |
| `free_input_numeric` | Calculation | "If CPI=$0.20 and UV7=$0.16, what is ROAS D7? [0.80x or 80%]" |

## Acceptance criteria

- `AC-F004-01` Given a lesson with N cards, when the user starts it, then the first card renders with a progress bar showing 1/N.
- `AC-F004-02` Given the user submits a correct answer, when the result animation plays, then XP accrues (configurable per card, default 10), the card is marked correct, and Continue advances to the next card.
- `AC-F004-03` Given the user submits an incorrect answer, when the result animation plays, then 1 heart is deducted (F021), the canonical answer + explanation displays, the card is queued to Practice (F024), and Continue advances.
- `AC-F004-04` Given the user runs out of hearts mid-lesson, when they submit the next wrong answer, then the lesson pauses and prompts them to wait, practice (regain hearts), or try again later. See F021.
- `AC-F004-05` Given the user completes all cards, when they reach the end screen, then total XP earned, hearts remaining, and streak update are shown, and progress is persisted.
- `AC-F004-06` Given the user closes the tab mid-lesson, when they return within 24 hours, then they resume at the same card with the same heart count and XP-in-progress.
- `AC-F004-07` Given a card has a free-input numeric answer, when the user enters a value within tolerance (default ±2%), then it is accepted as correct.

## UI states

- Card screen: question, input area, Submit button (disabled until input valid).
- Correct state: green tick, +XP burst, "Correct!" + 1-line explanation, Continue button.
- Incorrect state: red mark, -heart animation, "The right answer is X" + 1-line explanation, Continue button.
- End screen: XP earned, streak, hearts, two CTAs (next lesson, practice).

Components: `LessonCard`, `ProgressBar`, `HeartCounter`, `XPBurst`, `EndScreen`. See [design/system/components](../design/system/components.md).

## Data requirements

`Lesson` contains an ordered list of `Card`. Each card has `type`, `prompt`, `payload` (type-specific), `canonical_answer`, `explanation_markdown`, `xp_reward`, `path_id`, `unit_id`, `lesson_id`.

`LessonAttempt`:
- `user_id`, `lesson_id`, `started_at`, `completed_at`, `xp_earned`, `cards_correct`, `cards_wrong`, `cards_skipped`

`CardAttempt`:
- `user_id`, `card_id`, `submitted_answer`, `is_correct`, `time_to_answer_ms`, `hearts_at_start`

See [technical/data-model.md](../technical/data-model.md).

## Tracking events

| Event | Trigger | Required params |
| --- | --- | --- |
| `lesson_started` | First card render | `user_id`, `lesson_id`, `path_id`, `unit_id` |
| `card_answered` | Submit click | `user_id`, `card_id`, `card_type`, `is_correct`, `time_to_answer_ms` |
| `lesson_completed` | End screen | `user_id`, `lesson_id`, `xp_earned`, `accuracy`, `seconds_total` |
| `lesson_abandoned` | Inactivity ≥10 min on a card | `user_id`, `lesson_id`, `cards_completed` |
| `lesson_resumed` | Returning to in-progress | `user_id`, `lesson_id`, `seconds_since_abandon` |

## Edge cases and failure modes

- Card content updates while a user is mid-lesson → use the version pinned at lesson start.
- Numeric tolerance edge: 50% vs 0.5 → accept both formats (parse `%` suffix).
- Multilingual content (future) → render in the user's chosen lesson language, fall back to English.
- Card flagged as broken by an admin → silently skip in any new attempts; existing in-flight attempts continue.
- Network blip during submit → buffer locally, retry on reconnect; never double-charge a heart.

## Non-functional requirements

- p95 card-to-card transition ≤ 250 ms after submit.
- p95 lesson initial load ≤ 1.5 s.
- All animations respect `prefers-reduced-motion`.

## Design notes

- Animations: borrowed Duolingo-like burst on correct, gentle shake on incorrect. Avoid mascot characters (Amanoters are professionals — keep playful but not cutesy).
- Sound: optional, off by default; toggle in Profile.

## Out of scope

- Voice-input answers.
- Code-block answers (e.g., SQL fill-in) — interesting future direction for DA path.
- Peer review of free-input answers.

## Definition of Done

- `automated` — e2e covers each card type happy path + at least 2 edge cases per type.
- `automated` — heart deduction, XP accrual, streak update tested via unit tests on the game-state reducer.
- `manual` — design QA in light + dark modes.
- `manual` — accessibility audit (see [design/system/accessibility](../design/system/accessibility.md)).

## Open questions

- `OQ-F004-01` Do we cap free-input answers at 1 attempt (Duolingo behavior) or allow 2?
- `OQ-F004-02` Should we expose a "Why is this the answer?" deep link to the relevant Confluence page or DataHub entry?

## Related

- F003 (placement quiz uses the same player)
- F020, F021, F024 (consumes XP / hearts / SRS hooks)
- F050–F053 (content lives inside lessons)
