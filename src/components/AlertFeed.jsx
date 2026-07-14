import PropTypes from 'prop-types'

/**
 * Alert feed for Ops Dashboard.
 * Displays open/resolved alerts with
 * zone labels and timestamps.
 * @param {object} props
 * @param {Array} props.alerts - Alert objects
 */

export function AlertFeed({ alerts }) {
  const openCount = alerts.filter((a) => !a.resolved).length

  return (
    <div className="bg-ops-surface1 border border-ops-surface3 rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-white">
          Live Alerts
        </h2>
        <span
          className="bg-crimson text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
          aria-label={`${openCount} unread alerts`}
        >
          {openCount}
        </span>
      </div>

      {/* Alert list */}
      <ul className="space-y-3" role="list" aria-label="Alert list">
        {alerts.map((alert) => (
          <li
            key={alert.id}
            className="flex items-start gap-3 pb-3 border-b border-ops-surface3 last:border-0 last:pb-0"
          >
            {/* Status dot */}
            <span
              className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                alert.resolved ? 'bg-green' : 'bg-crimson'
              }`}
              aria-hidden="true"
            />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-ops-gold">
                {alert.zone}
              </p>
              <p className="text-xs text-white/70 mt-0.5 leading-relaxed">
                {alert.msg}
              </p>
            </div>

            {/* Timestamp */}
            <time
              className="text-xs font-mono text-ops-muted flex-shrink-0"
              dateTime={alert.time}
            >
              {alert.time}
            </time>
          </li>
        ))}
      </ul>
    </div>
  )
}

AlertFeed.propTypes = {
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      zone: PropTypes.string.isRequired,
      msg: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      resolved: PropTypes.bool.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
}
