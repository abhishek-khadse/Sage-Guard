import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Briefcase, Calendar } from 'lucide-react';

const Profile = () => {
  return (
    <motion.div 
      className="p-6 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
          <div className="absolute -bottom-16 left-6">
            <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="pt-20 px-6 pb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">John Doe</h1>
          <p className="text-gray-600 dark:text-gray-400">Emergency Response Coordinator</p>
          
          <div className="mt-6 space-y-4">
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <Mail className="w-5 h-5 mr-3" />
              <span>john.doe@example.com</span>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <Phone className="w-5 h-5 mr-3" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <MapPin className="w-5 h-5 mr-3" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <Briefcase className="w-5 h-5 mr-3" />
              <span>Emergency Services Department</span>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <Calendar className="w-5 h-5 mr-3" />
              <span>Joined January 2023</span>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bio</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Experienced emergency response coordinator with over 8 years of experience in crisis management 
              and disaster response. Specialized in coordinating multi-agency emergency operations and 
              implementing emergency preparedness programs.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;