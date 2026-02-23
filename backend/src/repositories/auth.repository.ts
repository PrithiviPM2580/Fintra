import { prisma } from '@/lib/prisma.lib.js';
import type { SignUpInput } from '@/validation/auth.validation.js';

export const emailExists = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = async (userData: SignUpInput) => {
  const { email, password, firstName, lastName } = userData;

  return await prisma.user.create({
    data: {
      email,
      password,
      firstName,
      lastName,
    },
  });
};
