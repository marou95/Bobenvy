import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Send, Loader2, ChevronDown } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';

const ContactForm = () => {
    const { t, i18n } = useTranslation();
    const [formStatus, setFormStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!captchaToken) {
            alert(t('contactForm.captcha_alert'));
            return;
        }

        setFormStatus('SENDING');
        const form = e.currentTarget;

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                form,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            setFormStatus('SUCCESS');
            form.reset();
            setCaptchaToken(null);
            recaptchaRef.current?.reset();
        } catch (error) {
            console.error("Erreur d'envoi:", error);
            setFormStatus('ERROR');
        }
    };

    return (
        <div id="contact" className="py-32 px-6 md:px-12 bg-light-surface dark:bg-dark-surface transition-colors duration-500 relative z-0">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-museo text-5xl md:text-7xl text-light-text dark:text-dark-text mb-6">
                        {t('contactForm.title_p1')} <br />{t('contactForm.title_p2')}
                    </h2>
                    <p className="text-light-muted dark:text-dark-muted text-lg font-light">
                        {t('contactForm.subtitle')}
                    </p>
                </div>

                <div className="bg-light-bg dark:bg-dark-bg p-8 md:p-12 rounded-3xl border border-light-border dark:border-dark-border shadow-2xl relative overflow-hidden">
                    {formStatus === 'SUCCESS' ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-20"
                        >
                            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                                <Send size={32} className="text-black ml-1" />
                            </div>
                            <h3 className="font-museo text-3xl mb-2 text-light-text dark:text-dark-text">
                                {t('contactForm.success_title')}
                            </h3>
                            <p className="opacity-60 mb-8">{t('contactForm.success_subtitle')}</p>
                            <button 
                                onClick={() => setFormStatus('IDLE')} 
                                className="text-xs font-bold uppercase tracking-widest border-b border-primary pb-1 hover:text-primary transition-colors cursor-pointer"
                            >
                                {t('contactForm.success_reset')}
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleContactSubmit} className="space-y-8 relative z-10">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-mono uppercase tracking-widest opacity-50 ml-1">
                                        {t('contactForm.label_name')}
                                    </label>
                                    <input
                                        required
                                        name="name"
                                        type="text"
                                        placeholder={t('contactForm.placeholder_name')}
                                        className="w-full bg-transparent border-b border-light-border dark:border-dark-border px-4 py-4 focus:outline-none focus:border-primary focus:bg-light-surface/50 dark:focus:bg-dark-surface/50 transition-all text-lg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-mono uppercase tracking-widest opacity-50 ml-1">
                                        {t('contactForm.label_email')}
                                    </label>
                                    <input
                                        required
                                        name="email"
                                        type="email"
                                        placeholder={t('contactForm.placeholder_email')}
                                        className="w-full bg-transparent border-b border-light-border dark:border-dark-border px-4 py-4 focus:outline-none focus:border-primary focus:bg-light-surface/50 dark:focus:bg-dark-surface/50 transition-all text-lg"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-widest opacity-50 ml-1">
                                    {t('contactForm.label_subject')}
                                </label>
                                <div className="relative">
                                    <select
                                        required
                                        name="subject"
                                        defaultValue=""
                                        className="w-full bg-transparent border-b border-light-border dark:border-dark-border px-4 py-4 focus:outline-none focus:border-primary focus:bg-light-surface/50 dark:focus:bg-dark-surface/50 transition-all text-lg appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled className="bg-light-bg dark:bg-dark-bg">{t('contactForm.placeholder_subject')}</option>
                                        <option value="Devis" className="bg-light-bg dark:bg-dark-bg">{t('contactForm.subjects.quote')}</option>
                                        <option value="Audit" className="bg-light-bg dark:bg-dark-bg">{t('contactForm.subjects.audit')}</option>
                                        <option value="Visibilité" className="bg-light-bg dark:bg-dark-bg">{t('contactForm.subjects.visibility')}</option>
                                        <option value="Projet" className="bg-light-bg dark:bg-dark-bg">{t('contactForm.subjects.launch')}</option>
                                        <option value="Social" className="bg-light-bg dark:bg-dark-bg">{t('contactForm.subjects.social')}</option>
                                        <option value="Website" className="bg-light-bg dark:bg-dark-bg">{t('contactForm.subjects.website')}</option>
                                        <option value="Partnership" className="bg-light-bg dark:bg-dark-bg">{t('contactForm.subjects.partnership')}</option>
                                        <option value="Career" className="bg-light-bg dark:bg-dark-bg">{t('contactForm.subjects.career')}</option>
                                        <option value="Other" className="bg-light-bg dark:bg-dark-bg">{t('contactForm.subjects.other')}</option>
                                    </select>
                                    <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-widest opacity-50 ml-1">
                                    {t('contactForm.label_message')}
                                </label>
                                <textarea
                                    required
                                    name="message"
                                    rows={4}
                                    placeholder={t('contactForm.placeholder_message')}
                                    className="w-full bg-transparent border-b border-light-border dark:border-dark-border px-4 py-4 focus:outline-none focus:border-primary focus:bg-light-surface/50 dark:focus:bg-dark-surface/50 transition-all text-lg resize-none"
                                ></textarea>
                            </div>

                            <div className="pt-4 flex flex-col gap-6">
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                                    onChange={(token) => setCaptchaToken(token)}
                                    theme="dark"
                                    hl={i18n.language} // Adapte la langue du Captcha
                                />

                                <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
                                    <button
                                        type="submit"
                                        disabled={formStatus === 'SENDING' || !captchaToken}
                                        className="w-full md:w-auto bg-primary text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 cursor-pointer"
                                    >
                                        {formStatus === 'SENDING' ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                {t('contactForm.btn_sending')}
                                            </>
                                        ) : (
                                            <>
                                                {t('contactForm.btn_send')} <ArrowRight size={18} />
                                            </>
                                        )}
                                    </button>

                                    {formStatus === 'ERROR' && (
                                        <p className="text-red-500 text-xs font-mono">{t('contactForm.error_msg')}</p>
                                    )}
                                </div>
                            </div>
                        </form>
                    )}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-light-muted dark:text-dark-muted font-light">
                        {t('contactForm.footer_text')} <br className="md:hidden" />
                        <a href="mailto:contact@bobenvy.com" className="text-light-text dark:text-dark-text font-bold hover:text-primary transition-colors ml-1 border-b border-transparent hover:border-primary">
                            contact@bobenvy.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;