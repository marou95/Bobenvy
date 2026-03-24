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
    subtitle: "ANALYSER & STRUCTURER",
    description: "Audit complet, business plan et feuille de route pour prioriser vos actions et sécuriser votre croissance.",
    tags: ["Audit", "Business Plan", "Analyse concurrentielle", "Positionnement", "Étude de marché", "Étude qualitative et quantitative", "Indicateur de performance"],
    color: "#CFB586",

    catchphrase: "Construire des fondations solides pour une croissance durable.",
    intro: "Toute performance commence par une stratégie claire. Bobenvy vous accompagne dans la définition et le pilotage de votre stratégie marketing globale pour prendre les bonnes décisions au bon moment grâce à une vision claire de votre marché, de vos clients et de vos leviers de croissance",
    mission: "Transformer vos enjeux en un plan d’action et des résultats concrets, mesurables et rentables.",
    objectif: "Aligner votre vision avec votre marque et vos leviers de croissance.",
    whyTitle: "Pourquoi la stratégie est la clé de votre performance",
    whyText: "Sans stratégie, le marketing devient une suite d’actions isolées et des opportunités perdues. Avec une stratégie claire, chaque levier devient une force unie et chaque effort est un pas de plus vers l’objectif à atteindre : attirer, convaincre, convertir et fidéliser",
    benefits: [
      "Une vision claire de votre positionnement",
      "Des objectifs précis et mesurables",
      "Une priorisation intelligente des actions",
      "Une meilleure rentabilité de vos investissements"
    ],
    steps: [
      { title: "Audit & Diagnostic", desc: "Analyser en profondeur votre écosystème, vos freins et vos opportunités." },
      { title: "Définition Stratégique", desc: "Poser une direction stratégique cohérente et différenciante." },
      { title: "Plan d'actions", desc: "Passer rapidement de la réflexion à l’exécution avec une roadmap claire." },
      { title: "Accompagnement", desc: "Sécuriser vos choix stratégiques et maximiser votre impact." }
    ],
    conclusion: "Chez Bobenvy, nous ne vendons pas des concepts, mais des stratégies qui font avancer votre entreprise.",
    ctaText: "Vous avez un projet, une problématique ou un objectif de croissance ? Contactez-nous pour un premier échange."
  },
  {
    id: 2,
    title: "Branding et image de marque",
    subtitle: "Créer des marques durables qui inspirent",
    description: "Une marque forte est un actif stratégique. Nous construisons des identités cohérentes, différenciantes et mémorables.",
    tags: ["Branding", "Identité Visuelle", "Positionnement"],
    color: "#CFB586",

    catchphrase: "Transformer votre marque en levier d’attraction et de préférence.",
    intro: "Une marque forte est un actif stratégique. Nous construisons une identité de marque cohérente, différenciante et mémorable. Nous façonnons des marques qui s’imposent comme une évidence.",
    mission: "Construire une marque claire, alignée et différenciante grâce à un positionnement stratégique précis.",
    objectif: "Créer une connexion émotionnelle, améliorer la mémorisation et renforcer la confiance.",
    whyTitle: "Pourquoi le branding est essentiel à votre succès",
    whyText: "Dans un environnement saturé, un branding efficace ne se limite pas à un beau design mais à une stratégie graphique bien étudiée. Une direction artistique pointue, couplée à un univers graphique maîtrisé permet de se différencier, de renforcer sa crédibilité et de soutenir ses performances marketing et commerciales.",
    benefits: [
      "Développer votre authenticité",
      "Créer une connexion émotionnelle avec votre audience",
      "Renforcer la crédibilité et la confiance",
      "Améliorer la mémorisation et la préférence de marque",
      "Soutenir vos performances marketing et commerciales"
    ],
    steps: [
      {
        title: "Audit de marque & analyse",
        desc: "Comprendre votre ADN, votre environnement et identifier les forces de votre marque et les axes d’amélioration."
      },
      {
        title: "Plateforme de marque",
        desc: "Définir les fondations de votre marque : mission, vision, valeur et ton de voix pour un alignement parfait."
      },
      {
        title: "Identité visuelle",
        desc: "Traduire votre stratégie de marque en une image forte et mémorable"
      },
      {
        title: "Branding opérationnel",
        desc: "Assurer une image de marque cohérente et performante dans le temps grâce à notre accompagnement."
      }
    ],
    conclusion: "Un bon branding est stratégique, cohérent et impactant.",
    ctaText: "Vous avez un projet de création, de refonte ou d’évolution de votre image de marque ? Contactez-nous pour révéler votre potentiel."
  },
  {
    id: 3,
    title: "Identité de Marque",
    subtitle: "RÉVÉLER & INCARNER",
    description: "Plateforme de marque, naming, logo et territoire visuel pour rendre votre entreprise inoubliable.",
    tags: ["Branding", "Logo", "DA"],
    color: "#CFB586",

    catchphrase: "Créer des marques durables qui inspirent.",
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
    id: 4,
    title: "Marketing Digital & performance",
    subtitle: "ACTIVER & CONVERTIR",
    description: "Site web, SEO/SEA et campagnes d'acquisition pour transformer votre visibilité en chiffre d'affaires.",
    tags: ["Site Web", "SEO / SEA", "Lead Gen"],
    color: "#CFB586",

    catchphrase: "Transformez votre visibilité en résultats mesurables.",
    intro: `Nous activons les bons leviers pour générer de la visibilité, du trafic et de la conversion. Chaque action est pensée pour produire des résultats concrets.\n Chez Bobenvy, nous créons et pilotons des stratégies digitales orientées résultats : plus de visibilité, plus de leads, plus de ventes.`,
    mission: "Transformer vos canaux digitaux en leviers de croissance via une stratégie d'activation et d'optimisation.",
    objectif: "Maximiser votre retour sur investissements (ROI) et rentabiliser vos campagnes.",
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
    ctaText: "Vous souhaitez générer plus de leads ou améliorer votre visibilité ? Contactez-nous pour accélérer votre croissance."
  },
  {
    id: 5,
    title: "Personal Branding",
    subtitle: "FAITES DE VOTRE IMAGE UN LEVIER D’INFLUENCE",
    description: "Nous accompagnons dirigeants, entrepreneurs et experts dans la construction d’une image forte, cohérente et influente.",
    tags: ["Personal Branding", "Influence", "E-réputation"],
    color: "#BCA38F",

    catchphrase: "Votre image est un levier de crédibilité, d’influence et d’opportunités.",
    intro: "Faire de votre voix une référence, dans un monde où les audiences les plus marquantes sont portées par des personnes physiques. Chez Bobenvy, nous accompagnons dirigeants, entrepreneurs, experts et talents dans la construction d’une marque personnelle forte, authentique et influente, au service de leurs objectifs professionnels.",
    mission: "Rendre visible la bonne version de vous-même avec un message clair, crédible et différenciant, loin de la simple mise en avant.",
    objectif: "Développer votre notoriété et vous positionner comme un véritable leader d'opinion.",
    whyTitle: "Pourquoi le personal branding est incontournable",
    whyText: "Nous construisons des marques personnelles alignées, stratégiques et durables, en combinant introspection, stratégie et communication. Une stratégie de personal branding bien construite vous permet d'inspirer confiance avant même le premier contact et de créer un lien authentique avec votre audience.",
    benefits: [
      "Développer votre notoriété et votre crédibilité",
      "Vous positionner comme expert ou leader d’opinion",
      "Créer des opportunités business, partenariats, clients et médias",
      "Inspirer confiance avant même le premier contact",
      "Vous différencier durablement dans votre écosystème"
    ],
    steps: [
      {
        title: "Audit personnel & positionnement",
        desc: "Poser des bases solides en analysant votre environnement, vos objectifs et votre e-réputation pour définir un positionnement clair, crédible et différenciant."
      },
      {
        title: "Plateforme de marque personnelle",
        desc: "Structurer votre identité pour construire une image cohérente et alignée avec qui vous êtes, en définissant votre proposition de valeur, votre ton de voix et votre posture."
      },
      {
        title: "Image & expression",
        desc: "Traduire votre positionnement en éléments concrets via un storytelling puissant et une ligne éditoriale sur-mesure pour rendre votre image professionnelle et reconnaissable."
      },
      {
        title: "Déploiement & accompagnement",
        desc: "Vous accompagner dans la durée pour installer votre marque personnelle dans le temps, optimiser vos réseaux sociaux (social media) et maîtriser vos prises de parole."
      }
    ],
    conclusion: "Prêt à révéler votre marque personnelle ?",
    ctaText: "Vous souhaitez développer votre visibilité, structurer votre image ou renforcer votre influence professionnelle ? Contactez-nous pour un premier échange et découvrez comment transformer votre image en opportunités."
  },
  {
    id: 6,
    title: "Communication & Influence",
    subtitle: "DÉPLOYER & FÉDÉRER",
    description: "Social media, influence et relations presse pour créer un lien durable et émotionnel avec votre audience.",
    tags: ["Réseaux sociaux ", "Influence", "PR"],
    color: "#CFB586",

    catchphrase: "Déployer votre message sur les bons canaux au bon moment.",
    intro: "Nous nous chargeons de votre communication pour renforcer votre notoriété et votre crédibilité. Bobenvy amplifie votre visibilité et votre impact. Être visible ne suffit plus : une marque doit porter un message clair, cohérent et influent pour exister durablement.",
    mission: "Transformer votre communication en levier d’influence et de préférence de marque.",
    objectif: "Capter l’attention, créer l’adhésion et renforcer votre crédibilité.",
    whyTitle: "Pourquoi l'influence est devenue stratégique",
    whyText: "Dans un environnement ultra-concurrentiel et saturé de messages, une communication maîtrisée est essentielle. Une stratégie efficace repose sur la cohérence, la crédibilité et la constance pour influencer la perception et la décision. Nous combinons stratégie éditoriale, création de messages et activation des bons relais pour maximiser votre impact.",
    benefits: [
      "Renforcer votre notoriété et image de marque",
      "Créer une relation de confiance durable",
      "Influencer la perception et la décision",
      "Amplifier vos actions marketing et commerciales"
    ],
    steps: [
      { title: "Audit & Analyse", desc: "Comprendre comment votre marque est perçue et identifier les leviers d’influence actuels." },
      { title: "Stratégie de communication", desc: "Construire un discours différenciant et diffuser le bon message, au bon moment, sur les bons canaux." },
      { title: "Influence & RP", desc: "Accroître votre visibilité et renforcer votre crédibilité par des voix influentes et des relais pertinents." },
      { title: "Activation & Event", desc: "Concevoir des événements marquants et piloter l'impact pour créer du lien avec vos cibles." },
      { title: "Pilotage et optimisation de l’impact", desc: "Maximiser l’efficacité de vos actions et construire une influence durable" }
    ],
    conclusion: "Construisez une influence durable et mesurable.",
    ctaText: "Vous souhaitez développer votre notoriété, structurer votre discours ou gagner en crédibilité ? Contactez-nous pour amplifier la portée de votre marque."
  },
  {
    id: 7,
    title: "Relation client et fidélisation",
    subtitle: "SATISFAIRE ET FIDÉLISER",
    description: "Créer une expérience client efficace et les fidéliser pour en faire de véritables ambassadeurs.",
    tags: ["Fidélisation", "Expérience client", "Satisfaction", "Parcours client"],
    color: "#8FA396", // Couleur d'exemple, à adapter si besoin

    catchphrase: "L’expérience client est un avantage concurrentiel et les clients des ambassadeurs.",
    intro: "Une relation client maîtrisée permet non seulement d’augmenter la valeur de chaque client, mais aussi de créer de la confiance, de l’engagement et de la recommandation. Nous concevons des stratégies de relation client et de fidélisation qui renforcent l’expérience, en prenant en compte chaque point de contact.",
    mission: "Chez Bobenvy, nous concevons des stratégies de relation client et de fidélisation qui renforcent l’expérience et l'excellence relationnelle.",
    objectif: "Maximiser la rétention et transformer vos clients en véritables ambassadeurs.",
    whyTitle: "Pourquoi la relation client est un enjeu stratégique",
    whyText: "Aujourd’hui, l’expérience client est souvent le premier facteur de différenciation. Nous plaçons l’expérience et la donnée au cœur de la relation pour créer des parcours clients cohérents, personnalisés et performants, en analysant les feedbacks et avis clients.",
    benefits: [
      "Augmenter la fidélité et la rétention client",
      "Améliorer la satisfaction et l’expérience globale",
      "Accroître la valeur vie client (CLV)",
      "Générer du réachat et de la recommandation",
      "Différencier votre marque par l’expérience"
    ],
    steps: [
      {
        title: "Audit de l’expérience & de la relation client",
        desc: "Analyser l’ensemble du parcours client et comprendre précisément ce que vivent vos clients via la segmentation et profils clients."
      },
      {
        title: "Stratégie de relation client",
        desc: "Structurer une stratégie adaptée à votre activité et créer une relation cohérente, utile et engageante, incluant la formation relation client si nécessaire."
      },
      {
        title: "Programmes de fidélisation & engagement",
        desc: "Concevoir des dispositifs concrets comme un programme de fidélité pour renforcer l’attachement à votre marque et atteindre l’excellence relationnelle."
      },
      {
        title: "Pilotage & optimisation continue",
        desc: "Mesurer l’efficacité de vos actions pour les améliorer dans le temps et augmenter la valeur et la durée de vie de chaque client."
      }
    ],
    conclusion: "Prêt à renforcer la relation avec vos clients ?",
    ctaText: "Vous souhaitez améliorer votre expérience client, augmenter la fidélité ou créer plus d’engagement ? Contactez-nous pour un premier échange."
  }
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
            <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] mb-2 block" style={{ color: data.color }}>{data.subtitle}</span>
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

          <div className="flex items-center gap-2 text-light-text dark:text-dark-text group-hover:text-primary transition-colors uppercase tracking-widest text-[10px] md:text-xs font-bold">
            Contactez-nous <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16} />
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

const ScrollStack = ({ headerHeight = 30, children }: { headerHeight?: number, children?: React.ReactNode }) => {
  const container = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [titleHeight, setTitleHeight] = useState(30);

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
        className="relative w-full pb-[40vh] mb-40 max-md:"
        style={{ height: scrollHeight }}
      >
        <div
          className="sticky top-0 left-0 right-0 z-29 flex flex-col justify-end pb-4 px-6 md:px-12 bg-light-bg dark:bg-dark-bg transition-all duration-300"
          style={{ height: `${titleHeight}vh` }}>
          <span className="text-primary font-mono text-xs uppercase tracking-widest block mb-4">Domaines d'intervention</span>
          <h3 className="font-museo text-5xl md:text-8xl text-light-text dark:text-dark-text transition-colors leading-none">EXPERTISES</h3>
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
                headerHeight={headerHeight}
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
          service={selectedService}
        />
      </div>
    </>
  );
};

export default ScrollStack;