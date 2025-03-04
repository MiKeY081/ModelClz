import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
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
  Calendar,
  ChevronRight,
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isHeroLoaded, setHeroLoaded] = useState(false);

  const features = [
    {
      icon: <Brain className="w-10 h-10 text-blue-500" />,
      title: "AI-Powered Learning",
      description: "Personalized paths and smart tutoring—learn your way, homie!"
    },
    {
      icon: <Video className="w-10 h-10 text-blue-500" />,
      title: "Virtual Campus",
      description: "360° tours and virtual classrooms—step into the future!"
    },
    {
      icon: <Laptop className="w-10 h-10 text-blue-500" />,
      title: "Digital Resources",
      description: "Online library and study tools—knowledge at your fingertips!"
    },
    {
      icon: <MessageSquare className="w-10 h-10 text-blue-500" />,
      title: "Smart Communication",
      description: "Real-time chat—connect with teachers and crew anytime!"
    },
  ];

  const stats = [
    { value: "98%", label: "Graduate Success Rate" },
    { value: "50+", label: "Expert Faculty" },
    { value: "100+", label: "Online Courses" },
    { value: "25+", label: "Years of Excellence" },
  ];

  const events = [
    { title: "Science Fair 2024", date: "March 15, 2024", image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=800" },
    { title: "Parent-Teacher Meet", date: "March 20, 2024", image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800" },
    { title: "Sports Day", date: "March 25, 2024", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800" },
  ];

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

  return (
    <div className="space-y-20 bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[700px] rounded-3xl overflow-hidden shadow-2xl">
        <motion.img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000"
          alt="School campus"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          onLoad={() => setHeroLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-900/70 to-transparent">
          <div className="container mx-auto h-full flex items-center px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
              className="text-white max-w-3xl"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
                Welcome to the Homies Learning Hub
              </h1>
              <p className="text-lg md:text-2xl mb-8 font-light drop-shadow-md">
                Empowering minds, shaping futures—where innovation meets education, homie!
              </p>
              <div className="flex gap-6">
                <Link
                  to="/virtual-tour"
                  className="bg-white text-blue-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-100 transition-all flex items-center gap-2"
                >
                  Virtual Tour <ChevronRight className="w-5 h-5" />
                </Link>
                <Link
                  to={isAuthenticated ? "/dashboard" : "/auth"}
                  className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
                >
                  {isAuthenticated ? "Dashboard" : "Join Us"} <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-6 rounded-2xl shadow-md text-center border border-gray-100"
            >
              <div className="text-4xl font-extrabold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
        >
          Why Join the Homies?
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </motion.div>
      </section>

      {/* Upcoming Events */}
      <section className="container mx-auto px-6 md:px-12">
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-0"
            >
              Upcoming Events
            </motion.h2>
            <Link
              to="/events"
              className="text-blue-600 hover:text-blue-700 flex items-center gap-2 font-semibold"
            >
              View All <Calendar className="w-5 h-5" />
            </Link>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {events.map((event, index) => (
              <EventCard
                key={index}
                title={event.title}
                date={event.date}
                image={event.image}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-12 text-white text-center shadow-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-md">Ready to Join the Homies?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto font-light drop-shadow-sm">
            Step up, homie—apply now and join a crew that’s shaping the future of learning!
          </p>
          <Link
            to="/apply"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-100 transition-all"
          >
            Apply Now <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
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

const EventCard: React.FC<{ title: string; date: string; image: string }> = ({ title, date, image }) => (
  <motion.div
    whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
    className="bg-white rounded-2xl shadow-md overflow-hidden"
  >
    <motion.img
      src={image}
      alt={title}
      className="w-full h-48 object-cover"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    />
    <div className="p-4">
      <h3 className="font-semibold text-lg text-gray-800 mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{date}</p>
    </div>
  </motion.div>
);

export default Home;