import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Define resources
const resources = {
  en: {
    translation: {
      hero: {
        title: "Bobenvy",
        subtitle: "Strategie",
        description: "We help leaders transform their ideas into winning strategies, assert their positioning, and reveal their uniqueness and that of their brand, with an approach that is both rigorous and deeply human.",
        cta: "Explore Portfolio",

      },
      nav: {
        home: "Accueil",
        about: "A propos",
        services: "Services",
        portfolio: "Realisation & Portfolio",
        blog: "Blog & ressources",
        contact: "Contact",
        back: "Go back"
      },
      blog: {
        title: "Lab Journal",
        read_more: "Read Analysis",
        archiveIntro: "Complete technical archive of formulation reports and food engineering research."
      },
      contact: {
        title: "Contact Me",
        name: "Name",
        email: "Email",
        message: "Your Message",
        send: "Transmit Request",
        success: "Data transmitted successfully."
      }
    }
  },
  fr: {
    translation: {
      hero: {
        title: "Bobenvy",
        subtitle: "Stratégie",
        description: "Nous accompagnons les dirigeants dans la transformation de leurs idées en stratégie gagnante, l’affirmation de leur positionnement et la révélation de leur singularité et celle de leur marque, avec une approche à la fois rigoureuse et profondément humaine.",
        cta: "Explorer le Portfolio",
      },
      nav: {
        home: "Accueil",
        about: "A propos",
        services: "Services",
        portfolio: "Realisation & Portfolio",
        blog: "Blog & ressources",
        contact: "Contact",
        back: "Retour"
      },
      blog: {
        title: "Journal de Labo",
        read_more: "Lire l'Analyse",
        archiveIntro: "Archive technique complète des rapports de formulation et de la recherche en ingénierie alimentaire."
      },
      contact: {
        title: "Contactez-moi",
        name: "Nom",
        email: "Email",
        message: "Votre Message",
        send: "Transmettre la Demande",
        success: "Données transmises avec succès."
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
