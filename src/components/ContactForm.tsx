import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Send, Loader2 } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
    const [formStatus, setFormStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!captchaToken) {
            alert("Veuillez valider le captcha.");
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
                    <h2 className="font-museo text-5xl md:text-7xl text-light-text dark:text-dark-text mb-6">PARLEZ-NOUS DE <br />VOTRE PROJET</h2>
                    <p className="text-light-muted dark:text-dark-muted text-lg font-light">
                        Une idée ? Un besoin de clarté ? Remplissez ce formulaire et construisons votre singularité.
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
                            <h3 className="font-museo text-3xl mb-2 text-light-text dark:text-dark-text">Message Reçu</h3>
                            <p className="opacity-60 mb-8">Nous revenons vers vous sous 24h.</p>
                            <button onClick={() => setFormStatus('IDLE')} className="text-xs font-bold uppercase tracking-widest border-b border-primary pb-1 hover:text-primary transition-colors">
                                Envoyer un autre message
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleContactSubmit} className="space-y-8 relative z-10">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-mono uppercase tracking-widest opacity-50 ml-1">Nom</label>
                                    <input
                                        required
                                        name="name"
                                        type="text"
                                        placeholder="Votre nom"
                                        className="w-full bg-transparent border-b border-light-border dark:border-dark-border px-4 py-4 focus:outline-none focus:border-primary focus:bg-light-surface/50 dark:focus:bg-dark-surface/50 transition-all text-lg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-mono uppercase tracking-widest opacity-50 ml-1">Email</label>
                                    <input
                                        required
                                        name="email"
                                        type="email"
                                        placeholder="votre@email.com"
                                        className="w-full bg-transparent border-b border-light-border dark:border-dark-border px-4 py-4 focus:outline-none focus:border-primary focus:bg-light-surface/50 dark:focus:bg-dark-surface/50 transition-all text-lg"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-widest opacity-50 ml-1">Objet</label>
                                <input
                                    required
                                    name="subject"
                                    type="text"
                                    placeholder="Sujet de votre message"
                                    className="w-full bg-transparent border-b border-light-border dark:border-dark-border px-4 py-4 focus:outline-none focus:border-primary focus:bg-light-surface/50 dark:focus:bg-dark-surface/50 transition-all text-lg"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-widest opacity-50 ml-1">Message</label>
                                <textarea
                                    required
                                    name="message"
                                    rows={4}
                                    placeholder="Décrivez votre besoin..."
                                    className="w-full bg-transparent border-b border-light-border dark:border-dark-border px-4 py-4 focus:outline-none focus:border-primary focus:bg-light-surface/50 dark:focus:bg-dark-surface/50 transition-all text-lg resize-none"
                                ></textarea>
                            </div>

                            <div className="pt-4 flex flex-col gap-6">
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                                    onChange={(token) => setCaptchaToken(token)}
                                    theme="dark"
                                />

                                <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
                                    <button
                                        type="submit"
                                        disabled={formStatus === 'SENDING' || !captchaToken}
                                        className="w-full md:w-auto bg-primary text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                    >
                                        {formStatus === 'SENDING' ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                Envoi...
                                            </>
                                        ) : (
                                            <>
                                                Envoyer <ArrowRight size={18} />
                                            </>
                                        )}
                                    </button>

                                    {formStatus === 'ERROR' && <p className="text-red-500 text-xs font-mono">Erreur lors de l'envoi. Réessayez.</p>}
                                </div>
                            </div>
                        </form>
                    )}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-light-muted dark:text-dark-muted font-light">
                        Ou écrivez nous directement à <br className="md:hidden" />
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