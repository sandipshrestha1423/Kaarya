import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, getUser, logout } from "../utils/auth";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const user = getUser();

  const handlePostClick = () => {
    if (isAuthenticated()) {
      navigate("/post-service");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
            Kaarya
          </Link>

          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-blue-600">How It Works</Link>

            <button
              onClick={handlePostClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Post a Service
            </button>

            {!isAuthenticated() && (
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

            {isAuthenticated() && (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200"
                >
                  <span className="text-gray-700">{user?.name?.split(" ")[0]}</span>
                  <img
                    src={`https://ui-avatars.com/api/?name=${user?.name}&background=1D4ED8&color=fff`}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-md border rounded-lg py-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setProfileOpen(false)}
                    >
                      Profile
                    </Link>

                    <Link
                      to="/my-services"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setProfileOpen(false)}
                    >
                      My Services
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
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 py-3 space-y-2">
            <Link to="/" className="block text-gray-700" onClick={() => setIsOpen(false)}>
              Home
            </Link>

            <Link to="/about" className="block text-gray-700" onClick={() => setIsOpen(false)}>
              About
            </Link>

            <Link to="/how-it-works" className="block text-gray-700" onClick={() => setIsOpen(false)}>
              How It Works
            </Link>

            <button
              onClick={() => {
                handlePostClick();
                setIsOpen(false);
              }}
              className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Post a Service
            </button>

            {!isAuthenticated() && (
              <>
                <Link
                  to="/login"
                  className="block text-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="block px-4 py-2 bg-blue-600 text-white rounded-lg text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}

            {isAuthenticated() && (
              <>
                <Link
                  to="/profile"
                  className="block px-2 py-2 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>

                <Link
                  to="/my-services"
                  className="block px-2 py-2 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  My Services
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
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
