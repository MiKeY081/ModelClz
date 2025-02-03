import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create an achievement
export const createAchievement = async (req: Request, res: Response) => {
  const { userId, title, description, date, category } = req.body;
  try {
    const achievement = await prisma.achievement.create({
      data: { userId, title, description, date, category },
    });
    res.status(201).json(achievement);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create achievement' });
  }
};

// Get all achievements
export const getAchievements = async (req: Request, res: Response) => {
  try {
    const achievements = await prisma.achievement.findMany();
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch achievements' });
  }
};

// Get an achievement by ID
export const getAchievementById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const achievement = await prisma.achievement.findUnique({ where: { id } });
    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }
    res.json(achievement);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch achievement' });
  }
};

// Update an achievement
export const updateAchievement = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, date, category } = req.body;
  try {
    const updatedAchievement = await prisma.achievement.update({
      where: { id },
      data: { title, description, date, category },
    });
    res.json(updatedAchievement);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update achievement' });
  }
};

// Delete an achievement
export const deleteAchievement = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedAchievement = await prisma.achievement.delete({ where: { id } });
    res.json(deletedAchievement);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete achievement' });
  }
};
