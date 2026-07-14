/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Fan pages (light)
        base: '#F8FAFF',
        surface1: '#FFFFFF',
        surface2: '#F1F5F9',
        surface3: '#E2E8F0',
        gold: '#D97706',
        navy: '#0F2044',
        crimson: '#DC2626',
        sky: '#0EA5E9',
        green: '#16A34A',
        muted: '#64748B',
        // Ops dashboard (dark)
        'ops-base': '#0A1628',
        'ops-surface1': '#0F2044',
        'ops-surface2': '#162852',
        'ops-surface3': '#1E3A6E',
        'ops-gold': '#FFB800',
        'ops-muted': '#94A3B8',
        // Shared crowd density
        'crowd-low': '#16A34A',
        'crowd-mid': '#D97706',
        'crowd-hi': '#DC2626',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Bebas Neue', 'cursive'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 2px 12px rgba(15,32,68,0.08)',
        hero: '0 8px 32px rgba(15,32,68,0.20)',
        gold: '0 4px 20px rgba(217,119,6,0.25)',
      },
    },
  },
  plugins: [],
}
