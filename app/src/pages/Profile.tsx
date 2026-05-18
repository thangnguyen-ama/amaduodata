import { useStore } from '../store'
import { useNavigate } from 'react-router-dom'
import { levelFromXp } from '../lib/levels'
import { PATHS } from '../content/paths'

export function Profile() {
  const user = useStore((s) => s.user)
  const totalXp = useStore((s) => s.totalXp)
  const streak = useStore((s) => s.streak)
  const hearts = useStore((s) => s.hearts)
  const settings = useStore((s) => s.settings)
  const updateSettings = useStore((s) => s.updateSettings)
  const logout = useStore((s) => s.logout)
  const pathProgress = useStore((s) => s.pathProgress)
  const nav = useNavigate()
  const lvl = levelFromXp(totalXp)

  if (!user) return null

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 pt-4 md:pt-6 pb-6">
      {/* Profile hero */}
      <section className="relative path-banner-business rounded-2xl p-5 text-white overflow-hidden shadow-[0_6px_0_0_rgba(0,0,0,0.15)]">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-fg/15 grid place-items-center text-3xl font-black flex-shrink-0">
            {user.displayName.split(' ').map((s) => s[0]).slice(0, 2).join('')}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl font-black leading-tight truncate">{user.displayName}</h1>
            <p className="text-xs opacity-85 truncate">{user.email}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {user.role && <span className="pill bg-fg/25 text-white">{user.role}</span>}
              {user.team && <span className="pill bg-fg/25 text-white">{user.team}</span>}
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider opacity-80 font-bold">Level</div>
            <div className="display-num text-3xl leading-none">{lvl.level}</div>
          </div>
          <div className="flex-1 mx-4">
            <div className="h-2 bg-fg/25 rounded-full overflow-hidden">
              <div className="h-full bg-fg" style={{ width: `${lvl.pct * 100}%` }} />
            </div>
            <div className="text-[10px] opacity-85 mt-1">{lvl.toNext} XP to next</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider opacity-80 font-bold">Total XP</div>
            <div className="display-num text-xl leading-none">{totalXp}</div>
          </div>
        </div>
      </section>

      {/* KPI row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        <KPI label="Streak" value={`${streak.current}d`} icon="🔥" tint="#FFCD3C" tintBg="rgba(255,205,60,0.15)" />
        <KPI label="Longest" value={`${streak.longest}d`} icon="📈" tint="#29D86F" tintBg="rgba(41,216,111,0.15)" />
        <KPI label="Hearts" value={`${hearts.count}/5`} icon="❤" tint="#FF6FA0" tintBg="rgba(255,61,142,0.15)" />
        <KPI label="Freezes" value={String(streak.freezes)} icon="🧊" tint="#5C9CFF" tintBg="rgba(45,127,249,0.15)" />
      </section>

      {/* Path progress */}
      <section className="surface mt-4 p-5">
        <h2 className="text-sm uppercase tracking-wider font-black text-fgmuted mb-4">Path progress</h2>
        <div className="space-y-4">
          {PATHS.map((p) => {
            const total = p.units.reduce((acc, u) => acc + u.lessons.length, 0)
            const done = pathProgress[p.slug] ? Object.keys(pathProgress[p.slug].completedLessons).length : 0
            const pct = Math.round((done / total) * 100)
            return (
              <div key={p.slug}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="font-bold">{p.name}</span>
                  <span className="text-xs text-fgmuted font-mono">{done}/{total} · {pct}%</span>
                </div>
                <div className="h-2.5 bg-bg-2 rounded-full overflow-hidden">
                  <div className={`h-full path-banner-${p.function}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Settings */}
      <section className="surface mt-4 p-5">
        <h2 className="text-sm uppercase tracking-wider font-black text-fgmuted mb-3">Settings</h2>
        <ToggleRow label="Sound effects" on={settings.sound} onChange={(v) => updateSettings({ sound: v })} />
        <ToggleRow label="Reduced motion" on={settings.reducedMotion} onChange={(v) => updateSettings({ reducedMotion: v })} />
        <div className="mt-4 pt-4 border-t border-line flex justify-end">
          <button
            className="duo-btn-danger"
            onClick={() => {
              logout()
              nav('/')
            }}
          >Log out</button>
        </div>
      </section>
    </div>
  )
}

function KPI({ label, value, icon, tint, tintBg }: { label: string; value: string; icon: string; tint: string; tintBg: string }) {
  return (
    <div className="surface p-3 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl grid place-items-center text-xl" style={{ background: tintBg }}>{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="display-num text-lg leading-none" style={{ color: tint }}>{value}</div>
        <div className="text-[10px] uppercase tracking-wider font-bold text-fgmuted mt-1">{label}</div>
      </div>
    </div>
  )
}

function ToggleRow({ label, on, onChange }: { label: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className="flex items-center justify-between w-full py-3"
    >
      <span className="font-bold text-sm">{label}</span>
      <span
        className={`w-12 h-7 rounded-full p-0.5 transition-colors ${on ? 'bg-violet-500' : 'bg-bg-3'}`}
        aria-hidden
      >
        <span
          className={`block w-6 h-6 bg-fg rounded-full shadow-md transition-transform ${
            on ? 'translate-x-5' : ''
          }`}
        />
      </span>
    </button>
  )
}
