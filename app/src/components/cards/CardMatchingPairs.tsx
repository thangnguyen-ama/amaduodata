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

interface RightSlot {
  id: string  // stable per-slot id (so duplicate text values don't collide)
  text: string
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
  // Track right items by index — text alone collides when 2 pairs share a right value
  // (e.g. "Cohort" appears twice). Each slot keeps its own id so used/freed state
  // is local to that slot.
  const lefts = useMemo(() => shuffle(card.pairs.map((p) => p.left)), [card.id])
  const rightSlots = useMemo<RightSlot[]>(
    () => shuffle(card.pairs.map((p, i) => ({ id: `r${i}`, text: p.right }))),
    [card.id]
  )

  const [pickedLeft, setPickedLeft] = useState<string | null>(null)
  // left text -> right slot id
  const [pairs, setPairs] = useState<Record<string, string>>({})

  function rightSlotFor(left: string): RightSlot | undefined {
    const id = pairs[left]
    return id ? rightSlots.find((s) => s.id === id) : undefined
  }

  function selectLeft(l: string) {
    if (pairs[l]) {
      // unpair: only frees this specific right slot, not other slots with same text
      const next = { ...pairs }
      delete next[l]
      setPairs(next)
      return
    }
    setPickedLeft(l)
  }

  function selectRight(slot: RightSlot) {
    if (!pickedLeft) return
    // is this slot already used?
    if (Object.values(pairs).includes(slot.id)) return
    setPairs({ ...pairs, [pickedLeft]: slot.id })
    setPickedLeft(null)
  }

  const usedSlotIds = new Set(Object.values(pairs))
  const complete = Object.keys(pairs).length === card.pairs.length

  function check() {
    const correctRightFor: Record<string, string> = Object.fromEntries(
      card.pairs.map((p) => [p.left, p.right])
    )
    const ok = Object.entries(pairs).every(([left, slotId]) => {
      const slot = rightSlots.find((s) => s.id === slotId)
      return !!slot && correctRightFor[left] === slot.text
    })
    onSubmit(ok, pairs)
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[22px] md:text-2xl font-black leading-snug">{card.prompt}</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2.5">
          {lefts.map((l) => {
            const paired = rightSlotFor(l)
            return (
              <button
                key={l}
                disabled={disabled}
                onClick={() => selectLeft(l)}
                className={`choice-btn ${pickedLeft === l ? 'picked' : paired ? 'correct' : ''}`}
              >
                <div className="text-[14px] font-bold">{l}</div>
                {paired && (
                  <div className="text-[11px] mt-0.5 opacity-70">→ {paired.text}</div>
                )}
              </button>
            )
          })}
        </div>
        <div className="space-y-2.5">
          {rightSlots.map((slot) => {
            const used = usedSlotIds.has(slot.id)
            return (
              <button
                key={slot.id}
                disabled={disabled || used}
                onClick={() => selectRight(slot)}
                className={`choice-btn ${used ? 'opacity-40 line-through' : ''}`}
              >
                <div className="text-[14px] font-bold">{slot.text}</div>
              </button>
            )
          })}
        </div>
      </div>
      <button disabled={!complete || disabled} onClick={check} className="duo-btn-primary w-full">Check</button>
    </div>
  )
}
