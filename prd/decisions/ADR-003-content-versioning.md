# ADR-003: Content versioning + pinned-version learner attempts

- **Status**: accepted
- **Date**: 2026-05-17
- **Authors**: DnI + Product

## Context

Card content will change: definitions in DataHub evolve (e.g., the eROAS clarification, the IronSource shutdown reference), authors fix typos, scenarios get sharper. A learner mid-lesson should not see a card swap under them. A learner reviewing a past attempt should see the card *as it was* when they answered it.

## Decision

Every `Lesson` and `Card` has an integer `version` incremented on publish. `LessonAttempt` pins `lesson_version`. `CardAttempt` pins `card_version`. Editing a published card creates a new version; the old version is preserved in `CardVersion` history.

## Consequences

- (+) Reproducible attempts. Reports can correlate accuracy to specific card versions.
- (+) Roll-back is a config change, not a DB rewrite.
- (−) Storage overhead — modest; cards are small.
- (−) Complexity in the player: must read pinned version, not "latest".

## Alternatives considered

- **No versioning; always latest.** Rejected — breaks reproducibility and is hostile to authors.
- **Soft-versioning via a status flag.** Rejected — loses history.

## Related

- Features: F004, F100, F050–F053
- ADRs: —
