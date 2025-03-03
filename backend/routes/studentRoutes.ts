import { Router } from 'express';
import { PrismaClient, Role } from '@prisma/client';
import { protect, authorize } from '../middleware/authMiddleware';
import { NotFoundError } from '../utils/errors';

const prisma = new PrismaClient();
const router = Router();

// Get all students (Admin only)
router.get('/', protect, authorize(Role.ADMIN), async (req, res, next) => {
  try {
    const students = await prisma.student.findMany();
    res.json({ success: true, data: students });
  } catch (error) {
    next(error);
  }
});

// Create a student (Admin only)
router.post('/', protect, authorize(Role.ADMIN), async (req, res, next) => {
  try {
    const student = await prisma.student.create({ data: req.body });
    res.status(201).json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
});

// Get a student by ID
router.get('/:id', protect, async (req, res, next) => {
  try {
    const student = await prisma.student.findUnique({ where: { id: req.params.id } });
    if (!student) throw new NotFoundError('Student not found');
    res.json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
});

// Update a student (Admin only)
router.put('/:id', protect, authorize(Role.ADMIN), async (req, res, next) => {
  try {
    const student = await prisma.student.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
});

// Delete a student (Admin only)
router.delete('/:id', protect, authorize(Role.ADMIN), async (req, res, next) => {
  try {
    await prisma.student.delete({ where: { id: req.params.id } });
    res.json({ success: true, data: null });
  } catch (error) {
    next(error);
  }
});

export {router as studentRoutes};