import { useState } from 'react';
import PropTypes from 'prop-types';

// Section density for dashboard crowd view
const SECTION_DENSITY = [
  { id: 'A', x: 250, y: 110, density: 72  },
  { id: 'B', x: 390, y: 160, density: 94  },
  { id: 'C', x: 420, y: 290, density: 88  },
  { id: 'D', x: 310, y: 410, density: 91  },
  { id: 'E', x: 160, y: 400, density: 65  },
  { id: 'F', x: 90,  y: 290, density: 48  },
  { id: 'G', x: 105, y: 165, density: 82  },
  { id: 'H', x: 195, y: 115, density: 78  },
];

// Staff positions
const STAFF_PINS = [
  { id: 's1', x: 250, y: 65,  name: 'Gate A' },
  { id: 's2', x: 420, y: 150, name: 'Gate B' },
  { id: 's3', x: 450, y: 315, name: 'Gate C' },
  { id: 's4', x: 310, y: 445, name: 'Gate D' },
  { id: 's5', x: 130, y: 430, name: 'Gate E' },
  { id: 's6', x: 50,  y: 260, name: 'Gate F' },
];

function densityColor(d) {
  if (d >= 85) return '#DC2626';
  if (d >= 65) return '#D97706';
  return '#16A34A';
}

export default function CrowdHeatmap({ gates = [], onGateAction }) {
  const [hoveredSection, setHoveredSection] = useState(null);

  return (
    <div className="space-y-4">
      {/* Map */}
      <div className="relative bg-dash-surface2 rounded-2xl overflow-hidden border border-dash-surface3">
        <svg viewBox="0 0 500 500" className="w-full" aria-label="Crowd density heatmap">
          {/* Stadium oval */}
          <ellipse cx="250" cy="250" rx="220" ry="200"
            fill="#162852" stroke="#1E3A6E" strokeWidth="2" />
          <ellipse cx="250" cy="250" rx="185" ry="165"
            fill="#0F2044" stroke="#1E3A6E" strokeWidth="1" />

          {/* Field */}
          <rect x="130" y="155" width="240" height="190" rx="6"
            fill="#15803D" stroke="#16A34A" strokeWidth="1" />
          <line x1="250" y1="155" x2="250" y2="345" stroke="#22C55E" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="30" fill="none" stroke="#22C55E" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="3" fill="#22C55E" />

          {/* Density heat zones */}
          {SECTION_DENSITY.map(s => (
            <g key={s.id}
              onMouseEnter={() => setHoveredSection(s.id)}
              onMouseLeave={() => setHoveredSection(null)}
              style={{ cursor: 'pointer' }}>
              <circle
                cx={s.x} cy={s.y} r="28"
                fill={densityColor(s.density)}
                opacity={hoveredSection === s.id ? 0.5 : 0.25}
              />
              <text x={s.x} y={s.y - 6}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="9" fontWeight="700" fill="#F1F5F9"
                fontFamily="Inter, sans-serif">
                {s.id}
              </text>
              <text x={s.x} y={s.y + 7}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="11" fontWeight="700"
                fill={densityColor(s.density)}
                fontFamily="'JetBrains Mono', monospace">
                {s.density}%
              </text>
            </g>
          ))}

          {/* Staff pins (yellow stars) */}
          {STAFF_PINS.map(pin => (
            <text key={pin.id} x={pin.x} y={pin.y}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="14">
              ⭐
            </text>
          ))}
        </svg>

        {/* Hover tooltip */}
        {hoveredSection && (() => {
          const s = SECTION_DENSITY.find(x => x.id === hoveredSection);
          return (
            <div className="absolute top-3 right-3 bg-dash-surface1 border border-dash-surface3 rounded-xl px-3 py-2">
              <div className="text-white/50 text-[10px]">Section {s.id}</div>
              <div className="font-mono-data font-bold" style={{ color: densityColor(s.density) }}>
                {s.density}% density
              </div>
            </div>
          );
        })()}
      </div>

      {/* Gate control row */}
      {gates.length > 0 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {gates.map(gate => (
            <div key={gate.id}
              className="flex-shrink-0 bg-dash-surface1 border border-dash-surface3 rounded-xl px-4 py-3 min-w-[110px]">
              <div className="font-display text-white text-2xl leading-none mb-1">
                Gate {gate.id}
              </div>
              <div className={`font-mono-data text-sm font-bold mb-2
                ${gate.level === 'high' ? 'text-red-400' : gate.level === 'moderate' ? 'text-yellow-400' : 'text-green-400'}`}>
                {gate.wait} min
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => onGateAction?.(gate.id, 'open')}
                  className="text-[10px] px-2 py-1 rounded bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                >
                  Open
                </button>
                <button
                  onClick={() => onGateAction?.(gate.id, 'redirect')}
                  className="text-[10px] px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition-colors"
                >
                  Redir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

CrowdHeatmap.propTypes = {
  gates:        PropTypes.array,
  onGateAction: PropTypes.func,
};
