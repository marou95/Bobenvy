import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

const services = [
    {
        id: 1,
        title: "Stratégie & Conseil",
        subtitle: "ANALYSER & STRUCTURER",
        desc: "Nous ne devinons pas, nous analysons. Audit complet, business plan et feuille de route pour prioriser vos actions.",
        tags: ["Audit", "Business Plan", "Workshops"],
        color: "#CFB586", // Or
    },
    {
        id: 2,
        title: "Identité de Marque",
        subtitle: "RÉVÉLER & INCARNER",
        desc: "Votre singularité est votre meilleur atout. Création de plateforme de marque, naming, logo et territoire visuel.",
        tags: ["Branding", "Logo", "DA"],
        color: "#EAEAE5", // Blanc
    },
    {
        id: 3,
        title: "Digital & Performance",
        subtitle: "ACTIVER & CONVERTIR",
        desc: "Des dispositifs digitaux orientés ROI. Site web, SEO/SEA et campagnes d'acquisition pour transformer votre visibilité.",
        tags: ["Site Web", "SEO / SEA", "Lead Gen"],
        color: "#CFB586",
    },
    {
        id: 4,
        title: "Communication 360",
        subtitle: "DÉPLOYER & FÉDÉRER",
        desc: "Orchestrer votre prise de parole. Social media, influence et relations presse pour créer un lien durable.",
        tags: ["Social Media", "Influence", "PR"],
        color: "#EAEAE5",
    },
];

const ServicesStack = () => {
    return (
        <section id="services" className="relative py-24 bg-[#050505]">

            {/* Titre de la section */}
            <div className="px-6 md:px-24 mb-12">
                <span className="text-[#CFB586] font-mono text-xs uppercase tracking-widest block mb-4">
                    Domaines d'intervention
                </span>
                <h3 className="font-museo text-5xl md:text-7xl text-white">
                    NOTRE EXPERTISE
                </h3>
            </div>

            {/* Le composant Stack */}
            <div className="px-4 md:px-12">
                <ScrollStack>
                    {services.map((service, index) => (
                        <ScrollStackItem key={service.id}>

                            {/* Contenu de la carte */}
                            <div className="flex flex-col h-full justify-between">
                                {/* Header */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span style={{ color: service.color }} className="font-mono text-xs uppercase tracking-[0.3em] mb-2 block">
                                            {service.subtitle}
                                        </span>
                                        <h2 className="font-museo text-3xl md:text-5xl text-white mt-2">
                                            {service.title}
                                        </h2>
                                    </div>
                                    <span className="font-mono text-white/20 text-xl border border-white/10 rounded-full w-12 h-12 flex items-center justify-center">
                                        0{index + 1}
                                    </span>
                                </div>

                                {/* Description */}
                                <div className="py-8">
                                    <p className="text-lg md:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl">
                                        {service.desc}
                                    </p>
                                </div>

                                {/* Footer / Tags */}
                                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                                    <div className="flex flex-wrap gap-2">
                                        {service.tags.map((tag) => (
                                            <span key={tag} className="px-3 py-1 rounded-full border border-white/10 text-xs text-gray-500 font-mono uppercase">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <Link to={`/services/${service.id}`} className="flex items-center gap-2 text-white hover:text-[#CFB586] transition-colors uppercase tracking-widest text-xs font-bold group">
                                        En savoir plus <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16} />
                                    </Link>
                                </div>
                            </div>

                            {/* Glow décoratif */}
                            <div
                                className="absolute -top-[20%] -right-[20%] w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none opacity-10 mix-blend-screen"
                                style={{ backgroundColor: service.color }}
                            />
                        </ScrollStackItem>
                    ))}
                </ScrollStack>
            </div>
        </section>
    );
};

export default ServicesStack;