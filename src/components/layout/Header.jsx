import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import MobileMenu from './MobileMenu';
import logo from '../../logo.svg'; // Adjust the path as needed

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600 transition';
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="HealthEvo Logo" className="h-8 mr-2" />
            <span className="font-bold text-xl text-gray-800">HealthEvo</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className={isActive('/')}>Beranda</Link>
            <Link to="/artikel" className={isActive('/artikel')}>Artikel</Link>
            <Link to="/video" className={isActive('/video')}>Video</Link>
            <Link to="/kuis" className={isActive('/kuis')}>Kuis</Link>
            <Link to="/informasi" className={isActive('/informasi')}>Informasi</Link>
            <Link to="/lokasi" className={isActive('/lokasi')}>Lokasi</Link>
          </nav>
          <button 
            onClick={() => setIsMenuOpen(true)} 
            className="md:hidden text-gray-500 focus:outline-none"
          >
            <FontAwesomeIcon icon={faBars} className="text-xl" />
          </button>
        </div>
      </header>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Header;