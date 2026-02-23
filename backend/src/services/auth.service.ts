import type { SignInInput, SignUpInput } from '@/validation/auth.validation.js';
import { emailExists } from '@/repositories/auth.repository.js';
import logger from '@/lib/logger.lib.js';
import APIError from '@/lib/api-error.lib.js';
import { comparePassword, hashPassword } from '@/lib/hassing.lib.js';
import { createUser } from '@/repositories/auth.repository.js';
import { generateToken } from '@/lib/jwt.lib.js';

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

export const signInService = async (userData: SignInInput) => {
  const { email, password } = userData;

  const user = await emailExists(email);

  if (!user) {
    logger.error(`Email not found: ${email}`, {
      label: 'AuthService',
    });
    throw new APIError(400, 'Invalid email or password');
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    logger.error(`Invalid password for email: ${email}`, {
      label: 'AuthService',
    });
    throw new APIError(400, 'Invalid email or password');
  }

  const token = generateToken({
    userId: user.id,
    email: user.email,
    tokenVersion: user.tokenVersion,
  });

  const { password: userPassword, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
};
