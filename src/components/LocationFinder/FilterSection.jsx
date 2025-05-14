// src/components/LocationFinder/FilterSection.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSync, faHospital, faClinicMedical, faFirstAid, faPills, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const FilterSection = ({ 
  showSampleNotice,
  activeFilterType,
  onFilterChange,
  searchInput,
  onSearchChange,
  searchRadius,
  onRadiusChange,
  onRefresh
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      {showSampleNotice && (
        <div id="sample-data-notice" className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
            <span><strong>Informasi:</strong> Menampilkan data contoh. Beberapa fitur mungkin terbatas.</span>
          </div>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="w-full md:w-auto">
          <div className="relative">
            <input 
              type="text" 
              value={searchInput}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari berdasarkan nama atau alamat..." 
              className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-2 text-gray-500">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-sm whitespace-nowrap">Radius:</span>
          <select 
            value={searchRadius}
            onChange={(e) => onRadiusChange(e.target.value)}
            className="border border-gray-300 rounded-md text-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="5000">5 km</option>
            <option value="10000">10 km</option>
            <option value="15000">15 km</option>
            <option value="20000">20 km</option>
            <option value="30000">30 km</option>
          </select>
          
          <button 
            onClick={onRefresh}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faSync} />
          </button>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2">
          <button 
            onClick={() => onFilterChange('all')}
            className={`facility-filter px-4 py-2 rounded-full font-medium transition ${
              activeFilterType === 'all' 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Semua
          </button>
          
          <button 
            onClick={() => onFilterChange('hospital')}
            className={`facility-filter px-4 py-2 rounded-full font-medium transition ${
              activeFilterType === 'hospital' 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <FontAwesomeIcon icon={faHospital} className="mr-1" /> Rumah Sakit
          </button>
          
          <button 
            onClick={() => onFilterChange('clinic')}
            className={`facility-filter px-4 py-2 rounded-full font-medium transition ${
              activeFilterType === 'clinic' 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <FontAwesomeIcon icon={faClinicMedical} className="mr-1" /> Klinik
          </button>
          
          <button 
            onClick={() => onFilterChange('puskesmas')}
            className={`facility-filter px-4 py-2 rounded-full font-medium transition ${
              activeFilterType === 'puskesmas' 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <FontAwesomeIcon icon={faFirstAid} className="mr-1" /> Puskesmas
          </button>
          
          <button 
            onClick={() => onFilterChange('pharmacy')}
            className={`facility-filter px-4 py-2 rounded-full font-medium transition ${
              activeFilterType === 'pharmacy' 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <FontAwesomeIcon icon={faPills} className="mr-1" /> Apotek
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;