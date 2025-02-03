import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, Bell, User } from 'lucide-react';
import AuthModal from './AuthModal';
import NotificationsModal from './NotificationsModal';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Virtual Tour', href: '/virtual-tour' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Events', href: '/events' },
    { name: 'Library', href: '/library' },
    { name: 'Achievements', href: '/achievements' },
  ];

  const notifications = [
    {
      id: 1,
      type: 'event',
      title: 'Science Fair Tomorrow',
      message: 'Don\'t forget to attend the annual Science Fair starting at 9 AM.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'achievement',
      title: 'New Achievement Unlocked',
      message: 'Congratulations! You\'ve earned the "Perfect Attendance" badge.',
      time: '1 day ago',
      read: true
    },
    {
      id: 3,
      type: 'assignment',
      title: 'New Assignment Posted',
      message: 'Mathematics: Chapter 5 Problems due next week.',
      time: '3 days ago',
      read: false
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">EduExcel</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive(item.href)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Notification and Profile */}
            <div className="flex items-center ml-4 space-x-4">
              <button 
                className="text-gray-700 hover:text-blue-600 transition relative"
                onClick={() => setShowNotifications(true)}
              >
                <Bell className="h-5 w-5" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white w-4 h-4 rounded-full text-xs flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
              <button 
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
                onClick={() => setShowAuthModal(true)}
              >
                <User className="h-5 w-5" />
                <span className="text-sm font-medium">Login</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.href)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200">
              <button 
                className="w-full px-3 py-2 text-left text-base font-medium text-gray-700 hover:text-blue-600"
                onClick={() => {
                  setShowNotifications(true);
                  setIsOpen(false);
                }}
              >
                <Bell className="h-5 w-5 inline mr-2" />
                Notifications
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
              <button 
                className="w-full px-3 py-2 text-left text-base font-medium text-gray-700 hover:text-blue-600"
                onClick={() => {
                  setShowAuthModal(true);
                  setIsOpen(false);
                }}
              >
                <User className="h-5 w-5 inline mr-2" />
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode="login"
      />
      <NotificationsModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
      />
    </nav>
  );
}

export default Navbar;