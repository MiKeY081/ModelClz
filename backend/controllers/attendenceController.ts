// backend/controllers/attendanceController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Mark attendance
export const markAttendance = async (req: Request, res: Response) => {
  const { studentId, status, date } = req.body;
  const teacherId = req.user?.id; // From authMiddleware

  if (!teacherId) {
    return res.status(401).json({ error: 'Unauthorized, homie! Please log in.' });
  }

  if (!studentId || !status || !date) {
    return res.status(400).json({ error: 'Missing required fields: studentId, status, or date, homie!' });
  }

  try {
    const attendance = await prisma.attendance.create({
      data: {
        studentId,
        teacherId,
        status,
        date: new Date(date),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        student: { include: { user: true } },
        teacher: { include: { user: true } },
      },
    });
    res.status(201).json({ message: 'Attendance marked, homie!', attendance });
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({ error: 'Failed to mark attendance, homie!' });
  }
};

// Get all attendance records
export const getAttendance = async (req: Request, res: Response) => {
  try {
    const attendance = await prisma.attendance.findMany({
      include: {
        student: { include: { user: true } },
        teacher: { include: { user: true } },
      },
      orderBy: { date: 'desc' },
    });
    res.json(attendance);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ error: 'Failed to fetch attendance records, homie!' });
  }
};

// Get attendance by ID
export const getAttendanceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const attendance = await prisma.attendance.findUnique({
      where: { id },
      include: {
        student: { include: { user: true } },
        teacher: { include: { user: true } },
      },
    });
    if (!attendance) {
      return res.status(404).json({ error: 'Attendance record not found, homie!' });
    }
    res.json(attendance);
  } catch (error) {
    console.error('Error fetching attendance by ID:', error);
    res.status(500).json({ error: 'Failed to fetch attendance record, homie!' });
  }
};

// Update attendance status
export const updateAttendance = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const teacherId = req.user?.id;

  if (!teacherId) {
    return res.status(401).json({ error: 'Unauthorized, homie! Please log in.' });
  }

  if (!status) {
    return res.status(400).json({ error: 'Status is required, homie!' });
  }

  try {
    const attendance = await prisma.attendance.findUnique({ where: { id } });
    if (!attendance) {
      return res.status(404).json({ error: 'Attendance record not found, homie!' });
    }
    if (attendance.teacherId !== teacherId) {
      return res.status(403).json({ error: 'You can only update your own records, homie!' });
    }

    const updatedAttendance = await prisma.attendance.update({
      where: { id },
      data: { status, updatedAt: new Date() },
      include: {
        student: { include: { user: true } },
        teacher: { include: { user: true } },
      },
    });
    res.json({ message: 'Attendance updated, homie!', updatedAttendance });
  } catch (error) {
    console.error('Error updating attendance:', error);
    res.status(500).json({ error: 'Failed to update attendance, homie!' });
  }
};

// Delete attendance record
export const deleteAttendance = async (req: Request, res: Response) => {
  const { id } = req.params;
  const teacherId = req.user?.id;

  if (!teacherId) {
    return res.status(401).json({ error: 'Unauthorized, homie! Please log in.' });
  }

  try {
    const attendance = await prisma.attendance.findUnique({ where: { id } });
    if (!attendance) {
      return res.status(404).json({ error: 'Attendance record not found, homie!' });
    }
    if (attendance.teacherId !== teacherId) {
      return res.status(403).json({ error: 'You can only delete your own records, homie!' });
    }

    const deletedAttendance = await prisma.attendance.delete({
      where: { id },
    });
    res.json({ message: 'Attendance deleted, homie!', deletedAttendance });
  } catch (error) {
    console.error('Error deleting attendance:', error);
    res.status(500).json({ error: 'Failed to delete attendance record, homie!' });
  }
};