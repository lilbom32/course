import React from 'react';
import type { Chapter } from '../types';
import { BookOpen } from 'lucide-react';

interface SidebarProps {
  chapters: Chapter[];
  activeChapterId: string;
  onSelectChapter: (chapter: Chapter) => void;
  isDarkMode?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ chapters, activeChapterId, onSelectChapter, isDarkMode = false }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6 text-center border-b border-gray-700">
        <div className="flex items-center justify-center space-x-3">
          <img src="https://dongphucvina.vn/wp-content/uploads/2023/05/hutech-logo.jpeg" alt="HUTECH Logo" className="h-12 w-auto" />
          <h1 className="text-2xl font-bold text-white">Barista Art</h1>
        </div>
        <p className="text-sm text-gray-400 mt-2">Cẩm Nang Pha Chế</p>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <ul>
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <button
                onClick={() => onSelectChapter(chapter)}
                className={`w-full text-left flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                  activeChapterId === chapter.id
                    ? 'bg-sky-600 text-white font-semibold shadow-md'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <BookOpen size={20} className="flex-shrink-0" />
                <span className="flex-grow">{chapter.shortTitle}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 text-center text-xs text-gray-500 border-t border-gray-700">
        <p className="mb-2 font-semibold text-gray-400">Made by Ths. Ngô Đình Minh Quang</p>
        <p>&copy; 2024 HUTECH</p>
        <p>www.hutech.edu.vn</p>
      </div>
    </div>
  );
};

export default Sidebar;