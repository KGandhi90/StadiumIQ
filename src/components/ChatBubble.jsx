import PropTypes from 'prop-types'

/**
 * Chat message bubble for AI Concierge.
 * @param {object} props
 * @param {'user'|'assistant'} props.role - Message sender
 * @param {string} props.content - Message text
 * @param {string} props.timestamp - HH:MM time string
 */

export function ChatBubble({ role, content, timestamp }) {
  if (role === 'user') {
    return (
      <article
        role="article"
        aria-label="Your message"
        className="flex flex-col items-end gap-1"
      >
        <div className="self-end max-w-xs sm:max-w-sm bg-navy text-white rounded-2xl rounded-br-none px-4 py-3 text-sm leading-relaxed shadow-card">
          {content}
        </div>
        <time className="text-xs text-muted" dateTime={timestamp}>
          {timestamp}
        </time>
      </article>
    )
  }

  return (
    <article
      role="article"
      aria-label="StadiumIQ AI response"
      className="flex items-start gap-2.5"
    >
      {/* AI avatar */}
      <div
        className="w-8 h-8 rounded-xl bg-navy flex items-center justify-center flex-shrink-0"
        aria-hidden="true"
      >
        <span className="text-white text-sm">⚡</span>
      </div>

      <div className="flex flex-col gap-1">
        <div className="max-w-xs sm:max-w-sm bg-surface1 border border-surface3 rounded-2xl rounded-bl-none px-4 py-3 text-sm leading-relaxed text-navy shadow-card">
          {content}
        </div>
        <time className="text-xs text-muted" dateTime={timestamp}>
          {timestamp}
        </time>
      </div>
    </article>
  )
}

ChatBubble.propTypes = {
  role: PropTypes.oneOf(['user', 'assistant']).isRequired,
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
}
