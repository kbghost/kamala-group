/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Tokens dynamiques via CSS variables (s'adaptent au thème) ──
        'kg-bg':          'var(--kg-bg)',
        'kg-bg-alt':      'var(--kg-bg-alt)',
        'kg-surface':     'var(--kg-surface)',
        'kg-border':      'var(--kg-border)',
        'kg-border-light':'var(--kg-border-light)',
        'kg-text':        'var(--kg-text)',
        'kg-text-muted':  'var(--kg-text-muted)',
        'kg-text-faint':  'var(--kg-text-faint)',

        // ── Couleurs fixes sombres — utilisées sur sections image
        //    (Hero, Portfolio, Talents, Booking cards) qui restent
        //    sombres dans les 2 thèmes pour le contraste avec les photos ──
        'kg-black':  '#0A0A12',
        'kg-deep':   '#0E1020',
        'kg-white':  '#F4F6FF',
        'kg-gray':   '#8A91B0',

        // ── Couleurs de marque fixes (identiques dans les 2 thèmes) ──
        'kg-navy':        '#1B2E6B',
        'kg-navy-light':  '#2A4099',
        'kg-navy-pale':   '#3A52B8',
        'kg-red':         '#C0272D',
        'kg-red-light':   '#D93B41',
      },
      fontFamily: {
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'body':    ['Inter', 'system-ui', 'sans-serif'],
        'mono':    ['DM Mono', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
