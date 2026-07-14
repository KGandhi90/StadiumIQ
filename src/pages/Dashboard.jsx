import { useState } from 'react';
import {
  LayoutDashboard, Map, Users, Bell, Bus,
  Megaphone, ChevronRight, Zap
} from 'lucide-react';
import StatCard from '../components/StatCard';
import AlertFeed from '../components/AlertFeed';
import CrowdHeatmap from '../components/CrowdHeatmap';
import VolunteerTable from '../components/VolunteerTable';
import { INITIAL_ALERTS, GATES, VOLUNTEERS } from '../utils/constants';

const NAV_ITEMS = [
  { id: 'overview',   label: 'Overview',   icon: LayoutDashboard },
  { id: 'crowd',      label: 'Crowd Map',  icon: Map             },
  { id: 'volunteers', label: 'Volunteers', icon: Users           },
  { id: 'alerts',     label: 'Alerts',     icon: Bell            },
  { id: 'transport',  label: 'Transport',  icon: Bus             },
];

const VOLUNTEER_TASKS = [
  { volunteer: 'Maria Santos',  zone: 'Gate A', task: 'Entry management',    status: 'on-duty' },
  { volunteer: 'James Chen',    zone: 'Gate D', task: 'Crowd control',        status: 'on-duty' },
  { volunteer: 'Carlos Rivera', zone: 'Concourse', task: 'Information desk', status: 'break'   },
  { volunteer: 'Anna Kowalski', zone: 'Section C', task: 'First aid standby', status: 'on-duty' },
];

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [alerts, setAlerts]               = useState(INITIAL_ALERTS);
  const [broadcastSent, setBroadcastSent] = useState(false);

  const openAlerts = alerts.filter(a => a.status === 'open').length;

  const handleBroadcast = () => {
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 3000);
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#0A1628', fontFamily: 'Inter, sans-serif' }}>

      {/* Sidebar */}
      <aside
        className="hidden md:flex flex-col w-60 flex-shrink-0 border-r"
        style={{ background: '#0A1628', borderColor: '#1E3A6E' }}
      >
        {/* Logo */}
        <div className="px-5 pt-6 pb-4 border-b" style={{ borderColor: '#1E3A6E' }}>
          <div className="font-display text-[22px] leading-none" style={{ color: '#FFB800' }}>
            StadiumIQ
          </div>
          <div className="text-[11px] text-white/40 tracking-widest uppercase mt-0.5">OPS CENTER</div>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs text-white/60">Brazil v Argentina · LIVE 67'</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-0.5 px-3">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left
                ${activeSection === id
                  ? 'text-white border-l-2 border-yellow-400 pl-2.5'
                  : 'text-white/40 hover:text-white/70'
                }`}
              style={activeSection === id ? { background: 'rgba(255,184,0,0.08)' } : {}}
            >
              <Icon size={15} />
              {label}
              {id === 'alerts' && openAlerts > 0 && (
                <span className="ml-auto text-[10px] bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {openAlerts}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Broadcast Button */}
        <div className="p-4 border-t" style={{ borderColor: '#1E3A6E' }}>
          <button
            onClick={handleBroadcast}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all
              ${broadcastSent
                ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400'
                : 'text-yellow-400 border-yellow-400/50 hover:bg-yellow-400/10'
              }`}
          >
            <Megaphone size={14} />
            {broadcastSent ? 'Broadcast Sent ✓' : 'Broadcast to All Staff'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 px-6 py-4 border-b flex items-center justify-between"
          style={{ background: '#0A1628', borderColor: '#1E3A6E' }}>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <span>Dashboard</span>
            <ChevronRight size={14} />
            <span className="text-white capitalize">{activeSection}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/30 text-xs font-mono-data">MetLife Stadium</span>
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          </div>
        </div>

        <div className="p-6 space-y-6">

          {/* ── OVERVIEW ── */}
          {activeSection === 'overview' && (
            <>
              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard value="79,340" label="Fans Checked In" dark />
                <StatCard value="4.2 min" label="Avg Gate Wait"  dark />
                <StatCard value="247"    label="Active Volunteers" dark />
                <StatCard value={String(openAlerts)} label="Open Alerts" dark />
              </div>

              {/* AI Recommendation */}
              <div className="rounded-2xl p-5 border"
                style={{ background: 'rgba(255,184,0,0.06)', borderColor: 'rgba(255,184,0,0.2)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={15} style={{ color: '#FFB800' }} />
                  <span className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: '#FFB800' }}>
                    AI Operational Insight
                  </span>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Crowd modeling suggests <strong className="text-white">40% of fans in Section G</strong> will exit via Gate D at full time.
                  Recommend deploying <strong className="text-white">4 additional stewards to Gate D</strong> by the 74th minute to prevent queue buildup exceeding 12 minutes.
                </p>
                <div className="mt-3 flex gap-2">
                  <button className="text-xs px-3 py-1.5 rounded-lg font-medium transition-colors"
                    style={{ background: 'rgba(255,184,0,0.2)', color: '#FFB800' }}>
                    Deploy Stewards →
                  </button>
                  <button className="text-xs px-3 py-1.5 rounded-lg border text-white/40 hover:text-white/70 transition-colors"
                    style={{ borderColor: '#1E3A6E' }}>
                    Dismiss
                  </button>
                </div>
              </div>

              {/* Alert Feed */}
              <AlertFeed alerts={alerts} dark />

              {/* Mini Volunteer Task Table */}
              <div className="rounded-2xl border overflow-hidden"
                style={{ background: '#0F2044', borderColor: '#1E3A6E' }}>
                <div className="px-5 py-4 border-b flex items-center justify-between"
                  style={{ borderColor: '#1E3A6E' }}>
                  <h3 className="text-sm font-semibold text-white">Recent Task Assignments</h3>
                  <button
                    onClick={() => setActiveSection('volunteers')}
                    className="text-xs text-yellow-400/70 hover:text-yellow-400 transition-colors">
                    View all →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr style={{ borderBottom: '1px solid #1E3A6E' }}>
                        {['Volunteer', 'Zone', 'Task', 'Status'].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-white/30 font-medium uppercase tracking-wider text-[10px]">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {VOLUNTEER_TASKS.map((row, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid rgba(30,58,110,0.5)' }}>
                          <td className="px-4 py-3 text-white font-medium">{row.volunteer}</td>
                          <td className="px-4 py-3 font-mono-data" style={{ color: '#FFB800' }}>{row.zone}</td>
                          <td className="px-4 py-3 text-white/60">{row.task}</td>
                          <td className="px-4 py-3">
                            <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium
                              ${row.status === 'on-duty'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                              }`}>
                              {row.status === 'on-duty' ? 'On Duty' : 'Break'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ── CROWD MAP ── */}
          {activeSection === 'crowd' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-white font-display text-2xl">Crowd Map</h2>
                <p className="text-white/40 text-xs mt-0.5">Live density monitoring · MetLife Stadium</p>
              </div>
              <CrowdHeatmap gates={GATES} />
            </div>
          )}

          {/* ── VOLUNTEERS ── */}
          {activeSection === 'volunteers' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-white font-display text-2xl">Volunteers</h2>
                  <p className="text-white/40 text-xs mt-0.5">247 active · 18 on break</p>
                </div>
                <button className="text-xs px-4 py-2 rounded-xl font-medium border transition-colors"
                  style={{ borderColor: '#FFB800', color: '#FFB800' }}>
                  + Assign Task
                </button>
              </div>
              <VolunteerTable volunteers={VOLUNTEERS} />
            </div>
          )}

          {/* ── ALERTS ── */}
          {activeSection === 'alerts' && (
            <div className="space-y-4">
              <h2 className="text-white font-display text-2xl">Live Alerts</h2>
              <AlertFeed alerts={alerts} dark />
            </div>
          )}

          {/* ── TRANSPORT ── */}
          {activeSection === 'transport' && (
            <div className="space-y-4">
              <h2 className="text-white font-display text-2xl">Transport Status</h2>
              <div className="space-y-3">
                {[
                  { mode: '🚇 NJ Transit Metro', status: 'On Time', detail: '12 min to stadium · Stop 2', color: '#4ADE80' },
                  { mode: '🚌 Stadium Express',   status: 'Delayed +8 min', detail: 'Stop 3 · Alt. route active', color: '#FBBF24' },
                  { mode: '🚗 Rideshare',          status: 'Surge ×2.4', detail: '$42 est · High demand zone', color: '#F87171' },
                ].map((t, i) => (
                  <div key={i} className="rounded-2xl border p-4 flex items-center justify-between"
                    style={{ background: '#0F2044', borderColor: '#1E3A6E' }}>
                    <div>
                      <div className="text-white font-medium text-sm mb-1">{t.mode}</div>
                      <div className="text-white/40 text-xs">{t.detail}</div>
                    </div>
                    <span className="text-sm font-semibold" style={{ color: t.color }}>{t.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
