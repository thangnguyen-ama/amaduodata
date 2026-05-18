# DuoData

A Duolingo-style learning app teaching the **Amanotes Marketing & Product metric tree** — built from a multi-doc PRD by a multi-agent pipeline.

| | |
| --- | --- |
| **Audience** | Amanoters (Product, UA, Mon, Creative, GD, LD, Music Specialist, DA, leadership) |
| **Platform** | Web (Vite + React + TypeScript) — iOS wrapped via Capacitor for the simulator |
| **Status** | MVP demo build of the PRD in `prd/` |
| **Monetization** | None — internal tool |

## Repository layout

```
DuoData/
├── prd/                 # PRD: 00-overview, personas, features F001–F101, ADRs, design tokens
│   ├── features/        # F001 … F101 — feature specs in Gherkin AC format
│   ├── decisions/       # ADR-001 … ADR-005
│   ├── design/          # tokens · components · ux-patterns · accessibility · key-screens
│   ├── strategic/       # critique, hypotheses, evaluation, synthesis
│   ├── technical/       # data-model · api-contracts
│   ├── glossary.md      # Authoritative Amanotes terminology (mirrors DataHub)
│   └── ...
└── app/                 # Implementation
    ├── src/
    │   ├── pages/       # Home, Paths, PathDetail, LessonPlayer, Practice, League, Profile, MetricTree, Admin
    │   ├── components/  # AppShell, HeartCounter, StreakCounter, cards/*
    │   ├── content/     # Seeded paths, cards, metric tree
    │   ├── store/       # Zustand + persist
    │   └── lib/         # tracking, levels, dates
    ├── ios/             # Capacitor-generated Xcode project
    └── capacitor.config.ts
```

## Scope of this build

**Built (per PRD feature index):**
- F001 mock SSO · F002 onboarding · F003 placement quiz · F004 lesson player (all 6 card types)
- F005 profile · F020 XP/levels · F021 hearts/streak · F022 leagues · F023 daily quests · F024 SRS practice
- F050 Product 101 · F051 UA 101 · F053 Cross-Functional Connections · F054 metric tree
- F100 admin authoring · F101 in-session analytics

**Out of scope (user-requested):**
- F052 Mon 101 — monetization-related content path

DuoData itself has no in-app monetization (see `prd/monetization.md` — N/A for internal tool).

## Run the web app

```bash
cd app
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production bundle
```

Sign in with any `*@amanotes.com` email (mocked).

## Run on iOS (Xcode)

```bash
cd app
npm run build
npx cap sync ios
npx cap open ios     # opens Xcode; hit ▶ to run on simulator
```

## UX

The learning experience is modeled on Duolingo: chunky 3D buttons with press-down animation, snaking lesson-path on each path screen, slide-up green/red feedback drawer in the lesson player, confetti on completion. Function-themed gradient banners use the Amanotes function colors (Product purple, UA green, Cross-fn cyan).

Per PRD design principles: no mascots ("playful, never infantile"), Amanotes terminology preserved everywhere, all metric definitions traceable to `prd/glossary.md` → DataHub.

## Mock infrastructure

| Real plan (PRD) | This build |
| --- | --- |
| Google Workspace SSO | Email allowlist `@amanotes.com` |
| Postgres OLTP | Zustand `persist` → `localStorage` |
| BigQuery content + Firebase events | In-memory event buffer at `window.__duodata_events` |
| DataHub metric definitions | Hard-coded in `app/src/content/metricTree.ts` |
| Metabase dashboards | Admin → Analytics tab (in-session only) |

## License

Internal Amanotes project.
