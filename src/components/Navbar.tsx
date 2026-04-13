import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu as MenuIcon, X, Linkedin, Instagram, Facebook, Globe } from 'lucide-react';
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
    { name: t('nav.about'), href: '/#about' },
    { name: t('nav.services'), href: '/#services' },
    { name: t('nav.portfolio'), href: '/#portfolio' },
    { name: t('nav.ressources'), href: '/#ressources' },
    { name: t('nav.contact'), href: '/#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);
    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.replace('/#', '');
      const performSmoothScroll = () => {
        const element = document.getElementById(targetId);
        if (element) {
          const offset = 85;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      };
      if (location.pathname === '/') {
        setTimeout(performSmoothScroll, 100);
      } else {
        navigate('/');
        setTimeout(performSmoothScroll, 500);
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate('/');
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    }
  };

  const menuVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: (i: number) => ({ x: 0, opacity: 1, transition: { delay: i * 0.05, duration: 0.5, ease: [0.33, 1, 0.68, 1] } }),
    exit: { opacity: 0, x: 20 }
  };

  const navContainerClasses = "fixed top-0 left-0 w-full px-6 py-4 max-md:px-6 max-md:py-3 flex justify-between items-center pointer-events-none";

  return (
    <>
      <nav className={`${navContainerClasses} z-[998] bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-light-border dark:border-dark-border text-light-text dark:text-dark-text transition-colors duration-500`}>
        <div className="pointer-events-auto">
          <a href="/" onClick={handleLogoClick} className="group relative block cursor-pointer">
            <span className="font-museo text-3xl font-bold tracking-tight text-light-text dark:text-dark-text transition-colors">
              BOBENVY<span className="text-primary">.</span>
            </span>
          </a>
        </div>

        <div className="flex items-center gap-4 md:gap-8 pointer-events-auto">
          <div className="invisible opacity-0 w-[52px]"><ThemeToggle /></div>

          {/* Bouton Desktop Langue */}
          <button onClick={toggleLang} className="hidden md:flex font-mono text-xs uppercase text-light-text dark:text-dark-text dark:hover:text-primary transition-colors">
            {currentLang === 'en' ? 'FR' : 'EN'}
          </button>

          <Link
            to="/#contact"
            onClick={(e) => handleNavClick(e as any, '/#contact')}
            className="hidden md:flex items-center gap-2 border border-light-border dark:border-dark-border px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-light-text dark:text-dark-text hover:border-primary dark:hover:text-primary transition-all"
          >
            {t('nav.contact_us')}
          </Link>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="flex items-center gap-2 group cursor-pointer text-light-text dark:text-dark-text"
            aria-expanded={isOpen}
            aria-label={isOpen ? t('nav.close') : t('nav.menu')}
          >
            <span className="hidden md:block font-mono text-xs uppercase tracking-widest text-light-text dark:text-dark-text dark:group-hover:text-primary transition-colors">
              {isOpen ? t('nav.close') : t('nav.menu')}
            </span>
            <div className={`p-2 rounded-full border border-light-border dark:border-dark-border transition-all duration-300 ${isOpen ? 'rotate-90 bg-light-text text-light-bg dark:bg-dark-text dark:text-dark-bg' : 'group-hover:bg-light-text group-hover:text-light-bg dark:group-hover:bg-dark-text dark:group-hover:text-dark-bg'}`}>
              {isOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </div>
          </button>
        </div>
      </nav>

      <nav className={`${navContainerClasses} z-[999]`}>
        <div className="invisible pointer-events-none">
          <span className="font-museo text-2xl md:text-3xl font-bold tracking-tight">BOBENVY<span className="text-primary">.</span></span>
        </div>
        <div className="flex items-center gap-4 md:gap-8 pointer-events-none">
          <div className="pointer-events-auto"><ThemeToggle /></div>
          <button className="hidden md:flex font-mono text-xs uppercase invisible">{currentLang === 'en' ? 'FR' : 'EN'}</button>
          <div className="hidden md:flex items-center gap-2 border border-white/30 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest invisible">{t('nav.start_project')}</div>
          <div className="flex items-center gap-2 invisible">
            <span className="hidden md:block font-mono text-xs uppercase tracking-widest">{isOpen ? t('nav.close') : t('nav.menu')}</span>
            <div className="p-2 rounded-full border border-white/30"><MenuIcon size={20} /></div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%", transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] } }}
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
              className="fixed top-0 right-0 bottom-0 w-full md:w-1/3 lg:w-[30rem] z-[100] flex flex-col justify-between px-8 py-20 md:py-32 overflow-y-auto bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text border-l border-light-border dark:border-dark-border shadow-2xl"
            >
              <div className="flex flex-col gap-6 relative z-10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-primary font-mono text-[10px] uppercase tracking-widest block">{t('nav.navigation')}</span>
                  
                  {/* Bouton Mobile Langue ajouté ici */}
                  <button 
                    onClick={toggleLang} 
                    className="md:hidden flex items-center gap-2 font-mono text-xs border border-primary/30 px-3 py-1 rounded-full text-primary"
                  >
                    <Globe size={12} /> {currentLang === 'en' ? 'FRANÇAIS' : 'ENGLISH'}
                  </button>
                </div>
                
                {navLinks.map((link, i) => (
                  <div key={link.name} className="overflow-hidden">
                    <motion.div custom={i} variants={menuVariants} initial="hidden" animate="visible" exit="exit">
                      <Link
                        to={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="block font-museo text-4xl font-bold text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text hover:translate-x-2 transition-all duration-300"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-col gap-8 pt-12 mt-12 border-t border-light-border/20 dark:border-dark-border/20 relative z-10"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold mb-4 uppercase tracking-widest text-[10px] text-primary font-mono">{t('nav.contact_title')}</h4>
                    <a href="mailto:contact@bobenvy.com" className="opacity-80 text-sm hover:text-primary transition-colors">contact@bobenvy.com</a>
                  </div>
                  <div>
                    <h4 className="font-bold mb-4 uppercase tracking-widest text-[10px] text-primary font-mono">{t('nav.follow_us')}</h4>
                    <div className="flex gap-4">
                      <a href="https://www.linkedin.com/company/bobenvy/" target="_blank" rel="noreferrer" className="p-2 border border-light-border dark:border-dark-border rounded-full hover:border-primary hover:text-primary transition-colors">
                          <Linkedin size={18} />
                      </a>
                      <a href="https://www.instagram.com/bobenvy/" target="_blank" rel="noreferrer" className="p-2 border border-light-border dark:border-dark-border rounded-full hover:border-primary hover:text-primary transition-colors">
                          <Instagram size={18} />
                      </a>
                      <a href="https://facebook.com/bobenvy" target="_blank" rel="noreferrer" className="p-2 border border-light-border dark:border-dark-border rounded-full hover:border-primary hover:text-primary transition-colors">
                          <Facebook size={18} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Lien vers Mentions Légales ajouté ici */}
                  <Link 
                    to="/mentions-legales" 
                    onClick={() => setIsOpen(false)}
                    className="text-[10px] uppercase font-mono text-primary hover:underline transition-all"
                  >
                    {t('footer.legal') || 'Mentions Légales'}
                  </Link>

                  <div className="text-[9px] uppercase font-mono opacity-40">
                    © Bobenvy {new Date().getFullYear()}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;