import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react'
import PropTypes from 'prop-types'
import {
  seedFirestoreIfEmpty,
  startSimulation,
  subscribeVenueState,
  subscribeMatchState,
  subscribeAlerts,
  subscribeVolunteers,
  subscribeCommentary,
  resolveAlert as fbResolveAlert,
  toggleVolunteerStatus as fbToggleVolunteer,
  addAlert as fbAddAlert,
  saveCommentary as fbSaveCommentary,
  isFirebaseAvailable,
} from '../api/firebase'
import {
  sendConciergeMessage as geminiChat,
  generateCommentary as geminiCommentary,
  generateOpsInsight as geminiOpsInsight,
} from '../api/geminiApi'
import {
  upcomingMatches,
  tournamentStats,
  aiHighlights,
  transportStatus,
  sustainabilityStats,
  fanGuide,
  chatSeedMessages,
  quickReplies,
  // Fallback values when Firebase is offline
  match as mockMatch,
  gates as mockGates,
  alerts as mockAlerts,
  volunteers as mockVolunteers,
  commentary as mockCommentary,
  aiOpsInsight as mockOpsInsight,
} from '../data/mockData'

/**
 * @typedef {object} AppContextValue
 * @property {object|null}  venueState
 * @property {object|null}  matchState
 * @property {Array}        alerts
 * @property {Array}        volunteers
 * @property {Array}        commentary
 * @property {boolean}      isLoading
 * @property {typeof upcomingMatches} upcomingMatches
 * @property {typeof tournamentStats} tournamentStats
 * @property {typeof aiHighlights}    aiHighlights
 * @property {typeof transportStatus} transportStatus
 * @property {typeof sustainabilityStats} sustainabilityStats
 * @property {typeof fanGuide}        fanGuide
 * @property {typeof chatSeedMessages} chatSeedMessages
 * @property {typeof quickReplies}    quickReplies
 * @property {function(string): Promise<void>} resolveAlert
 * @property {function(string, string): Promise<void>} toggleVolunteerStatus
 * @property {function(object): Promise<void>} addAlert
 * @property {function(string, string): Promise<void>} saveCommentary
 * @property {function(string, Array): Promise<string>} sendConciergeMessage
 * @property {function(): Promise<string>} generateCommentary
 * @property {function(): Promise<string>} generateOpsInsight
 */

/** @type {import('react').Context<AppContextValue|null>} */
const AppContext = createContext(
  /** @type {AppContextValue|null} */ (null)
)

/**
 * Provides live Firestore data + Gemini AI functions to all pages.
 * Falls back to mock data transparently when Firebase is offline.
 * @param {object} props
 * @param {React.ReactNode} props.children
 */
export function AppProvider({ children }) {
  const [venueState, setVenueState] = useState(null)
  const [matchState, setMatchState] = useState(null)
  const [alerts, setAlerts] = useState([])
  const [volunteers, setVolunteers] = useState([])
  const [commentary, setCommentary] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const readyCount = useRef(0)
  const READY_THRESHOLD = isFirebaseAvailable() ? 5 : 0

  useEffect(() => {
    /** @param {function(any): void} setter */
    function onData(setter) {
      return (/** @type {any} */ data) => {
        setter(data)
        readyCount.current += 1
        if (readyCount.current >= READY_THRESHOLD) {
          setIsLoading(false)
        }
      }
    }

    let sim = { stop: () => {} }
    const unsubs = []

    async function init() {
      if (isFirebaseAvailable()) {
        await seedFirestoreIfEmpty()
        sim = startSimulation()
        unsubs.push(subscribeVenueState(onData(setVenueState)))
        unsubs.push(subscribeMatchState(onData(setMatchState)))
        unsubs.push(subscribeAlerts(onData(setAlerts)))
        unsubs.push(subscribeVolunteers(onData(setVolunteers)))
        unsubs.push(subscribeCommentary(onData(setCommentary)))
      } else {
        // Mock fallback — instant, no loading
        setVenueState({
          gates: mockGates,
          checkedIn: mockMatch.attendance,
          avgWait: 4.2,
          crowdIndex: Math.round(
            (mockMatch.attendance / mockMatch.capacity) * 100
          ),
          lastUpdated: null,
        })
        setMatchState(mockMatch)
        setAlerts(mockAlerts)
        setVolunteers(mockVolunteers)
        setCommentary(mockCommentary)
        setIsLoading(false)
      }
    }

    init()

    return () => {
      sim.stop()
      unsubs.forEach((u) => u())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Mutations ──────────────────────────────────────────────────────────────

  /** @type {AppContextValue['resolveAlert']} */
  const resolveAlert = useCallback(
    (alertId) => fbResolveAlert(alertId),
    []
  )

  /** @type {AppContextValue['toggleVolunteerStatus']} */
  const toggleVolunteerStatus = useCallback(
    (id, status) => fbToggleVolunteer(id, status),
    []
  )

  /** @type {AppContextValue['addAlert']} */
  const addAlert = useCallback((alert) => fbAddAlert(alert), [])

  /** @type {AppContextValue['saveCommentary']} */
  const saveCommentary = useCallback(
    (minute, text) => fbSaveCommentary(minute, text),
    []
  )

  // ── AI ────────────────────────────────────────────────────────────────────

  /** @type {AppContextValue['sendConciergeMessage']} */
  const sendConciergeMessage = useCallback(
    (msg, history) => geminiChat(msg, history),
    []
  )

  /** @type {AppContextValue['generateCommentary']} */
  const generateCommentary = useCallback(() => geminiCommentary(), [])

  /** @type {AppContextValue['generateOpsInsight']} */
  const generateOpsInsight = useCallback(() => geminiOpsInsight(), [])

  // ── Context value ─────────────────────────────────────────────────────────

  /** @type {AppContextValue} */
  const value = {
    // Live Firestore
    venueState,
    matchState,
    alerts,
    volunteers,
    commentary,
    isLoading,
    // Static seed data
    upcomingMatches,
    tournamentStats,
    aiHighlights,
    transportStatus,
    sustainabilityStats,
    fanGuide,
    chatSeedMessages,
    quickReplies,
    // Mutations
    resolveAlert,
    toggleVolunteerStatus,
    addAlert,
    saveCommentary,
    // AI
    sendConciergeMessage,
    generateCommentary,
    generateOpsInsight,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

/**
 * Returns the global app context.
 * Must be used inside <AppProvider>.
 * @returns {AppContextValue}
 */
export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx)
    throw new Error('useAppContext must be inside AppProvider')
  return ctx
}

export { AppContext }
