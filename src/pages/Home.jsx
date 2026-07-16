import { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate as useRouterNavigate } from 'react-router-dom'
import { MapPin, Users, Zap, ChevronRight } from 'lucide-react'
import { StatCard } from '../components/StatCard'
import { StatusPill } from '../components/StatusPill'
import { TransportStrip } from '../components/TransportStrip'
import { useAppContext } from '../context/AppContext'
import { useMatch } from '../hooks/useMatch'
import { trackEvent } from '../utils/analytics'
import { FACT_INTERVAL_MS } from '../utils/constants'

export function Home() {
  const ctx = useAppContext()
  const {
    formattedMinute,
    gates: liveGates,
    match: liveMatch,
  } = useMatch()
  const [highlightIdx, setHighlightIdx] = useState(0)
  const [highlightVisible, setHighlightVisible] = useState(true)
  const routerNavigate = useRouterNavigate()

  const matchDisplay = useMemo(
    () => liveMatch ?? ctx.matchState,
    [liveMatch, ctx.matchState]
  )

  const capacityPct = useMemo(() => {
    const checkedIn = matchDisplay?.attendance ?? 79340
    const capacity = matchDisplay?.capacity ?? 82500
    return Math.round((checkedIn / capacity) * 100)
  }, [matchDisplay])

  // Rotate AI highlights with fade transition
  useEffect(() => {
    const id = setInterval(() => {
      setHighlightVisible(false)
      setTimeout(() => {
        setHighlightIdx(
          (prev) => (prev + 1) % ctx.aiHighlights.length
        )
        setHighlightVisible(true)
      }, 300)
    }, FACT_INTERVAL_MS)
    return () => clearInterval(id)
  }, [ctx.aiHighlights.length])

  /** @param {React.MouseEvent<HTMLElement>} e */
  const onMatchCardClick = useCallback(
    (e) => {
      const id = e.currentTarget.dataset.id || ''
      trackEvent('Home', 'MatchCardClicked', id)
      routerNavigate('/navigate')
    },
    [routerNavigate]
  )

  /** @param {React.KeyboardEvent<HTMLElement>} e */
  const onMatchCardKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        const id = e.currentTarget.dataset.id || ''
        trackEvent('Home', 'MatchCardClicked', id)
        routerNavigate('/navigate')
      }
    },
    [routerNavigate]
  )

  const avgCrowd = useMemo(
    () =>
      liveGates.filter((g) => g.crowd === 'high').length > 2
        ? 'high'
        : 'medium',
    [liveGates]
  )

  // Loading skeleton
  if (ctx.isLoading) {
    return (
      <div
        className="page-enter space-y-6"
        aria-busy="true"
        aria-label="Loading match data"
      >
        <div className="bg-navy rounded-3xl p-6 sm:p-8 shadow-hero animate-pulse">
          <div className="h-4 bg-white/10 rounded w-32 mb-6" />
          <div className="h-16 bg-white/10 rounded mb-6" />
          <div className="h-4 bg-white/10 rounded w-48" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 bg-surface2 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="page-enter space-y-6">
      {/* Live Match Hero */}
      <section
        className="bg-navy rounded-3xl p-6 sm:p-8 shadow-hero"
        aria-label="Live match"
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-white/60 uppercase tracking-widest">
            {matchDisplay?.group}
          </p>
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-crimson pulse-live"
              aria-hidden="true"
            />
            <span className="text-xs text-crimson font-medium">
              LIVE
            </span>
            <span className="font-display text-lg text-gold">
              {formattedMinute}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between my-6">
          <div className="flex flex-col items-start gap-1">
            <span className="text-4xl" aria-hidden="true">
              🇧🇷
            </span>
            <span className="font-display text-2xl sm:text-3xl text-white">
              BRAZIL
            </span>
          </div>
          <div
            className="font-display text-5xl sm:text-6xl text-gold leading-none"
            aria-label={`Score: ${matchDisplay?.homeScore} to ${matchDisplay?.awayScore}`}
          >
            {matchDisplay?.homeScore} – {matchDisplay?.awayScore}
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-4xl" aria-hidden="true">
              🇦🇷
            </span>
            <span className="font-display text-2xl sm:text-3xl text-white text-right">
              ARGENTINA
            </span>
          </div>
        </div>
        <div className="flex gap-6 pt-5 border-t border-white/10 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <MapPin
              size={12}
              className="text-white/40"
              aria-hidden="true"
            />
            <span className="text-xs text-white/60">
              {matchDisplay?.venue}
            </span>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <Users
              size={12}
              className="text-white/40"
              aria-hidden="true"
            />
            <span className="text-xs text-white/60">
              {(matchDisplay?.attendance ?? 0).toLocaleString()} fans
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-white/60">
              {capacityPct}% capacity
            </span>
            <StatusPill status={avgCrowd} />
          </div>
        </div>
      </section>

      {/* Upcoming Matches */}
      <section aria-label="Upcoming matches">
        <h2 className="text-sm font-medium text-navy border-l-4 border-gold pl-3 mb-3">
          Upcoming Matches
        </h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {ctx.upcomingMatches.map((m) => (
            <article
              key={m.id}
              className="min-w-52 bg-surface1 border border-surface3 rounded-2xl p-4 pressable shadow-card flex-shrink-0"
              data-id={m.id}
              onClick={onMatchCardClick}
              onKeyDown={onMatchCardKeyDown}
              role="button"
              tabIndex={0}
            >
              <p className="text-xs font-mono text-muted mb-2">
                {m.date} · {m.time}
              </p>
              <p className="text-sm font-semibold text-navy">
                {m.home} vs {m.away}
              </p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-muted flex items-center gap-1">
                  <MapPin size={10} aria-hidden="true" />
                  {m.venue}
                </p>
                <StatusPill status={m.crowd} />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Tournament Stats */}
      <section aria-label="Tournament statistics">
        <h2 className="text-sm font-medium text-navy border-l-4 border-gold pl-3 mb-3">
          Tournament at a Glance
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {ctx.tournamentStats.map((stat) => (
            <StatCard
              key={stat.id}
              value={stat.value}
              label={stat.label}
              color={stat.color}
            />
          ))}
        </div>
      </section>

      {/* AI Highlights */}
      <section
        className="bg-surface2 border-l-4 border-gold rounded-2xl p-5 shadow-card"
        aria-label="AI match insights"
      >
        <div className="flex items-center gap-2 mb-4">
          <Zap size={16} className="text-gold" aria-hidden="true" />
          <h2 className="text-sm font-semibold text-navy">
            AI Match Insights
          </h2>
          <span className="text-xs text-muted ml-auto">
            Powered by Gemini
          </span>
        </div>
        <p
          className={`text-sm text-navy leading-relaxed transition-opacity duration-300 ${highlightVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          {ctx.aiHighlights[highlightIdx]}
        </p>
        <a
          href="/chat"
          className="mt-4 text-sm font-medium text-gold flex items-center gap-1 hover:underline"
        >
          Ask AI Concierge{' '}
          <ChevronRight size={14} aria-hidden="true" />
        </a>
      </section>

      {/* Transport */}
      <section aria-label="Transport status">
        <h2 className="text-sm font-medium text-navy border-l-4 border-gold pl-3 mb-3">
          Getting Here
        </h2>
        <TransportStrip items={ctx.transportStatus} />
      </section>
    </div>
  )
}
