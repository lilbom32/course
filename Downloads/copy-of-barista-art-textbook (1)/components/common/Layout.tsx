
import React from 'react';

// For chapter titles
export const ChapterTitle: React.FC<{ children: React.ReactNode; isDarkMode?: boolean }> = ({ children, isDarkMode = false }) => (
  <h1 className={`text-3xl md:text-4xl font-bold border-b-2 border-sky-500 pb-4 mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
    {children}
  </h1>
);

// For chapter subtitles
export const ChapterSubtitle: React.FC<{ children: React.ReactNode; isDarkMode?: boolean }> = ({ children, isDarkMode = false }) => (
    <p className={`text-lg md:text-xl mb-8 italic ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
        {children}
    </p>
);

// For section titles
export const SectionTitle: React.FC<{ children: React.ReactNode; isDarkMode?: boolean }> = ({ children, isDarkMode = false }) => (
  <h2 className={`text-2xl md:text-3xl font-bold mt-10 mb-4 ${isDarkMode ? 'text-sky-400' : 'text-sky-700'}`}>
    {children}
  </h2>
);

// For sub-section titles
export const SubSectionTitle: React.FC<{ children: React.ReactNode; isDarkMode?: boolean }> = ({ children, isDarkMode = false }) => (
  <h3 className={`text-xl md:text-2xl font-semibold mt-8 mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
    {children}
  </h3>
);

// For paragraphs
export const Paragraph: React.FC<{ children: React.ReactNode; isDarkMode?: boolean }> = ({ children, isDarkMode = false }) => (
  <p className={`text-base md:text-lg leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
    {children}
  </p>
);

// For styled lists
export const StyledList: React.FC<{ items: string[]; isDarkMode?: boolean }> = ({ items, isDarkMode = false }) => (
  <ul className={`list-disc list-inside space-y-2 text-base md:text-lg mb-6 pl-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

// For image cards with zoom functionality
export { default as ImageCard } from './ImageCard';

// For notes
export const Note: React.FC<{ children: React.ReactNode; isDarkMode?: boolean }> = ({ children, isDarkMode = false }) => (
    <div className={`border-l-4 border-yellow-400 p-4 my-6 ${isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
        <p className={`${isDarkMode ? 'text-yellow-200' : 'text-yellow-800'}`}><span className="font-bold">Lưu ý:</span> {children}</p>
    </div>
);
