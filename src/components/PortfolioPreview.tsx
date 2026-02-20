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

  // Logique d'asymétrie pour Desktop (Marges réduites pour rapprocher les projets)
  const getDesktopLayout = (index: number) => {
    const layouts = [
      "md:col-span-7 md:col-start-1 md:mt-0",     // Projet 1 : Grand à gauche
      "md:col-span-4 md:col-start-9 md:mt-16",    // Projet 2 : Petit à droite, légèrement descendu
      "md:col-span-8 md:col-start-2 md:mt-12",    // Projet 3 : Large, proche du précédent
      "md:col-span-5 md:col-start-7 md:-mt-16",   // Projet 4 : Remonte sur le précédent pour un effet de superposition
    ];
    return layouts[index % layouts.length];
  };

  // Logique de zigzag pour Mobile
  const getMobileLayout = (index: number) => {
    return index % 2 === 0 ? "w-[95%] mr-auto" : "w-[95%] ml-auto";
  };

  // Ratios d'images forcés en format Paysage (Landscape)
  const getAspectRatio = (index: number) => {
    const aspects = [
      "aspect-[4/3] md:aspect-[16/9]", // Format très large (Cinéma)
      "aspect-[3/2] md:aspect-[4/3]",  // Format horizontal standard
      "aspect-video",                  // 16:9 classique partout
      "aspect-[4/3] md:aspect-[3/2]"   // Format photo paysage
    ];
    return aspects[index % aspects.length];
  };

  if (loading) {
    return (
      <section className="py-24 px-6 md:px-12 bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="animate-pulse">
            <div className="h-4 w-24 bg-light-border dark:bg-dark-border mb-4 rounded"></div>
            <div className="h-12 w-64 bg-light-border dark:bg-dark-border rounded"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-8">
          {[1, 2, 3].map((i, index) => (
            <div key={i} className={`animate-pulse ${getMobileLayout(index)} ${getDesktopLayout(index)}`}>
              <div className={`${getAspectRatio(index)} bg-light-border dark:bg-dark-border rounded-xl mb-6`}></div>
              <div className="h-8 w-3/4 bg-light-border dark:bg-dark-border rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-light-border dark:bg-dark-border rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 md:px-12 bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border">
      
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24">
        <div>
          <span className="text-primary font-mono text-xs uppercase tracking-widest block mb-4">Selected Works</span>
          <h2 className="font-museo text-4xl md:text-6xl text-light-text dark:text-dark-text">RÉALISATIONS</h2>
        </div>
        <Link to="/portfolio" className="hidden md:flex items-center gap-2 group text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors mt-8 md:mt-0">
          Tous les projets <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
        </Link>
      </div>

      {/* Grille déstructurée resserrée */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-y-0 md:gap-x-8">
        {error ? (
          <div className="col-span-12 text-center py-12">
            <p className="text-red-500 font-mono text-sm">{error}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="col-span-12 text-center py-12">
            <p className="text-light-text dark:text-dark-text opacity-60 font-mono text-sm">Aucun projet trouvé pour le moment.</p>
          </div>
        ) : (
          projects.map((project, i) => (
            <Link 
              to={`/portfolio/${project.slug.current}`} 
              key={project._id}
              className={`block group ${getMobileLayout(i)} ${getDesktopLayout(i)}`}
            >
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full"
              >
                {/* Image Container forcée en format paysage */}
                <div className={`relative overflow-hidden rounded-xl mb-6 bg-light-surface dark:bg-dark-surface ${getAspectRatio(i)}`}>
                  {project.mainImage && (
                    <img 
                      src={urlFor(project.mainImage).width(1200).auto('format').url()} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Textes et Meta */}
                <div className="flex justify-between items-start border-t border-light-border dark:border-dark-border pt-6">
                  <div>
                    <h3 className="font-museo text-2xl md:text-4xl mb-2 text-light-text dark:text-dark-text group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-widest opacity-60" style={{ color: project.themeColor || '#CFB586' }}>
                      {project.subtitle}
                    </p>
                  </div>
                  <span className="font-mono text-sm md:text-base opacity-30 text-light-text dark:text-dark-text pt-1">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))
        )}
      </div>

      <div className="mt-16 md:hidden flex justify-center">
        <Link to="/portfolio" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest border border-light-border dark:border-dark-border text-light-text dark:text-dark-text px-8 py-4 rounded-full hover:bg-primary hover:text-black transition-colors">
          Voir tout le portfolio
        </Link>
      </div>
    </section>
  );
};

export default PortfolioPreview;