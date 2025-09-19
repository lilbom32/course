import React, { useState, useEffect, useMemo } from 'react';
import { getTourDetailById } from '../data/tourDetailData';
import type { TourDetailData } from '../data/types';
import { useLocalization } from '../hooks/useLocalization';
import { TourDetailStickyNav } from './TourDetailStickyNav';
import { ImageGallery } from './ImageGallery';
import type { View } from '../App';
import { countryPageData } from '../data/countryPageData';
import { TourDetailSidebar } from './TourDetailSidebar';
import { BookingCalendarModal } from './BookingCalendarModal';

const DurationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" /></svg>;
const VisaIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0015.5 2h-11zM10 9a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 9zM2 8.5A.5.5 0 012.5 8H3V6.5a.5.5 0 011 0V8h1.5a.5.5 0 010 1H4v1.5a.5.5 0 01-1 0V9H2.5a.5.5 0 01-.5-.5z" /><path d="M15 9.5a.5.5 0 01.5-.5h.5V7.5a.5.5 0 011 0V9h.5a.5.5 0 010 1h-.5v.5a.5.5 0 01-1 0V10h-.5a.5.5 0 01-.5-.5z" /></svg>;
const VisionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const DesignIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M9.75 14.25l1.5 1.5 3-3.75" /></svg>;
const IncludedIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const NotIncludedIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


const goodToKnowIcons: { [key: string]: React.ReactElement } = {
    included: <IncludedIcon />,
    'not-included': <NotIncludedIcon />,
    visa: <VisaIcon />
};

const processIcons: { [key: number]: React.ReactElement } = {
    1: <VisionIcon />,
    2: <DesignIcon />,
};

interface TourDetailPageProps {
    id: string;
    onNavigate: (view: View) => void;
}

export const TourDetailPage: React.FC<TourDetailPageProps> = ({ id, onNavigate }) => {
    const { language, t } = useLocalization();
    const [tourData, setTourData] = useState<TourDetailData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

     const tourInfo = useMemo(() => {
        const allTours = countryPageData.flatMap(c => c.tours);
        return allTours.find(t => t.id === id);
    }, [id]);

    useEffect(() => {
        const fetchTourData = async () => {
            setIsLoading(true);
            setTourData(null); 
            try {
                const data = await getTourDetailById(id);
                setTourData(data);
            } catch (error) {
                console.error("Error fetching tour data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTourData();
    }, [id]);
    
    if (isLoading) {
        return (
            <div className="content-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>Loading tour details...</p>
            </div>
        );
    }

    if (!tourData) {
        return (
            <div className="content-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>Sorry, we couldn't find the tour you were looking for.</p>
            </div>
        );
    }

    const navItems = [
        { id: 'why-this-journey', name: t('tour_detail.nav.why_bespoke') },
        { id: 'trip-inspiration', name: t('tour_detail.nav.trip_inspiration') },
        { id: 'featured-stays', name: t('tour_detail.nav.featured_stays') },
        { id: 'good-to-know', name: t('tour_detail.nav.good_to_know') },
        { id: 'image-gallery', name: t('tour_detail.nav.image_gallery') },
        { id: 'the-process', name: t('tour_detail.nav.process') },
        { id: 'testimonial', name: t('tour_detail.nav.testimonials') },
        { id: 'start-planning', name: t('tour_detail.nav.start_planning') },
    ];

    return (
        <>
            <div className="tour-detail-page">
                <header className="tour-detail-hero" style={{ backgroundImage: `url(${tourData.hero.backgroundImage})`}}>
                    <div className="tour-detail-hero-content">
                        <p className="tour-detail-hero-subtitle">{tourData.hero.subtitle[language]}</p>
                        <h1 className="tour-detail-hero-title">{tourData.hero.title[language]}</h1>
                    </div>
                </header>
                
                <div className="tour-detail-info-bar">
                    <div className="info-bar-grid">
                        <div className="info-bar-item">
                            <span className="label">{t('tour_detail.info_bar.country')}</span>
                            <span className="value">{tourData.infoBar.country[language]}</span>
                        </div>
                        <div className="info-bar-item">
                            <span className="label">{t('tour_detail.info_bar.accommodation')}</span>
                            <span className="value">{tourData.infoBar.accommodation[language]}</span>
                        </div>
                        <div className="info-bar-item">
                            <span className="label">{t('tour_detail.info_bar.things_to_do')}</span>
                            <span className="value">{tourData.infoBar.thingsToDo[language]}</span>
                        </div>
                         <div className="info-bar-item">
                            <span className="label">{t('tour_detail.info_bar.best_time')}</span>
                            <span className="value">{tourData.infoBar.bestTimeToG[language]}</span>
                        </div>
                    </div>
                </div>

                <div className="tour-detail-layout">
                    <aside className="tour-detail-sticky-nav">
                        <TourDetailStickyNav items={navItems} />
                    </aside>

                    <main className="tour-detail-main-content">
                        <section id="overview" className="tour-detail-content-section">
                            <h2 className="tour-detail-section-title">{tourData.overview.title[language]}</h2>
                            <p>{tourData.overview.description[language]}</p>
                            {tourData.overview.quote && <blockquote className="overview-quote">“{tourData.overview.quote?.[language]}”</blockquote>}
                        </section>

                        <section id="why-this-journey" className="tour-detail-content-section">
                            <h2 className="tour-detail-section-title">{t('tour_detail.nav.why_bespoke')}</h2>
                            <div className="why-bespoke-grid">
                                {tourData.whyBespoke.items.map(item => (
                                    <div key={item.title.en} className="why-bespoke-item">
                                        <div className="why-bespoke-icon" dangerouslySetInnerHTML={{ __html: item.icon }} />
                                        <div>
                                            <h4>{item.title[language]}</h4>
                                            <p>{item.description[language]}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                        
                        <section id="trip-inspiration" className="tour-detail-content-section">
                            <h2 className="tour-detail-section-title">{t('tour_detail.nav.trip_inspiration')}</h2>
                            {tourData.tripInspiration.map((item, index) => (
                                <div key={item.title.en} className="trip-inspiration-item">
                                    <div className="trip-inspiration-image-wrapper">
                                        <img src={item.image} alt={item.title[language]} className="trip-inspiration-image" loading="lazy" />
                                        <div className="trip-inspiration-day">{item.snapshotText[language]}<span>Day</span></div>
                                    </div>
                                    <div className="trip-inspiration-content">
                                        <h3>{item.title[language]}</h3>
                                        <p>{item.description[language]}</p>
                                    </div>
                                </div>
                            ))}
                        </section>
                        
                        <section id="featured-stays" className="tour-detail-content-section">
                             <h2 className="tour-detail-section-title">{t('tour_detail.nav.featured_stays')}</h2>
                             <div className="featured-stays-grid">
                                {tourData.featuredStays.map(stay => (
                                    <div key={stay.name.en} className="stay-card">
                                        <img src={stay.image} alt={stay.name[language]} loading="lazy" />
                                        <div className="stay-card-content">
                                            <h4>{stay.name[language]}</h4>
                                            <p>{stay.location[language]}</p>
                                        </div>
                                    </div>
                                ))}
                             </div>
                        </section>
                        
                        <section id="good-to-know" className="tour-detail-content-section">
                            <h2 className="tour-detail-section-title">{t('tour_detail.nav.good_to_know')}</h2>
                            <div className="info-list-grid">
                                {tourData.goodToKnow.map(item => (
                                    <div className="info-list-item" key={item.title.en}>
                                        <div className="info-list-icon">{goodToKnowIcons[item.icon]}</div>
                                        <div>
                                            <h4>{item.title[language]}</h4>
                                            <p>{item.description[language]}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {tourData.imageGallery && tourData.imageGallery.length > 0 && (
                            <section id="image-gallery" className="tour-detail-content-section">
                                <h2 className="tour-detail-section-title">{t('tour_detail.nav.image_gallery')}</h2>
                                <ImageGallery images={tourData.imageGallery} />
                            </section>
                        )}

                        <section id="the-process" className="tour-detail-content-section">
                            <h2 className="tour-detail-section-title">{t('tour_detail.nav.process')}</h2>
                             <div className="info-list-grid">
                                {tourData.process.map((item, index) => (
                                    <div className="info-list-item" key={item.title.en}>
                                        <div className="info-list-icon">{processIcons[(index + 1) as keyof typeof processIcons]}</div>
                                        <div>
                                            <h4>{item.title[language]}</h4>
                                            <p>{item.description[language]}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                         <section id="testimonial" className="tour-detail-content-section">
                             <h2 className="tour-detail-section-title">{t('tour_detail.nav.testimonials')}</h2>
                             <div className="testimonial-block">
                                <blockquote className="testimonial-block-quote">“{tourData.testimonial.quote[language]}”</blockquote>
                                <p className="testimonial-block-author">{tourData.testimonial.author[language]}</p>
                             </div>
                        </section>

                        <section id="start-planning" className="tour-detail-content-section tour-detail-cta-section">
                            <h2 className="tour-detail-section-title">{t('tour_detail.cta.title')}</h2>
                            <p>{t('tour_detail.cta.subtitle')}</p>
                            <button className="btn btn-pulse" onClick={() => onNavigate({ page: 'bespoke-survey' })}>{t('tour_detail.cta.button')}</button>
                        </section>
                    </main>
                    
                    {tourInfo && (
                        <TourDetailSidebar 
                            tour={tourInfo}
                            onNavigate={onNavigate}
                            onBookClick={() => setIsBookingModalOpen(true)}
                        />
                    )}
                </div>
            </div>
            {tourInfo && (
                <BookingCalendarModal 
                    isOpen={isBookingModalOpen}
                    onClose={() => setIsBookingModalOpen(false)}
                    tourTitle={tourData.hero.title[language]}
                />
            )}
        </>
    );
};