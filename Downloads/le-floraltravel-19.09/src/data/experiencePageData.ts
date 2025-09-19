
import type { LocalizedString } from './types';

export interface ExperiencePageData {
    slug: string;
    name: LocalizedString;
    description: LocalizedString;
    heroImage: string;
}

export const experiencePageData: ExperiencePageData[] = [
    {
        slug: 'biking',
        name: { en: 'Biking', vi: 'Đạp xe', fr: 'Vélo', zh: '骑行', ja: 'サイクリング' },
        description: {
            en: 'Feel the wind in your hair as you pedal through stunning landscapes, from rolling vineyards to dramatic coastlines. Our biking tours cater to all levels, offering a unique perspective on the world\'s most beautiful destinations.',
            vi: 'Cảm nhận làn gió trên tóc khi bạn đạp xe qua những cảnh quan tuyệt đẹp, từ những vườn nho thoai thoải đến những bờ biển ấn tượng. Các tour xe đạp của chúng tôi phục vụ mọi cấp độ, mang đến một góc nhìn độc đáo về những điểm đến đẹp nhất thế giới.',
            fr: 'Sentez le vent dans vos cheveux en pédalant à travers des paysages magnifiques, des vignobles vallonnés aux côtes spectaculaires. Nos circuits à vélo s\'adressent à tous les niveaux, offrant une perspective unique sur les plus belles destinations du monde.',
            zh: '当您骑行穿过壮丽的风景，从起伏的葡萄园到壮观的海岸线时，感受风拂过您的头发。我们的自行车之旅适合所有水平的骑行者，为您提供一个独特的视角来欣赏世界上最美丽的目的地。',
            ja: 'なだらかなブドウ畑からドラマチックな海岸線まで、素晴らしい風景の中をペダルをこぎながら髪に風を感じてください。私たちのサイクリングツアーは、あらゆるレベルに対応しており、世界で最も美しい目的地をユニークな視点から提供します。'
        },
        heroImage: 'https://images.unsplash.com/photo-1541625221345-c3f563f33b18?q=80&w=2070&auto=format&fit=crop'
    },
    {
        slug: 'walking-hiking',
        name: { en: 'Walking & Hiking', vi: 'Đi bộ & Leo núi', fr: 'Marche & Randonnée', zh: '徒步与远足', ja: 'ウォーキング＆ハイキング' },
        description: {
            en: 'Lace up your boots and traverse breathtaking trails at your own pace. Discover hidden gems, ancient paths, and panoramic vistas on our expertly guided walking and hiking adventures.',
            vi: 'Thắt dây giày và đi qua những con đường mòn ngoạn mục theo tốc độ của riêng bạn. Khám phá những viên ngọc ẩn, những con đường cổ xưa và tầm nhìn toàn cảnh trong các cuộc phiêu lưu đi bộ và leo núi được hướng dẫn chuyên nghiệp của chúng tôi.',
            fr: 'Chaussez vos bottes et parcourez des sentiers à couper le souffle à votre rythme. Découvrez des trésors cachés, des sentiers anciens et des vues panoramiques lors de nos aventures de marche et de randonnée guidées par des experts.',
            zh: '系好鞋带，按照自己的节奏穿越令人惊叹的小径。在我们专业指导的徒步旅行和远足探险中，发现隐藏的宝石、古老的路径和全景景观。',
            ja: 'ブーツの紐を締め、自分のペースで息をのむようなトレイルを横断しましょう。専門ガイド付きのウォーキング＆ハイキングアドベンチャーで、隠れた名所、古代の小道、パノラマの景色を発見してください。'
        },
        heroImage: 'https://images.unsplash.com/photo-1458040937549-361d7658a584?q=80&w=2070&auto=format&fit=crop'
    },
    {
        slug: 'culinary',
        name: { en: 'Culinary', vi: 'Ẩm thực', fr: 'Culinaire', zh: '美食', ja: '料理' },
        description: {
            en: 'Embark on a gastronomic journey to tantalize your taste buds. From bustling street markets to Michelin-starred restaurants and hands-on cooking classes, savour the authentic flavours of the world.',
            vi: 'Bắt đầu một hành trình ẩm thực để kích thích vị giác của bạn. Từ những khu chợ đường phố nhộn nhịp đến các nhà hàng được gắn sao Michelin và các lớp học nấu ăn thực hành, hãy thưởng thức hương vị đích thực của thế giới.',
            fr: 'Embarquez pour un voyage gastronomique pour titiller vos papilles. Des marchés de rue animés aux restaurants étoilés Michelin et aux cours de cuisine pratiques, savourez les saveurs authentiques du monde.',
            zh: '踏上美食之旅，挑逗您的味蕾。从熙熙攘攘的街头市场到米其林星级餐厅和动手烹饪课程，品味世界各地的正宗风味。',
            ja: '味覚を刺激する美食の旅に出かけましょう。賑やかなストリートマーケットからミシュラン星付きレストラン、実践的な料理教室まで、世界の本格的な味を堪能してください。'
        },
        heroImage: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1974&auto=format&fit=crop'
    },
     {
        slug: 'art-history',
        name: { en: 'Art & History', vi: 'Nghệ thuật & Lịch sử', fr: 'Art & Histoire', zh: '艺术与历史', ja: 'アート＆歴史' },
        description: {
            en: 'Step back in time and immerse yourself in the rich tapestry of art and history. Explore iconic museums, ancient ruins, and architectural wonders with our expert guides who bring the past to life.',
            vi: 'Hãy quay ngược thời gian và đắm mình trong tấm thảm phong phú của nghệ thuật và lịch sử. Khám phá các bảo tàng mang tính biểu tượng, các di tích cổ và các kỳ quan kiến trúc với các hướng dẫn viên chuyên nghiệp của chúng tôi, những người làm sống lại quá khứ.',
            fr: 'Remontez le temps et plongez-vous dans la riche tapisserie de l\'art et de l\'histoire. Explorez des musées emblématiques, des ruines antiques et des merveilles architecturales avec nos guides experts qui font revivre le passé.',
            zh: '回到过去，沉浸在丰富多彩的艺术和历史织锦中。与我们的专业导游一起探索标志性博物馆、古代遗址和建筑奇迹，他们将过去带入生活。',
            ja: '時間を遡り、豊かな芸術と歴史のタペストリーに浸ってください。過去を生き生きとさせる専門ガイドと共に、象徴的な博物館、古代遺跡、建築の驚異を探検しましょう。'
        },
        heroImage: 'https://images.unsplash.com/photo-1528740561666-dc2479703592?q=80&w=1965&auto=format&fit=crop'
    },
    {
        slug: 'womens-only',
        name: { en: 'Women\'s Only', vi: 'Chỉ dành cho Nữ', fr: 'Pour Femmes Seulement', zh: '仅限女性', ja: '女性限定' },
        description: {
            en: 'Travel with a community of inspiring women on journeys designed to empower, connect, and celebrate shared experiences. Explore the world in a comfortable, supportive, and fun environment.',
            vi: 'Du lịch cùng một cộng đồng phụ nữ truyền cảm hứng trong những hành trình được thiết kế để trao quyền, kết nối và tôn vinh những trải nghiệm chung. Khám phá thế giới trong một môi trường thoải mái, hỗ trợ và vui vẻ.',
            fr: 'Voyagez avec une communauté de femmes inspirantes lors de voyages conçus pour autonomiser, connecter et célébrer des expériences partagées. Explorez le monde dans un environnement confortable, solidaire et amusant.',
            zh: '与一群鼓舞人心的女性一起旅行，这些旅程旨在赋权、联系和庆祝共同的经历。在舒适、支持和有趣的环境中探索世界。',
            ja: 'エンパワーメント、つながり、共有体験を祝うためにデザインされた旅で、感動的な女性のコミュニティと一緒に旅をしましょう。快適で、協力的で、楽しい環境で世界を探検してください。'
        },
        heroImage: 'https://images.unsplash.com/photo-1579483324957-c6d3792c373a?q=80&w=2070&auto=format&fit=crop'
    }
];
