---
id: F005
name: profile
status: draft
priority: P0
owner: Product
platforms: [web, ios, android]
depends_on: [F001]
blocks: []
last_updated: 2026-05-17
---

# F005 — Profile

## Summary

User's personal dashboard: XP total, current streak, hearts, badges, path progress, recent activity. Editable settings: role + team (re-runs F002), notification preferences, language (post-MVP), accessibility (reduced motion, sound).

## User stories

- As a learner, I open Profile and see at a glance my total XP, streak, current league rank, and per-path progress.
- As a learner whose role changed, I update my role and team and the recommendations refresh.
- As a learner, I export my activity history for a self-review.

## Acceptance criteria

- `AC-F005-01` Given an authenticated user, when they navigate to `/profile`, then total XP, current streak, hearts, badge list, and per-path progress are displayed.
- `AC-F005-02` Given the user clicks "Edit role / team", when they submit changes, then F002's onboarding flow is replayed and the changes are persisted.
- `AC-F005-03` Given the user toggles a notification preference, when they save, then the next system notification respects the change.
- `AC-F005-04` Given a user with at least 1 completed lesson, when they click "Export my activity", then a CSV of all `LessonAttempt` rows is generated and downloaded.

## UI states

- Header: avatar, name, role, team.
- KPI row: XP, streak, hearts, league rank.
- Paths section: 4 cards with progress rings.
- Badges section: earned + locked.
- Settings (expandable): notifications, accessibility, language (greyed out for MVP), data export.

Components: `Avatar`, `KPIRow`, `PathCard`, `BadgeGrid`, `ToggleRow`. See [design/system/components](../design/system/components.md).

## Data requirements

Reads from `User`, `LessonAttempt`, `Badge`, `Streak`, `LeagueMembership`. See [technical/data-model.md](../technical/data-model.md).

## Tracking events

| Event | Trigger | Required params |
| --- | --- | --- |
| `profile_viewed` | Page view | `user_id` |
| `profile_role_changed` | Save in role edit | `user_id`, `old_role`, `new_role`, `old_team`, `new_team` |
| `profile_settings_changed` | Settings save | `user_id`, `changed_keys` (array) |
| `profile_export_csv` | Export click | `user_id`, `row_count` |

## Edge cases and failure modes

- User with 0 activity → empty state shows "Take your first lesson" with CTA to today's recommended lesson.
- Streak resets midnight in user's TZ; profile should reflect the reset within 5 min of midnight.
- Avatar fails to load (Google CDN flake) → fallback initials.

## Non-functional requirements

- p95 load ≤ 1 s for users with <1,000 attempts.
- Export of 10,000+ attempts streams asynchronously (job system, email link when ready).

## Design notes

- Senior personas (Tuan the GD, Phuong the M2) should not feel infantilized. Avoid bouncing cartoon owls. Keep badge art professional.

## Out of scope

- Public profile pages — privacy is internal-only; teams can see each other's progress in admin analytics (F101), but not via a public URL.
- Friends / following.

## Definition of Done

- `automated` — e2e for AC-F005-01..04.
- `automated` — accessibility unit tests (keyboard nav, screen reader labels) pass.
- `manual` — design QA on light + dark + reduced motion.

## Open questions

- `OQ-F005-01` Should we expose "Lessons since onboarding" as a public progress signal to the user's manager (in admin)? Privacy implications.
- `OQ-F005-02` Should learners be able to opt out of leaderboard visibility?

## Related

- F001 (auth)
- F022 (leagues read from profile)
- F101 (admin analytics aggregates from many profiles)
