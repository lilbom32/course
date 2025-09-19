import type { LocalizedString } from './types';

export interface FloralEvent {
  id: string;
  title: LocalizedString;
  country: LocalizedString;
  location: LocalizedString;
  description: LocalizedString; // Short description for main page / SEO
  image: string;
  start: string; // YYYY-MM-DD
  end: string;   // YYYY-MM-DD
  color: string;
  lat: number;
  lon: number;
  relatedTourIds: string[];
  isMajor: boolean;
  // Rich content for modal
  experienceDescription: LocalizedString;
  signatureExperiences: LocalizedString[];
  tasteOfSeason: LocalizedString;
  insidersTip: LocalizedString;
}

export const floralCalendarData: FloralEvent[] = [
  {
    id: 'jp-sakura',
    title: { en: 'Cherry Blossoms', vi: 'Hoa Anh Đào', fr: 'Fleurs de Cerisier', zh: '樱花', ja: '桜' },
    country: { en: 'Japan', vi: 'Nhật Bản', fr: 'Japon', zh: '日本', ja: '日本' },
    location: { en: 'Kyoto, Tokyo, Osaka', vi: 'Kyoto, Tokyo, Osaka', fr: 'Kyoto, Tokyo, Osaka', zh: '京都, 东京, 大阪', ja: '京都、東京、大阪' },
    description: {
      en: 'Witness the breathtaking but fleeting beauty of cherry blossoms, a quintessential Japanese experience. The "sakura front" moves from south to north, offering various viewing times depending on the region.',
      vi: 'Chứng kiến vẻ đẹp ngoạn mục nhưng chóng tàn của hoa anh đào, một trải nghiệm tinh túy của Nhật Bản. "Mặt trận sakura" di chuyển từ nam ra bắc, mang đến nhiều thời điểm ngắm hoa khác nhau tùy theo khu vực.',
      fr: 'Assistez à la beauté à couper le souffle mais éphémère des cerisiers en fleurs, une expérience japonaise par excellence. Le "front des sakura" se déplace du sud vers le nord, offrant diverses périodes de floraison selon la région.',
      zh: '见证樱花那令人窒息却又短暂的美丽，这是一次典型的日本体验。“樱花前线”从南向北移动，根据地区不同提供不同的观赏时间。',
      ja: '息をのむほど美しいがはかない桜の美しさを目撃してください。これは典型的な日本の体験です。「桜前線」は南から北へと移動し、地域によってさまざまな鑑賞時期を提供します。'
    },
    image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=871&auto=format&fit=crop',
    start: '2025-03-20',
    end: '2025-04-10',
    color: '#F8C8DC', // Soft Pink
    lat: 35.0116,
    lon: 135.7681,
    relatedTourIds: ['jp-sakura-1'],
    isMajor: true,
    experienceDescription: {
        en: "It's a moment of collective quiet, a nationwide appreciation for the transient beauty of life. Strolling under the pale pink canopies is a meditative experience, connecting you to the Japanese philosophy of 'mono no aware'—a gentle awareness of the impermanence of things.",
        vi: "Đó là một khoảnh khắc của sự tĩnh lặng tập thể, một sự trân trọng trên toàn quốc đối với vẻ đẹp phù du của cuộc sống. Dạo bước dưới những vòm hoa hồng phớt là một trải nghiệm thiền định, kết nối bạn với triết lý 'mono no aware' của Nhật Bản—một sự nhận thức nhẹ nhàng về sự vô thường của vạn vật.",
        fr: "C'est un moment de quiétude collective, une appréciation nationale pour la beauté éphémère de la vie. Se promener sous les dais rose pâle est une expérience méditative, vous connectant à la philosophie japonaise du 'mono no aware' - une douce conscience de l'impermanence des choses.",
        zh: "这是一个集体静默的时刻，是全国范围内对生命短暂之美的欣赏。在淡粉色的华盖下漫步是一种冥想体验，将您与日本“物哀”的哲学联系起来——一种对事物无常的温和意识。",
        ja: 'それは集団的な静寂の瞬間であり、生命のはかない美しさに対する全国的な感謝の念です。淡いピンクの天蓋の下を散策することは瞑想的な体験であり、日本の「もののあはれ」という哲学、つまり物事の無常に対する穏やかな認識とあなたを結びつけます。'
    },
    signatureExperiences: [
        { en: "Participate in a 'hanami' (flower viewing) picnic under the cherry trees.", vi: "Tham gia một buổi dã ngoại 'hanami' (ngắm hoa) dưới những cây anh đào.", fr: "Participez à un pique-nique 'hanami' (observation des fleurs) sous les cerisiers.", zh: "在樱花树下参加一次“花见”（赏花）野餐。", ja: '桜の木の下で「花見」ピクニックに参加する。' },
        { en: "Enjoy a nighttime stroll to see the 'yozakura' (night sakura) illuminated by lanterns.", vi: "Tận hưởng một cuộc dạo chơi về đêm để ngắm 'yozakura' (anh đào đêm) được chiếu sáng bởi đèn lồng.", fr: "Profitez d'une promenade nocturne pour voir les 'yozakura' (sakura de nuit) illuminés par des lanternes.", zh: "享受夜间漫步，观赏灯笼照亮的“夜樱”。", ja: '夜の散策を楽しみ、灯籠に照らされた「夜桜」を見る。' },
        { en: "Visit a traditional temple, like Kiyomizu-dera in Kyoto, framed by blossoms.", vi: "Thăm một ngôi đền truyền thống, như Kiyomizu-dera ở Kyoto, được bao quanh bởi những bông hoa.", fr: "Visitez un temple traditionnel, comme Kiyomizu-dera à Kyoto, encadré par les fleurs.", zh: "参观一座传统的寺庙，如京都的清水寺，被樱花环绕。", ja: '京都の清水寺のような伝統的な寺院を訪れ、花に囲まれる。' }
    ],
    tasteOfSeason: {
        en: "Savor seasonal delights like Sakura Mochi (a sweet pink rice cake filled with red bean paste and wrapped in a pickled cherry leaf) and hanami dango.",
        vi: "Thưởng thức những món ngon theo mùa như Sakura Mochi (bánh gạo hồng ngọt nhân đậu đỏ và được bọc trong lá anh đào ngâm) và hanami dango.",
        fr: "Savourez des délices de saison comme le Sakura Mochi (un gâteau de riz rose sucré fourré à la pâte de haricots rouges et enveloppé dans une feuille de cerisier marinée) et le hanami dango.",
        zh: "品尝时令美食，如樱花麻糬（一种包裹在腌渍樱花叶中的甜粉色年糕，内填红豆沙）和花见团子。",
        ja: '桜餅（桜の葉で包まれた甘いピンクの餅）や花見団子などの季節の味覚を味わう。'
    },
    insidersTip: {
        en: 'For a less crowded experience in Kyoto, visit the Philosopher\'s Path early in the morning.',
        vi: 'Để có trải nghiệm ít đông đúc hơn ở Kyoto, hãy ghé thăm Con đường Triết gia vào sáng sớm.',
        fr: 'Pour une expérience moins bondée à Kyoto, visitez le Chemin du Philosophe tôt le matin.',
        zh: '要想在京都获得不那么拥挤的体验，请清晨参观哲学之道。',
        ja: '京都で混雑を避けるには、哲学の道を早朝に訪れるのがおすすめです。'
    }
  },
  {
    id: 'nl-tulips',
    title: { en: 'Tulip Season', vi: 'Mùa hoa Tulip', fr: 'Saison des Tulipes', zh: '郁金香季节', ja: 'チューリップの季節' },
    country: { en: 'Netherlands', vi: 'Hà Lan', fr: 'Pays-Bas', zh: '荷兰', ja: 'オランダ' },
    location: { en: 'Keukenhof & Lisse', vi: 'Keukenhof & Lisse', fr: 'Keukenhof & Lisse', zh: '库肯霍夫和利瑟', ja: 'キューケンホフ＆リッセ' },
    description: {
      en: 'Explore the world\'s most famous flower garden and the vibrant, endless fields of tulips in the Dutch countryside. It\'s a true kaleidoscope of color that has to be seen to be believed.',
      vi: 'Khám phá vườn hoa nổi tiếng nhất thế giới và những cánh đồng hoa tulip rực rỡ, bất tận ở vùng nông thôn Hà Lan. Đó là một kính vạn hoa màu sắc thực sự phải được nhìn thấy mới tin được.',
      fr: 'Explorez le plus célèbre jardin de fleurs du monde et les champs de tulipes infinis et vibrants de la campagne néerlandaise. C\'est un véritable kaléidoscope de couleurs à voir pour le croire.',
      zh: '探索世界上最著名的花园以及荷兰乡村充满活力、无边无际的郁金香花田。这是一个真正的色彩万花筒，亲眼所见才能相信。',
      ja: '世界で最も有名なフラワーガーデンと、オランダの田園地帯に広がる活気に満ちた無限のチューリップ畑を探索してください。それは信じられないほどの色の万華鏡です。'
    },
    image: 'https://i.pinimg.com/736x/07/73/ec/0773ec78f9dddfd7360d2f77f08268e0.jpg',
    start: '2025-04-10',
    end: '2025-05-10',
    color: '#F5A9A9', // Vibrant Coral
    lat: 52.272,
    lon: 4.547,
    relatedTourIds: [],
    isMajor: true,
     experienceDescription: {
        en: "The Dutch landscape transforms into a living canvas painted with geometric precision. It's a celebration of color and order, where millions of bulbs bloom in unison, creating a spectacle that feels both grand and meticulously designed.",
        vi: "Phong cảnh Hà Lan biến thành một bức tranh sống động được vẽ với độ chính xác hình học. Đó là một lễ kỷ niệm của màu sắc và trật tự, nơi hàng triệu củ hoa nở đồng loạt, tạo ra một cảnh tượng vừa hùng vĩ vừa được thiết kế tỉ mỉ.",
        fr: "Le paysage néerlandais se transforme en une toile vivante peinte avec une précision géométrique. C'est une célébration de la couleur et de l'ordre, où des millions de bulbes fleurissent à l'unisson, créant un spectacle à la fois grandiose et méticuleusement conçu.",
        zh: "荷兰的景观变成了一幅用几何精度绘制的活生生的画布。这是对色彩和秩序的庆祝，数百万个球茎齐声绽放，创造出既宏伟又精心设计的奇观。",
        ja: 'オランダの風景は、幾何学的な精度で描かれた生きたキャンバスに変わります。それは色と秩序の祭典であり、何百万もの球根が一斉に咲き誇り、壮大でありながら細心の注意を払って設計された光景を生み出します。'
    },
    signatureExperiences: [
        { en: "Wander through the artfully arranged displays at the world-renowned Keukenhof Gardens.", vi: "Dạo qua các khu trưng bày được sắp xếp nghệ thuật tại Vườn Keukenhof nổi tiếng thế giới.", fr: "Promenez-vous à travers les expositions artistiquement arrangées dans les jardins de Keukenhof de renommée mondiale.", zh: "漫步于世界闻名的库肯霍夫花园中精心布置的展览。", ja: '世界的に有名なキューケンホフ公園で、芸術的に配置されたディスプレイを散策する。' },
        { en: "Cycle or drive the 'Bollenstreek' (Bulb Region) route through endless fields of color.", vi: "Đạp xe hoặc lái xe trên tuyến đường 'Bollenstreek' (Vùng Củ) qua những cánh đồng màu sắc bất tận.", fr: "Parcourez à vélo ou en voiture la route du 'Bollenstreek' (région des bulbes) à travers des champs de couleurs infinis.", zh: "骑自行车或驾车穿越“球茎地区”（Bollenstreek）路线上无尽的色彩田野。", ja: '「ボーレンストリーク」（球根地帯）ルートを自転車または車で走り、無限の色の畑を通り抜ける。' },
        { en: "Visit a working tulip farm to learn about the history and cultivation of this iconic flower.", vi: "Thăm một trang trại hoa tulip đang hoạt động để tìm hiểu về lịch sử và việc trồng loại hoa biểu tượng này.", fr: "Visitez une ferme de tulipes en activité pour en apprendre davantage sur l'histoire et la culture de cette fleur emblématique.", zh: "参观一个仍在运营的郁金香农场，了解这种标志性花卉的历史和栽培。", ja: '現役のチューリップ農場を訪れ、この象徴的な花の歴史と栽培について学ぶ。' }
    ],
    tasteOfSeason: {
        en: "Enjoy a fresh stroopwafel from a local market stall—a warm, thin waffle filled with caramel syrup that's a perfect treat after a day of exploring.",
        vi: "Thưởng thức một chiếc stroopwafel tươi từ một quầy hàng ở chợ địa phương—một chiếc bánh waffle mỏng, ấm nóng chứa đầy si-rô caramel, là một món ăn hoàn hảo sau một ngày khám phá.",
        fr: "Dégustez une stroopwafel fraîche d'un étal de marché local - une gaufre fine et chaude fourrée au sirop de caramel, un régal parfait après une journée d'exploration.",
        zh: "在当地市场摊位上享用新鲜的荷式松饼——一种温暖、薄脆的华夫饼，内填焦糖浆，是探索一天后的完美款待。",
        ja: '地元の市場の屋台で新鮮なストロープワッフルをお楽しみください。探検の一日の後にぴったりの、温かくて薄いワッフルにキャラメルシロップが詰まっています。'
    },
    insidersTip: {
        en: 'Rent a bike in Lisse to explore the surrounding tulip fields at your own pace, away from the Keukenhof crowds.',
        vi: 'Thuê xe đạp ở Lisse để khám phá các cánh đồng hoa tulip xung quanh theo tốc độ của riêng bạn, tránh xa đám đông Keukenhof.',
        fr: 'Louez un vélo à Lisse pour explorer les champs de tulipes environnants à votre rythme, loin de la foule de Keukenhof.',
        zh: '在利瑟租一辆自行车，按照自己的节奏探索周围的郁金香花田，远离库肯霍フ的人群。',
        ja: 'リッセで自転車を借りて、キューケンホフの混雑を避け、自分のペースで周囲のチューリップ畑を探索しましょう。'
    }
  },
  {
    id: 'fr-lavender',
    title: { en: 'Lavender Fields', vi: 'Cánh đồng Oải hương', fr: 'Champs de Lavande', zh: '薰衣草田', ja: 'ラベンダー畑' },
    country: { en: 'France', vi: 'Pháp', fr: 'France', zh: '法国', ja: 'フランス' },
    location: { en: 'Provence', vi: 'Provence', fr: 'Provence', zh: '普罗旺斯', ja: 'プロヴァンス' },
    description: {
      en: 'Immerse yourself in the fragrant purple seas of Provence. The air is thick with the scent of lavender, and the sound of buzzing bees creates a tranquil, unforgettable atmosphere.',
      vi: 'Đắm mình trong biển tím thơm ngát của Provence. Không khí đậm đặc mùi hoa oải hương, và tiếng ong vo ve tạo nên một bầu không khí yên tĩnh, khó quên.',
      fr: 'Plongez dans les mers violettes et parfumées de la Provence. L\'air est chargé du parfum de la lavande, et le bourdonnement des abeilles crée une atmosphère tranquille et inoubliable.',
      zh: '沉浸在普罗旺斯芬芳的紫色海洋中。空气中弥漫着薰衣草的香味，蜜蜂的嗡嗡声营造出一种宁静而难忘的氛围。',
      ja: 'プロヴァンスの香しい紫色の海に浸ってください。空気はラベンダーの香りで満ち、ミツバチの羽音が静かで忘れられない雰囲気を作り出します。'
    },
    image: 'https://i.pinimg.com/736x/f0/fb/3f/f0fb3f0bf7e48df4a0071e0de333772c.jpg',
    start: '2025-06-20',
    end: '2025-07-25',
    color: '#D1B4DE', // Lavender Purple
    lat: 43.9333,
    lon: 5.9167,
    relatedTourIds: ['fr-lavender-1'],
    isMajor: true,
     experienceDescription: {
        en: "This is a journey for the senses. The vibrant purple lines stretch to the horizon, the air is perfumed with calming lavender, and the gentle hum of bees is the only soundtrack. It's a living impressionist painting and a profound experience of tranquility.",
        vi: "Đây là một hành trình cho các giác quan. Những đường kẻ màu tím rực rỡ kéo dài đến tận chân trời, không khí thơm ngát mùi hoa oải hương nhẹ nhàng, và tiếng ong vo ve nhẹ nhàng là bản nhạc duy nhất. Đó là một bức tranh trường phái ấn tượng sống động và là một trải nghiệm sâu sắc về sự yên bình.",
        fr: "C'est un voyage pour les sens. Les lignes violettes vibrantes s'étendent jusqu'à l'horizon, l'air est parfumé de lavande apaisante, et le doux bourdonnement des abeilles est la seule bande sonore. C'est un tableau impressionniste vivant et une profonde expérience de tranquillité.",
        zh: "这是一场感官之旅。充满活力的紫色线条延伸至地平线，空气中弥漫着令人平静的薰衣草香味，而蜜蜂的轻柔嗡嗡声是唯一的配乐。这是一幅活生生的印象派画作，也是一次深刻的宁静体验。",
        ja: 'これは五感の旅です。鮮やかな紫色の線が地平線まで続き、空気は心を落ち着かせるラベンダーの香りで満たされ、ミツバチの優しい羽音だけがサウンドトラックです。それは生きている印象派の絵画であり、深い静けさの体験です。'
    },
    signatureExperiences: [
        { en: "Walk through the iconic lavender fields on the Valensole Plateau.", vi: "Dạo bước qua những cánh đồng hoa oải hương mang tính biểu tượng trên Cao nguyên Valensole.", fr: "Promenez-vous dans les emblématiques champs de lavande du Plateau de Valensole.", zh: "漫步于瓦朗索尔高原上标志性的薰衣草田。", ja: 'ヴァランソル高原の象徴的なラベンダー畑を歩く。' },
        { en: "Visit a local distillery to see how lavender essential oil is made.", vi: "Thăm một nhà máy chưng cất địa phương để xem cách làm tinh dầu hoa oải hương.", fr: "Visitez une distillerie locale pour voir comment est fabriquée l'huile essentielle de lavande.", zh: "参观当地的酿酒厂，了解薰衣草精油的制作过程。", ja: '地元の蒸留所を訪れ、ラベンダーエッセンシャルオイルの製造方法を見学する。' },
        { en: "Explore charming hilltop villages like Gordes and Roussillon, surrounded by the purple haze.", vi: "Khám phá những ngôi làng trên đỉnh đồi quyến rũ như Gordes và Roussillon, được bao quanh bởi làn sương tím.", fr: "Explorez de charmants villages perchés comme Gordes et Roussillon, entourés par la brume violette.", zh: "探索像戈尔德和鲁西永这样迷人的山顶村庄，周围环绕着紫色的薄雾。", ja: 'ゴルドやルシヨンのような魅力的な丘の上の村を探索し、紫色の霞に囲まれる。' }
    ],
    tasteOfSeason: {
        en: "Indulge in lavender-infused honey or a scoop of artisanal lavender ice cream, a refreshing and unique local treat.",
        vi: "Thưởng thức mật ong tẩm hoa oải hương hoặc một muỗng kem hoa oải hương thủ công, một món ăn địa phương độc đáo và sảng khoái.",
        fr: "Laissez-vous tenter par du miel infusé à la lavande ou une boule de glace artisanale à la lavande, une gâterie locale rafraîchissante et unique.",
        zh: "尽情享用薰衣草味的蜂蜜或一勺手工薰衣草冰淇淋，这是一种清爽而独特的当地美食。",
        ja: 'ラベンダー風味の蜂蜜や職人技のラベンダーアイスクリームを堪能してください。さわやかでユニークな地元の味です。'
    },
    insidersTip: {
        en: 'For the best photos in Provence, aim for the golden hours - just after sunrise or before sunset.',
        vi: 'Để có những bức ảnh đẹp nhất ở Provence, hãy nhắm đến những giờ vàng - ngay sau khi mặt trời mọc hoặc trước khi mặt trời lặn.',
        fr: 'Pour les meilleures photos en Provence, visez les heures dorées - juste après le lever du soleil ou avant le coucher du soleil.',
        zh: '要在普罗旺斯拍出最好的照片，请瞄准黄金时段——日出后或日落前。',
        ja: 'プロヴァンスで最高の写真を撮るには、ゴールデンアワー、つまり日の出直後または日没前を狙いましょう。'
    }
  },
   {
    id: 'ma-roses',
    title: { en: 'Morocco Rose Festival', vi: 'Lễ hội Hoa hồng Morocco', fr: 'Festival des Roses au Maroc', zh: '摩洛哥玫瑰节', ja: 'モロッコのバラ祭り' },
    country: { en: 'Morocco', vi: 'Ma-rốc', fr: 'Maroc', zh: '摩洛哥', ja: 'モロッコ' },
    location: { en: 'Kalaat M\'Gouna', vi: 'Kalaat M\'Gouna', fr: 'Kalaat M\'Gouna', zh: '卡拉特·姆古纳', ja: 'カラアト・ムグナ' },
    description: {
      en: 'The "Valley of Roses" comes alive with the fragrant harvest of Damask roses, culminating in a vibrant festival of music, dance, and rose products.',
      vi: '"Thung lũng Hoa hồng" trở nên sống động với mùa thu hoạch hoa hồng Damask thơm ngát, kết thúc bằng một lễ hội rộn ràng với âm nhạc, vũ điệu và các sản phẩm từ hoa hồng.',
      fr: 'La "Vallée des Roses" s\'anime avec la récolte parfumée des roses de Damas, culminant dans un festival vibrant de musique, de danse et de produits à base de rose.',
      zh: '“玫瑰谷”随着芬芳的大马士革玫瑰的收获而活跃起来，最终形成一个充满音乐、舞蹈和玫瑰产品的充满活力的节日。',
      ja: '「バラの谷」はダマスクローズの香しい収穫で活気づき、音楽、ダンス、ローズ製品の活気に満ちた祭りで最高潮に達します。'
    },
    image: 'https://i.pinimg.com/736x/7d/61/78/7d61785a47386b1c421333235efd2091.jpg',
    start: '2025-05-05',
    end: '2025-05-20',
    color: '#FFB6C1', // Light Pink
    lat: 31.378,
    lon: -6.142,
    relatedTourIds: ['ma-gardens-1'],
    isMajor: false,
    experienceDescription: {
        en: "A vibrant cultural celebration set against the stunning backdrop of the Atlas Mountains. The air is filled with the intoxicating scent of millions of Damask roses, as local Berber communities share their traditions through music, dance, and a lively market.",
        vi: "Một lễ kỷ niệm văn hóa sôi động diễn ra trên nền cảnh quan tuyệt đẹp của Dãy núi Atlas. Không khí tràn ngập hương thơm say đắm của hàng triệu bông hồng Damask, khi các cộng đồng Berber địa phương chia sẻ truyền thống của họ qua âm nhạc, vũ điệu và một khu chợ náo nhiệt.",
        fr: "Une célébration culturelle vibrante sur fond de paysages époustouflants des montagnes de l'Atlas. L'air est rempli du parfum enivrant de millions de roses de Damas, tandis que les communautés berbères locales partagent leurs traditions à travers la musique, la danse et un marché animé.",
        zh: "在阿特拉斯山脉壮丽的背景下举行的充满活力的文化庆典。空气中弥漫着数百万朵大马士革玫瑰令人陶醉的香味，当地的柏柏尔社区通过音乐、舞蹈和热闹的市场分享他们的传统。",
        ja: 'アトラス山脈の壮大な景色を背景にした活気ある文化の祭典。空気は何百万ものダマスクローズの酔わせる香りで満ちており、地元のベルベル人コミュニティが音楽、ダンス、活気ある市場を通じて伝統を分かち合います。'
    },
    signatureExperiences: [
        { en: "Witness the crowning of the Rose Queen during the festival's main event.", vi: "Chứng kiến lễ đăng quang của Nữ hoàng Hoa hồng trong sự kiện chính của lễ hội.", fr: "Assistez au couronnement de la Reine des Roses lors de l'événement principal du festival.", zh: "在节日的主要活动中见证玫瑰女王的加冕典礼。", ja: '祭りのメインイベントでローズクイーンの戴冠式を目撃する。' },
        { en: "Wander through the souk to purchase high-quality rosewater, oils, and cosmetics directly from producers.", vi: "Dạo qua khu chợ souk để mua nước hoa hồng, dầu và mỹ phẩm chất lượng cao trực tiếp từ nhà sản xuất.", fr: "Flânez dans le souk pour acheter de l'eau de rose, des huiles et des cosmétiques de haute qualité directement auprès des producteurs.", zh: "漫步于露天市场，直接从生产商那里购买高品质的玫瑰水、精油和化妆品。", ja: 'スークを散策し、生産者から直接高品質のローズウォーター、オイル、化粧品を購入する。' },
        { en: "Hike through the Valley of Roses to see the flower fields and traditional kasbahs.", vi: "Đi bộ qua Thung lũng Hoa hồng để ngắm những cánh đồng hoa và các kasbah truyền thống.", fr: "Randonnée à travers la Vallée des Roses pour voir les champs de fleurs et les kasbahs traditionnelles.", zh: "徒步穿越玫瑰谷，观赏花田和传统的古堡。", ja: 'バラの谷をハイキングして、花畑と伝統的なカスバを見る。' }
    ],
    tasteOfSeason: {
        en: "Try a traditional tagine, a slow-cooked stew, perhaps subtly flavored with rosewater, accompanied by fresh mint tea.",
        vi: "Hãy thử một món tagine truyền thống, một món hầm nấu chậm, có thể được nêm một chút hương vị tinh tế của nước hoa hồng, kèm theo trà bạc hà tươi.",
        fr: "Goûtez à un tajine traditionnel, un ragoût cuit lentement, peut-être subtilement parfumé à l'eau de rose, accompagné d'un thé à la menthe frais.",
        zh: "品尝传统的塔吉锅，这是一种慢炖的炖菜，可能带有淡淡的玫瑰水风味，再配上新鲜的薄荷茶。",
        ja: '伝統的なタジン、ゆっくりと煮込んだシチューを試してみてください。ローズウォーターでほのかに風味付けされ、新鮮なミントティーが添えられています。'
    },
    insidersTip: {
        en: 'Look for locally made rosewater and rose oil, which are of exceptional quality here.',
        vi: 'Hãy tìm nước hoa hồng và tinh dầu hoa hồng được sản xuất tại địa phương, chúng có chất lượng vượt trội ở đây.',
        fr: 'Recherchez l\'eau de rose et l\'huile de rose de fabrication locale, qui sont d\'une qualité exceptionnelle ici.',
        zh: '寻找当地制作的玫瑰水和玫瑰油，这里的品质非常出色。',
        ja: '地元で作られたローズウォーターとローズオイルを探してみてください。ここの品質は格別です。'
    }
  },
  {
    id: 'ch-wildflowers',
    title: { en: 'Alpine Wildflowers', vi: 'Hoa dại Alpine', fr: 'Fleurs Sauvages Alpines', zh: '高山野花', ja: 'アルプスの野花' },
    country: { en: 'Switzerland', vi: 'Thụy Sĩ', fr: 'Suisse', zh: '瑞士', ja: 'スイス' },
    location: { en: 'Swiss Alps', vi: 'Dãy Alps Thụy Sĩ', fr: 'Alpes Suisses', zh: '瑞士阿尔卑斯山', ja: 'スイスアルプス' },
    description: {
      en: 'High-altitude meadows burst into a carpet of colourful wildflowers, including gentians, edelweiss, and alpine roses. A hiker\'s dream come true.',
      vi: 'Những đồng cỏ trên cao bùng nổ thành một thảm hoa dại đầy màu sắc, bao gồm hoa long đởm, hoa nhung tuyết và hoa hồng alpine. Một giấc mơ của người đi bộ trở thành sự thật.',
      fr: 'Les prairies de haute altitude se transforment en un tapis de fleurs sauvages colorées, notamment des gentianes, des edelweiss et des roses des Alpes. Le rêve d\'un randonneur devenu réalité.',
      zh: '高海拔的草甸上绽放着五彩缤纷的野花地毯，包括龙胆草、雪绒花和高山玫瑰。徒步旅行者的梦想成真。',
      ja: '高地の牧草地は、リンドウ、エーデルワイス、アルペンローゼなど、色とりどりの野花が絨毯のように咲き誇ります。ハイカーの夢が叶う場所です。'
    },
    image: 'https://i.pinimg.com/1200x/96/42/a9/9642a9bf23915f75fbbf52314e6d40b0.jpg',
    start: '2025-07-01',
    end: '2025-08-31',
    color: '#ADD8E6', // Light Blue
    lat: 46.8182,
    lon: 8.2275,
    relatedTourIds: ['ch-wildflower-1'],
    isMajor: true,
    experienceDescription: {
        en: "It's a vibrant, yet serene spectacle. Against a backdrop of snow-capped peaks and turquoise lakes, the alpine meadows come alive with a resilient and colorful carpet of flowers. The crisp mountain air and the sound of cowbells complete this idyllic scene.",
        vi: "Đó là một cảnh tượng sôi động nhưng thanh bình. Trên nền những đỉnh núi phủ tuyết trắng và những hồ nước màu ngọc lam, các đồng cỏ trên núi cao trở nên sống động với một thảm hoa đầy màu sắc và kiên cường. Không khí núi trong lành và tiếng chuông bò hoàn thiện khung cảnh ειδυλλιακή này.",
        fr: "C'est un spectacle vibrant et pourtant serein. Sur fond de sommets enneigés et de lacs turquoise, les prairies alpines s'animent d'un tapis de fleurs résistant et coloré. L'air vif de la montagne et le son des cloches de vache complètent cette scène idyllique.",
        zh: "这是一个充满活力而又宁静的景象。在白雪皑皑的山峰和碧绿的湖泊的映衬下，高山草甸上开满了坚韧而多彩的花毯。清新的山间空气和牛铃声使这片田园诗般的景象更加完美。",
        ja: 'それは活気に満ちていながらも穏やかな光景です。雪を頂いた山頂とターコイズブルーの湖を背景に、アルプスの牧草地は弾力性のある色とりどりの花の絨毯で生き生きとします。さわやかな山の空気とカウベルの音が、この牧歌的な風景を完成させます。'
    },
    signatureExperiences: [
        { en: "Hike the trails around Grindelwald or Zermatt to find fields of edelweiss and gentian.", vi: "Đi bộ trên những con đường mòn quanh Grindelwald hoặc Zermatt để tìm những cánh đồng hoa nhung tuyết và long đởm.", fr: "Randonnez sur les sentiers autour de Grindelwald ou de Zermatt pour trouver des champs d'edelweiss et de gentianes.", zh: "在格林德瓦或采尔马特周围的小径上徒步，寻找雪绒花和龙胆草田。", ja: 'グリンデルワルトやツェルマット周辺のトレイルをハイキングして、エーデルワイスやリンドウの畑を見つける。' },
        { en: "Take a scenic train journey, like the Bernina Express, for panoramic views of the flowering landscapes.", vi: "Thực hiện một chuyến đi tàu ngắm cảnh, như Bernina Express, để có tầm nhìn toàn cảnh về những cảnh quan hoa lá.", fr: "Faites un voyage en train panoramique, comme le Bernina Express, pour des vues panoramiques sur les paysages fleuris.", zh: "乘坐风景优美的火车旅行，如伯尔尼纳快车，欣赏花卉景观的全景。", ja: 'ベルニナ急行のような景色の良い列車に乗り、花咲く風景のパノラマビューを楽しむ。' },
        { en: "Enjoy a fondue dinner at a mountain hut overlooking the meadows.", vi: "Thưởng thức bữa tối lẩu phô mai tại một túp lều trên núi nhìn ra những đồng cỏ.", fr: "Dégustez une fondue dans un refuge de montagne surplombant les prairies.", zh: "在俯瞰草甸的山间小屋享用火锅晚餐。", ja: '牧草地を見下ろす山小屋でフォンデュディナーを楽しむ。' }
    ],
    tasteOfSeason: {
        en: "Taste a slice of 'Bündner Nusstorte', a traditional sweet caramelised nut-filled pastry from the Graubünden region, perfect after a long hike.",
        vi: "Thưởng thức một miếng 'Bündner Nusstorte', một loại bánh ngọt truyền thống chứa đầy các loại hạt caramen từ vùng Graubünden, hoàn hảo sau một chuyến đi bộ dài.",
        fr: "Goûtez une tranche de 'Bündner Nusstorte', une pâtisserie traditionnelle sucrée fourrée aux noix caramélisées de la région des Grisons, parfaite après une longue randonnée.",
        zh: "品尝一片“Bündner Nusstorte”，这是一种来自格劳宾登地区的传统甜焦糖坚果馅饼，非常适合在长途徒步后享用。",
        ja: 'グラウビュンデン地方の伝統的な甘いキャラメルナッツ入りペストリー「ビュンドナー・ヌストルテ」を味わってください。長いハイキングの後にぴったりです。'
    },
    insidersTip: {
        en: 'The Schynige Platte Alpine Garden near Interlaken offers a fantastic, accessible way to see over 650 species of alpine plants.',
        vi: 'Vườn Alpine Schynige Platte gần Interlaken mang đến một cách tuyệt vời và dễ tiếp cận để xem hơn 650 loài thực vật alpine.',
        fr: 'Le jardin alpin de Schynige Platte près d\'Interlaken offre un moyen fantastique et accessible de voir plus de 650 espèces de plantes alpines.',
        zh: '因特拉肯附近的施尼格普拉特高山花园提供了一种极佳且便捷的方式来观赏超过650种高山植物。',
        ja: 'インターラーケン近くのシニゲプラッテ高山植物園では、650種以上の高山植物を素晴らしく、アクセスしやすい方法で見ることができます。'
    }
  },
   {
    id: 'it-sunflowers',
    title: { en: 'Tuscan Sunflowers', vi: 'Hoa Hướng dương Tuscany', fr: 'Tournesols de Toscane', zh: '托斯卡纳向日葵', ja: 'トスカーナのひまわり' },
    country: { en: 'Italy', vi: 'Ý', fr: 'Italie', zh: '意大利', ja: 'イタリア' },
    location: { en: 'Val d\'Orcia, Tuscany', vi: 'Val d\'Orcia, Tuscany', fr: 'Val d\'Orcia, Toscane', zh: '托斯卡纳，瓦尔德奥尔恰', ja: 'トスカーナ、ヴァル・ドルチャ' },
    description: {
      en: 'Rolling hills of Tuscany turn into a sea of gold as endless fields of sunflowers face the sun, creating an iconic and joyful landscape.',
      vi: 'Những ngọn đồi thoai thoải của Tuscany biến thành một biển vàng khi những cánh đồng hoa hướng dương bất tận hướng về phía mặt trời, tạo nên một cảnh quan mang tính biểu tượng và vui tươi.',
      fr: 'Les collines de la Toscane se transforment en une mer d\'or alors que des champs infinis de tournesols font face au soleil, créant un paysage emblématique et joyeux.',
      zh: '托斯卡纳连绵起伏的丘陵变成了一片金色的海洋，无尽的向日葵田面向太阳，营造出标志性而愉悦的景观。',
      ja: 'トスカーナのなだらかな丘は、無限のひまわり畑が太陽に向かって咲き誇り、象徴的で楽しい風景を作り出す黄金の海に変わります。'
    },
    image: 'https://i.pinimg.com/736x/42/72/d1/4272d1e5ff13ab56c2e13c4eaa1cdef0.jpg',
    start: '2025-07-01',
    end: '2025-07-31',
    color: '#FFD700', // Gold
    lat: 43.023,
    lon: 11.621,
    relatedTourIds: ['it-tuscany-1'],
    isMajor: false,
    experienceDescription: {
        en: "A vision of pure summer joy. The iconic rolling hills of Tuscany, dotted with cypress trees and stone farmhouses, become even more magical when blanketed in a sea of vibrant, smiling sunflowers all turning their faces to the sun.",
        vi: "Một viễn cảnh của niềm vui mùa hè thuần khiết. Những ngọn đồi thoai thoải mang tính biểu tượng của Tuscany, điểm xuyết những cây bách và những trang trại bằng đá, trở nên kỳ diệu hơn nữa khi được bao phủ bởi một biển hoa hướng dương rực rỡ, mỉm cười, tất cả đều quay mặt về phía mặt trời.",
        fr: "Une vision de pure joie estivale. Les emblématiques collines de la Toscane, parsemées de cyprès et de fermes en pierre, deviennent encore plus magiques lorsqu'elles sont recouvertes d'une mer de tournesols vibrants et souriants, tous tournant leur visage vers le soleil.",
        zh: "纯粹夏日欢乐的景象。托斯卡纳标志性的连绵起伏的丘陵，点缀着柏树和石头农舍，当被一片充满活力、面带微笑的向日葵覆盖时，变得更加神奇，它们都把脸转向太阳。",
        ja: '純粋な夏の喜びの光景。ヒノキの木と石造りの農家が点在するトスカーナの象徴的ななだらかな丘は、鮮やかで微笑むひまわりが太陽に顔を向ける海で覆われると、さらに魔法のようになります。'
    },
    signatureExperiences: [
        { en: "Drive the scenic roads of Val d'Orcia at sunrise to capture the golden light on the sunflower fields.", vi: "Lái xe trên những con đường ngắm cảnh của Val d'Orcia vào lúc bình minh để bắt trọn ánh sáng vàng trên những cánh đồng hoa hướng dương.", fr: "Conduisez sur les routes panoramiques du Val d'Orcia au lever du soleil pour capturer la lumière dorée sur les champs de tournesols.", zh: "日出时分，驱车行驶在风景如画的瓦尔德奥尔恰道路上，捕捉向日葵田上的金色光芒。", ja: '日の出時にヴァル・ドルチャの景色の良い道をドライブし、ひまわり畑の黄金の光を捉える。' },
        { en: "Enjoy a wine tasting at a local agriturismo with views over the sunflower-filled valleys.", vi: "Thưởng thức rượu vang tại một agriturismo địa phương với tầm nhìn ra các thung lũng đầy hoa hướng dương.", fr: "Profitez d'une dégustation de vin dans un agriturismo local avec vue sur les vallées remplies de tournesols.", zh: "在当地的农家乐品酒，欣赏向日葵盛开的山谷景色。", ja: 'ひまわりで満たされた谷を見渡せる地元の アグリツーリズモでワインテイスティングを楽しむ。' },
        { en: "Explore the Renaissance town of Pienza, a perfect base for discovering the surrounding countryside.", vi: "Khám phá thị trấn Pienza thời Phục hưng, một cơ sở hoàn hảo để khám phá vùng nông thôn xung quanh.", fr: "Explorez la ville Renaissance de Pienza, une base idéale pour découvrir la campagne environnante.", zh: "探索文艺复兴小镇皮恩扎，这是发现周边乡村的完美基地。", ja: 'ルネッサンスの町ピエンツァを探索し、周辺の田園地帯を発見するための完璧な拠点とする。' }
    ],
    tasteOfSeason: {
        en: "Try 'Pici' pasta, a thick, hand-rolled pasta typical of the region, served with a simple but delicious garlic and tomato sauce ('aglione').",
        vi: "Hãy thử mì 'Pici', một loại mì dày, được cán bằng tay đặc trưng của vùng, ăn kèm với sốt tỏi và cà chua đơn giản nhưng ngon miệng ('aglione').",
        fr: "Goûtez les pâtes 'Pici', des pâtes épaisses roulées à la main typiques de la région, servies avec une sauce simple mais délicieuse à l'ail et à la tomate ('aglione').",
        zh: "品尝“Pici”意面，这是一种该地区特有的粗手工意面，配以简单而美味的大蒜和番茄酱（“aglione”）。",
        ja: 'この地域特有の太い手打ちパスタ「ピチ」を、シンプルで美味しいニンニクとトマトのソース（「アッリオーネ」）で味わってみてください。'
    },
    insidersTip: {
        en: 'The fields are privately owned, so be respectful. The best views are often found along the smaller country roads (strade bianche).',
        vi: 'Những cánh đồng này là tài sản tư nhân, vì vậy hãy tôn trọng. Những góc nhìn đẹp nhất thường được tìm thấy dọc theo những con đường quê nhỏ hơn (strade bianche).',
        fr: 'Les champs sont une propriété privée, alors soyez respectueux. Les meilleures vues se trouvent souvent le long des petites routes de campagne (strade bianche).',
        zh: '这些田地是私有的，所以请保持尊重。最好的景色通常在较小的乡村道路（strade bianche）上找到。',
        ja: '畑は私有地ですので、敬意を払ってください。最高の景色は、しばしば小さな田舎道（ストラーデ・ビアンケ）沿いにあります。'
    }
  },
  {
    id: 'vn-buckwheat',
    title: { en: 'Buckwheat Flowers', vi: 'Hoa Tam Giác Mạch', fr: 'Fleurs de Sarrasin', zh: '荞麦花', ja: 'そばの花' },
    country: { en: 'Vietnam', vi: 'Việt Nam', fr: 'Vietnam', zh: '越南', ja: 'ベトナム' },
    location: { en: 'Hà Giang Province', vi: 'Tỉnh Hà Giang', fr: 'Province de Hà Giang', zh: '河江省', ja: 'ハザン省' },
    description: {
      en: 'Discover the rustic beauty of pink buckwheat flower fields covering the dramatic mountain landscapes of Northern Vietnam. This is a truly off-the-beaten-path floral experience.',
      vi: 'Khám phá vẻ đẹp mộc mạc của những cánh đồng hoa tam giác mạch màu hồng bao phủ cảnh quan núi non hùng vĩ của miền Bắc Việt Nam. Đây là một trải nghiệm hoa lá thực sự khác biệt.',
      fr: 'Découvrez la beauté rustique des champs de fleurs de sarrasin roses recouvrant les paysages montagneux spectaculaires du nord du Vietnam. C\'est une expérience florale vraiment hors des sentiers battus.',
      zh: '探索覆盖越南北部壮丽山景的粉红色荞麦花田的质朴之美。这是一次真正远离常规路线的花卉体验。',
      ja: 'ベトナム北部のドラマチックな山岳風景を覆うピンクのそばの花畑の素朴な美しさを発見してください。これは本当に人里離れた花の体験です。'
    },
    image: 'https://i.pinimg.com/1200x/72/db/da/72dbda95d78e3bb17a0f952e4ca085b2.jpg',
    start: '2025-10-15',
    end: '2025-11-20',
    color: '#E6BFB2', // Dusty Rose
    lat: 22.8167,
    lon: 105.0333,
    relatedTourIds: ['vn-bike-1', 'vn-sapa-1'],
    isMajor: false,
     experienceDescription: {
        en: "The rugged, majestic karst mountains of Hà Giang are softened by a delicate pink-and-white carpet of buckwheat flowers. It's a breathtaking contrast and a window into the lives of the local ethnic minorities who cultivate this vital crop.",
        vi: "Những ngọn núi karst hùng vĩ, hiểm trở của Hà Giang được làm mềm mại bởi một tấm thảm hoa tam giác mạch màu hồng và trắng tinh tế. Đó là một sự tương phản ngoạn mục và là một cánh cửa nhìn vào cuộc sống của các dân tộc thiểu số địa phương, những người trồng loại cây lương thực quan trọng này.",
        fr: "Les montagnes karstiques majestueuses et accidentées de Hà Giang sont adoucies par un délicat tapis de fleurs de sarrasin roses et blanches. C'est un contraste à couper le souffle et une fenêtre sur la vie des minorités ethniques locales qui cultivent cette culture vitale.",
        zh: "河江崎岖雄伟的喀斯特山脉被一层精致的粉白色荞麦花地毯软化了。这是一个令人惊叹的对比，也是了解当地少数民族种植这种重要作物生活的一扇窗口。",
        ja: 'ハザンの険しく雄大なカルスト山脈は、繊細なピンクと白のそばの花の絨毯で和らげられています。それは息をのむようなコントラストであり、この重要な作物を栽培する地元の少数民族の生活を垣間見る窓です。'
    },
    signatureExperiences: [
        { en: "Travel the legendary Hà Giang Loop for some of the most spectacular mountain scenery in Southeast Asia.", vi: "Đi trên cung đường huyền thoại Hà Giang Loop để chiêm ngưỡng một số cảnh quan núi non ngoạn mục nhất Đông Nam Á.", fr: "Parcourez la légendaire boucle de Hà Giang pour admirer certains des paysages de montagne les plus spectaculaires d'Asie du Sud-Est.", zh: "穿越传说中的河江环线，欣赏东南亚最壮观的山景。", ja: '伝説のハザンループを旅し、東南アジアで最も壮観な山の景色をいくつか見る。' },
        { en: "Visit the Lung Cu Flag Tower, Vietnam's northernmost point, with panoramic views of the flower fields.", vi: "Thăm Cột cờ Lũng Cú, điểm cực Bắc của Việt Nam, với tầm nhìn toàn cảnh ra những cánh đồng hoa.", fr: "Visitez la tour du drapeau de Lung Cu, le point le plus au nord du Vietnam, avec une vue panoramique sur les champs de fleurs.", zh: "参观越南最北端的龙 cú 旗塔，欣赏花田全景。", ja: 'ベトナム最北端のルンクフラッグタワーを訪れ、花畑のパノラマビューを楽しむ。' },
        { en: "Interact with local H'mong communities and learn about their culture and relationship with the buckwheat crop.", vi: "Giao lưu với các cộng đồng người H'mông địa phương và tìm hiểu về văn hóa và mối quan hệ của họ với cây tam giác mạch.", fr: "Interagissez avec les communautés H'mong locales et découvrez leur culture et leur relation avec la culture du sarrasin.", zh: "与当地的赫蒙族社区互动，了解他们的文化以及他们与荞麦作物的关系。", ja: '地元のモン族コミュニティと交流し、彼らの文化とそばの作物との関係について学ぶ。' }
    ],
    tasteOfSeason: {
        en: "Try 'Banh Tam Giac Mach', a small, slightly bitter pancake made from buckwheat flour, a local specialty you won't find anywhere else.",
        vi: "Hãy thử 'Bánh Tam Giác Mạch', một loại bánh kếp nhỏ, hơi đắng làm từ bột tam giác mạch, một đặc sản địa phương bạn sẽ không tìm thấy ở bất kỳ nơi nào khác.",
        fr: "Goûtez au 'Banh Tam Giac Mach', une petite crêpe légèrement amère à base de farine de sarrasin, une spécialité locale que vous ne trouverez nulle part ailleurs.",
        zh: "尝尝“Banh Tam Giac Mach”，这是一种用荞麦粉制成的小而微苦的薄饼，是您在别处找不到的当地特产。",
        ja: 'そば粉で作った小さくて少し苦いパンケーキ「バイン・タム・ジャック・マック」を試してみてください。他では見られない地元の名物です。'
    },
    insidersTip: {
        en: 'The Hà Giang Loop is best explored by motorbike, but be sure you are an experienced rider as the roads can be challenging.',
        vi: 'Cung đường Hà Giang được khám phá tốt nhất bằng xe máy, nhưng hãy chắc chắn bạn là một tay lái có kinh nghiệm vì đường đi có thể đầy thử thách.',
        fr: 'La boucle de Hà Giang se découvre de préférence à moto, mais assurez-vous d\'être un pilote expérimenté car les routes peuvent être difficiles.',
        zh: '河江环线最好骑摩托车探索，但请确保您是有经验的骑手，因为道路可能具有挑战性。',
        ja: 'ハザンループはバイクで探索するのが最適ですが、道が険しい場合があるため、経験豊富なライダーであることを確認してください。'
    }
  },
  {
    id: 'ca-poppies',
    title: { en: 'California Poppies', vi: 'Hoa Anh Túc California', fr: 'Pavots de Californie', zh: '加州罂粟', ja: 'カリフォルニアポピー' },
    country: { en: 'USA', vi: 'Hoa Kỳ', fr: 'États-Unis', zh: '美国', ja: 'アメリカ合衆国' },
    location: { en: 'Antelope Valley, California', vi: 'Thung lũng Antelope, California', fr: 'Antelope Valley, Californie', zh: '加利福尼亚州羚羊谷', ja: 'カリフォルニア州アンテロープバレー' },
    description: {
      en: 'Witness the "superbloom" as hills are blanketed in a vibrant orange carpet of California poppies. This natural phenomenon depends on rainfall and can vary in intensity each year.',
      vi: 'Chứng kiến "siêu nở hoa" khi các ngọn đồi được bao phủ bởi một tấm thảm màu cam rực rỡ của hoa anh túc California. Hiện tượng tự nhiên này phụ thuộc vào lượng mưa và có thể thay đổi cường độ mỗi năm.',
      fr: 'Assistez à la "superfloraison" alors que les collines sont recouvertes d\'un tapis orange vif de pavots de Californie. Ce phénomène naturel dépend des précipitations et peut varier en intensité chaque année.',
      zh: '见证“超级盛开”，山丘上覆盖着鲜艳的橙色加州罂粟地毯。这种自然现象取决于降雨量，每年的强度可能会有所不同。',
      ja: '丘がカリフォルニアポピーの鮮やかなオレンジ色の絨毯で覆われる「スーパーブルーム」を目撃してください。この自然現象は降雨量に依存し、毎年その激しさが異なることがあります。'
    },
    image: 'https://i.pinimg.com/736x/f2/68/20/f2682081fff06900782b63beec341030.jpg',
    start: '2025-03-15',
    end: '2025-05-01',
    color: '#FAD5A5', // Warm Orange
    lat: 34.7176,
    lon: -118.2917,
    relatedTourIds: [],
    isMajor: false,
    experienceDescription: {
        en: "When conditions are just right, the Mojave Desert grasslands explode into a sea of fiery orange. The sheer scale of the poppy 'superbloom' is a powerful and joyful reminder of nature's resilience and spectacular beauty.",
        vi: "Khi điều kiện thích hợp, các đồng cỏ sa mạc Mojave bùng nổ thành một biển màu cam rực lửa. Quy mô tuyệt đối của 'siêu nở hoa' anh túc là một lời nhắc nhở mạnh mẽ và vui tươi về sự kiên cường và vẻ đẹp ngoạn mục của thiên nhiên.",
        fr: "Lorsque les conditions sont idéales, les prairies du désert de Mojave explosent en une mer d'orange flamboyant. L'ampleur de la 'superfloraison' de coquelicots est un rappel puissant et joyeux de la résilience et de la beauté spectaculaire de la nature.",
        zh: "当条件恰到好处时，莫哈韦沙漠的草原会爆发成一片火热的橙色海洋。罂粟“超级盛开”的巨大规模有力而令人愉悦地提醒着我们大自然的韧性和壮观之美。",
        ja: '条件が整うと、モハベ砂漠の草原は燃えるようなオレンジ色の海に変わります。ポピーの「スーパーブルーム」の壮大なスケールは、自然の回復力と壮観な美しさを力強く、そして楽しく思い出させてくれます。'
    },
    signatureExperiences: [
        { en: "Walk the designated trails within the Antelope Valley California Poppy Reserve for the most intense concentrations of flowers.", vi: "Đi bộ trên những con đường mòn được chỉ định trong Khu bảo tồn Anh túc California Thung lũng Antelope để có mật độ hoa dày đặc nhất.", fr: "Parcourez les sentiers désignés de la réserve de pavots de Californie d'Antelope Valley pour les concentrations de fleurs les plus intenses.", zh: "沿着羚羊谷加州罂粟保护区内的指定小径行走，观赏最密集的罂粟花。", ja: 'アンテロープバレー・カリフォルニアポピー保護区内の指定されたトレイルを歩き、最も密集した花々を鑑賞する。' },
        { en: "Explore nearby Vasquez Rocks Natural Area Park, famous for its unique rock formations and as a Hollywood filming location.", vi: "Khám phá Công viên Tự nhiên Vasquez Rocks gần đó, nổi tiếng với các kiến tạo đá độc đáo và là địa điểm quay phim của Hollywood.", fr: "Explorez le parc naturel de Vasquez Rocks à proximité, célèbre pour ses formations rocheuses uniques et comme lieu de tournage hollywoodien.", zh: "探索附近的华斯克巨岩自然区公园，该公园以其独特的岩石构造和作为好莱坞拍摄地而闻名。", ja: '近くのヴァスケス・ロックス自然公園を探索する。ユニークな岩石層とハリウッドの撮影地として有名です。' }
    ],
    tasteOfSeason: {
        en: "After visiting the poppies, stop in the nearby town of Lancaster for a classic American diner experience.",
        vi: "Sau khi thăm những bông hoa anh túc, hãy dừng lại ở thị trấn Lancaster gần đó để có trải nghiệm quán ăn kiểu Mỹ cổ điển.",
        fr: "Après avoir visité les coquelicots, arrêtez-vous dans la ville voisine de Lancaster pour une expérience de diner américain classique.",
        zh: "参观完罂粟花后，在附近的兰开斯特镇停留，体验经典的美式餐馆。",
        ja: 'ポピーを見学した後、近くのランカスターの町に立ち寄り、クラシックなアメリカンダイナーの体験をする。'
    },
    insidersTip: {
        en: 'Check the Antelope Valley California Poppy Reserve website for bloom status updates before you go, as the peak can be unpredictable.',
        vi: 'Kiểm tra trang web của Khu bảo tồn Anh túc California Thung lũng Antelope để cập nhật tình trạng hoa nở trước khi bạn đi, vì thời kỳ cao điểm có thể không thể đoán trước.',
        fr: 'Consultez le site Web de la Réserve de pavots de Californie d\'Antelope Valley pour obtenir des mises à jour sur l\'état de la floraison avant de partir, car le pic peut être imprévisible.',
        zh: '在您前往之前，请查看羚羊谷加州罂粟保护区的网站以获取开花状态更新，因为高峰期可能无法预测。',
        ja: 'ピークは予測不可能なので、行く前にアンテロープバレー・カリフォルニアポピー保護区のウェブサイトで開花状況の最新情報を確認してください。'
    }
  },
   {
    id: 'in-valley',
    title: { en: 'Valley of Flowers', vi: 'Thung lũng Hoa', fr: 'Vallée des Fleurs', zh: '花谷', ja: '花の谷' },
    country: { en: 'India', vi: 'Ấn Độ', fr: 'Inde', zh: '印度', ja: 'インド' },
    location: { en: 'Uttarakhand, Himalayas', vi: 'Uttarakhand, Himalayas', fr: 'Uttarakhand, Himalaya', zh: '北阿坎德邦, 喜马拉雅山', ja: 'ウッタラーカンド州、ヒマラヤ' },
    description: {
      en: 'A high-altitude Himalayan valley and national park, carpeted with hundreds of different alpine flowers during the monsoon season. A trekker\'s paradise.',
      vi: 'Một thung lũng và công viên quốc gia Himalaya ở độ cao lớn, được trải thảm với hàng trăm loài hoa núi cao khác nhau trong mùa gió mùa. Một thiên đường của người đi bộ.',
      fr: 'Une vallée et un parc national de l\'Himalaya à haute altitude, tapissés de centaines de fleurs alpines différentes pendant la saison de la mousson. Un paradis pour les randonneurs.',
      zh: '一个高海拔的喜马拉雅山谷和国家公园，在季风季节铺满了数百种不同的高山花卉。徒步者的天堂。',
      ja: 'モンスーンの季節に何百もの異なる高山植物で覆われる高地のヒマラヤの谷と国立公園。トレッカーの楽園です。'
    },
    image: 'https://i.pinimg.com/736x/de/57/28/de572810d4225afc0a6e8cc94db987d4.jpg',
    start: '2025-07-10',
    end: '2025-09-15',
    color: '#A9D0F5', // Sky Blue
    lat: 30.726,
    lon: 79.605,
    relatedTourIds: [],
    isMajor: false,
    experienceDescription: {
        en: "A mythical place, a UNESCO World Heritage Site hidden deep in the Himalayas. This trek is a spiritual journey into a valley that seems painted by the gods, with over 500 species of wildflowers blooming in a vibrant, high-altitude meadow.",
        vi: "Một nơi thần thoại, một Di sản Thế giới được UNESCO công nhận ẩn sâu trong dãy Himalaya. Chuyến đi bộ này là một hành trình tâm linh vào một thung lũng dường như được các vị thần vẽ nên, với hơn 500 loài hoa dại nở rộ trên một đồng cỏ cao nguyên rực rỡ.",
        fr: "Un lieu mythique, un site du patrimoine mondial de l'UNESCO caché au cœur de l'Himalaya. Ce trek est un voyage spirituel dans une vallée qui semble peinte par les dieux, avec plus de 500 espèces de fleurs sauvages fleurissant dans une prairie de haute altitude vibrante.",
        zh: "一个神话般的地方，一个隐藏在喜马拉雅山深处的世界遗产地。这次徒步是一次精神之旅，进入一个似乎由众神绘制的山谷，有超过500种野花在充满活力的高海拔草甸上绽放。",
        ja: 'ヒマラヤの奥深くに隠された神話の場所、ユネスコ世界遺産。このトレッキングは、神々によって描かれたかのような谷へのスピリチュアルな旅であり、活気に満ちた高地の牧草地には500種以上の野花が咲き誇ります。'
    },
    signatureExperiences: [
        { en: "Trek through lush forests and alongside the Pushpawati River to reach the valley.", vi: "Đi bộ qua những khu rừng tươi tốt và dọc theo sông Pushpawati để đến thung lũng.", fr: "Randonnée à travers des forêts luxuriantes et le long de la rivière Pushpawati pour atteindre la vallée.", zh: "徒步穿越茂密的森林，沿着普什帕瓦蒂河到达山谷。", ja: '緑豊かな森を抜け、プシュパワティ川に沿ってトレッキングし、谷に到達する。' },
        { en: "Identify rare and beautiful flowers like the Brahma Kamal, Blue Poppy, and Cobra Lily.", vi: "Nhận dạng các loài hoa hiếm và đẹp như Brahma Kamal, Anh túc xanh và Huệ hổ mang.", fr: "Identifiez des fleurs rares et magnifiques comme le Brahma Kamal, le Pavot bleu et le Lys Cobra.", zh: "识别稀有而美丽的花卉，如梵天卡马尔、蓝罂粟和眼镜蛇百合。", ja: 'ブラフマ・カマル、ブルーポピー、コブラリリーのような珍しく美しい花を特定する。' },
        { en: "Visit the high-altitude Sikh pilgrimage site of Hemkund Sahib near the valley.", vi: "Thăm địa điểm hành hương của người Sikh ở độ cao lớn Hemkund Sahib gần thung lũng.", fr: "Visitez le site de pèlerinage sikh de haute altitude de Hemkund Sahib près de la vallée.", zh: "参观山谷附近的高海拔锡克教朝圣地赫姆昆德·萨希卜。", ja: '谷の近くにある高地のシーク教徒の巡礼地、ヘムクンド・サーヒブを訪れる。' }
    ],
    tasteOfSeason: {
        en: "Enjoy simple, nourishing North Indian food like dal, roti, and sabzi at the guesthouses in Ghangaria, the base camp for the trek.",
        vi: "Thưởng thức các món ăn Bắc Ấn đơn giản, bổ dưỡng như dal, roti và sabzi tại các nhà khách ở Ghangaria, trại cơ sở cho chuyến đi bộ.",
        fr: "Dégustez une cuisine simple et nourrissante du nord de l'Inde comme le dal, le roti et le sabzi dans les pensions de Ghangaria, le camp de base pour le trek.",
        zh: "在徒步旅行的大本营甘加里亚的宾馆里，享用简单而营养丰富的北印度食物，如豆汤、烤饼和蔬菜。",
        ja: 'トレッキングのベースキャンプであるガンガリアのゲストハウスで、ダル、ロティ、サブジなどのシンプルで栄養価の高い北インド料理を楽しむ。'
    },
    insidersTip: {
        en: 'The trek to the Valley of Flowers requires a permit and a moderate level of fitness. Acclimatize properly to the altitude.',
        vi: 'Chuyến đi đến Thung lũng Hoa đòi hỏi giấy phép và một mức độ thể lực vừa phải. Hãy thích nghi đúng cách với độ cao.',
        fr: 'Le trek vers la Vallée des Fleurs nécessite un permis et un niveau de forme physique modéré. Acclimatez-vous correctement à l\'altitude.',
        zh: '前往花谷的徒步旅行需要许可证和中等水平的体能。请适当适应海拔高度。',
        ja: '花の谷へのトレッキングには許可証と中程度の体力が必要です。高度に適切に順応してください。'
    }
  }
];