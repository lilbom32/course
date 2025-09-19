import React, { useEffect, useRef, useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';

declare global {
    interface Window {
        FullCalendar: any;
    }
}

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

interface BookingCalendarModalProps {
    isOpen: boolean;
    onClose: () => void;
    tourTitle: string;
}

export const BookingCalendarModal: React.FC<BookingCalendarModalProps> = ({ isOpen, onClose, tourTitle }) => {
    const { t, language } = useLocalization();
    const calendarRef = useRef<HTMLDivElement>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.body.classList.add('body-no-scroll');
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.body.classList.remove('body-no-scroll');
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);
    
    useEffect(() => {
        if (!isOpen || !calendarRef.current || !window.FullCalendar) return;

        const calendar = new window.FullCalendar.Calendar(calendarRef.current, {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth'
            },
            selectable: true,
            dateClick: (info: any) => {
                setSelectedDate(info.date);
                 // clear previous selections visually
                document.querySelectorAll('.fc-day-selected').forEach(el => el.classList.remove('fc-day-selected'));
                info.dayEl.classList.add('fc-day-selected');
            },
            height: 'auto'
        });

        calendar.render();

        return () => {
            calendar.destroy();
        };
    }, [isOpen, language]);
    
    const handleConfirm = () => {
        if(selectedDate) {
            alert(`Date confirmed for ${tourTitle}: ${selectedDate.toLocaleDateString()}`);
            onClose();
        } else {
            alert('Please select a date.');
        }
    }


    if (!isOpen) return null;

    return (
        <div className="booking-calendar-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
            <div className="booking-calendar-modal" onClick={(e) => e.stopPropagation()}>
                <div className="booking-calendar-modal-header">
                    <h3>{`Select a date for: ${tourTitle}`}</h3>
                    <button onClick={onClose} className="booking-calendar-modal-close-btn" aria-label="Close">
                        <CloseIcon />
                    </button>
                </div>
                <div ref={calendarRef}></div>
                <div className="booking-calendar-footer">
                    <div className="selected-date-info">
                        {selectedDate ? `Selected: ${selectedDate.toLocaleDateString()}` : 'No date selected'}
                    </div>
                    <button className="btn" onClick={handleConfirm} disabled={!selectedDate}>
                        Confirm Date
                    </button>
                </div>
            </div>
        </div>
    );
};
