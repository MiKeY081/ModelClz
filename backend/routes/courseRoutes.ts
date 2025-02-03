import express from 'express';
import {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse
} from '../controllers/courseController';
import { protect, authorize } from '../middleware/authMiddleware';
import { Role } from '@prisma/client';

const router = express.Router();

router.post('/', protect, authorize(Role.TEACHER, Role.ADMIN), createCourse);
router.get('/', protect, getCourses);
router.get('/:id', protect, getCourse);
router.put('/:id', protect, authorize(Role.TEACHER, Role.ADMIN), updateCourse);
router.delete('/:id', protect, authorize(Role.ADMIN), deleteCourse);

export default router;