import PropTypes from 'prop-types'
import { Zap } from 'lucide-react'

/**
 * AI match commentary feed.
 * Displays minute-tagged commentary items
 * from the commentary array.
 * @param {object} props
 * @param {Array} props.items - Commentary objects
 */

export function CommentaryFeed({ items }) {
  return (
    <div>
      {/* Section label */}
      <div className="flex items-center gap-2 mb-3">
        <Zap size={14} className="text-gold" aria-hidden="true" />
        <h2 className="text-sm font-semibold text-navy">
          AI Commentary
        </h2>
        <span className="text-xs text-muted ml-auto font-mono">
          Live · Gemini
        </span>
      </div>

      {/* Commentary list */}
      <div className="bg-surface1 border border-surface3 rounded-2xl shadow-card overflow-hidden">
        <ul
          role="list"
          aria-label="Match commentary"
          className="divide-y divide-surface3"
        >
          {items.map((entry) => (
            <li
              key={entry.minute}
              className="flex gap-4 p-4 items-start"
            >
              <span className="font-display text-2xl text-gold w-12 flex-shrink-0 leading-none pt-0.5">
                {entry.minute}
              </span>
              <p className="text-sm text-navy leading-relaxed">
                {entry.text}
              </p>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          type="button"
          className="w-full px-4 py-3 text-sm font-medium text-gold hover:bg-gold/5 transition-colors border-t border-surface3 text-left"
        >
          Generate AI Commentary →
        </button>
      </div>
    </div>
  )
}

CommentaryFeed.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      minute: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
}
