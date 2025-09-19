
import type { LocalizedString } from './types';

export interface Testimonial {
  id: number;
  quote: LocalizedString;
  author: LocalizedString;
  tour: LocalizedString;
}

export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    quote: {
      en: 'An absolutely unforgettable journey. Every detail was perfectly planned, and the sights were beyond beautiful. Le FloralTravel made our dream trip a reality.',
      vi: 'Một chuyến đi hoàn toàn không thể nào quên. Mọi chi tiết đều được lên kế hoạch hoàn hảo, và cảnh vật thì đẹp hơn cả mong đợi. Le FloralTravel đã biến chuyến đi mơ ước của chúng tôi thành hiện thực.',
      fr: 'Un voyage absolument inoubliable. Chaque détail était parfaitement planifié, et les paysages étaient d\'une beauté indescriptible. Le FloralTravel a fait de notre voyage de rêve une réalité.',
      zh: '一次绝对难忘的旅程。每个细节都计划得非常完美，景色美得超乎想象。Le FloralTravel 让我们的梦想之旅成为现实。',
      ja: '絶対に忘れられない旅でした。すべてのディテールが完璧に計画され、景色は言葉では言い表せないほど美しかったです。Le FloralTravelは私たちの夢の旅を実現してくれました。'
    },
    author: {
      en: 'Eleanor Vance',
      vi: 'Eleanor Vance',
      fr: 'Éléonore Vance',
      zh: '埃莉诺·万斯',
      ja: 'エレノア・ヴァンス'
    },
    tour: {
      en: 'Kyoto Cherry Blossom Trail',
      vi: 'Đường Mòn Hoa Anh Đào Kyoto',
      fr: 'Sentier des Cerisiers en Fleurs de Kyoto',
      zh: '京都樱花小径',
      ja: '京都桜の道'
    }
  },
  {
    id: 2,
    quote: {
      en: 'The guide was a true local expert and showed us hidden gems we would have never found on our own. The entire experience felt so authentic and personal.',
      vi: 'Hướng dẫn viên là một chuyên gia địa phương thực thụ và đã chỉ cho chúng tôi những viên ngọc ẩn mà chúng tôi không bao giờ tự tìm thấy được. Toàn bộ trải nghiệm thật chân thực và cá nhân.',
      fr: 'Le guide était un véritable expert local et nous a montré des trésors cachés que nous n\'aurions jamais trouvés par nous-mêmes. Toute l\'expérience était si authentique et personnelle.',
      zh: '导游是真正的当地专家，向我们展示了我们自己永远找不到的隐藏宝藏。整个体验感觉非常真实和个性化。',
      ja: 'ガイドは真の地元の専門家で、自分たちだけでは決して見つけられなかった隠れた名所を案内してくれました。全体の経験がとても本物で個人的なものに感じられました。'
    },
    author: {
      en: 'Marcus Holloway',
      vi: 'Marcus Holloway',
      fr: 'Marcus Holloway',
      zh: '马库斯·霍洛威',
      ja: 'マーカス・ホロウェイ'
    },
    tour: {
      en: 'Provence Lavender Fields',
      vi: 'Cánh Đồng Oải Hương Provence',
      fr: 'Champs de Lavande de Provence',
      zh: '普罗旺斯薰衣草田',
      ja: 'プロヴァンスのラベンダー畑'
    }
  },
  {
    id: 3,
    quote: {
      en: 'From the moment we booked until the day we returned home, the service was exceptional. It was the most seamless and relaxing vacation we have ever taken.',
      vi: 'Từ lúc chúng tôi đặt tour cho đến ngày trở về, dịch vụ thật sự xuất sắc. Đó là kỳ nghỉ liền mạch và thư giãn nhất mà chúng tôi từng có.',
      fr: 'Du moment où nous avons réservé jusqu\'au jour de notre retour, le service a été exceptionnel. C\'étaient les vacances les plus fluides et les plus relaxantes que nous ayons jamais prises.',
      zh: '从我们预订的那一刻到我们回家的那天，服务都非常出色。这是我们有史以来最顺畅、最轻松的假期。',
      ja: '予約した瞬間から帰宅する日まで、サービスは格別でした。これまでで最もスムーズでリラックスできる休暇でした。'
    },
    author: {
      en: 'Sofia Chen',
      vi: 'Sofia Chen',
      fr: 'Sofia Chen',
      zh: '索菲亚·陈',
      ja: 'ソフィア・チェン'
    },
    tour: {
      en: 'Dutch Tulip Mania',
      vi: 'Cơn Sốt Hoa Tulip Hà Lan',
      fr: 'La Folie des Tulipes Hollandaises',
      zh: '荷兰郁金香狂热',
      ja: 'オランダのチューリップマニア'
    }
  },
];
