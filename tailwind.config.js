/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'oxford': {
          DEFAULT: '#1B365D',
          50: '#F7F7F7', // Cultured
          100: '#D1D9E6', // Light Gray
          200: '#95A3B8', // Cadet Gray
          300: '#4A5B7B', // Independence
          400: '#1B365D', // Oxford Blue
          500: '#182F51',
          600: '#152846',
          700: '#12223A',
          800: '#0F1B2E',
          900: '#0C1523',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
