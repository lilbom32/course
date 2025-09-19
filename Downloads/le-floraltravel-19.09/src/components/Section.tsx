import React from 'react';

interface SectionProps {
    id: string;
    title: string;
    children: React.ReactNode;
    className?: string;
}

export const Section: React.FC<SectionProps> = ({ id, title, children, className = '' }) => (
  <section id={id} className={`content-section ${className}`}>
    {title && <h2 className="section-title">{title}</h2>}
    {children}
  </section>
);