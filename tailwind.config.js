/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Fan Pages (light) ─────────────────────────────
        base:     '#F8FAFF',
        surface1: '#FFFFFF',
        surface2: '#F1F5F9',
        surface3: '#E2E8F0',
        gold:     '#D97706',
        navy:     '#0F2044',
        crimson:  '#DC2626',
        sky:      '#0EA5E9',
        green:    '#16A34A',
        muted:    '#64748B',

        // ── Ops Dashboard (dark) ──────────────────────────
        dash: {
          base:    '#0A1628',
          surface1:'#0F2044',
          surface2:'#162852',
          surface3:'#1E3A6E',
          gold:    '#FFB800',
          crimson: '#EF4444',
          text:    '#F1F5F9',
        },

        // ── Crowd density ─────────────────────────────────
        crowd: {
          low: '#16A34A',
          mid: '#D97706',
          hi:  '#DC2626',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        display: ['"Bebas Neue"', 'cursive'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        '10': '10px',
        '11': '11px',
        '13': '13px',
      },
      letterSpacing: {
        widest2: '0.2em',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        card:  '0 1px 3px rgba(15,32,68,0.06), 0 4px 16px rgba(15,32,68,0.06)',
        gold:  '0 0 20px rgba(217,119,6,0.25)',
        live:  '0 0 0 6px rgba(220,38,38,0.15)',
        dark:  '0 2px 12px rgba(0,0,0,0.4)',
        glow:  '0 0 24px rgba(217,119,6,0.2)',
      },
      animation: {
        'pulse-live': 'pulse-live 1.5s ease-in-out infinite',
        'fade-in':    'fade-in 0.3s ease-out',
        'slide-up':   'slide-up 0.4s ease-out',
        'dash-flow':  'dash-flow 2s linear infinite',
      },
      keyframes: {
        'pulse-live': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(220,38,38,0.4)' },
          '50%':       { boxShadow: '0 0 0 8px rgba(220,38,38,0)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'dash-flow': {
          to: { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
}
