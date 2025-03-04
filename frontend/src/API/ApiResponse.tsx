import axios, { AxiosResponse, AxiosError } from 'axios';


const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5002/api"
    : "https://model-clz-server.vercel.app/api";



interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface ErrorResponse {
  message: string;
  stack?: string | null;
}

type Role = 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';
type EnrollmentStatus = 'ACTIVE' | 'COMPLETED' | 'DROPPED';
type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE';

interface User { id: string; email: string; firstName: string; lastName: string; role: Role; avatar?: string; createdAt: string; updatedAt: string; }
interface Course { id: string; name: string; description: string; subjectId: string; teacherId: string; createdAt: string; updatedAt: string; }
interface Assignment { id: string; title: string; description: string; dueDate: string; courseId: string; teacherId: string; createdAt: string; updatedAt: string; }
interface Grade { id: string; value: number; comment?: string; userId: string; assignmentId: string; createdAt: string; updatedAt: string; }
interface Attendance { id: string; date: string; status: AttendanceStatus; studentId: string; createdAt: string; updatedAt: string; }
interface Post { id: string; title: string; content: string; authorId: string; createdAt: string; updatedAt: string; }
interface Achievement { id: string; title: string; description: string; date: string; userId: string; category: string; createdAt: string; updatedAt: string; }
interface Student { id: string; userId: string; grade: number; section: string; rollNumber: string; parentId?: string; createdAt: string; updatedAt: string; }
interface Teacher { id: string; userId: string; qualification: string; experience: number; createdAt: string; updatedAt: string; }
interface Parent { id: string; userId: string; phone: string; address: string; createdAt: string; updatedAt: string; }
interface Subject { id: string; name: string; code: string; description: string; createdAt: string; updatedAt: string; }
interface Enrollment { id: string; studentId: string; courseId: string; enrolledAt: string; status: EnrollmentStatus; createdAt: string; updatedAt: string; }
interface Lesson { id: string; title: string; content: string; courseId: string; createdAt: string; updatedAt: string; }
interface Comment { id: string; content: string; postId: string; authorId: string; createdAt: string; updatedAt: string; }
interface AssignmentSubmission { id: string; userId: string; assignmentId: string; submittedAt: string; createdAt: string; updatedAt: string; }
interface TeacherSubject { id: string; teacherId: string; subjectId: string; createdAt: string; updatedAt: string; }

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const handleError = (error: AxiosError<ErrorResponse>) => {
  const status = error.response?.status;
  const message = error.response?.data.message || error.message;
  switch (status) {
    case 400: throw new Error(`Validation Error: ${message}`);
    case 401: throw new Error(`Authentication Error: ${message}`);
    case 404: throw new Error(`Not Found: ${message}`);
    case 500: throw new Error(`Server Error: ${message}`);
    default: throw new Error(`Unexpected Error: ${message}`);
  }
};

// Auth
export const register = async (data: { email: string; password: string; firstName: string; lastName: string, role:Role }) => {
  try {
    const response: AxiosResponse<ApiResponse<User>> = await api.post('/auth/register', data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const response: AxiosResponse<ApiResponse<{ user: User; token: string }>> = await api.post('/auth/login', data);
    if (response.data.token) localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

// Users
export const getProfile = async () => {
  try {
    const response: AxiosResponse<ApiResponse<User>> = await api.get('/users/profile');
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const updateProfile = async (data: Partial<User>) => {
  try {
    const response: AxiosResponse<ApiResponse<User>> = await api.put('/users/profile', data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    handleError(error as AxiosError<ErrorResponse>);
  }
};

// Courses
export const createCourse = async (data: Partial<Course>) => {
  try {
    const response: AxiosResponse<ApiResponse<Course>> = await api.post('/courses', data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const getCourses = async () => {
  try {
    const response: AxiosResponse<ApiResponse<Course[]>> = await api.get('/courses');
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const getCourse = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<Course>> = await api.get(`/courses/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const updateCourse = async (id: string, data: Partial<Course>) => {
  try {
    const response: AxiosResponse<ApiResponse<Course>> = await api.put(`/courses/${id}`, data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const deleteCourse = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await api.delete(`/courses/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

// Assignments
export const createAssignment = async (data: Partial<Assignment>) => {
  try {
    const response: AxiosResponse<ApiResponse<Assignment>> = await api.post('/assignments', data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const getAssignments = async () => {
  try {
    const response: AxiosResponse<ApiResponse<Assignment[]>> = await api.get('/assignments');
   
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const getAssignment = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<Assignment>> = await api.get(`/assignments/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const updateAssignment = async (id: string, data: Partial<Assignment>) => {
  try {
    const response: AxiosResponse<ApiResponse<Assignment>> = await api.put(`/assignments/${id}`, data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const deleteAssignment = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await api.delete(`/assignments/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

// Attendance
export const markAttendance = async (data: Partial<Attendance>) => {
  try {
    const response: AxiosResponse<ApiResponse<Attendance>> = await api.post('/attendance', data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const getAttendance = async () => {
  try {
    const response: AxiosResponse<ApiResponse<Attendance[]>> = await api.get('/attendance');
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const getAttendanceById = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<Attendance>> = await api.get(`/attendance/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const updateAttendance = async (id: string, data: Partial<Attendance>) => {
  try {
    const response: AxiosResponse<ApiResponse<Attendance>> = await api.put(`/attendance/${id}`, data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const deleteAttendance = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await api.delete(`/attendance/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

// Grades
export const createGrade = async (data: Partial<Grade>) => {
  try {
    const response: AxiosResponse<ApiResponse<Grade>> = await api.post('/grades', data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const getGrades = async () => {
  try {
    const response: AxiosResponse<ApiResponse<Grade[]>> = await api.get('/grades');
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const getGrade = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<Grade>> = await api.get(`/grades/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const updateGrade = async (id: string, data: Partial<Grade>) => {
  try {
    const response: AxiosResponse<ApiResponse<Grade>> = await api.put(`/grades/${id}`, data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const deleteGrade = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await api.delete(`/grades/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

// Posts
export const createPost = async (data: Partial<Post>) => {
  try {
    const response: AxiosResponse<ApiResponse<Post>> = await api.post('/posts', data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const getPosts = async () => {
  try {
    const response: AxiosResponse<ApiResponse<Post[]>> = await api.get('/posts');
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const getPost = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<Post>> = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const updatePost = async (id: string, data: Partial<Post>) => {
  try {
    const response: AxiosResponse<ApiResponse<Post>> = await api.put(`/posts/${id}`, data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const likePost = async (postId: string) => {
  const response: AxiosResponse<ApiResponse<Post>> = await api.put(`/posts/${postId}/like`);
  return response.data;
};

export const deletePost = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await api.delete(`/posts/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

// Achievements
export const createAchievement = async (data: Partial<Achievement>) => {
  try {
    const response: AxiosResponse<ApiResponse<Achievement>> = await api.post('/achievements', data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const getAchievements = async () => {
  try {
    const response: AxiosResponse<ApiResponse<Achievement[]>> = await api.get('/achievements');
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const getAchievement = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<Achievement>> = await api.get(`/achievements/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const updateAchievement = async (id: string, data: Partial<Achievement>) => {
  try {
    const response: AxiosResponse<ApiResponse<Achievement>> = await api.put(`/achievements/${id}`, data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const deleteAchievement = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await api.delete(`/achievements/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};
// Students
export const getStudents = async () => {
  try {
    const response: AxiosResponse<ApiResponse<Student[]>> = await api.get('/students');
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};




export const createStudent = async (data: { firstName: string; lastName: string; rollNumber: string; grade: number; section: string; parentId?: string }) => {
  try {
    const response = await api.post('/students', data);
    return response.data;
  } catch (error) {
    handleError(error as AxiosError<ErrorResponse>);
  }
};

export const updateStudent = async (id: string, data: Partial<Student>) => {
  try {
    const response: AxiosResponse<ApiResponse<Student>> = await api.put(`/students/${id}`, data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const deleteStudent = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await api.delete(`/students/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

// Teachers
export const getTeachers = async () => {
  try {
    const response: AxiosResponse<ApiResponse<Teacher[]>> = await api.get('/teachers');
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const createTeacher = async (data: Partial<Teacher>) => {
  try {
    const response: AxiosResponse<ApiResponse<Teacher>> = await api.post('/teachers', data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const getTeacher = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<Teacher>> = await api.get(`/teachers/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const updateTeacher = async (id: string, data: Partial<Teacher>) => {
  try {
    const response: AxiosResponse<ApiResponse<Teacher>> = await api.put(`/teachers/${id}`, data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const deleteTeacher = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await api.delete(`/teachers/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

// Parents
export const getParents = async () => {
  try {
    const response: AxiosResponse<ApiResponse<Parent[]>> = await api.get('/parents');
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const createParent = async (data: Partial<Parent>) => {
  try {
    const response: AxiosResponse<ApiResponse<Parent>> = await api.post('/parents', data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const getParent = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<Parent>> = await api.get(`/parents/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const updateParent = async (id: string, data: Partial<Parent>) => {
  try {
    const response: AxiosResponse<ApiResponse<Parent>> = await api.put(`/parents/${id}`, data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const deleteParent = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await api.delete(`/parents/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

// Subjects
export const getSubjects = async () => {
  try {
    const response: AxiosResponse<ApiResponse<Subject[]>> = await api.get('/subjects');
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const createSubject = async (data: Partial<Subject>) => {
  try {
    const response: AxiosResponse<ApiResponse<Subject>> = await api.post('/subjects', data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const getSubject = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<Subject>> = await api.get(`/subjects/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const updateSubject = async (id: string, data: Partial<Subject>) => {
  try {
    const response: AxiosResponse<ApiResponse<Subject>> = await api.put(`/subjects/${id}`, data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const deleteSubject = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await api.delete(`/subjects/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

// Enrollments
export const getEnrollments = async () => {
  try {
    const response: AxiosResponse<ApiResponse<Enrollment[]>> = await api.get('/enrollments');
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const createEnrollment = async (data: Partial<Enrollment>) => {
  try {
    const response: AxiosResponse<ApiResponse<Enrollment>> = await api.post('/enrollments', data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const getEnrollment = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<Enrollment>> = await api.get(`/enrollments/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const updateEnrollment = async (id: string, data: Partial<Enrollment>) => {
  try {
    const response: AxiosResponse<ApiResponse<Enrollment>> = await api.put(`/enrollments/${id}`, data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const deleteEnrollment = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await api.delete(`/enrollments/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

// Lessons
export const getLessons = async () => {
  try {
    const response: AxiosResponse<ApiResponse<Lesson[]>> = await api.get('/lessons');
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const createLesson = async (data: Partial<Lesson>) => {
  try {
    const response: AxiosResponse<ApiResponse<Lesson>> = await api.post('/lessons', data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const getLesson = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<Lesson>> = await api.get(`/lessons/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const updateLesson = async (id: string, data: Partial<Lesson>) => {
  try {
    const response: AxiosResponse<ApiResponse<Lesson>> = await api.put(`/lessons/${id}`, data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const deleteLesson = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await api.delete(`/lessons/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

// Comments
export const getComments = async (postId?: string) => {
  try {
    const response: AxiosResponse<ApiResponse<Comment[]>> = await api.get('/comments', { params: { postId } });
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const createComment = async (data: Partial<Comment>) => {
  try {
    const response: AxiosResponse<ApiResponse<Comment>> = await api.post('/comments', data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const getComment = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<Comment>> = await api.get(`/comments/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const updateComment = async (id: string, data: Partial<Comment>) => {
  try {
    const response: AxiosResponse<ApiResponse<Comment>> = await api.put(`/comments/${id}`, data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const deleteComment = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await api.delete(`/comments/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

// Submissions
export const getSubmissions = async () => {
  try {
    const response: AxiosResponse<ApiResponse<AssignmentSubmission[]>> = await api.get('/submissions');
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const createSubmission = async (data: Partial<AssignmentSubmission>) => {
  try {
    const response: AxiosResponse<ApiResponse<AssignmentSubmission>> = await api.post('/submissions', data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const getSubmission = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<AssignmentSubmission>> = await api.get(`/submissions/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const updateSubmission = async (id: string, data: Partial<AssignmentSubmission>) => {
  try {
    const response: AxiosResponse<ApiResponse<AssignmentSubmission>> = await api.put(`/submissions/${id}`, data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const deleteSubmission = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await api.delete(`/submissions/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

// Teacher-Subjects
export const getTeacherSubjects = async () => {
  try {
    const response: AxiosResponse<ApiResponse<TeacherSubject[]>> = await api.get('/teacher-subjects');
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const createTeacherSubject = async (data: Partial<TeacherSubject>) => {
  try {
    const response: AxiosResponse<ApiResponse<TeacherSubject>> = await api.post('/teacher-subjects', data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const getTeacherSubject = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<TeacherSubject>> = await api.get(`/teacher-subjects/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const updateTeacherSubject = async (id: string, data: Partial<TeacherSubject>) => {
  try {
    const response: AxiosResponse<ApiResponse<TeacherSubject>> = await api.put(`/teacher-subjects/${id}`, data);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const deleteTeacherSubject = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await api.delete(`/teacher-subjects/${id}`);
    return response.data;
  } catch (error) { handleError(error as AxiosError<ErrorResponse>); }
};

export const logout = () => {
  localStorage.removeItem('token');
};



//static props 

// export const getAssignments = async () => ({ data: [/* your static assignments */] });
export const getMessages = async () => ({ data: [/* your static messages */] });
export const getEvents = async () => ({
  data: [
    { id: '1', title: 'Annual Science Fair', type: 'academic', date: '2024-03-15', time: '09:00 AM', location: 'Main Auditorium', image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=800', isLive: true },
    // Add your static events here
  ]
});

export const getLibraryBooks = async () => ({
  data: [
    { id: '1', title: 'Advanced Mathematics', author: 'Dr. Sarah Johnson', category: 'textbooks', cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400', rating: 4.5, available: true },
    // Add your static books here
  ]
});

export const getLibraryHistory = async () => ({
  data: [
    { id: '1', title: 'Advanced Mathematics', author: 'Dr. Sarah Johnson', borrowDate: '2024-02-15', returnDate: '2024-03-01', status: 'returned', cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400' },
    // Add your static history here
  ]
});


// export const getAchievements = async () => ({
//   data: [
//     {
//       id: '1',
//       title: 'National Science Olympiad',
//       achiever: { name: 'Sarah Johnson', role: 'student', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200' },
//       date: 'March 2024',
//       category: 'academic',
//       description: 'First place in the National Science Olympiad, representing excellence in scientific innovation.',
//       badge: 'gold',
//     },
//     // Add your static achievements here
//   ]
// });

// export const getMessages = async () => ({
//   data: [
//     { id: '1', type: 'event', title: 'Science Fair Tomorrow', message: 'Don\'t forget to attend at 9 AM.', time: '2 hours ago', read: false },
//     // Add your static notifications here
//   ]
// });

export const markMessagesAsRead = async () => {
  console.log('Marked all as read');
  return { success: true };
};

export const linkStudentToParent = async (studentId: string) => {
  const token = localStorage.getItem('token');
  const response: AxiosResponse<ApiResponse<null>> = await api.post(`/parents/link-student${studentId}`);

  return response.data;
};

export const createUser =  async (userData: any) => {
  const token = localStorage.getItem('token');
  const response: AxiosResponse<ApiResponse<null>> = await api.post(`/users`, userData);

  return response.data;
};