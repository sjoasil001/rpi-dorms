<<<<<<< HEAD
import React, { useState } from 'react';
import dormLogo from '../assets/dormlogo.svg';
import '@fontsource/inter';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname === '/' ? 'Home' : '');

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
    { name: 'Dorms', path: '/dorms' },
    { name: 'Map', path: '/map' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 font-sans w-full bg-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={dormLogo} alt="logo" className="w-48 h-auto" />
        </div>

        {/* Center Rounded Nav */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-full px-4 py-3.5 flex space-x-1">
          {navLinks.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              onClick={() => setActiveLink(name)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition duration-200 ${
                activeLink === name
                  ? 'bg-[#c8102e] text-white shadow'
                  : 'text-black hover:text-[#c8102e]'
              }`}
            >
              {name}
            </Link>
          ))}
        </div>

        {/* Upload File Button */}
        <label className="bg-black text-white px-5 py-2 rounded-full font-semibold text-lg tracking-wider hover:opacity-90 cursor-pointer">
          Upload
          <input type="file" className="hidden" />
=======
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/DORMS.svg"; // Import the logo image
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="navbar-logo">
        <img src={logo} alt="RPI Dorms Logo" />
      </div>

      {/* Upload Button */}
      <div className="navbar-upload">
        <input type="file" id="fileUpload" className="hidden" />
        <label htmlFor="fileUpload" className="upload-button">
          Upload
>>>>>>> 2872e9d8e65cbc70a56316fb22d2af6305b7eafb
        </label>
      </div>
    </nav>
  );
<<<<<<< HEAD
};
=======
}
>>>>>>> 2872e9d8e65cbc70a56316fb22d2af6305b7eafb

export default Navbar;
