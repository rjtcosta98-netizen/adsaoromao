/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          700: '#1e3a5f',
          800: '#053975',
          900: '#032d61',
        },
        'yellow': {
          400: '#FFD700',
          500: '#E6C200',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Oswald', 'sans-serif'],
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
