export interface Incident {
  id: string;
  vehicleId: string;
  userId: string;
  timestamp: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'Detected' | 'Alert Sent' | 'Responded';
  severity: 'Low' | 'Medium' | 'High';
  sensorData: {
    acceleration: number;
    speed: number;
    impactLevel: number;
  };
  imageUrl?: string;
}

export interface User {
  id: string;
  email: string;
  role: 'Admin' | 'Viewer';
}