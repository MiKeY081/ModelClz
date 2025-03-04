import { Router } from 'express';
import { PrismaClient, Role } from '@prisma/client';
import { protect, authorize } from '../middleware/authMiddleware';
import { ValidationError } from '../utils/errors';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const router = Router();

router.post('/', protect, authorize(Role.ADMIN), async (req, res, next) => {
  try {
    const { firstName, lastName, rollNumber, grade, section, parentId } = req.body;
    console.log('Creating student with:', { firstName, lastName, rollNumber, grade, section, parentId });

    // Generate email and password
    const email = `${firstName.toLowerCase()}.${rollNumber.toLowerCase()}@gmail.com`;
    const password = `${firstName.toLowerCase()}@123`;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check rollNumber uniqueness
    const rollNumberExists = await prisma.student.findUnique({ where: { rollNumber } });
    if (rollNumberExists) {
      throw new ValidationError('Roll number already in use');
    }

    // Check parentId if provided
    if (parentId) {
      const parentExists = await prisma.parent.findUnique({ where: { id: parentId } });
      if (!parentExists) {
        throw new ValidationError('Parent not found for given parentId');
      }
    }

    // Create User and Student in a transaction
    const student = await prisma.$transaction(async (prisma) => {
      // Step 1: Create User
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          role: Role.STUDENT,
        },
      });

      // Step 2: Create Student with the User's ID directly
      return prisma.student.create({
        data: {
          userId: user.id, // Direct from user creation
          grade,
          section,
          rollNumber,
          parentId: parentId || undefined,
        },
      });
    });

    console.log('New student created:', student);
    res.status(201).json({ success: true, data: student });
  } catch (error) {
    console.error('Error creating student:', error);
    next(error);
  }
});

router.get('/', protect, authorize(Role.ADMIN), async (req, res, next) => {
  try {
    const students = await prisma.student.findMany({
      include: { user: true }, // Include User data
    });
    res.json({ success: true, data: students });
  } catch (error) {
    next(error);
  }
});

export { router as studentRoutes };