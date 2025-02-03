import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  BarChart as ChartBar, 
  Clock, 
  FileText, 
  GraduationCap, 
  MessageSquare, 
  Star, 
  Trophy, 
  Users,
  X
} from 'lucide-react';

// Types for assignments and messages
interface Assignment {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
}

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  read: boolean;
}

function Dashboard() {
  const [userRole] = useState<'student' | 'teacher' | 'parent' | 'admin'>('student');
  const [showMessages, setShowMessages] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 1,
      title: "Mathematics Assignment 3",
      subject: "Mathematics",
      dueDate: "2024-03-15",
      status: "pending"
    },
    {
      id: 2,
      title: "Physics Lab Report",
      subject: "Physics",
      dueDate: "2024-03-16",
      status: "pending"
    },
    {
      id: 3,
      title: "English Essay",
      subject: "English",
      dueDate: "2024-03-14",
      status: "overdue"
    }
  ]);

  const [messages] = useState<Message[]>([
    {
      id: 1,
      sender: "Mrs. Johnson",
      content: "Your recent math test results are available.",
      timestamp: "2024-03-14 10:30 AM",
      read: false
    },
    {
      id: 2,
      sender: "Mr. Smith",
      content: "Don't forget about tomorrow's physics lab!",
      timestamp: "2024-03-14 11:15 AM",
      read: false
    }
  ]);

  const [events] = useState([
    {
      id: 1,
      title: "Parent-Teacher Meeting",
      date: "2024-03-20",
      time: "14:00"
    },
    {
      id: 2,
      title: "Science Fair",
      date: "2024-03-25",
      time: "09:00"
    }
  ]);

  const handleAssignmentComplete = (id: number) => {
    setAssignments(assignments.map(assignment => 
      assignment.id === id 
        ? { ...assignment, status: 'completed' as const } 
        : assignment
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Alex!</h1>
            <p className="text-gray-600">Here's your learning progress and updates</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setShowMessages(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition relative"
            >
              <MessageSquare className="w-5 h-5" />
              {messages.filter(m => !m.read).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                  {messages.filter(m => !m.read).length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setShowCalendar(true)}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              <Calendar className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Attendance"
          value="95%"
          trend="+2.5%"
          icon={<Clock className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          title="Assignments"
          value={`${assignments.filter(a => a.status === 'completed').length}/${assignments.length}`}
          trend={`${assignments.filter(a => a.status === 'pending').length} pending`}
          icon={<FileText className="w-6 h-6" />}
          color="green"
        />
        <StatCard
          title="Average Grade"
          value="A"
          trend="+5 points"
          icon={<ChartBar className="w-6 h-6" />}
          color="purple"
        />
        <StatCard
          title="Merit Points"
          value="850"
          trend="+50 this week"
          icon={<Star className="w-6 h-6" />}
          color="yellow"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
          <div className="space-y-4">
            {['Mathematics', 'Physics', 'English Literature', 'Computer Science'].map((subject, index) => (
              <motion.div
                key={subject}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="w-16 text-sm text-gray-600">
                  {`${9 + index * 2}:00`}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{subject}</h3>
                  <p className="text-sm text-gray-600">Room {101 + index}</p>
                </div>
                <Link 
                  to="/virtual-tour" 
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition"
                >
                  Join
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/assignments">
              <QuickActionCard
                title="Assignments"
                icon={<FileText className="w-6 h-6" />}
              />
            </Link>
            <Link to="/library">
              <QuickActionCard
                title="Library"
                icon={<BookOpen className="w-6 h-6" />}
              />
            </Link>
            <Link to="/grades">
              <QuickActionCard
                title="Grades"
                icon={<GraduationCap className="w-6 h-6" />}
              />
            </Link>
            <Link to="/community">
              <QuickActionCard
                title="Community"
                icon={<Users className="w-6 h-6" />}
              />
            </Link>
            <Link to="/events">
              <QuickActionCard
                title="Events"
                icon={<Calendar className="w-6 h-6" />}
              />
            </Link>
            <Link to="/achievements">
              <QuickActionCard
                title="Achievements"
                icon={<Trophy className="w-6 h-6" />}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Messages Modal */}
      {showMessages && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Messages</h2>
              <button 
                onClick={() => setShowMessages(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {messages.map(message => (
                <div key={message.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{message.sender}</h3>
                    <span className="text-sm text-gray-500">{message.timestamp}</span>
                  </div>
                  <p className="text-gray-600">{message.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Calendar Modal */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upcoming Events</h2>
              <button 
                onClick={() => setShowCalendar(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {events.map(event => (
                <div key={event.id} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">{event.title}</h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                    <Clock className="w-4 h-4 ml-2" />
                    <span>{event.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, trend, icon, color }: {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'yellow';
}) {
  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    yellow: 'bg-yellow-100 text-yellow-600',
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <div className={`w-12 h-12 ${colors[color]} rounded-lg flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <div className="flex items-end gap-2 mt-2">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-sm text-gray-500 mb-1">{trend}</span>
      </div>
    </motion.div>
  );
}

function QuickActionCard({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition flex flex-col items-center gap-2 cursor-pointer"
    >
      <div className="text-blue-600">{icon}</div>
      <span className="text-sm font-medium">{title}</span>
    </motion.div>
  );
}

export default Dashboard;