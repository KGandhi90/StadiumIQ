import PropTypes from 'prop-types';

// Gate positions around the oval stadium (x,y on 500x500 viewBox)
const GATE_POSITIONS = {
  A: { x: 250, y: 50  },
  B: { x: 430, y: 140 },
  C: { x: 460, y: 310 },
  D: { x: 320, y: 450 },
  E: { x: 130, y: 430 },
  F: { x: 50,  y: 260 },
};

// Overlay marker data
const OVERLAYS = {
  restrooms: [
    { id: 'R1', x: 290, y: 90,  label: 'R1' },
    { id: 'R2', x: 400, y: 180, label: 'R2' },
    { id: 'R3', x: 410, y: 340, label: 'R3' },
    { id: 'R4', x: 220, y: 430, label: 'R4' },
    { id: 'R5', x: 100, y: 360, label: 'R5' },
    { id: 'R6', x: 80,  y: 200, label: 'R6' },
  ],
  food: [
    { id: 'F1', x: 250, y: 120, label: 'F1' },
    { id: 'F2', x: 380, y: 250, label: 'F2' },
    { id: 'F3', x: 290, y: 400, label: 'F3' },
    { id: 'F4', x: 140, y: 380, label: 'F4' },
    { id: 'F5', x: 110, y: 220, label: 'F5' },
  ],
  firstAid: [
    { id: 'FA1', x: 350, y: 160, label: '+' },
    { id: 'FA2', x: 160, y: 330, label: '+' },
  ],
  accessible: [
    { id: 'ACC-A', x: 250, y: 70,  label: '♿' },
    { id: 'ACC-C', x: 460, y: 330, label: '♿' },
    { id: 'ACC-F', x: 65,  y: 275, label: '♿' },
  ],
};

// Section labels
const SECTIONS = [
  { id: 'A', x: 250, y: 110 },
  { id: 'B', x: 390, y: 160 },
  { id: 'C', x: 420, y: 290 },
  { id: 'D', x: 310, y: 410 },
  { id: 'E', x: 160, y: 400 },
  { id: 'F', x: 90,  y: 290 },
  { id: 'G', x: 105, y: 165 },
  { id: 'H', x: 195, y: 115 },
];

export default function VenueMap({ activeFilter = 'all', showRoute = false, accessibilityMode = false }) {
  return (
    <div className="relative w-full bg-surface2 rounded-2xl overflow-hidden border border-surface3">
      <svg
        viewBox="0 0 500 500"
        className="w-full"
        aria-label="MetLife Stadium venue map"
      >
        {/* Outer stadium oval */}
        <ellipse
          cx="250" cy="250" rx="220" ry="200"
          fill="#E2E8F0"
          stroke="#94A3B8"
          strokeWidth="2"
        />

        {/* Inner concourse */}
        <ellipse
          cx="250" cy="250" rx="185" ry="165"
          fill="#CBD5E1"
          stroke="#94A3B8"
          strokeWidth="1"
        />

        {/* Field */}
        <rect x="130" y="155" width="240" height="190" rx="6"
          fill="#16A34A" stroke="#15803D" strokeWidth="1.5" />
        {/* Field markings */}
        <rect x="130" y="155" width="240" height="190" rx="6"
          fill="none" stroke="#22C55E" strokeWidth="0.5" />
        <line x1="250" y1="155" x2="250" y2="345" stroke="#22C55E" strokeWidth="0.5" />
        <circle cx="250" cy="250" r="30" fill="none" stroke="#22C55E" strokeWidth="0.5" />
        <circle cx="250" cy="250" r="3" fill="#22C55E" />
        {/* Penalty areas */}
        <rect x="180" y="155" width="140" height="40" fill="none" stroke="#22C55E" strokeWidth="0.5" />
        <rect x="180" y="305" width="140" height="40" fill="none" stroke="#22C55E" strokeWidth="0.5" />

        {/* Crowd density areas */}
        {/* Gate B — high */}
        <ellipse cx="410" cy="165" rx="32" ry="22" fill="rgba(220,38,38,0.2)" className="glow-high" />
        {/* Gate D — high */}
        <ellipse cx="305" cy="435" rx="30" ry="18" fill="rgba(220,38,38,0.2)" className="glow-high" />
        {/* Gate A — low */}
        <ellipse cx="250" cy="68" rx="28" ry="18" fill="rgba(22,163,74,0.2)" className="glow-low" />
        {/* Gate C — moderate */}
        <ellipse cx="445" cy="310" rx="24" ry="20" fill="rgba(217,119,6,0.2)" className="glow-moderate" />

        {/* Section labels */}
        {SECTIONS.map(s => (
          <text key={s.id} x={s.x} y={s.y}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontWeight="600" fill="#475569"
            fontFamily="Inter, sans-serif"
          >
            {s.id}
          </text>
        ))}

        {/* Gate markers */}
        {Object.entries(GATE_POSITIONS).map(([gate, pos]) => {
          const gateInfo = { A: 'low', B: 'high', C: 'moderate', D: 'high', E: 'moderate', F: 'low' };
          const level = gateInfo[gate];
          const color = level === 'high' ? '#DC2626' : level === 'moderate' ? '#D97706' : '#16A34A';
          const isAccessible = ['A', 'C', 'F'].includes(gate) && accessibilityMode;

          return (
            <g key={gate}>
              <circle cx={pos.x} cy={pos.y} r={accessibilityMode && isAccessible ? 16 : 14}
                fill={isAccessible ? '#D97706' : 'white'}
                stroke={isAccessible ? '#D97706' : color}
                strokeWidth="2.5"
              />
              <text x={pos.x} y={pos.y}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="11" fontWeight="700"
                fill={isAccessible ? 'white' : color}
                fontFamily="'Bebas Neue', cursive"
                letterSpacing="1"
              >
                {gate}
              </text>
            </g>
          );
        })}

        {/* Restroom markers */}
        {(activeFilter === 'all' || activeFilter === 'restrooms') &&
          OVERLAYS.restrooms.map(m => (
            <g key={m.id}>
              <rect x={m.x - 9} y={m.y - 9} width="18" height="18" rx="3"
                fill="#0EA5E9" opacity="0.85" />
              <text x={m.x} y={m.y} textAnchor="middle" dominantBaseline="middle"
                fontSize="8" fontWeight="700" fill="white"
                fontFamily="'JetBrains Mono', monospace">
                {m.label}
              </text>
            </g>
          ))
        }

        {/* Food markers */}
        {(activeFilter === 'all' || activeFilter === 'food') &&
          OVERLAYS.food.map(m => (
            <g key={m.id}>
              <circle cx={m.x} cy={m.y} r="9" fill="#D97706" opacity="0.9" />
              <text x={m.x} y={m.y} textAnchor="middle" dominantBaseline="middle"
                fontSize="8" fontWeight="700" fill="white"
                fontFamily="'JetBrains Mono', monospace">
                {m.label}
              </text>
            </g>
          ))
        }

        {/* First Aid markers */}
        {(activeFilter === 'all' || activeFilter === 'firstaid') &&
          OVERLAYS.firstAid.map(m => (
            <g key={m.id}>
              <rect x={m.x - 9} y={m.y - 9} width="18" height="18" rx="3"
                fill="#DC2626" opacity="0.9" />
              <text x={m.x} y={m.y} textAnchor="middle" dominantBaseline="middle"
                fontSize="13" fontWeight="700" fill="white">
                {m.label}
              </text>
            </g>
          ))
        }

        {/* Accessible markers */}
        {(activeFilter === 'accessibility' || accessibilityMode) &&
          OVERLAYS.accessible.map(m => (
            <g key={m.id}>
              <circle cx={m.x} cy={m.y} r="12" fill="#D97706" opacity="0.9" />
              <text x={m.x} y={m.y + 1} textAnchor="middle" dominantBaseline="middle"
                fontSize="12" fill="white">
                {m.label}
              </text>
            </g>
          ))
        }

        {/* YOUR SEAT pin — Section C, Row 14, Seat 22 */}
        <g>
          {/* Pin shadow */}
          <ellipse cx="438" cy="300" rx="8" ry="3" fill="rgba(0,0,0,0.15)" />
          {/* Pin body */}
          <path d="M438 268 C427 268 420 276 420 285 C420 298 438 310 438 310 C438 310 456 298 456 285 C456 276 449 268 438 268Z"
            fill="#D97706" />
          <circle cx="438" cy="283" r="5" fill="white" />
          {/* Pulse ring */}
          <circle cx="438" cy="283" r="10" fill="none" stroke="#D97706" strokeWidth="2" opacity="0.4">
            <animate attributeName="r" values="10;16;10" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
          {/* Label */}
          <text x="438" y="320" textAnchor="middle"
            fontSize="8" fontWeight="600" fill="#D97706"
            fontFamily="Inter, sans-serif">
            YOUR SEAT
          </text>
        </g>

        {/* Animated route when showRoute */}
        {showRoute && (
          <path
            d={`M ${GATE_POSITIONS.F.x} ${GATE_POSITIONS.F.y} Q 200 250 438 290`}
            fill="none"
            stroke="#D97706"
            strokeWidth="2.5"
            strokeDasharray="8 5"
            strokeDashoffset="200"
            strokeLinecap="round"
          >
            <animate attributeName="stroke-dashoffset" values="200;0" dur="2s" fill="freeze" />
          </path>
        )}

        {/* Accessibility route overlay */}
        {accessibilityMode && (
          <path
            d={`M ${GATE_POSITIONS.F.x} ${GATE_POSITIONS.F.y} L 150 260 L 420 280`}
            fill="none"
            stroke="#D97706"
            strokeWidth="3"
            strokeDasharray="10 6"
            strokeLinecap="round"
            opacity="0.7"
          />
        )}
      </svg>

      {/* Map Legend */}
      <div className="px-4 pb-3 pt-1 flex flex-wrap gap-3 border-t border-surface3">
        <span className="flex items-center gap-1.5 text-[11px] text-muted">
          <span className="w-3 h-3 rounded-full bg-crimson/40" /> High crowd
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-muted">
          <span className="w-3 h-3 rounded-full bg-gold/40" /> Moderate
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-muted">
          <span className="w-3 h-3 rounded-full bg-green/40" /> Low crowd
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-muted">
          <span className="w-3 h-3 rounded-full bg-gold" /> Your seat
        </span>
      </div>
    </div>
  );
}

VenueMap.propTypes = {
  activeFilter:     PropTypes.string,
  showRoute:        PropTypes.bool,
  accessibilityMode:PropTypes.bool,
};
