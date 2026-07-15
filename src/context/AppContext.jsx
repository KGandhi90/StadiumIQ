import { createContext, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  match,
  upcomingMatches,
  tournamentStats,
  aiHighlights,
  transportStatus,
  gates,
  alerts,
  volunteers,
  matchStats,
  commentary,
  sustainabilityStats,
  fanGuide,
  chatSeedMessages,
  quickReplies,
  aiOpsInsight,
} from '../data/mockData'

/**
 * @typedef {object} AppContextValue
 * @property {typeof match} match
 * @property {typeof upcomingMatches} upcomingMatches
 * @property {typeof tournamentStats} tournamentStats
 * @property {typeof aiHighlights} aiHighlights
 * @property {typeof transportStatus} transportStatus
 * @property {typeof gates} gates
 * @property {typeof alerts} alerts
 * @property {typeof volunteers} volunteers
 * @property {typeof matchStats} matchStats
 * @property {typeof commentary} commentary
 * @property {typeof sustainabilityStats} sustainabilityStats
 * @property {typeof fanGuide} fanGuide
 * @property {typeof chatSeedMessages} chatSeedMessages
 * @property {typeof quickReplies} quickReplies
 * @property {typeof aiOpsInsight} aiOpsInsight
 */

/** @type {import('react').Context<AppContextValue|null>} */
const AppContext = createContext(
  /** @type {AppContextValue|null} */ (null)
)

/**
 * Provides global read-only seed data to all pages.
 * Mutable state lives in page-level hooks.
 * @param {object} props
 * @param {React.ReactNode} props.children
 */
export function AppProvider({ children }) {
  const value = useMemo(
    () => ({
      match,
      upcomingMatches,
      tournamentStats,
      aiHighlights,
      transportStatus,
      gates,
      alerts,
      volunteers,
      matchStats,
      commentary,
      sustainabilityStats,
      fanGuide,
      chatSeedMessages,
      quickReplies,
      aiOpsInsight,
    }),
    []
  )

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
 * Returns the global app context value.
 * Must be used within <AppProvider>.
 * @returns {AppContextValue}
 */
export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx)
    throw new Error('useAppContext must be inside AppProvider')
  return ctx
}
