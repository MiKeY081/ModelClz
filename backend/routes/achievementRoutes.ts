import express from 'express';
import { createAchievement, getAchievements, getAchievementById, updateAchievement, deleteAchievement } from '../controllers/achievementController';

const router = express.Router();

// Create an achievement
router.post('/', createAchievement);

// Get all achievements
router.get('/', getAchievements);

// Get an achievement by ID
router.get('/:id', getAchievementById);

// Update an achievement
router.put('/:id', updateAchievement);

// Delete an achievement
router.delete('/:id', deleteAchievement);

export default router;
