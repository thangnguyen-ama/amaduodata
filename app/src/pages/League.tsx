import { useStore } from '../store'

const TIER_NAMES = ['POC', 'MVP', 'SoftLaunch', 'PMF', 'ScaleUp', 'Revenue', 'Maintenance']

export function League() {
  const league = useStore((s) => s.league)

  if (!league) {
    return <div className="p-6">Loading league…</div>
  }

  const sorted = league.members.slice().sort((a, b) => b.weeklyXp - a.weeklyXp)
  const weekEnd = new Date(league.weekStartISO)
  weekEnd.setDate(weekEnd.getDate() + 7)
  const daysLeft = Math.max(0, Math.ceil((weekEnd.getTime() - Date.now()) / 86400000))

  const tierIdx = TIER_NAMES.indexOf(league.tier)

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      <div className="card p-5 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🏆</span>
          <div className="flex-1">
            <div className="text-xs text-fgmuted uppercase">League tier</div>
            <h1 className="text-2xl font-extrabold">{league.tier}</h1>
          </div>
          <div className="text-right">
            <div className="text-xs text-fgmuted">{daysLeft} day{daysLeft === 1 ? '' : 's'} left</div>
            <div className="text-xs text-fgmuted">Week of {league.weekStartISO}</div>
          </div>
        </div>
        <p className="text-xs text-fgmuted mt-3">
          Tier names follow Amanotes product-lifecycle stages: POC → MVP → SoftLaunch → PMF → ScaleUp → Revenue → Maintenance.
          {tierIdx < TIER_NAMES.length - 1 && ` Top 7 promote to ${TIER_NAMES[tierIdx + 1]}.`}
        </p>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-bg-2 text-xs uppercase text-fgmuted">
            <tr>
              <th className="text-left py-2 px-3 w-12">#</th>
              <th className="text-left py-2 px-3">Name</th>
              <th className="text-left py-2 px-3 w-20">Role</th>
              <th className="text-right py-2 px-3 w-24">XP</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((m, i) => {
              const rank = i + 1
              const promoZone = rank <= 7
              const demoZone = rank > sorted.length - 5
              const bg = m.isMe
                ? 'bg-brand/5'
                : promoZone
                ? 'bg-correct/5'
                : demoZone
                ? 'bg-streak/5'
                : ''
              return (
                <tr key={m.id} className={`border-t border-line ${bg}`}>
                  <td className="py-2.5 px-3 font-mono text-sm">
                    {rank} {promoZone && '⬆️'} {demoZone && '⬇️'}
                  </td>
                  <td className="py-2.5 px-3 font-medium">
                    {m.name}
                    {m.isMe && <span className="ml-2 pill bg-brand/10 text-brand">you</span>}
                  </td>
                  <td className="py-2.5 px-3 text-fgmuted text-sm">{m.role}</td>
                  <td className="py-2.5 px-3 text-right font-mono">{m.weeklyXp}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-fgmuted mt-3">Promotion zone: top 7 (green). Demotion zone: bottom 5 (orange).</p>
    </div>
  )
}
