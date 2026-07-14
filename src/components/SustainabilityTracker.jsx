import PropTypes from 'prop-types'
import { Leaf } from 'lucide-react'

/**
 * Sustainability progress tracker.
 * Displays green stats with progress bars.
 * @param {object} props
 * @param {Array} props.stats - Sustainability stat objects
 */

export function SustainabilityTracker({ stats }) {
  return (
    <div className="bg-surface1 border border-surface3 rounded-2xl p-5 shadow-card">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Leaf size={15} className="text-green" aria-hidden="true" />
        <h2 className="text-sm font-semibold text-navy">
          Green Goals 2026
        </h2>
      </div>

      {/* Stats */}
      <ul
        className="space-y-4"
        role="list"
        aria-label="Sustainability goals"
      >
        {stats.map((stat) => (
          <li key={stat.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-muted leading-snug pr-4">
                {stat.label}
              </span>
              <span className="text-sm font-display text-green flex-shrink-0">
                {stat.value}
              </span>
            </div>
            <div
              className="h-1.5 bg-surface3 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={stat.progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={stat.label}
            >
              <div
                className="h-full bg-green rounded-full transition-all duration-700"
                style={{ width: `${stat.progress}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

SustainabilityTracker.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      progress: PropTypes.number.isRequired,
    })
  ).isRequired,
}
