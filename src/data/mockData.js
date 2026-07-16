/**
 * Hardcoded seed data for StadiumIQ 2026.
 * All values reflect FIFA World Cup 2026
 * real tournament context.
 */

export const match = {
  homeTeam: 'Brazil',
  awayTeam: 'Argentina',
  homeScore: 2,
  awayScore: 1,
  minute: 67,
  status: 'LIVE',
  group: 'GROUP C · MATCHDAY 2',
  venue: 'MetLife Stadium',
  city: 'New York / NJ',
  attendance: 79340,
  capacity: 82500,
}

export const upcomingMatches = [
  {
    id: 1,
    home: 'France',
    away: 'Germany',
    venue: 'SoFi Stadium',
    city: 'Los Angeles',
    date: 'Jun 20',
    time: '15:00 PT',
    crowd: 'high',
  },
  {
    id: 2,
    home: 'England',
    away: 'Spain',
    venue: 'AT&T Stadium',
    city: 'Dallas',
    date: 'Jun 22',
    time: '18:00 CT',
    crowd: 'medium',
  },
  {
    id: 3,
    home: 'Portugal',
    away: 'Morocco',
    venue: 'Gillette Stadium',
    city: 'Boston',
    date: 'Jun 24',
    time: '12:00 ET',
    crowd: 'low',
  },
]

export const tournamentStats = [
  { id: 'teams', label: 'Teams', value: '48', color: 'gold' },
  {
    id: 'fans',
    label: 'Fans Today',
    value: '79,340',
    color: 'crimson',
  },
  {
    id: 'matches',
    label: 'Total Matches',
    value: '104',
    color: 'sky',
  },
  { id: 'cities', label: 'Host Cities', value: '16', color: 'green' },
]

export const aiHighlights = [
  'Vinicius Jr. has attempted 6 shots — ' +
    "highest this match. Argentina's keeper " +
    'under constant pressure.',
  'Crowd surge expected at Gates B & D ' +
    'at halftime — 8 min avg wait predicted. ' +
    'Gate A recommended.',
  'NJ Transit Stadium Express departs ' +
    'every 8 min. Next: 12 min from Stop 2.',
]

export const transportStatus = [
  {
    id: 'metro',
    name: 'NJ Transit Metro',
    status: 'on-time',
    detail: '12 min walk to Stadium Stop',
    eta: '12 min',
    icon: 'Train',
  },
  {
    id: 'bus',
    name: 'Stadium Express Bus',
    status: 'delayed',
    detail: '+8 min delay',
    eta: '24 min',
    icon: 'Bus',
  },
  {
    id: 'rideshare',
    name: 'Rideshare',
    status: 'surge',
    detail: 'Surge pricing x2.4 active',
    eta: '$42 est',
    icon: 'Car',
  },
]

export const gates = [
  { id: 'A', wait: 2, crowd: 'low', open: true },
  { id: 'B', wait: 9, crowd: 'high', open: true },
  { id: 'C', wait: 4, crowd: 'medium', open: true },
  { id: 'D', wait: 11, crowd: 'high', open: true },
  { id: 'E', wait: 5, crowd: 'medium', open: true },
  { id: 'F', wait: 2, crowd: 'low', open: true },
]

export const alerts = [
  {
    id: 1,
    zone: 'Gate D',
    msg:
      'Queue exceeds 9 min — ' +
      'auto-redirect to Gate F recommended',
    time: '67:14',
    resolved: false,
    type: 'congestion',
  },
  {
    id: 2,
    zone: 'Food Court 3',
    msg: 'Running low on vegan options — ' + 'restock requested',
    time: '65:30',
    resolved: false,
    type: 'stock',
  },
  {
    id: 3,
    zone: 'Lift B2',
    msg: 'Accessibility lift B2 back online',
    time: '63:00',
    resolved: true,
    type: 'accessibility',
  },
]

export const volunteers = [
  {
    id: 1,
    name: 'Maria Santos',
    role: 'Gate Marshal',
    zone: 'Gate A',
    status: 'on-duty',
  },
  {
    id: 2,
    name: 'Luca Rossi',
    role: 'Fan Guide',
    zone: 'Section C',
    status: 'on-duty',
  },
  {
    id: 3,
    name: 'Priya Nair',
    role: 'Medic',
    zone: 'Gate C',
    status: 'on-duty',
  },
  {
    id: 4,
    name: "James O'Brien",
    role: 'Crowd Control',
    zone: 'Gate D',
    status: 'break',
  },
  {
    id: 5,
    name: 'Sofia Müller',
    role: 'Accessibility',
    zone: 'Gate F',
    status: 'on-duty',
  },
]

export const matchStats = {
  possession: { home: 58, away: 42 },
  shots: { home: 6, away: 3 },
  passes: { home: 324, away: 198 },
  corners: { home: 5, away: 2 },
}

export const commentary = [
  {
    minute: '67',
    text:
      'Vinicius Jr. cuts inside from ' +
      "the left — Brazil's most " +
      'dangerous moment of the second half.',
  },
  {
    minute: '64',
    text:
      "Argentina's pressing has intensified. " +
      "They've won 8 of last 10 duels " +
      'in midfield.',
  },
  {
    minute: '61',
    text:
      'Substitution: Argentina bring on ' +
      'fresh legs as energy drops in ' +
      'the New Jersey humidity.',
  },
  {
    minute: '58',
    text:
      'Brazil keeping possession well. ' +
      'Their 58% share is highest since ' +
      'the opening 20 minutes.',
  },
]

export const sustainabilityStats = [
  { label: 'Carbon saved vs WC 2018', value: '42%', progress: 42 },
  { label: 'Public transport usage', value: '68%', progress: 68 },
  {
    label: 'Renewable energy at venue',
    value: '100%',
    progress: 100,
  },
]

export const fanGuide = [
  {
    country: 'Brazil',
    flag: '🇧🇷',
    tradition:
      'The Seleção bring drums, ' + 'samba, and yellow everywhere',
  },
  {
    country: 'Argentina',
    flag: '🇦🇷',
    tradition:
      '"Ole Ole Ole" fills stadiums ' + 'from kickoff to full time',
  },
  {
    country: 'France',
    flag: '🇫🇷',
    tradition:
      '"Allez les Bleus" — heard ' + 'in every corner of every venue',
  },
  {
    country: 'Morocco',
    flag: '🇲🇦',
    tradition:
      'Largest African fanbase; ' + 'creates a wall of red and green',
  },
  {
    country: 'Mexico',
    flag: '🇲🇽',
    tradition:
      '"Cielito Lindo" and the ' + 'famous "Eh! Oh!" stadium wave',
  },
]

export const chatSeedMessages = [
  {
    id: 1,
    role: 'user',
    content: 'Where can I find wheelchair ' + 'accessible seating?',
    timestamp: '18:24',
    lang: 'en',
  },
  {
    id: 2,
    role: 'assistant',
    content:
      'Accessible seating is available ' +
      'in sections 120-A, 230-B, and ' +
      'premium level 340-C. All have ' +
      'companion seating. Enter via Gate ' +
      'A or Gate F — both are step-free ' +
      'with lifts to all levels. ' +
      'Want me to show you the route? 🦽',
    timestamp: '18:24',
    lang: 'en',
  },
]

export const quickReplies = [
  { id: 1, text: 'How do I get to my seat?', lang: 'en' },
  { id: 2, text: 'Nearest food stall?', lang: 'en' },
  { id: 3, text: 'Halftime transport tips?', lang: 'en' },
  { id: 4, text: '¿Dónde están los baños?', lang: 'es' },
  { id: 5, text: 'Accessible entrance?', lang: 'en' },
  { id: 6, text: 'Lost & Found?', lang: 'en' },
  { id: 7, text: 'Match schedule?', lang: 'en' },
  { id: 8, text: 'Sustainability tips?', lang: 'en' },
]

export const aiOpsInsight =
  'Crowd modeling suggests 40% of fans in ' +
  'Section G will exit via Gate D at full time. ' +
  'Recommend deploying 4 additional stewards ' +
  'to Gate D by the 74th minute.'

/**
 * Aggregated mock data object used for Firestore seeding.
 * Individual named exports are still preferred for direct imports.
 */
export const mockData = {
  match,
  gates,
  alerts,
  volunteers,
  commentary,
  matchStats,
  aiOpsInsight,
}
