import { MapPin, Users, Zap, ChevronRight } from 'lucide-react'
import { StatCard } from '../components/StatCard'
import { StatusPill } from '../components/StatusPill'
import { TransportStrip } from '../components/TransportStrip'
import {
  match,
  upcomingMatches,
  tournamentStats,
  aiHighlights,
  transportStatus,
} from '../data/mockData'

/**
 * Home page — live match hub, tournament stats,
 * AI highlights, and transport status.
 */

export function Home() {
  const capacityPct = Math.round(
    (match.attendance / match.capacity) * 100
  )

  return (
    <div className="page-enter space-y-6">
      {/* ── Live Match Hero ─────────────────── */}
      <section
        className="bg-navy rounded-3xl p-6 sm:p-8 shadow-hero"
        aria-label="Live match"
      >
        {/* Top row */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-sans text-white/60 uppercase tracking-widest">
            {match.group}
          </p>
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-crimson pulse-live"
              aria-hidden="true"
            />
            <span className="text-xs font-sans text-crimson font-medium">
              LIVE
            </span>
            <span className="font-display text-lg text-gold">
              {match.minute}&apos;
            </span>
          </div>
        </div>

        {/* Teams + score */}
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
            aria-label={`Score: ${match.homeScore} to ${match.awayScore}`}
          >
            {match.homeScore} – {match.awayScore}
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

        {/* Stats strip */}
        <div className="flex gap-6 pt-5 border-t border-white/10 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <MapPin
              size={12}
              className="text-white/40"
              aria-hidden="true"
            />
            <span className="text-xs text-white/60">
              {match.venue}
            </span>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <Users
              size={12}
              className="text-white/40"
              aria-hidden="true"
            />
            <span className="text-xs text-white/60">
              {match.attendance.toLocaleString()} fans
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-white/60">
              {capacityPct}% capacity
            </span>
            <StatusPill status="high" />
          </div>
        </div>
      </section>

      {/* ── Upcoming Matches ────────────────── */}
      <section aria-label="Upcoming matches">
        <h2 className="text-sm font-medium text-navy border-l-4 border-gold pl-3 mb-3">
          Upcoming Matches
        </h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {upcomingMatches.map((m) => (
            <article
              key={m.id}
              className="min-w-52 bg-surface1 border border-surface3 rounded-2xl p-4 pressable shadow-card flex-shrink-0"
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

      {/* ── Tournament Stats 2x2 ────────────── */}
      <section aria-label="Tournament statistics">
        <h2 className="text-sm font-medium text-navy border-l-4 border-gold pl-3 mb-3">
          Tournament at a Glance
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {tournamentStats.map((stat) => (
            <StatCard
              key={stat.id}
              value={stat.value}
              label={stat.label}
              color={stat.color}
            />
          ))}
        </div>
      </section>

      {/* ── AI Highlights ───────────────────── */}
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

        <ul className="space-y-3" role="list">
          {aiHighlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0"
                aria-hidden="true"
              />
              <p className="text-sm text-navy leading-relaxed">
                {highlight}
              </p>
            </li>
          ))}
        </ul>

        <a
          href="/chat"
          className="mt-4 text-sm font-medium text-gold flex items-center gap-1 hover:underline"
        >
          Ask AI Concierge
          <ChevronRight size={14} aria-hidden="true" />
        </a>
      </section>

      {/* ── Transport Status ─────────────────── */}
      <section aria-label="Transport status">
        <h2 className="text-sm font-medium text-navy border-l-4 border-gold pl-3 mb-3">
          Getting Here
        </h2>
        <TransportStrip items={transportStatus} />
      </section>
    </div>
  )
}
