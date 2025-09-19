import React, { useRef, useEffect, useState } from 'react';

interface FAQAccordionProps {
  item: { question: string; answer: string };
  isOpen: boolean;
  onClick: () => void;
}

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);


export const FAQAccordion: React.FC<FAQAccordionProps> = ({ item, isOpen, onClick }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState('0px');

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
        }
    }, [isOpen]);

    return (
        <div className="faq-item" data-open={isOpen}>
            <h3>
                <button
                    className="faq-question"
                    onClick={onClick}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.question.replace(/\s/g, '')}`}
                >
                    {item.question}
                    <span className="faq-question-icon" aria-hidden="true">
                        <PlusIcon />
                    </span>
                </button>
            </h3>
            <div
                ref={contentRef}
                id={`faq-answer-${item.question.replace(/\s/g, '')}`}
                className="faq-answer"
                style={{ maxHeight: contentHeight }}
                aria-hidden={!isOpen}
            >
                <div className="faq-answer-content">
                    <p>{item.answer}</p>
                </div>
            </div>
        </div>
    );
};