
import type { LocalizedString } from './types';

export interface JournalPost {
  id: number;
  slug: string;
  title: LocalizedString;
  author: LocalizedString;
  date: LocalizedString;
  excerpt: LocalizedString;
  image: string;
  content: LocalizedString;
  categoryId: string;
  viewCount: number;
  subCategorySlug?: string;
}

export const journalData: JournalPost[] = [
  {
    id: 1,
    slug: 'guide-to-ikebana',
    title: {
      en: 'A Guide to Ikebana',
      vi: 'Hướng dẫn về Ikebana',
      fr: 'Un guide de l\'Ikebana',
      zh: '花道指南',
      ja: '生け花ガイド'
    },
     author: {
      en: 'Yuki Tanaka',
      vi: 'Yuki Tanaka',
      fr: 'Yuki Tanaka',
      zh: '田中由纪',
      ja: '田中由紀'
    },
    date: {
        en: 'July 22, 2024',
        vi: 'Ngày 22 tháng 7 năm 2024',
        fr: '22 juillet 2024',
        zh: '2024年7月22日',
        ja: '2024年7月22日'
    },
    excerpt: {
      en: 'Discover the Japanese art of flower arranging and how it connects with nature and mindfulness.',
      vi: 'Khám phá nghệ thuật cắm hoa Nhật Bản và cách nó kết nối với thiên nhiên và chánh niệm.',
      fr: 'Découvrez l\'art japonais de l\'arrangement floral et comment il se connecte avec la nature et la pleine conscience.',
      zh: '探索日本插花艺术及其与自然和正念的联系。',
      ja: '日本の華道である生け花の世界を探求し、それが自然やマインドフルネスとどのように結びついているかを発見します。'
    },
    image: 'https://images.unsplash.com/photo-1593436874554-e1e5491185b2?q=80&w=2070&auto=format&fit=crop',
    content: {
        en: `
Ikebana (生け花), the Japanese art of flower arrangement, is more than just putting flowers in a vase. It's a disciplined art form in which nature and humanity are brought together. In contrast to the Western habit of casually placing flowers in a vase, ikebana aims to bring out the inner qualities of flowers and other live materials and express emotion.

### The Principles of Ikebana
The practice of ikebana is rooted in a set of principles that guide the artist in creating a harmonious and balanced arrangement. These principles are often summarized as **Ten** (heaven), **Chi** (earth), and **Jin** (human).

*   **Ten (Heaven):** This is the tallest element in the arrangement, representing the connection to the divine or the sky. It is usually a strong, upright branch.
*   **Chi (Earth):** This is the lowest element, representing the ground or the earth. It is typically a shorter, more horizontal element, such as a flower or a group of leaves.
*   **Jin (Human):** This is the middle element, representing humanity. It is placed between heaven and earth, bridging the gap between the two.

![A person carefully arranging flowers following Ikebana principles](https://images.unsplash.com/photo-1616428373638-3dd2389a3f43?q=80&w=870&auto=format&fit=crop)

### Finding Stillness in Creation
The process of creating an ikebana arrangement is a meditative practice. It requires patience, focus, and a deep appreciation for the beauty of nature. As you select your materials and carefully place them in the container, you are invited to slow down and connect with the present moment. This mindfulness is at the heart of ikebana.

> "The entire universe is reflected in a single flower." - Toshiro Kawase

This quote beautifully captures the essence of ikebana. It's not about creating a grand display, but about finding the profound beauty in simplicity. Each element is chosen with intention, and the empty space, or *ma* (間), is just as important as the flowers themselves. This negative space creates a sense of balance and harmony, allowing each element to be fully appreciated.
        `,
        vi: `(Nội dung tiếng Việt...)`,
        fr: `(Contenu en français...)`,
        zh: `(中文内容...)`,
        ja: `(日本語の内容...)`
    },
    categoryId: 'skills-lifestyle',
    viewCount: 950
  },
  {
    id: 2,
    slug: 'secret-gardens-of-paris',
    title: {
      en: 'The Secret Gardens of Paris',
      vi: 'Những khu vườn bí mật của Paris',
      fr: 'Les jardins secrets de Paris',
      zh: '巴黎的秘密花园',
      ja: 'パリの秘密の庭園'
    },
    author: {
      en: 'Amélie Dubois',
      vi: 'Amélie Dubois',
      fr: 'Amélie Dubois',
      zh: '艾米莉·杜波依斯',
      ja: 'アメリ・デュボワ'
    },
    date: {
        en: 'July 15, 2024',
        vi: 'Ngày 15 tháng 7 năm 2024',
        fr: '15 juillet 2024',
        zh: '2024年7月15日',
        ja: '2024年7月15日'
    },
    excerpt: {
      en: 'Beyond the famous parks, find the hidden green oases tucked away in the city of love.',
      vi: 'Ngoài những công viên nổi tiếng, hãy tìm những ốc đảo xanh ẩn mình trong thành phố tình yêu.',
      fr: 'Au-delà des parcs célèbres, trouvez les oasis de verdure cachées dans la ville de l\'amour.',
      zh: '在著名的公园之外，寻找隐藏在爱之城的绿色绿洲。',
      ja: '有名な公園の向こうに、愛の都に隠された緑のオアシスを見つけましょう。'
    },
    image: 'https://images.unsplash.com/photo-1558960226-2a6a6e731458?q=80&w=2070&auto=format&fit=crop',
    content: {
        en: `(Full English content about the secret gardens of Paris...)`,
        vi: `(Nội dung tiếng Việt...)`,
        fr: `(Contenu en français...)`,
        zh: `(中文内容...)`,
        ja: `(日本語の内容...)`
    },
    categoryId: 'destination-guides',
    subCategorySlug: 'signature-city-guides',
    viewCount: 1520
  },
  {
    id: 3,
    slug: 'foraging-for-wildflowers',
    title: {
      en: 'Foraging for Wildflowers',
      vi: 'Hái hoa dại',
      fr: 'À la cueillette des fleurs sauvages',
      zh: '采摘野花',
      ja: '野草を摘む'
    },
    author: {
      en: 'Liam O\'Connell',
      vi: 'Liam O\'Connell',
      fr: 'Liam O\'Connell',
      zh: '利亚姆·奥康奈尔',
      ja: 'リアム・オコンネル'
    },
    date: {
        en: 'June 28, 2024',
        vi: 'Ngày 28 tháng 6 năm 2024',
        fr: '28 juin 2024',
        zh: '2024年6月28日',
        ja: '2024年6月28日'
    },
    excerpt: {
      en: 'A beginner\'s guide to safely identifying and collecting edible and beautiful wildflowers.',
      vi: 'Hướng dẫn cho người mới bắt đầu về cách nhận dạng và thu thập an toàn các loài hoa dại ăn được và đẹp.',
      fr: 'Un guide du débutant pour identifier et cueillir en toute sécurité des fleurs sauvages comestibles et magnifiques.',
      zh: '安全识别和采集可食用和美丽野花的初学者指南。',
      ja: '食用可能で美しい野草を安全に識別し、収集するための初心者向けガイド。'
    },
    image: 'https://images.unsplash.com/photo-1588691522856-34b6389eba32?q=80&w=2070&auto=format&fit=crop',
    content: {
        en: `(Full English content about foraging for wildflowers...)`,
        vi: `(Nội dung tiếng Việt...)`,
        fr: `(Contenu en français...)`,
        zh: `(中文内容...)`,
        ja: `(日本語の内容...)`
    },
    categoryId: 'skills-lifestyle',
    viewCount: 880
  },
  {
    id: 4,
    slug: 'holland-tulip-route',
    title: { en: 'Holland\'s Tulip Route', vi: 'Cung đường Tulip Hà Lan', fr: 'La Route des Tulipes de Hollande', zh: '荷兰郁金香之路', ja: 'オランダのチューリップルート' },
    author: { en: 'Anja van der Berg', vi: 'Anja van der Berg', fr: 'Anja van der Berg', zh: '安雅·范德伯格', ja: 'アンヤ・ファン・デル・ベルク' },
    date: { en: 'July 18, 2024', vi: '18 tháng 7, 2024', fr: '18 juillet 2024', zh: '2024年7月18日', ja: '2024年7月18日' },
    excerpt: { en: 'A biker\'s dream through kaleidoscopic fields. Plan your cycling adventure through the heart of the Netherlands\' flower region.', vi: 'Giấc mơ của người đi xe đạp qua những cánh đồng vạn hoa. Lên kế hoạch cho chuyến phiêu lưu đạp xe của bạn qua trung tâm vùng hoa của Hà Lan.', fr: 'Le rêve d\'un cycliste à travers des champs kaléidoscopiques. Planifiez votre aventure à vélo au cœur de la région florale des Pays-Bas.', zh: '骑行者的梦想，穿越万花筒般的田野。规划您穿越荷兰花卉区心脏地带的自行车探险。', ja: '万華鏡のような畑を駆け抜けるサイクリストの夢。オランダの花の中心地を巡るサイクリングアドベンチャーを計画しましょう。' },
    image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=1964&auto=format&fit=crop',
    content: { en: 'Full content here...', vi: 'Nội dung đầy đủ ở đây...', fr: 'Contenu complet ici...', zh: '完整内容在此...', ja: '全文はこちら...' },
    categoryId: 'destination-guides',
    subCategorySlug: 'seasonal-bloom-calendars',
    viewCount: 2150
  },
  {
    id: 5,
    slug: 'stillness-kyoto-moss-garden',
    title: { en: 'Stillness in a Kyoto Moss Garden', vi: 'Sự tĩnh lặng trong vườn rêu Kyoto', fr: 'La quiétude dans un jardin de mousse de Kyoto', zh: '京都苔藓园的静谧', ja: '京都の苔庭の静寂' },
    author: { en: 'Kaito Ishikawa', vi: 'Kaito Ishikawa', fr: 'Kaito Ishikawa', zh: '石川海人', ja: '石川海人' },
    date: { en: 'July 10, 2024', vi: '10 tháng 7, 2024', fr: '10 juillet 2024', zh: '2024年7月10日', ja: '2024年7月10日' },
    excerpt: { en: 'On finding peace in the green, velvety silence of Saiho-ji, and how it reflects our travel philosophy.', vi: 'Về việc tìm thấy sự bình yên trong sự im lặng xanh mướt của Saiho-ji, và cách nó phản ánh triết lý du lịch của chúng tôi.', fr: 'Trouver la paix dans le silence vert et velouté de Saiho-ji, et comment cela reflète notre philosophie de voyage.', zh: '在西芳寺绿色、天鹅绒般的寂静中寻找宁静，以及它如何反映我们的旅行哲学。', ja: '西芳寺の緑豊かでビロードのような静寂の中で平和を見出すこと、そしてそれが私たちの旅の哲学をどのように反映しているかについて。' },
    image: 'https://images.unsplash.com/photo-1590382382803-ab695551989a?q=80&w=2070&auto=format&fit=crop',
    content: { en: 'Full content here...', vi: 'Nội dung đầy đủ ở đây...', fr: 'Contenu complet ici...', zh: '完整内容在此...', ja: '全文はこちら...' },
    categoryId: 'storytelling-inspiration',
    subCategorySlug: 'art-museums',
    viewCount: 850
  },
  {
    id: 6,
    slug: '5-tips-flower-photos',
    title: { en: '5 Tips for Stunning Flower Photos', vi: '5 Mẹo Chụp Ảnh Hoa Tuyệt Đẹp', fr: '5 conseils pour de superbes photos de fleurs', zh: '5个拍摄惊艳花卉照片的技巧', ja: '素晴らしい花の写真を撮るための5つのヒント' },
    author: { en: 'Le FloralTravel Team', vi: 'Đội ngũ Le FloralTravel', fr: 'L\'équipe Le FloralTravel', zh: 'Le FloralTravel 团队', ja: 'Le FloralTravelチーム' },
    date: { en: 'July 05, 2024', vi: '05 tháng 7, 2024', fr: '05 juillet 2024', zh: '2024年7月5日', ja: '2024年7月5日' },
    excerpt: { en: 'Capture floral beauty like a pro with just your phone. We share our top tips for lighting, composition, and editing.', vi: 'Ghi lại vẻ đẹp của hoa như một chuyên gia chỉ bằng điện thoại của bạn. Chúng tôi chia sẻ các mẹo hàng đầu về ánh sáng, bố cục và chỉnh sửa.', fr: 'Capturez la beauté florale comme un pro avec juste votre téléphone. Nous partageons nos meilleurs conseils pour l\'éclairage, la composition et la retouche.', zh: '仅用手机就能像专业人士一样捕捉花卉之美。我们分享关于光线、构图和编辑的顶级技巧。', ja: 'スマートフォンだけでプロのように花の美しさを捉えましょう。照明、構図、編集のトップヒントを共有します。' },
    image: 'https://images.unsplash.com/photo-1533793915034-7f198c69b2f6?q=80&w=2070&auto=format&fit=crop',
    content: { en: 'Full content here...', vi: 'Nội dung đầy đủ ở đây...', fr: 'Contenu complet ici...', zh: '完整内容在此...', ja: '全文はこちら...' },
    categoryId: 'skills-lifestyle',
    viewCount: 2800
  },
  {
    id: 7,
    slug: 'our-commitment-to-planet',
    title: { en: 'Our Commitment to the Planet', vi: 'Cam kết của chúng tôi với Hành tinh', fr: 'Notre engagement envers la planète', zh: '我们对地球的承诺', ja: '地球への私たちのコミットメント' },
    author: { en: 'Le FloralTravel Team', vi: 'Đội ngũ Le FloralTravel', fr: 'L\'équipe Le FloralTravel', zh: 'Le FloralTravel 团队', ja: 'Le FloralTravelチーム' },
    date: { en: 'June 25, 2024', vi: '25 tháng 6, 2024', fr: '25 juin 2024', zh: '2024年6月25日', ja: '2024年6月25日' },
    excerpt: { en: 'How we practice conscious sustainability on every journey to protect the beautiful places we visit.', vi: 'Cách chúng tôi thực hành du lịch bền vững có ý thức trên mỗi hành trình để bảo vệ những nơi tươi đẹp chúng tôi ghé thăm.', fr: 'Comment nous pratiquons la durabilité consciente à chaque voyage pour protéger les magnifiques endroits que nous visitons.', zh: '我们在每次旅程中如何实践有意识的可持续性，以保护我们访问的美丽地方。', ja: '私たちが訪れる美しい場所を保護するために、すべての旅で意識的な持続可能性をどのように実践しているか。' },
    image: 'https://images.unsplash.com/photo-1621452264903-eff723f595c2?q=80&w=1964&auto=format&fit=crop',
    content: { en: 'Full content here...', vi: 'Nội dung đầy đủ ở đây...', fr: 'Contenu complet ici...', zh: '完整内容在此...', ja: '全文はこちら...' },
    categoryId: 'about-le-floraltravel',
    viewCount: 600
  },
  {
    id: 8,
    slug: 'wildflowers-swiss-alps',
    title: { en: 'Wildflowers of the Swiss Alps', vi: 'Hoa dại của dãy Alps Thụy Sĩ', fr: 'Fleurs sauvages des Alpes suisses', zh: '瑞士阿尔卑斯山的野花', ja: 'スイスアルプスの野草' },
    author: { en: 'Elena Ricci', vi: 'Elena Ricci', fr: 'Elena Ricci', zh: '埃琳娜·里奇', ja: 'エレナ・リッチ' },
    date: { en: 'June 20, 2024', vi: '20 tháng 6, 2024', fr: '20 juin 2024', zh: '2024年6月20日', ja: '2024年6月20日' },
    excerpt: { en: 'A trekker\'s guide to the vibrant blooms of the high meadows, from edelweiss to alpine roses.', vi: 'Hướng dẫn của người đi bộ về những bông hoa rực rỡ của đồng cỏ cao, từ hoa nhung tuyết đến hoa hồng núi.', fr: 'Un guide du randonneur sur les fleurs vibrantes des hautes prairies, de l\'edelweiss aux roses des Alpes.', zh: '徒步旅行者指南，介绍从雪绒花到高山玫瑰的高山草甸上充满活力的花朵。', ja: 'エーデルワイスからアルペンローゼまで、高地の牧草地で咲き誇る活気ある花々のトレッカー向けガイド。' },
    image: 'https://images.unsplash.com/photo-1559441221-831b04a9e557?q=80&w=2070&auto=format&fit=crop',
    content: { en: 'Full content here...', vi: 'Nội dung đầy đủ ở đây...', fr: 'Contenu complet ici...', zh: '完整内容在此...', ja: '全文はこちら...' },
    categoryId: 'destination-guides',
    subCategorySlug: 'floral-destinations',
    viewCount: 980
  },
  {
    id: 9,
    slug: 'morocco-rose-valley',
    title: { en: 'Journey Through Morocco\'s Rose Valley', vi: 'Hành trình qua Thung lũng hoa hồng Ma-rốc', fr: 'Voyage à travers la Vallée des Roses du Maroc', zh: '摩洛哥玫瑰谷之旅', ja: 'モロッコのバラの谷を巡る旅' },
    author: { en: 'Sofia Chen', vi: 'Sofia Chen', fr: 'Sofia Chen', zh: '索菲亚·陈', ja: 'ソフィア・チェン' },
    date: { en: 'June 12, 2024', vi: '12 tháng 6, 2024', fr: '12 juin 2024', zh: '2024年6月12日', ja: '2024年6月12日' },
    excerpt: { en: 'Discovering the fragrant heart of the Atlas Mountains during the annual rose harvest festival.', vi: 'Khám phá trái tim thơm ngát của dãy núi Atlas trong lễ hội thu hoạch hoa hồng hàng năm.', fr: 'Découvrir le cœur parfumé des montagnes de l\'Atlas lors du festival annuel de la récolte des roses.', zh: '在一年一度的玫瑰丰收节期间，探索阿特拉斯山脉芬芳的心脏。', ja: '毎年恒例のバラの収穫祭の期間中、アトラス山脈の香りの中心を発見する。' },
    image: 'https://images.unsplash.com/photo-1559181528-575b5b48e3a5?q=80&w=2070&auto=format&fit=crop',
    content: { en: 'Full content here...', vi: 'Nội dung đầy đủ ở đây...', fr: 'Contenu complet ici...', zh: '完整内容在此...', ja: '全文はこちら...' },
    categoryId: 'destination-guides',
    subCategorySlug: 'culinary-floral-journeys',
    viewCount: 1100
  },
  {
    id: 10,
    slug: 'art-of-travel-journal',
    title: { en: 'The Art of the Travel Journal', vi: 'Nghệ thuật của Nhật ký Du lịch', fr: 'L\'art du carnet de voyage', zh: '旅行日记的艺术', ja: '旅行日誌の芸術' },
    author: { en: 'Le FloralTravel Team', vi: 'Đội ngũ Le FloralTravel', fr: 'L\'équipe Le FloralTravel', zh: 'Le FloralTravel 团队', ja: 'Le FloralTravelチーム' },
    date: { en: 'June 01, 2024', vi: '01 tháng 6, 2024', fr: '01 juin 2024', zh: '2024年6月1日', ja: '2024年6月1日' },
    excerpt: { en: 'How to document your adventures in a more meaningful way, creating a keepsake to treasure forever.', vi: 'Cách ghi lại những chuyến phiêu lưu của bạn một cách ý nghĩa hơn, tạo ra một vật kỷ niệm để trân trọng mãi mãi.', fr: 'Comment documenter vos aventures de manière plus significative, en créant un souvenir à chérir pour toujours.', zh: '如何以更有意义的方式记录您的冒险，创造一个永远珍藏的纪念品。', ja: '冒険をより意味のある方法で記録し、永遠に大切にする記念品を作成する方法。' },
    image: 'https://images.unsplash.com/photo-1518624969982-304b46995168?q=80&w=2070&auto=format&fit=crop',
    content: { en: 'Full content here...', vi: 'Nội dung đầy đủ ở đây...', fr: 'Contenu complet ici...', zh: '完整内容在此...', ja: '全文はこちら...' },
    categoryId: 'skills-lifestyle',
    viewCount: 720
  },
  {
    id: 11,
    slug: 'meet-our-guides',
    title: { en: 'Meet Our Legendary Guides', vi: 'Gặp gỡ những Hướng dẫn viên Huyền thoại của chúng tôi', fr: 'Rencontrez nos guides légendaires', zh: '认识我们的传奇向导', ja: '伝説のガイドたちに会う' },
    author: { en: 'Le FloralTravel Team', vi: 'Đội ngũ Le FloralTravel', fr: 'L\'équipe Le FloralTravel', zh: 'Le FloralTravel 团队', ja: 'Le FloralTravelチーム' },
    date: { en: 'May 20, 2024', vi: '20 tháng 5, 2024', fr: '20 mai 2024', zh: '2024年5月20日', ja: '2024年5月20日' },
    excerpt: { en: 'The storytellers who bring our destinations to life. Learn about the passionate experts behind our journeys.', vi: 'Những người kể chuyện làm cho các điểm đến của chúng tôi trở nên sống động. Tìm hiểu về các chuyên gia đầy nhiệt huyết đằng sau các hành trình của chúng tôi.', fr: 'Les conteurs qui donnent vie à nos destinations. Découvrez les experts passionnés derrière nos voyages.', zh: '让我们的目的地栩栩如生的故事讲述者。了解我们旅程背后充满激情的专家。', ja: '私たちの目的地に命を吹き込むストーリーテラー。私たちの旅の背後にいる情熱的な専門家について学びましょう。' },
    image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop',
    content: { en: 'Full content here...', vi: 'Nội dung đầy đủ ở đây...', fr: 'Contenu complet ici...', zh: '完整内容在此...', ja: '全文はこちら...' },
    categoryId: 'about-le-floraltravel',
    viewCount: 450
  },
  {
    id: 12,
    slug: 'netherlands-tulip-journey-keukenhof',
    title: { vi: 'Hành Trình Hà Lan Mùa Tulip: Lạc Giữa Biển Hoa Keukenhof & Những Ngôi Làng Cổ Tích', en: 'A Dutch Tulip Journey: Lost in the Sea of Flowers at Keukenhof & Fairytale Villages', fr: 'Un voyage des tulipes hollandaises : Perdu dans la mer de fleurs de Keukenhof et les villages de conte de fées', zh: '荷兰郁金香之旅：迷失在库肯霍夫花海与童话村庄', ja: 'オランダチューリップの旅：キューケンホフの花の海と童話の村で迷子になる' },
    author: { en: 'Le FloralTravel Team', vi: 'Đội ngũ Le FloralTravel', fr: 'L\'équipe Le FloralTravel', zh: 'Le FloralTravel 团队', ja: 'Le FloralTravelチーム' },
    date: { en: 'April 15, 2024', vi: '15 tháng 4, 2024', fr: '15 avril 2024', zh: '2024年4月15日', ja: '2024年4月15日' },
    excerpt: { vi: 'Hướng dẫn chi tiết thời điểm vàng để đến Keukenhof, cách di chuyển, vé, và gợi ý các hoạt động ngoài lề như đạp xe giữa các cánh đồng hoa, ghé thăm làng Zaanse Schans.', en: 'A detailed guide on the golden time to visit Keukenhof, transportation, tickets, and suggestions for side activities like cycling through flower fields and visiting Zaanse Schans village.', fr: 'Un guide détaillé sur le meilleur moment pour visiter Keukenhof, les transports, les billets et des suggestions d\'activités annexes comme le vélo à travers les champs de fleurs et la visite du village de Zaanse Schans.', zh: '关于参观库肯霍夫的最佳时间、交通、门票的详细指南，以及骑行穿越花田和参观赞瑟斯汉斯村等周边活动的建议。', ja: 'キューケンホフを訪れる絶好の時期、交通手段、チケットに関する詳細なガイド、そして花畑をサイクリングしたり、ザーンセスカンス村を訪れたりするなどのサイドアクティビティの提案。' },
    image: 'https://images.unsplash.com/photo-1554968393-3e72b89315a7?q=80&w=2070&auto=format&fit=crop',
    content: { en: 'Full content here...', vi: 'Nội dung đầy đủ ở đây...', fr: 'Contenu complet ici...', zh: '完整内容在此...', ja: '全文はこちら...' },
    categoryId: 'destination-guides',
    subCategorySlug: 'seasonal-bloom-calendars',
    viewCount: 3100
  },
  {
    id: 13,
    slug: 'provence-france-beyond-lavender-fields',
    title: { vi: 'Provence, Pháp: Hơn Cả Một Cánh Đồng Lavender', en: 'Provence, France: More Than Just a Lavender Field', fr: 'Provence, France : Plus qu\'un simple champ de lavande', zh: '法国普罗旺斯：不仅仅是薰衣草田', ja: 'フランス、プロヴァンス：ラベンダー畑だけじゃない' },
    author: { en: 'Amélie Dubois', vi: 'Amélie Dubois', fr: 'Amélie Dubois', zh: '艾米莉·杜波依斯', ja: 'アメリ・デュボワ' },
    date: { en: 'May 02, 2024', vi: '02 tháng 5, 2024', fr: '02 mai 2024', zh: '2024年5月2日', ja: '2024年5月2日' },
    excerpt: { vi: 'Khám phá cung đường lavender Valensole, nhưng đồng thời gợi ý các trải nghiệm khác như tham quan xưởng chưng cất tinh dầu, thưởng thức ẩm thực với hoa oải hương, và khám phá những ngôi làng đẹp nhất vùng.', en: 'Explore the Valensole lavender route, while also suggesting other experiences like visiting an essential oil distillery, enjoying lavender-infused cuisine, and discovering the most beautiful villages in the region.', fr: 'Explorez la route de la lavande de Valensole, tout en suggérant d\'autres expériences comme la visite d\'une distillerie d\'huile essentielle, la dégustation de cuisine à la lavande et la découverte des plus beaux villages de la région.', zh: '探索瓦朗索尔薰衣草之路，同时推荐其他体验，如参观精油酿酒厂、品尝薰衣草风味美食以及发现该地区最美丽的村庄。', ja: 'ヴァランソル高原のラベンダー街道を探索し、エッセンシャルオイルの蒸留所を訪れたり、ラベンダー風味の料理を楽しんだり、この地域で最も美しい村を発見したりするなどの他の体験も提案します。' },
    image: 'https://images.unsplash.com/photo-1597800344410-91143c6b2428?q=80&w=2070&auto=format&fit=crop',
    content: { en: 'Full content here...', vi: 'Nội dung đầy đủ ở đây...', fr: 'Contenu complet ici...', zh: '完整内容在此...', ja: '全文はこちら...' },
    categoryId: 'destination-guides',
    subCategorySlug: 'signature-city-guides',
    viewCount: 2950
  },
  {
    id: 14,
    slug: 'language-of-flowers-travel-destinations',
    title: { vi: 'Ngôn Ngữ Của Các Loài Hoa: Chọn Điểm Đến Du Lịch Theo Thông Điệp Bạn Muốn Gửi Gắm', en: 'The Language of Flowers: Choosing a Travel Destination Based on the Message You Want to Convey', fr: 'Le langage des fleurs : choisir une destination de voyage en fonction du message que vous souhaitez transmettre', zh: '花语：根据您想传达的信息选择旅行目的地', ja: '花言葉：伝えたいメッセージに基づいて旅行先を選ぶ' },
    author: { en: 'Flora Evergreen', vi: 'Flora Evergreen', fr: 'Flora Evergreen', zh: '弗洛拉·埃弗格林', ja: 'フローラ・エバーグリーン' },
    date: { en: 'April 20, 2024', vi: '20 tháng 4, 2024', fr: '20 avril 2024', zh: '2024年4月20日', ja: '2024年4月20日' },
    excerpt: { vi: 'Một bài viết sáng tạo, kết nối ý nghĩa của các loài hoa (hoa hồng - tình yêu, lavender - sự thư giãn) với các điểm đến tương ứng. Giúp khách hàng chọn tour dựa trên cảm xúc và mong muốn cá nhân.', en: 'A creative article connecting the meaning of flowers (rose - love, lavender - relaxation) with corresponding destinations. Helps customers choose tours based on emotions and personal desires.', fr: 'Un article créatif reliant la signification des fleurs (rose - amour, lavande - relaxation) aux destinations correspondantes. Aide les clients à choisir des circuits en fonction de leurs émotions et de leurs désirs personnels.', zh: '一篇富有创意的文章，将花朵的含义（玫瑰-爱情，薰衣草-放松）与相应的目的地联系起来。帮助客户根据情感和个人愿望选择旅行。', ja: '花の意味（バラ - 愛、ラベンダー - リラクゼーション）と対応する目的地を結びつける創造的な記事。お客様が感情や個人的な願望に基づいてツアーを選択するのに役立ちます。' },
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1974&auto=format&fit=crop',
    content: { en: 'Full content here...', vi: 'Nội dung đầy đủ ở đây...', fr: 'Contenu complet ici...', zh: '完整内容在此...', ja: '全文はこちら...' },
    categoryId: 'storytelling-inspiration',
    subCategorySlug: 'flowers-in-life-ritual',
    viewCount: 1800
  },
  {
    id: 15,
    slug: 'flowers-in-painting-monet-giverny-orangerie',
    title: { vi: 'Khi Hoa Nở Trong Hội Họa: Theo Chân Monet Từ Vườn Nhà Giverny Đến Bảo Tàng Orangerie', en: 'When Flowers Bloom in Paintings: Following Monet from His Giverny Garden to the Orangerie Museum', fr: 'Quand les fleurs s\'épanouissent dans la peinture : sur les traces de Monet de son jardin de Giverny au musée de l\'Orangerie', zh: '当花朵在画中绽放：跟随莫奈从他的吉维尼花园到橘园美术馆', ja: '絵画の中で花が咲くとき：モネを追ってジヴェルニーの庭からオランジュリー美術館へ' },
    author: { en: 'Artful Traveler', vi: 'Artful Traveler', fr: 'Artful Traveler', zh: '艺术旅行者', ja: 'アートフル・トラベラー' },
    date: { en: 'April 25, 2024', vi: '25 tháng 4, 2024', fr: '25 avril 2024', zh: '2024年4月25日', ja: '2024年4月25日' },
    excerpt: { vi: 'Kể câu chuyện về tình yêu hoa của danh họa Monet, hành trình xây dựng khu vườn Giverny và cách nó trở thành cảm hứng bất tận. Liên kết với tour du lịch Pháp, nhấn mạnh yếu tố nghệ thuật và thẩm mỹ.', en: 'Telling the story of Monet\'s love for flowers, the journey of building the Giverny garden, and how it became an endless source of inspiration. Linked to tours in France, emphasizing art and aesthetics.', fr: 'Raconter l\'histoire de l\'amour de Monet pour les fleurs, le parcours de la construction du jardin de Giverny et comment il est devenu une source d\'inspiration inépuisable. Lié aux circuits en France, mettant l\'accent sur l\'art et l\'esthétique.', zh: '讲述莫奈对花的热爱、建造吉维尼花园的历程，以及它如何成为无穷灵感的源泉。与法国之旅相关联，强调艺术和美学。', ja: 'モネの花への愛、ジヴェルニーの庭を築く旅、そしてそれがどのようにして尽きることのないインスピレーションの源となったかの物語を語ります。フランスのツアーと連携し、芸術と美学を強調します。' },
    image: 'https://images.unsplash.com/photo-1622392072979-8134b22c36b8?q=80&w=2070&auto=format&fit=crop',
    content: { en: 'Full content here...', vi: 'Nội dung đầy đủ ở đây...', fr: 'Contenu complet ici...', zh: '完整内容在此...', ja: '全文はこちら...' },
    categoryId: 'storytelling-inspiration',
    subCategorySlug: 'art-museums',
    viewCount: 1950
  },
  {
    id: 16,
    slug: 'muse-in-the-garden-flower-photography-guide',
    title: { vi: 'Bí Quyết Chụp Ảnh \'Nàng Thơ\' Giữa Vườn Hoa: Hướng Dẫn Từ A-Z', en: 'Tips for \'Muse\' Photography in a Flower Garden: An A-Z Guide', fr: 'Conseils pour la photographie de \'muse\' dans un jardin de fleurs : un guide de A à Z', zh: '在花园中拍摄“缪斯”照片的技巧：从A到Z的指南', ja: 'フラワーガーデンでの「ミューズ」撮影のヒント：A-Zガイド' },
    author: { en: 'Chloe Shutter', vi: 'Chloe Shutter', fr: 'Chloe Shutter', zh: '克洛伊·快门', ja: 'クロエ・シャッター' },
    date: { en: 'May 10, 2024', vi: '10 tháng 5, 2024', fr: '10 mai 2024', zh: '2024年5月10日', ja: '2024年5月10日' },
    excerpt: { vi: 'Hướng dẫn về ánh sáng, góc chụp, cách tạo dáng tự nhiên, và chỉnh sửa ảnh tone màu trong trẻo, lãng mạn. Có thể mời một nhiếp ảnh gia hợp tác viết bài.', en: 'A guide to lighting, angles, natural posing, and editing photos with a clear, romantic tone. Could feature a collaboration with a photographer.', fr: 'Un guide sur l\'éclairage, les angles, la pose naturelle et la retouche de photos avec un ton clair et romantique. Pourrait inclure une collaboration avec un photographe.', zh: '关于光线、角度、自然姿势以及编辑清晰浪漫色调照片的指南。可以与摄影师合作。', ja: '照明、アングル、自然なポージング、そしてクリアでロマンチックなトーンの写真編集に関するガイド。写真家とのコラボレーションも特集する可能性があります。' },
    image: 'https://images.unsplash.com/photo-1507146153580-69a196d2ba22?q=80&w=2076&auto=format&fit=crop',
    content: { en: 'Full content here...', vi: 'Nội dung đầy đủ ở đây...', fr: 'Contenu complet ici...', zh: '完整内容在此...', ja: '全文はこちら...' },
    categoryId: 'skills-lifestyle',
    viewCount: 2400
  },
  {
    id: 17,
    slug: 'what-to-wear-for-flower-photoshoot',
    title: { vi: 'Mặc Gì Để Chụp Ảnh Cùng Hoa? Gợi Ý Phối Đồ Tinh Tế', en: 'What to Wear for a Photoshoot with Flowers? Elegant Outfit Ideas', fr: 'Que porter pour une séance photo avec des fleurs ? Idées de tenues élégantes', zh: '与花合影穿什么？优雅着装建议', ja: '花との写真撮影で何を着る？エレガントな服装のアイデア' },
    author: { en: 'Le FloralTravel Style', vi: 'Phong cách Le FloralTravel', fr: 'Style Le FloralTravel', zh: 'Le FloralTravel 风格', ja: 'Le FloralTravelスタイル' },
    date: { en: 'May 15, 2024', vi: '15 tháng 5, 2024', fr: '15 mai 2024', zh: '2024年5月15日', ja: '2024年5月15日' },
    excerpt: { vi: 'Gợi ý các set trang phục (váy maxi, đồ vải linen, màu sắc pastel...) phù hợp với từng bối cảnh vườn hoa (lavender, anh đào, hướng dương...).', en: 'Outfit suggestions (maxi dresses, linen clothes, pastel colors...) suitable for different flower garden settings (lavender, cherry blossom, sunflower...).', fr: 'Suggestions de tenues (robes longues, vêtements en lin, couleurs pastel...) adaptées à différents décors de jardins de fleurs (lavande, cerisier, tournesol...).', zh: '适合不同花园场景（薰衣草、樱花、向日葵...）的着装建议（长裙、亚麻服装、柔和色调...）。', ja: 'さまざまなフラワーガーデンの設定（ラベンダー、桜、ひまわり...）に適した服装の提案（マキシドレス、リネン服、パステルカラー...）。' },
    image: 'https://images.unsplash.com/photo-1525537538398-a3f2b185367b?q=80&w=1974&auto=format&fit=crop',
    content: { en: 'Full content here...', vi: 'Nội dung đầy đủ ở đây...', fr: 'Contenu complet ici...', zh: '完整内容在此...', ja: '全文はこちら...' },
    categoryId: 'skills-lifestyle',
    viewCount: 3500
  },
  {
    id: 18,
    slug: 'le-floraltravel-philosophy-journey-to-beauty',
    title: { vi: 'Triết Lý Của Le FloralTravel: Du Lịch Không Chỉ Là Di Chuyển, Đó Là Hành Trình Tìm Về Vẻ Đẹp', en: 'The Le FloralTravel Philosophy: Travel Is Not Just Movement, It\'s a Journey to Beauty', fr: 'La philosophie de Le FloralTravel : le voyage n\'est pas un simple déplacement, c\'est un voyage vers la beauté', zh: 'Le FloralTravel 哲学：旅行不只是移动，更是追寻美的旅程', ja: 'Le FloralTravelの哲学：旅は単なる移動ではなく、美への旅' },
    author: { en: 'Le FloralTravel Team', vi: 'Đội ngũ Le FloralTravel', fr: 'L\'équipe Le FloralTravel', zh: 'Le FloralTravel 团队', ja: 'Le FloralTravelチーム' },
    date: { en: 'March 01, 2024', vi: '01 tháng 3, 2024', fr: '01 mars 2024', zh: '2024年3月1日', ja: '2024年3月1日' },
    excerpt: { vi: 'Bài viết nền tảng, giải thích rõ ràng tầm nhìn, sứ mệnh và những giá trị mà thương hiệu theo đuổi. Đây là bài viết để "ghim" ở đầu trang blog.', en: 'A foundational article clearly explaining the brand\'s vision, mission, and values. This is an article to "pin" at the top of the blog.', fr: 'Un article fondamental expliquant clairement la vision, la mission et les valeurs de la marque. C\'est un article à "épingler" en haut du blog.', zh: '一篇基础性文章，清晰解释品牌的愿景、使命和价值观。这是一篇适合置顶在博客顶部的文章。', ja: 'ブランドのビジョン、ミッション、価値観を明確に説明する基礎的な記事。これはブログのトップに「ピン留め」する記事です。' },
    image: 'https://images.unsplash.com/photo-1598495612261-9c3a04e57443?q=80&w=2070&auto=format&fit=crop',
    content: { en: 'Full content here...', vi: 'Nội dung đầy đủ ở đây...', fr: 'Contenu complet ici...', zh: '完整内容在此...', ja: '全文はこちら...' },
    categoryId: 'about-le-floraltravel',
    viewCount: 4200
  },
  {
    id: 19,
    slug: 'behind-the-scenes-designing-a-flower-tour',
    title: { vi: 'Behind The Scene: Le FloralTravel Thiết Kế Một Tour Du Lịch Mùa Hoa Như Thế Nào?', en: 'Behind The Scenes: How Le FloralTravel Designs a Flower Season Tour', fr: 'Dans les coulisses : comment Le FloralTravel conçoit un circuit de la saison des fleurs', zh: '幕后：Le FloralTravel 如何设计花季之旅', ja: '舞台裏：Le FloralTravelはどのように花の季節のツアーをデザインするのか' },
    author: { en: 'Le FloralTravel Team', vi: 'Đội ngũ Le FloralTravel', fr: 'L\'équipe Le FloralTravel', zh: 'Le FloralTravel 团队', ja: 'Le FloralTravelチーム' },
    date: { en: 'March 10, 2024', vi: '10 tháng 3, 2024', fr: '10 mars 2024', zh: '2024年3月10日', ja: '2024年3月10日' },
    excerpt: { vi: 'Cho khách hàng thấy quy trình làm việc: từ nghiên cứu điểm đến, chọn lọc đối tác (khách sạn, nhà hàng), thiết kế trải nghiệm độc quyền cho đến việc đảm bảo tính bền vững.', en: 'Showing customers the workflow: from destination research, partner selection (hotels, restaurants), designing exclusive experiences, to ensuring sustainability.', fr: 'Montrer aux clients le processus de travail : de la recherche de destinations à la sélection de partenaires (hôtels, restaurants), en passant par la conception d\'expériences exclusives et la garantie de la durabilité.', zh: '向客户展示工作流程：从目的地研究、合作伙伴选择（酒店、餐厅）、设计独家体验到确保可持续性。', ja: 'お客様にワークフローを紹介：目的地の調査、パートナーの選定（ホテル、レストラン）、独占的な体験のデザインから、持続可能性の確保まで。' },
    image: 'https://images.unsplash.com/photo-1542037104-924839975173?q=80&w=1974&auto=format&fit=crop',
    content: { en: 'Full content here...', vi: 'Nội dung đầy đủ ở đây...', fr: 'Contenu complet ici...', zh: '完整内容在此...', ja: '全文はこちら...' },
    categoryId: 'about-le-floraltravel',
    viewCount: 1150
  },
  {
    id: 20,
    slug: 'fifth-taste-kyoto-dashi',
    title: { en: 'The Fifth Taste of Kyoto: A Journey Through Dashi and Impermanence', vi: 'Hương Vị Thứ Năm của Kyoto: Hành Trình Qua Dashi và sự Vô Thường', fr: 'Le Cinquième Goût de Kyoto : Un Voyage à Travers le Dashi et l\'Impermanence', zh: '京都的第五味：一次穿越高汤与无常的旅程', ja: '京都の第五の味：出汁と無常を巡る旅' },
    author: { en: 'Rin Okumura', vi: 'Rin Okumura', fr: 'Rin Okumura', zh: '奥村凛', ja: '奥村凛' },
    date: { en: 'August 01, 2024', vi: '01 tháng 8, 2024', fr: '01 août 2024', zh: '2024年8月1日', ja: '2024年8月1日' },
    excerpt: { en: 'A reflective journey to find the perfect bowl of dashi, connecting the concept of umami to the Japanese philosophy of mono no aware.', vi: 'Một hành trình suy tưởng để tìm ra bát dashi hoàn hảo, kết nối khái niệm umami với triết lý mono no aware của Nhật Bản.', fr: 'Un voyage réflexif à la recherche du bol de dashi parfait, reliant le concept d\'umami à la philosophie japonaise du mono no aware.', zh: '一次寻找完美高汤的反思之旅，将“鲜味”的概念与日本“物哀”的哲学联系起来。', ja: '完璧な一杯の出汁を見つけるための思索的な旅。うま味の概念を日本の「もののあはれ」の哲学と結びつけます。' },
    image: 'https://images.unsplash.com/photo-1598213329433-2a62e03513ab?q=80&w=2070&auto=format&fit=crop',
    content: { 
        en: 'The concept of Umami (旨味), often translated as "pleasant savory taste," is the elusive fifth taste that defines much of Japanese cuisine. But in Kyoto, it feels like more than just a taste; it\'s a philosophy. Our journey begins in the Nishiki Market, a symphony of sights and smells, in search of the perfect dashi—the foundational broth that is the purest expression of umami.\n\n[MAP_PIN: Nishiki Market, Kyoto]\n\n### The Soul of Dashi\nDashi is deceptively simple, often made from just kombu (kelp) and katsuobushi (dried, fermented, and smoked skipjack tuna). Yet, its depth is profound. We spoke with Chef Hisato Nakahigashi of Miyamaso, who explained the art.\n\n[AUDIO_PLAYER: Chef Nakahigashi explains the process of shaving katsuobushi]\n\n> "Umami is the taste of connection," he said, "the connection between the sea and the land, between the ingredient and the person who eats it."\n\nThis pursuit of pure flavor connects deeply with *mono no aware* (物の哀れ), the Japanese concept of a gentle sadness or pathos for the transience of things. Like the fleeting cherry blossoms, the perfect bowl of dashi is a momentary perfection, a beautiful experience that is all the more precious because it cannot last.\n\nThis journey for taste is also a path to mindfulness. It teaches us to appreciate the subtle, the simple, and the ephemeral.',
        vi: '(Nội dung tiếng Việt...)', fr: '(Contenu en français...)', zh: '(中文内容...)', ja: '(日本語の内容...)'
    },
    categoryId: 'storytelling-inspiration',
    subCategorySlug: 'umami-cultural-memory',
    viewCount: 1340
  },
  {
    id: 21,
    slug: 'marigolds-dia-de-los-muertos',
    title: { en: 'Marigolds and Remembrance: A Journey Through Mexico\'s Día de los Muertos', vi: 'Cúc Vạn Thọ và Tưởng Nhớ: Hành Trình qua Ngày của người chết ở Mexico', fr: 'Œillets d\'Inde et Souvenir : Un Voyage à Travers le Día de los Muertos au Mexique', zh: '万寿菊与纪念：墨西哥亡灵节之旅', ja: 'マリーゴールドと追憶：メキシコの死者の日を巡る旅' },
    author: { en: 'Isabella Cruz', vi: 'Isabella Cruz', fr: 'Isabella Cruz', zh: '伊莎贝拉·克鲁兹', ja: 'イザベラ・クルス' },
    date: { en: 'August 05, 2024', vi: '05 tháng 8, 2024', fr: '05 août 2024', zh: '2024年8月5日', ja: '2024年8月5日' },
    excerpt: { en: 'A respectful and vibrant first-person account of participating in Day of the Dead preparations in Oaxaca, focusing on the spiritual significance of the cempasúchil (marigold).', vi: 'Một tường thuật ngôi thứ nhất đầy tôn trọng và sống động về việc tham gia chuẩn bị cho Ngày của người chết ở Oaxaca, tập trung vào ý nghĩa tâm linh của cúc vạn thọ (cempasúchil).', fr: 'Un récit à la première personne respectueux et vibrant de la participation aux préparatifs du Jour des Morts à Oaxaca, axé sur la signification spirituelle du cempasúchil (œillet d\'Inde).', zh: '一篇充满尊重和活力的第一人称记述，讲述了在瓦哈卡参与亡灵节准备活动，重点关注“cempasúchil”（万寿菊）的精神意义。', ja: 'オアハカでの死者の日の準備に参加した、敬意に満ちた鮮やかな一人称の記述。センパスチル（マリーゴールド）の精神的な重要性に焦点を当てています。' },
    image: 'https://images.unsplash.com/photo-1604213410393-8e4387b5a88c?q=80&w=2070&auto=format&fit=crop',
    content: {
        en: 'The scent of cempasúchil—the Mexican marigold—is the scent of Día de los Muertos. Its pungent, earthy aroma is believed to guide the spirits of the deceased back to the world of the living. In Oaxaca, this is not a time of mourning, but a vibrant celebration of life and memory.\n\n### Building the Ofrenda\nThe heart of the celebration is the *ofrenda*, or altar, built in homes to welcome spirits. It\'s a beautiful tapestry of offerings: photos of the departed, their favorite foods and drinks, sugar skulls, and, of course, arches and paths of brilliant orange marigolds.\n\n> "The ofrenda is not for us," explains Doña Rosa, a local artisan, "it is for them. It shows them they are not forgotten. The flowers are the bridge."\n\n[COMMUNITY_GALLERY: Share a photo of your own remembrance altar.]\n\nParticipating in the creation of an ofrenda is a deeply moving experience. It is a story told not with words, but with objects, scents, and colors—a physical manifestation of love that transcends death.\n\n[POLL: What is the most important element of remembrance for you?]',
        vi: '(Nội dung tiếng Việt...)', fr: '(Contenu en français...)', zh: '(中文内容...)', ja: '(日本語の内容...)'
    },
    categoryId: 'storytelling-inspiration',
    subCategorySlug: 'flowers-in-life-ritual',
    viewCount: 1620
  },
  {
    id: 22,
    slug: 'rose-keepers-morocco-interview',
    title: { en: 'The Rose Keepers of Morocco: An Interview in the Atlas Mountains', vi: 'Những Người Giữ Hoa Hồng ở Morocco: Phỏng vấn tại Dãy núi Atlas', fr: 'Les Gardiens des Roses du Maroc : Une Interview dans les Montagnes de l\'Atlas', zh: '摩洛哥的玫瑰守护者：阿特拉斯山脉访谈', ja: 'モロッコのバラの守り手：アトラス山脈でのインタビュー' },
    author: { en: 'Le FloralTravel Team', vi: 'Đội ngũ Le FloralTravel', fr: 'L\'équipe Le FloralTravel', zh: 'Le FloralTravel 团队', ja: 'Le FloralTravelチーム' },
    date: { en: 'August 10, 2024', vi: '10 tháng 8, 2024', fr: '10 août 2024', zh: '2024年8月10日', ja: '2024年8月10日' },
    excerpt: { en: 'A conversation with a third-generation rosewater distiller about the annual harvest and the cultural memory held in the scent of roses.', vi: 'Một cuộc trò chuyện với một nhà chưng cất nước hoa hồng thế hệ thứ ba về vụ thu hoạch hàng năm và ký ức văn hóa được lưu giữ trong hương thơm của hoa hồng.', fr: 'Une conversation avec un distillateur d\'eau de rose de troisième génération sur la récolte annuelle et la mémoire culturelle contenue dans le parfum des roses.', zh: '与第三代玫瑰水蒸馏师的对话，谈论年度收获以及玫瑰香味中所蕴含的文化记忆。', ja: '三代目のローズウォーター蒸留家との、毎年の収穫とバラの香りに込められた文化的記憶についての対談。' },
    image: 'https://images.unsplash.com/photo-1541692348325-78c52c6a4615?q=80&w=1965&auto=format&fit=crop',
    content: {
        en: 'Deep in the Dadès Valley, known as the Valley of Roses, we sat down with Ibrahim, a man whose family has been distilling the fragrant Damask rose into precious rosewater for three generations.\n\n**Le FloralTravel:** "What does the rose harvest mean to this community?"\n\n**Ibrahim:** "It is everything. It is our economy, of course, but it is also our identity. The scent of the rose is the scent of our home, of our history."\n\n[AUDIO_SNIPPET: The sound of Ibrahim speaking in his native Tamazight, with the wind in the background.]\n\nHe speaks of the challenges—climate change affecting the blooms, the younger generation moving to cities. Yet, there is a profound sense of hope and resilience.\n\n> "To care for the roses is to care for our ancestors\' memory. As long as the roses bloom, our story continues."\n\n[DOWNLOAD: Guide to Ethically Purchasing Rose Products]',
        vi: '(Nội dung tiếng Việt...)', fr: '(Contenu en français...)', zh: '(中文内容...)', ja: '(日本語の内容...)'
    },
    categoryId: 'storytelling-inspiration',
    subCategorySlug: 'local-community-voices',
    viewCount: 1150
  },
  {
    id: 23,
    slug: 'costa-rica-eco-route',
    title: { en: 'Costa Rica\'s Cloud Forests: An Eco-Sustainable Route', vi: 'Rừng Mây Costa Rica: Cung Đường Bền Vững Sinh Thái', fr: 'Forêts de nuages du Costa Rica : une route éco-durable', zh: '哥斯达黎加云雾森林：一条生态可持续路线', ja: 'コスタリカの雲霧林：エコサステナブルなルート' },
    author: { en: 'Le FloralTravel Team', vi: 'Đội ngũ Le FloralTravel', fr: 'L\'équipe Le FloralTravel', zh: 'Le FloralTravel 团队', ja: 'Le FloralTravelチーム' },
    date: { en: 'August 12, 2024', vi: '12 tháng 8, 2024', fr: '12 août 2024', zh: '2024年8月12日', ja: '2024年8月12日' },
    excerpt: { en: 'Journey through Monteverde and beyond, focusing on community-owned lodges, wildlife conservation, and low-impact travel.', vi: 'Hành trình qua Monteverde và xa hơn, tập trung vào các nhà nghỉ do cộng đồng sở hữu, bảo tồn động vật hoang dã và du lịch ít tác động.', fr: 'Voyage à travers Monteverde et au-delà, en se concentrant sur les lodges communautaires, la conservation de la faune et les voyages à faible impact.', zh: '穿越蒙特维德及更远的地方，重点关注社区拥有的小屋、野生动物保护和低影响旅行。', ja: 'モンテベルデとその先を旅し、コミュニティ所有のロッジ、野生生物の保護、そして影響の少ない旅行に焦点を当てます。' },
    image: 'https://images.unsplash.com/photo-1528183429752-a97d0bfd0802?q=80&w=2070&auto=format&fit=crop',
    content: { en: '(Full content here...)', vi: '(Nội dung đầy đủ ở đây...)', fr: '(Contenu complet ici...)', zh: '(完整内容在此...)', ja: '(全文はこちら...)' },
    categoryId: 'destination-guides',
    subCategorySlug: 'eco-sustainable-routes',
    viewCount: 780
  },
  {
    id: 24,
    slug: 'sapa-heritage-landscape',
    title: { en: 'Sapa\'s Rice Terraces: A Heritage Landscape', vi: 'Ruộng Bậc Thang Sapa: Một Di Sản Cảnh Quan', fr: 'Rizières en terrasses de Sapa : un paysage patrimonial', zh: '沙巴的梯田：一处遗产景观', ja: 'サパの棚田：遺産景観' },
    author: { en: 'Le FloralTravel Team', vi: 'Đội ngũ Le FloralTravel', fr: 'L\'équipe Le FloralTravel', zh: 'Le FloralTravel 团队', ja: 'Le FloralTravelチーム' },
    date: { en: 'August 15, 2024', vi: '15 tháng 8, 2024', fr: '15 août 2024', zh: '2024年8月15日', ja: '2024年8月15日' },
    excerpt: { en: 'Exploring the breathtaking, centuries-old rice terraces of Sapa, Vietnam—a testament to the harmonious relationship between humans and nature.', vi: 'Khám phá những thửa ruộng bậc thang hàng thế kỷ, đẹp đến nao lòng ở Sapa, Việt Nam—một minh chứng cho mối quan hệ hài hòa giữa con người và thiên nhiên.', fr: 'Explorer les rizières en terrasses séculaires et à couper le souffle de Sapa, au Vietnam - un témoignage de la relation harmonieuse entre l\'homme et la nature.', zh: '探索越南沙巴令人惊叹的、有数百年历史的梯田——这是人与自然和谐关系的证明。', ja: 'ベトナムのサパにある息をのむような、何世紀にもわたる棚田を探索します。これは人間と自然の調和のとれた関係の証です。' },
    image: 'https://images.unsplash.com/photo-1547823307-5586591a58a2?q=80&w=2070&auto=format&fit=crop',
    content: { en: '(Full content here...)', vi: '(Nội dung đầy đủ ở đây...)', fr: '(Contenu complet ici...)', zh: '(完整内容在此...)', ja: '(全文はこちら...)' },
    categoryId: 'destination-guides',
    subCategorySlug: 'heritage-landscapes',
    viewCount: 1320
  }
];
