// Calculate distance between two coordinates in meters
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Radius of the earth in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;
  
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c;
  };
  
  // Format distance for display
  export const formatDistance = (distance) => {
    if (distance < 1000) {
      return `${Math.round(distance)} m`;
    } else {
      return `${(distance / 1000).toFixed(1)} km`;
    }
  };
  
  // Get facility type label
  export const getFacilityTypeLabel = (type) => {
    switch (type) {
      case 'hospital': return 'Rumah Sakit';
      case 'clinic': return 'Klinik';
      case 'puskesmas': return 'Puskesmas';
      case 'pharmacy': return 'Apotek';
      case 'doctors': return 'Dokter';
      default: return 'Fasilitas Kesehatan';
    }
  };
  
  // Get icon and color for facility type
  export const getFacilityIconInfo = (type) => {
    switch (type) {
      case 'hospital':
        return { iconClass: 'hospital', iconColor: 'blue' };
      case 'clinic':
        return { iconClass: 'clinic-medical', iconColor: 'green' };
      case 'puskesmas':
        return { iconClass: 'first-aid', iconColor: 'yellow' };
      case 'pharmacy':
        return { iconClass: 'pills', iconColor: 'purple' };
      case 'doctors':
        return { iconClass: 'user-md', iconColor: 'teal' };
      default:
        return { iconClass: 'clinic-medical', iconColor: 'gray' };
    }
  };
  
  // Sample data for fallback
  export const getSampleFacilities = (userLocation) => {
    const sampleLocations = [
      {
        name: "RSUD Dr. Soetomo",
        type: "hospital",
        address: "Jl. Mayjen Prof. Dr. Moestopo No.6-8, Airlangga, Kec. Gubeng, Kota Surabaya",
        rating: "4.5",
        reviews: 230,
        lat: -7.2691,
        lng: 112.7586
      },
      {
        name: "RSUP Dr. Sardjito",
        type: "hospital",
        address: "Jl. Kesehatan No.1, Senolowo, Sinduadi, Kec. Mlati, Kabupaten Sleman, DIY",
        rating: "4.2",
        reviews: 185,
        lat: -7.7689,
        lng: 110.3708
      },
      {
        name: "RSUP Dr. Kariadi",
        type: "hospital",
        address: "Jl. DR. Sutomo No.16, Randusari, Kec. Semarang Sel., Kota Semarang",
        rating: "4.4",
        reviews: 210,
        lat: -6.9965,
        lng: 110.4077
      },
      {
        name: "Puskesmas Kecamatan Menteng",
        type: "puskesmas",
        address: "Jl. Johar Baru Utara I No.10, RT.11/RW.1, Johar Baru, Jakarta Pusat",
        rating: "4.0",
        reviews: 95,
        lat: -6.1867,
        lng: 106.8436
      },
      {
        name: "Klinik Pratama Medika",
        type: "clinic",
        address: "Jl. Raya Bogor Km. 24, Cijantung, Kec. Pasar Rebo, Jakarta Timur",
        rating: "3.9",
        reviews: 78,
        lat: -6.3070,
        lng: 106.8618
      },
      {
        name: "Apotek K-24 Thamrin",
        type: "pharmacy",
        address: "Jl. M.H. Thamrin No.12, RT.9/RW.5, Kebon Sirih, Menteng, Jakarta Pusat",
        rating: "4.3",
        reviews: 120,
        lat: -6.1931,
        lng: 106.8241
      },
      {
        name: "Apotek Century",
        type: "pharmacy",
        address: "Jl. Gatot Subroto Kav. 12-13, Kuningan Timur, Setiabudi, Jakarta Selatan",
        rating: "4.1",
        reviews: 105,
        lat: -6.2346,
        lng: 106.8303
      },
      {
        name: "Klinik Sehat Sentosa",
        type: "clinic",
        address: "Jl. Kebon Jeruk Raya No.27, RT.1/RW.2, Kebon Jeruk, Jakarta Barat",
        rating: "3.8",
        reviews: 65,
        lat: -6.1939,
        lng: 106.7683
      }
    ];
    
    const userLat = userLocation ? userLocation.lat : -6.2088;
    const userLng = userLocation ? userLocation.lng : 106.8456;
    
    return sampleLocations.map((location, index) => {
      const distance = calculateDistance(
        userLat, 
        userLng, 
        location.lat, 
        location.lng
      );
      
      return {
        id: `sample_${index}`,
        name: location.name,
        type: location.type,
        address: location.address,
        rating: location.rating,
        reviews: location.reviews,
        distance: distance,
        lat: location.lat,
        lng: location.lng,
        tags: {}
      };
    }).sort((a, b) => a.distance - b.distance);
  };