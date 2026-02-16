import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Components
import ScrollStack from '../components/ScrollStack';
import AboutSection from '../components/AboutSection';
import PortfolioPreview from '../components/PortfolioPreview'; // ✅ AJOUT
import ResourcesPreview from '../components/ResourcesPreview'; // ✅ AJOUT

const HomePage = () => {
    // Cursor config
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);
    const TITLE_HEIGHT_VH = 10;

    const servicesRef = useRef(null); // ref pour la section services
    const [isTitleFixed, setIsTitleFixed] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    // Observer pour détecter quand on est dans la section services
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsTitleFixed(entry.isIntersecting);
            },
            { threshold: 0, rootMargin: '-1px' }
        );

        if (servicesRef.current) {
            observer.observe(servicesRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    return (
        <div ref={containerRef} className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text font-sans selection:bg-primary selection:text-black transition-colors duration-500">

            <motion.div
                style={{ x: cursorXSpring, y: cursorYSpring }}
                className="fixed top-0 left-0 w-8 h-8 bg-primary rounded-full mix-blend-difference pointer-events-none z-50 hidden md:block"
            />

            {/* HERO */}
            <section className="relative h-screen w-full overflow-hidden bg-dark-bg">
                {/* VIDEO BACKGROUND */}
                <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-70">
                    <source src="https://cdn.pixabay.com/video/2016/08/12/4382-178617337_large.mp4" type="video/mp4" />
                </video>

                {/* GRADIENTS & OVERLAYS */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 md:bg-gradient-to-t md:from-light-bg md:dark:from-dark-bg md:via-transparent md:to-black/40 transition-colors duration-500"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

                {/* CONTENT CONTAINER */}
                <div className="absolute inset-0 w-full h-full p-6 md:p-12 z-10 flex flex-col justify-center items-center text-center md:justify-end md:items-stretch md:text-left">

                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full"
                    >
                        {/* TITRE PRINCIPAL */}
                        <h1 className="font-museo text-[15vw] md:text-[12vw] leading-[0.85] md:leading-[0.8] font-bold tracking-tighter uppercase text-white mix-blend-overlay opacity-90 mb-6 md:mb-0">
                            Bobenvy
                        </h1>

                        {/* CONTAINER SOUS-TITRE */}
                        <div className="flex flex-col items-center md:flex-row md:justify-between md:items-end md:mt-8 md:border-t md:border-white/20 md:pt-6">
                            <div className="w-[1px] h-8 bg-primary mb-6 md:hidden"></div>
                            <p className="max-w-xs md:max-w-md text-lg md:text-2xl font-light leading-tight text-white/90">
                                Agence de stratégie marketing. <br />
                                <span className="text-primary italic font-serif">Révélateur de singularité.</span>
                            </p>
                            <div className="hidden md:block animate-bounce mt-8 md:mt-0">
                                <ArrowDownRight size={48} className="text-primary" />
                            </div>
                        </div>
                    </motion.div>

                    {/* SCROLL INDICATOR (Mobile Only) */}
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

            {/* ABOUT */}
            <AboutSection />

            {/* MANIFESTO */}
            <section className="py-40 px-6 md:px-24 bg-light-bg dark:bg-dark-bg transition-colors duration-500 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] font-light text-light-muted dark:text-dark-muted transition-colors">
                        Votre marque manque de différenciation ? <br />
                        <span className="text-light-text dark:text-dark-text">Vos actions sont dispersées.</span> <br />
                        <span className="text-light-text dark:text-dark-text">Le ROI est flou.</span> <br />
                        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} className="text-primary font-museo font-bold italic">Vous n'êtes pas seul.</motion.span>
                    </h2>
                    <div className="mt-24 grid md:grid-cols-2 gap-12 border-l border-primary pl-8">
                        <p className="text-lg text-light-muted dark:text-dark-muted">
                            Bobenvy structure le chaos. Nous ne vendons pas de simples prestations, nous vendons de la clarté.
                        </p>
                        <div className="flex items-center">
                            <Link to="/about" className="group flex items-center gap-4 text-light-text dark:text-dark-text uppercase tracking-widest hover:text-primary transition-colors">Découvrir l'agence <div className="w-12 h-[1px] bg-light-text dark:bg-white group-hover:bg-primary transition-colors"></div></Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 3. SERVICES (TITRE + STACK) --- */}
            {/* ✅ IMPORTANT : Ajout de la ref={servicesRef} ici pour que le titre sticky fonctionne */}
            <div ref={servicesRef} className="relative bg-light-bg dark:bg-dark-bg transition-colors duration-500">

                {/* A. LE TITRE (Fixed quand dans la section) */}
                <div
                    className={`${isTitleFixed ? 'fixed' : 'absolute'} top-0 left-0 right-0 z-50 flex flex-col justify-end pb-8 px-6 md:px-12 bg-light-bg dark:bg-dark-bg transition-all duration-300 shadow-sm border-b border-light-border/10 dark:border-dark-border/10`}
                    style={{ height: `${TITLE_HEIGHT_VH}vh` }}
                >
                    <span className="text-primary font-mono text-xs uppercase tracking-widest block mb-4">Domaines d'intervention</span>
                    <h3 className="font-museo text-5xl md:text-8xl text-light-text dark:text-dark-text transition-colors leading-none">EXPERTISES</h3>
                </div>
                <div style={{ height: '10vh' }} />
                <ScrollStack headerHeight={TITLE_HEIGHT_VH} />
                <div style={{ height: '10vh' }} />

            </div>

            {/* ✅ 4. PORTFOLIO PREVIEW : Preuve sociale après les services */}
            <PortfolioPreview />

            {/* METHODOLOGY */}
            <section className="relative z-30 py-32 overflow-hidden bg-light-bg dark:bg-dark-bg transition-colors duration-500">
                <div className="px-6 md:px-12 mb-12 flex items-end justify-between">
                    <h3 className="font-museo text-5xl text-light-text dark:text-dark-text">NOTRE PROCESS</h3>
                    <span className="text-primary font-mono">[ ANALYSER - OPTIMISER ]</span>
                </div>
                <div className="flex gap-8 px-6 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar">
                    {[
                        { step: "01", title: "Analyser", txt: "Audit complet & Compréhension du marché." },
                        { step: "02", title: "Structurer", txt: "Définition de la stratégie & Priorités." },
                        { step: "03", title: "Activer", txt: "Déploiement des leviers & Création." },
                        { step: "04", title: "Optimiser", txt: "Mesure de la performance & ROI." },
                    ].map((item, i) => (
                        <div key={i} className="min-w-[85vw] md:min-w-[400px] h-[50vh] border border-light-border dark:border-dark-border p-8 flex flex-col justify-between hover:bg-light-surface dark:hover:bg-dark-surface transition-colors snap-center rounded-sm bg-light-bg dark:bg-dark-bg">
                            <div className="text-primary font-museo text-8xl opacity-20">{item.step}</div>
                            <div>
                                <h4 className="text-3xl font-bold mb-4 text-light-text dark:text-dark-text">{item.title}</h4>
                                <p className="text-light-muted dark:text-dark-muted font-light border-l border-light-border dark:border-dark-border pl-4">{item.txt}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ✅ 5. RESOURCES PREVIEW : Autorité avant le contact */}
            <ResourcesPreview />

            {/* CTA */}
            <section className="py-40 bg-primary text-black flex justify-center items-center text-center overflow-hidden group cursor-pointer relative z-30">
                <Link to="/contact" className="relative z-10">
                    <motion.h2 whileHover={{ scale: 1.05 }} className="font-museo text-[10vw] leading-none font-bold">START NOW</motion.h2>
                    <p className="font-mono uppercase tracking-widest mt-4">Prendre rendez-vous</p>
                </Link>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            </section>

            <footer className="bg-light-bg dark:bg-dark-bg py-12 px-6 flex justify-between items-end border-t border-light-border dark:border-dark-border text-xs font-mono text-light-muted dark:text-dark-muted uppercase relative z-30 transition-colors duration-500">
                <div>© 2026 Bobenvy Strategy.</div>
                <div className="flex gap-4"><a href="#" className="hover:text-light-text dark:hover:text-white">LinkedIn</a><a href="#" className="hover:text-light-text dark:hover:text-white">Instagram</a></div>
            </footer>
        </div>
    );
};

export default HomePage;