import { useState } from 'react';
import PropTypes from 'prop-types';

const STATUS_STYLES = {
  'on-duty': { dot: 'bg-green-400', text: 'text-green-400', label: 'On Duty'  },
  break:     { dot: 'bg-yellow-400',text: 'text-yellow-400',label: 'Break'    },
  off:       { dot: 'bg-white/20',  text: 'text-white/40',  label: 'Off'      },
};

export default function VolunteerTable({ volunteers = [], onToggle }) {
  const [localVolunteers, setLocalVolunteers] = useState(volunteers);

  const cycleStatus = (id) => {
    const cycle = { 'on-duty': 'break', break: 'off', off: 'on-duty' };
    const updated = localVolunteers.map(v =>
      v.id === id ? { ...v, status: cycle[v.status] } : v
    );
    setLocalVolunteers(updated);
    onToggle?.(id, cycle[localVolunteers.find(v => v.id === id).status]);
  };

  return (
    <div className="bg-dash-surface1 border border-dash-surface3 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-dash-surface3">
              {['Volunteer', 'Role', 'Zone', 'Status', 'Action'].map(h => (
                <th key={h}
                  className="text-left px-4 py-3 text-[11px] text-white/40 font-medium uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-dash-surface3/50">
            {localVolunteers.map(v => {
              const style = STATUS_STYLES[v.status] ?? STATUS_STYLES.off;
              return (
                <tr key={v.id} className="hover:bg-dash-surface2 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-dash-surface3 flex items-center justify-center text-xs text-white/60 font-medium">
                        {v.name.charAt(0)}
                      </div>
                      <span className="text-white text-xs font-medium">{v.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white/60 text-xs">{v.role}</td>
                  <td className="px-4 py-3">
                    <span className="font-mono-data text-yellow-400 text-xs">{v.zone}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${style.dot} ${v.status === 'on-duty' ? 'animate-pulse' : ''}`} />
                      <span className={`text-xs ${style.text}`}>{style.label}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => cycleStatus(v.id)}
                      className="text-[11px] px-3 py-1.5 rounded-lg border border-dash-surface3 text-white/50 hover:text-white hover:border-yellow-400/50 transition-all"
                    >
                      Toggle
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

VolunteerTable.propTypes = {
  volunteers: PropTypes.arrayOf(PropTypes.shape({
    id:     PropTypes.string,
    name:   PropTypes.string,
    role:   PropTypes.string,
    zone:   PropTypes.string,
    status: PropTypes.string,
  })),
  onToggle: PropTypes.func,
};
