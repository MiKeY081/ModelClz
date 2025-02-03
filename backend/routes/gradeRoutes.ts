import express from 'express';
import { createGrade, getGrades, getGradeById, updateGrade, deleteGrade } from '../controllers/gradeController';

const router = express.Router();

// Create a grade
router.post('/', createGrade);

// Get all grades
router.get('/', getGrades);

// Get a grade by ID
router.get('/:id', getGradeById);

// Update a grade
router.put('/:id', updateGrade);

// Delete a grade
router.delete('/:id', deleteGrade);

export default router;
