# DuoData — MVP build

Client-only demo of the DuoData PRD (`../prd/`). Vite + React + TypeScript + Tailwind, persisted with Zustand + localStorage.

## Run

```bash
cd app
npm install
npm run dev    # http://localhost:5173
npm run build  # typecheck + production bundle
```

## Scope

**In:** F001 mock SSO, F002 onboarding, F003 placement, F004 lesson player (all 6 card types),
F005 profile, F020/F021 XP/hearts/streak, F022 leagues, F023 daily quests, F024 SRS practice,
F050 Product 101, F051 UA 101, F053 Cross-Functional Connections, F054 metric tree,
F100 admin authoring (minimal), F101 in-session analytics.

**Out (per user request):** F052 Mon 101 path.

DuoData itself has no in-app monetization — see `../prd/monetization.md` (N/A: internal tool).

## Mock infrastructure

| Real plan (PRD) | This build |
| --- | --- |
| Google Workspace SSO | Email allowlist `@amanotes.com` |
| Postgres OLTP | Zustand `persist` → `localStorage` |
| BigQuery content + Firebase events | In-memory event buffer at `window.__duodata_events` |
| DataHub metric definitions | Hard-coded in `src/content/metricTree.ts` |
| Metabase dashboards | Admin → Analytics tab |

## Demo journey

1. Sign in with any `@amanotes.com` email + display name.
2. Pick a role (PO / UA / MO / GD / …) and team.
3. Take the 8-card placement quiz (or skip).
4. Continue the suggested lesson from Home.
5. Hearts decrement on wrong answers; XP/streak/quests update on lesson complete.
6. Visit `/admin` to inspect content tree, edit cards, and see session analytics.

## Notes

- Heart regen: 1 heart per 30 min.
- SRS: simplified SM-2; cards "graduate" after 3 correct reviews with ease ≥ 2.5.
- League: 21 members per tier (you + 20 bots). Rotates weekly.
- All metric definitions cite the canonical Amanotes glossary terms.
