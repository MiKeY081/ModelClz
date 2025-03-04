// frontend/src/pages/Community.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
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
  UserPlus,
} from 'lucide-react';
import { getPosts, createPost, likePost, getProfile } from '../API/ApiResponse';
import Card from '../components/Card';
import InputField from '../components/InputField';
import Button from '../components/Button';

const Community: React.FC = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState({ content: '', image: '', tags: '' });
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await getPosts();
        const profileData = await getProfile();
        setPosts(postsData?.posts)
        console.log("posts")
        console.log(postsData)
      } catch (error) {
        console.error('Error fetching community data, homie:', error);
      }
    };
    fetchData();
  }, []);

  const handlePostChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPost(prev => ({ ...prev, [name]: value }));
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tags = newPost.tags.split(',').map(tag => tag.trim());
      await createPost({ content: newPost.content, image: newPost?.image, tags });
      const updatedPosts = await getPosts();
      setPosts(updatedPosts);
      setNewPost({ content: '', image: '', tags: '' });
    } catch (error) {
      console.error('Error creating post, homie:', error);
    }
  };

  const handleLikePost = async (postId: string) => {
    try {
      await likePost(postId);
      const updatedPosts = await getPosts();
      console.log(posts)
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error liking post, homie:', error);
    }
  };

  const filteredPosts = posts?.filter(post => 
    (filter === 'all' || post.tags.includes(filter)) &&
    (post.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
     post.author.firstName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 bg-gray-50 min-h-screen px-6 py-8 md:px-12">
      {/* Header */}
      <Card title="School Community">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-gray-600">Connect, share, and engage with your school community</p>
          <Button className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" /> Find Connections
          </Button>
        </div>
      </Card>

      {/* Create Post */}
      <Card title="What’s on your mind, homie?">
        <div className="flex gap-4">
          <img
            src={profile?.avatar || 'https://via.placeholder.com/40'}
            alt="Your avatar"
            className="w-10 h-10 rounded-full"
          />
          <form onSubmit={handleCreatePost} className="flex-1 space-y-4">
            <InputField
              name="content"
              value={newPost.content}
              onChange={handlePostChange}
              placeholder="Share something with your community..."
              textarea
              required
            />
            <InputField
              name="image"
              value={newPost.image}
              onChange={handlePostChange}
              placeholder="Image URL (optional)"
            />
            <InputField
              name="tags"
              value={newPost.tags}
              onChange={handlePostChange}
              placeholder="Tags (comma-separated, e.g., Science, Fun)"
            />
            <div className="flex justify-between">
              <Button type="button" className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200">
                <Image className="w-5 h-5" />
              </Button>
              <Button type="submit" className="flex items-center gap-2">
                <Send className="w-4 h-4" /> Post
              </Button>
            </div>
          </form>
        </div>
      </Card>

      {/* Search and Filters */}
      <Card title="Explore the Community">
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
          <Button className="flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200">
            <Filter className="w-5 h-5" /> Filters <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
          <Button
            onClick={() => setFilter('all')}
            className={`flex items-center gap-2 ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            <Globe className="w-4 h-4" /> All Posts
          </Button>
          <Button
            onClick={() => setFilter('trending')}
            className={`flex items-center gap-2 ${filter === 'trending' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            <Star className="w-4 h-4" /> Trending
          </Button>
          <Button
            onClick={() => setFilter('following')}
            className={`flex items-center gap-2 ${filter === 'following' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            <Users className="w-4 h-4" /> Following
          </Button>
        </div>
      </Card>

      {/* Posts */}
      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <motion.div
              key={post.id}
              whileHover={{ y: -2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={post.author?.avatar || 'https://via.placeholder.com/40'}
                    alt={post.author?.firstName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{post.author?.firstName} {post.author?.lastName}</h3>
                        <p className="text-sm text-gray-600">{post.author?.role} • {new Date(post.createdAt).toLocaleString()}</p>
                      </div>
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    </div>
                    <p className="mt-3">{post.content}</p>
                    {post.image && <img src={post.image} alt="Post content" className="mt-4 rounded-lg w-full" />}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags?.map((tag: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">#{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-6 mt-4 pt-4 border-t text-gray-600">
                      <Button onClick={() => handleLikePost(post.id)} className="flex items-center gap-2 bg-transparent  text-gray-600 hover:text-blue-600">
                        <Heart className="w-5 h-5 text-gray-600" /> 
                        <p className='text-gray-600'>{post.likes || 0}</p>
                      </Button>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MessageSquare className="w-5 h-5" /> {post.comments?.length || 0}
                      </div>
                      <Button className="flex items-center gap-2 bg-transparent text-gray-600 hover:text-blue-600">
                        <Share2 className="w-5 h-5" /> Share
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No posts yet, homie—be the first!</p>
        )}
      </div>
    </div>
  );
};

export default Community;