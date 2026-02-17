import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { getProjectBySlug, Project, urlFor } from '../lib/sanity';
import Navbar from '../components/Navbar';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      getProjectBySlug(slug).then((data) => {
        setProject(data);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) return <div className="h-screen bg-light-bg dark:bg-dark-bg" />;
  if (!project) return <div className="h-screen flex items-center justify-center">Projet introuvable</div>;

  // Configuration du rendu Rich Text pour Sanity
  const ptComponents = {
    block: {
      h3: ({children}: any) => <h3 className="text-2xl font-museo mt-8 mb-4">{children}</h3>,
      h4: ({children}: any) => <h4 className="text-xl font-bold mt-6 mb-3">{children}</h4>,
      normal: ({children}: any) => <p className="mb-4 opacity-80 leading-relaxed font-light">{children}</p>,
    },
    list: {
      bullet: ({children}: any) => <ul className="list-disc pl-5 mb-4 space-y-2 opacity-80">{children}</ul>,
      number: ({children}: any) => <ol className="list-decimal pl-5 mb-4 space-y-2 opacity-80">{children}</ol>,
    }
  };

  return (
    <div className="bg-light-bg dark:bg-dark-bg min-h-screen text-light-text dark:text-dark-text transition-colors duration-500">
      <Navbar />

      {/* HEADER HERO */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        {project.bgVideo ? (
             // Si vidéo dispo (depuis un fichier Sanity url)
             <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
                <source src={project.bgVideo.asset?.url} type="video/mp4" /> 
             </video>
        ) : (
             // Sinon Image principale
             project.mainImage && (
                <motion.img 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    src={urlFor(project.mainImage).width(1920).url()} 
                    className="absolute inset-0 w-full h-full object-cover"
                />
             )
        )}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10">
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 uppercase tracking-widest text-xs font-mono transition-colors">
                <ArrowLeft size={16}/> Retour Portfolio
            </Link>
            <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="font-museo text-5xl md:text-8xl text-white mb-2"
            >
                {project.title}
            </motion.h1>
            <p className="font-mono text-white/80 uppercase tracking-widest text-sm md:text-base border-l-2 pl-4" style={{ borderColor: project.themeColor || '#fff' }}>
                {project.subtitle}
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        
        {/* INFO GRID */}
        <div className="grid md:grid-cols-12 gap-12 mb-24 border-b border-light-border dark:border-dark-border pb-12">
            <div className="md:col-span-4 space-y-8">
                <div>
                    <span className="font-mono text-xs uppercase tracking-widest opacity-50 block mb-2">Expertises</span>
                    <div className="flex flex-wrap gap-2">
                        {project.tags?.map((tag, i) => (
                            <span key={i} className="px-2 py-1 border border-light-border dark:border-dark-border rounded text-xs uppercase font-bold">{tag}</span>
                        ))}
                    </div>
                </div>
                {project.themeColor && (
                    <div>
                         <span className="font-mono text-xs uppercase tracking-widest opacity-50 block mb-2">Code couleur</span>
                         <div className="flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: project.themeColor }}></div>
                             <span className="font-mono text-xs">{project.themeColor}</span>
                         </div>
                    </div>
                )}
            </div>

            <div className="md:col-span-8">
                <h2 className="font-museo text-3xl mb-6">Le Challenge</h2>
                <p className="text-xl font-light leading-relaxed opacity-90">
                    {project.challenge || "Pas de description du challenge disponible."}
                </p>
            </div>
        </div>

        {/* SOLUTION & GALERIE */}
        <div className="grid md:grid-cols-12 gap-12">
            {/* Colonne Contenu Riche */}
            <div className="md:col-span-5 order-2 md:order-1">
                <div className="sticky top-32">
                    <span className="text-primary font-mono text-xs uppercase tracking-widest mb-4 block">Notre réponse</span>
                    <div className="prose dark:prose-invert max-w-none">
                        {/* Affichage du Portable Text (Rich Text Sanity) */}
                        {project.solution && <PortableText value={project.solution} components={ptComponents} />}
                    </div>
                </div>
            </div>

            {/* Colonne Galerie Images */}
            <div className="md:col-span-7 order-1 md:order-2 space-y-8">
                {project.gallery?.map((img: any, i: number) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-xl overflow-hidden shadow-lg"
                    >
                        <img 
                            src={urlFor(img).width(1200).url()} 
                            alt={`Galerie ${project.title} ${i}`}
                            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </motion.div>
                ))}
            </div>
        </div>

      </div>

      {/* FOOTER NAV */}
      <div className="py-20 bg-light-surface dark:bg-dark-surface text-center">
         <h3 className="text-2xl font-museo mb-6">Prêt à lancer votre projet ?</h3>
         <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform">
            Discutons-en <ArrowUpRight />
         </Link>
      </div>

    </div>
  );
};

export default ProjectDetail;