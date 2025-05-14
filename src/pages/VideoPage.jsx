import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, faClock, faArrowRight, faHeartbeat, 
  faBars, faTimes, faInfoCircle, faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebook, faTwitter, faInstagram, faYoutube 
} from '@fortawesome/free-brands-svg-icons';

const VideoPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Video descriptions
  const videoDescriptions = {
    '2PngCv7NjaI': 'Video tutorial lengkap tentang cara melakukan CPR dengan benar pada orang dewasa. Pelajari teknik resusitasi jantung paru yang dapat menyelamatkan nyawa seseorang dalam keadaan darurat.',
    '5mpnX-DBbEw': 'Panduan lengkap tentang cara membersihkan dan merawat luka terbuka untuk mencegah infeksi dan mempercepat penyembuhan. Video ini menjelaskan teknik yang tepat untuk sterilisasi dan perawatan luka.',
    'i0iUMr9yc0A': 'Cara memberikan pertolongan pertama pada kasus luka bakar. Video ini membahas berbagai tingkat luka bakar dan tindakan yang harus dilakukan segera untuk meminimalkan kerusakan jaringan.',
    '2v8vlXgGXwE': 'Panduan tentang cara mengenali dan memberikan pertolongan pertama pada kasus patah tulang atau dislokasi. Pelajari teknik immobilisasi untuk mencegah cedera lebih lanjut.',
    'M9zjgtFbUEY': 'Video tutorial tentang teknik Heimlich Maneuver untuk membantu seseorang yang tersedak dalam situasi darurat. Pelajari cara yang benar untuk melakukan teknik ini pada berbagai kelompok usia.',
    'Gy5fLtoPOV4': 'Panduan lengkap tentang tanda-tanda keracunan dan cara memberikan pertolongan pertama yang tepat. Video ini membahas berbagai jenis keracunan dan langkah-langkah untuk menanganinya.',
    'm51d8_IhnMs': 'Video pengantar tentang dasar-dasar pertolongan pertama dan prinsip-prinsip utamanya. Pelajari konsep dasar P3K yang penting untuk diketahui sebelum mempelajari teknik-teknik lebih lanjut.',
    '3T4f7ddGfns': 'Tutorial tentang cara menangani luka lecet, gores, dan luka ringan lainnya agar tidak menjadi infeksi. Video ini menjelaskan langkah-langkah praktis untuk membersihkan dan merawat luka ringan.',
    'uGOePDV3IQ8': 'Penjelasan lengkap tentang barang-barang penting yang harus ada dalam kotak P3K dan fungsinya. Pelajari cara menyiapkan dan memelihara perlengkapan P3K di rumah atau tempat kerja.',
    '_wMLFVTtFRE': 'Tutorial tentang berbagai teknik membalut luka dengan benar untuk berbagai situasi dan jenis luka. Pelajari cara menggunakan perban dan pembalut dengan efektif dan efisien.'
  };

  // Video data array
  const videos = [
    {
      id: '2PngCv7NjaI',
      title: 'Cara Melakukan CPR dengan Benar',
      description: 'Pelajari teknik resusitasi jantung paru (CPR) yang dapat menyelamatkan nyawa seseorang dalam keadaan darurat.',
      duration: '8:24',
      category: 'cpr',
      important: true
    },
    {
      id: '5mpnX-DBbEw',
      title: 'Penanganan Luka Terbuka',
      description: 'Pelajari cara membersihkan dan merawat luka terbuka untuk mencegah infeksi dan mempercepat penyembuhan.',
      duration: '6:15',
      category: 'luka'
    },
    {
      id: 'i0iUMr9yc0A',
      title: 'Pertolongan Pertama pada Luka Bakar',
      description: 'Pelajari cara menangani berbagai tingkat luka bakar dan tindakan yang harus dilakukan segera.',
      duration: '7:42',
      category: 'luka-bakar'
    },
    {
      id: '2v8vlXgGXwE',
      title: 'Cara Menangani Patah Tulang',
      description: 'Pelajari cara mengenali dan memberikan pertolongan pertama pada kasus patah tulang atau dislokasi.',
      duration: '9:18',
      category: 'patah-tulang'
    },
    {
      id: 'M9zjgtFbUEY',
      title: 'Pertolongan pada Korban Tersedak',
      description: 'Pelajari teknik Heimlich Maneuver untuk membantu seseorang yang tersedak dalam situasi darurat.',
      duration: '5:37',
      category: 'tersedak'
    },
    {
      id: 'Gy5fLtoPOV4',
      title: 'Penanganan Keracunan',
      description: 'Pelajari tanda-tanda keracunan dan cara memberikan pertolongan pertama yang tepat.',
      duration: '6:52',
      category: 'keracunan'
    },
    {
      id: 'm51d8_IhnMs',
      title: 'Pengenalan P3K',
      description: 'Video pengantar tentang dasar-dasar pertolongan pertama dan prinsip-prinsip utamanya.',
      duration: '5:20',
      category: 'pengantar',
      pemula: true
    },
    {
      id: '3T4f7ddGfns',
      title: 'Penanganan Luka Ringan',
      description: 'Cara menangani luka lecet, gores, dan luka ringan lainnya agar tidak menjadi infeksi.',
      duration: '4:45',
      category: 'luka'
    },
    {
      id: 'uGOePDV3IQ8',
      title: 'Isi Kotak P3K',
      description: 'Penjelasan tentang barang-barang penting yang harus ada dalam kotak P3K dan fungsinya.',
      duration: '6:10',
      category: 'perlengkapan'
    },
    {
      id: '_wMLFVTtFRE',
      title: 'Teknik Pembalutan Luka',
      description: 'Pelajari berbagai teknik membalut luka dengan benar untuk berbagai situasi dan jenis luka.',
      duration: '7:30',
      category: 'luka'
    }
  ];

  // Filter videos based on category
  const filteredVideos = activeCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === activeCategory);
  
  // Open video modal
  const openVideoModal = (video) => {
    setSelectedVideo(video);
  };

  // Close video modal
  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      {/* Page Header */}
      <section className="hero-pattern text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Video Edukasi P3K</h1>
          <p className="text-lg">Pelajari teknik P3K melalui video tutorial interaktif</p>
        </div>
      </section>

      {/* Video Categories */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              className={`px-4 py-2 rounded-full font-medium transition ${
                activeCategory === 'all' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveCategory('all')}
            >
              Semua Video
            </button>
            <button 
              className={`px-4 py-2 rounded-full font-medium transition ${
                activeCategory === 'luka' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveCategory('luka')}
            >
              Penanganan Luka
            </button>
            <button 
              className={`px-4 py-2 rounded-full font-medium transition ${
                activeCategory === 'cpr' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveCategory('cpr')}
            >
              CPR
            </button>
            <button 
              className={`px-4 py-2 rounded-full font-medium transition ${
                activeCategory === 'patah-tulang' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveCategory('patah-tulang')}
            >
              Patah Tulang
            </button>
            <button 
              className={`px-4 py-2 rounded-full font-medium transition ${
                activeCategory === 'luka-bakar' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveCategory('luka-bakar')}
            >
              Luka Bakar
            </button>
            <button 
              className={`px-4 py-2 rounded-full font-medium transition ${
                activeCategory === 'tersedak' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveCategory('tersedak')}
            >
              Tersedak
            </button>
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map(video => (
              <div 
                key={video.id} 
                className="video-card bg-white rounded-xl shadow-md overflow-hidden hover:transform hover:-translate-y-1 transition-transform duration-300" 
                onClick={() => openVideoModal(video)}
              >
                <div className="relative">
                  <div className="youtube-thumbnail aspect-video">
                    <img 
                      src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} 
                      alt={`Thumbnail ${video.title}`} 
                      className="w-full h-full object-cover"
                    />
                    <div className="play-overlay absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                      <FontAwesomeIcon icon={faPlay} className="text-white text-5xl opacity-90" />
                    </div>
                  </div>
                  {video.important && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      PENTING
                    </div>
                  )}
                  {video.pemula && (
                    <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                      PEMULA
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{video.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">
                      <FontAwesomeIcon icon={faClock} className="mr-1" /> {video.duration}
                    </span>
                    <span className="text-sky-600 font-medium">
                      Tonton <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-10 bg-sky-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ingin Mempelajari Lebih Lanjut?</h2>
          <p className="text-lg mb-6">Lihat informasi lengkap dan uji pengetahuan Anda dengan kuis interaktif</p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <a href="/informasi" className="bg-white text-sky-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-sky-50 transition duration-300">
              <FontAwesomeIcon icon={faInfoCircle} className="mr-2" /> Lihat Informasi
            </a>
            <a href="/kuis" className="bg-sky-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-sky-800 transition duration-300">
              <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" /> Mulai Kuis
            </a>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeVideoModal();
          }}
        >
          <div className="modal-content w-full max-w-3xl bg-white rounded-lg overflow-hidden">
            <div className="video-container relative pb-[56.25%] h-0 overflow-hidden">
              <iframe 
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                title={selectedVideo.title}
                className="absolute top-0 left-0 w-full h-full border-0"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold">{selectedVideo.title}</h3>
                <button 
                  onClick={closeVideoModal}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-xl" />
                </button>
              </div>
              <p className="text-gray-600">{videoDescriptions[selectedVideo.id]}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPage;