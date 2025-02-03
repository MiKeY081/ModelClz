import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Star, Clock, ArrowLeft, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SavedBook {
  id: number;
  title: string;
  author: string;
  cover: string;
  rating: number;
  category: string;
  dateAdded: string;
  notes?: string;
}

function MyLibrary() {
  const savedBooks: SavedBook[] = [
    {
      id: 1,
      title: "Advanced Mathematics",
      author: "Dr. Sarah Johnson",
      cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400",
      rating: 4.5,
      category: "Textbooks",
      dateAdded: "2024-03-01",
      notes: "Important reference for calculus chapters"
    },
    {
      id: 2,
      title: "Physics Fundamentals",
      author: "Prof. Robert Chen",
      cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400",
      rating: 4.8,
      category: "Textbooks",
      dateAdded: "2024-03-05"
    },
    {
      id: 3,
      title: "Literature Classics",
      author: "Emily Williams",
      cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=400",
      rating: 4.2,
      category: "Fiction",
      dateAdded: "2024-03-10",
      notes: "Required reading for English class"
    }
  ];

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
              <h1 className="text-3xl font-bold mb-2">My Library</h1>
              <p className="text-gray-600">Your personal collection of saved books and materials</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link
              to="/library/history"
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
            >
              <Clock className="w-5 h-5" />
              History
            </Link>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export List
            </button>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedBooks.map((book) => (
          <motion.div
            key={book.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex gap-4">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-24 h-36 object-cover rounded-lg shadow"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                      <p className="text-gray-600">{book.author}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{book.rating}</span>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <span className="text-sm text-gray-500">Added: {book.dateAdded}</span>
                  </div>

                  {book.notes && (
                    <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                      {book.notes}
                    </p>
                  )}

                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Read
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default MyLibrary;