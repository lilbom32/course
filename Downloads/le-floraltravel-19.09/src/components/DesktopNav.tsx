import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MegaMenuPanel } from './MegaMenuPanel';
import { ExperiencesMegaMenuPanel } from './ExperiencesMegaMenuPanel';
import { megaMenuData } from '../data/megaMenuData';
import { experiencesMegaMenuData } from '../data/experiencesMegaMenuData';
import { journalCategoriesData } from '../data/journalCategories';
import { useLocalization } from '../hooks/useLocalization';
import { LanguageSwitcher } from './LanguageSwitcher';


const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);

interface DesktopNavProps {
    onNavigate: (path: string) => void;
    onSearchClick: () => void;
}


export const DesktopNav: React.FC<DesktopNavProps> = ({ onNavigate, onSearchClick }) => {
    const { t, language } = useLocalization();
    const navigate = useNavigate();
    const [isDestOpen, setIsDestOpen] = useState(false);
    const [isExpOpen, setIsExpOpen] = useState(false);
    const [isJournalOpen, setIsJournalOpen] = useState(false);
    const [activeRegionId, setActiveRegionId] = useState(megaMenuData.regions[0].id);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                closeAllPanels();
            }
        };
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeAllPanels();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscKey);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscKey);
        };
    }, []);

    const closeAllPanels = () => {
        setIsDestOpen(false);
        setIsExpOpen(false);
        setIsJournalOpen(false);
    }

    const toggleDestMenu = () => {
        setIsDestOpen(!isDestOpen);
        setIsExpOpen(false);
        setIsJournalOpen(false);
    };

    const toggleExpMenu = () => {
        setIsExpOpen(!isExpOpen);
        setIsDestOpen(false);
        setIsJournalOpen(false);
    };
    
    const toggleJournalMenu = () => {
        setIsJournalOpen(!isJournalOpen);
        setIsDestOpen(false);
        setIsExpOpen(false);
    };

    const handleSearchClick = () => {
        closeAllPanels();
        onSearchClick();
    };


    const activeRegion = megaMenuData.regions.find(r => r.id === activeRegionId) || megaMenuData.regions[0];
    
    const handleCountryNavigate = (slug: string) => {
        navigate(`/destinations/${slug}`);
        closeAllPanels();
    };

    const handleExperienceNavigate = (slug: string) => {
        if (slug === 'floral-calendar') {
            navigate('/floral-calendar');
        } else {
            navigate(`/experiences/${slug}`);
        }
        closeAllPanels();
    };

    const handleFeaturedClick = (navigation: { page: string; id?: string; slug?: string }) => {
        let path = '/';
        if (navigation.page === 'tour' && navigation.id) {
            path = `/tours/${navigation.id}`;
        } else if (navigation.page === 'floral-event' && navigation.id) {
            path = `/floral-events/${navigation.id}`;
        } else if (navigation.page === 'country' && navigation.slug) {
            path = `/destinations/${navigation.slug}`;
        } else if (navigation.page === 'experience' && navigation.slug) {
            path = `/experiences/${navigation.slug}`;
        }
        navigate(path);
        closeAllPanels();
    };

    const handleViewAllClick = (tripTypeId: string) => {
        const slugMap: { [key: string]: string } = {
            'small-group': '/trip-types/small-group-tours',
            'bespoke': '/bespoke-survey',
            'self-guided': '/trip-types/self-guided-trips'
        };
        const path = slugMap[tripTypeId];
        if (path) {
            navigate(path);
            closeAllPanels();
        }
    };
    
    const handleNavClick = (path: string) => {
        navigate(path);
        closeAllPanels();
    };
    
    const handleJournalCategoryNavigate = (slug: string) => {
        let path: string;
        if (slug === 'about-le-floraltravel') {
            path = '/why-le-floral';
        } else {
            path = `/journal/${slug}`;
        }
        navigate(path);
        closeAllPanels();
    };

    return (
        <div ref={navRef} className="desktop-nav-container">
            <nav className="desktop-nav" aria-label={t('nav.main_nav_label')}>
                <ul className="nav-links">
                    <li><Link to="/" onClick={() => closeAllPanels()}>{t('nav.home')}</Link></li>
                    <li>
                        <button onClick={toggleDestMenu} aria-expanded={isDestOpen}>
                            {t('nav.destinations')}
                        </button>
                    </li>
                    <li>
                        <button onClick={toggleExpMenu} aria-expanded={isExpOpen}>
                            {t('nav.experiences')}
                        </button>
                    </li>
                    <li className="journal-dropdown-container">
                        <button onClick={toggleJournalMenu} aria-expanded={isJournalOpen}>
                            {t('nav.journal')}
                        </button>
                        {isJournalOpen && (
                            <ul className="journal-dropdown-panel">
                                {journalCategoriesData.map(cat => (
                                    <li key={cat.id}>
                                        <a href="#" onClick={(e) => { e.preventDefault(); handleJournalCategoryNavigate(cat.slug); }}>
                                            {cat.title[language]}
                                        </a>
                                    </li>
                                ))}
                                <li>
                                    <Link to="/journal" className="view-all-btn" onClick={() => closeAllPanels()}>
                                        {t('journal.view_all')}
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li><Link to="/why-le-floral" onClick={() => closeAllPanels()}>{t('nav.why_le_floral')}</Link></li>
                    <li><Link to="/contact" onClick={() => closeAllPanels()}>{t('nav.contact')}</Link></li>
                    <li><Link to="/faq" onClick={() => closeAllPanels()}>{t('nav.faq')}</Link></li>
                </ul>
            </nav>

            <div className="search-container-wrapper">
                <button
                    className="search-toggle-btn"
                    onClick={handleSearchClick}
                    aria-label={t('search.open_aria')}
                >
                    <SearchIcon />
                </button>
            </div>
             <LanguageSwitcher />
            
            {(isDestOpen || isExpOpen) && <div className="mega-menu-backdrop" onClick={closeAllPanels}></div>}

            {isDestOpen && 
                <MegaMenuPanel 
                    regions={megaMenuData.regions}
                    activeRegion={activeRegion}
                    onRegionClick={setActiveRegionId}
                    onCountryClick={handleCountryNavigate}
                    onFeaturedTourClick={handleFeaturedClick}
                />
            }
            {isExpOpen &&
                <ExperiencesMegaMenuPanel
                    tripTypes={experiencesMegaMenuData}
                    onExperienceClick={handleExperienceNavigate}
                    onViewAllClick={handleViewAllClick}
                    onFeaturedTripClick={handleFeaturedClick}
                />
            }
        </div>
    );
};