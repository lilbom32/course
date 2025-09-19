export interface LocalizedString {
  en: string;
  vi: string;
  fr: string;
  zh: string;
  ja: string;
}

export interface TourInfoBar {
    country: LocalizedString;
    accommodation: LocalizedString;
    thingsToDo: LocalizedString;
    bestTimeToG: LocalizedString;
}

export interface OverviewHighlight {
    title: LocalizedString;
    description: LocalizedString;
}

export interface TripInspirationItem {
    image: string;
    snapshotText: LocalizedString;
    title: LocalizedString;
    description: LocalizedString;
}

export interface FeaturedStay {
    name: LocalizedString;
    location: LocalizedString;
    image: string;
}

export interface ProcessStep {
    title: LocalizedString;
    description: LocalizedString;
}

export interface GoodToKnowItem {
    title: LocalizedString;
    description: LocalizedString;
    icon: string;
}

export interface WhyBespokeItem {
    title: LocalizedString;
    description: LocalizedString;
    icon: string; // SVG string
}

export interface RelatedPost {
    title: LocalizedString;
    category: LocalizedString;
    excerpt: LocalizedString;
    image: string;
    href: string;
}

export interface TourDetailData {
    id: string;
    hero: {
        subtitle: LocalizedString;
        title: LocalizedString;
        backgroundImage: string;
    };
    infoBar: TourInfoBar;
    overview: {
        title: LocalizedString;
        description: LocalizedString;
        quote?: LocalizedString;
        highlights?: OverviewHighlight[];
    };
    videoURL?: string;
    mapImage?: string;
    tripInspiration: TripInspirationItem[];
    featuredStays: FeaturedStay[];
    testimonial: {
        quote: LocalizedString;
        author: LocalizedString;
    };
    process: ProcessStep[];
    goodToKnow: GoodToKnowItem[];
    whyBespoke: {
        items: WhyBespokeItem[];
        image?: string;
    };
    imageGallery?: string[];
    discoverFurther: {
        similarTrips: string[]; // array of tour IDs
        otherWaysToExplore: any[]; // Define if needed
    };
    relatedPosts: RelatedPost[];
}