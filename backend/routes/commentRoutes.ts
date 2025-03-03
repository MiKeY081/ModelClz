import { Router } from 'express';
import { PrismaClient, Role } from '@prisma/client';
import { protect } from '../middleware/authMiddleware';
import { AuthError, NotFoundError } from '../utils/errors';

const prisma = new PrismaClient();
const router = Router();

// Get all comments (for a post via query param)
router.get('/', protect, async (req, res, next) => {
  try {
    const { postId } = req.query;
    const comments = await prisma.comment.findMany({
      where: postId ? { postId: String(postId) } : undefined,
    });
    res.json({ success: true, data: comments });
  } catch (error) {
    next(error);
  }
});

// Create a comment
router.post('/', protect, async (req, res, next) => {
  try {
    const comment = await prisma.comment.create({
      data: { ...req.body, authorId: req.user!.id },
    });
    res.status(201).json({ success: true, data: comment });
  } catch (error) {
    next(error);
  }
});

// Get a comment by ID
router.get('/:id', protect, async (req, res, next) => {
  try {
    const comment = await prisma.comment.findUnique({ where: { id: req.params.id } });
    if (!comment) throw new NotFoundError('Comment not found');
    res.json({ success: true, data: comment });
  } catch (error) {
    next(error);
  }
});

// Update a comment (by author only)
router.put('/:id', protect, async (req, res, next) => {
  try {
    const comment = await prisma.comment.findUnique({ where: { id: req.params.id } });
    if (!comment) throw new NotFoundError('Comment not found');
    if (comment.authorId !== req.user!.id) throw new AuthError('Not authorized to edit this comment');
    const updatedComment = await prisma.comment.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ success: true, data: updatedComment });
  } catch (error) {
    next(error);
  }
});

// Delete a comment (by author or Admin)
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const comment = await prisma.comment.findUnique({ where: { id: req.params.id } });
    if (!comment) throw new NotFoundError('Comment not found');
    if (comment.authorId !== req.user!.id && req.user!.role !== Role.ADMIN) {
      throw new AuthError('Not authorized to delete this comment');
    }
    await prisma.comment.delete({ where: { id: req.params.id } });
    res.json({ success: true, data: null });
  } catch (error) {
    next(error);
  }
});

export { router as commentRoutes };