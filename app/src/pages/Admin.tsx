import { useMemo, useState } from 'react'
import { PATHS } from '../content/paths'
import { CARDS_BY_ID } from '../content/cards'
import { Card } from '../types'
import { FunctionChip } from '../components/FunctionChip'
import { getEvents } from '../lib/track'

type Status = 'draft' | 'review' | 'published'

interface DraftOverride {
  prompt?: string
  explanation?: string
  status?: Status
}

const KEY = 'duodata-admin-drafts-v1'

function loadDrafts(): Record<string, DraftOverride> {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
}
function saveDrafts(d: Record<string, DraftOverride>) {
  localStorage.setItem(KEY, JSON.stringify(d))
}

export function Admin() {
  const [drafts, setDrafts] = useState<Record<string, DraftOverride>>(loadDrafts())
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
  const [tab, setTab] = useState<'content' | 'analytics'>('content')

  function update(cardId: string, patch: DraftOverride) {
    const next = { ...drafts, [cardId]: { ...drafts[cardId], ...patch } }
    setDrafts(next)
    saveDrafts(next)
  }

  const selected = selectedCardId ? CARDS_BY_ID[selectedCardId] : null
  const override = selectedCardId ? drafts[selectedCardId] || {} : {}

  // Stale draft? simple heuristic — drafts are shown as 'draft' until 'published'
  const status: Status = override.status || 'published'

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <h1 className="text-2xl font-extrabold">Admin · content & analytics</h1>
          <p className="text-sub-light text-sm">Demo authoring tool. Edits save to localStorage; in prod they go to BigQuery via ApprovalLog (see ADR-005).</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setTab('content')} className={tab === 'content' ? 'duo-btn-primary' : 'duo-btn-secondary'}>Content</button>
          <button onClick={() => setTab('analytics')} className={tab === 'analytics' ? 'duo-btn-primary' : 'duo-btn-secondary'}>Analytics</button>
        </div>
      </div>

      {tab === 'content' ? (
        <div className="grid grid-cols-1 md:grid-cols-[260px_280px_1fr] gap-4">
          <aside className="card p-3 h-[calc(100vh-180px)] overflow-auto">
            <div className="text-xs uppercase font-semibold text-sub-light px-2 mb-2">Content tree</div>
            {PATHS.map((p) => (
              <details key={p.slug} open className="mb-2">
                <summary className="cursor-pointer px-2 py-1 hover:bg-slate-50 rounded text-sm font-bold">
                  {p.name}
                </summary>
                <div className="pl-3">
                  {p.units.map((u) => (
                    <details key={u.id} className="my-1">
                      <summary className="cursor-pointer px-2 py-1 hover:bg-slate-50 rounded text-sm">
                        {u.name}
                      </summary>
                      <div className="pl-3">
                        {u.lessons.map((l) => (
                          <details key={l.id}>
                            <summary className="cursor-pointer px-2 py-1 hover:bg-slate-50 rounded text-xs text-sub-light">
                              {l.name}
                            </summary>
                            <div className="pl-3 text-xs">
                              {l.cardIds.map((cid) => (
                                <button
                                  key={cid}
                                  onClick={() => setSelectedCardId(cid)}
                                  className={`block w-full text-left px-2 py-1 rounded hover:bg-slate-50 ${
                                    selectedCardId === cid ? 'bg-brand/10 text-brand' : ''
                                  }`}
                                >
                                  {cid}
                                </button>
                              ))}
                            </div>
                          </details>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </details>
            ))}
          </aside>

          <aside className="card p-3 h-[calc(100vh-180px)] overflow-auto">
            <div className="text-xs uppercase font-semibold text-sub-light px-2 mb-2">All cards</div>
            {Object.values(CARDS_BY_ID).map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCardId(c.id)}
                className={`w-full text-left px-2 py-2 rounded text-xs hover:bg-slate-50 ${
                  selectedCardId === c.id ? 'bg-brand/10 text-brand' : ''
                }`}
              >
                <div className="font-mono">{c.id}</div>
                <div className="text-sub-light line-clamp-1">{c.prompt}</div>
                <div className="flex gap-1 mt-1">
                  <FunctionChip fn={c.function} />
                  <span className="pill bg-slate-100 text-sub-light">{c.type}</span>
                </div>
              </button>
            ))}
          </aside>

          <section className="card p-5 h-[calc(100vh-180px)] overflow-auto">
            {selected ? (
              <CardEditor
                card={selected}
                override={override}
                status={status}
                onChange={(patch) => update(selected.id, patch)}
              />
            ) : (
              <div className="text-sub-light text-sm">Select a card to edit.</div>
            )}
          </section>
        </div>
      ) : (
        <Analytics />
      )}
    </div>
  )
}

function CardEditor({ card, override, status, onChange }: { card: Card; override: any; status: Status; onChange: (p: any) => void }) {
  const effectivePrompt = override.prompt ?? card.prompt
  const effectiveExplanation = override.explanation ?? card.explanation
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs text-sub-light font-mono">{card.id}</div>
          <div className="flex items-center gap-2 mt-1">
            <FunctionChip fn={card.function} />
            <span className="pill bg-slate-100 text-sub-light">{card.type}</span>
            <span className="pill bg-slate-100 text-sub-light">difficulty {card.difficulty}</span>
            <StatusPill status={status} />
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onChange({ status: 'review' })} className="duo-btn-secondary">Submit for review</button>
          <button onClick={() => onChange({ status: 'published' })} className="duo-btn-primary">Publish</button>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <label className="text-xs uppercase font-semibold text-sub-light">Prompt</label>
          <textarea
            value={effectivePrompt}
            onChange={(e) => onChange({ prompt: e.target.value })}
            rows={3}
            className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-md focus:border-brand focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs uppercase font-semibold text-sub-light">Explanation</label>
          <textarea
            value={effectiveExplanation}
            onChange={(e) => onChange({ explanation: e.target.value })}
            rows={4}
            className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-md focus:border-brand focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs uppercase font-semibold text-sub-light">Metric slugs</label>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {card.metricSlugs.length === 0 && <span className="text-xs text-sub-light">— none —</span>}
            {card.metricSlugs.map((m) => (
              <span key={m} className="pill bg-slate-100 text-sub-light font-mono">{m}</span>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs uppercase font-semibold text-sub-light">Live preview</label>
          <div className="card p-4 mt-1 bg-surface-light">
            <p className="text-[15px] leading-6">{effectivePrompt}</p>
            <p className="text-xs text-sub-light mt-3">{effectiveExplanation}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusPill({ status }: { status: Status }) {
  const map: Record<Status, string> = {
    draft: 'bg-slate-100 text-sub-light',
    review: 'bg-streak/10 text-streak',
    published: 'bg-correct/10 text-correct'
  }
  return <span className={`pill ${map[status]}`}>{status}</span>
}

function Analytics() {
  const events = useMemo(() => getEvents(), [])
  const completed = events.filter((e) => e.name === 'lesson_completed').length
  const answered = events.filter((e) => e.name === 'card_answered')
  const accuracy =
    answered.length === 0 ? 0 : Math.round((answered.filter((e) => e.params.is_correct).length / answered.length) * 100)
  const cardStats: Record<string, { c: number; t: number }> = {}
  answered.forEach((e) => {
    const id = e.params.card_id as string
    cardStats[id] = cardStats[id] || { c: 0, t: 0 }
    cardStats[id].t++
    if (e.params.is_correct) cardStats[id].c++
  })
  const worst = Object.entries(cardStats)
    .map(([id, s]) => ({ id, acc: s.c / s.t, attempts: s.t }))
    .filter((x) => x.attempts >= 1)
    .sort((a, b) => a.acc - b.acc)
    .slice(0, 8)

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        <KPI label="Lessons completed (session)" value={String(completed)} />
        <KPI label="Cards answered" value={String(answered.length)} />
        <KPI label="Accuracy" value={`${accuracy}%`} />
        <KPI label="Events logged" value={String(events.length)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-5">
          <h2 className="font-bold mb-3">Cards with lowest accuracy</h2>
          {worst.length === 0 ? (
            <p className="text-sub-light text-sm">No card attempts yet in this session.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-sub-light">
                <tr>
                  <th className="text-left py-1">Card</th>
                  <th className="text-right py-1">Attempts</th>
                  <th className="text-right py-1">Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {worst.map((w) => (
                  <tr key={w.id} className="border-t border-slate-100">
                    <td className="py-1.5 font-mono text-xs">{w.id}</td>
                    <td className="py-1.5 text-right">{w.attempts}</td>
                    <td className={`py-1.5 text-right ${w.acc < 0.5 ? 'text-incorrect' : 'text-sub-light'}`}>
                      {Math.round(w.acc * 100)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="card p-5">
          <h2 className="font-bold mb-3">Event stream (last 12)</h2>
          <div className="space-y-1.5 text-xs font-mono">
            {events
              .slice(-12)
              .reverse()
              .map((e, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-sub-light">{new Date(e.ts).toLocaleTimeString()}</span>
                  <span className="text-brand">{e.name}</span>
                  <span className="text-sub-light truncate">{JSON.stringify(e.params).slice(0, 60)}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function KPI({ label, value }: { label: string; value: string }) {
  return (
    <div className="card p-4">
      <div className="text-xs text-sub-light">{label}</div>
      <div className="text-2xl font-extrabold mt-1">{value}</div>
    </div>
  )
}
