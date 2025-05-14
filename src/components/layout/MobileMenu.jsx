import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat, faTimes } from '@fortawesome/free-solid-svg-icons';

const MobileMenu = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600 transition';
  };

  return (
    <div className={`mobile-menu fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-20 p-5 ${isOpen ? 'active' : ''}`}>
      <div className="flex justify-between items-center mb-6">
        <Link to="/" className="flex items-center">
          <FontAwesomeIcon icon={faHeartbeat} className="text-red-600 text-2xl mr-2" />
          <span className="font-bold text-xl text-gray-800">Pintar P3K</span>
        </Link>
        <button onClick={onClose} className="text-gray-500 focus:outline-none">
          <FontAwesomeIcon icon={faTimes} className="text-xl" />
        </button>
      </div>
      <nav className="flex flex-col space-y-4">
        <Link to="/" className={`${isActive('/')} py-2 border-b border-gray-100`}>Beranda</Link>
        <Link to="/artikel" className={`${isActive('/artikel')} py-2 border-b border-gray-100`}>Artikel</Link>
        <Link to="/video" className={`${isActive('/video')} py-2 border-b border-gray-100`}>Video</Link>
        <Link to="/kuis" className={`${isActive('/kuis')} py-2 border-b border-gray-100`}>Kuis</Link>
        <Link to="/informasi" className={`${isActive('/informasi')} py-2 border-b border-gray-100`}>Informasi</Link>
        <Link to="/lokasi" className={`${isActive('/lokasi')} py-2 border-b border-gray-100`}>Lokasi</Link>
      </nav>
    </div>
  );
};

export default MobileMenu;