import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  BookOpen, 
  Calendar, 
  Download, 
  Filter, 
  Search, 
  Star,
  TrendingUp,
  ChevronDown,
  Award
} from 'lucide-react';

interface Grade {
  id: number;
  subject: string;
  grade: string;
  percentage: number;
  lastGrade: string;
  trend: 'up' | 'down' | 'stable';
  assignments: number;
  teacher: string;
}

function Grades() {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const grades: Grade[] = [
    {
      id: 1,
      subject: "Mathematics",
      grade: "A",
      percentage: 95,
      lastGrade: "A-",
      trend: "up",
      assignments: 15,
      teacher: "Dr. Johnson"
    },
    {
      id: 2,
      subject: "Physics",
      grade: "A-",
      percentage: 92,
      lastGrade: "B+",
      trend: "up",
      assignments: 12,
      teacher: "Prof. Smith"
    },
    {
      id: 3,
      subject: "English Literature",
      grade: "B+",
      percentage: 88,
      lastGrade: "A-",
      trend: "down",
      assignments: 10,
      teacher: "Ms. Davis"
    },
    {
      id: 4,
      subject: "Computer Science",
      grade: "A",
      percentage: 96,
      lastGrade: "A",
      trend: "stable",
      assignments: 14,
      teacher: "Mr. Wilson"
    }
  ];

  const filteredGrades = grades.filter(grade =>
    (selectedSubject === 'all' || grade.subject.toLowerCase() === selectedSubject) &&
    grade.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateGPA = () => {
    const gradePoints = {
      'A': 4.0,
      'A-': 3.7,
      'B+': 3.3,
      'B': 3.0,
      'B-': 2.7,
      'C+': 2.3,
      'C': 2.0,
      'C-': 1.7,
      'D+': 1.3,
      'D': 1.0,
      'F': 0.0
    };

    const total = grades.reduce((sum, grade) => sum + gradePoints[grade.grade as keyof typeof gradePoints], 0);
    return (total / grades.length).toFixed(2);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Academic Performance</h1>
            <p className="text-gray-600">Track your grades and academic progress</p>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
            <Download className="w-5 h-5" />
            Download Report
          </button>
        </div>
      </div>

      {/* GPA Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Current GPA</h2>
            <p className="text-4xl font-bold">{calculateGPA()}</p>
          </div>
          <Award className="w-16 h-16 opacity-50" />
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search subjects..."
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
      </div>

      {/* Grades Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGrades.map((grade) => (
          <GradeCard key={grade.id} grade={grade} />
        ))}
      </div>
    </div>
  );
}

function GradeCard({ grade }: { grade: Grade }) {
  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    stable: 'text-gray-500'
  };

  const trendIcons = {
    up: <TrendingUp className="w-4 h-4" />,
    down: <TrendingUp className="w-4 h-4 transform rotate-180" />,
    stable: <TrendingUp className="w-4 h-4" />
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold">{grade.subject}</h3>
            <p className="text-gray-600">Teacher: {grade.teacher}</p>
          </div>
          <div className="text-center">
            <span className="text-3xl font-bold">{grade.grade}</span>
            <div className={`flex items-center gap-1 ${trendColors[grade.trend]}`}>
              {trendIcons[grade.trend]}
              <span className="text-sm">{grade.lastGrade}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-100 rounded-full mb-4">
          <div 
            className="h-full bg-blue-600 rounded-full"
            style={{ width: `${grade.percentage}%` }}
          />
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>{grade.assignments} Assignments</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            <span>{grade.percentage}%</span>
          </div>
        </div>

        <button className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-2">
          <BarChart className="w-4 h-4" />
          View Details
        </button>
      </div>
    </motion.div>
  );
}

export default Grades;