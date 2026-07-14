import { useState } from 'react'
import {
  Zap,
  LayoutDashboard,
  Users,
  AlertTriangle,
  Bus,
  Radio,
} from 'lucide-react'
import { StatCard } from '../components/StatCard'
import { AlertFeed } from '../components/AlertFeed'
import { VolunteerTable } from '../components/VolunteerTable'
import { VenueMap } from '../components/VenueMap'
import { alerts, volunteers, aiOpsInsight } from '../data/mockData'
import {
  CHECKED_IN,
  AVG_GATE_WAIT_MIN,
  ACTIVE_VOLUNTEERS,
  OPEN_ALERTS,
} from '../utils/constants'

/**
 * Ops Center dashboard for venue staff
 * and organizers. Dark theme, data-dense.
 */

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', Icon: LayoutDashboard },
  { id: 'crowd', label: 'Crowd Map', Icon: Users },
  { id: 'volunteers', label: 'Volunteers', Icon: Users },
  { id: 'alerts', label: 'Alerts', Icon: AlertTriangle },
  { id: 'transport', label: 'Transport', Icon: Bus },
]

const OPS_STATS = [
  {
    value: CHECKED_IN.toLocaleString(),
    label: 'Fans Checked In',
    color: 'ops-gold',
  },
  {
    value: `${AVG_GATE_WAIT_MIN} min`,
    label: 'Avg Gate Wait',
    color: 'crimson',
  },
  {
    value: String(ACTIVE_VOLUNTEERS),
    label: 'Active Volunteers',
    color: 'green',
  },
  {
    value: String(OPEN_ALERTS),
    label: 'Open Alerts',
    color: 'ops-gold',
  },
]

export function Dashboard() {
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <div className="ops-mode flex h-screen overflow-hidden">
      {/* ── Sidebar ───────────────────────── */}
      <aside className="w-60 flex-shrink-0 bg-ops-surface1 h-full flex flex-col border-r border-ops-surface3">
        {/* Logo */}
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
              <span className="text-xs text-crimson">
                LIVE 67&apos;
              </span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav
          className="flex-1 py-4 px-3 space-y-1"
          aria-label="Operations navigation"
        >
          {NAV_ITEMS.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveSection(id)}
              className={`w-full flex items-center gap-2.5 pl-3 pr-3 py-2.5 text-sm font-medium rounded-xl transition-colors text-left ${
                activeSection === id
                  ? 'border-l-2 border-ops-gold bg-ops-surface2 text-white rounded-l-none'
                  : 'text-ops-muted hover:text-white hover:bg-ops-surface2'
              }`}
              aria-current={activeSection === id ? 'page' : undefined}
            >
              <Icon size={15} aria-hidden="true" />
              {label}
            </button>
          ))}
        </nav>

        {/* Broadcast button */}
        <div className="p-4 border-t border-ops-surface3">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-ops-gold text-ops-gold text-xs font-semibold rounded-xl py-2.5 hover:bg-ops-gold hover:text-ops-base transition-colors"
          >
            <Radio size={13} aria-hidden="true" />
            Broadcast to All Staff
          </button>
        </div>
      </aside>

      {/* ── Main Content ──────────────────── */}
      <main
        id="main-content"
        className="flex-1 overflow-y-auto bg-ops-base p-6"
        aria-label="Operations dashboard"
      >
        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {OPS_STATS.map((stat) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              color={stat.color}
              dark={true}
            />
          ))}
        </div>

        {/* AI Insight */}
        <section
          className="bg-ops-gold/10 border border-ops-gold/20 rounded-2xl p-5 mb-6"
          aria-label="AI operational insight"
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
            {aiOpsInsight}
          </p>
        </section>

        {/* Section content */}
        {(activeSection === 'overview' ||
          activeSection === 'alerts') && (
          <AlertFeed alerts={alerts} />
        )}
        {(activeSection === 'overview' ||
          activeSection === 'volunteers') && (
          <div className={activeSection === 'overview' ? 'mt-6' : ''}>
            <VolunteerTable volunteers={volunteers} />
          </div>
        )}
        {activeSection === 'crowd' && (
          <section aria-label="Crowd heatmap">
            <h2 className="text-base font-semibold text-white mb-4">
              Crowd Density Map
            </h2>
            <div className="bg-ops-surface1 border border-ops-surface3 rounded-2xl p-4">
              <VenueMap dark={true} />
            </div>
          </section>
        )}
        {activeSection === 'transport' && (
          <section aria-label="Transport overview">
            <h2 className="text-base font-semibold text-white mb-4">
              Transport Status
            </h2>
            <p className="text-ops-muted text-sm">
              Real-time transport data integration coming in Phase 2.
            </p>
          </section>
        )}
      </main>
    </div>
  )
}
