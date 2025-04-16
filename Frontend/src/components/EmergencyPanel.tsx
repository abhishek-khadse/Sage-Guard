import React from 'react';
import { AlertTriangle, Phone, MessageSquare, MapPin } from 'lucide-react';

const EmergencyPanel: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-red-600 flex items-center gap-2">
          <AlertTriangle className="h-8 w-8" />
          Emergency Response Panel
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Quick access to emergency resources and communication channels
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Emergency Contact Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Phone className="h-6 w-6 text-blue-500" />
            <h2 className="text-xl font-semibold">Emergency Contacts</h2>
          </div>
          <div className="space-y-3">
            <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors">
              Call Emergency Services (911)
            </button>
            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
              Contact Dispatch Center
            </button>
          </div>
        </div>

        {/* Quick Communication Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="h-6 w-6 text-green-500" />
            <h2 className="text-xl font-semibold">Quick Communication</h2>
          </div>
          <div className="space-y-3">
            <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors">
              Send Alert to All Units
            </button>
            <button className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition-colors">
              Request Backup
            </button>
          </div>
        </div>

        {/* Location Services Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="h-6 w-6 text-purple-500" />
            <h2 className="text-xl font-semibold">Location Services</h2>
          </div>
          <div className="space-y-3">
            <button className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition-colors">
              Share Current Location
            </button>
            <button className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition-colors">
              View Nearby Resources
            </button>
          </div>
        </div>
      </div>

      {/* Live Status Panel */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Live Emergency Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">Active Units</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">12</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">Pending Responses</p>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">3</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">Average Response Time</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">4.2 min</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPanel;