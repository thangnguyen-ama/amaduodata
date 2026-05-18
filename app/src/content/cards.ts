import { Card } from '../types'

// All card content uses canonical Amanotes terminology per glossary.md.
// Numbers in cards are illustrative — never claim a live PIa/BHi/etc. value.
export const CARDS: Card[] = [
  // ============================================================
  // PRODUCT 101 — Unit 1: Active users & views
  // ============================================================
  {
    id: 'p101-u1-l1-c1',
    type: 'multiple_choice',
    prompt: 'Which view does DAU use?',
    choices: ['Act-date view', 'Cohort view', 'Both, depending on dashboard', 'Neither'],
    answerIndex: 0,
    explanation: 'DAU = Daily Active Users today. It is measured by *when the action happens*, so it is act-date view. Cohort view anchors on install date.',
    xpReward: 10, difficulty: 1, metricSlugs: ['dau'], function: 'product'
  },
  {
    id: 'p101-u1-l1-c2',
    type: 'multiple_choice',
    prompt: 'Which metric is the company-level KPI for Amanoters?',
    choices: ['DAU', 'MAU', 'Returned Users D30+', 'R30'],
    answerIndex: 2,
    explanation: 'Returned Users D30+ is the company KPI: users still active 30 days post-install. R30 is the % version of the same idea.',
    xpReward: 10, difficulty: 1, metricSlugs: ['returned-users-d30'], function: 'product'
  },
  {
    id: 'p101-u1-l1-c3',
    type: 'matching_pairs',
    prompt: 'Match each metric to its view.',
    pairs: [
      { left: 'DAU', right: 'Act-date' },
      { left: 'R7', right: 'Cohort' },
      { left: 'ARPDAU', right: 'Act-date' },
      { left: 'UV7', right: 'Cohort' }
    ],
    explanation: 'Daily totals (DAU, ARPDAU, daily Revenue) → act-date. Anything anchored to install date (R*, UV*, ROAS) → cohort.',
    xpReward: 15, difficulty: 2, metricSlugs: ['dau', 'r7', 'arpdau', 'uv7'], function: 'product'
  },

  // PRODUCT 101 — Unit 2: Cohort view
  {
    id: 'p101-u2-l1-c1',
    type: 'multiple_choice',
    prompt: 'A user installs on 1 May. On 8 May they open the app. Which retention metric do they contribute to?',
    choices: ['R1', 'R7', 'R30', 'They count for ARPDAU only'],
    answerIndex: 1,
    explanation: 'R7 = % of an install cohort returning 7 days later. 1 May install + 8 May return = 7 days, so R7.',
    xpReward: 10, difficulty: 2, metricSlugs: ['r7'], function: 'product'
  },
  {
    id: 'p101-u2-l1-c2',
    type: 'scenario_judgment',
    prompt: 'Cohort vs act-date',
    scenario: 'A PO sees daily Revenue down 8% today on PIa, but UV7 for the most recent install cohort is up 3%. What does this tell you?',
    choices: [
      'Both views agree — monetization is getting worse.',
      'They measure different things — daily revenue is act-date (today\'s users), UV7 is a property of recent install cohorts.',
      'UV7 is wrong because daily revenue moves first.',
      'You cannot interpret without ARPDAU.'
    ],
    answerIndex: 1,
    explanation: 'Daily revenue dips can come from DAU mix shifts. UV7 measures the value newly-installed users will generate by D7 — a *cohort* property. Both can be true at once.',
    xpReward: 20, difficulty: 4, metricSlugs: ['uv7', 'arpdau'], function: 'product'
  },

  // PRODUCT 101 — Unit 3: Retention
  {
    id: 'p101-u3-l1-c1',
    type: 'drag_to_order',
    prompt: 'Order these retention checkpoints by day post-install (earliest first).',
    items: ['R30', 'R1', 'R14', 'R7'],
    correctOrder: ['R1', 'R7', 'R14', 'R30'],
    explanation: 'Standard Amanotes retention curve checkpoints: R1, R7, R14, R30.',
    xpReward: 10, difficulty: 1, metricSlugs: ['r1', 'r7', 'r30'], function: 'product'
  },
  {
    id: 'p101-u3-l1-c2',
    type: 'multiple_choice',
    prompt: 'What does sumR7 capture that R7 alone does not?',
    choices: [
      'How many users returned on D7 specifically',
      'Cumulative engagement depth across days 1 through 7',
      'Revenue earned per cohort',
      'Number of paid installs'
    ],
    answerIndex: 1,
    explanation: 'sumR7 = sum of retention curve from D1 to D7. R7 is a single point; sumR7 is the area under the curve — better at catching shallow vs deep engagement.',
    xpReward: 15, difficulty: 3, metricSlugs: ['sumr7', 'r7'], function: 'product'
  },

  // PRODUCT 101 — Unit 4: Engagement depth (compact)
  {
    id: 'p101-u4-l1-c1',
    type: 'matching_pairs',
    prompt: 'Match Music Engagement events to their meaning.',
    pairs: [
      { left: 'me_start', right: 'A music engagement session begins' },
      { left: 'song_start', right: 'User starts playing a specific song' },
      { left: 'song_result', right: 'Song ends — result screen' },
      { left: 'song_revive', right: 'User uses a revive after failing' }
    ],
    explanation: 'These four events are the core Music Engagement instrumentation across MT3, Tiles Hop, Dancing Road, Duet Cats.',
    xpReward: 15, difficulty: 2, metricSlugs: ['sumME'], function: 'product'
  },

  // PRODUCT 101 — Unit 5: FTUE
  {
    id: 'p101-u5-l1-c1',
    type: 'multiple_choice',
    prompt: 'Which metric is most directly moved by improving FTUE (tutorial completion)?',
    choices: ['UV30', 'R1', 'ARPDAU', 'eCPM'],
    answerIndex: 1,
    explanation: 'FTUE quality determines whether a user comes back the next day. R1 is the closest downstream metric.',
    xpReward: 10, difficulty: 2, metricSlugs: ['ftue', 'r1'], function: 'product'
  },

  // ============================================================
  // UA 101 — Unit 1: The UA equation
  // ============================================================
  {
    id: 'ua101-u1-l1-c1',
    type: 'formula_completion',
    prompt: 'Complete the UA equation that governs profitability per cohort.',
    formulaTemplate: 'Profit = Installs × (UV − ___)',
    answer: 'eCPI',
    acceptedAlternatives: ['ecpi', 'effective CPI'],
    explanation: 'Profit = Installs × (UV − eCPI). UV is what a user is worth; eCPI is what they cost (blended paid + organic). This is the single most important UA formula.',
    xpReward: 15, difficulty: 2, metricSlugs: ['ecpi', 'uv'], function: 'ua'
  },
  {
    id: 'ua101-u1-l1-c2',
    type: 'multiple_choice',
    prompt: 'If UV7 stays flat but eCPI drops 10%, what happens to Profit?',
    choices: ['It drops', 'It rises', 'It stays the same', 'You need ROAS to know'],
    answerIndex: 1,
    explanation: 'Profit = Installs × (UV − eCPI). Holding UV flat while lowering eCPI widens the margin, so Profit rises.',
    xpReward: 10, difficulty: 2, metricSlugs: ['ecpi', 'uv7'], function: 'ua'
  },

  // UA 101 — Unit 2: CPI vs eCPI
  {
    id: 'ua101-u2-l1-c1',
    type: 'multiple_choice',
    prompt: 'CPI vs eCPI — which is always ≤ which?',
    choices: ['CPI ≤ eCPI', 'eCPI ≤ CPI', 'They are always equal', 'It depends on K-factor sign'],
    answerIndex: 1,
    explanation: 'eCPI divides cost across paid + organic uplift installs. Organic uplift adds to the denominator, so eCPI ≤ CPI whenever K-factor > 0.',
    xpReward: 15, difficulty: 3, metricSlugs: ['cpi', 'ecpi', 'k-factor'], function: 'ua'
  },
  {
    id: 'ua101-u2-l1-c2',
    type: 'free_input_numeric',
    prompt: 'If UA Cost = $10,000, paid installs = 80,000, organic uplift = 20,000. What is eCPI (in $, 2 decimals)?',
    answer: 0.10,
    unit: '$',
    tolerance: 0.05,
    explanation: 'eCPI = 10,000 / (80,000 + 20,000) = $0.10. CPI in the same scenario would be 10,000 / 80,000 = $0.125.',
    xpReward: 20, difficulty: 3, metricSlugs: ['ecpi'], function: 'ua'
  },

  // UA 101 — Unit 3: ROAS — Paid vs eROAS (the most-confused pair)
  {
    id: 'ua101-u3-l1-c1',
    type: 'multiple_choice',
    prompt: 'eROAS D7 differs from Paid ROAS D7 because:',
    choices: [
      'eROAS uses estimated revenue; Paid uses actual',
      'eROAS includes organic uplift in the numerator; Paid does not',
      'eROAS is measured weekly, Paid is daily',
      'They are synonyms'
    ],
    answerIndex: 1,
    explanation: 'eROAS D7 = (Revenue D7 from paid + organic-uplift users) / Cost. Paid ROAS D7 excludes organic uplift revenue. Same denominator; different numerator.',
    xpReward: 15, difficulty: 4, metricSlugs: ['eroas-d7', 'paid-roas-d7'], function: 'ua'
  },
  {
    id: 'ua101-u3-l1-c2',
    type: 'scenario_judgment',
    prompt: 'A ROAS spike — which view?',
    scenario: 'On BHi, eROAS D7 jumps +12% week-over-week but Paid ROAS D7 is flat. Which is the most likely root cause?',
    choices: [
      'A creative is converting better — paid quality is up.',
      'A bug is inflating revenue.',
      'Organic uplift ratio shifted — more organic installs are crediting against paid spend.',
      'D7 retention dropped.'
    ],
    answerIndex: 2,
    explanation: 'Paid ROAS flat → paid revenue per dollar is unchanged. eROAS up → the organic share is up. This is a K-factor / network-mix story, not a paid-quality story.',
    xpReward: 25, difficulty: 5, metricSlugs: ['eroas-d7', 'paid-roas-d7', 'k-factor'], function: 'ua'
  },
  {
    id: 'ua101-u3-l1-c3',
    type: 'free_input_numeric',
    prompt: 'If CPI = $0.20 and UV7 = $0.16, what is paid ROAS D7? (as %, no decimals)',
    answer: 80,
    unit: '%',
    tolerance: 0.05,
    explanation: 'Paid ROAS D7 = UV7 / CPI = 0.16 / 0.20 = 0.80 = 80%.',
    xpReward: 15, difficulty: 3, metricSlugs: ['paid-roas-d7'], function: 'ua'
  },

  // UA 101 — Unit 4: Networks
  {
    id: 'ua101-u4-l1-c1',
    type: 'matching_pairs',
    prompt: 'Sort each network into SRN or SDK Network.',
    pairs: [
      { left: 'Google', right: 'SRN' },
      { left: 'TikTok', right: 'SRN' },
      { left: 'IronSource', right: 'SDK Network' },
      { left: 'Mintegral', right: 'SDK Network' }
    ],
    explanation: 'SRN = Self-Reporting Network (Google, Meta, TikTok). SDK Networks (IronSource, Mintegral, AppLovin, Unity) report through MMP.',
    xpReward: 15, difficulty: 2, metricSlugs: [], function: 'ua'
  },

  // UA 101 — Unit 5: Creative
  {
    id: 'ua101-u5-l1-c1',
    type: 'multiple_choice',
    prompt: 'IPM means:',
    choices: [
      'Installs Per Minute',
      'Installs Per Mille (per 1,000 ad impressions)',
      'Impressions Per Mille',
      'Installs Per Marketing dollar'
    ],
    answerIndex: 1,
    explanation: 'IPM = Installs Per Mille = installs per 1,000 ad impressions. Creative-side analog of CPI.',
    xpReward: 10, difficulty: 2, metricSlugs: ['ipm'], function: 'creative'
  },
  {
    id: 'ua101-u5-l1-c2',
    type: 'multiple_choice',
    prompt: 'A "Winning Creative" at Amanotes is defined as:',
    choices: [
      'Top 1 by IPM for any 1 day',
      'Top 1 by spend or installs for ≥2 consecutive weeks',
      'Approved by Creative DRI',
      'Any creative with CTR > 5%'
    ],
    answerIndex: 1,
    explanation: 'The canonical definition is top 1 by spend or installs for ≥2 consecutive weeks. Stability across 2 weeks is the bar.',
    xpReward: 10, difficulty: 2, metricSlugs: [], function: 'creative'
  },

  // ============================================================
  // CROSS-FUNCTIONAL — Unit 1: The Business Goal equation
  // ============================================================
  {
    id: 'cf-u1-l1-c1',
    type: 'formula_completion',
    prompt: 'Complete the cohort-view business goal formula.',
    formulaTemplate: 'Profit = Installs × (___ − eCPI)',
    answer: 'LTV',
    acceptedAlternatives: ['UV', 'UV∞'],
    explanation: 'Long-horizon: Profit = Installs × (LTV − eCPI). UV at a finite horizon (UV7, UV30) is the proxy for LTV used in shorter feedback loops.',
    xpReward: 15, difficulty: 3, metricSlugs: ['ltv', 'ecpi'], function: 'business'
  },
  {
    id: 'cf-u1-l1-c2',
    type: 'multiple_choice',
    prompt: 'Two views, one tree. Which pair of metrics describes the same business reality but from different views?',
    choices: [
      'ARPDAU × DAU and Installs × LTV',
      'CPI and IPM',
      'sumR7 and R7',
      'eROAS and Paid ROAS'
    ],
    answerIndex: 0,
    explanation: 'ARPDAU × DAU (act-date) and Installs × LTV (cohort) approximate total revenue from different angles. Mixing them is the most common analysis error.',
    xpReward: 20, difficulty: 4, metricSlugs: ['arpdau', 'dau', 'ltv'], function: 'business'
  },

  // CROSS-FUNCTIONAL — Unit 2: UA ↔ Product
  {
    id: 'cf-u2-l1-c1',
    type: 'scenario_judgment',
    prompt: 'CPI win, retention loss',
    scenario: 'A UA Specialist cuts CPI by 15% by reallocating spend to a low-quality SDK network. Two weeks later, what most likely happened?',
    choices: [
      'UV7 unchanged, ROAS up — pure win.',
      'R1 + R7 dropped on the new traffic; UV7 also dropped; ROAS may be flat or worse.',
      'DAU went up; UV7 went up; no downside.',
      'Only ARPDAU changed.'
    ],
    answerIndex: 1,
    explanation: 'Cheaper installs from lower-quality traffic tend to retain worse. R1/R7 fall, UV7 falls, and ROAS can hold or drop. The CPI win is misleading without the cohort follow-through.',
    xpReward: 25, difficulty: 5, metricSlugs: ['cpi', 'r1', 'uv7', 'roas'], function: 'business'
  },

  // CROSS-FUNCTIONAL — Unit 3: Product ↔ Mon
  {
    id: 'cf-u3-l1-c1',
    type: 'scenario_judgment',
    prompt: 'Ad-density change side effect',
    scenario: 'A Mon Operator increases interstitial frequency on PI. ARPDAU lifts +5% next day. What second-order signal would you watch over the next 7 days?',
    choices: [
      'CPI on new campaigns',
      'R1 / R7 dip — the retention hit shows up later in cohort metrics, then in UV7',
      'IPM on creatives',
      'eCPM only'
    ],
    answerIndex: 1,
    explanation: 'Ad-density bumps almost always lift ARPDAU first and dip retention later. The right escalation: pre-flag UA + Product, watch R1/R7 on new cohorts, then UV7.',
    xpReward: 25, difficulty: 5, metricSlugs: ['arpdau', 'r1', 'uv7'], function: 'business'
  },

  // CROSS-FUNCTIONAL — Unit 4: Mon ↔ UA
  {
    id: 'cf-u4-l1-c1',
    type: 'multiple_choice',
    prompt: 'A sudden UV7 lift on a fresh cohort directly improves which UA metric?',
    choices: ['CPI', 'IPM', 'Paid ROAS D7', 'CTR'],
    answerIndex: 2,
    explanation: 'Paid ROAS D7 = UV7 / CPI (paid-only). A UV7 lift, holding CPI constant, raises Paid ROAS D7 1:1.',
    xpReward: 20, difficulty: 4, metricSlugs: ['uv7', 'paid-roas-d7'], function: 'business'
  },

  // CROSS-FUNCTIONAL — Unit 5: The full loop (canonical hypothesis format)
  {
    id: 'cf-u5-l1-c1',
    type: 'multiple_choice',
    prompt: 'Which sentence uses the canonical Amanotes hypothesis format?',
    choices: [
      'I think the new tutorial will help retention.',
      'If we shorten the tutorial → then R1 will rise → for new PIi installs → by +2 pp in 4 weeks.',
      'The tutorial is too long; users churn.',
      'New tutorial: R1 up.'
    ],
    answerIndex: 1,
    explanation: 'Canonical format: "If [change] → then [impact] → for [audience] → by [amount]". Specific change, specific metric, specific cohort, specific magnitude.',
    xpReward: 20, difficulty: 3, metricSlugs: [], function: 'business'
  },
  {
    id: 'cf-u5-l1-c2',
    type: 'scenario_judgment',
    prompt: 'Read the loop end-to-end',
    scenario: 'A new creative drops CPI 20% on GDUCa. Install volume doubles. Two weeks later: R1 down 4 pp, R7 down 2 pp, UV7 flat, eROAS D7 holds because organic uplift rose. Which read is correct?',
    choices: [
      'A clear win — eROAS held.',
      'A clear loss — R1 dropped.',
      'Mixed: the creative scaled volume but diluted quality. eROAS held only because organic uplift compensated. Watch UV30 and Paid ROAS before doubling down.',
      'Cannot tell without ARPDAU.'
    ],
    answerIndex: 2,
    explanation: 'Volume-driven CPI wins often dilute cohort quality. eROAS hiding the dip via organic uplift is the classic trap. The honest read is mixed, with a wait-and-see on longer-horizon UV.',
    xpReward: 30, difficulty: 5, metricSlugs: ['cpi', 'r1', 'r7', 'uv7', 'eroas-d7'], function: 'business'
  }
]

export const CARDS_BY_ID: Record<string, Card> = Object.fromEntries(CARDS.map((c) => [c.id, c]))
