import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getRecentProjects, Project, urlFor } from '../lib/sanity';
import i18n from '../services/i18n';

const PortfolioPreview = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getRecentProjects(i18n.language);
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(t('portfolioPreview.error_loading'));
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [i18n.language, t]);

  const EmptyStateCard = () => (
    <div className="flex-none w-[85vw] md:w-[450px] aspect-[4/3] rounded-xl border border-dashed border-light-border dark:border-dark-border flex flex-col items-center justify-center p-8 text-center bg-light-surface/30 dark:bg-dark-surface/30 snap-center">
      <span className="text-primary font-mono text-xs tracking-widest uppercase mb-4">{t('portfolioPreview.empty_badge')}</span>
      <p className="text-light-muted dark:text-dark-muted font-light leading-relaxed">
        {t('portfolioPreview.empty_text')}
      </p>
    </div>
  );

  if (loading) {
    return (
      <section className="py-24 pl-6 md:pl-12 bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 pr-6 md:pr-12">
          <div className="animate-pulse">
            <div className="h-4 w-24 bg-light-border dark:bg-dark-border mb-4 rounded"></div>
            <div className="h-12 w-64 bg-light-border dark:bg-dark-border rounded"></div>
          </div>
        </div>
        <div className="flex gap-6 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-none w-[85vw] md:w-[450px] animate-pulse">
              <div className="aspect-[4/3] bg-light-border dark:bg-dark-border rounded-xl mb-6"></div>
              <div className="h-8 w-3/4 bg-light-border dark:bg-dark-border rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-light-border dark:bg-dark-border rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 pl-6 md:pl-12 bg-light-bg dark:bg-dark-bg  border-light-border dark:border-dark-border overflow-hidden">

      <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 pr-6 md:pr-12">
        <div>
          <h2 className="font-museo text-4xl md:text-6xl text-light-text dark:text-dark-text">{t('portfolioPreview.title')}</h2>
        </div>
        <Link to="/portfolio" className="hidden md:flex items-center gap-2 group text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors mt-8 md:mt-0">
          {t('portfolioPreview.link_desktop')} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-6 md:pr-12">
        {error || projects.length === 0 ? (
          <EmptyStateCard />
        ) : (
          projects.map((project, i) => (
            <Link
              to={`/portfolio/${project.slug}`}
              key={project._id}
              className="flex-none w-[85vw] md:w-[450px] group snap-start"
            >
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full"
              >
                <div className="relative overflow-hidden rounded-xl mb-6 bg-light-surface dark:bg-dark-surface aspect-[4/3]">
                  {project.mainImage && (
                    <img
                      src={urlFor(project.mainImage).width(800).auto('format').url()}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="flex justify-between items-start pt-2">
                  <div>
                    <h3 className="font-museo text-2xl mb-1 text-light-text dark:text-dark-text group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs tracking-widest opacity-60" style={{ color: project.themeColor || '#CFB586' }}>
                      {project.subtitle}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))
        )}
      </div>

      <div className="mt-4 pr-6 md:pr-12 md:hidden flex justify-center">
        <Link to="/portfolio" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest border border-light-border dark:border-dark-border text-light-text dark:text-dark-text px-8 py-4 rounded-full hover:bg-primary hover:text-black transition-colors">
          {t('portfolioPreview.link_mobile')}
        </Link>
      </div>
    </section>
  );
};

export default PortfolioPreview;