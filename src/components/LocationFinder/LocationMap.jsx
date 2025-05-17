import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { getFacilityIconInfo, getFacilityTypeLabel } from '../../utils/locationUtils';

// Fix for Leaflet's default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMap = ({ facilities, userLocation, onSearchNearbyFacilities }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef(null);
  const facilitiesRef = useRef({});
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [searchRadius, setSearchRadius] = useState(2000); // Default 2km radius

  // Initialize map
  useEffect(() => {
    if (!mapInstanceRef.current) {
      // Default center (Jakarta)
      const defaultCenter = [-6.2088, 106.8456];
      
      // Initialize the map
      const map = L.map(mapRef.current).setView(defaultCenter, 13);
      
      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);
      
      // Add scale control
      L.control.scale().addTo(map);
      
      // Initialize markers cluster group
      const markers = L.markerClusterGroup();
      map.addLayer(markers);

      // Add event listener for map movement to detect new area
      map.on('moveend', handleMapMoveEnd);
      
      // Store references
      mapInstanceRef.current = map;
      markersRef.current = markers;
    }
    
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.off('moveend', handleMapMoveEnd);
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersRef.current = null;
      }
    };
  }, []);

  // Handle map movement to search for facilities in current view
  const handleMapMoveEnd = useCallback(() => {
    if (mapInstanceRef.current) {
      const center = mapInstanceRef.current.getCenter();
      
      // Search for facilities near the map center
      if (onSearchNearbyFacilities) {
        onSearchNearbyFacilities({
          lat: center.lat,
          lng: center.lng,
          radius: searchRadius
        });
      }
    }
  }, [onSearchNearbyFacilities, searchRadius]);

  // Update search radius and re-search when it changes
  const updateSearchRadius = useCallback((newRadius) => {
    setSearchRadius(newRadius);
    
    if (mapInstanceRef.current && userLocation && onSearchNearbyFacilities) {
      // Update search radius circle if it exists
      if (mapInstanceRef.current.searchRadiusCircle) {
        mapInstanceRef.current.searchRadiusCircle.setRadius(newRadius);
      }
      
      // Re-trigger search with new radius
      onSearchNearbyFacilities({
        lat: userLocation.lat,
        lng: userLocation.lng,
        radius: newRadius
      });
    }
  }, [userLocation, onSearchNearbyFacilities]);

  // Update user location on map
  useEffect(() => {
    if (mapInstanceRef.current && userLocation) {
      // Remove previous user marker if exists
      if (mapInstanceRef.current.userMarker) {
        mapInstanceRef.current.removeLayer(mapInstanceRef.current.userMarker);
      }
      
      if (mapInstanceRef.current.userCircle) {
        mapInstanceRef.current.removeLayer(mapInstanceRef.current.userCircle);
      }
      
      if (mapInstanceRef.current.searchRadiusCircle) {
        mapInstanceRef.current.removeLayer(mapInstanceRef.current.searchRadiusCircle);
      }
      
      // Create user location marker with pulse animation
      const userIcon = L.divIcon({
        html: '<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md pulse-animation"></div>',
        className: 'user-location-marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });
      
      const userMarker = L.marker([userLocation.lat, userLocation.lng], {
        icon: userIcon,
        zIndexOffset: 1000
      }).addTo(mapInstanceRef.current);
      
      userMarker.bindTooltip('Lokasi Anda', {
        permanent: false,
        direction: 'top'
      });
      
      // Add accuracy circle
      const userCircle = L.circle([userLocation.lat, userLocation.lng], {
        radius: 100,
        color: '#4285F4',
        fillColor: '#4285F4',
        fillOpacity: 0.15,
        weight: 1
      }).addTo(mapInstanceRef.current);
      
      // Add search radius circle
      const searchRadiusCircle = L.circle([userLocation.lat, userLocation.lng], {
        radius: searchRadius,
        color: '#22C55E',
        fillColor: '#22C55E',
        fillOpacity: 0.05,
        weight: 2,
        dashArray: '5, 5',
      }).addTo(mapInstanceRef.current);
      
      // Store references
      mapInstanceRef.current.userMarker = userMarker;
      mapInstanceRef.current.userCircle = userCircle;
      mapInstanceRef.current.searchRadiusCircle = searchRadiusCircle;
      
      // Center map on user location
      mapInstanceRef.current.setView([userLocation.lat, userLocation.lng], 14);
      
      // Trigger search for nearby facilities
      if (onSearchNearbyFacilities) {
        onSearchNearbyFacilities({
          lat: userLocation.lat,
          lng: userLocation.lng,
          radius: searchRadius
        });
      }
    }
  }, [userLocation, searchRadius, onSearchNearbyFacilities]);

  // Update facilities markers on map
  useEffect(() => {
    if (mapInstanceRef.current && markersRef.current && facilities) {
      // Clear existing markers
      markersRef.current.clearLayers();
      facilitiesRef.current = {};
      
      // Add markers for each facility
      facilities.forEach(facility => {
        const marker = createMarker(facility);
        facilitiesRef.current[facility.id] = marker;
        
        // If this is the selected facility, open its popup
        if (selectedFacility && selectedFacility.id === facility.id) {
          setTimeout(() => {
            marker.openPopup();
          }, 100);
        }
      });
    }
  }, [facilities, selectedFacility]);

  const createMarker = (facility) => {
    const { iconClass, iconColor } = getFacilityIconInfo(facility.type);
    
    // Create custom icon
    const markerHtml = `
      <div class="marker-icon bg-white rounded-full p-1 border border-gray-300 shadow-md">
        <div class="w-6 h-6 flex items-center justify-center bg-${iconColor}-500 text-white rounded-full">
          <i class="fas fa-${iconClass} text-xs"></i>
        </div>
      </div>
    `;
    
    const icon = L.divIcon({
      html: markerHtml,
      className: `marker-${facility.type}`,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });
    
    // Create marker
    const marker = L.marker([facility.lat, facility.lng], { icon: icon });
    
    // Add popup with facility information
    const popupContent = `
      <div class="facility-popup w-64">
        <h3 class="font-semibold text-lg mb-1">${facility.name}</h3>
        <div class="flex items-center mb-2">
          <span class="inline-block px-2 py-1 text-xs rounded-full bg-${iconColor}-100 text-${iconColor}-800">
            <i class="fas fa-${iconClass} mr-1"></i> ${getFacilityTypeLabel(facility.type)}
          </span>
          <span class="text-xs text-gray-500 ml-2">${formatDistance(facility.distance)}</span>
        </div>
        <div class="mb-2">
          <div class="text-amber-500 flex items-center mb-1">
            <span class="mr-1">${facility.rating}</span>
            ${getStarRating(facility.rating)}
            <span class="text-xs text-gray-500 ml-1">(${facility.reviews})</span>
          </div>
          <p class="text-sm text-gray-600">${facility.address}</p>
        </div>
        <div class="flex space-x-2 mt-3">
          <a href="https://www.google.com/maps/dir/?api=1&destination=${facility.lat},${facility.lng}" target="_blank" class="text-blue-600 text-sm hover:underline">
            <i class="fas fa-directions mr-1"></i> Petunjuk Arah
          </a>
          <a href="https://www.google.com/maps/search/?api=1&query=${facility.name}" target="_blank" class="text-blue-600 text-sm hover:underline">
            <i class="fas fa-map-marked-alt mr-1"></i> Lihat di Google Maps
          </a>
        </div>
      </div>
    `;
    
    marker.bindPopup(popupContent);
    
    // Add click handler to select facility
    marker.on('click', () => {
      setSelectedFacility(facility);
    });
    
    // Add marker to the markers cluster group
    markersRef.current.addLayer(marker);
    
    return marker;
  };

  // Helper functions for marker popups
  const formatDistance = (distance) => {
    if (distance < 1000) {
      return `${Math.round(distance)} m`;
    } else {
      return `${(distance / 1000).toFixed(1)} km`;
    }
  };

  const getStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<i class="fas fa-star text-xs"></i>';
    }
    
    // Half star
    if (halfStar) {
      starsHTML += '<i class="fas fa-star-half-alt text-xs"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<i class="far fa-star text-xs"></i>';
    }
    
    return starsHTML;
  };

  return (
    <div className="w-full md:w-3/5">
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Radius pencarian: {formatDistance(searchRadius)}</span>
          <div className="flex space-x-2">
            <button 
              onClick={() => updateSearchRadius(1000)}
              className={`px-2 py-1 text-xs rounded ${searchRadius === 1000 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              1 km
            </button>
            <button 
              onClick={() => updateSearchRadius(2000)}
              className={`px-2 py-1 text-xs rounded ${searchRadius === 2000 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              2 km
            </button>
            <button 
              onClick={() => updateSearchRadius(5000)}
              className={`px-2 py-1 text-xs rounded ${searchRadius === 5000 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              5 km
            </button>
          </div>
        </div>
        <div id="map" ref={mapRef} className="h-[400px] rounded-lg"></div>
      </div>
    </div>
  );
};

export default LocationMap;