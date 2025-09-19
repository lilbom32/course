import React from 'react';
import { Link } from 'react-router-dom';
import { useLocalization } from '../hooks/useLocalization';

const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.5 1.5 0 012.122 0l8.954 8.955M3 10.5v9A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 19.5v-9M15.75 21v-6a3.75 3.75 0 00-7.5 0v6" />
    </svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);

const ExploreIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5M12 3.75v16.5M9.375 3.75c.159.303.335.604.53.904M9.375 20.25c.159-.303.335-.604.53-.904M14.625 3.75c-.159.303-.335.604-.53.904M14.625 20.25c-.159-.303-.335-.604-.53-.904" />
    </svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);


interface BottomNavBarProps {
    onToggleMenu: () => void;
    onNavigate: (path: string) => void;
    onSearchClick: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ onToggleMenu, onNavigate, onSearchClick }) => {
    const { t } = useLocalization();
    return (
        <div className="bottom-nav" role="navigation" aria-label={t('bottom_nav.label')}>
            <Link to="/" className="bottom-nav-btn" aria-label={t('bottom_nav.home')}>
                <HomeIcon />
                <span>{t('bottom_nav.home')}</span>
            </Link>
            <button className="bottom-nav-btn" aria-label={t('bottom_nav.search')} onClick={onSearchClick}>
                <SearchIcon />
                <span>{t('bottom_nav.search')}</span>
            </button>
            <Link to="/bestsellers" className="bottom-nav-btn" aria-label={t('bottom_nav.explore_aria')}>
                <ExploreIcon />
                <span>{t('bottom_nav.explore')}</span>
            </Link>
            <button className="bottom-nav-btn" onClick={onToggleMenu} aria-label={t('bottom_nav.menu_aria')}>
                <MenuIcon />
                <span>{t('bottom_nav.menu')}</span>
            </button>
        </div>
    );
};