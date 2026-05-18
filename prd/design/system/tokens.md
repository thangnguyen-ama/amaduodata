# Design — tokens

## Color

Inherit Amanotes brand primaries; add semantic tokens.

| Token | Light | Dark |
| --- | --- | --- |
| `color/bg/canvas` | `#FFFFFF` | `#0B0F14` |
| `color/bg/surface` | `#F7F8FA` | `#161B22` |
| `color/text/primary` | `#0B0F14` | `#F5F7FA` |
| `color/text/secondary` | `#5B6573` | `#A8B0BB` |
| `color/brand/primary` | Amanotes brand | Amanotes brand |
| `color/accent/correct` | `#23A35F` | `#33D688` |
| `color/accent/incorrect` | `#D92D20` | `#F97066` |
| `color/accent/heart` | `#E92C2C` | `#F76666` |
| `color/accent/streak` | `#F79009` | `#FDB022` |
| `color/accent/xp` | `#1570EF` | `#84CAFF` |
| `color/function/product` | `#5E60CE` | `#9D9CF2` |
| `color/function/ua` | `#2DCE89` | `#6EE7B7` |
| `color/function/mon` | `#F79009` | `#FDB022` |
| `color/function/creative` | `#EC4899` | `#F472B6` |

Function colors come from the metric tree visualization and are used consistently anywhere a metric is labeled by function.

## Typography

Inherit Amanotes type system. Scale used:

| Role | Size / line-height |
| --- | --- |
| Display | 32 / 40 |
| Heading L | 24 / 32 |
| Heading M | 20 / 28 |
| Body L | 18 / 28 |
| Body M | 16 / 24 |
| Body S | 14 / 20 |
| Mono / formula | JetBrains Mono / 16 / 24 |

Formulas always render in mono.

## Spacing

4 px base. Tokens: `space/0=0`, `1=4`, `2=8`, `3=12`, `4=16`, `5=24`, `6=32`, `8=48`, `10=64`.

## Radius

`radius/sm=6`, `radius/md=10`, `radius/lg=16`, `radius/pill=999`.

## Elevation

`elev/0=none`, `elev/1=card`, `elev/2=overlay`, `elev/3=modal`.

## Motion

| Token | Duration | Easing | Use |
| --- | --- | --- | --- |
| `motion/instant` | 80 ms | linear | press feedback |
| `motion/fast` | 160 ms | ease-out | hover, focus |
| `motion/base` | 240 ms | ease-out | card transitions |
| `motion/celebrate` | 480 ms | spring | XP burst, level up |

Honor `prefers-reduced-motion`: `motion/celebrate` collapses to `motion/base`.
