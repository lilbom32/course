import React, { useMemo } from 'react';
import { Section } from './Section';
import { TourCard } from './TourCard';
import { countryPageData, PageTour } from '../data/countryPageData';
import { bestSellerTourIds } from '../data/bestsellers';
import { useLocalization } from '../hooks/useLocalization';
import type { View } from '../App';

interface BestSellersPageProps {
    onNavigate: (view: View) => void;
}

export const BestSellersPage: React.FC<BestSellersPageProps> = ({ onNavigate }) => {
    const { language, t } = useLocalization();

    const bestSellerTours = useMemo(() => {
        const allTours = countryPageData.flatMap(country => country.tours);
        const tourMap = new Map<string, PageTour>();
        allTours.forEach(tour => tourMap.set(tour.id, tour));

        return bestSellerTourIds
            .map(id => tourMap.get(id))
            .filter((tour): tour is PageTour => tour !== undefined);
    }, []);

    return (
        <Section id="bestsellers" title={t('bestsellers.title')}>
            <p style={{ textAlign: 'center', maxWidth: '800px', margin: '-20px auto 40px auto' }}>
                {t('bestsellers.subtitle')}
            </p>
            <div className="tour-grid">
                {bestSellerTours.map(tour => (
                    <TourCard 
                        key={tour.id} 
                        tour={tour} 
                        language={language} 
                        isBestSeller={true} 
                        onNavigate={onNavigate}
                    />
                ))}
            </div>
        </Section>
    );
};