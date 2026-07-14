import {
  GATES, UPCOMING_MATCHES, VOLUNTEERS, INITIAL_ALERTS,
  COMMENTARY, FAN_NATIONS, SUSTAINABILITY_STATS, MATCH_STATS,
  LIVE_MATCH, TRANSPORT_STATUS, AI_HIGHLIGHTS, QUICK_REPLIES,
} from './constants';

// Re-export structured mock data objects for easy consumption
export const mockData = {
  liveMatch: LIVE_MATCH,
  upcomingMatches: UPCOMING_MATCHES,
  gates: GATES,
  volunteers: VOLUNTEERS,
  alerts: INITIAL_ALERTS,
  commentary: COMMENTARY,
  fanNations: FAN_NATIONS,
  sustainability: SUSTAINABILITY_STATS,
  matchStats: MATCH_STATS,
  transport: TRANSPORT_STATUS,
  aiHighlights: AI_HIGHLIGHTS,
  quickReplies: QUICK_REPLIES,
};

export default mockData;
