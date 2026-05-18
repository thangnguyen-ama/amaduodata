import { Link, NavLink, useLocation } from 'react-router-dom'
import { useStore } from '../store'
import { useEffect } from 'react'
import { HeartCounter } from './HeartCounter'
import { StreakCounter } from './StreakCounter'

const NAV: { to: string; label: string; icon: string }[] = [
  { to: '/home', label: 'Home', icon: '🏠' },
  { to: '/paths', label: 'Paths', icon: '🛤️' },
  { to: '/practice', label: 'Practice', icon: '🔁' },
  { to: '/league', label: 'League', icon: '🏆' },
  { to: '/tree', label: 'Tree', icon: '🌳' },
  { to: '/profile', label: 'Me', icon: '👤' }
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const user = useStore((s) => s.user)
  const totalXp = useStore((s) => s.totalXp)
  const ensureHeartRegen = useStore((s) => s.ensureHeartRegen)
  const ensureTodayQuests = useStore((s) => s.ensureTodayQuests)
  const ensureLeague = useStore((s) => s.ensureLeague)
  const loc = useLocation()

  useEffect(() => {
    ensureHeartRegen()
    ensureTodayQuests()
    ensureLeague()
    const t = setInterval(ensureHeartRegen, 60_000)
    return () => clearInterval(t)
  }, [ensureHeartRegen, ensureTodayQuests, ensureLeague])

  if (!user) return <>{children}</>

  const hideChrome = loc.pathname.startsWith('/lesson/') || loc.pathname.startsWith('/placement') || loc.pathname.startsWith('/practice/')

  return (
    <div className="flex min-h-full">
      {!hideChrome && (
        <aside className="hidden md:flex w-60 flex-col gap-1 border-r border-line px-4 py-5 bg-bg-1 pad-safe-top sticky top-0 self-start max-h-screen overflow-auto">
          <Link to="/home" className="flex items-center gap-2 mb-6 px-2">
            <span className="w-9 h-9 rounded-xl bg-violet-500 text-white flex items-center justify-center font-black shadow-baseViolet">D</span>
            <span className="font-black tracking-tight text-lg">DuoData</span>
          </Link>
          {NAV.map((n) => (
            <DesktopNav key={n.to} {...n} />
          ))}
          <div className="mt-auto pt-4 border-t border-line text-xs text-fgmuted px-2">
            <Link to="/admin" className="hover:text-fg">Admin</Link>
            <span className="mx-2">·</span>
            <Link to="/about" className="hover:text-fg">About</Link>
          </div>
        </aside>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {!hideChrome && (
          <header className="bg-bg-1/90 backdrop-blur pad-safe-top border-b border-line sticky top-0 z-30">
            <div className="h-14 flex items-center justify-between px-4 md:px-6">
              <Link to="/home" className="md:hidden flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-violet-500 text-white flex items-center justify-center font-black text-sm shadow-baseViolet">D</span>
                <span className="font-black tracking-tight">DuoData</span>
              </Link>
              <div className="flex items-center gap-2 md:gap-3 ml-auto">
                <StreakCounter />
                <HeartCounter />
                <div className="stat-pill bg-violet-500/20 text-violet-300">
                  <span>⚡</span><span className="display-num">{totalXp}</span>
                </div>
              </div>
            </div>
          </header>
        )}

        <main className={`flex-1 bg-bg-0 ${!hideChrome ? 'md:pb-6 pb-24' : ''}`}>
          {children}
        </main>

        {!hideChrome && (
          <nav
            className="md:hidden fixed bottom-0 inset-x-0 bg-bg-1/95 backdrop-blur border-t border-line pad-safe-bottom z-30"
            aria-label="Primary navigation"
          >
            <div className="grid grid-cols-6">
              {NAV.map((n) => (
                <MobileNav key={n.to} {...n} />
              ))}
            </div>
          </nav>
        )}
      </div>
    </div>
  )
}

function DesktopNav({ to, label, icon }: { to: string; label: string; icon: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-md text-[15px] ${
          isActive ? 'bg-brand/10 text-brand font-semibold' : 'text-fg hover:bg-bg-2'
        }`
      }
    >
      <span aria-hidden>{icon}</span>
      <span>{label}</span>
    </NavLink>
  )
}

function MobileNav({ to, label, icon }: { to: string; label: string; icon: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center py-2 text-[10px] font-medium ${
          isActive ? 'text-brand' : 'text-fgmuted'
        }`
      }
    >
      <span className="text-lg leading-none" aria-hidden>{icon}</span>
      <span className="mt-1">{label}</span>
    </NavLink>
  )
}
