import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Trophy,
  Medal,
  Award,
  Star,
  Users,
  Filter,
  Search,
  ChevronDown,
  Share2,
  ChevronRight,
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useAuth } from '../context/AuthContext';
import { getAchievements } from '../API/ApiResponse';

interface Achievement {
  id: string;
  title: string;
  achiever: {
    name: string;
    role: 'student' | 'teacher' | 'parent' | 'admin';
    image: string;
  };
  date: string;
  category: 'academic' | 'competition' | 'research';
  description: string;
  badge: 'gold' | 'silver' | 'bronze' | 'platinum';
}

const Achievements: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Animation controls
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        const response = await getAchievements();
        console.log('Achievements fetched:', response);

        setAchievements(response);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  const filteredAchievements = achievements?.filter(achievement =>
    (filter === 'all' || achievement.category === filter) &&
    (achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     achievement.achiever.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Homies Hall of Fame</h1>
          <p className="text-gray-600 text-lg">Yo, homie—check out the crew’s shining moments!</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-md hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Trophy className="w-5 h-5" />
          Submit Achievement
        </motion.button>
      </motion.div>

      {/* Search and Filters */}
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search achievements, homie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold shadow-md hover:bg-gray-200 transition flex items-center gap-2"
          >
            <Filter className="w-5 h-5" />
            Filters <ChevronDown className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-4 mt-6 overflow-x-auto pb-2 max-w-4xl mx-auto"
        >
          {[
            { value: 'all', label: 'All', icon: <Trophy /> },
            { value: 'academic', label: 'Academic', icon: <Award /> },
            { value: 'competition', label: 'Competitions', icon: <Medal /> },
            { value: 'research', label: 'Research', icon: <Star /> },
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
      </div>

      {/* Achievements Grid */}
      {loading ? (
  <div className="text-center text-gray-600">Loading the Homies Hall of Fame...</div>
) : error ? (
  <div className="text-center text-red-500">{error}</div>
) : achievements ? (
  <motion.div
    ref={ref}
    variants={containerVariants}
    initial="hidden"
    animate={inView ? "visible" : "hidden"}
    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
  >
    {filteredAchievements?.length === 0 ? (
      <div className="col-span-full text-center text-gray-500 py-12">
        No achievements found, homie—try a different search or filter!
      </div>
    ) : (
      filteredAchievements?.map((achievement) => (
        <AchievementCard key={achievement.id} achievement={achievement} />
      ))
    )}
  </motion.div>
) : (
  <div className="text-center text-gray-500">
    No achievements found, homie—start achieving some goals!
  </div>
)}

      {/* Back to Dashboard */}
      {isAuthenticated && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-md hover:bg-blue-700 transition"
          >
            Back to Dashboard <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
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

const AchievementCard: React.FC<{ achievement: Achievement }> = ({ achievement }) => {
  const badgeColors = {
    gold: 'bg-yellow-100 text-yellow-800',
    silver: 'bg-gray-100 text-gray-800',
    bronze: 'bg-orange-100 text-orange-800',
    platinum: 'bg-purple-100 text-purple-800',
  };

  return (
    <motion.div
      whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
      className="bg-white rounded-2xl shadow-md overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
          achievement?.achiever?.image && <motion.img
              src={achievement?.achiever?.image|| ''}
              alt={achievement.achiever?.name || ''} 
              className="w-12 h-12 rounded-full object-cover shadow-md"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <div>
              <h3 className="font-semibold text-gray-800">{achievement.achiever?.name}</h3>
              <p className="text-sm text-gray-600 capitalize">{achievement.achiever?.role}</p>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeColors[achievement.badge]} shadow-sm`}
          >
            {achievement.badge?.charAt(0).toUpperCase() + achievement.badge?.slice(1)}
          </span>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">{achievement.title}</h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{achievement.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Trophy className="w-4 h-4 text-blue-500" />
            <span>{achievement.date}</span>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              <Share2 className="w-5 h-5 text-gray-600" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
            >
              <Star className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Achievements;