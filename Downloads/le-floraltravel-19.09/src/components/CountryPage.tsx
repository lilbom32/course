import React, { useState, useMemo } from 'react';
import { countryPageData } from '../data/countryPageData';
import { TourCard } from './TourCard';
import { useLocalization } from '../hooks/useLocalization';
import { bestSellerTourIds } from '../data/bestsellers';
import type { View } from '../App';

interface CountryPageProps {
    slug: string;
    onNavigate: (view: View) => void;
}

export const CountryPage: React.FC<CountryPageProps> = ({ slug, onNavigate }) => {
    const { language, t } = useLocalization();
    
    const country = useMemo(() => 
        countryPageData.find(c => c.slug === slug) || countryPageData.find(c => c.slug === 'default'),
        [slug]
    );

    const [activeToggle, setActiveToggle] = useState('All Trips');
    const [tripTypeFilter, setTripTypeFilter] = useState('All');
    const [experienceFilter, setExperienceFilter] = useState('All');
    const [activityLevelFilter, setActivityLevelFilter] = useState('All');

    const handleReset = () => {
        setActiveToggle('All Trips');
        setTripTypeFilter('All');
        setExperienceFilter('All');
        setActivityLevelFilter('All');
    };

    const uniqueTripTypes = useMemo(() => 
        country ? [...new Set(country.tours.map(t => t.tripType))] : [], 
    [country]);

    const uniqueExperiences = useMemo(() => 
        country ? [...new Set(country.tours.map(t => t.experience))] : [],
    [country]);

    const uniqueActivityLevels = useMemo(() => 
        country ? [...new Set(country.tours.map(t => t.activityLevel))].sort((a,b) => a - b) : [],
    [country]);

    const filteredTours = useMemo(() => {
        if (!country) return [];
        return country.tours.filter(tour => {
            const tripTypeMatch = tripTypeFilter === 'All' || tour.tripType === tripTypeFilter;
            const experienceMatch = experienceFilter === 'All' || tour.experience === experienceFilter;
            const activityLevelMatch = activityLevelFilter === 'All' || tour.activityLevel === parseInt(activityLevelFilter);
            
            return tripTypeMatch && experienceMatch && activityLevelMatch;
        });
    }, [country, tripTypeFilter, experienceFilter, activityLevelFilter]);

    if (!country) {
        return (
            <div className="content-section">
                <p style={{textAlign: 'center'}}>{t('country_page.not_found')}</p>
            </div>
        );
    }

    return (
        <div className="country-page">
            <div className="country-page-hero" style={{ backgroundImage: `url(${country.heroImage})` }}>
                <div className="country-page-hero-overlay">
                    <h1 className="country-page-title">{country.name[language]}</h1>
                </div>
            </div>
            <div className="content-section">
                <p className="country-page-description">{country.description[language]}</p>
            </div>
            
            {country.tours.length > 0 && (
                <div className="tour-finder-section">
                    <h2 className="tour-finder-title">{t('country_page.tour_finder_title')}</h2>
                    
                    <div className="tour-finder-filters">
                        <div className="filter-group">
                            <div className="custom-select-wrapper">
                                <select id="trip-type-filter" className="custom-select" value={tripTypeFilter} onChange={e => setTripTypeFilter(e.target.value)} aria-label={t('country_page.filter.trip_type')}>
                                    <option value="All">{t('country_page.filter.trip_type')}</option>
                                    {uniqueTripTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="filter-group">
                             <div className="custom-select-wrapper">
                                <select id="experience-filter" className="custom-select" value={experienceFilter} onChange={e => setExperienceFilter(e.target.value)} aria-label={t('country_page.filter.experiences')}>
                                    <option value="All">{t('country_page.filter.experiences')}</option>
                                    {uniqueExperiences.map(exp => <option key={exp} value={exp}>{exp}</option>)}
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
                    </div>
                    
                    <div className="filter-controls-bottom">
                        <div className="filter-toggle-group">
                            <button className="filter-toggle-btn" data-active={activeToggle === 'Calendar'} onClick={() => setActiveToggle('Calendar')}>{t('country_page.button.calendar')}</button>
                            <button className="filter-toggle-btn" data-active={activeToggle === 'All Trips'} onClick={() => setActiveToggle('All Trips')}>{t('country_page.button.all_trips')}</button>
                        </div>
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