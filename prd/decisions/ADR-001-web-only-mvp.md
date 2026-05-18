# ADR-001: Web-only MVP; mobile in phase 2

- **Status**: accepted
- **Date**: 2026-05-17
- **Authors**: DnI + Product

## Context

Intake answer: Web + Mobile (cross-platform). Building both at once for an internal tool with unproven engagement is expensive. Risk: we ship a mobile binary nobody opens because Amanoters work primarily at desks.

## Decision

Ship MVP on web only. Use a responsive layout that works on mobile web. Build native iOS + Android after we hit MVP success metrics (R7 ≥ 45%, R30 ≥ 25%) in cycle C2 2026.

## Consequences

- (+) Half the engineering effort to MVP.
- (+) Faster content iteration (web deploys are seconds, app-store deploys are days).
- (+) Lower QA matrix.
- (−) No push notifications. We rely on email + Slack to nudge streaks.
- (−) Some learners may want lessons on their commute; mobile web is acceptable but not great.
- (=) Internal traffic stays inside the SSO perimeter.

## Alternatives considered

- **Native mobile only.** Closer to Duolingo's actual model, but excludes a sizable Amanoter audience who works on web (DnI, FALAS, Music). Rejected.
- **Web + native simultaneously.** Higher cost; unproven engagement justifies sequencing.

## Related

- Features: F001–F101
- ADRs: —
