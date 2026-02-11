import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollStack from '../components/ScrollStack'; 

const HomePage = () => {
    // --- CURSOR CUSTOM ---
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    // --- SCROLL ANIMATION ---
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    
    return (
        // ✅ MISE À JOUR : Utilisation des classes simplifiées (light-bg, dark-text, etc.)
        <div ref={containerRef} className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text font-sans selection:bg-[#CFB586] selection:text-black transition-colors duration-500">
            
            {/* CURSEUR BLEND MODE */}
            <motion.div
                style={{ x: cursorXSpring, y: cursorYSpring }}
                className="fixed top-0 left-0 w-8 h-8 bg-[#CFB586] rounded-full mix-blend-difference pointer-events-none z-50 hidden md:block"
            />

            {/* --- 1. HERO --- */}
            <section className="relative h-screen w-full overflow-hidden bg-dark-bg">
                <video
                    autoPlay muted loop playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                >
                    <source src="https://cdn.pixabay.com/video/2016/08/12/4382-178617337_large.mp4" type="video/mp4" />
                </video>

                {/* Overlay Gradient : Assure la transition vers la couleur du thème en bas */}
                <div className="absolute inset-0 bg-gradient-to-t from-light-bg dark:from-dark-bg via-transparent to-black/40 transition-colors duration-500"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10 flex flex-col justify-end h-full">
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                    >
                        <h1 className="font-museo text-[12vw] leading-[0.8] font-bold tracking-tighter uppercase text-white mix-blend-overlay opacity-90">
                            Bobenvy
                        </h1>
                        <div className="flex flex-col md:flex-row justify-between items-end mt-8 border-t border-white/20 pt-6">
                            <p className="max-w-md text-xl md:text-2xl font-light leading-tight text-white/90">
                                Agence de stratégie marketing. <br />
                                <span className="text-[#CFB586] italic font-serif">Révélateur de singularité.</span>
                            </p>
                            <div className="hidden md:block animate-bounce mt-8 md:mt-0">
                                <ArrowDownRight size={48} className="text-[#CFB586]" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- 2. MANIFESTO --- */}
            <section className="py-40 px-6 md:px-24 bg-light-bg dark:bg-dark-bg transition-colors duration-500 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] font-light text-light-muted dark:text-dark-muted transition-colors duration-500">
                        Votre marque manque de différenciation ? <br />
                        <span className="text-light-text dark:text-dark-text transition-colors duration-500">Vos actions sont dispersées.</span> <br />
                        <span className="text-light-text dark:text-dark-text transition-colors duration-500">Le ROI est flou.</span> <br />
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="text-[#CFB586] font-museo font-bold italic"
                        >
                            Vous n'êtes pas seul.
                        </motion.span>
                    </h2>

                    <div className="mt-24 grid md:grid-cols-2 gap-12 border-l border-[#CFB586] pl-8">
                        <p className="text-lg text-light-muted dark:text-dark-muted transition-colors duration-500">
                            Bobenvy structure le chaos. Nous ne vendons pas de simples prestations, nous vendons de la clarté.
                            Une approche rigoureuse et profondément humaine pour transformer vos idées en stratégie gagnante.
                        </p>
                        <div className="flex items-center">
                            <Link to="/about" className="group flex items-center gap-4 text-light-text dark:text-dark-text uppercase tracking-widest hover:text-[#CFB586] transition-colors">
                                Découvrir l'agence <div className="w-12 h-[1px] bg-light-text dark:bg-white group-hover:bg-[#CFB586] transition-colors"></div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 3. SERVICES (SCROLL STACK) --- */}
            <ScrollStack />

            {/* --- 4. METHODOLOGY --- */}
            {/* z-30 et bg-light-bg/dark-bg sont critiques pour couvrir les cartes sticky */}
            <section className="relative z-30 py-32 overflow-hidden bg-light-bg dark:bg-dark-bg transition-colors duration-500">
                <div className="px-6 md:px-12 mb-12 flex items-end justify-between">
                    <h3 className="font-museo text-5xl text-light-text dark:text-dark-text">NOTRE PROCESS</h3>
                    <span className="text-[#CFB586] font-mono">[ ANALYSER - OPTIMISER ]</span>
                </div>

                <div className="flex gap-8 px-6 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar">
                    {[
                        { step: "01", title: "Analyser", txt: "Audit complet & Compréhension du marché." },
                        { step: "02", title: "Structurer", txt: "Définition de la stratégie & Priorités." },
                        { step: "03", title: "Activer", txt: "Déploiement des leviers & Création." },
                        { step: "04", title: "Optimiser", txt: "Mesure de la performance & ROI." },
                    ].map((item, i) => (
                        <div key={i} className="min-w-[85vw] md:min-w-[400px] h-[50vh] border border-light-border dark:border-dark-border p-8 flex flex-col justify-between hover:bg-light-surface dark:hover:bg-dark-surface transition-colors snap-center rounded-sm bg-light-bg dark:bg-dark-bg">
                            <div className="text-[#CFB586] font-museo text-8xl opacity-20">{item.step}</div>
                            <div>
                                <h4 className="text-3xl font-bold mb-4 text-light-text dark:text-dark-text">{item.title}</h4>
                                <p className="text-light-muted dark:text-dark-muted font-light border-l border-light-border dark:border-dark-border pl-4">{item.txt}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- CTA --- */}
            <section className="py-40 bg-[#CFB586] text-black flex justify-center items-center text-center overflow-hidden group cursor-pointer relative z-30">
                <Link to="/contact" className="relative z-10">
                    <motion.h2
                        whileHover={{ scale: 1.05 }}
                        className="font-museo text-[10vw] leading-none font-bold"
                    >
                        START NOW
                    </motion.h2>
                    <p className="font-mono uppercase tracking-widest mt-4">Prendre rendez-vous</p>
                </Link>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            </section>

            <footer className="bg-light-bg dark:bg-dark-bg py-12 px-6 flex justify-between items-end border-t border-light-border dark:border-dark-border text-xs font-mono text-light-muted dark:text-dark-muted uppercase relative z-30 transition-colors duration-500">
                <div>© 2026 Bobenvy Strategy.</div>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-light-text dark:hover:text-white">LinkedIn</a>
                    <a href="#" className="hover:text-light-text dark:hover:text-white">Instagram</a>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;