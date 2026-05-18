# Features index

14 features across 4 groups. IDs reserved per [spec-contracts.md](../spec-contracts.md).

## Foundation (F001–F019)

| ID | Name | Priority | Owner | Status |
| --- | --- | --- | --- | --- |
| [F001](./F001-sso-login.md) | sso-login | P0 | GS | draft |
| [F002](./F002-onboarding-role-pick.md) | onboarding-role-pick | P0 | Product | draft |
| [F003](./F003-placement-quiz.md) | placement-quiz | P0 | Product | draft |
| [F004](./F004-lesson-player.md) | lesson-player | P0 | Product | draft |
| [F005](./F005-profile.md) | profile | P0 | Product | draft |

## Gamification (F020–F049)

| ID | Name | Priority | Owner | Status |
| --- | --- | --- | --- | --- |
| [F020](./F020-xp-and-levels.md) | xp-and-levels | P0 | Product | draft |
| [F021](./F021-hearts-and-streak.md) | hearts-and-streak | P0 | Product | draft |
| [F022](./F022-leagues-and-leaderboard.md) | leagues-and-leaderboard | P1 | Product | draft |
| [F023](./F023-daily-quests.md) | daily-quests | P1 | Product | draft |
| [F024](./F024-practice-and-srs.md) | practice-and-srs | P0 | Product | draft |

## Content modules (F050–F099)

| ID | Name | Priority | Owner | Status |
| --- | --- | --- | --- | --- |
| [F050](./F050-product-101-path.md) | product-101-path | P0 | DnI + Product | draft |
| [F051](./F051-ua-101-path.md) | ua-101-path | P0 | UA + DnI | draft |
| [F052](./F052-mon-101-path.md) | mon-101-path | P0 | Mon + DnI | draft |
| [F053](./F053-cross-functional-connections.md) | cross-functional-connections | P0 | DnI | draft |
| [F054](./F054-interactive-metric-tree.md) | interactive-metric-tree | P1 | DnI | draft |

## Admin (F100–F129)

| ID | Name | Priority | Owner | Status |
| --- | --- | --- | --- | --- |
| [F100](./F100-content-authoring.md) | content-authoring | P0 | DnI | draft |
| [F101](./F101-content-analytics.md) | content-analytics | P1 | DnI | draft |

## Sequencing for MVP

Build order (each row blocks the next):

1. F001, F002, F005 — auth + basic shell
2. F003, F004 — placement + player (the engine)
3. F020, F021, F024 — XP / hearts / SRS (core gamification + retention)
4. F100 — authoring tool (parallel to content writing)
5. F050, F051, F052 — base path content
6. F053, F054 — cross-functional + interactive tree
7. F022, F023, F101 — leagues, quests, content analytics
