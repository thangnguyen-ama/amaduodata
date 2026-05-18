# Glossary

Authoritative source: [DataHub](https://datahub.amanotes.net/glossary). Terms below are mirrored for in-PRD reference and should be the **exact strings** used in lesson content. If a term is not in DataHub, raise an OQ instead of inventing one.

Terms are grouped by domain. Synonyms are listed; lesson content uses the **canonical** term and surfaces synonyms only when teaching the synonym itself.

## Business & financial

| Canonical | Synonyms | Definition |
| --- | --- | --- |
| Revenue | — | Total income = IAA + IAP + Sub |
| IAA | Ad Revenue, Ads Revenue | In-App Advertising revenue |
| IAP | — | In-App Purchase revenue |
| Sub | Subscription | Recurring premium-access revenue, managed via RevenueCat |
| EBIT | — | Earnings Before Interest and Taxes |
| PM | Profit Margin | Profit after UA cost. PM > EBIT |
| Profit after UA | — | Revenue minus UA costs |
| MER | — | Media Efficiency Ratio = Revenue / UA Spend |
| SOV | — | Share of Voice |

## View distinctions (critical — single most-taught concept)

| Canonical | Definition |
| --- | --- |
| Act-date view | Metrics measured by **when the action occurs** today. E.g., ARPDAU, DAU, daily Revenue, daily Cost |
| Cohort view | Metrics measured by **when the user first installed** the app. E.g., UV, R1/R7/R30, ROAS, LTV |

## Product & retention

| Canonical | Synonyms | Definition |
| --- | --- | --- |
| DAU | — | Daily Active Users (act-date) |
| MAU | — | Monthly Active Users |
| Returned Users D30+ | — | Users active ≥30 days post-install (company KPI) |
| R1 / R7 / R14 / R30 | D1, D7, D14, D30 | Retention Day X — % returning X days after install (cohort) |
| sumR7 / sumR14 / sumR30 | — | Sum of retention over X days — cumulative engagement depth |
| sumME | — | Sum of Music Engagement |
| FTUE | Onboarding | First-Time User Experience |
| Churn User | — | Inactive 7 consecutive days |
| Early Churn | — | Last active day = Day 1, then inactive |
| Late Churn | — | Active Day 2–7, then inactive |

Key product events: `me_start`, `song_start`, `song_revive`, `song_unlock`, `song_result`.

## Monetization

| Canonical | Synonyms | Definition |
| --- | --- | --- |
| UV | User Value | Revenue per user, **cohort view**. The primary monetization metric |
| UV0 / UV1 / UV7 / UV14 / UV30 | — | UV at Day 0/1/7/14/30 post-install |
| ARPDAU | — | Average Revenue Per DAU = total revenue / total DAU (act-date) |
| ARPU | — | Average Revenue Per User |
| ARPPU | — | Average Revenue Per Paying User |
| LTV | UV∞ | Lifetime Value — long-term cohort value |
| eCPM | — | Effective Cost Per Mille — revenue per 1,000 ad impressions |
| Fill Rate | — | % of ad requests successfully filled |
| Pay Rate | Conversion Rate (IAP) | % of users making ≥1 purchase |
| Trial Rate | — | % of users starting a sub free trial |
| SOW | — | Share of Wallet |

Ad formats: **RW** (Rewarded), **FS / IS** (Interstitial / Full Screen), **AOA** (App Open Ad), **BN** (Banner), **MREC** (300×250).

## UA & Marketing

| Canonical | Synonyms | Definition |
| --- | --- | --- |
| UA | User Acquisition | Paid user-acquisition process & team |
| CPI | — | Cost Per Install |
| eCPI | — | Effective CPI = UA cost / (paid users + organic uplift) |
| ROAS | — | Return On Ad Spend = revenue / ad spend |
| ROAS1 / 7 / 30 / 365 | — | ROAS at interval X |
| pROAS | — | Predicted ROAS |
| Paid ROAS D7 | — | Revenue D7 / Cost (paid-only, excludes organic uplift) |
| eROAS D7 | — | Revenue D7 including organic uplift / Cost (blended) |
| IPM | — | Installs Per Mille — installs per 1,000 ad impressions |
| CTR | — | Click-Through Rate |
| CVR | CTI, IR | Conversion Rate (install) |
| K-factor | — | Organic uplift ratio = organic_uplift_installs / paid_installs |
| ASO | — | App Store Optimization |
| SRN | — | Self-Reporting Network (Google, Meta, TikTok) |
| SDK Network | Non-SRN | IronSource, Mintegral, AppLovin, Unity, etc. |
| Retargeting | Reactivation | Re-engaging lapsed users |

## Creative

| Canonical | Synonyms | Definition |
| --- | --- | --- |
| Creative | — | Ad asset (video, playable, banner, screenshot) |
| Playable | HTML, HTML5 Ad | Interactive HTML5 ad |
| IEC | — | Interactive End Card |
| UGC | — | User-Generated Content style ad |
| Winning Creative | — | Top 1 by spend or installs for ≥2 consecutive weeks |
| Creative Fatigue | — | Performance decay from audience overexposure |
| Thumb-stop | Hook Rate | First 1–2 seconds stopping a user from scrolling |

## Products & teams

| Code | Meaning |
| --- | --- |
| PI / PIa / PIi | Magic Tiles 3 / Android / iOS |
| BH / BHa / BHi | Tiles Hop: EDM Rush / Android / iOS |
| DR / DRa / DRi | Dancing Road / Android / iOS |
| GDUC / GDUCa / GDUCi | Duet Cats / Android / iOS |
| LO3 | PI + BH + DR |
| LO4 | PI + BH + DR + GDUC |
| GAMA | Amanotes Games Division |
| LiveOps (LO) | Division operating live games |
| NGD | New Games Division |
| MEP | Music Entertainment Platform — external publishing |
| DnI | Data & Insights |
| GS | Games Solution |
| COE | Center of Excellence |
| GCDAA | Cat Dash |
| GMDS | Magic Dance Star |
| GGF2 | Guitar Fire 2 |
| MTP | Magic Pad |
| CORE / RUSH / ECHO | NGD sub-teams / framework |

## Roles

- **PO** — Product Owner · **GD** — Game Designer · **LD** — Level Designer · **MS** — Music Specialist · **MO** — Monetization Operator · **PIC / DRI** — Person in Charge / Directly Responsible Individual · **DA** — Data Analyst · **CRE** — Creative

## Tools (referenced in lessons)

Metabase, BigQuery (BQ), DataHub, SAT, ABalyzer, Growthbook, Appsflyer (AF), SensorTower, AppMagic, Firebase, ThinkingData, Semantic Layer, Troubleshooting Tool (TBS), Glean / AI Connect, SnapBeat, PMP, CCS / CCS-CP, BCS, ACM, RevenueCat, Metica, Nefta, AppHarbr, Balancy.

## LiveOps & game design

| Canonical | Synonyms | Definition |
| --- | --- | --- |
| LiveOps | LO | Running live events, updates, content post-launch |
| Live Event | LE | Time-limited in-game event |
| Season Pass | Battle Pass | Progression-based monetization |
| Rhythm March | — | Specific LE in PI |
| TESS | — | Theme, Economy, Segmentation, Schedule — LE framework |
| Core Loop | — | Primary repeating gameplay cycle |
| Meta Layer | Meta | Systems above core loop |
| DDA | Cadence (SDK), Difficulty Personalization | Dynamic Difficulty Adjustment |
| Hypothesis (canonical format) | — | "If [change] → then [impact] → for [audience] → by [amount]" |
| Soft Launch | SL | Limited-market release for validation |
| POC / MVP / PMF / TTL | — | Proof of Concept / Min Viable / Product-Market Fit / Time-to-Launch |

## Environment abbreviations

DEV · QC/TEST · UAT/CAT · STAG · PROD

## Out-of-vocabulary

If you (author or implementer) want to use a term not listed here, file an OQ. Examples of terms that are **not** in this glossary and must not appear in lesson content: "average user lifetime", "stickiness", "MAU/DAU ratio" (use it only if it appears in DataHub).
