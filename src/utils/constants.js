// @ts-check

/**
 * Application-wide constants.
 * No magic numbers anywhere else in codebase.
 */

// Match timing
export const MATCH_MINUTE = 67
export const HALFTIME_MINUTE = 45
export const FULL_TIME_MINUTE = 90

// Venue
export const VENUE_CAPACITY = 82500
export const CHECKED_IN = 79340
export const AVG_GATE_WAIT_MIN = 4.2
export const ACTIVE_VOLUNTEERS = 247
export const OPEN_ALERTS = 12

// Gate wait thresholds (minutes)
export const WAIT_LOW_MAX = 3
export const WAIT_MED_MAX = 7

// Tournament
export const TOTAL_TEAMS = 48
export const TOTAL_MATCHES = 104
export const HOST_CITIES = 16
export const TOURNAMENT_START = 'June 11, 2026'
export const TOURNAMENT_END = 'July 19, 2026'

// UI timing (ms)
export const TOAST_DURATION_MS = 3000
export const TYPING_MS = 1400
export const FACT_INTERVAL_MS = 5000
export const LIVE_UPDATE_MS = 12000

// Firebase limits
export const ALERTS_LIMIT = 50
export const LOGS_LIMIT = 30
