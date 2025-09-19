import React, { useMemo } from 'react';
import { tripTypePageData } from '../data/tripTypePageData';
import { countryPageData } from '../data/countryPageData';
import { useLocalization } from '../hooks/useLocalization';
import { Section } from './Section';
import { TourCard } from './TourCard';
import { bestSellerTourIds } from '../data/bestsellers';
import type { View } from '../App';

interface TripTypePageProps {
    slug: string;
    onNavigate: (view: View) => void;
}

export const TripTypePage: React.FC<TripTypePageProps> = ({ slug, onNavigate }) => {
    const { language, t } = useLocalization();

    const pageData = useMemo(() => 
        tripTypePageData.find(p => p.slug === slug),
        [slug]
    );

    const toursForType = useMemo(() => {
        if (!pageData) return [];
        const allTours = countryPageData.flatMap(country => country.tours);
        return allTours.filter(tour => tour.tripType === pageData.filterValue);
    }, [pageData]);

    if (!pageData) {
        return (
            <div className="content-section">
                <p style={{textAlign: 'center'}}>{t('experience_page.not_found')}</p> 
            </div>
        );
    }
    
    return (
        <div className="bespoke-survey-page">
            <div className="country-page-hero" style={{ backgroundImage: `url(${pageData.heroImage})` }}>
                <div className="country-page-hero-overlay">
                    <h1 className="country-page-title">{pageData.name[language]}</h1>
                </div>
            </div>

            <div className="content-section">
                <p className="country-page-description">{t(pageData.descriptionKey)}</p>
            </div>
            
            <Section id={`${slug}-story`} title="" className="bg-alt">
                <div className="bespoke-survey-story-section">
                    <h2 className="bespoke-survey-story-title">{t(pageData.storyTitleKey)}</h2>
                    <p className="bespoke-survey-story-quote">{t(pageData.storyQuoteKey)}</p>
                    <p className="bespoke-survey-story-author">{t(pageData.storyAuthorKey)}</p>
                </div>
            </Section>

            {toursForType.length > 0 && (
                <Section id={`${slug}-tours`} title={t(pageData.tourListTitleKey)}>
                    <div className="tour-grid">
                       {toursForType.map(tour => (
                           <TourCard 
                                key={tour.id} 
                                tour={tour} 
                                language={language}
                                isBestSeller={bestSellerTourIds.includes(tour.id)}
                                onNavigate={onNavigate}
                            />
                       ))}
                    </div>
                </Section>
            )}
        </div>
    );
};