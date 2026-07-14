// ============================================================
// StadiumIQ 2026 — Constants & Config
// ============================================================

export const APP_NAME = 'StadiumIQ 2026';
export const APP_TAGLINE = 'GenAI-Powered FIFA World Cup Experience';

// ── Tournament Info ─────────────────────────────────────────
export const TOURNAMENT = {
  name: 'FIFA World Cup 2026',
  teams: 48,
  matches: 104,
  cities: 16,
  dates: 'June 11 – July 19, 2026',
  hosts: ['USA', 'Canada', 'Mexico'],
  defendingChampion: 'Argentina',
  sustainabilityGoal: '50% carbon reduction vs 2018',
};

// ── Host Cities ─────────────────────────────────────────────
export const HOST_CITIES = [
  { country: 'USA', city: 'New York/NJ',    venue: 'MetLife Stadium' },
  { country: 'USA', city: 'Los Angeles',    venue: 'SoFi Stadium' },
  { country: 'USA', city: 'Dallas',         venue: 'AT&T Stadium' },
  { country: 'USA', city: 'San Francisco',  venue: "Levi's Stadium" },
  { country: 'USA', city: 'Seattle',        venue: 'Lumen Field' },
  { country: 'USA', city: 'Boston',         venue: 'Gillette Stadium' },
  { country: 'USA', city: 'Miami',          venue: 'Hard Rock Stadium' },
  { country: 'USA', city: 'Atlanta',        venue: 'Mercedes-Benz Stadium' },
  { country: 'USA', city: 'Kansas City',    venue: 'Arrowhead Stadium' },
  { country: 'USA', city: 'Philadelphia',   venue: 'Lincoln Financial Field' },
  { country: 'USA', city: 'Houston',        venue: 'NRG Stadium' },
  { country: 'Canada', city: 'Toronto',     venue: 'BMO Field' },
  { country: 'Canada', city: 'Vancouver',   venue: 'BC Place' },
  { country: 'Mexico', city: 'Mexico City', venue: 'Estadio Azteca' },
  { country: 'Mexico', city: 'Guadalajara', venue: 'Estadio Akron' },
  { country: 'Mexico', city: 'Monterrey',   venue: 'Estadio BBVA' },
];

// ── Featured Venue ───────────────────────────────────────────
export const FEATURED_VENUE = {
  name: 'MetLife Stadium',
  city: 'New York/NJ',
  capacity: 82500,
  address: '1 MetLife Stadium Dr, East Rutherford, NJ',
  stages: ['Group Stage', 'Final'],
};

// ── Live Match ───────────────────────────────────────────────
export const LIVE_MATCH = {
  id: 'match-001',
  group: 'GROUP C',
  matchday: 'MATCHDAY 2',
  homeTeam: { name: 'BRAZIL',    flag: '🇧🇷', score: 2, color: '#FFD700' },
  awayTeam: { name: 'ARGENTINA', flag: '🇦🇷', score: 1, color: '#74C0FC' },
  minute: 67,
  date: 'June 18, 2026',
  time: '18:00 ET',
  venue: 'MetLife Stadium',
  attendance: 79340,
  capacity: 82500,
  isLive: true,
};

// ── Upcoming Matches ─────────────────────────────────────────
export const UPCOMING_MATCHES = [
  {
    id: 'match-001',
    homeTeam: { name: 'Brazil',    flag: '🇧🇷' },
    awayTeam: { name: 'Argentina', flag: '🇦🇷' },
    venue: 'MetLife Stadium',
    city: 'New York/NJ',
    date: 'Today',
    time: '18:00 ET',
    crowdLevel: 'high',
    isLive: true,
    score: '2 – 1',
  },
  {
    id: 'match-002',
    homeTeam: { name: 'France',  flag: '🇫🇷' },
    awayTeam: { name: 'Germany', flag: '🇩🇪' },
    venue: 'SoFi Stadium',
    city: 'Los Angeles',
    date: 'Jun 20',
    time: '20:00 PT',
    crowdLevel: 'moderate',
    isLive: false,
    score: null,
  },
  {
    id: 'match-003',
    homeTeam: { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    awayTeam: { name: 'Spain',   flag: '🇪🇸' },
    venue: 'AT&T Stadium',
    city: 'Dallas',
    date: 'Jun 22',
    time: '19:00 CT',
    crowdLevel: 'low',
    isLive: false,
    score: null,
  },
];

// ── Transport Status ─────────────────────────────────────────
export const TRANSPORT_STATUS = [
  {
    id: 'metro',
    type: 'Metro',
    label: 'NJ Transit',
    icon: '🚇',
    status: 'on-time',
    statusText: 'On Time',
    detail: '12 min to stadium',
    eta: '12 min',
  },
  {
    id: 'bus',
    type: 'Bus',
    label: 'Stadium Express',
    icon: '🚌',
    status: 'delayed',
    statusText: 'Delayed',
    detail: '+8 min delay · Stop 3',
    eta: '+8 min',
  },
  {
    id: 'rideshare',
    type: 'Rideshare',
    label: 'Uber / Lyft',
    icon: '🚗',
    status: 'surge',
    statusText: 'Surge ×2.4',
    detail: '$42 est · High demand',
    eta: '~15 min',
  },
];

// ── Gate Data ────────────────────────────────────────────────
export const GATES = [
  { id: 'A', wait: 3,  level: 'low',      accessible: true  },
  { id: 'B', wait: 11, level: 'high',     accessible: false },
  { id: 'C', wait: 5,  level: 'moderate', accessible: true  },
  { id: 'D', wait: 14, level: 'high',     accessible: false },
  { id: 'E', wait: 6,  level: 'moderate', accessible: false },
  { id: 'F', wait: 2,  level: 'low',      accessible: true  },
];

// ── AI Highlights ────────────────────────────────────────────
export const AI_HIGHLIGHTS = [
  "Brazil's Vinicius Jr. has attempted 6 shots on goal — highest this match",
  "Crowd surge expected at Gates B & D at halftime — 8 min avg wait predicted",
  "Next metro to Penn Station departs in 12 min from Stadium Stop 2",
];

// ── Quick Reply Chips ────────────────────────────────────────
export const QUICK_REPLIES = [
  'How do I get to my seat?',
  'Nearest food stall?',
  'Halftime transport tips?',
  '¿Dónde están los baños?',
  'Accessible entrance?',
  'Lost & Found?',
  'Match schedule?',
  'Sustainability tips?',
];

// ── Dashboard Alerts ─────────────────────────────────────────
export const INITIAL_ALERTS = [
  {
    id: 'alert-001',
    zone: 'Gate D',
    message: 'Queue exceeds 9 min — auto-redirect recommended',
    time: '67\'',
    status: 'open',
    priority: 'high',
  },
  {
    id: 'alert-002',
    zone: 'Food Court 3',
    message: 'Running low on vegan options — restock needed',
    time: '63\'',
    status: 'open',
    priority: 'moderate',
  },
  {
    id: 'alert-003',
    zone: 'Lift B2',
    message: 'Accessibility lift B2 back online',
    time: '58\'',
    status: 'resolved',
    priority: 'low',
  },
  {
    id: 'alert-004',
    zone: 'Section G',
    message: 'Crowd density at 94% — monitor for halftime surge',
    time: '55\'',
    status: 'open',
    priority: 'high',
  },
];

// ── Volunteers ───────────────────────────────────────────────
export const VOLUNTEERS = [
  { id: 'v1', name: 'Maria Santos',   role: 'Gate Marshal',     zone: 'Gate A', status: 'on-duty' },
  { id: 'v2', name: 'James Chen',     role: 'Crowd Control',    zone: 'Gate D', status: 'on-duty' },
  { id: 'v3', name: 'Priya Patel',    role: 'Accessibility Aid', zone: 'Gate F', status: 'on-duty' },
  { id: 'v4', name: 'Carlos Rivera',  role: 'Info Desk',        zone: 'Main Concourse', status: 'break'   },
  { id: 'v5', name: 'Anna Kowalski',  role: 'First Aid',        zone: 'Section C', status: 'on-duty' },
  { id: 'v6', name: 'Kwame Asante',   role: 'Transport Liaison', zone: 'Exit 2',  status: 'on-duty' },
];

// ── Match Commentary ─────────────────────────────────────────
export const COMMENTARY = [
  {
    minute: "67'",
    text: "Vinicius Jr. cuts inside from the left — Brazil's most dangerous moment of the second half so far. The crowd erupts at MetLife.",
  },
  {
    minute: "64'",
    text: "Argentina's pressing has intensified. They've won 8 of their last 10 duels in midfield — De Paul driving this relentlessly.",
  },
  {
    minute: "61'",
    text: "Substitution: Argentina bring on fresh legs as energy levels drop in the New Jersey humidity. Enzo Fernández off, Mac Allister on.",
  },
  {
    minute: "58'",
    text: "GOOOAL! Brazil's second — Rodrygo with a clinical finish from the edge of the box. 2-1 to Brazil. MetLife is absolutely rocking.",
  },
  {
    minute: "54'",
    text: "Yellow card: Paredes catches Paquetá late — referee shows no hesitation. Argentina will need to be disciplined.",
  },
];

// ── Fan Nations ──────────────────────────────────────────────
export const FAN_NATIONS = [
  { flag: '🇧🇷', country: 'Brazil',    tradition: 'The Seleção fans bring drums and samba rhythms' },
  { flag: '🇦🇷', country: 'Argentina', tradition: "Known for the 'Ole Ole Ole' chant worldwide" },
  { flag: '🇫🇷', country: 'France',    tradition: "'Allez les Bleus' fills every stadium" },
  { flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', country: 'England',   tradition: "'Three Lions' — belted out with tremendous pride" },
  { flag: '🇲🇽', country: 'Mexico',    tradition: "El Tri fans famous for the 'Cielito Lindo' anthem" },
  { flag: '🇯🇵', country: 'Japan',     tradition: 'Blue Samurai fans known for cleaning stadiums after matches' },
];

// ── Sustainability Stats ─────────────────────────────────────
export const SUSTAINABILITY_STATS = [
  { label: 'Carbon saved vs WC 2018',    value: '42%',  progress: 42  },
  { label: 'Public transport usage',      value: '68%',  progress: 68  },
  { label: 'Renewable energy at venue',   value: '100%', progress: 100 },
];

// ── Match Stats ──────────────────────────────────────────────
export const MATCH_STATS = [
  { label: 'Possession',    home: 58, away: 42, unit: '%'  },
  { label: 'Shots on Goal', home: 6,  away: 3,  unit: ''   },
  { label: 'Passes',        home: 324, away: 198, unit: '' },
  { label: 'Fouls',         home: 8,  away: 12, unit: ''   },
];

// ── AI System Prompt ─────────────────────────────────────────
export const GEMINI_SYSTEM_PROMPT = `You are StadiumIQ AI, the official AI assistant for the FIFA World Cup 2026 at MetLife Stadium, New York/NJ.

You help fans with:
- Navigation inside MetLife Stadium (sections A–H, gates A–F, seats, restrooms, food, exits)
- Accessibility information (wheelchair access at Gates A, C, F; accessible seating in sections 120-A, 230-B, 340-C; companion seating available)
- Transport (NJ Transit metro — on time, 12 min walk; Stadium Express Bus — Stop 3; Rideshare — surge ×2.4 active)
- Match info (Brazil vs Argentina, Group C Matchday 2, June 18 2026, 18:00 ET, current score 2-1 Brazil, 67th minute)
- Gate wait times (Gate A: 3 min low; Gate B: 11 min high; Gate C: 5 min moderate; Gate D: 14 min high; Gate E: 6 min moderate; Gate F: 2 min low)
- Tournament info (48 teams, 104 matches, 16 host cities across USA, Canada, Mexico; June 11 – July 19 2026)
- Sustainability (FIFA Green Goals 2026 — 42% carbon reduction achieved, 68% public transport usage, 100% renewable energy at venue)
- Fan culture and tournament history
- Lost & Found: Stadium Office, Section 110 Gate Level
- First Aid: Two stations — Section 140 and Section 320

CRITICAL: Detect the language the user is writing in and ALWAYS respond in that same language. If someone writes in Spanish, respond in Spanish. If Portuguese, respond in Portuguese. French, respond in French. Arabic, respond in Arabic. Japanese, respond in Japanese. Hindi, respond in Hindi. Match their language perfectly.

Keep responses helpful, concise, and warm. Use emojis sparingly but effectively. Always prioritize safety and accessibility.`;
