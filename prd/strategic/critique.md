# Critique

## Blocking

### B1 — The Business Goal equation in F053 contradicts itself across views and misuses canonical metrics

F053 U1 states: *"Cohort view: Profit = Installs × (LTV − eCPI). Act-date view: UA Profit = ARPDAU × DAU − Cost. Two views, one tree."* Meanwhile 00-overview.md frames the headline equation as `Profit = Installs × (UV − eCPI)`. These are inconsistent. The glossary defines **UV** as the canonical primary monetization metric (cohort) and lists **LTV = UV∞**. You cannot in one place say UV is canonical, then teach LTV in the same formula, then quietly substitute UV elsewhere. The Cross-Functional path is the headline deliverable; its first unit cannot wobble on which symbol Amanotes uses.

Why it matters: the entire success metric of DuoData (≥80% post-test accuracy on Cross-Functional Connections) rests on a single canonical equation. Two versions in two docs = guaranteed authoring drift, guaranteed learner confusion, and a failed pre/post-test bench.

Fix: pick one — almost certainly `Profit = Installs × (UVn − eCPI)` with `n` parameterized (UV7 / UV30 / UV365) — write it once in 00-overview, reference from F053, and add an ADR. Also: "UA Profit = ARPDAU × DAU − Cost" is dimensionally suspect because ARPDAU × DAU recovers daily Revenue (not profit) and "Cost" here mixes act-date UA spend with anything else; spell it out as `Daily Contribution = (ARPDAU × DAU) − Daily UA Cost − Daily OpEx` or drop the equation.

### B2 — Success metrics use product-app semantics on an internal tool with a finite, captive audience

00-overview.md defines success as R7 ≥45% / R30 ≥25% / Activation ≥70% on a **cohort view (install date = first SSO login)**. The audience is Amanoters — a closed population of a few hundred to low thousands, with management nudges. Cohort-style retention is the wrong frame:

- There is no acquisition funnel. Every "user" is already paid for. R7/R30 against an *invited* base will be dominated by who got an invitation email that week, not learning value.
- R30 ≥25% on a closed population means 75% of Amanoters churn from the learning tool in a month. Either that's catastrophic for an L&D tool tied to onboarding, or the metric is meaningless. Both readings are bad.
- The 30% WAU target in README contradicts the R7 ≥45% target in 00-overview — WAU among target audience vs R7 among activated users are different denominators with no reconciliation.

Why it matters: DnI owns the dashboard. If the dashboard reports vanity retention numbers, leadership will either be falsely reassured or falsely alarmed. Worse, the PRD literally teaches "act-date vs cohort view" as the most important concept — then misapplies it on page one.

Fix: success metrics for an internal L&D tool should be **path completion rate within onboarding cycle**, **time-to-first-correct-path-completion** (median days post-SSO), **manager-attested role readiness lift**, and **pre/post Cross-Functional test delta**. Keep WAU as a guardrail at most. Drop R1/R7/R30 framing or label it explicitly as "engagement curve, not retention."

### B3 — F001 SSO depends-on graph is broken; F002 is the actual gate

F001 frontmatter declares `blocks: [F002, F005]` and AC-F001-02 routes first-time users to `/onboarding`. But the success metric in 00-overview defines **activation as "D0 → first lesson completed"**, and the cohort install date as "first SSO login." If onboarding (F002 — role pick) is required between login and first lesson, then activation depends on F002 behavior that isn't specified here. Also: F001 frontmatter says `platforms: [web, ios, android]` while ADR-001 is "web-only MVP." Same drift in F004 and F053.

Why it matters: copy-paste frontmatter across features misrepresents scope, and a multi-agent implementer will read frontmatter as truth. The platform-list error will cascade into estimation, test plans, and tracking events (`platform` is a required param on `auth_login_attempt`).

Fix: set `platforms: [web]` on all MVP features and add a lint rule (you already have a CI cross-ref check in F053 DoD — extend it). Clarify in F001 whether the SSO success event or the first lesson completion is the activation moment; pick one and write it into 00-overview.

### B4 — No data residency / privacy story for a tool that audits every login for 365 days and stores deactivated-employee data in BQ

F001 says login + logout audit retained 365 days in BigQuery, plus F100 stores 365 days of admin actions, plus per-card per-user attempt data. This is a Vietnam-headquartered company storing employee performance data ("cards_wrong", "time_to_answer_ms", "accuracy") indefinitely in BQ. The PRD has no:

- Retention / deletion policy for departed employees.
- Statement on whether managers can see individual scores (huge implication for Employee Engagement guardrail ≥75 — if people think their boss sees their wrong answers, adoption dies).
- DPIA / IT / legal sign-off owner.
- Pseudonymization plan for the analytics tables vs the learner-facing dashboards.

Why it matters: this is the single risk most likely to kill the project after launch via an IT/HR escalation. None of the four listed risks in 00-overview address it. "DnI owns the platform" is not a privacy answer.

Fix: add ADR-006 — Privacy & data handling for learner data. Specify: scores are private to the learner by default; managers see aggregate role/team stats only; per-user data deleted on offboarding within X days; pseudonymized analytics dataset separate from PII dataset.

## Major

### M1 — Hearts/streak/leagues are a direct contradiction of the stated risk and audience

00-overview lists "Gamification feels childish for senior staff" as a risk, with mitigation "Add an Expert path that skips intro paths." That does not mitigate the actual risk. The risk is hearts (F021), leagues (F022), and streak guilt — not whether you can skip Product 101. F004 AC-F004-04 literally pauses the lesson and tells a UA Lead with 8 years of experience to "wait it out" because they got a free-input numeric tolerance wrong. They will close the tab and never return.

Why it matters: the audience explicitly includes Leadership and senior roles (LD, PO, MO with multi-year tenure). Duolingo's hearts model works because Duolingo users *choose* the app; Amanoters are nudged into it as part of onboarding. The friction model is mismatched.

Fix: make hearts/leagues opt-in or role-gated. Default-off for IC4+ / Leadership. Or replace hearts entirely with a "mastery score" that doesn't block progress. Reference Duolingo's own pivot away from heart-blocking for adult learners.

### M2 — F053 prerequisite ("top-decile placement") is undefined and creates a chicken-and-egg

AC-F053-01: unlock after "≥1 unit in 2 of 3 base paths **or top-decile placement**." Top-decile of what cohort? Placement quiz (F003) hasn't been read yet, but at MVP launch there is no cohort to be top-decile of. First 50 learners will all be in the top decile of n=50. This will either gate the headline feature behind base-path grinding (bad for senior staff per M1) or open-gate it for early users and close-gate it later (worse — perceived unfairness).

Fix: define a fixed absolute threshold on the placement quiz (e.g., ≥85% on cross-domain items) instead of a relative one. Add to AC-F003 (placement quiz) explicitly.

### M3 — Definition drift checker (F100 AC-F100-06) is hand-waved and will silently fail

F100 says "DataHub returns a definition for a metric used by a card" → flag drift. But: cards contain *prose explanations*, distractors, scenarios, and formulas. DataHub returns canonical definitions. Comparing free-text "canonical answer text" to DataHub via string diff will produce 100% false positives. The PRD doesn't say whether this is an embedding-similarity check, a structured-field check on a `metric_id` foreign key, a manual review queue, or vibes.

Why it matters: the #1 listed risk is "Content rots — metrics evolve, definitions in DuoData drift from DataHub." The mitigation is this AC. If it doesn't actually work, the #1 risk is unmitigated.

Fix: model Cards with a structured `metric_references: [{metric_id, field}]` foreign-key list, and run drift checks on those structured references only. Add an ADR (you have ADR-003 on content versioning — extend or add ADR-006 on metric references).

### M4 — Tracking spec missing the most important event for the success metric

Success metric: "Cross-Functional Connections post-test accuracy ≥80% (vs. baseline pre-test)." Where is the `pre_test_completed` / `post_test_completed` event? F003 (placement-quiz) is the candidate but the index calls it placement, not pre-test, and F053 has no `post_test_*` event. `card_answered` with `card_type` won't reconstruct the pre/post test pair without a `test_run_id` foreign key.

Fix: add explicit `pretest_*` and `posttest_*` events in F053 and in F003. Define the matched-pair item set and store a stable `assessment_item_id` so pre/post deltas are computable.

### M5 — F004 lesson-player has no story for free-input numeric on percentages, currencies, and CPI/UV units

AC-F004-07 says tolerance ±2% default. Edge case mentions "50% vs 0.5". But ROAS is unitless (multiplier `0.80x`), UV is in dollars (potentially $0.16), CPI in cents/dollars/local-currency, eCPM per mille. A learner typing `0.8`, `0.80`, `80%`, `$0.16`, `0.16`, `16¢` for the same answer will be wrong half the time. The example in F004 itself — "If CPI=$0.20 and UV7=$0.16, what is ROAS D7? [0.80x or 80%]" — already accepts two formats; the spec doesn't define which the parser accepts for which card.

Fix: type each numeric card with `unit: ratio | percent | currency_usd | currency_local | per_mille`, render the unit next to the input, validate against the unit. Add to F004 data requirements.

### M6 — F053 says "no fabricated numbers" but every scenario card needs concrete numbers to be answerable

F053 card quality bar: "scenarios are realistic for Amanotes (LO4 portfolio, NGD pipeline, MEP partners), but use **no fabricated numbers** — abstract numbers ('$X', 'Y%') or known publicly-disclosed reference points only." Then U5 walks "creative-driven CPI drop → install volume up → user-quality dilution → R1 dip → ARPDAU dip → UV7 flat → ROAS D7 holds." That scenario is unteachable without numbers: a 5% CPI drop with 30% install volume gain is a different story than a 30% CPI drop with 5% install volume gain. Abstract `$X / Y%` placeholders prevent scoring `free_input_numeric` cards at all.

Fix: allow scenario numbers but require them to be (a) clearly labeled "illustrative", (b) directionally realistic for PI/BH/DR/GDUC scale, and (c) reviewed by the path DRI. Or: use anonymized real ranges (e.g., "CPI in $0.15–$0.35 band") rather than forbidding numbers entirely.

### M7 — Sequencing has F100 in parallel with F003/F004 but F100 blocks F050–F054 which are the actual content

Sequencing in features/_index.md: row 4 is "F100 authoring tool (parallel to content writing)." This is internally inconsistent — F100's `blocks` field literally lists [F050, F051, F052, F053, F054]. You cannot write content *in* the authoring tool before the authoring tool exists, and you cannot write it outside the tool and back-import (F100 explicitly lists "Bulk import from Confluence" as out of scope). Either F100 ships ahead of content or content is authored in YAML/markdown with a migration script. Pick.

Fix: either re-sequence F100 ahead of F050–F052, or add a P0 "F099 content seed import" feature.

## Minor

### m1 — Glossary terminology drift in feature copy

- F053 U2 says "Why a CPI win can be a retention loss." CPI is UA-side; retention is Product. Fine. But the cell title is "UA ↔ Product" and the body uses "K-factor / organic uplift's product side." Glossary defines K-factor as `organic_uplift_installs / paid_installs` — that's a UA-side measurement of an organic phenomenon, not "the product side of K-factor." This kind of fuzz in the headline path will get cited back in lessons.
- F053 U3: "Why ad density tunes retention" — "ad density" is not in the glossary. Use FS / IS / RW / AOA frequency caps, or add the term.
- F004 example: "ARPDAU is measured in which view? [Act-date / Cohort]" — correct. But the formula card example "ROAS D7 = Revenue D7 / ___ [Cost]" should be `UA Cost` or `Ad Spend` to match the glossary's `ROAS = revenue / ad spend`.
- 00-overview talks about "Performance Clarity ≥75%" without saying where that KPI lives or how it's measured; in the glossary nothing maps to it.

Fix: lint pass against glossary.md before publishing F050–F053. The glossary's own out-of-vocabulary section already encodes this rule — enforce it.

### m2 — F001 OQ-F001-01 (`@amanotesjsc.com`) should be closed, not open

The legal entity domain exists, real Amanoters have it, and F001 will reject them on day one. This is not a future-phase question; it's a launch-blocker masquerading as an OQ.

### m3 — F004 AC-F004-06 resume window of 24h is too short for an L&D tool with weekend gaps

A learner starting a lesson Friday EOD will lose progress by Monday. Hearts and XP-in-progress vanishing over a weekend will read as buggy. Bump to 7 days or never-expire mid-lesson state.

### m4 — F100 review gate is single-reviewer by default (AC-F100-03 says "reviewer(s)") with OQ on two-eyes

For Cross-Functional content owned by DnI and consumed by all functions, two-eyes (DnI + relevant function DRI) should be the default, not an OQ. The risk of a wrong cross-functional explanation propagating to hundreds of Amanoters dwarfs the friction of a second approver.

### m5 — F053 references F054 (interactive metric tree) as P1 while F053 itself is P0 and requires the tree visual

F053 design notes: "the metric tree visual from F054 is embedded at least once per unit" and card quality bar repeats it. F054 is P1 in the index. A P0 feature cannot have a hard dependency on a P1 feature. Either F054 is P0 (it should be — it's half of what makes Cross-Functional cross-functional) or F053's tree-embed requirement is downgraded to "static SVG snapshot until F054 ships."

## Nits

### n1 — F004 frontmatter has `last_invoked: 2026-05-17` — typo, should be `last_updated`. Will break any frontmatter linter.

### n2 — 00-overview lists "Smulie, Yogame, Reactional" as acquired studios needing fast onboarding, then ADR-001 and F001 OQ-F001-02 push partner SSO to phase 2. State the trade-off explicitly in 00-overview; right now strategy fit oversells what MVP delivers to those teams.

### n3 — Glossary lists `PI / PIa / PIi` but F053 AC-F053-01 references "top-decile placement" and F004 example "PIi eROAS D7" — fine, but ensure card content uses the platform-suffix variants consistently. Cards saying "PI eROAS D7" with a Magic Tiles iOS screenshot will confuse learners on the very distinction the lesson teaches.

### n4 — "Hypothesis (canonical format)" in glossary is `"If [change] → then [impact] → for [audience] → by [amount]"`. F053 user story says "by [amount]" but F053 AC-F053-04 rubric just says "matches the canonical hypothesis format" without listing the four slots. Spell them out in the AC so the rubric is testable.

### n5 — Components.md lists `OutOfHeartsModal` with copy "Practice to refill / Come back in 02:34 / Wait it out." The "Wait it out" copy is condescending for an internal tool. Replace with neutral copy ("Come back later") and route this through the UX copy review.

### n6 — README "Last updated 2026-05-17" matches every file's last_updated. Real PRDs drift; if all timestamps are identical the file history is invisible. Not load-bearing, but suggests these were stamped, not maintained.
