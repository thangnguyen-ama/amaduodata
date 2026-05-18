# Technical — data model

Logical model, storage-agnostic. Field types are illustrative (Postgres + BigQuery hybrid below the model; see ADR-005 for storage decision).

## Core entities

```
User
├── id (uuid)
├── email (unique, @amanotes.com)
├── display_name
├── avatar_url
├── google_id
├── role (enum: PO | UA | MO | GD | LD | MS | DA | CRE | OTHER)
├── team (enum: PI | BH | DR | GDUC | NGD | MEP | GS | DnI | Other)
├── role_set_at, role_change_history[]
├── total_xp (int)
├── current_level (int)
├── hearts (int 0..5)
├── hearts_last_regen_at
├── timezone (IANA)
├── settings (json: notifications, sound, reduced_motion)
├── created_at, updated_at

Streak
├── user_id
├── current (int)
├── longest (int)
├── freezes_available (int, 0..2 monthly + bonuses)
├── last_active_date_local (date)

Path
├── id (uuid)
├── slug (e.g., product-101)
├── name
├── description
├── order (int)
├── status (draft|published|deprecated)
├── units[]

Unit
├── id
├── path_id
├── name
├── order
├── lessons[]

Lesson
├── id
├── unit_id
├── name
├── order
├── card_ids[]
├── status (draft|review|published|deprecated)
├── version (int, incremented on publish)

Card
├── id
├── lesson_id (nullable — cards can also live in checkpoint pools)
├── type (multiple_choice | formula_completion | drag_to_order | matching_pairs | scenario_judgment | free_input_numeric)
├── prompt (markdown)
├── payload (json — typed per card type)
├── canonical_answer (json — typed per card type)
├── explanation_markdown
├── xp_reward (int, default 10)
├── difficulty (int 1..5)
├── metric_slugs[] (e.g., ["uv", "arpdau"])
├── version (int)
├── status (draft|review|published|deprecated)
├── created_by, last_edited_by
├── created_at, updated_at

CardVersion (history)
├── card_id
├── version
├── snapshot (json of full Card at publish time)
├── published_at
├── published_by

LessonAttempt
├── id
├── user_id
├── lesson_id
├── lesson_version (pinned)
├── started_at, completed_at, abandoned_at
├── xp_earned
├── accuracy
├── cards_correct, cards_wrong, cards_skipped

CardAttempt
├── id
├── lesson_attempt_id
├── user_id
├── card_id, card_version
├── submitted_answer (json)
├── is_correct
├── time_to_answer_ms
├── hearts_at_start
├── created_at

PracticeItem (SRS)
├── id
├── user_id
├── card_id
├── interval (days)
├── ease (float ≥1.3)
├── repetitions (int)
├── due_at
├── mastered_at (nullable)
├── created_at

PlacementResult
├── user_id
├── taken_at
├── path_starts (json {path_slug: unit_number})
├── raw_score (json)
├── card_responses[]

League
├── id
├── tier (enum: POC|MVP|SoftLaunch|PMF|ScaleUp|Revenue|Maintenance)
├── week_start_utc, week_end_utc
├── members[] (LeagueMembership)

LeagueMembership
├── id
├── league_id
├── user_id
├── weekly_xp
├── final_rank (nullable until week-end)
├── outcome (promoted|demoted|stayed|opted_out)

Quest
├── id (template)
├── kind (xp_target | lesson_in_path | perfect_lesson | practice_n)
├── params (json)
├── default_reward_xp

QuestAssignment
├── id
├── user_id
├── date_local
├── quest_id
├── progress (json)
├── completed_at (nullable)

QuestStreak
├── user_id
├── consecutive_days_with_all_three (int)
├── last_full_day (date)

Badge
├── id, slug, name, description, art_url
├── unlock_rule (json, e.g., "perfect_lesson_count >= 5")

UserBadge
├── user_id, badge_id, unlocked_at

MetricNode  -- F054
├── id, slug, name
├── definition_md
├── formula
├── view (act_date|cohort|both)
├── function (product|ua|mon|creative|business)
├── parent_id, children[]
├── linked_lesson_ids[]
├── datahub_url, confluence_anchor
├── status (active|deprecated)

ApprovalLog (admin)
├── card_id (or path/unit/lesson_id)
├── actor_user_id
├── action (submit_review | approve | reject | publish | rollback)
├── note
├── created_at

DriftReport
├── card_id
├── metric_slug
├── datahub_definition_at_check
├── card_definition_at_check
├── detected_at
├── resolved_at (nullable)
```

## Storage

- **OLTP**: Postgres for `User`, `Streak`, `LessonAttempt`, `CardAttempt`, `PracticeItem`, `LeagueMembership`, `QuestAssignment`, `UserBadge`. Hot-path queries.
- **Content (BigQuery-backed)**: `Path`, `Unit`, `Lesson`, `Card`, `CardVersion`, `MetricNode`, `ApprovalLog`, `DriftReport`. Single source of truth in BigQuery; in-app cache layer (5-min TTL).
- **Analytics warehouse**: All Postgres data streamed to BigQuery via CDC (Klavar / Firebase event stream pattern). Already in Amanotes data architecture.

See ADR-005 for the storage decision.

## Indexing notes

- `CardAttempt(user_id, card_id, created_at)` — heavy read for SRS scheduling.
- `LessonAttempt(user_id, completed_at)` — streak math.
- `LeagueMembership(league_id, weekly_xp DESC)` — leaderboard reads.

## PII handling

- `email`, `display_name`, `avatar_url`, `google_id` are PII. Internal-only audience; no export off-platform without DnI + Legal sign-off.
- Hashed `attempted_domain` for `auth_login_rejected_domain` events — no raw rejected emails stored.
