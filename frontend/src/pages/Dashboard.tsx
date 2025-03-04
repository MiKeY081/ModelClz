import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar as CalendarIcon, 
  BarChart as ChartBar, 
  Clock, 
  FileText, 
  GraduationCap, 
  MessageSquare, 
  Star, 
  Trophy, 
  Users,
  X,
  ChevronRight,
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useAuth } from '../context/AuthContext';
import { getAssignments, getMessages, getEvents } from '../API/ApiResponse';
import { Assignment, Message } from '../types';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [showMessages, setShowMessages] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [events, setEvents] = useState<{ id: string; title: string; date: string; time: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [assignmentsResponse, messagesResponse, eventsResponse] = await Promise.all([
          getAssignments(),
          getMessages(),
          getEvents(),
        ]);
        setAssignments(assignmentsResponse);
        setMessages(messagesResponse.data);
        setEvents(eventsResponse.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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

  const handleAssignmentComplete = (id: string) => {
    setAssignments(assignments?.map(assignment => 
      assignment.id === id ? { ...assignment, status: 'completed' } : assignment
    ));
  };

  const getWelcomeText = () => {
    switch (user?.role) {
      case 'STUDENT': return `Yo, ${user.firstName}! Crush those goals today!`;
      case 'TEACHER': return `Hey, ${user.firstName}! Ready to inspire the crew?`;
      case 'PARENT': return `What’s good, ${user.firstName}? Keep tabs on your homie!`;
      case 'ADMIN': return `Sup, ${user.firstName}! Running the Homies show!`;
      default: return 'Welcome back, homie!';
    }
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{getWelcomeText()}</h1>
          <p className="text-gray-600 text-lg">Your hub for all things Homies—let’s roll!</p>
        </div>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMessages(true)}
            className="relative px-4 py-2 bg-blue-600 text-white rounded-full font-semibold shadow-md hover:bg-blue-700 transition"
          >
            <MessageSquare className="w-5 h-5" />
            {messages.filter(m => !m.read).length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                {messages.filter(m => !m.read).length}
              </span>
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCalendar(true)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold shadow-md hover:bg-gray-200 transition"
          >
            <CalendarIcon className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      {loading ? (
        <div className="text-center text-gray-600">Loading your Homies dashboard...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <StatCard
            title="Attendance"
            value="95%"
            trend="+2.5%"
            icon={<Clock />}
            color="blue"
          />
          <StatCard
            title="Assignments"
            value={`${assignments?.filter(a => a.status === 'completed').length}/${assignments?.length}`}
            trend={`${assignments?.filter(a => a.status === 'pending').length} pending`}
            icon={<FileText />}
            color="green"
          />
          <StatCard
            title="Average Grade"
            value="A"
            trend="+5 points"
            icon={<ChartBar />}
            color="purple"
          />
          <StatCard
            title="Merit Points"
            value="850"
            trend="+50 this week"
            icon={<Star />}
            color="yellow"
          />
        </motion.div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Today’s Schedule</h2>
          <div className="space-y-4">
            {['Mathematics', 'Physics', 'English Literature', 'Computer Science'].map((subject, index) => (
              <motion.div
                key={subject}
                variants={itemVariants}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl shadow-sm hover:bg-gray-100 transition"
              >
                <div className="w-16 text-sm text-gray-600 font-medium">
                  {`${9 + index * 2}:00`}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{subject}</h3>
                  <p className="text-sm text-gray-500">Room {101 + index}</p>
                </div>
                <Link
                  to="/virtual-tour"
                  className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition flex items-center gap-2"
                >
                  Join <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Assignments", icon: <FileText />, path: "/assignments" },
              { title: "Library", icon: <BookOpen />, path: "/library" },
              { title: "Grades", icon: <GraduationCap />, path: "/grades" },
              { title: "Community", icon: <Users />, path: "/community" },
              { title: "Events", icon: <CalendarIcon />, path: "/events" },
              { title: "Achievements", icon: <Trophy />, path: "/achievements" },
            ].map((action) => (
              <Link key={action.title} to={action.path}>
                <QuickActionCard title={action.title} icon={action.icon} />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Messages Modal */}
      {showMessages && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMessages(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-6 h-6 text-gray-600" />
              </motion.button>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 bg-gray-50 rounded-xl shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800">{message.sender}</h3>
                    <span className="text-sm text-gray-500">{message.timestamp}</span>
                  </div>
                  <p className="text-gray-600">{message.content}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Calendar Modal */}
      {showCalendar && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Upcoming Events</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCalendar(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-6 h-6 text-gray-600" />
              </motion.button>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {events.map(event => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 bg-gray-50 rounded-xl shadow-sm"
                >
                  <h3 className="font-semibold text-gray-800 mb-2">{event.title}</h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{event.date}</span>
                    <Clock className="w-4 h-4 ml-2" />
                    <span>{event.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string; trend: string; icon: React.ReactNode; color: 'blue' | 'green' | 'purple' | 'yellow' }> = ({ title, value, trend, icon, color }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    yellow: 'bg-yellow-100 text-yellow-600',
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
      className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
    >
      <div className={`w-12 h-12 ${colors[color]} rounded-lg flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <div className="flex items-end gap-2 mt-2">
        <span className="text-2xl font-bold text-gray-800">{value}</span>
        <span className="text-sm text-gray-500 mb-1">{trend}</span>
      </div>
    </motion.div>
  );
};

const QuickActionCard: React.FC<{ title: string; icon: React.ReactNode }> = ({ title, icon }) => (
  <motion.div
    whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }}
    whileTap={{ scale: 0.95 }}
    className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition flex flex-col items-center gap-2 shadow-sm"
  >
    <div className="text-blue-600">{icon}</div>
    <span className="text-sm font-medium text-gray-800">{title}</span>
  </motion.div>
);

export default Dashboard;