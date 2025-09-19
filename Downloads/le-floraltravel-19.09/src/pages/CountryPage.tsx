import React from 'react';
import { useParams } from 'react-router-dom';
import { CountryPage as CountryPageComponent } from '../components/CountryPage';

export const CountryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = (path: string) => {
    window.location.href = path;
  };

  if (!slug) {
    return <div>Country not found</div>;
  }

  return <CountryPageComponent slug={slug} onNavigate={navigate} />;
};
