import React from 'react';
import type { Region } from '../data/megaMenuData';
import { useLocalization } from '../hooks/useLocalization';
import type { View } from '../App';

type NavigationObject = 
  | { page: 'tour'; id: string } 
  | { page: 'country'; slug: string } 
  | { page: 'floral-event'; id: string };

interface MegaMenuPanelProps {
    regions: Region[];
    activeRegion: Region;
    onRegionClick: (id: string) => void;
    onCountryClick: (slug: string) => void;
    onFeaturedTourClick: (navigation: NavigationObject) => void;
}

export const MegaMenuPanel: React.FC<MegaMenuPanelProps> = ({ regions, activeRegion, onRegionClick, onCountryClick, onFeaturedTourClick }) => {
    const { language, t } = useLocalization();
    return (
        <div className="mega-menu-panel">
            <div className="mega-menu-grid destinations-mega-menu-grid">
                <div className="mega-menu-regions">
                    <ul>
                        {regions.map(region => (
                            <li key={region.id}>
                                <button 
                                    onClick={() => onRegionClick(region.id)}
                                    data-active={region.id === activeRegion.id}
                                >
                                    {region.name[language]}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mega-menu-countries">
                    <ul>
                        {activeRegion.countries.map(country => (
                            <li key={country.slug}>
                                <a 
                                  href={`#destinations/${country.slug}`} 
                                  onClick={(e) => {
                                    e.preventDefault();
                                    onCountryClick(country.slug);
                                  }}
                                >
                                  {country.name[language]}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mega-menu-featured">
                    <h3>{t('mega_menu.featured_in', activeRegion.name[language])}</h3>
                    <p>{activeRegion.description[language]}</p>
                    <div className="mega-menu-featured-tours">
                        {activeRegion.featuredTours.map(tour => (
                            <a 
                                href="#" 
                                key={tour.slug}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onFeaturedTourClick(tour.navigation);
                                }}
                            >
                                <img src={tour.image} alt={tour.title[language]} loading="lazy" />
                                <span>{tour.title[language]}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};