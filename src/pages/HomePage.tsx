import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
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
        <div ref={containerRef} className="bg-[#050505] text-[#EAEAE5] font-sans selection:bg-[#CFB586] selection:text-black">
            
            {/* CURSEUR BLEND MODE */}
            <motion.div
                style={{ x: cursorXSpring, y: cursorYSpring }}
                className="fixed top-0 left-0 w-8 h-8 bg-[#CFB586] rounded-full mix-blend-difference pointer-events-none z-50 hidden md:block"
            />

            {/* --- 1. HERO : IMMERSIVE VIDEO & GIANT TYPE --- */}
            <section className="relative h-screen w-full overflow-hidden bg-[#050505]">
                <video
                    autoPlay muted loop playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                >
                    <source src="https://cdn.pixabay.com/video/2016/08/12/4382-178617337_large.mp4" type="video/mp4" />
                </video>

                {/* Overlay pour assurer la transition vers le noir en bas */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/40"></div>
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
                            <p className="max-w-md text-xl md:text-2xl font-light leading-tight">
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
            <section className="py-40 px-6 md:px-24 bg-[#050505] relative z-10">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] font-light text-white/40">
                        Votre marque manque de différenciation ? <br />
                        <span className="text-white">Vos actions sont dispersées.</span> <br />
                        <span className="text-white">Le ROI est flou.</span> <br />
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
                        <p className="text-lg text-gray-400">
                            Bobenvy structure le chaos. Nous ne vendons pas de simples prestations, nous vendons de la clarté.
                            Une approche rigoureuse et profondément humaine pour transformer vos idées en stratégie gagnante.
                        </p>
                        <div className="flex items-center">
                            <Link to="/about" className="group flex items-center gap-4 text-white uppercase tracking-widest hover:text-[#CFB586] transition-colors">
                                Découvrir l'agence <div className="w-12 h-[1px] bg-white group-hover:bg-[#CFB586] transition-colors"></div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 3. SERVICES (SCROLL STACK) --- */}
            <ScrollStack />

            {/* --- 4. METHODOLOGY --- */}
            <section className="relative z-30 py-32 overflow-hidden bg-[#050505]">
                <div className="px-6 md:px-12 mb-12 flex items-end justify-between">
                    <h3 className="font-museo text-5xl">NOTRE PROCESS</h3>
                    <span className="text-[#CFB586] font-mono">[ ANALYSER - OPTIMISER ]</span>
                </div>

                <div className="flex gap-8 px-6 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar">
                    {[
                        { step: "01", title: "Analyser", txt: "Audit complet & Compréhension du marché." },
                        { step: "02", title: "Structurer", txt: "Définition de la stratégie & Priorités." },
                        { step: "03", title: "Activer", txt: "Déploiement des leviers & Création." },
                        { step: "04", title: "Optimiser", txt: "Mesure de la performance & ROI." },
                    ].map((item, i) => (
                        <div key={i} className="min-w-[85vw] md:min-w-[400px] h-[50vh] border border-white/10 p-8 flex flex-col justify-between hover:bg-white/5 transition-colors snap-center rounded-sm bg-[#050505]">
                            <div className="text-[#CFB586] font-museo text-8xl opacity-20">{item.step}</div>
                            <div>
                                <h4 className="text-3xl font-bold mb-4">{item.title}</h4>
                                <p className="text-gray-400 font-light border-l border-white/20 pl-4">{item.txt}</p>
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

            <footer className="bg-[#050505] py-12 px-6 flex justify-between items-end border-t border-white/10 text-xs font-mono text-gray-500 uppercase relative z-30">
                <div>© 2026 Bobenvy Strategy.</div>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-white">LinkedIn</a>
                    <a href="#" className="hover:text-white">Instagram</a>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;