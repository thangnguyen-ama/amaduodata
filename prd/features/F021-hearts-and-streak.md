---
id: F021
name: hearts-and-streak
status: draft
priority: P0
owner: Product
platforms: [web, ios, android]
depends_on: [F004]
blocks: []
last_updated: 2026-05-17
---

# F021 — Hearts & streak

## Summary

Hearts are the "wrong-answer budget" (Duolingo's lives). Max 5 hearts; -1 per wrong answer; +1 every 4 hours via passive regen, or +1 per Practice session completion (F024). When out of hearts, lessons pause until the user practices or waits.

Streak = consecutive calendar days with ≥1 lesson completed in the user's local timezone. Streak freeze: 2 free freezes per month (auto-applied on missed days).

## User stories

- As a learner, I see my heart count in the top bar of every lesson.
- As a learner who runs out of hearts mid-lesson, I'm shown a calm pause screen and an option to refill via practice.
- As a learner who completed a lesson at 11:55pm local time, my streak increments correctly.
- As a learner who missed a day, my streak freeze auto-applies and I'm notified next time I log in.

## Acceptance criteria

- `AC-F021-01` Given the user submits an incorrect answer, when persisted, then `User.hearts = max(hearts - 1, 0)`.
- `AC-F021-02` Given `User.hearts < 5`, when 4 hours pass since the last regen tick, then `User.hearts += 1` (capped at 5).
- `AC-F021-03` Given the user completes a Practice session, when persisted, then `User.hearts += 1` (capped at 5).
- `AC-F021-04` Given hearts == 0 and the user attempts another card, when they submit, then the lesson pauses and shows the refill options.
- `AC-F021-05` Given a lesson completed in the user's local TZ on a calendar day after the last streak day, when persisted, then `Streak.current += 1`.
- `AC-F021-06` Given a day passes with no lesson and `Streak.freezes_available > 0`, when the next day starts, then 1 freeze is auto-consumed and `Streak.current` is preserved.
- `AC-F021-07` Given a day passes with no lesson and `Streak.freezes_available == 0`, when the next day starts, then `Streak.current = 0`.

## UI states

- Hearts: 5 outlined hearts in top bar, filled in by current count.
- Heart depletion: shake animation + -1 number.
- Out of hearts: pause screen with "Practice to refill" / "Come back in X" countdown.
- Streak: flame icon + day count in top bar; tap to see calendar.
- Freeze applied: small snowflake on the calendar day.

Components: `HeartCounter`, `StreakCounter`, `StreakCalendar`, `OutOfHeartsModal`. See [design/system/components](../design/system/components.md).

## Data requirements

`User.hearts`, `User.hearts_last_regen_at`. `Streak.current`, `Streak.longest`, `Streak.freezes_available`, `Streak.last_active_date_local`, `Streak.timezone`.

## Tracking events

| Event | Trigger | Required params |
| --- | --- | --- |
| `heart_lost` | Wrong answer | `user_id`, `hearts_remaining`, `card_id` |
| `heart_regen` | Background tick or practice | `user_id`, `source` (`regen`/`practice`) |
| `out_of_hearts` | First time hearts hits 0 in a lesson | `user_id`, `lesson_id` |
| `streak_incremented` | Streak day +1 | `user_id`, `new_streak` |
| `streak_frozen` | Auto-freeze used | `user_id`, `freezes_remaining` |
| `streak_broken` | Streak reset to 0 | `user_id`, `previous_length` |

## Edge cases and failure modes

- User travels across timezones → use the timezone from the last lesson submit; honor the new TZ on next session. Document this clearly in Help.
- DST transitions → use IANA TZ name, not offset.
- Clock skew (client vs server) → server is authoritative for streak math.
- Heart regen calculated lazily on read, not via cron.

## Non-functional requirements

- Streak math must be unit-tested across DST boundaries, leap days, and travel scenarios.
- Refilled hearts persist across devices within 1 minute.

## Design notes

- Tone in the out-of-hearts modal: encouraging, not gachapon. "Take a 4-min walk and come back" is on-brand; "BUY GEMS NOW" is not.
- Streak art: a flame, not an owl-shaming animation.

## Out of scope

- Paid heart refills.
- Streak insurance via subscription.
- Friends streak sharing.

## Definition of Done

- `automated` — TZ + DST tests cover all AC-F021-05..07.
- `automated` — idempotency on regen ticks.
- `manual` — design QA on out-of-hearts modal tone.

## Open questions

- `OQ-F021-01` Should hearts regen faster (e.g., 1/hr) for an internal tool? It's primarily a friction-on-engagement-rewarding-rote mechanism, and we may not want the friction at all.
- `OQ-F021-02` Should we offer unlimited hearts via an "Expert mode" toggle for senior staff?

## Related

- F004 (hearts depleted in lesson player)
- F024 (Practice regenerates hearts)
