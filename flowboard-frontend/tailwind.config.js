/** @type {import('tailwindcss').Config} */
export default {
  darkMode: false,
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#6C63FF', light: '#EEF0FF', dark: '#5B52EE' },
        accent: { DEFAULT: '#F97316', light: '#FFF4ED' },
        success: { DEFAULT: '#22C55E', light: '#ECFDF5' },
        warning: { DEFAULT: '#F59E0B', light: '#FFFBEB' },
        danger: { DEFAULT: '#EF4444', light: '#FEF2F2' },
        surface: '#FFFFFF',
        page: '#F8F7FF',
        border: '#E5E3F5',
        ink: { DEFAULT: '#1A1830', muted: '#6B6884', hint: '#9C99B0' }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 2px 12px rgba(108, 99, 255, 0.07)',
        'card-hover': '0 8px 30px rgba(108, 99, 255, 0.13)',
        modal: '0 20px 60px rgba(108, 99, 255, 0.15)'
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px'
      }
    },
  },
  plugins: [],
}
