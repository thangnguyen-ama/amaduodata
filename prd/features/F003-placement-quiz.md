---
id: F003
name: placement-quiz
status: draft
priority: P0
owner: Product
platforms: [web, ios, android]
depends_on: [F002]
blocks: [F050, F051, F052, F053]
last_updated: 2026-05-17
---

# F003 — Placement quiz

## Summary

A 10-card adaptive quiz, taken once at first session, that estimates a learner's starting position on each of the 4 paths. Goal: don't waste a senior PO's time teaching them "what is DAU"; don't drop a new hire into the eROAS-vs-Paid-ROAS deep end.

## User stories

- As a new PO, I take the placement quiz and skip the first 2 units of Product 101 because I already know R1/R7 cold.
- As a new hire who has never used Metabase, I take the placement quiz and start at unit 1 of each path.
- As an experienced DA, I score top decile and unlock the Cross-Functional Connections path immediately (no prerequisite gating).

## Acceptance criteria

- `AC-F003-01` Given completion of onboarding (F002), when the user reaches `/placement-quiz`, then the quiz adapts to their role (Product 101 weighted heavier for PO; UA 101 for UA Specialist; etc.).
- `AC-F003-02` Given the user answers each card, when the quiz finishes, then a `PlacementResult` row is persisted with one position estimate per path.
- `AC-F003-03` Given a position estimate beyond unit 1 on a path, when the user enters that path, then the prior units appear unlocked but optional (badged "Already known — review if you'd like").
- `AC-F003-04` Given a top-decile placement (≥ unit 5 on all 3 base paths), when the user reaches Home, then the Cross-Functional Connections path is unlocked without the base prerequisite.
- `AC-F003-05` Given a user skips the placement quiz (a "Skip for now" link), when they proceed, then all paths start at unit 1 by default.

## UI states

- Single-card screen, similar to lesson player (F004) but no hearts, no XP.
- Progress bar (10 cards).
- End screen: "Here's where we'll start you" with the 4 paths and their suggested starting units.

Components: `LessonCard`, `ProgressBar`, `PathCard`. See [design/system/components](../design/system/components.md).

## Data requirements

`PlacementResult`:
- `user_id`
- `taken_at`
- `path_starts` JSON `{product_101: 1, ua_101: 1, mon_101: 1, cross_functional: 1}` — unit number
- `raw_score` per path
- `card_responses` array (for analytics on which cards discriminated best)

See [technical/data-model.md](../technical/data-model.md).

## Tracking events

| Event | Trigger | Required params |
| --- | --- | --- |
| `placement_quiz_started` | First display | `user_id`, `role` |
| `placement_quiz_card_answered` | Per card | `user_id`, `card_id`, `is_correct`, `time_to_answer_ms` |
| `placement_quiz_completed` | Last card submitted | `user_id`, `path_starts`, `total_seconds` |
| `placement_quiz_skipped` | Skip link clicked | `user_id`, `cards_completed` |

## Edge cases and failure modes

- User abandons mid-quiz → state preserved; on return, resume at the last unanswered card. After 30 days, expire the in-progress quiz and reset.
- Role + team combination has no curated placement deck → fall back to OTHER's breadth quiz.
- A card itself is buggy → admin can flag it, and it gets excluded from scoring retroactively.

## Non-functional requirements

- 10 cards in ≤4 minutes p95.
- Adaptive: subsequent cards skip dimensions where confidence is already high (use a simple Item Response Theory–lite heuristic; MVP can be rule-based).

## Design notes

End screen tone: warm, not patronizing. Senior DAs should not feel called out for skipping basics; new hires should not feel behind.

## Out of scope

- Re-taking the placement quiz later (post-MVP — useful if a learner's role changes meaningfully).
- Showing the learner their raw score numerically (we show starting positions, not grades).

## Definition of Done

- `automated` — quiz adapts correctly to each role: unit tests on the placement scoring logic.
- `automated` — e2e covers AC-F003-01..05.
- `manual` — DnI + path owners (Product, UA, Mon DRIs) review the placement deck for fairness.

## Open questions

- `OQ-F003-01` Should the placement quiz also exist as an end-of-path test? Different goal; could share infra.
- `OQ-F003-02` IRT-lite adaptive logic vs. fixed 10-card deck — MVP we go fixed; reconsider if completion data shows the fixed deck is too long.

## Related

- F004 (uses same card UI)
- F050–F053 (placement seeds path starting points)
