import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getRecentProjects, Project, urlFor } from '../lib/sanity';

const PortfolioPreview = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getRecentProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Erreur lors du chargement des projets.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-32 px-6 md:px-12 bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="animate-pulse">
            <div className="h-4 w-24 bg-light-border dark:bg-dark-border mb-4 rounded"></div>
            <div className="h-12 w-64 bg-light-border dark:bg-dark-border rounded"></div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[4/5] bg-light-border dark:bg-dark-border rounded-xl mb-6"></div>
              <div className="h-8 w-3/4 bg-light-border dark:bg-dark-border rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-light-border dark:bg-dark-border rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 px-6 md:px-12 bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16">
        <div>
          <span className="text-primary font-mono text-xs uppercase tracking-widest block mb-4">Selected Works</span>
          <h2 className="font-museo text-4xl md:text-6xl text-light-text dark:text-dark-text">RÉALISATIONS</h2>
        </div>
        <Link to="/portfolio" className="hidden md:flex items-center gap-2 group text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors mt-8 md:mt-0">
          Tous les projets <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {error ? (
          <div className="col-span-3 text-center py-12">
            <p className="text-red-500 font-mono text-sm">{error}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="col-span-3 text-center py-12">
            <p className="text-light-text dark:text-dark-text opacity-60 font-mono text-sm">Aucun projet trouvé pour le moment.</p>
          </div>
        ) : (
          projects.map((project, i) => (
            <Link to={`/portfolio/${project.slug.current}`} key={project._id}>
            <motion.div 
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-[4/5] rounded-xl mb-6 bg-light-surface dark:bg-dark-surface">
                {project.mainImage && (
                  <img 
                    src={urlFor(project.mainImage).width(600).height(750).auto('format').url()} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
              </div>

              {/* Texte */}
              <div className="flex justify-between items-start border-t border-light-border dark:border-dark-border pt-4">
                <div>
                  <h3 className="font-museo text-2xl md:text-3xl mb-1 text-light-text dark:text-dark-text">{project.title}</h3>
                  <p className="font-mono text-xs uppercase tracking-widest opacity-60" style={{ color: project.themeColor || '#CFB586' }}>
                    {project.subtitle}
                  </p>
                </div>
                <span className="font-mono text-xs opacity-40 text-light-text dark:text-dark-text">
                  {(i + 1).toString().padStart(2, '0')}
                </span>
              </div>
            </motion.div>
          </Link>
          ))
        )}
      </div>

      <div className="mt-12 md:hidden flex justify-center">
        <Link to="/portfolio" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest border border-light-border dark:border-dark-border text-light-text dark:text-dark-text px-6 py-3 rounded-full hover:bg-primary hover:text-black transition-colors">
          Voir tout le portfolio
        </Link>
      </div>
    </section>
  );
};

export default PortfolioPreview;
