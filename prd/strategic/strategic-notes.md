# Strategic notes

## 1. Strategy fit: core, not side

**Position: DuoData is a load-bearing input to the 2026 Analytics & Experimentation capability, not a nice-to-have learning toy.**

The strongest case it fits: the 2026 plan has a *Performance Clarity ≥75%* KPI and an *Analytics use case completion 100%* KPI. Both are downstream of a more fundamental variable Amanotes has never explicitly measured — *metric literacy*. You cannot have a PO who reads R7 and an MO who reads ARPDAU correctly debate an ad-density change if they cannot agree on which view (act-date vs cohort) the number lives in. DuoData targets exactly that bottleneck, and F053 (Cross-Functional Connections) is the precise lever: the post-test going from ≤40% to ≥80% is a directly measurable Performance Clarity proxy. On Returned Users D30+ (1.91M target) — every PO/MO/UA Specialist who internalizes the second-order effect of ad density on R1 generates compound retention gains across LO4. The link is real.

The strongest case against: DuoData does not *itself* run experiments, ship features, or move a dashboard number. It moves *people*, and that translation is slow and noisy. There is a real risk leadership scores it as L&D overhead instead of a capability investment, especially if F053's pre/post-test bench reads as "training metric" not "business metric".

**Verdict: fits. But the framing needs to be *capability infrastructure*, not *learning app*. Land it in the 2026 plan under the Analytics & Experimentation capability, owned by DnI, with Performance Clarity as the headline KPI — not "completion rate".**

## 2. Build vs buy: build, narrowly

**Position: building wins, but only because the content IP is Amanotes-specific. The platform itself should be as boring as possible.**

A 360Learning or Sana deployment could get to a static-content MVP in 3–4 weeks at a fraction of the engineering cost. They handle SSO, authoring, completion tracking, even AI-assisted card generation. For Product 101 / UA 101 / Mon 101 — which are largely definitional — an off-the-shelf tool would *probably* be adequate.

What it cannot do: F053. The Cross-Functional Connections path is not a quiz — it's a scenario engine that walks "CPI drop → quality dilution → R1 dip → ARPDAU dip → UV7 flat → ROAS D7 holds" through the canonical hypothesis format, branching on learner predictions, against a live-linked DataHub glossary, with a metric tree visualization (F054) that highlights nodes as the scenario advances. No LMS does this. The closest analog is a custom simulation, and Sana/360 do not support it without heavy customization that erodes the buy-vs-build math.

**Verdict: build, but only build *what is uniquely Amanotes*. Specifically: F053 (scenario engine), F054 (interactive metric tree), the DataHub live-link authoring tool, the metric-name-allowlist linter. Everything else — XP, streaks, leagues, SSO, completion dashboards — should be commodity. If MVP slips, the build-vs-buy answer flips and we should rent the gamification shell.**

## 3. Moat: the metric tree is the IP

**The moat is not the app. It is that the Amanotes metric tree, as an internalized teaching artifact, exists nowhere else on the planet.**

Generic learning tools teach generic metrics. DAU/MAU/ROAS on a Sana course is the same DAU/MAU/ROAS on a Coursera course. But *PI/PIa/PIi vs BH/BHa/BHi*, *eROAS D7 vs Paid ROAS D7 with the K-factor caveat in the GAMA portfolio*, *the act-date/cohort split as it shows up in PI's `#troubleshooting_alert_pi` channel* — these are tacit, oral-tradition knowledge that today lives in M2/M3 Amanoters' heads and in one heavily-linked Confluence page. F053 takes that tacit knowledge and makes it transferable.

The cross-functional teaching gap is the second moat. A Sana course can teach UA metrics OR Product metrics, but not the *linkage* — because the linkage requires a specific business model (hybrid casual + IAA-heavy + IAP-light + UA-driven distribution) and a specific portfolio (LO4 + NGD + MEP). DuoData encodes that worldview. Once an Amanoter learns the metric tree through DuoData, switching them to another company's framing is genuinely costly. That is moat.

## 4. Sequencing under constraint (2 eng + 0.5 PO + 0.25 design, C2'26)

**Ship: F050 (Product 101) + F053 stripped to U1–U2 only + a minimum-viable player. Cut everything else.**

What survives:
- Player (F004 equivalent) — text/MCQ cards only, no scenario branching yet.
- F050 Product 101 — the path with the highest absorbed-confusion ROI and the easiest content to author from existing Confluence.
- F053 U1 (Business Goal equation) + U2 (UA ↔ Product) — proves the cross-functional thesis with a 2-unit bench test.
- DataHub glossary linkage (AC-F050-04, the canonical-string linter) — without this the content drifts and the tool dies in 6 months.
- Metabase tracking dashboard — DnI must show movement or the project loses oxygen.

What gets cut: UA 101 (F051), Mon 101 (F052), F053 U3–U5, leagues, hearts, daily quests, mobile, Vietnamese, admin authoring UI (DnI authors via PR for MVP). Authoring tool is the biggest perceived cut but the lowest risk — three DnI people writing Markdown PRs is fine for 12 weeks. **Do not cut the linter and do not cut F053**: cutting F053 reduces DuoData to a glossary quiz, which 360Learning would do better.

## 5. Expansion: MEP partner enablement

**The biggest follow-on bet is licensing DuoData to MEP partners and acquired studios (Smulie, Yogame, Reactional). Not public content. Not NGD-specific paths.**

Reasoning: MEP's go-to-market problem in 2026 is that publishing partners arrive without Amanotes metric conventions and burn the first 90 days on definitional misalignment. A productized DuoData with partner-tenanted content paths shortens partner ramp from 90 days to 30 — a quantifiable MEP revenue accelerant. Smulie/Yogame/Reactional integration is even more natural because they are inside the org and need exactly this. The Publishing capability in the 2026 plan explicitly calls for this kind of partner enablement infrastructure.

NGD game-design paths are valuable but the audience is too small (one division) to justify a second product wave. Public thought-leadership content would be a brand play, not a revenue play, and dilutes the moat (the tacit IP) by exposing it.

## 6. Single biggest existential risk

**Risk: DuoData becomes a checkbox tool — Amanoters complete it during onboarding week 1, never return, and content rots within 6 months as the metric tree evolves. The Performance Clarity needle never moves and DnI cannot defend the line item in 2027 planning.**

This is not a hypothetical: it is the modal fate of every internal learning tool in every company of Amanotes' size.

**De-risk pre-launch — three moves, all before C2'26 ship:**

1. **Tie completion to a real workflow gate.** Path completion is a prerequisite for owning a Metabase dashboard or signing off on a cycle hypothesis (ADR-002 format). DnI + Product leadership need to agree to this *before* MVP ships, not after. No gate = no retention.
2. **Live DataHub binding, not snapshots.** AC-F050-04's "definition recently updated" flag must be wired from day 1. The IronSource shutdown on 2026-04-30 is the perfect forcing function: every UA card mentioning IronSource will need to update, and if the system handles that gracefully, content rot is solved structurally.
3. **F053 pre/post-test, published, with named cohorts.** Run the bench test on real Amanoters in C1'26 *before* MVP commits. If post-test does not crack 70%, the thesis is wrong and we should buy not build. If it does, that result is the strongest possible argument for the 2027 expansion to MEP.
