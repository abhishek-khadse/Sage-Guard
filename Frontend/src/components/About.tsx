import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Brain, Zap, Globe, GitBranch } from 'lucide-react';

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex-1 p-8 ml-20">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeIn} className="text-center mb-12">
          <Shield className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Sage Guard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            AI-Powered Road Accident Detection & Emergency Response System
          </p>
        </motion.div>

        <motion.div 
          {...fadeIn}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <Brain className="w-8 h-8 text-purple-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              AI-Powered Detection
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Advanced machine learning models process sensor data in real-time to detect accidents and anomalies with high accuracy.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <Zap className="w-8 h-8 text-yellow-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Instant Alerts
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Real-time notification system ensures immediate response coordination between emergency services.
            </p>
          </div>
        </motion.div>

        <motion.div 
          {...fadeIn} 
          className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            How It Works
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                1
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Data Collection
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  IoT sensors in vehicles continuously monitor acceleration, speed, and impact levels.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                2
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  AI Processing
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Machine learning models analyze the data stream to detect potential accidents.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                3
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Response Coordination
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Automated alerts notify emergency services with precise location and incident details.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div {...fadeIn} className="text-center">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Globe className="w-6 h-6 text-blue-600" />
            <span className="text-gray-600 dark:text-gray-300">
              Deployed globally, serving smart cities worldwide
            </span>
          </div>
          <a
            href="https://github.com/yourusername/sage-guard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
          >
            <GitBranch className="w-5 h-5 mr-2" />
            View on GitHub
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default About;