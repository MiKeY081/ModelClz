import { Router } from 'express';
import { PrismaClient, Role } from '@prisma/client';
import { protect, authorize } from '../middleware/authMiddleware';
import { NotFoundError } from '../utils/errors';

const prisma = new PrismaClient();
const router = Router();

// Get all subjects
router.get('/', protect, async (req, res, next) => {
  try {
    const subjects = await prisma.subject.findMany();
    res.json({ success: true, data: subjects });
  } catch (error) {
    next(error);
  }
});

// Create a subject (Admin only)
router.post('/', protect, authorize(Role.ADMIN), async (req, res, next) => {
  try {
    const subject = await prisma.subject.create({ data: req.body });
    res.status(201).json({ success: true, data: subject });
  } catch (error) {
    next(error);
  }
});

// Get a subject by ID
router.get('/:id', protect, async (req, res, next) => {
  try {
    const subject = await prisma.subject.findUnique({ where: { id: req.params.id } });
    if (!subject) throw new NotFoundError('Subject not found');
    res.json({ success: true, data: subject });
  } catch (error) {
    next(error);
  }
});

// Update a subject (Admin only)
router.put('/:id', protect, authorize(Role.ADMIN), async (req, res, next) => {
  try {
    const subject = await prisma.subject.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ success: true, data: subject });
  } catch (error) {
    next(error);
  }
});

// Delete a subject (Admin only)
router.delete('/:id', protect, authorize(Role.ADMIN), async (req, res, next) => {
  try {
    await prisma.subject.delete({ where: { id: req.params.id } });
    res.json({ success: true, data: null });
  } catch (error) {
    next(error);
  }
});

export { router as subjectRoutes };