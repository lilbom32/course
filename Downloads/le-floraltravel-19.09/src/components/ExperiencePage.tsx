import React, { useState, useMemo } from 'react';
import { experiencePageData } from '../data/experiencePageData';
import { countryPageData, PageTour } from '../data/countryPageData';
import { TourCard } from './TourCard';
import { useLocalization } from '../hooks/useLocalization';
import { megaMenuData } from '../data/megaMenuData';
import type { View } from '../App';
import { bestSellerTourIds } from '../data/bestsellers';

interface ExperiencePageProps {
    slug: string;
    onNavigate: (view: View) => void;
}

export const ExperiencePage: React.FC<ExperiencePageProps> = ({ slug, onNavigate }) => {
    const { language, t } = useLocalization();
    
    const allTours: PageTour[] = useMemo(() => countryPageData.flatMap(country => country.tours), []);
    
    const experience = useMemo(() => 
        experiencePageData.find(e => e.slug === slug),
        [slug]
    );

    const toursForExperience = useMemo(() => 
        allTours.filter(tour => {
             // Normalize experience name to create a slug-like key
            const tourExpSlug = tour.experience.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
            return tourExpSlug === slug;
        }),
        [allTours, slug]
    );

    const [countryFilter, setCountryFilter] = useState('All');
    const [activityLevelFilter, setActivityLevelFilter] = useState('All');
    const [tripTypeFilter, setTripTypeFilter] = useState('All');
    
    const uniqueCountries = useMemo(() => {
        const countrySlugs = [...new Set(toursForExperience.map(t => t.region.en.toLowerCase()))];
        return megaMenuData.regions
            .flatMap(region => region.countries)
            .filter(country => countrySlugs.includes(country.name.en.toLowerCase()));
    }, [toursForExperience]);

    const uniqueActivityLevels = useMemo(() => 
        [...new Set(toursForExperience.map(t => t.activityLevel))].sort((a,b) => a - b),
    [toursForExperience]);

    const uniqueTripTypes = useMemo(() => 
        [...new Set(toursForExperience.map(t => t.tripType))], 
    [toursForExperience]);


    const filteredTours = useMemo(() => {
        return toursForExperience.filter(tour => {
            const countryMatch = countryFilter === 'All' || tour.region.en.toLowerCase() === countryFilter.toLowerCase();
            const activityLevelMatch = activityLevelFilter === 'All' || tour.activityLevel === parseInt(activityLevelFilter);
            const tripTypeMatch = tripTypeFilter === 'All' || tour.tripType === tripTypeFilter;
            
            return countryMatch && activityLevelMatch && tripTypeMatch;
        });
    }, [toursForExperience, countryFilter, activityLevelFilter, tripTypeFilter]);
    
     const handleReset = () => {
        setCountryFilter('All');
        setActivityLevelFilter('All');
        setTripTypeFilter('All');
    };

    if (!experience) {
        return (
            <div className="content-section">
                <p style={{textAlign: 'center'}}>{t('experience_page.not_found')}</p>
            </div>
        );
    }

    return (
        <div className="country-page">
            <div className="country-page-hero" style={{ backgroundImage: `url(${experience.heroImage})` }}>
                <div className="country-page-hero-overlay">
                    <h1 className="country-page-title">{experience.name[language]}</h1>
                </div>
            </div>
            <div className="content-section">
                <p className="country-page-description">{experience.description[language]}</p>
            </div>
            
            {toursForExperience.length > 0 && (
                <div className="tour-finder-section">
                    <h2 className="tour-finder-title">{t('experience_page.tour_finder_title', experience.name[language])}</h2>
                    
                    <div className="tour-finder-filters">
                        <div className="filter-group">
                            <div className="custom-select-wrapper">
                                <select id="country-filter" className="custom-select" value={countryFilter} onChange={e => setCountryFilter(e.target.value)} aria-label={t('experience_page.filter.country')}>
                                    <option value="All">{t('experience_page.all_countries')}</option>
                                    {uniqueCountries.map(country => <option key={country.slug} value={country.name.en}>{country.name[language]}</option>)}
                                </select>
                            </div>
                        </div>
                         <div className="filter-group">
                             <div className="custom-select-wrapper">
                                <select id="activity-level-filter" className="custom-select" value={activityLevelFilter} onChange={e => setActivityLevelFilter(e.target.value)} aria-label={t('country_page.filter.activity_level')}>
                                    <option value="All">{t('country_page.filter.activity_level')}</option>
                                    {uniqueActivityLevels.map(level => <option key={level} value={level}>{t('country_page.filter.level', level.toString())}</option>)}
                                </select>
                             </div>
                        </div>
                        <div className="filter-group">
                            <div className="custom-select-wrapper">
                                <select id="trip-type-filter" className="custom-select" value={tripTypeFilter} onChange={e => setTripTypeFilter(e.target.value)} aria-label={t('country_page.filter.trip_type')}>
                                    <option value="All">{t('country_page.filter.trip_type')}</option>
                                    {uniqueTripTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                     <div className="filter-controls-bottom" style={{justifyContent: 'flex-end'}}>
                        <button className="filter-reset-btn" onClick={handleReset}>{t('country_page.button.reset')}</button>
                    </div>

                    <div className="tour-grid">
                       {filteredTours.map(tour => (
                           <TourCard 
                                key={tour.id} 
                                tour={tour} 
                                language={language}
                                isBestSeller={bestSellerTourIds.includes(tour.id)}
                                onNavigate={onNavigate}
                            />
                       ))}
                    </div>
                     {filteredTours.length === 0 && (
                        <p style={{ textAlign: 'center', marginTop: '40px' }}>{t('country_page.no_tours_found')}</p>
                    )}
                </div>
            )}
        </div>
    );
};