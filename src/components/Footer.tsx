import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { PopupModal } from 'react-calendly';
import { useTranslation } from 'react-i18next';
import { CALENDLY_CONFIG } from '../config';

const Footer = () => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('/#')) {
            e.preventDefault();
            const targetId = href.replace('/#', '');
            const performSmoothScroll = () => {
                const element = document.getElementById(targetId);
                if (element) {
                    const offset = 85;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - offset;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
            };
            if (location.pathname === '/') {
                setTimeout(performSmoothScroll, 100);
            } else {
                navigate('/');
                setTimeout(performSmoothScroll, 500);
            }
        }
    };

    const getServiceIndex = (key: string) => {
        const isEn = i18n.language === 'en';
        const map: Record<string, number> = isEn 
            ? { strategy: 0, branding: 1, digital: 3, personal: 4, influence: 5, crm: 6 }
            : { strategy: 0, branding: 1, digital: 2, personal: 3, influence: 4, crm: 5 };
        return map[key] ?? 0;
    };

    return (
        <footer className="bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border relative z-0 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20">

                    {/* COLONNE 1 : NAVIGATION */}
                    <div className="flex flex-col gap-6">
                        <span className="text-primary font-mono text-xs uppercase tracking-widest">
                            {t('footer.nav_title')}
                        </span>
                        <nav className="flex flex-col gap-4">
                            <a href="/#about" onClick={(e) => handleNavClick(e, '/#about')} className="text-lg md:text-xl font-light text-light-text dark:text-dark-text hover:text-primary transition-colors w-fit">
                                {t('footer.nav_about')}
                            </a>
                            <a href="/#services" onClick={(e) => handleNavClick(e, '/#services')} className="text-lg md:text-xl font-light text-light-text dark:text-dark-text hover:text-primary transition-colors w-fit">
                                {t('footer.nav_services')}
                            </a>
                            <a href="/#portfolio" onClick={(e) => handleNavClick(e, '/#portfolio')} className="text-lg md:text-xl font-light text-light-text dark:text-dark-text hover:text-primary transition-colors w-fit">
                                {t('footer.nav_portfolio')}
                            </a>
                            <a href="/#ressources" onClick={(e) => handleNavClick(e, '/#ressources')} className="text-lg md:text-xl font-light text-light-text dark:text-dark-text hover:text-primary transition-colors w-fit">
                                {t('footer.nav_ressources')}
                            </a>
                        </nav>
                    </div>

                    {/* COLONNE 2 : SERVICES */}
                    <div className="flex flex-col gap-6">
                        <span className="text-primary font-mono text-xs uppercase tracking-widest">
                            {t('footer.services_title')}
                        </span>
                        <div className="flex flex-col gap-4">
                            <a href={`/#service-${getServiceIndex('strategy')}`} onClick={(e) => handleNavClick(e, `/#service-${getServiceIndex('strategy')}`)} className="text-sm md:text-base font-light text-light-muted dark:text-dark-muted hover:text-primary transition-colors w-fit">{t('footer.services_list.strategy')}</a>
                            <a href={`/#service-${getServiceIndex('branding')}`} onClick={(e) => handleNavClick(e, `/#service-${getServiceIndex('branding')}`)} className="text-sm md:text-base font-light text-light-muted dark:text-dark-muted hover:text-primary transition-colors w-fit">{t('footer.services_list.branding')}</a>
                            <a href={`/#service-${getServiceIndex('digital')}`} onClick={(e) => handleNavClick(e, `/#service-${getServiceIndex('digital')}`)} className="text-sm md:text-base font-light text-light-muted dark:text-dark-muted hover:text-primary transition-colors w-fit">{t('footer.services_list.digital')}</a>
                            <a href={`/#service-${getServiceIndex('personal')}`} onClick={(e) => handleNavClick(e, `/#service-${getServiceIndex('personal')}`)} className="text-sm md:text-base font-light text-light-muted dark:text-dark-muted hover:text-primary transition-colors w-fit">{t('footer.services_list.personal')}</a>
                            <a href={`/#service-${getServiceIndex('influence')}`} onClick={(e) => handleNavClick(e, `/#service-${getServiceIndex('influence')}`)} className="text-sm md:text-base font-light text-light-muted dark:text-dark-muted hover:text-primary transition-colors w-fit">{t('footer.services_list.influence')}</a>
                            <a href={`/#service-${getServiceIndex('crm')}`} onClick={(e) => handleNavClick(e, `/#service-${getServiceIndex('crm')}`)} className="text-sm md:text-base font-light text-light-muted dark:text-dark-muted hover:text-primary transition-colors w-fit">{t('footer.services_list.crm')}</a>
                        </div>
                    </div>

                    {/* COLONNE 3 : CONTACT & CTA */}
                    <div className="flex flex-col gap-6">
                        <span className="text-primary font-mono text-xs uppercase tracking-widest">
                            {t('footer.contact_title')}
                        </span>
                        <p className="text-light-text dark:text-dark-text font-light text-lg mb-4">
                            {t('footer.contact_phrase')} <br />{t('footer.contact_subphrase')}
                        </p>

                        <div className="flex flex-col gap-4">
                            <a href="#contact" className="group flex items-center justify-between bg-primary text-black px-6 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform w-full sm:w-max">
                                {t('footer.cta_contact')} <ArrowRight size={16} className="ml-4 group-hover:translate-x-1 transition-transform" />
                            </a>

                            <button onClick={() => setIsOpen(true)} className="group flex items-center justify-between border border-light-border dark:border-dark-border text-light-text dark:text-dark-text px-6 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:border-primary hover:text-primary transition-colors w-full sm:w-max cursor-pointer">
                                {t('footer.cta_calendar')} <Calendar size={16} className="ml-4 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>

                        <a href="mailto:contact@bobenvy.com" className="text-light-muted dark:text-dark-muted hover:text-primary transition-colors font-mono text-sm mt-4 w-fit">
                            contact@bobenvy.com
                        </a>
                    </div>

                </div>
            </div>

            {/* BARRE INFÉRIEURE */}
            <div className="px-6 md:px-12 py-8 border-t border-light-border dark:border-dark-border flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-mono text-light-muted dark:text-dark-muted uppercase">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                    <span>© {new Date().getFullYear()} Bobenvy</span>
                    <Link to="/mentions-legales" className="hover:text-light-text dark:hover:text-white transition-colors">
                        {t('footer.legal')}
                    </Link>
                    <a href="https://www.linkedin.com/in/marwen-jaiem-blot-89453115a/" target="_blank" rel="noopener noreferrer" className="hover:text-light-text dark:hover:text-white transition-colors">
                        {t('footer.credit')}
                    </a>
                </div>

                <div className="flex gap-6">
                    <a href="https://www.linkedin.com/company/bobenvy/" target="_blank" rel="noopener noreferrer" className="hover:text-light-text dark:hover:text-white transition-colors">LinkedIn</a>
                    <a href="https://www.instagram.com/bobenvy/" target='_blank' className="hover:text-light-text dark:hover:text-white transition-colors">Instagram</a>
                    <a href="https://www.facebook.com/profile.php?id=61576514106429" target="_blank" rel="noopener noreferrer" className="hover:text-light-text dark:hover:text-white transition-colors">Facebook</a>
                </div>
            </div>

            {/* MODALE CALENDLY */}
            <PopupModal
                url={CALENDLY_CONFIG.URL}
                onModalClose={() => setIsOpen(false)}
                open={isOpen}
                rootElement={document.getElementById("root")!}
            />
        </footer>
    );
};

export default Footer;