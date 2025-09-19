import React, { useState } from 'react';
import type { TripType } from '../data/experiencesMegaMenuData';
import { useLocalization } from '../hooks/useLocalization';

type NavigationObject = 
  | { page: 'tour'; id: string } 
  | { page: 'country'; slug: string };

interface ExperiencesMegaMenuPanelProps {
    tripTypes: TripType[];
    onExperienceClick: (slug: string) => void;
    onViewAllClick: (tripTypeId: string) => void;
    onFeaturedTripClick: (navigation: NavigationObject) => void;
}

export const ExperiencesMegaMenuPanel: React.FC<ExperiencesMegaMenuPanelProps> = ({ tripTypes, onExperienceClick, onViewAllClick, onFeaturedTripClick }) => {
    const [activeTypeId, setActiveTypeId] = useState(tripTypes[0]?.id || '');
    const { language, t } = useLocalization();

    const handleTripTypeClick = (tripType: TripType) => {
        if (tripType.id === 'floral-calendar') {
            onExperienceClick('floral-calendar');
        } else {
            setActiveTypeId(tripType.id);
        }
    };
    
    const activeTripType = tripTypes.find(t => t.id === activeTypeId);

    if (!activeTripType) return null;

    const { name, description, subCategories, featuredTrips } = activeTripType;

    const handleExperienceClick = (e: React.MouseEvent, slug: string) => {
        e.preventDefault();
        onExperienceClick(slug);
    }
    
    return (
        <div className="mega-menu-panel">
            <div className="mega-menu-grid experiences-mega-menu-grid">
                
                <div className="mega-menu-trip-types">
                    <div className="mega-menu-column-title">{t('mega_menu.exp.select_trip_type')}</div>
                    <ul>
                        {tripTypes.map(tripType => (
                            <li key={tripType.id}>
                                <button 
                                    onClick={() => handleTripTypeClick(tripType)}
                                    data-active={tripType.id === activeTypeId}
                                >
                                    {tripType.name[language]}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="mega-menu-sub-categories">
                     <ul>
                        {subCategories.map(category => (
                            <li key={category.slug}>
                                <a href="#" onClick={(e) => handleExperienceClick(e, category.slug)}>{category.name[language]}</a>
                            </li>
                        ))}
                        <hr />
                        <li>
                            <a 
                                href="#" 
                                className="view-all-btn"
                                onClick={(e) => { e.preventDefault(); onViewAllClick(activeTripType.id); }}
                            >
                                {t('mega_menu.exp.view_all_trips', name[language].toUpperCase())}
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="mega-menu-trip-details">
                    <h3>{name[language]}</h3>
                    <p>{description[language]}</p>
                    <h4>{t('mega_menu.exp.featured_trips')}</h4>
                    <div className="mega-menu-featured-trips-grid">
                        {featuredTrips.map(trip => (
                            <a 
                                href="#" 
                                key={trip.slug} 
                                className="featured-trip-card"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onFeaturedTripClick(trip.navigation);
                                }}
                            >
                                <img src={trip.image} alt={trip.title[language]} loading="lazy" />
                                <div className="featured-trip-card-content">
                                    <div className="title">{trip.title[language]}</div>
                                    <div className="subtitle">{trip.subtitle[language]}</div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};