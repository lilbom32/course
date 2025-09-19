import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import type { View } from '../App';
import { countryPageData } from '../data/countryPageData';
import type { PageTour } from '../data/countryPageData';
import type { LocalizedString } from '../data/types';
import type { TranslationKey } from '../locales';

// --- Icon Components --- //
const PrevIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 24, height: 24 }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);
const NextIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 24, height: 24 }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);


interface HeroSlideData {
    type: 'image' | 'video';
    source: string;
    title: LocalizedString;
    subtitle: LocalizedString;
    cta: {
        textKey: TranslationKey;
        action: () => void;
    };
}

export const Hero: React.FC<{ onNavigate: (view: View) => void; }> = ({ onNavigate }) => {
    const { t, language } = useLocalization();
    const [currentIndex, setCurrentIndex] = useState(0);

    const heroSlides: HeroSlideData[] = useMemo(() => {
        const videoSlide: HeroSlideData = {
            type: 'video',
            source: 'https://videos.pexels.com/video-files/30391342/13024426_2560_1440_60fps.mp4',
            title: {
                en: 'Experience Travel Differently',
                vi: 'Trải Nghiệm Du Lịch Khác Biệt',
                fr: 'Vivez le Voyage Différemment',
                zh: '体验与众不同的旅行',
                ja: '新しい旅の体験'
            },
            subtitle: {
                en: 'Journeys that resonate, stories that linger.',
                vi: 'Những hành trình cộng hưởng, những câu chuyện còn mãi.',
                fr: 'Des voyages qui résonnent, des histoires qui restent.',
                zh: '产生共鸣的旅程，萦绕心头的故事。',
                ja: '心に響く旅、心に残る物語。'
            },
            cta: {
                textKey: 'hero.button_bestsellers',
                action: () => onNavigate({ page: 'bestsellers' })
            }
        };

        const allTours = new Map<string, PageTour>(countryPageData.flatMap(c => c.tours).map(t => [t.id, t]));
        
        const imageSlidesData = [
            {
                tourId: 'vn-bike-1',
                image: 'https://plus.unsplash.com/premium_photo-1682091719534-00aff71fd130?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                subtitle: { en: 'A Bestselling Biking Adventure', vi: 'Cuộc phiêu lưu xe đạp bán chạy nhất', fr: 'Une aventure à vélo la plus vendue', zh: '畅销自行车探险', ja: 'ベストセラーのサイクリングアドベンチャー' },
            },
            {
                tourId: 'ch-wildflower-1',
                image: 'https://images.unsplash.com/photo-1523565304550-2b34a3031464?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                subtitle: { en: 'A Bestselling Alpine Trek', vi: 'Chuyến đi bộ Alpine bán chạy nhất', fr: 'Un trek alpin le plus vendu', zh: '畅销阿尔卑斯徒步', ja: 'ベストセラーのアルパイントレック' },
            },
            {
                tourId: 'it-amalfi-1',
                image: 'https://images.unsplash.com/photo-1470776455360-5b7018843b11?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                subtitle: { en: 'A Bestselling Coastal Journey', vi: 'Hành trình ven biển bán chạy nhất', fr: 'Un voyage côtier le plus vendu', zh: '畅销沿海之旅', ja: 'ベストセラーの海岸の旅' },
            },
            {
                tourId: 'jp-sakura-1',
                image: 'https://plus.unsplash.com/premium_photo-1710787193520-74df05ed7736?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                subtitle: { en: 'A Bestselling Floral Trail', vi: 'Con đường hoa bán chạy nhất', fr: 'Un sentier floral le plus vendu', zh: '畅销花卉小径', ja: 'ベストセラーのフラワートレイル' },
            }
        ];

        const imageSlides: HeroSlideData[] = imageSlidesData
            .map((slideInfo, index) => {
                const tour = allTours.get(slideInfo.tourId);
                if (!tour) return null;
                return {
                    type: 'image',
                    source: slideInfo.image,
                    title: tour.title,
                    subtitle: slideInfo.subtitle,
                    cta: {
                        textKey: 'hero.button',
                        action: () => onNavigate({ page: 'tour', id: slideInfo.tourId })
                    }
                };
            })
            .filter((slide): slide is HeroSlideData => slide !== null);

        return [videoSlide, ...imageSlides];
    }, [language, onNavigate, t]);

    const goToNext = useCallback(() => {
        if (heroSlides.length > 0) {
            setCurrentIndex(prevIndex => (prevIndex + 1) % heroSlides.length);
        }
    }, [heroSlides.length]);
    
    const goToPrevious = () => {
        if (heroSlides.length > 0) {
            setCurrentIndex(prevIndex => (prevIndex - 1 + heroSlides.length) % heroSlides.length);
        }
    };

    useEffect(() => {
        const timer = setInterval(goToNext, 7000); // Increased interval for video
        return () => clearInterval(timer);
    }, [goToNext]);
    
    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    }
    
    if (heroSlides.length === 0) {
        return (
             <section className="hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title">{t('hero.title')}</h1>
                    <p className="hero-subtitle">{t('hero.subtitle')}</p>
                </div>
            </section>
        );
    }
    
    const currentSlide = heroSlides[currentIndex];

    return (
        <section className="hero">
            <div className="hero-slides-container">
                {heroSlides.map((slide, index) => (
                    <div 
                        key={index} 
                        className={`hero-slide ${index === currentIndex ? 'active' : ''}`}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${index + 1} of ${heroSlides.length}`}
                        aria-hidden={index !== currentIndex}
                    >
                        {slide.type === 'video' ? (
                            <video 
                                src={slide.source} 
                                className="hero-background-video" 
                                autoPlay 
                                muted 
                                loop 
                                playsInline
                                key={slide.source}
                            />
                        ) : (
                            <div 
                                className="hero-background-image" 
                                style={{ backgroundImage: `url(${slide.source})` }}
                            ></div>
                        )}
                    </div>
                ))}
            </div>
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1 className="hero-title">{currentSlide.title[language]}</h1>
                <p className="hero-subtitle">{currentSlide.subtitle[language]}</p>
                <a href="#" className="btn btn-pulse" onClick={(e) => { e.preventDefault(); currentSlide.cta.action(); }}>
                    {t(currentSlide.cta.textKey)}
                </a>
                <div className="hero-dots">
                    {heroSlides.map((_, index) => (
                        <button 
                            key={index} 
                            className={`hero-dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
            </div>
            <button onClick={goToPrevious} className="hero-arrow prev" aria-label={t('hero.label.previous')}>
                <PrevIcon />
            </button>
            <button onClick={goToNext} className="hero-arrow next" aria-label={t('hero.label.next')}>
                <NextIcon />
            </button>
        </section>
    );
};