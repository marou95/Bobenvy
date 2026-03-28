import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Handshake, Zap, ShieldCheck, Fingerprint, ChevronDown } from 'lucide-react';
import { PopupModal } from 'react-calendly';
import { useTranslation } from 'react-i18next';

const AboutSection = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    // --- DATA --- (Déplacé à l'intérieur pour accéder à t)
    const TABS = [
        {
            id: 'history',
            label: t('about.tabs.history.label'),
            subtitle: t('about.tabs.history.subtitle'),
            content: (
                <div className="space-y-6">
                    <h3 className="font-museo text-3xl md:text-4xl">{t('about.tabs.history.title')}</h3>
                    <p className="text-lg font-light leading-relaxed opacity-80">
                        {t('about.tabs.history.p1')}
                    </p>
                    <p className="text-lg font-light leading-relaxed opacity-80">
                        {t('about.tabs.history.p2')}
                    </p>
                    <div className="p-6 border border-light-border dark:border-dark-border rounded-xl bg-light-surface/50 dark:bg-dark-surface/50 mt-4">
                        <p className="font-vibes text-3xl text-primary mb-2">{t('about.tabs.history.ambition')}</p>
                        <p className="italic">{t('about.tabs.history.quote')}</p>
                    </div>
                </div>
            )
        },
        {
            id: 'values',
            label: t('about.tabs.values.label'),
            subtitle: t('about.tabs.values.subtitle'),
            content: (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { icon: Handshake, id: 'v1' },
                        { icon: Zap, id: 'v2' },
                        { icon: ShieldCheck, id: 'v3' },
                        { icon: Fingerprint, id: 'v4' },
                    ].map((val, i) => (
                        <div key={i} className="p-4 border border-light-border dark:border-dark-border rounded-lg hover:border-primary transition-colors group">
                            <val.icon className="text-primary mb-3 group-hover:scale-110 transition-transform" size={24} />
                            <h4 className="font-bold text-lg mb-1">{t(`about.tabs.values.items.${val.id}.title`)}</h4>
                            <p className="text-sm opacity-70 leading-tight">{t(`about.tabs.values.items.${val.id}.txt`)}</p>
                        </div>
                    ))}
                </div>
            )
        },
        {
            id: 'mission',
            label: t('about.tabs.mission.label'),
            subtitle: t('about.tabs.mission.subtitle'),
            content: (
                <div className="space-y-6">
                    <div className="space-y-4">
                        {(t('about.tabs.mission.items', { returnObjects: true }) as string[]).map((item, i) => (
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
            label: t('about.tabs.why.label'),
            subtitle: t('about.tabs.why.subtitle'),
            content: (
                <div className="space-y-6">
                    <div className="space-y-4">
                        {(t('about.tabs.why.items', { returnObjects: true }) as string[]).map((item, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="min-w-[6px] h-[6px] rounded-full bg-secondary mt-2"></div>
                                <span className="text-lg font-light opacity-90">{item}</span>
                            </div>
                        ))}
                    </div>
                    <div className="pt-4">
                        <p className="font-museo text-2xl">
                            "{t('about.tabs.why.quote1')} <br />
                            {t('about.tabs.why.quote2')} <span className="text-primary italic">{t('about.tabs.why.quote3')}</span>."
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 'strategy',
            label: t('about.tabs.strategy.label'),
            subtitle: t('about.tabs.strategy.subtitle'),
            content: (
                <div className="space-y-6">
                    <div className="grid gap-4">
                        {['s1', 's2', 's3', 's4'].map((s, i) => (
                            <div key={i} className="border-l-2 border-primary pl-4">
                                <h4 className="font-bold text-xl text-primary mb-1">{t(`about.tabs.strategy.items.${s}.title`)}</h4>
                                <p className="opacity-80">{t(`about.tabs.strategy.items.${s}.txt`)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )
        },
        {
            id: 'methodology',
            label: t('about.tabs.methodology.label'),
            subtitle: t('about.tabs.methodology.subtitle'),
            content: (
                <div className="space-y-6">
                    <div className="grid gap-4">
                        {['m1', 'm2', 'm3', 'm4'].map((m, i) => (
                            <div key={i} className="border-l-2 border-primary pl-4">
                                <h4 className="font-bold text-xl text-primary mb-1">{t(`about.tabs.methodology.items.${m}.title`)}</h4>
                                <p className="opacity-80">{t(`about.tabs.methodology.items.${m}.txt`)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    ];

    return (
        <section id="about" className="py-20 md:py-32 bg-light-bg dark:bg-dark-bg transition-colors duration-500 overflow-hidden relative z-10">

            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* INTRO HEADER */}
                <div className="mb-12 md:mb-20 grid gap-8 md:gap-12 items-end">
                    <div>
                        <span className="text-primary font-vibes text-4xl block mb-4">{t('about.badge')}</span>
                        <h2 className="font-museo text-4xl md:text-6xl leading-[1.1] text-light-text dark:text-dark-text">
                            {t('about.title')} <br />
                            <span className="italic opacity-60">{t('about.subtitle')}</span>
                        </h2>
                    </div>
                    <div>
                        <p className="text-lg md:text-xl font-light text-light-muted dark:text-dark-muted leading-relaxed">
                            {t('about.intro1')}
                            <strong className="block mt-2 font-normal text-light-text dark:text-dark-text">
                                {t('about.intro2')}
                            </strong>
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
                                            <span className={`font-vibes text-3xl mb-6 block mt-4 text-secondary`}>
                                                {tab.subtitle}
                                            </span>
                                            <div className="text-light-text dark:text-dark-text mb-8">
                                                {tab.content}
                                            </div>
                                            <button
                                                onClick={() => setIsOpen(true)}
                                                className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-secondary transition-colors cursor-pointer"
                                            >
                                                {t('about.cta')} <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
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
                                                {t('about.cta')} <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
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