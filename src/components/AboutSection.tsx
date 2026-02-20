import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, Zap, ShieldCheck, Eye, Users, Fingerprint, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PopupModal } from 'react-calendly';

// --- DATA ---
const TABS = [
    {
        id: 'history',
        label: 'Notre Histoire',
        subtitle: "2 GÉNÉRATIONS, 1 VISION",
        content: (
            <div className="space-y-6">
                <h3 className="font-museo text-3xl md:text-4xl">Une alliance entre expérience et créativité.</h3>
                <p className="text-lg font-light leading-relaxed opacity-80">
                    Bobenvy est une entreprise familiale : deux fondatrices, deux générations différentes mais une vision commune.
                </p>
                <p className="text-lg font-light leading-relaxed opacity-80">
                    Entre la sagesse de l'expérience et l'audace de la créativité, elles ont créé Bobenvy pour donner naissance à leurs inspirations et partager leur savoir-faire.
                </p>
                <div className="p-6 border border-light-border dark:border-dark-border rounded-xl bg-light-surface/50 dark:bg-dark-surface/50 mt-4">
                    <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">Notre Ambition</p>
                    <p className="italic">"Créer un lien solide et durable entre votre marque et vos clients."</p>
                </div>
            </div>
        )
    },
    {
        id: 'values',
        label: 'Nos Valeurs',
        subtitle: "CE QUI NOUS GUIDE",
        content: (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                    { icon: Heart, title: "Empathie", txt: "Pour rester à l’écoute et répondre à vos besoins spécifiques." },
                    { icon: Zap, title: "Créativité", txt: "Pour bâtir des projets inspirants et différenciants." },
                    { icon: ShieldCheck, title: "Exigence", txt: "Une rigueur absolue dans l’exécution de nos projets." },
                    { icon: Fingerprint, title: "Authenticité", txt: "Des stratégies claires et des messages honnêtes." },
                ].map((val, i) => (
                    <div key={i} className="p-4 border border-light-border dark:border-dark-border rounded-lg hover:border-primary transition-colors group">
                        <val.icon className="text-primary mb-3 group-hover:scale-110 transition-transform" size={24} />
                        <h4 className="font-bold text-lg mb-1">{val.title}</h4>
                        <p className="text-sm opacity-70 leading-tight">{val.txt}</p>
                    </div>
                ))}
            </div>
        )
    },
    {
        id: 'why',
        label: 'Pourquoi Bobenvy ?',
        subtitle: "L'APPROCHE BUSINESS-FIRST",
        content: (
            <div className="space-y-6">
                <div className="space-y-4">
                    {[
                        "Une vision globale : de la stratégie à l’exécution.",
                        "Des recommandations claires, concrètes et actionnables.",
                        "Un accompagnement humain, exigeant et transparent.",
                        "De la flexibilité pour des solutions sur mesure."
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <div className="min-w-[6px] h-[6px] rounded-full bg-primary mt-2"></div>
                            <span className="text-lg font-light opacity-90">{item}</span>
                        </div>
                    ))}
                </div>
                <div className="pt-4">
                    <p className="font-museo text-2xl">"Nous ne cherchons pas à faire plus. <br />Nous cherchons à faire <span className="text-primary italic">mieux</span>."</p>
                </div>
            </div>
        )
    },
    {
        id: 'strategy',
        label: 'Approche Stratégique',
        subtitle: "COMPRENDRE AVANT D'AGIR",
        content: (
            <div className="space-y-6">
                <div className="grid gap-4">
                    <div className="border-l-2 border-primary pl-4">
                        <h4 className="font-bold uppercase text-xs tracking-widest mb-1">Clarifier</h4>
                        <p className="opacity-80">Comprendre votre marché avant de chercher la performance.</p>
                    </div>
                    <div className="border-l-2 border-primary pl-4">
                        <h4 className="font-bold uppercase text-xs tracking-widest mb-1">Décider</h4>
                        <p className="opacity-80">Une action bien pensée vaut mieux que dix actions mal alignées.</p>
                    </div>
                    <div className="border-l-2 border-primary pl-4">
                        <h4 className="font-bold uppercase text-xs tracking-widest mb-1">Durer</h4>
                        <p className="opacity-80">Installer une croissance durable plutôt qu'un buzz éphémère.</p>
                    </div>
                </div>
            </div>
        )
    }
];

const AboutSection = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section id="about" className="py-20 md:py-32 bg-light-bg dark:bg-dark-bg transition-colors duration-500 overflow-hidden relative z-10">

            {/* TICKER (Bande défilante problèmes) */}
            <div className="w-full bg-light-surface dark:bg-dark-surface py-4 border-y border-light-border dark:border-dark-border mb-20 overflow-hidden relative rotate-[-1deg] scale-105">
                <motion.div
                    className="flex whitespace-nowrap gap-12 md:gap-24 text-light-muted dark:text-dark-muted font-mono text-sm uppercase tracking-widest"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    {[...Array(4)].map((_, i) => (
                        <React.Fragment key={i}>
                            <span>Manque de différenciation ?</span>
                            <span className="text-primary">•</span>
                            <span>ROI Flou ?</span>
                            <span className="text-primary">•</span>
                            <span>Actions dispersées ?</span>
                            <span className="text-primary">•</span>
                            <span>Visibilité faible ?</span>
                            <span className="text-primary">•</span>
                        </React.Fragment>
                    ))}
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* INTRO HEADER */}
                <div className="mb-12 md:mb-20 grid gap-8 md:gap-12 items-end">
                    <div>
                        <span className="text-primary font-mono text-xs uppercase tracking-widest block mb-4">À Propos</span>
                        <h2 className="font-museo text-4xl md:text-6xl leading-[1.1] text-light-text dark:text-dark-text">
                            Rigueur stratégique. <br />
                            <span className="italic opacity-60">Approche humaine.</span>
                        </h2>
                    </div>
                    <div>
                        <p className="text-lg md:text-xl font-light text-light-muted dark:text-dark-muted leading-relaxed">
                            Nous accompagnons les dirigeants dans la structuration de leur stratégie et la révélation de leur singularité.
                            <strong className="block mt-2 font-normal text-light-text dark:text-dark-text">Bobenvy structure le chaos pour en faire de la croissance.</strong>
                        </p>
                    </div>
                </div>

                {/* --- VERSION MOBILE : ACCORDÉON --- */}
                <div className="lg:hidden flex flex-col gap-4 border-t border-light-border dark:border-dark-border pt-8">
                    {TABS.map((tab, index) => (
                        <div 
                            key={`mobile-${tab.id}`} 
                            className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${activeTab === index ? 'border-primary bg-light-surface/50 dark:bg-dark-surface/50' : 'border-light-border dark:border-dark-border bg-transparent'}`}
                        >
                            <button
                                onClick={() => setActiveTab(activeTab === index ? -1 : index)}
                                className="w-full flex justify-between items-center p-6 text-left"
                            >
                                <div className="flex flex-col">
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary mb-1">0{index + 1}</span>
                                    <span className="font-museo text-2xl text-light-text dark:text-dark-text">{tab.label}</span>
                                </div>
                                <motion.div animate={{ rotate: activeTab === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                    <ChevronDown size={24} className="text-primary" />
                                </motion.div>
                            </button>
                            
                            <AnimatePresence>
                                {activeTab === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 border-t border-light-border/10 dark:border-dark-border/10 mt-2">
                                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] mb-6 block mt-4">
                                                {tab.subtitle}
                                            </span>
                                            <div className="text-light-text dark:text-dark-text mb-8">
                                                {tab.content}
                                            </div>
                                            <button
                                                onClick={() => setIsOpen(true)}
                                                className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors cursor-pointer"
                                            >
                                                Prendre rendez-vous <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* --- VERSION DESKTOP : ONGLETS --- */}
                <div className="hidden lg:grid lg:grid-cols-12 gap-12 border-t border-light-border dark:border-dark-border pt-12">
                    
                    {/* MENU GAUCHE */}
                    <div className="lg:col-span-4 flex flex-col gap-2">
                        {TABS.map((tab, index) => (
                            <button
                                key={`desktop-${tab.id}`}
                                onClick={() => setActiveTab(index)}
                                className={`text-left py-6 px-6 border-b border-light-border/20 dark:border-dark-border/20 transition-all duration-300 group relative overflow-hidden rounded-lg ${activeTab === index
                                        ? 'bg-light-surface dark:bg-dark-surface'
                                        : 'hover:bg-light-surface/50 dark:hover:bg-dark-surface/50'
                                    }`}
                            >
                                {activeTab === index && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                                    />
                                )}
                                <span className={`font-mono text-[10px] uppercase tracking-widest mb-1 block transition-colors ${activeTab === index ? 'text-primary' : 'text-light-muted dark:text-dark-muted'}`}>
                                    0{index + 1}
                                </span>
                                <span className={`font-museo text-2xl transition-colors ${activeTab === index ? 'text-light-text dark:text-dark-text' : 'text-light-muted dark:text-dark-muted opacity-50 group-hover:opacity-100'}`}>
                                    {tab.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* CONTENU DROITE */}
                    <div className="lg:col-span-8 relative min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {/* Sur desktop, on s'assure qu'un onglet est toujours ouvert (pas de -1) */}
                            {activeTab >= 0 && (
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="h-full flex flex-col justify-center p-12 rounded-3xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[150px] opacity-10 pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                                    <div className="relative z-10">
                                        <span className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-6 block">
                                            {TABS[activeTab].subtitle}
                                        </span>
                                        <div className="text-light-text dark:text-dark-text">
                                            {TABS[activeTab].content}
                                        </div>
                                        <div className="mt-12 pt-8 border-t border-light-border/20 dark:border-dark-border/20 flex gap-6">
                                            <button
                                                onClick={() => setIsOpen(true)}
                                                className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors cursor-pointer"
                                            >
                                                Prendre rendez-vous <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <PopupModal
                    url="https://calendly.com/contact-bobenvy/30min"
                    onModalClose={() => setIsOpen(false)}
                    open={isOpen}
                    rootElement={document.getElementById("root")!}
                />
            </div>
        </section>
    );
};

export default AboutSection;