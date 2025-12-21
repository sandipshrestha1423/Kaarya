import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
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
      console.error("Address fetch error", error);
      setAddress("Coordinates selected");
    }
  };
  
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
  const [position, setPosition] = useState(initialPosition || null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!position) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          },
          () => {
            setPosition({ lat: 27.7172, lng: 85.3240 }); // Default: Kathmandu
          }
        );
      } else {
         setPosition({ lat: 27.7172, lng: 85.3240 });
      }
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

  if (!position) return <div className="h-64 flex items-center justify-center bg-gray-100">Loading Map...</div>;

  return (
    <div className="w-full h-full min-h-[300px] rounded-xl overflow-hidden shadow-inner border border-gray-200">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
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