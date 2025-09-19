import type { LocalizedString } from './types';

export interface PageTour {
    id: string;
    image: string;
    tripType: 'Small Group' | 'Bespoke' | 'Self-Guided';
    region: LocalizedString;
    title: LocalizedString;
    duration: LocalizedString;
    activityLevel: number; // 1 to 5
    price: LocalizedString;
    availableMonths: LocalizedString;
    experience: 'Biking' | 'Walking' | 'Multi-Active' | 'Women\'s Only' | 'Culinary' | 'Art & Gardens' | 'Rail' | 'Walking & Hiking';
}

export interface CountryPageData {
    slug: string;
    name: LocalizedString;
    description: LocalizedString;
    heroImage: string;
    tours: PageTour[];
}

export const countryPageData: CountryPageData[] = [
    {
        slug: 'italy',
        name: { en: 'Italy', vi: 'Ý', fr: 'Italie', zh: '意大利', ja: 'イタリア' },
        description: {
            en: 'Home to ancient empires, Renaissance masterpieces, and stunning coastlines. Italy is a feast for the senses, from its world-renowned cuisine to its passionate culture and breathtaking landscapes.',
            vi: 'Quê hương của các đế chế cổ đại, những kiệt tác thời Phục hưng và những đường bờ biển tuyệt đẹp. Ý là một bữa tiệc cho các giác quan, từ ẩm thực nổi tiếng thế giới đến văn hóa nồng nhiệt và phong cảnh ngoạn mục.',
            fr: 'Berceau d\'empires antiques, de chefs-d\'œuvre de la Renaissance et de côtes magnifiques. L\'Italie est un régal pour les sens, de sa cuisine de renommée mondiale à sa culture passionnée et ses paysages à couper le souffle.',
            zh: '古罗马帝国、文艺复兴杰作和迷人海岸线的故乡。意大利是一场感官盛宴，从其世界闻名的美食到其充满激情的文化和令人叹为观止的景观。',
            ja: '古代帝国、ルネサンスの傑作、息をのむような海岸線の故郷。イタリアは、世界的に有名な料理から情熱的な文化、息をのむような風景まで、五感を満たす饗宴です。'
        },
        heroImage: 'https://images.unsplash.com/photo-1515859005217-8a1f08870f59?q=80&w=2070&auto=format&fit=crop',
        tours: [
             {
                id: 'it-amalfi-1',
                image: 'https://www.amalfisails.it/wp-content/uploads/2025/01/mini-crociera-2-giorni-ravello.jpg',
                tripType: 'Small Group',
                region: { en: 'Europe', vi: 'Châu Âu', fr: 'Europe', zh: '欧洲', ja: 'ヨーロッパ' },
                title: { en: 'Amalfi Coast Gardens & Villas', vi: 'Vườn & Biệt thự Bờ biển Amalfi', fr: 'Jardins et villas de la côte amalfitaine', zh: '阿马尔菲海岸花园和别墅', ja: 'アマルフィ海岸の庭園とヴィラ' },
                duration: { en: '8 Days, 7 Nights', vi: '8 ngày, 7 đêm', fr: '8 jours, 7 nuits', zh: '8天7夜', ja: '8日間、7泊' },
                activityLevel: 3,
                price: { en: 'From: $7,800 USD per person', vi: 'Từ: $7,800 USD mỗi người', fr: 'À partir de : 7 800 $US par personne', zh: '每人 $7,800 美元起', ja: '1名様あたり $7,800 USDから' },
                availableMonths: { en: 'May, Jun, Sep', vi: 'Tháng 5, 6, 9', fr: 'Mai, Juin, Sep', zh: '5月, 6月, 9月', ja: '5月、6月、9月' },
                experience: 'Art & Gardens'
            },
            {
                id: 'it-tuscany-1',
                image: 'https://i0.wp.com/unusualplaces.org/wp-content/uploads/2023/05/Depositphotos_30484117_S-jpg.webp?ssl=1',
                tripType: 'Bespoke',
                region: { en: 'Europe', vi: 'Châu Âu', fr: 'Europe', zh: '欧洲', ja: 'ヨーロッパ' },
                title: { en: 'Tuscan Culinary Journey', vi: 'Hành trình ẩm thực Tuscan', fr: 'Voyage culinaire en Toscane', zh: '托斯卡纳美食之旅', ja: 'トスカーナ料理の旅' },
                duration: { en: '7 Days, 6 Nights', vi: '7 ngày, 6 đêm', fr: '7 jours, 6 nuits', zh: '7天6夜', ja: '7日間、6泊' },
                activityLevel: 2,
                price: { en: 'From: $8,500 USD per person', vi: 'Từ: $8,500 USD mỗi người', fr: 'À partir de : 8 500 $US par personne', zh: '每人 $8,500 美元起', ja: '1名様あたり $8,500 USDから' },
                availableMonths: { en: 'Apr, May, Sep, Oct', vi: 'Tháng 4, 5, 9, 10', fr: 'Avr, Mai, Sep, Oct', zh: '4月, 5月, 9月, 10月', ja: '4月、5月、9月、10月' },
                experience: 'Culinary'
            },
            {
                id: 'it-umbria-1',
                image: 'https://www.tripsavvy.com/thmb/LB4mV8qBDJ0r9_NpM6b1yIORTxE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/basilica-of-san-francesco-in-assisi--umbria--italy-921370774-5aba5929ae9ab80037aa6325.jpg',
                tripType: 'Small Group',
                region: { en: 'Europe', vi: 'Châu Âu', fr: 'Europe', zh: '欧洲', ja: 'ヨーロッパ' },
                title: { en: 'Umbrian Hills: A Journey in Slow Living', vi: 'Đồi Umbria: Hành Trình Sống Chậm', fr: 'Collines de l\'Ombrie : Un voyage au rythme lent', zh: '翁布里亚山丘：慢生活之旅', ja: 'ウンブリアの丘：スローリビングの旅' },
                duration: { en: '9 Days, 8 Nights', vi: '9 ngày, 8 đêm', fr: '9 jours, 8 nuits', zh: '9天8夜', ja: '9日間、8泊' },
                activityLevel: 2,
                price: { en: 'From: $8,200 USD per person', vi: 'Từ: $8,200 USD mỗi người', fr: 'À partir de : 8 200 $US par personne', zh: '每人 $8,200 美元起', ja: '1名様あたり $8,200 USDから' },
                availableMonths: { en: 'May, Jun, Sep, Oct', vi: 'Tháng 5, 6, 9, 10', fr: 'Mai, Juin, Sep, Oct', zh: '5月, 6月, 9月, 10月', ja: '5月、6月、9月、10月' },
                experience: 'Culinary'
            }
        ]
    },
    {
        slug: 'vietnam',
        name: { en: 'Vietnam', vi: 'Việt Nam', fr: 'Vietnam', zh: '越南', ja: 'ベトナム' },
        description: { 
            en: 'A land of staggering natural beauty and cultural complexities, from the dynamic energy of its cities to the tranquil beauty of its countryside. Explore ancient temples, limestone karsts, and vibrant markets.',
            vi: 'Một vùng đất của vẻ đẹp tự nhiên đáng kinh ngạc và sự phức tạp về văn hóa, từ năng lượng năng động của các thành phố đến vẻ đẹp yên bình của vùng nông thôn. Khám phá những ngôi đền cổ, các núi đá vôi và các khu chợ sôi động.',
            fr: 'Un pays d\'une beauté naturelle et de complexités culturelles stupéfiantes, de l\'énergie dynamique de ses villes à la beauté tranquille de sa campagne. Explorez des temples anciens, des karsts calcaires et des marchés animés.',
            zh: '一个拥有惊人自然美景和文化复杂性的国度，从充满活力的城市到宁静美丽的乡村。探索古老的寺庙、石灰岩喀斯特地貌和充满活力的市场。',
            ja: '驚異的な自然の美しさと文化の複雑さを誇る国で、都市のダイナミックなエネルギーから田舎の静かな美しさまで楽しめます。古代の寺院、石灰岩のカルスト地形、活気ある市場を探索してください。'
        },
        heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2070&auto=format&fit=crop',
        tours: [
            {
                id: 'vn-hanoi-1',
                image: 'https://kenh14cdn.com/203336854389633024/2023/8/9/photo-10-1691564222318589201863.jpeg',
                tripType: 'Bespoke',
                region: { en: 'Vietnam', vi: 'Việt Nam', fr: 'Vietnam', zh: '越南', ja: 'ベトナム' },
                title: { en: 'Hanoi in Bloom', vi: 'Hà Nội Mùa Hoa', fr: 'Hanoï en Fleurs', zh: '河内繁花', ja: '花咲くハノイ' },
                duration: { en: '4 Days, 3 Nights', vi: '4 ngày, 3 đêm', fr: '4 jours, 3 nuits', zh: '4天3夜', ja: '4日間、3泊' },
                activityLevel: 1,
                price: { en: 'From: $2,800 USD per person', vi: 'Từ: $2,800 USD mỗi người', fr: 'À partir de : 2 800 $US par personne', zh: '每人 $2,800 美元起', ja: '1名様あたり $2,800 USDから' },
                availableMonths: { en: 'Mar, Apr, Jun, Sep', vi: 'Tháng 3, 4, 6, 9', fr: 'Mar, Avr, Juin, Sep', zh: '3月, 4月, 6月, 9月', ja: '3月、4月、6月、9月' },
                experience: 'Art & Gardens'
            },
            {
                id: 'vn-mekong-1',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBMnSs0QNTnKbOY7LzYwv3JQ5cObHxAxesyQ&s',
                tripType: 'Small Group',
                region: { en: 'Vietnam', vi: 'Việt Nam', fr: 'Vietnam', zh: '越南', ja: 'ベトナム' },
                title: { en: 'Mekong Delta Flora', vi: 'Hoa Đồng Bằng Sông Cửu Long', fr: 'Flore du Delta du Mékong', zh: '湄公河三角洲植物', ja: 'メコンデルタの植物相' },
                duration: { en: '3 Days, 2 Nights', vi: '3 ngày, 2 đêm', fr: '3 jours, 2 nuits', zh: '3天2夜', ja: '3日間、2泊' },
                activityLevel: 2,
                price: { en: 'From: $2,500 USD per person', vi: 'Từ: $2,500 USD mỗi người', fr: 'À partir de : 2 500 $US par personne', zh: '每人 $2,500 美元起', ja: '1名様あたり $2,500 USDから' },
                availableMonths: { en: 'Dec, Jan, Feb', vi: 'Tháng 12, 1, 2', fr: 'Déc, Jan, Fév', zh: '12月, 1月, 2月', ja: '12月、1月、2月' },
                experience: 'Culinary'
            },
            {
                id: 'vn-mocchau-1',
                image: 'https://images.vietnamtourism.gov.vn/en/images/2015/53Mocchau.jpg',
                tripType: 'Bespoke',
                region: { en: 'Vietnam', vi: 'Việt Nam', fr: 'Vietnam', zh: '越南', ja: 'ベトナム' },
                title: { 
                    en: 'Moc Chau: Dialogue with the White Silence', 
                    vi: 'Mộc Châu: Đối Thoại Cùng Miền Tĩnh Lặng Trắng', 
                    fr: 'Mộc Châu : Dialogue avec le Silence Blanc', 
                    zh: '木州：与白色静谧的对话',
                    ja: 'モクチャウ：白い静寂との対話'
                },
                duration: { en: '4 Days, 3 Nights', vi: '4 ngày, 3 đêm', fr: '4 jours, 3 nuits', zh: '4天3夜', ja: '4日間、3泊' },
                activityLevel: 1,
                price: { en: 'From: $3,200 USD per person', vi: 'Từ: $3,200 USD mỗi người', fr: 'À partir de : 3 200 $US par personne', zh: '每人 $3,200 美元起', ja: '1名様あたり $3,200 USDから' },
                availableMonths: { en: 'Dec, Jan, Feb', vi: 'Tháng 12, 1, 2', fr: 'Déc, Jan, Fév', zh: '12月, 1月, 2月', ja: '12月、1月、2月' },
                experience: 'Art & Gardens'
            },
            {
                id: 'vn-bike-1',
                image: 'https://adventure.norrona.com/media/image-cache//574/_thumbs/default_3079_Vietnam_iStock503318387.jpg',
                tripType: 'Small Group',
                region: { en: 'Asia', vi: 'Châu Á', fr: 'Asie', zh: '亚洲', ja: 'アジア' },
                title: { en: 'Vietnam Biking', vi: 'Đạp xe Việt Nam', fr: 'Vélo au Vietnam', zh: '越南自行车游', ja: 'ベトナムサイクリング' },
                duration: { en: '8 Days, 7 Nights', vi: '8 ngày, 7 đêm', fr: '8 jours, 7 nuits', zh: '8天7夜', ja: '8日間、7泊' },
                activityLevel: 4,
                price: { en: 'From: $7,995 USD per person', vi: 'Từ: $7,995 USD mỗi người', fr: 'À partir de : 7 995 $US par personne', zh: '每人 $7,995 美元起', ja: '1名様あたり $7,995 USDから' },
                availableMonths: { en: 'Jan, Feb, Mar, Dec', vi: 'Tháng 1, 2, 3, 12', fr: 'Jan, Fév, Mar, Déc', zh: '1月, 2月, 3月, 12月', ja: '1月、2月、3月、12月' },
                experience: 'Biking'
            },
            {
                id: 'vn-sapa-1',
                image: 'https://images.myguide-cdn.com/vietnam/companies/from-hanoi-trek-and-stay-3-day-sapa-highlands-adventure/large/from-hanoi-trek-and-stay-3-day-sapa-highlands-adventure-2682490.jpg',
                tripType: 'Small Group',
                region: { en: 'Asia', vi: 'Châu Á', fr: 'Asie', zh: '亚洲', ja: 'アジア' },
                title: { en: 'Sapa Highlands Stillness Trek', vi: 'Hành Trình Tĩnh Lặng Cao Nguyên Sapa', fr: 'Trek de quiétude dans les hauts plateaux de Sapa', zh: '沙坝高原静谧徒步', ja: 'サパ高原静寂のトレッキング' },
                duration: { en: '6 Days, 5 Nights', vi: '6 ngày, 5 đêm', fr: '6 jours, 5 nuits', zh: '6天5夜', ja: '6日間、5泊' },
                activityLevel: 3,
                price: { en: 'From: $6,800 USD per person', vi: 'Từ: $6,800 USD mỗi người', fr: 'À partir de : 6 800 $US par personne', zh: '每人 $6,800 美元起', ja: '1名様あたり $6,800 USDから' },
                availableMonths: { en: 'Mar, Apr, Sep, Oct, Nov', vi: 'Tháng 3, 4, 9, 10, 11', fr: 'Mar, Avr, Sep, Oct, Nov', zh: '3月, 4月, 9月, 10月, 11月', ja: '3月、4月、9月、10月、11月' },
                experience: 'Walking & Hiking'
            }
        ]
    },
    {
        slug: 'france',
        name: { en: 'France', vi: 'Pháp', fr: 'France', zh: '法国', ja: 'フランス' },
        description: {
            en: 'Synonymous with romance, art, and gastronomy, France captivates with its iconic landmarks, charming villages, and diverse landscapes. From the lavender fields of Provence to the alpine peaks and the glamorous Riviera, every corner tells a story.',
            vi: 'Đồng nghĩa với sự lãng mạn, nghệ thuật và ẩm thực, Pháp quyến rũ với các địa danh mang tính biểu tượng, những ngôi làng duyên dáng và cảnh quan đa dạng. Từ những cánh đồng oải hương của Provence đến các đỉnh núi cao và bờ biển Riviera quyến rũ, mỗi góc đều kể một câu chuyện.',
            fr: 'Synonyme de romance, d\'art et de gastronomie, la France captive par ses monuments emblématiques, ses villages de charme et ses paysages variés. Des champs de lavande de Provence aux sommets alpins et à la Côte d\'Azur glamour, chaque recoin raconte une histoire.',
            zh: '法国是浪漫、艺术和美食的代名词，以其标志性地标、迷人村庄和多样景观而迷人。从普罗旺斯的薰衣草田到阿尔卑斯山峰和迷人的里维埃拉，每个角落都在讲述一个故事。',
            ja: 'ロマンス、アート、美食の代名詞であるフランスは、象徴的なランドマーク、魅力的な村、多様な風景で魅了します。プロヴァンスのラベンダー畑からアルプスの山々、そして華やかなリビエラまで、隅々まで物語があります。'
        },
        heroImage: 'https://www.lasalaplazahotel.com/assets/themes/www.lasalaplazahotel.com/img/blog/Biarritz-Pais-Vasco-Frances.jpg',
        tours: [
             {
                id: 'fr-lavender-1',
                image: 'https://www.travelmanagers.com.au/wp-content/uploads/2023/06/AdobeStock_286563877-1.jpeg',
                tripType: 'Small Group',
                region: { en: 'Europe', vi: 'Châu Âu', fr: 'Europe', zh: '欧洲', ja: 'ヨーロッパ' },
                title: { en: 'Provence Lavender Fields', vi: 'Cánh đồng oải hương Provence', fr: 'Champs de Lavande de Provence', zh: '普罗旺斯薰衣草田', ja: 'プロヴァンスのラベンダー畑' },
                duration: { en: '7 Days, 6 Nights', vi: '7 ngày, 6 đêm', fr: '7 jours, 6 nuits', zh: '7天6夜', ja: '7日間、6泊' },
                activityLevel: 2,
                price: { en: 'From: $6,500 USD per person', vi: 'Từ: $6,500 USD mỗi người', fr: 'À partir de : 6 500 $US par personne', zh: '每人 $6,500 美元起', ja: '1名様あたり $6,500 USDから' },
                availableMonths: { en: 'Jun, Jul', vi: 'Tháng 6, 7', fr: 'Juin, Juil', zh: '6月, 7月', ja: '6月、7月' },
                experience: 'Walking'
            },
            {
                id: 'fr-art-1',
                image: 'https://thumbs.dreamstime.com/b/palais-royal-garden-center-paris-france-170490522.jpg',
                tripType: 'Bespoke',
                region: { en: 'Europe', vi: 'Châu Âu', fr: 'Europe', zh: '欧洲', ja: 'ヨーロッパ' },
                title: { en: 'Parisian Art & Gardens', vi: 'Nghệ thuật & Vườn Paris', fr: 'Art et Jardins Parisiens', zh: '巴黎艺术与花园', ja: 'パリのアート＆ガーデン' },
                duration: { en: '5 Days, 4 Nights', vi: '5 ngày, 4 đêm', fr: '5 jours, 4 nuits', zh: '5天4夜', ja: '5日間、4泊' },
                activityLevel: 1,
                price: { en: 'From: $5,800 USD per person', vi: 'Từ: $5,800 USD mỗi người', fr: 'À partir de : 5 800 $US par personne', zh: '每人 $5,800 美元起', ja: '1名様あたり $5,800 USDから' },
                availableMonths: { en: 'Apr, May, Sep', vi: 'Tháng 4, 5, 9', fr: 'Avr, Mai, Sep', zh: '4月, 5月, 9月', ja: '4月、5月、9月' },
                experience: 'Art & Gardens'
            }
        ]
    },
    {
        slug: 'japan',
        name: { en: 'Japan', vi: 'Nhật Bản', fr: 'Japon', zh: '日本', ja: '日本' },
        description: {
            en: 'A country where ancient traditions are fused with futuristic visions. From the serenity of its temples and gardens to the vibrant energy of its cities, Japan is a land of endless discovery. Experience the delicate beauty of cherry blossoms, the artistry of its cuisine, and the warmth of its people.',
            vi: 'Một quốc gia nơi truyền thống cổ xưa hòa quyện với tầm nhìn tương lai. Từ sự thanh bình của các ngôi đền và khu vườn đến năng lượng sôi động của các thành phố, Nhật Bản là một vùng đất của sự khám phá vô tận. Trải nghiệm vẻ đẹp tinh tế của hoa anh đào, tính nghệ thuật của ẩm thực và sự ấm áp của con người nơi đây.',
            fr: 'Un pays où les traditions anciennes fusionnent avec des visions futuristes. De la sérénité de ses temples et jardins à l\'énergie vibrante de ses villes, le Japon est une terre de découvertes sans fin. Découvrez la beauté délicate des cerisiers en fleurs, l\'art de sa cuisine et la chaleur de ses habitants.',
            zh: '一个将古老传统与未来主义愿景相融合的国家。从宁静的寺庙和花园到充满活力的城市，日本是一个充满无尽发现的国度。体验樱花的娇嫩之美、其美食的艺术性以及人民的热情。',
            ja: '古代の伝統と未来的なビジョンが融合した国。寺院や庭園の静けさから都市の活気あるエネルギーまで、日本は無限の発見の地です。桜の繊細な美しさ、料理の芸術性、そして人々の温かさを体験してください。'
        },
        heroImage: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=2070&auto=format&fit=crop',
        tours: [
             {
                id: 'jp-sakura-1',
                image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=871&auto=format&fit=crop',
                tripType: 'Small Group',
                region: { en: 'Asia', vi: 'Châu Á', fr: 'Asie', zh: '亚洲', ja: 'アジア' },
                title: { en: 'Kyoto Cherry Blossom Trail', vi: 'Đường mòn hoa anh đào Kyoto', fr: 'Sentier des cerisiers en fleurs de Kyoto', zh: '京都樱花小径', ja: '京都桜の道' },
                duration: { en: '10 Days, 9 Nights', vi: '10 ngày, 9 đêm', fr: '10 jours, 9 nuits', zh: '10天9夜', ja: '10日間、9泊' },
                activityLevel: 2,
                price: { en: 'From: $8,200 USD per person', vi: 'Từ: $8,200 USD mỗi người', fr: 'À partir de : 8 200 $US par personne', zh: '每人 $8,200 美元起', ja: '1名様あたり $8,200 USDから' },
                availableMonths: { en: 'Mar, Apr', vi: 'Tháng 3, 4', fr: 'Mar, Avr', zh: '3月, 4月', ja: '3月、4月' },
                experience: 'Walking'
            },
            {
                id: 'jp-foodie-1',
                image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=725&auto=format&fit=crop',
                tripType: 'Self-Guided',
                region: { en: 'Asia', vi: 'Châu Á', fr: 'Asie', zh: '亚洲', ja: 'アジア' },
                title: { en: 'Tokyo Culinary Secrets', vi: 'Bí mật ẩm thực Tokyo', fr: 'Secrets Culinaires de Tokyo', zh: '东京美食秘诀', ja: '東京料理の秘密' },
                duration: { en: '7 Days, 6 Nights', vi: '7 ngày, 6 đêm', fr: '7 jours, 6 nuits', zh: '7天6夜', ja: '7日間、6泊' },
                activityLevel: 1,
                price: { en: 'From: $4,500 USD per person', vi: 'Từ: $4,500 USD mỗi người', fr: 'À partir de : 4 500 $US par personne', zh: '每人 $4,500 美元起', ja: '1名様あたり $4,500 USDから' },
                availableMonths: { en: 'All Year', vi: 'Quanh năm', fr: 'Toute l\'année', zh: '全年', ja: '通年' },
                experience: 'Culinary'
            }
        ]
    },
    {
        slug: 'switzerland',
        name: { en: 'Switzerland', vi: 'Thụy Sĩ', fr: 'Suisse', zh: '瑞士', ja: 'スイス' },
        description: {
            en: 'Home to soaring Alpine peaks, serene turquoise lakes, and flower-filled meadows, Switzerland is a paradise for nature lovers. Explore charming villages, hike breathtaking trails, and indulge in world-class chocolate and cheese.',
            vi: 'Là quê hương của những đỉnh núi Anpơ cao vút, những hồ nước màu ngọc lam thanh bình và những đồng cỏ đầy hoa, Thụy Sĩ là một thiên đường cho những người yêu thiên nhiên. Khám phá những ngôi làng duyên dáng, đi bộ trên những con đường mòn ngoạn mục và thưởng thức sô cô la và phô mai đẳng cấp thế giới.',
            fr: 'Avec ses sommets alpins majestueux, ses lacs turquoise sereins et ses prairies fleuries, la Suisse est un paradis pour les amoureux de la nature. Explorez des villages de charme, parcourez des sentiers à couper le souffle et dégustez du chocolat et du fromage de renommée mondiale.',
            zh: '瑞士拥有高耸的阿尔卑斯山峰、宁静的绿松石湖泊和鲜花盛开的草地，是自然爱好者的天堂。探索迷人的村庄，徒步令人惊叹的小径，尽情享受世界一流的巧克力和奶酪。',
            ja: 'そびえ立つアルプスの山々、静かなターコイズブルーの湖、花でいっぱいの牧草地があるスイスは、自然愛好家にとっての楽園です。魅力的な村を探索し、息をのむようなトレイルをハイキングし、世界クラスのチョコレートとチーズを堪能してください。'
        },
        heroImage: 'https://images.unsplash.com/photo-1530122037265-45f1f825017c?q=80&w=2070&auto=format&fit=crop',
        tours: [
             {
                id: 'ch-wildflower-1',
                image: 'https://microsite-cms.leavetown.com/leavetown.com/media/pexels_photo_267133_a061f1dad8.jpeg',
                tripType: 'Small Group',
                region: { en: 'Europe', vi: 'Châu Âu', fr: 'Europe', zh: '欧洲', ja: 'ヨーロッパ' },
                title: { en: 'Alpine Wildflower Trek', vi: 'Chuyến đi bộ hoa dại trên núi cao', fr: 'Randonnée des fleurs sauvages alpines', zh: '高山野花徒步', ja: 'アルプスの野花トレッキング' },
                duration: { en: '8 Days, 7 Nights', vi: '8 ngày, 7 đêm', fr: '8 jours, 7 nuits', zh: '8天7夜', ja: '8日間、7泊' },
                activityLevel: 4,
                price: { en: 'From: $7,200 USD per person', vi: 'Từ: $7,200 USD mỗi người', fr: 'À partir de : 7 200 $US par personne', zh: '每人 $7,200 美元起', ja: '1名様あたり $7,200 USDから' },
                availableMonths: { en: 'Jul, Aug', vi: 'Tháng 7, 8', fr: 'Juil, Août', zh: '7月, 8月', ja: '7月、8月' },
                experience: 'Walking'
            },
            {
                id: 'ch-rail-1',
                image: 'https://www.newlyswissed.com/wp-content/uploads/2022/09/Luzern-Interlaken-Express-Summer-01.jpg',
                tripType: 'Self-Guided',
                region: { en: 'Europe', vi: 'Châu Âu', fr: 'Europe', zh: '欧洲', ja: 'ヨーロッパ' },
                title: { en: 'Swiss Lakes & Mountains by Rail', vi: 'Hồ và Núi Thụy Sĩ bằng đường sắt', fr: 'Lacs et montagnes suisses en train', zh: '瑞士湖光山色火车之旅', ja: '鉄道で行くスイスの湖と山' },
                duration: { en: '10 Days, 9 Nights', vi: '10 ngày, 9 đêm', fr: '10 jours, 9 nuits', zh: '10天9夜', ja: '10日間、9泊' },
                activityLevel: 2,
                price: { en: 'From: $6,800 USD per person', vi: 'Từ: $6,800 USD mỗi người', fr: 'À partir de : 6 800 $US par personne', zh: '每人 $6,800 美元起', ja: '1名様あたり $6,800 USDから' },
                availableMonths: { en: 'May, Jun, Sep', vi: 'Tháng 5, 6, 9', fr: 'Mai, Juin, Sep', zh: '5月, 6月, 9月', ja: '5月、6月、9月' },
                experience: 'Rail'
            },
            {
                id: 'ch-glacier-1',
                image: 'https://assets.tripsmiths.com/images/listing-480/546439-shutterstock-2256994783.jpg',
                tripType: 'Small Group',
                region: { en: 'Europe', vi: 'Châu Âu', fr: 'Europe', zh: '欧洲', ja: 'ヨーロッパ' },
                title: { en: 'Glacier Express Contemplative Journey', vi: 'Hành Trình Chiêm Nghiệm trên Tàu Glacier Express', fr: 'Voyage contemplatif à bord du Glacier Express', zh: '冰川快车冥想之旅', ja: '氷河急行の瞑想の旅' },
                duration: { en: '8 Days, 7 Nights', vi: '8 ngày, 7 đêm', fr: '8 jours, 7 nuits', zh: '8天7夜', ja: '8日間、7泊' },
                activityLevel: 1,
                price: { en: 'From: $9,500 USD per person', vi: 'Từ: $9,500 USD mỗi người', fr: 'À partir de : 9 500 $US par personne', zh: '每人 $9,500 美元起', ja: '1名様あたり $9,500 USDから' },
                availableMonths: { en: 'Jun, Jul, Aug, Sep', vi: 'Tháng 6, 7, 8, 9', fr: 'Juin, Juil, Août, Sep', zh: '6月, 7月, 8月, 9月', ja: '6月、7月、8月、9月' },
                experience: 'Rail'
            }
        ]
    },
    {
        slug: 'morocco',
        name: { en: 'Morocco', vi: 'Ma-rốc', fr: 'Maroc', zh: '摩洛哥', ja: 'モロッコ' },
        description: {
            en: 'A kingdom of vibrant colors, bustling souks, and dramatic landscapes. From the Atlas Mountains to the Sahara Desert, Morocco is a sensory delight waiting to be explored.',
            vi: 'Một vương quốc của những màu sắc rực rỡ, những khu chợ souk nhộn nhịp và cảnh quan ấn tượng. Từ Dãy núi Atlas đến Sa mạc Sahara, Ma-rốc là một bữa tiệc của các giác quan đang chờ được khám phá.',
            fr: 'Un royaume de couleurs vives, de souks animés et de paysages spectaculaires. Des montagnes de l\'Atlas au désert du Sahara, le Maroc est un délice sensoriel qui ne demande qu\'à être exploré.',
            zh: '一个色彩鲜艳、集市繁华、地貌壮观的王国。从阿特拉斯山脉到撒哈拉沙漠，摩洛哥是一个等待探索的感官盛宴。',
            ja: '鮮やかな色彩、賑やかなスーク、ドラマチックな風景の王国。アトラス山脈からサハラ砂漠まで、モロッコは探検を待つ五感の喜びです。'
        },
        heroImage: 'https://www.insightvacations.com/media/ocgbv5zg/ajt-bin-haddu-in-morocco.jpg',
        tours: [
            {
                id: 'ma-gardens-1',
                image: 'https://exodus-website.s3.amazonaws.com/uploads/2015/09/AdobeStock_553287950-2-1024x683.jpeg',
                tripType: 'Small Group',
                region: { en: 'Africa', vi: 'Châu Phi', fr: 'Afrique', zh: '非洲', ja: 'アフリカ' },
                title: { en: 'Marrakech Gardens & Atlas Hike', vi: 'Vườn Marrakech & Đi bộ Atlas', fr: 'Jardins de Marrakech & Randonnée Atlas', zh: '马拉喀什花园与阿特拉斯徒步', ja: 'マラケシュの庭園とアトラスハイキング' },
                duration: { en: '8 Days, 7 Nights', vi: '8 ngày, 7 đêm', fr: '8 jours, 7 nuits', zh: '8天7夜', ja: '8日間、7泊' },
                activityLevel: 2,
                price: { en: 'From: $6,900 USD per person', vi: 'Từ: $6,900 USD mỗi người', fr: 'À partir de : 6 900 $US par personne', zh: '每人 $6,900 美元起', ja: '1名様あたり $6,900 USDから' },
                availableMonths: { en: 'Mar, Apr, May, Sep, Oct', vi: 'Tháng 3, 4, 5, 9, 10', fr: 'Mar, Avr, Mai, Sep, Oct', zh: '3月, 4月, 5月, 9月, 10月', ja: '3月、4月、5月、9月、10月' },
                experience: 'Art & Gardens'
            },
            {
                id: 'ma-desert-1',
                image: 'https://media.istockphoto.com/id/512982950/photo/reflection-of-the-sky-and-the-sand-dunes.jpg?s=612x612&w=0&k=20&c=Ijy-jc4f_EylL1QklELbkOQiyJoTYHROltEi51YO-oE=',
                tripType: 'Bespoke',
                region: { en: 'Africa', vi: 'Châu Phi', fr: 'Afrique', zh: '非洲', ja: 'アフリカ' },
                title: { en: 'Sahara Stars & Desert Oases', vi: 'Sao Sahara & Ốc đảo Sa mạc', fr: 'Étoiles du Sahara & Oasis du Désert', zh: '撒哈拉星辰与沙漠绿洲', ja: 'サハラの星と砂漠のオアシス' },
                duration: { en: '10 Days, 9 Nights', vi: '10 ngày, 9 đêm', fr: '10 jours, 9 nuits', zh: '10天9夜', ja: '10日間、9泊' },
                activityLevel: 3,
                price: { en: 'From: $9,200 USD per person', vi: 'Từ: $9,200 USD mỗi người', fr: 'À partir de : 9 200 $US par personne', zh: '每人 $9,200 美元起', ja: '1名様あたり $9,200 USDから' },
                availableMonths: { en: 'Oct, Nov, Feb, Mar', vi: 'Tháng 10, 11, 2, 3', fr: 'Oct, Nov, Fév, Mar', zh: '10月, 11月, 2月, 3月', ja: '10月、11月、2月、3月' },
                experience: 'Multi-Active'
            }
        ]
    },
    {
        slug: 'default',
        name: { en: 'Coming Soon', vi: 'Sắp ra mắt', fr: 'Bientôt disponible', zh: '敬请期待', ja: '近日公開' },
        description: {
            en: 'We are busy curating unforgettable experiences for this destination. Please check back soon for new tours and adventures!',
            vi: 'Chúng tôi đang bận rộn tuyển chọn những trải nghiệm khó quên cho điểm đến này. Vui lòng quay lại sớm để biết các tour du lịch và cuộc phiêu lưu mới!',
            fr: 'Nous sommes en train de préparer des expériences inoubliables pour cette destination. Revenez bientôt pour de nouvelles visites et aventures !',
            zh: '我们正在为此目的地策划难忘的体验。请稍后回来查看新的旅游和冒险活动！',
            ja: 'この目的地のために忘れられない体験を現在企画中です。新しいツアーや冒険については、まもなく再度ご確認ください！'
        },
        heroImage: 'https://images.unsplash.com/photo-1501696461415-620856b15b52?q=80&w=2070&auto=format&fit=crop',
        tours: []
    }
];