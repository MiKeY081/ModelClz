import  { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, GraduationCap, Bell, User, LogOut, UserRound } from 'lucide-react';
import AuthModal from './AuthModal';
import NotificationsModal from './NotificationsModal';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Navbar auth state:', { user, isAuthenticated });
  }, [user, isAuthenticated]);

  const notifications = [
    { id: 1, type: 'event', title: 'Science Fair Tomorrow', message: 'Don\'t forget to attend at 9 AM.', time: '2 hours ago', read: false },
    { id: 2, type: 'achievement', title: 'New Achievement Unlocked', message: 'Perfect Attendance badge earned!', time: '1 day ago', read: true },
    { id: 3, type: 'assignment', title: 'New Assignment Posted', message: 'Math: Chapter 5 due next week.', time: '3 days ago', read: false },
  ];

  const navigation = [
    { name: 'Home', href: '/', public: true },
    { name: 'Virtual Tour', href: '/virtual-tour', public: true },
    { name: 'Dashboard', href: '/dashboard', public: false },
    { name: 'Events', href: '/events', public: false },
    { name: 'Library', href: '/library', public: false },
    { name: 'Achievements', href: '/achievements', public: false },
  ];

  const roleNavigation = {
    ADMIN: [
      { name: 'Students', href: '/students' },
      { name: 'Courses', href: '/courses' },
      { name: 'Attendance', href: '/attendance' },
    ],
    TEACHER: [
      { name: 'Courses', href: '/courses' },
      { name: 'Assignments', href: '/assignments' },
      { name: 'Attendance', href: '/attendance' },
    ],
    STUDENT: [
      { name: 'Assignments', href: '/assignments' },
      { name: 'Grades', href: '/grades' },
    ],
    PARENT: [
    ],
  };

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const handleAuthToggle = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
    setIsOpen(false);
  };

  const toggleAuthMode = () => {
    setAuthMode(prevMode => (prevMode === 'login' ? 'register' : 'login'));
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white shadow-lg sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </motion.div>
              <span className="ml-2 text-xl font-bold text-gray-900">Homies</span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            {navigation
              .filter(item => item.public || isAuthenticated)
              .map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                    isActive(item.href) ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            {isAuthenticated && user && roleNavigation[user.role]?.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive(item.href) ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center ml-4 space-x-4">
              {isAuthenticated && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-700 hover:text-blue-600 transition relative"
                  onClick={() => setShowNotifications(true)}
                >
                  <Bell className="h-5 w-5" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white w-4 h-4 rounded-full text-xs flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </motion.button>
              )}
              {isAuthenticated ? (
                <>
              

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition rounded-full border-2 border-gray-700 hover:border-blue-600"
                >
                  <UserRound  onClick={ ()=>{navigate('/profile')}} className="h-5 w-5 rounded-full border-1 border-black" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition"
                >
                  <LogOut className="text-sm font-medium onClick={handleLogout}"/>
                </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAuthToggle('login')}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
                >
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">Login</span>
                </motion.button>
              )}
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation
              .filter(item => item.public || isAuthenticated)
              .map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.href) ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            {isAuthenticated && user && roleNavigation[user.role]?.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.href) ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200">
              {isAuthenticated && (
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
              )}
              <button
                className="w-full px-3 py-2 text-left text-base font-medium text-gray-700 hover:text-blue-600"
                onClick={() => {
                  if (isAuthenticated) {
                    handleLogout();
                  } else {
                    handleAuthToggle('login');
                  }
                }}
              >
                <User className="h-5 w-5 inline mr-2" />
                {isAuthenticated ? 'Logout' : 'Login'}
              </button>
              {!isAuthenticated && (
                <button
                  className="w-full px-3 py-2 text-left text-base font-medium text-gray-700 hover:text-blue-600"
                  onClick={() => handleAuthToggle('register')}
                >
                  <UserPlus className="h-5 w-5 inline mr-2" />
                  Register
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      <NotificationsModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onToggleMode={toggleAuthMode} // Pass the toggle function
      />
    </motion.nav>
  );
}

export default Navbar;