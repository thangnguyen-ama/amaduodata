# ADR-002: Use the canonical Amanotes hypothesis format in lessons

- **Status**: accepted
- **Date**: 2026-05-17
- **Authors**: DnI

## Context

Amanotes already uses a canonical hypothesis format internally for A/B tests and product reviews: `If [change] → then [impact] → for [audience] → by [amount]`. DuoData teaches metric *reasoning*, not just metric *definitions*. If we use a different phrasing of hypothesis in lessons, we will undo the work of internal docs and onboarding.

## Decision

Every card that asks the learner to phrase or evaluate a hypothesis uses the canonical format. The Cross-Functional Connections path (F053) U5 explicitly drills this format.

## Consequences

- (+) Lessons translate 1:1 to product reviews and Confluence pages.
- (+) Reduces "where did you learn that phrasing?" inconsistency.
- (−) Slightly more rigid; some good cards from the wild won't reuse without editing.

## Alternatives considered

- **Use the most common LLM-suggested hypothesis format.** Rejected — does not match Amanotes internal practice.
- **Let each path owner choose their own.** Rejected — defeats the purpose of a shared learning tool.

## Related

- Features: F053
- ADRs: —
