import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Book,
  BookOpen,
  Search,
  Filter,
  Download,
  BookmarkPlus,
  Clock,
  Star,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useAuth } from '../context/AuthContext';
import { getLibraryBooks } from '../API/ApiResponse';

interface Book {
  id: string;
  title: string;
  author: string;
  category: 'textbooks' | 'research' | 'magazines' | 'journals';
  cover: string;
  rating: number;
  available: boolean;
}

const Library: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const categories = [
    { id: 'all', name: 'All Books' },
    { id: 'textbooks', name: 'Textbooks' },
    { id: 'research', name: 'Research Papers' },
    { id: 'magazines', name: 'Magazines' },
    { id: 'journals', name: 'Journals' },
  ];

  // Animation controls
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await getLibraryBooks();
        console.log('Books fetched:', response.data);
        setBooks(response.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book => 
    (selectedCategory === 'all' || book.category === selectedCategory) &&
    (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     book.author.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Homies Library</h1>
          <p className="text-gray-600 text-lg">Yo, homie—grab some knowledge from our digital stash!</p>
        </div>
        <div className="flex gap-4">
          <Link
            to="/library/history"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold shadow-md hover:bg-gray-200 transition flex items-center gap-2"
          >
            <Clock className="w-5 h-5" />
            History
          </Link>
          <Link
            to="/library/my-library"
            className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold shadow-md hover:bg-blue-700 transition flex items-center gap-2"
          >
            <BookmarkPlus className="w-5 h-5" />
            My Library
          </Link>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title, author, or keyword, homie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold shadow-md hover:bg-gray-200 transition flex items-center gap-2"
            >
              <Filter className="w-5 h-5" />
              Filters <ChevronDown className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold shadow-md hover:bg-gray-200 transition flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Export
            </motion.button>
          </div>
        </div>

        {/* Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-4 mt-6 overflow-x-auto pb-2 max-w-4xl mx-auto"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              variants={itemVariants}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full font-semibold transition shadow-md whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Books Grid */}
      {loading ? (
        <div className="text-center text-gray-600">Loading the Homies library...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
          {filteredBooks.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-12">
              No books found, homie—try a different search or filter!
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

const BookCard: React.FC<{ book: Book }> = ({ book }) => (
  <motion.div
    whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
    className="bg-white rounded-2xl shadow-md overflow-hidden"
  >
    <motion.img
      src={book.cover}
      alt={book.title}
      className="w-full h-64 object-cover"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    />
    <div className="absolute top-4 right-4 px-3 py-1 bg-white rounded-full flex items-center gap-1 shadow-md">
      <Star className="w-4 h-4 text-yellow-400 fill-current" />
      <span className="text-sm font-medium text-gray-800">{book.rating}</span>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-1 truncate">{book.title}</h3>
      <p className="text-gray-600 text-sm mb-4 truncate">{book.author}</p>
      <div className="flex items-center justify-between">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            book.available ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}
        >
          {book.available ? 'Available' : 'Checked Out'}
        </span>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            <BookmarkPlus className="w-5 h-5 text-gray-600" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <BookOpen className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  </motion.div>
);

export default Library;