---
id: F023
name: daily-quests
status: draft
priority: P1
owner: Product
platforms: [web, ios, android]
depends_on: [F004, F020]
blocks: []
last_updated: 2026-05-17
---

# F023 — Daily quests

## Summary

Three simple daily goals (e.g., "Earn 30 XP today", "Complete 1 lesson in UA 101", "Get a perfect lesson"). Resets at midnight local TZ. Completing all 3 awards a bonus + a streak-freeze refill at the end of the week.

## User stories

- As a learner, I see today's 3 quests on Home and tick them off as I progress.
- As a learner, completing all 3 gives me a small celebration and adds to a weekly tally that earns a bonus on day 7.

## Acceptance criteria

- `AC-F023-01` Given a new day in user's TZ, when the user opens Home, then 3 fresh quests are generated.
- `AC-F023-02` Given a learner completes a quest condition (e.g., 30 XP), when persisted, then the quest is marked done and an XP bonus (configurable) is awarded.
- `AC-F023-03` Given all 3 daily quests are completed for 7 consecutive days, when the 7th day's last quest is ticked, then 1 streak-freeze is awarded (capped at the freeze cap).

## UI states

- Home card listing 3 quests with progress bars.
- Per-quest +XP burst on completion.

Components: `QuestRow`, `QuestProgress`. See [design/system/components](../design/system/components.md).

## Data requirements

`Quest` (template). `QuestAssignment` (user_id, date_local, quest_id, completed_at). `QuestStreak` (consecutive_days_with_all_three).

## Tracking events

| Event | Trigger | Required params |
| --- | --- | --- |
| `quests_assigned` | New day | `user_id`, `quest_ids` |
| `quest_completed` | Quest met | `user_id`, `quest_id`, `seconds_in_day` |
| `quest_weekly_bonus` | 7-day streak | `user_id` |

## Edge cases and failure modes

- TZ change mid-day — assignment day stays the assignment day; no re-issue.
- Quest is impossible given user state (e.g., "Practice 5 cards" but practice queue is empty) — assignment logic excludes impossible quests.

## Non-functional requirements

- Quest assignment runs lazily on Home load, not nightly cron.

## Design notes

Quest copy tone: short, action-oriented. "Master 1 unit of UA 101" not "Engage with content from acquisition vertical".

## Out of scope

- Weekly + monthly quests.
- Quest difficulty tiers.
- Quest streak insurance.

## Definition of Done

- `automated` — assignment logic unit test (impossibility filter, TZ).
- `automated` — e2e for 3 quests + 7-day bonus.
- `manual` — content review of quest copy.

## Open questions

- `OQ-F023-01` Should quests pull from a fixed library or be templated (e.g., "Earn N XP" with N adaptive)?

## Related

- F004 (quest progress hooks into lesson events)
- F020 (XP bonuses)
- F021 (streak-freeze grant)
