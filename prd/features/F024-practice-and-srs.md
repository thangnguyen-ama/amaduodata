---
id: F024
name: practice-and-srs
status: draft
priority: P0
owner: Product
platforms: [web, ios, android]
depends_on: [F004]
blocks: []
last_updated: 2026-05-17
---

# F024 — Practice & spaced repetition

## Summary

Every wrongly-answered card enters a per-user practice queue, scheduled for review via a spaced-repetition algorithm (SM-2 baseline). Practice sessions also regenerate hearts (F021). Practice is the primary anti-forgetting mechanism.

## User stories

- As a learner who answered a card wrong, I see it appear in my Practice tab.
- As a learner doing a 5-minute Practice session, I'm shown the highest-priority cards from my queue.
- As a learner who consistently nails a card, I see it gradually drop off my queue.

## Acceptance criteria

- `AC-F024-01` Given a wrong answer on a card in a normal lesson, when persisted, then a `PracticeItem` is added to the user's queue with `interval=1d`, `ease=2.5`.
- `AC-F024-02` Given a Practice session start, when the user opens `/practice`, then up to 12 cards are pulled from the queue, prioritized by `due_at ASC, ease ASC`.
- `AC-F024-03` Given a correct answer in Practice, when persisted, then the SM-2 algorithm updates `interval` and `ease`; if `interval ≥ 30d`, the item is marked `mastered` and removed from active queue.
- `AC-F024-04` Given a wrong answer in Practice, when persisted, then `interval = 1d`, `ease *= 0.85` (floor 1.3).
- `AC-F024-05` Given a completed Practice session, when persisted, then `User.hearts += 1` (capped at 5).

## UI states

- Practice tab: queue count, "Start Practice" CTA, due-today highlight.
- Practice session: same as lesson player but framed "Practice" + no XP awarded (configurable to small XP if learners disengage).

Components: shared with F004 lesson player + `PracticeHeader`. See [design/system/components](../design/system/components.md).

## Data requirements

`PracticeItem`:
- `id`, `user_id`, `card_id`, `interval`, `ease`, `repetitions`, `due_at`, `mastered_at`, `created_at`

## Tracking events

| Event | Trigger | Required params |
| --- | --- | --- |
| `practice_session_started` | `/practice` open + start | `user_id`, `queue_size` |
| `practice_card_answered` | Per card in practice | `user_id`, `card_id`, `is_correct`, `interval_before`, `interval_after`, `ease_after` |
| `practice_session_completed` | End of session | `user_id`, `cards_count`, `accuracy` |
| `card_mastered` | `interval ≥ 30d` | `user_id`, `card_id` |

## Edge cases and failure modes

- Same card appears in multiple paths — practice queue is per-card-id, not per-lesson; mastering once removes from queue regardless of path.
- Card retired/updated — `card_version` field; if the version on the queue item lags, refresh on next encounter.
- Queue blows up (e.g., user grinds and gets many wrong) — cap active queue at 100, oldest items archived.

## Non-functional requirements

- SM-2 update is deterministic and tested against a known input/output table.
- Queue read p95 ≤ 150 ms.

## Design notes

- Make Practice feel different from a normal lesson (header, slight palette shift) so learners know they're in practice mode.

## Out of scope

- Per-card difficulty rating by learner ("hard / easy" buttons à la Anki). MVP uses correct/wrong only.
- Group practice (team practice room).

## Definition of Done

- `automated` — SM-2 unit table-driven test (≥ 30 cases).
- `automated` — e2e covers AC-F024-01..05.
- `manual` — content lead confirms practice "feels short enough" (≤5 min).

## Open questions

- `OQ-F024-01` Award small XP in Practice (e.g., 3/card) to drive engagement, or zero to avoid farming?
- `OQ-F024-02` Should mastered cards re-surface every 90 days for retention auditing?

## Related

- F004 (cards source from lesson player)
- F021 (regenerates hearts)
