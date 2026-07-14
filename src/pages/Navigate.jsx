import { useState } from 'react';
import { Accessibility, Route, Navigation } from 'lucide-react';
import VenueMap from '../components/VenueMap';
import StatusPill from '../components/StatusPill';
import { GATES, TRANSPORT_STATUS } from '../utils/constants';

const FILTER_TABS = [
  { id: 'all',           label: 'All'         },
  { id: 'restrooms',     label: '🚻 Restrooms' },
  { id: 'food',          label: '🍔 Food'      },
  { id: 'exits',         label: '🚪 Exits'     },
  { id: 'firstaid',      label: '➕ First Aid' },
  { id: 'accessibility', label: '♿ Accessible' },
];

const TRANSPORT_ICONS = { metro: '🚇', bus: '🚌', rideshare: '🚗' };

export default function Navigate() {
  const [activeFilter, setActiveFilter]     = useState('all');
  const [accessMode, setAccessMode]         = useState(false);
  const [showRoute, setShowRoute]           = useState(false);

  return (
    <div className="min-h-screen bg-base">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-navy text-3xl tracking-wide">Navigate</h1>
            <p className="text-xs text-muted mt-0.5">MetLife Stadium · Section C, Row 14, Seat 22</p>
          </div>
          {/* Accessibility toggle */}
          <button
            onClick={() => setAccessMode(v => !v)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium transition-all
              ${accessMode
                ? 'bg-gold text-white border-gold shadow-gold'
                : 'bg-surface1 text-muted border-surface3 hover:border-gold hover:text-gold'
              }`}
          >
            <Accessibility size={14} />
            <span className="hidden sm:inline">Accessibility Mode</span>
            <span className="sm:hidden">♿</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {FILTER_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all
                ${activeFilter === tab.id
                  ? 'bg-gold text-white shadow-sm'
                  : 'bg-surface2 text-muted hover:text-navy hover:bg-surface3'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Venue Map */}
        <div className="relative">
          <VenueMap
            activeFilter={activeFilter}
            showRoute={showRoute}
            accessibilityMode={accessMode}
          />
          {/* Show Route button overlay */}
          <button
            onClick={() => setShowRoute(v => !v)}
            className={`absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all shadow-sm
              ${showRoute
                ? 'bg-gold text-white'
                : 'bg-white/90 text-navy border border-surface3 hover:border-gold'
              }`}
          >
            <Route size={13} />
            {showRoute ? 'Hide Route' : 'Show Route'}
          </button>
        </div>

        {/* Accessibility Info Banner */}
        {accessMode && (
          <div className="bg-gold/10 border border-gold/30 rounded-xl p-4 flex items-start gap-3 animate-fade-in">
            <span className="text-xl flex-shrink-0">♿</span>
            <div>
              <p className="text-sm font-semibold text-navy mb-1">Accessibility Mode Active</p>
              <p className="text-xs text-muted leading-relaxed">
                Step-free access available at <strong>Gates A, C, F</strong>. Lifts to all levels. 
                Accessible seating: sections <strong>120-A, 230-B, 340-C</strong>. 
                Companion seating included at all accessible locations.
              </p>
            </div>
          </div>
        )}

        {/* Gate Status Row */}
        <section>
          <h2 className="text-[11px] font-semibold text-muted uppercase tracking-widest mb-3">
            Gate Wait Times
          </h2>
          <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1">
            {GATES.map(gate => (
              <div
                key={gate.id}
                className="flex-shrink-0 bg-surface1 border border-surface3 rounded-2xl p-4 min-w-[100px] text-center shadow-card"
              >
                <div className="font-display text-navy text-3xl leading-none mb-1">
                  {gate.id}
                </div>
                <div className={`font-mono-data font-bold text-lg leading-none mb-2
                  ${gate.level === 'high' ? 'text-crimson' : gate.level === 'moderate' ? 'text-gold' : 'text-green'}`}>
                  {gate.wait} min
                </div>
                <StatusPill status={gate.level} />
                {gate.accessible && (
                  <div className="mt-1.5 text-[10px] text-gold">♿ Accessible</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Getting Here — Transport */}
        <section>
          <h2 className="text-[11px] font-semibold text-muted uppercase tracking-widest mb-3 flex items-center gap-2">
            <Navigation size={13} />
            Getting Here
          </h2>
          <div className="space-y-2.5">
            {TRANSPORT_STATUS.map(t => (
              <div
                key={t.id}
                className="bg-surface1 border border-surface3 rounded-2xl p-4 flex items-center gap-4 shadow-card"
              >
                <span className="text-2xl">{t.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-navy">{t.type}</span>
                    <span className="text-xs text-muted">{t.label}</span>
                  </div>
                  <p className="text-xs text-muted">{t.detail}</p>
                </div>
                <div className="text-right">
                  <StatusPill status={t.status} label={t.statusText} />
                  <div className="font-mono-data text-sm font-bold text-navy mt-1">{t.eta}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="h-4" />
      </div>
    </div>
  );
}
