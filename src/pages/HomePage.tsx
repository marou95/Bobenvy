import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// API
import { getHomeHero, type HomeHero } from '../lib/sanity';

// Components
import ScrollStack from '../components/ScrollStack';
import AboutSection from '../components/AboutSection';
import PortfolioPreview from '../components/PortfolioPreview';
import ResourcesPreview from '../components/ResourcesPreview';
import Navbar from '../components/Navbar';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const HomePage = () => {
    const { t, i18n } = useTranslation();

    // Cursor config
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [titleHeight, setTitleHeight] = useState(30);
    const [heroData, setHeroData] = useState<HomeHero | null>(null);

    useEffect(() => {
        // Récupération des données du Hero depuis Sanity
        getHomeHero(i18n.language).then(setHeroData).catch(console.error);
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 6);
            cursorY.set(e.clientY - 6);
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [i18n.language]); // Très important : le useEffect surveille la langue

    useEffect(() => {
        const handleResize = () => {
            setTitleHeight(window.innerWidth < 768 ? 20 : 28);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text font-sans selection:bg-primary selection:text-black transition-colors duration-500">
            <Navbar />

            <motion.div
                style={{ x: cursorXSpring, y: cursorYSpring }}
                className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-50 hidden md:block"
            />

            {/* HERO */}
            <section className="relative h-screen w-full overflow-hidden bg-dark-bg">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                    src={heroData?.videoUrl || ""}
                />
                <div className="absolute inset-0 w-full h-full p-6 md:p-12 z-10 flex flex-col justify-center items-center text-center md:justify-end md:items-stretch md:text-left">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full"
                    >
                        <h1 className="font-museo text-[8vw] md:text-[8vw] leading-[0.85] md:leading-[0.8] font-bold tracking-tighter uppercase text-white mix-blend-overlay opacity-90 mb-6 md:mb-0">
                            {heroData?.title || 'Bobenvy'}
                        </h1>
                        <div className="flex flex-col items-center md:flex-row md:justify-between md:items-end md:mt-8 md:border-t md:border-white/20 md:pt-6">
                            <div className="w-[1px] h-8 bg-primary mb-6 md:hidden"></div>
                            <h2 className="max-w-screen-md text-lg md:text-2xl font-light leading-tight text-white/90 whitespace-pre-line">
                                {heroData?.subtitle || t('home.hero.fallback_subtitle')}
                                <br />
                                <span className="text-primary text-4xl italic font-vibes mt-2 inline-block">
                                    {heroData?.highlight || t('home.hero.fallback_highlight')}
                                </span>
                            </h2>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 md:hidden"
                    >
                        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent opacity-50"></div>
                    </motion.div>
                </div>
            </section>

            {/* MANIFESTO */}
            <section className="py-10 px-6 md:px-24 bg-light-bg dark:bg-dark-bg transition-colors duration-500 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-3xl lg:text-3xl font-light text-light-muted dark:text-dark-muted transition-colors leading-tight">
                        <span className="block mb-6 md:mb-4">
                            {t('home.manifesto.line1')}
                        </span>

                        <span className="block mb-6 md:mb-4 text-light-text dark:text-dark-text">
                            {t('home.manifesto.line2')}
                        </span>

                        <span className="block mb-8 md:mb-8 text-light-text dark:text-dark-text">
                            {t('home.manifesto.line3')}
                        </span>

                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="block text-primary font-vibes italic text-5xl md:text-6xl lg:text-8xl mt-4"
                        >
                            {t('home.manifesto.line4')}
                        </motion.span>
                    </h2>
                </div>
            </section>

            {/* ABOUT */}
            <div id="about">
                <AboutSection />
            </div>

            {/* --- SERVICES --- */}
            <div id="services" className="relative bg-light-bg dark:bg-dark-bg transition-colors duration-500 min-h-screen">
                <div className="relative z-10 pb-20">
                    <ScrollStack />
                </div>
            </div>

            {/* PORTFOLIO PREVIEW */}
            <div id="portfolio" ></div>
            <PortfolioPreview />

            {/* RESOURCES PREVIEW */}
            <div id="ressources" >
                <ResourcesPreview />
            </div>

            {/* SCROLL TO TOP BUTTON */}
            <ScrollToTop />

            {/* CONTACT FORM SECTION */}
            <ContactForm />

            <Footer />
        </div>
    );
};

export default HomePage;