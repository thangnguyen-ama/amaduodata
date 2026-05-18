# ADR-005: Content ownership (RACI) + storage

- **Status**: accepted
- **Date**: 2026-05-17
- **Authors**: DnI

## Context

Two open questions, settled together because they interact.

1. **Ownership**: who owns content quality, freshness, and decisions when DataHub drifts?
2. **Storage**: where does content live — content DB on Postgres or on BigQuery?

## Decision

### Ownership (RACI)

| Activity | DnI | Product DRI | UA DRI | Mon DRI | Eng |
| --- | --- | --- | --- | --- | --- |
| Platform engineering | A | C | C | C | R |
| Glossary fidelity vs DataHub | R/A | C | C | C | I |
| Product 101 content | C | R/A | I | I | I |
| UA 101 content | C | I | R/A | I | I |
| Mon 101 content | C | I | I | R/A | I |
| Cross-Functional content | R/A | C | C | C | I |
| Authoring tool | A | C | C | C | R |
| Analytics dashboard | R/A | C | C | C | C |

R = responsible, A = accountable, C = consulted, I = informed.

### Storage

- **Postgres** holds transactional state (`User`, `Streak`, `LessonAttempt`, `CardAttempt`, `PracticeItem`, `LeagueMembership`, `QuestAssignment`, `UserBadge`).
- **BigQuery** is the single source of truth for *content* (`Path`, `Unit`, `Lesson`, `Card`, `CardVersion`, `MetricNode`, `ApprovalLog`, `DriftReport`). It is also the analytics warehouse (Amanotes-standard). The app reads content via a thin in-app cache with a 5-min TTL.

## Consequences

- (+) Content sits next to the analytics warehouse — drift checks against DataHub are warehouse-to-warehouse joins, not API trips.
- (+) Familiar to DnI; reuses Klavar / Firebase event-stream patterns.
- (−) Two stores → two operational concerns. Postgres is small enough that ops cost is low.
- (−) Eventual consistency on content publish (≤5 min). Acceptable — content publishes are not time-critical.

## Alternatives considered

- **Postgres-only.** Rejected — content drift checks would require shuttling DataHub views into Postgres, double-work.
- **BigQuery-only.** Rejected — BigQuery is not an OLTP store; per-card-attempt writes would be expensive.

## Related

- Features: F050–F053, F100, F101
- ADRs: ADR-003
