# Hypotheses & validation plan

## Adoption

**H-A1. Daily-habit pull is strong enough to sustain 30% WAU.**
- *Canonical:* If we ship a 5-min daily Duolingo-style metric trainer → then sustained WAU ≥ 30% → for Amanoters in PI/BH/DR/GDUC squads → by week 12 post-launch.
- *Confidence:* **LOW.** Internal tools historically over-promise on daily habit. Confluence metric tree is the most-linked, least-comprehended doc — high *latent* demand, but unproven daily pull.
- *Cheapest test:* 2-week paper prototype with 10 Amanoters across PO/UA/MO/GD. Track self-reported daily opens. Concurrently query Confluence analytics on metric tree page repeat-visits as a proxy for unmet demand.
- *Cost if wrong:* Entire success-metric tier (R7 ≥ 45%, R30 ≥ 25%) collapses. DnI sunk cost on authoring tool + content with no audience. ~1 cycle of platform engineering wasted.

**H-A2. Tying path completion to onboarding day-1 drives activation ≥ 70%.**
- *Canonical:* If DuoData is wired into new-hire onboarding day 1 → then D0 activation rate ≥ 70% → for invited new Amanoters → within 6 weeks of onboarding.
- *Confidence:* **MEDIUM-HIGH.** Mandated onboarding tools typically activate; the question is durability past week 2.
- *Cheapest test:* Pilot with one PI squad's next 5 new hires; instrument onboarding checklist; measure first-lesson completion rate before broader rollout.
- *Cost if wrong:* Activation funnel breaks; need a stronger forcing function (e.g., performance-clarity check-in dependency in `risks` mitigation), which costs HRBP cycles.

**H-A3. Senior staff (M2+/P3+) will engage despite gamification.**
- *Canonical:* If we offer an "Expert" path that skips intro paths → then ≥ 40% of M2+/P3+ in target audience complete ≥ 1 path → by end of C2'26.
- *Confidence:* **LOW.** Phuong-style managers are time-starved; Tuan-style P3 GDs explicitly "avoid monetization numbers." Streaks + hearts read as childish at senior grade.
- *Cheapest test:* 30-min interview with 3 M2 PMs + 2 P3 GDs showing a clickable mock; score perceived-childishness and willingness-to-do-daily.
- *Cost if wrong:* Audience halves; success metrics on the *highest-leverage* personas (managers reducing tutoring time per JTBD table) miss.

**H-A4. MEP partners (Smulie, Yogame, Reactional) and acquired studios will adopt the same tool.**
- *Canonical:* If DuoData is offered to MEP partners → then ≥ 50% of partner staff complete Product 101 → within 8 weeks of access grant.
- *Confidence:* **LOW.** External org motivation, SSO scope, and content fit for non-Amanotes products are all unvalidated.
- *Cheapest test:* Single-partner pilot (Smulie) post-MVP, no engineering cost beyond SSO scope expansion.
- *Cost if wrong:* The "Capability: Publishing" strategy-fit claim in 00-overview weakens; doesn't kill MVP.

## Content

**H-C1. Cross-Functional Connections post-test will move from ≤ 40% baseline to ≥ 80% after F053.**
- *Canonical:* If a learner completes F053 (5 units, ~25 lessons) → then Cross-Functional post-test accuracy ≥ 80% → for representative Amanoters → vs. ≤ 40% pre-test baseline.
- *Confidence:* **MEDIUM.** Spaced-repetition + scenario cards have evidence in language learning, but 40 → 80 percentage points is aggressive for one path.
- *Cheapest test:* Run the pre-test *now* on 20 Amanoters with no intervention. If baseline is already > 50%, recalibrate target. The Definition of Done already names this — execute before content build.
- *Cost if wrong:* The headline KPI in 00-overview misses; the "single most important concept" (`Profit = Installs × (UV − eCPI)`) remains misunderstood; DnI loses credibility on the next learning investment.

**H-C2. The Act-date vs Cohort distinction is teachable in one unit (Product 101 U2).**
- *Canonical:* If a learner completes Product 101 U2 → then ≥ 85% can correctly classify metrics as act-date or cohort → for new POs/UAs/MOs → on the unit checkpoint.
- *Confidence:* **MEDIUM-LOW.** This is called the "single most-taught concept" *and* the "most-mistaught" in the codebase. One unit + checkpoint may not be enough; mastery may require repeated cross-path practice (F024).
- *Cheapest test:* A/B the U2 checkpoint with and without the side-by-side timeline visualization on the first 30 learners; measure first-attempt pass rate.
- *Cost if wrong:* Downstream paths (F053 U1, U2, U3) compound the misunderstanding. AC-F053-03 (the "other view" distractor) becomes the wrong-answer-of-choice instead of a teaching moment.

**H-C3. Content authored by Product/UA/Mon DRIs (not professional curriculum designers) clears the quality bar.**
- *Canonical:* If we delegate authoring to function DRIs → then ≥ 90% of cards pass the metric-name-allowlist linter and the "every wrong answer = plausible Amanoter confusion" bar → at first author submission.
- *Confidence:* **LOW.** DRIs are domain experts, not pedagogy experts. "Plausible distractors" is a learned skill.
- *Cheapest test:* Ask 3 DRIs (one per function) to author 5 cards each before MVP build; run the linter and a peer review against the F050 quality bar. Measure rework rate.
- *Cost if wrong:* DnI becomes a bottleneck rewriting cards; content velocity drops; ADR-005 RACI is violated in practice.

**H-C4. DataHub API exposes definitions cleanly enough to drive live content sync.**
- *Canonical:* If we pull metric definitions live from DataHub → then ≤ 5% of cards flag `definition_drift` per quarter → across all paths → without manual reconciliation.
- *Confidence:* **MEDIUM.** Mitigation is named in `Risks` but assumes a stable DataHub schema and term-string canonicalization the glossary may not actually have.
- *Cheapest test:* Pull DataHub glossary today; diff against the in-PRD glossary.md; count canonical-string mismatches and missing terms (OOV section already hints this exists).
- *Cost if wrong:* Content rots silently — exactly the risk DuoData is meant to solve. Linter passes but learners are taught stale definitions.

## Gamification

**H-G1. XP / streak / hearts / leagues drive R7 ≥ 45% in a B2B learning context.**
- *Canonical:* If we ship full Duolingo-style gamification → then R7 ≥ 45% of activated users → for target-audience cohort → at 12 weeks post-launch.
- *Confidence:* **LOW.** Duolingo R7 benchmarks are consumer, voluntary, and habit-forming over years. Workplace learners have rival job demands.
- *Cheapest test:* Strip one gamification mechanic (leagues) from the pilot cohort; compare R7 on a 200-user sample. If leagues alone move R7 < 3pp, the stack is over-built.
- *Cost if wrong:* Engineering investment (F010–F014 implied) misallocated; senior staff anti-pattern (00-overview risk) realized.

**H-G2. Daily quests + streaks are net-positive for senior staff, not just net-positive on average.**
- *Canonical:* If senior staff (P3+/M2+) see the same gamification surface → then their R7 ≥ 30% (lower bar than overall) → without opt-out churn → through C2'26.
- *Confidence:* **LOW.** No segmentation strategy named in 00-overview beyond "Expert path."
- *Cheapest test:* Add a gamification-intensity toggle in the pilot and measure opt-down rate by grade.
- *Cost if wrong:* Asymmetric churn — the personas with most tutoring leverage (Phuong M2) leave first.

## Technical

**H-T1. BigQuery as content source-of-truth with 5-min app-layer cache is performant enough for learners.**
- *Canonical:* If content lives in BQ with a 5-min TTL cache → then p95 lesson load < 1s → for all paths → at MVP scale (~500 DAU).
- *Confidence:* **MEDIUM-HIGH.** BQ isn't a low-latency OLTP store, but a 5-min cache absorbs that. Risk is cold-cache + cache-stampede on path-completion spikes.
- *Cheapest test:* Load-test the prototype with synthetic 500 concurrent learners; measure cache hit ratio. Already cheap given Firebase + BQ stack is in-house.
- *Cost if wrong:* Latency tanks D0 activation funnel; ADR-005 storage decision needs revisit.

**H-T2. SSO via Amanotes Google Workspace covers 100% of intended audience including acquired-studio staff.**
- *Canonical:* If we gate on Google Workspace SSO → then ≥ 95% of target Amanoters can log in on day 1 → including Smulie/Yogame/Reactional staff → without IT tickets.
- *Confidence:* **MEDIUM-LOW.** Acquired studios often retain their own identity providers.
- *Cheapest test:* Pull IT's IdP inventory; count non-Workspace users in the target audience.
- *Cost if wrong:* MEP-publishing strategy-fit claim breaks; visible exclusion of acquired staff hurts.

## Organizational

**H-O1. DnI will own the platform and Product/UA/Mon DRIs will own their paths post-launch (ADR-005 RACI holds).**
- *Canonical:* If we publish the ADR-005 RACI → then content freshness SLA (definitions updated within 1 week of DataHub change) is met → for all 4 paths → for 4 consecutive quarters.
- *Confidence:* **LOW.** Internal-tool decay is named as a risk. DRIs have day jobs; "content owner" rarely survives the first re-org.
- *Cheapest test:* Get explicit C2'26 OKR commitments from each function head before MVP build; if any function won't OKR it, that path is at risk.
- *Cost if wrong:* The exact failure mode listed in `Risks` — nobody owns it after launch — plays out. Six months later DuoData's UV teaches the wrong number and credibility collapses.

**H-O2. Manager tutoring time drops measurably (Phuong's JTBD).**
- *Canonical:* If new hires complete onboarding paths → then M2 PM time on metric tutoring drops by ≥ 50% → for LiveOps M2s → within 6 weeks of cohort onboarding.
- *Confidence:* **MEDIUM.** Plausible but unmeasured — there's no current baseline for "3 hrs/week" claim in personas.
- *Cheapest test:* 1-week time diary from 3 M2 PMs *before* MVP. Repeat 6 weeks after new hires onboard via DuoData.
- *Cost if wrong:* Strategy-fit to "Performance Clarity ≥ 75%" weakens; leadership-dashboard secondary use case loses its anchor.
