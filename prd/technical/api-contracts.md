# Technical — API contracts

REST + JSON. All endpoints under `/api/v1/`. Auth via session cookie (F001). Errors use RFC 9457 problem+json.

## Auth

- `POST /api/v1/auth/google/callback` — handled by SSO redirect.
- `POST /api/v1/auth/logout` — invalidates session.
- `GET  /api/v1/me` — current user, includes role, team, XP, hearts, streak.

## Onboarding & placement

- `POST /api/v1/me/onboarding` `{ role, team }` → 200.
- `GET  /api/v1/placement-quiz` → deck of cards.
- `POST /api/v1/placement-quiz/submit` `{ responses[] }` → `PlacementResult`.

## Paths / lessons / cards

- `GET  /api/v1/paths` — all paths with the caller's progress.
- `GET  /api/v1/paths/:slug` — units + completion state.
- `GET  /api/v1/lessons/:id` — lesson + cards (pinned to current published version).
- `POST /api/v1/lessons/:id/start` → `LessonAttempt`.
- `POST /api/v1/lesson-attempts/:id/answer` `{ card_id, submitted_answer, time_to_answer_ms }` → `{ is_correct, canonical_answer, explanation_markdown, xp_awarded, hearts_remaining }`.
- `POST /api/v1/lesson-attempts/:id/complete` → end-screen payload.
- `POST /api/v1/lesson-attempts/:id/abandon` (or auto on inactivity).

## Practice

- `GET  /api/v1/practice/queue?limit=12` → ordered list.
- `POST /api/v1/practice/answer` `{ card_id, submitted_answer, time_to_answer_ms }` → `{ is_correct, interval_after, ease_after }`.
- `POST /api/v1/practice/session/complete` → `{ hearts_remaining, cards_count, accuracy }`.

## Gamification

- `GET  /api/v1/me/streak` → current/longest/freezes.
- `GET  /api/v1/me/hearts` → current + next regen ETA.
- `GET  /api/v1/me/league` → current league + leaderboard top 30.
- `GET  /api/v1/me/quests` → today's 3 quests with progress.
- `POST /api/v1/me/league/opt-out` / `POST /api/v1/me/league/opt-in`.

## Metric tree

- `GET  /api/v1/metric-tree` → full tree (cached, ETag).
- `GET  /api/v1/metric-tree/node/:slug` → node detail + linked lessons.

## Admin (role-gated)

- `GET  /api/v1/admin/paths` / `POST` / `PATCH` / `DELETE` for the full content tree.
- `POST /api/v1/admin/cards/:id/submit-for-review`
- `POST /api/v1/admin/cards/:id/review` `{ decision: approve|reject, note }`
- `POST /api/v1/admin/cards/:id/publish`
- `POST /api/v1/admin/cards/:id/rollback` `{ to_version }`
- `GET  /api/v1/admin/drift-reports?status=open`
- `GET  /api/v1/admin/analytics/path-performance?team=&role=`
- `GET  /api/v1/admin/analytics/card-performance?path_id=&sort=lowest_accuracy`

## Event tracking

Out-of-band: events go to Firebase → BigQuery, not the REST API. Common envelope:

```json
{
  "event_name": "lesson_completed",
  "event_timestamp_ms": 1747400000000,
  "user_id": "...",
  "session_id": "...",
  "user_role": "PO",
  "platform": "web",
  "app_version": "0.4.0",
  "locale": "en-US",
  "params": { ... }
}
```

Event names listed per feature in `features/F*.md`.

## Versioning

- Breaking change → `/api/v2/...`. No silent removals.
- Card content versioned at the row; API returns the version a `LessonAttempt` is pinned to.

## Rate limits

- Per-user: 60 req/min for read endpoints, 30 req/min for writes.
- Admin endpoints: 600 req/min per admin user.
