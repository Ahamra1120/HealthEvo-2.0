import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ArtikelPage from './pages/ArtikelPage';
import VideoPage from './pages/VideoPage';
import KuisPage from './pages/KuisPage';
import KuisStart from './pages/KuisStart';
import InformasiPage from './pages/InformasiPage';
import LokasiPage from './pages/LokasiPage';
import Course1Page from './pages/course-1';
import './App.css';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/artikel" element={<ArtikelPage />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/kuis" element={<KuisPage />} />
        <Route path="/mulai-kuis" element={<KuisStart />} />
        <Route path="/informasi" element={<InformasiPage />} />
        <Route path="/lokasi" element={<LokasiPage />} />
        <Route path="/course-1" element={<Course1Page />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;