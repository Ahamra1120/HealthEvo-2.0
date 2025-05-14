// src/components/LocationFinder/FacilityList.jsx
import React from 'react';
import FacilityCard from './FacilityCard';

const FacilityList = ({ facilities, totalFacilities, sortBy, onSortChange }) => {
  return (
    <div className="w-full md:w-2/5">
      <div className="bg-white rounded-xl shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Fasilitas Kesehatan Terdekat</h2>
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-600">
              <span id="total-facilities">{totalFacilities}</span> fasilitas ditemukan
            </p>
            <div className="flex items-center">
              <span className="text-gray-600 mr-2 text-sm">Urutkan:</span>
              <select 
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="border border-gray-300 rounded-md text-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="distance">Jarak Terdekat</option>
                <option value="name">Nama (A-Z)</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>
          </div>
          
          <div className="facility-list space-y-3">
            {facilities.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <i className="fas fa-search-location text-3xl mb-2"></i>
                <p>Tidak ada fasilitas kesehatan yang ditemukan.</p>
                <p className="text-sm mt-2">Coba ubah filter atau pencarian Anda.</p>
              </div>
            ) : (
              facilities.slice(0, 50).map(facility => (
                <FacilityCard 
                  key={facility.id} 
                  facility={facility} 
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityList;