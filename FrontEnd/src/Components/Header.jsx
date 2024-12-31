import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import logo from "F:/Projects/PropExchange/FrontEnd/src/assets/PropExchange.png";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-gradient-to-r from-blue-400 to-blue-700 shadow-md fixed top-0 left-0 w-full h-16 z-50">
      <div className="h-full flex justify-between items-center max-w-6xl mx-auto px-4">
        {/* Logo */}
        <div className="h-full flex-shrink-0">
          <img
            src={logo}
            alt="Logo"
            className="h-12 md:h-14 lg:h-16 object-contain"
          />
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="hidden md:flex items-center flex-grow max-w-xs md:max-w-md mx-4"
        >
          <div className="flex items-center bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden w-full">
            <input
              type="text"
              placeholder="Search properties..."
              className="w-full p-2 text-gray-700 placeholder-gray-400 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="p-2 bg-blue-600 text-white hover:bg-blue-800 transition duration-300 rounded-3xl">
              <FaSearch className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-xl hover:text-yellow-300 transition duration-300"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } md:flex gap-4 md:gap-6 text-sm md:text-base lg:text-lg items-center absolute md:relative top-16 md:top-0 left-0 md:left-auto bg-blue-600 md:bg-transparent w-full md:w-auto flex-col md:flex-row p-4 md:p-0 z-50`}
        >
          <Link to="/home" onClick={() => setMenuOpen(false)}>
            <li className="text-white hover:text-yellow-300 cursor-pointer transition duration-300">
              Home
            </li>
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            <li className="text-white hover:text-yellow-300 cursor-pointer transition duration-300">
              About
            </li>
          </Link>
          <Link to="/profile" onClick={() => setMenuOpen(false)}>
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="User Avatar"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-white hover:border-yellow-300 transition duration-300"
              />
            ) : (
              <li className="text-white hover:text-yellow-300 cursor-pointer transition duration-300">
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
