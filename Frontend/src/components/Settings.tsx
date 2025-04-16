import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Moon, Sun, Volume2, Bell, Lock, Shield, User } from 'lucide-react';

const Settings = () => {
  return (
    <motion.div 
      className="p-6 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center mb-8">
        <SettingsIcon className="h-8 w-8 text-blue-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
      </div>

      <div className="grid gap-6">
        {/* Appearance Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <Sun className="h-5 w-5 mr-2" />
            Appearance
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-700 dark:text-gray-300">Dark Mode</label>
              <button className="w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 relative">
                <div className="w-4 h-4 rounded-full bg-white absolute top-1 left-1 dark:left-7 transition-all"></div>
              </button>
            </div>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-700 dark:text-gray-300">Push Notifications</label>
              <button className="w-12 h-6 rounded-full bg-blue-600 relative">
                <div className="w-4 h-4 rounded-full bg-white absolute top-1 left-7 transition-all"></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-700 dark:text-gray-300">Email Alerts</label>
              <button className="w-12 h-6 rounded-full bg-blue-600 relative">
                <div className="w-4 h-4 rounded-full bg-white absolute top-1 left-7 transition-all"></div>
              </button>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Security
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-700 dark:text-gray-300">Two-Factor Authentication</label>
              <button className="w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 relative">
                <div className="w-4 h-4 rounded-full bg-white absolute top-1 left-1 transition-all"></div>
              </button>
            </div>
            <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              Change Password
            </button>
          </div>
        </section>

        {/* Audio Settings */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <Volume2 className="h-5 w-5 mr-2" />
            Audio
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-700 dark:text-gray-300">Alert Volume</label>
              <input type="range" className="w-32" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-700 dark:text-gray-300">Voice Commands</label>
              <button className="w-12 h-6 rounded-full bg-blue-600 relative">
                <div className="w-4 h-4 rounded-full bg-white absolute top-1 left-7 transition-all"></div>
              </button>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Settings;