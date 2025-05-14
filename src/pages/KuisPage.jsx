import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faQuestionCircle, 
  faHeartbeat, 
  faBone, 
  faBurn, 
  faHeadSideCough,
  faArrowRight,
  faClock,
  faInfoCircle,
  faVideo
} from '@fortawesome/free-solid-svg-icons';

const KuisPage = () => {
  const [activeCategory, setActiveCategory] = useState('Semua Kuis');
  const [quizzes, setQuizzes] = useState([]);
  
  useEffect(() => {
    // Data kuis
    const quizData = [
      {
        id: 1,
        title: 'Dasar-Dasar P3K',
        description: 'Uji pengetahuan Anda tentang prinsip dasar dan peralatan P3K.',
        icon: faQuestionCircle,
        color: 'purple',
        questionCount: 10,
        timeMinutes: 10,
        category: 'Dasar P3K'
      },
      {
        id: 2,
        title: 'CPR dan Resusitasi',
        description: 'Uji pengetahuan Anda tentang teknik CPR dan penanganan henti jantung.',
        icon: faHeartbeat,
        color: 'red',
        questionCount: 8,
        timeMinutes: 8,
        category: 'CPR & Resusitasi'
      },
      {
        id: 3,
        title: 'Penanganan Luka',
        description: 'Uji pengetahuan Anda tentang cara menangani berbagai jenis luka.',
        icon: faHeartbeat,
        color: 'blue',
        questionCount: 12,
        timeMinutes: 12,
        category: 'Penanganan Luka'
      },
      {
        id: 4,
        title: 'Patah Tulang dan Keseleo',
        description: 'Uji pengetahuan Anda tentang penanganan patah tulang dan keseleo.',
        icon: faBone,
        color: 'yellow',
        questionCount: 8,
        timeMinutes: 8,
        category: 'Penanganan Luka'
      },
      {
        id: 5,
        title: 'Luka Bakar',
        description: 'Uji pengetahuan Anda tentang penanganan berbagai tingkat luka bakar.',
        icon: faBurn,
        color: 'green',
        questionCount: 6,
        timeMinutes: 6,
        category: 'Penanganan Luka'
      },
      {
        id: 6,
        title: 'Keadaan Darurat',
        description: 'Uji pengetahuan Anda tentang penanganan keadaan darurat seperti tersedak dan keracunan.',
        icon: faHeadSideCough,
        color: 'pink',
        questionCount: 10,
        timeMinutes: 10,
        category: 'Keadaan Darurat'
      }
    ];
    
    setQuizzes(quizData);
  }, []);
  
  // Filter kuis berdasarkan kategori yang dipilih
  const filteredQuizzes = activeCategory === 'Semua Kuis'
    ? quizzes
    : quizzes.filter(quiz => 
        quiz.category === activeCategory || 
        quiz.title.includes(activeCategory.replace('Dasar P3K', 'Dasar-Dasar P3K'))
      );
      
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };
  
  const startQuiz = (quiz) => {
    // Dalam aplikasi nyata, ini bisa menavigasi ke halaman kuis dengan parameter ID atau judul
    console.log(`Starting quiz: ${quiz.title}`);
    // history.push(`/mulai-kuis?title=${encodeURIComponent(quiz.title)}`);
  };

  return (
    <main>
      {/* Page Header */}
      <section className="hero-pattern text-white py-10" style={{ backgroundColor: '#7c3aed' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Kuis P3K</h1>
          <p className="text-lg">Uji pengetahuan Anda tentang pertolongan pertama pada kecelakaan</p>
        </div>
      </section>

      {/* Quiz Categories */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              className={`px-4 py-2 rounded-full font-medium transition ${
                activeCategory === 'Semua Kuis' 
                  ? 'bg-purple-600 text-white hover:bg-purple-700' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => handleCategoryClick('Semua Kuis')}
            >
              Semua Kuis
            </button>
            <button 
              className={`px-4 py-2 rounded-full font-medium transition ${
                activeCategory === 'Dasar P3K' 
                  ? 'bg-purple-600 text-white hover:bg-purple-700' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => handleCategoryClick('Dasar P3K')}
            >
              Dasar P3K
            </button>
            <button 
              className={`px-4 py-2 rounded-full font-medium transition ${
                activeCategory === 'Penanganan Luka' 
                  ? 'bg-purple-600 text-white hover:bg-purple-700' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => handleCategoryClick('Penanganan Luka')}
            >
              Penanganan Luka
            </button>
            <button 
              className={`px-4 py-2 rounded-full font-medium transition ${
                activeCategory === 'CPR & Resusitasi' 
                  ? 'bg-purple-600 text-white hover:bg-purple-700' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => handleCategoryClick('CPR & Resusitasi')}
            >
              CPR & Resusitasi
            </button>
            <button 
              className={`px-4 py-2 rounded-full font-medium transition ${
                activeCategory === 'Keadaan Darurat' 
                  ? 'bg-purple-600 text-white hover:bg-purple-700' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => handleCategoryClick('Keadaan Darurat')}
            >
              Keadaan Darurat
            </button>
          </div>
        </div>
      </section>

      {/* Quiz List */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Pilih Kuis</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
              <div key={quiz.id} className="quiz-card bg-white rounded-xl shadow-md overflow-hidden">
                <div className={`h-32 bg-${quiz.color}-600 flex items-center justify-center`}>
                  <FontAwesomeIcon icon={quiz.icon} className="text-white text-5xl" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2">{quiz.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-3"><FontAwesomeIcon icon={faQuestionCircle} className="mr-1" /> {quiz.questionCount} Soal</span>
                      <span><FontAwesomeIcon icon={faClock} className="mr-1" /> {quiz.timeMinutes} Menit</span>
                    </div>
                    <Link 
                      to={`/mulai-kuis?title=${encodeURIComponent(quiz.title)}`} 
                      className="text-purple-600 font-medium hover:text-purple-700 text-sm"
                      onClick={() => startQuiz(quiz)}
                    >
                      Mulai Kuis <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Papan Peringkat</h2>
          
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-purple-600 text-white p-4">
              <div className="grid grid-cols-12 font-semibold">
                <div className="col-span-1">#</div>
                <div className="col-span-5">Nama</div>
                <div className="col-span-3 text-center">Kuis</div>
                <div className="col-span-3 text-center">Skor</div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              <div className="grid grid-cols-12 p-4 items-center bg-yellow-50">
                <div className="col-span-1 font-bold">1</div>
                <div className="col-span-5 flex items-center">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold mr-3">B</div>
                  <span>Budi Santoso</span>
                </div>
                <div className="col-span-3 text-center">Dasar P3K</div>
                <div className="col-span-3 text-center font-bold">95</div>
              </div>
              
              <div className="grid grid-cols-12 p-4 items-center bg-gray-50">
                <div className="col-span-1 font-bold">2</div>
                <div className="col-span-5 flex items-center">
                  <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold mr-3">A</div>
                  <span>Ani Wijaya</span>
                </div>
                <div className="col-span-3 text-center">CPR</div>
                <div className="col-span-3 text-center font-bold">90</div>
              </div>
              
              <div className="grid grid-cols-12 p-4 items-center bg-orange-50">
                <div className="col-span-1 font-bold">3</div>
                <div className="col-span-5 flex items-center">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3">C</div>
                  <span>Citra Dewi</span>
                </div>
                <div className="col-span-3 text-center">Luka Bakar</div>
                <div className="col-span-3 text-center font-bold">85</div>
              </div>
              
              <div className="grid grid-cols-12 p-4 items-center">
                <div className="col-span-1 font-bold">4</div>
                <div className="col-span-5 flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold mr-3">D</div>
                  <span>Deni Pratama</span>
                </div>
                <div className="col-span-3 text-center">Patah Tulang</div>
                <div className="col-span-3 text-center font-bold">80</div>
              </div>
              
              <div className="grid grid-cols-12 p-4 items-center">
                <div className="col-span-1 font-bold">5</div>
                <div className="col-span-5 flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold mr-3">E</div>
                  <span>Eka Putri</span>
                </div>
                <div className="col-span-3 text-center">Keadaan Darurat</div>
                <div className="col-span-3 text-center font-bold">75</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-10 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ingin Mempelajari Lebih Lanjut?</h2>
          <p className="text-lg mb-6">Lihat informasi lengkap dan video tutorial tentang P3K</p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <Link to="/informasi" className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-purple-50 transition duration-300">
              <FontAwesomeIcon icon={faInfoCircle} className="mr-2" /> Lihat Informasi
            </Link>
            <Link to="/video" className="bg-purple-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-purple-800 transition duration-300">
              <FontAwesomeIcon icon={faVideo} className="mr-2" /> Tonton Video
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default KuisPage;