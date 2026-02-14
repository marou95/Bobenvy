import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

// Components
import Navbar from './components/Navbar';

// Pages
import HomePage from './pages/HomePage';
import DrinkDetail from './pages/DrinkDetail';
import BlogPostDetail from './pages/BlogPostDetail';
import BlogArchive from './pages/BlogArchive';

// Services
import { getDrinks, getPosts } from './services/sanity.client';
import { DrinkProject, BlogPost } from './types';

const App: React.FC = () => {
  const [drinks, setDrinks] = useState<DrinkProject[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialisation du thème au niveau de l'App pour éviter les flashs
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const loadData = async () => {
      try {
        const drinksData = await getDrinks();
        setDrinks(drinksData);
        setLoading(false);
        setTimeout(async () => {
          const postsData = await getPosts();
          setPosts(postsData);
        }, 300);
      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-500 font-sans overflow-x-clip">

        <Navbar />

        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/drink/:slug" element={<DrinkDetail />} />
            <Route path="/blog/:slug" element={<BlogPostDetail />} />
            <Route path="/blog" element={<BlogArchive />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;