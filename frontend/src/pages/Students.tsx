import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getStudents, createStudent } from '../API/ApiResponse';
import { Student } from '../types';

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    rollNumber: '',
    grade: 0,
    section: '',
    parentId: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await getStudents();
        console.log('Students fetched:', response.data);
        setStudents(response.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Submitting new student:', newStudent);
      const response = await createStudent(newStudent);
      console.log('Create student response:', response);
      setStudents([...students, response.data]);
      setNewStudent({ firstName: '', lastName: '', rollNumber: '', grade: 0, section: '', parentId: '' });
    } catch (err) {
      console.error('Create student error:', err);
      setError((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-400 to-teal-500 p-8">
      <motion.h1
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-4xl font-bold text-white text-center mb-8"
      >
        Our Students
      </motion.h1>

      {loading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-16 h-16 border-4 border-t-transparent border-white rounded-full mx-auto"
        />
      ) : error ? (
        <p className="text-red-300 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ rotateY: 180 }}
              className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4"
            >
              <motion.div
                className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {student.user?.firstName?.charAt(0) || 'S'} {/* Access via user relation */}
              </motion.div>
              <div>
                <h3 className="text-lg font-semibold text-teal-700">{student.rollNumber}</h3>
                <p className="text-gray-600">Grade {student.grade} - {student.section}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <motion.form
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        onSubmit={handleSubmit}
        className="mt-12 bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
      >
        <h3 className="text-lg font-bold text-teal-700 mb-4">Add New Student</h3>
        <input
          type="text"
          placeholder="First Name"
          value={newStudent.firstName}
          onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
          className="w-full p-2 mb-4 border rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newStudent.lastName}
          onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
          className="w-full p-2 mb-4 border rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Roll Number"
          value={newStudent.rollNumber}
          onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })}
          className="w-full p-2 mb-4 border rounded-md"
          required
        />
        <input
          type="number"
          placeholder="Grade"
          value={newStudent.grade}
          onChange={(e) => setNewStudent({ ...newStudent, grade: Number(e.target.value) })}
          className="w-full p-2 mb-4 border rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Section"
          value={newStudent.section}
          onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })}
          className="w-full p-2 mb-4 border rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Parent ID (optional)"
          value={newStudent.parentId}
          onChange={(e) => setNewStudent({ ...newStudent, parentId: e.target.value })}
          className="w-full p-2 mb-4 border rounded-md"
        />
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(0,0,0,0.2)' }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-teal-500 text-white p-2 rounded-md hover:bg-teal-600"
        >
          Add Student
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Students;