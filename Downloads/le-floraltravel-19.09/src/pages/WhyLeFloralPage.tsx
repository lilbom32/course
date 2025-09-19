import React from 'react';
import { WhyLeFloralPage as WhyLeFloralPageComponent } from '../components/WhyLeFloralPage';

export const WhyLeFloralPage: React.FC = () => {
  const navigate = (path: string) => {
    window.location.href = path;
  };

  return <WhyLeFloralPageComponent onNavigate={navigate} />;
};
