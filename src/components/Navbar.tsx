import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu as MenuIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentLang = i18n.language || 'en';

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const toggleLang = () => {
    const newLang = currentLang === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { name: t('nav.about') || "Agence", href: '/#about' },
    { name: t('nav.services') || "Expertises", href: '/#services' },
    { name: t('nav.portfolio') || "Projets", href: '/#portfolio' },
    { name: t('nav.ressources') || "Ressources", href: '/#ressources' },
    { name: t('nav.contact') || "Contact", href: '/#contact' },
  ];

  // ✅ NOUVELLE LOGIQUE DE SCROLL (Basée sur ton snippet)
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);
    
    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.replace('/#', '');

      // Fonction de scroll manuel avec calcul d'offset
      const performSmoothScroll = () => {
        const element = document.getElementById(targetId);
        if (element) {
            // Le calcul magique : Position élément + Scroll actuel - Offset (85px pour la navbar)
            const offset = 85; 
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;
      
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
        }
      };

      if (location.pathname === '/') {
        // Si on est déjà sur la home, on scroll après un mini délai (pour laisser le menu se fermer)
        setTimeout(performSmoothScroll, 100);
      } else {
        // Si on est ailleurs, on va sur la home, puis on scroll
        navigate('/');
        // Délai plus long pour laisser le temps à la Home de se charger/monter
        setTimeout(performSmoothScroll, 500);
      }
    }
  };

  const menuVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({ y: 0, opacity: 1, transition: { delay: i * 0.1, duration: 0.8, ease: [0.33, 1, 0.68, 1] } }),
    exit: { opacity: 0, y: -20 }
  };

  const navContainerClasses = "fixed top-0 left-0 w-full px-6 py-6 md:px-12 md:py-8 flex justify-between items-center pointer-events-none";

  return (
    <>
      {/* LAYER 1 : MIX-BLEND */}
      <nav className={`${navContainerClasses} z-[998] mix-blend-difference text-white`}>
        <div className="pointer-events-auto">
            <Link to="/" onClick={() => setIsOpen(false)} className="group relative block">
            <span className="font-museo text-2xl md:text-3xl font-bold tracking-tight">
                BOBENVY<span className="text-primary">.</span>
            </span>
            </Link>
        </div>

        <div className="flex items-center gap-4 md:gap-8 pointer-events-auto">
          <div className="invisible opacity-0 w-[52px]">
             <ThemeToggle />
          </div>

          <button onClick={toggleLang} className="hidden md:flex font-mono text-xs uppercase hover:text-primary transition-colors">
            {currentLang === 'en' ? 'FR' : 'EN'}
          </button>
          
          <Link 
            to="/contact" // ou /#contact selon préférence
            className="hidden md:flex items-center gap-2 border border-white/30 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
          >
            Start Project
          </Link>

          <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 group cursor-pointer">
            <span className="hidden md:block font-mono text-xs uppercase tracking-widest group-hover:text-primary transition-colors">
              {isOpen ? 'Close' : 'Menu'}
            </span>
            <div className={`p-2 rounded-full border border-white/30 transition-all duration-300 ${isOpen ? 'rotate-90 bg-white text-black' : 'group-hover:bg-white group-hover:text-black'}`}>
              {isOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </div>
          </button>
        </div>
      </nav>

      {/* LAYER 2 : NORMAL (Toggle) */}
      <nav className={`${navContainerClasses} z-[999]`}>
        <div className="invisible pointer-events-none">
            <span className="font-museo text-2xl md:text-3xl font-bold tracking-tight">BOBENVY<span className="text-primary">.</span></span>
        </div>

        <div className="flex items-center gap-4 md:gap-8 pointer-events-none">
          <div className="pointer-events-auto">
             <ThemeToggle />
          </div>
          {/* Espaces réservés invisibles */}
          <button className="hidden md:flex font-mono text-xs uppercase invisible">{currentLang === 'en' ? 'FR' : 'EN'}</button>
          <div className="hidden md:flex items-center gap-2 border border-white/30 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest invisible">Start Project</div>
          <div className="flex items-center gap-2 invisible">
            <span className="hidden md:block font-mono text-xs uppercase tracking-widest">{isOpen ? 'Close' : 'Menu'}</span>
            <div className="p-2 rounded-full border border-white/30"><MenuIcon size={20} /></div>
          </div>
        </div>
      </nav>

      {/* MENU PLEIN ÉCRAN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.3 } }}
            className="fixed inset-0 z-[100] flex flex-col justify-center px-6 md:px-24 overflow-hidden bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-500"
          >
             <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-6 md:right-12 p-3 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors z-[101]"
            >
              {/* <X size={24} className="text-light-text dark:text-dark-text" /> */}
            </button>
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>

            <div className="max-w-7xl w-full mx-auto grid md:grid-cols-2 gap-12 h-full md:h-auto items-center pt-20 md:pt-0">
              <div className="flex flex-col gap-2 md:gap-6">
                <span className="text-primary font-mono text-xs uppercase tracking-widest mb-4 block">Navigation</span>
                {navLinks.map((link, i) => (
                  <div key={link.name} className="overflow-hidden">
                    <motion.div custom={i} variants={menuVariants} initial="hidden" animate="visible" exit="exit">
                      <Link
                        to={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="block font-museo text-5xl md:text-7xl lg:text-8xl font-bold text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text hover:translate-x-4 transition-all duration-300"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-col gap-12 border-t md:border-t-0 md:border-l border-light-border dark:border-dark-border pt-8 md:pl-12"
              >
                <div>
                  <h4 className="font-bold mb-4 uppercase tracking-widest text-sm">Follow Us</h4>
                  <div className="flex flex-col gap-2 font-mono text-sm opacity-60">
                    <span className="w-max opacity-50 cursor-not-allowed">LinkedIn - coming soon</span>
                    <span className="w-max opacity-50 cursor-not-allowed">Instagram - coming soon</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-4 uppercase tracking-widest text-sm">Contact</h4>
                  <p className="opacity-60 text-lg mb-2">contact@bobenvy.com</p>
                </div>
              </motion.div>
            </div>
             <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-6 md:bottom-12 left-0 w-full px-6 md:px-12 flex justify-between text-[10px] uppercase font-mono opacity-40"
            >
              <span>Paris — France</span>
              <span>© Bobenvy 2026</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;