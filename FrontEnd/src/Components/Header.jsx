import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import logo from "F:/Projects/PropExchange/FrontEnd/src/assets/PropExchange.png";
import { useSelector } from 'react-redux';
import {FaSearch} from 'react-icons/fa'
const Header = () => {
  const navigate=useNavigate();
  const { currentUser } = useSelector(state => state.user);
  const [searchTerm,setSearchTerm]=useState('');
  const handleSubmit=(e)=>{
    e.preventDefault();
    const urlParams=new URLSearchParams(window.location.search);
    urlParams.set('searchTerm',searchTerm);
    const searchQuery=urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }
  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search);
    const searchTermFromUrl=urlParams.get('searchTerm');
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl);
    }

  },[location.search])
  return (
    <header className=" bg-[#7AB2D3] shadow-md fixed top-0 left-0 w-full h-16 z-50">
      <div className="h-full flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto px-4">
        {/* Logo */}
        <div className="h-full w-full md:w-1/4 flex justify-center md:justify-start items-center py-2 md:py-0">
          <img
            src={logo}
            alt="Logo"
            className="h-16 md:h-12 lg:h-14 object-contain"
          />
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="w-full md:w-2/5 flex justify-center md:justify-end items-center mt-2 md:mt-0">
          <input
            type="text"
            placeholder="Search"
            className="w-4/5 md:w-full max-w-[250px] p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch></FaSearch>
          </button>
        </form>

        {/* Navigation */}
        <ul className="flex gap-4 text-sm md:text-base lg:text-lg mt-2 md:mt-0 items-center">
          <Link to='/home'>
            <li className="hover:text-blue-700 cursor-pointer">Home</li>
          </Link>
          <Link to='/about'>
            <li className="hover:text-blue-700 cursor-pointer">About</li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="User Avatar"
                className="w-8 h-8 rounded-full object-cover border-1 border-gray-300"
              />
            ) : (
              <li className="hover:text-blue-700 cursor-pointer">Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
