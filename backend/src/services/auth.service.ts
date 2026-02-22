import type { SignUpInput } from '@/validation/auth.validation.js';
import { emailExists } from '@/repositories/auth.route.js';
import logger from '@/lib/logger.lib.js';
import APIError from '@/lib/api-error.lib.js';
import { hashPassword } from '@/lib/hassing.lib.js';
import { createUser } from '@/repositories/auth.route.js';

export const signUpService = async (userData: SignUpInput) => {
  const { email, password, firstName, lastName } = userData;

  const isEmailTaken = await emailExists(email);

  if (isEmailTaken) {
    logger.error(`Email already exists: ${email}`, {
      label: 'AuthService',
    });
    throw new APIError(400, 'Email already in use');
  }

  const hassedPassword = await hashPassword(password);

  const user = await createUser({
    email,
    password: hassedPassword,
    firstName,
    lastName,
  });

  return { user };
};
