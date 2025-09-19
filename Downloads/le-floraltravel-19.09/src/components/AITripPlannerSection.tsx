import React, { useState, useMemo, useRef } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import type { View } from '../App';
import type { PageTour } from '../data/countryPageData';
import { countryPageData } from '../data/countryPageData';
import { TourCard } from './TourCard';
import { bestSellerTourIds } from '../data/bestsellers';
import { currencyOptions, conversionRates, currencySymbols } from '../data/surveyOptions';
import { getAIService } from '../services/aiService';


// --- Icons --- //
const PlannerIcon = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z" className="robot-icon-path" /></svg>;
const CultureIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 5v6.5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z"/></svg>;
const FoodIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 5z"/></svg>;
const NatureIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 11.43c.91 0 1.65-.43 1.65-1.43 0-1.21-1.3-1.85-1.3-1.85s-1.03.49-1.03 1.85c0 .73.51 1.43 1.03 1.43m-12 0c.91 0 1.65-.43 1.65-1.43 0-1.21-1.3-1.85-1.3-1.85S4.5 8.79 4.5 10c0 .73.51 1.43 1.03 1.43M22 10.5c0-1.3-.8-2.4-1.8-2.9l.4-1.9c.1-.6-.4-1.2-1-1.2H4.4c-.6 0-1.1.6-1 1.2l.4 1.9C2.8 8.1 2 9.2 2 10.5V12h20v-1.5M12 13c-4.97 0-9 4.03-9 9h18c0-4.97-4.03-9-9-9z"/></svg>;
const ShoppingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z"/></svg>;
const ArtIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M15.5 12c0 1.93-1.57 3.5-3.5 3.5S8.5 13.93 8.5 12 10.07 8.5 12 8.5s3.5 1.57 3.5 3.5zm-3.5-2.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/></svg>;
const RocketIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.9c-2.42 0-4.58-1.07-6.12-2.83.33.05.67.08 1.02.08 2.21 0 4-1.79 4-4s-1.79-4-4-4c-.35 0-.69.03-1.02.08C6.42 4.42 8.58 3.35 11 3.35c4.77 0 8.65 3.88 8.65 8.65S15.77 20.65 11 20.65v-3.75z" /></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{width: 18, height: 18, marginLeft: 5, verticalAlign: 'middle' }}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>;
const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12.75 16.5a.75.75 0 00-1.5 0v.01a.75.75 0 001.5 0v-.01zM12.75 12a.75.75 0 00-1.5 0v.01a.75.75 0 001.5 0v-.01zM10.5 16.5a.75.75 0 00-1.5 0v.01a.75.75 0 001.5 0v-.01zM10.5 12a.75.75 0 00-1.5 0v.01a.75.75 0 001.5 0v-.01zM8.25 16.5a.75.75 0 00-1.5 0v.01a.75.75 0 001.5 0v-.01zM8.25 12a.75.75 0 00-1.5 0v.01a.75.75 0 001.5 0v-.01zM15 16.5a.75.75 0 00-1.5 0v.01a.75.75 0 001.5 0v-.01zM15 12a.75.75 0 00-1.5 0v.01a.75.75 0 001.5 0v-.01z" />
    </svg>
);


const interestData = [
    { id: 'culture', icon: <CultureIcon />, labelKey: 'ai_planner.interest_culture' },
    { id: 'food', icon: <FoodIcon />, labelKey: 'ai_planner.interest_food' },
    { id: 'nature', icon: <NatureIcon />, labelKey: 'ai_planner.interest_nature' },
    { id: 'shopping', icon: <ShoppingIcon />, labelKey: 'ai_planner.interest_shopping' },
    { id: 'art', icon: <ArtIcon />, labelKey: 'ai_planner.interest_art' }
] as const;


interface AITripPlannerSectionProps {
    onNavigate: (view: View) => void;
}

export const AITripPlannerSection: React.FC<AITripPlannerSectionProps> = ({ onNavigate }) => {
    const { t, language } = useLocalization();
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [luxuryLevel, setLuxuryLevel] = useState(1); // 0, 1, 2 for budget, standard, luxury
    const [numPeople, setNumPeople] = useState(2);
    const [currency, setCurrency] = useState('USD');
    const [isPlanning, setIsPlanning] = useState(false);
    const [error, setError] = useState('');
    const [recommendedTours, setRecommendedTours] = useState<PageTour[]>([]);

    const allTours = useMemo(() => countryPageData.flatMap(c => c.tours), []);
    const tourMap = useMemo(() => new Map(allTours.map(t => [t.id, t])), [allTours]);

    const formatDateForDisplay = (isoDate: string) => {
        if (!isoDate) return '';
        const parts = isoDate.split('-');
        if (parts.length !== 3) return '';
        const year = parts[0];
        const month = parts[1];
        const day = parts[2];
        const shortYear = year.slice(-2);
        return `${day}/${month}/${shortYear}`;
    };
    
    const duration = useMemo(() => {
        if (!startDate || !endDate) return 7;
        try {
            const start = new Date(startDate);
            const end = new Date(endDate);
            // Check for invalid dates or end date before start date
            if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
                return 7;
            }
            
            const MS_PER_DAY = 1000 * 60 * 60 * 24;
            // Use UTC to avoid timezone issues
            const startUTC = Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());
            const endUTC = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());
    
            const diffDays = Math.round((endUTC - startUTC) / MS_PER_DAY) + 1;
            return diffDays > 0 ? diffDays : 1;
        } catch (e) {
            console.error("Error calculating date duration:", e);
            return 7; // Fallback
        }
    }, [startDate, endDate]);

    const handleInterestToggle = (interestId: string) => {
        setSelectedInterests(prev =>
            prev.includes(interestId)
                ? prev.filter(i => i !== interestId)
                : [...prev, interestId]
        );
    };
    
    const estimatedBudget = useMemo(() => {
        const luxuryMultipliers = [150, 250, 400]; // Daily USD cost per person
        const rate = conversionRates[currency as keyof typeof conversionRates] || 1;
        let baseCost = duration * numPeople * luxuryMultipliers[luxuryLevel] * rate;
    
        if (currency === 'VND') {
            baseCost = Math.round(baseCost / 1000) * 1000;
        } else {
            baseCost = Math.round(baseCost);
        }
        return baseCost;
    }, [duration, numPeople, luxuryLevel, currency]);

    const formattedBudget = useMemo(() => {
        const symbol = currencySymbols[currency as keyof typeof currencySymbols] || '$';
        const amount = estimatedBudget.toLocaleString('en-US');
        return currency === 'VND' ? `${amount}${symbol}` : `${symbol}${amount}`;
    }, [estimatedBudget, currency]);
    
    const handleCreatePlan = async () => {
        setIsPlanning(true);
        setError('');
        setRecommendedTours([]);

        const simplifiedTours = allTours.map(t => ({
            id: t.id,
            title: t.title.en,
            country: t.region.en,
            experience: t.experience,
            activityLevel: t.activityLevel,
            duration: t.duration.en,
        }));

        const luxuryLevels = ['Budget', 'Standard', 'Luxury'];
        const userRequest = `
          - Destination preference: ${destination || 'any'}
          - Trip duration: ${duration} days
          - Interests: ${selectedInterests.join(', ') || 'general'}
          - Desired luxury level: ${luxuryLevels[luxuryLevel]}
          - Number of travelers: ${numPeople}
        `;

        try {
            const aiService = getAIService();
            const response = await aiService.getTripPlanRecommendations(userRequest, simplifiedTours);

            const ids = response.recommendedTourIds || [];
            const foundTours = ids.map((id: string) => tourMap.get(id)).filter((t: PageTour | undefined): t is PageTour => !!t);
            setRecommendedTours(foundTours);

        } catch (e) {
            console.error("AI Planner Error:", e);
            setError(t('ai_planner.error_message'));
        } finally {
            setIsPlanning(false);
        }
    };
    
    const handleScrollToChat = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const element = document.getElementById('bespoke-ai');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <>
            <div className="ai-trip-planner-section">
                <div className="planner-main-grid">
                    <div className="planner-form">
                        <div className="planner-title">
                            <PlannerIcon /> {t('ai_planner.title')}
                        </div>

                        <div className="planner-form-group">
                            <label htmlFor="destination">{t('ai_planner.destination_label')}</label>
                            <input type="text" id="destination" className="planner-input" placeholder={t('ai_planner.destination_placeholder')} value={destination} onChange={e => setDestination(e.target.value)} />
                        </div>
                        
                        <div className="planner-grid-2-col">
                            <div className="planner-form-group">
                                <label htmlFor="start-date">{t('ai_planner.start_date_label')}</label>
                                <div className="planner-date-input-wrapper">
                                    <input
                                        type="text"
                                        className="planner-input"
                                        value={formatDateForDisplay(startDate)}
                                        placeholder="dd/mm/yy"
                                        readOnly
                                        aria-hidden="true"
                                    />
                                    <CalendarIcon />
                                    <input
                                        type="date"
                                        id="start-date"
                                        className="planner-date-input-native"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        aria-label={t('ai_planner.start_date_label')}
                                    />
                                </div>
                            </div>
                            <div className="planner-form-group">
                                <label htmlFor="end-date">{t('ai_planner.end_date_label')}</label>
                                 <div className="planner-date-input-wrapper">
                                    <input
                                        type="text"
                                        className="planner-input"
                                        value={formatDateForDisplay(endDate)}
                                        placeholder="dd/mm/yy"
                                        readOnly
                                        aria-hidden="true"
                                    />
                                    <CalendarIcon />
                                    <input
                                        type="date"
                                        id="end-date"
                                        className="planner-date-input-native"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        min={startDate}
                                        aria-label={t('ai_planner.end_date_label')}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="slider-group">
                            <div className="slider-label-container">
                                <span className="label">{t('ai_planner.duration_label')}</span>
                                <span className="value">{t('ai_planner.duration_value', String(duration))}</span>
                            </div>
                        </div>

                        <div className="planner-form-group">
                            <label>{t('ai_planner.interests_label')}</label>
                            <div className="interest-tags">
                                {interestData.map(interest => (
                                    <button 
                                        key={interest.id} 
                                        className={`interest-tag ${selectedInterests.includes(interest.id) ? 'selected' : ''}`}
                                        onClick={() => handleInterestToggle(interest.id)}
                                    >
                                        {interest.icon} {t(interest.labelKey)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button className="btn planner-cta-btn" onClick={handleCreatePlan} disabled={isPlanning}>
                             {t('ai_planner.cta_button')}
                        </button>

                    </div>
                    
                    <div className="budget-calculator-container">
                         <div className="budget-title">
                             {t('ai_planner.budget_title')}
                        </div>
                       
                         <div className="slider-group">
                            <div className="slider-label-container">
                                <span className="label">{t('ai_planner.luxury_label')}</span>
                                <span className="value">{[t('ai_planner.luxury_budget'), t('ai_planner.luxury_standard'), t('ai_planner.luxury_luxury')][luxuryLevel]}</span>
                            </div>
                            <input type="range" min="0" max="2" value={luxuryLevel} onChange={e => setLuxuryLevel(Number(e.target.value))} />
                        </div>
                         <div className="slider-group">
                            <div className="slider-label-container">
                                <span className="label">{t('ai_planner.people_label')}</span>
                                <span className="value">{t('ai_planner.people_value', String(numPeople))}</span>
                            </div>
                            <input type="range" min="1" max="10" value={numPeople} onChange={e => setNumPeople(Number(e.target.value))} />
                        </div>
                         <div className="form-group">
                            <label htmlFor="currency-selector" className="label">{t('ai_planner.currency_label')}</label>
                            <select id="currency-selector" className="planner-select" value={currency} onChange={e => setCurrency(e.target.value)}>
                                {currencyOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                        </div>

                        <div className="estimated-budget">
                            <div className="label">{t('ai_planner.estimated_budget_label')}</div>
                            <div className="amount">{formattedBudget}</div>
                            <div className="trip-note">{t('ai_planner.estimated_budget_trip')}</div>
                        </div>
                        <p className="budget-footnote">{t('ai_planner.budget_footnote')}</p>
                    </div>
                </div>
            </div>
            
            {(isPlanning || error || recommendedTours.length > 0) && (
                <div className="planner-results">
                    <h3>{t('ai_planner.results_title')}</h3>
                    {isPlanning && <p style={{textAlign: 'center'}}>{t('ai_planner.planning_message')}</p>}
                    {error && <p style={{textAlign: 'center', color: 'red'}}>{error}</p>}
                    {!isPlanning && recommendedTours.length === 0 && !error && <p style={{textAlign: 'center'}}>{t('ai_planner.no_results_message')}</p>}
                    
                    <div className="tour-grid">
                        {recommendedTours.map(tour => (
                            <TourCard 
                                key={tour.id} 
                                tour={tour} 
                                language={language}
                                isBestSeller={bestSellerTourIds.includes(tour.id)}
                                onNavigate={onNavigate}
                            />
                        ))}
                    </div>
                </div>
            )}
            
            <div className="planner-scroll-cta">
                <p>{t('ai_planner.scroll_cta_text')}</p>
                <button className="btn" onClick={handleScrollToChat}>
                    {t('ai_planner.scroll_cta_button')} <ChevronDownIcon />
                </button>
            </div>
        </>
    );
};