import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
// import { errorHandler, notFound } from './middleware/errorMiddleware';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import courseRoutes from './routes/courseRoutes';
import assignmentRoutes from './routes/assignmentRoutes';
import attendanceRoutes from './routes/attendenceRoutes';
import gradeRoutes from './routes/gradeRoutes';
import postRoutes from './routes/postRoutes';
import achievementRoutes from './routes/achievementRoutes';
import { errorHandler, notFound } from './middleware/errorMiddleware';
import {studentRoutes} from './routes/studentRoutes';
import {teacherRoutes} from './routes/teacherRoutes';
import {parentRoutes} from './routes/parentRoutes';
import {subjectRoutes} from './routes/subjectRoutes';
import {enrollmentRoutes} from './routes/enrollmentRoutes';
import {commentRoutes} from './routes/commentRoutes';
import {submissionRoutes} from './routes/submissionRoutes';
import {teacherSubjectRoutes} from './routes/teacherSubjectRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    "https://homie-clz.vercel.app",
    "http://localhost:5002"
  ],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.options('*', cors());

app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/achievements', achievementRoutes);

// New routes
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/parents', parentRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/teacher-subjects', teacherSubjectRoutes);


// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});