import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full mx-auto my-8"
  />
);

export default LoadingSpinner;