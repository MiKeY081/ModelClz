import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, ChevronRight } from 'lucide-react';

const AboutCareers: React.FC = () => {
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
            <Briefcase className="w-10 h-10 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Careers</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Yo, homie—join the EduExcel crew and make waves in education with the Homies!
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Opportunities</h2>
          <p className="text-gray-600">
            We’re always scouting dope Homies—teachers, devs, and vibe-bringers—to level up our LMS game!
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

export default AboutCareers;