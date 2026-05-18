# Ama Duo Data — Design System

A youthful, energetic design system for **Ama Duo Data** — Amanotes' internal *Duolingo-for-data* app. Daily, gamified, bite-sized lessons that teach Amanotes employees the metrics behind the music: DAU, MAU, ARPDAU, LTV, retention, A/B testing, funnels, cohorts. Streaks, hearts, XP, leaderboards — but for data literacy.

> **Status:** v0.1, created from a brief. No Amanotes codebase or Figma was attached. Open the **Design System** tab to review every token, color, type specimen, and component card.

---

## The product

| Surface | What it is | Audience | Folder |
|---|---|---|---|
| **Ama Duo Data (mobile)** | Daily 5-minute data lessons, streak game, leaderboard. Core product. | All Amanotes | `native/` (production RN) + `ui_kits/mobile/` (HTML preview) |
| **Creator dashboard (web)** | Where the data team authors lessons and tracks team progress. | Data team + L&D | `ui_kits/web/` |
| **Marketing / launch deck** | Internal launch deck and onboarding slides. | Whole company | `slides/` |

> **Native vs preview** — the mobile app is built as **React Native** code in `native/` (TypeScript, `StyleSheet.create`, `react-native-svg`). The browser-runnable preview in `ui_kits/mobile/` is the *same screens* re-implemented in HTML/CSS for design reviews and stakeholder demos. Update both when designs change.

## Sources

This system was created **from a written brief only**:

> *"Similar to Amanotes brand design but youthful, energetic, for the app similar to Duolingo but for learning data (game metrics) at Amanotes."*

No codebase, Figma file, brand book, logo, mascot, or font files were attached. Everything in this system is a working draft built against the brief — **directionally Amanotes (deep violet, music-energy) crossed with Duolingo's gameful warmth**. Drop real assets into the Import menu and the system can be re-keyed to match.

---

## The hero idea

**Music × data × play.** Amanotes makes the world hum; this system teaches the team why the world hums *to which beat*. The palette is a **tri-color**: **Pulse Violet** (primary), **Sky Blue** (secondary — streaks, progress, learning), and **Magic Pink** (accent — celebrations, hearts). **Sun** gold reserved for XP. **Green** is demoted to a semantic-success-only signal (correct answers). Everything sits on warm cream paper. Chunky pressable buttons, rounded geometric type, and a friendly mascot — **Beat** — keep the brand on the playful side of "professional."

---

## CONTENT FUNDAMENTALS

### Voice in one line

> **Encouraging, plain-spoken, slightly nerdy. We talk about numbers like a friend who really likes numbers.**

### Principles

| Principle | Do | Don't |
|---|---|---|
| **"You" — never "the user"** | "You're 3 days into your streak." | "User has completed 3 daily lessons." |
| **Sentence case in product, Title Case in marketing headers** | "Daily lesson" · "Continue learning" | "DAILY LESSON" · "click here to continue" |
| **One celebration per moment** | "Nice. +15 XP." | "🎉🔥 AWESOME WORK!!! +15 XP unlocked!!! 🎉🔥" |
| **No emoji in product UI** (logo bars + mascot do the warmth) | "Streak: 12 days" with the flame icon | "Streak: 12 days 🔥🔥🔥" |
| **Numbers > adjectives** | "Retention dropped 4.2 pts week-over-week." | "Retention dropped a lot recently." |
| **Define the jargon once, then use it** | "ARPDAU (avg. revenue per daily active user) is…" | Assume everyone knows ARPDAU |
| **Mascot speaks; brand explains** | Beat: *"Nice streak."* Brand: *"You've practiced 12 days in a row."* | Brand voice doing the "you're amazing!" lift |
| **Encourage > praise > scold** | "Heart lost. Try the next one." | "WRONG ❌" |

### Tone examples

**Daily push** — *Beat misses you. 5 minutes today?*
**Streak milestone** — *30 days. That's a habit.*
**Lesson intro** — *Today: cohort retention. The 3-curve shape that tells you if a game has legs.*
**Wrong answer** — *Not quite. ARPDAU is per **daily active user**, not per install. One more try.*
**Right answer** — *Right. +12 XP.*
**Streak freeze used** — *Streak saved. Don't worry about today.*
**Empty leaderboard slot** — *Quiet here. Pull a coworker in.*
**Error** — *Couldn't load that lesson. Try again, or pick another.*

### Anti-patterns

- "Crushing it," "rockstar," "ninja," "absolutely smashed it" — over-caffeinated
- "Unlock your data potential," "transform your career," "data-driven journey" — corporate filler
- "User," "users," "the player" — speak directly to the reader
- All caps for emphasis — use weight + size
- Stacked emoji 🔥🚀💯 — the mascot + iconography do this job

---

## VISUAL FOUNDATIONS

### Color

- **Pulse Violet** `--violet-500` `#6938EF` — the **primary hero**. Primary CTAs, key brand chrome, lesson-tile fills, current-state markers. Always on cream or ink, never on its own light tints.
- **Sky Blue** `--blue-400` `#2D7FF9` — the **secondary brand**. Streaks, progress bars, completed-lesson tiles, in-progress chrome, active actions (e.g. the "Check" button on a question). The Duo-style "you're moving."
- **Magic Pink** `--pink-400` `#FF3D8E` — celebrations, hearts, perfect-score pops. Sparingly.
- **Sun** `--sun-400` `#FFCD3C` — XP gems, streak flame, gold star, daily quest. Pairs with violet at high contrast.
- **Ink** `--ink-900` `#131326` — body text + dark mode primary. Faint violet undertone so it sits in the violet family.
- **Paper** `--paper` `#15151F` — **the new dark card surface** (alias of `--surface-1`). Replaces the old cream. App cards and device interiors sit on this.
- **Surfaces** `--surface-0` `#0B0B14` (page) → `--surface-3` `#2A2A38` (modal). A 4-step elevation system for the dark theme.
- **Ambient glow** — body shows a single violet bloom at the top + pink bloom at bottom-right. Subtle, static, mood-setting. `.bg-aurora` (animated) is reserved for slide titles and marketing hero only.
- **Green** `--green-500` `#14B856` — **semantic success only.** Correct-answer feedback strip, the green check icon. **Never** use green as primary CTAs, hero chrome, brand fills, or progress states — that work belongs to violet + blue.

**Brand tri-color rule.** Inside the *colored* portion of any surface (the brand 20%), aim for **60% violet, 25% blue, 15% pink**. Across the *whole* surface aim for **80% paper + ink, 12% violet, 8% (blue + pink + sun split)**. The brand should feel restrained until violet hits and blue pulls you forward.

### Typography

- **Display — Outfit** (Google Fonts). Variable, rounded geometric grotesque. Energetic at 800/900 weights — perfect for big numbers and screen titles. Used for ≥18px headings, big stats, marketing.
- **Body — DM Sans** (Google Fonts). Friendly, slightly geometric, highly legible. Used for everything else.
- **Mono — JetBrains Mono.** Used for stats with tabular numerals, code snippets, and eyebrow labels.
- **Scale:** 11 → 120. Tight tracking on display (-0.025em), normal on body.
- **Pairing rule:** Outfit for ≥18px, DM Sans for everything else. Never use Outfit for body — it gets soft at small sizes.

### Spacing & layout

- **4px base unit.** Steps: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96.
- **Cards:** generous internal padding (20–24px on mobile, 28–40px on web).
- **Section rhythm:** 64–96px between major web sections; 32–48px on mobile.
- **Max content width:** 1200px on web; 680px for prose.
- **Always grid/flex with `gap:`** — never margin-stacked siblings.

### Backgrounds

- **Dark-first.** The system runs on warm dark surfaces (`#0B0B14` → `#15151F`) with a single subtle violet glow at the top of the page and a soft pink glow at the bottom-right. **No more cream.** Inspired by Suno's moody, music-tech feel.
- **Surfaces:**
  - `--surface-0` `#0B0B14` — page background, deepest
  - `--surface-1` `#15151F` — cards, panels (alias `--paper`)
  - `--surface-2` `#1E1E2A` — card hover, nested card (alias `--paper-warm`)
  - `--surface-3` `#2A2A38` — highest, modal, popover
- **`.bg-aurora`** — kept for hero moments only (slide titles, marketing closers). A single violet bloom + pink bloom, gently animating over 32s. Use sparingly.
- **Inside cards stays solid** — never gradient-overload. The mood comes from the surface + accent color usage, not motion.
- **Patterns:** a single **dot grid** (1px white@8% dots, 24px spacing) is allowed on dark hero blocks to suggest sequencer/grid energy. Use sparingly.
- **Imagery:** real photography only. Warm grain, never glossy stock. On dark surfaces, photos sit in rounded cards with subtle white borders.

### Cards & elevation

- **Radius:** `--radius-lg` (20px) standard, `--radius-2xl` (36px) for hero/lesson tiles.
- **Border:** 1px `--border` on paper; no border on ink (contrast does the work).
- **Shadow:** soft, warm-violet tinted — never gray-blue. `--shadow-sm` resting, `--shadow-md` lifted, `--shadow-pop` (violet glow) for primary CTAs.
- **Chunky press shadow** (`--shadow-base-*`): a flat 4px-tall base color under primary buttons and lesson tiles — the Duo-style "I am pressable." Disappears on `:active` so the button feels physically pressed.
- **Inset highlight:** optional 1px top highlight on dark surfaces (`--shadow-inset`).

### Borders

- 1px hairlines (`--border`) on light surfaces.
- 1.5–2px on inputs (so they feel substantial).
- 2px brand-color ring for focus + selected states.
- Lesson-tile borders: 2px ink-900 on cream — the chunky "card-on-paper" look.

### Corner radii

| Token | Px | Use |
|---|---|---|
| `--radius-xs` | 6 | Badges, micro-tokens |
| `--radius-sm` | 10 | Tags, chips |
| `--radius-md` | 14 | Inputs, small cards |
| `--radius-lg` | 20 | Standard cards |
| `--radius-xl` | 28 | Sheets, large surfaces |
| `--radius-2xl` | 36 | Lesson tiles, hero cards |
| `--radius-pill` | 999 | Buttons, badges, segmented controls, avatars |

### Buttons & interactives

- **Primary CTA:** violet fill, white text, pill or 16px radius, **`--shadow-base-violet`** (chunky bottom) at rest.
- **Streak / win CTA:** green fill, ink text, same chunky shadow.
- **Secondary:** ink fill, paper text, chunky base.
- **Tertiary / ghost:** transparent, ink text, 1.5px ink-200 border.
- **Hover:** translate-Y -1px, shadow grows from `--shadow-base-*` (4px) to (6px). No color shift.
- **Press:** translate-Y +4px and shadow collapses to 0 — the button visibly *clicks down*. ~90ms.
- **Disabled:** 40% opacity, no chunky shadow, no pointer events.
- **Focus:** `--ring-focus` (3px violet ring at 32% opacity).
- **Min hit target:** 44×44 on mobile, 36×36 on web.

### Animation

- **Easing:** `--ease-out` for entries (220ms), `--ease-spring` for state changes (420ms, slightly bouncy), `--ease-bounce` for celebration moments.
- **Streak / completion:** spring pop (`scale 1 → 1.12 → 1`) + sun-color sparkle burst. Limit to once per moment.
- **Mascot:** idle blink every 4–6s, mouth animates on speech. Never auto-celebrate without earned moment.
- **Page transitions:** cross-fade + 8px Y-translate.
- **Loading:** skeleton shimmer in `--ink-100`. Spinner only for inline async (<2s).

### Transparency & blur

- **Backdrop blur** only on the mobile bottom tab bar (frosted ink, `backdrop-filter: blur(20px) saturate(160%)`).
- **No glassmorphism on cards or modals.** Cards are solid + chunky.

### Layout rules

- **Mobile tab bar:** fixed, 76pt tall (taller than typical to fit the chunky icon style), 5 items max, frosted ink.
- **Web nav:** sticky, 64px, paper with bottom 1px hairline.
- **Lesson tile grid:** a vertical path of round tiles — exactly mirrors Duolingo's tree but with Amanotes color story. Tiles use the chunky base shadow.

---

## ICONOGRAPHY

- **Primary set: [Phosphor Icons](https://phosphoricons.com)** — multi-weight, friendly geometric, free. Loaded via CDN: `https://unpkg.com/@phosphor-icons/web@2.1.1`.
- **Weights in use:** `regular` (default), `bold` (active nav, emphasis), `fill` (lesson-tile glyphs — the chunky filled style matches the brand).
- **Sizes:** 16, 20, 24, 32, 40, 48, 64.
- **Color:** inherits `currentColor`. Never recolor icons with brand gradients — let weight + position do the work.
- **Brand glyphs** (in `assets/`): the **Ama Duo Data mark** (rounded violet square with 3 rising bars), the **flame** (streak), the **XP gem** (sun), and the **heart** (life). These are bespoke; everything else is Phosphor.
- **Mascot — Beat** (in `assets/mascot-beat.svg`). A friendly chunky violet character with a bar-chart belly and a yellow antenna pulse. Used for: empty states, celebrations, daily push art, big "you did it" moments. **One mascot per screen, max.**
- **No emoji in product UI.** Use Phosphor + brand glyphs.
- **No PNG icons.** Vector only.
- **Unicode chars** (•, →, ✓, ×) are fine inside copy, never as standalone icons.

**Substitution flag:** Phosphor is a substitute for an Amanotes-specific icon set, which was not provided. Phosphor's filled weight matches the chunky-graphic vibe well — but if Amanotes has an in-house set, swap it.

---

## Index

- **`README.md`** — this file
- **`SKILL.md`** — Agent Skills manifest (compatible with Claude Code)
- **`colors_and_type.css`** — every design token + base type styles. Import this anywhere.
- **`fonts/`** — Google Fonts CDN reference + substitution notes
- **`assets/`** — logo (light + dark), mark, mascot (Beat — idle + celebrate, simplified), brand glyphs (flame, XP, heart)
- **`preview/`** — Design System review cards (~30 cards, one per concept)
- **`native/`** — **React Native source code for the mobile app** (tokens, components, screens, App.tsx). Production target.
- **`ui_kits/mobile/`** — Browser-runnable HTML/React preview of the mobile app (same screens as `native/`, mock implementation for design review)
- **`ui_kits/web/`** — Creator dashboard (HTML/CSS/React) — lesson authoring + analytics
- **`slides/`** — 16:9 deck templates (title, section, comparison, big quote, big number, mascot moment)

---

## Caveats / open questions

- **No real Amanotes brand materials were provided.** Logos, mascot, fonts, color tokens, voice rules — all directional, built from the brief. Bring in real assets and the system can be re-keyed in minutes (colors live in `colors_and_type.css`; logos in `assets/`).
- **Fonts are Google Fonts substitutes** (Outfit / DM Sans / JetBrains Mono). If Amanotes uses a licensed display face, swap `--font-display`.
- **Phosphor Icons** substitutes for an Amanotes icon set — please confirm or replace.
- **Mascot "Beat" is a placeholder concept** — not a finished character design. Treat the bar-chart-belly idea as a direction; a real illustrator should refine.
- **Only mobile + web creator dashboard are mocked.** Other surfaces (notifications, email digests, Slack bot) can plug in with the same tokens.
