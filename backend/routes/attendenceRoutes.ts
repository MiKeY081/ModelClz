import express from 'express';
import { markAttendance, getAttendance, getAttendanceById, updateAttendance, deleteAttendance } from '../controllers/attendenceController';

const router = express.Router();

// Mark attendance
router.post('/', markAttendance);

// Get all attendance records
router.get('/', getAttendance);

// Get attendance by ID
router.get('/:id', getAttendanceById);

// Update attendance status
router.put('/:id', updateAttendance);

// Delete attendance record
router.delete('/:id', deleteAttendance);

export default router;
