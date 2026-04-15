import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getProjects, Project, urlFor } from '../lib/sanity';
import Navbar from '../components/Navbar';

const PortfolioPage = () => {
    const { t, i18n } = useTranslation();
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        getProjects(i18n.language).then(setProjects).catch(console.error);
    }, [i18n.language]);

    return (
        <div className="bg-light-bg dark:bg-dark-bg min-h-screen text-light-text dark:text-dark-text transition-colors duration-500">
            <Navbar />

            <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-20">

                <div className="mb-20">
                    <Link to="/" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-primary mb-8 transition-colors">
                        <ArrowLeft size={16} /> {t('portfolioPage.back_home')}
                    </Link>
                    <h1 className="font-museo text-5xl md:text-8xl mb-6">{t('portfolioPage.title')}</h1>
                    <p className="text-xl font-light opacity-70 max-w-2xl">
                        {t('portfolioPage.description')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-20">
                    {projects.map((project, i) => (
                        <Link to={`/portfolio/${project.slug}`} key={project._id} className="block">
                            <motion.div
                                key={project._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="relative aspect-video overflow-hidden rounded-2xl mb-6 bg-light-surface dark:bg-dark-surface">
                                    {project.mainImage && (
                                        <img
                                            src={urlFor(project.mainImage).width(800).url()}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-3">
                                    {project.tags?.map((tag, idx) => (
                                        <span key={idx} className="px-2 py-1 border border-light-border dark:border-dark-border rounded-full text-[10px] font-mono uppercase opacity-60">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <h2 className="font-museo text-3xl md:text-4xl group-hover:text-primary transition-colors">{project.title}</h2>
                                
                                <div className="flex items-center gap-3 mt-2">
                                    <p className="font-mono text-xs uppercase tracking-widest opacity-60">
                                        {project.subtitle}
                                    </p>
                                    
                                    {project.themeColors && project.themeColors.length > 0 && (
                                        <div className="flex items-center gap-1.5 border-l border-light-border dark:border-dark-border pl-3">
                                            {project.themeColors.slice(0, 3).map((color, idx) => (
                                                <span 
                                                    key={idx} 
                                                    className="w-3 h-3 rounded-full border border-light-border dark:border-dark-border shadow-sm" 
                                                    style={{ backgroundColor: color }}
                                                />
                                            ))}
                                            {project.themeColors.length > 3 && (
                                                <span className="font-mono text-[10px] opacity-50 ml-0.5">...</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default PortfolioPage;