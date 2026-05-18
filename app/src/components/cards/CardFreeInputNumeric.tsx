import { useState } from 'react'
import { FreeInputNumericCard } from '../../types'

function parseNum(raw: string): number | null {
  const cleaned = raw.replace(/[$,\s]/g, '').replace(/%$/, '')
  if (!cleaned) return null
  const v = Number(cleaned)
  return isNaN(v) ? null : v
}

export function CardFreeInputNumeric({
  card,
  onSubmit,
  disabled
}: {
  card: FreeInputNumericCard
  onSubmit: (isCorrect: boolean, answer: unknown) => void
  disabled?: boolean
}) {
  const [value, setValue] = useState('')
  const tol = card.tolerance ?? 0.02

  function check() {
    let v = parseNum(value)
    if (v === null) {
      onSubmit(false, value)
      return
    }
    let target = card.answer
    if (card.unit === '%' && v <= 1 && target > 1) v = v * 100
    if (card.unit === '%' && v > 1 && target <= 1) target = target * 100
    const ok = Math.abs(v - target) <= Math.max(0.01, Math.abs(target) * tol)
    onSubmit(ok, value)
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[22px] md:text-2xl font-black leading-snug">{card.prompt}</h2>
      <div className="surface px-5 py-6">
        <label className="text-[10px] uppercase tracking-wider text-fgmuted font-bold">Your answer</label>
        <div className="mt-2 flex items-center gap-2">
          {card.unit === '$' && <span className="text-3xl font-mono font-black">$</span>}
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={disabled}
            inputMode="decimal"
            placeholder="0.00"
            className="flex-1 font-mono text-3xl font-black px-3 py-2 border-b-4 border-violet-500 focus:outline-none placeholder:text-fgsubtle"
          />
          {card.unit && card.unit !== '$' && <span className="text-3xl font-mono font-black">{card.unit}</span>}
        </div>
        <p className="text-xs text-fgmuted mt-3">Within {Math.round(tol * 100)}% tolerance. Accepts decimal or percentage form.</p>
      </div>
      <button onClick={check} disabled={!value || disabled} className="duo-btn-primary w-full">Check</button>
    </div>
  )
}
