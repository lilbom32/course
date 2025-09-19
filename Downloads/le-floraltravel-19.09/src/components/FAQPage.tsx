import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { faqData } from '../data/faqData';
import { Section } from './Section';
import { FAQAccordion } from './FAQAccordion';

export const FAQPage: React.FC = () => {
    const { t, language } = useLocalization();
    const [openId, setOpenId] = useState<string | null>(faqData.length > 0 ? faqData[0].id : null);

    const handleToggle = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="faq-page">
            <header className="faq-page-hero">
                <h1 className="section-title">{t('faq_page.title')}</h1>
                <p className="faq-page-subtitle">{t('faq_page.subtitle')}</p>
            </header>

            <Section id="faq-list" title="">
                <div className="faq-accordion-section">
                    {faqData.map(item => (
                        <FAQAccordion
                            key={item.id}
                            item={{
                                question: item.question[language],
                                answer: item.answer[language]
                            }}
                            isOpen={openId === item.id}
                            onClick={() => handleToggle(item.id)}
                        />
                    ))}
                </div>
            </Section>
        </div>
    );
};