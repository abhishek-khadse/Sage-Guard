import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Login from './Login';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';
import Analytics from './components/Analytics';
import About from './components/About';
import Profile from './components/Profile';
import Settings from './components/Settings';
import EmergencyPanel from './components/EmergencyPanel';
import IncidentDetails from './components/IncidentDetails';
import { ThemeProvider } from './contexts/ThemeContext';
import { SocketProvider } from './contexts/SocketContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import VoiceCommandProvider from './contexts/VoiceCommandContext';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <SocketProvider>
            <VoiceCommandProvider>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
                <Sidebar />
                <AnimatePresence mode="wait">
                  <motion.div
                    className="flex-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                      <Route path="/map" element={<ProtectedRoute><MapView /></ProtectedRoute>} />
                      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                      <Route path="/about" element={<About />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                      <Route path="/emergency" element={<ProtectedRoute><EmergencyPanel /></ProtectedRoute>} />
                      <Route path="/incidents/:id" element={<ProtectedRoute><IncidentDetails /></ProtectedRoute>} />
                    </Routes>
                  </motion.div>
                </AnimatePresence>
              </div>
            </VoiceCommandProvider>
          </SocketProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;