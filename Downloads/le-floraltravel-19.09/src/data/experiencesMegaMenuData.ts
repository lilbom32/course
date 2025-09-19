
import type { LocalizedString } from './types';

type NavigationObject = 
  | { page: 'tour'; id: string } 
  | { page: 'country'; slug: string };

export interface FeaturedTripExperience {
  slug: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  image: string;
  navigation: NavigationObject;
}

export interface SubCategory {
    name: LocalizedString;
    href: string;
    slug: string;
}

export interface TripType {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  subCategories: SubCategory[];
  featuredTrips: FeaturedTripExperience[];
}

export const experiencesMegaMenuData: TripType[] = [
  {
    id: 'small-group',
    name: { en: 'Small Group', vi: 'Nhóm nhỏ', fr: 'Petit Groupe', zh: '小团', ja: '小グループ' },
    description: {
      en: 'Small Group trips share expertly curated adventures with like-minded travellers',
      vi: 'Chuyến đi Nhóm nhỏ chia sẻ những cuộc phiêu lưu được tuyển chọn chuyên nghiệp với những du khách cùng chí hướng',
      fr: 'Les voyages en petits groupes partagent des aventures soigneusement sélectionnées avec des voyageurs aux vues similaires',
      zh: '小团旅行与志同道合的旅行者分享精心策划的冒险',
      ja: '小グループ旅行は、同じ志を持つ旅行者と専門的に厳選された冒険を共有します'
    },
    subCategories: [
        { name: { en: 'BIKING', vi: 'ĐẠP XE', fr: 'VÉLO', zh: '骑行', ja: 'サイクリング' }, href: '#', slug: 'biking' },
        { name: { en: 'BY SEA', vi: 'ĐƯỜNG BIỂN', fr: 'PAR LA MER', zh: '海上', ja: '海上' }, href: '#', slug: 'by-sea' },
        { name: { en: 'LIMITED EDITION', vi: 'PHIÊN BẢN GIỚI HẠN', fr: 'ÉDITION LIMITÉE', zh: '限量版', ja: '限定版' }, href: '#', slug: 'limited-edition' },
        { name: { en: 'MULTI-ACTIVE', vi: 'ĐA HOẠT ĐỘNG', fr: 'MULTI-ACTIF', zh: '多项活动', ja: 'マルチアクティブ' }, href: '#', slug: 'multi-active' },
        { name: { en: 'MULTI-COUNTRY', vi: 'NHIỀU QUỐC GIA', fr: 'MULTI-PAYS', zh: '多国', ja: '複数国' }, href: '#', slug: 'multi-country' },
        { name: { en: 'WALKING & HIKING', vi: 'ĐI BỘ & LEO NÚI', fr: 'MARCHE ET RANDONNÉE', zh: '徒步与远足', ja: 'ウォーキング＆ハイキング' }, href: '#', slug: 'walking-hiking' },
        { name: { en: 'WINTER ADVENTURES', vi: 'PHIÊU LƯU MÙA ĐÔNG', fr: 'AVENTURES HIVERNALES', zh: '冬季探险', ja: '冬の冒険' }, href: '#', slug: 'winter-adventures' },
        { name: { en: 'WOMEN\'S ONLY', vi: 'CHỈ DÀNH CHO NỮ', fr: 'POUR FEMMES SEULEMENT', zh: '仅限女性', ja: '女性限定' }, href: '#', slug: 'womens-only' },
    ],
    featuredTrips: [
        {
            slug: 'ultimate-morocco',
            title: { en: 'Ultimate Morocco', vi: 'Ma-rốc Tột Đỉnh', fr: 'Maroc Ultime', zh: '终极摩洛哥', ja: 'アルティメット・モロッコ' },
            subtitle: { en: 'Multi-Active', vi: 'Đa hoạt động', fr: 'Multi-Actif', zh: '多项活动', ja: 'マルチアクティブ' },
            navigation: { page: 'tour', id: 'ma-desert-1' },
            image: 'https://lp-cms-production.imgix.net/2025-04/GettyImages-1450546518-16.9.jpg?auto=format,compress&q=72&w=1440&h=810&fit=crop',
        },
        {
            slug: 'basque-country',
            title: { en: 'Basque Country', vi: 'Xứ Basque', fr: 'Pays Basque', zh: '巴斯克地区', ja: 'バスク地方' },
            subtitle: { en: 'Walking & Hiking', vi: 'Đi bộ & Leo núi', fr: 'Marche et Randonnée', zh: '徒步与远足', ja: 'ウォーキング＆ハイキング' },
            navigation: { page: 'country', slug: 'france' },
            image: 'https://images.ctfassets.net/zmjc9gr9hbbf/6oJ5RbfDM5mo8J0oSaxHkv/149692dc2a004ac8f38fbab5d6297373/Basque_Country_Blog_12_Saint_Jean_Pied_de_Port_AdobeStock_466523242.jpg?w=1980',
        }
    ]
  },
  {
    id: 'bespoke',
    name: { en: 'Bespoke', vi: 'Thiết kế riêng', fr: 'Sur Mesure', zh: '定制', ja: 'オーダーメイド' },
    description: {
      en: 'Our travel experts will craft a unique, personalized journey just for you, based on your interests and travel style.',
      vi: 'Các chuyên gia du lịch của chúng tôi sẽ tạo ra một hành trình độc đáo, được cá nhân hóa dành riêng cho bạn, dựa trên sở thích và phong cách du lịch của bạn.',
      fr: 'Nos experts en voyages créeront un voyage unique et personnalisé juste pour vous, en fonction de vos intérêts et de votre style de voyage.',
      zh: '我们的旅行专家将根据您的兴趣和旅行风格，为您量身打造独一无二的个性化旅程。',
      ja: '私たちの旅行専門家が、あなたの興味や旅行スタイルに基づいて、あなただけのユニークでパーソナライズされた旅を作り上げます。'
    },
    subCategories: [
        { name: { en: 'HONEYMOONS', vi: 'TRĂNG MẬT', fr: 'LUNES DE MIEL', zh: '蜜月', ja: 'ハネムーン' }, href: '#', slug: 'honeymoons' },
        { name: { en: 'FAMILY ADVENTURES', vi: 'PHIÊU LƯU GIA ĐÌNH', fr: 'AVENTURES FAMILIALES', zh: '家庭探险', ja: '家族の冒険' }, href: '#', slug: 'family-adventures' },
        { name: { en: 'CULINARY TOURS', vi: 'TOUR ẨM THỰC', fr: 'TOURS CULINAIRES', zh: '美食之旅', ja: '料理ツアー' }, href: '#', slug: 'culinary' },
        { name: { en: 'PHOTOGRAPHY TRIPS', vi: 'CHUYẾN ĐI NHIẾP ẢNH', fr: 'VOYAGES PHOTOGRAPHIQUES', zh: '摄影之旅', ja: '写真旅行' }, href: '#', slug: 'photography-trips' },
        { name: { en: 'LUXURY TRAVEL', vi: 'DU LỊCH CAO CẤP', fr: 'VOYAGES DE LUXE', zh: '豪华旅行', ja: '豪華旅行' }, href: '#', slug: 'luxury-travel' },
        { name: { en: 'ART & HISTORY', vi: 'NGHỆ THUẬT & LỊCH SỬ', fr: 'ART ET HISTOIRE', zh: '艺术与历史', ja: 'アート＆歴史' }, href: '#', slug: 'art-history' },
    ],
    featuredTrips: [
        {
            slug: 'tuscany-villa-escape',
            title: { en: 'Tuscany Villa Escape', vi: 'Lối thoát tại Biệt thự Tuscany', fr: 'Évasion dans une Villa en Toscane', zh: '托斯卡纳别墅逍遥游', ja: 'トスカーナのヴィラでの休暇' },
            subtitle: { en: 'Luxury & Culinary', vi: 'Sang trọng & Ẩm thực', fr: 'Luxe et Culinaire', zh: '豪华与美食', ja: 'ラグジュアリー＆グルメ' },
            navigation: { page: 'tour', id: 'it-tuscany-1' },
            image: 'https://images.luxuryescapes.com/q_auto:good/nmrii1lk3oh807myu5f',
        },
        {
            slug: 'safari-and-spice',
            title: { en: 'Safari and Spice', vi: 'Safari và Gia vị', fr: 'Safari et Épices', zh: '狩猎与香料', ja: 'サファリとスパイス' },
            subtitle: { en: 'Family Adventure', vi: 'Phiêu lưu gia đình', fr: 'Aventure Familiale', zh: '家庭探险', ja: '家族の冒険' },
            navigation: { page: 'country', slug: 'morocco' },
            image: 'https://media.istockphoto.com/id/120355516/photo/a-desert-oasis-in-sahara-libya.jpg?s=612x612&w=0&k=20&c=qScFQSvETDQTzm547I2arUuPEQog7x0bWf_NgtfSSbQ=',
        }
    ]
  },
  {
    id: 'self-guided',
    name: { en: 'Self-Guided', vi: 'Tự hướng dẫn', fr: 'Autoguidé', zh: '自助', ja: 'セルフガイド' },
    description: {
      en: 'Travel at your own pace with our expertly planned routes, detailed notes, and local on-call support.',
      vi: 'Du lịch theo tốc độ của riêng bạn với các tuyến đường được lên kế hoạch chuyên nghiệp, ghi chú chi tiết và hỗ trợ tại chỗ của chúng tôi.',
      fr: 'Voyagez à votre rythme avec nos itinéraires planifiés par des experts, des notes détaillées et un soutien local sur appel.',
      zh: '按照您自己的节奏旅行，我们提供精心策划的路线、详细的笔记和当地的随叫随到支持。',
      ja: '専門的に計画されたルート、詳細なメモ、現地のオンコールサポートで、自分のペースで旅行しましょう。'
    },
     subCategories: [
        { name: { en: 'CYCLING ROUTES', vi: 'CUNG ĐƯỜNG ĐẠP XE', fr: 'ITINÉRAIRES CYCLABLES', zh: '骑行路线', ja: 'サイクリングルート' }, href: '#', slug: 'cycling-routes' },
        { name: { en: 'COASTAL WALKS', vi: 'ĐI BỘ VEN BIỂN', fr: 'PROMENADES CÔTIÈRES', zh: '沿海步行', ja: '海岸ウォーク' }, href: '#', slug: 'coastal-walks' },
        { name: { en: 'MOUNTAIN TREKS', vi: 'LEO NÚI', fr: 'RANDONNÉES EN MONTAGNE', zh: '山地跋涉', ja: '山岳トレッキング' }, href: '#', slug: 'mountain-treks' },
        { name: { en: 'CITY EXPLORATIONS', vi: 'KHÁM PHÁ THÀNH PHỐ', fr: 'EXPLORATIONS URBAINES', zh: '城市探索', ja: '都市探訪' }, href: '#', slug: 'city-explorations' },
        { name: { en: 'ROAD TRIPS', vi: 'CHUYẾN ĐI ĐƯỜNG BỘ', fr: 'VOYAGES EN VOITURE', zh: '公路旅行', ja: 'ロードトリップ' }, href: '#', slug: 'road-trips' },
    ],
    featuredTrips: [
        {
            slug: 'scotland-highland-drive',
            title: { en: 'Scotland Highland Drive', vi: 'Chuyến xe Cao nguyên Scotland', fr: 'Conduite dans les Highlands d\'Écosse', zh: '苏格兰高地自驾游', ja: 'スコットランド・ハイランドドライブ' },
            subtitle: { en: 'Road Trip', vi: 'Chuyến đi đường bộ', fr: 'Voyage en Voiture', zh: '公路旅行', ja: 'ロードトリップ' },
            navigation: { page: 'tour', id: 'ch-rail-1' },
            image: 'https://cdn.kimkim.com/files/a/images/a77433ab74b5d01dc1e47ce8f34049bcb13100d4/big-248fd2ee4bdfd9716f940bd29096090f.jpg',
        },
         {
            slug: 'cinque-terre-hike',
            title: { en: 'Cinque Terre Hike', vi: 'Chuyến đi bộ Cinque Terre', fr: 'Randonnée aux Cinque Terre', zh: '五渔村徒步', ja: 'チンクエ・テッレ・ハイク' },
            subtitle: { en: 'Coastal Walk', vi: 'Đi bộ ven biển', fr: 'Promenade Côtière', zh: '沿海步行', ja: '海岸ウォーク' },
            navigation: { page: 'country', slug: 'italy' },
            image: 'https://www.casaleamati.com/wp-content/uploads/2019/02/casale-amati-trekking2.jpg',
        }
    ]
  },
  {
    id: 'floral-calendar',
    name: { en: 'Floral Calendar', vi: 'Lịch Hoa', fr: 'Calendrier Floral', zh: '花卉日历', ja: '花の暦' },
    description: { 
        en: 'Discover curated journeys timed perfectly for the world’s most spectacular floral seasons and events.',
        vi: 'Khám phá các hành trình được tuyển chọn phù hợp hoàn hảo với các mùa hoa và sự kiện ngoạn mục nhất thế giới.',
        fr: 'Découvrez des voyages organisés parfaitement synchronisés avec les saisons et événements floraux les plus spectaculaires du monde.',
        zh: '探索精心策划的旅程，完美契合全球最壮观的花卉季节和活动。',
        ja: '世界の最も壮観な花の季節やイベントに完璧に合わせた、厳選された旅を発見してください。'
     },
    subCategories: [],
    featuredTrips: []
  }
];
