---
id: F050
name: product-101-path
status: draft
priority: P0
owner: DnI + Product
platforms: [web, ios, android]
depends_on: [F004]
blocks: [F053]
last_updated: 2026-05-17
---

# F050 — Product 101 path

## Summary

The content path teaching Amanotes **product** metrics: the user, the funnel, engagement, and retention. 6 units, ~30 lessons total. Targets POs, GDs, LDs, MSes who need to read a Product dashboard and pre-empt UA / Mon side effects.

## Curriculum

| # | Unit | Goals |
| --- | --- | --- |
| U1 | Active users & views | DAU, MAU, Returned Users D30+. Act-date view introduction. |
| U2 | The Cohort view | Install date as the anchor. UV vs ARPDAU. The single most important distinction. |
| U3 | Retention | R1 / R7 / R14 / R30; sumR7/14/30. Why R1 ≠ "D1 retention rate" in some reports. |
| U4 | Engagement depth | sumME, song_start, me_start, song_unlock, song_result, song_revive. Engagement vs retention. |
| U5 | FTUE & early funnel | Tutorial → first song → first ad. The events that move R1 most. |
| U6 | Stability & user health | Crash rate, ratio_user_stuck_per_DAU, stuck_frequency. When product issues masquerade as UA quality issues. |

Each unit ends with a checkpoint of 8 cards spanning the unit's lessons.

## User stories

- As a new PO, I take Product 101 over 4 weeks at 5 min/day and graduate able to read a daily PI dashboard correctly.
- As a UA Specialist, I optionally take Product 101 to understand what my acquired users do post-install.
- As a content author (DnI DRI), I update a card in Unit 3 when the DataHub definition of R7 changes.

## Acceptance criteria

- `AC-F050-01` Given the user enters `/paths/product-101`, when no placement override exists, then unit 1 lesson 1 is unlocked, all others gated.
- `AC-F050-02` Given a unit checkpoint is passed with ≥80% accuracy, when persisted, then the next unit unlocks.
- `AC-F050-03` Given a checkpoint failed (<80%), when the user clicks Continue, then they are routed to Practice (F024) on the unit's cards before the checkpoint becomes retake-able.
- `AC-F050-04` Given a content card cites a metric, when rendered, then the metric name uses the canonical glossary string and is clickable to its glossary entry.
- `AC-F050-05` Given a card references a Confluence or DataHub page, when clicked, then it opens in a new tab via SSO.

## Card content quality bar (per card)

- ≤ 60 words in the prompt.
- The canonical answer must be sourced from DataHub or Confluence (cite in `explanation_markdown`).
- Every wrong answer choice in multiple-choice must be a plausible Amanoter confusion (not a strawman).
- Cards using act-date vs cohort distinction must label the view explicitly.

## UI states

Same as F004; no path-specific UI beyond the path header (progress ring, unit list).

## Data requirements

`Path { id, name, slug, units[] }`, `Unit { id, name, lessons[] }`. See [technical/data-model.md](../technical/data-model.md). Content versioned: see ADR-003.

## Tracking events

| Event | Trigger | Required params |
| --- | --- | --- |
| `path_unit_started` | First lesson of unit | `user_id`, `path_id`, `unit_id` |
| `path_unit_checkpoint_attempted` | Checkpoint submit | `user_id`, `unit_id`, `accuracy` |
| `path_unit_completed` | Checkpoint pass | `user_id`, `unit_id`, `attempts_to_pass` |
| `path_completed` | Last unit cleared | `user_id`, `path_id` |

## Edge cases and failure modes

- A metric's definition changes in DataHub after a card is published → admin tool flags the card as `definition_drift`; learners see "definition recently updated — review" until the author reconciles.
- Same card appears in multiple paths (e.g., "what is UV?") → author maintains a single source-of-truth card and links from both paths.

## Non-functional requirements

- Path-level analytics queryable in Metabase by `team`, `role`, `path_id`.
- Content lives in BigQuery as the source of truth; cached at the app layer with a 5-minute TTL.

## Design notes

- Unit U2 (Cohort view) deserves extra polish — it's the most-mistaught concept in Amanotes. Use a side-by-side timeline visualization to anchor.

## Out of scope

- Live data overlays (e.g., showing PI's actual R7 today). DuoData teaches; Metabase shows.
- Product 201 / advanced (post-MVP).

## Definition of Done

- `automated` — every published card passes a metric-name-allowlist linter (no off-canon strings).
- `manual` — Product DRI sign-off on each unit.
- `manual` — DnI sign-off on definition fidelity vs DataHub.

## Open questions

- `OQ-F050-01` Should we include a unit on Subscription Trial funnel (Trial Rate, Renewal) here or under Mon 101?
- `OQ-F050-02` How fine-grained should the difficulty curve be inside a unit?

## Related

- F004 (player)
- F024 (Practice carries forward wrong answers)
- F053 (Cross-Functional Connections requires having seen U2 + U3)
