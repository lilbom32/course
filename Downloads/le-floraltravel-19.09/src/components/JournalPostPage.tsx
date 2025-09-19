import React, { useMemo, useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLocalization } from '../hooks/useLocalization';
import { journalData } from '../data/journal';
import { Section } from './Section';
import { Card } from './Card';
import type { View } from '../App';

// --- Share Icons --- //
const TwitterIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" /></svg>;
const FacebookIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.32 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 12 2.04Z" /></svg>;
const PinterestIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04,5.17C12.04,5.17 12.04,5.17 12.04,5.17C11.12,5.17 10.5,5.74 10.5,6.5C10.5,7.03 10.7,7.5 10.7,7.5C10.9,8.2 10.9,8.21 10.2,10.4C10.2,10.42 10.1,10.78 10.1,10.78C10,11.15 9.8,11.54 9.4,11.8C8.9,12.07 8.5,12.05 8.2,11.75C7.8,11.35 7.6,10.55 7.9,9.45C8.2,8.45 9.2,7.57 10.2,7.57C11.6,7.57 12.9,8.57 12.9,10.17C12.9,11.87 11.5,13.27 10.1,13.27C9.5,13.27 9,13.07 9,12.57C9,11.77 9.5,11.17 9.5,11.17C10.1,9.87 10.1,9.87 10.5,8.47C10.5,8.17 10.4,7.87 10.2,7.87C10,7.87 9.7,8.07 9.7,8.37C9.7,8.37 9.2,10.07 9.2,10.07C8.9,11.37 9.5,12.27 10.5,12.27C11.3,12.27 12,11.67 12,10.67C12,8.67 10.9,7.17 10.9,7.17C11.3,6.27 12.1,5.87 12.9,5.87C14.2,5.87 15.1,6.87 15.1,8.07C15.1,8.97 14.8,9.77 14.8,9.77C14.8,9.77 15.3,11.77 15.3,11.87C15.5,12.57 16,13.07 16.6,13.07C17.5,13.07 18,12.17 18,11.07C18,9.07 16.1,7.07 13.9,7.07C12.3,7.07 11.3,7.97 11.3,7.97C11.1,7.57 11.3,6.17 11.3,5.67C11.3,5.37 11.63,5.17 12.04,5.17Z" /></svg>;
const MailIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4M20,8L12,13L4,8V6L12,11L20,6V8Z" /></svg>;

interface JournalPostPageProps {
  slug: string;
  onNavigate: (view: View) => void;
}

interface TocItem {
    id: string;
    text: string;
}

export const JournalPostPage: React.FC<JournalPostPageProps> = ({ slug, onNavigate }) => {
  const { language, t } = useLocalization();
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeTocId, setActiveTocId] = useState<string>('');
  
  const post = useMemo(() => journalData.find(p => p.slug === slug), [slug]);
  
  useEffect(() => {
    if (!post) return;
    const content = post.content[language];
    const headings = [...content.matchAll(/(?:^|\n)### (.*)/g)].map(match => match[1]);
    const items = headings.map(text => ({
        text,
        id: text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-'),
    }));
    setTocItems(items);
    if(items.length > 0) {
        setActiveTocId(items[0].id);
    }
  }, [post, language]);

  useEffect(() => {
    const handleScroll = () => {
        let current = '';
        const sections = tocItems.map(item => document.getElementById(item.id)).filter(Boolean);
        const headerOffset = 120; // var(--header-height) + buffer

        for(let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i] as HTMLElement;
            if (section.offsetTop <= window.scrollY + headerOffset) {
                current = section.id;
                break;
            }
        }
        setActiveTocId(current || (tocItems.length > 0 ? tocItems[0].id : ''));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, [tocItems]);

  const relatedPosts = useMemo(() => 
    journalData.filter(p => p.slug !== slug).slice(0, 3), 
    [slug]
  );
  
  const H3Renderer = ({...props}) => {
    const text = props.children?.[0];
    if (typeof text === 'string') {
        const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
        return <h3 id={id} {...props} />;
    }
    return <h3 {...props} />;
  };

  if (!post) {
    return <div className="content-section" style={{textAlign: 'center'}}>Post not found.</div>;
  }

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(post.title[language]);

  return (
    <div className="journal-post-page">
      <div className="journal-post-hero" style={{ backgroundImage: `url(${post.image})` }}></div>
      <div className="content-section" style={{paddingTop: 0, paddingBottom: 0}}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="journal-post-meta">
              <span>By {post.author[language]}</span>
              <span>&bull;</span>
              <span>{post.date[language]}</span>
            </div>
        </div>
      </div>

      <div className="journal-post-layout">
        <aside className="journal-post-sidebar">
            {tocItems.length > 0 && (
                <div>
                    <h4>In this story</h4>
                    <nav className="toc-nav" aria-label="Article sections">
                        {tocItems.map(item => (
                            <a key={item.id} href={`#${item.id}`} className={`toc-link ${activeTocId === item.id ? 'active' : ''}`}>
                                {item.text}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
            <div>
                <h4>Share this story</h4>
                <div className="share-buttons">
                    <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`} target="_blank" rel="noopener noreferrer"><TwitterIcon /> Twitter</a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer"><FacebookIcon /> Facebook</a>
                    <a href={`https://pinterest.com/pin/create/button/?url=${shareUrl}&media=${encodeURIComponent(post.image)}&description=${shareTitle}`} target="_blank" rel="noopener noreferrer"><PinterestIcon /> Pinterest</a>
                    <a href={`mailto:?subject=${shareTitle}&body=Check out this story: ${shareUrl}`}><MailIcon /> Email</a>
                </div>
            </div>
        </aside>

        <main className="journal-post-main">
            <h1 className="section-title" style={{ marginTop: '20px', textAlign: 'left' }}>{post.title[language]}</h1>
            <div className="journal-post-content">
              <ReactMarkdown 
                components={{ h3: H3Renderer }}
                remarkPlugins={[remarkGfm]}
              >
                  {post.content[language]}
              </ReactMarkdown>
            </div>
            <div className="author-box">
                <img src={`https://i.pravatar.cc/150?u=${post.author.en.replace(/\s/g, '')}`} alt={post.author[language]} className="author-avatar" />
                <div className="author-info">
                    <h4>About {post.author[language]}</h4>
                    <p>A passionate storyteller and seasoned traveler, {post.author[language]} brings a unique perspective to the art of the journey, blending cultural insights with a deep appreciation for the natural world.</p>
                </div>
            </div>
        </main>
      </div>

      {relatedPosts.length > 0 && (
          <Section id="related-posts" title={t('journal_post.related_posts')} className="bg-alt">
            <div className="card-grid">
                {relatedPosts.map(related => (
                    <Card
                      key={related.id}
                      title={related.title}
                      description={related.excerpt}
                      image={related.image}
                      linkTextKey="card.link.read_full_story"
                      onLinkClick={() => onNavigate({ page: 'journal-post', slug: related.slug })}
                    />
                ))}
            </div>
          </Section>
      )}
    </div>
  );
};