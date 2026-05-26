import { useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../store'
import { CardRenderer } from '../components/cards/CardRenderer'
import { CARDS_BY_ID } from '../content/cards'
import { PATHS_BY_SLUG } from '../content/paths'

const REQUIRED_CARDS = 4
const PASS_THRESHOLD = 3 // 3/4 = 75%

export function SkipTest() {
  const { pathSlug = '', unitId = '' } = useParams()
  const nav = useNavigate()
  const skipTestUnit = useStore((s) => s.skipTestUnit)

  const path = PATHS_BY_SLUG[pathSlug]
  const unitIndex = path?.units.findIndex((u) => u.id === unitId) ?? -1
  const unit = path?.units[unitIndex]

  const cards = useMemo(() => {
    if (!unit) return []
    const allCardIds = unit.lessons.flatMap((l) => l.cardIds)
    const available = allCardIds.map((id) => CARDS_BY_ID[id]).filter(Boolean)
    const shuffled = [...available].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, REQUIRED_CARDS)
  }, [unit])

  const [cardIndex, setCardIndex] = useState(0)
  const [results, setResults] = useState<boolean[]>([])
  const [feedback, setFeedback] = useState<{ correct: boolean } | null>(null)
  const startTimeRef = useRef<number>(Date.now())

  if (!path || !unit || cards.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-fgmuted">Unit not found or no questions available.</p>
        <button className="duo-btn-secondary mt-4" onClick={() => nav(`/paths/${pathSlug}`)}>Back</button>
      </div>
    )
  }

  const card = cards[cardIndex]
  const isFinal = cardIndex === cards.length - 1
  const isComplete = results.length === cards.length && !feedback

  if (isComplete) {
    const correct = results.filter(Boolean).length
    const passed = correct >= PASS_THRESHOLD

    if (passed) {
      skipTestUnit(pathSlug, unitIndex)
    }

    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-violet-900/40 to-bg-0">
        <div className="flex-1 grid place-items-center p-6">
          <div className="text-center max-w-md w-full animate-burst">
            <div className="text-7xl mb-4">{passed ? '🎉' : '📚'}</div>
            <h1 className="text-3xl font-black">
              {passed ? 'Unit unlocked!' : 'Not quite yet'}
            </h1>
            <p className="text-fgmuted mt-2 mb-6 leading-6">
              {passed
                ? `You got ${correct}/${cards.length} correct. Unit "${unit.name}" and all prior units are now unlocked!`
                : `You got ${correct}/${cards.length} correct. You need at least ${PASS_THRESHOLD}/${REQUIRED_CARDS} to skip. Complete the previous units first.`
              }
            </p>
            <div className="flex flex-col gap-3">
              <button
                className={passed ? 'duo-btn-success w-full' : 'duo-btn-primary w-full'}
                onClick={() => nav(`/paths/${pathSlug}`)}
              >
                {passed ? 'Continue learning' : 'Back to path'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function handleSubmit(isCorrect: boolean) {
    if (feedback) return
    setResults((rs) => [...rs, isCorrect])
    setFeedback({ correct: isCorrect })
  }

  function next() {
    setFeedback(null)
    startTimeRef.current = Date.now()
    if (!isFinal) {
      setCardIndex((i) => i + 1)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-1">
      <header className="pad-safe-top border-b border-line bg-bg-1 sticky top-0 z-30">
        <div className="max-w-2xl mx-auto flex items-center gap-3 px-4 md:px-6 py-3">
          <button
            aria-label="Cancel skip test"
            type="button"
            onClick={() => nav(`/paths/${pathSlug}`)}
            className="w-11 h-11 -ml-2 grid place-items-center text-fgmuted hover:text-fg rounded-full hover:bg-bg-2 text-lg"
          >✕</button>
          <div className="flex-1">
            <div className="text-xs font-bold text-fgmuted uppercase tracking-wider mb-1">
              Skip Test · {unit.name}
            </div>
            <div className="h-3 bg-bg-2 rounded-full overflow-hidden flex">
              {cards.map((_, i) => (
                <span
                  key={i}
                  className={`flex-1 transition-all ${
                    i < cardIndex
                      ? results[i] ? 'bg-green-500' : 'bg-magic-500'
                      : i === cardIndex && feedback
                      ? feedback.correct ? 'bg-green-500' : 'bg-magic-500'
                      : i === cardIndex
                      ? 'bg-violet-500'
                      : 'bg-transparent'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="stat-pill bg-violet-500/20 text-violet-400">
            <span>{cardIndex + 1}/{cards.length}</span>
          </div>
        </div>
      </header>

      <div className="flex-1 px-4 md:px-6 py-6 pb-40 md:pb-32">
        <div className="max-w-2xl mx-auto">
          <CardRenderer card={card} onSubmit={handleSubmit} disabled={!!feedback} />
        </div>
      </div>

      {feedback && (
        <div
          className={`fixed inset-x-0 bottom-0 z-30 pad-safe-bottom animate-slide-up ${
            feedback.correct ? 'bg-green-500/20' : 'bg-magic-500/20'
          }`}
        >
          <div className="max-w-2xl mx-auto px-5 py-5">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full grid place-items-center flex-shrink-0 ${feedback.correct ? 'bg-green-500' : 'bg-magic-500'}`}>
                <span className="text-white text-xl font-black">{feedback.correct ? '✓' : '✕'}</span>
              </div>
              <div className="flex-1">
                <div className={`text-lg font-black ${feedback.correct ? 'text-green-400' : 'text-magic-300'}`}>
                  {feedback.correct ? 'Correct!' : 'Incorrect'}
                </div>
                <p className={`text-sm mt-0.5 ${feedback.correct ? 'text-green-400/80' : 'text-magic-300/80'}`}>
                  {card.explanation}
                </p>
              </div>
            </div>
            <button
              onClick={next}
              className={`w-full mt-4 ${feedback.correct ? 'duo-btn-success' : 'duo-btn-danger'}`}
              autoFocus
            >
              {isFinal ? 'See results' : 'Next'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
