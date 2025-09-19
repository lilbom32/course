import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { JournalListPage as JournalListPageComponent } from '../components/JournalListPage';

export const JournalListPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const [searchParams] = useSearchParams();
  const categoryFromQuery = searchParams.get('category');
  const navigate = (path: string) => {
    window.location.href = path;
  };

  return <JournalListPageComponent onNavigate={navigate} categorySlug={categorySlug || categoryFromQuery || undefined} />;
};
