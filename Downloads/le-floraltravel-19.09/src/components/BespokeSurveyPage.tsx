import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { Section } from './Section';
import { BespokeSurveyForm } from './BespokeSurveyForm';
import { ConfirmationPopup } from './ConfirmationPopup';
import type { View } from '../App';


interface BespokeSurveyPageProps {
    onNavigate: (view: View) => void;
}

export const BespokeSurveyPage: React.FC<BespokeSurveyPageProps> = ({ onNavigate }) => {
    const { t } = useLocalization();
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const handleSuccess = () => {
        setIsSubmitted(true);
        window.scrollTo(0, 0);
    };

    const handleClosePopup = () => {
        setIsSubmitted(false);
        onNavigate({ page: 'home' });
    }

    return (
        <div className="bespoke-survey-page">
            <div className="content-section" style={{ paddingBottom: 0 }}>
                <h1 className="bespoke-page-title">{t('bespoke_survey.hero.title')}</h1>
            </div>

            <Section id="bespoke-story" title="" className="bg-alt">
                <div className="bespoke-survey-story-section">
                    <h2 className="bespoke-survey-story-title">{t('bespoke_survey.story.title')}</h2>
                    <p className="bespoke-survey-story-quote">{t('bespoke_survey.story.quote')}</p>
                    <p className="bespoke-survey-story-author">{t('bespoke_survey.story.author')}</p>
                </div>
            </Section>

            <Section id="bespoke-form" title="" className="form-background-section">
                <BespokeSurveyForm onSuccess={handleSuccess} />
            </Section>
            
            {isSubmitted && <ConfirmationPopup onClose={handleClosePopup} />}
        </div>
    );
};