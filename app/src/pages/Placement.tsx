import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import { CardRenderer } from '../components/cards/CardRenderer'
import { CARDS_BY_ID } from '../content/cards'
import { PATHS, PLACEMENT_DECK } from '../content/paths'
import { track } from '../lib/track'

export function Placement() {
  const role = useStore((s) => s.user?.role)
  const savePlacement = useStore((s) => s.savePlacement)
  const nav = useNavigate()
  const [i, setI] = useState(0)
  const [results, setResults] = useState<{ pathSlug: string; correct: boolean }[]>([])
  const [done, setDone] = useState(false)
  const [showFeedback, setShowFeedback] = useState<{ correct: boolean } | null>(null)

  // Slight ordering by role: surface the user's home function first
  const deck = useMemo(() => {
    const order = (() => {
      if (role === 'UA' || role === 'CRE') return ['ua-101', 'cross-functional', 'product-101']
      if (role === 'PO' || role === 'GD' || role === 'LD' || role === 'MS') return ['product-101', 'ua-101', 'cross-functional']
      if (role === 'DA') return ['cross-functional', 'product-101', 'ua-101']
      return ['product-101', 'ua-101', 'cross-functional']
    })()
    return PLACEMENT_DECK.slice().sort(
      (a, b) => order.indexOf(a.pathSlug) - order.indexOf(b.pathSlug)
    )
  }, [role])

  function onSubmit(isCorrect: boolean) {
    setShowFeedback({ correct: isCorrect })
    setResults((rs) => [...rs, { pathSlug: deck[i].pathSlug, correct: isCorrect }])
    track('placement_quiz_card_answered', { card_id: deck[i].cardId, is_correct: isCorrect })
  }

  function next() {
    setShowFeedback(null)
    if (i + 1 >= deck.length) {
      // compute placement
      const tally: Record<string, { c: number; t: number }> = {}
      const r2 = [...results, ...(showFeedback ? [{ pathSlug: deck[i].pathSlug, correct: showFeedback.correct }] : [])]
      r2.forEach((r) => {
        if (!tally[r.pathSlug]) tally[r.pathSlug] = { c: 0, t: 0 }
        tally[r.pathSlug].t++
        if (r.correct) tally[r.pathSlug].c++
      })
      const pathStarts: Record<string, number> = {}
      PATHS.forEach((p) => {
        const t = tally[p.slug] || { c: 0, t: 0 }
        const ratio = t.t ? t.c / t.t : 0
        const maxStart = Math.max(0, p.units.length - 1)
        const unitIdx = Math.min(maxStart, Math.round(ratio * p.units.length))
        pathStarts[p.slug] = unitIdx
      })
      const totalCorrect = r2.filter((r) => r.correct).length
      savePlacement({
        takenAt: Date.now(),
        pathStarts,
        rawScore: totalCorrect / deck.length
      })
      setDone(true)
      return
    }
    setI(i + 1)
  }

  if (done) {
    const placement = useStore.getState().placement
    return (
      <div className="min-h-screen bg-bg-0 p-6">
        <div className="max-w-2xl mx-auto pt-10">
          <h1 className="text-2xl font-extrabold mb-2">Here's where we'll start you</h1>
          <p className="text-fgmuted mb-6">We won't waste your time on units you already know. You can review them anytime.</p>
          <div className="space-y-3">
            {PATHS.map((p) => {
              const start = placement?.pathStarts[p.slug] ?? 0
              return (
                <div key={p.slug} className="card p-4 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center chip-${p.function} text-2xl`}>
                    {p.function === 'product' ? '📐' : p.function === 'ua' ? '📣' : '🔗'}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">{p.name}</div>
                    <div className="text-sm text-fgmuted">{p.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-fgmuted">Starting at</div>
                    <div className="font-bold">Unit {start + 1} / {p.units.length}</div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex justify-end mt-8">
            <button className="duo-btn-primary" onClick={() => nav('/home')}>Start learning</button>
          </div>
        </div>
      </div>
    )
  }

  const card = CARDS_BY_ID[deck[i].cardId]
  if (!card) return null

  return (
    <div className="min-h-screen bg-bg-0">
      <header className="pad-safe-top border-b border-line bg-bg-1 sticky top-0 z-30">
        <div className="h-14 flex items-center px-4 md:px-6 max-w-2xl mx-auto">
          <button
            aria-label="Skip placement"
            type="button"
            onClick={() => nav('/home')}
            className="w-11 h-11 -ml-2 grid place-items-center text-fgmuted hover:text-fg rounded-full hover:bg-bg-2 text-lg"
          >✕</button>
          <div className="flex-1 mx-3">
            <div className="h-2 bg-bg-2 rounded-full overflow-hidden">
              <div className="h-full bg-violet-500 transition-all" style={{ width: `${((i + (showFeedback ? 1 : 0)) / deck.length) * 100}%` }} />
            </div>
          </div>
          <div className="text-xs text-fgmuted font-mono">{i + 1} / {deck.length}</div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-6">
        <div className="text-xs uppercase text-fgmuted font-semibold mb-2">Placement quiz · no hearts, no XP</div>
        <div className="card p-6">
          <CardRenderer card={card} onSubmit={(ok) => onSubmit(ok)} disabled={!!showFeedback} />
        </div>

        {showFeedback && (
          <div className="mt-4">
            <div className={`card p-4 ${showFeedback.correct ? 'border-correct/30 bg-correct/5' : 'border-incorrect/30 bg-incorrect/5'}`}>
              <div className={`font-bold ${showFeedback.correct ? 'text-correct' : 'text-incorrect'}`}>
                {showFeedback.correct ? 'Correct.' : 'Not quite — that\'s fine, we\'ll calibrate.'}
              </div>
              <p className="text-sm text-fg mt-1">{card.explanation}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="duo-btn-primary" onClick={next}>Continue</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
