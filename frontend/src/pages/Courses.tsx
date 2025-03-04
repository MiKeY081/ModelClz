import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getCourses, createCourse } from '../API/ApiResponse';
import { Course } from '../types';
import LoadingSpinner from '@/components/LoadingSpinner';

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState({ name: '', description: '', subjectId: '', teacherId: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await getCourses();
        setCourses(response);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createCourse(newCourse);
      setCourses([...courses, response.data]);
      setNewCourse({ name: '', description: '', subjectId: '', teacherId: '' });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-4xl font-bold text-white text-center mb-8"
      >
        Course Catalog
      </motion.h1>

      {loading ? (
  <LoadingSpinner />
) : error ? (
  <p className="text-red-300 text-center">{error}</p>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
    {courses && courses.length > 0 ? (
      courses.map((course, index) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
          className="bg-white rounded-lg shadow-xl p-6 cursor-pointer"
        >
          <motion.h2
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="text-xl font-semibold text-indigo-700"
          >
            {course.name}
          </motion.h2>
          <p className="mt-2 text-gray-600">{course.description}</p>
          <motion.div
            whileHover={{ x: 10 }}
            className="mt-4 text-sm text-indigo-500"
          >
            Teacher ID: {course.teacherId}
          </motion.div>
        </motion.div>
      ))
    ) : (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl p-6 justify-center flex flex-col items-center"
      >
        <p className="text-gray-500 text-center">No courses found.</p>
      </motion.div>
    )}
  </div>
)}


      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        onSubmit={handleSubmit}
        className="mt-12 bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
      >
        <h3 className="text-lg font-bold text-indigo-700 mb-4">Add New Course</h3>
        <input
          type="text"
          placeholder="Course Name"
          value={newCourse.name}
          onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
          className="w-full p-2 mb-4 border rounded-md"
          required
        />
        <textarea
          placeholder="Description"
          value={newCourse.description}
          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
          className="w-full p-2 mb-4 border rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Subject ID"
          value={newCourse.subjectId}
          onChange={(e) => setNewCourse({ ...newCourse, subjectId: e.target.value })}
          className="w-full p-2 mb-4 border rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Teacher ID"
          value={newCourse.teacherId}
          onChange={(e) => setNewCourse({ ...newCourse, teacherId: e.target.value })}
          className="w-full p-2 mb-4 border rounded-md"
          required
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600"
        >
          Create Course
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Courses;