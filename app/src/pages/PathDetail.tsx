import { Link, useNavigate, useParams } from 'react-router-dom'
import { PATHS_BY_SLUG } from '../content/paths'
import { useStore } from '../store'
import { FunctionChip } from '../components/FunctionChip'
import { Lesson, Path, Unit } from '../types'

interface NodeMeta {
  lesson: Lesson
  unit: Unit
  unitIndex: number
  state: 'done' | 'current' | 'next' | 'locked'
  positionX: number // -1..1 — for the snake offset
}

export function PathDetail() {
  const { slug = '' } = useParams()
  const path = PATHS_BY_SLUG[slug]
  const progress = useStore((s) => s.pathProgress[slug])
  const placement = useStore((s) => s.placement)
  const nav = useNavigate()

  if (!path) {
    return (
      <div className="p-8">
        <p>Path not found.</p>
        <Link to="/paths" className="duo-btn-secondary mt-3 inline-block">All paths</Link>
      </div>
    )
  }

  const startUnitIdx = placement?.pathStarts[slug] ?? 0
  const nodes = buildNodes(path, progress?.completedLessons || {}, progress?.unlockedUnits || {}, startUnitIdx)

  const totalLessons = nodes.length
  const doneCount = nodes.filter((n) => n.state === 'done').length

  return (
    <div className="min-h-full">
      {/* Sticky header — function-themed gradient banner */}
      <div className={`relative pad-safe-top text-white path-banner-${path.function}`}>
        <div className="max-w-3xl mx-auto px-4 py-5">
          <Link to="/paths" className="inline-flex items-center gap-1 text-white/80 text-xs hover:text-white">
            ← All paths
          </Link>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-14 h-14 rounded-2xl bg-fg/15 backdrop-blur grid place-items-center text-3xl">
              {pathIcon(path)}
            </div>
            <div className="flex-1">
              <div className="text-xs uppercase tracking-wider font-bold opacity-80">{path.name}</div>
              <h1 className="text-xl font-extrabold leading-tight">
                Unit {Math.min(currentUnitIndex(nodes) + 1, path.units.length)} · {path.units[currentUnitIndex(nodes)].name}
              </h1>
            </div>
            <div className="text-right">
              <div className="display-num text-2xl">{doneCount}<span className="opacity-60 text-base">/{totalLessons}</span></div>
              <div className="text-[10px] uppercase tracking-wide opacity-80">lessons</div>
            </div>
          </div>
          {placement && (
            <p className="text-xs mt-3 opacity-90">
              From placement: starting at Unit {startUnitIdx + 1}. Earlier units = optional review.
            </p>
          )}
        </div>
      </div>

      {/* Snaking lesson path */}
      <div className="max-w-md mx-auto px-4 pb-32 pt-6">
        {path.units.map((unit, ui) => {
          const unitNodes = nodes.filter((n) => n.unit.id === unit.id)
          const unlocked = unitNodes.some((n) => n.state !== 'locked')
          return (
            <section key={unit.id} className="mb-10">
              <UnitHeader unit={unit} index={ui} unlocked={unlocked} function_={path.function} />
              <div className="relative flex flex-col items-center gap-7 mt-6">
                {unitNodes.map((node, i) => (
                  <LessonBubble
                    key={node.lesson.id}
                    node={node}
                    indexInUnit={i}
                    onClick={() => {
                      if (node.state === 'locked') return
                      nav(`/lesson/${path.slug}/${node.unit.id}/${node.lesson.id}`)
                    }}
                  />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

function currentUnitIndex(nodes: NodeMeta[]) {
  const cur = nodes.find((n) => n.state === 'current') || nodes.find((n) => n.state === 'next') || nodes[nodes.length - 1]
  return cur?.unitIndex ?? 0
}

function pathIcon(p: Path) {
  if (p.function === 'product') return '📐'
  if (p.function === 'ua') return '📣'
  if (p.function === 'business') return '🔗'
  return '✨'
}

function buildNodes(
  path: Path,
  completed: Record<string, true>,
  unlockedUnits: Record<string | number, number>,
  startUnitIdx: number
): NodeMeta[] {
  const out: NodeMeta[] = []
  let assignedCurrent = false
  let runningIndex = 0

  for (let ui = 0; ui < path.units.length; ui++) {
    const unit = path.units[ui]
    const unitUnlocked = ui === 0 || unlockedUnits[ui] === 1 || ui <= startUnitIdx
    for (const lesson of unit.lessons) {
      const isDone = !!completed[lesson.id]
      let state: NodeMeta['state']
      if (!unitUnlocked) state = 'locked'
      else if (isDone) state = 'done'
      else if (!assignedCurrent) {
        state = 'current'
        assignedCurrent = true
      } else state = 'next'

      out.push({
        lesson,
        unit,
        unitIndex: ui,
        state,
        positionX: snakeOffset(runningIndex)
      })
      runningIndex++
    }
  }
  return out
}

// Snake pattern: 0, +1, +1, 0, -1, -1, 0, +1, ... (gentle S-curve)
function snakeOffset(i: number) {
  const cycle = i % 8
  switch (cycle) {
    case 0: return 0
    case 1: return 0.6
    case 2: return 1
    case 3: return 0.6
    case 4: return 0
    case 5: return -0.6
    case 6: return -1
    case 7: return -0.6
    default: return 0
  }
}

function UnitHeader({ unit, index, unlocked, function_ }: { unit: Unit; index: number; unlocked: boolean; function_: string }) {
  return (
    <div className={`surface px-4 py-3 mb-2 flex items-center gap-3 ${!unlocked ? 'opacity-60' : ''}`}>
      <div className={`w-9 h-9 rounded-xl chip-${function_} grid place-items-center font-extrabold`}>
        {index + 1}
      </div>
      <div className="flex-1">
        <div className="text-[10px] uppercase tracking-wider text-fgmuted font-bold">Unit {index + 1}</div>
        <div className="font-extrabold leading-tight">{unit.name}</div>
        <div className="text-xs text-fgmuted leading-snug mt-0.5">{unit.goal}</div>
      </div>
      {!unlocked && <span aria-hidden className="text-xl">🔒</span>}
    </div>
  )
}

function LessonBubble({
  node,
  indexInUnit,
  onClick
}: {
  node: NodeMeta
  indexInUnit: number
  onClick: () => void
}) {
  const x = node.positionX
  const label =
    node.state === 'done' ? '✓' :
    node.state === 'locked' ? '🔒' :
    node.state === 'current' ? '★' :
    String(indexInUnit + 1)

  return (
    <div className="w-full flex justify-center">
      <div
        className="relative group"
        style={{ transform: `translateX(${x * 70}px)` }}
      >
        <button
          type="button"
          disabled={node.state === 'locked'}
          onClick={onClick}
          className={`lesson-node ${node.state === 'locked' ? 'locked' : node.state} ${node.state === 'current' ? 'animate-pulse-ring' : ''}`}
          aria-label={`Lesson: ${node.lesson.name} — ${node.state}`}
        >
          <span className="text-white text-3xl font-black drop-shadow pointer-events-none">{label}</span>
        </button>

        {/* Always-on label for the current lesson; hover-only for others */}
        <div
          className={`pointer-events-none absolute left-1/2 -translate-x-1/2 -top-9 surface px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-opacity ${
            node.state === 'current' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          {node.state === 'current' ? 'Start · ' : ''}{node.lesson.name}
        </div>
      </div>
    </div>
  )
}
