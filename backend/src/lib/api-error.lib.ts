class APIError extends Error {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly isOperational: boolean;
  public readonly error: ErrorType;

  constructor(
    statusCode: number = 500,
    message: string = 'Internal Server Error',
    isOperational: boolean = true,
    error: ErrorType,
    stack?: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = isOperational;
    this.error = error;
    this.stack = stack;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default APIError;
