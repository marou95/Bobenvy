import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';

// Components
import ScrollStack from '../components/ScrollStack';
import AboutSection from '../components/AboutSection';
import PortfolioPreview from '../components/PortfolioPreview';
import ResourcesPreview from '../components/ResourcesPreview';
import Navbar from '../components/Navbar';
import ContactForm from '../components/ContactForm';

const HomePage = () => {
    // Cursor config
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [titleHeight, setTitleHeight] = useState(30);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 6);
            cursorY.set(e.clientY - 6);
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

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
                <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-70">
                    <source src="https://cdn.pixabay.com/video/2016/08/12/4382-178617337_large.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 w-full h-full p-6 md:p-12 z-10 flex flex-col justify-center items-center text-center md:justify-end md:items-stretch md:text-left">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full"
                    >
                        <h1 className="font-museo text-[15vw] md:text-[12vw] leading-[0.85] md:leading-[0.8] font-bold tracking-tighter uppercase text-white mix-blend-overlay opacity-90 mb-6 md:mb-0">
                            Bobenvy
                        </h1>
                        <div className="flex flex-col items-center md:flex-row md:justify-between md:items-end md:mt-8 md:border-t md:border-white/20 md:pt-6">
                            <div className="w-[1px] h-8 bg-primary mb-6 md:hidden"></div>
                            <h2 className="max-w-xs md:max-w-md text-lg md:text-2xl font-light leading-tight text-white/90">
                                Agence marketing et communication <br className="hidden md:block" />Île-de-France & Maroc. <br />
                                <span className="text-primary italic font-serif mt-2 inline-block">Révélateur de singularité.</span>
                            </h2>
                            <div className="hidden md:block animate-bounce mt-8 md:mt-0">
                                <ArrowDownRight size={48} className="text-primary" />
                            </div>
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

            {/* ABOUT */}
            <div id="about">
                <AboutSection />
            </div>

            {/* MANIFESTO */}
            <section className="py-40 px-6 md:px-24 bg-light-bg dark:bg-dark-bg transition-colors duration-500 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-6xl lg:text-5xl leading-[1.1] font-light text-light-muted dark:text-dark-muted transition-colors">
                        Votre marque manque de différenciation ? <br />
                        <span className="text-light-text dark:text-dark-text lg:text-6xl">Vos actions sont dispersées ?</span> <br />
                        <span className="text-light-text dark:text-dark-text lg:text-6xl">Vous ne mesurez pas le rendement de vos investissements ?</span> <br />
                        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} className="text-primary font-vibes italic lg:text-6xl">Vous n'êtes pas seul.</motion.span>
                    </h2>
                    <div className="mt-24 grid md:grid-cols-2 gap-12 border-l border-primary pl-8">
                        <p className="text-lg text-light-muted dark:text-dark-muted">
                            Bobenvy structure le chaos. Nous ne vendons pas de simples prestations, nous vendons de la clarté.
                        </p>
                        <div className="flex items-center">
                            <a href="#about" className="group flex items-center gap-4 text-light-text dark:text-dark-text uppercase tracking-widest hover:text-primary transition-colors cursor-pointer">
                                Découvrir l'agence
                                <div className="w-12 h-[1px] bg-light-text dark:bg-white group-hover:bg-primary transition-colors"></div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SERVICES --- */}
            <div id="services" className="relative bg-light-bg dark:bg-dark-bg transition-colors duration-500 min-h-screen">
                <div className="relative z-10 pb-20">
                    <ScrollStack/>
                </div>
            </div>

            {/* PORTFOLIO PREVIEW */}
            <div id="portfolio" ></div>
            <PortfolioPreview />

            {/* RESOURCES PREVIEW */}
            <div id="ressources" >
                <ResourcesPreview />
            </div>

            {/* CONTACT FORM SECTION */}
            <ContactForm />

            <footer className="bg-light-bg dark:bg-dark-bg py-12 px-6 flex justify-between items-end border-t border-light-border dark:border-dark-border text-xs font-mono text-light-muted dark:text-dark-muted uppercase relative z-0 transition-colors duration-500">
                <div>© {new Date().getFullYear()} Bobenvy</div>
                <div className="flex gap-4"><a href="#" className="hover:text-light-text dark:hover:text-white">LinkedIn</a><a href="#" className="hover:text-light-text dark:hover:text-white">Instagram</a><a href="#" className="hover:text-light-text dark:hover:text-white">Facebook</a></div>
            </footer>
        </div>
    );
};

export default HomePage;