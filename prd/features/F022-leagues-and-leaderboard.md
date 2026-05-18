---
id: F022
name: leagues-and-leaderboard
status: draft
priority: P1
owner: Product
platforms: [web, ios, android]
depends_on: [F020]
blocks: []
last_updated: 2026-05-17
---

# F022 — Leagues & leaderboard

## Summary

Weekly leagues (Mon 00:00 UTC → Sun 23:59 UTC) of ~30 learners. Sort by weekly XP. Top 5 promote; bottom 5 demote (until floor league). 7 tiers, named after Amanotes game lifecycle stages: POC, MVP, Soft Launch, PMF, Scale-up, Revenue, Maintenance.

## User stories

- As a learner, I see my current league standing on Home and dive into a full leaderboard.
- As a learner, I can opt out of league participation in Profile (privacy).
- As a manager, I can see my team's average league tier in admin analytics.

## Acceptance criteria

- `AC-F022-01` Given a user with league participation enabled, when their first lesson completes after week-start, then they are placed in a league of ~30 learners at their current tier.
- `AC-F022-02` Given XP earned during the week, when accrued, then the leaderboard updates within 1 minute.
- `AC-F022-03` Given Sun 23:59 UTC passes, when promotions/demotions resolve, then top 5 move up a tier, bottom 5 move down, middle stays; users get a result modal next session.
- `AC-F022-04` Given a user opts out, when they save, then they are removed from the current league and excluded from future placements.

## UI states

- League header: tier name + icon, week countdown.
- List of 30 entries: rank, avatar, name, weekly XP.
- Promotion zone / demotion zone visual.
- Week-end result modal.

Components: `LeagueHeader`, `LeaderboardRow`, `PromotionResultModal`. See [design/system/components](../design/system/components.md).

## Data requirements

`League` (week id, tier, members[]). `LeagueMembership` (user_id, league_id, weekly_xp, final_rank). Recalculated weekly; historical preserved for analytics.

## Tracking events

| Event | Trigger | Required params |
| --- | --- | --- |
| `league_placed` | First placement of the week | `user_id`, `tier`, `league_id` |
| `league_finished_week` | Week-end resolution | `user_id`, `tier`, `final_rank`, `outcome` (`promoted`/`demoted`/`stayed`) |
| `league_opt_out` | Toggle saved | `user_id` |

## Edge cases and failure modes

- Low population week (e.g., Tet holiday) → if a tier has <15 active users, merge with adjacent tier for the week.
- Bot-shaped behavior (one user 100x the median) → flag for admin review; cap weekly XP at p99 + 3σ to dampen.
- Off-by-one tier on demotion floor (POC).

## Non-functional requirements

- Leaderboard reads ≤200 ms p95.
- Weekly reset job idempotent; if it fails, a manual rerun produces the same result.

## Design notes

- Tier names borrow from game lifecycle (POC, MVP, ...) — feels native to Amanotes, doesn't read as gachapon "Diamond → Platinum".
- Don't show real names by default; show first name + last initial. Full name on hover/tap, gated by org policy.

## Out of scope

- Cross-team leagues (sort by squad or function).
- Friend-only leaderboards.
- Cosmetic rewards.

## Definition of Done

- `automated` — week-end resolution unit + integration test.
- `automated` — opt-out e2e.
- `manual` — privacy review with People / Legal on showing names.

## Open questions

- `OQ-F022-01` Show names or anonymous handles? Privacy default = anonymous; opt-in to show name.
- `OQ-F022-02` Should leagues be per-function (Product league, UA league)? Probably no; cross-pollination is part of the point.

## Related

- F020 (consumes XP)
- F005 (profile shows current standing)
- F101 (admin sees aggregate team tier)
