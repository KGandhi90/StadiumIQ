import { useState, useEffect, useCallback } from 'react'
import { Loader2, Leaf, Zap } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { useMatch } from '../hooks/useMatch'
import { useFanZone } from '../hooks/useFanZone'

const STAT_ROWS = [
  { key: 'possession', label: 'POSSESSION', unit: '%' },
  { key: 'shots', label: 'SHOTS', unit: '' },
  { key: 'passes', label: 'PASSES', unit: '' },
]

export function FanZone() {
  const ctx = useAppContext()
  const { minute } = useMatch(ctx.match, ctx.gates)
  const { commentary, isGenerating, stats, generateCommentary } =
    useFanZone({
      commentary: ctx.commentary,
      matchStats: ctx.matchStats,
    })
  const [animated, setAnimated] = useState(false)

  // Animate progress bars on mount
  useEffect(() => {
    const id = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(id)
  }, [])

  const onGenerate = useCallback(
    () => generateCommentary(minute),
    [generateCommentary, minute]
  )

  return (
    <div className="page-enter space-y-6">
      {/* Match Stats Hero */}
      <section
        className="bg-navy rounded-3xl p-6 sm:p-8 shadow-hero"
        role="region"
        aria-label="Live match statistics"
      >
        <h1 className="font-display text-xl text-ops-gold mb-1 tracking-wide">
          LIVE MATCH STATS
        </h1>
        <p className="text-sm text-white/60 mb-5">
          Brazil vs Argentina · {minute}&apos;
        </p>
        <div className="space-y-4">
          {STAT_ROWS.map(({ key, label, unit }) => {
            const home = stats[key]?.home ?? 0
            const away = stats[key]?.away ?? 0
            const total = home + away || 1
            const homePct = Math.round((home / total) * 100)
            return (
              <div key={key}>
                <div
                  className="flex items-center justify-between mb-2"
                  aria-label={`${label}: Brazil ${home}${unit}, Argentina ${away}${unit}`}
                >
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
                <div className="flex h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-yellow-400 transition-all duration-700"
                    style={{ width: `${homePct}%` }}
                  />
                  <div
                    className="bg-sky-300 transition-all duration-700"
                    style={{ width: `${100 - homePct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
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

      {/* AI Commentary */}
      <section aria-label="AI match commentary">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={14} className="text-gold" aria-hidden="true" />
          <h2 className="text-sm font-semibold text-navy">
            AI Commentary
          </h2>
          <span className="text-xs text-muted ml-auto font-mono">
            Live · Gemini
          </span>
        </div>
        <div className="bg-surface1 border border-surface3 rounded-2xl shadow-card overflow-hidden">
          <ul
            role="feed"
            aria-label="AI Match Commentary"
            aria-live="polite"
            aria-relevant="additions"
            className="divide-y divide-surface3"
          >
            {commentary.map((entry, i) => (
              <li
                key={`${entry.minute}-${i}`}
                role="article"
                className={`flex gap-4 p-4 items-start ${i === 0 ? 'commentary-enter' : ''}`}
              >
                <span className="font-display text-2xl text-gold w-12 flex-shrink-0 leading-none pt-0.5">
                  {entry.minute}
                </span>
                <p className="text-sm text-navy leading-relaxed">
                  {entry.text}
                </p>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={onGenerate}
            disabled={isGenerating}
            className="w-full px-4 py-3 text-sm font-medium text-gold hover:bg-gold/5 transition-colors border-t border-surface3 text-left flex items-center gap-2 disabled:opacity-60"
          >
            {isGenerating ? (
              <>
                <Loader2
                  size={14}
                  className="animate-spin"
                  aria-hidden="true"
                />{' '}
                Generating...
              </>
            ) : (
              'Generate AI Commentary →'
            )}
          </button>
        </div>
      </section>

      {/* Sustainability + Fan Guide */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <section
          className="bg-surface1 border border-surface3 rounded-2xl p-5 shadow-card"
          aria-label="Sustainability goals"
        >
          <div className="flex items-center gap-2 mb-4">
            <Leaf
              size={15}
              className="text-green"
              aria-hidden="true"
            />
            <h2 className="text-sm font-semibold text-navy">
              Green Goals 2026
            </h2>
          </div>
          <ul role="list" className="space-y-4">
            {ctx.sustainabilityStats.map((stat) => (
              <li key={stat.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-muted leading-snug pr-4">
                    {stat.label}
                  </span>
                  <span className="text-sm font-display text-green flex-shrink-0">
                    {stat.value}
                  </span>
                </div>
                <div
                  className="h-1.5 bg-surface3 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuenow={stat.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={stat.label}
                >
                  <div
                    className="h-full bg-green rounded-full transition-all duration-1000"
                    style={{
                      width: animated ? `${stat.progress}%` : '0%',
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Fan culture guide">
          <h2 className="text-sm font-medium text-navy border-l-4 border-gold pl-3 mb-3">
            48 Nations, One Tournament
          </h2>
          <ul className="space-y-3" role="list">
            {ctx.fanGuide.map(({ country, flag, tradition }) => (
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
