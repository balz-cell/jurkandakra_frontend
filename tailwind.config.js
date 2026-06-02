/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D336B',
          50: '#EAEBF5',
          100: '#D5D7EB',
          200: '#ABAFD7',
          300: '#8187C3',
          400: '#575FAF',
          500: '#2D336B',
          600: '#242956',
          700: '#1B1F41',
          800: '#12152C',
          900: '#090B17',
        },
        secondary: {
          DEFAULT: '#F4A261',
          50: '#FEF5ED',
          100: '#FDEBDB',
          200: '#FBD7B7',
          300: '#F9C393',
          400: '#F6B07A',
          500: '#F4A261',
          600: '#E88B3A',
          700: '#D4741E',
          800: '#A85C18',
          900: '#7C4412',
        },
        accent: {
          DEFAULT: '#E76F51',
          50: '#FDF0EC',
          100: '#FBE1D9',
          200: '#F7C3B3',
          300: '#F3A58D',
          400: '#EF8767',
          500: '#E76F51',
          600: '#E04C27',
          700: '#B93A1C',
          800: '#8C2C15',
          900: '#5F1E0E',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#F8F6F2',
          muted: '#F0EDE8',
        },
        muted: {
          DEFAULT: '#7A7A7A',
          light: '#A3A3A3',
          dark: '#5C5C5C',
        },
        success: '#5FA777',
        text: {
          DEFAULT: '#1E1E1E',
          secondary: '#4A4A4A',
          muted: '#7A7A7A',
        },
      },
      fontFamily: {
        display: ['Clash Display', 'system-ui', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['4rem', { lineHeight: '1.1', fontWeight: '700' }],
        'section': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'card': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'caption': ['0.8125rem', { lineHeight: '1.5' }],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.02)',
        'hover': '0 20px 40px -10px rgba(0, 0, 0, 0.1)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}