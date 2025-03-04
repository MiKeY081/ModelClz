import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../utils/errors';

const prisma = new PrismaClient();

export const createCourse = async (req: Request, res: Response) => {
  const { name, description, subjectId } = req.body;

  const course = await prisma.course.create({
    data: {
      name,
      description,
      subjectId,
      teacherId: req.user!.id
    },
    include: {
      subject: true,
      teacher: {
        include: {
          user: true
        }
      }
    }
  });

  res.status(201).json(course);
};

export const getCourses = async (req: Request, res: Response) => {
  const courses = await prisma.course.findMany({
    include: {
      subject: true,
      teacher: {
        include: {
          user: true
        }
      }
    }
  });

  res.json(courses);
};

export const getCourse = async (req: Request, res: Response) => {
  const course = await prisma.course.findUnique({
    where: { id: req.params.id },
    include: {
      subject: true,
      teacher: {
        include: {
          user: true
        }
      },
      enrollments: {
        include: {
          student: {
            include: {
              user: true
            }
          }
        }
      },
      assignments: true,
    }
  });

  if (!course) {
    throw new NotFoundError('Course not found');
  }

  res.json(course);
};

export const updateCourse = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  const course = await prisma.course.update({
    where: { id: req.params.id },
    data: {
      name,
      description
    },
    include: {
      subject: true,
      teacher: {
        include: {
          user: true
        }
      }
    }
  });

  res.json(course);
};

export const deleteCourse = async (req: Request, res: Response) => {
  await prisma.course.delete({
    where: { id: req.params.id }
  });

  res.status(204).send();
};