import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { NewsletterSignUp } from './NewsletterSignUp';
import { SearchOverlay } from './SearchOverlay';
import { NavMenu } from './NavMenu';
import { BottomNavBar } from './BottomNavBar';
import { Breadcrumbs } from './Breadcrumbs';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  const isHomepage = location.pathname === '/';
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    const isOpening = !isMenuOpen;
    setIsMenuOpen(isOpening);
    if (isOpening) {
        document.body.classList.add('body-no-scroll');
    } else {
        document.body.classList.remove('body-no-scroll');
    }
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('body-no-scroll');
  };
  
  const openSearch = () => {
    document.body.classList.add('body-no-scroll');
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    document.body.classList.remove('body-no-scroll');
    setIsSearchOpen(false);
  };

  const handleNavigate = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="app-container">
      <Header 
        onNavigate={handleNavigate} 
        onSearchClick={openSearch} 
        isHomepage={isHomepage}
        isScrolled={isScrolled}
      />
      <main className={!isHomepage ? 'main-padded-top' : ''}>
        {!isHomepage && <Breadcrumbs currentView={{ page: 'home' }} onNavigate={handleNavigate} />}
        {children}
      </main>
      <NewsletterSignUp />
      <Footer onNavigate={handleNavigate} />
      <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} onNavigate={handleNavigate} />
      <NavMenu isOpen={isMenuOpen} onClose={closeMenu} onNavigate={handleNavigate} />
      <BottomNavBar onToggleMenu={toggleMenu} onNavigate={handleNavigate} onSearchClick={openSearch} />
    </div>
  );
};
