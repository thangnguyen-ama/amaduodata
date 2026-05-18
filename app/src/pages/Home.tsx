import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import { PATHS } from '../content/paths'
import { todayLocalISO } from '../lib/dates'
import { levelFromXp } from '../lib/levels'

export function Home() {
  const user = useStore((s) => s.user)
  const totalXp = useStore((s) => s.totalXp)
  const pathProgress = useStore((s) => s.pathProgress)
  const quests = useStore((s) => s.questsByDate[todayLocalISO()] || [])
  const practiceCount = useStore((s) => s.practiceQueue.filter((p) => p.dueAt <= Date.now()).length)
  const nav = useNavigate()
  const lvl = levelFromXp(totalXp)

  function nextLessonHint() {
    for (const p of PATHS) {
      const pp = pathProgress[p.slug]
      for (let ui = 0; ui < p.units.length; ui++) {
        const unit = p.units[ui]
        const unlocked = !pp || pp.unlockedUnits[ui] || ui === 0
        if (!unlocked) continue
        for (const lesson of unit.lessons) {
          if (!pp?.completedLessons[lesson.id]) {
            return { path: p, unit, unitIndex: ui, lesson }
          }
        }
      }
    }
    return null
  }
  const next = nextLessonHint()

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 pt-4 md:pt-6 pb-6">
      {/* Greeting */}
      <div className="mb-5">
        <div className="text-xs uppercase tracking-wider text-fgmuted font-bold">Hi {user?.displayName?.split(' ')[0]}</div>
        <div className="flex items-end justify-between gap-3">
          <h1 className="text-2xl md:text-3xl font-black">Let's learn today.</h1>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-fgmuted font-bold">Level</div>
            <div className="display-num text-2xl text-brand leading-none">{lvl.level}</div>
          </div>
        </div>
        <div className="mt-2 h-2.5 bg-bg-2 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-violet-500 to-blue-400 transition-all" style={{ width: `${lvl.pct * 100}%` }} />
        </div>
        <div className="text-[11px] text-fgmuted mt-1.5">{lvl.toNext} XP to level {lvl.level + 1}</div>
      </div>

      {/* Hero: Continue learning */}
      {next && (
        <button
          onClick={() => nav(`/lesson/${next.path.slug}/${next.unit.id}/${next.lesson.id}`)}
          className={`block w-full text-left rounded-2xl path-banner-${next.path.function} text-white p-5 md:p-6 mb-5 active:translate-y-1 transition-transform shadow-[0_8px_0_0_rgba(0,0,0,0.15)]`}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-fg/15 backdrop-blur grid place-items-center text-3xl flex-shrink-0">
              {pathIcon(next.path.function)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-wider opacity-80 font-bold">Continue · {next.path.name}</div>
              <h2 className="text-lg md:text-xl font-black truncate">{next.lesson.name}</h2>
              <div className="text-xs opacity-90 mt-0.5">{next.lesson.cardIds.length} cards · ~{Math.ceil(next.lesson.cardIds.length * 0.5)} min</div>
            </div>
            <div className="text-3xl flex-shrink-0">→</div>
          </div>
        </button>
      )}

      {/* Quests + quick links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <section className="surface p-5 md:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm uppercase tracking-wider font-black text-fgmuted">Today's quests</h2>
            <span className="text-xs text-fgmuted">Resets at midnight</span>
          </div>
          <ul className="space-y-3">
            {quests.map((q) => {
              const pct = Math.min(1, q.progress / q.target)
              const done = !!q.completedAt
              return (
                <li key={q.id} className={`flex items-center gap-3 p-2.5 rounded-xl ${done ? 'bg-correct/5' : ''}`}>
                  <div className={`w-10 h-10 rounded-xl grid place-items-center flex-shrink-0 ${done ? 'bg-green-500' : 'bg-bg-2'}`}>
                    {done ? <span className="text-white text-lg">✓</span> : <span>{q.kind === 'xp_target' ? '⚡' : q.kind === 'practice_count' ? '🔁' : q.kind === 'perfect_lesson' ? '🏆' : '✏️'}</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-bold ${done ? 'line-through text-fgmuted' : ''}`}>{q.text}</div>
                    <div className="h-1.5 bg-bg-2 rounded-full mt-1 overflow-hidden">
                      <div className={`h-full ${done ? 'bg-green-500' : 'bg-violet-500'}`} style={{ width: `${pct * 100}%` }} />
                    </div>
                  </div>
                  <div className="text-right text-[11px] font-bold text-fgmuted">
                    <div>{q.progress}/{q.target}</div>
                    <div className="text-xp">+{q.rewardXp} XP</div>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        <section className="surface p-5">
          <h2 className="text-sm uppercase tracking-wider font-black text-fgmuted mb-3">Quick</h2>
          <div className="space-y-1.5">
            <QuickLink to="/practice" icon="🔁" label="Practice" badge={practiceCount > 0 ? String(practiceCount) : undefined} />
            <QuickLink to="/league" icon="🏆" label="League" />
            <QuickLink to="/tree" icon="🌳" label="Metric tree" />
            <QuickLink to="/paths" icon="🛤️" label="All paths" />
          </div>
        </section>
      </div>

      {/* Path cards */}
      <h2 className="text-sm uppercase tracking-wider font-black text-fgmuted mb-3">Your paths</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PATHS.map((p) => {
          const pp = pathProgress[p.slug]
          const total = p.units.reduce((acc, u) => acc + u.lessons.length, 0)
          const done = pp ? Object.keys(pp.completedLessons).length : 0
          const pct = Math.min(1, done / total)
          return (
            <Link
              key={p.slug}
              to={`/paths/${p.slug}`}
              className={`block path-banner-${p.function} rounded-2xl p-4 text-white active:translate-y-1 transition-transform shadow-[0_6px_0_0_rgba(0,0,0,0.15)]`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-fg/15 grid place-items-center text-2xl">{pathIcon(p.function)}</div>
                <h3 className="font-black flex-1">{p.name}</h3>
              </div>
              <p className="text-xs opacity-90 line-clamp-2 leading-snug">{p.description}</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-fg/25 rounded-full overflow-hidden">
                  <div className="h-full bg-fg" style={{ width: `${pct * 100}%` }} />
                </div>
                <span className="text-xs font-black">{done}/{total}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function QuickLink({ to, icon, label, badge }: { to: string; icon: string; label: string; badge?: string }) {
  return (
    <Link to={to} className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-bg-2">
      <span className="flex items-center gap-2.5">
        <span className="text-lg" aria-hidden>{icon}</span>
        <span className="font-bold text-sm">{label}</span>
      </span>
      {badge && (
        <span className="text-[10px] font-black bg-magic-500 text-white rounded-full px-2 py-0.5 min-w-[18px] text-center">
          {badge}
        </span>
      )}
    </Link>
  )
}

function pathIcon(fn: string) {
  if (fn === 'product') return '📐'
  if (fn === 'ua') return '📣'
  if (fn === 'business') return '🔗'
  return '✨'
}
