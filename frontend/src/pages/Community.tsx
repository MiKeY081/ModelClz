import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  MessageSquare,
  Search,
  Filter,
  ChevronDown,
  Globe,
  Star,
  Heart,
  Share2,
  Image,
  Send,
  UserPlus
} from 'lucide-react';

interface Post {
  id: number;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  tags: string[];
}

function Community() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const posts: Post[] = [
    {
      id: 1,
      author: {
        name: "Sarah Johnson",
        role: "Student",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200"
      },
      content: "Just finished my science project on renewable energy! Can't wait to present it tomorrow. 🌟",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800",
      likes: 24,
      comments: 8,
      timestamp: "2 hours ago",
      tags: ["Science", "Project", "Sustainability"]
    },
    {
      id: 2,
      author: {
        name: "Prof. Michael Chen",
        role: "Teacher",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200"
      },
      content: "Proud of our students' performance in the regional mathematics competition! 🏆",
      likes: 45,
      comments: 12,
      timestamp: "5 hours ago",
      tags: ["Mathematics", "Competition", "Achievement"]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">School Community</h1>
            <p className="text-gray-600">Connect, share, and engage with your school community</p>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Find Connections
          </button>
        </div>
      </div>

      {/* Create Post */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex gap-4">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200"
            alt="Your avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <textarea
              placeholder="Share something with your community..."
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
            />
            <div className="flex justify-between mt-3">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                <Image className="w-5 h-5" />
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                <Send className="w-4 h-4" />
                Post
              </button>
            </div>
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
              placeholder="Search posts..."
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
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
          <FilterButton
            active={filter === 'all'}
            onClick={() => setFilter('all')}
            icon={<Globe className="w-4 h-4" />}
            label="All Posts"
          />
          <FilterButton
            active={filter === 'trending'}
            onClick={() => setFilter('trending')}
            icon={<Star className="w-4 h-4" />}
            label="Trending"
          />
          <FilterButton
            active={filter === 'following'}
            onClick={() => setFilter('following')}
            icon={<Users className="w-4 h-4" />}
            label="Following"
          />
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

function FilterButton({ active, onClick, icon, label }: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition whitespace-nowrap ${
        active
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{post.author.name}</h3>
                <p className="text-sm text-gray-600">{post.author.role} • {post.timestamp}</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
            
            <p className="mt-3">{post.content}</p>
            
            {post.image && (
              <img
                src={post.image}
                alt="Post content"
                className="mt-4 rounded-lg w-full"
              />
            )}

            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-6 mt-4 pt-4 border-t">
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition">
                <Heart className="w-5 h-5" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition">
                <MessageSquare className="w-5 h-5" />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Community;