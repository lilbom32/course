import React from 'react';
import { Link } from 'react-router-dom';
import { DesktopNav } from './DesktopNav';

interface HeaderProps {
    onNavigate: (path: string) => void;
    onSearchClick: () => void;
    isHomepage: boolean;
    isScrolled: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onSearchClick, isHomepage, isScrolled }) => {
    const isTransparent = isHomepage && !isScrolled;

    const headerClasses = [
        'header',
        isTransparent ? 'header-transparent' : ''
    ].filter(Boolean).join(' ');


    return (
        <header className={headerClasses}>
            <Link to="/" className="logo">Le FloralTravel</Link>
            <DesktopNav onNavigate={onNavigate} onSearchClick={onSearchClick} />
        </header>
    );
};