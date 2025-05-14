import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDirections, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import StarRating from '../common/StarRating';
import { formatDistance, getFacilityTypeLabel, getFacilityIconInfo } from '../../utils/locationUtils';

const FacilityCard = ({ facility, onSelect }) => {
  const { iconClass, iconColor } = getFacilityIconInfo(facility.type);
  const facilityTypeLabel = getFacilityTypeLabel(facility.type);
  
  const handleCardClick = (e) => {
    // Only trigger onSelect if not clicking a link or button
    if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON' && 
        !e.target.closest('a') && !e.target.closest('button')) {
      onSelect && onSelect(facility);
    }
  };
  
  const handleViewOnMap = (e) => {
    e.stopPropagation();
    onSelect && onSelect(facility);
  };
  
  return (
    <div 
      className="facility-card p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900">{facility.name}</h3>
          <div className="flex items-center my-1">
            <span className={`inline-block px-2 py-0.5 text-xs rounded-full bg-${iconColor}-100 text-${iconColor}-800`}>
              <i className={`fas fa-${iconClass} mr-1`}></i> {facilityTypeLabel}
            </span>
            <span className="text-xs text-gray-500 ml-2">{formatDistance(facility.distance)}</span>
          </div>
          <div className="text-amber-500 flex items-center">
            <span className="mr-1">{facility.rating}</span>
            <StarRating rating={facility.rating} />
            <span className="text-xs text-gray-500 ml-1">({facility.reviews})</span>
          </div>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{facility.address}</p>
        </div>
      </div>
      <div className="flex justify-between mt-3">
        <a 
          href={`https://www.google.com/maps/dir/?api=1&destination=${facility.lat},${facility.lng}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:underline"
        >
          <FontAwesomeIcon icon={faDirections} className="mr-1" /> Petunjuk Arah
        </a>
        <button 
          className="text-xs text-gray-600 hover:text-blue-600"
          onClick={handleViewOnMap}
        >
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" /> Lihat di Peta
        </button>
      </div>
    </div>
  );
};

export default FacilityCard;