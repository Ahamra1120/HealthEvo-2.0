import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBookmark, faArrowLeft, faArrowRight, faCheckCircle, faPlayCircle, faLock, 
  faClock, faBookMedical, faAward, faFilePdf, faFileExcel, 
  faLink, faCalendarAlt, faUser 
} from '@fortawesome/free-solid-svg-icons';

const Course1Page = () => {
  // State for accordion content
  const [activeAccordion, setActiveAccordion] = useState([0]);
  const [completedLessons, setCompletedLessons] = useState(1);
  const [bookmarked, setBookmarked] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', color: '' });
  
  const totalLessons = 4;
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

  // Toggle accordion
  const toggleAccordion = (index) => {
    if (activeAccordion.includes(index)) {
      setActiveAccordion(activeAccordion.filter(item => item !== index));
    } else {
      setActiveAccordion([...activeAccordion, index]);
    }
  };

  // Mark lesson as complete
  const markComplete = (index) => {
    if (!completedLessons.includes(index)) {
      setCompletedLessons([...completedLessons, index]);
      showNotification("Pelajaran ditandai selesai", "green");
    }
  };

  // Mark lesson as incomplete
  const markIncomplete = (index) => {
    setCompletedLessons(completedLessons.filter(item => item !== index));
    showNotification("Pelajaran ditandai belum selesai", "blue");
  };

  // Toggle bookmark
  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
    showNotification(
      bookmarked ? "Kursus dihapus dari bookmark" : "Kursus ditambahkan ke bookmark",
      bookmarked ? "blue" : "green"
    );
  };

  // Show notification
  const showNotification = (message, color) => {
    setNotification({ show: true, message, color });
    setTimeout(() => {
      setNotification({ ...notification, show: false });
    }, 3000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <section className="hero-pattern text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Kursus P3K Dasar</h1>
          <p className="text-lg mb-4">Pelajari dasar-dasar pertolongan pertama pada kecelakaan</p>
          <div className="flex justify-center">
            <div className="bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 rounded-lg px-8 py-4 inline-flex items-center shadow-lg backdrop-blur-sm">
              <div className="flex items-center mr-6 border-r border-white border-opacity-30 pr-6">
                <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
                  <FontAwesomeIcon icon={faBookmark} className="text-xl" />
                </div>
                <div>
                  <span className="text-sm opacity-80">Jumlah Modul</span>
                  <p className="text-lg font-semibold">4 Modul</p>
                </div>
              </div>
              <div className="flex items-center mr-6 border-r border-white border-opacity-30 pr-6">
                <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-xl" />
                </div>
                <div>
                  <span className="text-sm opacity-80">Durasi</span>
                  <p className="text-lg font-semibold">3 Jam Belajar</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
                  <FontAwesomeIcon icon={faAward} className="text-xl" />
                </div>
                <div>
                  <span className="text-sm opacity-80">Level</span>
                  <p className="text-lg font-semibold">Pemula</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Progress */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-lg font-semibold text-gray-700">Kemajuan Belajar</h2>
              <div className="flex items-center">
                <div className="w-64 progress-bar mr-4">
                  <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <span className="text-sky-600 font-semibold">{progressPercentage}% Selesai</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button 
                className={`px-4 py-2 rounded-lg hover:bg-gray-200 transition flex items-center ${
                  bookmarked ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                }`}
                onClick={toggleBookmark}
              >
                <FontAwesomeIcon icon={faBookmark} className="mr-2" />{bookmarked ? 'Ditandai' : 'Tandai'}
              </button>
              <button className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition flex items-center">
                <FontAwesomeIcon icon={faPlayCircle} className="mr-2" />Lanjutkan Belajar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Two Column Layout */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar - Module List */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow p-5">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Modul Pembelajaran</h2>
                
                <div className="space-y-3">
                  {/* Module 1 - Active */}
                  <div className="border border-sky-200 rounded-lg bg-sky-50">
                    <div className="p-3 border-l-4 border-sky-600 rounded-l">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-sky-800">Modul 1: Dasar-Dasar P3K</h3>
                        <span className="bg-sky-600 text-white text-xs px-2 py-1 rounded-full">Aktif</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">4 pelajaran • 30 menit</div>
                    </div>
                  </div>
                  
                  {/* Module 2 - Locked */}
                  <div className="border border-gray-200 rounded-lg">
                    <div className="p-3">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-500">Modul 2: Peralatan P3K</h3>
                        <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                      </div>
                      <div className="text-sm text-gray-500 mt-1">3 pelajaran • 25 menit</div>
                    </div>
                  </div>
                  
                  {/* Module 3 - Locked */}
                  <div className="border border-gray-200 rounded-lg">
                    <div className="p-3">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-500">Modul 3: Penanganan Kasus</h3>
                        <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                      </div>
                      <div className="text-sm text-gray-500 mt-1">5 pelajaran • 45 menit</div>
                    </div>
                  </div>
                  
                  {/* Module 4 - Locked */}
                  <div className="border border-gray-200 rounded-lg">
                    <div className="p-3">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-500">Modul 4: Ujian & Sertifikasi</h3>
                        <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                      </div>
                      <div className="text-sm text-gray-500 mt-1">1 pelajaran • 50 menit</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-semibold mb-2 text-gray-700">Dukungan Kursus</h3>
                  <div className="space-y-2">
                    <a href="#" className="flex items-center text-gray-600 hover:text-sky-600">
                      <i className="fas fa-comments mr-2"></i> Forum Diskusi
                    </a>
                    <a href="#" className="flex items-center text-gray-600 hover:text-sky-600">
                      <i className="fas fa-download mr-2"></i> Unduh Materi
                    </a>
                    <a href="#" className="flex items-center text-gray-600 hover:text-sky-600">
                      <i className="fas fa-question-circle mr-2"></i> Bantuan
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Content - Current Module Content */}
            <div className="lg:w-3/4">
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-sky-700">Modul 1: Dasar-Dasar P3K</h2>
                  <span className="text-gray-500"><FontAwesomeIcon icon={faClock} className="inline mr-1" /> 30 menit</span>
                </div>
                
                <div className="mb-8">
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100 mb-4">
                    <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800" 
                         alt="P3K Introduction" className="w-full h-64 object-cover" />
                  </div>
                  <p className="text-gray-700 mb-4">
                    Pertolongan Pertama Pada Kecelakaan (P3K) adalah tindakan pertolongan yang diberikan 
                    terhadap korban dengan tujuan mencegah keadaan bertambah buruk sebelum korban mendapatkan 
                    pertolongan dari tenaga medis. Modul ini akan memperkenalkan Anda pada konsep dasar P3K 
                    dan prinsip-prinsip utama yang harus dipahami.
                  </p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <div className="mr-4"><FontAwesomeIcon icon={faCalendarAlt} className="inline mr-1" /> Terakhir diperbarui: 10 Mei 2025</div>
                    <div><FontAwesomeIcon icon={faUser} className="inline mr-1" /> Instruktur: dr. Budi Santoso</div>
                  </div>
                </div>
                
                {/* Lesson List - Accordion Style */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Daftar Pelajaran</h3>
                  
                  {/* Lesson 1 - Expanded */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div 
                      className="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleAccordion(0)}
                    >
                      <div className="flex items-center">
                        <div className="bg-sky-100 text-sky-700 w-8 h-8 rounded-full flex items-center justify-center font-semibold mr-3">1</div>
                        <h4 className="font-medium">Apa itu P3K?</h4>
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-600 mr-3"><FontAwesomeIcon icon={faCheckCircle} className="inline mr-1" /> Selesai</span>
                        <i className={`fas fa-chevron-down text-gray-400 transform ${activeAccordion.includes(0) ? 'rotate-180' : ''}`}></i>
                      </div>
                    </div>
                    {activeAccordion.includes(0) && (
                      <div className="p-4 border-t border-gray-200">
                        <div className="prose max-w-none">
                          <p className="text-gray-700 mb-4">P3K (Pertolongan Pertama Pada Kecelakaan) adalah perawatan segera yang diberikan kepada orang yang mengalami cedera atau penyakit mendadak sebelum bantuan medis profesional tersedia. Tujuan utama P3K adalah:</p>
                          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                            <li>Mempertahankan kehidupan</li>
                            <li>Mencegah kondisi memburuk</li>
                            <li>Mempromosikan pemulihan</li>
                            <li>Memberikan kenyamanan dan dukungan</li>
                          </ul>
                          <p className="text-gray-700">Pengetahuan dasar P3K sangat penting dimiliki oleh setiap orang karena kecelakaan dapat terjadi kapan saja dan di mana saja.</p>
                          
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex justify-between">
                              <span className="text-green-600"><FontAwesomeIcon icon={faCheckCircle} className="inline mr-1" /> Pelajaran selesai</span>
                              <button 
                                className="text-sky-600 hover:text-sky-800"
                                onClick={() => markIncomplete(0)}
                              >
                                Tandai belum selesai
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Lesson 2 - Not expanded */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div 
                      className="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleAccordion(1)}
                    >
                      <div className="flex items-center">
                        <div className="bg-sky-100 text-sky-700 w-8 h-8 rounded-full flex items-center justify-center font-semibold mr-3">2</div>
                        <h4 className="font-medium">Prinsip Dasar P3K</h4>
                      </div>
                      <div className="flex items-center">
                        <span className="text-blue-600 mr-3"><FontAwesomeIcon icon={faPlayCircle} className="inline mr-1" /> Sedang dipelajari</span>
                        <i className={`fas fa-chevron-down text-gray-400 transform ${activeAccordion.includes(1) ? 'rotate-180' : ''}`}></i>
                      </div>
                    </div>
                    {activeAccordion.includes(1) && (
                      <div className="p-4 border-t border-gray-200">
                        <div className="prose max-w-none">
                          <h3 className="text-xl font-semibold mb-4">Prinsip Dasar P3K</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-sky-50 p-4 rounded-lg">
                              <div className="bg-sky-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-3 text-xl font-bold">1</div>
                              <h3 className="text-xl font-semibold mb-2">Periksa</h3>
                              <p className="text-gray-700">Periksa keadaan sekitar dan kondisi korban. Pastikan area aman untuk Anda dan korban.</p>
                            </div>
                            <div className="bg-sky-50 p-4 rounded-lg">
                              <div className="bg-sky-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-3 text-xl font-bold">2</div>
                              <h3 className="text-xl font-semibold mb-2">Panggil</h3>
                              <p className="text-gray-700">Hubungi bantuan medis darurat segera jika diperlukan (119 untuk ambulans).</p>
                            </div>
                            <div className="bg-sky-50 p-4 rounded-lg">
                              <div className="bg-sky-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-3 text-xl font-bold">3</div>
                              <h3 className="text-xl font-semibold mb-2">Tolong</h3>
                              <p className="text-gray-700">Berikan pertolongan pertama sesuai dengan kondisi korban dan kemampuan Anda.</p>
                            </div>
                          </div>
                          
                          <div className="mt-6 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                            <h4 className="font-semibold text-yellow-800 mb-2">Poin Penting</h4>
                            <p className="text-yellow-800">Selalu prioritaskan keselamatan Anda sendiri. Jangan menjadi korban berikutnya!</p>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <button 
                              className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition"
                              onClick={() => markComplete(1)}
                            >
                              Tandai selesai
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Lesson 3 */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-gray-100">
                      <div className="flex items-center">
                        <div className="bg-gray-200 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center font-semibold mr-3">3</div>
                        <h4 className="font-medium">Penilaian Korban</h4>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-3"><FontAwesomeIcon icon={faLock} className="inline mr-1" /> Belum tersedia</span>
                        <i className="fas fa-chevron-down text-gray-400"></i>
                      </div>
                    </div>
                  </div>
                  
                  {/* Lesson 4 */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-gray-100">
                      <div className="flex items-center">
                        <div className="bg-gray-200 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center font-semibold mr-3">4</div>
                        <h4 className="font-medium">Kuis Modul 1</h4>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-3"><FontAwesomeIcon icon={faLock} className="inline mr-1" /> Belum tersedia</span>
                        <i className="fas fa-chevron-down text-gray-400"></i>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Module Additional Resources */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-lg text-gray-800 mb-4">Materi Tambahan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href="#" className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="bg-red-100 p-2 rounded-lg mr-3">
                        <FontAwesomeIcon icon={faFilePdf} className="text-red-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Panduan P3K Lengkap.pdf</h4>
                        <p className="text-sm text-gray-500">2.4 MB • Dokumen PDF</p>
                      </div>
                    </a>
                    <a href="#" className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        <FontAwesomeIcon icon={faPlayCircle}Alt className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Video: Prinsip ABCDE</h4>
                        <p className="text-sm text-gray-500">10:24 • Video Tutorial</p>
                      </div>
                    </a>
                    <a href="#" className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="bg-green-100 p-2 rounded-lg mr-3">
                        <FontAwesomeIcon icon={faFileExcel} className="text-green-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Checklist Peralatan P3K</h4>
                        <p className="text-sm text-gray-500">1.1 MB • Dokumen Excel</p>
                      </div>
                    </a>
                    <a href="#" className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="bg-purple-100 p-2 rounded-lg mr-3">
                        <FontAwesomeIcon icon={faLink} className="text-purple-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Tautan: WHO P3K Guidelines</h4>
                        <p className="text-sm text-gray-500">Sumber Eksternal</p>
                      </div>
                    </a>
                  </div>
                </div>
                
                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between border-t border-gray-200 pt-6">
                  <button disabled className="px-4 py-2 bg-gray-200 text-gray-500 rounded-lg flex items-center opacity-50 cursor-not-allowed">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Sebelumnya
                  </button>
                  <button className="px-4 py-2 bg-sky-600 text-white rounded-lg flex items-center hover:bg-sky-700 transition">
                    Selanjutnya <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Courses Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Kursus Terkait</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Course 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden module-card">
              <div className="h-40 bg-sky-500 relative">
                <img src="https://images.unsplash.com/photo-1579154392429-55fffc99f87b?auto=format&fit=crop&w=800" alt="Advanced First Aid" className="w-full h-full object-cover" />
                <div className="absolute top-0 right-0 bg-sky-600 text-white text-xs font-bold px-3 py-1 m-2 rounded-full">
                  POPULER
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2">P3K Lanjutan</h3>
                <p className="text-gray-600 text-sm mb-4">Pelajari teknik penanganan kasus darurat yang lebih kompleks</p>
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-gray-500"><FontAwesomeIcon icon={faBookMedical} className="inline mr-1" /> 6 Modul</span>
                  <span className="text-gray-500"><FontAwesomeIcon icon={faClock} className="inline mr-1" /> 5 Jam</span>
                </div>
                <a href="#" className="block text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 rounded-lg transition">
                  Pelajari Sekarang
                </a>
              </div>
            </div>
            
            {/* Course 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden module-card">
              <div className="h-40 bg-sky-500 relative">
                <img src="https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=800" alt="CPR Training" className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2">Pelatihan CPR</h3>
                <p className="text-gray-600 text-sm mb-4">Pelajari teknik resusitasi jantung paru (CPR) sesuai standar internasional</p>
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-gray-500"><FontAwesomeIcon icon={faBookMedical} className="inline mr-1" /> 3 Modul</span>
                  <span className="text-gray-500"><FontAwesomeIcon icon={faClock} className="inline mr-1" /> 2 Jam</span>
                </div>
                <a href="#" className="block text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 rounded-lg transition">
                  Pelajari Sekarang
                </a>
              </div>
            </div>
            
            {/* Course 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden module-card">
              <div className="h-40 bg-sky-500 relative">
                <img src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800" alt="Emergency Preparedness" className="w-full h-full object-cover" />
                <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-3 py-1 m-2 rounded-full">
                  BARU
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2">Kesiapsiagaan Bencana</h3>
                <p className="text-gray-600 text-sm mb-4">Pelajari cara mempersiapkan diri menghadapi situasi bencana dan keadaan darurat</p>
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-gray-500"><FontAwesomeIcon icon={faBookMedical} className="inline mr-1" /> 4 Modul</span>
                  <span className="text-gray-500"><FontAwesomeIcon icon={faClock} className="inline mr-1" /> 3.5 Jam</span>
                </div>
                <a href="#" className="block text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 rounded-lg transition">
                  Pelajari Sekarang
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notification */}
      {notification.show && (
        <div className={`fixed bottom-4 right-4 bg-${notification.color}-500 text-white px-4 py-2 rounded-lg shadow-lg z-50`}>
          <i className="fas fa-info-circle mr-2"></i> {notification.message}
        </div>
      )}

      {/* CSS for the page */}
      <style jsx>{`
        .hero-pattern {
          background-color: #0ea5e9;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        
        .progress-bar {
          height: 8px;
          border-radius: 4px;
          background: #e5e7eb;
          overflow: hidden;
        }
        
        .progress {
          height: 100%;
          background: linear-gradient(90deg, #0ea5e9, #38bdf8);
          transition: width 0.5s ease-in-out;
        }
        
        .module-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .module-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Course1Page;