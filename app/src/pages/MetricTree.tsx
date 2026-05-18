import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { METRIC_TREE, getMetricBySlug, getMetricChildren } from '../content/metricTree'
import { FunctionDomain, MetricNode } from '../types'
import { FunctionChip } from '../components/FunctionChip'

const FUNCTION_FILTERS: { fn: FunctionDomain; label: string }[] = [
  { fn: 'business', label: 'Business' },
  { fn: 'product', label: 'Product' },
  { fn: 'ua', label: 'UA' },
  { fn: 'mon', label: 'Mon (topic)' },
  { fn: 'creative', label: 'Creative' }
]

export function MetricTree() {
  const [params, setParams] = useSearchParams()
  const initialSlug = params.get('slug') || 'revenue'
  const [selected, setSelected] = useState<string>(initialSlug)
  const [query, setQuery] = useState('')
  const [activeFunctions, setActiveFunctions] = useState<Set<FunctionDomain>>(
    new Set(['business', 'product', 'ua', 'mon', 'creative'])
  )

  const node = getMetricBySlug(selected)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return METRIC_TREE.filter((n) => activeFunctions.has(n.function)).filter(
      (n) => !q || n.name.toLowerCase().includes(q) || n.definition.toLowerCase().includes(q)
    )
  }, [query, activeFunctions])

  function selectNode(slug: string) {
    setSelected(slug)
    setParams({ slug })
  }

  function toggleFn(fn: FunctionDomain) {
    const next = new Set(activeFunctions)
    if (next.has(fn)) next.delete(fn)
    else next.add(fn)
    setActiveFunctions(next)
  }

  // Build tree levels for layout
  const roots = METRIC_TREE.filter((n) => !n.parentSlug)
  const byParent: Record<string, MetricNode[]> = {}
  filtered.forEach((n) => {
    if (n.parentSlug) {
      byParent[n.parentSlug] = byParent[n.parentSlug] || []
      byParent[n.parentSlug].push(n)
    }
  })

  function renderBranch(node: MetricNode, depth = 0): JSX.Element {
    const children = byParent[node.slug] || []
    return (
      <div key={node.slug} className="space-y-1.5">
        <button
          onClick={() => selectNode(node.slug)}
          className={`flex items-center gap-2 px-2 py-1 rounded-md text-sm w-full text-left transition-colors ${
            selected === node.slug ? `bg-fn-${node.function}/15 ring-1 ring-fn-${node.function}/40` : 'hover:bg-slate-100'
          }`}
        >
          <span className={`w-2 h-2 rounded-full bg-fn-${node.function}`} />
          <span className="font-medium">{node.name}</span>
          {node.formula && <span className="font-mono text-[10px] text-sub-light truncate">· {node.formula}</span>}
        </button>
        {children.length > 0 && (
          <div className="pl-4 border-l border-slate-200 space-y-1.5">
            {children.map((c) => renderBranch(c, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex items-baseline justify-between flex-wrap gap-3 mb-4">
        <div>
          <h1 className="text-2xl font-extrabold">Metric tree</h1>
          <p className="text-sub-light text-sm">Mirrors the Amanotes metric tree on Confluence. Click any node for its definition.</p>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search metrics…"
          className="px-3 py-2 border border-slate-200 rounded-md w-64 focus:border-brand focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {FUNCTION_FILTERS.map((f) => {
          const on = activeFunctions.has(f.fn)
          return (
            <button
              key={f.fn}
              onClick={() => toggleFn(f.fn)}
              className={`pill border ${
                on ? `bg-fn-${f.fn}/10 text-fn-${f.fn} border-fn-${f.fn}/30` : 'bg-white text-sub-light border-slate-200 line-through'
              }`}
            >
              <span className={`w-2 h-2 rounded-full bg-fn-${f.fn}`} />
              {f.label}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
        <section className="card p-4 overflow-auto">
          <div className="space-y-3">
            {roots.filter((r) => activeFunctions.has(r.function)).map((root) => renderBranch(root))}
          </div>
        </section>

        <aside className="card p-5 h-fit lg:sticky lg:top-4">
          {node ? (
            <div>
              <FunctionChip fn={node.function} />
              <h2 className="text-xl font-extrabold mt-2">{node.name}</h2>
              <p className="text-xs text-sub-light mt-1">
                View: <strong>{node.view === 'act_date' ? 'Act-date' : node.view === 'cohort' ? 'Cohort' : 'Both'}</strong>
              </p>
              <p className="mt-4 leading-6">{node.definition}</p>
              {node.formula && (
                <div className="mt-3">
                  <div className="text-xs uppercase text-sub-light font-semibold mb-1">Formula</div>
                  <code className="formula">{node.formula}</code>
                </div>
              )}
              {(() => {
                const children = getMetricChildren(node.slug)
                if (children.length === 0) return null
                return (
                  <div className="mt-4">
                    <div className="text-xs uppercase text-sub-light font-semibold mb-1.5">Children</div>
                    <div className="flex flex-wrap gap-1.5">
                      {children.map((c) => (
                        <button key={c.slug} onClick={() => selectNode(c.slug)} className={`pill chip-${c.function} hover:opacity-80`}>
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })()}
              {node.parentSlug && (
                <div className="mt-4 text-xs">
                  Parent:{' '}
                  <button onClick={() => selectNode(node.parentSlug!)} className="underline">
                    {getMetricBySlug(node.parentSlug)?.name}
                  </button>
                </div>
              )}
              <p className="text-xs text-sub-light mt-4 leading-5">
                Source of truth: DataHub. In the real app, definitions sync via the DataHub API every 5 min and a drift report flags stale cards.
              </p>
            </div>
          ) : (
            <div className="text-sub-light">Select a node…</div>
          )}
        </aside>
      </div>
    </div>
  )
}
