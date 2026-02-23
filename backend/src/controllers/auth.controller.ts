import logger from '@/lib/logger.lib.js';
import type { Request, Response } from 'express';
import successResponse from '@/utils/success-response.util.js';
import { signUpService, signInService } from '@/services/auth.service.js';
import cookie from '@/lib/cookie.lib.js';

export const signUpController = async (req: Request, res: Response) => {
  const { user } = await signUpService(req.body);

  logger.info(`User signed up with email: ${user.email}`, {
    label: 'AuthController',
    userId: user.id,
  });

  successResponse(res, 201, 'User registered successfully', { user });
};

export const signInController = async (req: Request, res: Response) => {
  const { user, token } = await signInService(req.body);

  cookie.set(res, 'token', token);

  logger.info(`User signed in with email: ${user.email}`, {
    label: 'AuthController',
    userId: user.id,
    token,
  });

  successResponse(res, 200, 'User signed in successfully', { user, token });
};
