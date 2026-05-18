/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  safelist: [
    'bg-fn-product', 'bg-fn-ua', 'bg-fn-mon', 'bg-fn-creative', 'bg-fn-business',
    'text-fn-product', 'text-fn-ua', 'text-fn-mon', 'text-fn-creative', 'text-fn-business',
    'border-fn-product', 'border-fn-ua', 'border-fn-mon', 'border-fn-creative', 'border-fn-business',
    'ring-fn-product', 'ring-fn-ua', 'ring-fn-mon', 'ring-fn-creative', 'ring-fn-business',
    'chip-product', 'chip-ua', 'chip-mon', 'chip-creative', 'chip-business',
    'path-banner-product', 'path-banner-ua', 'path-banner-mon', 'path-banner-creative', 'path-banner-business',
    { pattern: /bg-fn-(product|ua|mon|creative|business)\/\d+/ },
    { pattern: /ring-fn-(product|ua|mon|creative|business)\/\d+/ },
    { pattern: /border-fn-(product|ua|mon|creative|business)\/\d+/ }
  ],
  theme: {
    extend: {
      colors: {
        // Brand tri-color (per amaduodata-design)
        violet: {
          50: '#F1ECFF', 100: '#E1D6FF', 200: '#C5ADFF', 300: '#A684FF',
          400: '#8B5CFF', 500: '#6938EF', 600: '#5424D6', 700: '#4218A8',
          800: '#2F107B', 900: '#1A0A4F'
        },
        sky2: {
          50: '#E6F0FF', 100: '#C6DEFF', 200: '#94BFFF', 300: '#5C9CFF',
          400: '#2D7FF9', 500: '#1F66E0', 600: '#1450B8', 700: '#0E3A88',
          800: '#082858', 900: '#051736'
        },
        magic: {
          50: '#FFE9F2', 100: '#FFCFE0', 200: '#FFA1C1', 300: '#FF6FA0',
          400: '#FF3D8E', 500: '#E51F73', 600: '#B7115A', 700: '#850A41',
          800: '#5C062D', 900: '#38031B'
        },
        sun: {
          50: '#FFF8DC', 100: '#FFEDA3', 200: '#FFE177', 300: '#FFD957',
          400: '#FFCD3C', 500: '#F2B41A', 600: '#C58E00', 700: '#946A00',
          800: '#6A4C00', 900: '#3F2D00'
        },
        gn: {
          50: '#E6FBEF', 400: '#29D86F', 500: '#14B856', 700: '#086E36', 900: '#03301A'
        },
        ink: {
          50: '#F7F4FB', 100: '#ECE6F2', 200: '#D9D1E2', 300: '#B8AECB',
          400: '#8C81A4', 500: '#645B7C', 600: '#443D5A', 700: '#2C2740',
          800: '#1B172C', 900: '#131326'
        },
        // Dark surface ramp
        bg: {
          0: '#0B0B14',
          1: '#15151F',
          2: '#1E1E2A',
          3: '#2A2A38'
        },
        // Foreground tokens (on dark)
        fg: '#F5F5F8',
        fgmuted: 'rgba(245,245,248,0.62)',
        fgsubtle: 'rgba(245,245,248,0.40)',
        line: 'rgba(255,255,255,0.08)',
        linestrong: 'rgba(255,255,255,0.16)',
        // Path/function color slots (re-keyed onto brand palette)
        fnproduct: '#6938EF',
        fnua: '#2D7FF9',
        fnmon: '#FFCD3C',
        fncreative: '#FF3D8E',
        fnbusiness: '#A684FF',
        // -------- Backwards-compat aliases to old token names --------
        canvas: { light: '#0B0B14', dark: '#0B0B14' },
        surface: { light: '#15151F', dark: '#15151F' },
        sub: { light: 'rgba(245,245,248,0.62)', dark: 'rgba(245,245,248,0.62)' },
        brand: '#6938EF',
        correct: '#14B856',
        incorrect: '#E5364B',
        heart: '#FF3D8E',
        streak: '#FFCD3C',
        xp: '#FFCD3C',
        fn: {
          product: '#6938EF',
          ua: '#2D7FF9',
          mon: '#FFCD3C',
          creative: '#FF3D8E',
          business: '#A684FF'
        }
      },
      borderRadius: {
        xs: '6px', sm: '10px', md: '14px', lg: '20px', xl: '28px', '2xl': '36px', pill: '999px'
      },
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      boxShadow: {
        pop: '0 12px 32px rgba(105,56,239,0.24)',
        win: '0 12px 32px rgba(45,127,249,0.28)',
        baseViolet: '0 4px 0 0 #4218A8',
        baseBlue:   '0 4px 0 0 #0E3A88',
        baseGreen:  '0 4px 0 0 #086E36',
        basePink:   '0 4px 0 0 #850A41',
        baseSun:    '0 4px 0 0 #946A00',
        baseInk:    '0 4px 0 0 #2C2740'
      },
      keyframes: {
        shake: { '0%,100%': { transform: 'translateX(0)' }, '20%': { transform: 'translateX(-6px)' }, '40%': { transform: 'translateX(6px)' }, '60%': { transform: 'translateX(-4px)' }, '80%': { transform: 'translateX(4px)' } },
        burst: { '0%': { transform: 'scale(0.4) translateY(8px)', opacity: '0' }, '60%': { transform: 'scale(1.15) translateY(-2px)', opacity: '1' }, '100%': { transform: 'scale(1) translateY(0)', opacity: '1' } },
        slideUp: { from: { transform: 'translateY(100%)' }, to: { transform: 'translateY(0)' } }
      },
      animation: {
        shake: 'shake 0.42s ease-in-out',
        burst: 'burst 0.48s cubic-bezier(0.34,1.56,0.64,1)',
        slideUp: 'slideUp 0.28s cubic-bezier(0.22,1,0.36,1)'
      }
    }
  },
  plugins: []
}
