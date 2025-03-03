import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
    className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 to-gray-300"
  >
    <div className="text-center">
      <motion.h1
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-8xl font-bold text-gray-800"
      >
        404
      </motion.h1>
      <p className="text-2xl text-gray-600 mt-4">Oops! Page Not Found</p>
      <Link
        to="/dashboard"
        className="mt-6 inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
      >
        Back to Dashboard
      </Link>
    </div>
  </motion.div>
);

export default NotFound;