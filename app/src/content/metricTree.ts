import { MetricNode } from '../types'

// Canonical metric definitions sourced from PRD glossary.md (which mirrors DataHub).
export const METRIC_TREE: MetricNode[] = [
  // Business / root
  { slug: 'revenue', name: 'Revenue', definition: 'Total income = IAA + IAP + Sub.', view: 'both', function: 'business' },
  { slug: 'profit-after-ua', name: 'Profit after UA', definition: 'Revenue minus UA costs.', formula: 'Profit = Installs × (UV − eCPI)', view: 'cohort', function: 'business', parentSlug: 'revenue' },
  { slug: 'pm', name: 'PM (Profit Margin)', definition: 'Profit margin after UA cost. PM > EBIT.', view: 'both', function: 'business', parentSlug: 'profit-after-ua' },
  { slug: 'mer', name: 'MER', definition: 'Media Efficiency Ratio = Revenue / UA Spend.', formula: 'MER = Revenue / UA Spend', view: 'act_date', function: 'business', parentSlug: 'revenue' },

  // Product
  { slug: 'dau', name: 'DAU', definition: 'Daily Active Users — act-date view.', view: 'act_date', function: 'product', parentSlug: 'revenue' },
  { slug: 'mau', name: 'MAU', definition: 'Monthly Active Users.', view: 'act_date', function: 'product', parentSlug: 'dau' },
  { slug: 'returned-users-d30', name: 'Returned Users D30+', definition: 'Users active ≥30 days post-install. Company-level KPI.', view: 'cohort', function: 'product', parentSlug: 'dau' },
  { slug: 'r1', name: 'R1', definition: 'Retention Day 1 — % of users returning 1 day after install (cohort view).', view: 'cohort', function: 'product', parentSlug: 'dau' },
  { slug: 'r7', name: 'R7', definition: 'Retention Day 7 — % returning 7 days after install (cohort view).', view: 'cohort', function: 'product', parentSlug: 'r1' },
  { slug: 'r30', name: 'R30', definition: 'Retention Day 30 — % returning 30 days after install (cohort view).', view: 'cohort', function: 'product', parentSlug: 'r7' },
  { slug: 'sumr7', name: 'sumR7', definition: 'Sum of retention from install to D7 — cumulative engagement depth.', view: 'cohort', function: 'product', parentSlug: 'r7' },
  { slug: 'sumr30', name: 'sumR30', definition: 'Sum of retention from install to D30.', view: 'cohort', function: 'product', parentSlug: 'r30' },
  { slug: 'sumME', name: 'sumME', definition: 'Sum of Music Engagement events per cohort.', view: 'cohort', function: 'product', parentSlug: 'sumr7' },
  { slug: 'ftue', name: 'FTUE', definition: 'First-Time User Experience completion.', view: 'cohort', function: 'product', parentSlug: 'r1' },

  // Monetization (subject matter only; DuoData does not monetize itself)
  { slug: 'uv', name: 'UV (User Value)', definition: 'Revenue per user, cohort view. The primary monetization metric.', view: 'cohort', function: 'mon', parentSlug: 'profit-after-ua' },
  { slug: 'uv7', name: 'UV7', definition: 'User Value at Day 7 post-install.', view: 'cohort', function: 'mon', parentSlug: 'uv' },
  { slug: 'uv30', name: 'UV30', definition: 'User Value at Day 30 post-install.', view: 'cohort', function: 'mon', parentSlug: 'uv' },
  { slug: 'ltv', name: 'LTV', definition: 'Lifetime Value — long-term cohort value. UV∞.', view: 'cohort', function: 'mon', parentSlug: 'uv' },
  { slug: 'arpdau', name: 'ARPDAU', definition: 'Average Revenue Per DAU = total revenue / total DAU. Act-date view.', formula: 'ARPDAU = Revenue / DAU', view: 'act_date', function: 'mon', parentSlug: 'revenue' },
  { slug: 'ecpm', name: 'eCPM', definition: 'Effective Cost Per Mille — revenue per 1,000 ad impressions.', view: 'act_date', function: 'mon', parentSlug: 'arpdau' },
  { slug: 'pay-rate', name: 'Pay Rate', definition: '% of users making at least one purchase.', view: 'cohort', function: 'mon', parentSlug: 'uv' },

  // UA
  { slug: 'installs', name: 'Installs', definition: 'Total installs across paid + organic.', view: 'act_date', function: 'ua', parentSlug: 'profit-after-ua' },
  { slug: 'cpi', name: 'CPI', definition: 'Cost Per Install.', formula: 'CPI = UA Cost / Paid Installs', view: 'act_date', function: 'ua', parentSlug: 'installs' },
  { slug: 'ecpi', name: 'eCPI', definition: 'Effective CPI = UA cost / (paid + organic uplift installs).', formula: 'eCPI = UA Cost / (Paid + Organic Uplift)', view: 'act_date', function: 'ua', parentSlug: 'cpi' },
  { slug: 'k-factor', name: 'K-factor', definition: 'Organic uplift ratio = organic_uplift_installs / paid_installs.', view: 'cohort', function: 'ua', parentSlug: 'ecpi' },
  { slug: 'roas', name: 'ROAS', definition: 'Return On Ad Spend = revenue / ad spend.', formula: 'ROAS = Revenue / Cost', view: 'cohort', function: 'ua', parentSlug: 'installs' },
  { slug: 'paid-roas-d7', name: 'Paid ROAS D7', definition: 'Revenue D7 / Cost. Paid-only — excludes organic uplift.', view: 'cohort', function: 'ua', parentSlug: 'roas' },
  { slug: 'eroas-d7', name: 'eROAS D7', definition: 'Revenue D7 including organic uplift / Cost. Blended view.', view: 'cohort', function: 'ua', parentSlug: 'roas' },
  { slug: 'proas', name: 'pROAS', definition: 'Predicted ROAS.', view: 'cohort', function: 'ua', parentSlug: 'roas' },

  // Creative
  { slug: 'ipm', name: 'IPM', definition: 'Installs Per Mille — installs per 1,000 ad impressions.', view: 'act_date', function: 'creative', parentSlug: 'installs' },
  { slug: 'ctr', name: 'CTR', definition: 'Click-Through Rate.', view: 'act_date', function: 'creative', parentSlug: 'ipm' },
  { slug: 'cvr', name: 'CVR', definition: 'Install Conversion Rate.', view: 'act_date', function: 'creative', parentSlug: 'ipm' },
  { slug: 'thumb-stop', name: 'Thumb-stop', definition: 'First 1–2 seconds stopping a scroller. Hook Rate.', view: 'act_date', function: 'creative', parentSlug: 'ctr' }
]

export function getMetricBySlug(slug: string) {
  return METRIC_TREE.find((n) => n.slug === slug)
}

export function getMetricChildren(slug: string) {
  return METRIC_TREE.filter((n) => n.parentSlug === slug)
}
