import React, { useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  ChevronRight, 
  Clock, 
  TrendingUp, 
  User,
  Mail,
  Phone,
  Hash,
  BookOpen
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSearch } from '../../context/SearchContext';

const SearchModal = ({ studentsData = [], teachersData = [] }) => {
  const { isDark } = useTheme();
  const {
    isSearchOpen,
    searchQuery,
    searchResults,
    isSearching,
    recentSearches,
    closeSearch,
    handleSearchChange,
    performGlobalSearch,
    clearRecentSearches,
    getPopularSearches
  } = useSearch();

  const searchInputRef = useRef(null);
  const modalRef = useRef(null);
  
    const inputRef = useRef(null);

   
  // Focus search input when modal opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Handle search query changes with debounce
  useEffect(() => {
    if (searchQuery) {
      const timeoutId = setTimeout(() => {
        performGlobalSearch(searchQuery, studentsData, teachersData);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, studentsData, teachersData, performGlobalSearch]);

  // Handle escape key
  useEffect(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape' && isSearchOpen) {
      closeSearch();
    }
  };
  document.addEventListener('keydown', handleEscape);
  return () => document.removeEventListener('keydown', handleEscape);
}, [isSearchOpen, closeSearch]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeSearch();
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isSearchOpen, closeSearch]);

  const handleSearchItemClick = (item) => {
    if (item.action) {
      item.action();
    }
  };

  const handleRecentSearchClick = (query) => {
    handleSearchChange(query);
    performGlobalSearch(query, studentsData, teachersData);
  };

  const popularSearches = getPopularSearches();

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 pt-20">
      <div 
        ref={modalRef}
        className={`w-full max-w-2xl mx-4 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border rounded-2xl shadow-2xl overflow-hidden`}
      >
        {/* Search Input */}
        <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search students, teachers, pages, and more..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className={`w-full pl-12 pr-12 py-4 text-lg rounded-xl border-0 focus:ring-2 focus:ring-blue-500 ${
                isDark 
                  ? 'bg-gray-700 text-white placeholder-gray-400' 
                  : 'bg-gray-50 text-gray-900 placeholder-gray-500'
              } transition-all`}
            />
            <button
              onClick={closeSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search Stats */}
          {searchQuery && searchResults.length > 0 && (
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <span>
                Found {searchResults.reduce((acc, category) => acc + category.count, 0)} results
              </span>
            </div>
          )}
        </div>

        {/* Search Content */}
        <div className="max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-12 text-center">
              <div className={`inline-block animate-spin rounded-full h-8 w-8 border-b-2 ${
                isDark ? 'border-blue-400' : 'border-blue-600'
              }`}></div>
              <p className={`mt-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Searching across your school data...
              </p>
            </div>
          ) : searchQuery && searchResults.length === 0 ? (
            <div className="p-12 text-center">
              <Search className={`mx-auto h-16 w-16 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
              <p className={`mt-4 text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                No results found
              </p>
              <p className={`mt-2 text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                Try different keywords or check spelling
              </p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="py-2">
              {searchResults.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-6 last:mb-0">
                  <div className={`px-6 py-2 flex items-center justify-between ${
                    isDark ? 'bg-gray-750' : 'bg-gray-50'
                  }`}>
                    <h3 className={`text-sm font-semibold ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {category.category}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {category.count}
                    </span>
                  </div>
                  
                  {category.items.map((item, itemIndex) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={itemIndex}
                        onClick={() => handleSearchItemClick(item)}
                        className={`w-full px-6 py-4 text-left hover:bg-gray-50 ${
                          isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                        } transition-colors duration-200 flex items-start space-x-4 group`}
                      >
                        <div className={`p-2 rounded-xl ${
                          item.type === 'student' 
                            ? isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
                            : item.type === 'teacher' 
                            ? isDark ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-600'
                            : isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
                        }`}>
                          <Icon size={18} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className={`font-semibold truncate ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                              {item.title}
                            </p>
                            {item.type === 'student' && item.data?.studentId && (
                              <span className={`text-xs px-2 py-1 rounded-full font-mono ${
                                isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {item.data.studentId}
                              </span>
                            )}
                          </div>
                          
                          <p className={`text-sm truncate mb-2 ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {item.subtitle}
                          </p>
                          
                          {item.description && (
                            <p className={`text-xs truncate ${
                              isDark ? 'text-gray-500' : 'text-gray-500'
                            }`}>
                              {item.description}
                            </p>
                          )}

                          {/* Additional details for students/teachers */}
                          {item.data && (item.type === 'student' || item.type === 'teacher') && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {item.data.email && (
                                <div className="flex items-center space-x-1">
                                  <Mail size={10} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                                  <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                    {item.data.email}
                                  </span>
                                </div>
                              )}
                              {item.data.phone && (
                                <div className="flex items-center space-x-1">
                                  <Phone size={10} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                                  <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                    {item.data.phone}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        
                        <ChevronRight size={16} className={`${
                          isDark ? 'text-gray-500' : 'text-gray-400'
                        } group-hover:translate-x-1 transition-transform`} />
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          ) : (
            // Default state - show recent searches and suggestions
            <div className="py-4">
              {recentSearches.length > 0 && (
                <div className="mb-6">
                  <div className="px-6 py-2 flex items-center justify-between">
                    <h3 className={`text-sm font-semibold flex items-center space-x-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <Clock size={14} />
                      <span>Recent Searches</span>
                    </h3>
                    <button
                      onClick={clearRecentSearches}
                      className={`text-xs ${
                        isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                      } transition-colors`}
                    >
                      Clear
                    </button>
                  </div>
                  
                  <div className="px-6 space-y-1">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleRecentSearchClick(search)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                          isDark 
                            ? 'text-gray-300 hover:bg-gray-700' 
                            : 'text-gray-700 hover:bg-gray-100'
                        } transition-colors flex items-center space-x-2`}
                      >
                        <Clock size={12} className="text-gray-400" />
                        <span>{search}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular searches */}
              <div>
                <div className="px-6 py-2">
                  <h3 className={`text-sm font-semibold flex items-center space-x-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <TrendingUp size={14} />
                    <span>Popular Searches</span>
                  </h3>
                </div>
                
                <div className="px-6 space-y-1">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearchClick(search)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                        isDark 
                          ? 'text-gray-300 hover:bg-gray-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      } transition-colors flex items-center space-x-2`}
                    >
                      <TrendingUp size={12} className="text-gray-400" />
                      <span>{search}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`px-6 py-4 border-t ${
          isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
        } flex items-center justify-between text-xs ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <div className="flex items-center space-x-4">
            <kbd className={`px-2 py-1 rounded ${
              isDark ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-300'
            }`}>
              ↵
            </kbd>
            <span>to select</span>
          </div>
          <div className="flex items-center space-x-4">
            <kbd className={`px-2 py-1 rounded ${
              isDark ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-300'
            }`}>
              esc
            </kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;