import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Video,
  Users,
  Trophy,
  Music,
  Star,
  Play,
  Clock,
  MapPin
} from 'lucide-react';

function Events() {
  const [filter, setFilter] = useState('all');

  const events = [
    {
      id: 1,
      title: 'Annual Science Fair',
      type: 'academic',
      date: '2024-03-15',
      time: '09:00 AM',
      location: 'Main Auditorium',
      image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=800',
      isLive: true
    },
    {
      id: 2,
      title: 'Sports Day',
      type: 'sports',
      date: '2024-03-20',
      time: '10:00 AM',
      location: 'Sports Complex',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800'
    },
    {
      id: 3,
      title: 'Cultural Evening',
      type: 'cultural',
      date: '2024-03-25',
      time: '06:00 PM',
      location: 'Performing Arts Center',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800'
    },
    {
      id: 4,
      title: 'Parent-Teacher Meeting',
      type: 'meeting',
      date: '2024-03-30',
      time: '02:00 PM',
      location: 'Conference Hall',
      image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800'
    }
  ];

  const filteredEvents = filter === 'all' ? events : events.filter(event => event.type === filter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">School Events</h1>
            <p className="text-gray-600">Stay updated with all our upcoming events and activities</p>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Add to Calendar
          </button>
        </div>
      </div>

      {/* Live Event Banner */}
      {events.some(event => event.isLive) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="animate-pulse">
              <Video className="w-6 h-6" />
            </div>
            <span className="font-semibold">LIVE NOW</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">Annual Science Fair</h2>
          <button className="px-6 py-2 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition flex items-center gap-2">
            <Play className="w-5 h-5" />
            Join Stream
          </button>
        </motion.div>
      )}

      {/* Filters */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        <FilterButton
          active={filter === 'all'}
          onClick={() => setFilter('all')}
          icon={<Star className="w-4 h-4" />}
          label="All Events"
        />
        <FilterButton
          active={filter === 'academic'}
          onClick={() => setFilter('academic')}
          icon={<Trophy className="w-4 h-4" />}
          label="Academic"
        />
        <FilterButton
          active={filter === 'sports'}
          onClick={() => setFilter('sports')}
          icon={<Users className="w-4 h-4" />}
          label="Sports"
        />
        <FilterButton
          active={filter === 'cultural'}
          onClick={() => setFilter('cultural')}
          icon={<Music className="w-4 h-4" />}
          label="Cultural"
        />
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
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

function EventCard({ event }: { event: any }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="relative h-48">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        {event.isLive && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white rounded-full flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            LIVE
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <div className="space-y-2 text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
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
        <div className="mt-4 flex gap-2">
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Register
          </button>
          {event.isLive ? (
            <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">
              Join
            </button>
          ) : (
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition">
              Remind
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Events;