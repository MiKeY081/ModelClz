// frontend/src/pages/Profile.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  getProfile,
  getCourses,
  getAssignments,
  getStudents,
  getEnrollments,
  getGrades,
  getAttendance,
  createAssignment,
  linkStudentToParent,
  getUsers,
  createUser,
} from '../API/ApiResponse';
import Card from '../components/Card';
import ListItem from '../components/ListItem';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import Button from '../components/Button';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [assignmentForm, setAssignmentForm] = useState({ title: '', description: '', dueDate: '', courseId: '' });
  const [studentId, setStudentId] = useState('');
  const [newUserForm, setNewUserForm] = useState({ email: '', password: '', firstName: '', lastName: '', role: 'STUDENT' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        const extraData: any = {};
        if (user?.role === 'TEACHER') {
          extraData.courses = (await getCourses()) || [];
          extraData.assignments = (await getAssignments()) || [];
        } else if (user?.role === 'PARENT') {
          extraData.students = (await getStudents()) || [];
          extraData.grades = (await getGrades()) || [];
          extraData.attendance = (await getAttendance()) || [];
        } else if (user?.role === 'STUDENT') {
          extraData.enrollments = (await getEnrollments()) || [];
          extraData.grades = (await getGrades()) || [];
        } else if (user?.role === 'ADMIN') {
          extraData.users = (await getUsers()) || [];
        }
        setProfileData({ ...profile, ...extraData });
      } catch (error) {
        console.error('Error fetching profile, homie:', error);
        setProfileData({}); // Fallback to empty object
      }
    };
    if (user) fetchProfile();
  }, [user]);

  const handleAssignmentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAssignmentForm(prev => ({ ...prev, [name]: value }));
  };

  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUserForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAssignment(assignmentForm);
      const assignments = await getAssignments();
      setProfileData((prev: any) => ({ ...prev, assignments: assignments || [] }));
      setAssignmentForm({ title: '', description: '', dueDate: '', courseId: '' });
    } catch (error) {
      console.error('Error creating assignment, homie:', error);
    }
  };

  const handleLinkStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await linkStudentToParent(studentId);
      const students = await getStudents();
      setProfileData((prev: any) => ({ ...prev, students: students || [] }));
      setStudentId('');
    } catch (error) {
      console.error('Error linking student, homie:', error);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(newUserForm);
      const users = await getUsers();
      setProfileData((prev: any) => ({ ...prev, users: users || [] }));
      setNewUserForm({ email: '', password: '', firstName: '', lastName: '', role: 'STUDENT' });
    } catch (error) {
      console.error('Error creating user, homie:', error);
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
        className="bg-white rounded-3xl shadow-xl p-8"
      >
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={profileData?.avatar || 'https://via.placeholder.com/100'}
            alt="Avatar"
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Yo, {profileData?.firstName || 'homie'} {profileData?.lastName || ''}!
            </h1>
            <p className="text-gray-600 text-lg">{profileData?.role?.toLowerCase() || 'Homie'} | Homies Squad</p>
            <Link to="/profile/update" className="text-blue-600 hover:underline">Update Profile</Link>
          </div>
        </div>

        {user?.role === 'TEACHER' && (
          <>
            <Card title="Your Courses">
              {profileData?.courses?.length > 0 ? (
                profileData.courses.map((c: any) => <ListItem key={c.id} content={c.name} />)
              ) : (
                <p>No courses yet, homie!</p>
              )}
            </Card>
            <Card title="Your Assignments">
              {profileData?.assignments?.length > 0 ? (
                profileData.assignments.map((a: any) => (
                  <ListItem key={a.id} content={`${a.title} - Due: ${a.dueDate}`} />
                ))
              ) : (
                <p>No assignments yet, homie!</p>
              )}
              <form onSubmit={handleCreateAssignment} className="mt-4 space-y-4">
                <InputField label="Title" name="title" value={assignmentForm.title} onChange={handleAssignmentChange} required />
                <InputField label="Description" name="description" value={assignmentForm.description} onChange={handleAssignmentChange} textarea required />
                <InputField label="Due Date" name="dueDate" value={assignmentForm.dueDate} onChange={handleAssignmentChange} type="date" required />
                <SelectField
                  label="Course"
                  name="courseId"
                  value={assignmentForm.courseId}
                  onChange={handleAssignmentChange}
                  options={profileData?.courses?.map((c: any) => ({ value: c.id, label: c.name })) || []}
                  placeholder="Select a course, homie!"
                  required
                />
                <Button type="submit">Create Assignment</Button>
              </form>
            </Card>
          </>
        )}

        {user?.role === 'PARENT' && (
          <>
            <Card title="Your Students">
              {profileData?.students?.length > 0 ? (
                profileData.students.map((s: any) => (
                  <ListItem key={s.id} content={`${s.user?.firstName || 'Student'} ${s.user?.lastName || ''}`} />
                ))
              ) : (
                <p>No students linked, homie!</p>
              )}
              <form onSubmit={handleLinkStudent} className="mt-4 space-y-4">
                <SelectField
                  label="Link a Student"
                  name="studentId"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  options={profileData?.students?.map((s: any) => ({ value: s.id, label: `${s.user?.firstName || 'Student'} ${s.user?.lastName || ''}` })) || []}
                  placeholder="Select a student, homie!"
                  required
                />
                <Button type="submit">Link Student</Button>
              </form>
            </Card>
            <Card title="Grades">
              {profileData?.grades?.length > 0 ? (
                profileData.grades.map((g: any) => (
                  <ListItem key={g.id} content={`Assignment: ${g.assignment?.title || 'N/A'} - ${g.value}`} />
                ))
              ) : (
                <p>No grades yet, homie!</p>
              )}
            </Card>
            <Card title="Attendance">
              {profileData?.attendance?.length > 0 ? (
                profileData.attendance.map((a: any) => (
                  <ListItem key={a.id} content={`${a.date} - ${a.status}`} />
                ))
              ) : (
                <p>No attendance records, homie!</p>
              )}
            </Card>
          </>
        )}

        {user?.role === 'STUDENT' && (
          <>
            <Card title="Your Courses">
              {profileData?.enrollments?.length > 0 ? (
                profileData.enrollments.map((e: any) => (
                  <ListItem key={e.id} content={e.course?.name || 'N/A'} />
                ))
              ) : (
                <p>No courses enrolled, homie!</p>
              )}
            </Card>
            <Card title="Your Grades">
              {profileData?.grades?.length > 0 ? (
                profileData.grades.map((g: any) => (
                  <ListItem key={g.id} content={`Assignment: ${g.assignment?.title || 'N/A'} - ${g.value}`} />
                ))
              ) : (
                <p>No grades yet, homie!</p>
              )}
            </Card>
          </>
        )}

        {user?.role === 'ADMIN' && (
          <>
            <Card title="All Homies">
              {profileData?.users?.length > 0 ? (
                profileData.users.map((u: any) => (
                  <ListItem key={u.id} content={`${u.firstName} ${u.lastName} - ${u.role}`} />
                ))
              ) : (
                <p>No Homies yet, homie!</p>
              )}
            </Card>
            <Card title="Add New Homie">
              <form onSubmit={handleCreateUser} className="space-y-4">
                <InputField label="Email" name="email" value={newUserForm.email} onChange={handleNewUserChange} type="email" required />
                <InputField label="Password" name="password" value={newUserForm.password} onChange={handleNewUserChange} type="password" required />
                <InputField label="First Name" name="firstName" value={newUserForm.firstName} onChange={handleNewUserChange} required />
                <InputField label="Last Name" name="lastName" value={newUserForm.lastName} onChange={handleNewUserChange} required />
                <SelectField
                  label="Role"
                  name="role"
                  value={newUserForm.role}
                  onChange={handleNewUserChange}
                  options={[
                    { value: 'STUDENT', label: 'Student' },
                    { value: 'TEACHER', label: 'Teacher' },
                    { value: 'PARENT', label: 'Parent' },
                    { value: 'ADMIN', label: 'Admin' },
                  ]}
                  required
                />
                <Button type="submit">Add Homie</Button>
              </form>
            </Card>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;