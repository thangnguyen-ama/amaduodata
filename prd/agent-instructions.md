# Agent instructions

How Claude Code, multi-agent systems, or any LLM-driven implementer should consume this PRD.

## Read order

1. `README.md`
2. `00-overview.md`
3. `01-personas-and-jobs.md`
4. `02-information-architecture.md`
5. `glossary.md` — **mandatory.** This app teaches Amanotes terminology; using the wrong term breaks the product.
6. `spec-contracts.md`
7. `features/_index.md` then individual `F<NNN>-*.md` in dependency order
8. `technical/*` only when ready to implement
9. `design/system/*` for any UI work
10. `decisions/*` whenever a section says "see ADR-XXX"

## Hard rules

- **Never invent metric definitions.** Every metric mentioned in lesson content must trace back to `glossary.md` → DataHub. If a needed term is missing from `glossary.md`, raise an open question (`OQ-FXXX-NN`) instead of guessing.
- **Use Amanotes terminology, not generic data-school terminology.** "User Value (UV)" not "LTV proxy". "ARPDAU" not "average revenue per active user per day". "Cohort view vs Act-date view" is the canonical phrasing.
- **Respect the Act-date vs Cohort distinction in every lesson card.** Mixing the two views is the single most common bug in Amanotes metric reporting; the app exists in part to teach this.
- **No fabricated numbers in lesson content.** Use generic illustrative numbers (e.g., "If CPI = $0.10 and UV7 = $0.06, ROAS D7 = 60%"). Never claim "PIa UV7 is $X" — those are live metrics from BigQuery and must not be hardcoded.

## When you find an ambiguity

1. Search this PRD first.
2. Search the linked Confluence pages (metric tree, DataHub glossary).
3. If still unresolved, add an `OQ-FXXX-NN` entry to the relevant feature. Do not guess.

## When you find a contradiction

Stop and surface it. The PRD has a single source of truth per fact (see `spec-contracts.md`). If two docs disagree, file an ADR proposing the resolution.

## Multi-agent workflow

If you are spawning sub-agents, each sub-agent should receive:

- The full `glossary.md` (small, high signal-to-noise).
- The specific feature file it owns.
- `spec-contracts.md`.
- A pointer to the metric tree Confluence page when its work touches lesson content.

Do not give a sub-agent the entire PRD unless its task is cross-cutting.
