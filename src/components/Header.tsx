import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Moon, Sun, Home, User, Heart, MessageCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePostStore } from '../store/postStore';

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const { theme, toggleTheme } = useTheme();
  const { setSearchTerm } = usePostStore();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchValue);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          SocialApp
        </Link>

        {/* Search Bar - Hide on mobile */}
        <form 
          onSubmit={handleSearch}
          className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 flex-1 max-w-md mx-4"
        >
          <Search size={18} className="text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search posts..."
            className="bg-transparent outline-none ml-2 w-full text-gray-700 dark:text-gray-200"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>

        {/* Navigation */}
        <nav className="flex items-center space-x-4">
          <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            <Home size={24} />
          </Link>
          
          <Link to="/profile/u1" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            <User size={24} />
          </Link>
          
          {/* Theme toggle button */}
          <button 
            onClick={toggleTheme} 
            className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 focus:outline-none transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </nav>
      </div>
      
      {/* Mobile Search - Only visible on mobile */}
      <form 
        onSubmit={handleSearch}
        className="md:hidden flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 mx-4 mb-3"
      >
        <Search size={18} className="text-gray-500 dark:text-gray-400" />
        <input
          type="text"
          placeholder="Search posts..."
          className="bg-transparent outline-none ml-2 w-full text-gray-700 dark:text-gray-200"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>
    </header>
  );
};

export default Header;