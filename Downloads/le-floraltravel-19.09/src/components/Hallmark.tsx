import React from 'react';
import type { LocalizedString } from '../data/types';
import { useLocalization } from '../hooks/useLocalization';

interface HallmarkProps {
    icon: React.ReactNode;
    title: LocalizedString;
    description: LocalizedString;
}

export const Hallmark: React.FC<HallmarkProps> = ({ icon, title, description }) => {
    const { language } = useLocalization();
    return (
        <div className="hallmark">
            <div className="hallmark-icon" aria-hidden="true">{icon}</div>
            <h3 className="hallmark-title">{title[language]}</h3>
            <p className="hallmark-description">{description[language]}</p>
        </div>
    );
};