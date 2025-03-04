import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient, Role } from '@prisma/client';
import { AuthError } from '../utils/errors';

const prisma = new PrismaClient();

interface JwtPayload {
  userId: string;
  role: Role;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: Role;
      };
    }
  }
}

export const authorize = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new AuthError('Not authorized to access this route');
    }
    next();
  };
};

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Token:', token); // Debug
    if (!token) throw new AuthError('Not authorized, no token');
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    console.log('Decoded:', decoded); // Debug
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, role: true },
    });
    console.log('User:', user); // Debug
    if (!user) throw new AuthError('Not authorized, user not found');
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};