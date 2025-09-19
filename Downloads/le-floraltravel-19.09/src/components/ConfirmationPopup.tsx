import React from 'react';
import { useLocalization } from '../hooks/useLocalization';

interface ConfirmationPopupProps {
    onClose: () => void;
}

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


export const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({ onClose }) => {
    const { t } = useLocalization();

    return (
        <div className="confirmation-popup-overlay" role="dialog" aria-modal="true" aria-labelledby="confirmation-title">
            <div className="confirmation-popup">
                <div className="confirmation-icon" aria-hidden="true">
                    <CheckCircleIcon />
                </div>
                <h2 id="confirmation-title" className="confirmation-title">{t('bespoke_survey.confirmation.title')}</h2>
                <p className="confirmation-message">{t('bespoke_survey.confirmation.message')}</p>
                <div className="qr-code">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=LeFloralTravel-Booking-Confirmed" alt="Booking Verification QR Code" />
                </div>
                <p className="qr-note">{t('bespoke_survey.confirmation.qr_note')}</p>
                <button onClick={onClose} className="btn">{t('bespoke_survey.confirmation.close_button')}</button>
            </div>
        </div>
    );
};