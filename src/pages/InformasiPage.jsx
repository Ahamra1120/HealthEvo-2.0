import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeartbeat, 
  faBandAid, 
  faBurn, 
  faBone, 
  faHeadSideCough, 
  faAllergies 
} from '@fortawesome/free-solid-svg-icons';

const InformasiPage = () => {
  return (
    <main>
      {/* Page Header */}
      <section className="hero-pattern text-white py-10" style={{ backgroundColor: '#2563eb' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Informasi P3K</h1>
          <p className="text-lg">Pelajari cara menangani berbagai kondisi darurat medis</p>
        </div>
      </section>

      {/* Information Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Category 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-red-600 h-24 flex items-center justify-center">
                <FontAwesomeIcon icon={faHeartbeat} className="text-white text-4xl" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Penanganan Henti Jantung</h3>
                <p className="text-gray-600 mb-4">
                  Pelajari cara melakukan CPR dan menggunakan AED untuk membantu korban henti jantung.
                </p>
                <Link to="/course-1" className="text-blue-600 hover:text-blue-800 font-medium">
                  Mulai Kursus P3K Dasar
                </Link>
              </div>
            </div>

            {/* Category 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-blue-600 h-24 flex items-center justify-center">
                <FontAwesomeIcon icon={faBandAid} className="text-white text-4xl" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Penanganan Luka</h3>
                <p className="text-gray-600 mb-4">
                  Pelajari cara menangani luka, pendarahan, dan mencegah infeksi dengan benar.
                </p>
                <Link to="/informasi/luka" className="text-blue-600 hover:text-blue-800 font-medium">
                  Pelajari Selengkapnya
                </Link>
              </div>
            </div>

            {/* Category 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-yellow-600 h-24 flex items-center justify-center">
                <FontAwesomeIcon icon={faBurn} className="text-white text-4xl" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Luka Bakar</h3>
                <p className="text-gray-600 mb-4">
                  Pelajari cara menangani berbagai tingkat luka bakar dari ringan hingga berat.
                </p>
                <Link to="/informasi/luka-bakar" className="text-blue-600 hover:text-blue-800 font-medium">
                  Pelajari Selengkapnya
                </Link>
              </div>
            </div>

            {/* Category 4 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-green-600 h-24 flex items-center justify-center">
                <FontAwesomeIcon icon={faBone} className="text-white text-4xl" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Patah Tulang & Keseleo</h3>
                <p className="text-gray-600 mb-4">
                  Pelajari cara menangani cedera tulang, sendi, dan otot dengan benar.
                </p>
                <Link to="/informasi/cedera-tulang" className="text-blue-600 hover:text-blue-800 font-medium">
                  Pelajari Selengkapnya
                </Link>
              </div>
            </div>

            {/* Category 5 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-purple-600 h-24 flex items-center justify-center">
                <FontAwesomeIcon icon={faHeadSideCough} className="text-white text-4xl" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Tersedak & Kesulitan Bernapas</h3>
                <p className="text-gray-600 mb-4">
                  Pelajari cara membantu seseorang yang tersedak dan mengalami kesulitan bernapas.
                </p>
                <Link to="/informasi/tersedak" className="text-blue-600 hover:text-blue-800 font-medium">
                  Pelajari Selengkapnya
                </Link>
              </div>
            </div>

            {/* Category 6 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-pink-600 h-24 flex items-center justify-center">
                <FontAwesomeIcon icon={faAllergies} className="text-white text-4xl" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Keracunan & Alergi</h3>
                <p className="text-gray-600 mb-4">
                  Pelajari cara menangani keracunan dan reaksi alergi dengan benar.
                </p>
                <Link to="/informasi/keracunan-alergi" className="text-blue-600 hover:text-blue-800 font-medium">
                  Pelajari Selengkapnya
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* First Aid Kit Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Kotak P3K Standar</h2>
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img src="/images/p3k-kit.jpg" alt="Kotak P3K" className="rounded-xl shadow-sm w-full h-auto" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Isi Kotak P3K Standar</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        <span>Perban steril berbagai ukuran</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        <span>Plester luka (Band-Aid)</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        <span>Plester medis</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        <span>Kain segitiga (mitella)</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        <span>Kompres dingin instan</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        <span>Gunting</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        <span>Pinset</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        <span>Sarung tangan sekali pakai</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        <span>Antiseptik (betadine)</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        <span>Alkohol 70%</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        <span>Masker wajah</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        <span>Termometer</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="mt-6 text-gray-600">
                  Pastikan untuk memeriksa isi kotak P3K secara berkala dan mengganti item yang sudah kedaluwarsa atau digunakan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">Nomor Telepon Darurat</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white bg-opacity-10 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">Nomor Darurat Nasional</h3>
              <p className="text-3xl font-bold">112</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">Ambulans</h3>
              <p className="text-3xl font-bold">118</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">Pemadam Kebakaran</h3>
              <p className="text-3xl font-bold">113</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">Polisi</h3>
              <p className="text-3xl font-bold">110</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Siap untuk belajar lebih lanjut?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Tingkatkan pengetahuan Anda dengan artikel, video, dan kuis interaktif kami.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/artikel" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300">
              Baca Artikel
            </Link>
            <Link to="/video" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300">
              Tonton Video
            </Link>
            <Link to="/kuis" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300">
              Ikuti Kuis
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default InformasiPage;