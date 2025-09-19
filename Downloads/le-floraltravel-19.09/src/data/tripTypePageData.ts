
import type { LocalizedString } from './types';
import type { TranslationKey } from '../locales';

export interface TripTypePageContent {
    slug: string;
    name: LocalizedString;
    heroImage: string;
    descriptionKey: TranslationKey;
    storyTitleKey: TranslationKey; 
    storyQuoteKey: TranslationKey;
    storyAuthorKey: TranslationKey;
    filterValue: 'Small Group' | 'Self-Guided';
    tourListTitleKey: TranslationKey;
}

export const tripTypePageData: TripTypePageContent[] = [
    {
        slug: 'small-group-tours',
        name: {
            en: 'Small Group Tours',
            vi: 'Tour Theo Nhóm Nhỏ',
            fr: 'Tours en Petit Groupe',
            zh: '小团游',
            ja: '小グループツアー'
        },
        heroImage: 'https://i.pinimg.com/1200x/36/9b/8d/369b8dd8aeae1bfede33380baeb55f56.jpg',
        descriptionKey: 'trip_type_page.small_group.description',
        storyTitleKey: 'trip_type_page.small_group.story_title',
        storyQuoteKey: 'trip_type_page.small_group.story_quote',
        storyAuthorKey: 'trip_type_page.small_group.story_author',
        filterValue: 'Small Group',
        tourListTitleKey: 'trip_type_page.small_group.tour_list_title'
    },
    {
        slug: 'self-guided-trips',
        name: {
            en: 'Self-Guided Trips',
            vi: 'Chuyến Đi Tự Hướng Dẫn',
            fr: 'Voyages Autoguidés',
            zh: '自助游',
            ja: 'セルフガイド旅行'
        },
        heroImage: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2073&auto=format&fit=crop',
        descriptionKey: 'trip_type_page.self_guided.description',
        storyTitleKey: 'trip_type_page.self_guided.story_title',
        storyQuoteKey: 'trip_type_page.self_guided.story_quote',
        storyAuthorKey: 'trip_type_page.self_guided.story_author',
        filterValue: 'Self-Guided',
        tourListTitleKey: 'trip_type_page.self_guided.tour_list_title'
    }
];
