// Custom error class for validation errors
export class ValidationError extends Error {
    statusCode: number;
    details: string[];
  
    constructor(message: string, details: string[] = []) {
      super(message);
      this.statusCode = 400; // Bad Request status code
      this.details = details;
      this.name = this.constructor.name;
  
      // Ensures that the error stack trace is correctly set in V8 environments
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  // You can add other custom error classes here (e.g., NotFoundError, UnauthorizedError, etc.)
  