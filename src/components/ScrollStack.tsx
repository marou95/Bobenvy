import React, { useRef, useMemo, useEffect, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const SCROLL_CONFIG = {
  MOBILE_FACTOR: 51,
  DESKTOP_FACTOR: 61,
  SCALE_STEP: 0.05,
  MOBILE_BREAKPOINT: 768,
};

const ITEMS = [
  { id: 1, title: "Stratégie & Conseil", subtitle: "ANALYSER & STRUCTURER", description: "Audit complet, business plan et feuille de route...", tags: ["Audit", "Business Plan"], color: "#CFB586" },
  { id: 2, title: "Identité de Marque", subtitle: "RÉVÉLER & INCARNER", description: "Plateforme de marque, naming, logo et territoire visuel...", tags: ["Branding", "Logo"], color: "#EAEAE5" },
  { id: 3, title: "Digital & Performance", subtitle: "ACTIVER & CONVERTIR", description: "Site web, SEO/SEA et campagnes d'acquisition...", tags: ["Site Web", "SEO / SEA"], color: "#CFB586" },
  { id: 4, title: "Communication 360", subtitle: "DÉPLOYER & FÉDÉRER", description: "Social media, influence et relations presse...", tags: ["Social Media", "PR"], color: "#EAEAE5" },
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
      className="sticky w-full flex justify-center py-4 md:py-12"
      style={{
        top: `calc(${headerHeight}vh + ${i * 10}px)`, 
        zIndex: 10 + i
      }}
    >
      <motion.div
        style={{ scale }}

        className="relative w-[90vw] md:w-[70vw] h-[50vh] rounded-[1.5rem] md:rounded-[2rem] border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-6 md:p-12 flex flex-col justify-between shadow-xl origin-top transition-colors duration-500 will-change-transform"
      >
        <div className="flex justify-between items-start">
          <div>
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] mb-2 block" style={{ color: color }}>{subtitle}</span>
            <h2 className="font-museo text-2xl md:text-5xl text-light-text dark:text-dark-text mt-1 md:mt-2">{title}</h2>
          </div>
          <span className="font-mono text-light-muted dark:text-dark-muted text-lg md:text-xl border border-light-border dark:border-dark-border rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">0{i + 1}</span>
        </div>

        <p className="text-sm md:text-xl text-light-muted dark:text-dark-muted font-light leading-relaxed max-w-2xl mt-4">{description}</p>

        <div className="flex flex-col md:flex-row justify-between items-end gap-4 md:gap-6 mt-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span key={idx} className="px-2 py-1 md:px-3 rounded-full border border-light-border dark:border-dark-border text-[9px] md:text-[10px] text-light-muted dark:text-dark-muted font-mono uppercase">
                {tag}
              </span>
            ))}
          </div>
          <Link to={`/services/${i + 1}`} className="flex items-center gap-2 text-light-text dark:text-dark-text hover:text-primary transition-colors uppercase tracking-widest text-[10px] md:text-xs font-bold group">
            Découvrir <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16} />
          </Link>
        </div>

        <div 
            className="hidden md:block absolute top-[-50%] right-[-20%] w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-10 mix-blend-screen" 
            style={{ backgroundColor: color }} 
        />
        
        <div 
             className="md:hidden absolute top-0 right-0 w-[100px] h-[100px] rounded-full opacity-5 pointer-events-none"
             style={{ backgroundColor: color }}
        />

      </motion.div>
    </div>
  );
};

const ScrollStack = ({ headerHeight = 30 }: { headerHeight?: number }) => {
  const container = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < SCROLL_CONFIG.MOBILE_BREAKPOINT);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const cardLength = ITEMS.length;

  const scrollHeight = useMemo(() => {
    const factor = isMobile ? SCROLL_CONFIG.MOBILE_FACTOR : SCROLL_CONFIG.DESKTOP_FACTOR;
    return `${cardLength * factor}vh`;
  }, [cardLength, isMobile]);

  return (
    <section
      ref={container}
      className="relative w-full pb-[50vh]"
      style={{ height: scrollHeight }}
    >
      <div className="relative w-full">
        {ITEMS.map((item, i) => {
          const targetScale = 1 - (cardLength - i) * SCROLL_CONFIG.SCALE_STEP;
          const range = [i * (1 / cardLength), 1]; 

          return (
            <Card
              key={item.id}
              i={i}
              {...item}
              progress={scrollYProgress}
              range={range}
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