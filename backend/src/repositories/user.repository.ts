import { prisma } from '@/lib/prisma.lib.js';
import type { UpdateUserProfileInput } from '@/validation/user.validation.js';

export const findUserById = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      contact: true,
      currency: true,
    },
  });
};

export const findUserByIdWithPassword = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      contact: true,
      currency: true,
      password: true,
    },
  });
};

export const updatePassword = async (userId: number, newPassword: string) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { password: newPassword, tokenVersion: { increment: 1 } },
  });
};

export const updateProfile = async (
  userId: number,
  updateProfileInput: UpdateUserProfileInput,
) => {
  return await prisma.user.update({
    where: { id: userId },
    data: updateProfileInput,
  });
};
