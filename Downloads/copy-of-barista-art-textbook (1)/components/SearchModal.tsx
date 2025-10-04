import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { chapters } from '../constants';
import type { Chapter } from '../types';

interface SearchResult {
  chapter: Chapter;
  content: string;
  type: 'title' | 'content';
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChapter: (chapter: Chapter) => void;
  isDarkMode?: boolean;
}

const SearchModal: React.FC<SearchModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectChapter, 
  isDarkMode = false 
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Mock search data - trong thực tế sẽ search trong nội dung thực
  const searchData = [
    { chapter: chapters[0], content: 'Hướng dẫn sử dụng website', type: 'title' as const },
    { chapter: chapters[1], content: 'Mô tả môn học Barista', type: 'title' as const },
    { chapter: chapters[2], content: 'Nguồn gốc cà phê, các loại hạt', type: 'title' as const },
    { chapter: chapters[2], content: 'Arabica và Robusta', type: 'content' as const },
    { chapter: chapters[2], content: 'Phương pháp chế biến cà phê', type: 'content' as const },
    { chapter: chapters[3], content: 'Chiết xuất Espresso', type: 'title' as const },
    { chapter: chapters[3], content: 'Kỹ thuật pha espresso', type: 'content' as const },
    { chapter: chapters[4], content: 'Thao tác đánh sữa', type: 'title' as const },
    { chapter: chapters[4], content: 'Kỹ thuật đánh sữa tạo bọt', type: 'content' as const },
    { chapter: chapters[5], content: 'Latte Art', type: 'title' as const },
    { chapter: chapters[5], content: 'Vẽ hình trái tim trên cà phê', type: 'content' as const },
    { chapter: chapters[6], content: 'Vẽ Latte Art', type: 'title' as const },
    { chapter: chapters[6], content: 'Kỹ thuật vẽ hình chiếc lá', type: 'content' as const },
  ];

  useEffect(() => {
    if (query.length > 0) {
      const filtered = searchData.filter(item =>
        item.content.toLowerCase().includes(query.toLowerCase()) ||
        item.chapter.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery && !recentSearches.includes(searchQuery)) {
      const newRecent = [searchQuery, ...recentSearches.slice(0, 4)];
      setRecentSearches(newRecent);
      localStorage.setItem('recentSearches', JSON.stringify(newRecent));
    }
  };

  const handleResultClick = (chapter: Chapter) => {
    onSelectChapter(chapter);
    onClose();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-start justify-center px-4 pt-16 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className={`relative inline-block w-full max-w-2xl transform overflow-hidden rounded-lg text-left align-bottom shadow-xl transition-all sm:my-8 sm:align-middle ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          {/* Header */}
          <div className={`px-6 py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Tìm Kiếm Nội Dung
              </h3>
              <button
                onClick={onClose}
                className={`p-1 rounded-md transition-colors ${
                  isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Search Input */}
          <div className="px-6 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Nhập từ khóa tìm kiếm..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                autoFocus
              />
            </div>
          </div>

          {/* Results */}
          <div className={`max-h-96 overflow-y-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {query.length === 0 ? (
              // Recent searches
              <div className="px-6 py-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Tìm kiếm gần đây
                  </h4>
                  {recentSearches.length > 0 && (
                    <button
                      onClick={clearRecentSearches}
                      className={`text-xs ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Xóa tất cả
                    </button>
                  )}
                </div>
                {recentSearches.length > 0 ? (
                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className={`w-full text-left p-2 rounded-md transition-colors ${
                          isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Clock size={16} className="text-gray-400" />
                          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {search}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Chưa có tìm kiếm gần đây
                  </p>
                )}
              </div>
            ) : results.length > 0 ? (
              // Search results
              <div className="px-6 py-4">
                <h4 className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Kết quả tìm kiếm ({results.length})
                </h4>
                <div className="space-y-2">
                  {results.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => handleResultClick(result.chapter)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <BookOpen size={16} className={`mt-1 flex-shrink-0 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {result.chapter.title}
                          </p>
                          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {result.content}
                          </p>
                        </div>
                        <ArrowRight size={16} className={`flex-shrink-0 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              // No results
              <div className="px-6 py-8 text-center">
                <Search size={48} className={`mx-auto mb-3 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Không tìm thấy kết quả nào cho "{query}"
                </p>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Thử với từ khóa khác hoặc kiểm tra chính tả
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
