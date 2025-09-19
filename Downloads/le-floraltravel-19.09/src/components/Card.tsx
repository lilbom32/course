import React from 'react';
import { useLocalization } from '../hooks/useLocalization';
import type { LocalizedString } from '../data/types';
import type { TranslationKey } from '../locales';

interface CardProps {
    title: LocalizedString;
    description: LocalizedString;
    image: string;
    linkTextKey: TranslationKey;
    onLinkClick?: () => void;
    imagePosition?: string;
}

export const Card: React.FC<CardProps> = ({ title, description, image, linkTextKey, onLinkClick, imagePosition }) => {
    const { language, t } = useLocalization();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (onLinkClick) {
            e.preventDefault();
            onLinkClick();
        }
    };

    const isGradient = image.startsWith('linear-gradient');

    const getImageUrl = (imgStr: string): string => {
        // Extracts URL from `url(...)` wrapper if it exists, otherwise returns original string
        const match = imgStr.match(/url\(['"]?(.*?)['"]?\)/);
        return match ? match[1] : imgStr;
    }
    
    const imageStyle: React.CSSProperties = imagePosition ? { objectPosition: imagePosition } : {};

    return (
        <div className="card">
          {isGradient ? (
             <div className="card-image card-image-gradient" style={{ backgroundImage: image }}></div>
          ) : (
             <img src={getImageUrl(image)} alt={title[language]} className="card-image card-image-photo" style={imageStyle} loading="lazy" />
          )}
          <div className="card-content">
            <h3 className="card-title">{title[language]}</h3>
            <p className="card-description">{description[language]}</p>
            <a href="#" className="card-link" onClick={handleClick}>{t(linkTextKey)} &rarr;</a>
          </div>
        </div>
    );
};