import PropTypes from 'prop-types';

export default function ChatBubble({ role, content, timestamp }) {
  const isUser = role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end animate-fade-in">
        <div className="max-w-[80%]">
          <div className="bg-navy text-white text-sm leading-relaxed px-4 py-3 rounded-2xl rounded-br-sm shadow-sm">
            {content}
          </div>
          {timestamp && (
            <div className="text-right text-[10px] text-muted mt-1 font-mono-data">{timestamp}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5 animate-fade-in">
      {/* AI Avatar */}
      <div className="w-8 h-8 rounded-xl bg-navy flex items-center justify-center flex-shrink-0 shadow-sm">
        <span className="text-gold text-sm">⚡</span>
      </div>

      <div className="max-w-[80%]">
        <div className="bg-surface1 border border-surface3 text-navy text-sm leading-relaxed px-4 py-3 rounded-2xl rounded-bl-sm shadow-card">
          {/* Render content preserving line breaks */}
          {typeof content === 'string'
            ? content.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < content.split('\n').length - 1 && <br />}
                </span>
              ))
            : content}
        </div>
        {timestamp && (
          <div className="text-[10px] text-muted mt-1 font-mono-data">{timestamp}</div>
        )}
      </div>
    </div>
  );
}

ChatBubble.propTypes = {
  role:      PropTypes.oneOf(['user', 'ai']).isRequired,
  content:   PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  timestamp: PropTypes.string,
};
