import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import { CardRenderer } from '../components/cards/CardRenderer'
import { CARDS_BY_ID } from '../content/cards'

export function Practice() {
  const queue = useStore((s) => s.practiceQueue)
  const review = useStore((s) => s.reviewPractice)
  const refill = useStore((s) => s.refillHearts)
  const nav = useNavigate()

  const due = queue.filter((p) => p.dueAt <= Date.now()).slice(0, 12)
  const [i, setI] = useState(0)
  const [feedback, setFeedback] = useState<{ correct: boolean } | null>(null)
  const [stats, setStats] = useState({ correct: 0, total: 0 })

  if (due.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-extrabold mb-2">Practice</h1>
        <div className="card p-8 text-center">
          <div className="text-4xl mb-3">🎯</div>
          <p className="font-bold">Nothing to review right now.</p>
          <p className="text-sub-light text-sm mt-1">Cards you get wrong in lessons land here. Come back after a lesson.</p>
          <button className="duo-btn-primary mt-6" onClick={() => nav('/paths')}>Go to paths</button>
        </div>
      </div>
    )
  }

  const item = due[i]
  const card = CARDS_BY_ID[item.cardId]

  if (!card) {
    return <div className="p-6">Card removed from library — skipping…</div>
  }

  function submit(isCorrect: boolean) {
    review(item.cardId, isCorrect)
    setFeedback({ correct: isCorrect })
    setStats((s) => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }))
  }

  function next() {
    setFeedback(null)
    if (i + 1 >= due.length) {
      // session complete — refill 1 heart
      refill(1)
      return nav('/home')
    }
    setI(i + 1)
  }

  return (
    <div className="min-h-screen bg-surface-light">
      <header className="h-14 flex items-center px-4 md:px-6 border-b border-slate-200 bg-white">
        <button className="duo-btn-ghost" onClick={() => nav('/home')}>✕</button>
        <div className="flex-1 mx-4">
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-brand" style={{ width: `${(i / due.length) * 100}%` }} />
          </div>
        </div>
        <span className="text-xs text-sub-light font-mono">{i + 1} / {due.length}</span>
      </header>

      <div className="max-w-2xl mx-auto p-6">
        <div className="text-xs uppercase text-sub-light font-semibold mb-2">Practice · spaced repetition</div>
        <div className="card p-6">
          <CardRenderer card={card} onSubmit={submit} disabled={!!feedback} />
        </div>
        {feedback && (
          <div className="mt-4">
            <div className={`card p-4 ${feedback.correct ? 'border-correct/30 bg-correct/5' : 'border-incorrect/30 bg-incorrect/5'}`}>
              <div className={`font-bold ${feedback.correct ? 'text-correct' : 'text-incorrect'}`}>
                {feedback.correct ? '✓ Correct' : '✕ Got it again — we\'ll show this one sooner'}
              </div>
              <p className="text-sm text-ink-light mt-1">{card.explanation}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="duo-btn-primary" onClick={next}>{i + 1 >= due.length ? 'Finish (+1 ❤)' : 'Next'}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
