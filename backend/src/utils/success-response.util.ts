import { type Response } from 'express';

const successResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: object,
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export default successResponse;
