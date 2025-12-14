import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import ProfileMenu from "./ProfileMenu";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, [location.pathname]);

  const handlePostClick = () => {
    if (isAuth) {
      navigate("/post-service");
    } else {
      navigate("/login");
    }
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-700"
          >
            Kaarya
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              About
            </Link>
            <Link
              to="/how-it-works"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              How It Works
            </Link>

            <button
              onClick={handlePostClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Post a Service
            </button>

            {isAuth ? (
              <ProfileMenu />
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {isAuth && <ProfileMenu />}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 py-3 space-y-2">
            <Link
              to="/"
              className="block text-gray-700 hover:text-blue-600"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block text-gray-700 hover:text-blue-600"
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <Link
              to="/how-it-works"
              className="block text-gray-700 hover:text-blue-600"
              onClick={closeMobileMenu}
            >
              How It Works
            </Link>

            <button
              onClick={() => {
                handlePostClick();
                closeMobileMenu();
              }}
              className="block w-full text-left px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Post a Service
            </button>

            {!isAuth ? (
              <>
                <Link
                  to="/login"
                  className="block text-gray-700 hover:text-blue-600"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
                  onClick={closeMobileMenu}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="block text-gray-700 hover:text-blue-600"
                  onClick={closeMobileMenu}
                >
                  My Profile
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );

}

export default Navbar;
