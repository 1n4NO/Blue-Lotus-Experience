import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './styles/**/*.css'
  ],
  theme: {
    extend: {
      colors: {
        background: '#090909',
        surface: '#111111',
        text: '#F7F6F2',
        muted: '#D5D0C8',
        accent: '#556B2F',
        gold: '#B9975B'
      },
      fontFamily: {
        display: ['var(--font-display)', 'Libre Baskerville', 'serif'],
        body: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
        ui: ['var(--font-ui)', 'General Sans', 'Inter', 'system-ui', 'sans-serif']
      },
      letterSpacing: {
        editorial: '0.12em'
      },
      boxShadow: {
        soft: '0 20px 60px rgba(0, 0, 0, 0.22)'
      },
      transitionTimingFunction: {
        calm: 'cubic-bezier(0.22, 1, 0.36, 1)'
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '10%': { transform: 'translate3d(-2%, -3%, 0)' },
          '20%': { transform: 'translate3d(3%, 2%, 0)' },
          '30%': { transform: 'translate3d(-4%, 2%, 0)' },
          '40%': { transform: 'translate3d(2%, -4%, 0)' },
          '50%': { transform: 'translate3d(-1%, 4%, 0)' },
          '60%': { transform: 'translate3d(4%, -1%, 0)' },
          '70%': { transform: 'translate3d(-3%, 1%, 0)' },
          '80%': { transform: 'translate3d(2%, 3%, 0)' },
          '90%': { transform: 'translate3d(-2%, -1%, 0)' }
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        grain: 'grain 8s steps(8) infinite',
        rise: 'rise 900ms ease-out both'
      }
    }
  },
  plugins: []
};

export default config;
