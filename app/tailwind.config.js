/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: { light: '#FFFFFF', dark: '#0B0F14' },
        surface: { light: '#F7F8FA', dark: '#161B22' },
        ink: { light: '#0B0F14', dark: '#F5F7FA' },
        sub: { light: '#5B6573', dark: '#A8B0BB' },
        brand: '#0F62FE',
        correct: '#23A35F',
        incorrect: '#D92D20',
        heart: '#E92C2C',
        streak: '#F79009',
        xp: '#1570EF',
        fn: {
          product: '#5E60CE',
          ua: '#2DCE89',
          mon: '#F79009',
          creative: '#EC4899',
          business: '#475569'
        }
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px'
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      keyframes: {
        shake: {
          '0%,100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' }
        },
        burst: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '40%': { transform: 'scale(1.15)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' }
        }
      },
      animation: {
        shake: 'shake 0.3s ease-in-out',
        burst: 'burst 0.48s cubic-bezier(0.34,1.56,0.64,1)',
        pop: 'pop 0.24s ease-out'
      }
    }
  },
  plugins: []
}
