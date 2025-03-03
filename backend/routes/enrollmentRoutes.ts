import { Router } from 'express';
import { PrismaClient, Role } from '@prisma/client';
import { protect, authorize } from '../middleware/authMiddleware';
import { NotFoundError } from '../utils/errors';

const prisma = new PrismaClient();
const router = Router();

// Get all enrollments
router.get('/', protect, async (req, res, next) => {
  try {
    const enrollments = await prisma.enrollment.findMany();
    res.json({ success: true, data: enrollments });
  } catch (error) {
    next(error);
  }
});

// Create an enrollment (Admin or Teacher)
router.post('/', protect, authorize(Role.ADMIN, Role.TEACHER), async (req, res, next) => {
  try {
    const enrollment = await prisma.enrollment.create({ data: req.body });
    res.status(201).json({ success: true, data: enrollment });
  } catch (error) {
    next(error);
  }
});

// Get an enrollment by ID
router.get('/:id', protect, async (req, res, next) => {
  try {
    const enrollment = await prisma.enrollment.findUnique({ where: { id: req.params.id } });
    if (!enrollment) throw new NotFoundError('Enrollment not found');
    res.json({ success: true, data: enrollment });
  } catch (error) {
    next(error);
  }
});

// Update an enrollment (Admin or Teacher)
router.put('/:id', protect, authorize(Role.ADMIN, Role.TEACHER), async (req, res, next) => {
  try {
    const enrollment = await prisma.enrollment.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ success: true, data: enrollment });
  } catch (error) {
    next(error);
  }
});

// Delete an enrollment (Admin only)
router.delete('/:id', protect, authorize(Role.ADMIN), async (req, res, next) => {
  try {
    await prisma.enrollment.delete({ where: { id: req.params.id } });
    res.json({ success: true, data: null });
  } catch (error) {
    next(error);
  }
});

export { router as enrollmentRoutes };