# Design — accessibility

DuoData targets **WCAG 2.1 AA**. Internal product, but accessibility is a values-default, not a compliance afterthought.

## Color & contrast

- All text ≥ 4.5:1 vs background. Display text (24px+ bold) ≥ 3:1.
- Function colors (Product purple, UA green, Mon orange, Creative pink) must be paired with a label or icon — never color alone.
- Correct / incorrect states use both color and shape (tick / cross).

## Keyboard

- All interactive elements reachable by Tab in document order.
- Visible focus ring (2 px solid brand primary).
- Lesson player: `1`–`4` keys select multiple-choice answers; `Enter` submits; `Esc` opens "leave lesson" confirm.
- Metric tree navigable as a tree (ARIA `role=tree`), `Up/Down/Left/Right`.

## Screen readers

- Every interactive component has an `aria-label` or visible label.
- Card prompts announce as `<h2>` so SR users hear them on focus.
- Live regions for `+XP`, `-heart`, `Correct`, `Incorrect` (`aria-live=polite`).
- Avatar fallback has alt text "User <name>".

## Motion

- `prefers-reduced-motion` collapses `motion/celebrate` to fade.
- No parallax. No infinite-scroll auto-animation.

## Touch targets

- Minimum 44×44 px (Apple HIG / Material guidance).
- Heart icons, XP chips and league rank badges are decorative and exempt as long as the action sits on a larger hit area.

## Hearing

- No audio-only feedback. Every sound has a visual counterpart.

## Cognitive

- Card text ≤60 words in prompt; ≤120 in explanation.
- Avoid Amanotes jargon without a tooltip linking to the glossary (since DuoData teaches that jargon, this is gradient — early units explain, advanced units assume).
- Time pressure: no timed cards. Time-to-answer is logged but not surfaced to learners as a score.

## Internationalization

- Right-to-left layouts not in MVP scope (no current RTL Amanoter audience).
- All copy is translatable via gettext-style keys, but only English ships in MVP.

## Testing

- axe-core checks in CI on every page.
- Manual keyboard pass + VoiceOver / NVDA test before each major release.
