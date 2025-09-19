import React, { useState, useEffect, useRef } from 'react';
import { useLocalization } from '../hooks/useLocalization';

interface NavItem {
    id: string;
    name: string;
}

interface TourDetailStickyNavProps {
    items: NavItem[];
}

export const TourDetailStickyNav: React.FC<TourDetailStickyNavProps> = ({ items }) => {
    const [activeId, setActiveId] = useState<string>(items[0]?.id || '');
    const observer = useRef<IntersectionObserver | null>(null);
    const { t } = useLocalization();

    useEffect(() => {
        const handleObserver = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Check if element is in the top half of the viewport
                    const rect = entry.target.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                        setActiveId(entry.target.id);
                    }
                }
            });
        };

        observer.current = new IntersectionObserver(handleObserver, {
            rootMargin: '0px 0px -50% 0px', // observe the top half of the viewport
            threshold: 0,
        });

        const elements = items.map(item => document.getElementById(item.id)).filter(el => el);
        elements.forEach(el => observer.current?.observe(el!));

        return () => observer.current?.disconnect();
    }, [items]);
    
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        // Manually set active state on click for immediate feedback
        setActiveId(id);
    };

    return (
        <nav aria-label={t('nav.main_nav_label')}>
            <ul className="sticky-nav-list">
                {items.map(item => (
                    <li key={item.id}>
                        <a 
                            href={`#${item.id}`}
                            className={activeId === item.id ? 'active' : ''}
                            onClick={(e) => handleNavClick(e, item.id)}
                        >
                            {item.name}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
