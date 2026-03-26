import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getRecentPosts, Post } from '../lib/sanity';

const ResourcesPreview = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getRecentPosts().then(setPosts).catch(console.error);
  }, []);

  return (
    <section className="py-20 px-6 md:px-12 bg-light-surface dark:bg-dark-surface border-t border-light-border dark:border-dark-border transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
            <div>
                <span className="text-primary font-mono text-xs tracking-widest block mb-4">Veille & Stratégie</span>
                <h2 className="font-museo text-4xl text-light-text dark:text-dark-text">ACTUALITÉS</h2>
            </div>
            <Link to="/resources" className="hidden md:flex items-center gap-2 group text-sm font-bold uppercase tracking-widest text-light-text dark:text-dark-text hover:text-primary transition-colors">
                Tous les articles <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {posts.length === 0 ? (
                // CARTE DE REMPLACEMENT (FALLBACK)
                <div className="group block h-full">
                    <div className="h-full flex flex-col justify-between p-6 border border-light-border dark:border-dark-border rounded-xl bg-light-bg dark:bg-dark-bg transition-colors duration-300 opacity-60">
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <span className="px-3 py-1 rounded-full bg-light-surface dark:bg-dark-surface text-[10px] font-mono uppercase tracking-widest border border-light-border dark:border-dark-border text-light-text dark:text-dark-text">
                                    Info
                                </span>
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-light-text dark:text-dark-text">
                                Temporairement indisponible
                            </h3>
                            <p className="text-sm opacity-70 leading-relaxed text-light-text dark:text-dark-text">
                                Nos articles sont en cours d'actualisation. Revenez bientôt pour découvrir nos prochaines publications.
                            </p>
                        </div>
                        <div className="mt-6 pt-6 border-t border-light-border/50 dark:border-dark-border/50 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60 text-light-text dark:text-dark-text">
                            À venir
                        </div>
                    </div>
                </div>
            ) : (
                // AFFICHAGE NORMAL DES ARTICLES
                posts.map((post, i) => (
                    <Link to={`/resources/${post.slug.current}`} key={post._id} className="group block h-full">
                        <motion.article 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="h-full flex flex-col justify-between p-6 border border-light-border dark:border-dark-border rounded-xl bg-light-bg dark:bg-dark-bg hover:border-primary transition-colors duration-300"
                        >
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <span className="px-3 py-1 rounded-full bg-light-surface dark:bg-dark-surface text-[10px] font-mono uppercase tracking-widest border border-light-border dark:border-dark-border text-light-text dark:text-dark-text">
                                        {post.category === 'article' ? 'Analyse' : post.category}
                                    </span>
                                    <span className="text-[10px] font-mono opacity-50 text-light-text dark:text-dark-text">
                                        {new Date(post.publishedAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <h3 className="font-bold text-xl mb-3 text-light-text dark:text-dark-text group-hover:text-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-sm opacity-70 leading-relaxed line-clamp-3 text-light-text dark:text-dark-text">
                                    {post.excerpt}
                                </p>
                            </div>
                            <div className="mt-6 pt-6 border-t border-light-border/50 dark:border-dark-border/50 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all text-light-text dark:text-dark-text">
                                Lire l'article <ArrowRight size={12} />
                            </div>
                        </motion.article>
                    </Link>
                ))
            )}
        </div>
        
        <div className="mt-8 md:hidden flex justify-center">
            <Link to="/resources" className="text-sm font-bold uppercase tracking-widest border border-light-border dark:border-dark-border text-light-text dark:text-dark-text px-6 py-3 rounded-full hover:bg-primary hover:text-black transition-colors">
                Tous les articles
            </Link>
        </div>
      </div>
    </section>
  );
};

export default ResourcesPreview;