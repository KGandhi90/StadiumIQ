// @ts-check
import { useContext, useMemo } from 'react'
import { AppContext } from '../context/AppContext'
import { formatMatchTime } from '../utils/helpers'

/**
 * Derives live match and venue state from AppContext.
 * All values update in real-time via Firestore onSnapshot.
 * No local simulation — Firebase is the single source of truth.
 *
 * @returns {{
 *   minute: number,
 *   formattedMinute: string,
 *   gates: Array,
 *   avgWait: number,
 *   match: object|null,
 *   checkedIn: number,
 *   crowdIndex: number,
 *   lastUpdated: any,
 * }}
 */
export function useMatch() {
  const ctx = useContext(AppContext)

  const matchState = ctx?.matchState ?? null
  const venueState = ctx?.venueState ?? null

  const minute = useMemo(() => matchState?.minute ?? 67, [matchState])

  const formattedMinute = useMemo(
    () => formatMatchTime(minute),
    [minute]
  )

  const gates = useMemo(() => venueState?.gates ?? [], [venueState])

  const avgWait = useMemo(
    () => venueState?.avgWait ?? 4.2,
    [venueState]
  )

  const checkedIn = useMemo(
    () => venueState?.checkedIn ?? 0,
    [venueState]
  )

  const crowdIndex = useMemo(
    () => venueState?.crowdIndex ?? 0,
    [venueState]
  )

  const lastUpdated = useMemo(
    () => venueState?.lastUpdated ?? null,
    [venueState]
  )

  return {
    minute,
    formattedMinute,
    gates,
    avgWait,
    match: matchState,
    checkedIn,
    crowdIndex,
    lastUpdated,
  }
}
