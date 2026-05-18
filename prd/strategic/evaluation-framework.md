# Evaluation framework

DuoData is an internal learning product. We evaluate it like an Amanotes game where the "revenue" is **metric literacy** and the "monetization" is **decision quality** in the squads that consume the metric tree. Cohort anchor = `auth_login_success` with `is_first_session=true` (install-equivalent). Act-date is used only for active-usage health (`#troubleshooting_alert_pi`-style operational checks).

## 1. Outcome metrics — by horizon

| Horizon | Outcome metric | Definition | Target | View |
| --- | --- | --- | --- | --- |
| **4 wk** | Activation rate | invited Amanoter → `lesson_completed` ≥1 within 14 days | ≥70% | cohort |
| **4 wk** | R1 / R7 | back the day after / 7 days after first SSO session | R1 ≥55%, R7 ≥45% | cohort |
| **4 wk** | Time-to-first-path-unit | first `path_unit_completed` from `onboarding_completed` | p50 ≤5 days, p90 ≤14 days | cohort |
| **12 wk** | R30 | active ≥30 days post first session | ≥25% | cohort |
| **12 wk** | Path completion rate | ≥1 `path_completed` (any path) per activated user | ≥40% | cohort |
| **12 wk** | Cross-functional unlock rate | unlocked F053 per activated user | ≥30% | cohort |
| **12 wk** | sumR30 (engagement depth) | Σ daily-active-days across cohort, days 0–30 | ≥7 | cohort |
| **12 wk** | Onboarding-funnel uplift | new-hire-cohort weeks-to-correct-dashboard-read (manager rubric, F101) | -40% vs. pre-DuoData baseline | cohort |
| **6 mo** | New-hire path completion | F050+F051+F052 done within 6 weeks of joining, PI/BH/DR/GDUC squads | ≥60% (KPI in 00-overview) | cohort |
| **6 mo** | WAU among target audience | weekly active / addressable headcount | ≥30% (KPI in 00-overview) | act-date |
| **6 mo** | NPS among PO + UA + MO | quarterly survey | ≥+30 | act-date |

**Stronger replacements for declared targets.** Two of the 00-overview metrics are too coarse:

- "Path completion rate ≥40%" is engagement, not learning. Replace the success criterion with a **weighted score**: `0.5 × path_completion + 0.5 × Cross-Functional post-test ≥80%`. A path-completer who fails the post-test is not a win.
- "R30 ≥25%" should be conditioned on **mastered cards** (`card_mastered` events from F024 SRS), not just sessions. A learner who only clears `daily_quests` to keep their streak is grinding, not learning.

## 2. Learning effectiveness metrics

The whole project fails if completers can't read a dashboard. Engagement-only metrics are insufficient.

| Metric | Source | Target |
| --- | --- | --- |
| Pre/post-test gap on Cross-Functional items | F003 `placement_quiz_completed` vs. F053 final checkpoint | baseline ≤40% → ≥80% (declared) |
| Act-date-vs-cohort disambiguation accuracy | `card_answered` filtered to `card_type=multiple_choice` on U2 items in F050 | ≥85% on first attempt by week 8 of a cohort |
| Time-to-first-correct-dashboard-read | manager-administered rubric: read a real PI Metabase board, answer 5 questions correctly | p50 ≤14 days for new hires (vs. baseline 4–8 weeks per 00-overview) |
| Hypothesis-format adoption | sampled cycle-review docs containing canonical hypothesis (`If [change] → then [impact] → for [audience] → by [amount]`, ADR-002) | ≥60% of cycle-review docs by 6 mo |
| `scenario_card_branch_taken.is_canonical=true` rate on F053 U5 | F053 event | ≥75% after a full path completion |
| Manager-reported clarity | quarterly 5-pt survey to managers of DuoData completers | mean ≥4.0 |
| Confluence metric-tree page comprehension drop | proxy: support pings in `#troubleshooting_alert_pi` asking "what is UV?" / "act-date or cohort?" — counted via Slack search | -50% within 6 mo |

The pre/post gap (declared in 00-overview, F053 DoD) is the **single most important learning metric**. If it doesn't move, nothing else matters.

## 3. Anti-metrics — what falsely looks like success

| Anti-metric | What it masks | Guardrail |
| --- | --- | --- |
| Streak length without `card_mastered` growth | grinding for streak via easy daily quests | If `streak_incremented` grows faster than `card_mastered`, flag the cohort as "grind-skewed" |
| High `lesson_completed.accuracy` with high `lesson_resumed` rate after a `lesson_abandoned` | learners retry until they memorize the answer key | accuracy on **first attempt only** is the reported KPI; retake accuracy is a separate diagnostic |
| Path completion without F053 unlock | base paths done but cross-functional never started | report "true completion" = ≥1 base path **and** F053 ≥U1 completed |
| Leaderboard whales | one PO drives `league_finished_week.outcome=promoted` repeatedly; team adoption looks healthy | report adoption at **median by team**, not mean; suppress top-decile from team-level dashboards |
| High WAU driven by `quest_completed` only | users tap quests, never start a lesson | "Real WAU" = users with ≥1 `card_answered` that week, not just `quest_completed` |
| Definition drift unnoticed | DataHub redefines `eROAS D7`; old DuoData cards still pass post-tests | `admin_drift_resolved` lag — alert if any card stays in drift state >14 days |
| Selection bias: only enthusiasts opt in | the 30% WAU is the same 30 people | track **breadth**: `% of headcount in each squad with ≥1 lesson_completed` per quarter; floor ≥50% per squad by 6 mo |

## 4. Diagnostic metrics — when something underperforms

Apply the Amanotes metric-tree decomposition pattern. If an outcome misses, decompose it the same way TBS decomposes ROAS.

`Path completion = Activation × Lesson-completion-per-active × Units-per-lesson-completer × Path-finish-per-units-done`

| Symptom | First-line diagnostic | Tool |
| --- | --- | --- |
| R7 missing target | Funnel: `lesson_completed` day 0 → day 1 → day 7; segment by role, team, placement-quiz score | F101 Adoption dashboard, Metabase |
| Low Cross-Functional post-test accuracy | Card-level accuracy on F053 U2/U3 cards; `scenario_card_branch_taken.is_canonical=false` distribution | F101 Card performance |
| Activation dip | `onboarding_completed` rate, `placement_quiz_skipped` rate, time between `auth_login_success` and `lesson_started` | F101 Adoption + funnels |
| Team X underperforms | Cohort the team; compare card-level accuracy on their team's domain (UA team on UA 101 cards) vs. global | F101 filtered by `team` |
| High `lesson_abandoned` mid-lesson | Card-level abandon rate; correlate with `time_to_answer_ms` p90 | F101 Card performance, sort by abandon rate |
| Hearts/streak system causing churn | `out_of_hearts` → next-session-within-24h rate; `streak_broken` → return-within-7d rate | Metabase ad-hoc on F021 events |
| Drift-induced accuracy decay | Time-series of accuracy on cards with `definition_drift` flag | F101 Drift queue |

Wire diagnostics into TBS the way `#troubleshooting_alert_pi` already wires ROAS alerts. A weekly DuoData alert into a `#duodata_health` channel: "R7 down 8 pp WoW for UA-squad cohort; top driver: U2 cohort-vs-act-date card accuracy dropped from 78% → 61%."

## 5. Decision criteria

Decisions tied to thresholds at the **12-week post-MVP** review and again at **6 months**.

| Decision | Threshold | Logic |
| --- | --- | --- |
| **Ship phase 2 mobile (iOS + Android)** | 12 wk: activation ≥70% **and** R30 ≥20% **and** F053 post-test ≥70% | Mobile only justified if web demonstrates learning, not just installs |
| **Greenlight Creative 101 + GD 101** | 6 mo: any of the 4 MVP paths reaches ≥50% completion within its DRI squad | DRI ownership pattern is validated; replicate |
| **Expand to MEP partners + acquired studios** (Smulie, Yogame, Reactional) | 6 mo: MEP-relevant subset of cards has Confluence-link CTR ≥30% **and** post-test gap holds when run on a non-Amanotes-acquired-studio pilot of ≥20 learners | Capability-fit before scale |
| **Sunset / kill** | 12 wk: activation <40% **or** F053 post-test gap <15 pp | Project has not demonstrated either reach or efficacy |
| **Pause and content-redo** | 12 wk: activation ≥70% but F053 post-test gap <30 pp | Reach is fine, content isn't teaching — pause expansion, fix curriculum |
| **Invest in personalization (DDA-style)** | 12 wk: top-decile vs bottom-decile placement-quiz cohorts diverge >40 pp on path completion | Heterogeneity justifies adaptive difficulty |

Each decision review is a written doc in the canonical Amanotes hypothesis format. Example: "If we ship mobile → then R30 lifts 5 pp → for new-hire LO4 cohort → by 12 weeks post-launch."

## 6. Measurement plan

**Source of truth.** All app events flow Firebase → BigQuery via the standard Amanotes pipeline (matches 00-overview "Tracking pipeline to Firebase + BigQuery").

**Dashboards (Metabase, owned by DnI).** Mirror the F101 structure:

1. `duodata_adoption` — invited → `auth_login_success` → `onboarding_completed` → `lesson_completed` → `path_completed` → F053 unlock. Filters: `team`, `role`, joined-week cohort.
2. `duodata_learning` — pre/post gap, card-level accuracy heatmap, F053 `scenario_card_branch_taken.is_canonical` rate, `card_mastered` density per active user.
3. `duodata_retention` — R1 / R7 / R30 / sumR30 by cohort × role. Reuses the standard Amanotes retention macro.
4. `duodata_health` (act-date) — DAU, WAU, real-WAU (≥1 `card_answered`), `lesson_abandoned` rate, hearts/streak diagnostics.
5. `duodata_anti_metrics` — grind-skew flag, leaderboard-whale share, drift-lag, breadth-per-squad.
6. `duodata_drift` — wired to F100 `admin_drift_resolved` + `definition_drift` flags.

**BigQuery tables.** Use the existing event tables produced by the pipeline (one row per event). Curated marts:

- `duodata.mart_user_cohort` — one row per user, install_date, role, team, placement_score, current_path, R1/R7/R30 flags.
- `duodata.mart_card_performance` — card_id × week × accuracy_first_attempt × abandon_rate × drift_status.
- `duodata.mart_path_funnel` — user × path × unit funnel.
- `duodata.mart_learning_test` — pre vs post accuracy per concept tag (act-date-vs-cohort, hypothesis-format, profit-equation).

**Event names used (all declared in feature files).** `auth_login_success` (F001), `onboarding_completed` (F002), `placement_quiz_completed` / `placement_quiz_skipped` (F003), `lesson_started` / `card_answered` / `lesson_completed` / `lesson_abandoned` / `lesson_resumed` (F004), `xp_awarded` / `level_up` (F020), `heart_lost` / `out_of_hearts` / `streak_incremented` / `streak_broken` / `streak_frozen` (F021), `quest_completed` (F023), `practice_card_answered` / `card_mastered` (F024), `path_unit_started` / `path_unit_checkpoint_attempted` / `path_unit_completed` / `path_completed` (F050), `scenario_card_branch_taken` (F053), `metric_tree_node_clicked` / `metric_tree_to_lesson` (F054), `admin_card_published` / `admin_drift_resolved` (F100), `admin_dashboard_viewed` (F101).

**Cadence.** Weekly DnI review of dashboards 1–4; bi-weekly DRI review of dashboard 6 with content authors; quarterly leadership review of decision-criteria thresholds; the pre/post benchmark from F053 DoD is re-run every cycle (C2, C3, …) on the rolling new-hire cohort.

**Ownership.** DnI owns the framework and dashboards. Each path DRI (Product, UA, Mon) owns the diagnostic for their domain. Decisions in §5 are signed by the DuoData PO with DnI co-sign.
