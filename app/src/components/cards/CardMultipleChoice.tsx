import { useState } from 'react'
import { MultipleChoiceCard } from '../../types'

export function CardMultipleChoice({
  card,
  onSubmit,
  disabled
}: {
  card: MultipleChoiceCard
  onSubmit: (isCorrect: boolean, answer: unknown) => void
  disabled?: boolean
}) {
  const [picked, setPicked] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[22px] md:text-2xl font-black leading-snug">{card.prompt}</h2>
      <div className="space-y-3">
        {card.choices.map((c, i) => (
          <button
            key={i}
            disabled={disabled}
            onClick={() => setPicked(i)}
            className={`choice-btn ${picked === i ? 'picked' : ''}`}
          >
            <span className="flex items-center">
              <span className="keycap">{i + 1}</span>
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
