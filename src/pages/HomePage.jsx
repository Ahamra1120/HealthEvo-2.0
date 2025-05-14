import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faInfoCircle, faVideo, faQuestionCircle, faNewspaper,
  faHeartbeat, faBurn, faBone
} from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero-pattern text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Aplikasi Edukasi Penanganan P3K</h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">Pelajari cara penanganan pertolongan pertama pada kecelakaan dengan mudah dan interaktif</p>
          <button className="bg-white text-sky-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-sky-50 transition duration-300">
            Mulai Belajar
          </button>
        </div>
      </section>

      {/* Emergency Healthcare Services Warning */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-red-700 rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center">
            <div className="mr-0 md:mr-6 mb-4 md:mb-0 flex-shrink-0">
              <div className="w-40 h-40 rounded-full bg-white/10 flex items-center justify-center">
                <FontAwesomeIcon icon={faHeartbeat} className="text-white text-6xl" />
              </div>
            </div>
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-2xl font-bold text-white mb-2">Layanan Darurat Kesehatan</h2>
              <p className="text-red-100 mb-4">Temukan informasi dan lokasi fasilitas kesehatan terdekat untuk <b>situasi darurat</b>. Kami menyediakan data rumah sakit, puskesmas, dan klinik di sekitar Anda.</p>
              <Link to="/lokasi" className="inline-block bg-white text-red-700 font-semibold px-6 py-3 rounded-full hover:bg-red-50 transition duration-300">
                CARI FASKES TERDEKAT
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Menu */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">Pilih Materi Pembelajaran</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="menu-item bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faInfoCircle} className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Informasi</h3>
              <p className="mb-4 text-blue-100">Pelajari dasar-dasar penanganan P3K dan informasi penting lainnya</p>
              <Link to="/informasi" className="inline-block bg-white text-blue-600 px-4 py-2 rounded-full font-medium hover:bg-blue-50 transition duration-300">
                Lihat Detail
              </Link>
            </div>
            
            <div className="menu-item bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faVideo} className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Video Edukasi</h3>
              <p className="mb-4 text-red-100">Tonton video tutorial penanganan P3K dalam berbagai situasi</p>
              <Link to="/video" className="inline-block bg-white text-red-600 px-4 py-2 rounded-full font-medium hover:bg-red-50 transition duration-300">
                Tonton Video
              </Link>
            </div>
            
            <div className="menu-item bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faNewspaper} className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Artikel</h3>
              <p className="mb-4 text-green-100">Baca artikel informatif tentang penanganan kecelakaan dan P3K</p>
              <Link to="/artikel" className="inline-block bg-white text-green-600 px-4 py-2 rounded-full font-medium hover:bg-green-50 transition duration-300">
                Baca Artikel
              </Link>
            </div>
            
            <div className="menu-item bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faQuestionCircle} className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Kuis</h3>
              <p className="mb-4 text-purple-100">Uji pengetahuan Anda tentang P3K dengan kuis interaktif</p>
              <Link to="/kuis" className="inline-block bg-white text-purple-600 px-4 py-2 rounded-full font-medium hover:bg-purple-50 transition duration-300">
                Mulai Kuis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">Materi Terbaru</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-sky-500 relative">
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <FontAwesomeIcon icon={faHeartbeat} className="text-white text-5xl" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Penanganan Henti Jantung</h3>
                <p className="text-gray-600 mb-4">Pelajari cara melakukan CPR dan penanganan henti jantung dengan benar</p>
                <Link to="/artikel" className="text-sky-600 font-medium hover:text-sky-700">Baca selengkapnya →</Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-red-500 relative">
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <FontAwesomeIcon icon={faBurn} className="text-white text-5xl" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Penanganan Luka Bakar</h3>
                <p className="text-gray-600 mb-4">Ketahui cara menangani luka bakar ringan hingga berat dengan tepat</p>
                <Link to="/artikel" className="text-sky-600 font-medium hover:text-sky-700">Baca selengkapnya →</Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-yellow-500 relative">
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <FontAwesomeIcon icon={faBone} className="text-white text-5xl" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Penanganan Patah Tulang</h3>
                <p className="text-gray-600 mb-4">Pelajari teknik immobilisasi dan penanganan patah tulang sementara</p>
                <Link to="/artikel" className="text-sky-600 font-medium hover:text-sky-700">Baca selengkapnya →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-12 bg-sky-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Apa Kata Mereka?</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 p-6 rounded-xl">
              <p className="text-lg italic mb-4">"Aplikasi ini sangat membantu saya memahami dasar-dasar P3K. Materinya lengkap dan mudah dipahami. Saya merasa lebih siap menghadapi situasi darurat sekarang."</p>
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-sky-800 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xl font-bold">Q</span>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold">Quinza Nur Aulia Fitri</h4>
                  <p className="text-sky-200">Siswi MTsN 18 Jakarta</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Siap Mempelajari P3K?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Daftar sekarang dan dapatkan akses ke semua materi edukasi P3K secara gratis</p>
          <button className="bg-sky-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-sky-700 transition duration-300">
            Daftar Sekarang
          </button>
        </div>
      </section>
    </main>
  );
};

export default HomePage;