# Author summary

Brief statement of what this PRD claims and what it deliberately defers. Read this first before the critique, hypotheses, evaluation, and strategic notes that follow.

## What we are building

DuoData — a Duolingo-style web app teaching Amanotes employees the Marketing & Product Metric Tree. Four content paths in MVP: Product 101, UA 101, Mon 101, and Cross-Functional Connections. Full Duolingo-grade gamification: XP, levels, hearts, streaks, leagues, daily quests, spaced repetition.

## Why

The metric tree is the most-linked, least-comprehended doc in Amanotes. New hires take 4–8 weeks to read a dashboard correctly. Cross-functional misunderstandings (Act-date vs Cohort, eROAS vs Paid ROAS, UV vs ARPDAU) cause incorrect root-cause analyses and bad cycle decisions. A daily 5-minute habit can compress that learning curve and lift Performance Clarity (a 2026 company KPI).

## Core claims

1. **Cross-Functional Connections is the headline feature.** Existing internal docs cover each function in isolation; nothing teaches the linkages.
2. **Gamification is justified, not just decorative.** Internal-tool adoption is the historic failure mode; daily quests + streaks + leagues fight that pattern.
3. **Internal-only with Amanotes SSO.** No monetization. No external partners (MEP licensees, Smulie/Yogame/Reactional) in MVP.
4. **Web MVP, mobile in phase 2.** Conditional on hitting R7 ≥ 45% and R30 ≥ 25%.
5. **Content lives in BigQuery alongside the warehouse; OLTP state in Postgres.** Drift checks against DataHub become warehouse joins.
6. **Single source of truth = DataHub + the Confluence metric tree page.** DuoData links to them; it does not duplicate them. Definition drift is a tracked lifecycle event.

## What is deliberately deferred

- iOS + Android native apps.
- Creative 101, GD 101, LD 101 content paths.
- Personalization (DDA-style per-learner difficulty).
- Vietnamese localization (MVP English to match Confluence; VN once content stabilizes).
- Live data overlays (DuoData teaches; Metabase shows).
- External partners.

## Where the bets are biggest

- Cross-Functional Connections U5 (the full-loop scenario card) — investment in the new "scenario card" UX is the most expensive feature ROI-wise. If it lands, DuoData has its hook. If not, it's an internal tool nobody uses.
- The interactive metric tree (F054) — competes with the Confluence draw.io diagram for primacy.
- The drift checker (F100) — assumes DataHub has an API stable enough to diff against.

## Where the risks are biggest

- Content rot. Authors are part-time. If DRIs leave or get reassigned, content stales fast.
- Adoption. "Internal tool nobody uses" is a real failure mode at most companies.
- Senior-staff perception. If a P3/M2 finds the gamification "too kiddy", they bounce; we lose the ones the others learn fastest from.
- Time-zone math for streaks. Subtle bugs here annoy users disproportionately.
