---
id: F052
name: mon-101-path
status: draft
priority: P0
owner: Mon + DnI
platforms: [web, ios, android]
depends_on: [F004]
blocks: [F053]
last_updated: 2026-05-17
---

# F052 — Mon 101 path

## Summary

Content path on Amanotes **Monetization** metrics. 6 units, ~30 lessons. Targets MOs, POs, ad ops, IAP/Sub product leads.

## Curriculum

| # | Unit | Goals |
| --- | --- | --- |
| U1 | The three streams | Revenue = IAA + IAP + Sub. SOW, why the mix matters for risk. |
| U2 | UV — User Value | UV0/1/7/14/30, cohort view. Ad UV, IAP UV, Sub UV decomposition. |
| U3 | ARPDAU — Act-date view | ARPDAU = Revenue / DAU. Why it's not UV. Useful for operational alerts. |
| U4 | Ad formats & ad ops | RW, FS/IS, BN, AOA, MREC. eCPM, Fill Rate, ad density per DAU. |
| U5 | IAP funnel | Pay Rate, ARPPU, Starter Pack, No Ads Package, Piggy Bank. SOW per IAP type. |
| U6 | Subscription | Trial Rate, Renewal, churn, RevenueCat. When sub revenue stabilizes the P&L. |

## User stories

- As a Mon Operator on PI, I take Mon 101 in 5 weeks and graduate able to plan an ad-density experiment with retention guardrails.
- As a PO new to monetization, I understand the difference between UV7 (cohort) and ARPDAU (act-date) — the single most-confused pair in Mon's domain.

## Acceptance criteria

- `AC-F052-01` Given a card describing an ad format, when rendered, then it uses canonical abbreviations (RW, FS, IS, BN, AOA, MREC) and the in-product context (where it shows in PI, BH, DR, GDUC).
- `AC-F052-02` Given U2 and U3 are completed with ≥80%, when the user reaches F053 (Cross-Functional Connections), then they receive the "UV vs ARPDAU" advanced unit.
- Inherits AC pattern from F050.

## Card content quality bar

Same as F050, plus:

- UV vs ARPDAU is the central pair; every card using either MUST label the view (cohort vs act-date).
- Subscription content uses RevenueCat-specific language only when accurate.

## UI states

Inherited.

## Data requirements

Inherited.

## Tracking events

Inherited.

## Edge cases and failure modes

- A Sub product change (e.g., RevenueCat policy update) → admin marks affected cards stale.
- Local-currency examples — use USD only in MVP; localize post-MVP.

## Non-functional requirements

Inherited.

## Design notes

- U2 visualization: a cohort timeline showing UV0 → UV30 accruing per cohort day, with ad/IAP/sub stacked.

## Out of scope

- Mediation strategy (LevelPlay vs MAX) is a playbook, not a definitions topic.
- Pricing experiment design — Mon Playbook, post-MVP.

## Definition of Done

- `automated` — same linting as F050.
- `manual` — Mon lead sign-off on each unit.

## Open questions

- `OQ-F052-01` Should "Hybrid Casual" definitions be in U1 or in a dedicated short unit?
- `OQ-F052-02` How explicit do we get about Metica / Nefta (third-party tools)?

## Related

- F004, F024, F050, F051, F053
- ADR-004 (path-overlap policy)
