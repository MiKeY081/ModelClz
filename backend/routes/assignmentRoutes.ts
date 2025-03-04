import express from 'express';
import { createAssignment, getAssignments, getAssignmentById, updateAssignment, deleteAssignment } from '../controllers/assignmentController'
import { protect } from '../middleware/authMiddleware';
const router = express.Router();

// Create an assignment
router.post('/',  createAssignment);

// Get all assignments
router.get('/', getAssignments);

// Get an assignment by ID
router.get('/:id', getAssignmentById);

// Update an assignment
router.put('/:id', updateAssignment);

// Delete an assignment
router.delete('/:id', deleteAssignment);

export default router;
