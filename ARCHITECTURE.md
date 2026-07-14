# StadiumIQ 2026 — Architecture

## Overview

GenAI-powered stadium operations and fan experience platform for FIFA
World Cup 2026. Built for fans, venue staff, and organizers across 16
host cities in USA, Canada, Mexico.

## Layered Structure

### 1. Pages (`/src/pages`)

Thin composition layers only. Each page wires data and components
together. No business logic, no complex markup — under 70 lines each
(excluding comments).

### 2. Components (`/src/components`)

Single-responsibility UI components. Each does exactly one thing,
receives data via props, has PropTypes on every prop, and has no
knowledge of data sources. All use **named exports**.

### 3. Hooks (`/src/hooks`) ← Phase 2

All stateful logic. Own state, derive values with `useMemo`, expose
actions via `useCallback`. Components remain as thin as possible.

### 4. Utils & API (`/src/utils`, `/src/api`) ← Phase 2/3

Pure functions (`constants.js`, `helpers.js`, `analytics.js`) and
service integrations (`geminiApi.js`, `firebase.js`). All async calls
wrapped in `safeAsync` for consistent error handling.

## GenAI Integration ← Phase 3

- **AI Concierge (`/chat`)**: Gemini multilingual assistant — detects
  language and responds in kind. Specialized for FIFA WC 2026 venue
  navigation and tournament information.
- **Match Commentary (`/fanzone`)**: Gemini generates real-time match
  insights on demand.
- **Ops AI Insights (`/dashboard`)**: Gemini crowd modeling
  recommendations for venue staff.

## Google Services ← Phase 3

| Service | Purpose |
|---------|---------|
| Gemini API | AI Concierge + Commentary |
| Firebase Firestore | Live crowd data, alerts, volunteer assignments |
| Firebase Auth | Anonymous auth for fan sessions |
| Google Analytics 4 | Event tracking |

## Type Safety

All `src/utils/**`, `src/hooks/**`, and `src/api/**` files open with
`// @ts-check`. JSDoc annotations validated by TypeScript checker:
`npm run type-check`.

## Constants

All magic numbers in `/src/utils/constants.js`. No inline literals
in component code. Reference constants by name for searchability
and single-source-of-truth.

## Error Handling ← Phase 3

All async ops use `safeAsync` wrapper from `/src/utils/errorHandler.js`
which returns `[data, error]` tuples instead of throwing, enabling
consistent error boundary handling.

## Code Quality

| Tool | Command | Purpose |
|------|---------|---------|
| ESLint | `npm run lint` | Lint rules incl. jsx-a11y, react-hooks |
| Prettier | `npm run format` | Consistent code style |
| TypeScript | `npm run type-check` | JSDoc type validation |
| Husky | pre-commit hook | Runs lint-staged before every commit |
| Vitest | `npm run test` | Component unit tests |

## Accessibility Checklist

- Skip-to-main link visible on keyboard focus
- Gold `outline` on all `:focus-visible` elements
- `role="log"` + `aria-live="polite"` on chat messages
- `role="progressbar"` with `aria-valuenow` on sustainability bars
- `role="switch"` + `aria-checked` on accessibility mode toggle
- `aria-label` on all icon-only buttons
- `scope="col"` on table headers
- Semantic `<time>` elements for all timestamps
- `<article>` elements for chat bubbles and match cards

## Routing

| Path | Component | Layout |
|------|-----------|--------|
| `/` | `Home` | `FanLayout` (Navbar + skip-link) |
| `/navigate` | `Navigate` | `FanLayout` |
| `/chat` | `Chat` | `FanLayout` |
| `/fanzone` | `FanZone` | `FanLayout` |
| `/dashboard` | `Dashboard` | Standalone (dark ops layout) |

## Color System

### Fan Pages (Light)

| Token | Hex | Usage |
|-------|-----|-------|
| `base` | `#F8FAFF` | Page background |
| `surface1` | `#FFFFFF` | Cards |
| `surface2` | `#F1F5F9` | Highlighted sections |
| `surface3` | `#E2E8F0` | Borders, dividers |
| `navy` | `#0F2044` | Primary text, hero cards |
| `gold` | `#D97706` | CTAs, active states, scores |
| `crimson` | `#DC2626` | LIVE indicator, alerts |
| `sky` | `#0EA5E9` | Transport info, accessibility |
| `green` | `#16A34A` | Success, sustainability |
| `muted` | `#64748B` | Secondary text |

### Ops Dashboard (Dark)

| Token | Hex | Usage |
|-------|-----|-------|
| `ops-base` | `#0A1628` | Page background |
| `ops-surface1` | `#0F2044` | Sidebar, cards |
| `ops-surface2` | `#162852` | Hover/active states |
| `ops-surface3` | `#1E3A6E` | Borders |
| `ops-gold` | `#FFB800` | Accents (brighter on dark) |
| `ops-muted` | `#94A3B8` | Secondary text |

## Typography

| Family | Weight | Usage |
|--------|--------|-------|
| Bebas Neue | 400 | Scores, gate letters, stat values |
| Inter | 300/400/500/600 | All body text, labels, nav |
| JetBrains Mono | 400/500 | Gate waits, timestamps, data |
