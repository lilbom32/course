import React, { useState } from 'react';

const PrevIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>;
const NextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>;

interface ImageGalleryProps {
    images: string[];
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) {
        return null;
    }

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    
    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    }

    return (
        <div className="image-gallery-container">
            <div className="gallery-main-container">
                <button onClick={goToPrevious} className="gallery-arrow prev" aria-label="Previous image">
                    <PrevIcon />
                </button>
                <img src={images[currentIndex]} alt={`Gallery image ${currentIndex + 1}`} className="gallery-main-image" loading="lazy" />
                <button onClick={goToNext} className="gallery-arrow next" aria-label="Next image">
                    <NextIcon />
                </button>
            </div>
            <div className="gallery-thumbnails-container">
                {images.map((image, index) => (
                    <button 
                        key={index} 
                        className={`gallery-thumbnail ${currentIndex === index ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`View image ${index + 1}`}
                    >
                        <img src={image} alt={`Thumbnail ${index + 1}`} loading="lazy" />
                    </button>
                ))}
            </div>
        </div>
    );
};