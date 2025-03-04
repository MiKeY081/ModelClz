import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Book,
  Calendar as CalendarIcon,
  Clock,
  Download,
  ArrowLeft,
  ChevronRight,
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useAuth } from '../context/AuthContext';
import { getLibraryHistory } from '../API/ApiResponse';

interface BookHistory {
  id: string;
  title: string;
  author: string;
  borrowDate: string;
  returnDate: string;
  status: 'returned' | 'overdue' | 'active';
  cover: string;
}

const LibraryHistory: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [history, setHistory] = useState<BookHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Animation controls
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await getLibraryHistory();
        console.log('Library history fetched:', response.data);
        setHistory(response.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'returned': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <Link
            to="/library"
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition shadow-md"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Library History</h1>
            <p className="text-gray-600 text-lg">Yo, homie—check your book trail right here!</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-md hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          Export History
        </motion.button>
      </motion.div>

      {/* History List */}
      {loading ? (
        <div className="text-center text-gray-600">Loading your Homies library history...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-6"
        >
          {history.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              No history yet, homie—start borrowing some books!
            </div>
          ) : (
            history.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <div className="p-6 flex flex-col md:flex-row gap-6">
                  <motion.img
                    src={item.cover}
                    alt={item.title}
                    className="w-32 h-48 object-cover rounded-lg shadow-md"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-1 truncate">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-2 truncate">{item.author}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(item.status)} shadow-sm`}
                      >
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 text-sm">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        <span>Borrowed: {item.borrowDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Return by: {item.returnDate}</span>
                      </div>
                    </div>
                    {item.status === 'active' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition flex items-center gap-2"
                      >
                        Extend Borrowing <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      )}
    </div>
  );
};

export default LibraryHistory;