# 02 — Information architecture

## Sitemap

```
/                               -> Home (logged-in dashboard)
/login                          -> Google SSO landing
/onboarding                     -> Role picker + placement quiz (FTUE)
/paths                          -> All paths (4 in MVP)
/paths/product-101              -> Product 101 path
/paths/ua-101                   -> UA 101 path
/paths/mon-101                  -> Mon 101 path
/paths/cross-functional         -> Cross-Functional Connections path
/lesson/:lessonId               -> Lesson player
/practice                       -> Mistakes review (spaced repetition queue)
/quests                         -> Daily quests
/leagues                        -> Current league + leaderboard
/profile                        -> XP, streak, hearts, badges, history
/profile/:userId                -> Public profile (limited fields)
/metric-tree                    -> Interactive metric tree visualization
/glossary                       -> In-app glossary (mirrors DataHub)
/admin                          -> Admin (DnI + path owners only)
/admin/lessons                  -> Lesson authoring
/admin/analytics                -> Content & learner analytics
```

## Primary navigation

Persistent bottom nav (mobile) / left rail (web):

1. **Home** — today's lesson, streak, hearts, quests.
2. **Paths** — all 4 paths with progress rings.
3. **Practice** — review queue from mistakes + spaced repetition.
4. **Leagues** — current league, weekly leaderboard.
5. **Profile** — settings, XP history, badges.

Secondary entries (top bar): metric tree, glossary, admin (role-gated).

## Information hierarchy

```
Path (e.g., "Product 101")
└── Unit (e.g., "Retention basics")
    └── Lesson (e.g., "What is R7?")
        └── Card (lesson atom: 1 question / 1 concept / 1 explanation)
```

Sizing rules:

- Path: 4–8 units. Completable in 4–6 weeks at 5 min/day.
- Unit: 3–6 lessons.
- Lesson: 8–15 cards. ~5 minutes to finish.
- Card: 1 interaction, ≤15 seconds typical.

## Skill graph

Lessons within a path are sequenced linearly until a unit-end **checkpoint**. Checkpoints gate the next unit (mirrors Duolingo's tree).

Cross-path connections are explicit: a lesson in Product 101 can declare a **prerequisite** in UA 101 (e.g., "UV definition"). The Cross-Functional Connections path is unlocked only after the user completes at least one unit in 2 of the 3 base paths (Product / UA / Mon), so that the connections lesson lands on prepared learners.

## Content states

- `draft` — author working; not visible to learners.
- `review` — under DRI review; visible only to admins.
- `published` — live to learners.
- `deprecated` — hidden from new learners; existing progress preserved.

State transitions tracked in audit log (see [technical/data-model.md](./technical/data-model.md)).
