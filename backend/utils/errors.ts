// Custom error class for validation errors
export class ValidationError extends Error {
  statusCode: number;
  details: string[];

  constructor(message: string, details: string[] = []) {
      super(message);
      this.statusCode = 400; // Bad Request status code
      this.details = details;
      this.name = this.constructor.name;

      if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
      }
  }
}

// Custom error class for Not Found errors
export class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
      super(message);
      this.statusCode = 404; // Not Found status code
      this.name = this.constructor.name;

      if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
      }
  }
}

// Custom error class for Authentication errors
export class AuthError extends Error {
  statusCode: number;

  constructor(message: string) {
      super(message);
      this.statusCode = 401; // Unauthorized status code
      this.name = this.constructor.name;

      if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
      }
  }
}

// Export all custom errors
