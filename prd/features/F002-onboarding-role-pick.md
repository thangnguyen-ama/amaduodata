---
id: F002
name: onboarding-role-pick
status: draft
priority: P0
owner: Product
platforms: [web, ios, android]
depends_on: [F001]
blocks: [F003]
last_updated: 2026-05-17
---

# F002 — Onboarding role pick

## Summary

First-time login flow: the user identifies their role (PO, UA, MO, GD, LD, MS, DA, CRE, OTHER) and current product (PI / BH / DR / GDUC / NGD / MEP / GS / DnI / Other). Used to tailor lesson recommendations and to segment analytics. Total time ≤90 seconds.

## User stories

- As a new Amanoter on first login, I pick my role from a visual grid and my product/team from a list, and land on the placement quiz.
- As an existing Amanoter whose role changed, I can re-run the onboarding from Profile settings.
- As a manager, I can see role coverage in admin analytics to confirm my squad has set this correctly.

## Acceptance criteria

- `AC-F002-01` Given a first-time login, when the user reaches Home, then they are redirected to `/onboarding`.
- `AC-F002-02` Given the onboarding screen, when the user selects a role and team and clicks Continue, then `User.role` and `User.team` are persisted and they advance to the placement quiz (F003).
- `AC-F002-03` Given a user already through onboarding, when they revisit `/onboarding`, then their previous selections are pre-filled.
- `AC-F002-04` Given any role except OTHER, when the user proceeds, then the placement quiz weights cards from that role's primary path heavier.
- `AC-F002-05` Given a user picks OTHER, when they proceed, then they take the full breadth placement quiz with equal weighting.

## UI states

- Role grid: 9 cards (PO, UA, MO, GD, LD, MS, DA, CRE, OTHER), one click selects.
- Team picker: single-select dropdown (PI / BH / DR / GDUC / NGD / MEP / GS / DnI / Other).
- Confirmation step (single screen) showing the selected pair, with "Looks right" / "Change" buttons.

Components: `RoleCard`, `Dropdown`, `Stepper`. See [design/system/components](../design/system/components.md).

## Data requirements

Adds to `User`:
- `role` enum
- `team` enum
- `role_set_at` timestamp
- `role_change_history` array (audit trail of changes)

See [technical/data-model.md](../technical/data-model.md).

## Tracking events

| Event | Trigger | Required params |
| --- | --- | --- |
| `onboarding_started` | First display of `/onboarding` | `user_id` |
| `onboarding_role_selected` | User picks role | `user_id`, `role` |
| `onboarding_team_selected` | User picks team | `user_id`, `team` |
| `onboarding_completed` | Confirmation click | `user_id`, `role`, `team`, `seconds_to_complete` |

## Edge cases and failure modes

- User closes tab mid-onboarding → on next login, returns to onboarding (not Home) until completed.
- User selects then back-navigates → state preserved.
- Role list expands later (e.g., adding "Music Operator (MO)" vs "Monetization Operator (MO)" disambiguation) → migration script updates existing users.

## Non-functional requirements

- Onboarding screens must load <1 s on a 4G connection.
- All copy in English for MVP (matches Confluence). Vietnamese translations stored but feature-flagged off.

## Design notes

- Use Amanotes role icons consistent with internal HR tools where available.
- Pre-select the most likely role/team if we can infer from Google Workspace department field; otherwise leave blank.

## Out of scope

- Adding job grade (P1/P2/M2/etc.) — could be useful for analytics, but not MVP.
- Manager override (a manager re-assigning their report's role).

## Definition of Done

- `automated` — e2e covers AC-F002-01..05.
- `automated` — analytics events fire and land in BigQuery with the required params.
- `manual` — DnI lead reviews role + team taxonomy with HR / People team.

## Open questions

- `OQ-F002-01` Should we capture job grade? Useful for analytics but adds friction.
- `OQ-F002-02` How do we handle people with multiple roles (e.g., a DA who also writes lessons)?

## Related

- F003 (placement quiz consumes role + team)
- F050–F053 (content paths recommend based on role)
