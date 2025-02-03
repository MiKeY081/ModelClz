import express from 'express';
import { getProfile, updateProfile, getUsers } from '../controllers/userController';
import { protect, authorize } from '../middleware/authMiddleware';
import { Role } from '@prisma/client';

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/', protect, authorize(Role.ADMIN), getUsers);

export default router;