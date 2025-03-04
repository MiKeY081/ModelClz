import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Bell,
  Calendar as CalendarIcon,
  Trophy,
  Book,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getMessages, markMessagesAsRead } from '../API/ApiResponse';

interface Notification {
  id: string;
  type: 'event' | 'achievement' | 'assignment' | 'message';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications?: Notification[]; // Optional static prop, overridden by API
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose, notifications: staticNotifications }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>(staticNotifications || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Fetch notifications if not provided statically
  useEffect(() => {
    if (!staticNotifications && isOpen) {
      const fetchNotifications = async () => {
        try {
          setLoading(true);
          const response = await getMessages(); // Assuming this fetches notifications
          console.log('Notifications fetched:', response.data);
          setNotifications(response.data);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };
      fetchNotifications();
    } else if (staticNotifications) {
      setNotifications(staticNotifications);
      setLoading(false);
    }
  }, [isOpen, staticNotifications]);

  const handleMarkAllRead = async () => {
    try {
      await markMessagesAsRead(); // Assuming this marks all as read
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'event': return <CalendarIcon className="w-5 h-5" />;
      case 'achievement': return <Trophy className="w-5 h-5" />;
      case 'assignment': return <Book className="w-5 h-5" />;
      case 'message': return <Bell className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'event': return 'bg-blue-100 text-blue-600';
      case 'achievement': return 'bg-yellow-100 text-yellow-600';
      case 'assignment': return 'bg-green-100 text-green-600';
      case 'message': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/50 flex items-start justify-center pt-20 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl w-full max-w-md relative max-h-[80vh] overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Homies Alerts</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-6 h-6 text-gray-600" />
          </motion.button>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto flex-1">
          {loading ? (
            <div className="p-6 text-center text-gray-600">Loading your alerts, homie...</div>
          ) : error ? (
            <div className="p-6 text-center text-red-500">{error}</div>
          ) : notifications.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-2 opacity-20" />
              <p>No alerts yet, homie—chill for now!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 hover:bg-gray-50 transition ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex gap-4">
                    <div className={`p-2 rounded-lg ${getTypeColor(notification.type)} shadow-sm`}>
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1 truncate">{notification.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{notification.message}</p>
                      <span className="text-xs text-gray-500 mt-2 block">{notification.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMarkAllRead}
              className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
            >
              Mark All as Read
            </motion.button>
            <span className="text-sm text-gray-500">
              {unreadCount} unread
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default NotificationsModal;