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
        museo: ['MuseoModerno', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      // On simplifie la structure des couleurs (plus de 'themeColors' imbriqué)
      colors: {
        primary: '#CFB586',
        
        // Mode Clair (Light)
        'light-bg': '#F8F8F5',       // Crème
        'light-surface': '#FFFFFF',  // Blanc pur
        'light-text': '#111111',     // Noir
        'light-muted': '#4b5563',    // Gris foncé
        'light-border': 'rgba(0,0,0,0.1)',

        // Mode Sombre (Dark)
        'dark-bg': '#050505',        // Noir profond
        'dark-surface': '#0A0A0A',   // Noir un peu moins profond
        'dark-text': '#EAEAE5',      // Blanc cassé
        'dark-muted': '#9ca3af',     // Gris clair
        'dark-border': 'rgba(255,255,255,0.1)',
      }
    }
  },
  // ⚠️ J'ai retiré le plugin qui faisait probablement planter ta config
  plugins: [],
}