import { useStore } from '../store'

export function StreakCounter() {
  const streak = useStore((s) => s.streak)
  return (
    <div
      className="stat-pill bg-[#FFF1D6] text-[#F79009]"
      title={`Longest: ${streak.longest}d · Freezes: ${streak.freezes}`}
    >
      <span aria-hidden>🔥</span>
      <span className="display-num">{streak.current}</span>
    </div>
  )
}
