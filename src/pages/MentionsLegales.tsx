import React, { useEffect, useState } from 'react';
import { PortableText } from '@portabletext/react';
import { useTranslation } from 'react-i18next'; // 1. Importe le hook
import { getLegalPage, LegalPage } from '../lib/sanity';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const portableTextComponents = {
    block: {
        h2: ({ children }: any) => <h2 className="text-xl md:text-2xl font-museo mb-6 mt-16 text-primary uppercase">{children}</h2>,
        normal: ({ children }: any) => <p className="mb-4">{children}</p>,
    },
    marks: {
        strong: ({ children }: any) => <strong className="font-bold text-light-text dark:text-dark-text">{children}</strong>,
        link: ({ value, children }: any) => (
            <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline border-b border-primary/30">
                {children}
            </a>
        ),
    },
};

const MentionsLegales = () => {
    // 2. Récupère i18n via le hook pour activer la réactivité
    const { i18n, t } = useTranslation();
    const [legalData, setLegalData] = useState<LegalPage | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);
        
        // 3. Utilise i18n.language provenant du hook
        getLegalPage(i18n.language)
            .then((data) => {
                setLegalData(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [i18n.language]); // Ce useEffect se déclenchera à chaque changement de langue

    return (
        <div className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text min-h-screen transition-colors duration-500">
            <Navbar />

            <div className="pt-40 pb-32 px-6 md:px-12 max-w-4xl mx-auto">
                <h1 className="font-museo text-4xl md:text-6xl mb-16 uppercase tracking-tighter text-light-text dark:text-dark-text">
                    {/* Utilise t('footer.legal') comme fallback pendant le chargement */}
                    {legalData?.title || t('footer.legal') || 'Mentions Légales'}
                </h1>

                <div className="font-light leading-relaxed text-light-muted dark:text-dark-muted">
                    {loading ? (
                        <p className="animate-pulse">Chargement des informations...</p>
                    ) : legalData?.content ? (
                        <PortableText value={legalData.content} components={portableTextComponents} />
                    ) : (
                        <p>Contenu non disponible pour cette langue.</p>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default MentionsLegales;