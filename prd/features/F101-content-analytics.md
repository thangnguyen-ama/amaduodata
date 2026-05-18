---
id: F101
name: content-analytics
status: draft
priority: P1
owner: DnI
platforms: [web]
depends_on: [F004, F100]
blocks: []
last_updated: 2026-05-17
---

# F101 — Content analytics

## Summary

Admin dashboard showing path / unit / lesson / card-level analytics: completion rates, accuracy, time-to-answer, drop-off points. Used by content owners to spot underperforming cards and by leadership to read adoption by team / role.

## User stories

- As a content owner, I see which card in Product 101 U3 has the lowest accuracy and the highest "abandon-card-mid-lesson" rate.
- As a manager, I see what % of my squad has finished UA 101.
- As DnI, I see app-wide funnels: invited → activated → first lesson → first path completed → cross-functional path completed.

## Acceptance criteria

- `AC-F101-01` Given an admin user, when they open `/admin/analytics`, then 4 default dashboards are available: Adoption, Path performance, Card performance, Drift queue.
- `AC-F101-02` Given a path performance view, when filtered by `team` or `role`, then accuracy, completion, and avg time-to-answer are shown.
- `AC-F101-03` Given a card performance view, when sorted by "lowest accuracy", then cards with the worst learner performance bubble up with a one-click "Open in editor" CTA.
- `AC-F101-04` Given drift queue, when populated by F100's drift checker, then admins can triage.

## UI states

- Dashboard grid: KPI cards on top, chart + table below.
- Filters: time window, role, team, path.
- Export to CSV on every table.

Components: `Dashboard`, `KPICard`, `Chart` (recharts), `Table`, `Filters`. See [design/system/components](../design/system/components.md).

## Data requirements

Reads from BigQuery via Metabase embedded views, OR via a thin in-app analytics service that queries BigQuery directly.

See [technical/data-model.md](../technical/data-model.md).

## Tracking events

| Event | Trigger | Required params |
| --- | --- | --- |
| `admin_dashboard_viewed` | View | `user_id`, `dashboard_name` |
| `admin_dashboard_filter_changed` | Filter change | `user_id`, `filter`, `value` |
| `admin_dashboard_export` | Export click | `user_id`, `dashboard_name`, `row_count` |

## Edge cases and failure modes

- BigQuery delay (≤1 hour) — dashboard timestamp shows last-refresh time.
- Small-cell suppression — accuracy must not be shown for any role × team cell with <5 active users (privacy).

## Non-functional requirements

- p95 dashboard load ≤ 3 s.
- Aggregations cached with 15-minute TTL.

## Design notes

- Match Amanotes Metabase visual language so leaders feel at home.
- Reuse Metabase embedded views where it accelerates time-to-MVP; an ADR is needed if we choose this path (see ADR-005).

## Out of scope

- A/B test analysis tools (Growthbook / ABalyzer are the canonical tools).
- ML-driven content recommendations.

## Definition of Done

- `automated` — small-cell suppression unit test.
- `automated` — e2e covers AC-F101-01..04.
- `manual` — DnI / leadership review.

## Open questions

- `OQ-F101-01` Build in-app or embed Metabase? Time-to-MVP says embed.
- `OQ-F101-02` Should managers see individual-learner-level data or only aggregates?

## Related

- F004 (events feed analytics)
- F100 (drift queue surfaces here)
