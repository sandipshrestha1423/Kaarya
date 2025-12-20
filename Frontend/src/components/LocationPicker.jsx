import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";

// Fix for default marker icon in React-Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker({ position, setPosition, setAddress }) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      // Optional: Reverse geocoding could go here using Nominatim API (Free)
      fetchAddress(e.latlng.lat, e.latlng.lng);
    },
  });

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      if (data && data.display_name) {
        setAddress(data.display_name);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Coordinates selected");
    }
  };
  
  // Center map on position update if need
  useEffect(() => {
     if(position) {
         map.flyTo(position, map.getZoom());
     }
  }, [position, map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Selected Location</Popup>
    </Marker>
  );
}

const LocationPicker = ({ onLocationSelect, initialPosition }) => {
  // Default position: Centered on a generic location 
  // Or try to get user's current location
  const [position, setPosition] = useState(initialPosition || null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator && !position) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition({ lat: latitude, lng: longitude });
        },
        (err) => {
          console.warn("Geolocation permission denied or error:", err);
          // Fallback to a default location (Kathmandu, Nepal)
          setPosition({ lat: 27.7172, lng: 85.3240 }); 
        }
      );
    } else if (!position) {
       // Fallback if geolocation API not supported
       setPosition({ lat: 27.7172, lng: 85.3240 });
    }
  }, []);

  useEffect(() => {
    if (position) {
      onLocationSelect({
        lat: position.lat,
        lng: position.lng,
        address: address,
      });
    }
  }, [position, address]);

  if (!position) return <div className="h-64 bg-gray-100 flex items-center justify-center">Loading Map...</div>;

  return (
    <div className="w-full h-full min-h-[300px] rounded-xl overflow-hidden shadow-inner border border-gray-200">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} setAddress={setAddress} />
      </MapContainer>
      {address && (
          <div className="bg-white dark:bg-gray-800 p-2 text-xs text-center border-t border-gray-200 dark:border-gray-700">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Selected: </span> 
              <span className="text-gray-600 dark:text-gray-400 truncate">{address}</span>
          </div>
      )}
    </div>
  );
};

export default LocationPicker;
