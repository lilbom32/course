import React from 'react';
import { FloralCalendarPage as FloralCalendarPageComponent } from '../components/FloralCalendarPage';

export const FloralCalendarPage: React.FC = () => {
  const navigate = (path: string) => {
    window.location.href = path;
  };

  return <FloralCalendarPageComponent onNavigate={navigate} />;
};
