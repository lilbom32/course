import React from 'react';
import { TourPackageDetailPage as TourPackageDetailComponent } from '../components/TourPackageDetailPage';
import type { View } from '../App';

interface TourPackageDetailPageProps {
    id: string;
    onNavigate: (view: View) => void;
}

export const TourPackageDetailPage: React.FC<TourPackageDetailPageProps> = ({ id, onNavigate }) => {
    return (
        <TourPackageDetailComponent 
            id={id} 
            onNavigate={onNavigate} 
        />
    );
};
