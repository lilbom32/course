import React, { useState, useMemo } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { journalData } from '../data/journal';
import { journalCategoriesData } from '../data/journalCategories';
import { Card } from './Card';
import type { View } from '../App';
import type { LocalizedString } from '../data/types';


// Define pillar data directly in the component as creating new files is not supported.
const storytellingPillarsData: {id: string, slug: string, title: LocalizedString, description: LocalizedString, image: string}[] = [
  { 
    id: 'umami', 
    slug: 'umami-cultural-memory', 
    title: { en: 'Umami & Cultural Memory', vi: 'Umami & Ký Ức Văn Hóa', fr: 'Umami & Mémoire Culturelle', zh: '鲜味与文化记忆', ja: 'うま味と文化的記憶' }, 
    description: { en: 'Exploring the deep connection between flavor, scent, memory, and cultural identity.', vi: 'Khám phá mối liên kết sâu sắc giữa hương vị, mùi hương, ký ức và bản sắc văn hóa.', fr: 'Explorer le lien profond entre la saveur, l\'odeur, la mémoire et l\'identité culturelle.', zh: '探索风味、气味、记忆与文化认同之间的深刻联系。', ja: '風味、香り、記憶、文化的アイデンティティの間の深いつながりを探索します。' }, 
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=870&auto=format&fit=crop' 
  },
  { 
    id: 'ritual', 
    slug: 'flowers-in-life-ritual', 
    title: { en: 'The Value of Flowers in Life & Ritual', vi: 'Giá Trị Của Hoa Trong Đời Sống & Nghi Lễ', fr: 'La Valeur des Fleurs dans la Vie & le Rituel', zh: '花在生活与仪式中的价值', ja: '生活と儀式における花の価値' }, 
    description: { en: 'Uncovering the symbolic roles flowers play in ceremonies, traditions, and daily life across cultures.', vi: 'Khám phá vai trò biểu tượng của hoa trong các nghi lễ, truyền thống và cuộc sống hàng ngày qua các nền văn hóa.', fr: 'Découvrir les rôles symboliques que les fleurs jouent dans les cérémonies, les traditions et la vie quotidienne à travers les cultures.', zh: '揭示花卉在各种文化中的仪式、传统和日常生活中的象征作用。', ja: '文化を超えた儀式、伝統、日常生活において花が果たす象徴的な役割を解き明かします。' }, 
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 'art',
    slug: 'art-museums',
    title: { en: 'Art & Museums', vi: 'Nghệ Thuật & Bảo Tàng', fr: 'Art & Musées', zh: '艺术与博物馆', ja: 'アート＆美術館' },
    description: { en: 'Exploring the intersection of travel, nature, and human creativity as seen in art and gardens.', vi: 'Khám phá sự giao thoa giữa du lịch, thiên nhiên và sự sáng tạo của con người qua nghệ thuật và sân vườn.', fr: 'Explorer l\'intersection du voyage, de la nature et de la créativité humaine vue dans l\'art et les jardins.', zh: '探索艺术和花园中所见的旅行、自然与人类创造力的交集。', ja: '芸術と庭園に見られる旅行、自然、そして人間の創造性の交差点を探ります。' }, 
    image: 'https://images.unsplash.com/photo-1622392072979-8134b22c36b8?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'community',
    slug: 'local-community-voices',
    title: { en: 'Local Stories & Community Voices', vi: 'Chuyện Địa Phương & Tiếng Nói Cộng Đồng', fr: 'Histoires Locales & Voix de la Communauté', zh: '本地故事与社区之声', ja: '地元の物語とコミュニティの声' },
    description: { en: 'Giving the platform to the artisans, guides, and keepers of culture who make a place what it is.', vi: 'Dành nền tảng cho các nghệ nhân, hướng dẫn viên và những người gìn giữ văn hóa làm nên bản sắc của một nơi.', fr: 'Donner la parole aux artisans, aux guides et aux gardiens de la culture qui font d\'un lieu ce qu\'il est.', zh: '为那些塑造一个地方的工匠、导游和文化守护者提供平台。', ja: '場所をその場所たらしめている職人、ガイド、文化の番人にプラットフォームを提供します。' }, 
    image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop'
  }
];

const destinationPillarsData: {id: string, slug: string, title: LocalizedString, description: LocalizedString, image: string}[] = [
    { 
        id: 'floral-dest', 
        slug: 'floral-destinations', 
        title: { en: 'Floral Destinations', vi: 'Điểm Đến Hoa', fr: 'Destinations Florales', zh: '花卉目的地', ja: '花の目的地' }, 
        description: { en: 'Showcasing both legendary gardens and undiscovered botanical treasures around the globe.', vi: 'Giới thiệu những khu vườn huyền thoại và cả những kho báu thực vật chưa được khám phá trên toàn cầu.', fr: 'Présentation de jardins légendaires et de trésors botaniques méconnus du monde entier.', zh: '展示全球传奇花园和未被发现的植物宝藏。', ja: '世界中の伝説的な庭園や未発見の植物の宝物を紹介します。' },
        image: 'https://images.unsplash.com/photo-1559441221-831b04a9e557?q=80&w=2070&auto=format&fit=crop'
    },
    { 
        id: 'seasonal', 
        slug: 'seasonal-bloom-calendars', 
        title: { en: 'Seasonal Bloom Calendars', vi: 'Lịch Nở Hoa Theo Mùa', fr: 'Calendriers de Floraison', zh: '季节性花期日历', ja: '季節の開花カレンダー' },
        description: { en: 'Indispensable guides for planning trips around peak floral seasons in Vietnam, Japan, Europe, and more.', vi: 'Những cẩm nang không thể thiếu để lên kế hoạch cho các chuyến đi vào mùa hoa nở rộ ở Việt Nam, Nhật Bản, Châu Âu, v.v.', fr: 'Guides indispensables pour planifier des voyages autour des saisons de floraison au Vietnam, au Japon, en Europe, et plus encore.', zh: '规划越南、日本、欧洲等地花卉盛开季节旅行的必备指南。', ja: 'ベトナム、日本、ヨーロッパなどの花の満開時期に合わせた旅行計画に不可欠なガイド。' },
        image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=1964&auto=format&fit=crop'
    },
    {
        id: 'heritage',
        slug: 'heritage-landscapes',
        title: { en: 'Heritage Landscapes', vi: 'Di Sản Cảnh Quan', fr: 'Paysages Patrimoniaux', zh: '遗产景观', ja: '遺産景観' },
        description: { en: 'Journeys to ancient gardens and cultural ecosystems where nature and history intertwine.', vi: 'Những hành trình đến các khu vườn cổ và hệ sinh thái văn hóa, nơi thiên nhiên và lịch sử giao thoa.', fr: 'Voyages vers des jardins anciens et des écosystèmes culturels où la nature et l\'histoire s\'entremêlent.', zh: '探访古老花园和文化生态系统，感受自然与历史的交融。', ja: '古代の庭園や文化的な生態系への旅。自然と歴史が絡み合っています。' },
        image: 'https://images.unsplash.com/photo-1547823307-5586591a58a2?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'culinary',
        slug: 'culinary-floral-journeys',
        title: { en: 'Culinary-Floral Journeys', vi: 'Hành Trình Ẩm Thực Hoa', fr: 'Voyages Culinaires et Floraux', zh: '美食花卉之旅', ja: '食と花の旅' },
        description: { en: 'Explore the delicious intersection of local cuisine and botanical ingredients, from rose valleys to saffron fields.', vi: 'Khám phá sự giao thoa thú vị giữa ẩm thực địa phương và nguyên liệu thực vật, từ thung lũng hoa hồng đến những cánh đồng nghệ tây.', fr: 'Explorez la délicieuse intersection de la cuisine locale et des ingrédients botaniques, des vallées de roses aux champs de safran.', zh: '从玫瑰谷到藏红花田，探索当地美食与植物成分的美味交集。', ja: 'バラの谷からサフラン畑まで、地元の料理と植物の食材が交差する美味しい世界を探検します。' },
        image: 'https://images.unsplash.com/photo-1559181528-575b5b48e3a5?q=80&w=2070&auto=format&fit=crop'
    }
];

interface JournalListPageProps {
  onNavigate: (view: View) => void;
  categorySlug?: string;
}

export const JournalListPage: React.FC<JournalListPageProps> = ({ onNavigate, categorySlug }) => {
  const { t, language } = useLocalization();
  const [activeCategory, setActiveCategory] = useState(categorySlug || 'all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStorytellingPillar, setActiveStorytellingPillar] = useState('all');
  const [activeDestinationPillar, setActiveDestinationPillar] = useState('all');

  const isStorytellingPage = activeCategory === 'storytelling-inspiration';
  const isDestinationGuidesPage = activeCategory === 'destination-guides';

  const mostReadPosts = useMemo(() => {
    return [...journalData]
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, 4);
  }, []);
  
  const categoryMap = useMemo(() => {
    const map = new Map<string, string>();
    journalCategoriesData.forEach(cat => {
      map.set(cat.slug, cat.title[language]);
    });
    return map;
  }, [language]);

  const displayedPosts = useMemo(() => {
    return journalData
      .filter(post => {
        if (activeCategory === 'all') return true;
        return post.categoryId === activeCategory;
      })
      .filter(post => {
        if (isStorytellingPage && activeStorytellingPillar !== 'all') {
          return post.subCategorySlug === activeStorytellingPillar;
        }
        if (isDestinationGuidesPage && activeDestinationPillar !== 'all') {
            return post.subCategorySlug === activeDestinationPillar;
        }
        return true;
      })
      .filter(post => {
        if (searchTerm.trim() === '') return true;
        const lowerCaseSearch = searchTerm.toLowerCase();
        return (
          post.title[language].toLowerCase().includes(lowerCaseSearch) ||
          post.excerpt[language].toLowerCase().includes(lowerCaseSearch)
        );
      });
  }, [activeCategory, activeStorytellingPillar, activeDestinationPillar, searchTerm, language, isStorytellingPage, isDestinationGuidesPage]);
  
  const handleCategoryClick = (slug: string) => {
    setActiveCategory(slug);
    setActiveStorytellingPillar('all');
    setActiveDestinationPillar('all');
  };


  return (
    <div className="journal-list-page">
      <header className="journal-list-hero">
          <h1>{t('journal_list.title')}</h1>
          <p>{t('journal_list.subtitle')}</p>
      </header>
      
      <div className="journal-layout">
        <main className="journal-main-content">
          <div className="journal-filters">
            <button
                className={`journal-filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => handleCategoryClick('all')}
            >
                {t('journal_list.filter_all')}
            </button>
            {journalCategoriesData.map(cat => (
                <button
                    key={cat.id}
                    className={`journal-filter-btn ${activeCategory === cat.slug ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(cat.slug)}
                >
                    {cat.title[language]}
                </button>
            ))}
          </div>
          
          {isStorytellingPage && (
            <div className="journal-filters journal-pillar-filters">
              <button 
                className={`journal-filter-btn ${activeStorytellingPillar === 'all' ? 'active' : ''}`}
                onClick={() => setActiveStorytellingPillar('all')}
              >
                {t('journal_list.filter_all')}
              </button>
              {storytellingPillarsData.map(pillar => (
                <button
                  key={pillar.id}
                  className={`journal-filter-btn ${activeStorytellingPillar === pillar.slug ? 'active' : ''}`}
                  onClick={() => setActiveStorytellingPillar(pillar.slug)}
                >
                  {pillar.title[language]}
                </button>
              ))}
            </div>
          )}

          {isDestinationGuidesPage && (
            <div className="journal-filters journal-pillar-filters">
              <button 
                className={`journal-filter-btn ${activeDestinationPillar === 'all' ? 'active' : ''}`}
                onClick={() => setActiveDestinationPillar('all')}
              >
                {t('journal_list.filter_all')}
              </button>
              {destinationPillarsData.map(pillar => (
                <button
                  key={pillar.id}
                  className={`journal-filter-btn ${activeDestinationPillar === pillar.slug ? 'active' : ''}`}
                  onClick={() => setActiveDestinationPillar(pillar.slug)}
                >
                  {pillar.title[language]}
                </button>
              ))}
            </div>
          )}
          
          <input
            type="search"
            className="journal-search-input"
            placeholder={t('journal_list.search_placeholder')}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />

          {isStorytellingPage && activeStorytellingPillar === 'all' && !searchTerm ? (
            <div className="journal-pillars-section">
                <p className="section-subtitle" style={{textAlign: 'left', maxWidth: 'none', margin: '0 auto 40px auto'}}>
                    Some journeys are measured not in miles, but in moments of connection. Here, we share stories of people, places, and the memories that linger long after we return home.
                </p>
                <div className="card-grid">
                  {storytellingPillarsData.map(pillar => (
                    <div key={pillar.id} onClick={() => setActiveStorytellingPillar(pillar.slug)}>
                      <Card 
                        title={pillar.title}
                        description={pillar.description}
                        image={pillar.image}
                        linkTextKey="card.link.explore"
                      />
                    </div>
                  ))}
                </div>
            </div>
          ) : isDestinationGuidesPage && activeDestinationPillar === 'all' && !searchTerm ? (
            <div className="journal-pillars-section">
                 <p className="section-subtitle" style={{textAlign: 'left', maxWidth: 'none', margin: '0 auto 40px auto'}}>
                    Our curated guides to the world's most beautiful floral journeys, balancing poetic inspiration with practical, actionable advice for the thoughtful traveler.
                </p>
                <div className="card-grid">
                    {destinationPillarsData.map(pillar => (
                         <div key={pillar.id} onClick={() => setActiveDestinationPillar(pillar.slug)}>
                            <Card 
                                title={pillar.title}
                                description={pillar.description}
                                image={pillar.image}
                                linkTextKey="card.link.explore"
                            />
                        </div>
                    ))}
                </div>
            </div>
          ) : displayedPosts.length > 0 ? (
            <div className="card-grid">
              {displayedPosts.map(post => (
                <Card
                  key={post.id}
                  title={post.title}
                  description={post.excerpt}
                  image={post.image}
                  linkTextKey="card.link.read_full_story"
                  onLinkClick={() => onNavigate({ page: 'journal-post', slug: post.slug })}
                />
              ))}
            </div>
          ) : (
             <div className="journal-no-results">
                <h4>{t('journal_list.no_results_title')}</h4>
                <p>{t('journal_list.no_results_desc')}</p>
            </div>
          )}
        </main>

        <aside className="journal-sidebar">
          <div className="most-read-widget">
            <h3>{t('journal_list.most_read')}</h3>
            <ul className="most-read-list">
              {mostReadPosts.map(post => (
                <li key={post.id} className="most-read-item">
                   <a href="#" onClick={(e) => { e.preventDefault(); onNavigate({ page: 'journal-post', slug: post.slug }); }}>
                        <div className="most-read-category">{categoryMap.get(post.categoryId) || ''}</div>
                        <div className="most-read-title">{post.title[language]}</div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};
