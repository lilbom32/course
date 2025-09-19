import React, { useState, useRef, useEffect } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { languageOptions } from '../context/LanguageContext';

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

export const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage, t } = useLocalization();
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const currentLanguageLabel = languageOptions.find(opt => opt.value === language)?.label || 'Language';
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);


    const handleLanguageSelect = (langValue: typeof language) => {
        setLanguage(langValue);
        setIsOpen(false);
    }

    return (
        <div className="language-switcher" ref={wrapperRef}>
            <button 
                className="language-switcher-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-label={t('language_switcher.label')}
            >
                {currentLanguageLabel}
                <ChevronDownIcon />
            </button>
            {isOpen && (
                 <ul className="language-switcher-panel">
                    {languageOptions.map(option => (
                        <li key={option.value}>
                            <button 
                                onClick={() => handleLanguageSelect(option.value)}
                                data-active={language === option.value}
                            >
                                {option.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};