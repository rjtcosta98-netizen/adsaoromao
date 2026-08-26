/** @type {import('tailwindcss').Config} */

/*
 * AD SÃO ROMÃO — SISTEMA DE COR ÚNICO
 * Uma só fonte de verdade. Toda a cor de marca vive aqui.
 *
 * Superfícies de página: apenas `paper` (claro) e `navy-900` / `ink` (escuro).
 * `bone` é para cartões e caixas dentro de secções claras — nunca full-bleed.
 * Acento: `gold-400` (#FFD700). `yellow-*` é alias legado do mesmo ramp.
 */
const gold = {
  50: '#FFFBEA',
  100: '#FFF4C2',
  200: '#FFE98A',
  300: '#FFE04D',
  400: '#FFD700', // acento de marca
  500: '#E6BE00',
  600: '#B8890B',
  700: '#8C6708',
  800: '#6B4E06',
  900: '#4A3604',
};

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ink': '#010B1C',
        'navy': {
          300: '#8FC7FF', // tinte claro — glows e realces sobre escuro
          700: '#0A4E8F',
          800: '#053975',
          900: '#032D61',
          950: '#021A3C',
        },
        gold,
        'yellow': gold,
        /*
         * O neutro do site deixa de ser o cinzento frio do Tailwind e passa a
         * ser um cinzento com tinta navy. Mantém exatamente a mesma escada de
         * luminosidade (nenhum contraste se inverte), mas todo o texto
         * secundário, todas as bordas e todos os fundos neutros passam a
         * pertencer à mesma família da marca.
         */
        'gray': {
          50: '#F7F9FC',
          100: '#EEF2F8',
          200: '#E0E6F0',
          300: '#C6D0E0',
          400: '#94A3BC',
          500: '#6B7A93',
          600: '#4E5C74',
          700: '#394559',
          800: '#263041',
          900: '#151D2B',
        },
        'paper': '#FFFFFF',
        'bone': {
          DEFAULT: '#F4F6FA',
          100: '#F9FAFC',
          200: '#E6EAF2',
          300: '#D3DAE7',
        },
      },
      fontFamily: {
        sans: ['Barlow', 'system-ui', 'sans-serif'],
        display: ['Oswald', 'sans-serif'],
        cup: ['Barlow Condensed', 'sans-serif'],
      },
      letterSpacing: {
        kicker: '0.24em',
      },
      boxShadow: {
        'card': '0 1px 2px rgba(3,45,97,0.05), 0 12px 32px -12px rgba(3,45,97,0.16)',
        'card-hover': '0 2px 4px rgba(3,45,97,0.06), 0 24px 48px -16px rgba(3,45,97,0.28)',
        'gold': '0 12px 32px -12px rgba(255,215,0,0.55)',
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
        'fade-in-down': 'fade-in-down 0.6s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'loading-progress': 'loading-progress 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-left': 'slide-left 0.8s ease-out forwards',
        'slide-right': 'slide-right 0.8s ease-out forwards',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'loading-progress': {
          '0%': { transform: 'scaleX(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'scaleX(1)', opacity: '0' },
        },
        'slide-left': {
          '0%': { width: '0' },
          '100%': { width: '32px' },
        },
        'slide-right': {
          '0%': { width: '0' },
          '100%': { width: '32px' },
        },
      },
    },
  },
  plugins: [],
}
