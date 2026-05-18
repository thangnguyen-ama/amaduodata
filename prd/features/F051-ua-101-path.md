---
id: F051
name: ua-101-path
status: draft
priority: P0
owner: UA + DnI
platforms: [web, ios, android]
depends_on: [F004]
blocks: [F053]
last_updated: 2026-05-17
---

# F051 — UA 101 path

## Summary

Content path on Amanotes **User Acquisition** metrics. 6 units, ~30 lessons. Targets UA Specialists, Creative leads, POs who need to read a Performance Marketing dashboard correctly.

## Curriculum

| # | Unit | Goals |
| --- | --- | --- |
| U1 | The UA equation | Profit = Installs × (UV − eCPI). Why this formula governs everything. |
| U2 | CPI vs eCPI | Cost per install vs effective CPI; organic uplift; K-factor. |
| U3 | ROAS — Paid vs eROAS | The single most-confused pair. ROAS D1/D7/D30/D365. |
| U4 | Networks | SRN (Google, Meta, TikTok) vs SDK (IronSource, Mintegral, AppLovin, Unity). Network-mix effects. |
| U5 | Creative metrics | IPM, CTR, CVR, Thumb-stop. Creative Fatigue. Winning Creative definition. |
| U6 | UA in context | ASO, ASA, CSL, CPP, IAE, PC. Retargeting / Reactivation. Cross-promo. |

## User stories

- As a junior UA Specialist, I take UA 101 in 5 weeks and graduate able to defend an eROAS-vs-Paid-ROAS read in a campaign review.
- As a PO on PI, I take UA 101 to know which dashboard columns to look at when UA flags a regression.

## Acceptance criteria

- `AC-F051-01` Given U3 contains a card defining eROAS vs Paid ROAS, when rendered, then both formulas appear side-by-side with the organic uplift term highlighted.
- `AC-F051-02` Given a card uses the term "K-factor", when rendered, then a tooltip surfaces the canonical glossary definition.
- `AC-F051-03` Given a learner has scored ≥80% on U1–U3, when they reach Mon 101 unit 3, then the player surfaces "You already know this from UA U2 — skip?" prompt.
- All other ACs inherit from F050's pattern (unit unlocking, checkpoint, definition drift, etc.).

## Card content quality bar

Same as F050, plus:

- eROAS / Paid ROAS distinction is *never* glossed over. Every card using "ROAS" labels which of the two it means.
- Real Amanotes network names appear (IronSource, Mintegral, Google, TikTok, etc.) where helpful, but no fabricated performance numbers.

## UI states

Inherited from F004 / F050.

## Data requirements

Inherited from F050.

## Tracking events

Inherited from F050.

## Edge cases and failure modes

- IronSource Ads Network shutdown (announced 2026-03-27, effective 2026-04-30) — U4 has a "Recent change" callout. Authors maintain currency.
- Apple Search Ads vs Google Ads measurement differences — addressed in U4.

## Non-functional requirements

Inherited from F050.

## Design notes

- U3 (ROAS — Paid vs eROAS) gets a custom visualization: dual progress bar showing the organic-uplift slice contribution.
- U1's "UA equation" is the marketing summary of the metric tree — render the formula prominently and tie back to F054 (interactive tree).

## Out of scope

- UA bidding strategy (DuoData explains metrics, not playbooks). A separate `UA Playbooks` path is post-MVP.
- Attribution modeling deep dive.

## Definition of Done

- `automated` — same linting as F050.
- `manual` — UA lead sign-off on each unit.

## Open questions

- `OQ-F051-01` Should pROAS (predicted ROAS) get its own unit, or stay a single advanced card in U3?
- `OQ-F051-02` Include China-specific UA conventions (DouYin, etc.) given the 2026 China experiment? Probably yes by C2'26.

## Related

- F004, F024, F050, F053
- ADR-004 (path-overlap policy)
