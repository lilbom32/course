import React from 'react';
import { BestSellersPage as BestSellersPageComponent } from '../components/BestSellersPage';

export const BestSellersPage: React.FC = () => {
  const navigate = (path: string) => {
    window.location.href = path;
  };

  return <BestSellersPageComponent onNavigate={navigate} />;
};
