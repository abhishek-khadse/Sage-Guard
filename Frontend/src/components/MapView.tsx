import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { mockIncidents } from './Dashboard';

const MapView = () => {
  return (
    <div className="flex-1 p-8 ml-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Incident Map</h1>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden" style={{ height: 'calc(100vh - 8rem)' }}>
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {mockIncidents.map((incident) => (
              <Marker 
                key={incident.id} 
                position={[incident.location.lat, incident.location.lng]}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold">Vehicle: {incident.vehicleId}</h3>
                    <p className="text-sm text-gray-600">Status: {incident.status}</p>
                    <p className="text-sm text-gray-600">Severity: {incident.severity}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapView;