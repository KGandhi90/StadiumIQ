import PropTypes from 'prop-types'
import { Train, Bus, Car } from 'lucide-react'
import { StatusPill } from './StatusPill'

/**
 * Transport status item list.
 * Used on Home and Navigate pages.
 * @param {object} props
 * @param {Array} props.items - Transport status objects
 */

const ICON_MAP = {
  Train: Train,
  Bus: Bus,
  Car: Car,
}

const ICON_BG = {
  'on-time': 'bg-sky/10 text-sky',
  delayed: 'bg-gold/10 text-gold',
  surge: 'bg-crimson/10 text-crimson',
}

export function TransportStrip({ items }) {
  return (
    <ul
      className="flex flex-col gap-2"
      role="list"
      aria-label="Transport options"
    >
      {items.map((item) => {
        const Icon = ICON_MAP[item.icon] ?? Train
        const iconBg = ICON_BG[item.status] ?? 'bg-sky/10 text-sky'

        return (
          <li
            key={item.id}
            className="bg-surface1 border border-surface3 rounded-xl p-3 flex items-center gap-3 shadow-card"
          >
            {/* Icon */}
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg}`}
              aria-hidden="true"
            >
              <Icon size={16} />
            </div>

            {/* Name + detail */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-navy">
                {item.name}
              </p>
              <p className="text-xs text-muted font-mono truncate">
                {item.detail}
              </p>
            </div>

            {/* Status + ETA */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <StatusPill status={item.status} />
              <span className="text-xs font-mono text-navy font-medium">
                {item.eta}
              </span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

TransportStrip.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      detail: PropTypes.string.isRequired,
      eta: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
}
