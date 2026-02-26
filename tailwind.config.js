/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50:  '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#0d9488',
          600: '#0a7c72',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        navy: {
          DEFAULT: '#1e3a5f',
          light: '#2a4a72',
          dark: '#152c47',
        },
        orange: {
          DEFAULT: '#ea580c',
          light: '#fb923c',
          dark: '#c2410c',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
