import { Path } from '../types'

export const PATHS: Path[] = [
  // ════════════════════════════════════════════════════════════════
  // PATH 1: METRIC DEFINITIONS
  // ════════════════════════════════════════════════════════════════
  {
    id: 'metric-definitions',
    slug: 'metric-definitions',
    name: 'Metric Definitions',
    description: 'Learn the definition, formula, and view of every key metric at Amanotes.',
    function: 'business',
    units: [
      {
        id: 'def-u1', name: 'Basic User Metrics',
        goal: 'DAU, MAU, New Users, Returned Users, Act-date vs Cohort view.',
        lessons: [
          { id: 'def-u1-l1', name: 'DAU & MAU', cardIds: ['def-u1-l1-c1', 'def-u1-l1-c2', 'def-u1-l1-c3', 'def-u1-l1-c4', 'def-u1-l1-c5', 'def-u1-l1-c6'] },
          { id: 'def-u1-l2', name: 'New & Returned Users', cardIds: ['def-u1-l2-c1', 'def-u1-l2-c2', 'def-u1-l2-c3', 'def-u1-l2-c4', 'def-u1-l2-c5'] },
          { id: 'def-u1-l3', name: 'Act-date vs Cohort', cardIds: ['def-u1-l3-c1', 'def-u1-l3-c2', 'def-u1-l3-c3', 'def-u1-l3-c4', 'def-u1-l3-c5'] }
        ]
      },
      {
        id: 'def-u2', name: 'Retention Metrics',
        goal: 'R1/R7/R14/R30, sumR family, and benchmarks.',
        lessons: [
          { id: 'def-u2-l1', name: 'R1, R7, R14, R30', cardIds: ['def-u2-l1-c1', 'def-u2-l1-c2', 'def-u2-l1-c3', 'def-u2-l1-c4', 'def-u2-l1-c5', 'def-u2-l1-c6'] },
          { id: 'def-u2-l2', name: 'sumR family', cardIds: ['def-u2-l2-c1', 'def-u2-l2-c2', 'def-u2-l2-c3', 'def-u2-l2-c4', 'def-u2-l2-c5'] },
          { id: 'def-u2-l3', name: 'Retention benchmarks', cardIds: ['def-u2-l3-c1', 'def-u2-l3-c2', 'def-u2-l3-c3', 'def-u2-l3-c4'] }
        ]
      },
      {
        id: 'def-u3', name: 'Engagement Metrics',
        goal: 'me_start, song_start, song_end, sumME. Activation milestones.',
        lessons: [
          { id: 'def-u3-l1', name: 'Core events', cardIds: ['def-u3-l1-c1', 'def-u3-l1-c2', 'def-u3-l1-c3', 'def-u3-l1-c4', 'def-u3-l1-c5', 'def-u3-l1-c6'] },
          { id: 'def-u3-l2', name: 'Activation milestones', cardIds: ['def-u3-l2-c1', 'def-u3-l2-c2', 'def-u3-l2-c3', 'def-u3-l2-c4', 'def-u3-l2-c5'] }
        ]
      },
      {
        id: 'def-u4', name: 'Revenue Metrics',
        goal: 'Revenue, ARPDAU, UV, LTV and their formulas.',
        lessons: [
          { id: 'def-u4-l1', name: 'Revenue & ARPDAU', cardIds: ['def-u4-l1-c1', 'def-u4-l1-c2', 'def-u4-l1-c3', 'def-u4-l1-c4', 'def-u4-l1-c5'] },
          { id: 'def-u4-l2', name: 'UV (User Value)', cardIds: ['def-u4-l2-c1', 'def-u4-l2-c2', 'def-u4-l2-c3', 'def-u4-l2-c4', 'def-u4-l2-c5'] },
          { id: 'def-u4-l3', name: 'LTV & Benchmarks', cardIds: ['def-u4-l3-c1', 'def-u4-l3-c2', 'def-u4-l3-c3', 'def-u4-l3-c4', 'def-u4-l3-c5'] }
        ]
      },
      {
        id: 'def-u5', name: 'Ad Metrics',
        goal: 'eCPM, imp/DAU, Fill Rate, ad formats (RW, FS, BN, AOA).',
        lessons: [
          { id: 'def-u5-l1', name: 'eCPM & imp/DAU', cardIds: ['def-u5-l1-c1', 'def-u5-l1-c2', 'def-u5-l1-c3', 'def-u5-l1-c4', 'def-u5-l1-c5'] },
          { id: 'def-u5-l2', name: 'Ad formats', cardIds: ['def-u5-l2-c1', 'def-u5-l2-c2', 'def-u5-l2-c3', 'def-u5-l2-c4'] }
        ]
      },
      {
        id: 'def-u6', name: 'Cost Metrics',
        goal: 'CPI, eCPI, CPM, K-factor.',
        lessons: [
          { id: 'def-u6-l1', name: 'CPI & eCPI', cardIds: ['def-u6-l1-c1', 'def-u6-l1-c2', 'def-u6-l1-c3', 'def-u6-l1-c4', 'def-u6-l1-c5'] },
          { id: 'def-u6-l2', name: 'CPM & K-factor', cardIds: ['def-u6-l2-c1', 'def-u6-l2-c2', 'def-u6-l2-c3', 'def-u6-l2-c4', 'def-u6-l2-c5'] }
        ]
      },
      {
        id: 'def-u7', name: 'Return Metrics',
        goal: 'ROAS, eROAS, Paid ROAS, pROAS.',
        lessons: [
          { id: 'def-u7-l1', name: 'ROAS basics', cardIds: ['def-u7-l1-c1', 'def-u7-l1-c2', 'def-u7-l1-c3', 'def-u7-l1-c4', 'def-u7-l1-c5', 'def-u7-l1-c6'] },
          { id: 'def-u7-l2', name: 'eROAS vs Paid ROAS', cardIds: ['def-u7-l2-c1', 'def-u7-l2-c2', 'def-u7-l2-c3', 'def-u7-l2-c4', 'def-u7-l2-c5'] }
        ]
      },
      {
        id: 'def-u8', name: 'Advanced Calculations',
        goal: 'Cross-metric calculations and full profit chain.',
        lessons: [
          { id: 'def-u8-l1', name: 'Cross-metric Calculations', cardIds: ['def-u8-l1-c1', 'def-u8-l1-c2', 'def-u8-l1-c3', 'def-u8-l1-c4'] },
          { id: 'def-u8-l2', name: 'Full Profit Chain', cardIds: ['def-u8-l2-c1', 'def-u8-l2-c2', 'def-u8-l2-c3', 'def-u8-l2-c4'] }
        ]
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════
  // PATH 2: PRODUCT 101
  // ════════════════════════════════════════════════════════════════
  {
    id: 'product-101',
    slug: 'product-101',
    name: 'Product 101',
    description: 'The user, the funnel, engagement, retention. Read a Product dashboard correctly.',
    function: 'product',
    units: [
      {
        id: 'p101-u1', name: 'Active users & views',
        goal: 'DAU, MAU, Returned Users D30+. Introduces the act-date view.',
        lessons: [
          { id: 'p101-u1-l1', name: 'DAU basics', cardIds: ['p101-u1-l1-c1', 'p101-u1-l1-c2', 'p101-u1-l1-c3', 'p101-u1-l1-c4', 'p101-u1-l1-c5'] },
          { id: 'p101-u1-l2', name: 'Reading a dashboard', cardIds: ['p101-u1-l2-c1', 'p101-u1-l2-c2', 'p101-u1-l2-c3', 'p101-u1-l2-c4'] }
        ]
      },
      {
        id: 'p101-u2', name: 'The Cohort view',
        goal: 'Install date as the anchor. UV vs ARPDAU.',
        lessons: [
          { id: 'p101-u2-l1', name: 'Cohort vs Act-date', cardIds: ['p101-u2-l1-c1', 'p101-u2-l1-c2', 'p101-u2-l1-c3', 'p101-u2-l1-c4'] }
        ]
      },
      {
        id: 'p101-u3', name: 'Retention',
        goal: 'R1/R7/R14/R30 and the sumR family. FTUE.',
        lessons: [
          { id: 'p101-u3-l1', name: 'Retention & FTUE', cardIds: ['p101-u3-l1-c1', 'p101-u3-l1-c2', 'p101-u3-l1-c3', 'p101-u3-l1-c4', 'p101-u3-l1-c5'] }
        ]
      },
      {
        id: 'p101-u4', name: 'Engagement depth',
        goal: 'sumME, song_* and me_* events. Engagement vs retention.',
        lessons: [
          { id: 'p101-u4-l1', name: 'Music Engagement events', cardIds: ['p101-u4-l1-c1', 'p101-u4-l1-c2', 'p101-u4-l1-c3', 'p101-u4-l1-c4'] }
        ]
      },
      {
        id: 'p101-u5', name: 'FTUE & activation',
        goal: 'Tutorial → first song → activation milestones.',
        lessons: [
          { id: 'p101-u5-l1', name: 'FTUE & milestones', cardIds: ['p101-u5-l1-c1', 'p101-u5-l1-c2', 'p101-u5-l1-c3', 'p101-u5-l1-c4'] }
        ]
      },
      {
        id: 'p101-u6', name: 'User segmentation',
        goal: 'Segments, Balancy, core loop, meta layer.',
        lessons: [
          { id: 'p101-u6-l1', name: 'Segments & game loops', cardIds: ['p101-u6-l1-c1', 'p101-u6-l1-c2', 'p101-u6-l1-c3', 'p101-u6-l1-c4'] }
        ]
      },
      {
        id: 'p101-u7', name: 'Product experiments',
        goal: 'Hypothesis format, game stages, A/B testing.',
        lessons: [
          { id: 'p101-u7-l1', name: 'Hypotheses & stages', cardIds: ['p101-u7-l1-c1', 'p101-u7-l1-c2', 'p101-u7-l1-c3'] }
        ]
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════
  // PATH 3: UA 101
  // ════════════════════════════════════════════════════════════════
  {
    id: 'ua-101',
    slug: 'ua-101',
    name: 'UA 101',
    description: 'User Acquisition metrics. Read a Performance Marketing dashboard correctly.',
    function: 'ua',
    units: [
      {
        id: 'ua101-u1', name: 'The UA equation',
        goal: 'Profit = Installs × (UV − eCPI). The formula that governs everything.',
        lessons: [
          { id: 'ua101-u1-l1', name: 'The UA equation', cardIds: ['ua101-u1-l1-c1', 'ua101-u1-l1-c2', 'ua101-u1-l1-c3', 'ua101-u1-l1-c4', 'ua101-u1-l1-c5'] }
        ]
      },
      {
        id: 'ua101-u2', name: 'CPI vs eCPI',
        goal: 'Cost per install vs effective CPI; organic uplift; K-factor.',
        lessons: [
          { id: 'ua101-u2-l1', name: 'CPI ≥ eCPI when K > 0', cardIds: ['ua101-u2-l1-c1', 'ua101-u2-l1-c2', 'ua101-u2-l1-c3', 'ua101-u2-l1-c4'] }
        ]
      },
      {
        id: 'ua101-u3', name: 'ROAS family',
        goal: 'The single most-confused pair at Amanotes.',
        lessons: [
          { id: 'ua101-u3-l1', name: 'Paid ROAS vs eROAS', cardIds: ['ua101-u3-l1-c1', 'ua101-u3-l1-c2', 'ua101-u3-l1-c3', 'ua101-u3-l1-c4', 'ua101-u3-l1-c5'] }
        ]
      },
      {
        id: 'ua101-u4', name: 'Networks & attribution',
        goal: 'SRN vs SDK Networks. Attribution tools.',
        lessons: [
          { id: 'ua101-u4-l1', name: 'SRN vs SDK', cardIds: ['ua101-u4-l1-c1', 'ua101-u4-l1-c2', 'ua101-u4-l1-c3', 'ua101-u4-l1-c4'] }
        ]
      },
      {
        id: 'ua101-u5', name: 'Creative metrics',
        goal: 'IPM, CTR, CVR, Thumb-stop. Winning Creative.',
        lessons: [
          { id: 'ua101-u5-l1', name: 'IPM & winning creatives', cardIds: ['ua101-u5-l1-c1', 'ua101-u5-l1-c2', 'ua101-u5-l1-c3', 'ua101-u5-l1-c4', 'ua101-u5-l1-c5'] }
        ]
      },
      {
        id: 'ua101-u6', name: 'Organic uplift & K-factor',
        goal: 'How paid installs generate organic users.',
        lessons: [
          { id: 'ua101-u6-l1', name: 'K-factor deep dive', cardIds: ['ua101-u6-l1-c1', 'ua101-u6-l1-c2', 'ua101-u6-l1-c3', 'ua101-u6-l1-c4'] }
        ]
      },
      {
        id: 'ua101-u7', name: 'Scale & diminishing returns',
        goal: 'What happens when you scale spend.',
        lessons: [
          { id: 'ua101-u7-l1', name: 'Diminishing returns', cardIds: ['ua101-u7-l1-c1', 'ua101-u7-l1-c2', 'ua101-u7-l1-c3'] }
        ]
      },
      {
        id: 'ua101-u8', name: 'iOS vs Android',
        goal: 'Platform differences in CPI, attribution, and ROAS.',
        lessons: [
          { id: 'ua101-u8-l1', name: 'Platform differences', cardIds: ['ua101-u8-l1-c1', 'ua101-u8-l1-c2', 'ua101-u8-l1-c3'] }
        ]
      },
      {
        id: 'ua101-u9', name: 'Campaign optimization',
        goal: 'Creative benchmarks, funnel metrics.',
        lessons: [
          { id: 'ua101-u9-l1', name: 'Benchmarks & funnels', cardIds: ['ua101-u9-l1-c1', 'ua101-u9-l1-c2', 'ua101-u9-l1-c3'] }
        ]
      },
      {
        id: 'ua101-u10', name: 'UA decision-making',
        goal: 'End-to-end scenarios and trade-offs.',
        lessons: [
          { id: 'ua101-u10-l1', name: 'Trade-off scenarios', cardIds: ['ua101-u10-l1-c1', 'ua101-u10-l1-c2', 'ua101-u10-l1-c3'] }
        ]
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════
  // PATH 4: CROSS-FUNCTIONAL CONNECTIONS
  // ════════════════════════════════════════════════════════════════
  {
    id: 'cross-functional',
    slug: 'cross-functional',
    name: 'Cross-Functional Connections',
    description: 'The linkages between Product, UA, and Mon metrics. The headline path.',
    function: 'business',
    units: [
      {
        id: 'cf-u1', name: 'The Business Goal equation',
        goal: 'Two views, one tree.',
        lessons: [
          { id: 'cf-u1-l1', name: 'Cohort vs act-date framing', cardIds: ['cf-u1-l1-c1', 'cf-u1-l1-c2', 'cf-u1-l1-c3', 'cf-u1-l1-c4'] }
        ]
      },
      {
        id: 'cf-u2', name: 'UA ↔ Product',
        goal: 'How Installs and Retention multiply.',
        lessons: [
          { id: 'cf-u2-l1', name: 'CPI win, retention loss', cardIds: ['cf-u2-l1-c1', 'cf-u2-l1-c2', 'cf-u2-l1-c3'] }
        ]
      },
      {
        id: 'cf-u3', name: 'Product ↔ Mon',
        goal: 'How retention hits ARPDAU via DAU and UV via cohort.',
        lessons: [
          { id: 'cf-u3-l1', name: 'Ad density side effects', cardIds: ['cf-u3-l1-c1', 'cf-u3-l1-c2', 'cf-u3-l1-c3'] }
        ]
      },
      {
        id: 'cf-u4', name: 'Mon ↔ UA',
        goal: 'How UV feeds ROAS.',
        lessons: [
          { id: 'cf-u4-l1', name: 'UV → ROAS', cardIds: ['cf-u4-l1-c1', 'cf-u4-l1-c2', 'cf-u4-l1-c3'] }
        ]
      },
      {
        id: 'cf-u5', name: 'The full loop',
        goal: 'Walk an end-to-end scenario using the canonical hypothesis format.',
        lessons: [
          { id: 'cf-u5-l1', name: 'End-to-end loop', cardIds: ['cf-u5-l1-c1', 'cf-u5-l1-c2'] }
        ]
      },
      {
        id: 'cf-u6', name: 'Scenario analysis',
        goal: 'Diagnose metric movements across functions.',
        lessons: [
          { id: 'cf-u6-l1', name: 'Cross-metric diagnosis', cardIds: ['cf-u6-l1-c1', 'cf-u6-l1-c2', 'cf-u6-l1-c3'] }
        ]
      },
      {
        id: 'cf-u7', name: 'Benchmarks & thresholds',
        goal: 'Key benchmarks for decision-making.',
        lessons: [
          { id: 'cf-u7-l1', name: 'Benchmark evaluation', cardIds: ['cf-u7-l1-c1', 'cf-u7-l1-c2', 'cf-u7-l1-c3', 'cf-u7-l1-c4'] }
        ]
      },
      {
        id: 'cf-u8', name: 'Decision frameworks',
        goal: 'Advanced cross-functional decision-making.',
        lessons: [
          { id: 'cf-u8-l1', name: 'Full-loop decisions', cardIds: ['cf-u8-l1-c1', 'cf-u8-l1-c2', 'cf-u8-l1-c3', 'cf-u8-l1-c4', 'cf-u8-l1-c5'] }
        ]
      }
    ]
  }
]

export const PATHS_BY_SLUG: Record<string, Path> = Object.fromEntries(PATHS.map((p) => [p.slug, p]))

export const PLACEMENT_DECK: { cardId: string; pathSlug: string }[] = [
  { cardId: 'def-u1-l1-c1', pathSlug: 'metric-definitions' },
  { cardId: 'def-u2-l1-c2', pathSlug: 'metric-definitions' },
  { cardId: 'p101-u1-l1-c1', pathSlug: 'product-101' },
  { cardId: 'p101-u3-l1-c2', pathSlug: 'product-101' },
  { cardId: 'ua101-u1-l1-c1', pathSlug: 'ua-101' },
  { cardId: 'ua101-u3-l1-c1', pathSlug: 'ua-101' },
  { cardId: 'cf-u1-l1-c2', pathSlug: 'cross-functional' },
  { cardId: 'cf-u5-l1-c2', pathSlug: 'cross-functional' }
]
