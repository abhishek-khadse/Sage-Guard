import React from 'react';
import { Bell, AlertTriangle, Car, Users } from 'lucide-react';
import IncidentCard from './IncidentCard';

export const mockIncidents = [
  {
    id: '1',
    vehicleId: 'VH-2024-001',
    userId: 'USR-001',
    timestamp: new Date().toISOString(),
    location: {
      lat: 51.505,
      lng: -0.09,
      address: '123 Oxford Street, London'
    },
    status: 'Detected',
    severity: 'High',
    sensorData: {
      acceleration: 9.8,
      speed: 60,
      impactLevel: 8.5
    },
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80'
  }
] as const;

const Dashboard = () => {
  return (
    <div className="flex-1 p-8 ml-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Real-Time Dashboard</h1>
          <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Incidents</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Monitored Vehicles</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">128</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Car className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Incidents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockIncidents.map((incident) => (
              <IncidentCard 
                key={incident.id} 
                incident={incident} 
                onClick={() => console.log('Incident clicked:', incident.id)} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;