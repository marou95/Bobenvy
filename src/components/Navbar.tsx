import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu as MenuIcon, X, Globe, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  // On ne gère plus le "scrolled" pour changer la couleur, 
  // car on va utiliser mix-blend-difference pour la visibilité auto.

  const location = useLocation();
  const currentLang = i18n.language || 'en';

  // Bloquer le scroll du body quand le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const toggleLang = () => {
    const newLang = currentLang === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  // Gestion du scroll fluide et fermeture menu
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);
    
    // Si c'est une ancre (#), on gère le scroll manuel si on est sur la home
    if (href.startsWith('#') && location.pathname === '/') {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
            // Petit délai pour laisser le menu se fermer visuellement
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }
  };

  const navLinks = [
    { name: t('nav.about') || "Agence", href: '#about' },
    { name: t('nav.services') || "Expertises", href: '#services' },
    { name: t('nav.portfolio') || "Projets", href: '#portfolio' },
    { name: t('nav.contact') || "Contact", href: '#contact' },
  ];

  // Animation variants pour les liens du menu
  const menuVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1]
      }
    }),
    exit: { opacity: 0, y: -20 }
  };

  return (
    <>
      {/* --- 1. BARRE DE NAVIGATION FIXE (Minimaliste) --- */}
      <nav className="fixed top-0 left-0 w-full z-[90] px-6 py-6 md:px-12 md:py-8 flex justify-between items-center mix-blend-difference text-white">
        
        {/* LOGO */}
        <Link to="/" onClick={() => setIsOpen(false)} className="group relative z-[91]">
             <span className="font-museo text-2xl md:text-3xl font-bold tracking-tight">
                BOBENVY<span className="text-[#CFB586]">.</span>
             </span>
        </Link>

        {/* ACTIONS DROITE */}
        <div className="flex items-center gap-4 md:gap-8 z-[91]">
            
            {/* Langue (Desktop only) */}
            <button onClick={toggleLang} className="hidden md:flex font-mono text-xs uppercase hover:text-[#CFB586] transition-colors">
                {currentLang === 'en' ? 'FR' : 'EN'}
            </button>

            {/* CTA Contact (Desktop only) */}
            <Link 
                to="/contact" 
                className="hidden md:flex items-center gap-2 border border-white/30 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
                Start Project
            </Link>

            {/* BOUTON MENU (HAMBURGER) */}
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="flex items-center gap-2 group cursor-pointer"
            >
                <span className="hidden md:block font-mono text-xs uppercase tracking-widest group-hover:text-[#CFB586] transition-colors">
                    {isOpen ? 'Close' : 'Menu'}
                </span>
                <div className={`p-2 rounded-full border border-white/30 transition-all duration-300 ${isOpen ? 'rotate-90 bg-white text-black' : 'group-hover:bg-white group-hover:text-black'}`}>
                    {isOpen ? <X size={20} /> : <MenuIcon size={20} />}
                </div>
            </button>
        </div>
      </nav>

      {/* --- 2. FULL SCREEN MENU OVERLAY --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.3 } }}
            className="fixed inset-0 bg-[#050505] z-[80] flex flex-col justify-center px-6 md:px-24 overflow-hidden"
          >
            {/* Background Noise Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>

            <div className="max-w-7xl w-full mx-auto grid md:grid-cols-2 gap-12 h-full md:h-auto items-center pt-20 md:pt-0">
                
                {/* COLONNE GAUCHE : NAVIGATION GEANTE */}
                <div className="flex flex-col gap-2 md:gap-6">
                    <span className="text-[#CFB586] font-mono text-xs uppercase tracking-widest mb-4 block">Navigation</span>
                    
                    {navLinks.map((link, i) => (
                        <div key={link.name} className="overflow-hidden">
                            <motion.div
                                custom={i}
                                variants={menuVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <Link
                                    to={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="block font-museo text-5xl md:text-7xl lg:text-8xl font-bold text-gray-400 hover:text-white hover:translate-x-4 transition-all duration-300"
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* COLONNE DROITE : INFO & SOCIAL (Avec délai d'apparition) */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex flex-col gap-12 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pl-12"
                >
                    {/* Socials */}
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">Follow Us</h4>
                        <div className="flex flex-col gap-2 text-gray-400 font-mono text-sm">
                            <a href="#" className="hover:text-[#CFB586] transition-colors w-max">LinkedIn</a>
                            <a href="#" className="hover:text-[#CFB586] transition-colors w-max">Instagram</a>
                            <a href="#" className="hover:text-[#CFB586] transition-colors w-max">Behance</a>
                        </div>
                    </div>

                    {/* Contact Rapide */}
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">Contact</h4>
                        <p className="text-gray-400 text-lg mb-2">hello@bobenvy.com</p>
                        <p className="text-gray-500 font-mono text-xs">+33 1 23 45 67 89</p>
                    </div>

                    {/* Mobile Lang Switch */}
                    <button 
                        onClick={toggleLang}
                        className="md:hidden flex items-center gap-2 text-xs font-bold uppercase text-white border border-white/20 w-max px-4 py-2 rounded-full"
                    >
                        <Globe size={14} />
                        Change Language ({currentLang.toUpperCase()})
                    </button>
                </motion.div>
            </div>

            {/* FOOTER MENU */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-6 md:bottom-12 left-0 w-full px-6 md:px-12 flex justify-between text-[10px] uppercase font-mono text-gray-600"
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