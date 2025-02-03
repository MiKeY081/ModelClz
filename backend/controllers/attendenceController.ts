import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Mark attendance
export const markAttendance = async (req: Request, res: Response) => {
  const { studentId, status } = req.body;
  try {
    const attendance = await prisma.attendance.create({
      data: { studentId, status },
    });
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark attendance' });
  }
};

// Get all attendance records
export const getAttendance = async (req: Request, res: Response) => {
  try {
    const attendance = await prisma.attendance.findMany();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance records' });
  }
};

// Get attendance by ID
export const getAttendanceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const attendance = await prisma.attendance.findUnique({
      where: { id },
    });
    if (!attendance) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance record' });
  }
};

// Update attendance status
export const updateAttendance = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedAttendance = await prisma.attendance.update({
      where: { id },
      data: { status },
    });
    res.json(updatedAttendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update attendance' });
  }
};

// Delete attendance record
export const deleteAttendance = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedAttendance = await prisma.attendance.delete({
      where: { id },
    });
    res.json(deletedAttendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete attendance record' });
  }
};
