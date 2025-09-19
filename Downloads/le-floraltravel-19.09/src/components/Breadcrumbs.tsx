import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { megaMenuData } from '../data/megaMenuData';
import { experiencePageData } from '../data/experiencePageData';
import { tripTypePageData } from '../data/tripTypePageData';
import { journalData } from '../data/journal';
import { journalCategoriesData } from '../data/journalCategories';
import { useLocalization } from '../hooks/useLocalization';
import type { Language } from '../context/LanguageContext';
import { countryPageData } from '../data/countryPageData';
import { floralCalendarData } from '../data/floralCalendarData';

interface BreadcrumbItem {
    name: string;
    path: string;
    isCurrent: boolean;
}

interface BreadcrumbsProps {
    currentView: { page: string };
    onNavigate: (path: string) => void;
}

const findCountryByTourId = (tourId: string) => {
    for (const country of countryPageData) {
        if (country.tours.some(tour => tour.id === tourId)) {
            const countryMeta = megaMenuData.regions.flatMap(r => r.countries).find(c => c.slug === country.slug);
            return countryMeta;
        }
    }
    return undefined;
};

const findTourById = (tourId: string) => {
    for (const country of countryPageData) {
        const tour = country.tours.find(t => t.id === tourId);
        if (tour) return tour;
    }
    return undefined;
};

const findPostBySlug = (slug: string) => {
    return journalData.find(p => p.slug === slug);
}


const findCountryName = (slug: string, lang: Language): string | undefined => {
    for (const region of megaMenuData.regions) {
        const country = region.countries.find(c => c.slug === slug);
        if (country) {
            return country.name[lang];
        }
    }
    return undefined;
};

const findExperienceName = (slug: string, lang: Language): string | undefined => {
    const experience = experiencePageData.find(e => e.slug === slug);
    return experience?.name[lang];
};

const findTripTypeName = (slug: string, lang: Language): string | undefined => {
    const tripType = tripTypePageData.find(t => t.slug === slug);
    return tripType?.name[lang];
};


export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentView, onNavigate }) => {
    const { language, t } = useLocalization();
    const location = useLocation();
    let items: BreadcrumbItem[] = [];

    // Don't show breadcrumbs on home page
    if (location.pathname === '/') {
        return null;
    }

    // Parse current path to determine breadcrumbs
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    if (pathSegments[0] === 'destinations' && pathSegments[1]) {
        const countryName = findCountryName(pathSegments[1], language) || t('breadcrumbs.destination');
        items = [
            { name: t('breadcrumbs.home'), path: '/', isCurrent: false },
            { name: t('nav.destinations'), path: '/', isCurrent: false },
            { name: countryName, path: location.pathname, isCurrent: true },
        ];
    } else if (pathSegments[0] === 'experiences' && pathSegments[1]) {
        const experienceName = findExperienceName(pathSegments[1], language) || t('nav.experiences');
        items = [
            { name: t('breadcrumbs.home'), path: '/', isCurrent: false },
            { name: t('nav.experiences'), path: '/', isCurrent: false },
            { name: experienceName, path: location.pathname, isCurrent: true },
        ];
    } else if (pathSegments[0] === 'tours' && pathSegments[1]) {
        const tour = findTourById(pathSegments[1]);
        const country = findCountryByTourId(pathSegments[1]);
        if (tour && country) {
            items = [
                { name: t('breadcrumbs.home'), path: '/', isCurrent: false },
                { name: t('nav.destinations'), path: '/', isCurrent: false },
                { name: country.name[language], path: `/destinations/${country.slug}`, isCurrent: false },
                { name: tour.title[language], path: location.pathname, isCurrent: true },
            ];
        }
    } else if (pathSegments[0] === 'journal') {
        if (pathSegments[1]) {
            const category = journalCategoriesData.find(c => c.slug === pathSegments[1]);
            if (category) {
                items = [
                    { name: t('breadcrumbs.home'), path: '/', isCurrent: false },
                    { name: t('breadcrumbs.journal_list'), path: '/journal', isCurrent: false },
                    { name: category.title[language], path: location.pathname, isCurrent: true },
                ];
            }
        } else {
            items = [
                { name: t('breadcrumbs.home'), path: '/', isCurrent: false },
                { name: t('breadcrumbs.journal_list'), path: location.pathname, isCurrent: true },
            ];
        }
    } else if (pathSegments[0] === 'journal-post' && pathSegments[1]) {
        const post = findPostBySlug(pathSegments[1]);
        const postTitle = post ? post.title[language] : t('breadcrumbs.journal_post');
        items = [
            { name: t('breadcrumbs.home'), path: '/', isCurrent: false },
            { name: t('breadcrumbs.journal_list'), path: '/journal', isCurrent: false },
            { name: postTitle, path: location.pathname, isCurrent: true },
        ];
    } else if (pathSegments[0] === 'trip-types' && pathSegments[1]) {
        const tripTypeName = findTripTypeName(pathSegments[1], language) || t('nav.experiences');
        items = [
            { name: t('breadcrumbs.home'), path: '/', isCurrent: false },
            { name: tripTypeName, path: location.pathname, isCurrent: true },
        ];
    } else if (pathSegments[0] === 'floral-events' && pathSegments[1]) {
        const event = floralCalendarData.find(e => e.id === pathSegments[1]);
        const eventName = event ? event.title[language] : 'Event';
        items = [
            { name: t('breadcrumbs.home'), path: '/', isCurrent: false },
            { name: t('breadcrumbs.floral_calendar'), path: '/floral-calendar', isCurrent: false },
            { name: eventName, path: location.pathname, isCurrent: true },
        ];
    } else if (pathSegments[0] === 'bestsellers') {
        items = [
            { name: t('breadcrumbs.home'), path: '/', isCurrent: false },
            { name: t('breadcrumbs.bestsellers'), path: location.pathname, isCurrent: true },
        ];
    } else if (pathSegments[0] === 'bespoke-survey') {
        items = [
            { name: t('breadcrumbs.home'), path: '/', isCurrent: false },
            { name: t('breadcrumbs.bespoke_survey'), path: location.pathname, isCurrent: true },
        ];
    } else if (pathSegments[0] === 'why-le-floral') {
        items = [
            { name: t('breadcrumbs.home'), path: '/', isCurrent: false },
            { name: t('breadcrumbs.why_le_floral'), path: location.pathname, isCurrent: true },
        ];
    } else if (pathSegments[0] === 'contact') {
        items = [
            { name: t('breadcrumbs.home'), path: '/', isCurrent: false },
            { name: t('breadcrumbs.contact'), path: location.pathname, isCurrent: true },
        ];
    } else if (pathSegments[0] === 'faq') {
        items = [
            { name: t('breadcrumbs.home'), path: '/', isCurrent: false },
            { name: t('breadcrumbs.faq'), path: location.pathname, isCurrent: true },
        ];
    } else if (pathSegments[0] === 'floral-calendar') {
        items = [
            { name: t('breadcrumbs.home'), path: '/', isCurrent: false },
            { name: t('breadcrumbs.floral_calendar'), path: location.pathname, isCurrent: true },
        ];
    }
    
    if (items.length === 0) {
        return null;
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.isCurrent ? undefined : `https://lefloraltravel.example.com/#` // Replace with actual domain
        }))
    };

    return (
        <nav aria-label={t('breadcrumbs.label')} className="breadcrumbs-nav">
             <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <ol className="breadcrumbs-list">
                {items.map((item, index) => (
                    <li key={index}>
                        {!item.isCurrent ? (
                             <Link to={item.path}>
                                {item.name}
                             </Link>
                        ) : (
                            <span aria-current="page">{item.name}</span>
                        )}
                        {index < items.length - 1 && <span className="breadcrumb-separator">/</span>}
                    </li>
                ))}
            </ol>
        </nav>
    );
};