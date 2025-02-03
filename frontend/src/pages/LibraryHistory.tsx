import React from 'react';
import { motion } from 'framer-motion';
import { Book, Calendar, Clock, Download, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BookHistory {
  id: number;
  title: string;
  author: string;
  borrowDate: string;
  returnDate: string;
  status: 'returned' | 'overdue' | 'active';
  cover: string;
}

function LibraryHistory() {
  const history: BookHistory[] = [
    {
      id: 1,
      title: "Advanced Mathematics",
      author: "Dr. Sarah Johnson",
      borrowDate: "2024-02-15",
      returnDate: "2024-03-01",
      status: "returned",
      cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400"
    },
    {
      id: 2,
      title: "Physics Fundamentals",
      author: "Prof. Robert Chen",
      borrowDate: "2024-03-01",
      returnDate: "2024-03-15",
      status: "active",
      cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400"
    },
    {
      id: 3,
      title: "Literature Classics",
      author: "Emily Williams",
      borrowDate: "2024-01-15",
      returnDate: "2024-02-01",
      status: "overdue",
      cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=400"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'returned':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/library" className="p-2 hover:bg-gray-100 rounded-lg transition">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold mb-2">Borrowing History</h1>
              <p className="text-gray-600">Track your library activities and borrowed books</p>
            </div>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export History
          </button>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {history.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -2 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex gap-6">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-24 h-36 object-cover rounded-lg shadow"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-600 mb-4">{item.author}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(item.status)}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Borrowed: {item.borrowDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Return by: {item.returnDate}</span>
                    </div>
                  </div>

                  {item.status === 'active' && (
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      Extend Borrowing
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default LibraryHistory;