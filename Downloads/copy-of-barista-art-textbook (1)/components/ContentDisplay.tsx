
import React from 'react';
import { chapters } from '../constants';

interface ContentDisplayProps {
  activeChapterId: string;
  isDarkMode?: boolean;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ activeChapterId, isDarkMode = false }) => {
  const chapter = chapters.find(c => c.id === activeChapterId);

  if (!chapter) {
    return <div>Chapter not found.</div>;
  }

  const ChapterComponent = chapter.component;

  return <ChapterComponent />;
};

export default ContentDisplay;
