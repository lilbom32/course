import React, { useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { megaMenuData } from '../data/megaMenuData';
import { experiencesMegaMenuData, SubCategory } from '../data/experiencesMegaMenuData';
import { journalCategoriesData } from '../data/journalCategories';
import { useLocalization } from '../hooks/useLocalization';
import { LanguageSwitcher } from './LanguageSwitcher';

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);


interface NavMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (path: string) => void;
}

export const NavMenu: React.FC<NavMenuProps> = ({ isOpen, onClose, onNavigate }) => {
    const { t, language } = useLocalization();
    const navigate = useNavigate();

    const allExperiences = useMemo(() => {
        const experienceMap = new Map<string, SubCategory>();
        experiencesMegaMenuData.forEach(tripType => {
            tripType.subCategories.forEach(subCategory => {
                if (!experienceMap.has(subCategory.slug)) {
                    experienceMap.set(subCategory.slug, subCategory);
                }
            });
        });
        return Array.from(experienceMap.values());
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        // Class on body is now handled in App.tsx to avoid conflicts
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);
    
    const handleNavigateAndClose = (path: string) => {
        navigate(path);
        onClose();
    };

    const handleJournalCategoryNavigate = (e: React.MouseEvent, slug: string) => {
        e.preventDefault();
        let path: string;
        if (slug === 'about-le-floraltravel') {
            path = '/why-le-floral';
        } else {
            path = `/journal/${slug}`;
        }
        handleNavigateAndClose(path);
    };

    const handleExperienceNavigate = (slug: string) => {
        if (slug === 'floral-calendar') {
            handleNavigateAndClose('/floral-calendar');
        } else {
            handleNavigateAndClose(`/experiences/${slug}`);
        }
    };

    return (
        <>
            <div className={`nav-overlay ${isOpen ? 'is-open' : ''}`} onClick={onClose}></div>
            <nav id="nav-menu" className={`nav-menu ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
               <ul className="nav-links">
                    <li><Link to="/" onClick={() => onClose()}>{t('nav.home')}</Link></li>
                    
                    <li>
                        <details>
                            <summary>
                                {t('nav.destinations')} <ChevronDownIcon />
                            </summary>
                            <ul className="destinations-submenu">
                                {megaMenuData.regions.map(region => (
                                    <li key={region.id}>
                                        <details>
                                            <summary>
                                                {region.name[language]} <ChevronDownIcon />
                                            </summary>
                                            <ul className="countries-submenu">
                                                {region.countries.map(country => (
                                                    <li key={country.slug}>
                                                        <Link to={`/destinations/${country.slug}`} onClick={() => onClose()}>{country.name[language]}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </details>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    </li>
                     <li>
                        <details>
                            <summary>
                                {t('nav.experiences')} <ChevronDownIcon />
                            </summary>
                             <ul className="destinations-submenu">
                                {allExperiences.map(exp => (
                                    <li key={exp.slug}>
                                        <a href="#" onClick={(e) => { e.preventDefault(); handleExperienceNavigate(exp.slug); }}>{exp.name[language]}</a>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary>
                                {t('nav.journal')} <ChevronDownIcon />
                            </summary>
                            <ul className="destinations-submenu">
                                {journalCategoriesData.map(cat => (
                                    <li key={cat.id}>
                                        <a href="#" onClick={(e) => handleJournalCategoryNavigate(e, cat.slug)}>
                                            {cat.title[language]}
                                        </a>
                                    </li>
                                ))}
                                <li>
                                    <Link className="view-all-btn" to="/journal" onClick={() => onClose()}>
                                        {t('journal.view_all')}
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li><Link to="/why-le-floral" onClick={() => onClose()}>{t('nav.why_le_floral')}</Link></li>
                    <li><Link to="/contact" onClick={() => onClose()}>{t('nav.contact')}</Link></li>
                    <li><Link to="/faq" onClick={() => onClose()}>{t('nav.faq')}</Link></li>
                </ul>
                <div className="language-switcher">
                   <LanguageSwitcher />
                </div>
            </nav>
        </>
    );
};