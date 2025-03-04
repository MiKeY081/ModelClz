// frontend/src/components/Card.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl shadow-md p-6"
  >
    <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
    {children}
  </motion.div>
);

export default Card;