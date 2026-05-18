import { useMemo, useState } from 'react'
import { MatchingPairsCard } from '../../types'

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function CardMatchingPairs({
  card,
  onSubmit,
  disabled
}: {
  card: MatchingPairsCard
  onSubmit: (isCorrect: boolean, answer: unknown) => void
  disabled?: boolean
}) {
  const lefts = useMemo(() => shuffle(card.pairs.map((p) => p.left)), [card.id])
  const rights = useMemo(() => shuffle(card.pairs.map((p) => p.right)), [card.id])
  const [pickedLeft, setPickedLeft] = useState<string | null>(null)
  const [pairs, setPairs] = useState<Record<string, string>>({})
  const [usedRights, setUsedRights] = useState<Set<string>>(new Set())

  function selectLeft(l: string) {
    if (pairs[l]) {
      const next = { ...pairs }
      const r = next[l]
      delete next[l]
      const ur = new Set(usedRights)
      ur.delete(r)
      setPairs(next)
      setUsedRights(ur)
      return
    }
    setPickedLeft(l)
  }

  function selectRight(r: string) {
    if (!pickedLeft) return
    if (usedRights.has(r)) return
    const next = { ...pairs, [pickedLeft]: r }
    const ur = new Set(usedRights)
    ur.add(r)
    setPairs(next)
    setUsedRights(ur)
    setPickedLeft(null)
  }

  const complete = Object.keys(pairs).length === card.pairs.length

  function check() {
    const correctMap = Object.fromEntries(card.pairs.map((p) => [p.left, p.right]))
    const ok = Object.entries(pairs).every(([l, r]) => correctMap[l] === r)
    onSubmit(ok, pairs)
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[22px] md:text-2xl font-black leading-snug">{card.prompt}</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2.5">
          {lefts.map((l) => (
            <button
              key={l}
              disabled={disabled}
              onClick={() => selectLeft(l)}
              className={`choice-btn ${pickedLeft === l ? 'picked' : pairs[l] ? 'correct' : ''}`}
            >
              <div className="text-[14px] font-bold">{l}</div>
              {pairs[l] && (
                <div className="text-[11px] mt-0.5 opacity-70">→ {pairs[l]}</div>
              )}
            </button>
          ))}
        </div>
        <div className="space-y-2.5">
          {rights.map((r) => (
            <button
              key={r}
              disabled={disabled || usedRights.has(r)}
              onClick={() => selectRight(r)}
              className={`choice-btn ${
                usedRights.has(r) ? 'opacity-40 line-through' : ''
              }`}
            >
              <div className="text-[14px] font-bold">{r}</div>
            </button>
          ))}
        </div>
      </div>
      <button disabled={!complete || disabled} onClick={check} className="duo-btn-primary w-full">Check</button>
    </div>
  )
}
