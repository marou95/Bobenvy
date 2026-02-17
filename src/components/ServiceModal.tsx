import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PopupButton } from "react-calendly";

export interface ServiceDetail {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string;
  bgVideo: string; 
  
  catchphrase: string;
  intro: string;
  mission: string;
  objectif: string;
  whyTitle: string;
  whyText: string;
  benefits: string[];
  steps: { title: string; desc: string }[];
  conclusion: string;
  ctaText: string;
}

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceDetail | null;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, service }) => {
  
  // GESTION DU SCROLL : Bloque le body (homepage), laisse la modale active
  useEffect(() => {
    if (isOpen) {
      // On bloque le scroll de la page principale
      document.body.style.overflow = 'hidden';
      
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEsc);

      return () => {
        // On réactive le scroll à la fermeture
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [isOpen, onClose]);

  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[88]"
          />

          {/* MODALE */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            // overflow-y-auto ICI permet de scroller DANS la modale alors que le body est bloqué
            className="fixed inset-0 z-[89] bg-light-bg dark:bg-dark-bg overflow-y-auto isolate"
          >
            
            {/* 1. HEADER VIDÉO */}
            <div className="absolute top-0 left-0 w-full h-[80vh] z-0 overflow-hidden pointer-events-none">
                <video
                    key={service.bgVideo} 
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-30 dark:opacity-40"
                >
                    <source src={service.bgVideo} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-light-bg/20 via-light-bg/60 to-light-bg dark:from-dark-bg/20 dark:via-dark-bg/60 dark:to-dark-bg" />
            </div>

            {/* 2. BOUTON FERMER (CORRIGÉ DESKTOP & MOBILE) */}
            {/* pt-28 : Mobile (pour passer sous le header mobile) */}
            {/* md:pt-32 : Desktop (pour passer sous le header desktop plus large) */}
            <div className="sticky top-0 right-0 z-50 flex justify-end px-6 pt-28 pb-4 md:pt-32 md:pr-12 pointer-events-none">
                <button 
                  onClick={onClose}
                  className="pointer-events-auto group flex items-center gap-3 bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur border border-light-border dark:border-dark-border px-4 py-2 rounded-full hover:bg-primary hover:text-black transition-colors shadow-lg"
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest hidden md:block">Fermer (Esc)</span>
                  <X size={20} />
                </button>
            </div>

            {/* 3. CONTENU */}
            {/* -mt-4 : Ajustement fin pour rapprocher le titre du bouton */}
            <div className="relative z-10 max-w-5xl mx-auto w-full px-6 md:px-10 pb-20 -mt-4">
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-24"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-primary mb-4 block drop-shadow-md">Détail du service</span>
                <h2 className="font-museo text-5xl md:text-7xl mb-6 text-light-text dark:text-dark-text drop-shadow-sm">{service.title}</h2>
                <h3 className="font-mono text-sm md:text-base uppercase tracking-[0.2em] opacity-90 mb-8 border-l-2 pl-4" style={{ borderColor: service.color, color: service.color }}>{service.catchphrase}</h3>
                <p className="text-xl md:text-2xl font-light leading-relaxed text-light-text dark:text-dark-text max-w-3xl drop-shadow-md">
                  {service.intro}
                </p>
              </motion.div>

              {/* GRILLES ET TEXTES SUIVANTS */}
              <div className="grid md:grid-cols-2 gap-8 mb-20">
                <div className="p-8 rounded-2xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border shadow-sm">
                   <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><ArrowRight className="text-primary" size={20}/> Notre Mission</h4>
                   <p className="opacity-80 font-light">{service.mission}</p>
                </div>
                <div className="p-8 rounded-2xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border shadow-sm">
                   <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><ArrowRight className="text-primary" size={20}/> Objectif</h4>
                   <p className="opacity-80 font-light">{service.objectif}</p>
                </div>
              </div>

              <div className="mb-20">
                <h3 className="font-museo text-3xl md:text-4xl mb-8">{service.whyTitle}</h3>
                <p className="text-lg opacity-80 mb-8 max-w-3xl">{service.whyText}</p>
                <ul className="grid md:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="text-primary shrink-0 mt-1" size={18} />
                      <span className="opacity-80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-24">
                <h3 className="font-museo text-3xl md:text-4xl mb-12">Notre approche</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {service.steps.map((step, i) => (
                    <div key={i} className="relative p-6 pt-12 border-t border-light-border dark:border-dark-border hover:bg-light-surface dark:hover:bg-dark-surface transition-colors rounded-lg group">
                      <span className="absolute top-6 right-6 text-4xl font-museo text-light-border dark:text-dark-border group-hover:text-primary transition-colors opacity-30">0{i+1}</span>
                      <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                      <p className="text-sm opacity-70 leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary text-black rounded-[2rem] p-10 md:p-16 text-center relative overflow-hidden">
                 <div className="relative z-10 max-w-2xl mx-auto">
                    <h3 className="font-museo text-3xl md:text-5xl font-bold mb-6">Prêt à démarrer ?</h3>
                    <p className="font-medium text-lg mb-8 opacity-90">{service.ctaText}</p>
                    
                    <div className="inline-block">
                        <PopupButton
                          url="https://calendly.com/contact-bobenvy/30min"
                          rootElement={document.getElementById("root")!}
                          text="Prendre rendez-vous"
                          className="bg-black text-white px-8 py-4 rounded-full font-mono uppercase tracking-widest text-xs hover:scale-105 transition-transform font-bold cursor-pointer"
                        />
                    </div>
                 </div>
                 <div className="absolute inset-0 bg-white/10 mix-blend-overlay pointer-events-none"></div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;