import React, { useState, useEffect } from "react";

export default function useLocation() {
  const [location, setLocation] = useState({ lat: 0, lon: 0 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }, []);

  return [location.lat, location.lon];
}
