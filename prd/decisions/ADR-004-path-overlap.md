# ADR-004: Path overlap & shared cards policy

- **Status**: accepted
- **Date**: 2026-05-17
- **Authors**: Product + DnI

## Context

UV is defined in Mon 101 U2, but UA 101 U1 also needs it. The Cross-Functional Connections path needs the definition from both. We can either: 1) duplicate the card across paths, 2) share a single card and link it, 3) require prerequisite paths.

## Decision

A card has a single canonical home (the path that owns its metric primarily) and is *referenced* by other paths. Referenced cards count toward the referencing path's progress but use the home path's content version. If a learner has already passed the canonical card, the referencing path lets them skip with a "you already know this" affordance (AC-F051-03).

## Consequences

- (+) One edit propagates everywhere.
- (+) Learners don't redo the same content.
- (−) Authoring tool needs to surface "this card is referenced by X paths" so authors don't unintentionally break referencing units.

## Alternatives considered

- **Duplicate cards across paths.** Rejected — drift fan-out.
- **Strict prerequisites.** Rejected — forces sequential learning; doesn't match how Amanoters use this in practice.

## Related

- Features: F050–F053, F100
- ADRs: ADR-003
