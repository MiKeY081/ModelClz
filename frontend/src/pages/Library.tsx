import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Book,
  BookOpen,
  Search,
  Filter,
  Download,
  BookmarkPlus,
  Clock,
  Star,
  ChevronDown
} from 'lucide-react';

function Library() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Books' },
    { id: 'textbooks', name: 'Textbooks' },
    { id: 'research', name: 'Research Papers' },
    { id: 'magazines', name: 'Magazines' },
    { id: 'journals', name: 'Journals' }
  ];

  const books = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      author: 'Dr. Sarah Johnson',
      category: 'textbooks',
      cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400',
      rating: 4.5,
      available: true
    },
    {
      id: 2,
      title: 'Modern Physics',
      author: 'Prof. Robert Chen',
      category: 'textbooks',
      cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400',
      rating: 4.8,
      available: true
    },
    {
      id: 3,
      title: 'Literature Review',
      author: 'Emily Williams',
      category: 'research',
      cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=400',
      rating: 4.2,
      available: false
    }
  ];

  const filteredBooks = books.filter(book => 
    (selectedCategory === 'all' || book.category === selectedCategory) &&
    (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     book.author.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Digital Library</h1>
            <p className="text-gray-600">Access thousands of books, journals, and research papers</p>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition flex items-center gap-2">
              <Clock className="w-5 h-5" />
              History
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
              <BookmarkPlus className="w-5 h-5" />
              My Library
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title, author, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg transition whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

function BookCard({ book }: { book: any }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="relative h-64">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 px-3 py-1 bg-white rounded-full flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{book.rating}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
        <p className="text-gray-600 mb-4">{book.author}</p>
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-sm ${
            book.available
              ? 'bg-green-100 text-green-600'
              : 'bg-red-100 text-red-600'
          }`}>
            {book.available ? 'Available' : 'Checked Out'}
          </span>
          <div className="flex gap-2">
            <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
              <BookmarkPlus className="w-5 h-5" />
            </button>
            <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <BookOpen className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Library;