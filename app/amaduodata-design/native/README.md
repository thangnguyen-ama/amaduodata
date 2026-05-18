# Ama Duo Data — Native (React Native)

**Production-grade React Native code for the mobile app.** This folder is the source of truth for the iOS / Android build.

For a **browser preview** of the same screens, see `ui_kits/mobile/` — that's an HTML/CSS/React-via-Babel mock, useful for design reviews and rapid iteration. The shapes match, but the production app is built from the files in *this* folder.

## Layout

```
native/
├── App.tsx                       — root, stack navigator stub
├── tokens.ts                     — colors, type, spacing, radii, shadows (mirror of colors_and_type.css)
├── components/
│   ├── DuoButton.tsx             — chunky pressable button (animated 4px drop shadow)
│   ├── TopBar.tsx                — streak / XP / hearts row
│   ├── BottomNav.tsx             — frosted-ink 5-item tab bar
│   ├── LessonTile.tsx            — round path tile (locked / current / done / bonus)
│   └── Mascot.tsx                — Beat (SVG via react-native-svg)
└── screens/
    ├── LearnPathScreen.tsx
    ├── LessonScreen.tsx
    ├── CelebrationScreen.tsx
    ├── LeagueScreen.tsx
    ├── ProfileScreen.tsx
    ├── PracticeScreen.tsx
    └── StatsScreen.tsx
```

## Dependencies (expected)

The code targets a stock Expo / RN setup. Required deps:

```bash
npm i react-native-svg          # Mascot + brand glyphs
npm i @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
npm i @expo-google-fonts/outfit @expo-google-fonts/dm-sans @expo-google-fonts/jetbrains-mono
npm i expo-font expo-status-bar
npm i react-native-reanimated   # button press spring (optional)
```

Drop the brand glyphs from `../assets/` into your asset pipeline (or import via `react-native-svg`'s `SvgUri` for the mascot).

## Conventions

- **All literal colors live in `tokens.ts`** — never hardcode hex inside a component.
- **`StyleSheet.create`** for every component — no inline `style={{ ... }}` objects (perf + readability).
- **Pressable everywhere** — no `TouchableOpacity` (less idiomatic on RN 0.71+).
- **Font weights are strings** — `'700'` not `700`. Outfit + DM Sans must be loaded via `expo-font` before render.
- **No global state library** in this kit — screens accept props and call back via callbacks. Plug into your store of choice.

## Quick start (Expo)

```bash
npx create-expo-app ama-duo-data --template blank-typescript
cd ama-duo-data
# Paste the contents of native/ into src/
npm i react-native-svg @react-navigation/native @react-navigation/bottom-tabs \
      @react-navigation/stack @expo-google-fonts/outfit @expo-google-fonts/dm-sans \
      @expo-google-fonts/jetbrains-mono expo-font
npx expo start
```

## Why a separate `native/` and `ui_kits/mobile/`

- **`native/`** — what the mobile app actually compiles from. RN APIs, TS types, real navigation.
- **`ui_kits/mobile/`** — a visual mock for the design system review, browser-runnable, no toolchain. Good for marketing screenshots, stakeholder demos, and design iteration.

When the design changes:
1. Update tokens in `tokens.ts` **and** `../colors_and_type.css`.
2. Update components in **both** folders (they're small).
3. Keep the visual story identical.

Long-term, consider promoting `native/` to use `react-native-web` so the same code can render in both contexts. For now, treating them as parallel implementations is fine — they're each ~300–500 lines.
