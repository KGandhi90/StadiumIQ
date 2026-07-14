// ── Crowd level from percentage ──────────────────────────────
export function getCrowdLevel(pct) {
  if (pct >= 80) return 'high';
  if (pct >= 50) return 'moderate';
  return 'low';
}

// ── Status color classes ─────────────────────────────────────
export function getStatusColor(status) {
  const map = {
    high:     { text: 'text-crimson', bg: 'bg-crimson/10', border: 'border-crimson/30' },
    moderate: { text: 'text-gold',    bg: 'bg-gold/10',    border: 'border-gold/30'    },
    low:      { text: 'text-green',   bg: 'bg-green/10',   border: 'border-green/30'   },
    'on-time':{ text: 'text-green',   bg: 'bg-green/10',   border: 'border-green/30'   },
    delayed:  { text: 'text-gold',    bg: 'bg-gold/10',    border: 'border-gold/30'    },
    surge:    { text: 'text-crimson', bg: 'bg-crimson/10', border: 'border-crimson/30' },
    live:     { text: 'text-white',   bg: 'bg-crimson',    border: 'border-crimson'    },
    'on-duty':{ text: 'text-green',   bg: 'bg-green/10',   border: 'border-green/30'   },
    break:    { text: 'text-gold',    bg: 'bg-gold/10',    border: 'border-gold/30'    },
    off:      { text: 'text-muted',   bg: 'bg-surface2',   border: 'border-surface3'   },
    open:     { text: 'text-crimson', bg: 'bg-crimson/10', border: 'border-crimson/30' },
    resolved: { text: 'text-green',   bg: 'bg-green/10',   border: 'border-green/30'   },
  };
  return map[status] ?? { text: 'text-muted', bg: 'bg-surface2', border: 'border-surface3' };
}

// ── Format large numbers with commas ────────────────────────
export function formatNumber(n) {
  return n.toLocaleString('en-US');
}

// ── Truncate long text ───────────────────────────────────────
export function truncateText(text, maxLen = 80) {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + '…';
}

// ── Time formatter HH:MM ─────────────────────────────────────
export function formatTime(date = new Date()) {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

// ── Attendance percentage ────────────────────────────────────
export function attendancePct(attendance, capacity) {
  return Math.round((attendance / capacity) * 100);
}

// ── Gate wait color ──────────────────────────────────────────
export function waitColor(minutes) {
  if (minutes <= 4)  return 'text-green-600';
  if (minutes <= 8)  return 'text-amber-500';
  return 'text-red-600';
}
