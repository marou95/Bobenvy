import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useTranslation } from "react-i18next";

// API
import { getHomeHero, type HomeHero } from "../lib/sanity";

// Components
import ScrollStack from "../components/ScrollStack";
import AboutSection from "../components/AboutSection";
import PortfolioPreview from "../components/PortfolioPreview";
import ResourcesPreview from "../components/ResourcesPreview";
import Navbar from "../components/Navbar";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const HomePage = () => {
  const { t, i18n } = useTranslation();

  const [titleHeight, setTitleHeight] = useState(30);
  const [heroData, setHeroData] = useState<HomeHero | null>(null);

  useEffect(() => {
    // Récupération des données du Hero depuis Sanity
    getHomeHero(i18n.language).then(setHeroData).catch(console.error);
  }, [i18n.language]); // Très important : le useEffect surveille la langue

  useEffect(() => {
    const handleResize = () => {
      setTitleHeight(window.innerWidth < 768 ? 20 : 28);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text font-sans selection:bg-primary selection:text-black transition-colors duration-500">
      <Navbar />

      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden bg-dark-bg">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          src={heroData?.videoUrl || ""}
        />
        <div className="absolute inset-0 w-full h-full p-6 md:p-12 z-10 flex flex-col justify-end items-center text-center md:items-stretch md:text-left">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <h1 className="font-museo max-md:text-[clamp(1.125rem,4.25vw,1.75rem)] md:text-[8vw] leading-[0.85] md:leading-[0.8] font-bold tracking-tighter uppercase text-white mix-blend-overlay opacity-90 mb-6 md:mb-0 max-md:whitespace-nowrap max-md:max-w-full">
              {heroData?.title || "Bobenvy"}
            </h1>
            <div className="flex flex-col items-center md:flex-row md:justify-between md:items-end md:mt-8">
              <h2 className="max-w-screen-md text-lg md:text-2xl font-light leading-tight text-white/90 flex flex-col items-center md:items-start">
                <span className="max-md:whitespace-nowrap md:whitespace-pre-line">
                  {heroData?.subtitle || t("home.hero.fallback_subtitle")}
                </span>
                <span className="text-primary text-2xl md:text-4xl italic font-serif mt-2 max-md:whitespace-nowrap">
                  {heroData?.highlight || t("home.hero.fallback_highlight")}
                </span>
              </h2>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="py-10 px-6 md:px-24 bg-light-bg dark:bg-dark-bg transition-colors duration-500 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-light-muted dark:text-dark-muted transition-colors leading-tight">
            <span className="block mb-6 md:mb-4">
              {t("home.manifesto.line1")}
            </span>

            <span className="block mb-6 md:mb-4 text-light-text dark:text-dark-text">
              {t("home.manifesto.line2")}
            </span>

            <span className="block mb-8 md:mb-8 text-light-text dark:text-dark-text">
              {t("home.manifesto.line3")}
            </span>

            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="block text-primary font-serif italic text-3xl md:text-4xl lg:text-5xl mt-4"
            >
              {t("home.manifesto.line4")}
            </motion.span>
          </h2>
        </div>
      </section>

      {/* ABOUT */}
      <div id="about">
        <AboutSection />
      </div>

      {/* --- SERVICES --- */}
      <div
        id="services"
        className="relative bg-light-bg dark:bg-dark-bg transition-colors duration-500 min-h-screen"
      >
        <div className="relative z-10 pb-20">
          <ScrollStack />
        </div>
      </div>

      {/* PORTFOLIO PREVIEW */}
      <div id="portfolio"></div>
      <PortfolioPreview />

      {/* RESOURCES PREVIEW */}
      <div id="ressources">
        <ResourcesPreview />
      </div>

      {/* SCROLL TO TOP BUTTON */}
      <ScrollToTop />

      {/* CONTACT FORM SECTION */}
      <ContactForm />

      <Footer />
    </div>
  );
};

export default HomePage;
