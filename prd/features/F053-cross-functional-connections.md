---
id: F053
name: cross-functional-connections
status: draft
priority: P0
owner: DnI
platforms: [web, ios, android]
depends_on: [F004, F050, F051, F052]
blocks: []
last_updated: 2026-05-17
---

# F053 — Cross-Functional Connections path

## Summary

**The path the user asked us to build.** Teaches the *linkages* between Product, UA, Mon, and Creative metrics — the part the Confluence metric tree page is best at and the static diagram is worst at. 5 units, ~25 lessons. Unlocked after a learner completes at least 1 unit in 2 of the 3 base paths (or top-decile placement).

## Curriculum

| # | Unit | Goals |
| --- | --- | --- |
| U1 | The Business Goal equation | Cohort view: Profit = Installs × (LTV − eCPI). Act-date view: UA Profit = ARPDAU × DAU − Cost. Two views, one tree. |
| U2 | UA ↔ Product | How Installs and Retention multiply. Why a CPI win can be a retention loss. K-factor / organic uplift's product side. |
| U3 | Product ↔ Mon | How a retention loss hits ARPDAU via DAU and hits UV via cohort dilution. Why ad density tunes retention. |
| U4 | Mon ↔ UA | How UV feeds ROAS. Paid vs eROAS revisited as a Mon-side phenomenon. Sub revenue's stabilizing effect on ROAS volatility. |
| U5 | The full loop | Walk a real-shaped scenario end-to-end: a creative-driven CPI drop → install volume up → user-quality dilution → R1 dip → ARPDAU dip → UV7 flat → ROAS D7 holds. Lessons learned. |

## User stories

- As a UA Specialist who scored well on UA 101, I take Cross-Functional and graduate able to lead a multi-function retro on a campaign anomaly.
- As an MO who shipped an ad-density change that backfired on R1, I take Cross-Functional and recognize the pattern before the next ship.
- As a PO presenting in a cycle review, I use the canonical hypothesis format ("If [change] → then [impact] → for [audience] → by [amount]") taught here.

## Acceptance criteria

- `AC-F053-01` Given the prerequisite (≥1 unit in 2 of 3 base paths or top-decile placement), when met, then the path appears unlocked.
- `AC-F053-02` Given U5's full-loop scenario, when the learner walks through it, then the scenario uses the Amanotes-standard hypothesis format and references the metric tree visually.
- `AC-F053-03` Given a card asks "act-date or cohort?", when rendered, then the wrong distractor is always the *other view* (not a strawman like "neither").
- `AC-F053-04` Given a card asks the learner to predict the second-order metric impact of a change, when scored, then the rubric matches the canonical hypothesis format.

## Card content quality bar

- Every card MUST involve at least 2 metrics from different domains (Product+UA, UA+Mon, Mon+Product, or all three).
- Scenarios are realistic for Amanotes (LO4 portfolio, NGD pipeline, MEP partners), but use **no fabricated numbers** — abstract numbers ("$X", "Y%") or known publicly-disclosed reference points only.
- The metric tree visual from F054 is embedded at least once per unit.

## UI states

- Same lesson player + custom "Scenario" card style for U5 (multi-step branching).
- "View on metric tree" CTA opens F054 with the relevant nodes highlighted.

## Data requirements

`ScenarioCard` extends `Card` with `branches[]`. See [technical/data-model.md](../technical/data-model.md).

## Tracking events

Inherits from F050, plus:

| Event | Trigger | Required params |
| --- | --- | --- |
| `scenario_card_branch_taken` | Learner picks a branch | `user_id`, `card_id`, `branch_id`, `is_canonical` |

## Edge cases and failure modes

- Cross-references go stale when a base path renames a unit → CI check breaks build if cross-ref breaks.
- A learner unlocks the path but hasn't mastered base concepts → first unit serves as a fast review.

## Non-functional requirements

Inherited from F050.

## Design notes

- **This is the headline feature.** Investment in scenario card UX and the metric tree linkage is justified.
- The "two views, one tree" visualization deserves a custom component (see [design/system/components](../design/system/components.md)).

## Out of scope

- Creative-specific cross-functional content (Creative ↔ Product, Creative ↔ Mon). Could be a follow-on path.
- Org cross-functional (FALAS ↔ Product, Music ↔ Product).

## Definition of Done

- `automated` — same linting as F050.
- `automated` — cross-reference graph CI check (no broken links between paths).
- `manual` — DnI sign-off on every unit.
- `manual` — pre/post-test bench by 5 representative Amanoters; baseline ≤40%, target ≥80%.

## Open questions

- `OQ-F053-01` Should we have a "leaderboard for scenarios" — a way for senior Amanoters to author and submit their own scenarios?
- `OQ-F053-02` Vietnamese localization priority for this path is high because Vietnamese is the working language of many junior Amanoters; needs an explicit decision.

## Related

- F050, F051, F052 (prerequisites)
- F054 (interactive metric tree visualization)
- ADR-002 (canonical hypothesis format)
