import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Send,
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const Footer: React.FC = () => {
  const links = {
    about: [
      { name: 'Home', href: '/' }, // Home.tsx
      { name: 'Our Story', href: '/about/story' }, // AboutStory.tsx
      { name: 'Mission', href: '/about/mission' }, // AboutMission.tsx
      { name: 'Careers', href: '/about/careers' }, // AboutCareers.tsx
    ],
    academics: [
      { name: 'Courses', href: '/courses' }, // Courses.tsx
      { name: 'Assignments', href: '/assignments' }, // Assignments.tsx
      { name: 'Grades', href: '/grades' }, // Grades.tsx
      { name: 'Library', href: '/library' }, // Library.tsx
    ],
    community: [
      { name: 'Students', href: '/students' }, // Students.tsx
      { name: 'Achievements', href: '/achievements' }, // Achievements.tsx
      { name: 'Community', href: '/community' }, // Community.tsx
      { name: 'Events', href: '/events' }, // Events.tsx
    ],
    support: [
      { name: 'Support', href: '/support' }, // Support.tsx
      { name: 'FAQs', href: '/support/faq' }, // SupportFAQ.tsx
      { name: 'Contact', href: '/support/contact' }, // SupportContact.tsx
      { name: 'Feedback', href: '/support/feedback' }, // SupportFeedback.tsx
    ],
  };

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed:', email); // Placeholder for API call
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000); // Reset after 3s
    setEmail('');
  };

  // Animation controls
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const glowVariants = {
    hidden: { scale: 1, opacity: 0.5 },
    visible: { scale: 1.05, opacity: 1, transition: { duration: 1, repeat: Infinity, repeatType: 'reverse' } },
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-blue-900 text-gray-300 mt-16 relative overflow-hidden">
      {/* Background Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full w-96 h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        variants={glowVariants}
        initial="hidden"
        animate="visible"
      />

      <div className="max-w-7xl mx-auto px-6 py-12 md:px-12 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12"
        >
          {/* Brand & Newsletter */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center mb-6">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <GraduationCap className="h-10 w-10 text-blue-400" />
              </motion.div>
              <span className="ml-3 text-2xl font-extrabold text-white tracking-tight">EduExcel</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering minds, shaping futures—Homies-style education for tomorrow’s legends!
            </p>
            <div className="flex space-x-6">
              <SocialLink icon={<Facebook className="w-6 h-6" />} href="https://facebook.com" />
              <SocialLink icon={<Twitter className="w-6 h-6" />} href="https://twitter.com" />
              <SocialLink icon={<Instagram className="w-6 h-6" />} href="https://instagram.com" />
              <SocialLink icon={<Youtube className="w-6 h-6" />} href="https://youtube.com" />
            </div>
            {/* Newsletter Signup */}
            <div className="mt-8">
              <h3 className="text-white font-semibold text-lg mb-4">Stay in the Homies Loop!</h3>
              {subscribed ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-400 text-sm"
                >
                  You’re in, homie—check your inbox!
                </motion.p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email, homie..."
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-4 text-lg tracking-wide">About</h3>
            <ul className="space-y-4">
              {links.about.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-blue-400 transition flex items-center gap-2 text-sm"
                  >
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-4 text-lg tracking-wide">Academics</h3>
            <ul className="space-y-4">
              {links.academics.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-blue-400 transition flex items-center gap-2 text-sm"
                  >
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-4 text-lg tracking-wide">Community</h3>
            <ul className="space-y-4">
              {links.community.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-blue-400 transition flex items-center gap-2 text-sm"
                  >
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className='w-screen'>
            <h3 className="text-white font-semibold mb-4 text-lg tracking-wide ">Support</h3>
            <ul className="space-y-4 text-sm flex justify-between w-full">
              <li>
                <a
                  href="tel:+1234567890"
                  className="text-gray-300 hover:text-blue-400 transition flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-blue-400" />
                  (123) 456-7890
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@eduexcel.com"
                  className="text-gray-300 hover:text-blue-400 transition flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-blue-400" />
                  info@eduexcel.com
                </a>
              </li>
              {links.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-blue-400 transition flex items-center gap-2"
                  >
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-gray-300 mb-4 md:mb-0">
              © {new Date().getFullYear()} EduExcel. All rights reserved, homie!
            </p>
            <div className="flex space-x-6">
              <Link to="/support/privacy" className="text-gray-300 hover:text-blue-400 transition">
                Privacy Policy
              </Link>
              <Link to="/support/terms" className="text-gray-300 hover:text-blue-400 transition">
                Terms of Service
              </Link>
              <Link to="/support/cookies" className="text-gray-300 hover:text-blue-400 transition">
                Cookie Policy
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

const SocialLink: React.FC<{ icon: React.ReactNode; href: string }> = ({ icon, href }) => (
  <motion.a
    whileHover={{ scale: 1.2, rotate: 10 }}
    whileTap={{ scale: 0.95 }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-blue-600 hover:text-white transition shadow-lg"
  >
    {icon}
  </motion.a>
);

export default Footer;