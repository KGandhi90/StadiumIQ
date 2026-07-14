import PropTypes from 'prop-types';

export default function AlertFeed({ alerts = [], dark = false }) {
  return (
    <div className={`rounded-2xl border overflow-hidden ${dark ? 'bg-dash-surface1 border-dash-surface3' : 'bg-surface1 border-surface3'}`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-5 py-4 border-b ${dark ? 'border-dash-surface3' : 'border-surface3'}`}>
        <h3 className={`font-semibold text-sm ${dark ? 'text-white' : 'text-navy'}`}>
          Live Alerts
        </h3>
        <span className={`text-xs font-mono-data px-2 py-0.5 rounded-full font-medium
          ${dark ? 'bg-red-500/20 text-red-400' : 'bg-crimson/10 text-crimson'}`}>
          {alerts.filter(a => a.status === 'open').length} open
        </span>
      </div>

      {/* Alert list */}
      <div className="divide-y divide-surface3/50">
        {alerts.map(alert => (
          <div key={alert.id} className={`flex items-start gap-3 px-5 py-3.5 transition-colors
            ${dark ? 'hover:bg-dash-surface2' : 'hover:bg-surface2'}`}>
            {/* Status dot */}
            <div className="mt-1 flex-shrink-0">
              <span className={`w-2.5 h-2.5 rounded-full inline-block
                ${alert.status === 'resolved'
                  ? dark ? 'bg-green-400' : 'bg-green'
                  : dark ? 'bg-red-400 animate-pulse' : 'bg-crimson animate-pulse'
                }`}
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`text-xs font-semibold ${dark ? 'text-yellow-400' : 'text-gold'}`}>
                  {alert.zone}
                </span>
                {alert.priority === 'high' && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium
                    ${dark ? 'bg-red-500/20 text-red-400' : 'bg-crimson/10 text-crimson'}`}>
                    URGENT
                  </span>
                )}
              </div>
              <p className={`text-xs leading-relaxed ${dark ? 'text-white/70' : 'text-navy/70'}`}>
                {alert.message}
              </p>
            </div>

            {/* Time */}
            <span className={`text-[11px] font-mono-data flex-shrink-0 ${dark ? 'text-white/30' : 'text-muted'}`}>
              {alert.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

AlertFeed.propTypes = {
  alerts: PropTypes.arrayOf(PropTypes.shape({
    id:       PropTypes.string,
    zone:     PropTypes.string,
    message:  PropTypes.string,
    time:     PropTypes.string,
    status:   PropTypes.oneOf(['open', 'resolved']),
    priority: PropTypes.string,
  })),
  dark: PropTypes.bool,
};
