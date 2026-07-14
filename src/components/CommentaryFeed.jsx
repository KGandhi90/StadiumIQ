import PropTypes from 'prop-types';

export default function CommentaryFeed({ commentary = [] }) {
  return (
    <div className="space-y-0 divide-y divide-surface3">
      {commentary.map((entry, idx) => (
        <div
          key={idx}
          className="flex items-start gap-3 py-4 animate-fade-in"
          style={{ animationDelay: `${idx * 0.05}s` }}
        >
          {/* Minute badge */}
          <div className="flex-shrink-0 w-12 text-right">
            <span className="font-display text-gold text-xl leading-none">{entry.minute}</span>
          </div>

          {/* Vertical divider */}
          <div className="w-px self-stretch bg-gold/20 flex-shrink-0 mt-1" />

          {/* Commentary text */}
          <p className="text-navy text-sm leading-relaxed flex-1">
            {entry.text}
          </p>
        </div>
      ))}
    </div>
  );
}

CommentaryFeed.propTypes = {
  commentary: PropTypes.arrayOf(PropTypes.shape({
    minute: PropTypes.string,
    text:   PropTypes.string,
  })),
};
