# 00 — Overview

## Problem

Amanotes runs 4 LiveOps games (LO4: PI, BH, DR, GDUC), an NGD pipeline, MEP publishing, and a portfolio of acquired studios. Every Amanoter — PO, UA Specialist, MO, Creative, GD, LD, DA, Music Specialist, leadership — touches the same shared metric tree but understands it inconsistently.

Symptoms of the gap:

- New hires take 4–8 weeks to read Confluence answers correctly. The metric tree page on PROD space is the most-linked, least-comprehended document in Amanotes.
- Cross-functional misunderstanding: Product reads R1/R7 separately from UA's eROAS D7; UA reads CPI separately from Mon's UV7. The connection between the two — the formula `Profit = Installs × (UV − eCPI)` — is the single most important concept and the least internalized.
- Confusion between Act-date view and Cohort view leads to wrong root-cause analyses in incident channels (`#troubleshooting_alert_pi`, etc.).
- Acronym overload: PI vs PIa vs PIi, LO3 vs LO4, FS vs IS vs RW, eROAS vs Paid ROAS, UV vs LTV vs ARPDAU. Onboarding decks list them; nobody learns them in context.

## Solution

A Duolingo-style learning app: short daily lessons (3–7 min) on Amanotes metrics, with spaced repetition, gamification, and a metric-tree-aware skill graph. Lessons are grouped into **paths** (Product 101, UA 101, Mon 101, Creative 101) and a **Cross-Functional Connections** path that explicitly teaches the linkages.

## Strategy fit

Maps to 2026 company KPIs:

- **Analytics use case completion: 100%** — DuoData accelerates Amanoter ability to formulate and consume analytics.
- **Performance Clarity ≥75%** — clarity on goals is downstream of clarity on the metrics those goals are measured by.
- **Employee Engagement ≥75 (guardrail)** — internal learning tools improve role mastery; mastery correlates with engagement.

Maps to 2026 strategy:

- **Capability: Analytics & Experimentation** — every Amanoter making analytic-quality decisions requires shared metric literacy.
- **Capability: Publishing (go-to-market)** — MEP partners and acquired studios (Smulie, Yogame, Reactional) need a fast way to learn Amanotes metric conventions.

## Scope — MVP (Cycle C2 2026)

In:

- Web app, SSO via Amanotes Google Workspace.
- 4 content paths: Product 101, UA 101, Mon 101, Cross-Functional Connections.
- Full Duolingo-style gamification: XP, streak, hearts, leagues, leaderboard, daily quests.
- Admin authoring tool for DnI / Product / UA / Mon DRIs to add and edit lessons.
- Tracking pipeline to Firebase + BigQuery, dashboards in Metabase.

Out (post-MVP):

- iOS + Android native apps (phase 2, Cycle C3 2026 if MVP succeeds).
- Creative 101, GD 101, LD 101 paths.
- Personalization (DDA-style difficulty tuning per learner).
- Vietnamese-language localization (MVP is English to match Confluence; VN translations follow once content stabilizes).
- IAP / subscription — DuoData is internal, no monetization.

## Success metrics

Measured on cohort view (install date = first SSO login).

| Metric | Target by end of C2'26 (12 weeks post-launch) |
| --- | --- |
| Activation rate (D0 → first lesson completed) | ≥70% of invited Amanoters |
| R7 | ≥45% of activated users |
| R30 | ≥25% of activated users |
| Path completion rate (any of the 4 MVP paths) | ≥40% of activated users complete ≥1 path |
| Cross-Functional Connections post-test accuracy | ≥80% (vs. baseline pre-test) |
| Net Promoter Score among PO + UA + MO | ≥+30 |

Tracked in a Metabase dashboard owned by DnI.

## Non-goals

- Replacing Confluence as the source of truth. DuoData links to Confluence and DataHub; it does not duplicate them.
- Replacing live dashboards. DuoData teaches what a metric means; Metabase / SAT / Appsflyer / ABalyzer show the values.
- Becoming a public-facing product. It is an internal capability.

## Risks

| Risk | Mitigation |
| --- | --- |
| Content rots — metrics evolve, definitions in DuoData drift from DataHub | Authoring tool pulls definitions live from DataHub API; lessons flag stale content |
| Low adoption — Amanoters treat it as "another tool" | Make it part of new-hire onboarding day 1; tie path completion to performance clarity check-ins |
| Gamification feels childish for senior staff | Add an "Expert" path that skips intro paths; show role-tailored content first |
| Internal-tool decay — nobody owns it after launch | DnI owns the platform; Product / UA / Mon DRIs own their respective content paths (RACI in `decisions/ADR-005-content-ownership.md`) |
