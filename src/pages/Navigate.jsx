import { useState } from 'react'
import { VenueMap } from '../components/VenueMap'
import { StatusPill } from '../components/StatusPill'
import { TransportStrip } from '../components/TransportStrip'
import { gates, transportStatus } from '../data/mockData'
import { WAIT_LOW_MAX, WAIT_MED_MAX } from '../utils/constants'

/**
 * Navigate page — venue map, gate status,
 * accessibility toggle, and transport info.
 */

const FILTER_TABS = [
  { id: 'all', label: 'All' },
  { id: 'restrooms', label: 'Restrooms' },
  { id: 'food', label: 'Food' },
  { id: 'exits', label: 'Exits' },
  { id: 'first-aid', label: 'First Aid' },
  { id: 'accessibility', label: 'Accessibility' },
]

/** @param {number} wait */
function waitStatus(wait) {
  if (wait <= WAIT_LOW_MAX) return 'low'
  if (wait <= WAIT_MED_MAX) return 'medium'
  return 'high'
}

/** @param {number} wait */
function waitColor(wait) {
  if (wait <= WAIT_LOW_MAX) return 'text-green'
  if (wait <= WAIT_MED_MAX) return 'text-gold'
  return 'text-crimson'
}

export function Navigate() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [showRoute, setShowRoute] = useState(false)
  const [accessMode, setAccessMode] = useState(false)

  return (
    <div className="page-enter space-y-5">
      {/* ── Header ──────────────────────────── */}
      <header>
        <h1 className="font-display text-3xl text-navy">
          MetLife Stadium
        </h1>
        <p className="text-sm text-muted font-mono mt-1">
          Section C · Row 14 · Seat 22
        </p>
      </header>

      {/* ── Filter Tabs ─────────────────────── */}
      <nav
        aria-label="Map filter tabs"
        className="flex gap-2 overflow-x-auto no-scrollbar pb-1"
      >
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveFilter(tab.id)}
            className={`rounded-full px-4 py-2 text-xs font-medium transition-colors flex-shrink-0 ${
              activeFilter === tab.id
                ? 'bg-navy text-white'
                : 'bg-surface2 text-muted hover:bg-surface3'
            }`}
            aria-pressed={activeFilter === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* ── Map Card ────────────────────────── */}
      <section
        className="bg-surface1 border border-surface3 rounded-2xl p-4 shadow-card"
        aria-label="Venue map"
      >
        {/* Density legend */}
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
          activeFilter={activeFilter}
          showRoute={showRoute}
          dark={false}
        />

        <button
          type="button"
          onClick={() => setShowRoute((v) => !v)}
          className="mt-3 w-full border border-navy text-navy rounded-xl px-4 py-2 text-sm font-medium hover:bg-navy hover:text-white transition-colors"
        >
          {showRoute ? 'Hide Route' : 'Show Route to Seat'}
        </button>
      </section>

      {/* ── Gate Status ─────────────────────── */}
      <section aria-label="Gate wait times">
        <h2 className="text-sm font-medium text-navy border-l-4 border-gold pl-3 mb-3">
          Gate Status
        </h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {gates.map((gate) => (
            <div
              key={gate.id}
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
                <StatusPill status={waitStatus(gate.wait)} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Accessibility Card ──────────────── */}
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
          {/* Decorative toggle */}
          <button
            type="button"
            role="switch"
            aria-checked={accessMode}
            onClick={() => setAccessMode((v) => !v)}
            className={`relative w-10 h-5 rounded-full transition-colors ${
              accessMode ? 'bg-sky' : 'bg-surface3'
            }`}
            aria-label="Toggle accessibility mode"
          >
            <span
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                accessMode ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      </section>

      {/* ── Transport Card ──────────────────── */}
      <section aria-label="Transport options">
        <h2 className="text-sm font-medium text-navy border-l-4 border-gold pl-3 mb-3">
          Getting Here
        </h2>
        <TransportStrip items={transportStatus} />
      </section>
    </div>
  )
}
