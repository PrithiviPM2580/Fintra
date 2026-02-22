import type { JWTSignOptions, Payload } from '@/types/index.js';
import jwt, { type Secret } from 'jsonwebtoken';

const JWT_SECRET: Secret = process.env.JWT_SECRET!;

export const generateToken = (
  payload: Payload,
  options?: JWTSignOptions,
): string => {
  return jwt.sign(payload, JWT_SECRET, options);
};
