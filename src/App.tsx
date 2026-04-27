import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
// import '@fontsource/great-vibes';
import './services/i18n'; // Initialisation de i18n

// Components
import Navbar from './components/Navbar';
// Pages
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import ResourcesPage from './pages/RessourcePage';
import ProjectDetail from './pages/ProjectDetail';
import PostDetail from './pages/PostDetail';
import MentionsLegales from './pages/MentionsLegales';

// Ce composant gère les routes et les animations
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <div key={location.pathname} className="w-full">
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<ProjectDetail />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/:slug" element={<PostDetail />} />
          <Route path="*" element={<HomePage />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
};

const App: React.FC = () => {

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <Router>
      {/* <Navbar /> */}
      <div className="relative min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-500 font-sans overflow-x-clip">
        <AnimatedRoutes />
      </div>
    </Router>
  );
};

export default App;