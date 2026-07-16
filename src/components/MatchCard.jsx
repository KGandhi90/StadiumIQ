import { MapPin, Users } from 'lucide-react'
import { match as LIVE_MATCH } from '../data/mockData'

export default function MatchCard({ match = LIVE_MATCH }) {
  const pct = Math.round(
    ((match?.attendance || 0) / (match?.capacity || 1)) * 100
  )

  return (
    <div className="bg-navy rounded-3xl p-6 sm:p-8 shadow-dark animate-fade-in">
      {/* Top Row */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-white/50 text-[11px] font-medium uppercase tracking-widest">
          {match.group} · {match.matchday}
        </span>
        <div className="flex items-center gap-2">
          {match.isLive && (
            <span className="flex items-center gap-1.5 bg-crimson text-white text-xs font-semibold px-3 py-1 rounded-full animate-pulse-live">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              LIVE
            </span>
          )}
          <span className="font-display text-gold text-2xl leading-none">
            {match.minute}'
          </span>
        </div>
      </div>

      {/* Teams & Score */}
      <div className="flex items-center justify-between gap-4 mb-6">
        {/* Home */}
        <div className="flex flex-col items-center gap-1 flex-1">
          <span className="text-3xl sm:text-4xl">
            {match.homeTeam.flag}
          </span>
          <span className="font-display text-white text-2xl sm:text-3xl tracking-wide">
            {match.homeTeam.name}
          </span>
        </div>

        {/* Score */}
        <div className="text-center flex-shrink-0">
          <div className="font-display text-gold text-5xl sm:text-6xl leading-none tracking-wide">
            {match.homeTeam.score} – {match.awayTeam.score}
          </div>
          <div className="text-white/40 text-xs font-medium mt-1 uppercase tracking-wider">
            Score
          </div>
        </div>

        {/* Away */}
        <div className="flex flex-col items-center gap-1 flex-1">
          <span className="text-3xl sm:text-4xl">
            {match.awayTeam.flag}
          </span>
          <span className="font-display text-white text-2xl sm:text-3xl tracking-wide">
            {match.awayTeam.name}
          </span>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-white/10 pt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
        <div className="flex items-center gap-1.5 text-white/60 text-xs">
          <MapPin size={12} />
          <span>{match.venue}</span>
        </div>
        <div className="flex items-center gap-1.5 text-white/60 text-xs">
          <Users size={12} />
          <span className="font-mono-data">
            {(match.attendance || 0).toLocaleString()}
          </span>
          <span>fans checked in</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-gold font-mono-data font-medium">
            {pct}% capacity
          </span>
        </div>
      </div>
    </div>
  )
}
