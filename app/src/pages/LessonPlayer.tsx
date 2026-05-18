import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../store'
import { CardRenderer } from '../components/cards/CardRenderer'
import { CARDS_BY_ID } from '../content/cards'
import { PATHS_BY_SLUG } from '../content/paths'

interface Result {
  cardId: string
  correct: boolean
}

export function LessonPlayer() {
  const { pathSlug = '', unitId = '', lessonId = '' } = useParams()
  const nav = useNavigate()
  const startLesson = useStore((s) => s.startLesson)
  const completeLesson = useStore((s) => s.completeLesson)
  const markLessonComplete = useStore((s) => s.markLessonComplete)
  const unlockNextUnit = useStore((s) => s.unlockNextUnit)
  const recordCard = useStore((s) => s.recordCardAttempt)
  const loseHeart = useStore((s) => s.loseHeart)
  const refillHearts = useStore((s) => s.refillHearts)
  const awardXp = useStore((s) => s.awardXp)
  const heartsState = useStore((s) => s.hearts)

  const path = PATHS_BY_SLUG[pathSlug]
  const unit = path?.units.find((u) => u.id === unitId)
  const unitIndex = path?.units.findIndex((u) => u.id === unitId) ?? -1
  const lesson = unit?.lessons.find((l) => l.id === lessonId)

  const attemptIdRef = useRef<string | null>(null)
  useEffect(() => {
    if (lesson && !attemptIdRef.current) {
      attemptIdRef.current = startLesson(pathSlug, unitId, lessonId)
    }
  }, [lesson, pathSlug, unitId, lessonId, startLesson])

  const [cardIndex, setCardIndex] = useState(0)
  const [results, setResults] = useState<Result[]>([])
  const [feedback, setFeedback] = useState<{ correct: boolean } | null>(null)
  const [xpThisLesson, setXpThisLesson] = useState(0)
  const [xpBurst, setXpBurst] = useState<number | null>(null)
  const [shake, setShake] = useState(false)
  const [outOfHearts, setOutOfHearts] = useState(false)
  const [exitConfirm, setExitConfirm] = useState(false)
  const startTimeRef = useRef<number>(Date.now())

  const cards = useMemo(() => (lesson?.cardIds || []).map((id) => CARDS_BY_ID[id]).filter(Boolean), [lesson])

  if (!path || !unit || !lesson) {
    return (
      <div className="p-8">
        <p>Lesson not found.</p>
        <button className="duo-btn-secondary mt-3" onClick={() => nav('/home')}>Home</button>
      </div>
    )
  }

  const card = cards[cardIndex]
  const isFinal = cardIndex === cards.length - 1

  function handleSubmit(isCorrect: boolean) {
    if (feedback) return
    const time = Date.now() - startTimeRef.current
    recordCard(card.id, isCorrect, time)
    if (isCorrect) {
      const earned = card.xpReward
      setXpThisLesson((x) => x + earned)
      awardXp(earned, `lesson:${lessonId}`)
      setXpBurst(earned)
      setTimeout(() => setXpBurst(null), 800)
    } else {
      const remaining = loseHeart()
      setShake(true)
      setTimeout(() => setShake(false), 420)
      if (!remaining && heartsState.count <= 1) {
        setOutOfHearts(true)
      }
    }
    setResults((rs) => [...rs, { cardId: card.id, correct: isCorrect }])
    setFeedback({ correct: isCorrect })
  }

  function next() {
    setFeedback(null)
    startTimeRef.current = Date.now()
    if (isFinal) {
      const correct = results.filter((r) => r.correct).length
      const wrong = results.filter((r) => !r.correct).length
      if (attemptIdRef.current) {
        completeLesson(attemptIdRef.current, {
          xpEarned: xpThisLesson,
          cardsCorrect: correct,
          cardsWrong: wrong
        })
      }
      markLessonComplete(pathSlug, unitId, lessonId)
      if (unitIndex >= 0 && unitIndex < path.units.length - 1) {
        unlockNextUnit(pathSlug, unitIndex)
      }
      return
    }
    setCardIndex((i) => i + 1)
  }

  // End screen with confetti
  if (isFinal && !feedback && results.length === cards.length) {
    const correct = results.filter((r) => r.correct).length
    const accuracy = Math.round((correct / cards.length) * 100)
    const perfect = correct === cards.length
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FFF8DC] to-white relative overflow-hidden">
        <Confetti />
        <div className="flex-1 grid place-items-center p-6 relative z-10">
          <div className="text-center max-w-md w-full animate-burst">
            <div className="text-7xl mb-2">{perfect ? '🏆' : '🎉'}</div>
            <h1 className="text-3xl font-black">{perfect ? 'Perfect lesson!' : 'Lesson complete!'}</h1>
            <p className="text-sub-light text-sm mt-1 mb-8">{lesson.name}</p>
            <div className="grid grid-cols-3 gap-3 mb-8">
              <BigStat icon="⚡" label="Total XP" value={`+${xpThisLesson}`} tint="#1570EF" tintBg="#DDEBFF" />
              <BigStat icon="🎯" label="Accuracy" value={`${accuracy}%`} tint="#19a06b" tintBg="#D7FFB8" />
              <BigStat icon="❤" label="Hearts" value={`${useStore.getState().hearts.count}/5`} tint="#E92C2C" tintBg="#FFDFE0" />
            </div>
            <div className="flex flex-col gap-3">
              <button className="duo-btn-success w-full" onClick={() => nav(`/paths/${pathSlug}`)}>
                Continue
              </button>
              {!perfect && (
                <button className="duo-btn-secondary w-full" onClick={() => nav('/practice')}>
                  Practice mistakes ({results.filter((r) => !r.correct).length})
                </button>
              )}
              <button className="duo-btn-ghost" onClick={() => nav('/home')}>Home</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (outOfHearts) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFE4E4] to-white grid place-items-center p-6">
        <div className="text-center max-w-sm w-full animate-burst">
          <div className="text-7xl mb-2">💔</div>
          <h1 className="text-3xl font-black">Out of hearts</h1>
          <p className="text-sub-light text-sm mt-1 mb-8 px-2 leading-6">Refill by practicing past cards, or wait — one heart regenerates every 30 minutes.</p>
          <div className="flex flex-col gap-3">
            <button className="duo-btn-primary w-full" onClick={() => nav('/practice')}>Practice to refill</button>
            <button
              className="duo-btn-secondary w-full"
              onClick={() => {
                refillHearts(1)
                setOutOfHearts(false)
              }}
            >Use 1 freeze (demo)</button>
            <button className="duo-btn-ghost" onClick={() => nav('/home')}>Wait it out</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Lesson header */}
      <header className="pad-safe-top px-4 md:px-6 pt-3 pb-2 border-b border-slate-100">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            aria-label="Exit lesson"
            onClick={() => setExitConfirm(true)}
            className="w-9 h-9 grid place-items-center text-sub-light hover:text-ink-light rounded-full hover:bg-slate-100"
          >✕</button>
          <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden flex">
            {cards.map((_, i) => (
              <span
                key={i}
                className={`flex-1 transition-all ${
                  i < cardIndex
                    ? results[i]?.correct ? 'bg-[#58CC02]' : 'bg-[#FF4B4B]'
                    : i === cardIndex && feedback
                    ? feedback.correct ? 'bg-[#58CC02]' : 'bg-[#FF4B4B]'
                    : i === cardIndex
                    ? 'bg-[#1CB0F6]'
                    : 'bg-transparent'
                }`}
              />
            ))}
          </div>
          <div className={`stat-pill bg-[#FFE5E5] text-[#FF4B4B] ${shake ? 'animate-shake' : ''}`}>
            <span>❤</span>
            <span className="display-num">{heartsState.count}</span>
          </div>
        </div>
      </header>

      {/* Card body */}
      <div className="flex-1 px-4 md:px-6 py-6 pb-40 md:pb-32">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-[11px] uppercase tracking-wider font-bold text-sub-light mb-3">
            {path.name} · {unit.name}
          </h2>
          <div className="relative">
            <CardRenderer card={card} onSubmit={(ok) => handleSubmit(ok)} disabled={!!feedback} />
            {xpBurst !== null && (
              <div className="absolute -top-2 right-0 stat-pill bg-[#DDEBFF] text-[#1570EF] animate-burst font-black">
                <span>⚡</span><span>+{xpBurst}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom slide-up feedback drawer */}
      {feedback && (
        <div
          className={`fixed inset-x-0 bottom-0 z-30 pad-safe-bottom animate-slide-up ${
            feedback.correct ? 'bg-[#D7FFB8]' : 'bg-[#FFDFE0]'
          }`}
        >
          <div className="max-w-2xl mx-auto px-5 py-5 md:py-6">
            <div className="flex items-start gap-3">
              <div
                className={`w-12 h-12 rounded-full grid place-items-center flex-shrink-0 ${
                  feedback.correct ? 'bg-[#58CC02]' : 'bg-[#FF4B4B]'
                }`}
              >
                <span className="text-white text-2xl font-black">{feedback.correct ? '✓' : '✕'}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-xl font-black ${feedback.correct ? 'text-[#2D7A0E]' : 'text-[#BC2A2A]'}`}>
                  {feedback.correct ? 'Nice!' : 'Correct answer:'}
                </div>
                {!feedback.correct && (
                  <div className="text-[#BC2A2A] font-bold text-base mb-1 mt-0.5 leading-snug">
                    {canonicalAnswerLabel(card)}
                  </div>
                )}
                <p className={`text-sm leading-6 mt-1 ${feedback.correct ? 'text-[#2D7A0E]' : 'text-[#BC2A2A]'}`}>
                  {card.explanation}
                </p>
                {card.metricSlugs.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {card.metricSlugs.map((m) => (
                      <span key={m} className="pill bg-white/60 text-ink-light/70">{m}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={next}
                className={`w-full ${feedback.correct ? 'duo-btn-success' : 'duo-btn-danger'}`}
                autoFocus
              >
                {isFinal ? 'Finish' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* (Cards render their own full-width CHECK button at the bottom.) */}

      {/* Exit confirm modal */}
      {exitConfirm && (
        <div className="fixed inset-0 z-40 bg-black/40 grid place-items-end md:place-items-center p-4 animate-burst">
          <div className="surface w-full max-w-sm p-6 animate-slide-up">
            <h3 className="text-xl font-black">Leave the lesson?</h3>
            <p className="text-sub-light text-sm mt-1 leading-6">You'll lose progress on this lesson, but your XP earned so far stays.</p>
            <div className="flex flex-col gap-2 mt-5">
              <button className="duo-btn-danger w-full" onClick={() => nav('/home')}>Leave</button>
              <button className="duo-btn-secondary w-full" onClick={() => setExitConfirm(false)}>Keep learning</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function BigStat({ icon, label, value, tint, tintBg }: { icon: string; label: string; value: string; tint: string; tintBg: string }) {
  return (
    <div className="surface p-3 text-center">
      <div className="text-xl">{icon}</div>
      <div className="display-num text-xl mt-1" style={{ color: tint }}>{value}</div>
      <div className="text-[10px] uppercase font-bold tracking-wider mt-0.5" style={{ color: tint, background: tintBg, padding: '2px 6px', borderRadius: 99, display: 'inline-block' }}>{label}</div>
    </div>
  )
}

function canonicalAnswerLabel(card: any): string {
  switch (card.type) {
    case 'multiple_choice':
    case 'scenario_judgment':
      return card.choices[card.answerIndex]
    case 'formula_completion':
      return card.answer
    case 'free_input_numeric':
      return `${card.answer}${card.unit ? ' ' + card.unit : ''}`
    case 'drag_to_order':
      return card.correctOrder.join(' → ')
    case 'matching_pairs':
      return card.pairs.map((p: any) => `${p.left}→${p.right}`).join(', ')
    default:
      return ''
  }
}

function Confetti() {
  const colors = ['#58CC02', '#1CB0F6', '#FFC800', '#FF4B4B', '#CE82FF', '#EC4899']
  const pieces = Array.from({ length: 36 }).map((_, i) => {
    const left = (i / 36) * 100 + Math.random() * 4 - 2
    const delay = Math.random() * 0.8
    const dur = 1.8 + Math.random() * 1.4
    const color = colors[i % colors.length]
    return (
      <span
        key={i}
        className="absolute top-0 w-2 h-3 rounded-sm"
        style={{
          left: `${left}%`,
          background: color,
          animation: `confetti-fall ${dur}s ease-in ${delay}s 1 forwards`
        }}
      />
    )
  })
  return <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">{pieces}</div>
}
