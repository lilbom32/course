import { useEffect, useRef } from 'react';

export const useMorphScroll = (containerRef: React.RefObject<HTMLElement>) => {
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleObserver = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove active from all siblings
                    const cards = container.querySelectorAll('.morph-card');
                    cards.forEach(card => card.classList.remove('is-active'));
                    // Add active to the current one
                    entry.target.classList.add('is-active');
                }
            });
        };

        // This threshold means the element needs to be 60% in view to trigger
        observer.current = new IntersectionObserver(handleObserver, {
            root: null, // viewport
            threshold: 0.6,
        });

        const cards = container.querySelectorAll('.morph-card');
        cards.forEach(card => observer.current?.observe(card));

        // Set the first card as active initially
        if(cards.length > 0) {
            cards[0].classList.add('is-active');
        }

        return () => {
            observer.current?.disconnect();
        };
    }, [containerRef]);
};
