# StadiumIQ 2026 — Architecture

## Overview

StadiumIQ 2026 is a React 18 + Vite single-page application serving as a GenAI-powered stadium operations and fan experience platform for the FIFA World Cup 2026.

## Key Design Decisions

### Split Theme
- **Fan pages** (Home, Navigate, Chat, Fan Zone): Light, premium aesthetic with `#F8FAFF` base, navy text, gold accents
- **Ops Dashboard**: Deep navy `#0A1628` background, data-dense layout, own full-page layout without shared Navbar

### Routing
- `/`          → Home (fan hub, live match, transport)
- `/navigate`  → Navigate (SVG map, gate times, transport)
- `/chat`      → AI Concierge (Gemini-powered multilingual)
- `/fanzone`   → Fan Zone (stats, commentary, sustainability)
- `/dashboard` → Ops Dashboard (dark theme, own layout)

## Technology Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 18 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 |
| Icons | Lucide React |
| AI | Google Gemini (`gemini-2.0-flash`) |
| Database | Firebase Firestore (real-time) |
| Auth | Firebase Anonymous Auth |
| Analytics | Google Analytics 4 |
| Testing | Vitest + React Testing Library |

## Directory Structure

```
src/
├── api/
│   ├── geminiApi.js       # Gemini 2.0 Flash integration + mock fallback
│   └── firebase.js        # Firestore, Auth, Analytics
├── components/
│   ├── AlertFeed.jsx      # Dashboard alert list
│   ├── ChatBubble.jsx     # Chat message bubbles (user/AI)
│   ├── CommentaryFeed.jsx # AI match commentary
│   ├── CrowdHeatmap.jsx   # Dashboard SVG density map
│   ├── MatchCard.jsx      # Hero live match card
│   ├── Navbar.jsx         # Fan-facing sticky nav + live ticker
│   ├── StatCard.jsx       # Quick stat tiles (light/dark)
│   ├── StatusPill.jsx     # Status badge (crowd/transport/alert)
│   ├── SustainabilityTracker.jsx
│   ├── TransportStrip.jsx # Horizontal transport cards
│   ├── VenueMap.jsx       # SVG venue map (500×500)
│   └── VolunteerTable.jsx # Dashboard volunteer management
├── context/
│   └── AppContext.jsx     # Match state, alerts, minute clock
├── data/
│   └── mockData.js        # Aggregated mock data exports
├── pages/
│   ├── Chat.jsx           # AI Concierge (Gemini)
│   ├── Dashboard.jsx      # Ops Dashboard (dark theme)
│   ├── FanZone.jsx        # Stats, commentary, sustainability
│   ├── Home.jsx           # Live match hub
│   └── Navigate.jsx       # Venue map + gate times
├── test/
│   ├── setup.js           # jest-dom setup
│   ├── StatusPill.test.jsx
│   ├── StatCard.test.jsx
│   └── ChatBubble.test.jsx
└── utils/
    ├── analytics.js       # GA4 event wrapper
    ├── constants.js       # All mock data, system prompt
    └── helpers.js         # Formatting, status utilities
```

## AI Integration

### Gemini 2.0 Flash (`src/api/geminiApi.js`)
- **System prompt**: Configures AI as a stadium-aware, multilingual FIFA WC 2026 assistant
- **Multilingual**: Detects input language and responds in kind (tested: ES, FR, PT, AR, JA, HI)
- **Chat history**: Passes prior messages as Gemini chat history for contextual responses
- **Mock fallback**: If `VITE_GEMINI_API_KEY` is absent, rotates through curated mock responses — demo works without API key

### Firebase (`src/api/firebase.js`)
- **Firestore**: Real-time `onSnapshot` listeners for alerts and crowd collections
- **Anonymous Auth**: Signed in on app mount via `signInAnonymously`
- **Graceful degradation**: Falls back to mock data if project keys are absent

## Environment Variables

```
VITE_GEMINI_API_KEY          # Google AI Studio key
VITE_FIREBASE_API_KEY        # Firebase web API key
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_GA_MEASUREMENT_ID       # GA4 Measurement ID
```

## Typography System

| Family | Usage |
|--------|-------|
| Bebas Neue | Match scores, gate letters, stat values, commentary timestamps |
| Inter 300/400/500/600 | All body text, labels, navigation |
| JetBrains Mono | Crowd counts, wait times, timestamps, data values |

## Color System

### Fan Pages (Light)
- `base #F8FAFF` — page background
- `navy #0F2044` — primary text, hero cards
- `gold #D97706` — CTAs, active states, scores
- `crimson #DC2626` — LIVE indicators, alerts
- `sky #0EA5E9` — navigation, info
- `green #16A34A` — success, sustainability

### Ops Dashboard (Dark)
- `#0A1628` — page base
- `#0F2044` — cards
- `#FFB800` — gold accents (brighter on dark)
- `#EF4444` — alerts

## Demo Flow (Hackathon)

1. **Home** — Show live match card (LIVE badge pulsing), venue selector
2. **Navigate** — Toggle filter tabs, show Accessibility Mode with route
3. **Chat** — Type or click a quick reply chip → AI responds (real or mock)
4. **Dashboard** — Show dark ops view, click sidebar sections, AI recommendation
5. **Fan Zone** — Match stats bars, commentary feed, sustainability tracker
