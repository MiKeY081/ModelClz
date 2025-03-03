import { Router } from 'express';
import { PrismaClient, Role } from '@prisma/client';
import { protect, authorize } from '../middleware/authMiddleware';
import { NotFoundError } from '../utils/errors';

const prisma = new PrismaClient();
const router = Router();

// Get all teachers (Admin only)
router.get('/', protect, authorize(Role.ADMIN), async (req, res, next) => {
  try {
    const teachers = await prisma.teacher.findMany();
    res.json({ success: true, data: teachers });
  } catch (error) {
    next(error);
  }
});

// Create a teacher (Admin only)
router.post('/', protect, authorize(Role.ADMIN), async (req, res, next) => {
  try {
    const teacher = await prisma.teacher.create({ data: req.body });
    res.status(201).json({ success: true, data: teacher });
  } catch (error) {
    next(error);
  }
});

// Get a teacher by ID
router.get('/:id', protect, async (req, res, next) => {
  try {
    const teacher = await prisma.teacher.findUnique({ where: { id: req.params.id } });
    if (!teacher) throw new NotFoundError('Teacher not found');
    res.json({ success: true, data: teacher });
  } catch (error) {
    next(error);
  }
});

// Update a teacher (Admin only)
router.put('/:id', protect, authorize(Role.ADMIN), async (req, res, next) => {
  try {
    const teacher = await prisma.teacher.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ success: true, data: teacher });
  } catch (error) {
    next(error);
  }
});

// Delete a teacher (Admin only)
router.delete('/:id', protect, authorize(Role.ADMIN), async (req, res, next) => {
  try {
    await prisma.teacher.delete({ where: { id: req.params.id } });
    res.json({ success: true, data: null });
  } catch (error) {
    next(error);
  }
});

export { router as teacherRoutes };