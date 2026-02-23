import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDownRight, ArrowRight, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

// Components
import ScrollStack from '../components/ScrollStack';
import AboutSection from '../components/AboutSection';
import PortfolioPreview from '../components/PortfolioPreview';
import ResourcesPreview from '../components/ResourcesPreview';
import Navbar from '../components/Navbar';

const HomePage = () => {
    // Cursor config
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);
    const [formStatus, setFormStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');

    const containerRef = useRef(null);
    const [titleHeight, setTitleHeight] = useState(30);
    const { scrollYProgress } = useScroll({ target: containerRef });

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
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

    const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('SENDING');

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/xlgwnvrg", {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                setFormStatus('SUCCESS');
                form.reset();
            } else {
                setFormStatus('ERROR');
            }
        } catch (error) {
            setFormStatus('ERROR');
        }
    };

    return (
        <div ref={containerRef} className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text font-sans selection:bg-primary selection:text-black transition-colors duration-500">
            <Navbar />

            <motion.div
                style={{ x: cursorXSpring, y: cursorYSpring }}
                className="fixed top-0 left-0 w-8 h-8 bg-primary rounded-full mix-blend-difference pointer-events-none z-50 hidden md:block"
            />

            {/* HERO */}
            <section className="relative h-screen w-full overflow-hidden bg-dark-bg">
                <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-70">
                    <source src="https://cdn.pixabay.com/video/2016/08/12/4382-178617337_large.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 md:bg-gradient-to-t md:from-light-bg md:dark:from-dark-bg md:via-transparent md:to-black/40 transition-colors duration-500"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

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
                            <p className="max-w-xs md:max-w-md text-lg md:text-2xl font-light leading-tight text-white/90">
                                Agence de stratégie marketing. <br />
                                <span className="text-primary italic font-serif">Révélateur de singularité.</span>
                            </p>
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

            {/* ABOUT - AJOUT DE L'ANCRE ID="about" */}
            <div id="about">
                <AboutSection />
            </div>

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
                            {/* Le lien pointe vers l'ancre #about */}
                            <a href="#about" className="group flex items-center gap-4 text-light-text dark:text-dark-text uppercase tracking-widest hover:text-primary transition-colors cursor-pointer">
                                Découvrir l'agence
                                <div className="w-12 h-[1px] bg-light-text dark:bg-white group-hover:bg-primary transition-colors"></div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 3. SERVICES (TITRE + STACK) --- */}
            <div id="services" className="relative bg-light-bg dark:bg-dark-bg transition-colors duration-500 min-h-screen">

                {/* A. LE TITRE STICKY */}
                <div
                    className="sticky top-0 left-0 right-0 z-40 flex flex-col justify-end pb-8 px-6 md:px-12 bg-light-bg dark:bg-dark-bg transition-all duration-300 shadow-sm border-b border-light-border/10 dark:border-dark-border/10"
                    style={{ height: `${titleHeight}vh` }}                >
                    <span className="text-primary font-mono text-xs uppercase tracking-widest block mb-4">Domaines d'intervention</span>
                    <h3 className="font-museo text-5xl md:text-8xl text-light-text dark:text-dark-text transition-colors leading-none">EXPERTISES</h3>
                </div>

                {/* B. LA STACK */}
                <div className="relative z-10 pb-20">
                    <ScrollStack headerHeight={titleHeight} />
                </div>

            </div>

            {/* PORTFOLIO PREVIEW */}
            <div id="portfolio" ></div>
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

            {/* RESOURCES PREVIEW */}
            <div id="ressources" >
                <ResourcesPreview />
            </div>

            {/* CONTACT FORM SECTION */}
            <div id="contact" className="py-32 px-6 md:px-12 bg-light-surface dark:bg-dark-surface transition-colors duration-500 relative z-30">
                <div className="max-w-4xl mx-auto">

                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <span className="text-primary font-mono text-xs uppercase tracking-widest block mb-4">Start Now</span>
                        <h2 className="font-museo text-5xl md:text-7xl text-light-text dark:text-dark-text mb-6">PARLEZ-NOUS DE <br />VOTRE PROJET</h2>
                        <p className="text-light-muted dark:text-dark-muted text-lg font-light">
                            Une idée ? Un besoin de clarté ? Remplissez ce formulaire et construisons votre singularité.
                        </p>
                    </div>

                    {/* Formulaire */}
                    <div className="bg-light-bg dark:bg-dark-bg p-8 md:p-12 rounded-3xl border border-light-border dark:border-dark-border shadow-2xl relative overflow-hidden">

                        {formStatus === 'SUCCESS' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-20"
                            >
                                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Send size={32} className="text-black ml-1" />
                                </div>
                                <h3 className="font-museo text-3xl mb-2 text-light-text dark:text-dark-text">Message Reçu</h3>
                                <p className="opacity-60 mb-8">Nous revenons vers vous sous 24h.</p>
                                <button onClick={() => setFormStatus('IDLE')} className="text-xs font-bold uppercase tracking-widest border-b border-primary pb-1 hover:text-primary transition-colors">
                                    Envoyer un autre message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleContactSubmit} className="space-y-8 relative z-10">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono uppercase tracking-widest opacity-50 ml-1">Nom</label>
                                        <input
                                            required
                                            name="name"
                                            type="text"
                                            placeholder="Votre nom"
                                            className="w-full bg-transparent border-b border-light-border dark:border-dark-border px-4 py-4 focus:outline-none focus:border-primary focus:bg-light-surface/50 dark:focus:bg-dark-surface/50 transition-all text-lg"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono uppercase tracking-widest opacity-50 ml-1">Email</label>
                                        <input
                                            required
                                            name="email"
                                            type="email"
                                            placeholder="votre@email.com"
                                            className="w-full bg-transparent border-b border-light-border dark:border-dark-border px-4 py-4 focus:outline-none focus:border-primary focus:bg-light-surface/50 dark:focus:bg-dark-surface/50 transition-all text-lg"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-mono uppercase tracking-widest opacity-50 ml-1">Message</label>
                                    <textarea
                                        required
                                        name="message"
                                        rows={4}
                                        placeholder="Décrivez votre besoin..."
                                        className="w-full bg-transparent border-b border-light-border dark:border-dark-border px-4 py-4 focus:outline-none focus:border-primary focus:bg-light-surface/50 dark:focus:bg-dark-surface/50 transition-all text-lg resize-none"
                                    ></textarea>
                                </div>

                                <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-6">
                                    <button
                                        type="submit"
                                        disabled={formStatus === 'SENDING'}
                                        className="w-full md:w-auto bg-primary text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                    >
                                        {formStatus === 'SENDING' ? 'Envoi...' : <>Envoyer <ArrowRight size={18} /></>}
                                    </button>

                                    {formStatus === 'ERROR' && <p className="text-red-500 text-xs font-mono">Erreur lors de l'envoi. Réessayez.</p>}
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Email direct en bas */}
                    <div className="mt-12 text-center">
                        <p className="text-light-muted dark:text-dark-muted font-light">
                            Ou écrivez nous directement à <br className="md:hidden" />
                            <a href="mailto:contact@bobenvy.com" className="text-light-text dark:text-dark-text font-bold hover:text-primary transition-colors ml-1 border-b border-transparent hover:border-primary">
                                contact@bobenvy.com
                            </a>
                        </p>
                    </div>

                </div>
            </div>

            <footer className="bg-light-bg dark:bg-dark-bg py-12 px-6 flex justify-between items-end border-t border-light-border dark:border-dark-border text-xs font-mono text-light-muted dark:text-dark-muted uppercase relative z-30 transition-colors duration-500">
                <div>© 2026 Bobenvy Strategy.</div>
                <div className="flex gap-4"><a href="#" className="hover:text-light-text dark:hover:text-white">LinkedIn</a><a href="#" className="hover:text-light-text dark:hover:text-white">Instagram</a></div>
            </footer>
        </div>
    );
};

export default HomePage;