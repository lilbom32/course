
import type { LocalizedString } from './types';

export interface TravelType {
  id: number;
  title: LocalizedString;
  description: LocalizedString;
  imageGradient: string;
  slug: string;
  imagePosition?: string;
}

export const travelTypesData: TravelType[] = [
  {
    id: 1,
    title: {
      en: 'Small Group Tours',
      vi: 'Tour Theo Nhóm Nhỏ',
      fr: 'Tours en Petit Groupe',
      zh: '小团游',
      ja: '小グループツアー'
    },
    description: {
      en: 'Join a small, intimate group of like-minded travellers on a journey of discovery.',
      vi: 'Tham gia một nhóm nhỏ, thân mật gồm những du khách cùng chí hướng trong một hành trình khám phá.',
      fr: 'Rejoignez un petit groupe intime de voyageurs partageant les mêmes idées pour un voyage de découverte.',
      zh: '加入一个由志同道合的旅行者组成的小型私密团体，踏上探索之旅。',
      ja: '同じ考えを持つ旅行者の小さな親密なグループに参加して、発見の旅に出かけましょう。'
    },
    imageGradient: `url('https://i.pinimg.com/1200x/38/d4/b2/38d4b28607a23ca7664cd9c4bba8fd61.jpg')`,
    slug: 'small-group-tours',
  },
  {
    id: 2,
    title: {
      en: 'Bespoke Journeys',
      vi: 'Hành Trình Thiết Kế Riêng',
      fr: 'Voyages sur Mesure',
      zh: '定制旅程',
      ja: 'オーダーメイドの旅'
    },
    description: {
      en: 'Let us craft a personalized itinerary tailored perfectly to your interests and style.',
      vi: 'Hãy để chúng tôi tạo ra một lịch trình cá nhân hóa hoàn toàn phù hợp với sở thích và phong cách của bạn.',
      fr: 'Laissez-nous créer un itinéraire personnalisé parfaitement adapté à vos intérêts et à votre style.',
      zh: '让我们为您量身打造完全符合您兴趣和风格的个性化行程。',
      ja: 'あなたの興味やスタイルに完璧に合わせた、パーソナライズされた旅程を作成させてください。'
    },
    imageGradient: `url('https://i.pinimg.com/1200x/e1/8e/5b/e18e5b8290efce1d6a35eba665a84d4f.jpg')`,
    slug: 'bespoke-journeys',
  },
  {
    id: 3,
    title: {
      en: 'Self-Guided Trips',
      vi: 'Chuyến Đi Tự Hướng Dẫn',
      fr: 'Voyages Autoguidés',
      zh: '自助游',
      ja: 'セルフガイド旅行'
    },
    description: {
      en: 'Travel at your own pace with our expertly planned routes and local support.',
      vi: 'Du lịch theo tốc độ của riêng bạn với các tuyến đường được lên kế hoạch chuyên nghiệp và sự hỗ trợ tại địa phương của chúng tôi.',
      fr: 'Voyagez à votre rythme avec nos itinéraires conçus par des experts et notre soutien local.',
      zh: '按照您自己的节奏旅行，我们提供专业规划的路线和当地支持。',
      ja: '専門的に計画されたルートと現地のサポートで、自分のペースで旅行しましょう。'
    },
    imageGradient: `url('https://i.pinimg.com/1200x/a0/12/b0/a012b0625859306fdf5739ac52ec3791.jpg')`,
    slug: 'self-guided-trips',
  },
  {
    id: 4,
    title: {
      en: 'Floral Calendar',
      vi: 'Lịch Hoa',
      fr: 'Calendrier Floral',
      zh: '花卉日历',
      ja: '花の暦'
    },
    description: {
      en: 'Explore global blooms with our year-round guide to the best floral seasons and events.',
      vi: 'Khám phá các loài hoa toàn cầu với hướng dẫn quanh năm của chúng tôi về các mùa hoa và sự kiện đẹp nhất.',
      fr: 'Explorez les floraisons du monde entier avec notre guide annuel des meilleures saisons et événements floraux.',
      zh: '通过我们全年的最佳花季和活动指南，探索全球的花卉盛开。',
      ja: '最高の花の季節やイベントを紹介する年間ガイドで、世界中の花々を探検しましょう。'
    },
    imageGradient: `url('https://i.pinimg.com/736x/40/3f/f9/403ff97a6b134e3701f7be05f6a7f93c.jpg')`,
    slug: 'floral-calendar',
  },
];
