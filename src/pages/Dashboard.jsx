import { useRef, useCallback } from 'react'
import {
  Zap,
  LayoutDashboard,
  Users,
  AlertTriangle,
  Bus,
  Radio,
  X,
} from 'lucide-react'
import { StatCard } from '../components/StatCard'
import { VenueMap } from '../components/VenueMap'
import { StatusPill } from '../components/StatusPill'
import { TransportStrip } from '../components/TransportStrip'
import { useAppContext } from '../context/AppContext'
import { useMatch } from '../hooks/useMatch'
import { useDashboard } from '../hooks/useDashboard'
import { CHECKED_IN, ACTIVE_VOLUNTEERS } from '../utils/constants'

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', Icon: LayoutDashboard },
  { id: 'crowd', label: 'Crowd Map', Icon: Users },
  { id: 'volunteers', label: 'Volunteers', Icon: Users },
  { id: 'alerts', label: 'Alerts', Icon: AlertTriangle },
  { id: 'transport', label: 'Transport', Icon: Bus },
]

export function Dashboard() {
  const ctx = useAppContext()
  const { gates: liveGates, avgWait } = useMatch(ctx.match, ctx.gates)
  const db = useDashboard({
    alerts: ctx.alerts,
    volunteers: ctx.volunteers,
    gates: liveGates,
  })
  const broadcastTextareaRef = useRef(
    /** @type {HTMLTextAreaElement|null} */ (null)
  )

  const onBroadcastOpen = useCallback(() => {
    db.setBroadcastOpen(true)
    setTimeout(() => broadcastTextareaRef.current?.focus(), 50)
  }, [db])

  const onOverlayClick = useCallback(
    () => db.setBroadcastOpen(false),
    [db]
  )

  const OPS_STATS = [
    {
      value: CHECKED_IN.toLocaleString(),
      label: 'Fans Checked In',
      color: 'ops-gold',
    },
    {
      value: `${avgWait} min`,
      label: 'Avg Gate Wait',
      color: 'crimson',
    },
    {
      value: String(ACTIVE_VOLUNTEERS),
      label: 'Active Volunteers',
      color: 'green',
    },
    {
      value: String(db.openAlerts.length),
      label: 'Open Alerts',
      color: 'ops-gold',
    },
  ]

  return (
    <div className="ops-mode flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 bg-ops-surface1 h-full flex flex-col border-r border-ops-surface3">
        <div className="p-5 border-b border-ops-surface3">
          <p className="font-display text-2xl text-ops-gold">
            StadiumIQ
          </p>
          <p className="text-xs text-ops-muted uppercase tracking-widest mt-0.5">
            OPS CENTER
          </p>
          <div className="mt-3">
            <p className="text-xs text-white/80 font-mono">
              ⚽ Brazil v Argentina
            </p>
            <div className="flex items-center gap-1 mt-1">
              <span
                className="w-1.5 h-1.5 rounded-full bg-crimson pulse-live"
                aria-hidden="true"
              />
              <span className="text-xs text-crimson">LIVE</span>
            </div>
          </div>
        </div>
        <nav
          role="navigation"
          aria-label="Operations menu"
          className="flex-1 py-4 px-3 space-y-1"
        >
          {NAV_ITEMS.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => db.setActiveSection(id)}
              aria-current={
                db.activeSection === id ? 'page' : undefined
              }
              className={`w-full flex items-center gap-2.5 pl-3 pr-3 py-2.5 text-sm font-medium rounded-xl transition-colors text-left ${
                db.activeSection === id
                  ? 'border-l-2 border-ops-gold bg-ops-surface2 text-white rounded-l-none'
                  : 'text-ops-muted hover:text-white hover:bg-ops-surface2'
              }`}
            >
              <Icon size={15} aria-hidden="true" /> {label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-ops-surface3">
          <button
            type="button"
            onClick={onBroadcastOpen}
            className="w-full flex items-center justify-center gap-2 border border-ops-gold text-ops-gold text-xs font-semibold rounded-xl py-2.5 hover:bg-ops-gold hover:text-ops-base transition-colors"
          >
            <Radio size={13} aria-hidden="true" /> Broadcast to All
            Staff
          </button>
        </div>
      </aside>

      {/* Main */}
      <main
        id="main-content"
        className="flex-1 overflow-y-auto bg-ops-base p-6"
        aria-label="Operations dashboard"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {OPS_STATS.map((stat) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              color={stat.color}
              dark
            />
          ))}
        </div>
        <section
          className="bg-ops-gold/10 border border-ops-gold/20 rounded-2xl p-5 mb-6"
          aria-label="AI insight"
        >
          <div className="flex items-center gap-2 mb-3">
            <Zap
              size={16}
              className="text-ops-gold"
              aria-hidden="true"
            />
            <h2 className="text-sm font-semibold text-white">
              AI Operational Insight
            </h2>
            <span className="text-xs text-ops-muted ml-auto font-mono">
              Gemini
            </span>
          </div>
          <p className="text-sm text-white/80 leading-relaxed">
            {ctx.aiOpsInsight}
          </p>
        </section>

        {/* Alerts section */}
        {(db.activeSection === 'overview' ||
          db.activeSection === 'alerts') && (
          <div className="bg-ops-surface1 border border-ops-surface3 rounded-2xl p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-white">
                Live Alerts
              </h2>
              <span className="bg-crimson text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {db.openAlerts.length}
              </span>
            </div>
            <ul role="list" className="space-y-3">
              {db.alerts.map((alert) => (
                <li
                  key={alert.id}
                  className="flex items-start gap-3 pb-3 border-b border-ops-surface3 last:border-0 last:pb-0"
                >
                  <span
                    className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${alert.resolved ? 'bg-green' : 'bg-crimson'}`}
                    aria-hidden="true"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-ops-gold">
                      {alert.zone}
                    </p>
                    <p className="text-xs text-white/70 mt-0.5 leading-relaxed">
                      {alert.msg}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <time className="text-xs font-mono text-ops-muted">
                      {alert.time}
                    </time>
                    {!alert.resolved && (
                      <button
                        type="button"
                        onClick={() => db.resolveAlert(alert.id)}
                        className="text-xs text-green border border-green/30 rounded-lg px-2 py-0.5 hover:bg-green/10 transition-colors"
                      >
                        Resolve
                      </button>
                    )}
                    {alert.resolved && (
                      <span className="text-xs text-green">
                        Resolved ✓
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Volunteers section */}
        {(db.activeSection === 'overview' ||
          db.activeSection === 'volunteers') && (
          <div className="bg-ops-surface1 border border-ops-surface3 rounded-2xl p-5 mb-6">
            <h2 className="text-base font-semibold text-white mb-4">
              Active Volunteers
            </h2>
            <table className="w-full text-sm" aria-label="Volunteers">
              <thead>
                <tr className="text-ops-muted text-xs uppercase tracking-wide font-mono text-left">
                  <th className="pb-3 pr-4 font-medium" scope="col">
                    Name
                  </th>
                  <th
                    className="pb-3 pr-4 font-medium hidden sm:table-cell"
                    scope="col"
                  >
                    Role
                  </th>
                  <th className="pb-3 pr-4 font-medium" scope="col">
                    Zone
                  </th>
                  <th className="pb-3 font-medium" scope="col">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {db.volunteers.map((vol, i) => (
                  <tr
                    key={vol.id}
                    className={
                      i % 2 !== 0 ? 'bg-ops-surface2/30' : ''
                    }
                  >
                    <td className="py-2.5 pr-4 text-white/80 font-medium">
                      {vol.name}
                    </td>
                    <td className="py-2.5 pr-4 text-ops-muted hidden sm:table-cell">
                      {vol.role}
                    </td>
                    <td className="py-2.5 pr-4 font-mono text-xs text-ops-muted">
                      {vol.zone}
                    </td>
                    <td className="py-2.5">
                      <button
                        type="button"
                        onClick={() => db.toggleVolunteer(vol.id)}
                        className="flex items-center gap-1"
                      >
                        <StatusPill status={vol.status} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Crowd Map section */}
        {db.activeSection === 'crowd' && (
          <section aria-label="Crowd heatmap">
            <h2 className="text-base font-semibold text-white mb-4">
              Crowd Density Map
            </h2>
            <div className="bg-ops-surface1 border border-ops-surface3 rounded-2xl p-4 mb-4">
              <VenueMap dark activeFilter="all" />
            </div>
            <div className="space-y-2">
              {liveGates.map((gate) => (
                <div
                  key={gate.id}
                  className="bg-ops-surface1 border border-ops-surface3 rounded-xl p-3 flex items-center gap-3"
                >
                  <p className="font-display text-xl text-ops-gold w-16">
                    Gate {gate.id}
                  </p>
                  <StatusPill status={gate.crowd} />
                  <span className="font-mono text-sm text-white/70">
                    {gate.wait} min
                  </span>
                  <div className="flex gap-2 ml-auto">
                    <button
                      type="button"
                      onClick={() => db.toggleGate(gate.id)}
                      className={`text-xs px-3 py-1 rounded-lg border transition-colors ${gate.open ? 'border-green text-green' : 'border-crimson text-crimson'}`}
                    >
                      {gate.open ? 'Open' : 'Closed'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Transport section */}
        {db.activeSection === 'transport' && (
          <section aria-label="Transport overview">
            <h2 className="text-base font-semibold text-white mb-4">
              Transport Status
            </h2>
            <TransportStrip items={ctx.transportStatus} />
          </section>
        )}
      </main>

      {/* Broadcast Modal */}
      {db.broadcastOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
          onClick={onOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="broadcast-title"
        >
          <div
            className="bg-ops-surface1 rounded-2xl p-6 w-full max-w-md mx-4 shadow-hero"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                id="broadcast-title"
                className="text-base font-semibold text-white"
              >
                Broadcast to All Staff
              </h3>
              <button
                type="button"
                onClick={() => db.setBroadcastOpen(false)}
                className="text-ops-muted hover:text-white"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
            <textarea
              ref={broadcastTextareaRef}
              value={db.broadcastMsg}
              onChange={(e) => db.setBroadcastMsg(e.target.value)}
              className="w-full bg-ops-surface2 text-white rounded-xl p-3 text-sm resize-none outline-none border border-ops-surface3 focus:border-ops-gold transition-colors"
              rows={4}
              placeholder="Type your message to all staff..."
              aria-label="Broadcast message"
            />
            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={db.sendBroadcast}
                className="flex-1 bg-ops-gold text-ops-base text-sm font-semibold rounded-xl py-2.5 hover:bg-ops-gold/90 transition-colors"
              >
                Send to All Staff
              </button>
              <button
                type="button"
                onClick={() => db.setBroadcastOpen(false)}
                className="px-4 border border-ops-surface3 text-ops-muted text-sm rounded-xl hover:border-white hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
