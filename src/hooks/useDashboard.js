// @ts-check
import { useState, useCallback, useMemo } from 'react'
import { trackEvent } from '../utils/analytics'

/**
 * Manages Ops Dashboard state — active section,
 * alerts, volunteer management, gate control,
 * and broadcast messaging.
 * @param {{
 *   alerts: Array,
 *   volunteers: Array,
 *   gates: Array
 * }} ctx - Context data
 */
export function useDashboard(ctx) {
  const [activeSection, setActiveSection] = useState('overview')
  const [alerts, setAlerts] = useState(() => [...ctx.alerts])
  const [volunteers, setVolunteers] = useState(() => [
    ...ctx.volunteers,
  ])
  const [broadcastOpen, setBroadcastOpen] = useState(false)
  const [broadcastMsg, setBroadcastMsg] = useState('')
  const [gates, setGates] = useState(() => [...ctx.gates])

  /**
   * Marks an alert as resolved.
   * @param {number} alertId
   */
  const resolveAlert = useCallback((alertId) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === alertId ? { ...a, resolved: true } : a
      )
    )
    trackEvent('Dashboard', 'AlertResolved', `Alert ${alertId}`)
  }, [])

  /**
   * Toggles volunteer status between 'on-duty' and 'break'.
   * @param {number} volunteerId
   */
  const toggleVolunteer = useCallback((volunteerId) => {
    setVolunteers((prev) =>
      prev.map((v) =>
        v.id === volunteerId
          ? {
              ...v,
              status: v.status === 'on-duty' ? 'break' : 'on-duty',
            }
          : v
      )
    )
    trackEvent('Dashboard', 'VolunteerUpdated')
  }, [])

  /**
   * Sends a broadcast message — adds it as a new alert.
   */
  const sendBroadcast = useCallback(() => {
    if (!broadcastMsg.trim()) return
    const newAlert = {
      id: Date.now(),
      zone: 'All Zones',
      msg: broadcastMsg.trim(),
      time: '—',
      resolved: false,
      type: 'broadcast',
    }
    setAlerts((prev) => [newAlert, ...prev])
    setBroadcastMsg('')
    setBroadcastOpen(false)
    trackEvent('Dashboard', 'BroadcastSent')
  }, [broadcastMsg])

  /**
   * Toggles a gate open/redirect state.
   * @param {string} gateId
   */
  const toggleGate = useCallback((gateId) => {
    setGates((prev) =>
      prev.map((g) => (g.id === gateId ? { ...g, open: !g.open } : g))
    )
    trackEvent('Dashboard', 'GateToggled', gateId)
  }, [])

  const openAlerts = useMemo(
    () => alerts.filter((a) => !a.resolved),
    [alerts]
  )

  return {
    activeSection,
    setActiveSection,
    alerts,
    openAlerts,
    resolveAlert,
    volunteers,
    toggleVolunteer,
    broadcastOpen,
    setBroadcastOpen,
    broadcastMsg,
    setBroadcastMsg,
    sendBroadcast,
    gates,
    toggleGate,
  }
}
