import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const items = [
  { id: 1, title: "Stratégie & Conseil", subtitle: "ANALYSER & STRUCTURER", description: "Audit complet, business plan et feuille de route pour prioriser vos actions et sécuriser votre croissance.", tags: ["Audit", "Business Plan", "Workshops"], color: "#CFB586" },
  { id: 2, title: "Identité de Marque", subtitle: "RÉVÉLER & INCARNER", description: "Plateforme de marque, naming, logo et territoire visuel pour rendre votre entreprise inoubliable.", tags: ["Branding", "Logo", "DA"], color: "#EAEAE5" },
  { id: 3, title: "Digital & Performance", subtitle: "ACTIVER & CONVERTIR", description: "Site web, SEO/SEA et campagnes d'acquisition pour transformer votre visibilité en chiffre d'affaires.", tags: ["Site Web", "SEO / SEA", "Lead Gen"], color: "#CFB586" },
  { id: 4, title: "Communication 360", subtitle: "DÉPLOYER & FÉDÉRER", description: "Social media, influence et relations presse pour créer un lien durable et émotionnel avec votre audience.", tags: ["Social Media", "Influence", "PR"], color: "#EAEAE5" },
];

interface CardProps {
  i: number;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
  headerHeight: number;
}

const Card: React.FC<CardProps> = ({ i, title, subtitle, description, tags, color, progress, range, targetScale, headerHeight }) => {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky w-full flex justify-center py-12"
      style={{
        top: `calc(${headerHeight}vh + ${i * 10}px)`,
        zIndex: 10 + i
      }}
    >
      <motion.div
        style={{ scale }}
        className="relative w-[90vw] md:w-[70vw] h-[50vh] rounded-[2rem] border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-8 md:p-12 flex flex-col justify-between shadow-2xl origin-top transition-colors duration-500"
      >
        <div className="flex justify-between items-start">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] mb-2 block" style={{ color: color }}>{subtitle}</span>
            <h2 className="font-museo text-3xl md:text-5xl text-light-text dark:text-dark-text mt-2">{title}</h2>
          </div>
          <span className="font-mono text-light-muted dark:text-dark-muted text-xl border border-light-border dark:border-dark-border rounded-full w-10 h-10 flex items-center justify-center">0{i + 1}</span>
        </div>

        <p className="text-lg md:text-xl text-light-muted dark:text-dark-muted font-light leading-relaxed max-w-2xl mt-4">{description}</p>

        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mt-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 rounded-full border border-light-border dark:border-dark-border text-[10px] md:text-xs text-light-muted dark:text-dark-muted font-mono uppercase">
                {tag}
              </span>
            ))}
          </div>
          <Link to={`/services/${i + 1}`} className="flex items-center gap-2 text-light-text dark:text-dark-text hover:text-primary transition-colors uppercase tracking-widest text-xs font-bold group">
            Découvrir <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16} />
          </Link>
        </div>

        <div className="absolute top-[-50%] right-[-20%] w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-10 mix-blend-screen" style={{ backgroundColor: color }} />
      </motion.div>
    </div>
  );
};

const ScrollStack = ({ headerHeight = 30 }: { headerHeight?: number }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });
  const cardLength = items.length;

  return (
    <section ref={container} className="relative w-full">
      <div className="relative w-full">
        {items.map((item, i) => {
          const targetScale = 1 - ((cardLength - i) * 0.05);
          return (
            <Card
              key={item.id}
              i={i}
              {...item}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
              headerHeight={headerHeight}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ScrollStack;