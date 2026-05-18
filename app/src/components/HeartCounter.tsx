import { useEffect, useState } from 'react'
import { useStore } from '../store'
import { formatCountdown } from '../lib/dates'

const HEART_REGEN_MS = 30 * 60 * 1000

export function HeartCounter({ shake }: { shake?: boolean } = {}) {
  const hearts = useStore((s) => s.hearts)
  const [, force] = useState(0)

  useEffect(() => {
    if (hearts.count >= 5) return
    const t = setInterval(() => force((n) => n + 1), 1000)
    return () => clearInterval(t)
  }, [hearts.count])

  const nextIn = hearts.count >= 5 ? 0 : Math.max(0, HEART_REGEN_MS - (Date.now() - hearts.lastRegenAt))

  return (
    <div
      className={`stat-pill bg-[#FFE5E5] text-[#FF4B4B] ${shake ? 'animate-shake' : ''}`}
      title={nextIn ? `Next heart in ${formatCountdown(nextIn)}` : 'Hearts full'}
    >
      <span aria-hidden>❤</span>
      <span className="display-num">{hearts.count}</span>
    </div>
  )
}
