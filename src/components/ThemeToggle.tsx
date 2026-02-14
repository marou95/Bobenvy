import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  // 1. Initialisation au chargement
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Si 'dark' est sauvegardé OU (rien sauvegardé ET système est dark)
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      // Passage en Light
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      // Passage en Dark
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-full border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text hover:scale-105 transition-all shadow-sm overflow-hidden z-50 pointer-events-auto"
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{ y: isDark ? 30 : 0, opacity: isDark ? 0 : 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun size={18} className="text-orange-500" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{ y: isDark ? 0 : -30, opacity: isDark ? 1 : 0 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon size={18} className="text-primary" />
      </motion.div>
    </button>
  );
};

export default ThemeToggle;