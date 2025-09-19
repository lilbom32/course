
import React from 'react';
import type { LocalizedString } from './types';

export interface HallmarkData {
  id: number;
  title: LocalizedString;
  description: LocalizedString;
  icon: React.ReactNode;
}

export const hallmarksData: HallmarkData[] = [
  {
    id: 1,
    title: {
      en: 'Creative Adventures',
      vi: 'Cuộc phiêu lưu sáng tạo',
      fr: 'Aventures Créatives',
      zh: '创意冒险',
      ja: 'クリエイティブな冒険'
    },
    description: {
      en: 'Journeys designed to inspire, with unique access and unexpected discoveries.',
      vi: 'Những hành trình được thiết kế để truyền cảm hứng, với quyền truy cập độc đáo và những khám phá bất ngờ.',
      fr: 'Des voyages conçus pour inspirer, avec un accès unique et des découvertes inattendues.',
      zh: '旨在激发灵感的旅程，提供独特的体验和意外的发现。',
      ja: 'ユニークなアクセスと予期せぬ発見で、インスピレーションを与えるように設計された旅。'
    },
    icon: React.createElement('img', { src: 'https://plus.unsplash.com/premium_vector-1736939964168-29bb86cbec63?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Vector illustration for Creative Adventures', loading: 'lazy' }),
  },
  {
    id: 2,
    title: {
      en: 'Legendary Guides',
      vi: 'Hướng dẫn viên huyền thoại',
      fr: 'Guides Légendaires',
      zh: '传奇向导',
      ja: '伝説のガイド'
    },
    description: {
      en: 'Passionate storytellers and local experts who bring each destination to life.',
      vi: 'Những người kể chuyện đầy nhiệt huyết và chuyên gia địa phương làm cho mỗi điểm đến trở nên sống động.',
      fr: 'Des conteurs passionnés et des experts locaux qui donnent vie à chaque destination.',
      zh: '充满激情的故事讲述者和当地专家，让每个目的地都焕发生机。',
      ja: '各目的地に命を吹き込む、情熱的なストーリーテラーと地元の専門家。'
    },
    icon: React.createElement('img', { src: 'https://plus.unsplash.com/premium_vector-1749637416577-15c8321401f3?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Vector illustration of a guide for Legendary Guides', loading: 'lazy' }),
  },
  {
    id: 3,
    title: {
      en: 'Extraordinary Routes',
      vi: 'Cung đường phi thường',
      fr: 'Itinéraires Extraordinaires',
      zh: '非凡路线',
      ja: '非凡なルート'
    },
    description: {
      en: 'Thoughtfully crafted itineraries that take you beyond the guidebook.',
      vi: 'Những lịch trình được xây dựng cẩn thận đưa bạn vượt ra ngoài sách hướng dẫn.',
      fr: 'Des itinéraires soigneusement conçus qui vous emmènent au-delà du guide.',
      zh: '精心设计的行程，带您超越指南书的限制。',
      ja: 'ガイドブックを超えた、考え抜かれた旅程。'
    },
    icon: React.createElement('img', { src: 'https://plus.unsplash.com/premium_vector-1736941210010-0e4c84033422?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Vector illustration of mountains and a path for Extraordinary Routes', loading: 'lazy' }),
  },
  {
    id: 4,
    title: {
      en: 'Cultural Immersion',
      vi: 'Hòa mình vào văn hóa',
      fr: 'Immersion Culturelle',
      zh: '文化沉浸',
      ja: '文化体験'
    },
    description: {
      en: 'Connect with local communities and traditions in a meaningful, authentic way.',
      vi: 'Kết nối với cộng đồng và truyền thống địa phương một cách có ý nghĩa, đích thực.',
      fr: 'Connectez-vous avec les communautés et traditions locales de manière significative et authentique.',
      zh: '以有意义、真实的方式与当地社区和传统建立联系。',
      ja: '有意義で本物の方法で、地元のコミュニティや伝統とつながる。'
    },
    icon: React.createElement('img', { src: 'https://plus.unsplash.com/premium_vector-1736941210144-973d051699fe?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Vector illustration of cultural items for Cultural Immersion', loading: 'lazy' }),
  },
  {
    id: 5,
    title: {
      en: 'Unique Stays',
      vi: 'Nơi ở độc đáo',
      fr: 'Séjours Uniques',
      zh: '独特住宿',
      ja: 'ユニークな滞在'
    },
    description: {
      en: 'From boutique hotels to charming villas, we find accommodation with character.',
      vi: 'Từ khách sạn boutique đến biệt thự duyên dáng, chúng tôi tìm kiếm những nơi ở có cá tính.',
      fr: 'Des hôtels-boutiques aux villas de charme, nous trouvons des hébergements de caractère.',
      zh: '从精品酒店到迷人别墅，我们为您寻找充满个性的住宿。',
      ja: 'ブティックホテルから魅力的なヴィラまで、個性的な宿泊施設を見つけます。'
    },
    icon: React.createElement('img', { src: 'https://plus.unsplash.com/premium_vector-1736940512780-e0eb863b46ae?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Vector illustration of unique houses for Unique Stays', loading: 'lazy' }),
  },
   {
    id: 6,
    title: {
      en: 'Gastronomic Excellence',
      vi: 'Ẩm thực xuất sắc',
      fr: 'Excellence Gastronomique',
      zh: '卓越美食',
      ja: '美食の卓越性'
    },
    description: {
      en: 'Savour the local flavour with curated dining experiences and culinary classes.',
      vi: 'Thưởng thức hương vị địa phương với những trải nghiệm ẩm thực được tuyển chọn và các lớp học nấu ăn.',
      fr: 'Savourez la saveur locale avec des expériences culinaires et des cours de cuisine sélectionnés.',
      zh: '通过精心策划的餐饮体验和烹饪课程，品味当地风味。',
      ja: '厳選された食事体験や料理教室で、地元の味を堪能する。'
    },
    icon: React.createElement('img', { src: 'https://images.unsplash.com/vector-1739806775701-7ff903c9d70f?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Vector illustration of a gourmet meal for Gastronomic Excellence', loading: 'lazy' }),
  },
];
