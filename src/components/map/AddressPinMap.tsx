"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "@/components/ui/Button";
import { reverseGeocode } from "@/lib/nominatim";

// Fix Leaflet default marker icon issue in Next.js
const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationMarker({ position, setPosition }: any) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  // Try to get user's location on first load
  useEffect(() => {
    map.locate();
  }, [map]);

  return position === null ? null : (
    <Marker 
      position={position} 
      icon={customIcon}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          const pos = marker.getLatLng();
          setPosition(pos);
          map.flyTo(pos, map.getZoom());
        },
      }}
    />
  );
}

export default function AddressPinMap({ onConfirm }: { onConfirm: (lat: number, lng: number, address: string) => void }) {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const [address, setAddress] = useState<string>("Fetching address...");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (position) {
      setLoading(true);
      setAddress("Fetching address...");
      reverseGeocode(position.lat, position.lng).then((addr) => {
        setAddress(addr);
        setLoading(false);
      });
    }
  }, [position]);

  return (
    <div className="relative h-full w-full flex flex-col">
      <div className="flex-1 min-h-[300px]">
        <MapContainer
          center={[28.6139, 77.2090]} // Default to Delhi
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%", zIndex: 0 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} setPosition={setPosition} />
        </MapContainer>
      </div>
      
      {position && (
        <div className="absolute bottom-4 left-4 right-4 z-10 bg-card border border-white/10 p-4 rounded-xl shadow-xl glass-dark">
          <p className="text-sm font-medium mb-3 line-clamp-2">{address}</p>
          <Button 
            className="w-full" 
            onClick={() => onConfirm(position.lat, position.lng, address)}
            disabled={loading}
          >
            Confirm Location
          </Button>
        </div>
      )}
    </div>
  );
}
