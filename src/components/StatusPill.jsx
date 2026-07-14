import PropTypes from 'prop-types'

/**
 * Colored status indicator pill.
 * @param {object} props
 * @param {string} props.status - Status identifier
 * @param {string} [props.label] - Optional display text override
 */

const STATUS_CONFIG = {
  low: {
    text: 'Low',
    classes: 'bg-green/10 text-green border-green/20',
  },
  medium: {
    text: 'Moderate',
    classes: 'bg-gold/10 text-gold border-gold/20',
  },
  high: {
    text: 'High',
    classes: 'bg-crimson/10 text-crimson border-crimson/20',
  },
  'on-time': {
    text: 'On Time',
    classes: 'bg-green/10 text-green border-green/20',
  },
  delayed: {
    text: 'Delayed',
    classes: 'bg-gold/10 text-gold border-gold/20',
  },
  surge: {
    text: 'Surge',
    classes: 'bg-crimson/10 text-crimson border-crimson/20',
  },
  'on-duty': {
    text: 'On Duty',
    classes: 'bg-green/10 text-green border-green/20',
  },
  break: {
    text: 'On Break',
    classes: 'bg-gold/10 text-gold border-gold/20',
  },
  live: {
    text: 'LIVE',
    classes: 'bg-crimson text-white border-transparent',
  },
}

export function StatusPill({ status, label }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.medium

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${config.classes}`}
    >
      {label ?? config.text}
    </span>
  )
}

StatusPill.propTypes = {
  status: PropTypes.string.isRequired,
  label: PropTypes.string,
}
