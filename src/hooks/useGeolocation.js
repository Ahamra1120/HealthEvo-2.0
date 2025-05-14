import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError(new Error("Geolocation tidak didukung oleh browser ini"));
      setLoading(false);
      return;
    }

    const handleSuccess = (position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      setLoading(false);
    };

    const handleError = (error) => {
      setError(error);
      setLoading(false);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options
    );
  }, []);

  return { location, error, loading };
};

export default useGeolocation;