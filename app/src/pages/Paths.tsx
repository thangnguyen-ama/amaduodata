import { Link } from 'react-router-dom'
import { PATHS } from '../content/paths'
import { useStore } from '../store'

export function Paths() {
  const pp = useStore((s) => s.pathProgress)
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 pt-4 md:pt-6 pb-6">
      <h1 className="text-2xl md:text-3xl font-black mb-1">Paths</h1>
      <p className="text-sub-light text-sm mb-5 leading-6">
        Cross-Functional Connections is the headline path. Take Product 101 + UA 101 first, or skip ahead via placement.
      </p>
      <div className="grid grid-cols-1 gap-4">
        {PATHS.map((p) => {
          const totalLessons = p.units.reduce((acc, u) => acc + u.lessons.length, 0)
          const done = pp[p.slug] ? Object.keys(pp[p.slug].completedLessons).length : 0
          const pct = Math.min(1, done / totalLessons)
          return (
            <Link
              key={p.slug}
              to={`/paths/${p.slug}`}
              className={`block path-banner-${p.function} rounded-2xl p-5 text-white active:translate-y-1 transition-transform shadow-[0_6px_0_0_rgba(0,0,0,0.15)]`}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 grid place-items-center text-3xl flex-shrink-0">
                  {p.function === 'product' ? '📐' : p.function === 'ua' ? '📣' : '🔗'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-wider opacity-80 font-bold">{p.units.length} units · {totalLessons} lessons</div>
                  <h2 className="font-black text-lg leading-tight">{p.name}</h2>
                  <p className="text-xs opacity-90 mt-1 line-clamp-2 leading-snug">{p.description}</p>
                </div>
                <div className="text-3xl flex-shrink-0">→</div>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-white/25 rounded-full overflow-hidden">
                  <div className="h-full bg-white" style={{ width: `${pct * 100}%` }} />
                </div>
                <span className="text-xs font-black">{done}/{totalLessons}</span>
              </div>
            </Link>
          )
        })}
      </div>

      <p className="text-xs text-sub-light mt-6 leading-5">
        Mon 101 is not included in this build.
      </p>
    </div>
  )
}
