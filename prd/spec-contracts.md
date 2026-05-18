# Spec contracts

Cross-cutting rules every feature file, ADR, and design doc in this PRD must follow.

## Feature IDs

- Format: `F<NNN>` zero-padded to 3 digits. Current range in use: `F001`–`F014`.
- Reserved ranges:
  - `F001`–`F019` — Foundation (auth, navigation, profile)
  - `F020`–`F049` — Gamification (XP, hearts, streak, leagues, leaderboard, quests)
  - `F050`–`F099` — Content modules (Product, UA, Mon, Cross-functional, future: Creative, GD)
  - `F100`–`F129` — Admin & authoring (content management, analytics)
  - `F130`+ — Future / unallocated
- Never reuse an ID. Deprecate via `status: deprecated` in frontmatter.

## Acceptance criteria

- Gherkin format: `Given … When … Then …`.
- ID format: `AC-F<NNN>-NN` (e.g., `AC-F003-01`).
- Each AC must be independently verifiable, automated where possible.

## Open questions

- ID format: `OQ-F<NNN>-NN`.
- Resolved questions should be moved to the relevant ADR or removed.

## ADRs

- ID format: `ADR-NNN`.
- Status lifecycle: `proposed → accepted → superseded`.
- Superseded ADRs MUST link the replacement.

## Tracking events

- Naming convention follows Amanotes Klavar/Firebase patterns: `snake_case`, verb-first.
- Required common params on every event: `user_id`, `user_role` (`PO|UA|MO|CRE|GD|LD|MS|DA|OTHER`), `app_version`, `platform` (`web|ios|android`), `locale`.
- Domain-specific events MUST list required params explicitly in the feature file.

## Cross-references

- "User Value", "ARPDAU", "ROAS", etc. — always use the canonical definition from [glossary.md](./glossary.md) (which mirrors DataHub).
- When a feature touches a metric, link the metric definition rather than redefining it.

## Frontmatter (features)

```yaml
---
id: F001
name: short-kebab-name
status: draft | approved | in-development | shipped | deprecated
priority: P0 | P1 | P2 | P3
owner: <team>            # e.g., DnI, Product, GS
platforms: [web, ios, android]
depends_on: []
blocks: []
last_updated: YYYY-MM-DD
---
```

## Section order in feature files (fixed)

1. Summary
2. User stories
3. Acceptance criteria
4. UI states
5. Data requirements
6. Tracking events
7. Edge cases and failure modes
8. Non-functional requirements
9. Design notes
10. Out of scope
11. Definition of Done
12. Open questions
13. Related

No new sections without an ADR.

## "Definition of Done" buckets

- `automated` — verified by unit / integration / e2e test, or by a query against the warehouse.
- `manual` — verified by human QA, design review, or content review.

A feature is not Done until both buckets are green.
