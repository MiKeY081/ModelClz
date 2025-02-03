import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Book, 
  Trophy, 
  Globe, 
  Users, 
  Video,
  Brain,
  Laptop,
  MessageSquare,
  Calendar
} from 'lucide-react';

function Home() {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Learning",
      description: "Personalized learning paths and intelligent tutoring systems"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Virtual Campus",
      description: "Immersive 360° tours and virtual classrooms"
    },
    {
      icon: <Laptop className="w-8 h-8" />,
      title: "Digital Resources",
      description: "Comprehensive online library and study materials"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Smart Communication",
      description: "Real-time chat and parent-teacher interaction"
    }
  ];

  const stats = [
    { value: "98%", label: "Graduate Success Rate" },
    { value: "50+", label: "Expert Faculty" },
    { value: "100+", label: "Online Courses" },
    { value: "25+", label: "Years of Excellence" }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[600px] rounded-2xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000"
          alt="School campus"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/40">
          <div className="container mx-auto h-full flex items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white max-w-2xl p-8"
            >
              <h1 className="text-5xl font-bold mb-6">Welcome to Excellence in Education</h1>
              <p className="text-xl mb-8">Empowering minds, shaping futures, and creating tomorrow's leaders through innovative education.</p>
              <div className="flex gap-4">
                <Link 
                  to="/virtual-tour"
                  className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition"
                >
                  Virtual Tour
                </Link>
                <Link 
                  to="/dashboard"
                  className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
                >
                  Student Portal
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg text-center"
          >
            <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
            <div className="text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <FeatureCard 
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </section>

      {/* Upcoming Events */}
      <section className="bg-white rounded-2xl p-8 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Upcoming Events</h2>
          <Link 
            to="/events"
            className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            <span>View All</span>
            <Calendar className="w-5 h-5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <EventCard
            title="Science Fair 2024"
            date="March 15, 2024"
            image="https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=800"
          />
          <EventCard
            title="Parent-Teacher Meeting"
            date="March 20, 2024"
            image="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800"
          />
          <EventCard
            title="Sports Day"
            date="March 25, 2024"
            image="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Take the first step towards excellence. Apply now and be part of our innovative learning environment.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition">
          Apply Now
        </button>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) {
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

function EventCard({ title, date, image }: {
  title: string,
  date: string,
  image: string
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow overflow-hidden"
    >
      <img 
        src={image} 
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600">{date}</p>
      </div>
    </motion.div>
  );
}

export default Home;