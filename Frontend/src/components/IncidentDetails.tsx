import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Incident {
  id: string;
  title: string;
  description: string;
  status: string;
  location: string;
  timestamp: string;
  severity: string;
  assignedTo: string;
}

const IncidentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call to fetch incident details
    const fetchIncident = async () => {
      try {
        // Simulated API call
        const mockIncident: Incident = {
          id: id || '',
          title: 'Sample Incident',
          description: 'This is a detailed description of the incident.',
          status: 'Active',
          location: 'Building A, Floor 3',
          timestamp: new Date().toISOString(),
          severity: 'High',
          assignedTo: 'Security Team A'
        };
        setIncident(mockIncident);
      } catch (error) {
        console.error('Error fetching incident details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncident();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!incident) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-600 dark:text-gray-400">Incident not found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {incident.title}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Details</h2>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">Status:</span> {incident.status}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">Location:</span> {incident.location}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">Severity:</span> {incident.severity}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">Assigned To:</span> {incident.assignedTo}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">Reported At:</span> {new Date(incident.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</h2>
            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
              {incident.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default IncidentDetails; 