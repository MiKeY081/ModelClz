import { Router } from 'express';
import { PrismaClient, Role } from '@prisma/client';
import { protect, authorize } from '../middleware/authMiddleware';
import { NotFoundError } from '../utils/errors';

const prisma = new PrismaClient();
const router = Router();

// Get all parents (Admin only)
router.get('/', protect, authorize(Role.ADMIN), async (req, res, next) => {
  try {
    const parents = await prisma.parent.findMany();
    res.json({ success: true, data: parents });
  } catch (error) {
    next(error);
  }
});

// Create a parent (Admin only)
router.post('/', protect, authorize(Role.ADMIN), async (req, res, next) => {
  try {
    const parent = await prisma.parent.create({ data: req.body });
    res.status(201).json({ success: true, data: parent });
  } catch (error) {
    next(error);
  }
});

// Get a parent by ID
router.get('/:id', protect, async (req, res, next) => {
  try {
    const parent = await prisma.parent.findUnique({ where: { id: req.params.id } });
    if (!parent) throw new NotFoundError('Parent not found');
    res.json({ success: true, data: parent });
  } catch (error) {
    next(error);
  }
});

// Update a parent (Admin only)
router.put('/:id', protect, authorize(Role.ADMIN), async (req, res, next) => {
  try {
    const parent = await prisma.parent.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ success: true, data: parent });
  } catch (error) {
    next(error);
  }
});

// Delete a parent (Admin only)
router.delete('/:id', protect, authorize(Role.ADMIN), async (req, res, next) => {
  try {
    await prisma.parent.delete({ where: { id: req.params.id } });
    res.json({ success: true, data: null });
  } catch (error) {
    next(error);
  }
});

export {router as parentRoutes};