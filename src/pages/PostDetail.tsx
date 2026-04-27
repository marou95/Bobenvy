import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Calendar, Tag, Download } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { useTranslation } from 'react-i18next';
import { getPostBySlug, Post, urlFor } from '../lib/sanity';
import Navbar from '../components/Navbar';

const PostDetail = () => {
  const { t, i18n } = useTranslation();
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      getPostBySlug(slug, i18n.language).then((data) => {
        setPost(data);
        setLoading(false);
      });
    }
  }, [slug, i18n.language]);

  if (loading) return <div className="h-screen bg-light-bg dark:bg-dark-bg" />;
  if (!post) return <div className="h-screen flex items-center justify-center">Article introuvable</div>;

  // Style pour le contenu de l'article
  const ptComponents = {
    block: {
      h2: ({ children }: any) => <h2 className="text-3xl font-museo mt-12 mb-6 text-light-text dark:text-dark-text">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-8 mb-4 text-light-text dark:text-dark-text">{children}</h3>,
      normal: ({ children }: any) => <p className="mb-6 text-lg leading-loose opacity-80 font-light text-light-text dark:text-dark-text">{children}</p>,
      blockquote: ({ children }: any) => <blockquote className="border-l-4 border-primary pl-6 my-8 italic text-xl opacity-90">{children}</blockquote>,
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-6 space-y-2 opacity-80">{children}</ul>,
      number: ({ children }: any) => <ol className="list-decimal pl-6 mb-6 space-y-2 opacity-80">{children}</ol>,
    },
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) return null;
        return (
          <div className="my-10 rounded-xl overflow-hidden shadow-md">
            <img
              src={urlFor(value).width(1000).url()}
              alt={value.alt || ' '}
              className="w-full h-auto object-cover"
            />
          </div>
        );
      }
    }
  };

  return (
    <div className="bg-light-bg dark:bg-dark-bg min-h-screen text-light-text dark:text-dark-text transition-colors duration-500">
      <Navbar />

      <article className="pt-32 pb-20">

        {/* HEADER ARTICLE */}
        <div className="max-w-4xl mx-auto px-6 text-center mb-12">
          <Link to="/resources" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-primary mb-8 transition-colors">
            <ArrowLeft size={16} /> {t('projectDetail.back_resources') || 'Retour Ressources'}
          </Link>

          <div className="flex justify-center items-center gap-4 mb-6">
            <span className="px-3 py-1 border border-primary text-primary rounded-full text-[10px] uppercase font-bold tracking-widest">
              {post.category}
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-museo text-4xl md:text-6xl leading-tight mb-8"
          >
            {post.title}
          </motion.h1>

          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm font-mono opacity-60 uppercase tracking-widest border-y border-light-border dark:border-dark-border py-4">
            <div className="flex items-center gap-2">
              <User size={14} /> {post.author || "Bobenvy"}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} /> {new Date(post.publishedAt).toLocaleDateString(i18n.language)}
            </div>
          </div>
        </div>

        {/* IMAGE DE COUVERTURE */}
        <div className="max-w-6xl mx-auto px-6 mb-16">
          {post.mainImage && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="aspect-video rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={urlFor(post.mainImage).width(1600).url()}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </div>

        {/* CONTENU */}
        <div className="max-w-3xl mx-auto px-6">
          {/* Excerpt en intro */}
          <p className="text-xl md:text-2xl font-light leading-relaxed mb-12 text-light-muted dark:text-dark-muted border-b border-light-border dark:border-dark-border pb-12">
            {post.excerpt}
          </p>

          {/* Body */}
          <div>
            {post.body && <PortableText value={post.body} components={ptComponents} />}
          </div>

          {/* BOUTON PDF CONDITIONNEL */}
          {post.attachedPdfUrl && (
            <div className="mt-16 pt-12 border-t border-light-border dark:border-dark-border flex justify-center">
              <a 
                href={post.attachedPdfUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-4 border border-light-border dark:border-dark-border px-8 py-4 rounded-full hover:border-primary hover:text-primary transition-all duration-300 group shadow-sm hover:shadow-md"
              >
                <span className="font-mono text-xs md:text-sm uppercase tracking-widest font-bold">
                  {t('projectDetail.download_pdf') || 'Télécharger la ressource PDF'}
                </span>
                <Download size={18} className="group-hover:translate-y-1 transition-transform" />
              </a>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default PostDetail;