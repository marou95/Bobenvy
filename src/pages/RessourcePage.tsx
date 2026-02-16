import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getPosts, Post, urlFor } from '../lib/sanity';
import Navbar from '../components/Navbar';

const ResourcesPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then(setPosts).catch(console.error);
  }, []);

  return (
    <div className="bg-light-bg dark:bg-dark-bg min-h-screen text-light-text dark:text-dark-text transition-colors duration-500">
      <Navbar />
      
      <div className="pt-32 px-6 md:px-12 max-w-5xl mx-auto pb-20">
        
        <div className="mb-20 text-center md:text-left">
             <Link to="/" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-primary mb-8 transition-colors">
                <ArrowLeft size={16}/> Retour Accueil
             </Link>
             <h1 className="font-museo text-5xl md:text-7xl mb-6">Actualités & Ressources</h1>
             <p className="text-xl font-light opacity-70 max-w-2xl">
                 Veille stratégique, actualités de l'agence et guides pratiques pour piloter votre croissance.
             </p>
        </div>

        <div className="grid gap-12">
            {posts.map((post) => (
                <article key={post._id} className="group grid md:grid-cols-12 gap-8 items-center border-b border-light-border dark:border-dark-border pb-12 last:border-0">
                    
                    {/* Image */}
                    <div className="md:col-span-4 aspect-[4/3] rounded-xl overflow-hidden bg-light-surface dark:bg-dark-surface">
                        {post.mainImage && (
                            <img 
                                src={urlFor(post.mainImage).width(600).height(450).url()} 
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        )}
                    </div>

                    {/* Contenu */}
                    <div className="md:col-span-8">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-primary font-mono text-xs uppercase tracking-widest">
                                {post.category}
                            </span>
                            <span className="text-xs opacity-50 font-mono">
                                {new Date(post.publishedAt).toLocaleDateString()}
                            </span>
                        </div>
                        <h2 className="font-museo text-3xl md:text-4xl mb-4 group-hover:text-primary transition-colors">
                            {post.title}
                        </h2>
                        <p className="text-lg opacity-70 leading-relaxed mb-6">
                            {post.excerpt}
                        </p>
                        <span className="text-sm font-bold uppercase tracking-widest border-b border-light-text dark:border-white pb-1 group-hover:border-primary group-hover:text-primary transition-colors">
                            Lire la suite
                        </span>
                    </div>
                </article>
            ))}
        </div>

      </div>
    </div>
  );
};

export default ResourcesPage;