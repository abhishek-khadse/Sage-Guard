import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
  lastMessage: any;
  error: string | null;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  connected: false,
  lastMessage: null,
  error: null,
});

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const socketUrl = import.meta.env.VITE_WEBSOCKET_URL || 'http://localhost:3001';
    console.log('Attempting to connect to WebSocket at:', socketUrl);

    const newSocket = io(socketUrl, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
    });

    newSocket.on('connect', () => {
      setConnected(true);
      setError(null);
      console.log('WebSocket connected successfully');
    });

    newSocket.on('connect_error', (err) => {
      setConnected(false);
      setError(`Connection error: ${err.message}`);
      console.error('WebSocket connection error:', err);
    });

    newSocket.on('disconnect', (reason) => {
      setConnected(false);
      setError(`Disconnected: ${reason}`);
      console.log('WebSocket disconnected:', reason);
    });

    newSocket.on('error', (err) => {
      setError(`Socket error: ${err.message}`);
      console.error('WebSocket error:', err);
    });

    newSocket.on('incident', (data) => {
      setLastMessage(data);
      console.log('Received incident:', data);
      // Trigger browser notification if enabled
      if (Notification.permission === 'granted') {
        new Notification('New Incident Detected', {
          body: `Vehicle ${data.vehicleId} reported an incident`,
          icon: '/notification-icon.png',
        });
      }
    });

    setSocket(newSocket);

    return () => {
      console.log('Cleaning up WebSocket connection');
      newSocket.close();
    };
  }, []);

  const value = {
    socket,
    connected,
    lastMessage,
    error,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};