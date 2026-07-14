import PropTypes from 'prop-types'

/**
 * SVG venue map for MetLife Stadium.
 * Shows crowd density, gate markers, and
 * filter-specific overlay markers.
 * @param {object} props
 * @param {string} [props.activeFilter] - Current filter tab
 * @param {boolean} [props.showRoute] - Show dashed route to seat
 * @param {boolean} [props.dark] - Dark ops variant
 */

const GATE_POSITIONS = [
  { id: 'A', cx: 120, cy: 110, crowd: 'low' },
  { id: 'B', cx: 370, cy: 110, crowd: 'high' },
  { id: 'C', cx: 455, cy: 250, crowd: 'medium' },
  { id: 'D', cx: 370, cy: 390, crowd: 'high' },
  { id: 'E', cx: 250, cy: 450, crowd: 'medium' },
  { id: 'F', cx: 45, cy: 250, crowd: 'low' },
]

const CROWD_COLOR = {
  low: '#16A34A',
  medium: '#D97706',
  high: '#DC2626',
}

const RESTROOM_MARKERS = [
  { id: 'R1', x: 165, y: 140 },
  { id: 'R4', x: 325, y: 140 },
  { id: 'R7', x: 415, y: 215 },
  { id: 'R11', x: 75, y: 215 },
]

const FOOD_MARKERS = [
  { id: 'F1', cx: 195, cy: 125 },
  { id: 'F2', cx: 295, cy: 125 },
  { id: 'F3', cx: 405, cy: 195 },
  { id: 'F4', cx: 85, cy: 295 },
]

const FIRST_AID_MARKERS = [
  { id: 'FA1', cx: 190, cy: 195 },
  { id: 'FA2', cx: 300, cy: 295 },
]

export function VenueMap({
  activeFilter = 'all',
  showRoute = false,
  dark = false,
}) {
  const stadiumFill = dark ? '#0F2044' : '#F1F5F9'
  const stadiumStroke = dark ? '#1E3A6E' : '#E2E8F0'
  const gateFill = dark ? '#162852' : '#FFFFFF'
  const gateStroke = dark ? '#FFB800' : '#0F2044'
  const sectionColor = dark ? '#94A3B8' : '#64748B'

  return (
    <svg
      viewBox="0 0 500 500"
      className="w-full"
      role="img"
      aria-label="MetLife Stadium venue map showing crowd density and gate locations"
    >
      {/* Outer stadium oval */}
      <ellipse
        cx={250}
        cy={250}
        rx={220}
        ry={190}
        fill={stadiumFill}
        stroke={stadiumStroke}
        strokeWidth={2}
      />

      {/* Crowd density glow blobs */}
      <circle cx={360} cy={120} r={60} fill="rgba(220,38,38,0.25)" />
      <circle cx={380} cy={320} r={60} fill="rgba(220,38,38,0.20)" />
      <circle cx={130} cy={130} r={50} fill="rgba(22,163,74,0.15)" />

      {/* Field */}
      <rect
        x={140}
        y={170}
        width={220}
        height={160}
        rx={20}
        fill="#22C55E"
        opacity={0.9}
      />
      <text
        x={250}
        y={255}
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'Bebas Neue', cursive"
        fontSize={14}
        fill="white"
      >
        FIELD
      </text>
      {/* Center circle */}
      <circle
        cx={250}
        cy={250}
        r={30}
        fill="none"
        stroke="white"
        strokeWidth={1}
        opacity={0.5}
      />

      {/* Section labels */}
      {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((sec, i) => {
        const angle = (i / 8) * Math.PI * 2 - Math.PI / 2
        const x = 250 + 155 * Math.cos(angle)
        const y = 250 + 135 * Math.sin(angle)
        return (
          <text
            key={sec}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="'JetBrains Mono', monospace"
            fontSize={11}
            fill={sectionColor}
          >
            {sec}
          </text>
        )
      })}

      {/* Gate markers */}
      {GATE_POSITIONS.map(({ id, cx, cy, crowd }) => (
        <g key={id}>
          <circle
            cx={cx}
            cy={cy}
            r={14}
            fill={gateFill}
            stroke={gateStroke}
            strokeWidth={2}
          />
          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="'Bebas Neue', cursive"
            fontSize={14}
            fill={dark ? '#FFB800' : CROWD_COLOR[crowd]}
          >
            {id}
          </text>
        </g>
      ))}

      {/* YOUR SEAT marker (Section C area) */}
      <circle
        cx={295}
        cy={185}
        r={8}
        fill="#D97706"
        className="pulse-gold"
      />
      <text
        x={295}
        y={172}
        textAnchor="middle"
        fontFamily="'JetBrains Mono', monospace"
        fontSize={10}
        fill="#D97706"
      >
        YOUR SEAT
      </text>

      {/* Restroom overlays */}
      {(activeFilter === 'restrooms' || activeFilter === 'all') &&
        RESTROOM_MARKERS.map(({ id, x, y }) => (
          <rect
            key={id}
            x={x}
            y={y}
            width={10}
            height={10}
            fill="#0EA5E9"
            rx={2}
          />
        ))}

      {/* Food overlays */}
      {(activeFilter === 'food' || activeFilter === 'all') &&
        FOOD_MARKERS.map(({ id, cx, cy }) => (
          <circle
            key={id}
            cx={cx}
            cy={cy}
            r={8}
            fill="#D97706"
            opacity={0.8}
          />
        ))}

      {/* First Aid overlays */}
      {(activeFilter === 'first-aid' || activeFilter === 'all') &&
        FIRST_AID_MARKERS.map(({ id, cx, cy }) => (
          <g key={id}>
            <circle
              cx={cx}
              cy={cy}
              r={10}
              fill="#DC2626"
              opacity={0.9}
            />
            <text
              x={cx}
              y={cy}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="Arial"
              fontSize={14}
              fontWeight="bold"
              fill="white"
            >
              +
            </text>
          </g>
        ))}

      {/* Accessibility overlays */}
      {activeFilter === 'accessibility' && (
        <>
          {[
            { id: 'acc-a', cx: 120, cy: 110 },
            { id: 'acc-c', cx: 455, cy: 250 },
            { id: 'acc-f', cx: 45, cy: 250 },
          ].map(({ id, cx, cy }) => (
            <text
              key={id}
              x={cx}
              y={cy}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={16}
            >
              ♿
            </text>
          ))}
        </>
      )}

      {/* Route path */}
      {showRoute && (
        <path
          d="M 120 110 Q 200 140 295 185"
          fill="none"
          stroke="#D97706"
          strokeWidth={2.5}
          strokeDasharray="8 4"
          strokeDashoffset={200}
          strokeLinecap="round"
          className="animate-dash"
        />
      )}
    </svg>
  )
}

VenueMap.propTypes = {
  activeFilter: PropTypes.string,
  showRoute: PropTypes.bool,
  dark: PropTypes.bool,
}
