// @ts-nocheck
import { useState, useContext, useMemo, useCallback } from 'react'
import { AppContext } from '../context/AppContext'
import { trackEvent } from '../utils/analytics'
import { aiOpsInsight as mockOpsInsight } from '../data/mockData'

/**
 * Provides dashboard state and actions.
 * All alert/volunteer/gate data comes from AppContext (Firestore).
 * Local state: UI-only (activeSection, broadcastOpen, opsInsight).
 *
 * @returns {object} Dashboard state and handlers
 */
export function useDashboard() {
  const ctx = useContext(AppContext)

  const [activeSection, setActiveSection] = useState('overview')
  const [broadcastOpen, setBroadcastOpen] = useState(false)
  const [broadcastMsg, setBroadcastMsg] = useState('')
  const [opsInsight, setOpsInsight] = useState(mockOpsInsight)
  const [isGeneratingInsight, setIsGeneratingInsight] =
    useState(false)

  const alerts = useMemo(() => ctx?.alerts ?? [], [ctx])

  const volunteers = useMemo(() => ctx?.volunteers ?? [], [ctx])

  const venueState = ctx?.venueState ?? null
  const matchState = ctx?.matchState ?? null

  const openAlerts = useMemo(
    () => alerts.filter((a) => !a.resolved),
    [alerts]
  )

  const activeVolunteers = useMemo(
    () => volunteers.filter((v) => v.status === 'on-duty').length,
    [volunteers]
  )

  const gates = useMemo(() => venueState?.gates ?? [], [venueState])

  const checkedIn = useMemo(
    () => venueState?.checkedIn ?? 0,
    [venueState]
  )

  const avgWait = useMemo(
    () => venueState?.avgWait ?? 0,
    [venueState]
  )

  /** @param {string} alertId */
  const resolveAlert = useCallback(
    async (alertId) => {
      await ctx?.resolveAlert(alertId)
      trackEvent('Dashboard', 'AlertResolved')
    },
    [ctx]
  )

  /**
   * @param {string} volunteerId
   * @param {string} currentStatus
   */
  const toggleVolunteer = useCallback(
    async (volunteerId, currentStatus) => {
      await ctx?.toggleVolunteerStatus(volunteerId, currentStatus)
      trackEvent('Dashboard', 'VolunteerUpdated')
    },
    [ctx]
  )

  /** @param {string} gateId */
  const toggleGate = useCallback(async (gateId) => {
    // Gate open/close is venue-state — log as alert for now
    trackEvent('Dashboard', 'GateToggled', gateId)
  }, [])

  const sendBroadcast = useCallback(async () => {
    if (!broadcastMsg.trim()) return
    await ctx?.addAlert({
      zone: 'All Zones',
      msg: broadcastMsg.trim(),
      time: `${matchState?.minute ?? 67}'`,
      resolved: false,
      type: 'broadcast',
    })
    setBroadcastMsg('')
    setBroadcastOpen(false)
    trackEvent('Dashboard', 'BroadcastSent')
  }, [broadcastMsg, matchState, ctx])

  const refreshOpsInsight = useCallback(async () => {
    if (!ctx?.generateOpsInsight) return
    setIsGeneratingInsight(true)
    const insight = await ctx.generateOpsInsight()
    setOpsInsight(insight)
    setIsGeneratingInsight(false)
    trackEvent('Dashboard', 'InsightGenerated')
  }, [ctx])

  return {
    activeSection,
    setActiveSection,
    alerts,
    openAlerts,
    resolveAlert,
    volunteers,
    toggleVolunteer,
    toggleGate,
    broadcastOpen,
    setBroadcastOpen,
    broadcastMsg,
    setBroadcastMsg,
    sendBroadcast,
    gates,
    checkedIn,
    avgWait,
    activeVolunteers,
    opsInsight,
    isGeneratingInsight,
    refreshOpsInsight,
  }
}
