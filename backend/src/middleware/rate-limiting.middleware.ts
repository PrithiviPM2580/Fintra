import type { Request, Response } from 'express';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import logger from '@/lib/logger.lib.js';

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: {
    error: 'Too many requests, please try again later.',
  },
  legacyHeaders: false,
  standardHeaders: true,
  handler: (req: Request, res: Response) => {
    const retryAfter = req.rateLimit?.resetTime ?? null;
    logger.warn('Rate limit exceeded', { retryAfter });
    res.status(429).json({
      error: 'Too many requests, please try again later.',
      message: 'Please try again after some time.',
      retryAfter: retryAfter ? retryAfter.toISOString() : null,
    });
  },
});

export const globalRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  message: {
    error: 'Too many requests, please try again later.',
  },
  legacyHeaders: false,
  standardHeaders: true,
  handler: (req: Request, res: Response) => {
    const retryAfter = req.rateLimit?.resetTime ?? null;
    if (retryAfter) {
      res.setHeader(
        'Retry-After',
        Math.ceil((retryAfter.getTime() - Date.now()) / 1000),
      );
    }
    logger.warn('Global rate limit exceeded', { retryAfter });
    res.status(429).json({
      error: 'Too many requests, please try again later.',
      message: 'Please try again after some time.',
      retryAfter: retryAfter ? retryAfter.toISOString() : null,
    });
  },
});

export const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 50,
  message: {
    error: 'Too many requests, please try again later.',
  },
  legacyHeaders: false,
  standardHeaders: true,
  keyGenerator: (req: Request): string => {
    const userId = req.user?.userId;
    return userId ?? ipKeyGenerator(req as any);
  },
  handler: (req: Request, res: Response) => {
    const retryAfter = req.rateLimit?.resetTime ?? null;
    logger.warn('API rate limit exceeded', { retryAfter });
    res.status(429).json({
      error: 'Too many requests, please try again later.',
      message: 'Please try again after some time.',
      retryAfter: retryAfter ? retryAfter.toISOString() : null,
    });
  },
});
