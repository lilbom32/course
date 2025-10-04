
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ContentDisplay from './components/ContentDisplay';
import SearchModal from './components/SearchModal';
import { chapters } from './constants';
import type { Chapter } from './types';
import { Menu, X, Search, Home, ChevronRight, Moon, Sun } from 'lucide-react';

const App: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<Chapter>(chapters[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleSelectChapter = (chapter: Chapter) => {
    setActiveChapter(chapter);
    setIsSidebarOpen(false); 
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getCurrentChapterIndex = () => {
    return chapters.findIndex(chapter => chapter.id === activeChapter.id);
  };

  const getProgressPercentage = () => {
    return ((getCurrentChapterIndex() + 1) / chapters.length) * 100;
  };

  const getBreadcrumbItems = () => {
    const currentIndex = getCurrentChapterIndex();
    return chapters.slice(0, currentIndex + 1);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);


  return (
    <div className={`flex flex-col h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Top Navigation Bar */}
      <div className={`top-nav flex-shrink-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between px-4 py-3">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm">
            <Home className="h-4 w-4 text-gray-500" />
            {getBreadcrumbItems().map((chapter, index) => (
              <React.Fragment key={chapter.id}>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className={`${index === getBreadcrumbItems().length - 1 ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                  {chapter.shortTitle}
                </span>
              </React.Fragment>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <button
              onClick={() => setShowSearchModal(true)}
              className={`search-btn p-2 rounded-md transition-colors ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`darkmode-btn p-2 rounded-md transition-colors ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

{/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`mobile-menu-btn p-2 rounded-md md:hidden transition-colors ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              aria-label="Toggle menu"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`progress-bar h-1 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>

      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`sidebar fixed md:relative inset-y-0 left-0 z-20 w-72 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-800'} text-white transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <Sidebar
            chapters={chapters}
            activeChapterId={activeChapter.id}
            onSelectChapter={handleSelectChapter}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Main Content */}
        <main className="main-content flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 md:p-10">
            <div className={`max-w-4xl mx-auto p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}>
              <ContentDisplay activeChapterId={activeChapter.id} isDarkMode={isDarkMode} />
            </div>
          </div>
        </main>
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onSelectChapter={handleSelectChapter}
        isDarkMode={isDarkMode}
      />

    </div>
  );
};

export default App;
