import React from 'react';
import type { PageTour } from '../data/countryPageData';
import type { Language } from '../context/LanguageContext';
import { useLocalization } from '../hooks/useLocalization';
import type { View } from '../App';

const TripTypeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0z" />
        <path d="M12 12.5a8.5 8.5 0 0 0-7.36 4.43c.43.23 1.6.87 3.23 1.54.8.33 1.63.63 2.47.87a14.7 14.7 0 0 0 3.32 0c.84-.24 1.67-.54 2.47-.87 1.63-.67 2.8-1.3 3.23-1.54A8.5 8.5 0 0 0 12 12.5z" />
    </svg>
);

const ActivityLevel: React.FC<{ level: number }> = ({ level }) => {
    const totalDots = 5;
    return (
        <div className="activity-level">
            {[...Array(totalDots)].map((_, i) => (
                <div key={i} className={`activity-dot ${i < level ? 'filled' : ''}`}></div>
            ))}
        </div>
    );
};

interface TourCardProps {
    tour: PageTour;
    language: Language;
    isBestSeller?: boolean;
    onNavigate: (view: View) => void;
}

export const TourCard: React.FC<TourCardProps> = ({ tour, language, isBestSeller, onNavigate }) => {
    const { t } = useLocalization();
    
    return (
        <div className="tour-card">
            <div className="tour-card-image-wrapper">
                {isBestSeller && <div className="tour-card-sale-tag">{t('tour_card.sale_tag')}</div>}
                <img src={tour.image} alt={t('tour_card.image_alt', tour.title[language])} loading="lazy" />
                <div className="tour-card-tag">
                    <TripTypeIcon />
                    <span>{tour.tripType}</span>
                </div>
            </div>
            <div className="tour-card-content">
                <div className="tour-card-region">{tour.region[language]}</div>
                <h3 className="tour-card-title">{tour.title[language]}</h3>
                <ul className="tour-card-details">
                    <li><strong>{t('tour_card.duration')}:</strong> <span>{tour.duration[language]}</span></li>
                    <li>
                        <strong>{t('tour_card.activity_level')}:</strong> 
                        <ActivityLevel level={tour.activityLevel} />
                    </li>
                    <li><strong>{t('tour_card.from')}:</strong> <span>{tour.price[language]}</span></li>
                    <li><strong>{t('tour_card.available_months')}:</strong> <span>{tour.availableMonths[language]}</span></li>
                </ul>
                <div className="tour-card-footer">
                    <a href={`/tours/${tour.id}`} className="btn btn-details">
                        {t('tour_card.view_details_btn')}
                    </a>
                </div>
            </div>
        </div>
    );
};