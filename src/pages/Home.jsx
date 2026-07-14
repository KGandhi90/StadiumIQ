import { Link } from 'react-router-dom';
import { Zap, ArrowRight, Trophy, Users, MapPin, Globe } from 'lucide-react';
import MatchCard from '../components/MatchCard';
import StatCard from '../components/StatCard';
import TransportStrip from '../components/TransportStrip';
import StatusPill from '../components/StatusPill';
import { LIVE_MATCH, UPCOMING_MATCHES, AI_HIGHLIGHTS, TRANSPORT_STATUS, TOURNAMENT } from '../utils/constants';
import { formatNumber } from '../utils/helpers';

export default function Home() {
  return (
    <div className="min-h-screen bg-base">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8">

        {/* Hero — Live Match Card */}
        <section>
          <MatchCard match={LIVE_MATCH} />
        </section>

        {/* Venue Selector */}
        <section>
          <h2 className="text-[11px] font-semibold text-muted uppercase tracking-widest mb-3">
            Select Match Venue
          </h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {UPCOMING_MATCHES.map(match => (
              <div
                key={match.id}
                className={`flex-shrink-0 rounded-2xl border p-4 min-w-[220px] shadow-card transition-all duration-200 hover:shadow-glow cursor-pointer
                  ${match.isLive ? 'bg-navy border-navy' : 'bg-surface1 border-surface3'}`}
              >
                {/* Teams */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl">{match.homeTeam.flag}</span>
                    <span className={`font-display text-sm tracking-wide ${match.isLive ? 'text-white' : 'text-navy'}`}>
                      {match.homeTeam.name}
                    </span>
                  </div>
                  <span className={`font-display text-lg leading-none ${match.isLive ? 'text-gold' : 'text-muted'}`}>
                    {match.score ?? 'vs'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`font-display text-sm tracking-wide ${match.isLive ? 'text-white' : 'text-navy'}`}>
                      {match.awayTeam.name}
                    </span>
                    <span className="text-xl">{match.awayTeam.flag}</span>
                  </div>
                </div>

                {/* Meta */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={11} className={match.isLive ? 'text-white/40' : 'text-muted'} />
                    <span className={`text-xs ${match.isLive ? 'text-white/60' : 'text-muted'}`}>
                      {match.venue}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`font-mono-data text-xs ${match.isLive ? 'text-gold/80' : 'text-muted'}`}>
                      {match.date} · {match.time}
                    </span>
                    {match.isLive
                      ? <StatusPill status="live" />
                      : <StatusPill status={match.crowdLevel} />
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Stats Grid */}
        <section>
          <h2 className="text-[11px] font-semibold text-muted uppercase tracking-widest mb-3">
            Tournament at a Glance
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard value={TOURNAMENT.teams}   label="Teams"         icon={Trophy} />
            <StatCard value={formatNumber(LIVE_MATCH.attendance)} label="Fans Today" icon={Users}  />
            <StatCard value={TOURNAMENT.matches} label="Total Matches"  icon={Globe}  />
            <StatCard value={TOURNAMENT.cities}  label="Host Cities"   icon={MapPin}  />
          </div>
        </section>

        {/* AI Highlights */}
        <section>
          <div className="bg-surface2 border-l-4 border-gold rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={16} className="text-gold" />
              <h2 className="text-sm font-semibold text-navy">AI Match Insights</h2>
            </div>
            <ul className="space-y-3">
              {AI_HIGHLIGHTS.map((insight, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-navy/80 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-gold/15 text-gold flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5">
                    {i + 1}
                  </span>
                  {insight}
                </li>
              ))}
            </ul>
            <Link
              to="/chat"
              className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-gold hover:text-gold/80 transition-colors"
            >
              Ask AI Concierge
              <ArrowRight size={13} />
            </Link>
          </div>
        </section>

        {/* Transport Status */}
        <section>
          <h2 className="text-[11px] font-semibold text-muted uppercase tracking-widest mb-3">
            Transport Status
          </h2>
          <TransportStrip transport={TRANSPORT_STATUS} />
        </section>

        {/* Bottom padding */}
        <div className="h-4" />
      </div>
    </div>
  );
}
