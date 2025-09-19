import React from 'react';
import { BespokeSurveyPage as BespokeSurveyPageComponent } from '../components/BespokeSurveyPage';

export const BespokeSurveyPage: React.FC = () => {
  const navigate = (path: string) => {
    window.location.href = path;
  };

  return <BespokeSurveyPageComponent onNavigate={navigate} />;
};
