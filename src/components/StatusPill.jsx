import PropTypes from 'prop-types';

const STATUS_CONFIG = {
  // Crowd / Gate
  high:     { label: 'High',     bg: 'bg-crimson/10',  text: 'text-crimson',  border: 'border-crimson/20'  },
  moderate: { label: 'Moderate', bg: 'bg-gold/10',     text: 'text-gold',     border: 'border-gold/20'     },
  low:      { label: 'Low',      bg: 'bg-green/10',    text: 'text-green',    border: 'border-green/20'    },
  // Transport
  'on-time':{ label: 'On Time',  bg: 'bg-green/10',    text: 'text-green',    border: 'border-green/20'    },
  delayed:  { label: 'Delayed',  bg: 'bg-gold/10',     text: 'text-gold',     border: 'border-gold/20'     },
  surge:    { label: 'Surge',    bg: 'bg-crimson/10',  text: 'text-crimson',  border: 'border-crimson/20'  },
  // Match
  live:     { label: 'LIVE',     bg: 'bg-crimson',     text: 'text-white',    border: 'border-crimson', pulse: true },
  // Volunteer
  'on-duty':{ label: 'On Duty',  bg: 'bg-green/10',    text: 'text-green',    border: 'border-green/20'    },
  break:    { label: 'Break',    bg: 'bg-gold/10',     text: 'text-gold',     border: 'border-gold/20'     },
  off:      { label: 'Off',      bg: 'bg-surface2',    text: 'text-muted',    border: 'border-surface3'    },
  // Alert
  open:     { label: 'Open',     bg: 'bg-crimson/10',  text: 'text-crimson',  border: 'border-crimson/20'  },
  resolved: { label: 'Resolved', bg: 'bg-green/10',    text: 'text-green',    border: 'border-green/20'    },
  // Dashboard dark variants
  'dash-high':    { label: 'High',     bg: 'bg-red-500/20',   text: 'text-red-400',   border: 'border-red-500/30'  },
  'dash-moderate':{ label: 'Moderate', bg: 'bg-yellow-500/20',text: 'text-yellow-400',border: 'border-yellow-500/30'},
  'dash-low':     { label: 'Low',      bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30'},
};

export default function StatusPill({ status, label, dark = false, className = '' }) {
  const key = dark ? `dash-${status}` : status;
  const cfg = STATUS_CONFIG[key] ?? STATUS_CONFIG[status] ?? STATUS_CONFIG.low;
  const displayLabel = label ?? cfg.label;

  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium
        border ${cfg.bg} ${cfg.text} ${cfg.border}
        ${cfg.pulse ? 'animate-pulse-live' : ''}
        ${className}
      `}
    >
      {status === 'live' && (
        <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
      )}
      {displayLabel}
    </span>
  );
}

StatusPill.propTypes = {
  status: PropTypes.string.isRequired,
  label:  PropTypes.string,
  dark:   PropTypes.bool,
  className: PropTypes.string,
};
