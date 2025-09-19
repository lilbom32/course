import React from 'react';
import type { PageTour } from '../data/countryPageData';
import { useLocalization } from '../hooks/useLocalization';
import type { Language } from '../context/LanguageContext';
import type { View } from '../App';
import { conversionRates, currencySymbols } from '../data/surveyOptions';

// SVG Icons
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const WrenchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;

interface TourDetailSidebarProps {
    tour: PageTour;
    onNavigate: (view: View) => void;
    onBookClick: () => void;
}

const currencyMap: { [key in Language]: 'USD' | 'VND' | 'EUR' | 'CHF' | 'CNY' | 'JPY' } = {
    en: 'USD',
    vi: 'VND',
    fr: 'EUR',
    zh: 'CNY',
    ja: 'JPY',
};

const formatPrice = (priceString: string, targetCurrency: 'USD' | 'VND' | 'EUR' | 'CHF' | 'CNY' | 'JPY', lang: Language) => {
    const numberString = priceString.replace(/[^0-9.]/g, '');
    const basePriceUSD = parseFloat(numberString.replace(/,/g, ''));
    
    if (isNaN(basePriceUSD)) {
        return { amount: priceString, currency: '', currencyPosition: 'before' as const };
    }

    const rate = conversionRates[targetCurrency];
    const symbol = currencySymbols[targetCurrency];
    
    let convertedPrice = basePriceUSD * rate;

    if (targetCurrency === 'VND') {
        convertedPrice = Math.round(convertedPrice / 1000) * 1000;
    } else {
        convertedPrice = Math.round(convertedPrice);
    }

    const localeForFormatting = lang === 'vi' ? 'vi-VN' : 'en-US';
    const formattedAmount = new Intl.NumberFormat(localeForFormatting).format(convertedPrice);

    return {
        amount: formattedAmount,
        currency: symbol,
        currencyPosition: targetCurrency === 'VND' ? 'after' : 'before' as const
    };
};


export const TourDetailSidebar: React.FC<TourDetailSidebarProps> = ({ tour, onNavigate, onBookClick }) => {
    const { language, t } = useLocalization();
    const targetCurrency = currencyMap[language];
    const { amount, currency, currencyPosition } = formatPrice(tour.price.en, targetCurrency, language);

    return (
        <aside className="tour-detail-sidebar">
            <div className="booking-card">
                <div className="price-from">{t('tour_sidebar.price_from')}</div>
                <div className="price-main">
                    {currencyPosition === 'before' && <span className="price-currency">{currency}</span>}
                    <span className="price-amount">{amount}</span>
                    {currencyPosition === 'after' && <span className="price-currency"><u>{currency}</u></span>}
                    <span className="price-per-guest">/ {t('tour_sidebar.per_guest')}</span>
                </div>
                <div className="program-code">
                    <WrenchIcon />
                    <span>{t('tour_sidebar.program_code')} {tour.id.toUpperCase()}</span>
                </div>
                <button className="btn btn-book" onClick={onBookClick}>
                    <CalendarIcon />
                    <span>{t('tour_sidebar.select_date')}</span>
                </button>
            </div>
            <button className="contact-consult-btn" onClick={() => onNavigate({ page: 'contact' })}>
                <MailIcon />
                <span>{t('tour_sidebar.contact_us')}</span>
            </button>
        </aside>
    );
};