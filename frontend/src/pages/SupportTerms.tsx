import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, ChevronRight } from 'lucide-react';

const SupportTerms: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8 md:px-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto space-y-8"
      >
        <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <FileText className="w-10 h-10 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Terms of Service</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Yo, homie—these are the rules of the road for rocking with EduExcel. Keep it real with us!
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Agreement</h2>
          <p className="text-gray-600">
            By chilling with us, you’re cool with these terms—use the LMS for learning, not messin’ around, homie!
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Promise</h2>
          <p className="text-gray-600">
            We’ve got your back—delivering dope education tools and keeping the Homies squad tight!
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-md hover:bg-blue-700 transition"
          >
            Back to Dashboard <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SupportTerms;