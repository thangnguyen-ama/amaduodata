# DuoData — PRD

Duolingo-style learning app teaching Amanotes employees the **Marketing & Product Metric Tree** and the connections between Product, UA, Monetization, and Creative metrics.

| | |
| --- | --- |
| **Codename** | DuoData |
| **Audience** | Amanoters (Product, UA, Monetization, Creative, DnI, GD, LD, Music, Leadership) |
| **Platforms** | Web (primary, MVP), iOS + Android (phase 2) |
| **Internal tool?** | Yes — SSO via Amanotes Google Workspace |
| **Monetization** | None (internal learning tool) |
| **Source of truth** | Confluence: [Marketing & Product Metric Tree](https://amanotesjsc.atlassian.net/wiki/spaces/PROD/pages/3058008096) · [DataHub Glossary](https://datahub.amanotes.net/glossary) |
| **Last updated** | 2026-05-17 |

## Goals

Take the metric tree from a static Confluence diagram to a daily 5-minute learning habit. Reduce time-to-productivity for new Amanoters (PO, UA Specialist, MO, Creative, DA) by giving them a gamified path through metric definitions, formulas, and cross-functional dependencies.

**Success looks like:**

- 60% of new Amanoters in PI/BH/DR/GDUC squads finish the Product 101 + UA 101 + Mon 101 paths within 6 weeks of onboarding.
- 30% WAU among target audience after 3 months.
- ≥80% accuracy on the Cross-Functional Connections post-test (vs. ≤40% on the same items pre-test) — measures whether learners actually internalize the metric tree.

## Index

### Core

- [00 — Overview](./00-overview.md) — vision, strategy fit, success metrics, scope
- [01 — Personas & jobs-to-be-done](./01-personas-and-jobs.md) — Product, UA, Mon, Creative, GD, leadership
- [02 — Information architecture](./02-information-architecture.md) — sitemap + navigation
- [Monetization](./monetization.md) — N/A (internal tool)
- [Glossary](./glossary.md) — Amanotes-specific terms used in this PRD
- [Spec contracts](./spec-contracts.md) — feature ID range, frontmatter contract, ADR conventions
- [Agent instructions](./agent-instructions.md) — how Claude Code / multi-agent systems should consume this PRD

### Features

See [features/_index.md](./features/_index.md). Currently F001–F014 across 4 groups: foundation, gamification, content modules, admin.

### Technical

- [Data model](./technical/data-model.md) — entities, relationships, key fields
- [API contracts](./technical/api-contracts.md) — REST endpoints and event payloads

### Design

- [Design index](./design/_index.md)
- [system/tokens](./design/system/tokens.md), [system/components](./design/system/components.md), [system/ux-patterns](./design/system/ux-patterns.md), [system/accessibility](./design/system/accessibility.md)
- [product/key-screens](./design/product/key-screens.md)

### Decisions

See [decisions/_index.md](./decisions/_index.md). ADR-001 through ADR-005.

### Strategic (multi-agent outputs)

- [strategic/critique](./strategic/critique.md)
- [strategic/hypotheses](./strategic/hypotheses.md)
- [strategic/evaluation-framework](./strategic/evaluation-framework.md)
- [strategic/strategic-notes](./strategic/strategic-notes.md)
- [strategic/synthesis](./strategic/synthesis.md)
