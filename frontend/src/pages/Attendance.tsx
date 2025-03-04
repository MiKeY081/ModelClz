import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getAttendance, markAttendance } from '../API/ApiResponse';
import { AttendanceStatus } from '@/types';


 interface Attendance {
  id: string;
  date: string; 
  status: AttendanceStatus;
  studentId: string;
  createdAt: string;
  updatedAt: string;
}


const Attendance: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<Attendance[]>([]);
  const [newAttendance, setNewAttendance] = useState({ date: '', status: 'PRESENT' as const, studentId: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        const response = await getAttendance();
        setAttendanceRecords(response);
        console.log(response)
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await markAttendance(newAttendance);
      setAttendanceRecords([...attendanceRecords, response.data]);
      setNewAttendance({ date: '', status: 'PRESENT', studentId: '' });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-yellow-400 to-orange-500 p-8">
      <motion.h1
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-4xl font-bold text-white text-center mb-8"
      >
        Attendance Tracker
      </motion.h1>

      {loading ? (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="w-16 h-16 bg-white rounded-full mx-auto"
        />
      ) : error ? (
        <p className="text-red-300 text-center">{error}</p>
      ) : (
        <div className="space-y-4 max-w-2xl mx-auto">
          {attendanceRecords?.map((record, index) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-4 flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold text-orange-700">
                  Student ID: {record.studentId}
                </p>
                <p className="text-gray-600">{new Date(record.date).toLocaleDateString()}</p>
              </div>
              <motion.span
                animate={{ scale: record.status === 'PRESENT' ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.5, repeat: record.status === 'PRESENT' ? Infinity : 0 }}
                className={`text-sm px-3 py-1 rounded-full ${
                  record.status === 'PRESENT' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
              >
                {record.status}
              </motion.span>
            </motion.div>
          ))}
        </div>
      )}

      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        onSubmit={handleSubmit}
        className="mt-12 bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
      >
        <h3 className="text-lg font-bold text-orange-700 mb-4">Mark Attendance</h3>
        <input
          type="date"
          value={newAttendance.date}
          onChange={(e) => setNewAttendance({ ...newAttendance, date: e.target.value })}
          className="w-full p-2 mb-4 border rounded-md"
          required
        />
        <select
          value={newAttendance.status}
          onChange={(e) => setNewAttendance({ ...newAttendance, status: e.target.value as 'PRESENT' | 'ABSENT' | 'LATE' })}
          className="w-full p-2 mb-4 border rounded-md"
        >
          <option value="PRESENT">Present</option>
          <option value="ABSENT">Absent</option>
          <option value="LATE">Late</option>
        </select>
        <input
          type="text"
          placeholder="Student ID"
          value={newAttendance.studentId}
          onChange={(e) => setNewAttendance({ ...newAttendance, studentId: e.target.value })}
          className="w-full p-2 mb-4 border rounded-md"
          required
        />
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: '#f59e0b' }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600"
        >
          Mark Attendance
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Attendance;