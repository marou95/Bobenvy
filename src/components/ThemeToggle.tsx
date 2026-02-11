import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('bobenvy-theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && !systemDark)) {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('bobenvy-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('bobenvy-theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      // ✅ CLASSES MISES À JOUR :
      // - bg-light-surface (Blanc) / dark:bg-dark-surface (Noir #0A0A0A)
      // - border-light-border / dark:border-dark-border
      // - text-light-text / dark:text-dark-text
      className="relative z-50 pointer-events-auto flex items-center justify-center w-10 h-10 rounded-full border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text hover:scale-105 transition-all overflow-hidden shadow-sm"
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{ 
          y: isDark ? 30 : 0, 
          opacity: isDark ? 0 : 1,
          rotate: isDark ? 90 : 0
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun size={18} className="text-orange-500" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{ 
          y: isDark ? 0 : -30, 
          opacity: isDark ? 1 : 0,
          rotate: isDark ? 0 : -90
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon size={18} className="text-[#CFB586]" />
      </motion.div>
    </button>
  );
};

export default ThemeToggle;