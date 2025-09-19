import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';

export const NewsletterSignUp = () => {
    const { t } = useLocalization();
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (email && /^\S+@\S+\.\S+$/.test(email)) {
            setIsSubmitted(true);
            // In a real app, you would send the email to a server here.
        } else {
            alert(t('newsletter.alert.invalid_email'));
        }
    };

    if (isSubmitted) {
        return (
            <section id="newsletter" className="newsletter-section">
                <h2 className="section-title">{t('newsletter.success.title')}</h2>
                <p className="confirmation-message">{t('newsletter.success.message')}</p>
            </section>
        );
    }

    return (
        <section id="newsletter" className="newsletter-section">
            <h2 className="section-title">{t('newsletter.title')}</h2>
            <p className="newsletter-subtitle">{t('newsletter.subtitle')}</p>
            <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
                <input
                    type="email"
                    className="newsletter-input"
                    placeholder={t('newsletter.placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label={t('newsletter.label')}
                />
                <button type="submit" className="btn newsletter-btn">{t('newsletter.button')}</button>
            </form>
        </section>
    );
};