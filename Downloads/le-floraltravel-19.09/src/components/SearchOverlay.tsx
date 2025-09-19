import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { countryPageData, PageTour } from '../data/countryPageData';
import { bestSellerTourIds } from '../data/bestsellers';
import { TourCard } from './TourCard';
import { getAIService } from '../services/aiService';
import type { View } from '../App';

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);

const LoadingSpinner = () => <div className="loading-spinner"></div>;

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (view: View) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, onNavigate }) => {
    const { t, language } = useLocalization();
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<PageTour[]>([]);
    const [hasSearched, setHasSearched] = useState(false);

    const allTours = useMemo(() => countryPageData.flatMap(c => c.tours), []);
    const tourMap = useMemo(() => new Map(allTours.map(t => [t.id, t])), [allTours]);

    const bestSellerTours = useMemo(() => 
        bestSellerTourIds.map(id => tourMap.get(id)).filter((t): t is PageTour => !!t), 
    [tourMap]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    const handleSearch = useCallback(async (prompt: string) => {
        if (!prompt.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);
        setResults([]);
        setHasSearched(true);
        
        try {
            const aiService = getAIService();

            const allToursForAI = allTours.map(tour => ({
                id: tour.id,
                title: tour.title.en,
                country: tour.region.en,
                experience: tour.experience,
                tripType: tour.tripType,
                durationDays: parseInt(tour.duration.en, 10),
                activityLevel: tour.activityLevel,
                availableMonths: tour.availableMonths.en
            }));

            const response = await aiService.getTourRecommendations({
                prompt,
                tours: allToursForAI
            });
            
            const ids = response.recommendedTourIds || [];
            const foundTours = ids.map((id: string) => tourMap.get(id)).filter((t: PageTour | undefined): t is PageTour => !!t);
            setResults(foundTours);

        } catch (e) {
            console.error(e);
            setError(t('ai_search.error'));
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, t, tourMap, allTours]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSearch(searchTerm);
    };

    const handleSuggestionClick = (promptKey: any) => {
        const promptText = t(promptKey);
        setSearchTerm(promptText);
        handleSearch(promptText);
    }
    
    if (!isOpen) return null;

    return (
        <>
            <div className={`search-overlay-backdrop ${isOpen ? 'is-open' : ''}`} onClick={onClose}></div>
            <div className={`search-overlay-container ${isOpen ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="search-overlay-title">
                <div className="search-overlay-content">
                    <button className="search-overlay-close-btn" onClick={onClose} aria-label={t('search.close_aria')}>
                        <CloseIcon />
                    </button>
                    <div className="search-overlay-header">
                        <h2 id="search-overlay-title">{t('ai_search.title')}</h2>
                        <p>{t('ai_search.subtitle')}</p>
                    </div>

                    <form className="search-overlay-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="search-overlay-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={t('ai_search.placeholder')}
                            disabled={isLoading}
                        />
                        <button type="submit" className="btn search-overlay-btn" disabled={isLoading}>
                            {isLoading ? <LoadingSpinner /> : <SearchIcon />}
                        </button>
                    </form>

                    <div className="search-overlay-suggestions">
                        <h3>{t('ai_search.suggestions.title')}</h3>
                        <div className="suggestion-pills search-suggestion-pills">
                            <button className="suggestion-pill" onClick={() => handleSuggestionClick('ai_search.suggestions.prompt1')} disabled={isLoading}>{t('ai_search.suggestions.prompt1')}</button>
                            <button className="suggestion-pill" onClick={() => handleSuggestionClick('ai_search.suggestions.prompt2')} disabled={isLoading}>{t('ai_search.suggestions.prompt2')}</button>
                            <button className="suggestion-pill" onClick={() => handleSuggestionClick('ai_search.suggestions.prompt3')} disabled={isLoading}>{t('ai_search.suggestions.prompt3')}</button>
                        </div>
                    </div>
                    
                    <div className="search-results-container">
                        {isLoading && (
                            <div className="search-state-message">
                                <LoadingSpinner />
                                <p>{t('ai_search.loading')}</p>
                            </div>
                        )}
                        {error && <div className="search-state-message"><p>{error}</p></div>}
                        {!isLoading && !error && hasSearched && results.length === 0 && (
                            <div className="search-state-message"><p>{t('ai_search.no_results')}</p></div>
                        )}
                        {!isLoading && !error && !hasSearched && (
                             <div className="search-results-grid">
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
                        )}
                        {results.length > 0 && (
                            <div className="search-results-grid">
                                {results.map(tour => (
                                    <TourCard 
                                        key={tour.id} 
                                        tour={tour} 
                                        language={language}
                                        isBestSeller={bestSellerTourIds.includes(tour.id)}
                                        onNavigate={onNavigate}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
};