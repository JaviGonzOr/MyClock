"use client";

import { useState } from "react";

export function useGeolocation() {
  const [loading, setLoading] = useState(false);

  async function getLocation() {
    setLoading(true);

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          });
        }
      );

      return position.coords;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    getLocation,
  };
}