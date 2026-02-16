import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getRecentProjects, Project, urlFor } from '../lib/sanity';

const PortfolioPreview = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getRecentProjects().then(setProjects).catch(console.error);
  }, []);

if (projects.length === 0) {
      console.log("Aucune donnée");
  return (
    <div className="p-20 text-center border-2 border-red-500">
      <h2 className="text-2xl font-bold text-red-500">⚠️ Aucune donnée reçue de Sanity</h2>
      <p>Vérifie la console (F12) pour voir les erreurs rouges.</p>
    </div>
  );
}else{
      console.log("Données reçues:", projects);
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
        {projects.map((project, i) => (
          <motion.div 
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden aspect-[4/5] rounded-xl mb-6 bg-light-surface dark:bg-dark-surface">
                {project.mainImage && (
                    <img 
                        src={urlFor(project.mainImage).width(600).url()} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                <span className="font-mono text-xs opacity-40 text-light-text dark:text-dark-text">0{i+1}</span>
            </div>
          </motion.div>
        ))}
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