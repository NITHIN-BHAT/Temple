/** Brand colours live here — change once, the whole site updates. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        maroon: { 50: '#fbf1f1', 100: '#f3dcdc', 600: '#8f1d2c', 700: '#741624', 800: '#5c111d', 900: '#420b14', 950: '#2a060c' },
        saffron: { 300: '#f6b768', 400: '#f19c3a', 500: '#e8821e', 600: '#c96912' },
        gold: { 200: '#eedfa6', 300: '#e2c76f', 400: '#d4ad46', 500: '#c0962c', 600: '#9c7720' },
        cream: { 50: '#fffcf6', 100: '#fbf5e9', 200: '#f4e9d2', 300: '#ead8b5' },
        ink: { 700: '#3b2a24', 800: '#2a1d18', 900: '#1b120f' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Mukta', '"Noto Sans Kannada"', 'system-ui', 'sans-serif'],
        kannada: ['"Noto Serif Kannada"', '"Noto Sans Kannada"', 'serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(66, 11, 20, 0.18)',
        glow: '0 0 0 1px rgba(192,150,44,.35), 0 18px 50px -20px rgba(192,150,44,.55)',
      },
      backgroundImage: {
        'temple-dusk': 'linear-gradient(180deg,#2a060c 0%,#5c111d 45%,#c96912 85%,#f19c3a 100%)',
      },
    },
  },
  plugins: [],
};
