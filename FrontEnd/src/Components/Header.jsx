import React from 'react';
import logo from "F:/Projects/PropExchange/FrontEnd/src/assets/PropExchange.png";

const Header = () => {
  return (
    <header className="h-[10vh] bg-[#7AB2D3] shadow-md top-0 fixed w-[100%]">
      <div className="h-full flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto px-4">
        {/* Logo */}
        <div className="h-full w-full md:w-2/5 flex justify-center md:justify-start items-center py-2 md:py-0">
          <img src={logo} alt="Logo" className="h-40 md:h-12 lg:h-14 object-contain" />
        </div>
        {/* Search Bar */}
        <form className="w-full md:w-2/5 flex justify-center md:justify-end items-center mt-2 md:mt-0">
          <input
            type="text"
            placeholder="Search"
            className="w-4/5 md:w-full max-w-[250px] p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>
        {/* Navigation */}
        <ul className="flex gap-4 text-sm md:text-base lg:text-lg mt-2 md:mt-0">
          <li className="hover:text-blue-700 cursor-pointer">Home</li>
          <li className="hover:text-blue-700 cursor-pointer">About</li>
          <li className="hover:text-blue-700 cursor-pointer">Sign in</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
