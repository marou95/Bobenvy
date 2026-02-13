/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        museo: ['MuseoModerno', 'cursive'], 
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: '#CFB586', // Or
        
        // THÈME CLAIR
        'light-bg': '#F8F8F5',       // Crème
        'light-surface': '#FFFFFF',  // Blanc
        'light-text': '#111111',     // Noir
        'light-muted': '#4b5563',    // Gris foncé
        'light-border': 'rgba(0,0,0,0.1)', // Bordures subtiles

        // THÈME SOMBRE
        'dark-bg': '#050505',        // Noir
        'dark-surface': '#0A0A0A',   // Noir plus clair
        'dark-text': '#EAEAE5',      // Blanc cassé
        'dark-muted': '#9ca3af',     // Gris clair
        'dark-border': 'rgba(255,255,255,0.1)', // Bordures subtiles
      }
    }
  },
  plugins: [],
}