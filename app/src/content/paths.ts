import { Path } from '../types'

// Paths structured as in the PRD. Mon 101 (F052) intentionally omitted per scope.
export const PATHS: Path[] = [
  {
    id: 'product-101',
    slug: 'product-101',
    name: 'Product 101',
    description: 'The user, the funnel, engagement, retention. Read a Product dashboard correctly.',
    function: 'product',
    units: [
      {
        id: 'p101-u1',
        name: 'Active users & views',
        goal: 'DAU, MAU, Returned Users D30+. Introduces the act-date view.',
        lessons: [
          { id: 'p101-u1-l1', name: 'Act-date basics', cardIds: ['p101-u1-l1-c1', 'p101-u1-l1-c2', 'p101-u1-l1-c3'] }
        ]
      },
      {
        id: 'p101-u2',
        name: 'The Cohort view',
        goal: 'Install date as the anchor. UV vs ARPDAU. The single most important distinction.',
        lessons: [
          { id: 'p101-u2-l1', name: 'Cohort vs Act-date', cardIds: ['p101-u2-l1-c1', 'p101-u2-l1-c2'] }
        ]
      },
      {
        id: 'p101-u3',
        name: 'Retention',
        goal: 'R1 / R7 / R14 / R30 and the sumR family.',
        lessons: [
          { id: 'p101-u3-l1', name: 'Retention checkpoints', cardIds: ['p101-u3-l1-c1', 'p101-u3-l1-c2'] }
        ]
      },
      {
        id: 'p101-u4',
        name: 'Engagement depth',
        goal: 'sumME, song_* and me_* events. Engagement vs retention.',
        lessons: [
          { id: 'p101-u4-l1', name: 'Music Engagement events', cardIds: ['p101-u4-l1-c1'] }
        ]
      },
      {
        id: 'p101-u5',
        name: 'FTUE & early funnel',
        goal: 'Tutorial → first song → first ad. What moves R1.',
        lessons: [
          { id: 'p101-u5-l1', name: 'FTUE → R1', cardIds: ['p101-u5-l1-c1'] }
        ]
      }
    ]
  },
  {
    id: 'ua-101',
    slug: 'ua-101',
    name: 'UA 101',
    description: 'User Acquisition metrics. Read a Performance Marketing dashboard correctly.',
    function: 'ua',
    units: [
      {
        id: 'ua101-u1',
        name: 'The UA equation',
        goal: 'Profit = Installs × (UV − eCPI). The formula that governs everything.',
        lessons: [
          { id: 'ua101-u1-l1', name: 'The UA equation', cardIds: ['ua101-u1-l1-c1', 'ua101-u1-l1-c2'] }
        ]
      },
      {
        id: 'ua101-u2',
        name: 'CPI vs eCPI',
        goal: 'Cost per install vs effective CPI; organic uplift; K-factor.',
        lessons: [
          { id: 'ua101-u2-l1', name: 'CPI ≥ eCPI when K > 0', cardIds: ['ua101-u2-l1-c1', 'ua101-u2-l1-c2'] }
        ]
      },
      {
        id: 'ua101-u3',
        name: 'ROAS — Paid vs eROAS',
        goal: 'The single most-confused pair at Amanotes.',
        lessons: [
          { id: 'ua101-u3-l1', name: 'Paid ROAS vs eROAS', cardIds: ['ua101-u3-l1-c1', 'ua101-u3-l1-c2', 'ua101-u3-l1-c3'] }
        ]
      },
      {
        id: 'ua101-u4',
        name: 'Networks',
        goal: 'SRN vs SDK Networks. Mix effects.',
        lessons: [
          { id: 'ua101-u4-l1', name: 'SRN vs SDK', cardIds: ['ua101-u4-l1-c1'] }
        ]
      },
      {
        id: 'ua101-u5',
        name: 'Creative metrics',
        goal: 'IPM, CTR, CVR, Thumb-stop. Winning Creative.',
        lessons: [
          { id: 'ua101-u5-l1', name: 'IPM & winning creatives', cardIds: ['ua101-u5-l1-c1', 'ua101-u5-l1-c2'] }
        ]
      }
    ]
  },
  {
    id: 'cross-functional',
    slug: 'cross-functional',
    name: 'Cross-Functional Connections',
    description: 'The linkages between Product, UA, and Mon metrics. The headline path.',
    function: 'business',
    units: [
      {
        id: 'cf-u1',
        name: 'The Business Goal equation',
        goal: 'Two views, one tree.',
        lessons: [
          { id: 'cf-u1-l1', name: 'Cohort vs act-date framing', cardIds: ['cf-u1-l1-c1', 'cf-u1-l1-c2'] }
        ]
      },
      {
        id: 'cf-u2',
        name: 'UA ↔ Product',
        goal: 'How Installs and Retention multiply. Why a CPI win can be a retention loss.',
        lessons: [
          { id: 'cf-u2-l1', name: 'CPI win, retention loss', cardIds: ['cf-u2-l1-c1'] }
        ]
      },
      {
        id: 'cf-u3',
        name: 'Product ↔ Mon',
        goal: 'How a retention loss hits ARPDAU via DAU and UV via cohort dilution.',
        lessons: [
          { id: 'cf-u3-l1', name: 'Ad density side effects', cardIds: ['cf-u3-l1-c1'] }
        ]
      },
      {
        id: 'cf-u4',
        name: 'Mon ↔ UA',
        goal: 'How UV feeds ROAS.',
        lessons: [
          { id: 'cf-u4-l1', name: 'UV → ROAS', cardIds: ['cf-u4-l1-c1'] }
        ]
      },
      {
        id: 'cf-u5',
        name: 'The full loop',
        goal: 'Walk an end-to-end scenario using the canonical hypothesis format.',
        lessons: [
          { id: 'cf-u5-l1', name: 'End-to-end loop', cardIds: ['cf-u5-l1-c1', 'cf-u5-l1-c2'] }
        ]
      }
    ]
  }
]

export const PATHS_BY_SLUG: Record<string, Path> = Object.fromEntries(PATHS.map((p) => [p.slug, p]))

// Placement quiz: a fixed 8-card adaptive-ish deck covering 3 paths.
// Each card maps to a path slug — scoring tells us where to start the user.
export const PLACEMENT_DECK: { cardId: string; pathSlug: string }[] = [
  { cardId: 'p101-u1-l1-c1', pathSlug: 'product-101' },
  { cardId: 'p101-u2-l1-c1', pathSlug: 'product-101' },
  { cardId: 'p101-u3-l1-c2', pathSlug: 'product-101' },
  { cardId: 'ua101-u1-l1-c1', pathSlug: 'ua-101' },
  { cardId: 'ua101-u2-l1-c1', pathSlug: 'ua-101' },
  { cardId: 'ua101-u3-l1-c1', pathSlug: 'ua-101' },
  { cardId: 'cf-u1-l1-c2', pathSlug: 'cross-functional' },
  { cardId: 'cf-u2-l1-c1', pathSlug: 'cross-functional' }
]
