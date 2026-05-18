import { useState } from 'react'
import { ScenarioJudgmentCard } from '../../types'

export function CardScenarioJudgment({
  card,
  onSubmit,
  disabled
}: {
  card: ScenarioJudgmentCard
  onSubmit: (isCorrect: boolean, answer: unknown) => void
  disabled?: boolean
}) {
  const [picked, setPicked] = useState<number | null>(null)
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[22px] md:text-2xl font-black leading-snug">{card.prompt}</h2>
      <div className="surface px-4 py-4 border-l-4 border-l-[#1CB0F6] text-[15px] leading-6 text-ink-light">
        {card.scenario}
      </div>
      <div className="space-y-3">
        {card.choices.map((c, i) => (
          <button
            key={i}
            disabled={disabled}
            onClick={() => setPicked(i)}
            className={`choice-btn ${picked === i ? 'picked' : ''}`}
          >
            <span className="flex items-start">
              <span className="keycap mt-0.5">{i + 1}</span>
              <span className="text-[15px] font-bold leading-snug">{c}</span>
            </span>
          </button>
        ))}
      </div>
      <button
        disabled={picked === null || disabled}
        onClick={() => onSubmit(picked === card.answerIndex, picked)}
        className="duo-btn-primary w-full"
      >
        Check
      </button>
    </div>
  )
}
