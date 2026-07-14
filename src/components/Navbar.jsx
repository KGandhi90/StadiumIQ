import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

/**
 * Main navigation bar for StadiumIQ 2026
 * fan-facing pages. Fixed top, full width.
 */

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/navigate', label: 'Navigate', end: false },
  { to: '/chat', label: 'AI Guide', end: false },
  { to: '/fanzone', label: 'Fan Zone', end: false },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface1/95 backdrop-blur-md border-b border-surface3 shadow-card">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-1 flex-shrink-0"
          aria-label="StadiumIQ 2026 home"
        >
          <span className="text-xl" aria-hidden="true">
            ⚽
          </span>
          <span className="font-display text-xl text-navy">
            StadiumIQ
          </span>
          <span className="font-display text-xl text-gold">2026</span>
        </NavLink>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-6"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                isActive
                  ? 'text-sm font-medium text-gold border-b-2 border-gold pb-0.5'
                  : 'text-sm font-medium text-muted hover:text-navy transition-colors'
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Language pill (decorative) */}
          <span className="hidden sm:inline-flex items-center border border-surface3 rounded-full px-3 py-1 text-xs text-muted font-medium">
            🌐 EN
          </span>

          {/* Ops Center button (desktop) */}
          <NavLink
            to="/dashboard"
            className="hidden md:inline-flex text-xs font-medium border border-navy rounded-lg px-3 py-1.5 text-navy hover:bg-navy hover:text-white transition-colors"
          >
            Ops Center
          </NavLink>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-muted hover:text-navy hover:bg-surface2 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((v) => !v)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav
          id="mobile-menu"
          role="menu"
          className="md:hidden bg-surface1 border-b border-surface3 px-4 py-3 flex flex-col gap-1"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `py-2.5 px-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-surface2 text-navy'
                    : 'text-muted hover:bg-surface2 hover:text-navy'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/dashboard"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="py-2.5 px-3 rounded-xl text-sm font-medium text-muted hover:bg-surface2 hover:text-navy transition-colors"
          >
            Ops Center
          </NavLink>
        </nav>
      )}
    </header>
  )
}
