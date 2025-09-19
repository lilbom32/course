import React, { useState, useMemo, useRef, useEffect } from 'react';
import type { View } from '../App';
import { useLocalization } from '../hooks/useLocalization';
import { Section } from './Section';
import { floralCalendarData, FloralEvent } from '../data/floralCalendarData';
import { FloralSeasonModal } from './FloralSeasonModal';

declare global {
    interface Window {
        FullCalendar: any;
    }
}

interface FloralCalendarPageProps {
    onNavigate: (view: View) => void;
}

const FloralTourCard: React.FC<{ event: FloralEvent, onExploreClick: (event: FloralEvent) => void }> = ({ event, onExploreClick }) => {
    const { t, language } = useLocalization();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onExploreClick(event);
    };

    return (
        <a href="#" onClick={handleClick} className="floral-tour-card" aria-label={`Explore ${event.title[language]}`}>
            <img src={event.image} alt={event.title[language]} className="floral-tour-card-image" />
            <div className="floral-tour-card-overlay"></div>
            <div className="floral-tour-card-content">
                <div>
                    <p className="floral-tour-card-location">{event.country[language]}</p>
                    <h3 className="floral-tour-card-title">{event.title[language]}</h3>
                </div>
                <div className="floral-tour-card-cta">
                    <span>{t('card.link.explore')} &rarr;</span>
                </div>
            </div>
        </a>
    );
};

export const FloralCalendarPage: React.FC<FloralCalendarPageProps> = ({ onNavigate }) => {
    const { t, language } = useLocalization();
    const calendarRef = useRef<HTMLDivElement>(null);
    const [selectedEvent, setSelectedEvent] = useState<FloralEvent | null>(null);

    useEffect(() => {
        const calendarEl = calendarRef.current;
        if (calendarEl && window.FullCalendar) {
            const calendar = new window.FullCalendar.Calendar(calendarEl, {
                initialView: 'dayGridMonth',
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,listWeek'
                },
                buttonText: {
                    today:  'today',
                    month:  'month',
                    week:   'week',
                    day:    'day',
                    list:   'list'
                },
                events: floralCalendarData.map(event => ({
                    id: event.id,
                    title: event.title[language],
                    start: event.start,
                    end: event.end,
                    backgroundColor: event.color,
                    borderColor: event.color,
                    display: 'block'
                })),
                eventClick: (info: any) => {
                    const eventData = floralCalendarData.find(e => e.id === info.event.id);
                    if (eventData) {
                        setSelectedEvent(eventData);
                    }
                },
                height: 'auto'
            });

            calendar.render();

            return () => {
                calendar.destroy();
            };
        }
    }, [language]);
    
    const handleCardClick = (eventData: FloralEvent) => {
        setSelectedEvent(eventData);
    };
    
    const handleCloseModal = () => {
        setSelectedEvent(null);
    }

    return (
        <div className="floral-calendar-page">
            <Section id="floral-journeys" title={t('floral_calendar.title')}>
                 <p className="section-subtitle">{t('floral_calendar.subtitle')}</p>
                <div className="floral-cards-container">
                    {floralCalendarData.map(event => (
                        <FloralTourCard key={event.id} event={event} onExploreClick={handleCardClick} />
                    ))}
                </div>
            </Section>

            <Section id="booking-calendar" title={t('floral_calendar.booking_title')} className="bg-alt">
                <p className="section-subtitle">{t('floral_calendar.booking_subtitle')}</p>
                <div ref={calendarRef} className="booking-calendar-container"></div>
            </Section>
            
            {selectedEvent && (
                <FloralSeasonModal 
                    event={selectedEvent}
                    onClose={handleCloseModal}
                    onNavigate={onNavigate}
                />
            )}
        </div>
    );
};