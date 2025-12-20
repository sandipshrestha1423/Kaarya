import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth(); // Use global auth state

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePostClick = () => {
    if (user) {
      navigate("/post-service");
    } else {
      navigate("/login");
    }
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  // Simplified logic for classes
  // If scrolled: white background (light) or gray-900 (dark)
  // If not scrolled: transparent (depends on page background)
  const navBgClass = scrolled 
    ? "bg-white/90 dark:bg-gray-900/90 shadow-md backdrop-blur-sm" 
    : "bg-transparent";

  // Text colors: Always ensure contrast. 
  // Dark mode text is always light gray/white. Light mode text is dark gray.
  const linkClass = (path) =>
    `text-sm font-medium transition-colors duration-200 ${
      location.pathname === path
        ? "text-indigo-600 dark:text-indigo-400"
        : "text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
    }`;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 py-4 ${navBgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
            <Link
            to="/"
            className="text-2xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 hover:opacity-80 transition"
          >
            Kaarya
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className={linkClass("/")}>
              Home
            </Link>
            <Link to="/about" className={linkClass("/about")}>
              About
            </Link>
            <Link to="/how-it-works" className={linkClass("/how-it-works")}>
              How It Works
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            <button
              onClick={handlePostClick}
              className="px-5 py-2.5 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Post a Service
            </button>

            {user ? (
              <ProfileMenu />
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 border border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 font-medium rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
             {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-200 focus:outline-none"
            >
               {theme === "dark" ? "☀️" : "🌙"}
            </button>

            {user && <ProfileMenu />}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg absolute top-full left-0 w-full border-t border-gray-100 dark:border-gray-800">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/"
              className="block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <Link
              to="/how-it-works"
              className="block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
              onClick={closeMobileMenu}
            >
              How It Works
            </Link>

            <button
              onClick={() => {
                handlePostClick();
                closeMobileMenu();
              }}
              className="block w-full text-center px-4 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium shadow-md"
            >
              Post a Service
            </button>

            {!user ? (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Link
                  to="/login"
                  className="block text-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block text-center px-4 py-2 border border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                  onClick={closeMobileMenu}
                >
                  Register
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;