import { useState, useEffect, useMemo } from 'react'
import { VenueMap } from '../components/VenueMap'
import { StatusPill } from '../components/StatusPill'
import { TransportStrip } from '../components/TransportStrip'
import { useAppContext } from '../context/AppContext'
import { useMatch } from '../hooks/useMatch'
import { useVenueNavigate } from '../hooks/useVenueNavigate'
import { getCrowdLevel } from '../utils/helpers'

const FILTER_TABS = [
  { id: 'all', label: 'All' },
  { id: 'restrooms', label: 'Restrooms' },
  { id: 'food', label: 'Food' },
  { id: 'exits', label: 'Exits' },
  { id: 'first-aid', label: 'First Aid' },
  { id: 'accessibility', label: 'Accessibility' },
]

/** @param {number} w */
const waitColor = (w) =>
  w <= 3 ? 'text-green' : w <= 7 ? 'text-gold' : 'text-crimson'

export function Navigate() {
  const ctx = useAppContext()
  const { gates: liveGates, lastUpdated } = useMatch()
  const {
    activeFilter,
    showRoute,
    accessibilityMode,
    setFilter,
    toggleRoute,
    toggleAccessibility,
  } = useVenueNavigate()
  const [secsAgo, setSecsAgo] = useState(0)

  // "Last updated Xs ago" ticker — resets when Firestore timestamp changes
  useEffect(() => {
    const refTime = lastUpdated?.toDate?.()?.getTime?.() ?? Date.now()
    const id = setInterval(() => {
      setSecsAgo(Math.floor((Date.now() - refTime) / 1000))
    }, 1000)
    return () => clearInterval(id)
  }, [lastUpdated])

  const mapFilter = useMemo(
    () => (accessibilityMode ? 'accessibility' : activeFilter),
    [accessibilityMode, activeFilter]
  )

  return (
    <div className="page-enter space-y-5">
      <header>
        <h1 className="font-display text-3xl text-navy">
          MetLife Stadium
        </h1>
        <p className="text-sm text-muted font-mono mt-1">
          Section C · Row 14 · Seat 22
        </p>
      </header>

      {/* Filter Tabs */}
      <nav
        role="tablist"
        aria-label="Map filters"
        className="flex gap-2 overflow-x-auto no-scrollbar pb-1"
      >
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeFilter === tab.id}
            aria-controls="venue-map"
            onClick={() => setFilter(tab.id)}
            className={`rounded-full px-4 py-2 text-xs font-medium transition-colors flex-shrink-0 ${
              activeFilter === tab.id
                ? 'bg-navy text-white'
                : 'bg-surface2 text-muted hover:bg-surface3'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Map */}
      <section
        id="venue-map"
        role="tabpanel"
        className="bg-surface1 border border-surface3 rounded-2xl p-4 shadow-card"
        aria-label="Venue map"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono text-muted">
            Crowd Density
          </span>
          <div className="flex gap-3">
            {[
              { color: 'bg-green', label: 'Low' },
              { color: 'bg-gold', label: 'Moderate' },
              { color: 'bg-crimson', label: 'High' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1">
                <span
                  className={`w-2 h-2 rounded-full ${color}`}
                  aria-hidden="true"
                />
                <span className="text-xs text-muted">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <VenueMap
          activeFilter={mapFilter}
          showRoute={showRoute}
          dark={false}
        />
        <button
          type="button"
          onClick={toggleRoute}
          className={`mt-3 w-full border rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
            showRoute
              ? 'bg-navy text-white border-navy'
              : 'border-navy text-navy hover:bg-navy hover:text-white'
          }`}
        >
          {showRoute ? 'Hide Route ↑' : 'Show Route to Seat ↓'}
        </button>
      </section>

      {/* Gate Status — live from Firestore */}
      <section aria-label="Gate wait times">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-navy border-l-4 border-gold pl-3">
            Gate Status
          </h2>
          <span className="text-xs font-mono text-muted">
            {secsAgo === 0
              ? 'Just updated'
              : `Updated ${secsAgo}s ago`}
          </span>
        </div>
        <ul
          role="list"
          aria-label="Gate wait times"
          className="flex gap-3 overflow-x-auto no-scrollbar"
        >
          {liveGates.map((gate) => (
            <li
              key={gate.id}
              role="listitem"
              aria-label={`Gate ${gate.id}: ${gate.wait} minute wait, ${getCrowdLevel(gate.wait)} crowd`}
              className="bg-surface1 border border-surface3 rounded-xl p-3 min-w-24 flex-shrink-0 shadow-card text-center"
            >
              <p className="font-display text-2xl text-navy">
                Gate {gate.id}
              </p>
              <p
                className={`font-mono text-lg font-medium ${waitColor(gate.wait)}`}
              >
                {gate.wait} min
              </p>
              <div className="mt-1 flex justify-center">
                <StatusPill status={gate.crowd} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Accessibility */}
      <section
        className="bg-sky/5 border border-sky/20 rounded-xl p-4"
        aria-label="Accessibility options"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">
            ♿
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-navy">
              Accessibility Mode
            </p>
            <p className="text-xs text-muted mt-0.5">
              Step-free routes via Gates A, C, F
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={accessibilityMode}
            onClick={toggleAccessibility}
            className={`relative w-10 h-5 rounded-full transition-colors ${accessibilityMode ? 'bg-sky' : 'bg-surface3'}`}
            aria-label="Toggle accessibility mode"
          >
            <span
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${accessibilityMode ? 'translate-x-5' : 'translate-x-0.5'}`}
            />
          </button>
        </div>
      </section>

      {/* Transport */}
      <section aria-label="Transport options">
        <h2 className="text-sm font-medium text-navy border-l-4 border-gold pl-3 mb-3">
          Getting Here
        </h2>
        <TransportStrip items={ctx.transportStatus} />
      </section>
    </div>
  )
}
