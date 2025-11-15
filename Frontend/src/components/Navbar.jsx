import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, getUser, logout } from '../utils/auth';

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = getUser();
  const profileMenuRef = useRef(null);

  const handlePostServiceClick = () => {
    if (isAuthenticated()) {
      navigate('/post-service');
    } else {
      navigate('/login');
    }
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setProfileMenuOpen(false);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const authenticated = isAuthenticated();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
            Kaarya
          </Link>

          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-600">Services</Link>
            
            <button
              onClick={handlePostServiceClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Post a Service
            </button>

            {!authenticated && (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            )}

            {authenticated && (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200"
                >
                  <span className="text-gray-700">{user?.name?.split(' ')[0]}</span>
                  <img
                    src={`https://ui-avatars.com/api/?name=${user?.name}&background=1D4ED8&color=fff`}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-md border rounded-lg py-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600"
          >
            {isMobileMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 py-3 space-y-2">
            <Link to="/" className="block text-gray-700" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/services" className="block text-gray-700" onClick={() => setMobileMenuOpen(false)}>
              Services
            </Link>
            <button
              onClick={handlePostServiceClick}
              className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Post a Service
            </button>

            {!authenticated && (
              <>
                <Link
                  to="/login"
                  className="block text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 bg-blue-600 text-white rounded-lg text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}

            {authenticated && (
              <>
                <Link
                  to="/profile"
                  className="block px-2 py-2 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-2 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
