import type { Request, Response } from 'express';
import {
  getUserProfileService,
  changeUserPasswordService,
  updateUserProfileService,
} from '@/services/user.service.js';
import logger from '@/lib/logger.lib.js';
import successResponse from '@/utils/success-response.util.js';
import type { UpdateUserProfileParams } from '@/validation/user.validation.js';

export const getUserProfileController = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const { user } = await getUserProfileService(userId);

  logger.info(`User profile retrieved for user ID: ${userId}`, {
    label: 'UserController',
    userId,
  });

  successResponse(res, 200, 'User profile retrieved successfully', { user });
};

export const changeUserPasswordController = async (
  req: Request,
  res: Response,
) => {
  const userId = req.user?.id;

  await changeUserPasswordService(userId, req.body);

  logger.info(`User password changed for user ID: ${userId}`, {
    label: 'UserController',
    userId,
  });

  successResponse(res, 200, 'User password changed successfully');
};

export const updateUserProfileController = async (
  req: Request,
  res: Response,
) => {
  const userId = req.user?.id;
  const { id } = req.params as unknown as UpdateUserProfileParams;

  await updateUserProfileService(userId, id, req.body);

  logger.info(`User profile updated for user ID: ${userId}`, {
    label: 'UserController',
    userId,
  });

  successResponse(res, 200, 'User profile updated successfully');
};
