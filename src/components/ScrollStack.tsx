import React, { useRef, useMemo, useEffect, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ServiceModal, { ServiceDetail } from "./ServiceModal";

const SCROLL_CONFIG = {
  MOBILE_FACTOR: 51,
  DESKTOP_FACTOR: 61,
  SCALE_STEP: 0.05,
  MOBILE_BREAKPOINT: 768,
};

// --- DONNÉES ENRICHIES POUR LA MODALE ---
const ITEMS: ServiceDetail[] = [
  {
    id: 1,
    title: "Stratégie & Conseil",
    bgVideo: "",
    subtitle: "ANALYSER & STRUCTURER",
    description: "Audit complet, business plan et feuille de route pour prioriser vos actions et sécuriser votre croissance.",
    tags: ["Audit", "Business Plan", "Workshops"],
    color: "#CFB586",

    catchphrase: "CONSTRUIRE DES FONDATIONS SOLIDES POUR UNE CROISSANCE DURABLE.",
    intro: "Toute performance commence par une stratégie claire. Bobenvy vous accompagne dans la définition et le pilotage de votre stratégie marketing globale. Nous vous aidons à prendre les bonnes décisions au bon moment avec une vision claire de votre marché, de vos clients et de vos leviers de croissance.",
    mission: "Transformer vos enjeux en un plan d’action et des résultats concrets, mesurables et rentables.",
    objectif: "Aligner votre vision avec votre marque et vos leviers de croissance.",
    whyTitle: "Pourquoi la stratégie est la clé de votre performance",
    whyText: "Sans stratégie, le marketing devient une suite d’actions isolées. Avec une stratégie solide, chaque levier travaille pour le même objectif : attirer, convaincre, convertir et fidéliser.",
    benefits: [
      "Une vision claire de votre positionnement",
      "Des objectifs précis et mesurables",
      "Une priorisation intelligente des actions",
      "Une meilleure rentabilité de vos investissements"
    ],
    steps: [
      { title: "Audit & Diagnostic", desc: "Nous analysons en profondeur votre écosystème, vos freins et vos opportunités." },
      { title: "Définition Stratégique", desc: "Poser une direction stratégique cohérente et différenciante." },
      { title: "Plan d'actions", desc: "Passer rapidement de la réflexion à l’exécution avec une roadmap claire." },
      { title: "Accompagnement", desc: "Sécuriser vos choix stratégiques et maximiser votre impact." }
    ],
    conclusion: "Chez Bobenvy, nous ne vendons pas des concepts, mais des stratégies qui font avancer votre entreprise.",
    ctaText: "Vous avez un projet, une problématique ou un objectif de croissance ? Contactez-nous pour un premier échange."
  },
  {
    id: 2,
    title: "Identité de Marque",
    bgVideo: "",
    subtitle: "RÉVÉLER & INCARNER",
    description: "Plateforme de marque, naming, logo et territoire visuel pour rendre votre entreprise inoubliable.",
    tags: ["Branding", "Logo", "DA"],
    color: "#EAEAE5",

    catchphrase: "CRÉER DES MARQUES DURABLES QUI INSPIRENT.",
    intro: "Une marque forte est un actif stratégique. Nous construisons des identités cohérentes, différenciantes et mémorables. Bobenvy transforme votre marque en levier d’attraction et de préférence.",
    mission: "Un bon branding ne se contente pas d’être beau : il est stratégique, cohérent et impactant.",
    objectif: "Transformer votre marque en levier d’attraction et de préférence.",
    whyTitle: "Pourquoi le branding est essentiel à votre succès",
    whyText: "Dans un environnement saturé, une marque forte est indispensable pour soutenir vos performances marketing et commerciales.",
    benefits: [
      "Vous différencier clairement de vos concurrents",
      "Créer une connexion émotionnelle",
      "Renforcer la crédibilité et la confiance",
      "Améliorer la mémorisation de la marque"
    ],
    steps: [
      { title: "Audit & Analyse", desc: "Identifier les forces de votre marque et les axes d’amélioration en comprenant votre ADN." },
      { title: "Plateforme de marque", desc: "Définir les fondations pour construire une marque claire, alignée et différenciante." },
      { title: "Identité visuelle", desc: "Traduire votre stratégie de marque en une image forte et mémorable." },
      { title: "Déploiement", desc: "Assurer une image de marque cohérente et performante dans le temps." }
    ],
    conclusion: "Révélez tout le potentiel de votre entreprise.",
    ctaText: "Vous avez un projet de création, de refonte ou d’évolution de votre image de marque ? Contactez-nous pour révéler votre potentiel."
  },
{ 
    id: 3, 
    title: "Marketing Digital",
    bgVideo: "",
    subtitle: "ACTIVER & CONVERTIR", 
    description: "Site web, SEO/SEA et campagnes d'acquisition pour transformer votre visibilité en chiffre d'affaires.", 
    tags: ["Site Web", "SEO / SEA", "Lead Gen"], 
    color: "#CFB586",
    
    catchphrase: "TRANSFORMEZ VOTRE VISIBILITÉ EN RÉSULTATS MESURABLES.",
    intro: "Nous activons les bons leviers pour générer de la visibilité, du trafic et de la conversion. Chaque action est pensée pour produire des résultats concrets. Chez Bobenvy, nous créons et pilotons des stratégies digitales orientées résultats : plus de visibilité, plus de leads, plus de ventes.",
    mission: "Transformer vos canaux digitaux en leviers de croissance via une stratégie d'activation et d'optimisation.",
    objectif: "Maximiser votre retour sur investissement (ROI).",
    whyTitle: "Pourquoi miser sur le marketing digital",
    whyText: "Sans pilotage ni stratégie, le digital coûte. Bien maîtrisé, il devient un moteur de performance. Nous combinons stratégie et optimisation continue pour accélérer votre croissance.",
    benefits: [
      "Attirer des prospects qualifiés",
      "Convertir votre audience en clients",
      "Optimiser chaque euro investi",
      "Accélérer votre croissance durablement"
    ],
    steps: [
      { title: "Audit & Analyse", desc: "Analyser votre écosystème pour comprendre précisément ce qui génère (ou freine) votre performance." },
      { title: "Stratégie d’acquisition", desc: "Construire une stratégie alignée avec vos objectifs business pour activer les bons leviers." },
      { title: "Activation & Pilotage", desc: "Déployer et piloter vos actions marketing pour générer des résultats concrets." },
      { title: "Optimisation continue", desc: "Améliorer vos résultats mois après mois, car la performance se construit dans la durée." }
    ],
    conclusion: "Passez d'une visibilité passive à une acquisition active.",
    ctaText: "Vous souhaitez générer plus de leads ou améliorer votre rentabilité ? Contactez-nous pour accélérer votre croissance."
  },
{ 
    id: 4, 
    title: "Communication & Influence",
    bgVideo: "",
    subtitle: "DÉPLOYER & FÉDÉRER", 
    description: "Social media, influence et relations presse pour créer un lien durable et émotionnel avec votre audience.", 
    tags: ["Social Media", "Influence", "PR"], 
    color: "#EAEAE5",
    
    // Contenu Modale
    catchphrase: "DÉPLOYER VOTRE MESSAGE SUR LES BONS CANAUX AU BON MOMENT.",
    intro: "Nous orchestrons votre communication pour renforcer votre notoriété et votre crédibilité. Bobenvy amplifie votre visibilité et votre impact. Être visible ne suffit plus : une marque doit porter un message clair, cohérent et influent pour exister durablement.",
    mission: "Transformer votre communication en levier d’influence et de préférence de marque.",
    objectif: "Capter l’attention, créer l’adhésion et renforcer votre crédibilité.",
    whyTitle: "Pourquoi l'influence est devenue stratégique",
    whyText: "Dans un environnement ultra-concurrentiel et saturé de messages, une communication maîtrisée est essentielle. Une stratégie efficace repose sur la cohérence, la crédibilité et la constance pour influencer la perception et la décision.",
    benefits: [
      "Renforcer votre notoriété et image de marque",
      "Créer une relation de confiance durable",
      "Influencer la perception et la décision",
      "Amplifier vos actions marketing et commerciales"
    ],
    steps: [
      { title: "Audit & Analyse", desc: "Comprendre comment votre marque est perçue et identifier les leviers d’influence actuels." },
      { title: "Stratégie de Com", desc: "Construire un discours différenciant et diffuser le bon message, au bon moment, sur les bons canaux." },
      { title: "Influence & RP", desc: "Accroître votre visibilité et renforcer votre crédibilité par des voix influentes et des relais pertinents." },
      { title: "Activation & Event", desc: "Concevoir des événements marquants et piloter l'impact pour créer du lien avec vos cibles." }
    ],
    conclusion: "Construisez une influence durable et mesurable.",
    ctaText: "Vous souhaitez développer votre notoriété, structurer votre discours ou gagner en crédibilité ? Contactez-nous pour amplifier la portée de votre marque."
  },
];

export interface ScrollStackItemProps {
  children: React.ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children }) => {
  return <>{children}</>;
};

interface CardProps {
  i: number;
  data: ServiceDetail; // On passe l'objet complet
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
  headerHeight: number;
  onOpen: (service: ServiceDetail) => void;
}

const Card: React.FC<CardProps> = ({ i, data, progress, range, targetScale, headerHeight, onOpen }) => {
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
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] mb-2 block" style={{ color: data.color }}>{data.subtitle}</span>
            <h2 className="font-museo text-2xl md:text-5xl text-light-text dark:text-dark-text mt-1 md:mt-2 group-hover:text-primary transition-colors">{data.title}</h2>
          </div>
          <span className="font-mono text-light-muted dark:text-dark-muted text-lg md:text-xl border border-light-border dark:border-dark-border rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">0{i + 1}</span>
        </div>

        <p className="text-sm md:text-xl text-light-muted dark:text-dark-muted font-light leading-relaxed max-w-2xl mt-4">{data.description}</p>

        <div className="flex flex-col md:flex-row justify-between items-end gap-4 md:gap-6 mt-4">
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag, idx) => (
              <span key={idx} className="px-2 py-1 md:px-3 rounded-full border border-light-border dark:border-dark-border text-[9px] md:text-[10px] text-light-muted dark:text-dark-muted font-mono uppercase">
                {tag}
              </span>
            ))}
          </div>

          {/* REMPLACEMENT DU LINK PAR UNE DIV : On ne veut pas changer d'URL, juste ouvrir la modale */}
          <div className="flex items-center gap-2 text-light-text dark:text-dark-text group-hover:text-primary transition-colors uppercase tracking-widest text-[10px] md:text-xs font-bold">
            Découvrir <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16} />
          </div>
        </div>

        {/* Optimisation Mobile (votre code original) */}
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

const ScrollStack = ({ headerHeight = 30, children }: { headerHeight?: number, children?: React.ReactNode }) => {
  const container = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // NOUVEAU : État pour la modale
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

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
    <>
      <section
        ref={container}
        className="relative w-full pb-[50vh]"
        style={{ height: scrollHeight }}
      >
        <div className="relative w-full">
          {ITEMS.map((item, i) => {
            const targetScale = 1 - (cardLength - i) * SCROLL_CONFIG.SCALE_STEP;
            // On calcule range ici comme dans votre version optimisée
            const range = [i * (1 / cardLength), 1];

            return (
              <Card
                key={item.id}
                i={i}
                data={item} // On passe l'objet data complet
                progress={scrollYProgress}
                range={range}
                targetScale={targetScale}
                headerHeight={headerHeight}
                onOpen={setSelectedService} // On passe la fonction d'ouverture
              />
            );
          })}
        </div>
      </section>

      {/* Rendu de la Modale en dehors de la section scroll */}
      <ServiceModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={selectedService}
      />
    </>
  );
};

export default ScrollStack;