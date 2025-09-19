import React, { useEffect } from 'react';
import type { View } from '../App';
import type { FloralEvent } from '../data/floralCalendarData';
import { useLocalization } from '../hooks/useLocalization';

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

interface FloralSeasonModalProps {
    event: FloralEvent;
    onClose: () => void;
    onNavigate: (view: View) => void;
}

export const FloralSeasonModal: React.FC<FloralSeasonModalProps> = ({ event, onClose, onNavigate }) => {
    const { language, t } = useLocalization();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.body.classList.add('body-no-scroll');
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.classList.remove('body-no-scroll');
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleExploreClick = () => {
        onNavigate({ page: 'floral-event', id: event.id });
        onClose();
    };

    return (
        <div className="floral-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="floral-modal" onClick={(e) => e.stopPropagation()}>
                <img src={event.image} alt={event.title[language]} className="floral-modal-background" />
                <button className="floral-modal-close-btn" onClick={onClose} aria-label="Close">
                    <CloseIcon />
                </button>
                <div className="floral-modal-content">
                    <header className="floral-modal-header">
                        <p>{event.country[language]}</p>
                        <h2 id="modal-title">{event.title[language]}</h2>
                    </header>
                    <div className="floral-modal-body">
                        <div className="floral-modal-section">
                            <h4>The Experience</h4>
                            <p>{event.experienceDescription[language]}</p>
                        </div>
                         <div className="floral-modal-section">
                            <h4>Signature Experiences</h4>
                            <ul>
                                {event.signatureExperiences.map((exp, index) => (
                                    <li key={index}>{exp[language]}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="floral-modal-section">
                            <h4>Taste of the Season</h4>
                            <p>{event.tasteOfSeason[language]}</p>
                        </div>
                        <div className="floral-modal-section">
                            <h4>Insider's Tip</h4>
                            <p>{event.insidersTip[language]}</p>
                        </div>
                    </div>
                    <div className="floral-modal-cta">
                        <button className="btn" onClick={handleExploreClick}>
                            {t('card.link.explore')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};