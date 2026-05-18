---
name: ama-duo-data-design
description: Use this skill to generate well-branded interfaces and assets for Ama Duo Data — Amanotes' youthful, gamified internal data-literacy app (Duolingo-style, but for game metrics). Contains essential design guidelines, colors, type, fonts, mascot, brand glyphs, and UI kit components for prototyping.
user-invocable: true
---

# Ama Duo Data — Brand & Product Design Skill

Read `README.md` for the full system: brand direction, content fundamentals, visual foundations, iconography. Read `colors_and_type.css` for every token (colors, type, spacing, radii, shadows, motion).

## When to use this skill

Anything that touches the Ama Duo Data brand — internal launch decks, app mocks, marketing pages, slide templates, throwaway prototypes, production-ready React components, etc. Equally good for one-off concept art and shipped code.

## Files

- **`README.md`** — brand context, voice rules, visual foundations, iconography
- **`colors_and_type.css`** — design tokens + base type classes (import this anywhere)
- **`fonts/README.md`** — Outfit / DM Sans / JetBrains Mono via Google Fonts CDN
- **`assets/`** — logo (light + dark), mark, mascot (Beat — simplified squircle character), brand glyphs (flame, XP gem, heart)
- **`preview/`** — Design System review cards. One per concept (use as visual reference).
- **`native/`** — **Production React Native source** for the mobile app (TypeScript, `StyleSheet.create`, `react-native-svg`). Includes `tokens.ts`, components/, screens/, App.tsx. This is what the iOS/Android build compiles from.
- **`ui_kits/mobile/`** — Browser-runnable preview (HTML/CSS/React via Babel) of the same mobile screens. Use for design reviews, demos, marketing screenshots. Not production code.
- **`ui_kits/web/`** — Creator dashboard kit (sidebar nav, topbar, dashboard, lessons table, team rollup). HTML/CSS/React.
- **`slides/`** — 16:9 brand deck (6 sample slides). Built on `deck-stage.js`.

## Working with this skill

1. **Throwaway prototypes / mocks / slides** — copy assets (logos, mascot, icons) out of `assets/` into your output folder. Import `colors_and_type.css` for tokens. Use existing UI kit components as a reference, not a dependency — they're inline JSX, easy to copy paste.

2. **Production mobile (React Native)** — work inside `native/`. Import tokens from `native/tokens.ts`, never hardcode colors. Use `StyleSheet.create`, `Pressable`, `react-native-svg`. The chunky button pattern is implemented in `components/DuoButton.tsx` as a layered View + Pressable (RN can't do the flat CSS shadow natively).

3. **Production web** — read `colors_and_type.css` and the README. Port the tokens to your design system (SCSS / Tailwind config / CSS-in-JS / wherever). The chunky button pattern, the lesson-tile pattern, and the streak/XP language are the most distinctive bits.

4. **Voice / copy** — when you write any text, follow the principles in README's CONTENT FUNDAMENTALS section. Short, lowercase confidence, plain-spoken, no emoji in product UI, one celebration per moment. Beat (the mascot) speaks in 3–8 words.

5. **If invoked without guidance** — ask the user what they want to build (a mock? a slide? a real component?), what surface (mobile / web / deck), and which screen/scope. Then act as an expert Ama Duo Data designer.

## Key visual rules — quick reference

- **Brand tri-color** — Pulse Violet (primary), Sky Blue (secondary — streaks/progress), Magic Pink (accent). Sun for XP. Green is *semantic success only*.
- **Dark-first surfaces** — Suno-inspired. `--surface-0` `#0B0B14` is the page bg; cards on `--surface-1` `#15151F`. Subtle violet + pink glow at body level sets mood without motion.
- **`.bg-aurora`** — animated violet + pink bloom, used only for slide title / closer / marketing hero. Never for app chrome.
- **Brand tri-color rule** — within the colored portion of a surface: 60% violet, 25% blue, 15% pink.
- **Pulse Violet `#6938EF`** is the hero. Always on cream or ink — never on its own light tints.
- **Sky Blue `#2D7FF9`** carries progress, streaks, and "in-progress" lesson tiles.
- **Chunky pressable buttons** — 4px base shadow that disappears on `:active`. Use for every primary action.
- **Lesson tiles** — round, 88px, chunky 6px base shadow, color = state (locked / current = violet / done = blue / bonus = sun).
- **Mascot Beat** — simplified violet squircle with eyes + smile. Appears at most once per screen. Speaks in plain lowercase confidence.
- **Outfit for ≥18px**, **DM Sans** for body, **JetBrains Mono** for stats and eyebrows.
- **No gradients** by default. **No glassmorphism**. **No emoji in product UI**.

## Output format

By default, output as static HTML artifacts (slides, mocks, marketing pages) the user can preview. Use plain HTML or React-via-Babel; pin the React and Babel script tags to the versions in the existing UI kits.
