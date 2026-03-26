import React, { useRef, useMemo, useEffect, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import ServiceModal, { ServiceDetail } from "./ServiceModal";

const SCROLL_CONFIG = {
  MOBILE_FACTOR: 54,
  DESKTOP_FACTOR: 61,
  SCALE_STEP: 0.05,
  MOBILE_BREAKPOINT: 768,
};

// --- DATA STRUCTURE DE BASE (Design & IDs) ---
const BASE_ITEMS = [
  { id: 1, color: "#CFB586" },
  { id: 2, color: "#CFB586" },
  { id: 3, color: "#CFB586" },
  { id: 4, color: "#CFB586" },
  { id: 5, color: "#BCA38F" },
  { id: 6, color: "#CFB586" },
  { id: 7, color: "#8FA396" }
];

export interface ScrollStackItemProps {
  children: React.ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children }) => {
  return <>{children}</>;
};

interface CardProps {
  i: number;
  data: ServiceDetail;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
  headerHeight: number;
  discoverText: string;
  onOpen: (service: ServiceDetail) => void;
}

const Card: React.FC<CardProps> = ({ i, data, progress, range, targetScale, headerHeight, discoverText, onOpen }) => {
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
        onClick={() => onOpen(data)}
        className="relative w-[90vw] md:w-[70vw] h-[50vh] rounded-[1.5rem] md:rounded-[2rem] border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-6 md:p-12 flex flex-col justify-between shadow-xl origin-top transition-colors duration-500 will-change-transform cursor-pointer group hover:border-primary/50"
      >
        <div className="flex justify-between items-start">
          <div>
            <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] mb-2 block" style={{ color: data.color }}>{data.subtitle}</span>
            <h2 className="font-museo text-2xl md:text-5xl text-light-text dark:text-dark-text mt-1 md:mt-2 group-hover:text-primary transition-colors">{data.title}</h2>
          </div>
          <span className="font-mono text-light-muted dark:text-dark-muted text-lg md:text-xl border border-light-border dark:border-dark-border rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">0{i + 1}</span>
        </div>

        <p className="text-sm md:text-xl text-light-muted dark:text-dark-muted font-light leading-relaxed max-w-2xl mt-4 line-clamp-3">{data.description}</p>

        <div className="flex flex-col md:flex-row justify-between items-end gap-4 md:gap-6 mt-4">
          <div className="flex flex-wrap gap-2">
            {data.tags?.map((tag, idx) => (
              <span key={idx} className="px-2 py-1 md:px-3 rounded-full border border-light-border dark:border-dark-border text-[9px] md:text-[10px] text-light-muted dark:text-dark-muted font-mono uppercase">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-light-text dark:text-dark-text group-hover:text-primary transition-colors uppercase tracking-widest text-[10px] md:text-xs font-bold shrink-0">
            {discoverText} <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16} />
          </div>
        </div>

        <div
          className="hidden md:block absolute top-[-50%] right-[-20%] w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-10 mix-blend-screen"
          style={{ backgroundColor: data.color }}
        />
        <div
          className="md:hidden absolute top-0 right-0 w-[100px] h-[100px] rounded-full opacity-5 pointer-events-none"
          style={{ backgroundColor: data.color }}
        />

      </motion.div>
    </div>
  );
};

const ScrollStack = () => {
  const { t } = useTranslation();
  const container = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [titleHeight, setTitleHeight] = useState(30);

  // Fusion des données de base avec les traductions JSON
  const ITEMS: ServiceDetail[] = useMemo(() => {
    const translatedItems = t('services.items', { returnObjects: true }) as any[];
    if (!Array.isArray(translatedItems)) return [];
    
    return BASE_ITEMS.map((baseItem, index) => ({
      ...baseItem,
      ...translatedItems[index]
    }));
  }, [t]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < SCROLL_CONFIG.MOBILE_BREAKPOINT);
      setTitleHeight(window.innerWidth < 768 ? 20 : 28);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
    <>
      <section
        ref={container}
        className="relative w-full pb-[20vh] md:pb-[40vh] mb-20 md:mb-40"
        style={{ height: scrollHeight }}
      >
          <div
            className="sticky top-0 left-0 right-0 z-40 flex flex-col justify-end pb-4 px-6 md:px-12 bg-light-bg dark:bg-dark-bg transition-all duration-300 border-b border-light-border/10 dark:border-dark-border/10"
            style={{ height: `${titleHeight}vh` }}>
            <span className="text-primary font-mono text-xs uppercase tracking-widest block mb-4">{t('services.badge')}</span>
            <h3 className="font-museo text-5xl md:text-8xl text-light-text dark:text-dark-text transition-colors leading-none">{t('services.title')}</h3>
          </div>
        <div className="relative w-full">
          {ITEMS.map((item, i) => {
            const targetScale = 1 - (cardLength - i) * SCROLL_CONFIG.SCALE_STEP;
            const range = [i * (1 / cardLength), 1];

            return (
              <Card
                key={item.id}
                i={i}
                data={item}
                progress={scrollYProgress}
                range={range}
                targetScale={targetScale}
                headerHeight={titleHeight}
                discoverText={t('services.discover')}
                onOpen={setSelectedService}
              />
            );
          })}
        </div>
      </section>

      <div className="relative z-[91]">
        <ServiceModal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          service={selectedService as ServiceDetail}
        />
      </div>
    </>
  );
};

export default ScrollStack;