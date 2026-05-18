---
id: F001
name: sso-login
status: draft
priority: P0
owner: GS
platforms: [web, ios, android]
depends_on: []
blocks: [F002, F005]
last_updated: 2026-05-17
---

# F001 — SSO login

## Summary

Amanoters sign in with their `@amanotes.com` Google Workspace account. No password, no email signup. Non-Amanoters cannot reach any content; the app is invitation-impossible by design.

## User stories

- As an Amanoter, I open `duodata.amanotes.net`, click "Sign in with Google", pick my work account, and land on Home — no account creation step.
- As a contractor with a Gmail account, I am refused with a clear "Amanotes employees only" message.
- As a session-expired user, I am redirected to login and back to my original URL after re-auth.

## Acceptance criteria

- `AC-F001-01` Given an unauthenticated user, when they navigate to any route except `/login`, then they are redirected to `/login`.
- `AC-F001-02` Given a user signed in with a `@amanotes.com` Google account, when SSO completes, then a session is established and they are redirected to `/onboarding` (first time) or `/` (returning).
- `AC-F001-03` Given a user signed in with a non-`@amanotes.com` account, when SSO completes, then the session is rejected with HTTP 403 and the UI shows "DuoData is for Amanotes employees only".
- `AC-F001-04` Given an active session, when the user clicks "Sign out", then the session is invalidated server-side within 1 second and the user is redirected to `/login`.
- `AC-F001-05` Given a session older than 14 days, when the user makes any authenticated request, then they must re-auth.

## UI states

- `/login` — Google button, brand mark, copy "Amanotes employees only".
- Error state — domain rejected (red banner, "DuoData is for Amanotes employees only" + "If you think this is wrong, ping #data-insights in Slack").
- Loading state — Google modal handles spinner.

Components used: `Button.primary.lg`, `Banner.error`, `Logo.lockup`. See [design/system/components](../design/system/components.md).

## Data requirements

`User` entity created on first successful login. Fields populated from Google profile: `email`, `display_name`, `avatar_url`, `google_id`. Other fields (`role`, `team`, `cycle_join_date`) come from the onboarding flow (F002). See [technical/data-model.md](../technical/data-model.md).

## Tracking events

| Event | Trigger | Required params |
| --- | --- | --- |
| `auth_login_attempt` | User clicks Google button | `platform`, `locale` |
| `auth_login_success` | SSO returns a valid Amanotes account | `user_id`, `is_first_session` (bool) |
| `auth_login_rejected_domain` | Non-Amanotes account attempt | `attempted_domain` (hashed) |
| `auth_logout` | User clicks Sign out | `user_id`, `session_duration_seconds` |

## Edge cases and failure modes

- Google OAuth service down → friendly retry screen ("Google login is having a moment. Try again in a few minutes.")
- User has multiple Google accounts → standard Google account chooser; no special handling.
- User's Amanotes account is deactivated by IT after onboarding → session invalidated within 5 minutes via Google admin signal (or on next request).
- Network error during callback → idempotent retry; never double-create a user record.

## Non-functional requirements

- p95 SSO round-trip ≤ 1.5 s.
- Session storage in HTTP-only secure cookie, `SameSite=Lax`.
- No PII in client-side localStorage.
- Audit log of every login + logout retained 365 days in BigQuery.

## Design notes

Use Amanotes brand mark in lockup with "DuoData" subtitle. Background: subtle gradient using brand primary. No marketing fluff — this is an internal tool.

## Out of scope

- Email/password signup.
- Magic-link login.
- SAML for partner organizations (Smulie, Yogame, Reactional).

## Definition of Done

- `automated` — e2e test covers AC-F001-01..05 against staging Google OAuth.
- `automated` — domain-allow-list unit test rejects 10+ non-Amanotes domains.
- `manual` — IT confirms session-revocation on deactivation works against a real deactivated test account.

## Open questions

- `OQ-F001-01` Do we want to also allow `@amanotesjsc.com` (legal entity domain) in addition to `@amanotes.com`?
- `OQ-F001-02` Should MEP partners (Smulie, Yogame, Reactional) be supported via guest accounts later? — likely yes in phase 2, but not MVP.

## Related

- ADR-001 (web-only MVP)
- F002 (onboarding picks up after first login)
