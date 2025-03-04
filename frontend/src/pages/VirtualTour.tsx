import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navigation, Map, Info, Camera, Video, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useAuth } from '../context/AuthContext';

const VirtualTour: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState('main-building');
  const [isImageLoaded, setImageLoaded] = useState(false);

  const locations = [
    { 
      id: 'main-building', 
      name: 'Main Building', 
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000',
      description: 'The heart of our campus—where the Homies vibe starts!',
    },
    { 
      id: 'library', 
      name: 'Library', 
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=2000',
      description: 'Knowledge HQ—stacked with books and digital goodies!',
    },
    { 
      id: 'sports-complex', 
      name: 'Sports Complex', 
      image: 'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?auto=format&fit=crop&w=2000',
      description: 'Where champs train—sweat it out Homies-style!',
    },
    { 
      id: 'science-labs', 
      name: 'Science Labs', 
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=2000',
      description: 'Experiment central—blow stuff up (safely, homie)!',
    },
  ];

  const currentLocation = locations.find(loc => loc.id === selectedLocation) || locations[0];
  const currentIndex = locations.findIndex(loc => loc.id === selectedLocation);

  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % locations.length;
    setSelectedLocation(locations[nextIndex].id);
    setImageLoaded(false);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + locations.length) % locations.length;
    setSelectedLocation(locations[prevIndex].id);
    setImageLoaded(false);
  };

  return (
    <div className="space-y-12 bg-gray-50 min-h-screen px-6 py-8 md:px-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-xl p-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Virtual Campus Tour</h1>
          <Link
            to={isAuthenticated ? "/dashboard" : "/auth"}
            className="mt-4 md:mt-0 text-blue-600 hover:text-blue-700 flex items-center gap-2 font-semibold"
          >
            {isAuthenticated ? "Back to Dashboard" : "Join the Homies"} <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto text-center">
          Step into our world, homie—explore the campus with 360° views and Homies swagger!
        </p>
      </motion.div>

      {/* Virtual Tour Viewer */}
      <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
        <motion.img
          key={currentLocation.id}
          src={currentLocation.image}
          alt={currentLocation.name}
          className="w-full h-[500px] object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: isImageLoaded ? 1 : 0, scale: isImageLoaded ? 1 : 1.1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          onLoad={() => setImageLoaded(true)}
        />
        {/* Navigation Arrows */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 rounded-full shadow-md hover:bg-white transition"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 rounded-full shadow-md hover:bg-white transition"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </motion.button>
        {/* Controls Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent"
        >
          <div className="flex justify-between items-center text-white">
            <div>
              <h3 className="text-xl font-semibold drop-shadow-md">{currentLocation.name}</h3>
              <p className="text-sm opacity-90 drop-shadow-sm">{currentLocation.description}</p>
            </div>
            <div className="flex gap-3">
              <motion.button whileHover={{ scale: 1.1 }} className="p-2 bg-white/30 rounded-lg hover:bg-white/40 transition">
                <Map className="w-5 h-5 text-white" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} className="p-2 bg-white/30 rounded-lg hover:bg-white/40 transition">
                <Info className="w-5 h-5 text-white" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} className="p-2 bg-white/30 rounded-lg hover:bg-white/40 transition">
                <Camera className="w-5 h-5 text-white" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} className="p-2 bg-white/30 rounded-lg hover:bg-white/40 transition">
                <Video className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center gap-4 overflow-x-auto pb-2 max-w-4xl mx-auto"
      >
        {locations.map((location) => (
          <motion.button
            key={location.id}
            variants={itemVariants}
            onClick={() => {
              setSelectedLocation(location.id);
              setImageLoaded(false);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center px-4 py-2 rounded-full font-semibold transition shadow-md ${
              selectedLocation === location.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Navigation className="w-4 h-4 mr-2" />
            {location.name}
          </motion.button>
        ))}
      </motion.div>

      {/* Information Cards */}
      <section className="container mx-auto px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-8 text-gray-800"
        >
          Tour Highlights
        </motion.h2>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <InfoCard
            title="Interactive Experience"
            description="Dive into 360° views and explore every corner, homie!"
            icon={<Navigation className="w-6 h-6 text-blue-500" />}
          />
          <InfoCard
            title="Guided Tours"
            description="AI homie guides you through the campus hotspots!"
            icon={<Info className="w-6 h-6 text-blue-500" />}
          />
          <InfoCard
            title="Live Preview"
            description="Catch live action—see what’s poppin’ right now!"
            icon={<Video className="w-6 h-6 text-blue-500" />}
          />
        </motion.div>
      </section>
    </div>
  );
};

const InfoCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
  <motion.div
    whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
    className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center text-center"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-4"
    >
      {icon}
    </motion.div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </motion.div>
);

export default VirtualTour;