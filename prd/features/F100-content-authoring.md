---
id: F100
name: content-authoring
status: draft
priority: P0
owner: DnI
platforms: [web]
depends_on: [F001]
blocks: [F050, F051, F052, F053, F054]
last_updated: 2026-05-17
---

# F100 — Content authoring

## Summary

Admin web UI for DnI and path DRIs to create, edit, and publish paths, units, lessons, cards, and metric-tree nodes. Includes preview-as-learner, version history, draft/review/published states, and a definition-drift checker that compares card content to DataHub.

## User stories

- As a DnI DRI, I create a new card for Product 101 U3 in the authoring UI, preview it, ship it through review, and publish.
- As a Product DRI, I edit a card to reflect a DataHub definition change and the system flags any related cards that may need similar edits.
- As an admin, I can roll back a published version of a card.

## Acceptance criteria

- `AC-F100-01` Given a user with `role=admin` and path-owner ACL, when they open `/admin/lessons`, then they see all paths they own.
- `AC-F100-02` Given they create a new card and click Save, then the card status is `draft`, visible only to admins.
- `AC-F100-03` Given they click Submit for review, when persisted, then the card status is `review` and assigned reviewer(s) are notified.
- `AC-F100-04` Given a reviewer approves, when persisted, then the card status is `published` and learners see it within 5 minutes (cache TTL).
- `AC-F100-05` Given a published card is edited, when re-published, then the prior version is preserved in history and active learner attempts use the pinned version.
- `AC-F100-06` Given DataHub returns a definition for a metric used by a card, when the system runs the daily drift check, then cards whose canonical answer text drifts from DataHub are flagged.

## UI states

- Path list → Unit list → Lesson list → Card editor.
- Card editor: typed form per card type, live preview, "Insert metric" picker, "Insert formula" picker.
- History drawer with diff view.
- Drift alerts banner with affected card list.

Components: `AdminShell`, `Tree`, `CardEditor[Type]`, `LivePreview`, `DiffViewer`, `DriftBanner`. See [design/system/components](../design/system/components.md).

## Data requirements

`Card`, `CardVersion`, `ApprovalLog`, `DriftReport`. See [technical/data-model.md](../technical/data-model.md).

## Tracking events

| Event | Trigger | Required params |
| --- | --- | --- |
| `admin_card_drafted` | Save draft | `user_id`, `card_id`, `is_new` |
| `admin_card_submitted_for_review` | Submit | `user_id`, `card_id`, `reviewers[]` |
| `admin_card_reviewed` | Approve / reject | `user_id`, `card_id`, `decision` |
| `admin_card_published` | Publish | `user_id`, `card_id`, `version` |
| `admin_card_rollback` | Roll back | `user_id`, `card_id`, `from_version`, `to_version` |
| `admin_drift_resolved` | Drift cleared | `user_id`, `card_id` |

## Edge cases and failure modes

- Two authors edit the same card simultaneously → optimistic locking via `version_etag`; loser sees a merge dialog.
- A path owner is deactivated → admin can reassign ownership.
- DataHub down during drift check → skip the check that day, alert ops.

## Non-functional requirements

- Editor autosaves draft every 10 seconds.
- Author-side perf budget: p95 editor open ≤ 1 s.
- All admin actions audited 365 days in BigQuery.

## Design notes

- Editor should not feel like a CMS template — keep it lean (Notion-style block editor + a typed schema per card type).
- The drift banner is yellow, not red — drift is a normal lifecycle event, not an outage.

## Out of scope

- Bulk import from Confluence (could be a one-time migration script, not a feature).
- Multi-author real-time collaboration.
- Auto-translation pipeline.

## Definition of Done

- `automated` — e2e covers draft → review → publish → rollback.
- `automated` — drift check against a synthetic DataHub mirror.
- `manual` — DnI lead validates authoring ergonomics.

## Open questions

- `OQ-F100-01` Should the drift check auto-PR a suggested fix?
- `OQ-F100-02` Approval gate — single reviewer or two-eyes (especially for Cross-Functional path)?

## Related

- F050–F054 (content fed via this tool)
- F101 (analytics shares some UI shell)
