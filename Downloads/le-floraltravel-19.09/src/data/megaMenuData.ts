
import type { LocalizedString } from './types';
import type { View } from '../App';

type NavigationObject = 
  | { page: 'tour'; id: string } 
  | { page: 'country'; slug: string } 
  | { page: 'floral-event'; id: string };


export interface FeaturedTour {
  slug: string;
  title: LocalizedString;
  image: string;
  navigation: NavigationObject;
}

export interface Country {
    slug: string;
    name: LocalizedString;
    href: string;
}

export interface Region {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  countries: Country[];
  featuredTours: FeaturedTour[];
}

export interface MegaMenuData {
    regions: Region[];
}

export const megaMenuData: MegaMenuData = {
    regions: [
        {
            id: 'asia',
            name: { en: 'Asia', vi: 'Châu Á', fr: 'Asie', zh: '亚洲', ja: 'アジア' },
            description: { 
                en: 'From the bustling markets of Bangkok to the serene temples of Kyoto, Asia offers a vibrant tapestry of culture, history, and natural beauty.',
                vi: 'Từ những khu chợ nhộn nhịp của Bangkok đến những ngôi đền thanh bình của Kyoto, Châu Á mang đến một bức tranh đa dạng về văn hóa, lịch sử và vẻ đẹp tự nhiên.',
                fr: 'Des marchés animés de Bangkok aux temples sereins de Kyoto, l\'Asie offre une mosaïque vibrante de culture, d\'histoire et de beauté naturelle.',
                zh: '从曼谷繁华的市场到京都宁静的寺庙，亚洲展现了文化、历史和自然美景的多彩画卷。',
                ja: 'バンコクの賑やかな市場から京都の静かな寺院まで、アジアは文化、歴史、自然の美しさの活気に満ちたタペストリーを提供します。'
            },
            countries: [
                { slug: 'vietnam', name: { en: 'Vietnam', vi: 'Việt Nam', fr: 'Vietnam', zh: '越南', ja: 'ベトナム' }, href: '#' },
                { slug: 'japan', name: { en: 'Japan', vi: 'Nhật Bản', fr: 'Japon', zh: '日本', ja: '日本' }, href: '#' },
                { slug: 'thailand', name: { en: 'Thailand', vi: 'Thái Lan', fr: 'Thaïlande', zh: '泰国', ja: 'タイ' }, href: '#' },
                { slug: 'south-korea', name: { en: 'South Korea', vi: 'Hàn Quốc', fr: 'Corée du Sud', zh: '韩国', ja: '韓国' }, href: '#' },
                { slug: 'indonesia', name: { en: 'Indonesia', vi: 'Indonesia', fr: 'Indonésie', zh: '印度尼西亚', ja: 'インドネシア' }, href: '#' },
            ],
            featuredTours: [
                {
                    slug: 'hanoi-in-bloom',
                    title: { en: 'Hanoi in Bloom', vi: 'Hà Nội Mùa Hoa', fr: 'Hanoï en Fleurs', zh: '河内繁花', ja: '花咲くハノイ' },
                    navigation: { page: 'tour', id: 'vn-hanoi-1' },
                    image: 'https://kenh14cdn.com/203336854389633024/2023/8/9/photo-10-1691564222318589201863.jpeg',
                },
                {
                    slug: 'mekong-delta-flora',
                    title: { en: 'Mekong Delta Flora', vi: 'Hoa Đồng Bằng Sông Cửu Long', fr: 'Flore du Delta du Mékong', zh: '湄公河三角洲植物', ja: 'メコンデルタの植物' },
                    navigation: { page: 'tour', id: 'vn-mekong-1' },
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBMnSs0QNTnKbOY7LzYwv3JQ5cObHxAxesyQ&s',
                }
            ]
        },
        {
            id: 'europe',
            name: { en: 'Europe', vi: 'Châu Âu', fr: 'Europe', zh: '欧洲', ja: 'ヨーロッパ' },
            description: {
                en: 'Discover timeless elegance, from the lavender fields of Provence to the historic gardens of Italy and the dramatic coastlines of Portugal.',
                vi: 'Khám phá vẻ đẹp thanh lịch vượt thời gian, từ những cánh đồng oải hương của Provence đến những khu vườn lịch sử của Ý và những bờ biển ấn tượng của Bồ Đào Nha.',
                fr: 'Découvrez une élégance intemporelle, des champs de lavande de Provence aux jardins historiques d\'Italie et aux côtes spectaculaires du Portugal.',
                zh: '探索永恒的优雅，从普罗旺斯的薰衣草田到意大利的历史花园和葡萄牙壮丽的海岸线。',
                ja: 'プロヴァンスのラベンダー畑からイタリアの歴史的な庭園、ポルトガルのドラマチックな海岸線まで、時代を超えたエレガンスを発見してください。'
            },
            countries: [
                { slug: 'france', name: { en: 'France', vi: 'Pháp', fr: 'France', zh: '法国', ja: 'フランス' }, href: '#' },
                { slug: 'italy', name: { en: 'Italy', vi: 'Ý', fr: 'Italie', zh: '意大利', ja: 'イタリア' }, href: '#' },
                { slug: 'netherlands', name: { en: 'Netherlands', vi: 'Hà Lan', fr: 'Pays-Bas', zh: '荷兰', ja: 'オランダ' }, href: '#'},
                { slug: 'portugal', name: { en: 'Portugal', vi: 'Bồ Đào Nha', fr: 'Portugal', zh: '葡萄牙', ja: 'ポルトガル' }, href: '#' },
                { slug: 'spain', name: { en: 'Spain', vi: 'Tây Ban Nha', fr: 'Espagne', zh: '西班牙', ja: 'スペイン' }, href: '#' },
                { slug: 'switzerland', name: { en: 'Switzerland', vi: 'Thụy Sĩ', fr: 'Suisse', zh: '瑞士', ja: 'スイス' }, href: '#' },
                { slug: 'united-kingdom', name: { en: 'United Kingdom', vi: 'Vương quốc Anh', fr: 'Royaume-Uni', zh: '英国', ja: 'イギリス' }, href: '#'}
            ].sort((a, b) => a.name.en.localeCompare(b.name.en)),
            featuredTours: [
                {
                    slug: 'provence-lavender',
                    title: { en: 'Provence Lavender Fields', vi: 'Cánh đồng oải hương Provence', fr: 'Champs de Lavande de Provence', zh: '普罗旺斯薰衣草田', ja: 'プロヴァンスのラベンダー畑' },
                    navigation: { page: 'tour', id: 'fr-lavender-1' },
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6CzN3HTOXDOVnuIJn9jTqpO1v8CNbuRSN7w&s',
                },
                {
                    slug: 'dutch-tulip-mania',
                    title: { en: 'Dutch Tulip Mania', vi: 'Cơn sốt hoa tulip Hà Lan', fr: 'La Folie des Tulipes Hollandaises', zh: '荷兰郁金香狂热', ja: 'オランダのチューリップマニア' },
                    navigation: { page: 'floral-event', id: 'nl-tulips' },
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSixHDI7jdAOnGJpsdVZO7BneltN-rpUAh61Q&s',
                }
            ]
        },
        {
            id: 'africa',
            name: { en: 'Africa', vi: 'Châu Phi', fr: 'Afrique', zh: '非洲', ja: 'アフリカ' },
            description: {
                en: 'Explore vibrant cultures and dramatic landscapes, from the exotic gardens of Marrakech to the unique flora of South Africa.',
                vi: 'Khám phá các nền văn hóa sôi động và cảnh quan ngoạn mục, từ những khu vườn kỳ lạ của Marrakech đến hệ thực vật độc đáo của Nam Phi.',
                fr: 'Explorez des cultures vibrantes et des paysages spectaculaires, des jardins exotiques de Marrakech à la flore unique de l\'Afrique du Sud.',
                zh: '探索充满活力的文化和壮丽的景观，从马拉喀什的异国花园到南非独特的植物群。',
                ja: 'マラケシュのエキゾチックな庭園から南アフリカのユニークな植物相まで、活気ある文化とドラマチックな風景を探検してください。'
            },
            countries: [
                { slug: 'morocco', name: { en: 'Morocco', vi: 'Ma-rốc', fr: 'Maroc', zh: '摩洛哥', ja: 'モロッコ' }, href: '#' },
                { slug: 'south-africa', name: { en: 'South Africa', vi: 'Nam Phi', fr: 'Afrique du Sud', zh: '南非', ja: '南アフリカ' }, href: '#' },
                { slug: 'egypt', name: { en: 'Egypt', vi: 'Ai Cập', fr: 'Égypte', zh: '埃及', ja: 'エジプト' }, href: '#' },
            ],
            featuredTours: [
                 {
                    slug: 'majorelle-garden-marrakech',
                    title: { en: 'Gardens of Marrakech', vi: 'Những khu vườn của Marrakech', fr: 'Jardins de Marrakech', zh: '马拉喀什花园', ja: 'マラケシュの庭園' },
                    navigation: { page: 'tour', id: 'ma-gardens-1' },
                    image: 'https://s3.amazonaws.com/fathom_media/photos/Marrakech-Anima-Heller-mountainview.jpg.1200x800_q85_crop.jpg',
                }
            ]
        }
    ]
}
