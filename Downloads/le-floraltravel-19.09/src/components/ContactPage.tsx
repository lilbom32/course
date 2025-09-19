import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { Section } from './Section';

export const ContactPage: React.FC = () => {
    const { t } = useLocalization();
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation
        if (formState.name && formState.email && formState.message) {
            console.log('Form submitted:', formState);
            setIsSubmitted(true);
        } else {
            alert('Please fill out all fields.');
        }
    };


    return (
        <div className="contact-page">
            <header className="contact-page-hero">
                <h1>{t('contact_page.hero.title')}</h1>
                <p>{t('contact_page.hero.subtitle')}</p>
            </header>

            <Section id="contact-details" title="">
                <div className="contact-layout">
                    <div className="contact-info">
                        <h3>{t('contact_page.info.title')}</h3>
                        <ul className="contact-info-list">
                            <li className="contact-info-item">
                                <strong>{t('contact_page.info.address_label')}</strong>
                                <span>{t('contact_page.info.address_value')}</span>
                            </li>
                             <li className="contact-info-item">
                                <strong>{t('contact_page.info.phone_label')}</strong>
                                <span><a href={`tel:${t('contact_page.info.phone_value')}`}>{t('contact_page.info.phone_value')}</a></span>
                            </li>
                             <li className="contact-info-item">
                                <strong>{t('contact_page.info.email_label')}</strong>
                                <span><a href={`mailto:${t('contact_page.info.email_value')}`}>{t('contact_page.info.email_value')}</a></span>
                            </li>
                             <li className="contact-info-item">
                                <strong>{t('contact_page.info.hours_label')}</strong>
                                <span>{t('contact_page.info.hours_value')}</span>
                            </li>
                        </ul>
                    </div>

                    <div className="contact-form-container">
                        <h3>{t('contact_page.form.title')}</h3>
                        {isSubmitted ? (
                            <div className="confirmation-message" style={{textAlign: 'left'}}>
                                {t('contact_page.form.success_message')}
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        name="name"
                                        className="form-input" 
                                        placeholder={t('contact_page.form.name_placeholder')}
                                        value={formState.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="email" 
                                        name="email"
                                        className="form-input" 
                                        placeholder={t('contact_page.form.email_placeholder')}
                                        value={formState.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea 
                                        name="message"
                                        className="form-textarea" 
                                        placeholder={t('contact_page.form.message_placeholder')}
                                        rows={5}
                                        value={formState.message}
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn">{t('contact_page.form.button')}</button>
                            </form>
                        )}
                    </div>
                </div>
            </Section>
            
            <Section id="map" title="">
                 <div className="map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.186595564819!2d2.292292615674838!3d48.8737917792892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fec7022da5b%3A0x320b2f155a49800!2sArc%20de%20Triomphe!5e0!3m2!1sen!2sfr!4v1658500000000!5m2!1sen!2sfr"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Le FloralTravel Office Location"
                    ></iframe>
                </div>
            </Section>

        </div>
    );
};