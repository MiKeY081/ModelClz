import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Medal,
  Award,
  Star,
  Users,
  Filter,
  Search,
  ChevronDown,
  Share2
} from 'lucide-react';

function Achievements() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const achievements = [
    {
      id: 1,
      title: 'National Science Olympiad',
      achiever: {
        name: 'Sarah Johnson',
        role: 'student',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200'
      },
      date: 'March 2024',
      category: 'academic',
      description: 'First place in the National Science Olympiad, representing excellence in scientific innovation.',
      badge: 'gold'
    },
    {
      id: 2,
      title: 'International Debate Championship',
      achiever: {
        name: 'Michael Chen',
        role: 'student',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200'
      },
      date: 'February 2024',
      category: 'competition',
      description: 'Winner of the International Schools Debate Championship, demonstrating exceptional public speaking skills.',
      badge: 'gold'
    },
    {
      id: 3,
      title: 'Research Publication',
      achiever: {
        name: 'Dr. Emily Williams',
        role: 'faculty',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200'
      },
      date: 'January 2024',
      category: 'research',
      description: 'Published groundbreaking research in Educational Technology in a prestigious international journal.',
      badge: 'platinum'
    }
  ];

  const filteredAchievements = achievements.filter(achievement =>
   

    (filter === 'all' || achievement.category === filter) &&
    (achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     achievement.achiever.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Achievement Wall</h1>
            <p className="text-gray-600">Celebrating excellence and outstanding accomplishments</p>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Submit Achievement
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search achievements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
          <FilterButton
            active={filter === 'all'}
            onClick={() => setFilter('all')}
            icon={<Trophy className="w-4 h-4" />}
            label="All"
          />
          <FilterButton
            active={filter === 'academic'}
            onClick={() => setFilter('academic')}
            icon={<Award className="w-4 h-4" />}
            label="Academic"
          />
          <FilterButton
            active={filter === 'competition'}
            onClick={() => setFilter('competition')}
            icon={<Medal className="w-4 h-4" />}
            label="Competitions"
          />
          <FilterButton
            active={filter === 'research'}
            onClick={() => setFilter('research')}
            icon={<Star className="w-4 h-4" />}
            label="Research"
          />
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAchievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
}

function FilterButton({ active, onClick, icon, label }: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition whitespace-nowrap ${
        active
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function AchievementCard({ achievement }: { achievement: any }) {
  const badgeColors = {
    gold: 'bg-yellow-100 text-yellow-800',
    silver: 'bg-gray-100 text-gray-800',
    bronze: 'bg-orange-100 text-orange-800',
    platinum: 'bg-purple-100 text-purple-800'
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <img
              src={achievement.achiever.image}
              alt={achievement.achiever.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold">{achievement.achiever.name}</h3>
              <p className="text-sm text-gray-600 capitalize">{achievement.achiever.role}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${badgeColors[achievement.badge as keyof typeof badgeColors]}`}>
            {achievement.badge.charAt(0).toUpperCase() + achievement.badge.slice(1)}
          </span>
        </div>
        
        <h2 className="text-xl font-bold mb-2">{achievement.title}</h2>
        <p className="text-gray-600 mb-4">{achievement.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <Trophy className="w-4 h-4" />
            <span className="text-sm">{achievement.date}</span>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition">
              <Star className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Achievements;