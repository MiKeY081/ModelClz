// frontend/src/pages/UpdateProfile.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getProfile, updateProfile } from '../API/ApiResponse';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const UpdateProfile: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', avatar: '' });
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        setFormData({
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          avatar: profile.avatar || '',
        });
      } catch (error) {
        console.error('Error fetching profile, homie:', error);
      }
    };
    if (user) fetchProfile();
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      console.log('Profile updated, homie!');
      navigate('/profile');

    } catch (error) {
      console.error('Error updating profile, homie:', error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <div className="space-y-12 bg-gray-50 min-h-screen px-6 py-8 md:px-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-3xl shadow-xl p-8 max-w-md mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Update Your Profile, Homie!</h1>
        <p className="text-gray-600 text-lg mb-6">Keep your deets fresh!</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
          <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
          <InputField label="Email" name="email" value={formData.email} onChange={handleInputChange} type="email" required />
          <InputField label="Avatar URL" name="avatar" value={formData.avatar} onChange={handleInputChange} placeholder="Paste an image URL" />
          <Button type="submit" className="w-full">Save Changes</Button>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateProfile;