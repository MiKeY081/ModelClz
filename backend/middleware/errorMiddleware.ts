// import { Request, Response, NextFunction } from 'express';
// import { CustomError } from '../utils/errors';

// export const notFound = (req: Request, res: Response, next: NextFunction) => {
//   const error = new Error(`Not Found - ${req.originalUrl}`);
//   res.status(404);
//   next(error);
// };

// export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
//   if (err instanceof CustomError) {
//     return res.status(err.statusCode).json({
//       message: err.message,
//       stack: process.env.NODE_ENV === 'production' ? null : err.stack,
//     });
//   }

//   console.error(err);
//   res.status(500).json({
//     message: 'Internal Server Error',
//     stack: process.env.NODE_ENV === 'production' ? null : err.stack,
//   });
// };