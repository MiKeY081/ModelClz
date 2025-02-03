import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation, Map, Info, Camera, Video } from 'lucide-react';

function VirtualTour() {
  const [selectedLocation, setSelectedLocation] = useState('main-building');

  const locations = [
    { id: 'main-building', name: 'Main Building', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000' },
    { id: 'library', name: 'Library', image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=2000' },
    { id: 'sports-complex', name: 'Sports Complex', image: 'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?auto=format&fit=crop&w=2000' },
    { id: 'science-labs', name: 'Science Labs', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=2000' },
  ];

  const currentLocation = locations.find(loc => loc.id === selectedLocation);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">Virtual Campus Tour</h1>
        <p className="text-gray-600 mb-6">
          Explore our state-of-the-art facilities through our interactive virtual tour.
        </p>
        
        {/* Navigation Controls */}
        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() => setSelectedLocation(location.id)}
              className={`flex items-center px-4 py-2 rounded-lg transition ${
                selectedLocation === location.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Navigation className="w-4 h-4 mr-2" />
              {location.name}
            </button>
          ))}
        </div>

        {/* Virtual Tour Viewer */}
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-100">
          <img
            src={currentLocation?.image}
            alt={currentLocation?.name}
            className="w-full h-full object-cover"
          />
          
          {/* Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <div className="flex justify-between items-center">
              <div className="text-white">
                <h3 className="font-semibold">{currentLocation?.name}</h3>
                <p className="text-sm opacity-80">Click and drag to look around</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition">
                  <Map className="w-5 h-5 text-white" />
                </button>
                <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition">
                  <Info className="w-5 h-5 text-white" />
                </button>
                <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition">
                  <Camera className="w-5 h-5 text-white" />
                </button>
                <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition">
                  <Video className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InfoCard
          title="Interactive Experience"
          description="Navigate through our campus with 360° views and detailed information about each location."
          icon={<Navigation className="w-6 h-6" />}
        />
        <InfoCard
          title="Guided Tours"
          description="Take a guided virtual tour with our AI assistant explaining key features and facilities."
          icon={<Info className="w-6 h-6" />}
        />
        <InfoCard
          title="Live Preview"
          description="Watch live streams of current activities and events happening around the campus."
          icon={<Video className="w-6 h-6" />}
        />
      </div>
    </div>
  );
}

function InfoCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

export default VirtualTour;