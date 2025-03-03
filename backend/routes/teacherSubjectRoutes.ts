import { Router } from 'express';
import { PrismaClient, Role } from '@prisma/client';
import { protect, authorize } from '../middleware/authMiddleware';
import { NotFoundError } from '../utils/errors';

const prisma = new PrismaClient();
const router = Router();

// Get all teacher-subject assignments
router.get('/', protect, async (req, res, next) => {
  try {
    const teacherSubjects = await prisma.teacherSubject.findMany();
    res.json({ success: true, data: teacherSubjects });
  } catch (error) {
    next(error);
  }
});

// Create a teacher-subject assignment (Admin only)
router.post('/', protect, authorize(Role.ADMIN), async (req, res, next) => {
  try {
    const teacherSubject = await prisma.teacherSubject.create({ data: req.body });
    res.status(201).json({ success: true, data: teacherSubject });
  } catch (error) {
    next(error);
  }
});

// Get a teacher-subject by ID
router.get('/:id', protect, async (req, res, next) => {
  try {
    const teacherSubject = await prisma.teacherSubject.findUnique({ where: { id: req.params.id } });
    if (!teacherSubject) throw new NotFoundError('Teacher-Subject not found');
    res.json({ success: true, data: teacherSubject });
  } catch (error) {
    next(error);
  }
});

// Update a teacher-subject (Admin only)
router.put('/:id', protect, authorize(Role.ADMIN), async (req, res, next) => {
  try {
    const teacherSubject = await prisma.teacherSubject.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ success: true, data: teacherSubject });
  } catch (error) {
    next(error);
  }
});

// Delete a teacher-subject (Admin only)
router.delete('/:id', protect, authorize(Role.ADMIN), async (req, res, next) => {
  try {
    await prisma.teacherSubject.delete({ where: { id: req.params.id } });
    res.json({ success: true, data: null });
  } catch (error) {
    next(error);
  }
});

export { router as teacherSubjectRoutes };