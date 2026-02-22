import logger from '@/lib/logger.lib.js';
import type { Request, Response } from 'express';
import successResponse from '@/utils/success-response.util.js';
import { signUpService } from '@/services/auth.service.js';

export const signUpController = async (req: Request, res: Response) => {
  const { user } = await signUpService(req.body);

  logger.info(`User signed up with email: ${user.email}`, {
    label: 'AuthController',
    userId: user.id,
  });

  successResponse(res, 201, 'User registered successfully', { user });
};
