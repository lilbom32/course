import React, { useState, useEffect, useCallback } from 'react';
import type { Testimonial } from '../data/testimonials';
import { useLocalization } from '../hooks/useLocalization';

interface TestimonialSliderProps {
    testimonials: Testimonial[];
}

const PrevIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);

const NextIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ testimonials }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { language, t } = useLocalization();

    const goToNext = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    }, [testimonials.length]);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        const interval = setInterval(goToNext, 5000); // Auto-play every 5 seconds
        return () => clearInterval(interval);
    }, [goToNext]);

    if (!testimonials || testimonials.length === 0) {
        return <p>{t('testimonials.not_available')}</p>;
    }

    const { quote, author, tour } = testimonials[currentIndex];

    return (
        <div className="testimonial-slider">
             <button onClick={goToPrevious} className="slider-arrow prev" aria-label={t('testimonials.label.previous')}>
                <PrevIcon />
            </button>
            <div className="testimonial-slide" role="region" aria-roledescription="carousel" aria-label={`${t('testimonials.label.testimonial')} ${currentIndex + 1} / ${testimonials.length}`}>
                <blockquote className="testimonial-quote">“{quote[language]}”</blockquote>
                <figcaption>
                    <div className="testimonial-author">{author[language]}</div>
                    <div className="testimonial-tour">{tour[language]}</div>
                </figcaption>
            </div>
            <button onClick={goToNext} className="slider-arrow next" aria-label={t('testimonials.label.next')}>
                <NextIcon />
            </button>
        </div>
    );
};