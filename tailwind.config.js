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
        museo: ['MuseoModerno', 'ui-sans-serif', 'system-ui', 'sans-serif'], 
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
        serif: ['Playfair Display', 'ui-serif', 'Georgia', 'Cambria', "Times New Roman", 'Times', 'serif'],
      },
      colors: {
        primary: '#CFB586', 
        secondary: '#A4B7A2',
        
        'light-bg': '#F8F8F5',       
        'light-surface': '#FFFFFF',  
        'light-text': '#111111',     
        'light-muted': '#4b5563',    
        'light-border': 'rgba(0,0,0,0.1)', 

        'dark-bg': '#050505',        
        'dark-surface': '#0A0A0A',   
        'dark-text': '#EAEAE5',      
        'dark-muted': '#9ca3af',     
        'dark-border': 'rgba(255,255,255,0.1)', 
      }
    }
  },
  plugins: [],
}