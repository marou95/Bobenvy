import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
// Pages
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage'; // ✅ Nouvelle page
import ResourcesPage from './pages/RessourcePage'; // ✅ Nouvelle page

// Ce composant gère les routes et les animations
// Il doit être à l'intérieur du <Router> pour utiliser useLocation()
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <div key={location.pathname} className="w-full h-full">
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
};

const App: React.FC = () => {

  // Initialisation du thème au niveau de l'App pour éviter les flashs
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // On applique la classe immédiatement
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-500 font-sans overflow-x-clip">
        <Navbar />
        {/* Contenu des pages avec transitions */}
        <div className="relative z-10">
          <AnimatedRoutes />
        </div>
      </div>
    </Router>
  );
};

export default App;