// backend/routes/postRoutes.ts
import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { getPosts, createPost, likePost } from '../controllers/postController';

const router = express.Router();

router.get('/', getPosts);
router.post('/posts',protect, createPost);
router.post('/posts/:postId/like',protect, likePost);

export default router;