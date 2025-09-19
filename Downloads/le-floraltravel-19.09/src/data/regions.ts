
import type { LocalizedString } from './types';

export interface Region {
  id: number;
  title: LocalizedString;
  description: LocalizedString;
  imageGradient: string;
  slug: string;
}

export const regionsData: Region[] = [
  {
    id: 1,
    title: {
        en: 'Italy',
        vi: 'Ý',
        fr: 'Italie',
        zh: '意大利',
        ja: 'イタリア'
    },
    description: {
        en: 'Ancient ruins, Renaissance art, and coastlines that take your breath away.',
        vi: 'Những tàn tích cổ đại, nghệ thuật Phục hưng, và những đường bờ biển khiến bạn nghẹt thở.',
        fr: 'Ruines antiques, art de la Renaissance et côtes à couper le souffle.',
        zh: '古老的废墟，文艺复兴时期的艺术，以及令人叹为观止的海岸线。',
        ja: '古代遺跡、ルネッサンス美術、そして息をのむような海岸線。'
    },
    imageGradient: `url('https://i.pinimg.com/1200x/4f/81/98/4f8198931f75271b25635e0f5fa937b0.jpg')`,
    slug: 'italy'
  },
  {
    id: 2,
    title: {
        en: 'France',
        vi: 'Pháp',
        fr: 'France',
        zh: '法国',
        ja: 'フランス'
    },
    description: {
        en: 'From the romantic streets of Paris to the sun-drenched vineyards of Bordeaux.',
        vi: 'Từ những con đường lãng mạn của Paris đến những vườn nho ngập nắng của Bordeaux.',
        fr: 'Des rues romantiques de Paris aux vignobles ensoleillés de Bordeaux.',
        zh: '从巴黎的浪漫街道到波尔多阳光普照的葡萄园。',
        ja: 'パリのロマンチックな通りから、太陽が降り注ぐボルドーのブドウ畑まで。'
    },
    imageGradient: `url('https://i.pinimg.com/1200x/90/14/97/90149777d82f15d7e5cca7fce52f8d29.jpg')`,
    slug: 'france'
  },
  {
    id: 3,
    title: {
        en: 'Vietnam',
        vi: 'Việt Nam',
        fr: 'Vietnam',
        zh: '越南',
        ja: 'ベトナム'
    },
    description: {
        en: 'A land of staggering natural beauty, cultural complexities, and dynamic megacities.',
        vi: 'Một vùng đất có vẻ đẹp tự nhiên đáng kinh ngạc, sự phức tạp về văn hóa và các siêu đô thị năng động.',
        fr: 'Un pays d\'une beauté naturelle stupéfiante, de complexités culturelles et de mégapoles dynamiques.',
        zh: '一个拥有惊人自然美景、文化复杂性和充满活力的特大城市的国度。',
        ja: '驚異的な自然の美しさ、文化の複雑さ、そしてダイナミックな巨大都市の国。'
    },
    imageGradient: `url('https://i.pinimg.com/1200x/91/00/31/910031d393f6cab448822b68a5a9d8cb.jpg')`,
    slug: 'vietnam'
  },
  {
    id: 4,
    title: {
        en: 'Switzerland',
        vi: 'Thụy Sĩ',
        fr: 'Suisse',
        zh: '瑞士',
        ja: 'スイス'
    },
    description: {
        en: 'Soaring Alpine peaks, serene turquoise lakes, and flower-filled meadows.',
        vi: 'Những đỉnh núi An-pơ cao vút, những hồ nước ngọc lam thanh bình, và những đồng cỏ đầy hoa.',
        fr: 'Des sommets alpins majestueux, des lacs turquoise sereins et des prairies fleuries.',
        zh: '高耸的阿尔卑斯山峰，宁静的碧绿湖泊，以及鲜花盛开的草地。',
        ja: 'そびえ立つアルプスの山々、静かなターコイズブルーの湖、そして花でいっぱいの牧草地。'
    },
    imageGradient: `url('https://i.pinimg.com/736x/70/ae/d6/70aed62c89541299133d517e9251652c.jpg')`,
    slug: 'switzerland'
  },
  {
    id: 5,
    title: {
        en: 'Japan',
        vi: 'Nhật Bản',
        fr: 'Japon',
        zh: '日本',
        ja: '日本'
    },
    description: {
        en: 'A land where ancient traditions meet futuristic technology, famous for its serene gardens and vibrant seasons.',
        vi: 'Vùng đất nơi truyền thống cổ xưa gặp gỡ công nghệ tương lai, nổi tiếng với những khu vườn thanh bình và các mùa rực rỡ.',
        fr: 'Un pays où les traditions anciennes rencontrent la technologie futuriste, célèbre pour ses jardins sereins et ses saisons vibrantes.',
        zh: '一个古老传统与未来科技相遇的国度，以其宁静的园林和充满活力的季节而闻名。',
        ja: '古代の伝統が未来の技術と出会う国。静かな庭園と活気ある季節で有名です。'
    },
    imageGradient: `url('https://i.pinimg.com/1200x/07/75/87/077587a826ab541f60afa600bfc1a925.jpg')`,
    slug: 'japan'
  },
  {
    id: 6,
    title: {
        en: 'Morocco',
        vi: 'Ma-rốc',
        fr: 'Maroc',
        zh: '摩洛哥',
        ja: 'モロッコ'
    },
    description: {
        en: 'Vibrant markets, intricate architecture, and the timeless beauty of the Sahara desert.',
        vi: 'Những khu chợ sôi động, kiến trúc phức tạp, và vẻ đẹp vượt thời gian của sa mạc Sahara.',
        fr: 'Marchés animés, architecture complexe et la beauté intemporelle du désert du Sahara.',
        zh: '充满活力的市场、错综复杂的建筑以及撒哈拉沙漠永恒的美丽。',
        ja: '活気ある市場、複雑な建築、そしてサハラ砂漠の時代を超えた美しさ。'
    },
    imageGradient: `url('https://i.pinimg.com/1200x/4f/14/89/4f1489dbbf6edbe0c388a4d5092679b4.jpg')`,
    slug: 'morocco'
  },
];
