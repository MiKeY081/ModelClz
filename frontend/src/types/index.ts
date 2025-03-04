// Enums
export enum Role {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
}

export enum EnrollmentStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  DROPPED = 'DROPPED',
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
}

// Models
export interface User {
  id: string;
  email: string;
  password: string; // Only for client-side forms, not usually returned by API
  firstName: string;
  lastName: string;
  role: Role;
  avatar?: string;
  createdAt: string; // ISO string (e.g., "2025-03-03T12:00:00Z")
  updatedAt: string;
}

export interface Student {
  id: string;
  userId: string;
  user?: User; // Optional relation
  grade: number;
  section: string;
  rollNumber: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Teacher {
  id: string;
  userId: string;
  qualification: string;
  experience: number;
  createdAt: string;
  updatedAt: string;
}

export interface Parent {
  id: string;
  userId: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  subjectId: string;
  teacherId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  status: EnrollmentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string; // ISO string
  courseId: string;
  teacherId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Grade {
  id: string;
  value: number;
  comment?: string;
  userId: string;
  assignmentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Attendance {
  id: string;
  date: string; 
  status: AttendanceStatus;
  studentId: string;
  createdAt: string;
  updatedAt: string;
}


export interface Lesson {
  id: string;
  title: string;
  content: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string; // ISO string
  userId: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface AssignmentSubmission {
  id: string;
  userId: string;
  assignmentId: string;
  submittedAt: string; // ISO string
  createdAt: string;
  updatedAt: string;
}

export interface TeacherSubject {
  id: string;
  teacherId: string;
  subjectId: string;
  createdAt: string;
  updatedAt: string;
}