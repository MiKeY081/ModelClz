import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create an assignment
export const createAssignment = async (req: Request, res: Response) => {
  const { title, description, dueDate, courseId, teacherId } = req.body;
  
  try {
    const assignment = await prisma.assignment.create({
      data: { title, description, dueDate: new Date(dueDate), courseId, teacherId },
    });
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Get all assignments
export const getAssignments = async (req: Request, res: Response) => {
  try {
    const assignments = await prisma.assignment.findMany();
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
};

// Get an assignment by ID
export const getAssignmentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const assignment = await prisma.assignment.findUnique({
      where: { id },
    });
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assignment' });
  }
};

// Update an assignment
export const updateAssignment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, dueDate, courseId, teacherId } = req.body;
  try {
    const updatedAssignment = await prisma.assignment.update({
      where: { id },
      data: { title, description, dueDate, courseId, teacherId },
    });
    res.json(updatedAssignment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update assignment' });
  }
};

// Delete an assignment
export const deleteAssignment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedAssignment = await prisma.assignment.delete({
      where: { id },
    });
    res.json(deletedAssignment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete assignment' });
  }
};
