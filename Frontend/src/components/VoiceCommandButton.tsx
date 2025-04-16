import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useVoiceCommand } from '../contexts/VoiceCommandContext';
import { motion } from 'framer-motion';

const VoiceCommandButton: React.FC = () => {
  const { isListening, startListening, stopListening } = useVoiceCommand();

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <motion.button
      onClick={toggleListening}
      className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg ${
        isListening 
          ? 'bg-emerald-500 text-white' 
          : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {isListening ? (
        <Mic className="w-6 h-6" />
      ) : (
        <MicOff className="w-6 h-6" />
      )}
    </motion.button>
  );
};

export default VoiceCommandButton;