import { useState } from 'react'
import { FormulaCompletionCard } from '../../types'

export function CardFormulaCompletion({
  card,
  onSubmit,
  disabled
}: {
  card: FormulaCompletionCard
  onSubmit: (isCorrect: boolean, answer: unknown) => void
  disabled?: boolean
}) {
  const [value, setValue] = useState('')

  function check() {
    const cleaned = value.trim().toLowerCase()
    const ok =
      cleaned === card.answer.toLowerCase() ||
      (card.acceptedAlternatives || []).some((a) => a.toLowerCase() === cleaned)
    onSubmit(ok, value)
  }

  const parts = card.formulaTemplate.split('___')
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[22px] md:text-2xl font-black leading-snug">{card.prompt}</h2>
      <div className="surface px-5 py-5">
        <div className="font-mono text-lg flex flex-wrap items-center gap-1.5 leading-9">
          <span className="text-ink-light">{parts[0]}</span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={disabled}
            placeholder="?"
            className="font-mono inline-block min-w-[140px] px-3 py-2 border-2 border-dashed border-[#1CB0F6] bg-[#DDF4FF]/40 rounded-md text-[#1899D6] font-bold focus:outline-none focus:border-solid"
          />
          <span className="text-ink-light">{parts[1] || ''}</span>
        </div>
      </div>
      <button
        onClick={check}
        disabled={!value.trim() || disabled}
        className="duo-btn-primary w-full"
      >
        Check
      </button>
    </div>
  )
}
