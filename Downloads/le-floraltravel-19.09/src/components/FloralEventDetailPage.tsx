import React, { useState, useEffect, useMemo } from 'react';
import type { View } from '../App';
import { useLocalization } from '../hooks/useLocalization';
import { floralCalendarData } from '../data/floralCalendarData';
import { countryPageData, PageTour } from '../data/countryPageData';
import { bestSellerTourIds } from '../data/bestsellers';
import { Section } from './Section';
import { TourCard } from './TourCard';

// --- Weather Icons (Outline Style) --- //
const SunIcon = ({ size = 60 }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" /></svg>;
const CloudIcon = ({ size = 60 }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" /></svg>;
const RainIcon = ({ size = 60 }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7" /><path d="M11 19v1" /><path d="M15 19v1" /><path d="M12 19v1" /></svg>;
const FeelsLikeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5" /><path d="M8 9l4 0" /></svg>;
const HumidityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3l5 5a7 7 0 1 1 -10 0l5 -5" /></svg>;
const WindIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 8h14" /><path d="M5 12h11" /><path d="M5 16h12" /></svg>;

// --- Infographic Icons --- //
const SignatureExperienceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>;
const TasteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 21h-2a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v3" /><path d="M18 15h3" /><path d="M19.5 13.5v3" /><path d="M11 5h-1a1 1 0 0 0 -1 1v2" /></svg>;
const TipIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" /><path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" /><path d="M9.7 17l4.6 0" /></svg>;

interface DisplayWeatherData {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    description: string;
    icon: string;
}

const WeatherIcon: React.FC<{ iconCode: string, size?: number }> = ({ iconCode, size = 60 }) => {
    if (iconCode.includes('01')) return <SunIcon size={size} />;
    if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) return <CloudIcon size={size} />;
    if (iconCode.includes('09') || iconCode.includes('10') || iconCode.includes('11')) return <RainIcon size={size} />;
    return <CloudIcon size={size} />;
};

interface FloralEventDetailPageProps {
    id: string;
    onNavigate: (view: View) => void;
}

export const FloralEventDetailPage: React.FC<FloralEventDetailPageProps> = ({ id, onNavigate }) => {
    const { language, t } = useLocalization();
    const [forecast, setForecast] = useState<any[] | null>(null);
    const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
    const [isLoadingWeather, setIsLoadingWeather] = useState(true);

    const event = useMemo(() => floralCalendarData.find(e => e.id === id), [id]);
    
    const relatedTours = useMemo(() => {
        if (!event) return [];
        const allTours: PageTour[] = countryPageData.flatMap(country => country.tours);
        const tourMap = new Map(allTours.map(t => [t.id, t]));
        return event.relatedTourIds
            .map(tourId => tourMap.get(tourId))
            .filter((tour): tour is PageTour => tour !== undefined);
    }, [event]);

    useEffect(() => {
        const generateMockWeather = () => {
            if (!event) {
                setIsLoadingWeather(false);
                setForecast(null);
                return;
            }

            setIsLoadingWeather(true);
            setSelectedDayIndex(0);

            setTimeout(() => {
                const mockDescriptions: {[key: string]: string[]} = {
                    en: ['sunny', 'partly cloudy', 'cloudy', 'light rain', 'sunny spells', 'chance of shower', 'clear sky'],
                    vi: ['nắng', 'mây rải rác', 'nhiều mây', 'mưa nhỏ', 'nắng nhẹ', 'có thể có mưa', 'trời quang'],
                    fr: ['ensoleillé', 'partiellement nuageux', 'nuageux', 'pluie légère', 'éclaircies', 'averse possible', 'ciel dégagé'],
                    zh: ['晴', '局部多云', '多云', '小雨', '晴间多云', '可能有阵雨', '天空晴朗'],
                };
                const descriptions = mockDescriptions[language] || mockDescriptions.en;

                const mockForecast = Array.from({ length: 7 }, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() + i);
                    // Simple deterministic "randomness" based on event ID
                    const seed = event.id.charCodeAt(i % event.id.length) % 5;
                    const baseTemp = 18 + seed;

                    return {
                        dt: date.getTime() / 1000,
                        temp: { 
                            day: baseTemp + (i % 3 - 1),
                            min: baseTemp - 4 + (i % 2),
                            max: baseTemp + 4 - (i % 2),
                        },
                        feels_like: {
                            day: baseTemp + (i % 3 - 1) - 1,
                        },
                        humidity: 65 + (seed * 2) + (i % 5 - 2),
                        wind_speed: 10 + seed + (i % 4 - 2),
                        weather: [{ 
                            description: descriptions[i % descriptions.length],
                            icon: ['01d', '03d', '04d', '10d', '02d', '09d', '01n'][i]
                        }],
                    };
                });
                
                setForecast(mockForecast);
                setIsLoadingWeather(false);

            }, 500);
        };

        generateMockWeather();
    }, [event, language]);


    const displayData: DisplayWeatherData | null = useMemo(() => {
        if (!forecast || !forecast[selectedDayIndex]) return null;
        
        const day = forecast[selectedDayIndex];

        return {
            temp: day.temp.day,
            feels_like: day.feels_like.day,
            humidity: day.humidity,
            wind_speed: day.wind_speed,
            description: day.weather[0].description,
            icon: day.weather[0].icon,
        };
    }, [selectedDayIndex, forecast]);

    if (!event) {
        return (
            <div className="content-section">
                <h1 style={{textAlign: 'center'}}>{t('floral_event.not_found_title')}</h1>
                <p style={{textAlign: 'center'}}>{t('floral_event.not_found_desc')}</p>
            </div>
        );
    }
    
    return (
        <div className="floral-event-detail-page">
            <header className="floral-event-detail-hero" style={{ backgroundImage: `url(${event.image})` }}>
                <div className="floral-event-detail-hero-content">
                    <p>{event.country[language]}</p>
                    <h1>{event.title[language]}</h1>
                </div>
            </header>
            
            <div className="floral-event-detail-layout">
                <main className="floral-event-detail-main">
                    <div className="journal-post-content">
                        <blockquote className="experience-quote">
                            {event.experienceDescription[language]}
                        </blockquote>
                        <h3 className="event-section-title">{t('floral_event.signature_experiences')}</h3>
                        <div className="signature-experiences-grid">
                            {event.signatureExperiences.map((exp, index) => (
                                <div key={index} className="signature-experience-item">
                                    <div className="signature-experience-icon"><SignatureExperienceIcon /></div>
                                    <p>{exp[language]}</p>
                                </div>
                            ))}
                        </div>
                        <div className="info-card-grid">
                            <div className="info-card">
                                <div className="info-card-header">
                                    <TasteIcon />
                                    <h4>{t('floral_event.taste_of_season')}</h4>
                                </div>
                                <p>{event.tasteOfSeason[language]}</p>
                            </div>
                            <div className="info-card">
                                <div className="info-card-header">
                                    <TipIcon />
                                    <h4>{t('floral_event.insiders_tip')}</h4>
                                </div>
                                <p>{event.insidersTip[language]}</p>
                            </div>
                        </div>
                    </div>
                </main>

                <aside className="floral-event-detail-sidebar">
                    <div className="weather-widget">
                        <h3>{t('floral_event.weather_title')}</h3>
                        {isLoadingWeather ? (
                            <p>{t('floral_event.weather_loading')}</p>
                        ) : displayData ? (
                            <>
                                <div className="weather-main">
                                    <div className="weather-icon"><WeatherIcon iconCode={displayData.icon} /></div>
                                    <div>
                                        <div className="weather-temp">{Math.round(displayData.temp)}°C</div>
                                        <div className="weather-desc">{displayData.description}</div>
                                    </div>
                                </div>
                                <div className="weather-details">
                                    <p><FeelsLikeIcon /> {t('floral_event.weather_feels_like')}: {Math.round(displayData.feels_like)}°C</p>
                                    <p><HumidityIcon /> {t('floral_event.weather_humidity')}: {displayData.humidity}%</p>
                                    <p><WindIcon /> {t('floral_event.weather_wind')}: {displayData.wind_speed.toFixed(1)} km/h</p>
                                </div>
                                <div className="weather-forecast-container">
                                    {forecast && forecast.slice(0, 7).map((day, index) => {
                                        const dayName = index === 0 
                                            ? t('floral_event.weather_current')
                                            : new Date(day.dt * 1000).toLocaleDateString(language, { weekday: 'short' });
                                        
                                        return (
                                            <button 
                                                key={day.dt}
                                                className={`forecast-day ${selectedDayIndex === index ? 'active' : ''}`}
                                                onClick={() => setSelectedDayIndex(index)}
                                            >
                                                <div className="day-name">{dayName}</div>
                                                <div className="forecast-icon"><WeatherIcon iconCode={day.weather[0].icon} size={32} /></div>
                                                <div className="forecast-temps">
                                                    <strong>{Math.round(day.temp.max)}°</strong>
                                                    <span className="low">/{Math.round(day.temp.min)}°</span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                           <p>{t('floral_event.weather_error')}</p>
                        )}
                    </div>
                    <div className="map-widget">
                        <h3>{t('floral_event.map_title')}</h3>
                        <div className="map-container">
                            <iframe
                                src={`https://maps.google.com/maps?q=${event.lat},${event.lon}&hl=${language}&z=14&output=embed`}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`${event.location[language]} map`}
                            ></iframe>
                        </div>
                    </div>
                </aside>
            </div>

            {relatedTours.length > 0 && (
                <Section id="related-tours" title={t('floral_event.related_tours_title')} className="bg-alt">
                    <div className="tour-grid">
                        {relatedTours.map(tour => (
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
            {event.relatedTourIds.length > 0 && relatedTours.length === 0 && (
                 <Section id="related-tours" title={t('floral_event.related_tours_title')} className="bg-alt">
                    <p style={{textAlign: 'center'}}>{t('floral_event.no_tours')}</p>
                 </Section>
            )}

        </div>
    );
};