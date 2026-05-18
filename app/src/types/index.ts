export type Role = 'PO' | 'UA' | 'MO' | 'GD' | 'LD' | 'MS' | 'DA' | 'CRE' | 'OTHER'
export type Team = 'PI' | 'BH' | 'DR' | 'GDUC' | 'NGD' | 'MEP' | 'GS' | 'DnI' | 'Other'
export type FunctionDomain = 'product' | 'ua' | 'mon' | 'creative' | 'business'

export interface User {
  id: string
  email: string
  displayName: string
  avatarUrl?: string
  role: Role | null
  team: Team | null
  createdAt: number
}

export type CardType =
  | 'multiple_choice'
  | 'formula_completion'
  | 'drag_to_order'
  | 'matching_pairs'
  | 'scenario_judgment'
  | 'free_input_numeric'

export interface BaseCard {
  id: string
  type: CardType
  prompt: string
  explanation: string
  xpReward: number
  difficulty: 1 | 2 | 3 | 4 | 5
  metricSlugs: string[]
  function: FunctionDomain
}

export interface MultipleChoiceCard extends BaseCard {
  type: 'multiple_choice'
  choices: string[]
  answerIndex: number
}

export interface FormulaCompletionCard extends BaseCard {
  type: 'formula_completion'
  formulaTemplate: string // e.g. "ROAS D7 = Revenue D7 / ___"
  answer: string
  acceptedAlternatives?: string[]
}

export interface DragToOrderCard extends BaseCard {
  type: 'drag_to_order'
  items: string[] // shown in shuffled order at runtime
  correctOrder: string[]
}

export interface MatchingPairsCard extends BaseCard {
  type: 'matching_pairs'
  pairs: { left: string; right: string }[]
}

export interface ScenarioJudgmentCard extends BaseCard {
  type: 'scenario_judgment'
  scenario: string
  choices: string[]
  answerIndex: number
}

export interface FreeInputNumericCard extends BaseCard {
  type: 'free_input_numeric'
  answer: number
  unit?: string // e.g. "%", "x"
  tolerance?: number // default 0.02 (2%)
}

export type Card =
  | MultipleChoiceCard
  | FormulaCompletionCard
  | DragToOrderCard
  | MatchingPairsCard
  | ScenarioJudgmentCard
  | FreeInputNumericCard

export interface Lesson {
  id: string
  name: string
  cardIds: string[]
}

export interface Unit {
  id: string
  name: string
  goal: string
  lessons: Lesson[]
}

export interface Path {
  id: string
  slug: string
  name: string
  description: string
  function: FunctionDomain
  units: Unit[]
}

export interface MetricNode {
  slug: string
  name: string
  definition: string
  formula?: string
  view: 'act_date' | 'cohort' | 'both'
  function: FunctionDomain
  parentSlug?: string
  datahubUrl?: string
}

export interface LessonAttempt {
  id: string
  userId: string
  pathSlug: string
  unitId: string
  lessonId: string
  startedAt: number
  completedAt?: number
  xpEarned: number
  cardsCorrect: number
  cardsWrong: number
  cardsTotal: number
}

export interface CardAttempt {
  cardId: string
  isCorrect: boolean
  timeMs: number
  at: number
}

export interface PracticeItem {
  cardId: string
  interval: number // days
  ease: number
  repetitions: number
  dueAt: number
}

export type QuestKind = 'xp_target' | 'lessons_count' | 'perfect_lesson' | 'practice_count'

export interface DailyQuest {
  id: string
  kind: QuestKind
  text: string
  target: number
  progress: number
  rewardXp: number
  completedAt?: number
}

export type LeagueTier =
  | 'POC'
  | 'MVP'
  | 'SoftLaunch'
  | 'PMF'
  | 'ScaleUp'
  | 'Revenue'
  | 'Maintenance'

export interface LeagueMember {
  id: string
  name: string
  role: Role
  weeklyXp: number
  isMe: boolean
}

export interface PlacementResult {
  takenAt: number
  pathStarts: Record<string, number> // path slug -> unit index (0-based)
  rawScore: number
}
