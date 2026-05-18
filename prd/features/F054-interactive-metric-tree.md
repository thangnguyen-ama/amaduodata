---
id: F054
name: interactive-metric-tree
status: draft
priority: P1
owner: DnI
platforms: [web, ios, android]
depends_on: []
blocks: []
last_updated: 2026-05-17
---

# F054 — Interactive metric tree

## Summary

A web-native, zoomable, clickable rendering of the Amanotes Marketing & Product Metric Tree. Replaces the static draw.io diagram on the Confluence page with a live tool that learners can drill into. Every node links to the relevant DuoData lesson(s), DataHub glossary entry, and Confluence section.

## User stories

- As a learner inside a Cross-Functional Connections lesson, I click a metric to jump to the metric tree with that node highlighted.
- As a non-learner Amanoter (e.g., a manager scanning), I open `/metric-tree` directly and explore without lessons.
- As a content author, I update a node label and have it propagate to lessons that reference it.

## Acceptance criteria

- `AC-F054-01` Given a user navigates to `/metric-tree`, when loaded, then the full tree renders with the 2 top-level branches (Cohort view vs Act-date view) visible.
- `AC-F054-02` Given the user clicks a node, when expanded, then the side panel shows: name, canonical definition (from glossary), formula (if any), linked lessons, linked DataHub entry, linked Confluence section.
- `AC-F054-03` Given a deep link with `?highlight=<metric_slug>`, when opened, then the tree auto-pans to and highlights that node.
- `AC-F054-04` Given a learner clicks "Learn this" on a node, when in a path, then they're routed to the relevant lesson.
- `AC-F054-05` Given a screen narrower than 768 px, when rendered, then a vertical list view is offered instead of the zoomable tree.

## UI states

- Tree canvas (D3 / React Flow).
- Side panel with node details.
- Search bar (fuzzy search node names).
- Color legend: function (Product / UA / Mon / Creative).

Components: `MetricTreeCanvas`, `NodePanel`, `LegendBar`, `SearchBar`. See [design/system/components](../design/system/components.md).

## Data requirements

`MetricNode { id, slug, name, definition, formula, view (act-date|cohort|both), function, parent_id, children[], linked_lesson_ids[], datahub_url, confluence_anchor }`.

Source of truth is a config file `metric-tree.yaml` checked into the repo; admin tool edits it (F100).

## Tracking events

| Event | Trigger | Required params |
| --- | --- | --- |
| `metric_tree_opened` | Page view | `user_id`, `highlight_slug` (nullable) |
| `metric_tree_node_clicked` | Node click | `user_id`, `slug` |
| `metric_tree_search_used` | Search submit | `user_id`, `query` |
| `metric_tree_to_lesson` | "Learn this" click | `user_id`, `slug`, `lesson_id` |

## Edge cases and failure modes

- 200+ nodes — perf must hold. Use level-of-detail rendering (collapse subtrees beyond N hops from focus).
- Mobile (web) — graceful degradation to vertical list, no pan/zoom.
- A metric is deprecated → strikethrough + tooltip.

## Non-functional requirements

- p95 first contentful paint ≤ 1.5 s.
- All node text must be selectable (keyboard navigable; ARIA tree role).

## Design notes

- Borrow draw.io's general topology (Confluence page) but redesign for screen. Cohort view branch on left, Act-date branch on right, common children below.
- Use Amanotes brand colors but distinct hues per function: Product / UA / Mon / Creative.

## Out of scope

- Live data overlays (showing today's PI ARPDAU on the tree). Tempting; out of scope to preserve DuoData's mandate.
- Per-product trees (PI-only, BH-only). The base tree is product-agnostic; if requested, that's a phase-2 feature.

## Definition of Done

- `automated` — e2e for AC-F054-01..05.
- `automated` — accessibility audit for keyboard navigation.
- `manual` — DnI sign-off that the on-screen tree matches the Confluence source.

## Open questions

- `OQ-F054-01` Use React Flow, D3, or Mermaid? React Flow is most likely; bring an ADR if we go differently.
- `OQ-F054-02` Should there be an "edit suggestion" CTA per node, opening a PR / ticket against `metric-tree.yaml`?

## Related

- F053 (heavy linkage)
- F100 (authoring tool maintains node ↔ lesson links)
