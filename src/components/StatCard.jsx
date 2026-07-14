import PropTypes from 'prop-types';

export default function StatCard({ value, label, icon: Icon, dark = false, className = '' }) {
  if (dark) {
    return (
      <div className={`bg-dash-surface1 border border-dash-surface3 rounded-2xl p-5 flex flex-col gap-1 animate-fade-in ${className}`}>
        {Icon && <Icon size={16} className="text-dash-gold/60 mb-1" strokeWidth={1.5} />}
        <div className="font-display text-dash-gold text-4xl leading-none tracking-wide">{value}</div>
        <div className="text-white/50 text-xs font-medium uppercase tracking-wider mt-1">{label}</div>
      </div>
    );
  }

  return (
    <div className={`bg-surface1 border border-surface3 rounded-2xl p-5 flex flex-col gap-1 shadow-card hover:shadow-gold transition-shadow duration-300 animate-fade-in ${className}`}>
      {Icon && <Icon size={16} className="text-gold/60 mb-1" strokeWidth={1.5} />}
      <div className="font-display text-gold text-4xl leading-none tracking-wide">{value}</div>
      <div className="text-muted text-xs font-medium uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}

StatCard.propTypes = {
  value:     PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label:     PropTypes.string.isRequired,
  icon:      PropTypes.elementType,
  dark:      PropTypes.bool,
  className: PropTypes.string,
};
