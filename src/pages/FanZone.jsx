import { useState } from 'react';
import { Zap, RefreshCw } from 'lucide-react';
import CommentaryFeed from '../components/CommentaryFeed';
import SustainabilityTracker from '../components/SustainabilityTracker';
import { COMMENTARY, FAN_NATIONS, SUSTAINABILITY_STATS, MATCH_STATS, LIVE_MATCH } from '../utils/constants';

export default function FanZone() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <div className="min-h-screen bg-base">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8">

        {/* Match Stats Card */}
        <section className="bg-navy rounded-3xl p-6 shadow-dark">
          <div className="flex items-center justify-between mb-1">
            <div className="font-display text-gold text-lg tracking-wide">LIVE MATCH STATS</div>
            <span className="text-[11px] text-white/40 font-mono-data">67' · GROUP C</span>
          </div>
          <p className="text-white/60 text-sm mb-6">
            {LIVE_MATCH.homeTeam.flag} Brazil vs Argentina {LIVE_MATCH.awayTeam.flag}
          </p>

          {/* Stats Comparison */}
          <div className="space-y-5">
            {MATCH_STATS.map((stat, i) => {
              const total = stat.home + stat.away;
              const homePct = Math.round((stat.home / total) * 100);
              const awayPct = 100 - homePct;
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display text-white text-xl leading-none">{stat.home}{stat.unit}</span>
                    <span className="text-[11px] text-white/40 uppercase tracking-wider font-medium">
                      {stat.label}
                    </span>
                    <span className="font-display text-white text-xl leading-none">{stat.away}{stat.unit}</span>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
                    <div
                      className="rounded-l-full transition-all duration-700"
                      style={{ width: `${homePct}%`, background: 'linear-gradient(90deg, #FFD700, #F59E0B)' }}
                    />
                    <div
                      className="rounded-r-full transition-all duration-700"
                      style={{ width: `${awayPct}%`, background: 'linear-gradient(90deg, #74C0FC, #3B82F6)' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Team legend */}
          <div className="flex gap-6 mt-5 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: '#FFD700' }} />
              <span className="text-white/60 text-xs">Brazil</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: '#74C0FC' }} />
              <span className="text-white/60 text-xs">Argentina</span>
            </div>
          </div>
        </section>

        {/* AI Commentary Feed */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-gold" />
              <h2 className="text-sm font-semibold text-navy">AI Match Commentary</h2>
              <span className="bg-crimson/10 text-crimson text-[10px] px-2 py-0.5 rounded-full font-medium animate-pulse">
                LIVE
              </span>
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1.5 text-xs text-muted hover:text-navy transition-colors"
            >
              <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
          <div className="bg-surface1 border border-surface3 rounded-2xl overflow-hidden shadow-card">
            <div className="p-4">
              <CommentaryFeed commentary={COMMENTARY} />
            </div>
          </div>
        </section>

        {/* Sustainability & Fan Guide — 2-column on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Sustainability Tracker */}
          <SustainabilityTracker stats={SUSTAINABILITY_STATS} />

          {/* Cultural Fan Guide */}
          <section>
            <h2 className="text-[11px] font-semibold text-muted uppercase tracking-widest mb-3">
              48 Nations, One Tournament
            </h2>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 lg:flex-col lg:overflow-visible">
              {FAN_NATIONS.map((nation, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 lg:flex-shrink bg-surface1 border border-surface3 rounded-2xl p-4 min-w-[200px] lg:min-w-0 shadow-card hover:shadow-glow transition-shadow duration-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{nation.flag}</span>
                    <div>
                      <div className="font-display text-navy text-lg leading-none tracking-wide">
                        {nation.country}
                      </div>
                      <p className="text-xs text-muted leading-snug mt-1">{nation.tradition}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Fan Leaderboard teaser */}
        <section>
          <div className="bg-navy rounded-2xl p-5 flex items-center justify-between">
            <div>
              <div className="font-display text-gold text-xl tracking-wide mb-0.5">FAN LEADERBOARD</div>
              <p className="text-white/50 text-xs">Check-ins, predictions & chants — top fans this matchday</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              {['🇧🇷 BrazilFan_007', '🇦🇷 ArgenHeart_42', '🌍 WC2026_Global'].map((fan, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="font-display text-gold text-sm">#{i + 1}</span>
                  <span className="text-white/70 text-xs">{fan}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-4" />
      </div>
    </div>
  );
}
