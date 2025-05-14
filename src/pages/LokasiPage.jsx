import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSpinner, faSearch, faSyncAlt, faHospital, faClinicMedical, 
  faFirstAid, faPills, faDirections, faMapMarkerAlt, faExclamationCircle,
  faLocationArrow, faSearchLocation, faStar, faStarHalfAlt
} from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

// Import MarkerCluster as a separate module
import 'leaflet.markercluster';

// Fix Leaflet default icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const LokasiPage = () => {
  const [facilities, setFacilities] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchRadius, setSearchRadius] = useState(10000);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('distance');
  const [showSampleNotice, setShowSampleNotice] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerClusterRef = useRef(null);
  const userMarkerRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Custom facility icons
  const facilityIcons = {
    hospital: createCustomIcon('hospital', 'blue'),
    clinic: createCustomIcon('clinic-medical', 'green'),
    puskesmas: createCustomIcon('first-aid', 'yellow'),
    pharmacy: createCustomIcon('pills', 'purple'),
    doctors: createCustomIcon('user-md', 'teal')
  };

  // User icon
  const userIcon = L.divIcon({
    html: '<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md"></div>',
    className: 'user-location-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  // Helper function to create custom icons
  function createCustomIcon(iconClass, iconColor) {
    const markerHtml = `
      <div class="marker-icon bg-white rounded-full p-1 border border-gray-300 shadow-md">
        <div class="w-6 h-6 flex items-center justify-center bg-${iconColor}-500 text-white rounded-full">
          <i class="fas fa-${iconClass} text-xs"></i>
        </div>
      </div>
    `;
    
    return L.divIcon({
      html: markerHtml,
      className: `marker-${iconClass}`,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });
  }

  // Initialize map once
  useEffect(() => {
    if (!mapRef.current) return;
    
    if (!mapInstanceRef.current) {
      // Initialize with default center (Jakarta)
      const defaultCenter = [-6.2088, 106.8456];
      mapInstanceRef.current = L.map(mapRef.current).setView(defaultCenter, 13);
      
      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(mapInstanceRef.current);
      
      // Add controls
      L.control.scale().addTo(mapInstanceRef.current);
      
      // Initialize marker cluster group
      markerClusterRef.current = L.markerClusterGroup();
      mapInstanceRef.current.addLayer(markerClusterRef.current);
    }
    
    // Get user location
    getUserLocation();
    
    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerClusterRef.current = null;
        userMarkerRef.current = null;
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Update filtered facilities when filters change
  useEffect(() => {
    if (!facilities.length) return;
    
    let filtered = facilities;
    
    // Apply type filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(facility => facility.type === activeFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(facility => 
        facility.name.toLowerCase().includes(query) || 
        facility.address.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    } else {
      filtered.sort((a, b) => a.distance - b.distance);
    }
    
    setFilteredFacilities(filtered);
  }, [facilities, activeFilter, searchQuery, sortBy]);

  // Get user location with promise
  const getUserLocation = () => {
    setIsLoading(true);
    
    if (!navigator.geolocation) {
      setErrorMessage('Geolokasi tidak didukung oleh browser ini.');
      showSampleData();
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        setUserLocation(location);
        
        // Update map view
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([location.lat, location.lng], 14);
          
          // Add user marker
          if (userMarkerRef.current) {
            userMarkerRef.current.setLatLng([location.lat, location.lng]);
          } else {
            userMarkerRef.current = L.marker([location.lat, location.lng], { 
              icon: userIcon,
              zIndexOffset: 1000
            }).addTo(mapInstanceRef.current)
              .bindTooltip('Lokasi Anda', {
                permanent: false,
                direction: 'top'
              });
              
            // Add accuracy circle
            L.circle([location.lat, location.lng], {
              radius: 100,
              color: '#4285F4',
              fillColor: '#4285F4',
              fillOpacity: 0.15,
              weight: 1
            }).addTo(mapInstanceRef.current);
          }
        }
        
        // Search for nearby facilities
        searchNearbyFacilities(location, searchRadius);
      },
      error => {
        console.error("Error getting location:", error);
        setErrorMessage('Tidak dapat mengakses lokasi Anda. Menampilkan data contoh.');
        showSampleData();
      },
      { 
        enableHighAccuracy: true, 
        timeout: 10000, 
        maximumAge: 0 
      }
    );
  };

  // Search for nearby healthcare facilities 
  const searchNearbyFacilities = (location, radius) => {
    setIsLoading(true);
    
    // Clear timeout if exists
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Set timeout to prevent infinite loading (30 seconds)
    searchTimeoutRef.current = setTimeout(() => {
      if (isLoading) {
        console.log('Timeout: Pencarian terlalu lama, menampilkan data contoh...');
        showSampleData();
      }
    }, 30000);
    
    // Clear existing markers
    if (markerClusterRef.current) {
      markerClusterRef.current.clearLayers();
    }
    
    // Check for cached data
    const cacheKey = `health_facilities_${location.lat.toFixed(4)}_${location.lng.toFixed(4)}_${radius}`;
    const cachedData = localStorage.getItem(cacheKey);
    
    if (cachedData) {
      try {
        const { timestamp, data } = JSON.parse(cachedData);
        const now = new Date().getTime();
        const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
        
        if (now - timestamp < oneHour && data.length > 0) {
          console.log('Using cached facility data');
          processFacilitiesData(data);
          return;
        }
      } catch (e) {
        console.error('Error parsing cached data:', e);
      }
    }
    
    // In a real application, you would fetch data from a backend API
    // For this example, we'll simulate an API call with setTimeout
    setTimeout(() => {
      // Fetch data would happen here in a real app
      // For now, show sample data as if it came from an API
      fetchHealthFacilitiesFromAPI(location, radius)
        .then(data => {
          if (!data || data.length === 0) {
            throw new Error('No facilities found');
          }
          
          // Cache the results
          localStorage.setItem(cacheKey, JSON.stringify({
            timestamp: new Date().getTime(),
            data: data
          }));
          
          processFacilitiesData(data);
        })
        .catch(error => {
          console.error('Error fetching facilities:', error);
          showSampleData();
        });
    }, 1500);
  };

  // Process facilities data
  const processFacilitiesData = (data) => {
    setFacilities(data);
    
    // Add markers for each facility
    if (markerClusterRef.current) {
      // Limit to 100 markers for performance
      const maxMarkers = Math.min(data.length, 100);
      for (let i = 0; i < maxMarkers; i++) {
        addMarker(data[i]);
      }
    }
    
    setIsLoading(false);
    clearTimeout(searchTimeoutRef.current);
  };

  // Add marker to the map
  const addMarker = (facility) => {
    if (!markerClusterRef.current) return;
    
    // Get icon based on facility type
    const icon = facilityIcons[facility.type] || DefaultIcon;
    
    // Create marker
    const marker = L.marker([facility.lat, facility.lng], { icon: icon });
    
    // Create popup content
    const popupContent = `
      <div class="facility-popup w-64">
        <h3 class="font-semibold text-lg mb-1">${facility.name}</h3>
        <div class="flex items-center mb-2">
          <span class="inline-block px-2 py-1 text-xs rounded-full bg-${getColorForType(facility.type)}-100 text-${getColorForType(facility.type)}-800">
            ${getFacilityTypeLabel(facility.type)}
          </span>
          <span class="text-xs text-gray-500 ml-2">${formatDistance(facility.distance)}</span>
        </div>
        <div class="mb-2">
          <div class="text-amber-500 flex items-center mb-1">
            <span class="mr-1">${facility.rating}</span>
            <span class="text-xs text-gray-500 ml-1">(${facility.reviews})</span>
          </div>
          <p class="text-sm text-gray-600">${facility.address}</p>
        </div>
        <div class="flex space-x-2 mt-3">
          <a href="https://www.google.com/maps/dir/?api=1&destination=${facility.lat},${facility.lng}" target="_blank" class="text-blue-600 text-sm hover:underline">
            Petunjuk Arah
          </a>
          <a href="https://www.google.com/maps/search/?api=1&query=${facility.name}" target="_blank" class="text-blue-600 text-sm hover:underline">
            Lihat di Google Maps
          </a>
        </div>
      </div>
    `;
    
    marker.bindPopup(popupContent);
    
    // Add marker to cluster
    markerClusterRef.current.addLayer(marker);
    
    // Store marker reference in facility object
    facility.marker = marker;
    
    return marker;
  };

  // Show sample data
  const showSampleData = () => {
    console.log("Showing sample data");
    
    // Sample healthcare facilities
    const sampleLocations = [
      {
        id: 'sample_1',
        name: "RSUD Dr. Soetomo",
        type: "hospital",
        address: "Jl. Mayjen Prof. Dr. Moestopo No.6-8, Airlangga, Kec. Gubeng, Kota Surabaya",
        rating: "4.5",
        reviews: 230,
        lat: -7.2691,
        lng: 112.7586
      },
      {
        id: 'sample_2',
        name: "RSUP Dr. Sardjito",
        type: "hospital",
        address: "Jl. Kesehatan No.1, Senolowo, Sinduadi, Kec. Mlati, Kabupaten Sleman, DIY",
        rating: "4.2",
        reviews: 185,
        lat: -7.7689,
        lng: 110.3708
      },
      {
        id: 'sample_3',
        name: "RSUP Dr. Kariadi",
        type: "hospital",
        address: "Jl. DR. Sutomo No.16, Randusari, Kec. Semarang Sel., Kota Semarang",
        rating: "4.4",
        reviews: 210,
        lat: -6.9965,
        lng: 110.4077
      },
      {
        id: 'sample_4',
        name: "Puskesmas Kecamatan Menteng",
        type: "puskesmas",
        address: "Jl. Johar Baru Utara I No.10, RT.11/RW.1, Johar Baru, Jakarta Pusat",
        rating: "4.0",
        reviews: 95,
        lat: -6.1867,
        lng: 106.8436
      },
      {
        id: 'sample_5',
        name: "Klinik Pratama Medika",
        type: "clinic",
        address: "Jl. Raya Bogor Km. 24, Cijantung, Kec. Pasar Rebo, Jakarta Timur",
        rating: "3.9",
        reviews: 78,
        lat: -6.3070,
        lng: 106.8618
      },
      {
        id: 'sample_6',
        name: "Apotek K-24 Thamrin",
        type: "pharmacy",
        address: "Jl. M.H. Thamrin No.12, RT.9/RW.5, Kebon Sirih, Menteng, Jakarta Pusat",
        rating: "4.3",
        reviews: 120,
        lat: -6.1931,
        lng: 106.8241
      },
      {
        id: 'sample_7',
        name: "Apotek Century",
        type: "pharmacy",
        address: "Jl. Gatot Subroto Kav. 12-13, Kuningan Timur, Setiabudi, Jakarta Selatan",
        rating: "4.1",
        reviews: 105,
        lat: -6.2346,
        lng: 106.8303
      },
      {
        id: 'sample_8',
        name: "Klinik Sehat Sentosa",
        type: "clinic",
        address: "Jl. Kebon Jeruk Raya No.27, RT.1/RW.2, Kebon Jeruk, Jakarta Barat",
        rating: "3.8",
        reviews: 65,
        lat: -6.1939,
        lng: 106.7683
      }
    ];
    
    // Process sample data
    const processedLocations = sampleLocations.map(location => {
      const userLat = userLocation ? userLocation.lat : -6.2088;
      const userLng = userLocation ? userLocation.lng : 106.8456;
      
      // Calculate distance from user location
      const distance = calculateDistance(userLat, userLng, location.lat, location.lng);
      
      return {
        ...location,
        distance: distance
      };
    });
    
    // Set sample notice
    setShowSampleNotice(true);
    
    // Process the data
    processFacilitiesData(processedLocations);
    
    // Set map view if not already set
    if (mapInstanceRef.current && (!userLocation || !userMarkerRef.current)) {
      mapInstanceRef.current.setView([-6.2088, 106.8456], 11); // Default: Jakarta
    }
  };

  // Calculate distance between two points in meters
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  // Format distance for display
  const formatDistance = (distance) => {
    if (distance < 1000) {
      return `${Math.round(distance)} m`;
    } else {
      return `${(distance / 1000).toFixed(1)} km`;
    }
  };

  // Get label for facility type
  const getFacilityTypeLabel = (type) => {
    switch (type) {
      case 'hospital': return 'Rumah Sakit';
      case 'clinic': return 'Klinik';
      case 'puskesmas': return 'Puskesmas';
      case 'pharmacy': return 'Apotek';
      case 'doctors': return 'Dokter';
      default: return 'Fasilitas Kesehatan';
    }
  };

  // Get color for facility type
  const getColorForType = (type) => {
    switch (type) {
      case 'hospital': return 'blue';
      case 'clinic': return 'green';
      case 'puskesmas': return 'yellow';
      case 'pharmacy': return 'purple';
      case 'doctors': return 'teal';
      default: return 'gray';
    }
  };

  // Get icon for facility type
  const getIconForType = (type) => {
    switch (type) {
      case 'hospital': return faHospital;
      case 'clinic': return faClinicMedical;
      case 'puskesmas': return faFirstAid;
      case 'pharmacy': return faPills;
      default: return faClinicMedical;
    }
  };

  // Render star rating
  const renderStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <FontAwesomeIcon key={`full-${i}`} icon={faStar} className="text-amber-500 text-xs" />
        ))}
        {halfStar && <FontAwesomeIcon icon={faStarHalfAlt} className="text-amber-500 text-xs" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FontAwesomeIcon key={`empty-${i}`} icon={farStar} className="text-amber-500 text-xs" />
        ))}
      </div>
    );
  };

  // Handle facility card click
  const handleFacilityClick = (facility) => {
    if (mapInstanceRef.current && facility) {
      // Center map on facility
      mapInstanceRef.current.setView([facility.lat, facility.lng], 16);
      
      // Open popup if marker exists
      if (facility.marker) {
        facility.marker.openPopup();
      }
    }
  };

  // Handle search radius change
  const handleRadiusChange = (e) => {
    const radius = parseInt(e.target.value);
    setSearchRadius(radius);
  };

  // Handle refresh search
  const handleRefreshSearch = () => {
    if (userLocation) {
      // Clear cache to force new search with current radius
      const radiusValues = [5000, 10000, 15000, 20000, 30000];
      radiusValues.forEach(radius => {
        const cacheKey = `health_facilities_${userLocation.lat.toFixed(4)}_${userLocation.lng.toFixed(4)}_${radius}`;
        localStorage.removeItem(cacheKey);
      });
      searchNearbyFacilities(userLocation, searchRadius);
    } else {
      alert('Lokasi pengguna belum tersedia. Mohon izinkan akses lokasi terlebih dahulu.');
    }
  };

  // Mock API function that would fetch from a real API in production
  const fetchHealthFacilitiesFromAPI = (location, radius) => {
    // In a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo purposes, return sample data
        resolve(showSampleData());
      }, 500);
    });
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="bg-blue-500 text-white py-8 px-6 rounded-xl mb-6 relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Lokasi Fasilitas Kesehatan</h1>
            <p className="text-lg">Temukan rumah sakit, klinik, puskesmas, dan apotek terdekat</p>
          </div>
          <div className="absolute inset-0 bg-blue-600 bg-opacity-30 hero-pattern"></div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          {showSampleNotice && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
                <span><strong>Informasi:</strong> Menampilkan data contoh. Beberapa fitur mungkin terbatas.</span>
              </div>
            </div>
          )}
          
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
                <span><strong>Perhatian:</strong> {errorMessage}</span>
              </div>
              <div className="mt-2">
                <button 
                  onClick={getUserLocation}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
                >
                  <FontAwesomeIcon icon={faLocationArrow} className="mr-1" /> Coba Lagi
                </button>
              </div>
            </div>
          )}
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="w-full md:w-auto">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Cari berdasarkan nama atau alamat..." 
                  className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute right-3 top-2 text-gray-500">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-sm whitespace-nowrap">Radius:</span>
              <select 
                className="border border-gray-300 rounded-md text-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchRadius}
                onChange={handleRadiusChange}
              >
                <option value="5000">5 km</option>
                <option value="10000">10 km</option>
                <option value="15000">15 km</option>
                <option value="20000">20 km</option>
                <option value="30000">30 km</option>
              </select>
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
                onClick={handleRefreshSearch}
              >
                <FontAwesomeIcon icon={faSyncAlt} />
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              <button 
                className={`px-4 py-2 rounded-full font-medium transition ${activeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                onClick={() => setActiveFilter('all')}
              >
                Semua
              </button>
              <button 
                className={`px-4 py-2 rounded-full font-medium transition ${activeFilter === 'hospital' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                onClick={() => setActiveFilter('hospital')}
              >
                <FontAwesomeIcon icon={faHospital} className="mr-1" /> Rumah Sakit
              </button>
              <button 
                className={`px-4 py-2 rounded-full font-medium transition ${activeFilter === 'clinic' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                onClick={() => setActiveFilter('clinic')}
              >
                <FontAwesomeIcon icon={faClinicMedical} className="mr-1" /> Klinik
              </button>
              <button 
                className={`px-4 py-2 rounded-full font-medium transition ${activeFilter === 'puskesmas' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                onClick={() => setActiveFilter('puskesmas')}
              >
                <FontAwesomeIcon icon={faFirstAid} className="mr-1" /> Puskesmas
              </button>
              <button 
                className={`px-4 py-2 rounded-full font-medium transition ${activeFilter === 'pharmacy' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                onClick={() => setActiveFilter('pharmacy')}
              >
                <FontAwesomeIcon icon={faPills} className="mr-1" /> Apotek
              </button>
            </div>
          </div>
        </div>

        {/* Map and Facility List */}
        <div className="flex flex-col-reverse md:flex-row gap-6">
          {/* Facility List (Left Side) */}
          <div className="w-full md:w-2/5">
            <div className="bg-white rounded-xl shadow-md p-4">
              <h2 className="text-xl font-semibold mb-4">Fasilitas Kesehatan Terdekat</h2>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-gray-600"><span>{filteredFacilities.length}</span> fasilitas ditemukan</p>
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2 text-sm">Urutkan:</span>
                    <select 
                      className="border border-gray-300 rounded-md text-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="distance">Jarak Terdekat</option>
                      <option value="name">Nama (A-Z)</option>
                      <option value="rating">Rating Tertinggi</option>
                    </select>
                  </div>
                </div>
                
                <div className="facility-list space-y-3 h-[calc(100vh-230px)] overflow-y-auto">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                    </div>
                  ) : filteredFacilities.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <FontAwesomeIcon icon={faSearchLocation} className="text-3xl mb-2" />
                      <p>Tidak ada fasilitas kesehatan yang ditemukan.</p>
                      <p className="text-sm mt-2">Coba ubah filter atau pencarian Anda.</p>
                    </div>
                  ) : (
                    // Limit to 50 items for performance
                    filteredFacilities.slice(0, 50).map(facility => (
                      <div 
                        key={facility.id}
                        className="facility-card p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition cursor-pointer"
                        onClick={() => handleFacilityClick(facility)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{facility.name}</h3>
                            <div className="flex items-center my-1">
                              <span className={`inline-block px-2 py-0.5 text-xs rounded-full bg-${getColorForType(facility.type)}-100 text-${getColorForType(facility.type)}-800`}>
                                <FontAwesomeIcon icon={getIconForType(facility.type)} className="mr-1" /> 
                                {getFacilityTypeLabel(facility.type)}
                              </span>
                              <span className="text-xs text-gray-500 ml-2">{formatDistance(facility.distance)}</span>
                            </div>
                            <div className="text-amber-500 flex items-center">
                              <span className="mr-1">{facility.rating}</span>
                              {renderStarRating(facility.rating)}
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
                            onClick={(e) => e.stopPropagation()} // Prevent card click when clicking the link
                          >
                            <FontAwesomeIcon icon={faDirections} className="mr-1" /> Petunjuk Arah
                          </a>
                          <button 
                            className="text-xs text-gray-600 hover:text-blue-600"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent card click
                              handleFacilityClick(facility);
                            }}
                          >
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" /> Lihat di Peta
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Map (Right Side) */}
          <div className="w-full md:w-3/5">
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="w-full h-full relative">
                <div
                  ref={mapRef}
                  className="w-full h-[450px] md:h-[600px] rounded-lg shadow-md"
                ></div>
                
                {isLoading && (
                  <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
                    <div className="text-center">
                      <FontAwesomeIcon icon={faSpinner} spin className="text-blue-500 text-4xl mb-2" />
                      <p className="text-gray-700">Memuat peta...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LokasiPage;