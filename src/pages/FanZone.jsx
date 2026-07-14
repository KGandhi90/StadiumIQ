import { CommentaryFeed } from '../components/CommentaryFeed'
import { SustainabilityTracker } from '../components/SustainabilityTracker'
import {
  matchStats,
  commentary,
  sustainabilityStats,
  fanGuide,
} from '../data/mockData'

/**
 * Fan Zone — live match stats, AI commentary,
 * sustainability tracker, and cultural fan guide.
 */

const STAT_ROWS = [
  {
    label: 'POSSESSION',
    home: matchStats.possession.home,
    away: matchStats.possession.away,
    unit: '%',
  },
  {
    label: 'SHOTS',
    home: matchStats.shots.home,
    away: matchStats.shots.away,
    unit: '',
  },
  {
    label: 'PASSES',
    home: matchStats.passes.home,
    away: matchStats.passes.away,
    unit: '',
  },
]

export function FanZone() {
  return (
    <div className="page-enter space-y-6">
      {/* ── Match Stats Hero ─────────────────── */}
      <section
        className="bg-navy rounded-3xl p-6 sm:p-8 shadow-hero"
        aria-label="Live match statistics"
      >
        <h1 className="font-display text-xl text-ops-gold mb-1 tracking-wide">
          LIVE MATCH STATS
        </h1>
        <p className="text-sm text-white/60 mb-5">
          Brazil vs Argentina · 67&apos;
        </p>

        <div className="space-y-4">
          {STAT_ROWS.map(({ label, home, away, unit }) => {
            const total = home + away
            const homePct = Math.round((home / total) * 100)
            const awayPct = 100 - homePct

            return (
              <div key={label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display text-xl text-white w-12 leading-none">
                    {home}
                    {unit}
                  </span>
                  <span className="text-xs text-white/50 uppercase tracking-widest font-mono flex-1 text-center">
                    {label}
                  </span>
                  <span className="font-display text-xl text-white w-12 leading-none text-right">
                    {away}
                    {unit}
                  </span>
                </div>
                {/* Comparison bar */}
                <div
                  className="flex h-1.5 rounded-full overflow-hidden"
                  role="img"
                  aria-label={`${label}: Brazil ${home}${unit}, Argentina ${away}${unit}`}
                >
                  <div
                    className="bg-yellow-400 transition-all duration-700"
                    style={{ width: `${homePct}%` }}
                  />
                  <div
                    className="bg-sky-300 transition-all duration-700"
                    style={{ width: `${awayPct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex gap-6 mt-5 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full bg-yellow-400"
              aria-hidden="true"
            />
            <span className="text-xs text-white/60">🇧🇷 Brazil</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full bg-sky-300"
              aria-hidden="true"
            />
            <span className="text-xs text-white/60">
              🇦🇷 Argentina
            </span>
          </div>
        </div>
      </section>

      {/* ── AI Commentary ────────────────────── */}
      <CommentaryFeed items={commentary} />

      {/* ── Sustainability + Fan Guide grid ──── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <SustainabilityTracker stats={sustainabilityStats} />

        {/* Cultural Fan Guide */}
        <section aria-label="Fan culture guide">
          <h2 className="text-sm font-medium text-navy border-l-4 border-gold pl-3 mb-3">
            48 Nations, One Tournament
          </h2>
          <ul className="space-y-3" role="list">
            {fanGuide.map(({ country, flag, tradition }) => (
              <li
                key={country}
                className="bg-surface1 border border-surface3 rounded-2xl p-4 shadow-card pressable"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl" aria-hidden="true">
                    {flag}
                  </span>
                  <div>
                    <p className="font-display text-navy text-lg leading-none tracking-wide">
                      {country.toUpperCase()}
                    </p>
                    <p className="text-xs text-muted leading-snug mt-1">
                      {tradition}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
