import React from 'react';
import { useParams } from 'react-router-dom';
import { TourDetailPage as TourDetailPageComponent } from '../components/TourDetailPage';

export const TourDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = (path: string) => {
    window.location.href = path;
  };

  if (!id) {
    return <div>Tour not found</div>;
  }

  return <TourDetailPageComponent id={id} onNavigate={navigate} />;
};
