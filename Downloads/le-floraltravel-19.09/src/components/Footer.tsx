import React from 'react';
import { useLocalization } from '../hooks/useLocalization';
import type { View } from '../App';

const socialIcons = {
    instagram: <svg viewBox="0 0 24 24"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" /></svg>,
    pinterest: <svg viewBox="0 0 24 24"><path d="M12.04,5.17C12.04,5.17 12.04,5.17 12.04,5.17C11.12,5.17 10.5,5.74 10.5,6.5C10.5,7.03 10.7,7.5 10.7,7.5C10.9,8.2 10.9,8.21 10.2,10.4C10.2,10.42 10.1,10.78 10.1,10.78C10,11.15 9.8,11.54 9.4,11.8C8.9,12.07 8.5,12.05 8.2,11.75C7.8,11.35 7.6,10.55 7.9,9.45C8.2,8.45 9.2,7.57 10.2,7.57C11.6,7.57 12.9,8.57 12.9,10.17C12.9,11.87 11.5,13.27 10.1,13.27C9.5,13.27 9,13.07 9,12.57C9,11.77 9.5,11.17 9.5,11.17C10.1,9.87 10.1,9.87 10.5,8.47C10.5,8.17 10.4,7.87 10.2,7.87C10,7.87 9.7,8.07 9.7,8.37C9.7,8.37 9.2,10.07 9.2,10.07C8.9,11.37 9.5,12.27 10.5,12.27C11.3,12.27 12,11.67 12,10.67C12,8.67 10.9,7.17 10.9,7.17C11.3,6.27 12.1,5.87 12.9,5.87C14.2,5.87 15.1,6.87 15.1,8.07C15.1,8.97 14.8,9.77 14.8,9.77C14.8,9.77 15.3,11.77 15.3,11.87C15.5,12.57 16,13.07 16.6,13.07C17.5,13.07 18,12.17 18,11.07C18,9.07 16.1,7.07 13.9,7.07C12.3,7.07 11.3,7.97 11.3,7.97C11.1,7.57 11.3,6.17 11.3,5.67C11.3,5.37 11.63,5.17 12.04,5.17Z" /></svg>,
    twitter: <svg viewBox="0 0 24 24"><path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" /></svg>
};

interface FooterProps {
    onNavigate: (view: View) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    const { t } = useLocalization();
    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, view: View) => {
        e.preventDefault();
        onNavigate(view);
    };

    return (
        <footer className="footer">
            <div className="footer-logo">Le FloralTravel</div>
            <div className="footer-links">
                <a href="#" onClick={(e) => handleLinkClick(e, { page: 'home' })}>{t('nav.destinations')}</a>
                <a href="#" onClick={(e) => handleLinkClick(e, { page: 'home' })}>{t('nav.experiences')}</a>
                <a href="#" onClick={(e) => handleLinkClick(e, { page: 'why-le-floral' })}>{t('nav.why_le_floral')}</a>
                <a href="#" onClick={(e) => handleLinkClick(e, { page: 'journal-list' })}>{t('nav.journal')}</a>
                <a href="#" onClick={(e) => handleLinkClick(e, { page: 'home' })}>{t('nav.about')}</a>
                <a href="#" onClick={(e) => handleLinkClick(e, { page: 'contact' })}>{t('nav.contact')}</a>
                <a href="#" onClick={(e) => handleLinkClick(e, { page: 'faq' })}>{t('nav.faq')}</a>
                <a href="#">{t('footer.privacy_policy')}</a>
            </div>
            <div className="social-links">
                <a href="#" aria-label="Instagram">{socialIcons.instagram}</a>
                <a href="#" aria-label="Pinterest">{socialIcons.pinterest}</a>
                <a href="#" aria-label="Twitter">{socialIcons.twitter}</a>
            </div>
            <p className="copyright">{t('footer.copyright', new Date().getFullYear().toString())}</p>
            <p className="signature">
                ThS. Ngô Đình Minh Quang đã thiết kế ra website này
            </p>
        </footer>
    );
};