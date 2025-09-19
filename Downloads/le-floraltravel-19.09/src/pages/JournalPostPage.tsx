import React from 'react';
import { useParams } from 'react-router-dom';
import { JournalPostPage as JournalPostPageComponent } from '../components/JournalPostPage';

export const JournalPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = (path: string) => {
    window.location.href = path;
  };

  if (!slug) {
    return <div>Post not found</div>;
  }

  return <JournalPostPageComponent slug={slug} onNavigate={navigate} />;
};
