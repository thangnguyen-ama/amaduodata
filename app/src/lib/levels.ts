// XP → Level table. Tiered, roughly quadratic.
// Level N requires N * 50 XP cumulative.
export function levelFromXp(totalXp: number): { level: number; intoLevel: number; toNext: number; pct: number } {
  let level = 1
  let used = 0
  while (true) {
    const need = level * 50
    if (totalXp < used + need) {
      const intoLevel = totalXp - used
      return { level, intoLevel, toNext: need - intoLevel, pct: intoLevel / need }
    }
    used += need
    level++
    if (level > 999) {
      return { level, intoLevel: 0, toNext: 50, pct: 0 }
    }
  }
}
