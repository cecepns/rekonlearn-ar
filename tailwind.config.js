/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rekon: {
          dark: '#091322',
          navy: '#15325b',
          navyLight: '#1b3d6d',
          navyDark: '#0e223f',
          profil: '#f8b4c4',
          capaian: '#f6be32',
          materi: '#74b3f6',
          kamera: '#889af2',
          video: '#659a7f',
          spreadsheet: '#f4b3a1',
          informasi: '#e66271',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
      },
      boxShadow: {
        'phone': '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(56, 189, 248, 0.15)',
        'glow-cyan': '0 0 25px rgba(56, 189, 248, 0.5)',
        'glow-gold': '0 0 25px rgba(245, 158, 11, 0.5)',
      }
    },
  },
  plugins: [],
}
