import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

// Components
import Navbar from './components/Navbar';

// Pages
import HomePage from './pages/HomePage';
// (Assure-toi que ces fichiers existent ou commente-les si tu ne les as pas encore migrés)
import DrinkDetail from './pages/DrinkDetail';
import BlogPostDetail from './pages/BlogPostDetail';
import BlogArchive from './pages/BlogArchive';

// Services & Types
import { getDrinks, getPosts } from './services/sanity.client';
import { DrinkProject, BlogPost } from './types';

const App: React.FC = () => {
  const [drinks, setDrinks] = useState<DrinkProject[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBackground, setShowBackground] = useState(false);

  // --- 0. INITIALISATION DU THEME (CRUCIAL) ---
  // On le fait ici pour que le thème s'applique dès le montage de l'app
  useEffect(() => {
    const savedTheme = localStorage.getItem('bobenvy-theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // 1. CHARGEMENT DONNÉES
  useEffect(() => {
    const loadData = async () => {
      try {
        // Si tu n'as pas encore configuré Sanity, tu peux commenter ces appels
        // const drinksData = await getDrinks();
        // setDrinks(drinksData);
        setLoading(false);

        setTimeout(async () => {
          // const postsData = await getPosts();
          // setPosts(postsData);
        }, 300);

      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // 2. CHARGEMENT BACKGROUND
  useEffect(() => {
    const timer = setTimeout(() => setShowBackground(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {/* ✅ CORRECTION ICI : 
         1. On remplace 'bg-lab-white' par les classes dynamiques du thème.
         2. On ajoute 'text-themeColors...' pour que le texte par défaut soit bon partout.
         3. 'min-h-screen' assure que le fond couvre tout l'écran.
      */}
      <div className="relative min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-500 overflow-x-clip font-sans">        {showBackground && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="fixed inset-0 z-0 pointer-events-none"
        >
          {/* Tu peux ajouter ici une texture globale si tu veux, sinon laisse vide */}
        </motion.div>
      )}

        {/* Navbar (Contient le ThemeToggle) */}
        <Navbar />

        {/* Routes */}
        <div className="relative z-10">
          <Routes>
            <Route
              path="/"
              element={<HomePage />} // J'ai simplifié les props pour l'instant pour que ça marche direct
            />
            {/* Si ces pages ne sont pas encore prêtes, commente-les pour éviter les erreurs */}
            <Route path="/drink/:slug" element={<DrinkDetail />} />
            <Route path="/blog/:slug" element={<BlogPostDetail />} />
            <Route path="/blog" element={<BlogArchive />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
};

export default App;