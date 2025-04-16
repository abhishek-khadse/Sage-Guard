import React from 'react';
import { AlertTriangle, Clock, MapPin } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Incident } from '../types';

interface IncidentCardProps {
  incident: Incident;
  onClick: () => void;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ incident, onClick }) => {
  const statusColors = {
    'Detected': 'bg-yellow-100 text-yellow-800',
    'Alert Sent': 'bg-blue-100 text-blue-800',
    'Responded': 'bg-green-100 text-green-800'
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[incident.status]}`}>
            {incident.status}
          </span>
        </div>
        <AlertTriangle className={`w-5 h-5 ${incident.severity === 'High' ? 'text-red-500' : 'text-yellow-500'}`} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <Clock className="w-4 h-4 mr-2" />
          {formatDistanceToNow(new Date(incident.timestamp), { addSuffix: true })}
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <MapPin className="w-4 h-4 mr-2" />
          {incident.location.address}
        </div>

        <div className="text-sm font-medium text-gray-900 dark:text-white">
          Vehicle ID: {incident.vehicleId}
        </div>
      </div>

      {incident.imageUrl && (
        <div className="mt-3">
          <img 
            src={incident.imageUrl} 
            alt="Incident snapshot" 
            className="w-full h-32 object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default IncidentCard;