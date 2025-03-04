import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Video,
  Users,
  Trophy,
  Music,
  Star,
  Play,
  Clock,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useAuth } from '../context/AuthContext';
import { getEvents } from '../API/ApiResponse';

interface Event {
  id: string;
  title: string;
  type: 'academic' | 'sports' | 'cultural' | 'meeting';
  date: string;
  time: string;
  location: string;
  image: string;
  isLive?: boolean;
}

const Events: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [filter, setFilter] = useState('all');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await getEvents();
        console.log('Events fetched:', response.data);
        setEvents(response.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

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

  const filteredEvents = filter === 'all' ? events : events.filter(event => event.type === filter);
  const liveEvent = events.find(event => event.isLive);

  return (
    <div className="space-y-12 bg-gray-50 min-h-screen px-6 py-8 md:px-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row justify-between items-center"
      >
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Homies Events</h1>
          <p className="text-gray-600 text-lg">What’s poppin’, homie? Catch all the action here!</p>
        </div>
        <Link
          to={isAuthenticated ? "/dashboard" : "/auth"}
          className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-md hover:bg-blue-700 transition flex items-center gap-2"
        >
          <CalendarIcon className="w-5 h-5" />
          {isAuthenticated ? "Back to Dashboard" : "Join the Homies"}
        </Link>
      </motion.div>

      {/* Live Event Banner */}
      {liveEvent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-red-600 to-red-500 rounded-3xl shadow-2xl p-8 text-white"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              <Video className="w-6 h-6" />
            </motion.div>
            <span className="font-semibold text-lg">LIVE NOW</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 drop-shadow-md">{liveEvent.title}</h2>
          <div className="flex items-center gap-4 text-sm">
            <span>{liveEvent.date} • {liveEvent.time}</span>
            <span>{liveEvent.location}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-6 py-2 bg-white text-red-600 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            Join Stream
          </motion.button>
        </motion.div>
      )}

      {/* Filters */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center gap-4 overflow-x-auto pb-2 max-w-4xl mx-auto"
      >
        {[
          { value: 'all', label: 'All Events', icon: <Star /> },
          { value: 'academic', label: 'Academic', icon: <Trophy /> },
          { value: 'sports', label: 'Sports', icon: <Users /> },
          { value: 'cultural', label: 'Cultural', icon: <Music /> },
          { value: 'meeting', label: 'Meetings', icon: <CalendarIcon /> },
        ].map((f) => (
          <FilterButton
            key={f.value}
            active={filter === f.value}
            onClick={() => setFilter(f.value)}
            icon={f.icon}
            label={f.label}
          />
        ))}
      </motion.div>

      {/* Events Grid */}
      {loading ? (
        <div className="text-center text-gray-600">Loading events, homie...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

const FilterButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <motion.button
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition shadow-md whitespace-nowrap ${
      active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
  >
    {icon}
    {label}
  </motion.button>
);

const EventCard: React.FC<{ event: Event }> = ({ event }) => (
  <motion.div
    whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
    className="bg-white rounded-2xl shadow-md overflow-hidden"
  >
    <motion.img
      src={event.image}
      alt={event.title}
      className="w-full h-48 object-cover"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    />
    {event.isLive && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white rounded-full flex items-center gap-2 shadow-md"
      >
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
          <div className="w-2 h-2 bg-white rounded-full" />
        </motion.div>
        LIVE
      </motion.div>
    )}
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
      <div className="space-y-1 text-gray-600 text-sm">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{event.location}</span>
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Register
        </motion.button>
        {event.isLive ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-red-100 text-red-600 rounded-full font-semibold hover:bg-red-200 transition"
          >
            Join
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Remind
          </motion.button>
        )}
      </div>
    </div>
  </motion.div>
);

export default Events;