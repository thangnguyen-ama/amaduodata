# Design — UX patterns

Repeating patterns the whole product follows.

## Feedback (correct / incorrect)

- Correct: green tick + `+XP` chip burst, 240 ms; Continue auto-focused.
- Incorrect: red mark + heart shake, then `The right answer is X` + 1-line explanation; Continue auto-focused.
- No sound by default. Sound toggle in Profile.
- The "explanation" line is always one of: the canonical metric definition, the formula, or a 1-line reason. Never a paragraph.

## Navigation

- **Web**: persistent left rail with 5 items (Home, Paths, Practice, Leagues, Profile). Top bar for search, metric tree, glossary, admin (role-gated).
- **Mobile web**: bottom nav with the same 5 items. Top bar collapses to logo + profile avatar.
- Breadcrumbs only in admin.

## Empty states

Every page that fetches a list MUST have a designed empty state with: 1) what it means, 2) a recommended next action.

Examples:

- Practice queue empty → "Nothing to practice. Try a new lesson." + CTA to Home.
- Badge grid empty → "Earn your first badge by completing a unit." + CTA.

## Loading

- Skeleton screens for views with predictable layout (Home, Profile, Path).
- Spinner only for inline buttons during submit.

## Errors

- Inline near the action (not a global toast) when possible.
- One sentence; one CTA (Retry / Contact ops).
- For 5xx: a single error screen with "We're on it. Try again in a minute." Link to `#data-insights` Slack.

## Confirmations

- Streak freeze auto-applied → snackbar "Streak saved with a freeze (1 left this month)".
- Role change → modal with a one-line preview of "what changes now" (recommendations refresh).
- Card publish → no celebratory modal (it's an admin operation). Toast: "Published. Learners see it within 5 min."

## Tone

- Encouraging on failure; never sarcastic.
- "Try again" not "You got it wrong, dummy".
- Use Amanotes terminology consistently (`UV`, `ARPDAU`, `R7`) — do not soften it to "user value".

## Mobile vs desktop

- Lesson player is identical across web and mobile web; mobile bottom nav stays visible during lessons.
- Metric tree degrades to a vertical list on screens <768 px wide.
- Admin is web-only.

## Animations

- Honor `prefers-reduced-motion`. Celebrate animations collapse to fades.
- No autoplay video.
