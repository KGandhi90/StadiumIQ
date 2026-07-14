import PropTypes from 'prop-types';

export default function SustainabilityTracker({ stats = [] }) {
  return (
    <div className="bg-surface1 border-l-4 border-green rounded-2xl border border-surface3 shadow-card overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-surface3 flex items-center gap-2">
        <span className="text-lg">🌱</span>
        <div>
          <h3 className="font-semibold text-sm text-navy">Green Goals 2026</h3>
          <p className="text-[11px] text-muted">FIFA sustainability targets · MetLife Stadium</p>
        </div>
      </div>

      {/* Stats */}
      <div className="p-5 space-y-4">
        {stats.map((stat, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-navy/80 font-medium">{stat.label}</span>
              <span className="font-mono-data text-green font-semibold text-sm">{stat.value}</span>
            </div>
            <div className="h-1.5 bg-surface2 rounded-full overflow-hidden">
              <div
                className="h-full bg-green rounded-full transition-all duration-700"
                style={{ width: `${stat.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="px-5 pb-4">
        <p className="text-[10px] text-muted">
          Target: 50% carbon reduction vs FIFA World Cup 2018
        </p>
      </div>
    </div>
  );
}

SustainabilityTracker.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.shape({
    label:    PropTypes.string,
    value:    PropTypes.string,
    progress: PropTypes.number,
  })),
};
