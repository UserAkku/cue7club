"use client";

import { useEffect, useState } from "react";

export function useLocationSharing(bookingId: string, isActive: boolean) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isActive) return;

    let watchId: number;

    const shareLocation = async (pos: GeolocationPosition) => {
      try {
        await fetch("/api/tracking/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookingId,
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        });
      } catch (err) {
        console.error("Failed to share location", err);
      }
    };

    if ("geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        shareLocation,
        (err) => {
          setError(err.message);
          console.error("Geolocation error:", err);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }

    return () => {
      if (watchId !== undefined) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [bookingId, isActive]);

  return { error };
}
