import React from 'react';
import { useParams } from 'react-router-dom';
import { FloralEventDetailPage as FloralEventDetailPageComponent } from '../components/FloralEventDetailPage';

export const FloralEventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = (path: string) => {
    window.location.href = path;
  };

  if (!id) {
    return <div>Event not found</div>;
  }

  return <FloralEventDetailPageComponent id={id} onNavigate={navigate} />;
};
