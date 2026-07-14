import PropTypes from 'prop-types';
import StatusPill from './StatusPill';

export default function TransportStrip({ transport = [] }) {
  const statusIcon = {
    'on-time': '🟢',
    delayed:   '🟡',
    surge:     '🔴',
  };

  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
      {transport.map(t => (
        <div
          key={t.id}
          className="flex-shrink-0 bg-surface1 border border-surface3 rounded-2xl p-4 min-w-[180px] shadow-card hover:shadow-glow transition-shadow duration-300"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{t.icon}</span>
            <div>
              <div className="text-xs font-semibold text-navy leading-none">{t.type}</div>
              <div className="text-[10px] text-muted leading-none mt-0.5">{t.label}</div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mb-1.5">
            <span>{statusIcon[t.status]}</span>
            <StatusPill status={t.status} label={t.statusText} />
          </div>

          <div className="text-xs text-muted leading-snug">{t.detail}</div>

          <div className="mt-2 pt-2 border-t border-surface3">
            <span className="font-mono-data text-navy font-semibold text-sm">{t.eta}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

TransportStrip.propTypes = {
  transport: PropTypes.arrayOf(PropTypes.shape({
    id:         PropTypes.string,
    type:       PropTypes.string,
    label:      PropTypes.string,
    icon:       PropTypes.string,
    status:     PropTypes.string,
    statusText: PropTypes.string,
    detail:     PropTypes.string,
    eta:        PropTypes.string,
  })),
};
