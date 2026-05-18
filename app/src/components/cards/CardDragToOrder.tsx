import { useMemo, useState } from 'react'
import { DragToOrderCard } from '../../types'

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function CardDragToOrder({
  card,
  onSubmit,
  disabled
}: {
  card: DragToOrderCard
  onSubmit: (isCorrect: boolean, answer: unknown) => void
  disabled?: boolean
}) {
  const [items, setItems] = useState(() => shuffle(card.items))
  const initial = useMemo(() => items.slice(), [])

  function move(i: number, dir: -1 | 1) {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const next = items.slice()
    ;[next[i], next[j]] = [next[j], next[i]]
    setItems(next)
  }

  function check() {
    const ok = items.every((it, i) => it === card.correctOrder[i])
    onSubmit(ok, items)
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[22px] md:text-2xl font-black leading-snug">{card.prompt}</h2>
      <ol className="space-y-3">
        {items.map((it, i) => (
          <li
            key={initial[i] + i}
            className="choice-btn flex items-center"
          >
            <span className="keycap" style={{ background: '#FFC800', color: '#7A5A00', borderColor: '#FFC800' }}>{i + 1}</span>
            <span className="flex-1 font-bold text-[15px]">{it}</span>
            <button
              disabled={disabled || i === 0}
              onClick={() => move(i, -1)}
              aria-label="Move up"
              className="w-9 h-9 grid place-items-center rounded-lg text-sub-light disabled:opacity-30 hover:bg-slate-100"
            >▲</button>
            <button
              disabled={disabled || i === items.length - 1}
              onClick={() => move(i, 1)}
              aria-label="Move down"
              className="w-9 h-9 grid place-items-center rounded-lg text-sub-light disabled:opacity-30 hover:bg-slate-100"
            >▼</button>
          </li>
        ))}
      </ol>
      <button onClick={check} disabled={disabled} className="duo-btn-primary w-full">Check</button>
    </div>
  )
}
