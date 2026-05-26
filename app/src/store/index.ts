import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import {
  CardAttempt,
  DailyQuest,
  LeagueMember,
  LeagueTier,
  LessonAttempt,
  PlacementResult,
  PracticeItem,
  Role,
  Team,
  User
} from '../types'
import { PATHS_BY_SLUG } from '../content/paths'
import { todayLocalISO, daysBetweenLocal } from '../lib/dates'
import { track } from '../lib/track'

interface HeartsState {
  count: number // 0..5
  lastRegenAt: number // ms epoch
}

interface StreakState {
  current: number
  longest: number
  freezes: number
  lastActiveDate: string | null
}

interface League {
  tier: LeagueTier
  weekStartISO: string
  members: LeagueMember[]
}

interface PathProgress {
  unlockedUnits: Record<string, number> // unitId -> 0 (locked) | 1 (unlocked)
  completedLessons: Record<string, true>
  startUnitIndex: number // from placement (0-based)
}

interface AppState {
  user: User | null
  hearts: HeartsState
  streak: StreakState
  totalXp: number
  league: League | null
  questsByDate: Record<string, DailyQuest[]> // date -> 3 quests
  practiceQueue: PracticeItem[]
  pathProgress: Record<string, PathProgress> // slug -> progress
  lessonAttempts: LessonAttempt[]
  cardAttempts: CardAttempt[]
  placement: PlacementResult | null
  settings: { sound: boolean; reducedMotion: boolean }

  // actions
  login: (email: string, displayName: string) => void
  logout: () => void
  setRoleTeam: (role: Role, team: Team) => void
  savePlacement: (r: PlacementResult) => void

  ensureHeartRegen: () => void
  loseHeart: () => boolean // returns false if 0
  refillHearts: (n?: number) => void

  awardXp: (amount: number, reason: string) => void

  recordCardAttempt: (cardId: string, isCorrect: boolean, timeMs: number) => void
  startLesson: (pathSlug: string, unitId: string, lessonId: string) => string // attempt id
  completeLesson: (attemptId: string, summary: { xpEarned: number; cardsCorrect: number; cardsWrong: number }) => void

  markLessonComplete: (pathSlug: string, unitId: string, lessonId: string) => void
  unlockNextUnit: (pathSlug: string, currentUnitIndex: number) => void
  skipTestUnit: (pathSlug: string, unitIndex: number) => void
  isUnitFullyComplete: (pathSlug: string, unitId: string) => boolean

  enqueuePractice: (cardId: string) => void
  reviewPractice: (cardId: string, isCorrect: boolean) => void

  ensureTodayQuests: () => void
  progressQuest: (kind: DailyQuest['kind'], amount: number) => void

  ensureLeague: () => void
  addLeagueXp: (amount: number) => void

  updateSettings: (s: Partial<AppState['settings']>) => void
}

const HEART_REGEN_MS = 30 * 60 * 1000 // 30 min per heart

function defaultPathProgress(): PathProgress {
  return { unlockedUnits: {}, completedLessons: {}, startUnitIndex: 0 }
}

function buildLeagueMembers(meName: string, meRole: Role, meXp: number): LeagueMember[] {
  const bots = [
    { name: 'Linh (P1 PO)', role: 'PO' as Role, weeklyXp: 540 },
    { name: 'Khoa (P2 UA)', role: 'UA' as Role, weeklyXp: 480 },
    { name: 'Mai (P2 MO)', role: 'MO' as Role, weeklyXp: 460 },
    { name: 'Tuan (P3 GD)', role: 'GD' as Role, weeklyXp: 410 },
    { name: 'Phuong (M2 PM)', role: 'PO' as Role, weeklyXp: 380 },
    { name: 'Hai (P2 UA)', role: 'UA' as Role, weeklyXp: 360 },
    { name: 'Quynh (P3 DA)', role: 'DA' as Role, weeklyXp: 340 },
    { name: 'Long (P2 GD)', role: 'GD' as Role, weeklyXp: 310 },
    { name: 'Trang (P1 CRE)', role: 'CRE' as Role, weeklyXp: 290 },
    { name: 'Bao (P2 MS)', role: 'MS' as Role, weeklyXp: 270 },
    { name: 'Nhi (P3 PO)', role: 'PO' as Role, weeklyXp: 240 },
    { name: 'Duc (P1 LD)', role: 'LD' as Role, weeklyXp: 220 },
    { name: 'Anh (P2 UA)', role: 'UA' as Role, weeklyXp: 200 },
    { name: 'Vy (P3 DA)', role: 'DA' as Role, weeklyXp: 180 },
    { name: 'Minh (P2 MO)', role: 'MO' as Role, weeklyXp: 160 },
    { name: 'Tien (P1 PO)', role: 'PO' as Role, weeklyXp: 140 },
    { name: 'Son (P2 CRE)', role: 'CRE' as Role, weeklyXp: 120 },
    { name: 'Loan (P3 PO)', role: 'PO' as Role, weeklyXp: 100 },
    { name: 'Phat (P2 UA)', role: 'UA' as Role, weeklyXp: 80 },
    { name: 'Diep (P1 GD)', role: 'GD' as Role, weeklyXp: 60 }
  ]
  const me: LeagueMember = {
    id: 'me',
    name: meName + ' (you)',
    role: meRole,
    weeklyXp: meXp,
    isMe: true
  }
  const all = [me, ...bots.map((b, i) => ({ id: `bot-${i}`, ...b, isMe: false }))]
  return all
}

function generateDailyQuests(): DailyQuest[] {
  const seed = todayLocalISO()
  const variants: DailyQuest[][] = [
    [
      { id: seed + '-q1', kind: 'xp_target', text: 'Earn 50 XP', target: 50, progress: 0, rewardXp: 20 },
      { id: seed + '-q2', kind: 'lessons_count', text: 'Complete 2 lessons', target: 2, progress: 0, rewardXp: 25 },
      { id: seed + '-q3', kind: 'practice_count', text: 'Review 5 practice cards', target: 5, progress: 0, rewardXp: 15 }
    ],
    [
      { id: seed + '-q1', kind: 'xp_target', text: 'Earn 30 XP', target: 30, progress: 0, rewardXp: 15 },
      { id: seed + '-q2', kind: 'perfect_lesson', text: 'Get a perfect lesson', target: 1, progress: 0, rewardXp: 30 },
      { id: seed + '-q3', kind: 'lessons_count', text: 'Complete 1 lesson', target: 1, progress: 0, rewardXp: 15 }
    ]
  ]
  // Deterministic per-day choice
  const dayNum = Number(seed.replace(/-/g, ''))
  return JSON.parse(JSON.stringify(variants[dayNum % variants.length]))
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      hearts: { count: 5, lastRegenAt: Date.now() },
      streak: { current: 0, longest: 0, freezes: 2, lastActiveDate: null },
      totalXp: 0,
      league: null,
      questsByDate: {},
      practiceQueue: [],
      pathProgress: {},
      lessonAttempts: [],
      cardAttempts: [],
      placement: null,
      settings: { sound: false, reducedMotion: false },

      login: (email, displayName) => {
        const id = 'u_' + email.replace(/[^a-z0-9]/gi, '_')
        const user: User = { id, email, displayName, role: null, team: null, createdAt: Date.now() }
        ;(window as any).__duodata_user_id = id
        set({ user })
        track('login_success', { method: 'mock_google_sso', email })
      },

      logout: () => {
        track('logout', {})
        set({
          user: null,
          hearts: { count: 5, lastRegenAt: Date.now() },
          streak: { current: 0, longest: 0, freezes: 2, lastActiveDate: null },
          totalXp: 0,
          league: null,
          questsByDate: {},
          practiceQueue: [],
          pathProgress: {},
          lessonAttempts: [],
          cardAttempts: [],
          placement: null
        })
      },

      setRoleTeam: (role, team) => {
        const u = get().user
        if (!u) return
        ;(window as any).__duodata_user_role = role
        set({ user: { ...u, role, team } })
        track('onboarding_role_set', { role, team })
      },

      savePlacement: (r) => {
        set({ placement: r })
        // Apply path start units to pathProgress
        const pp = { ...get().pathProgress }
        Object.entries(r.pathStarts).forEach(([slug, idx]) => {
          pp[slug] = { ...defaultPathProgress(), ...(pp[slug] || {}), startUnitIndex: idx }
          // Unlock through the start index
          for (let i = 0; i <= idx; i++) {
            pp[slug].unlockedUnits[i] = 1
          }
        })
        set({ pathProgress: pp })
        track('placement_quiz_completed', { path_starts: r.pathStarts, raw_score: r.rawScore })
      },

      ensureHeartRegen: () => {
        const h = get().hearts
        if (h.count >= 5) {
          set({ hearts: { count: 5, lastRegenAt: Date.now() } })
          return
        }
        const elapsed = Date.now() - h.lastRegenAt
        const regen = Math.floor(elapsed / HEART_REGEN_MS)
        if (regen > 0) {
          const newCount = Math.min(5, h.count + regen)
          set({
            hearts: {
              count: newCount,
              lastRegenAt: newCount === 5 ? Date.now() : h.lastRegenAt + regen * HEART_REGEN_MS
            }
          })
        }
      },

      loseHeart: () => {
        const h = get().hearts
        if (h.count <= 0) return false
        const newCount = h.count - 1
        set({
          hearts: {
            count: newCount,
            lastRegenAt: newCount < 5 && h.count === 5 ? Date.now() : h.lastRegenAt
          }
        })
        track('heart_lost', { hearts_remaining: newCount })
        return newCount > 0
      },

      refillHearts: (n = 1) => {
        const h = get().hearts
        const newCount = Math.min(5, h.count + n)
        set({ hearts: { count: newCount, lastRegenAt: Date.now() } })
        track('hearts_refilled', { added: newCount - h.count, count: newCount })
      },

      awardXp: (amount, reason) => {
        const before = get().totalXp
        set({ totalXp: before + amount })
        track('xp_awarded', { amount, reason, total_after: before + amount })
        get().progressQuest('xp_target', amount)
        get().addLeagueXp(amount)
      },

      recordCardAttempt: (cardId, isCorrect, timeMs) => {
        const att: CardAttempt = { cardId, isCorrect, timeMs, at: Date.now() }
        set({ cardAttempts: [att, ...get().cardAttempts].slice(0, 1000) })
        track('card_answered', { card_id: cardId, is_correct: isCorrect, time_to_answer_ms: timeMs })
        if (!isCorrect) get().enqueuePractice(cardId)
        else get().reviewPractice(cardId, true)
      },

      startLesson: (pathSlug, unitId, lessonId) => {
        const attempt: LessonAttempt = {
          id: 'la_' + Date.now(),
          userId: get().user?.id || 'anon',
          pathSlug,
          unitId,
          lessonId,
          startedAt: Date.now(),
          xpEarned: 0,
          cardsCorrect: 0,
          cardsWrong: 0,
          cardsTotal: 0
        }
        set({ lessonAttempts: [attempt, ...get().lessonAttempts] })
        track('lesson_started', { lesson_id: lessonId, path_slug: pathSlug, unit_id: unitId })
        return attempt.id
      },

      completeLesson: (attemptId, summary) => {
        const list = get().lessonAttempts.slice()
        const i = list.findIndex((a) => a.id === attemptId)
        if (i < 0) return
        list[i] = {
          ...list[i],
          completedAt: Date.now(),
          xpEarned: summary.xpEarned,
          cardsCorrect: summary.cardsCorrect,
          cardsWrong: summary.cardsWrong,
          cardsTotal: summary.cardsCorrect + summary.cardsWrong
        }
        set({ lessonAttempts: list })
        track('lesson_completed', {
          lesson_id: list[i].lessonId,
          xp_earned: summary.xpEarned,
          accuracy:
            summary.cardsCorrect /
            Math.max(1, summary.cardsCorrect + summary.cardsWrong)
        })
        // Streak
        const today = todayLocalISO()
        const s = get().streak
        if (s.lastActiveDate !== today) {
          let newCurrent = s.current
          if (s.lastActiveDate == null) newCurrent = 1
          else {
            const gap = daysBetweenLocal(s.lastActiveDate, today)
            if (gap === 1) newCurrent = s.current + 1
            else if (gap > 1 && s.freezes > 0) newCurrent = s.current + 1 // consume freeze
            else newCurrent = 1
          }
          set({
            streak: {
              current: newCurrent,
              longest: Math.max(s.longest, newCurrent),
              freezes: s.lastActiveDate && daysBetweenLocal(s.lastActiveDate, today) > 1 && s.freezes > 0 ? s.freezes - 1 : s.freezes,
              lastActiveDate: today
            }
          })
          track('streak_updated', { current: newCurrent })
        }
        get().progressQuest('lessons_count', 1)
        if (summary.cardsWrong === 0 && summary.cardsCorrect > 0) {
          get().progressQuest('perfect_lesson', 1)
        }
      },

      markLessonComplete: (pathSlug, unitId, lessonId) => {
        const pp = { ...get().pathProgress }
        if (!pp[pathSlug]) pp[pathSlug] = defaultPathProgress()
        pp[pathSlug].completedLessons = { ...pp[pathSlug].completedLessons, [lessonId]: true }
        if (!pp[pathSlug].unlockedUnits[0]) pp[pathSlug].unlockedUnits[0] = 1
        set({ pathProgress: pp })
      },

      unlockNextUnit: (pathSlug, currentIdx) => {
        const pp = { ...get().pathProgress }
        if (!pp[pathSlug]) pp[pathSlug] = defaultPathProgress()
        pp[pathSlug].unlockedUnits[currentIdx + 1] = 1
        set({ pathProgress: pp })
        track('path_unit_completed', { path_slug: pathSlug, unit_index: currentIdx })
      },

      skipTestUnit: (pathSlug, unitIndex) => {
        const pp = { ...get().pathProgress }
        if (!pp[pathSlug]) pp[pathSlug] = defaultPathProgress()
        for (let i = 0; i <= unitIndex; i++) {
          pp[pathSlug].unlockedUnits[i] = 1
        }
        set({ pathProgress: pp })
        track('skip_test_passed', { path_slug: pathSlug, unit_index: unitIndex })
      },

      isUnitFullyComplete: (pathSlug, unitId) => {
        const path = PATHS_BY_SLUG[pathSlug]
        if (!path) return false
        const unit = path.units.find((u) => u.id === unitId)
        if (!unit) return false
        const completed = get().pathProgress[pathSlug]?.completedLessons || {}
        return unit.lessons.every((l) => !!completed[l.id])
      },

      enqueuePractice: (cardId) => {
        const q = get().practiceQueue.slice()
        const existing = q.findIndex((p) => p.cardId === cardId)
        if (existing >= 0) {
          q[existing] = { ...q[existing], dueAt: Date.now(), ease: Math.max(1.3, q[existing].ease - 0.2) }
        } else {
          q.push({ cardId, interval: 0, ease: 2.5, repetitions: 0, dueAt: Date.now() })
        }
        set({ practiceQueue: q })
      },

      reviewPractice: (cardId, isCorrect) => {
        const q = get().practiceQueue.slice()
        const i = q.findIndex((p) => p.cardId === cardId)
        if (i < 0) return
        const item = { ...q[i] }
        if (isCorrect) {
          item.repetitions += 1
          item.ease = Math.min(2.8, item.ease + 0.05)
          item.interval = item.repetitions === 1 ? 1 : Math.round(item.interval * item.ease)
          item.dueAt = Date.now() + item.interval * 86400000
          if (item.repetitions >= 3 && item.ease >= 2.5) {
            // graduated — remove from queue
            q.splice(i, 1)
            set({ practiceQueue: q })
            return
          }
        } else {
          item.repetitions = 0
          item.ease = Math.max(1.3, item.ease - 0.2)
          item.interval = 0
          item.dueAt = Date.now()
        }
        q[i] = item
        set({ practiceQueue: q })
        get().progressQuest('practice_count', 1)
      },

      ensureTodayQuests: () => {
        const today = todayLocalISO()
        const m = { ...get().questsByDate }
        if (!m[today]) {
          m[today] = generateDailyQuests()
          set({ questsByDate: m })
          track('quests_generated', { date: today })
        }
      },

      progressQuest: (kind, amount) => {
        const today = todayLocalISO()
        const m = { ...get().questsByDate }
        const list = (m[today] || []).slice()
        let changed = false
        for (let i = 0; i < list.length; i++) {
          if (list[i].kind === kind && !list[i].completedAt) {
            const newProgress = Math.min(list[i].target, list[i].progress + amount)
            const completed = newProgress >= list[i].target
            list[i] = {
              ...list[i],
              progress: newProgress,
              completedAt: completed ? Date.now() : undefined
            }
            changed = true
            if (completed) {
              const xp = list[i].rewardXp
              setTimeout(() => {
                set({ totalXp: get().totalXp + xp })
                track('quest_completed', { quest_id: list[i].id, kind, reward_xp: xp })
              }, 0)
            }
          }
        }
        if (changed) {
          m[today] = list
          set({ questsByDate: m })
        }
      },

      ensureLeague: () => {
        const u = get().user
        if (!u) return
        const today = new Date()
        const dow = today.getDay() // 0 sun
        const sinceMonday = (dow + 6) % 7
        const monday = new Date(today)
        monday.setDate(today.getDate() - sinceMonday)
        const weekStartISO = monday.toISOString().slice(0, 10)
        const l = get().league
        if (!l || l.weekStartISO !== weekStartISO) {
          set({
            league: {
              tier: 'POC',
              weekStartISO,
              members: buildLeagueMembers(u.displayName, u.role || 'OTHER', 0)
            }
          })
        }
      },

      addLeagueXp: (amount) => {
        const l = get().league
        if (!l) return
        const members = l.members.map((m) => (m.isMe ? { ...m, weeklyXp: m.weeklyXp + amount } : m))
        set({ league: { ...l, members } })
      },

      updateSettings: (s) => set({ settings: { ...get().settings, ...s } })
    }),
    {
      name: 'duodata-state-v1',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.user) {
          ;(window as any).__duodata_user_id = state.user.id
          ;(window as any).__duodata_user_role = state.user.role
        }
      }
    }
  )
)
