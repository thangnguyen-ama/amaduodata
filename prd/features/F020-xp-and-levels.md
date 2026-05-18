---
id: F020
name: xp-and-levels
status: draft
priority: P0
owner: Product
platforms: [web, ios, android]
depends_on: [F004]
blocks: [F022]
last_updated: 2026-05-17
---

# F020 — XP & levels

## Summary

Learners earn XP per card answered correctly. Cumulative XP unlocks levels. Levels are cosmetic + drive league placement (F022). Default reward: 10 XP per correct card, +25% bonus for a perfect lesson, +50% during a daily double-XP window.

## User stories

- As a learner, I see XP accrue card-by-card and a +XP burst at lesson end with bonuses itemized.
- As a learner near a level threshold, I see a "Level up!" celebration that doesn't interrupt the flow.
- As a leadership viewer (admin), I see aggregate XP by team to measure adoption.

## Acceptance criteria

- `AC-F020-01` Given a correct answer, when persisted, then `User.total_xp += card.xp_reward`.
- `AC-F020-02` Given a lesson completed with 100% accuracy, when the end screen shows, then a +25% bonus is applied and itemized.
- `AC-F020-03` Given total XP crosses a level threshold, when the next lesson ends, then a Level Up modal appears once.
- `AC-F020-04` Given a double-XP day (admin-configured), when a lesson is started during the window, then every card's XP reward is multiplied by 1.5 (rounded up).

## UI states

- XP counter in top bar; +XP burst per correct card.
- Level-up modal: badge art, level name, "Continue".

Components: `XPBurst`, `LevelBadge`, `Modal`. See [design/system/components](../design/system/components.md).

## Data requirements

`User.total_xp`, `User.current_level`. `XPTransaction` log per event for audit.

## Tracking events

| Event | Trigger | Required params |
| --- | --- | --- |
| `xp_awarded` | Per card or per lesson bonus | `user_id`, `amount`, `source` (`card`/`perfect_lesson`/`event`) |
| `level_up` | Threshold cross | `user_id`, `from_level`, `to_level` |

## Edge cases and failure modes

- XP awarded twice (double-submit network bug) → idempotency key per `card_attempt_id`.
- Level threshold curve change (admin tunes) → migrate existing users' `current_level` based on new curve, never refund / re-award.

## Non-functional requirements

- Level threshold curve stored as config, not code; changeable without deploy.

## Design notes

Level names tie to Amanotes-internal humor; not "Bronze/Silver/Gold". Suggestion: "POC → MVP → Soft Launch → PMF → Scale-up → Maintenance" mirroring game lifecycle stages. Final names approved by Comms (or skip and just use numbers).

## Out of scope

- Spending XP (gems, store).
- Wagering XP (compete with friends).

## Definition of Done

- `automated` — unit tests on XP reducer + level threshold math.
- `automated` — idempotency test on retried `card_answered`.
- `manual` — design QA on level-up modal.

## Open questions

- `OQ-F020-01` Should level-up include a non-cosmetic perk (e.g., +1 max hearts)? Risk: snowball makes top users immortal.

## Related

- F004 (XP comes from card outcomes)
- F022 (leagues sort by weekly XP, not total XP)
