import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const items = [
  {
    id: 1,
    title: "Stratégie & Conseil",
    subtitle: "ANALYSER & STRUCTURER",
    description: "Audit complet, business plan et feuille de route pour prioriser vos actions et sécuriser votre croissance.",
    tags: ["Audit", "Business Plan", "Workshops"],
    color: "#CFB586",
  },
  {
    id: 2,
    title: "Identité de Marque",
    subtitle: "RÉVÉLER & INCARNER",
    description: "Plateforme de marque, naming, logo et territoire visuel pour rendre votre entreprise inoubliable.",
    tags: ["Branding", "Logo", "DA"],
    color: "#EAEAE5",
  },
  {
    id: 3,
    title: "Digital & Performance",
    subtitle: "ACTIVER & CONVERTIR",
    description: "Site web, SEO/SEA et campagnes d'acquisition pour transformer votre visibilité en chiffre d'affaires.",
    tags: ["Site Web", "SEO / SEA", "Lead Gen"],
    color: "#CFB586",
  },
  {
    id: 4,
    title: "Communication 360",
    subtitle: "DÉPLOYER & FÉDÉRER",
    description: "Social media, influence et relations presse pour créer un lien durable et émotionnel avec votre audience.",
    tags: ["Social Media", "Influence", "PR"],
    color: "#EAEAE5",
  },
];

const Card = ({
  i,
  title,
  subtitle,
  description,
  tags,
  color,
  progress,
  range,
  targetScale,
}: {
  i: number;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
}) => {
  const container = useRef(null);
  
  // Animation scale ultra smooth
  const scale = useTransform(progress, range, [1, targetScale], {
    ease: (t) => t * t * (3 - 2 * t), // smoothstep
  });

  // Animation d'opacité pour les cartes qui passent
  const opacity = useTransform(
    progress,
    [range[0], range[0] + 0.1, range[1] - 0.1, range[1]],
    [1, 1, 1, 0.8]
  );

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky"
      style={{ 
        top: `calc(15vh + ${i * 30}px)`,
      }} 
      data-card-stack
    >
      <motion.div
        style={{
          scale,
          opacity,
        }}
        className="relative w-[90vw] md:w-[70vw] h-[55vh] rounded-[2rem] p-8 md:p-12 flex flex-col justify-between shadow-2xl origin-top bg-[#050505] border border-white/10 will-change-transform"
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <span 
              className="font-mono text-xs uppercase tracking-[0.3em] mb-2 block" 
              style={{ color: color }}
            >
              {subtitle}
            </span>
            <h2 className="font-museo text-3xl md:text-5xl text-white mt-2">
              {title}
            </h2>
          </div>
          <span className="font-mono text-white/20 text-xl border border-white/10 rounded-full w-10 h-10 flex items-center justify-center">
            0{i + 1}
          </span>
        </div>

        {/* Content */}
        <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-2xl mt-4">
          {description}
        </p>

        {/* Footer */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mt-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="px-3 py-1 rounded-full border border-white/10 text-[10px] md:text-xs text-gray-500 font-mono uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link 
            to={`/services/${i+1}`} 
            className="flex items-center gap-2 text-white hover:text-[#CFB586] transition-colors uppercase tracking-widest text-xs font-bold group"
          >
            Découvrir 
            <ArrowUpRight 
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
              size={16}
            />
          </Link>
        </div>

        {/* Glow Effect */}
        <div 
          className="absolute top-[-50%] right-[-20%] w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-10 mix-blend-screen"
          style={{ backgroundColor: color }}
        />
      </motion.div>
    </div>
  );
};

const ScrollStack = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const cardLength = items.length;

  return (
    <section 
      ref={container} 
      id="services" 
      className="relative bg-[#050505]"
      style={{ 
        height: `${200 + (cardLength - 1) * 100}vh`
      }}
      data-scroll-stack
    >
      {/* Titre sticky */}
      <div className="px-6 md:px-12 pt-24 pb-12 sticky top-0 z-[100] bg-gradient-to-b from-[#050505] via-[#050505] to-transparent">
        <span className="text-[#CFB586] font-mono text-xs uppercase tracking-widest block mb-4">
          Domaines d'intervention
        </span>
        <h3 className="font-museo text-5xl md:text-8xl text-white">
          EXPERTISES
        </h3>
      </div>

      {/* Container des cartes */}
      <div className="relative mt-20">
        {items.map((item, i) => {
          // Calcul optimisé des ranges
          const targetScale = 1 - ((cardLength - i) * 0.05);
          const startProgress = i * (1 / cardLength);
          const endProgress = 1;
          
          return (
            <Card
              key={item.id}
              i={i}
              {...item}
              progress={scrollYProgress}
              range={[startProgress, endProgress]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ScrollStack;