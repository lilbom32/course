
import type { LocalizedString } from './types';

export interface JournalCategory {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  image: string;
  slug: string;
}

export const journalCategoriesData: JournalCategory[] = [
  {
    id: 'dest-guides',
    slug: 'destination-guides',
    title: {
      en: 'Destination Guides',
      vi: 'Cẩm Nang Điểm Đến',
      fr: 'Guides de Destination',
      zh: '目的地指南',
      ja: '目的地ガイド'
    },
    description: {
      en: 'In-depth guides to floral destinations, seasonal bloom calendars, and eco-sustainable travel routes.',
      vi: 'Cẩm nang chi tiết về các điểm đến hoa, lịch nở hoa theo mùa, và các cung đường du lịch bền vững.',
      fr: 'Guides approfondis des destinations florales, calendriers de floraison saisonniers et itinéraires de voyage éco-durables.',
      zh: '花卉目的地深度指南、季节性花期日历以及生态可持续旅游路线。',
      ja: '花の目的地、季節の開花カレンダー、エコ持続可能な旅行ルートに関する詳細なガイド。'
    },
    image: 'https://i.pinimg.com/736x/b8/88/32/b88832abcbc63a04da36d372bb249ef7.jpg',
  },
  {
    id: 'story-insp',
    slug: 'storytelling-inspiration',
    title: {
      en: 'Storytelling & Inspiration',
      vi: 'Câu Chuyện & Cảm Hứng',
      fr: 'Récits & Inspiration',
      zh: '故事与灵感',
      ja: 'ストーリーテリングとインスピレーション'
    },
    description: {
      en: 'Personal travel stories, interviews with artisans, and reflective essays that ignite your wanderlust.',
      vi: 'Những câu chuyện du lịch cá nhân, phỏng vấn nghệ nhân, và những bài luận suy tưởng khơi dậy niềm đam mê xê dịch.',
      fr: 'Récits de voyage personnels, entretiens avec des artisans et essais réflexifs qui enflamment votre envie de voyager.',
      zh: '个人旅行故事、工匠访谈以及点燃您旅行欲望的反思性文章。',
      ja: '個人の旅行記、職人へのインタビュー、そしてあなたの放浪心を刺激する思索的なエッセイ。'
    },
    image: 'https://i.pinimg.com/736x/56/a7/73/56a773b54d766cf217c0772d2686b4d6.jpg',
  },
  {
    id: 'skills-life',
    slug: 'skills-lifestyle',
    title: {
      en: 'Skills & Lifestyle',
      vi: 'Kỹ Năng & Phong Cách Sống',
      fr: 'Compétences & Art de Vivre',
      zh: '技能与生活方式',
      ja: 'スキルとライフスタイル'
    },
    description: {
      en: 'Tips on floral photography, botanical arrangements, sustainable travel, and the art of slow living.',
      vi: 'Mẹo về nhiếp ảnh hoa, cắm hoa, du lịch bền vững, và nghệ thuật sống chậm.',
      fr: 'Conseils sur la photographie florale, les arrangements botaniques, le voyage durable et l\'art de vivre lentement.',
      zh: '关于花卉摄影、植物布置、可持续旅行和慢生活艺术的技巧。',
      ja: '花の撮影、植物のアレンジメント、持続可能な旅行、そしてスローライフの芸術に関するヒント。'
    },
    image: 'https://i.pinimg.com/1200x/92/61/e7/9261e746b1c4f64ae56d0255b3d6db94.jpg',
  },
  {
    id: 'about-brand',
    slug: 'about-le-floraltravel',
    title: {
      en: 'About Le FloralTravel',
      vi: 'Về Le FloralTravel',
      fr: 'À propos de Le FloralTravel',
      zh: '关于 Le FloralTravel',
      ja: 'Le FloralTravelについて'
    },
    description: {
      en: 'Our philosophy, sustainable commitments, and the values that guide every journey we craft.',
      vi: 'Triết lý của chúng tôi, các cam kết bền vững, và những giá trị dẫn lối cho mỗi hành trình chúng tôi tạo ra.',
      fr: 'Notre philosophie, nos engagements durables et les valeurs qui guident chaque voyage que nous créons.',
      zh: '我们的理念、可持续承诺以及指导我们精心打造的每一次旅程的价值观。',
      ja: '私たちの哲学、持続可能なコミットメント、そして私たちが創り出すすべての旅を導く価値観。'
    },
    image: 'https://i.pinimg.com/736x/7b/fd/a7/7bfda722dcc52d764a56589de4216f4c.jpg',
  },
];
