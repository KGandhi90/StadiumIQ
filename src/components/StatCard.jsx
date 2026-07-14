import PropTypes from 'prop-types'

/**
 * Stat display card with large Bebas Neue value
 * and Inter label. Light and dark (ops) variants.
 * @param {object} props
 * @param {string} props.value - Display value
 * @param {string} props.label - Stat description
 * @param {string} [props.color] - Value color token
 * @param {boolean} [props.dark] - Dark ops variant
 */

const COLOR_MAP = {
  gold: 'text-gold',
  crimson: 'text-crimson',
  sky: 'text-sky',
  green: 'text-green',
  'ops-gold': 'text-ops-gold',
}

export function StatCard({
  value,
  label,
  color = 'gold',
  dark = false,
}) {
  const cardClasses = dark
    ? 'bg-ops-surface1 border border-ops-surface3'
    : 'bg-surface1 border border-surface3'

  const labelClasses = dark ? 'text-ops-muted' : 'text-muted'
  const valueColor = COLOR_MAP[color] ?? 'text-gold'

  return (
    <div className={`${cardClasses} rounded-2xl p-5 shadow-card`}>
      <div
        className={`font-display text-4xl sm:text-5xl leading-none ${valueColor}`}
      >
        {value}
      </div>
      <div
        className={`text-xs font-sans mt-2 uppercase tracking-wide ${labelClasses}`}
      >
        {label}
      </div>
    </div>
  )
}

StatCard.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  dark: PropTypes.bool,
}
