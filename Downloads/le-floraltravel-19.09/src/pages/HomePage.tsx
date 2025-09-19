import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Import Components
import { Hero } from '../components/Hero';
import { Section } from '../components/Section';
import { Card } from '../components/Card';
import { Hallmark } from '../components/Hallmark';
import { TestimonialSlider } from '../components/TestimonialSlider';
import { AITripPlannerSection } from '../components/AITripPlannerSection';
import { BespokeAIAssistant } from '../components/BespokeAIAssistant';

// Import Data
import { travelTypesData } from '../data/travelTypes';
import { hallmarksData } from '../data/hallmarks';
import { regionsData } from '../data/regions';
import { toursData } from '../data/tours';
import { journalCategoriesData } from '../data/journalCategories';
import { testimonialsData } from '../data/testimonials';

// Import hooks
import { useLocalization } from '../hooks/useLocalization';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const { t } = useLocalization();
  const navigate = useNavigate();
  
  useScrollReveal('.scroll-reveal');

  const tourIdToViewMap: { [key: number]: string } = {
    1: '/tours/jp-sakura-1',
    2: '/tours/fr-lavender-1',
    3: '/floral-events/nl-tulips'
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <Hero onNavigate={handleNavigate} />
      
      <Section id="travel-types" title={t('section.title.travel_types')} className="scroll-reveal">
        <div className="card-grid travel-types-grid">
          {travelTypesData.map(item => (
            <Card 
              key={item.id}
              title={item.title}
              description={item.description}
              image={item.imageGradient}
              imagePosition={item.imagePosition}
              linkTextKey="card.link.explore"
              onLinkClick={() => {
                if (item.slug === 'bespoke-journeys') {
                  handleNavigate('/bespoke-survey');
                } else if (item.slug === 'floral-calendar') {
                  handleNavigate('/floral-calendar');
                } else {
                  handleNavigate(`/trip-types/${item.slug}`);
                }
              }}
            />
          ))}
        </div>
      </Section>

      <Section id="ai-planner" title="" className="scroll-reveal">
        <AITripPlannerSection onNavigate={handleNavigate} />
      </Section>

      <Section id="bespoke-ai" title={t('section.title.bespoke_ai')} className="scroll-reveal bg-alt">
        <BespokeAIAssistant onNavigate={handleNavigate} />
      </Section>

      <Section id="hallmarks" title={t('section.title.hallmarks')} className="scroll-reveal">
        <div className="hallmark-grid">
            {hallmarksData.map(item => (
                <Hallmark
                    key={item.id}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                />
            ))}
        </div>
      </Section>
      
      <Section id="destinations" title={t('section.title.destinations')} className="scroll-reveal bg-alt">
        <div className="card-grid">
          {regionsData.map(item => (
            <Card 
              key={item.id}
              title={item.title}
              description={item.description}
              image={item.imageGradient}
              linkTextKey="card.link.discover"
              onLinkClick={() => handleNavigate(`/destinations/${item.slug}`)}
            />
          ))}
        </div>
      </Section>

      <Section id="experiences" title={t('section.title.experiences')} className="scroll-reveal">
        <div className="card-grid">
          {toursData.map(tour => (
            <Card 
              key={tour.id}
              title={tour.title}
              description={tour.description}
              image={tour.imageGradient}
              linkTextKey="card.link.learn_more"
              onLinkClick={() => {
                const path = tourIdToViewMap[tour.id];
                if (path) {
                    handleNavigate(path);
                }
              }}
            />
          ))}
        </div>
      </Section>
      
      <Section id="testimonials" title={t('section.title.testimonials')} className="scroll-reveal bg-alt">
        <TestimonialSlider testimonials={testimonialsData} />
      </Section>

      <Section id="journal" title={t('section.title.journal')} className="scroll-reveal">
        <div className="journal-category-grid">
          {journalCategoriesData.map(category => (
            <Card
              key={category.id}
              title={category.title}
              description={category.description}
              image={category.image}
              linkTextKey="card.link.learn_more"
              onLinkClick={() => handleNavigate(`/journal/${category.slug}`)}
            />
          ))}
        </div>
      </Section>
      
      <Section id="about" title={t('section.title.about')} className="scroll-reveal bg-alt">
          <div className="about-section-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {t('section.content.about')}
              </ReactMarkdown>
              <button className="btn btn-pulse" onClick={() => handleNavigate('/why-le-floral')}>
                  {t('about.button.discover_philosophy')}
              </button>
          </div>
      </Section>
      
      <Section id="faq" title={t('section.title.faq')} className="scroll-reveal">
          <div className="faq-cta-section">
              <p>{t('section.content.faq_cta')}</p>
              <button className="btn btn-pulse" onClick={() => handleNavigate('/faq')}>
                {t('faq.button.view_all')}
              </button>
          </div>
      </Section>
    </>
  );
};
