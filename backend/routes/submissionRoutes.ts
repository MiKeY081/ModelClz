import { Router } from 'express';
import { PrismaClient, Role } from '@prisma/client';
import { protect, authorize } from '../middleware/authMiddleware';
import { AuthError, NotFoundError } from '../utils/errors';

const prisma = new PrismaClient();
const router = Router();

// Get all submissions
router.get('/', protect, async (req, res, next) => {
  try {
    const submissions = await prisma.assignmentSubmission.findMany();
    res.json({ success: true, data: submissions });
  } catch (error) {
    next(error);
  }
});

// Create a submission (Student only)
router.post('/', protect, authorize(Role.STUDENT), async (req, res, next) => {
  try {
    const submission = await prisma.assignmentSubmission.create({
      data: { ...req.body, userId: req.user!.id },
    });
    res.status(201).json({ success: true, data: submission });
  } catch (error) {
    next(error);
  }
});

// Get a submission by ID
router.get('/:id', protect, async (req, res, next) => {
  try {
    const submission = await prisma.assignmentSubmission.findUnique({ where: { id: req.params.id } });
    if (!submission) throw new NotFoundError('Submission not found');
    res.json({ success: true, data: submission });
  } catch (error) {
    next(error);
  }
});

// Update a submission (Student only, before grading)
router.put('/:id', protect, authorize(Role.STUDENT), async (req, res, next) => {
  try {
    const submission = await prisma.assignmentSubmission.findUnique({ where: { id: req.params.id } });
    if (!submission) throw new NotFoundError('Submission not found');
    if (submission.userId !== req.user!.id) throw new AuthError('Not authorized to edit this submission');
    const updatedSubmission = await prisma.assignmentSubmission.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ success: true, data: updatedSubmission });
  } catch (error) {
    next(error);
  }
});

// Delete a submission (Admin only)
router.delete('/:id', protect, authorize(Role.ADMIN), async (req, res, next) => {
  try {
    await prisma.assignmentSubmission.delete({ where: { id: req.params.id } });
    res.json({ success: true, data: null });
  } catch (error) {
    next(error);
  }
});

export { router as submissionRoutes };