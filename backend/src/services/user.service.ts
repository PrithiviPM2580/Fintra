import APIError from '@/lib/api-error.lib.js';
import { comparePassword, hashPassword } from '@/lib/hassing.lib.js';
import logger from '@/lib/logger.lib.js';
import {
  findUserById,
  findUserByIdWithPassword,
  updatePassword,
  updateProfile,
} from '@/repositories/user.repository.js';
import type {
  ChangeUserPasswordInput,
  UpdateUserProfileInput,
} from '@/validation/user.validation.js';

export const getUserProfileService = async (userId: number) => {
  const user = await findUserById(userId);

  if (!user) {
    logger.error(`User not found with ID: ${userId}`, {
      label: 'UserService',
    });
    throw new APIError(404, 'User not found');
  }
  return { user };
};

export const changeUserPasswordService = async (
  userId: number,
  changePasswordInput: ChangeUserPasswordInput,
) => {
  const { currentPassword, newPassword } = changePasswordInput;

  const user = await findUserByIdWithPassword(userId);

  if (!user) {
    logger.error(`User not found with ID: ${userId}`, {
      label: 'UserService',
    });
    throw new APIError(404, 'User not found');
  }

  const isCurrentPasswordValid = await comparePassword(
    currentPassword,
    user.password,
  );

  if (!isCurrentPasswordValid) {
    logger.error(`Invalid current password for user ID: ${userId}`, {
      label: 'UserService',
    });
    throw new APIError(400, 'Invalid current password');
  }

  const isNewPasswordSameAsCurrent = await comparePassword(
    newPassword,
    user.password,
  );

  if (isNewPasswordSameAsCurrent) {
    logger.error(
      `New password cannot be the same as current password for user ID: ${userId}`,
      {
        label: 'UserService',
      },
    );
    throw new APIError(
      400,
      'New password cannot be the same as current password',
    );
  }
  const hashedNewPassword = await hashPassword(newPassword);

  await updatePassword(userId, hashedNewPassword);

  return;
};

export const updateUserProfileService = async (
  userId: number,
  id: number,
  updateProfileInput: UpdateUserProfileInput,
) => {
  if (userId !== id) {
    logger.error(
      `Unauthorized profile update attempt by user ID: ${userId} for user ID: ${id}`,
      {
        label: 'UserService',
      },
    );
    throw new APIError(403, 'Unauthorized to update this profile');
  }

  await updateProfile(userId, updateProfileInput);
};
