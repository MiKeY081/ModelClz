import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a grade
export const createGrade = async (req: Request, res: Response) => {
  const { userId, subjectId, value, comment } = req.body;
  try {
    const grade = await prisma.grade.create({
      data: { userId, subjectId,  value, comment },
    });
    res.status(201).json(grade);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create grade' });
  }
};

// Get all grades
export const getGrades = async (req: Request, res: Response) => {
  try {
    const grades = await prisma.grade.findMany();
    res.json(grades);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch grades' });
  }
};

// Get a grade by ID
export const getGradeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const grade = await prisma.grade.findUnique({ where: { id } });
    if (!grade) {
      return res.status(404).json({ error: 'Grade not found' });
    }
    res.json(grade);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch grade' });
  }
};

// Update a grade
export const updateGrade = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { value, comment } = req.body;
  try {
    const updatedGrade = await prisma.grade.update({
      where: { id },
      data: { value, comment },
    });
    res.json(updatedGrade);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update grade' });
  }
};

// Delete a grade
export const deleteGrade = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedGrade = await prisma.grade.delete({ where: { id } });
    res.json(deletedGrade);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete grade' });
  }
};
