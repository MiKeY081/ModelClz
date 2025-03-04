import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, Clock, CheckCircle, XCircle, AlertCircle, Filter, Search, ChevronDown, Upload, Star } from 'lucide-react';
import { getAssignments } from '@/API/ApiResponse';

interface Assignment {
  id: number;
  title: string;
  subject: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  type: 'homework' | 'project' | 'quiz';
  points: number;
}

function Assignments() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAssignments(); // No need for Promise.resolve
        setAssignments(response);
        console.log(response);
      } catch (err) {
        console.error("Error fetching assignments:", err);
      }
    };
  
    fetchData();
  }, []); // Runs only once on mount
  
  // const assignments: Assignment[] = [
  //   {
  //     id: 1,
  //     title: "Advanced Calculus Problem Set",
  //     subject: "Mathematics",
  //     description: "Complete problems 1-20 from Chapter 5: Differential Equations",
  //     dueDate: "2024-03-20",
  //     status: "pending",
  //     type: "homework",
  //     points: 100
  //   },
  //   {
  //     id: 2,
  //     title: "Physics Lab Report: Wave Motion",
  //     subject: "Physics",
  //     description: "Write a detailed report on the wave motion experiments conducted in lab",
  //     dueDate: "2024-03-18",
  //     status: "completed",
  //     type: "project",
  //     points: 150
  //   },
  //   {
  //     id: 3,
  //     title: "Literature Analysis Essay",
  //     subject: "English",
  //     description: "Write a 1000-word analysis of Shakespeare's Macbeth",
  //     dueDate: "2024-03-15",
  //     status: "overdue",
  //     type: "homework",
  //     points: 100
  //   }
  // ];

  const filteredAssignments = assignments.filter(assignment => 
    (filter === 'all' || assignment.status === filter) &&
    (assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     assignment.subject.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Assignments</h1>
            <p className="text-gray-600">Track and manage your academic tasks</p>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Submit Assignment
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search assignments..."
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

        {/* Status Filters */}
        <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
          <FilterButton
            active={filter === 'all'}
            onClick={() => setFilter('all')}
            icon={<FileText className="w-4 h-4" />}
            label="All"
          />
          <FilterButton
            active={filter === 'pending'}
            onClick={() => setFilter('pending')}
            icon={<Clock className="w-4 h-4" />}
            label="Pending"
          />
          <FilterButton
            active={filter === 'completed'}
            onClick={() => setFilter('completed')}
            icon={<CheckCircle className="w-4 h-4" />}
            label="Completed"
          />
          <FilterButton
            active={filter === 'overdue'}
            onClick={() => setFilter('overdue')}
            icon={<AlertCircle className="w-4 h-4" />}
            label="Overdue"
          />
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.map((assignment) => (
          <AssignmentCard key={assignment.id} assignment={assignment} />
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

function AssignmentCard({ assignment }: { assignment: Assignment }) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    overdue: 'bg-red-100 text-red-800'
  };

  const statusIcons = {
    pending: <Clock className="w-4 h-4" />,
    completed: <CheckCircle className="w-4 h-4" />,
    overdue: <XCircle className="w-4 h-4" />
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">{assignment.title}</h3>
            <p className="text-gray-600 mb-4">{assignment.description}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${statusColors[assignment.status]}`}>
            {statusIcons[assignment.status]}
            {assignment.status?.charAt(0).toUpperCase() + assignment.status?.slice(1)}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>{assignment.subject}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Due: {assignment.dueDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            <span>{assignment.points} points</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            View Details
          </button>
          {assignment.status === 'pending' && (
            <button className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition">
              Submit
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Assignments;