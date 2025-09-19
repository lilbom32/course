import React from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { Section } from './Section';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { View } from '../App';

const coreValuesData = [
    { id: 'bespoke', icon: <img src="https://plus.unsplash.com/premium_vector-1736939963993-98cb69805061?q=80&w=200&auto=format&fit=crop&ixlib-rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Vector illustration for Bespoke Excellence" loading="lazy" />, titleKey: 'why_le_floral.values.bespoke_title', descriptionKey: 'why_le_floral.values.bespoke_desc' },
    { id: 'wellbeing', icon: <img src="https://plus.unsplash.com/premium_vector-1736941210161-0291df53d473?q=80&w=200&auto=format&fit=crop&ixlib-rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Vector illustration for Holistic Well-being" loading="lazy" />, titleKey: 'why_le_floral.values.wellbeing_title', descriptionKey: 'why_le_floral.values.wellbeing_desc' },
    { id: 'sustainability', icon: <img src="https://plus.unsplash.com/premium_vector-1737114742301-5e27f822e5cd?q=80&w=200&auto=format&fit=crop&ixlib-rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Vector illustration for Conscious Sustainability" loading="lazy" />, titleKey: 'why_le_floral.values.sustainability_title', descriptionKey: 'why_le_floral.values.sustainability_desc' },
    { id: 'connection', icon: <img src="https://plus.unsplash.com/premium_vector-1737045494981-961080673b58?q=80&w=200&auto=format&fit=crop&ixlib-rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Vector illustration for Deep Connection & Resonance" loading="lazy" />, titleKey: 'why_le_floral.values.connection_title', descriptionKey: 'why_le_floral.values.connection_desc' },
    { id: 'joy', icon: <img src="https://plus.unsplash.com/premium_vector-1737045495247-0f549057b84f?q=80&w=200&auto=format&fit=crop&ixlib-rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Vector illustration for Radiant Joy" loading="lazy" />, titleKey: 'why_le_floral.values.joy_title', descriptionKey: 'why_le_floral.values.joy_desc' },
] as const;

interface WhyLeFloralPageProps {
    onNavigate: (view: View) => void;
}

export const WhyLeFloralPage: React.FC<WhyLeFloralPageProps> = ({ onNavigate }) => {
    const { t } = useLocalization();

    return (
        <div className="why-le-floral-page">
            <header className="why-le-floral-hero">
                <video 
                    src="https://videos.pexels.com/video-files/1311914/1311914-hd_1920_1080_30fps.mp4" 
                    className="hero-background-video" 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                />
                <div className="why-le-floral-hero-content">
                    <h1>{t('why_le_floral.hero.title')}</h1>
                    <p>{t('why_le_floral.hero.subtitle')}</p>
                </div>
            </header>

            <Section id="manifesto" title={t('why_le_floral.manifesto.title')}>
                 <div className="manifesto-container">
                    <img src="https://plus.unsplash.com/premium_vector-1737045494579-0bd43ca96cf8?q=80&w=880&auto=format&fit=crop&ixlib-rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Decorative vector illustration of a globe and travel items" className="manifesto-icon manifesto-icon-1" loading="lazy" />
                    <img src="https://plus.unsplash.com/premium_vector-1737037442772-8b52a4d86a8f?q=80&w=880&auto=format&fit=crop&ixlib-rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Decorative vector illustration of a suitcase and camera" className="manifesto-icon manifesto-icon-2" loading="lazy" />
                    <img src="https://plus.unsplash.com/premium_vector-1737037436033-36798598d418?q=80&w=880&auto=format&fit=crop&ixlib-rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Decorative vector illustration of a passport and ticket" className="manifesto-icon manifesto-icon-3" loading="lazy" />
                    <img src="https://plus.unsplash.com/premium_vector-1737028431519-177e1a215a15?q=80&w=880&auto=format&fit=crop&ixlib-rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Decorative vector illustration of a map and plane" className="manifesto-icon manifesto-icon-4" loading="lazy" />
                    <div className="manifesto-content">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{t('why_le_floral.manifesto.p1')}</ReactMarkdown>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{t('why_le_floral.manifesto.p2')}</ReactMarkdown>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{t('why_le_floral.manifesto.p3')}</ReactMarkdown>
                        <p className="manifesto-highlight"><strong>{t('why_le_floral.manifesto.p4_strong')}</strong></p>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{t('why_le_floral.manifesto.p5')}</ReactMarkdown>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{t('why_le_floral.manifesto.p6')}</ReactMarkdown>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{t('why_le_floral.manifesto.p7')}</ReactMarkdown>
                    </div>
                 </div>
            </Section>

            <Section id="philosophy" title="" className="bg-alt">
                <div className="philosophy-grid">
                    <div className="philosophy-card">
                        <div className="philosophy-card-image" style={{backgroundImage: "url('https://i.pinimg.com/736x/8f/58/aa/8f58aa3d050073428eebaca6bf737216.jpg')"}}></div>
                        <div className="philosophy-card-content">
                            <h3>{t('why_le_floral.mission.title')}</h3>
                            <p>{t('why_le_floral.mission.desc')}</p>
                        </div>
                    </div>
                     <div className="philosophy-card">
                        <div className="philosophy-card-image" style={{backgroundImage: "url('https://www.thetreecenter.com/c/uploads/2019/05/Magnolia_1-jpg.webp')"}}></div>
                        <div className="philosophy-card-content">
                            <h3>{t('why_le_floral.vision.title')}</h3>
                            <p>{t('why_le_floral.vision.desc')}</p>
                        </div>
                    </div>
                </div>
            </Section>

            <Section id="core-values" title={t('why_le_floral.values.title')}>
                <div className="core-values-grid">
                   {coreValuesData.map(value => (
                        <div key={value.id} className="core-value-item">
                            <div className="core-value-icon" aria-hidden="true">{value.icon}</div>
                            <h4>{t(value.titleKey)}</h4>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{t(value.descriptionKey)}</ReactMarkdown>
                        </div>
                   ))}
                </div>
            </Section>
            
            <Section id="cta" title="">
                <div className="why-le-floral-cta">
                    <h2>{t('why_le_floral.cta.title')}</h2>
                    <p>{t('why_le_floral.cta.subtitle')}</p>
                    <button className="btn btn-pulse" onClick={() => onNavigate({ page: 'bespoke-survey' })}>{t('why_le_floral.cta.button')}</button>
                </div>
            </Section>

        </div>
    );
};