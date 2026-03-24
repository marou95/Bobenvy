import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, Zap, ShieldCheck, Fingerprint, ChevronDown } from 'lucide-react';
import { PopupModal } from 'react-calendly';

// --- DATA ---
const TABS = [
    {
        id: 'history',
        label: 'Notre Histoire',
        subtitle: "2 générations, 1 vision",
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
                    <p className="font-vibes text-3xl text-primary mb-2">Notre Ambition</p>
                    <p className="italic">"Créer un lien solide et durable entre votre marque et vos clients."</p>
                </div>
            </div>
        )
    },
    {
        id: 'values',
        label: 'Nos Valeurs',
        subtitle: "Ce qui nous guide",
        content: (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                    { icon: Heart, title: "Empathie", txt: "Pour rester à votre écoute." },
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
        id: 'mission',
        label: 'Notre Mission',
        subtitle: "Un accompagnement efficace sur vos problématique stratégique et marketing",
        subtitleColor: "text-primary",
        content: (
            <div className="space-y-6">
                <div className="space-y-4">
                    {[
                        "Stratégie de marque et positionnement",
                        "Identité visuelle et direction créative",
                        "Marketing digital, social media et campagnes",
                        "Production de contenu (photo, vidéo, rédaction, storytelling)",
                        "Expériences en ligne et hors ligne qui marquent les esprits"
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <div className="min-w-[6px] h-[6px] rounded-full bg-primary mt-2"></div>
                            <span className="text-lg font-light opacity-90">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        )
    },
    {
        id: 'why',
        label: 'Pourquoi Bobenvy ?',
        subtitle: "L'approche business-first",
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
                            <div className="min-w-[6px] h-[6px] rounded-full bg-secondary mt-2"></div>
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
        label: 'Notre Approche Stratégique',
        subtitle: "Vision stratégique et expertise opérationnelle",
        content: (
            <div className="space-y-6">
                <div className="grid gap-4">
                    <div className="border-l-2 border-primary pl-4">
                        <h4 className="font-bold text-xl text-primary mb-1">Clarifier</h4>
                        <p className="opacity-80">Comprendre votre marché avant de chercher la performance.</p>
                    </div>
                    <div className="border-l-2 border-primary pl-4">
                        <h4 className="font-bold text-xl text-primary mb-1">Décider</h4>
                        <p className="opacity-80">Une action bien pensée vaut mieux que dix actions mal alignées.</p>
                    </div>
                    <div className="border-l-2 border-primary pl-4">
                        <h4 className="font-bold text-xl text-primary mb-1">Aligner</h4>
                        <p className="opacity-80">La cohérence comme levier de performance et avantage concurrentiel</p>
                    </div>
                    <div className="border-l-2 border-primary pl-4">
                        <h4 className="font-bold text-xl text-primary mb-1">Durer</h4>
                        <p className="opacity-80">Installer une croissance durable plutôt qu'un buzz éphémère.</p>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'methodology',
        label: 'Notre Méthodologie',
        subtitle: "Une méthodologie claire et efficace",
        subtitleColor: "text-primary",
        content: (
            <div className="space-y-6">
                <div className="grid gap-4">
                    {[
                        { title: "Analyser", desc: "Audit, compréhension du marché et des enjeux." },
                        { title: "Structurer", desc: "Définition de la stratégie et des priorités." },
                        { title: "Activer", desc: "Déploiement des leviers marketing et communication." },
                        { title: "Optimiser", desc: "Analyse des performances et amélioration continue." }
                    ].map((item, i) => (
                        <div key={i} className="border-l-2 border-primary pl-4">
                            <h4 className="font-bold text-xl text-primary mb-1">{item.title}</h4>
                            <p className="opacity-80">{item.desc}</p>
                        </div>
                    ))}
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

            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* INTRO HEADER */}
                <div className="mb-12 md:mb-20 grid gap-8 md:gap-12 items-end">
                    <div>
                        <span className="text-primary font-vibes text-4xl block mb-4">À Propos</span>
                        <h2 className="font-museo text-4xl md:text-6xl leading-[1.1] text-light-text dark:text-dark-text">
                            BOBENVY <br />
                            <span className="italic opacity-60">une approche rigoureuse et profondément humaine</span>
                        </h2>
                    </div>
                    <div>
                        <p className="text-lg md:text-xl font-light text-light-muted dark:text-dark-muted leading-relaxed">
                            Nous accompagnons les dirigeants dans la structuration de leur stratégie et la révélation de leur singularité.
                            <strong className="block mt-2 font-normal text-light-text dark:text-dark-text">Notre approche personnalisée et sur-mesure, et notre accompagnement dans vos prises de décisions stratégiques et leur mise en œuvre opérationnelle, vous permettront d’atteindre vos objectifs et d’accroître votre notoriété.</strong>
                        </p>
                    </div>
                </div>

                {/* --- VERSION MOBILE : ACCORDÉON --- */}
                <div className="lg:hidden flex flex-col gap-4 border-t border-light-border dark:border-dark-border pt-8">
                    {TABS.map((tab, index) => (
                        <div
                            key={`mobile-${tab.id}`}
                            className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${activeTab === index ? 'border-secondary bg-light-surface/50 dark:bg-dark-surface/50' : 'border-light-border dark:border-dark-border bg-transparent'}`}
                        >
                            <button
                                onClick={() => setActiveTab(activeTab === index ? -1 : index)}
                                className="w-full flex justify-between items-center p-6 text-left"
                            >
                                <div className="flex flex-col">
                                    <span className="font-sans font-semibold text-[10px] uppercase tracking-widest text-secondary mb-1">0{index + 1}</span>
                                    <span className="font-museo text-2xl text-light-text dark:text-dark-text">{tab.label}</span>
                                </div>
                                <motion.div animate={{ rotate: activeTab === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                    <ChevronDown size={24} className="text-secondary" />
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
                                            <span className={`font-vibes text-3xl mb-6 block mt-4  text-secondary`}>
                                                {tab.subtitle}
                                            </span>
                                            <div className="text-light-text dark:text-dark-text mb-8">
                                                {tab.content}
                                            </div>
                                            <button
                                                onClick={() => setIsOpen(true)}
                                                className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-secondary transition-colors cursor-pointer"
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
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"
                                    />
                                )}
                                <span className={`font-sans font-semibold text-[10px] uppercase tracking-widest mb-1 block transition-colors ${activeTab === index ? 'text-secondary' : 'text-light-muted dark:text-dark-muted'}`}>
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
                            {activeTab >= 0 && (
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="h-full flex flex-col justify-center p-12 rounded-3xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full blur-[150px] opacity-10 pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                                    <div className="relative z-10">
                                        <span className={`font-vibes text-4xl mb-6 block text-secondary`}>
                                            {TABS[activeTab].subtitle}
                                        </span>
                                        <div className="text-light-text dark:text-dark-text">
                                            {TABS[activeTab].content}
                                        </div>
                                        <div className="mt-12 pt-8 border-t border-light-border/20 dark:border-dark-border/20 flex gap-6">
                                            <button
                                                onClick={() => setIsOpen(true)}
                                                className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-secondary transition-colors cursor-pointer"
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