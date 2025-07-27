import { useState } from 'react';
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">QuestPay</span>
            </a>
          </div>

          {/* Middle: Navigation Links (Desktop) */}
          <div className="hidden md:flex space-x-8">
            <a
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="/questions"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Questions
            </a>
            <a
              href="/tags"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Tags
            </a>
            <a
              href="/users"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Users
            </a>
          </div>

          {/* Search Bar */}
          <div className="flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search questions..."
                className="border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <Cross1Icon className="h-6 w-6" />
              ) : (
                <HamburgerMenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-2">
            <a
              href="/"
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </a>
            <a
              href="/questions"
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              Questions
            </a>
            <a
              href="/tags"
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              Tags
            </a>
            <a
              href="/users"
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              Users
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;