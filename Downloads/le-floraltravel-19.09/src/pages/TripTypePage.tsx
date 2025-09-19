import React from 'react';
import { useParams } from 'react-router-dom';
import { TripTypePage as TripTypePageComponent } from '../components/TripTypePage';

export const TripTypePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = (path: string) => {
    window.location.href = path;
  };

  if (!slug) {
    return <div>Trip type not found</div>;
  }

  return <TripTypePageComponent slug={slug} onNavigate={navigate} />;
};
