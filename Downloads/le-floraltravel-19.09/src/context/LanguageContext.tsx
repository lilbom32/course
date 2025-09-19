import React, { createContext, useState, useEffect, useCallback, FC, ReactNode } from 'react';
import { translations, TranslationKey } from '../locales';

export type Language = 'en' | 'vi' | 'fr' | 'zh' | 'ja';

export const languageOptions: { value: Language, label: string }[] = [
    { value: 'en', label: 'English' },
    { value: 'vi', label: 'Tiếng Việt' },
    { value: 'fr', label: 'Français' },
    { value: 'zh', label: '中文' },
    { value: 'ja', label: '日本語' },
];

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: TranslationKey, ...args: string[]) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        try {
            const savedLanguage = localStorage.getItem('language') as Language;
            if (savedLanguage && languageOptions.some(opt => opt.value === savedLanguage)) {
                return savedLanguage;
            }
            const browserLang = navigator.language.split(/[-_]/)[0];
            if (languageOptions.some(opt => opt.value === browserLang)) {
                return browserLang as Language;
            }
        } catch (error) {
            console.error("Could not access localStorage", error);
        }
        return 'en';
    });

    const setLanguage = (lang: Language) => {
        try {
            localStorage.setItem('language', lang);
        } catch (error) {
            console.error("Could not access localStorage", error);
        }
        setLanguageState(lang);
    };

    const t = useCallback((key: TranslationKey, ...args: string[]): string => {
        const langTranslations = translations[language] || translations.en;
        const defaultTranslations = translations.en;
        let text = langTranslations[key] || defaultTranslations[key] || key;
        
        if (args.length > 0) {
            args.forEach((arg, index) => {
                const placeholder = new RegExp(`\\{${index}\\}`, 'g');
                text = text.replace(placeholder, arg);
            });
        }
        
        return text;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};