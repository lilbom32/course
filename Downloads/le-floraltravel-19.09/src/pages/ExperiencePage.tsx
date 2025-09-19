import React from 'react';
import { useParams } from 'react-router-dom';
import { ExperiencePage as ExperiencePageComponent } from '../components/ExperiencePage';

export const ExperiencePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = (path: string) => {
    window.location.href = path;
  };

  if (!slug) {
    return <div>Experience not found</div>;
  }

  return <ExperiencePageComponent slug={slug} onNavigate={navigate} />;
};
