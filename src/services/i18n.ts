import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './fr.json';
import en from './en.json';

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
        portfolio: "Portfolio",
        ressources: "Ressources",
        contact: "Contact",
        back: "Go back"
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
        portfolio: "Portfolio",
        ressources: "Blog & ressources",
        contact: "Contact",
        back: "Retour"
      },
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en }
    },
    lng: 'fr', // La langue par défaut au premier chargement
    fallbackLng: 'fr', // La langue de secours s'il manque une traduction
    interpolation: {
      escapeValue: false // React protège déjà contre les injections XSS
    }
  });

export default i18n;
