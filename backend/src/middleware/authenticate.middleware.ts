import type { Request, Response, NextFunction } from 'express';
import logger from '@/lib/logger.lib.js';
import APIError from '@/lib/api-error.lib.js';
import { verifyToken } from '@/lib/jwt.lib.js';
import type { Payload } from '@/types/index.js';
import { prisma } from '@/lib/prisma.lib.js';

const authenticateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.token;

  if (!token) {
    logger.error('Authentication failed: No token provided', {
      label: 'AuthenticationMiddleware',
    });
    return next(
      new APIError(401, 'Authentication failed: No token provided', true, {
        details: [
          {
            field: ' token',
            message: 'No token provided in cookies',
          },
        ],
      }),
    );
  }

  const decoded = verifyToken(token) as Payload;

  if (!decoded.userId || !decoded.email) {
    logger.error('Authentication failed: Invalid token payload', {
      label: 'AuthenticationMiddleware',
    });
    return next(
      new APIError(401, 'Authentication failed: Invalid token payload', true, {
        details: [
          {
            message: 'The token payload is missing required fields',
          },
        ],
      }),
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      contact: true,
      currency: true,
      tokenVersion: true,
    },
  });

  if (!user) {
    logger.error('Authentication failed: User not found', {
      label: 'AuthenticationMiddleware',
      userId: decoded.userId,
    });
    return next(
      new APIError(401, 'Authentication failed: User not found', true, {
        details: [
          {
            message: 'No user found for the provided token',
          },
        ],
      }),
    );
  }

  if (user.tokenVersion !== decoded.tokenVersion) {
    logger.error('Authentication failed: Token version mismatch', {
      label: 'AuthenticationMiddleware',
      userId: decoded.userId,
    });
    return next(
      new APIError(401, 'Authentication failed: Token version mismatch', true, {
        details: [
          {
            message: 'The token has been invalidated. Please log in again.',
          },
        ],
      }),
    );
  }

  const { tokenVersion, ...userWithoutTokenVersion } = user;

  req.user = userWithoutTokenVersion;

  next();
};

export default authenticateMiddleware;
