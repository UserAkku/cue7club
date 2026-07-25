"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { pusherClient } from "@/lib/pusherClient";

const proIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const homeIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function TrackingMap({ bookingId, customerLat, customerLng }: { bookingId: string, customerLat: number, customerLng: number }) {
  const [proLocation, setProLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Subscribe to booking-specific tracking channel
    const channelName = `private-tracking-\${bookingId}`;
    const channel = pusherClient.subscribe(channelName);
    
    channel.bind("location-update", (data: { lat: number; lng: number }) => {
      setProLocation({ lat: data.lat, lng: data.lng });
    });

    return () => {
      pusherClient.unsubscribe(channelName);
    };
  }, [bookingId]);

  return (
    <div className="h-full w-full rounded-xl overflow-hidden border border-white/5 relative z-0">
      <MapContainer
        center={[customerLat, customerLng]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {/* Customer Location */}
        <Marker position={[customerLat, customerLng]} icon={homeIcon}>
          <Popup>Service Location</Popup>
        </Marker>

        {/* Pro Location (Live) */}
        {proLocation && (
          <Marker position={[proLocation.lat, proLocation.lng]} icon={proIcon}>
            <Popup>Professional is En Route</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
