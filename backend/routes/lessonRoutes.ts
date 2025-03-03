import { Router } from 'express';
import { PrismaClient, Role } from '@prisma/client';
import { protect, authorize } from '../middleware/authMiddleware';
import { NotFoundError } from '../utils/errors';

const prisma = new PrismaClient();
const router = Router();

// Get all lessons
router.get('/', protect, async (req, res, next) => {
  try {
    const lessons = await prisma.lesson.findMany();
    res.json({ success: true, data: lessons });
  } catch (error) {
    next(error);
  }
});

// Create a lesson (Teacher or Admin)
router.post('/', protect, authorize(Role.TEACHER, Role.ADMIN), async (req, res, next) => {
  try {
    const lesson = await prisma.lesson.create({ data: req.body });
    res.status(201).json({ success: true, data: lesson });
  } catch (error) {
    next(error);
  }
});

// Get a lesson by ID
router.get('/:id', protect, async (req, res, next) => {
  try {
    const lesson = await prisma.lesson.findUnique({ where: { id: req.params.id } });
    if (!lesson) throw new NotFoundError('Lesson not found');
    res.json({ success: true, data: lesson });
  } catch (error) {
    next(error);
  }
});

// Update a lesson (Teacher or Admin)
router.put('/:id', protect, authorize(Role.TEACHER, Role.ADMIN), async (req, res, next) => {
  try {
    const lesson = await prisma.lesson.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ success: true, data: lesson });
  } catch (error) {
    next(error);
  }
});

// Delete a lesson (Admin only)
router.delete('/:id', protect, authorize(Role.ADMIN), async (req, res, next) => {
  try {
    await prisma.lesson.delete({ where: { id: req.params.id } });
    res.json({ success: true, data: null });
  } catch (error) {
    next(error);
  }
});

export { router as lessonRoutes };