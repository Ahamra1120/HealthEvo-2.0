import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">HealthEvo</h3>
            <p className="text-gray-400">Aplikasi edukasi penanganan pertolongan pertama pada kecelakaan</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Tautan</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Beranda</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Tentang Kami</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Materi</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Kontak</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Materi</h4>
            <ul className="space-y-2">
              <li><Link to="/informasi" className="text-gray-400 hover:text-white">Informasi</Link></li>
              <li><Link to="/video" className="text-gray-400 hover:text-white">Video Edukasi</Link></li>
              <li><Link to="/artikel" className="text-gray-400 hover:text-white">Artikel</Link></li>
              <li><Link to="/kuis" className="text-gray-400 hover:text-white">Kuis</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Hubungi Kami</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                <span>info@pintarp3k.id</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                <span>+62 123 4567 890</span>
              </li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2025 HealthEvo. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;