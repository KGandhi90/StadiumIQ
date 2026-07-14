import { NavLink } from 'react-router-dom';
import { Home, Map, MessageCircle, Star, ExternalLink } from 'lucide-react';

const NAV_LINKS = [
  { to: '/',        label: 'Home',     icon: Home            },
  { to: '/navigate',label: 'Navigate', icon: Map             },
  { to: '/chat',    label: 'AI Chat',  icon: MessageCircle   },
  { to: '/fanzone', label: 'Fan Zone', icon: Star            },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-surface3 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
              <span className="text-gold font-display text-lg leading-none">S</span>
            </div>
            <div className="leading-tight">
              <div className="font-display text-navy text-lg tracking-wide leading-none">StadiumIQ</div>
              <div className="text-[10px] text-muted font-medium tracking-widest uppercase leading-none mt-0.5">2026</div>
            </div>
          </NavLink>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150
                  ${isActive
                    ? 'text-navy bg-surface2 border-b-2 border-gold'
                    : 'text-muted hover:text-navy hover:bg-surface2'
                  }`
                }
              >
                <Icon size={15} strokeWidth={2} />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Nav */}
          <nav className="flex md:hidden items-center gap-0.5">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all
                  ${isActive ? 'text-navy' : 'text-muted'}`
                }
              >
                <Icon size={18} strokeWidth={2} />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Staff Portal CTA */}
          <NavLink
            to="/dashboard"
            className="hidden md:flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-navy border border-navy/20 rounded-lg hover:bg-navy hover:text-white transition-all duration-200"
          >
            Staff Portal
            <ExternalLink size={13} />
          </NavLink>
        </div>
      </div>

      {/* Live Match Ticker */}
      <div className="bg-navy px-4 py-1.5 flex items-center justify-center gap-4 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-crimson animate-pulse-live" />
          <span className="text-white/60 text-xs font-medium uppercase tracking-wider">Live</span>
          <span className="text-white text-xs font-medium">🇧🇷 Brazil</span>
          <span className="font-display text-gold text-base leading-none">2 – 1</span>
          <span className="text-white text-xs font-medium">Argentina 🇦🇷</span>
          <span className="font-display text-gold/70 text-sm leading-none">67'</span>
        </div>
        <span className="text-white/20 flex-shrink-0">·</span>
        <span className="text-white/50 text-xs flex-shrink-0">MetLife Stadium · Group C</span>
      </div>
    </header>
  );
}
